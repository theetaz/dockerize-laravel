<template>
  <div>
    <b-card v-if="commentData.length < 1" class="text-center">
      No Comments</b-card
    >
    <b-card v-else>
      <b-row>
        <b-col cols="12">
          <vue-custom-scrollbar class="scroll-area" :settings="settings"  id="commentss">
          <!-- Account Notification -->
          <!-- <div > -->
            <div v-for="comment in commentData" :key="comment.id">
              <b-media class="py-1">
                <template #aside>
                  <b-avatar
                    size="32"
                    :text="helper.getNameText(comment.user.name)"
                    variant="primary"
                  />
                </template>
                <div class="media-heading">
                  <span class="font-weight-bolder">
                    {{ comment.user.name }}
                  </span>
                </div>
                <small class="notification-text">{{ comment.comment }}</small>
              </b-media>
            </div>
          <!-- </div> -->
          </vue-custom-scrollbar>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row>
        <b-col cols="12">
          <validation-observer ref="simpleRules">
            <b-form @submit.prevent>
              <div v-if="check_is_login">
                <label for="comment-input">Type your amazing thoughts 🤩</label>
                <b-form-textarea
                  id="comment-input"
                  placeholder="To The Moon 🚀🚀"
                  rows="3"
                  v-model="comment"
                />
              </div>
              <div class="mt-2">
                <b-button
                  v-if="!check_is_login"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  block
                  variant="outline-primary"
                  @click="linked('login')"
                >
                  Please login
                </b-button>
                <b-button
                  v-else
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  block
                  variant="outline-primary"
                  @click.prevent="validationForm"
                >
                  Submit your thoughts
                </b-button>
              </div>
            </b-form>
          </validation-observer>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import helper from "@/utils/helper";
import {
  BCard,
  BRow,
  BCol,
  BMedia,
  BAvatar,
  BFormTextarea,
  BButton,
  BForm,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import vueCustomScrollbar from "vue-custom-scrollbar";
import "vue-custom-scrollbar/dist/vueScrollbar.css";
import { ValidationObserver } from "vee-validate";
export default {
  components: {
    BCard,
    BRow,
    BCol,
    BMedia,
    BAvatar,
    BFormTextarea,
    BButton,
    vueCustomScrollbar,
    BForm,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  props: {
    coinData: {
      type: null,
      required: false,
    },
  },
  data() {
    return {
      helper: helper,
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false,
      },
      comment: "",
      check_is_login: false,
    };
  },
  methods: {
    scrollToBottom() {
      // 
      const commentss = this.$el.querySelector("#commentss");
      commentss.scrollTop = (commentss.scrollHeight+10);
    },
    linked: function (e) {
      this.$router.push({ path: "/" + e });
    },
    validationForm() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          // this.loading = true;
          this.submitComment();
        }
      });
    },
    submitComment() {
      const user_data = localStorage.getItem("profile");
      const user_id = JSON.parse(user_data).id;
      const coin_id = this.coinData.id;

      let formData = new FormData();

      formData.append("user_id", user_id);
      formData.append("coin_id", coin_id);
      formData.append("comment", this.comment);

      this.$store
        .dispatch("ADD_COMMENT", formData)
        .then((response) => {
          if (response.data.message == "success") {
            this.$store.dispatch("FETCH_COIN_DATA", coin_id);
            this.comment = "";
          }
        })
        .catch(() => {})
        .finally(() => {
          this.scrollToBottom();
        });
    },
    checkIsLogin() {
      let check_token = localStorage.getItem("token");
      if (check_token != null) {
        this.check_is_login = true;
      }
    },
  },
  computed: {
    commentData() {
      return this.$store.state.crypto.comments;
    },
  },
  mounted() {
    this.checkIsLogin();
  },
};
</script>

<style>
.scroll-area {
  position: relative;
  margin: left;
  max-height: 300px;
}

</style>
