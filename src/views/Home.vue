<template>
  <div>
    <b-row v-if="api_loading" class="match-height">
      <b-col lg="12">
        <div class="d-flex justify-content-center mb-3 col-12 text-center">
          <b-spinner variant="primary" label="Loading..."></b-spinner>
        </div>
      </b-col>
    </b-row>
    <b-row class="banner-margin">
      <!-- <div class="d-flex justify-content-between mb-3 col-12 text-center"> -->
      <!-- <b-col class="md-1">
        <b-card class="pr-5 card-height">
          <b-card-text class="pt-2">b</b-card-text>
        </b-card>
      </b-col>
      <b-col class="md-10"> -->
      <div class="d-flex justify-content-center mb-3 col-12 text-center">
        <b-link href="http://bit.ly/eject-elon" target="_blank">
          <b-img
            src="@/assets/images/banners/eject-promo.gif"
            :height="is_mobilesize ? '37px' : '105px'"
          />
        </b-link>
      </div>
      <!-- </b-col> -->

      <!-- </div> -->
    </b-row>
    <b-row class="banner-margin pt-3" v-if="!is_mobilesize">
      <div class="d-flex justify-content-center col-4 text-center">
        <!-- <b-card height="125px"> -->
        <b-link href="https://t.me/staminttoken" target="_blank">
          <b-img src="@/assets/images/banners/stamint.png" height="145px" />
        </b-link>
        <!-- </b-card> -->
      </div>
      <div class="d-flex justify-content-center col-4 text-center">
        <b-link href="#" target="_blank">
          <b-card height="125px">
            <b-card-text
              ><h1 class="pt-2">ADVERTISE HERE</h1>
              <!-- <h2>366*146</h2> -->
            </b-card-text>
          </b-card>
        </b-link>
      </div>
      <div class="d-flex justify-content-center col-4 text-center">
        <b-link href="#" target="_blank">
          <b-card>
            <b-card-text
              ><h1 class="pt-2">ADVERTISE HERE</h1>
              <!-- <h2>366*146</h2> -->
            </b-card-text>
          </b-card>
        </b-link>
      </div>
    </b-row>
    <b-row class="banner-margin pt-2" v-else>
      <div class="d-flex justify-content-center mb-2 col-12 text-center">
        <b-link href="https://t.me/staminttoken" target="_blank">
          <b-img src="@/assets/images/banners/stamint.png" height="130px" />
        </b-link>
      </div>
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
        <crypto-table
          :table-data="cryptoDataPromoted"
          :table_name="'pramoted'"
          :total="promoted_total"
        />
      </b-col>
    </b-row>
    <b-row class="match-height mb-1">
      <b-col lg="12">
        <h2>🥇 The most trusted coin</h2>
        <small>The most unique & legit coin today</small>
      </b-col>
    </b-row>
    <b-row class="match-height mb-1">
      <b-col lg="12">
        <crypto-table
          :table-data="cryptoDataTrusted"
          :table_name="'most-trust'"
          :total="1"
        />
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
      <b-tab :title="!is_mobilesize ? '👑 All time best' : '👑 All time'">
        <small
          >Won't get visibility unless voted, so make sure your community knows
          about it.</small
        >
        <b-row class="match-height mt-1">
          <b-col lg="12">
            <crypto-table
              :table-data="cryptoData"
              :table_name="'all-best'"
              :total="all_total"
            />
          </b-col>
        </b-row>
      </b-tab>

      <!-- This tabs content will not be mounted until the tab is shown -->
      <!-- and will be un-mounted when hidden -->
      <b-tab title="🥇 Today's best" lazy>
        <small>Today best perofoming coins</small>
        <b-row class="match-height mt-1">
          <b-col lg="12">
            <crypto-table
              :table-data="cryptoDataTodayBest"
              :table_name="'today-best'"
              :total="best_total"
            />
          </b-col>
        </b-row>
      </b-tab>
      <b-tab :title="!is_mobilesize ? '🔥 Audited coins' : '🔥 Audited'" lazy>
        <small
          >We give 95% assurance to the public that those audited coins are rug
          pull-free and scams will not likely happen. We will keep tracking the
          coins daily and make sure no suspicious activity will occur.</small
        >
        <b-row class="match-height mt-1">
          <b-col lg="12" class="text-center">
            <crypto-table
              :table-data="cryptoDataAuditedCoins"
              :table_name="'audited'"
              :total="audit_total"
            />
            <!-- <h2 class="text-center">We list coins with audit reports in this section if the contract has already been audited from any recognizable firm.</h2>
            <small>Mail to </small> <b>contact@rugfreecoins.com</b> -->
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BSpinner,
  BTabs,
  BTab,
  BLink,
  BImg,
  BCard,
  BCardText,
} from "bootstrap-vue";
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
    BLink,
    BImg,
    BCardText,
    BCard,
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
    best_total() {
      return this.$store.state.crypto.best_total;
    },
    promoted_total() {
      return this.$store.state.crypto.promoted_total;
    },
    audit_total() {
      return this.$store.state.crypto.audit_total;
    },
    all_total() {
      return this.$store.state.crypto.all_total;
    },
    cryptoDataTrusted() {
      return this.$store.state.crypto.cryptoDataTrusted;
    },
  },
  methods: {},
  created() {
    if (!this.$store.state.crypto.clientIP) {
      this.$store.dispatch("FETCH_CLIENT_IP").then(() => {
        this.$store.dispatch("FETCH_CRYPTO_DATA", 20);
        this.$store.dispatch("FETCH_PROMOTED_CRYPTO_DATA", 20);
        this.$store.dispatch("FETCH_TODAY_BEST_CRYPTO_DATA", 20);
        this.$store.dispatch("FETCH_AUDITED_CRYPTO_DATA", 20);
        this.$store.dispatch("FETCH_MOST_TRUST_DATA", 20);
      });
    }
  },
};
</script>
<style>
@media (max-width: 1024px) {
    img {
    border-style: none;
    border-radius: 10px;
  }
}
img {
  border-style: none;
  /* border-radius: 10px; */
}
.banner-margin {
  margin-top: -50px;
}
/* .card-height {
  height: 105px;
  width: 450px;
} */
.card {
  border: none;
  margin-bottom: 2rem;
  border-radius: 0px;
}
[dir] .card-body {
  padding: 1.5rem;
  height: 145px !important;
  width: 364px !important;
}
</style>
