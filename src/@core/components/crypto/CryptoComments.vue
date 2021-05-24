<template>
  <div>
    <b-card>
      <b-row>
        <b-col cols="12">
          {{ commentData }}
          <!-- Notifications -->
          <vue-perfect-scrollbar
            v-once
            :settings="settings"
            class="scrollable-container media-list scroll-area"
          >
            <!-- Account Notification -->
            <div v-for="comment in commentData" :key="comment.id">
              <b-media>
                <template #aside>
                  <b-avatar size="32" text="NT" variant="primary" />
                </template>
                <div class="media-heading">
                  <span class="font-weight-bolder">
                    Nipun Theekshsshana
                  </span>
                </div>
                <small class="notification-text">{{ comment.comment }}</small>
              </b-media>
            </div>
          </vue-perfect-scrollbar>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
      <b-row>
        <b-col cols="12">
          <div>
            <label for="comment-input">Type your amazing thoughts 🤩</label>
            <b-form-textarea
              id="comment-input"
              placeholder="To The Moon 🚀🚀"
              rows="3"
            />
          </div>
          <div class="mt-2">
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              block
              variant="outline-primary"
            >
              Submit your thoughs
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BMedia,
  BAvatar,
  BFormTextarea,
  BButton
} from "bootstrap-vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BMedia,
    BAvatar,
    BFormTextarea,
    VuePerfectScrollbar,
    BButton
  },
  directives: {
    Ripple
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 60
      }
      //comments: []
    };
  },
  created() {
    //this.comments = this.$store.state.crypto.comments;
    //console.log("hi", this.$props.commentsData);
  },
  computed: {
    commentData() {
      return this.$store.state.crypto.comments;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/bootstrap-extended/include";
@import "~@core/scss/base/components/variables-dark";

.scrollable-container {
  position: relative;
  margin: auto;
  height: 300px;
}
</style>
