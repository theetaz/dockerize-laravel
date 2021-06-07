<template>
  <b-row class="match-height mb-1">
    <b-col lg="12">
      <div class="row d-flex justify-content-center text-center pb-2">
        <div>
          <h3>💎 Promoted coins</h3>
          <small
            >Only audited coins are listed in the paid promotions
            section.</small
          >
        </div>
      </div>
    </b-col>
    <b-col lg="12">
      <div class="row d-flex justify-content-center text-center">
        <div
          class="col-md-3 pb-2"
          v-for="(promoted, index) in cryptoDataPromoted"
          :key="index"
        >
          <div class="card h-100 pointer">
            <div class="card-body" @click="viewDetails(promoted)">
              <h3 class="mb-0 pb-1">
                {{ promoted.name }}
                <b-badge variant="dark">{{ promoted.symbol }}</b-badge>
              </h3>
              <div>
                <b-avatar rounded size="55" variant="light-company">
                  <b-img-lazy
                    center
                    fluid
                    :src="promoted.logo_link"
                    alt="avatar img"
                /></b-avatar>
              </div>
              <div class="pt-1">
                <p class="card-text">
                  Market cap - $
                  {{ numeral(promoted.actual_market_cap).format("0,0") }}
                </p>
                <p class="card-text">
                  Price - ${{ promoted.actual_price.toFixed(12) }}
                </p>
              </div>

              <b-button
                :variant="isVoted(promoted.is_voted)"
                @click="castVote(promoted)"
                :class="is_mobilesize ? 'button-class' : 'desktop-button'"
              >
                <div v-if="loading && promoted.id == selectId">
                  <b-spinner
                    label="Loading..."
                    class="mr-2 mx-1"
                    style="width: 13px; height: 13px"
                  ></b-spinner>
                </div>
                <div v-else>🚀 {{ promoted.vote_count }}</div>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {
  BButton,
  BSpinner,
  BCol,
  BRow,
  BImgLazy,
  BAvatar,
  BBadge,
} from "bootstrap-vue";
import numeral from "numeral";
import { mixinList } from "@/mixins/mixinList";

export default {
  mixins: [mixinList],
  components: {
    BButton,
    BSpinner,
    BCol,
    BRow,
    BImgLazy,
    BAvatar,
    BBadge,
    // SearchCoin,
  },
  data() {
    return {
      click_vote: false,
      numeral,
      selectId: null,
    };
  },
  computed: {
    loading() {
      return this.$store.state.loaders.loading;
    },
    cryptoDataPromoted() {
      return this.$store.state.crypto.cryptoDataPromoted;
    },
  },
  methods: {
    castVote(coin) {
      this.selectId = coin.id;
      this.click_vote = true;
      const data = {
        coinID: coin.id,
        perPage: 20,
      };
      this.$store.dispatch("CAST_VOTE", data);
    },
    isVoted(isVoted) {
      return isVoted ? "success" : "outline-success";
    },
    viewDetails(coin) {
      if (!this.click_vote) {
        this.$router.push({
          path: `/details/${coin.id}`,
          params: {
            id: coin.id,
          },
        });
      }
    },
  },
};
</script>
<style>
.pointer {
    cursor: pointer;
}
</style>