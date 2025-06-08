let { SettingSelector, SettingSlider, SettingToggle, ConfigModuleClass, ModuleToggle, getKeyBind, ModuleManager } = global.settingSelection
let { ChatUtils } = global.export
import Async from "../../Async"

global.modules.push(new ConfigModuleClass("Grotto Finder", "Render", [new SettingToggle("Enabled", false)], ["Highlights fairy grottos in the Crystal Hollows (not working)"]))

class grottoFinder {
  constructor() {
    this.ModuleName = "Grotto Finder"

    this.Enabled = false

    register("step", () => {
      return
      this.Enabled = ModuleManager.getSetting(this.ModuleName, "Enabled")
      if (!this.Enabled) return
      px = Math.floor(Player.getX())
      py = Math.floor(Player.getY())
      pz = Math.floor(Player.getZ())
      Async.run(() => {
        for (x = -64; x < 64; x++) {
          for (z = -64; z < 64; z++) {
            for (y = 30; y < 160; y++) {
              let block = World.getBlockAt(px - x, y, pz - z)
              if (block.type.getID() === 95 || block.type.getID() === 160) {
                ChatUtils.sendDebugMessage(`Block at: ${px - x}, ${y}, ${pz - z}`)
              }
            }
          }
        }
      })
      ChatUtils.sendDebugMessage("done")
    }).setFps(1)

    //register("renderWorld", event => {})
  }
}

new grottoFinder()
