<template>
  <b-row>
    <b-col cols="12" xl="8" lg="8" md="7">
      <crypto-details-view :coin-data="coinData" />
    </b-col>
    <b-col cols="12" md="5" xl="4" lg="4">
      <crypto-meta-data :coin-data="coinData" />
    </b-col>
  </b-row>
</template>

<script>
import { BCol, BRow } from "bootstrap-vue";
import CryptoDetailsView from "@core/components/crypto/CryptoDetailsView";
import CryptoMetaData from "@core/components/crypto/CryptoMetaData";

export default {
  components: {
    BRow,
    BCol,
    CryptoDetailsView,
    CryptoMetaData
  },
  data() {
    return {
      //coinData: null
    };
  },
  created() {
    let coinContract = this.$route.params.hash;
    this.$store.dispatch("FETCH_COIN_DATA", coinContract).then((coinData) => {
      console.log("coin data", coinData);
    });
  },
  computed: {
    coinData() {
      return this.$store.state.crypto.coin;
    }
  }
};
</script>

<style></style>
