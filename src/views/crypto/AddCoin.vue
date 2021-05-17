<template>
  <b-card>
    <validation-observer ref="simpleRules">
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="6">
            <b-row>
              <!-- Token name start -->
              <b-col cols="6">
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
                        <feather-icon icon="LockIcon" />
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
              <!-- Token name end-->

              <!-- Token symbol start -->
              <b-col cols="6">
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
                        <feather-icon icon="LockIcon" />
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
              <!-- Token symbol end-->
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
              <!-- Released Date start -->
              <b-col cols="6">
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
              <!-- Released Date start end-->

              <!-- Token link start -->
              <b-col cols="6">
                <b-form-group
                  label="Token Logo Link"
                  label-for="iv-token-logo-link"
                  :state="state"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Token Logo Link"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : ''"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon icon="LockIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="iv-token-logo-link"
                        v-model="tokenLogoLink"
                        type="text"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Expl: https://.."
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <!-- Token link end-->
            </b-row>

            <b-row>
              <!-- Token Actual Price start -->
              <b-col cols="6">
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
              <!-- Token Actual Price end-->

              <!-- Token actual market cap start -->
              <b-col cols="6">
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
                        <feather-icon icon="LockIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="iv-token-actual-market-cap"
                        v-model="tokenActualMarketCap"
                        type="number"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Expl: 450000"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <!-- Token link end-->
            </b-row>
          </b-col>

          <b-col cols="6">
            <b-row>
              <b-col cols="12">
                <!-- Token Binance Smart Chain contract address start -->
                <b-form-group
                  label="Token Binance Smart Chain contract address"
                  label-for="iv-bsc-address"
                  :state="state"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Binance Smart Chain contract address"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : ''"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon icon="LockIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="iv-bsc-address"
                        v-model="bscAddress"
                        type="text"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Expl: https://bscscan.com/address/0x23C28E9346C82228FB2b62b20b6fe5d75989F5b2#code"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
                <!-- Token Binance Smart Chain contract address end-->

                <!-- Token Ethereum contract address start -->
                <b-form-group
                  label="Token Ethereum contract address"
                  label-for="iv-eth-address"
                  :state="state"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Ethereum address"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : ''"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon icon="LockIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="iv-eth-address"
                        v-model="ethAddress"
                        type="text"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Expl: https://ethscan.com/address/0x23C28E9346C82228FB2b62b20b6fe5d75989F5b2#code"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
                <!-- Token Ethereum contract address end-->

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

                <b-row>
                  <!-- Website start -->
                  <b-col cols="6">
                    <b-form-group
                      label="Website"
                      label-for="iv-website"
                      :state="state"
                    >
                      <validation-provider
                        #default="{ errors }"
                        name="Website"
                        rules="required"
                      >
                        <b-input-group
                          class="input-group-merge"
                          :class="errors.length > 0 ? 'is-invalid' : ''"
                        >
                          <b-input-group-prepend is-text>
                            <feather-icon icon="LockIcon" />
                          </b-input-group-prepend>
                          <b-form-input
                            id="iv-website"
                            v-model="website"
                            type="text"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Expl: https://www.bitcoin.org"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <!-- Website end-->

                  <!-- Telegram start -->
                  <b-col cols="6">
                    <b-form-group
                      label="Telegram"
                      label-for="iv-telegram"
                      :state="state"
                    >
                      <validation-provider
                        #default="{ errors }"
                        name="Telegram"
                        rules="required"
                      >
                        <b-input-group
                          class="input-group-merge"
                          :class="errors.length > 0 ? 'is-invalid' : ''"
                        >
                          <b-input-group-prepend is-text>
                            <feather-icon icon="LockIcon" />
                          </b-input-group-prepend>
                          <b-form-input
                            id="iv-telegram"
                            v-model="telegram"
                            type="text"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Expl: https://t.me/bitcoin"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <!-- Telegram end-->

                  <!-- Twitter start -->
                  <b-col cols="6">
                    <b-form-group
                      label="Twitter"
                      label-for="iv-twitter"
                      :state="state"
                    >
                      <validation-provider
                        #default="{ errors }"
                        name="Twitter"
                        rules="required"
                      >
                        <b-input-group
                          class="input-group-merge"
                          :class="errors.length > 0 ? 'is-invalid' : ''"
                        >
                          <b-input-group-prepend is-text>
                            <feather-icon icon="LockIcon" />
                          </b-input-group-prepend>
                          <b-form-input
                            id="iv-twitter"
                            v-model="twitter"
                            type="text"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Expl: https://twitter.com/bitcoin"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <!-- Twitter end-->

                  <!-- Reddit start -->
                  <b-col cols="6">
                    <b-form-group
                      label="Reddit"
                      label-for="iv-reddit"
                      :state="state"
                    >
                      <validation-provider
                        #default="{ errors }"
                        name="Reddit"
                        rules="required"
                      >
                        <b-input-group
                          class="input-group-merge"
                          :class="errors.length > 0 ? 'is-invalid' : ''"
                        >
                          <b-input-group-prepend is-text>
                            <feather-icon icon="LockIcon" />
                          </b-input-group-prepend>
                          <b-form-input
                            id="iv-reddit"
                            v-model="reddit"
                            type="text"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Expl: https://reddit.com/bitcoin"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <!-- Reddit end-->
                </b-row>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12">
            <b-button
              variant="primary"
              type="submit"
              @click.prevent="validationForm"
            >
              Submit
            </b-button>
          </b-col>
        </b-row>
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
  BFormDatepicker
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

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
    BFormDatepicker
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
      reddit: ""
    };
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          // eslint-disable-next-line
          alert("form submitted!");
        }
      });
    }
  },
  directives: {
    Ripple
  }
};
</script>
