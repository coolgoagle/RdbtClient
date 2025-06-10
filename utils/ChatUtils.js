let { ModuleManager } = global.settingSelection

const ClientName = "Rdbt V4"
const Muted = false
class ChatUtilsClass {
  // Sends a message with the client prefix
  sendModMessage(text) {
    if (Muted) return
    ChatLib.chat("&8[&b" + ClientName + "&8] &r" + (text ?? null))
  }

  // Sends a message with a custom prefix
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
