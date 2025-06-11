let { SettingSelector, SettingSlider, SettingToggle, ConfigModuleClass, ModuleToggle, getKeyBind, ModuleManager } = global.settingSelection
let { ChatUtils, InventoryUtils, Utils } = global.export
import Skyblock from "BloomCore/Skyblock"
//implemented by real

global.modules.push(
  new ConfigModuleClass(
    "Excavator Macro",
    "Mining",
    [
      new SettingToggle("Fast Mode", false),
    ],
    ["Automatically does Fossil Excavator"],
  ),
)

class ExcavatorMacro {
    constructor() {
        this.ModuleName = "Excavator Macro"
        this.Enabled = false

        getKeyBind("Excavator Macro", "Rdbt Client v4 - Mining", this)

        // State machine states
        this.STATES = {
            WAITING: 0,
            OPENING: 1,
            SETUP: 2,
            EXCAVATING: 3,
            RESETTING: 4
        }
        this.state = this.STATES.WAITING

        // Macro state variables
        this.expectingStartExcavatorItem = false
        this.clickedScrap = false
        this.clickedChisel = false
        this.expectingStartedExcavator = false
        this.openingExcavator = true
        this.usedScrap = false
        this.delayTicks = 9

        register("tick", () => {
            if (!this.Enabled) return
            this.fastMode = ModuleManager.getSetting(this.ModuleName, "Fast Mode")
            switch (this.state) {
                case this.STATES.OPENING:
                    this.handleOpening()
                    break
                case this.STATES.SETUP:
                    this.handleSetup()
                    break
                case this.STATES.EXCAVATING:
                    this.handleExcavating()
                    break
                case this.STATES.RESETTING:
                    this.handleResetting()
                    break
                // WAITING does nothing
            }
        })
    }

    // --- State Handlers ---

    handleOpening() {
        if (Skyblock.subArea !== "Fossil Research Center") this.stopMacro("Not in the Fossil Research Center")
        if (!this.finishedDelay()) return
        if (!this.usedScrap && (!this.hasItem("scrap") || !this.hasItem("armor_stand", false))) return

        if (this.openingExcavator) {
            if (this.isGuiNull()) {
                if (Player.lookingAt() instanceof Entity) {
                    this.rightClick()
                    this.openingExcavator = false
                    this.expectingStartExcavatorItem = true
                    this.state = this.STATES.SETUP
                    return
                }
            }
        }

        this.stopMacroWithWarning("Failed to open excavator.")
    }

    handleSetup() {
        if (this.isGuiNull() && this.ticksDivisible(40) && !this.openingExcavator) {
            this.resetState()
            this.state = this.STATES.OPENING
            return
        }

        if (Player.getContainer()?.getName() === "Fossil Excavator") {
            if (this.expectingStartExcavatorItem && this.hasItem("start excavator")) {
                if (!this.clickedScrap) {
                    this.clickItem("scrap")
                    this.clickedScrap = true
                    this.usedScrap = true
                } else if (!this.clickedChisel) {
                    this.clickItem("armor_stand", "MIDDLE", false, false)
                    this.clickedChisel = true
                } else if (this.clickedScrap && this.clickedChisel) {
                    this.clickItem("start excavator")
                    this.expectingStartedExcavator = true
                    this.clickedScrap = false
                    this.clickedChisel = false
                    this.expectingStartExcavatorItem = false
                    this.state = this.STATES.EXCAVATING
                }
            }
        }
    }

