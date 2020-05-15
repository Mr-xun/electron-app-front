import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
const { ipcRenderer } = require('electron');
Vue.use(VueRouter);
import Layout from '@/views/layout/index.vue'
const routes: RouteConfig[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [{
            path: '/home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/about',
            name: 'About',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        }]
    }, {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index.vue'),
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
ipcRenderer.on('href', (event: void, arg: string) => {
    if (arg) {
        switch (arg) {
            case 'back':
                router.go(-1)
            default:
                router.push({ path: arg })
        }
    }
});
export default router;
