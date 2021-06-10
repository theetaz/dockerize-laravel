<template>
  <b-card>
    <b-row>
      <!-- User Info: Left col -->
      <b-col
        cols="12"
        xl="12"
        class="d-flex justify-content-between flex-column"
      >
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :src="coinData.logo_link"
            :text="coinData.name"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h3 class="mb-0">
                {{ coinData.name }}
                <b-badge variant="dark">{{ coinData.symbol }}</b-badge>
              </h3>
              <div
                class="mt-1"
                :class="!is_mobilesize ? 'col-5' : 'col-8'"
                v-show="coinData.is_audited == 1"
              >
                <b-button
                  v-if="coinData.report_link != null"
                  :href="coinData.report_link"
                  target="_blank"
                  block
                  variant="info gradient"
                  size="sm"
                >
                  <feather-icon icon="BookIcon" class="mr-50" />
                  <span class="align-middle">Report</span>
                </b-button>
                <div v-else class="d-flex align-items-center">
                  <b-badge variant="secondary">Audit report pending</b-badge>
                  <!-- <span>Audit report pending</span> -->
                </div>
              </div>
              <div class="card-text pt-1" v-if="!is_mobilesize">
                <small>What is {{ coinData.name }} ?</small><br />
                {{ coinData.description }}
              </div>
            </div>
          </div>
        </div>
        <div class="card-text pt-1" v-if="is_mobilesize">
          <small>What is {{ coinData.name }} ?</small><br />
          {{ coinData.description }}
        </div>
      </b-col>
    </b-row>

    <b-row v-if="coinData.bsc_contract_address != null">
      <b-col cols="10" xl="10">
        <div class="mt-1">
          <div class="m-0">
            <small>BSC contract address</small>
            <div class="mr-1">
              <b-input-group>
                <b-input-group-prepend is-text>
                  <feather-icon icon="PackageIcon" />
                </b-input-group-prepend>
                <b-form-input
                  placeholder="Binance Smart Chain Contract"
                  :value="coinData.bsc_contract_address"
                />
              </b-input-group>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="2" xl="2" class="mt-1">
        <b-avatar variant="light-primary" rounded class="pointer mt-2">
          <feather-icon
            icon="CopyIcon"
            size="18"
            @click="doCopy(coinData.bsc_contract_address, 'bsc')"
          />
        </b-avatar>
      </b-col>
    </b-row>
    <b-row v-if="coinData.ethereum_contract_address != null">
      <b-col cols="10" xl="10">
        <!-- User Stats -->
        <div class="mt-1">
          <div class="m-0">
            <small>Ethereum contract address</small>
            <div class="mr-1">
              <b-input-group>
                <b-input-group-prepend is-text>
                  <feather-icon icon="PackageIcon" />
                </b-input-group-prepend>
                <b-form-input
                  placeholder=" Ethereum contract address"
                  :value="coinData.ethereum_contract_address"
                />
              </b-input-group>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="2" xl="2" class="mt-1">
        <b-avatar variant="light-primary" rounded class="pointer mt-2">
          <feather-icon
            icon="CopyIcon"
            size="18"
            @click="doCopy(coinData.bsc_contract_address, 'etn')"
          />
        </b-avatar>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="pt-2">
        <h3 class="mb-0">
          Status :
          <b-badge variant="success" class="coin-status">{{
            coinData.status
          }}</b-badge>
        </h3>
      </b-col>
      <b-col class="pt-2">
        <h3 class="mb-0">
          Total votes :
          <b-badge variant="success" class="coin-status">{{
            coinData.vote_count
          }}</b-badge>
        </h3>
      </b-col>
    </b-row>
    <b-row>
      <b-card-body>
        <div class="mt-1" v-if="!coinData.is_voted">
          <div class="d-flex justify-content-center col-12 text-center">
            <b-button
              variant="outline-success"
              @click="castVote(coinData.id)"
              :class="is_mobilesize ? 'button-class' : 'desktop-button'"
            >
              <div v-if="loading">
                <b-spinner
                  label="Loading..."
                  class="mr-2 mx-1"
                  style="width: 13px; height: 13px"
                ></b-spinner>
              </div>
              <div v-else>
                🔥
                <span class="align-middle"
                  >Vote for
                  <b-badge variant="dark">{{ coinData.symbol }}</b-badge></span
                >
              </div>
            </b-button>
          </div>
        </div>
      </b-card-body>
    </b-row>
  </b-card>
</template>

<script>
import { mixinList } from "@/mixins/mixinList";
import {
  BCard,
  BAvatar,
  BRow,
  BCol,
  BBadge,
  BInputGroup,
  BFormInput,
  BInputGroupPrepend,
  BButton,
  BCardBody,
  BSpinner,
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  mixins: [mixinList],
  components: {
    // ToastificationContent,
    BCard,
    BRow,
    BCol,
    BAvatar,
    BBadge,
    BInputGroup,
    BFormInput,
    BInputGroupPrepend,
    BButton,
    BCardBody,
    BSpinner,
  },
  props: {
    coinData: {
      type: null,
      required: false,
    },
  },
  computed: {
    loading() {
      return this.$store.state.loaders.loading;
    },
  },
  methods: {
    doCopy(value, name) {
      navigator.clipboard.writeText(value).then(
        () => {
          if (name == "bsc") {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "BSC contract address copied",
                icon: "BellIcon",
              },
            });
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: " Ethereum contract address copied",
                icon: "BellIcon",
              },
            });
          }
        },
        (e) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: e + "Can not copy!",
              icon: "BellIcon",
            },
          });
        }
      );
    },
    castVote(coinId) {
      const data = {
        coinID: coinId,
        perPage: 20,
      };

      this.$store
        .dispatch("CAST_VOTE", data)
        .then((response) => {
          if (response.status == 201) {
            // this.callApiAgain();
          }
        })
        .catch((error) => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: "Notification",
                icon: "InfoIcon",
                text: error.response.data.message || "Something went wrong",
                variant: "warning",
              },
            },
            {
              position: "bottom-left",
            }
          );
        });
    },
    callApiAgain() {
      this.$emit("callApiAgain");
    },
  },
};
</script>

<style>
@media (max-width: 456px) {
  .coin-status {
    display: block;
  }
}
.btn .badge {
  position: relative;
  top: 1px;
}
.pointer {
  cursor: pointer;
}
.button-class {
  margin: 0;
  width: 200px;
}
.desktop-button {
  margin: 0;
  width: 275px;
}
</style>
