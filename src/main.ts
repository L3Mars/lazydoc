import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import * as filters from '@/utils/FiltersMethods';
import '@/utils/Extensions';

Vue.config.productionTip = false;

// Register global filter functions
Object.keys(filters).forEach((key) => {
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
