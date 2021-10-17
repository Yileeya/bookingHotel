import Vue from 'vue'
import App from './components/App.vue'
import router from './router/router';
import store from './router/store';

import 'jquery/src/jquery';
import 'bootstrap';
import 'lodash';

import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

Vue.use(CoolLightBox)

import * as uiv from 'uiv';
Vue.use(uiv);


import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

import 'fontawesome-4.7';
import "./assets/scss/all.scss";
import "vue2-animate/dist/vue2-animate.min.css"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  moment,
  components: {App},
  render: h => h(App),
}).$mount('#app')