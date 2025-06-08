// ^ See #guide in v4 discord ^

// Globals
global.export = {}
global.modules = []
global.settingSelection = {}

// Utils
import "./utils/JavaToJSMappings"
import "./utils/dataclasses/Vec"
import "./utils/dataclasses/ItemObject"
import "./utils/StencilUtils"
import "./utils/NumberUtils"
import "./utils/dataclasses/ServerPlayer"
import "./utils/MouseUtils"
import "./utils/dataclasses/Routes"
import "./utils/TimeHelper"
import "./utils/BlockRenderer"
import "./utils/ChatUtils"
import "./utils/FileUtils"
import "./module/ModuleManager"
import "./utils/NotificationUtils"
import "./utils/GuiUtils"
import "./utils/Utils"
import "./utils/ItemUtils"
import "./utils/LagHelper"
import "./utils/MathUtils"
import "./utils/MiningUtils"
import "./utils/MovementHelper"
import "./utils/RayTraceUtils"
import "./utils/WebhookManager"
import "./utils/rotation/RotationsFork"
import "./utils/rotation/PowderRotations"
import "./utils/DevUtils"
import "./utils/FlowstateUtils"
import "./utils/InventoryUtils"

// GUI
import "./gui/NotificationHandler"
import "./gui/CategoryTitle"
import "./gui/CheckboxDropdown"
import "./gui/ImageButton"
import "./gui/ModuleButton"
import "./gui/ToggleButton"
import "./gui/EditableString"
import "./gui/ThemeEditor"
import "./gui/EditLocation"
import "./gui/ProgressOverlay"
import "./gui/SelectionDropdown"
import "./gui/ValueSlider"
import "./gui/Warning"
import "./gui/GUI"

// Modules
import "./module/ModuleLoader"
import "./module/ModuleToggle"

// Pathfinding
import "./pathfinding/Pathfinder"
import "./pathfinding/RdbtPathFinder"
import "./pathfinding/PathHelper"
import "./pathfinding/RouteWalkerV2"

// Failsafes
import "./failsafe/Failsafe"
import "./failsafe/ResponseBot"
import "./failsafe/TeleportFailsafe"
import "./failsafe/RotationFailsafe"
import "./failsafe/PlayerFailsafe"
import "./failsafe/ItemFailsafe"
import "./failsafe/BlockFailsafe"
import "./failsafe/VelocityFailsafe"
import "./failsafe/SmartFailsafe"
import "./failsafe/ServerFailsafe"
import "./failsafe/FailsafeManager"

// Macros
import "./macro/MiningBot"
import "./macro/CommissionMacro"
import "./macro/GemstoneMacro"
import "./macro/OreMacro"
import "./macro/Etherwarper"
import "./qol/AutoReconnect"
import "./macro/HoppityMacro"
import "./macro/ScathaMacro"
import "./qol/AutoEnchanting"
import "./qol/AutoHarp"
import "./qol/ESP"
import "./qol/GhostBlocks"
import "./qol/LobbyHopper"
import "./qol/ProfileHider"
import "./qol/Spin"
import "./qol/FastPlace"
import "./qol/MobHider"
//import "./qol/GrottoFinder"
import "./gui/clientHud"
import "./qol/AutoBeg"
//import "./qol/freecam"
import "./qol/PowderTracker"
import "./qol/FishingXPCheese"

// Init
import "./gui/ConfigGUIInit"

// eval command
register("command", command => {
  eval(command)
}).setName("eval")
