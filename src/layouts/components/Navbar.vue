<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
      <b-link class="navbar-brand" to="/">
          <span class="brand-logo">
            <b-img :src="appLogoImage" alt="logo" />
          </span>
        </b-link>
    </ul>

    <!-- Left Col -->
    <div
      class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"
    >
      <dark-Toggler class="d-none d-lg-block" />
      <div v-if="!is_mobilesize" class="ml-2">
        <span
          class="pointer px-1 span_class font-weight-bold"
          @click="linked('add-coin')"
          ><small class="font-weight-bold">ADD COIN</small></span
        >
        <span class="pointer px-1 span_class" @click="linked('promote')"
          ><small class="font-weight-bold">PROMOTE</small></span
        >
        <span class="pointer px-1 span_class" @click="linked('news-letter')"
          ><small class="font-weight-bold">NEWSLETTER</small></span
        >
        <span class="pointer px-1 span_class" @click="linked('audit-coin')"
          ><small class="font-weight-bold">AUDIT</small></span
        >
      </div>
    </div>

    <div class="pr-2" v-if="!is_mobilesize && !check_is_login">
      <b-button
        size="sm"
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        @mouseover="mouseoverLogin()"
        @mouseleave="mouseoverLogin()"
        variant="success"
        @click="linked('login')"
        >LOGIN</b-button
      >
    </div>
    <div class="pr-5" v-if="!is_mobilesize && !check_is_login">
      <b-button
        size="sm"
        @mouseover="mouseover()"
        @mouseleave="mouseover()"
        :variant="mouseover_check ? 'success' : 'outline-success'"
        @click="linked('register')"
        >SIGNUP</b-button
      >
    </div>
    <b-navbar-nav
      class="nav align-items-center ml-auto"
      v-show="check_is_login"
    >
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ profileName }}
            </p>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            :text="helper.getNameText(user_name)"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="linked('profile')"
        >
          <feather-icon size="16" icon="UserIcon" class="mr-50" />
          <span>Profile</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
          <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import { mixinList } from "@/mixins/mixinList";
import helper from "@/utils/helper";
import { $themeConfig } from "@themeConfig";
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
  BButton,
  BImg
} from "bootstrap-vue";
import DarkToggler from "@core/layouts/components/app-navbar/components/DarkToggler.vue";
import Ripple from "vue-ripple-directive";

export default {
  mixins: [mixinList],
  data() {
    return {
      helper: helper,
      mouseover_check: false,
      mouseover_check_login: false,
      is_login: false,
      check_is_login: false,
    };
  },
  components: {
    BImg,
    BButton,
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    // Navbar Components
    DarkToggler,
  },
  setup() {
    // App Name
    const { appLogoImage, appName } = $themeConfig.app;
    return {
      appLogoImage,
      appName
    };
  },
  directives: {
    Ripple,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    profileName() {
      let userData = JSON.parse(localStorage.getItem("profile"));
      if (userData) {
        return userData.name;
      }
      return "";
    },
    user_name() {
      let userData = JSON.parse(localStorage.getItem("profile"));
      if (userData) {
        let name = userData.name || [];
        return name;
      }
      return null;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      location.reload();
    },
    linked: function (e) {
      this.$router.push({ path: "/" + e });
    },
    mouseover() {
      this.mouseover_check = !this.mouseover_check;
    },
    mouseoverLogin() {
      this.mouseover_check_login = !this.mouseover_check_login;
    },
    checkIsLogin() {
      let check_token = localStorage.getItem("token");
      if (check_token != null) {
        this.check_is_login = true;
      }
    },
  },
  mounted() {
    this.checkIsLogin();
  },
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
.span_class {
  font-family: "Montserrat", Helvetica, Arial, serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.45;
  color: #695cea;
}
img {
    border-style: none;
    width: 29px;
    margin-top: -20px;
    margin-left: 10px;
}
</style>
