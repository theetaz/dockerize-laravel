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
      coinData: {}
    };
  },
  created() {
    let id = this.$route.params.id;
    this.$store.dispatch("FETCH_COIN_DATA", id).then((coinData) => {
      console.log("FETCH_COIN_DATA", coinData);
      this.coinData = coinData;
    });
  }
};
</script>

<style></style>
