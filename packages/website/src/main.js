import Vue from 'vue';
import App from './docs-app.vue';
import HeroIcons from '@bytegem/vue-heroicons';

Vue.config.productionTip = false;

Vue.use(HeroIcons);

new Vue({
  render: h => h(App)
}).$mount('#app');
