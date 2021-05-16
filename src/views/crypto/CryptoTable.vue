<template>
  <b-card v-if="tableData" no-body class="card-company-table">
    <b-table
      id="table-crypto"
      hover
      :items="tableData"
      responsive
      :fields="fields"
      class="mb-0"
      @row-clicked="viewDetails"
    >
      <!-- company -->
      <template #cell(name)="data">
        <div class="d-flex align-items-center">
          <b-avatar rounded size="45" variant="light-company">
            <b-img-lazy center fluid :src="data.item.logo_link" alt="avatar img"
          /></b-avatar>
          <div>
            <div class="font-weight-bolder pl-1">{{ data.item.name }}</div>
            <div class="font-small-2 text-muted pl-1">
              {{ data.item.symbol }}
            </div>
          </div>
        </div>
      </template>

      <!-- actual_market_cap -->
      <template #cell(actual_market_cap)="data">
        <div class="d-flex align-items-center">
          <!-- <b-avatar class="mr-1" :variant="data.item.avatarColor">
            <feather-icon size="18" :icon="data.item.avatarIcon" />
          </b-avatar> -->
          <span class="font-weight-bolder">
            $ {{ numeral(data.item.actual_market_cap).format("0,0") }}</span
          >
        </div>
      </template>

      <!-- release_date -->
      <template #cell(release_date)="data">
        <div class="d-flex flex-column">
          <span class="font-weight-bolder mb-25">{{
            data.item.release_date | diffForHumans
          }}</span>
        </div>
      </template>

      <!-- actual_price -->
      <template #cell(actual_price)="data">
        <span class="font-weight-bolder">{{
          "$" + numeral(data.item.actual_price).format("0,0.000000")
        }}</span>
      </template>

      <!-- vote_count -->
      <template #cell(vote_count)="data">
        <div class="d-flex align-items-center">
          <b-button :variant="isVoted(data.item)" @click="castVote(data.item)">
            🚀 {{ data.item.vote_count }}
          </b-button>
        </div>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import { BCard, BTable, BAvatar, BImgLazy, BButton } from "bootstrap-vue";
import numeral from "numeral";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//import router from "@/router";

export default {
  components: {
    BCard,
    BTable,
    BAvatar,
    BImgLazy,
    BButton
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      transProps: {
        // Transition name
        name: "flip-list"
      },
      numeral,
      dayjs,
      relativeTime,
      fields: [
        { key: "name", label: "NAME" },
        { key: "actual_market_cap", label: "MARKET CAP" },
        { key: "release_date", label: "RELEASED" },
        { key: "actual_price", label: "PRICE" },
        { key: "vote_count", label: "VOTES" }
      ]
    };
  },
  created() {
    this.dayjs.extend(relativeTime);
  },
  methods: {
    castVote(coin) {
      this.$store.dispatch("CAST_VOTE", coin.id);
    },
    isVoted(coin) {
      return coin.votes.length > 0 ? "success" : "outline-success";
    },
    viewDetails(coin) {
      this.$router.push({
        path: `/details/${coin.bsc_contract_address}`,
        params: {
          id: coin.id
        }
      });
    }
  },
  filters: {
    diffForHumans: (date) => {
      if (!date) {
        return null;
      }

      return dayjs(date).fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/bootstrap-extended/include";
@import "~@core/scss/base/components/variables-dark";

.card-company-table ::v-deep td .b-avatar.badge-light-company {
  .dark-layout & {
    background: $theme-dark-body-bg !important;
  }
}
table#table-crypto .flip-list-move {
  transition: transform 1s;
}
</style>
