import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'


// 引入axios
import axios from 'axios'
Vue.prototype.axios = axios;

// 引入better-scroll插件
import Scroller from '@/components/Scroll'
// 全局注册组件
Vue.component('Scroller', Scroller);


// 把loading做成全局组件
import Loading from '@/components/Loading'
Vue.component('Loading', Loading);

Vue.filter('setWH', (url, arg) => {
    return url.replace(/w\.h/, arg);
});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')