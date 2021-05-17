<template>
  <b-card>
    <validation-observer ref="simpleRules">
      <b-form @submit.prevent>
        <b-row>
          <b-col col="6">
            <b-row>
              <!-- Token name start -->
              <b-col col="6">
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
              <b-col col="6">
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
              <b-col col="12">
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
              <b-col col="6">
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
              <b-col col="6">
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
              <b-col col="6">
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
                        id="iv-roken-actual-price"
                        v-model="tokenActualPrice"
                        type="text"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Expl: 0.0002"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <!-- Released Date start end-->

              <!-- Token link start -->
              <b-col col="6">
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
          </b-col>

          <b-col col="6"> </b-col>
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
      required,
      tokenName: "",
      tokenSymbol: "",
      tokenDescription: "",
      releasedDate: "",
      tokenLogoLink: ""
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
