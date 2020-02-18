/**
 * Gère les variables de la fenêtre
 * Savoir si la fenêtre est scrollée, de combien, quelle est la taille (desktop, tablet, mobile)
 * overlayed permet juste d'avoir une variable globale qui gère si la fenêtre est overlayed, ça permet de gérer l'apparition de la barre de scroll par exemple
 */

export default {
  namespaced: true,
  state: {
    window: {
      windowScrolled: false,
      scrollDirection: "downward",
      scrolly: 0,
      range: "desktop",
      overlayed: false
    }
  },
  mutations: {
    set: function(state, newwindow) {
      state.window = { ...state.window, ...newwindow };
    }
  },
  getters: {
    get: function(state) {
      return state;
    }
  },
  actions: {
    setOverlay({ state, commit }) {
      commit("set", {
        overlayed: true
      });
    },
    removeOverlay({ state, commit }) {
      commit("set", {
        overlayed: false
      });
    },
    updateScroll({ state, commit }) {
      let windowScrolled,
        scrollDirection,
        scrolly = state.window.scrolly;

      if (window.scrollY > 0) {
        windowScrolled = true;
        if (scrolly < window.scrollY) {
          scrollDirection = "downward";
        } else {
          scrollDirection = "upward";
        }
      } else {
        windowScrolled = false;
        scrollDirection = "";
      }

      commit("set", {
        windowScrolled: windowScrolled,
        scrollDirection: scrollDirection,
        scrolly: window.scrollY
      });
    },
    updateRange({ state, commit }) {
      let wWidth = window.innerWidth,
        // wHeight = window.innerHeight,
        breakpoint_large = 1200,
        breakpoint_small = 767,
        newenv;
      if (wWidth > breakpoint_large) {
        newenv = "desktop";
      } else if (wWidth <= breakpoint_small) {
        newenv = "mobile";
      } else {
        newenv = "tablet";
      }
      commit("set", { range: newenv });
    },
    update({ dispatch }) {
      dispatch("updateScroll");
      dispatch("updateRange");
    }
  }
};
