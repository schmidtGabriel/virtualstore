
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Base state control
import actions from './actions'
import getters from './getters'

// Modules

import password from './modules/password';
import dashboard from './modules/dashboard';
import support from './modules/support';
import notification from './modules/notification';
import payment from './modules/payment';
import commonquestion from './modules/commonquestion';
import news from './modules/news';
import promotion from './modules/promotion';

import auth from './modules/auth';
import user from './modules/user';
import category from './modules/category';
import product from './modules/product';


export default new Vuex.Store({
  actions,
  getters,
  modules: {
    auth,
    user,
    category,
    product,
    
    password,
    dashboard,
    support,
    notification,
    payment,
    commonquestion,
    news,
    promotion,
  }
})
