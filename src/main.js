import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/index.css'
import ElementPlus from 'element-plus'
import store from "./store/index.js";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//icon图标的注册与使用，
import * as Icons from '@element-plus/icons-vue' //统一导入
import '@/permission' // permission control
const app = createApp(App)
for(let iName in Icons) {
    app.component(iName, Icons[iName])
}
app.use(router)
  .use(ElementPlus,{locale: zhCn,})
  .use(store)
  .mount('#app')
