let { mc, TimeHelper, ChatUtils } = global.export

class InventoryUtilsClass {
  constructor() {
    this.cooldown = new TimeHelper()
  }

  /**
   * Strips Minecraft formatting codes from a string
   * @param {String} str - The string to strip formatting from
   * @returns {String} The string without formatting codes
   */
  stripFormatting(str) {
    return typeof str === "string" ? str.replace(/\u00A7[0-9A-FK-ORa-fk-or]/g, "") : str;
  }

  /**
   * Gets the player's inventory
   * @returns {Object} The player's inventory or null if not available
   */
  getInventory() {
    return Player.getInventory();
  }

  /**
   * Gets the currently open container
   * @returns {Object} The open container or null if no container is open
   */
  getOpenContainer() {
    return Player.getOpenedInventory();
  }

  /**
   * Gets all items from a container
   * @param {Object} container - The container to get items from
   * @returns {Array} Array of items in the container
   */
  getContainerItems(container) {
    return container && container.getItems ? container.getItems() : [];
  }

  /**
   * Checks if the inventory has empty slots
   * @param {Object} inv - The inventory to check (defaults to player inventory)
   * @returns {Boolean} True if inventory has space, false otherwise
   */
  hasSpace(inv = this.getInventory()) {
    let emptySlots = 0;
    if (inv && inv.getSize) {
      for (let i = 0; i < inv.getSize(); i++) {
        let item = inv.getStackInSlot(i);
        if (!item || (item.getName && (item.getName() === "Air" || (item.getRegistryName && item.getRegistryName() === "minecraft:air")))) {
          emptySlots++;
        }
      }
    }
    return emptySlots > 0;
  }

  /**
   * Gets the number of empty slots in an inventory
   * @param {Object} inv - The inventory to check (defaults to player inventory)
   * @returns {Number} Number of empty slots
   */
  getEmptySlotCount(inv = this.getInventory()) {
    let emptySlots = 0;
    if (inv && inv.getSize) {
      for (let i = 0; i < inv.getSize(); i++) {
        let item = inv.getStackInSlot(i);
        if (!item || (item.getName && (item.getName() === "Air" || (item.getRegistryName && item.getRegistryName() === "minecraft:air")))) {
          emptySlots++;
        }
      }
    }
    return emptySlots;
  }

