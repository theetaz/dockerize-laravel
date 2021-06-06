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
    <!-- <b-row class="banner-margin pt-3" v-if="!is_mobilesize">
      <div class="d-flex justify-content-center mb-3  col-4 text-center">
        <b-card>
          <b-card-text><h1>POST YOUR ADD HERE</h1>
          <h2>366*146</h2> </b-card-text>
        </b-card>
      </div>
      <div class="d-flex justify-content-center mb-3 col-4 text-center">
        <b-card>
          <b-card-text><h1>POST YOUR ADD HERE</h1>
          <h2>366*146</h2> </b-card-text>
        </b-card>
      </div>
      <div class="d-flex justify-content-center mb-3 col-4 text-center">
        <b-card>
          <b-card-text><h1>POST YOUR ADD HERE</h1>
          <h2>366*146</h2> </b-card-text>
        </b-card>
      </div>
    </b-row>
    <b-row class="banner-margin pt-1" v-else>
      <div class="d-flex justify-content-center col-12 text-center">
        <b-card>
          <b-card-text><h2>POST YOUR ADD </h2>
          <h2>366*146</h2> </b-card-text>
        </b-card>
      </div>
      
    </b-row> -->
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
          :table-data="most_trusted"
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
  // BCard,
  BImg,
  // BCardText,
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
    // BCardText,
    // BCard,
  },
  data() {
    return {
      loading: false,
      most_trusted: [
        {
          actual_market_cap: 334971,
          actual_price: 0.00000481122,
          bsc_contract_address: "0xee40498eb660383722d7cc07b4bce40d9e51a13f",
          created_at: "2021-05-31T18:06:01.000000Z",
          description:
            "QFT is designed to create an artist-pr,omoter-fan network and functionality. Open to everyone (color, orientation, gender, belief, culture). Ultimately, it will become the driving force (asset) behind SOS. Artists (musicians, performing artists, painters, sculptors, photographers, videographers, graphics designers, etc) who qualify (eligibility factors to be further established) can receive a certain amount of tokens, with which they can use to access events, services, deals, promotion, distribution, possibly even booking/touring support. A lot of the artist - promoter networking will happen within the Queef app/web ecosystem. Music/art publishers, bioggers, booking agents, galleries, record companies would receive QFT to provide services to QFT holders. Fundraisers, NFT Art auctions, etc, can be purchased and held in OFT. Bands can also agree to sell their art, merchandise, tickets, etc in QFT as well as FIAT. Encourage fans to tip artists in QFT during their performances, or as they are streaming their music on different platforms (Spotify, YouTube, etc). If not, we could develop a plug-in. When a user is playing a song in Spotify, the plugin would get the name of the artist and the song name, then allow the user to send a tip directly to, artist's wallet with a tap of a button, maybe accompanied with a message. Fans could get backstage passes and vip access during shows, special content, etc. Fans could reap rewards when holding QFT, tipping and purchasing items/art, and possibly win VIP/backstage access tickets to shows, festivals, coupons for associated retailers, or simply - OFT. Artists (musicians, performing artists, painters, sculptors, photographers, videographers, graphics designers, etc) who qualify (eligibility factors to be further established) can receive a certain amount of tokens, with which they can use to access events, services, deals, promotion, distribution, possibly even booking/touring support. A lot of the artist - promoter networking will happen within the Queef app/web ecosystem. Music/art publishers, bloggers, booking agents, galleries, record companies would receive QFT to provide services to QFT holders. Fundraisers, NFT Art auctions, etc, can be purchased and held in QFT. Bands can also agree to sell their art, merchandise, tickets, etc in QFT as well as FIAT. Encourage fans to tip artists in QFT during their performances, or as they are streaming their music on different platforms (Spotify, YouTube, etc). If not, we could develop a plug-in. When a user is playing a song in Spotify, the plugin would get the name of the artist and the song name, then allow the user to send a tip directly to artists wallet with a tap of a button, maybe accompanied with a message. Fans could get backstage passes and vip access during shows, special content, etc. Fans could reap rewards when holding QFT, tipping and purchasing items/art, and possibly win VIP/backstage access tickets to shows, festivals, coupons for associated retailers, or simply - QFT.",
          discord_link: "https://discord.gg/2Tqfj75m",
          ethereum_contract_address: null,
          id: 107,
          is_audited: 1,
          is_editor_picked: 0,
          is_promoted: 1,
          is_voted: false,
          logo_link:
            "https://pbs.twimg.com/profile_images/1398451923922178053/acxbktle_400x400.jpg",
          name: "Queef Token",
          network: null,
          other_links: null,
          pancake_swap_link: null,
          reddit_link: "https://www.reddit.com/r/Queef_Token/",
          release_date: "2021-05-27T00:00:00.000000Z",
          remarks: null,
          status: "active",
          symbol: "QFT",
          telegram_link: "https://t.me/queef_token",
          twitter_link: "https://twitter.com/Queef_Token",
          updated_at: "2021-06-06T08:39:29.000000Z",
          user_id: 387,
          vote_count: 2643,
          website: "http://queeftoken.com/",
        },
      ],
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
  },
  methods: {},
  created() {
    if (!this.$store.state.crypto.clientIP) {
      this.$store.dispatch("FETCH_CLIENT_IP").then(() => {
        this.$store.dispatch("FETCH_CRYPTO_DATA", 20);
        this.$store.dispatch("FETCH_PROMOTED_CRYPTO_DATA", 20);
        this.$store.dispatch("FETCH_TODAY_BEST_CRYPTO_DATA", 20);
        this.$store.dispatch("FETCH_AUDITED_CRYPTO_DATA", 20);
      });
    }
  },
};
</script>
<style>
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
</style>
