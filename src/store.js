import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mobile: false,
    isLoggedIn: false,
    user: null,
    allCategories: [
      "All",
      "Programming",
      "Advice",
      "Arts",
      "Science",
      "Cooking",
      "Health",
      "Music",
      "History",
      "Travel",
      "Movies"
    ],
    category: "All",
    newQuestions: [],
    defaultAvatar: require("./assets/avatar.jpeg")
  },
  mutations: {
    isMobile(state, mobile) {
      state.mobile = mobile;
    },
    setUser(state, user) {
      state.user = user;
    },
    setCategory(state, cat) {
      state.category = cat;
    },
    setLoginStatus(state, status) {
      state.isLoggedIn = status;
    },
    addQuestion(state, q) {
      state.newQuestions.unshift(q);
    }
  },
  actions: {}
});
