Polymer({
  model: model,
  DEFAULT_STUN_SERVERS: [{url: 'stun:stun.l.google.com:19302'},
                         {url: 'stun:stun1.l.google.com:19302'},
                         {url: 'stun:stun2.l.google.com:19302'},
                         {url: 'stun:stun3.l.google.com:19302'},
                         {url: 'stun:stun4.l.google.com:19302'}],
  displayAdvancedSettings: false,
  logOut: function() {
    core.logout({name: ui.onlineNetwork.name,
                 userId: ui.onlineNetwork.userId}).then(() => {
      ui.view = UI.View.SPLASH;
      ui.setOfflineIcon();
    });
  },
  toggleAdvancedSettings: function() {
    this.displayAdvancedSettings = !this.displayAdvancedSettings;
    if (!this.displayAdvancedSettings) {
      // Hiding the advanced settings will also hide the confirmation
      // messages.
      this.$.confirmNewServer.hidden = true;
      this.$.confirmResetServers.hidden = true;
    }
  },
  setStunServer: function() {
    model.globalSettings.stunServers = [{url: this.stunServer}];
    core.updateGlobalSettings(model.globalSettings);
    if(!this.$.confirmResetServers.hidden) {
      this.$.confirmResetServers.hidden = true;
    }
    this.$.confirmNewServer.hidden = false;
  },
  resetStunServers: function() {
    model.globalSettings.stunServers = this.DEFAULT_STUN_SERVERS;
    core.updateGlobalSettings(model.globalSettings);
    if(!this.$.confirmNewServer.hidden) {
      this.$.confirmNewServer.hidden = true;
    }
    this.$.confirmResetServers.hidden = false;
  },
  ready: function() {
    this.ui = ui;
  }
});
