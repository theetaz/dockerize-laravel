<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Register v1 -->
      <b-card class="mb-0">
        <b-link to="/" class="brand-logo">
          <b-img
            src="@/assets/images/logo/rugfreecoins.png"
            height="50"
            alt="RugFreeCoins"
          ></b-img>
          <h2 class="brand-text text-primary ml-1">RFC</h2>
        </b-link>

        <b-card-title class="mb-1"> Adventure starts here 🚀 </b-card-title>
        <b-card-text class="mb-2">
          Make your cryoto hunt easy and fun!
        </b-card-text>

        <!-- form -->
        <validation-observer ref="registerForm">
          <b-form
            class="auth-register-form mt-2"
            @submit.prevent="validationForm"
          >
            <!-- username -->
            <b-form-group label="Name" label-for="name">
              <validation-provider
                #default="{ errors }"
                name="Name"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="name"
                  :state="errors.length > 0 ? false : null"
                  name="register-name"
                  placeholder="John Doe"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- email -->
            <b-form-group label="Email" label-for="email">
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="email"
                  v-model="regEmail"
                  :state="errors.length > 0 ? false : null"
                  name="register-email"
                  placeholder="john@example.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group label="Password" label-for="password">
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    :state="errors.length > 0 ? false : null"
                    class="form-control-merge"
                    name="register-password"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIcon"
                      class="cursor-pointer"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- checkbox -->
            <b-form-group>
              <b-form-checkbox
                id="register-privacy-policy"
                v-model="status"
                name="checkbox-1"
              >
                I agree to
                <b-link>privacy policy & terms</b-link>
              </b-form-checkbox>
            </b-form-group>

            <!-- submit button -->
            <b-button variant="primary" block type="submit">
              <b-spinner
                v-if="loading"
                label="Loading..."
                class="mr-2 mx-1"
                style="width: 13px; height: 13px"
              ></b-spinner>
              Sign up
            </b-button>
          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <span>Already have an account? </span>
          <b-link :to="{ name: 'login' }">
            <span>Sign in instead</span>
          </b-link>
        </b-card-text>

        <div class="divider my-2">
          <div class="divider-text">or</div>
        </div>

        <!-- social buttons -->
        <!-- <div class="auth-footer-btn d-flex justify-content-center">
          <b-button variant="facebook" href="javascript:void(0)">
            <feather-icon icon="FacebookIcon" />
          </b-button>
          <b-button variant="twitter" href="javascript:void(0)">
            <feather-icon icon="TwitterIcon" />
          </b-button>
          <b-button variant="google" href="javascript:void(0)">
            <feather-icon icon="MailIcon" />
          </b-button>
          <b-button variant="github" href="javascript:void(0)">
            <feather-icon icon="GithubIcon" />
          </b-button>
        </div> -->
      </b-card>
      <!-- /Register v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  BImg,
  BCard,
  BLink,
  BCardTitle,
  BCardText,
  BForm,
  BButton,
  BFormInput,
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
  BFormCheckbox,
  BSpinner
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import FormData from "form-data";

export default {
  components: {
    BImg,
    // BSV
    BCard,
    BLink,
    BCardTitle,
    BCardText,
    BForm,
    BButton,
    BFormInput,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    // validations
    ValidationProvider,
    ValidationObserver,
    BSpinner
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      regEmail: "",
      name: "",
      password: "",
      status: "",

      // validation rules
      required,
      email
    };
  },
  computed: {
    loading() {
      return this.$store.state.loaders.loading;
    },
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    }
  },
  methods: {
    validationForm() {
      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          this.register();
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

    register() {
      //creat the form request
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("email", this.regEmail);
      formData.append("password", this.password);

      //dispatch the event
      this.$store
        .dispatch("REGISTER_USER", formData)
        .then((response) => {
          if (response.status == 200) {
            this.$store
              .dispatch("FETCH_PROFILE_DATA", response.data.payload.token)
              .then(() => {
                this.$router.push("/");
              })
              .catch((error) => {
                this.makeToast(
                  "danger",
                  error.response.data.error || "Something went wrong",
                  "Authentication Error 😥"
                );
              });
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            let errorList = error.response.data.errors || [];
            const keys = Object.keys(errorList);
            if (keys.length > 0) {
              keys.forEach((key) => {
                this.makeToast("danger", errorList[key][0], "Validation Error");
              });
            }
          }
        });
    }
  }
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
