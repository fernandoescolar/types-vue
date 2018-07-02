import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import counter from './counterModule';

Vue.use(Vuex);

const store = new Store({
    state: {},
    modules: {
        counter
    }
});

export default store;
