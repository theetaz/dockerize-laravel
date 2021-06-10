<template>
  <div>
    <b-row class="banner-margin">
      <div class="d-flex justify-content-center mb-3 col-12 text-center">
        <b-carousel id="carousel-interval" :interval="4000">
          <b-link href="http://bit.ly/eject-elon" target="_blank">
            <b-carousel-slide
              :img-src="require('@/assets/images/banners/eject-promo.gif')"
            />
          </b-link>
        </b-carousel>
      </div>
    </b-row>
    <b-row class="banner-margin pt-3 pb-3" v-if="!is_mobilesize">
      <div class="d-flex justify-content-center col-4 text-center">
        <b-link href="https://bit.ly/3cuH6gY" target="_blank">
          <b-img
            src="@/assets/images/banners/sherbert.png"
            class="corosoleDesktop"
          />
        </b-link>
      </div>

      <div class="d-flex justify-content-center col-4 text-center">
        <b-link href="https://bit.ly/2T6QvUN" target="_blank">
          <b-img
            src="@/assets/images/banners/bnbs.gif"
            class="corosoleDesktop"
          />
        </b-link>
      </div>
      <div class="d-flex justify-content-center col-4 text-center pl-3">
        <b-link href="#" target="_blank">
          <b-img
            src="@/assets/images/banners/your-ad-here.jpg"
            height="140px"
          />
        </b-link>
      </div>
    </b-row>
    <b-row class="banner-margin pt-2 pb-2" v-else>
      <div class="d-flex justify-content-center mb-1 col-12 text-center">
        <b-carousel id="carousel-interval" :interval="4000" class="corosole">
          <b-link href="https://bit.ly/3cuH6gY" target="_blank">
            <b-carousel-slide
              class="corosole"
              :img-src="require('@/assets/images/banners/sherbert.png')"
            />
          </b-link>
          <b-link href="https://bit.ly/2T6QvUN" target="_blank">
            <b-carousel-slide
              class="corosole"
              :img-src="require('@/assets/images/banners/bnbs.gif')"
            />
          </b-link>
          <!-- <b-link href="https://bit.ly/2T6QvUN" target="_blank">
            <b-carousel-slide
              :img-src="require('@/assets/images/banners/bnb2.png')"
            />
          </b-link> -->
        </b-carousel>
      </div>
    </b-row>
  </div>
</template>

<script>
import { mixinList } from "@/mixins/mixinList";
import {
  BRow,
  BLink,
  BImg,
  BCarousel,
  BCarouselSlide,
  // BCard,
  // BCardText,
} from "bootstrap-vue";
export default {
  mixins: [mixinList],
  components: {
    BRow,
    BLink,
    BImg,
    BCarousel,
    BCarouselSlide,
  },
  data() {
    return {
      // swiperOptions: {
      //   slidesPerView: 3,
      //   spaceBetween: 50,
      //   freeMode: true,
      //   loop: true,
      //   navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev",
      //   },
      //   // autoplay: {
      //   //   delay: 2500,
      //   //   disableOnInteraction: false,
      //   // },
      // },
    };
  },
};
</script>

<style>
.banner-margin {
  margin-top: -50px;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.swiper-container {
  height: 450px;
  width: 100%;
}
.cards-body {
  padding: 1.5rem;
  height: 145px !important;
  width: 364px !important;
}
/* .d-block {
  display: inline-block !important;
} */
.b-carousel {
  height: "140px" !important;
}
.corosole {
  height: 135px !important;
  width: 350px !important;
}
.corosoleDesktop {
  height: 150px !important;
  width: 390px !important;
  border-radius: 10px;
}
</style>