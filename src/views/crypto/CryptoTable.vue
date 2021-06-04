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
    <b-row v-if="table_name != 'pramoted'" align-h="end">
      <b-col md="3">
        <b-input-group size="sm">
          <b-form-input
            id="filterInput"
            v-model="filter"
            type="search"
            placeholder="Search your coin"
          />
        </b-input-group>
      </b-col>
    </b-row>

    <b-table
      :filter="filter"
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
      empty-filter-text="asd2"
    >
      <!-- company -->
      <template #cell(no)="data">
        <span class="pl-1">
          {{ data.index + 1 }}
        </span>
      </template>
      <template #cell(name)="data">
        <div class="d-flex align-items-center">
          <b-avatar rounded size="45" variant="light-company">
            <b-img-lazy
              center
              fluid
              :src="data.item.logo_link"
              alt="avatar img"
          /></b-avatar>
          <div>
            <div class="font-weight-bolder pl-1">
              {{
                !is_mobilesize
                  ? data.item.name
                  : data.item.name.slice(0, 8) + ".."
              }}
            </div>
            <div class="font-small-2 text-muted pl-1" v-if="!is_mobilesize">
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
    <div
      class="text-center pb-1"
      v-if="!is_show_pagination && total > per_page"
    >
      <b-button
        v-if="!loading"
        v-ripple.400="'rgba(186, 191, 199, 0.15)'"
        variant="flat-secondary"
        @click="changePagination"
        class="font-weight-bolder"
      >
        See More
      </b-button>
      <b-spinner
        v-else
        label="Loading..."
        class="mr-2 mx-1"
        style="width: 13px; height: 13px"
      ></b-spinner>
    </div>
  </b-card>
</template>

<script>
import { mixinList } from "@/mixins/mixinList";
import Ripple from "vue-ripple-directive";
// import SearchCoin from "./SearchCoin"
import {
  BCard,
  BTable,
  BAvatar,
  BImgLazy,
  BButton,
  BSpinner,
  BProgress,
  BProgressBar,
  BFormInput,
  BCol,
  BRow,
  BInputGroup,
} from "bootstrap-vue";
import numeral from "numeral";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default {
  components: {
    BCard,
    BTable,
    BAvatar,
    BImgLazy,
    BButton,
    BSpinner,
    BProgress,
    BProgressBar,
    BFormInput,
    BCol,
    BRow,
    BInputGroup,
    // SearchCoin,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    table_name: {
      type: String,
    },
    total: {
      type: Number,
    },
  },
  directives: {
    Ripple,
  },
  mixins: [mixinList],
  data() {
    return {
      per_page: 20,
      is_show_pagination: false,
      transProps: {
        // Transition name
        name: "flip-list",
      },
      numeral,
      dayjs,
      relativeTime,
      sortBy: "vote_count",
      sortDesc: true,
      fields: [
        { key: "no", label: "NO" },
        { key: "name", label: "NAME" },
        { key: "actual_market_cap", label: "MARKET CAP" },
        { key: "release_date", label: "RELEASED" },
        { key: "actual_price", label: "PRICE" },
        { key: "vote_count", label: "VOTES" },
      ],
      fields_mobile: [
        { key: "no", label: "NO" },
        { key: "name", label: "NAME" },
        { key: "actual_market_cap", label: "MARKET CAP" },
        // { key: "release_date", label: "RELEASED" },
        // { key: "actual_price", label: "PRICE" },
        { key: "vote_count", label: "VOTES" },
      ],
      selectId: null,
      value: 0,
      max: 100,
      windowHeight: window.innerWidth,
      filter: null,
    };
  },
  watch: {},
  created() {
    this.dayjs.extend(relativeTime);
  },
  computed: {
    loading() {
      return this.$store.state.loaders.loading;
    },
  },
  methods: {
    changePagination() {
      this.per_page = this.per_page + 20;
      if (this.table_name == "all-best") {
        this.$store.dispatch("FETCH_CRYPTO_DATA", this.per_page);
      } else if (this.table_name == "today-best") {
        this.$store.dispatch("FETCH_TODAY_BEST_CRYPTO_DATA", this.per_page);
      } else if (this.table_name == "audited") {
        this.$store.dispatch("FETCH_AUDITED_CRYPTO_DATA", this.per_page);
      } else if (this.table_name == "pramoted") {
        this.$store.dispatch("FETCH_PROMOTED_CRYPTO_DATA", this.per_page);
      }
    },
    startTimer() {
      let vm = this;
      let timer = setInterval(function () {
        vm.value += 20;
        if (vm.value >= 100) clearInterval(timer);
      }, 100);
    },
    castVote(coin) {
      this.selectId = coin.id;
      const data = {
        coinID: coin.id,
        perPage: this.per_page,
      };
      this.$store.dispatch("CAST_VOTE", data);
    },
    isVoted(isVoted) {
      return isVoted ? "success" : "outline-success";
    },
    viewDetails(coin) {
      this.$router.push({
        path: `/details/${coin.id}`,
        params: {
          id: coin.id,
        },
      });
    },
  },
  filters: {
    diffForHumans: (date) => {
      if (!date) {
        return null;
      }

      return dayjs(date).fromNow();
    },
  },
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
  width: 75px;
}
.row-background {
  background-color: #f1f1f1;
}
</style>
