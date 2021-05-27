<template>
  <div>
    <section id="profile-info">
      <b-row>
        <b-col lg="8" cols="12" order="1" order-lg="1">
          <crypto-details-view :coin-data="coinData" />
          <crypto-comments v-if="!is_mobilesize" :coin-data="coinData" />
        </b-col>

        <b-col lg="4" cols="12" order="2" order-lg="2">
          <crypto-meta-data :coin-data="coinData" />
          <crypto-comments v-if="is_mobilesize" :coin-data="coinData" />
        </b-col>
      </b-row>
    </section>
  </div>
</template>

<script>
import { mixinList } from "@/mixins/mixinList";
import { BCol, BRow } from "bootstrap-vue";
import CryptoDetailsView from "@core/components/crypto/CryptoDetailsView";
import CryptoMetaData from "@core/components/crypto/CryptoMetaData";
import CryptoComments from "@/@core/components/crypto/CryptoComments";

export default {
  mixins: [mixinList],
  components: {
    BRow,
    BCol,
    CryptoDetailsView,
    CryptoMetaData,
    CryptoComments
  },
  data() {
    return {
      coinData: {}
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.$store.dispatch("FETCH_COIN_DATA", id).then((coinData) => {
      this.coinData = coinData;
    });
    this.onResize();
  },
  
};
</script>

<style></style>
