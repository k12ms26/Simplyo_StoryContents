import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

import VueRouter from 'vue-router';
import {
    MainPage,
    page
} from './components/pages';

import './index.css';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(VueRouter);

const routes = [{
        path: '',
        component: MainPage,
    },
    {
        path: '/page',
        component: page,
        name: 'Page',
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0
            };
        }
    },
});

new Vue({
    render: (h) => h(App),
    router,
}).$mount('#app');