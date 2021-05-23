<template>
  <b-card no-body class="border-primary">
    <b-card-header
      class="d-flex justify-content-between align-items-center pt-75 pb-25"
    >
      <h5 class="mb-0">
        {{ coinData.name }}
      </h5>
      <b-badge variant="light-primary">
        {{ coinData.symbol }}
      </b-badge>
    </b-card-header>

    <b-card-body>
      <div class="d-flex align-items-center mt-2">
        <div class="d-flex align-items-center mr-2">
          <b-avatar variant="light-primary" rounded>
            <feather-icon icon="DollarSignIcon" size="18" />
          </b-avatar>
          <div class="ml-1">
            <h5 class="mb-0">
              $ {{ numeral(coinData.actual_market_cap).format("0,0") }}
            </h5>
            <small>Market Cap</small>
          </div>
        </div>

        <div class="d-flex align-items-center">
          <b-avatar variant="light-success" rounded>
            <feather-icon icon="TrendingUpIcon" size="18" />
          </b-avatar>
          <div class="ml-1">
            <h5 class="mb-0">
              {{ "$" + numeral(coinData.actual_price).format("0,0.000000") }}
            </h5>
            <small>Price</small>
          </div>
        </div>
      </div>

      <div class="mt-1" v-show="coinData.website">
        <b-button
          :href="coinData.website"
          target="_blank"
          block
          variant="gradient-primary"
        >
          <feather-icon icon="LinkIcon" class="mr-50" />
          <span class="align-middle">Website</span>
        </b-button>
      </div>

      <div class="mt-1" v-show="coinData.telegram_link">
        <b-button
          :href="coinData.telegram_link"
          target="_blank"
          block
          variant="gradient-primary"
        >
          <feather-icon icon="ActivityIcon" class="mr-50" />
          <span class="align-middle">Telegram</span>
        </b-button>
      </div>

      <div class="mt-1" v-show="coinData.twitter_link">
        <b-button
          :href="coinData.twitter_link"
          target="_blank"
          block
          variant="gradient-primary"
        >
          <feather-icon icon="TwitterIcon" class="mr-50" />
          <span class="align-middle">Twitter</span>
        </b-button>
      </div>

      <div class="mt-1" v-show="coinData.reddit_link">
        <b-button
          :href="coinData.reddit_link"
          target="_blank"
          block
          variant="gradient-primary"
        >
          <feather-icon icon="HashIcon" class="mr-50" />
          <span class="align-middle">Reddit</span>
        </b-button>
      </div>

      <div class="mt-1" v-show="coinData.discord_link">
        <b-button
          :href="coinData.discord_link"
          target="_blank"
          block
          variant="gradient-primary"
        >
          <feather-icon icon="PhoneCallIcon" class="mr-50" />
          <span class="align-middle">Discord</span>
        </b-button>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardBody,
  BBadge,
  BAvatar,
  BButton
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import numeral from "numeral";

export default {
  directives: {
    Ripple
  },
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BBadge,
    BAvatar,
    BButton
  },
  props: {
    coinData: {
      type: null,
      required: false
    }
  },
  data() {
    return {
      numeral
    };
  }
};
</script>

<style></style>
