<template>
  <div>
    <b-row class="text-center">
      <b-col align-self="center" class="mb-2">
        <b-link to="/" class="brand-logo">
          <b-img
            src="@/assets/images/logo/rugfreecoins.png"
            height="200"
            alt="RugFreeCoins"
          ></b-img>
        </b-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="3"> </b-col>
      <b-col cols="12" md="6" class="text-center">
        <h1>Subscribe to our newsletter</h1>
        <b-card-text
          >GET THE BEST HIGH POTENTIAL COINS RIGHT INTO YOUR INBOX.</b-card-text
        >
      </b-col>
    </b-row>
    <b-row class="pt-5">
      <b-col md="3"> </b-col>
      <b-col cols="12" md="6">
        <b-card>
          <validation-observer ref="simpleRules">
            <b-form @submit.prevent>
              <b-row class="text-center">
                <b-col>
                  <b-img
                    src="@/assets/images/logo/rugfreecoins.png"
                    height="100"
                    alt="RugFreeCoins"
                  ></b-img>
                </b-col>
              </b-row>
              <b-card-text class="pt-2"
                >The best way to stay informed about the newest crypto coins!
                Don't miss get news and updates, right to your
                inbox!</b-card-text
              >
              <b-row class="pt-2">
                <b-col md="10">
                  <b-form-input
                    id="iv-token-symbol"
                    type="text"
                    placeholder="Your email"
                    v-model="email"
                  />
                </b-col>
                <b-col md="2">
                  <b-button
                    variant="success"
                    type="submit"
                    loading="true"
                    @click.prevent="validationForm"
                  >
                    Submit
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { required } from "@validations";
import {
  BRow,
  BCol,
  BButton,
  BForm,
  BCard,
  BLink,
  BImg,
  BFormInput,
  BCardText
} from "bootstrap-vue";
export default {
  components: {
    BRow,
    BCol,
    BForm,
    BButton,
    BCard,
    ValidationObserver,
    BLink,
    BImg,
    BFormInput,
    BCardText
  },
  computed: {},
  data() {
    return {
      required,
      email: ''
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
    submitFormData() {
      console.log("email",this.email);
    }
  },
};
</script>
