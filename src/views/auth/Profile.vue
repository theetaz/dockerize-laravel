<template>
  <div>
    <b-row class="match-height mb-1">
      <b-col lg="2"></b-col>
      <b-col lg="8">
        <h1 class="text-center">Hi {{ profileName }}</h1>
        <p class="text-center">These are the coins added by you</p>
      </b-col>
      <b-col lg="2">
        <b-form-group>
          <v-select
            v-model="selected"
            label="title"
            :options="option"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row class="match-height mb-1">
      <b-col lg="12">
        <crypto-table :table-data="cryptoDataPromoted" />
      </b-col>
    </b-row>

    <b-row class="match-height mb-1">
      <b-col lg="5"></b-col>
      <b-col lg="2" class="text-center">
        <b-button
          class="mt-2"
          variant="primary"
          type="submit"
          loading="true"
          @click="linked('add-coin')"
        >
          Add new coin
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCol, BRow, BButton, BFormGroup } from "bootstrap-vue";
import CryptoTable from "../crypto/CryptoTable";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
export default {
  components: {
    BCol,
    BRow,
    CryptoTable,
    BButton,
    BFormGroup,
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      selected: { title: "All" },
      option: [
        { title: "All" },
        { title: "Pending" },
        { title: "Posted" },
        { title: "Diclined" },
      ],
    };
  },

  computed: {
    cryptoDataPromoted() {
      return this.$store.state.crypto.cryptoDataPromoted;
    },
    profileName() {
      let userData = JSON.parse(localStorage.getItem("profile"));
      if (userData) {
        return userData.name;
      }
      return "";
    },
  },
  methods: {
    linked: function (e) {
      this.$router.push({ path: "/" + e });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
