let { ModuleManager } = global.settingSelection

const ClientName = "Rdbt V4"
const Muted = false
class ChatUtilsClass {
  sendModMessage(text) {
    if (Muted) return
    ChatLib.chat("&8[&b" + ClientName + "&8] &r" + (Math.random() < 0.01 ? "benjabigmacs was here" : (text ?? null)))
  }

  sendCustomMessage(prefix, text) {
    if (Muted) return
    ChatLib.chat("&8[&b" + prefix + "&8] &r" + (text ?? null))
  }

  sendDebugMessage(text) {
    if (Muted) return
    if (!global.settingSelection?.ModuleManager?.getSetting("Other", "Debug Messages")) return
    ChatLib.chat("&8[&b" + ClientName + "&8] &r" + (text ?? null))
  }
}

global.export.ChatUtils = new ChatUtilsClass()
