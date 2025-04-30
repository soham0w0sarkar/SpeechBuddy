const userStore = {
  state: {
    user: null,
    loading: false,
    error: null,
  },
  listeners: new Set(),

  // Initialize the store by loading data from chrome.storage.sync
  async init() {
    this.setLoading(true);
    try {
      const result = await chrome.storage.sync.get(["userData"]);
      if (result.userData) {
        this.state.user = result.userData;
      }
    } catch (error) {
      this.setError(error.message);
    } finally {
      this.setLoading(false);
    }
  },

  getState() {
    return this.state;
  },

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },

  // Notify all listeners of state change
  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.state));
  },

  // Set loading state
  setLoading(loading) {
    this.state = {
      ...this.state,
      loading,
    };
    this.notifyListeners();
  },

  setError(error) {
    this.state = {
      ...this.state,
      error,
    };
    this.notifyListeners();
  },

  // Update user state and save to chrome.storage
  async setUser(user) {
    this.setLoading(true);
    try {
      await chrome.storage.sync.set({ userData: user });
      this.state = {
        ...this.state,
        user,
        error: null,
      };
    } catch (error) {
      this.setError(error.message);
    } finally {
      this.setLoading(false);
    }
    this.notifyListeners();
  },

  // Clear user state from memory and storage
  async clearUser() {
    this.setLoading(true);
    try {
      await chrome.storage.sync.remove(["userData"]);
      this.state = {
        user: null,
        loading: false,
        error: null,
      };
    } catch (error) {
      this.setError(error.message);
    } finally {
      this.setLoading(false);
    }
    this.notifyListeners();
  },

  // Update specific user fields and save to chrome.storage
  async updateUserFields(fields) {
    if (!this.state.user) return;

    this.setLoading(true);
    try {
      const updatedUser = {
        ...this.state.user,
        ...fields,
      };

      await chrome.storage.sync.set({ userData: updatedUser });

      this.state = {
        ...this.state,
        user: updatedUser,
      };
    } catch (error) {
      this.setError(error.message);
    } finally {
      this.setLoading(false);
    }
    this.notifyListeners();
  },

  // Check if user is admin
  isAdmin() {
    return this.state.user?.tier === "admin";
  },

  // Check if user is buddy
  isBuddy() {
    return this.state.user?.tier === "buddy";
  },

  // Check if user has active subscription
  hasActiveSubscription() {
    return this.state.user?.subscription_status === "active";
  },

  // Check if user can access features
  canAccess() {
    return this.state.user?.canAccess === true;
  },

  // Get user's subscription status
  getSubscriptionStatus() {
    return this.state.user?.subscription_status;
  },

  // Get user's session count
  getSessionCount() {
    return this.state.user?.sessionCount || 0;
  },

  // Increment session count and save to storage
  async incrementSessionCount() {
    if (!this.state.user) return;

    await this.updateUserFields({
      sessionCount: (this.state.user.sessionCount || 0) + 1,
    });
  },

  // Add buddy to admin's buddy list
  async addBuddy(buddyId) {
    if (!this.isAdmin() || !this.state.user) return;

    const buddyList = this.state.user.buddyList || [];
    if (!buddyList.includes(buddyId)) {
      await this.updateUserFields({
        buddyList: [...buddyList, buddyId],
      });
    }
  },

  // Remove buddy from admin's buddy list
  async removeBuddy(buddyId) {
    if (!this.isAdmin() || !this.state.user) return;

    const buddyList = this.state.user.buddyList || [];
    await this.updateUserFields({
      buddyList: buddyList.filter((id) => id !== buddyId),
    });
  },
};

// Initialize store when the script loads
userStore.init().then(() => {
  console.log("UserStore initialized");
});

// Make userStore available globally
window.userStore = userStore;

// Set up storage change listener to keep store in sync across tabs
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.userData) {
    // Only update if the change wasn't initiated by this instance
    const newUserData = changes.userData.newValue;
    if (JSON.stringify(userStore.state.user) !== JSON.stringify(newUserData)) {
      userStore.state.user = newUserData;
      userStore.notifyListeners();
    }
  }
});
