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
        <b-avatar variant="light-primary" rounded>
          <feather-icon icon="CopyIcon" size="18" />
        </b-avatar>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard,
  BAvatar,
  BRow,
  BCol,
  BBadge,
  BInputGroup,
  BFormInput,
  BInputGroupPrepend
} from "bootstrap-vue";

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BAvatar,
    BBadge,
    BInputGroup,
    BFormInput,
    BInputGroupPrepend
  },
  props: {
    coinData: {
      type: null,
      required: false
    }
  }
};
</script>

<style></style>
