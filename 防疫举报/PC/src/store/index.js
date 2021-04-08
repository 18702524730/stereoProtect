import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import router from './router/';
import progress from './progress/';

export default new Vuex.Store({
  modules: {
    router,
    progress
  }
});