    handleExcavating() {
        if (Player.getContainer()?.getName() === "Fossil Excavator" && this.expectingStartedExcavator) {
            var items = Player.getContainer()?.getItems()
            if (items) {
                var limeIndexes = []
                var brownIndexes = []

                items.forEach((item, index) => {
                    if (item?.getID() == 160 && (item?.getMetadata() == 5 || item?.getMetadata() == 12)) {
                        if (item.getMetadata() == 5) limeIndexes.push(index)
                        if (item.getMetadata() == 12) brownIndexes.push(index)
                    } else if (item?.getID() == 160 && item?.getMetadata() == 4) {
                        this.openingExcavator = true
                        this.expectingStartedExcavator = false
                        this.usedScrap = false
                        InventoryUtils.closeInv()
                        this.state = this.STATES.RESETTING
                    }
                })

                var indexes = [...limeIndexes, ...brownIndexes.sort(() => 0.5 - Math.random())]
                if (indexes.length > 0) {
                    this.clickSlot(indexes[0])
                    indexes.shift()
                }
            }
        }
    }

    handleResetting() {
        this.resetState()
        this.state = this.STATES.OPENING
    }

    // --- Utility Methods ---

    finishedDelay() {
        if (this.delayTicks > 0) {
            this.delayTicks--
            return false
        }

        if (!this.fastMode) {
            this.delayTicks = 5 + Math.floor(Math.random() * 4) // 5-8 ticks (not fast mode)
        } else {
            this.delayTicks = 2 + Math.floor(Math.random() * 2); // 2-3 (fast mode)
        }

        return true
    }

    resetState() {
        this.expectingStartExcavatorItem = false
        this.clickedScrap = false
        this.clickedChisel = false
        this.expectingStartedExcavator = false
        this.openingExcavator = true
        this.usedScrap = false
    }

    stopMacroWithWarning(message = undefined) {
        Utils.warnPlayer()
        this.stopMacro(message)
      }

    stopMacro(message = undefined) {
        if (message != undefined) ChatUtils.sendModMessage(message)
        this.Enabled = false
        this.state = this.STATES.WAITING
        this.resetState()
        ChatUtils.sendModMessage(this.ModuleName + ": &cDisabled")
    }

    // --- Macro API Methods (adapted from your previous code) ---

    hasItem(name, displayName = true, hotbarOnly = false) {
        if (!name) return false
        name = name.toLowerCase()
        const items = Player?.getContainer()?.getItems()
        if (!items) return false
        return items.some((item, index) => {
            if (!item) return false
            if (hotbarOnly && (index < 0 || index > 8)) return false
            const itemName = displayName ? item.getName()?.toLowerCase() : item.getRegistryName()?.toLowerCase()
            return itemName?.includes(name)
        })
    }

    clickItem(name, button = "LEFT", shift = false, displayName = true) {
        if (!name || this.isGuiNull()) return
        name = name.toLowerCase()
        const items = Player.getContainer().getItems()
        const slot = items.findIndex(item => {
            const itemName = displayName ? item?.getName()?.toLowerCase() : item?.getRegistryName()?.toLowerCase()
            return itemName?.includes(name)
        })
        if (slot < 0) return
        Player.getContainer().click(slot, shift, button)
    }

    clickSlot(slot) {
        if (slot == null || slot < 0 || this.isGuiNull()) return
        const items = Player.getContainer().getItems()
        if (!items || slot >= items.length) return
        Player.getContainer().click(slot, false, "MIDDLE")
    }

    rightClick() {
        const mc = Client.getMinecraft()
        const rightClickMethod = mc.getClass().getDeclaredMethod("func_147121_ag")
        rightClickMethod.setAccessible(true)
        rightClickMethod.invoke(mc)
    }

    /** Is Gui Closed */
    isGuiNull() {
        return Client.currentGui.getClassName() === "null"
    }

    ticksDivisible(ticks) {
        return (Player.asPlayerMP().getTicksExisted() % ticks == 0)
    }

    // --- Macro Control ---

    toggle() {
        this.Enabled = !this.Enabled
        if (this.Enabled) {
            this.state = this.STATES.OPENING
            this.resetState()
            ChatUtils.sendModMessage(this.ModuleName + ": &aEnabled")
        } else {
            this.state = this.STATES.WAITING
            this.resetState()
            ChatUtils.sendModMessage(this.ModuleName + ": &cDisabled")
        }
    }
}

global.export.ExcavatorMacro = new ExcavatorMacro()

