import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import routes from './routes'
import fn from './page/util/fn'
import Mint from 'mint-ui';
import LazyLoad from 'vue-lazyload';
import promise from 'es6-promise';
import $ from 'jquery';

import './assets/less/base.less'
import './assets/less/table.less'
promise.polyfill();
Vue.use(fn)
Vue.use(VueRouter)
Vue.use(Mint);
Vue.use(LazyLoad);
// Vue.use($);
promise.polyfill();
const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    console.log(to);
    if(to.path == '/login' || to.path == '/register' || to.path == '/forget') {
        window['localStorage'].clear();
        window['sessionStorage'].clear();
        next();
    }else{
        let user = JSON.parse(window.localStorage.getItem('userInfo'));
        console.log(user);
        var toUrl = to.path;
        if(!user) {
            next({
                path: '/login'
            });
        } else {
            next();
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount("#app")

