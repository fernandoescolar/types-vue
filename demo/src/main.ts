import Vue from 'vue';
import router from './router';
import store from './store/index';
import App from './components/app.vue';

const vue = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
});