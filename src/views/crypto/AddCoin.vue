<template>
  <b-card>
    <validation-observer ref="simpleRules">
      <b-form @submit.prevent>
        <b-row>
          <b-col md="6">
            <h3 class="mb-2">Token informations</h3>
            <b-row>
              <b-col md="6">
                <b-form-group
                  label="Token Name"
                  label-for="iv-token-name"
                  :state="state"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Token Name"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : ''"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon icon="CpuIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="iv-token-name"
                        v-model="tokenName"
                        type="text"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Expl: Bitcoin"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Token Symbol"
                  label-for="iv-token-symbol"
                  :state="state"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Token Symbol"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : ''"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon icon="PackageIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="iv-token-symbol"
                        v-model="tokenSymbol"
                        type="text"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Expl: BTC"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <!-- Token description start -->
                <b-form-group
                  label="Token Description"
                  label-for="iv-token-description"
                  :state="state"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Token Description"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : ''"
                    >
                      <b-form-textarea
                        id="iv-token-description"
                        v-model="tokenDescription"
                        :state="errors.length > 0 ? false : null"
                        rows="5"
                        placeholder="Expl: Bitcoin is an innovative payment network and a new kind of money"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
                <!-- Token description end-->
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <h3 class="mb-2 mt-2">Token Meta Data</h3>
              </b-col>
              <!-- Released Date start -->
              <b-col md="6">
                <b-form-group
                  label="Released Date"
                  label-for="iv-released-date"
                  :state="state"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Released Date"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : ''"
                    >
                      <b-form-datepicker
                        id="iv-released-date"
                        v-model="releasedDate"
                        class="mb-1"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <!-- Released Date start end -->
              <!-- Token link start -->
              <b-col md="6">
                <b-form-group
                  label="Token Logo Link"
                  label-for="iv-token-logo-link"
                >
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="ImageIcon" />
                    </b-input-group-prepend>
                    <b-form-input
                      id="iv-token-logo-link"
                      v-model="tokenLogoLink"
                      type="text"
                      placeholder="Expl: https://.."
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <!-- Token link start end -->
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group
                  label="Token Actual Price"
                  label-for="iv-roken-actual-price"
                  :state="state"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Token Actual Price"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : ''"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon icon="DollarSignIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="iv-token-actual-price"
                        v-model="tokenActualPrice"
                        type="number"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Expl: 0.0002"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Token Actual Market Cap"
                  label-for="iv-token-actual-market-cap"
                  :state="state"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Token Actual Market Cap"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : ''"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon icon="PackageIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="iv-token-actual-market-cap"
                        v-model="tokenActualMarketCap"
                        type="number"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Expl: 5200000"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="6">
            <h3 class="mb-2">Smart Contracts</h3>
            <b-row>
              <b-col md="12">
                <!-- Token Binance Smart Chain contract address start -->
                <b-form-group
                  label="Token Binance Smart Chain contract address"
                  label-for="iv-bsc-address"
                >
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="PackageIcon" />
                    </b-input-group-prepend>
                    <b-form-input
                      id="iv-bsc-address"
                      v-model="bscAddress"
                      type="text"
                      placeholder="Expl: 0x23C28E9346C82228FB2b62b20b6fe5d75989F5b2"
                    />
                  </b-input-group>
                </b-form-group>
                <!-- Token Binance Smart Chain contract address end-->
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <!-- Token Ethereum contract address start -->
                <b-form-group
                  label="Token Ethereum contract address"
                  label-for="iv-eth-address"
                >
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="PackageIcon" />
                    </b-input-group-prepend>
                    <b-form-input
                      id="iv-eth-address"
                      v-model="ethAddress"
                      type="text"
                      placeholder="Expl: 0x23C28E9346C82228FB2b62b20b6fe5d75989F5b2"
                    />
                  </b-input-group>
                </b-form-group>
                <!-- Token Ethereum contract address end-->
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <!-- Other links start -->
                <b-form-group
                  label="Other links, other blockchain contracts or anything else you would like to add to your coin request"
                  label-for="iv-other-links"
                >
                  <b-input-group class="input-group-merge">
                    <b-form-textarea
                      id="iv-other-links"
                      v-model="otherLinks"
                      rows="5"
                      placeholder="Expl: Bitcoin is an innovative payment network and a new kind of money"
                    />
                  </b-input-group>
                </b-form-group>
                <!-- Other links end-->
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <h3 class="mb-2 mt-2">Social</h3>
              </b-col>

              <b-col md="6">
                <b-form-group label="Website" label-for="iv-website">
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="LinkIcon" />
                    </b-input-group-prepend>
                    <b-form-input
                      id="iv-website"
                      v-model="website"
                      type="text"
                      placeholder="Expl: https://www.bitcoin.org"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Telegram" label-for="iv-telegram">
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="MessageSquareIcon" />
                    </b-input-group-prepend>
                    <b-form-input
                      id="iv-telegram"
                      v-model="telegram"
                      type="text"
                      placeholder="Expl: https://t.me/bitcoin"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="6">
                <b-form-group label="Twitter" label-for="iv-twitter">
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="TwitterIcon" />
                    </b-input-group-prepend>
                    <b-form-input
                      id="iv-twitter"
                      v-model="twitter"
                      type="text"
                      placeholder="Expl: https://twitter.com/bitcoin"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Reddit" label-for="iv-reddit">
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="BellIcon" />
                    </b-input-group-prepend>
                    <b-form-input
                      id="iv-reddit"
                      v-model="reddit"
                      type="text"
                      placeholder="Expl: https://reddit.com/bitcoin"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="6">
                <b-form-group label="Discord" label-for="iv-discord">
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="PhoneCallIcon" />
                    </b-input-group-prepend>
                    <b-form-input
                      id="iv-discord"
                      v-model="discord"
                      type="text"
                      placeholder="Expl: https://discord.com/bitcoin"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-col v-if="loading" cols="12" class="text-center">
          <b-spinner class="mt-2" variant="primary" />
        </b-col>
        <b-col v-else cols="12" class="text-center">
          <b-button
            class="mt-2"
            variant="primary"
            type="submit"
            loading="true"
            @click.prevent="validationForm"
          >
            Submit Request
          </b-button>
        </b-col>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import {
  BRow,
  BCol,
  BFormGroup,
  BButton,
  BFormInput,
  BFormTextarea,
  BForm,
  BInputGroup,
  BInputGroupPrepend,
  BCard,
  BFormDatepicker,
  BSpinner
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import FormData from "form-data";
import API from "../../services/api";
export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BForm,
    BButton,
    BCard,
    BFormTextarea,
    ValidationProvider,
    ValidationObserver,
    BFormDatepicker,
    BSpinner
  },
  computed: {
    tokenNameValidation() {
      return this.tokenName.length >= 4;
    },
    tokenSymbolValidation() {
      return this.tokenSymbol.length >= 2;
    },
    tokenDescriptionlValidation() {
      return this.tokenDescription.length >= 50;
    }
  },
  data() {
    return {
      loading: false,
      state: "",
      required,
      tokenName: "",
      tokenSymbol: "",
      tokenDescription: "",
      tokenActualPrice: "",
      releasedDate: "",
      tokenLogoLink: "",
      bscAddress: "",
      ethAddress: "",
      tokenActualMarketCap: "",
      otherLinks: "",
      website: "",
      telegram: "",
      twitter: "",
      reddit: "",
      discord: ""
    };
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          this.loading = true;
          this.submitFormData();
        }
      });
    },

    makeToast(variant = null, message = null, title = null) {
      this.$bvToast.toast(message, {
        title: title,
        variant,
        solid: true
      });
    },

    submitFormData() {
      let formData = new FormData();
      formData.append("name", this.tokenName);
      formData.append("symbol", this.tokenSymbol);
      formData.append("description", this.tokenDescription);
      formData.append("telegram_link", this.telegram);
      formData.append("logo_link", this.tokenLogoLink);
      formData.append("website", this.website);
      formData.append("twitter_link", this.twitter);
      formData.append("reddit_link", this.reddit);
      formData.append("discord_link", this.discord);
      formData.append("bsc_contract_address", this.bscAddress);
      formData.append("ethereum_contract_address", this.ethAddress);
      formData.append("other_links", this.otherLinks);
      formData.append("actual_price", this.tokenActualPrice);
      formData.append("actual_market_cap", this.tokenActualMarketCap);
      formData.append("release_date", this.releasedDate);

      API.post("/coin", formData)
        .then((response) => {
          if (response.status == 201) {
            //make the success toast message and rest the data fields
            this.makeToast(
              "success",
              "Congratulations 🏆",
              "Your coin has been submitted"
            );
          }

          //reset the form
          this.resetFormData();
        })
        .catch((error) => {
          //check for validation errors
          if (error.response.status == 422) {
            let errorList = error.response.data.errors || [];
            const keys = Object.keys(errorList);
            if (keys.length > 0) {
              keys.forEach((key) => {
                this.makeToast("danger", errorList[key][0], "Validation Error");
              });
            }
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    resetFormData() {
      this.tokenName = this.tokenSymbol = this.tokenDescription = this.releasedDate = this.tokenLogoLink = null;
      this.tokenActualPrice = this.tokenActualMarketCap = this.bscAddress = this.ethAddress = null;
      this.otherLinks = this.website = this.telegram = this.twitter = this.reddit = null;
      this.$refs.simpleRules.reset();
    }
  },
  directives: {
    Ripple
  }
};
</script>
