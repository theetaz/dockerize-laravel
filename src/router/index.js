import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        requiresAuth: false,
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('@/views/crypto/CryptoDetails.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Crypto Details Page',
        breadcrumb: [
          {
            text: 'Crypto Details',
            active: true,
          },
        ],
      },
    },
    {
      path: '/add-coin',
      name: 'add-coin',
      component: () => import('@/views/crypto/AddCoin.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Add coin page',
        breadcrumb: [
          {
            text: 'Add coin page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/news-letter',
      name: 'news-letter',
      component: () => import('@/views/crypto/NewsLetter.vue'),
      meta: {
        requiresAuth: false,
        pageTitle: 'News Letter Page',
        breadcrumb: [
          {
            text: 'News Letter',
            active: true,
          },
        ],
      },
    },
    {
      path: '/promote',
      name: 'promote',
      component: () => import('@/views/crypto/Promote.vue'),
      meta: {
        requiresAuth: false,
        pageTitle: 'Promote Page',
        breadcrumb: [
          {
            text: 'Promote',
            active: true,
          },
        ],
      },
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/terms-n-conditions',
      name: 'terms-n-conditions',
      component: () => import('@/views/TermsAndConditions.vue'),
      meta: {
        requiresAuth: false,
        pageTitle: 'Terms And Conditions Page',
        breadcrumb: [
          {
            text: 'Terms And Conditions',
            active: true,
          },
        ],
      },
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('@/views/PrivacyPolicy.vue'),
      meta: {
        requiresAuth: false,
        pageTitle: 'Privacy Policy Page',
        breadcrumb: [
          {
            text: 'Privacy Policy',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
      meta: {
        requiresAuth: false,
        layout: 'full',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/Register.vue'),
      meta: {
        requiresAuth: false,
        layout: 'full',
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup.vue'),
      meta: {
        requiresAuth: false,
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        requiresAuth: false,
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

function is_authenticated() {
  const token = localStorage.getItem("token");
  if (token == "null" || token == null || token == "") {
    return false;
  } else {
    return true;
  }
}
/**
 * Router Authentication Guard
 */
router.beforeEach((to, from, next) => {
  const withoutAuth = ["login", "signup", "register", "home", "terms-n-conditions", "privacy-policy", "news-letter", "promote", "home"];
  if (withoutAuth.includes(to.name)) {
    next();
  }
  else {
    is_authenticated() ? next() : next({ name: "login" });
  }
});

export default router
