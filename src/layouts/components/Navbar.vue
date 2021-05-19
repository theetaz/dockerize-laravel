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
    </div>
    <div  v-if="!is_mobilesize">
      <span class="pointer px-1"  @click="linked('add-coin')">ADD COIN</span>
      <span class="pointer px-1"  @click="linked('promote')">PROMOTE</span>
      <span class="pointer px-1"  @click="linked('news-letter')">NEWSLETTER</span>
    </div>
    
    <div class="pr-2" v-if="!is_mobilesize && !check_is_login">
      <b-button
        @mouseover="mouseoverLogin()"
        @mouseleave="mouseoverLogin()"
        :variant="mouseover_check_login ? 'info' : 'success'"
        @click="linked('login')"
        >Login</b-button
      >
    </div>
    <div class="pr-5" v-if="!is_mobilesize && !check_is_login">
      <b-button
        @mouseover="mouseover()"
        @mouseleave="mouseover()"
        :variant="mouseover_check ? 'success' : 'outline-success'"
        @click="linked('register')"
        >Signup</b-button
      >
    </div>
    <b-navbar-nav class="nav align-items-center ml-auto" v-show="check_is_login">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">John Doe</p>
            <span class="user-status">Admin</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="require('@/assets/images/avatars/13-small.png')"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="UserIcon" class="mr-50" />
          <span>Profile</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="MailIcon" class="mr-50" />
          <span>Inbox</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="CheckSquareIcon" class="mr-50" />
          <span>Task</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="MessageSquareIcon" class="mr-50" />
          <span>Chat</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item link-class="d-flex align-items-center">
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
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    linked: function (e) {
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
      if (window_size <=1024) {
        this.is_mobilesize = true
      }
    },
    checkIsLogin() {
      let check_token = localStorage.getItem('token');
      if (check_token != null) {
        this.check_is_login = true
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
</style>