import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
const { ipcRenderer } = require('electron');
import { UserModule } from './../store/modules/user';
Vue.use(VueRouter);
import Layout from '@/views/layout/index.vue'
/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hiddenSubmenu:true           if true, this route will not show the submenu (default is false)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    rootMenu:true                if true, this route`s children will as the root menu (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/
export const routes: RouteConfig[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        meta: {
            rootMenu: true
        },
        children: [{
            path: 'home',
            name: 'home',
            component: () => import('@/views/Home.vue'),
            meta: {
                title: '首页',
                icon: 'shouye'
            }
        }]
    }, {
        path: '/wholesale',
        component: Layout,
        redirect: '/wholesale/sell',
        meta: {
            title: '批发管理',
            icon: 'pifa'
        },
        children: [{
            path: 'sell',
            name: 'wholesale-sell',
            component: () => import("@/views/wholesale/sell/index.vue"),
            meta: {
                title: '批发销售',
                icon: 'xiaoshouzu',

            }
        }, {
            path: 'record',
            name: 'wholesale-record',
            component: () => import("@/views/wholesale/record/index.vue"),
            meta: {
                title: '批发记录',
                icon: 'dingdan'
            }

        }
        ]
    }, {
        path: '/baseFile',
        component: Layout,
        redirect: '/baseFile/goods',
        meta: {
            title: '基本档案',
            icon: 'dangan'
        },
        children: [{
            path: 'goods',
            name: 'baseFile-goods',
            component: () => import("@/views/baseFile/goods/index.vue"),
            meta: {
                title: '商品档案',
                icon: 'shangpin'
            }
        }, {
            path: 'merchant',
            name: 'baseFile-merchant',
            component: () => import("@/views/baseFile/merchant/index.vue"),
            meta: {
                title: '商户档案',
                icon: 'kehu',
            },
        }, {
            path: 'brand',
            name: 'baseFile-brand',
            component: () => import("@/views/baseFile/brand/index.vue"),
            meta: {
                title: '品牌档案',
                icon: 'kehu',
            },
        }
        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        meta: {
            title: '用户',
            icon: 'yonghu'
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
        meta: {
            hidden: true
        }
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
router.beforeEach(async (to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        if (JSON.stringify(UserModule.userInfo) == '{}') {
            try {
                const result = await UserModule.getUserInfo()
                if (result) {
                    next()
                } else {
                    next({ path: '/login' })
                }
            } catch (error) {
                console.log(error)
                next({ path: '/login' })
            }

        } else {
            next()
        }
    }
})
export default router;
