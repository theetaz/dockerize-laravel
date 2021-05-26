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
              <div class="card-text pt-1">
                <small>What is {{ coinData.name }} ?</small><br />
                {{ coinData.description }}
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="10" xl="10">
        <!-- User Stats -->
        <div class="mt-1">
          <div class="m-0">
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
        <b-avatar variant="light-primary" rounded class="pointer">
          <feather-icon
            icon="CopyIcon"
            size="18"
            @click="doCopy(coinData.bsc_contract_address)"
          />
        </b-avatar>
      </b-col>
      <b-col class="pt-2">
        <h3 class="mb-0">
          Status :
          <b-badge variant="success">{{ coinData.status }}</b-badge>
        </h3>
      </b-col>
      <b-col class="pt-2">
        <h3 class="mb-0">
          Total votes :
          <b-badge variant="success">{{ coinData.vote_count }}</b-badge>
        </h3>
      </b-col>
    </b-row>
    <b-row>
      <b-card-body>
        <div class="mt-1" v-show="!coinData.is_voted">
          <b-button
            target="_blank"
            block
            variant="gradient-primary"
            @click="castVote(coinData)"
          >
            <span class="align-middle"
              >Vote for
              <b-badge variant="dark">{{ coinData.name }}</b-badge></span
            >
          </b-button>
        </div>
      </b-card-body>
    </b-row>
  </b-card>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
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
} from "bootstrap-vue";

export default {
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
  },
  props: {
    coinData: {
      type: null,
      required: false,
    },
  },
  methods: {
    castVote(coin) {
      this.$store.dispatch("CAST_VOTE", coin.id).then((response) => {
        console.log(response);
        // if (response.data.message == "success") {
        //   this.$store.dispatch("FETCH_COIN_DATA", coin.id);
        // }
      });
    },
    doCopy(value) {
      navigator.clipboard.writeText(value).then(
        () => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "BSC contract address copied",
              icon: "BellIcon",
            },
          });
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
  },
};
</script>

<style>
.btn .badge {
  position: relative;
  top: 1px;
}
.pointer {
    cursor: pointer;
  }
</style>
