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
    <b-tabs fill class="pr-5">
      <b-tab title="ADD COIN" @click="linked('add-coin')" class="text-decoration-none"></b-tab>
      <b-tab title="PROMOTE" @click="linked('promote')"></b-tab>
      <b-tab title="NEWSLETTER" @click="linked('news-letter')"></b-tab>
    </b-tabs>

    <div class="pr-2">
      <b-button
        @mouseover="mouseoverLogin()"
        @mouseleave="mouseoverLogin()"
        :variant="mouseover_check_login ? 'info' : 'success'"
        @click="linked('login')"
        >Login</b-button
      >
    </div>
    <div class="pr-5">
      <b-button
        @mouseover="mouseover()"
        @mouseleave="mouseover()"
        :variant="mouseover_check ? 'success' : 'outline-success'"
        @click="linked('signup')"
        >Signup</b-button
      >
    </div>
    <b-navbar-nav class="nav align-items-center ml-auto" v-show="is_login">
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
  BButton,
  BTab,
  BTabs,
} from "bootstrap-vue";
import DarkToggler from "@core/layouts/components/app-navbar/components/DarkToggler.vue";

export default {
  data() {
    return {
      mouseover_check: false,
      mouseover_check_login: false,
      is_login: false,
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
    BTab,
    BTabs,
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
  },
};
</script>
<style scoped>
[dir="ltr"] .nav-tabs .nav-link:after {
  /* left: 0; */
  background: linear-gradient(30deg, #df6a0b, rgba(240, 238, 103, 0.5));
  /* outline: none; */
  /* display: block; */
}
</style>