import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
const { ipcRenderer } = require('electron');
Vue.use(VueRouter);
import Layout from '@/views/layout/index.vue'
/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/
const routes: RouteConfig[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [{
            path: '/home',
            name:'home',
            component: () => import('@/views/Home.vue'),
            meta: {
                title: '首页'
            }
        }]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        meta: {
            title: '用户',
        },
        children: [{
            path: 'list',
            name: 'user-list',
            component: () => import("@/views/user/list.vue"),
            meta: {
                title: '列表'
            }
        }, {
            path: 'about',
            name: 'user-about',
            component: () => import("@/views/About.vue"),
            meta: {
                title: '关于'
            }

        }
        ]
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
