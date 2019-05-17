import admin from '@/api/admin'

const Admin = {
    state: {
        users: [],
    },

    mutations: {
        CLEAR_USER_LIST: (state) => {
            state.users = []
        },
        ADD_TO_LIST: (state, usersToAdd) => {
            state.users.push(...usersToAdd)
        },
    },

    actions: {
        ClearUserList({ commit, state }) {
            commit('CLEAR_USER_LIST')
        },
        FetchUserList({ commit, state }, listName) {
            return new Promise((resolve, reject) => {
                const skip = state.users.length
                admin.getUserList(listName, skip, filter).then(({ users: usersToAdd }) => {
                    commit('ADD_TO_LIST', usersToAdd)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        AddRole({ commit, state }, { username, role }) {
            return new Promise((resolve, reject) => {
                if (!username || !role) reject('no username or role specified')
                admin.addRole(username, role).then(({ user }) => {
                    resolve(user)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        RemoveRole({ commit, state }, { username, role }) {
            return new Promise((resolve, reject) => {
                if (!username || !role) reject('no username or role specified')
                admin.removeRole(username, role).then(({ user }) => {
                    resolve(user)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    },
}

export default Admin
