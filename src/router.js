import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Question from "./views/Question.vue";
import Account from "./views/Account.vue";
import Users from "./views/Users.vue";
import Categories from "./views/Categories.vue";
import HowItWorks from "./views/HowItWorks.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/question",
      name: "Question",
      props: true,
      component: Question
    },
    {
      path: "/users",
      name: "Users",
      component: Users
    },
    {
      path: "/how_it_works",
      name: "HowItWorks",
      component: HowItWorks
    },
    {
      path: "/categories",
      name: "Categories",
      component: Categories
    },
    {
      path: "/account",
      name: "Account",
      props: true,
      component: Account
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (!localStorage.getItem("user")) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
