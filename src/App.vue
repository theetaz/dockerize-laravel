<template>
  <div id="app" class="h-100 testings" :class="[skinClasses]">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from "@themeConfig";
import { provideToast } from "vue-toastification/composition";
import { watch } from "@vue/composition-api";
import useAppConfig from "@core/app-config/useAppConfig";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import { useWindowSize, useCssVar } from "@vueuse/core";

import store from "@/store";

const LayoutVertical = () => import("@/layouts/vertical/LayoutVertical.vue");
const LayoutHorizontal = () =>
  import("@/layouts/horizontal/LayoutHorizontal.vue");
const LayoutFull = () => import("@/layouts/full/LayoutFull.vue");

export default {
  components: {
    // Layouts
    LayoutHorizontal,
    LayoutVertical,
    LayoutFull,
    ToastificationContent
  },
  // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
  // Currently, router.currentRoute is not reactive and doesn't trigger any change
  computed: {
    layout() {
      if (this.$route.meta.layout === "full") return "layout-full";
      return `layout-${this.contentLayoutType}`;
    },
    contentLayoutType() {
      return this.$store.state.appConfig.layout.type;
    }
  },
  mounted() {
    window.Echo.channel("coin-data")
      .listen("CoinDataEvent", (event) => {
        this.$bvToast.toast(event.message, {
          title: event.title,
          variant: "success",
          solid: true
        });
      })
      .listen("CoinVoteCastingEvent", (event) => {
        if (event.data) {
          this.$store.dispatch("UPDATE_REALTIME_VOTE", event.data);
          // this.$toast(
          //   {
          //     component: ToastificationContent,
          //     props: {
          //       title: event.title || "Notification",
          //       icon: "InfoIcon",
          //       text: event.message || "New Vote has been casted",
          //       variant: "warning"
          //     }
          //   },
          //   {
          //     position: "bottom-left"
          //   }
          // );
        }
      });
  },
  beforeCreate() {
    // Set colors in theme
    const colors = [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "danger",
      "light",
      "dark"
    ];

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(
        `--${colors[i]}`,
        document.documentElement
      ).value.trim();
    }

    // Set Theme Breakpoints
    const breakpoints = ["xs", "sm", "md", "lg", "xl"];

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(
        useCssVar(
          `--breakpoint-${breakpoints[i]}`,
          document.documentElement
        ).value.slice(0, -2)
      );
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout;
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  },
  setup() {
    const { skin, skinClasses } = useAppConfig();

    // If skin is dark when initialized => Add class to body
    if (skin.value === "dark") document.body.classList.add("dark-layout");

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: "Vue-Toastification__fade"
    });

    // Set Window Width in store
    store.commit("app/UPDATE_WINDOW_WIDTH", window.innerWidth);
    const { width: windowWidth } = useWindowSize();
    watch(windowWidth, (val) => {
      store.commit("app/UPDATE_WINDOW_WIDTH", val);
    });

    return {
      skinClasses
    };
  }
};
</script>
<style>
.horizontal-layout.navbar-floating:not(.blank-page) .app-content {
  padding: calc(0rem + 4rem * 2 + 1.3rem) 7rem 0 7rem !important;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track-piece {
  border-radius: 10px;
  background-color: #c0c0c0;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #7b7a7a;
  -webkit-box-shadow: inset 0 0 6px rgba(39, 39, 39, 0.5);
}
@media (max-width: 1024px) {
  .img-fluid {
    max-width: 55% !important;
    height: auto;
}
  .horizontal-layout.navbar-floating:not(.blank-page) .app-content {
    padding: calc(0rem + 4rem * 2 + 1.3rem) 1rem 0 1rem !important;
  }
  .table th,
  .table td {
    padding: 0px 0px !important;
  }
  body {
    font-family: "Montserrat", Helvetica, Arial, serif;
    font-size: 10px !important;
    font-weight: 600 !important;
    line-height: 2.45 !important;
  }
  .btn {
    text-align: center;
    padding: 0.4rem 0.2rem !important;
    border-radius: 0.358rem;
  }
  .header-navbar .navbar-container ul.navbar-nav li {
      line-height: 4.5 !important;
  }
  [dir=ltr] .horizontal-layout .header-navbar .navbar-container {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    margin-bottom: -26px;
  }
  [dir] input, [dir] button, [dir] select, [dir] optgroup, [dir] textarea {
    margin: 0;
    width: 70px;
  }
  [dir] .b-avatar.badge-light-primary {
    background-color: rgba(115, 103, 240, 0.12);
    margin-bottom: 20px;
  }
  
}
</style>
