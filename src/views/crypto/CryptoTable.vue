<template>
  <b-card v-if="tableData" no-body class="card-company-table">
    <b-progress
      v-if="loading"
      :max="max"
      height="3px"
      :striped="true"
      :animated="true"
    >
      <b-progress-bar :value="value" variant="primary"> </b-progress-bar>
    </b-progress>
    
    <b-table
      id="table-crypto"
      hover
      :items="tableData"
      responsive
      :fields="!is_mobilesize ? fields : fields_mobile"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      class="mb-0"
      :tbody-transition-props="transProps"
      primary-key="id"
      @row-clicked="viewDetails"
    >
      <!-- company -->
      <template #cell(name)="data">
        <div class="d-flex align-items-center">
          <b-avatar rounded size="45" variant="light-company">
            <b-img-lazy center fluid :src="data.item.logo_link" alt="avatar img"
          /></b-avatar>
          <div>
            <div class="font-weight-bolder pl-1">{{ !is_mobilesize ? data.item.name:data.item.name.slice(0, 8) + ".." }}</div>
            <div class="font-small-2 text-muted pl-1">
              {{ !is_mobilesize ? data.item.symbol:data.item.symbol.slice(0, 8) + ".." }}
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
        <span class="font-weight-bolder"
          >{{ "$" + data.item.actual_price.toFixed(12) }}
        </span>
      </template>

      <!-- vote_count -->
      <template #cell(vote_count)="data">
        <div class="d-flex align-items-center">
          <b-button
            :variant="isVoted(data.item.is_voted)"
            @click="castVote(data.item)"
            :class="is_mobilesize ? 'button-class' : ''"
          >
            <div v-if="loading && data.item.id == selectId">
              <b-spinner
                label="Loading..."
                class="mr-2 mx-1"
                style="width: 13px; height: 13px"
              ></b-spinner>
            </div>
            <div v-else>🚀 {{ data.item.vote_count }}</div>
          </b-button>
        </div>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import { mixinList } from "@/mixins/mixinList";
import {
  BCard,
  BTable,
  BAvatar,
  BImgLazy,
  BButton,
  BSpinner,
  BProgress,
  BProgressBar
} from "bootstrap-vue";
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
    BButton,
    BSpinner,
    BProgress,
    BProgressBar
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  mixins: [mixinList],
  data() {
    return {
      transProps: {
        // Transition name
        name: "flip-list"
      },
      numeral,
      dayjs,
      relativeTime,
      sortBy: "vote_count",
      sortDesc: true,
      fields: [
        { key: "name", label: "NAME" },
        { key: "actual_market_cap", label: "MARKET CAP" },
        { key: "release_date", label: "RELEASED" },
        { key: "actual_price", label: "PRICE" },
        { key: "vote_count", label: "VOTES" }
      ],
      fields_mobile: [
        { key: "name", label: "NAME" },
        // { key: "actual_market_cap", label: "MARKET CAP" },
        // { key: "release_date", label: "RELEASED" },
        { key: "actual_price", label: "PRICE" },
        { key: "vote_count", label: "VOTES" }
      ],
      selectId: null,
      value: 0,
      max: 100,
      windowHeight: window.innerWidth
    };
  },
  watch: {
    loading(e) {
      if (e) {
        this.startTimer();
      }
    }
  },
  created() {
    this.dayjs.extend(relativeTime);
  },
  computed: {
    loading() {
      return this.$store.state.loaders.loading;
    }
  },
  methods: {
    startTimer() {
      let vm = this;
      let timer = setInterval(function() {
        vm.value += 20;
        if (vm.value >= 100) clearInterval(timer);
      }, 100);
    },
    castVote(coin) {
      this.selectId = coin.id;
      this.$store.dispatch("CAST_VOTE", coin.id);
    },
    isVoted(isVoted) {
      return isVoted ? "success" : "outline-success";
    },
    viewDetails(coin) {
      this.$router.push({
        path: `/details/${coin.id}`,
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

[dir] .table th,
[dir] .table td {
  padding: 0.72rem 0rem;
}
.button-class {
  margin: 0;
  width: 70px;
}
</style>
