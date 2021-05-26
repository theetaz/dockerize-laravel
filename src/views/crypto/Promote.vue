<template>
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
        <h1 class="text-center">Paid promotions</h1>
        <p class="text-center">
          Only audited coins will be listed in the paid promotions section.<br />
          These are paid advertisements. These are verified coins by the
          rugfreecoins.com development team.<br />
          If we have reports or if we notice any suspicious activity even after
          the audits we reserve the right to delist these coins as soon as we
          can from this section.
        </p>
      </b-col>
    </b-row>

    <b-row class="match-height mb-1">
      <b-col lg="12">
        <crypto-table :table-data="cryptoDataPromoted" />
      </b-col>
    </b-row>

    <b-row class="match-height mb-1">
      <b-col lg="12" class="text-center">
        <h2 class="text-center">TO PROMOTE YOUR COIN</h2>
        <small>Mail to </small> <b>contact@rugfreecoins.com</b>
      </b-col>
    </b-row>

    <b-row class="text-center">
      <b-col align-self="center" class="mb-2">
        <b-alert variant="danger" show class="mb-0">
          <div class="alert-body">
            <feather-icon icon="InfoIcon" class="mr-50" />
            Do <b>never pay anyone for a promotion on our platform</b>, unless
            you have received a confirmation email from this adress.
          </div>
        </b-alert>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCol, BRow, BLink, BImg, BAlert } from "bootstrap-vue";
import CryptoTable from "./CryptoTable";

export default {
  components: {
    BCol,
    BRow,
    BLink,
    BImg,
    BAlert,
    CryptoTable
  },

  computed: {
    cryptoDataPromoted() {
      return this.$store.state.crypto.cryptoDataPromoted;
    }
  }
};
</script>

<style></style>
