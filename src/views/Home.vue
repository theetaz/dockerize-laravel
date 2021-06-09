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
      <div class="d-flex justify-content-center mb-3 col-12 text-center">
        <!-- <b-link href="http://bit.ly/eject-elon" target="_blank">
          <b-img
            src="@/assets/images/banners/eject-promo.gif"
            :height="is_mobilesize ? '38px' : '105px'"
          />
        </b-link> -->
        <b-carousel id="carousel-interval" :interval="4000">
          <b-link href="http://bit.ly/eject-elon" target="_blank">
            <b-carousel-slide
              :img-src="require('@/assets/images/banners/eject-promo.gif')"
            />
          </b-link>
        </b-carousel>
      </div>
    </b-row>
    <!-- <swiper :options="swiperOptions" v-if="!is_mobilesize">
      <swiper-slide>
        <b-link href="https://bit.ly/3cp4IU9" target="_blank">
          <b-img src="@/assets/images/banners/stamint.png" class="corosole" />
        </b-link>
      </swiper-slide>
      <swiper-slide>
        <b-link href="https://bit.ly/3z1vxHH" target="_blank">
          <b-img src="@/assets/images/banners/karen.png" class="corosole" />
        </b-link>
      </swiper-slide>
      <swiper-slide>
        <b-link href="https://bit.ly/2T6QvUN" target="_blank">
          <b-img src="@/assets/images/banners/bnbs.gif" class="corosole" />
        </b-link>
      </swiper-slide>
    </swiper> -->
    <!-- <Carousel /> -->
    <b-row class="banner-margin pt-3 pb-3" v-if="!is_mobilesize">
      <div class="d-flex justify-content-center col-4 text-center">
        <b-link href="https://bit.ly/3z1vxHH" target="_blank">
          <b-img src="@/assets/images/banners/karen.png" class="corosoleDesktop" />
        </b-link>
      </div>

      <div class="d-flex justify-content-center col-4 text-center">
        <b-link href="https://bit.ly/2T6QvUN" target="_blank">
          <b-img src="@/assets/images/banners/bnbs.gif" class="corosoleDesktop" />
        </b-link>
      </div>
      <div class="d-flex justify-content-center col-4 text-center pl-3">
        <b-link href="#" target="_blank">
          <b-img src="@/assets/images/banners/your-ad-here.jpg" height="140px" />
        </b-link>
      </div>
    </b-row>
    <b-row class="banner-margin pt-2 pb-2" v-else>
      <div class="d-flex justify-content-center mb-1 col-12 text-center">
        <b-carousel id="carousel-interval" :interval="4000" class="corosole">
          <b-link href="https://bit.ly/3z1vxHH" target="_blank">
            <b-carousel-slide
              class="corosole"
              :img-src="require('@/assets/images/banners/karen.png')"
            />
          </b-link>
          <b-link href="https://bit.ly/2T6QvUN" target="_blank">
            <b-carousel-slide
              class="corosole"
              :img-src="require('@/assets/images/banners/bnbs.gif')"
            />
          </b-link>
          <!-- <b-link href="https://bit.ly/2T6QvUN" target="_blank">
            <b-carousel-slide
              :img-src="require('@/assets/images/banners/bnb2.png')"
            />
          </b-link> -->
        </b-carousel>
      </div>
    </b-row>
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

    <!-- <b-tabs content-class="mt-1"> -->
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
  BCarousel,
  BCarouselSlide,
  // BCard,
  // BCardText,
} from "bootstrap-vue";
// import Carousel from "@core/components/carousel/Carousel.vue";
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
    BCarousel,
    BCarouselSlide,
    // BCardText,
    // BCard,
  },
  data() {
    return {
      loading: false,
      // swiperOptions: {
      //   slidesPerView: 3,
      //   spaceBetween: 50,
      //   freeMode: true,
      //   loop: true,
      //   navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev",
      //   },
      //   // autoplay: {
      //   //   delay: 2500,
      //   //   disableOnInteraction: false,
      //   // },
      // },
    };
  },
  mounted() {},
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
.swiper-slide {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.swiper-container {
  height: 450px;
  width: 100%;
}
.cards-body {
  padding: 1.5rem;
  height: 145px !important;
  width: 364px !important;
}
/* .d-block {
  display: inline-block !important;
} */
.b-carousel {
  height: "140px" !important;
}
@media (max-width: 1024px) {
  .img-fluid {
    max-width: 100% !important;
  }
}
.corosole {
  height: 135px !important;
  width: 350px !important;
}
.corosoleDesktop {
  height: 150px !important;
  width: 390px !important;
  border-radius: 10px;
}
.testing {
  height: 100px;
  width: 100px;
}
@media (min-width: 1024px) {
  .nav-tabs .nav-link {
    font-weight: 600;
    font-size: large;
  }
}
</style>