  /**
   * Finds a slot by exact item name
   * @param {Object} inv - The inventory to search (defaults to player inventory)
   * @param {String} name - The exact name to search for
   * @returns {Number} The slot index or -1 if not found
   */
  findSlotByExactName(inv = this.getInventory(), name) {
    if (!inv || !inv.getSize) return -1;
    
    const nameLower = name.toLowerCase();
    for (let i = 0; i < inv.getSize(); i++) {
      const item = inv.getStackInSlot(i);
      if (!item) continue;
      
      const itemName = item.getName ? (item.getName().removeFormatting ? 
        item.getName().removeFormatting() : this.stripFormatting(item.getName())) : "";
      
      if (itemName.toLowerCase() === nameLower) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Finds a slot by partial item name
   * @param {Object} inv - The inventory to search (defaults to player inventory)
   * @param {String} name - The partial name to search for
   * @returns {Number} The slot index or -1 if not found
   */
  findSlotByPartialName(inv = this.getInventory(), name) {
    if (!inv || !inv.getSize) return -1;
    
    const nameLower = name.toLowerCase();
    for (let i = 0; i < inv.getSize(); i++) {
      const item = inv.getStackInSlot(i);
      if (!item) continue;
      
      const itemName = item.getName ? (item.getName().removeFormatting ? 
        item.getName().removeFormatting() : this.stripFormatting(item.getName())) : "";
      
      if (itemName.toLowerCase().includes(nameLower)) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Finds a slot by regex pattern
   * @param {Object} inv - The inventory to search (defaults to player inventory)
   * @param {RegExp} regex - The regex pattern to match against item names
   * @returns {Number} The slot index or -1 if not found
   */
  findSlotByRegex(inv = this.getInventory(), regex) {
    if (!inv || !inv.getSize) return -1;
    
    for (let i = 0; i < inv.getSize(); i++) {
      const item = inv.getStackInSlot(i);
      if (!item) continue;
      
      const itemName = item.getName ? (item.getName().removeFormatting ? 
        item.getName().removeFormatting() : this.stripFormatting(item.getName())) : "";
      
      if (regex.test(itemName)) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Finds all slots containing items with the exact name
   * @param {Object} inv - The inventory to search (defaults to player inventory)
   * @param {String} name - The exact name to search for
   * @returns {Array} Array of slot indices
   */
  findAllSlotsByExactName(inv = this.getInventory(), name) {
    const slots = [];
    if (!inv || !inv.getSize) return slots;
    
    const nameLower = name.toLowerCase();
    for (let i = 0; i < inv.getSize(); i++) {
      const item = inv.getStackInSlot(i);
      if (!item) continue;
      
      const itemName = item.getName ? (item.getName().removeFormatting ? 
        item.getName().removeFormatting() : this.stripFormatting(item.getName())) : "";
      
      if (itemName.toLowerCase() === nameLower) {
        slots.push(i);
      }
    }
    return slots;
  }

  /**
   * Finds all slots containing items with the partial name
   * @param {Object} inv - The inventory to search (defaults to player inventory)
   * @param {String} name - The partial name to search for
   * @returns {Array} Array of slot indices
   */
  findAllSlotsByPartialName(inv = this.getInventory(), name) {
    const slots = [];
    if (!inv || !inv.getSize) return slots;
    
    const nameLower = name.toLowerCase();
    for (let i = 0; i < inv.getSize(); i++) {
      const item = inv.getStackInSlot(i);
      if (!item) continue;
      
      const itemName = item.getName ? (item.getName().removeFormatting ? 
        item.getName().removeFormatting() : this.stripFormatting(item.getName())) : "";
      
      if (itemName.toLowerCase().includes(nameLower)) {
        slots.push(i);
      }
    }
    return slots;
  }

  /**
   * Gets the item in a specific slot
   * @param {Number} slot - The slot index
   * @param {Object} inv - The inventory to get from (defaults to player inventory)
   * @returns {Object} The item or null if slot is empty
   */
  getItemInSlot(slot, inv = this.getInventory()) {
    if (!inv || !inv.getSize || slot < 0 || slot >= inv.getSize()) return null;
    return inv.getStackInSlot(slot);
  }

  /**
   * Gets the name of an item in a specific slot
   * @param {Number} slot - The slot index
   * @param {Object} inv - The inventory to get from (defaults to player inventory)
   * @returns {String} The item name or empty string if slot is empty
   */
  getItemNameInSlot(slot, inv = this.getInventory()) {
    const item = this.getItemInSlot(slot, inv);
    if (!item || !item.getName) return "";
    
    return item.getName().removeFormatting ? 
      item.getName().removeFormatting() : this.stripFormatting(item.getName());
  }

  /**
   * Gets the count of an item in a specific slot
   * @param {Number} slot - The slot index
   * @param {Object} inv - The inventory to get from (defaults to player inventory)
   * @returns {Number} The item count or 0 if slot is empty
   */
  getItemCountInSlot(slot, inv = this.getInventory()) {
    const item = this.getItemInSlot(slot, inv);
    if (!item || !item.getStackSize) return 0;
    return item.getStackSize();
  }

  /**
   * Checks if the hotbar contains an item with the given name
   * @param {String} name - The name to search for
   * @param {Boolean} partial - Whether to search for partial matches
   * @returns {Boolean} True if the item is in the hotbar, false otherwise
   */
  hotbarContains(name, partial = false) {
    const inv = this.getInventory();
    if (!inv) return false;
    
    for (let i = 0; i < 9; i++) {
      const item = inv.getStackInSlot(i);
      if (!item || !item.getName) continue;
      
      const itemName = item.getName().removeFormatting ? 
        item.getName().removeFormatting() : this.stripFormatting(item.getName());
      
      if (partial ? itemName.toLowerCase().includes(name.toLowerCase()) : 
                   itemName.toLowerCase() === name.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Counts the total number of items with the given name in the inventory
   * @param {String} name - The name to search for
   * @param {Boolean} partial - Whether to search for partial matches
   * @param {Object} inv - The inventory to search (defaults to player inventory)
   * @returns {Number} The total count of matching items
   */
  countItems(name, partial = false, inv = this.getInventory()) {
    let count = 0;
    if (!inv || !inv.getSize) return count;
    
    const nameLower = name.toLowerCase();
    for (let i = 0; i < inv.getSize(); i++) {
      const item = inv.getStackInSlot(i);
      if (!item || !item.getName || !item.getStackSize) continue;
      
      const itemName = item.getName().removeFormatting ? 
        item.getName().removeFormatting() : this.stripFormatting(item.getName());
      
      if (partial ? itemName.toLowerCase().includes(nameLower) : 
                   itemName.toLowerCase() === nameLower) {
        count += item.getStackSize();
      }
    }
    return count;
  }

  /**
   * Finds the first slot that matches a condition function
   * @param {Function} conditionFn - Function that takes (item, slot) and returns true if the condition is met
   * @param {Object} inv - The inventory to search (defaults to player inventory)
   * @param {Number} startSlot - The slot to start searching from (defaults to 0)
   * @param {Number} endSlot - The slot to end searching at (defaults to inventory size - 1)
   * @returns {Number} The first matching slot index or -1 if not found
   */
  findFirstSlot(conditionFn, inv = this.getInventory(), startSlot = 0, endSlot = null) {
    if (!inv || !inv.getSize) return -1;
    
    // Set default end slot if not provided
    if (endSlot === null) endSlot = inv.getSize() - 1;
    
    // Validate slot range
    startSlot = Math.max(0, startSlot);
    endSlot = Math.min(inv.getSize() - 1, endSlot);
    
    for (let i = startSlot; i <= endSlot; i++) {
      const item = inv.getStackInSlot(i);
      if (conditionFn(item, i)) {
        return i;
      }
    }
    return -1;
  }

  findFirst(inv, itemn) {
    let inventory = inv;
    for (let i = 0; i < inventory.getSize(); i++) {
        let item = inventory.getStackInSlot(i);
        if (item && item.getName && item.getName().removeFormatting() === itemn) {
            return i; // Returns the slot index where it's found
        }
    }
    return -1; // Not found
  }

  findAll(inv, itemn) {
    let inventory = inv;
    let result = [];
    for (let i = 0; i < inventory.getSize(); i++) {
        let item = inventory.getStackInSlot(i);
        if (item && item.getName && item.getName().removeFormatting() === itemn) {
            result.push(i);
        }
    }
    return result; // Returns an array of all matching slot indices
}

}

// Export the class instance
global.export.InventoryUtils = new InventoryUtilsClass();