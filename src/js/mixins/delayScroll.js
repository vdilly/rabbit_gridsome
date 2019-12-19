export default {
  data() {
    return {
      smoothIsScrolling: false,
      smoothScrollTimeout: null,
      smoothDelta: 0
    };
  },
  methods: {
    smoothStart: function(e, cb) {
      this.smoothIsScrolling = true;
      this.smoothDelta += e.deltaY;
      this.clearSmoothTimeout();
      let _this = this;
      this.smoothScrollTimeout = setTimeout(() => {
        _this.smoothEnd(cb);
      }, 100);
    },
    smoothEnd: function(cb) {
      cb(this.smoothDelta);
      this.resetSmooth();
    },
    clearSmoothTimeout: function() {
      if (this.smoothScrollTimeout) {
        clearTimeout(this.smoothScrollTimeout);
      }
    },
    resetSmooth: function() {
      this.smoothIsScrolling = false;
      this.smoothDelta = 0;
      this.clearSmoothTimeout();
    },
    smoothScroll: function($target, offset) {
      const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
      const originalTop = distanceToTop($target) - offset;
      window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
    }
  }
};
