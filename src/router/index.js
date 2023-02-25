import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/introduce'
    },
    {
      path: '/introduce',
      name: 'introduce',
      component: () => import(/* webpackChunkName: "introduce" */ '../views/Introduce.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '../views/Index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
      path: '/add',
      name: 'add',
      component: () => import(/* 添加商品 webpackChunkName: "add" */ '../views/AddGood.vue')
    },
    {
      path: '/update',
      name: 'update',
      component: () => import(/* 添加商品 webpackChunkName: "add" */ '../views/UpdateGood.vue')
    },
    {
      path: '/backdetail',
      name: 'backdetail',
      component: () => import(/* 添加商品 webpackChunkName: "add" */ '../views/BuyBackDetail.vue')
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: () => import(/* webpackChunkName: "swiper" */ '../views/Swiper.vue')
    },
    {
      path: '/hot',
      name: 'hot',
      component: () => import(/* webpackChunkName: "hot" */ '../views/IndexConfig.vue')
    },
    {
      path: '/new',
      name: 'new',
      component: () => import(/* webpackChunkName: "new" */ '../views/IndexConfig.vue')
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import(/* webpackChunkName: "recommend" */ '../views/IndexConfig.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue'),
      children: [
        {
          path: '/category/level2',
          name: 'level2',
          component: () => import(/* webpackChunkName: "level2" */ '../views/Category.vue'),
        },
        {
          path: '/category/level3',
          name: 'level3',
          component: () => import(/* webpackChunkName: "level3" */ '../views/Category.vue'),
        }
      ]
    },
    {
      path: '/good',
      name: 'good',
      component: () => import(/* webpackChunkName: "new" */ '../views/Good.vue')
    },
    {
      path: '/guest',
      name: 'guest',
      // component: () => import(/* webpackChunkName: "guest" */ '../views/Guest.vue')
      component: () => import(/* webpackChunkName: "guest" */ '../views/GuestV2Search.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "order" */ '../views/OrderV2.vue')
    },
    {
      path: '/order_detail',
      name: 'order_detail',
      component: () => import(/* webpackChunkName: "order_detail" */ '../views/OrderDetail.vue')
    },
    {
      path: '/withdrawal',
      name: 'withdrawal',
      component: () => import(/* webpackChunkName: "order_detail" */ '../views/Withdrawal.vue')
    },
    {
      path: '/mall_collect',
      name: 'mall_collect',
      component: () => import(/* webpackChunkName: "order_detail" */ '../views/OrderBuyBack.vue')
    },
    {
      path: '/mall_chat',
      name: 'mall_chat',
      component: () => import(/* webpackChunkName: "order_detail" */ '../views/ChatService.vue')
    },
    {
      path: '/update_chat',
      name: 'update_chat',
      component: () => import(/* webpackChunkName: "order_detail" */ '../views/ChatUpdate.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue')
    },
    {
      path: '/update_user',
      name: 'update_user',
      component: () => import(/* webpackChunkName: "account" */ '../views/UpdateUser.vue')
    }
  ]
})

export default router
