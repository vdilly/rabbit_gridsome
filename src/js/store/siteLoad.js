/**
 * Gère une variable globale de chargement de site
 *
 * chaque Node (img ou bg-image) avec l'attribut site-load devient un prérequis au chargement du site
 *  pour un bgimage, il faut mettre l'attribut site-load="bg"
 */

let blockingElements, testToComplete;

function testImg(el) {
  return new Promise(function(resolve, reject) {
    el.addEventListener("load", function() {
      resolve();
    });
    if (el.complete) {
      resolve();
    }
  });
}

function testBg(el) {
  return new Promise(function(resolve, reject) {
    let src = el.style.backgroundImage;
    let match = src.match(/\((.*?)\)/);
    var url = match ? match[1].replace(/('|")/g, "") : null;

    if (!url) {
      var observer = new MutationObserver(function(mutationList) {
        testBg(el);
        observer.disconnect();
      });
      observer.observe(el, {
        attributes: true,
        attributeFilter: ["style"],
      });
    } else {
      var img = new Image();
      img.onload = function() {
        resolve();
      };
      img.src = url;
      if (img.complete) img.onload();
    }
  });
}

// Store
export default {
  namespaced: true,
  state: {
    siteLoaded: false,
    siteLoad: 0,
  },
  mutations: {
    set: function(state, loaded) {
      state.siteLoaded = loaded;
    },
    load: function(state, load) {
      state.siteLoad = load;
    },
  },
  getters: {},
  actions: {
    updateLoad({ commit }, [index, length]) {
      let load = ((index + 1) / length) * 100;
      commit("load", load);
    },
    siteLoaded({ commit }, cb) {
      setTimeout(() => {
        this._vm.$debug("Site loaded !");
        commit("load", 100);
        commit("set", true);
        cb();
      }, 1000);
    },
    siteLoad({ dispatch, state }, cb) {
      this._vm.$debug("Site is loading ...");
      blockingElements = document.querySelectorAll("[site-load]");
      testToComplete = blockingElements.length;

      if (testToComplete == 0) {
        dispatch("siteLoaded", cb);
        return;
      }

      setTimeout(() => {
        if (!state.siteLoaded) {
          dispatch("siteLoaded", cb);
        }
      }, 4000);

      const test = async () => {
        for (const [index, el] of blockingElements.entries()) {
          if (el.hasAttribute("src")) {
            await testImg(el);
            dispatch("updateLoad", [index, testToComplete]);
          } else if (el.getAttribute("site-load") == "bg") {
            await testBg(el);
            dispatch("updateLoad", [index, testToComplete]);
          } else {
            console.error("Siteload: unknown element :", el);
          }
        }
      };
      test().then(function() {
        dispatch("siteLoaded", cb);
      });
    },
  },
};
