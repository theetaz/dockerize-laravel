<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link to="/" class="brand-logo">
          <b-img
            src="@/assets/images/logo/rugfreecoins.png"
            height="50"
            alt="RugFreeCoins"
          ></b-img>

          <h2 class="brand-text text-primary ml-1">RFC</h2>
        </b-link>

        <b-card-title class="mb-1"> Welcome to Rug Free Coins 👋 </b-card-title>
        <b-card-text class="mb-2">
          Please sign-in to your account and start the adventure
        </b-card-text>

        <!-- form -->
        <validation-observer ref="loginForm" #default="{ invalid }">
          <b-form class="auth-login-form mt-2" @submit.prevent="validationForm">
            <!-- email -->
            <b-form-group label-for="email" label="Email">
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="email"
                  v-model="userEmail"
                  name="login-email"
                  :state="errors.length > 0 ? false : null"
                  placeholder="john@example.com"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <!-- <div class="d-flex justify-content-between">
                <label for="password">Password</label>
                <b-link :to="{ name: 'auth-forgot-password-v1' }">
                  <small>Forgot Password?</small>
                </b-link>
              </div> -->
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
                    class="form-control-merge"
                    :state="errors.length > 0 ? false : null"
                    name="login-password"
                    placeholder="Password"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
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
                id="remember-me"
                v-model="status"
                name="checkbox-1"
              >
                Remember Me
              </b-form-checkbox>
            </b-form-group>

            <!-- submit button -->
            <b-button variant="primary" type="submit" block :disabled="invalid">
              <b-spinner
                v-if="loading"
                label="Loading..."
                class="mr-2 mx-1"
                style="width: 13px; height: 13px"
              ></b-spinner>
              Sign in
            </b-button>
          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <span>New on our platform? </span>
          <b-link :to="{ name: 'register' }">
            <span>Create an account</span>
          </b-link>
        </b-card-text>

        <div class="divider my-2">
          <div class="divider-text">or</div>
        </div>

        <!-- social button -->
        <!-- <div class="auth-footer-btn d-flex justify-content-center">
          <b-button href="javascript:void(0)" variant="facebook">
            <feather-icon icon="FacebookIcon" />
          </b-button>
          <b-button href="javascript:void(0)" variant="twitter">
            <feather-icon icon="TwitterIcon" />
          </b-button>
          <b-button href="javascript:void(0)" variant="google">
            <feather-icon icon="MailIcon" />
          </b-button>
          <b-button href="javascript:void(0)" variant="github">
            <feather-icon icon="GithubIcon" />
          </b-button>
        </div> -->
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  BButton,
  BImg,
  BForm,
  BFormInput,
  BFormGroup,
  BCard,
  BLink,
  BCardTitle,
  BCardText,
  BInputGroup,
  BInputGroupAppend,
  BFormCheckbox,
  BSpinner
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    // BSV
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    BImg,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
    BSpinner
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      userEmail: "",
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
      this.$refs.loginForm.validate().then((success) => {
        if (success) {
          this.login();
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
    login() {
      //creat the form request
      let formData = new FormData();
      formData.append("email", this.userEmail);
      formData.append("password", this.password);

      this.$store
        .dispatch("USER_LOGIN", formData)
        .then((response) => {
          if (response.status == 200) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "Succesfully login",
                icon: "EditIcon",
                variant: "success"
              }
            });

            //fetch the profile data and sent it the the home page
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
          } else {
            this.makeToast(
              "danger",
              error.response.data.error || "Something went wrong",
              "Authentication Error 😥"
            );
          }
        });
    }
  }
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
