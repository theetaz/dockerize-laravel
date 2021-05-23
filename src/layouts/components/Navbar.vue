<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
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
              {{ profileData.name }}
            </p>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            :text="getNameText"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center">
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
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
  BButton
} from "bootstrap-vue";
import DarkToggler from "@core/layouts/components/app-navbar/components/DarkToggler.vue";
import Ripple from "vue-ripple-directive";

export default {
  data() {
    return {
      mouseover_check: false,
      mouseover_check_login: false,
      is_login: false,
      is_mobilesize: false,
      check_is_login: false
    };
  },
  components: {
    BButton,
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    // Navbar Components
    DarkToggler
  },
  directives: {
    Ripple
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    profileData() {
      return JSON.parse(localStorage.getItem("profile"));
    },
    getNameText() {
      let userData = JSON.parse(localStorage.getItem("profile"));
      let name = userData.name;
      let slpitName = name.split(" ");
      let text = "";
      slpitName.forEach((name) => {
        text = text + name.charAt(0);
      });
      return text;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      location.reload();
    },
    linked: function(e) {
      this.$router.push({ path: "/" + e });
    },
    mouseover() {
      this.mouseover_check = !this.mouseover_check;
    },
    mouseoverLogin() {
      this.mouseover_check_login = !this.mouseover_check_login;
    },
    checkWIndowSize() {
      let window_size = window.innerWidth;
      if (window_size <= 1024) {
        this.is_mobilesize = true;
      }
    },
    checkIsLogin() {
      let check_token = localStorage.getItem("token");
      if (check_token != null) {
        this.check_is_login = true;
      }
    }
  },
  mounted() {
    this.checkWIndowSize();
    this.checkIsLogin();
  }
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
</style>
