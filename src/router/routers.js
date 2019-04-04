import Main from '@/view/main'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
  {
    path: '/',
    name: '首页',
    redirect: '/home',
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/view/single-page/home/home.vue')
      }
    ]
  },
  {
    path: '/self',
    name: 'self',
    component: Main,
    children: [
      {
        path: '/tab_self',
        name: 'tab_self',
        component: () => import('@/view/tab/components/tab_self')
      },]
  },

  {
    path: '/random',
    name: 'random',
    component: Main,
    children: [
      {
        path: '/tab_random',
        name: 'tab_random',
        component: () => import('@/view/tab/components/tab_random'),
      },]
  },

  {
    path: '/ran_evi',
    name: 'ran_evi',
    component: Main,
    children: [
      {
        path: '/random_evidence',
        name: 'random_evidence',
        component: () => import('@/view/tab/components/random_evidence'),
      },]
  },

  {
    path: '/self_evi',
    name: 'self_evi',
    component: Main,
    children: [
      {
        path: '/self_evidence',
        name: 'self_evidence',
        component: () => import('@/view/tab/components/self_evidence'),
      },]
  },

  {
    path: '/detail',
    name: 'detail',
    component: Main,
    children: [
      {
        path: '/roomDetail',
        name: 'roomDetail',
        component: () => import('@/view/tab/components/roomDetail'),
      },]
  },

  {
    path: '/usual',
    name: 'usual',
    component: Main,
    children: [
      {
        path: '/tab_usual',
        name: 'tab_usual',
        component: () => import('@/view/tab/components/tab_usual')
      },]
  },

  {
    path: '/seat',
    name: 'seat',
    component: Main,
    children: [
      {
        path: '/seatList',
        name: 'seatList',
        component: () => import('@/view/tab/components/seatList')
      },]
  },

  {
    path: '/endT',
    name: 'endT',
    component: Main,
    children: [
      {
        path: '/endTime',
        name: 'endTime',
        component: () => import('@/view/tab/components/endTime')
      },]
  },

  {
    path: '/history',
    name: 'history',
    component: Main,
    children: [
      {
        path: '/tab_history',
        name: 'tab_history',
        component: () => import('@/view/tab/components/tab_history')
      },]
  },
  {
    path: '/currentBOOK',
    name: 'currentBOOK',
    component: Main,
    children: [
      {
        path: '/currentBook',
        name: 'currentBook',
        component: () => import('@/view/tab/components/currentBook')
      },]
  },
  {
    path: '/extendTime',
    name: 'extendTime',
    component: Main,
    children: [
      {
        path: '/extendTimes',
        name: 'extendTimes',
        component: () => import('@/view/tab/components/extendTimes')
      },]
  },

  {
    path: '/401',
    name: 'error_401',
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    component: () => import('@/view/error-page/404.vue')
  }
]
