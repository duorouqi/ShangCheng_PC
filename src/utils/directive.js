import Vue from 'vue'
import store from '@/store'

// 注册一个全局自定义指令 `v-imRole`
Vue.directive('imRole', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 是否是IM角色
    const data = store.state.user.userRole.find(item => {
      return item.roleId === '10000'
    })
    if (!data) {
      el.style.display = 'none'
    }
  }
})
