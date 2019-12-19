export default {
  namespaced: true,
  state: {
    device: {
      type: "desktop",
      orientation: "landscape",
      os: "windows",
      useMouse: true
    }
  },
  mutations: {
    setDevice: function(state, device) {
      this._vm.$debug(device);
      state.device = { ...state.device, ...device };
    },
    setNoMouse: function(state) {
      this._vm.$debug(false);
      state.device.useMouse = false;
    }
  },
  getters: {},
  actions: {
    updateDevice: function({ state, commit }, device) {
      commit("setDevice", {
        type: device.type,
        orientation: device.orientation,
        os: device.os
      });
    }
  }
};
