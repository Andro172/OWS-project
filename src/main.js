import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";


/* font-awsome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faList,
  faUsers,
  faQuestion,
  faPlus,
  faComments,
  faAngleDoubleLeft,
  faThumbsUp,
  faThumbsDown,
  faChevronUp,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";

//adding icons to library
//solid
library.add(
  faList,
  faUsers,
  faQuestion,
  faPlus,
  faComments,
  faAngleDoubleLeft,
  faThumbsUp,
  faThumbsDown,
  faChevronUp,
  faMapMarkerAlt
);
//brand

//regular
library.add(faEye);
//registering icon component
Vue.component("icon", FontAwesomeIcon);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
