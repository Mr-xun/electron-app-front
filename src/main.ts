import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "@/styles/index.scss";
import '@/assets/icon/iconfont.css'
import './plugins/element';
import "normalize.css";

import * as filters from "@/filters";
Vue.config.productionTip = false;
Object.keys(filters).forEach(key => {
    Vue.filter(key, (filters as { [key: string]: Function })[key]);
});
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
