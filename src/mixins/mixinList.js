export const mixinList = {
  data() {
    return {
      is_mobilesize: false,
      windowHeight: window.innerWidth,
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowHeight = window.innerWidth;
      if (this.windowHeight <= 1024) {
        this.is_mobilesize = true;
      }
    },
  }

}