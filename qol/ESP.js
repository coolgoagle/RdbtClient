import Skyblock from "BloomCore/Skyblock"
let { SettingToggle, ConfigModuleClass, ModuleManager, SettingSlider } = global.settingSelection

let { RenderUtils } = global.export

global.modules.push(
  new ConfigModuleClass(
    "ESP",
    "Render",
    [new SettingToggle("Enabled", false), new SettingToggle("Corpses", true), new SettingToggle("Players", false), new SettingToggle("Player Nametags", false), new SettingSlider("Player Range", 64, 1, 128)],
    ["Corpses", "Players"],
  ),
)

class ESP {
  constructor() {
    this.ModuleName = "ESP"
    this.Enabled = false

    this.renderCorpses = true
    this.renderPlayers = false
    this.renderPlayerNametags = false
    this.playerRange = 64

    register("step", () => {
      this.Enabled = ModuleManager.getSetting(this.ModuleName, "Enabled")
      this.renderCorpses = ModuleManager.getSetting(this.ModuleName, "Corpses")
      this.renderPlayers = ModuleManager.getSetting(this.ModuleName, "Players")
      this.renderPlayerNametags = ModuleManager.getSetting(this.ModuleName, "Player Nametags")
      this.playerRange = ModuleManager.getSetting(this.ModuleName, "Player Range")
    }).setFps(1)

    register("renderWorld", () => {
      if (!this.Enabled) return

      // Corpse scanning + rendering
      if (this.renderCorpses && Skyblock.subArea === "Glacite Mineshafts") {
        this.renderCorpseESP()
      }

      // Player scanning + rendering
      if (this.renderPlayers || this.renderPlayerNametags) {
        this.renderPlayerESP()
      }
    })
  }

  renderCorpseESP() {
    const corpsePositions = []

    World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand).forEach(entity => {
      if (!entity.isInvisible()) {
        corpsePositions.push([entity.getX() - 0.5, entity.getY(), entity.getZ() - 0.5])
      }
    })

    if (corpsePositions.length > 0) {
      RenderUtils.renderCubes(corpsePositions, 1, 2)
    }
  }

  renderPlayerESP() {
    const playerPos = Player.getPlayer()
    const playerBoxes = []

    World.getAllPlayers()
      .filter(p => p.getName() !== Player.getName() && !p.isInvisible() && p.getUUID().version() !== 2)
      .forEach(player => {
        const dist = player.distanceTo(playerPos)
        if (dist <= this.playerRange) {
          const x = player.getX() - 0.5
          const y = player.getY()
          const z = player.getZ() - 0.5

          // Add player position for box rendering
          if (this.renderPlayers) {
            playerBoxes.push([x, y, z])
          }

          // Render nametag
          if (this.renderPlayerNametags) {
            const scale = 1 - dist / 212
            RenderUtils.drawString(player.getName(), [x, y + (1.7 + dist / 64), z], [255, 255, 255], scale, true)
          }
        }
      })

    // Batch render all players at once
    if (playerBoxes.length > 0) {
      RenderUtils.renderCubes(playerBoxes, 0.6, 1.8, [1, 0, 0])
    }
  }
}

new ESP()
