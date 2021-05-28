<template>
  <div>
    <b-row v-if="api_loading" class="match-height">
      <b-col lg="12">
        <div class="d-flex justify-content-center mb-3 col-12 text-center">
          <b-spinner variant="primary" label="Loading..."></b-spinner>
        </div>
      </b-col>
    </b-row>

    <b-row class="match-height mb-1">
      <b-col lg="12">
        <h2>💎 Promoted coins</h2>
        <small
          >Only audited coins are listed in the paid promotions section.</small
        >
      </b-col>
    </b-row>
    <b-row class="match-height mb-1">
      <b-col lg="12">
        <crypto-table :table-data="cryptoDataPromoted" />
      </b-col>
    </b-row>
    <b-row v-if="loading" class="match-height">
      <b-col lg="12">
        <div class="d-flex justify-content-center mb-3 col-12 text-center">
          <b-spinner label="Loading..."></b-spinner>
        </div>
      </b-col>
    </b-row>

    <b-tabs content-class="mt-1">
      <!-- This tabs content will always be mounted -->
      <b-tab :title="!is_mobilesize? '👑 All time best' : 'All time'">
        <small
          >Won't get visibility unless voted, so make sure your community knows
          about it.</small
        >
        <b-row class="match-height mt-1">
          <b-col lg="12">
            <crypto-table
              :table-data="cryptoData"
            />
          </b-col>
        </b-row>
      </b-tab>

      <!-- This tabs content will not be mounted until the tab is shown -->
      <!-- and will be un-mounted when hidden -->
      <b-tab  title="🥇 Today's best" lazy>
        <small>Today best perofoming coins</small>
        <b-row class="match-height mt-1">
          <b-col lg="12">
            <crypto-table :table-data="cryptoDataTodayBest" />
          </b-col>
        </b-row>
      </b-tab>
      <b-tab :title="!is_mobilesize? '🔥 Audited coins' : 'Audited'" lazy>
        <small
          >We give 95% assurance to the public that those audited coins are rug
          pull-free and scams will not likely happen. We will keep tracking the
          coins daily and make sure no suspicious activity will occur.</small
        >
        <b-row class="match-height mt-1">
          <b-col lg="12">
            <crypto-table :table-data="cryptoDataAuditedCoins" />
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { BRow, BCol, BSpinner, BTabs, BTab } from "bootstrap-vue";
import CryptoTable from "../views/crypto/CryptoTable";
import { mixinList } from "@/mixins/mixinList";
export default {
  mixins: [mixinList],
  components: {
    BRow,
    BCol,
    BSpinner,
    CryptoTable,
    BTabs,
    BTab,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    cryptoData() {
      return this.$store.state.crypto.cryptoData;
    },
    cryptoDataPromoted() {
      return this.$store.state.crypto.cryptoDataPromoted;
    },
    cryptoDataTodayBest() {
      return this.$store.state.crypto.cryptoDataTodayBest;
    },
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
