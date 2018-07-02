import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './components/home/home.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: HomePage }
    ]  
});

export default router;
