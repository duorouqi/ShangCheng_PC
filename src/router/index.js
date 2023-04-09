import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/bzkPage',
    component: () => import('@/views/working/configuration.vue'),
    redirect: '/working/configuration',
    children: [
	  {
	    path: '/working/configuration',
	  	meta: { title: '标准库查询' },
	    component: () => import('@/views/working/configuration.vue')
	  }
    ]
  },
  {
    path: '/jpkPage',
    component: () => import('@/views/working/jpkPage.vue'),
    redirect: '/working/jpkPage',
    children: [
	  {
	    path: '/working/jpkPage',
	  	meta: { title: '竞品库查询' },
	    component: () => import('@/views/working/jpkPage.vue')
	  }
    ]
  },
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/Autorit',
    component: () => import('@/views/Autorit.vue')
  },
  {
    path: '/',
    redirect: '/jpkPage'
  }
]
// 3. 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

// import accompany from '../router/accompany/index.js'
//
// export const asyncRoutes = [
//   ...accompany
// ]

// const createRouter = () =>
//   new Router({
//     // mode: 'history', // require service support
//     scrollBehavior: () => ({ y: 0 }),
//     routes: constantRoutes
//   })
//
// const router = createRouter()
//
// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

router.beforeEach((to,from,next)=>{
  // console.log(to,from)
  next()
})


export default router
