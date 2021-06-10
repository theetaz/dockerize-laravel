<template>
  <!-- <div>
    <b-row v-if="api_loading" class="match-height">
      <b-col lg="12">
        <div class="d-flex justify-content-center mb-3 col-12 text-center">
          <b-spinner variant="primary" label="Loading..."></b-spinner>
        </div>
      </b-col>
    </b-row>

    <b-row class="match-height mb-1">
      <b-col lg="12">
        <h2>💎 Audited coins</h2>
        <small
          >Upon the requests and payments, the Rugfreecoins.com development team
          and audit team will review the contract, code, holders, and all other
          rug pull factors and generate a manual report in accordance with the
          industry standards. Rugfreecoins.com development team will preview the
          report publicly. We give 95% assurance to the public that those
          audited coins are rug pull-free and scams will not likely happen. We
          will keep tracking the coins daily and make sure no suspicious
          activity will occur.</small
        >
      </b-col>
    </b-row>
    <b-row class="match-height mb-1">
      <b-col lg="12">
        <crypto-table :table-data="cryptoDataAuditedCoins" />
      </b-col>
    </b-row>
    <b-row v-if="loading" class="match-height">
      <b-col lg="12">
        <div class="d-flex justify-content-center mb-3 col-12 text-center">
          <b-spinner label="Loading..."></b-spinner>
        </div>
      </b-col>
    </b-row>
  </div> -->
  <div>
    <b-row class="text-center">
      <b-col align-self="center" class="mb-2">
        <b-link to="/" class="brand-logo">
          <b-img
            src="@/assets/images/logo/rugfreecoins.png"
            height="200"
            alt="RugFreeCoins"
          ></b-img>
        </b-link>
      </b-col>
    </b-row>
    <b-row class="match-height mb-1">
      <b-col lg="12">
        <h1 class="text-center">Audit coins</h1>
        <p class="text-center">
          Upon the requests and payments, the Rugfreecoins.com development team
          and audit team will review the contract, code, holders, and all other
          rug pull factors and generate a manual report in accordance with the
          industry standards. Rugfreecoins.com development team will preview the
          report publicly. We give 95% assurance to the public that those
          audited coins are rug pull-free and scams will not likely happen. We
          will keep tracking the coins daily and make sure no suspicious
          activity will occur.
        </p>
      </b-col>
    </b-row>

    <b-row class="match-height mb-1">
      <b-col lg="12">
        <crypto-table :table-data="cryptoDataAuditedCoins" :table_name="'audited'" />
      </b-col>
    </b-row>

    <b-row class="match-height mb-1">
      <b-col lg="12" class="text-center">
        <h2 class="text-center">TO AUDIT YOUR COIN</h2>
        <small>Mail to </small> <b>contact@rugfreecoins.com</b>
      </b-col>
    </b-row>

    <b-row class="text-center">
      <b-col align-self="center" class="mb-2">
        <b-alert variant="danger" show class="mb-0">
          <div class="alert-body">
            <feather-icon icon="InfoIcon" class="mr-50" />
            Do <b>never pay anyone for a audit on our platform</b>, unless
            you have received a confirmation email from this adress.
          </div>
        </b-alert>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol, BLink, BImg, BAlert } from "bootstrap-vue";
import CryptoTable from "../views/crypto/CryptoTable";

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BImg,
    BAlert,
    CryptoTable
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    cryptoDataAuditedCoins() {
      return this.$store.state.crypto.cryptoDataAuditedCoins;
    },
    api_loading() {
      return this.$store.state.loaders.apiloading;
    },
  },
  methods: {},
  created() {
    if (!this.$store.state.crypto.clientIP) {
      this.$store.dispatch("FETCH_CLIENT_IP").then(() => {
        this.$store.dispatch("FETCH_CRYPTO_DATA");
        this.$store.dispatch("FETCH_PROMOTED_CRYPTO_DATA");
        this.$store.dispatch("FETCH_TODAY_BEST_CRYPTO_DATA");
        this.$store.dispatch("FETCH_AUDITED_CRYPTO_DATA");
      });
    }
  },
};
</script>

<style></style>
