<template>
  <div>
    <b-row v-if="api_loading" class="match-height">
      <b-col lg="12">
        <div class="d-flex justify-content-center mb-3 col-12 text-center">
          <b-spinner variant="primary" label="Loading..."></b-spinner>
        </div>
      </b-col>
    </b-row>

    <swap-carousel />
    <b-tabs content-class="mt-1">
      <b-tab
        class="tab-class"
        :title="!is_mobilesize ? '💎 Promoted coins' : '💎 Promoted'"
      >
        <small
          >Only audited coins are listed in the paid promotions section.</small
        >
        <b-row class="match-height mt-1">
          <b-col lg="12">
            <crypto-table
              :table-data="cryptoDataPromoted"
              :table_name="'pramoted'"
              :total="promoted_total"
            />
          </b-col>
        </b-row>
      </b-tab>
      <b-tab
        class="tab-class"
        :title="!is_mobilesize ? '🎉 Upcoming Gems' : '🎉 Upcoming'"
        lazy
      >
        <small
          >Only scanned projects are listed in the upcoming gems section</small
        >
        <b-row class="match-height mb-1">
          <b-col lg="12" class="text-center">
            <h2 class="text-center">For upcoming launches</h2>
            <small>Mail to </small> <b>contact@rugfreecoins.com</b>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
    <b-row class="match-height mb-1">
      <b-col lg="12">
        <h3>🥇 The most trusted coin</h3>
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

    <!-- This tabs content will always be mounted -->
    <b-tabs content-class="mt-1">
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
    <ul class="social-networks spin-icon">
      <li>
        <a
          href="https://twitter.com/rugfreecoins"
          class="icon-twitter"
          target="_blank"
          title="Join us on Twitter"
          >Twitter</a
        >
      </li>
    </ul>
    <!-- <div class="translucent-wrap bg-primary rounded-bottom p-1"> -->
    <div class="d-flex justify-content-left text-center">
      <b-toast v-model="visible" static no-auto-hide>
        <template #toast-title>
          <div class="d-flex align-items-center  test-toast">
            <strong class="mr-auto"
              >We are looking for grow our marketing team. Contact live chat if
              iterested 🙏</strong
            >
          </div>
        </template>
      </b-toast>
    </div>
  </div>
</template>

<script>
import { BRow, BCol, BSpinner, BTabs, BTab, BToast } from "bootstrap-vue";
// import Carousel from "@core/components/carousel/Carousel.vue";
import CryptoTable from "../views/crypto/CryptoTable";
import { mixinList } from "@/mixins/mixinList";
import SwapCarousel from "@/@core/components/carousel/SwapCarousel.vue";

export default {
  mixins: [mixinList],
  components: {
    BRow,
    BCol,
    BSpinner,
    CryptoTable,
    BTabs,
    BTab,
    SwapCarousel,
    BToast,
  },
  data() {
    return {
      loading: false,
      visible: true,
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
.b-toast .toast-header {
    background-color: #0057b1 !important;
    width: 831px !important;
    font-size: large !important;
    border-radius: 10px !important;
}
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
.card {
  border: none;
  margin-bottom: 2rem;
  border-radius: 0px;
}

@media (max-width: 1024px) {
  .img-fluid {
    max-width: 100% !important;
  }
}
@media (min-width: 1024px) {
  .nav-tabs .nav-link {
    font-weight: 600;
    font-size: large;
  }
}
</style>
<style lang="scss" scoped>


// .test-toast {
//   background-color: #007af9 !important;
//     width: 831px !important;
//     font-size: large !important;
//     border-radius: 10px !important;
// }
.translucent-wrap {
  height: 110px;
  position: relative;
}
@font-face {
  font-family: "icomoon";
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/93/icomoon.eot?3qkin2");
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/93/icomoon.eot?#iefix3qkin2")
      format("embedded-opentype"),
    url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/93/icomoon.woff?3qkin2")
      format("woff"),
    url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/93/icomoon.ttf?3qkin2")
      format("truetype"),
    url("fhttps://s3-us-west-2.amazonaws.com/s.cdpn.io/93/icomoon.svg?3qkin2#icomoon")
      format("svg");
  font-weight: normal;
  font-style: normal;
}

.social-networks {
  margin: 0 0 35px;
  padding: 0;
  font-size: 0;
  text-align: center;

  li {
    display: inline-block;
  }

  a {
    display: block;
    position: relative;
    margin: 0 7px;
    width: 68px;
    height: 68px;
    font-size: 0;
    line-height: 0;
    text-align: center;
    text-decoration: none;

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      margin-top: -50%;
      margin-left: -50%;
      border-radius: 100px;
      background-color: #1f2027;
      transition: all 400ms;
    }

    &:after {
      position: relative;
      display: block;
      font-family: "icomoon";
      speak: none;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      color: #fff;
      font-size: 26px;
      line-height: 66px;
    }

    &:hover,
    &:focus {
      text-decoration: none;
    }
  }

  &.spin-icon a:hover:after,
  &.spin-icon a:focus:after {
    transition: transform 0.4s ease-out;
    transform: rotateZ(360deg);
  }

  &.square a:hover:before,
  &.square a:focus:before {
    border-radius: 0;
  }

  &.bounce a:hover,
  &.bounce a:focus {
    animation: bounce 1s;
  }

  $networks: linkedin "\eac9"#0077b5, facebook "\e603"#3b5998,
    twitter "\e618"#00b0ed, github "\eab1"#4183c4, instagram "\e604"#3f729b,
    vimeo "\ea9c"#1ab7ea, twitch "\ea9b"#6441a5, pinterest "\e605"#cc2127;

  @each $network in $networks {
    .icon-#{nth($network, 1)} {
      &:after {
        content: "#{nth($network, 2)}";
      }

      &:hover:before,
      &:focus:before {
        background: nth($network, 3);
      }
    }
  }
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40% {
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -6px, 0);
  }

  70% {
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -4px, 0);
  }

  90% {
    transform: translate3d(0, -2px, 0);
  }
}

/* Extra stuff just to make the demo pretty. */
body {
  padding: 35px 0;
  color: #fff;
  font-family: "Lora", serif;
  font-size: 14px;
  text-align: center;
  line-height: 24px;
  background: #262730
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/93/noise-bg.png) repeat 0 0;
}

h1 {
  margin-bottom: 0px;
  font-size: 55px;
  line-height: 1;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin-bottom: 45px;
  font-size: 12px;
  text-transform: uppercase;
}

footer {
  margin: 75px 0 35px;
}

a {
  color: #4183c4;
  text-decoration: none;

  &:hover {
    color: lighten(#4183c4, 15%);
  }
}
</style>