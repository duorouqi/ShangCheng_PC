
const getDefaultState = () => {
    return {
        id: '',
    }
}


const mutations = {
    SET_USERID: (state, id) => {
        state.userId = id
    }
}

const state = getDefaultState()

const actions = {
    // user login
    login({ commit, dispatch }, userInfo) {
        const { username: account, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ account, password })
                .then(res => {
                    const { token = '', id = '' } = res.data
                    commit('SET_TOKEN', token)

                    commit('SET_ID', id)
                    setID(id)
                    setToken(res.data.token)
                    resolve(res.data)
                })
                .catch(error => {
                    reject(error)
                })

            //   login({ username: username.trim(), password: password }).then(response => {
            //     const { data } = response
            //     commit('SET_TOKEN', data.token)
            //     setToken(data.token)
            //     resolve(data)
            //   }).catch(error => {
            //     reject(error)
            //   })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            // removeToken() // must remove  token  first
            // resetRouter()
            logout(state.token)
                .then(() => {
                    removeToken()
                    commit('SET_TOKEN', null)
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    initMenu({ commit }) {
        return new Promise((resolve, reject) => {
            getMenus().then((res) => {
                // vue路由
                commit('SET_ORGLIST', res.data.orgList)
                commit('SET_TEAMLIST', res.data.teamList)
                commit('SET_USERNAME', res.data.name)
                commit('SET_USERID', res.data.id)
                commit('SET_USERROLE', res.data.roleList)
                const postRouter = res.data.menuList
                const data = []
                postRouter.forEach(item => {
                    if (item.level !== 20) {
                        asyncRoutes.forEach(item2 => {
                            if (item.url === item2.path) {
                                data.push(item2)
                            }
                        })

                        if (item.children && item.children.length > 0) {
                            item.children.forEach(item2 => {
                                if (item2.level !== 20) {
                                    asyncRoutes.forEach(item3 => {
                                        if (item2.url === item3.path) {
                                            data.push(item3)
                                        }
                                    })
                                    if (item2.children && item2.children.length > 0) {
                                        item2.children.forEach(item3 => {
                                            if (item3.level !== 20) {
                                                asyncRoutes.forEach(item4 => {
                                                    if (item4.path.indexOf(':') !== -1) {
                                                        const newPath = item4.path.substring(0, item4.path.indexOf(':') - 1)
                                                        if (item3.url === newPath) {
                                                            data.push(item4)
                                                        }
                                                    } else {
                                                        if (item3.url === item4.path) {
                                                            data.push(item4)
                                                        }
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
                constantRoutes[0].children = data
                constantRoutes[0].redirect = data[0].path
                router.addRoutes(constantRoutes) // 动态添加可访问路由表
                router.options.routes = constantRoutes
                commit('SET_FIRSTEROUTERS', constantRoutes[0].children[0].path)

                const postRouter2 = res.data.menuList
                // const postRouter = res.data
                // 导航栏菜单那
                const data2 = []
                jurisdiction = []
                postRouter2.forEach(item => {
                    data2.push(recursion(item))
                })
                commit('SET_JURISDICTION', jurisdiction)
                commit('SET_ROUTERS', data2)
                resolve()
            })
        })
    },

}

export default {
    state,
    mutations,
    actions
}
