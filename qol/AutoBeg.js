let { ConfigModuleClass, ModuleManager, getKeyBind, SettingToggle, SettingSlider } = global.settingSelection
let { ChatUtils, TimeHelper, Utils } = global.export

global.modules.push(
  new ConfigModuleClass(
    "Auto Beg",
    "Misc",
    [
      new SettingSlider("Message Interval (s)", 30, 5, 300), 
    ],
    ["Automatically sends begging messages in chat periodically.", "Doesn't Auto Claim.", "Toggle with /autobeg"],
  ),
)

class AutoBegClass {
  constructor() {
    this.ModuleName = "Auto Beg"

    this.begging_messages = [
      "anyone got a spare rank pls",
      "hey can someone gift me mvp",
      "anyone nice enough to rank a noob",
      "looking for a rank so i can unlock cool cosmetics",
      "plz rank me i want to have fun",
      "if anyone is feeling generous a rank would be epic",
      "looking for a free rank to play with my friends",
      "need a rank to flex on the noobs lol",
      "anyone got any extra rank lying around",
      "i cant afford a rank can i get one",
      "pls rank me i will be your best friend forever",
      "hey anyone willing to rank me up i'm new",
      "pls give me a rank i will be your friend",
      "can someone give me a rank im poor",
      "anyone want to gift me a rank i want mvp",
      "i need a rank so i can make a guild",
      "can someone rank me i will give stuff",
      "pls rank me i will do whatever you want",
      "looking for a rank giveaway",
      "anyone nice enough to give me mvp",
      "i need a rank to be cool",
      "anyone have an extra rank",
      "i will pay you back for a rank later promise",
      "can i get a free rank",
      "if anyone is bored and feeling nice rank me",
      "i have no rank i need one pls",
      "hey can i get a rank im new to the game",
      "pls give me a free rank",
      "pls give me a rank i will do anything",
      "anyone got any free ranks",
      "can i please get a free rank",
      "pls rank me i will be your friend for life",
      "plz rank me i am poor",
      "hey can anyone gift me a rank pls",
      "looking for mvp+ gift",
      "pls give me mvp",
      "can anyone give me a rank so i can enjoy the game",
      "looking for a free rank to join my friends game",
      "need a rank so i can join my friends",
      "can someone help me get a rank",
      "pls give me rank",
      "i want to join my friends game need a rank",
      "can i have a free rank pls",
      "pls rank me",
      "looking for a mvp gift",
      "pls give me mvp im sad",
      "anyone got a mvp+ for me",
      "i cant afford a rank pls help",
      "can i have a rank gift pls",
      "pls help me get a rank",
      "pls rank me",
      "looking for mvp",
      "can i get a rank",
      "can i have a rank",
      "pls rank me",
      "anyone nice to gift me mvp",
      "pls gift me mvp",
      "gift me mvp",
      "need a rank pls",
      "i need rank",
      "someone gift me",
      "rank pls",
      "can someone give me mvp",
      "i want mvp",
      "any mvp giveaway",
      "need rank to play with friends",
      "gifting me a rank is ok",
      "can someone give me rank",
      "looking for mvp+ giveaway",
      "give me rank",
      "anyone got extra rank",
      "can i have rank",
      "anyone give mvp",
      "gift me rank",
      "pls can i get rank",
      "can someone gift me rank",
      "i need mvp",
      "give me mvp+",
      "can i get a free rank",
      "rank pls",
      "pls i need a rank",
      "need mvp",
      "any rank giveaway",
      "plz can i get rank",
      "pls gift me a rank",
      "anyone have a spare mvp+?",
      "looking for someone to upgrade my rank to mvp",
      "can someone gift me mvp+?",
      "i need mvp+, anyone?",
      "pls rank me up to mvp+",
      "can someone upgrade me to mvp?",
      "i really want mvp+",
      "can anyone upgrade my rank?",
      "pls, mvp+ would be amazing",
      "anyone wanna gift me mvp?",
      "is anyone giving away mvp+?",
      "i'll do anything for mvp+",
      "looking for an mvp upgrade",
      "can i get mvp+ please?",
      "i'm trying to get mvp, any help?",
      "anyone generous enough to give me mvp+?",
      "mvp+ would be so cool",
      "can someone upgrade me?",
      "i'd love mvp+",
      "anyone feeling nice, mvp?",
      "i need an mvp+ upgrade",
      "anyone got a spare mvp?",
      "i want mvp so bad",
      "can someone upgrade my rank to mvp+?",
      "looking for mvp+ or even just mvp",
      "pls i need mvp+",
      "any mvp+ gifts?",
      "can someone upgrade my rank?",
      "i need mvp to be cool",
      "any mvp giveaways?",
      "can i have mvp+?",
      "looking for mvp upgrade",
      "anyone got an extra mvp?",
      "i'd love to get mvp",
      "can i get mvp+ please?",
      "i need mvp help",
      "pls help me get mvp",
      "i wanna be mvp, help?",
      "any mvp offers?",
      "looking to get ranked up to mvp+",
      "please gift me mvp",
      "can i get an mvp upgrade?",
      "i wish i had mvp",
      "can anyone gift mvp?",
      "i'm looking for mvp, pls",
      "help me get mvp+",
      "anyone giving away mvp?",
      "i'm so poor, i need mvp+",
      "pls i want mvp",
      "mvp would be awesome",
      "i'm begging for mvp",
      "need an mvp upgrade",
      "i'll do anything for mvp!",
      "can i have mvp gift",
      "can i get mvp pls?",
      "i want mvp so i can stream",
      "anyone nice enough to give me mvp+?",
      "i really need mvp",
      "pls can i get mvp?",
      "looking for an mvp+ friend",
      "anyone have mvp?",
      "mvp giveaway?",
      "i need mvp bad",
      "please gift me mvp+",
      "anyone wanna gift me mvp+",
      "can anyone upgrade me?",
      "i want mvp+",
      "i need mvp upgrade",
      "mvp plssss",
      "any mvp gifts?",
      "can i get mvp?",
      "give me mvp!",
      "someone gift me mvp+",
      "looking for mvp",
      "mvp needed",
      "pls i want to be mvp",
      "can i get mvp?",
      "i'm begging for mvp help",
      "any mvp upgrades?",
      "i'm so poor i need mvp",
      "pls help me get mvp",
      "mvp pls",
      "i need an mvp",
      "gift me mvp",
      "can someone give mvp",
      "anyone nice and gift mvp",
      "looking for mvp+, please",
      "give me mvp",
      "anyone got a mvp?",
      "can i get mvp please?",
      "i need mvp plsss",
      "pls can i get mvp please",
      "anyone has mvp for me",
      "can i get mvp now",
      "i want an mvp rank",
      "can i have mvp",
      "i need mvp to join guild",
      "i want mvp to have fun",
    ]

    this.isEnabled = false
    this.lastMessageTime = 0
    this.messageIntervalMillis = ModuleManager.getSetting(this.ModuleName, "Message Interval (s)") * 1000

    register("command", () => {
      this.toggle()
    }).setName("autobeg")

    register("step", () => {
      const intervalSeconds = ModuleManager.getSetting(this.ModuleName, "Message Interval (s)")
      this.messageIntervalMillis = intervalSeconds * 1000
    }).setDelay(1)

    // send messages periodically
    register("step", () => {
      if (!this.isEnabled || !World.isLoaded()) return

      const currentTime = Date.now()
      if (currentTime - this.lastMessageTime >= this.messageIntervalMillis) {
        const randomMessage = this.begging_messages[Math.floor(Math.random() * this.begging_messages.length)]
        ChatLib.say(randomMessage)
        this.lastMessageTime = currentTime
      }
    }).setFps(1)
  }

  toggle() {
    this.isEnabled = !this.isEnabled

    this.sendMacroMessage(`${this.isEnabled ? "&aenabled" : "&cdisabled"}.`)

    if (!this.isEnabled) {
      this.lastMessageTime = 0
    } else {
      this.lastMessageTime = Date.now()
    }
  }

  sendMacroMessage(msg) {
    ChatUtils.sendModMessage(`${this.ModuleName}: ${msg}`)
  }
}

new AutoBegClass()
