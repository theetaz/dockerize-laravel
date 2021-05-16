<template>
  <div>
    <b-row v-if="loading" class="match-height">
      <b-col lg="12">
        <div class="d-flex justify-content-center mb-3 col-12 text-center">
          <b-spinner label="Loading..."></b-spinner>
        </div>
      </b-col>
    </b-row>

    <b-row v-else class="match-height">
      <b-col lg="12">
        <crypto-table :table-data="cryptoData" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol, BSpinner } from "bootstrap-vue";
import CryptoTable from "../views/crypto/CryptoTable";

export default {
  components: {
    BRow,
    BCol,
    BSpinner,
    CryptoTable
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    cryptoData() {
      return this.$store.state.crypto.cryptoData;
    }
  },
  methods: {},
  created() {
    if (!this.$store.state.crypto.clientIP) {
      this.$store.dispatch("FETCH_CLIENT_IP").then(() => {
        this.$store.dispatch("FETCH_CRYPTO_DATA");
      });
    }
  }
};
</script>

<style></style>
