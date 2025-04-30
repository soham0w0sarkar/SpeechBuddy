// Data structure definition
const DATA_STRUCTURE = {
  currentUrl: null,
  gradeLevel: null,
  pillar: null,
  goal: null,
  prompt: null,
  scrapedData: null,
  isSubscribed: false,
  session: null,
};

// Data validation
const validateData = (data) => {
  if (!data) return false;
  return Object.keys(DATA_STRUCTURE).every((key) => data[key] !== undefined);
};

// Data management functions
const DataManager = {
  async getData() {
    try {
      const { data } = await chrome.storage.local.get(["data"]);
      if (!validateData(data)) {
        console.warn("Invalid data structure found");
        return { ...DATA_STRUCTURE };
      }
      return data;
    } catch (error) {
      console.error("Error getting data:", error);
      return { ...DATA_STRUCTURE };
    }
  },

  async setData(newData) {
    try {
      const currentData = await this.getData();
      const updatedData = { ...currentData, ...newData };

      if (!validateData(updatedData)) {
        throw new Error("Invalid data structure");
      }

      await chrome.storage.local.set({ data: updatedData });
      return true;
    } catch (error) {
      console.error("Error setting data:", error);
      return false;
    }
  },

  async updateData(updates) {
    try {
      const currentData = await this.getData();
      const updatedData = { ...currentData, ...updates };

      if (!validateData(updatedData)) {
        throw new Error("Invalid data structure");
      }

      await chrome.storage.local.set({ data: updatedData });
      return true;
    } catch (error) {
      console.error("Error updating data:", error);
      return false;
    }
  },

  async clearData() {
    try {
      await chrome.storage.local.clear();
      return true;
    } catch (error) {
      console.error("Error clearing data:", error);
      return false;
    }
  },
};

// Export the data manager
window.DataManager = DataManager;
