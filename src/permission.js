
import router from './router'
import store from './store'
import {setStorage,getStorage} from './utils/storage.js'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
import { getToken,setToken } from '@/utils/auth' // get token from cookie
// import { getToken,setToken } from '@/utils/auth' // get token from cookie
// import { postlogin } from "@/api/public"; // 登录权限
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/uploadImg'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
next()
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})
