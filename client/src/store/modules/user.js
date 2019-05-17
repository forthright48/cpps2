import { login, logout, getInfo, getStatus, register } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        _id: '',
        username: '',
        email: '',
        roles: [],
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ID: (state, _id) => {
            state._id = _id
        },
        SET_USERNAME: (state, username) => {
            state.username = username
        },
        SET_EMAIL: (state, email) => {
            state.email = email
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
    },

    actions: {
    // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    const data = response.data
                    setToken(data.token)
                    commit('SET_TOKEN', data.token)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        Register({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                register(userInfo.username, userInfo.email, userInfo.password).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(response => {
                    const data = response.data
                    if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('getInfo: roles must be a non-null array !')
                    }
                    commit('SET_ID', data.userId)
                    commit('SET_USERNAME', data.username)
                    commit('SET_EMAIL', data.email)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        GetStatus({ commit, state }) {
            return new Promise((resolve, reject) => {
                getStatus().then(response => {
                    if (parseInt(response.status) === 200) {
                        resolve(response.status)
                    } else {
                        reject('Invalid Token')
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                logout(state.token).then(() => {
                    resolve()
                }).catch(() => {
                    resolve()
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },
    },
}

export default user
