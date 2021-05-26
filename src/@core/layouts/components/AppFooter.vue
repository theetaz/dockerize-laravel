<template>
  <div class="panel-footer text-center">
    <p class="clearfix mb-0">
      <span class="float-md-left d-block d-md-inline-block mt-25">
        COPYRIGHT © {{ new Date().getFullYear() }}
        <b-link
          class="ml-25"
          href="https://www.rugfreecoins.com/"
          target="_blank"
          >rugfreecoins.com
        </b-link>
        <span class="d-none d-sm-inline-block"> All rights Reserved</span>
      </span>
      <span class="float-md-left d-block d-md-inline-block mt-25 ml-5">
        <span class="pointer" @click="linked('terms-n-conditions')"
          >Terms & Conditions</span
        >
      </span>
      <span class="float-md-left d-block d-md-inline-block mt-25 ml-5">
        <span class="pointer" @click="linked('privacy-policy')"
          >Privacy Policy</span
        >
      </span>
    </p>
  </div>
</template>

<script>
import { BLink } from "bootstrap-vue";

export default {
  components: {
    BLink
  },
  methods: {
    linked: function(e) {
      this.$router.push({ path: "/" + e });
    }
  }
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
