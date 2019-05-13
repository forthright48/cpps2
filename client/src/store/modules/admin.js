import admin from '@/api/admin'

const user = {
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
        FetchUsers({ commit, state }) {
            return new Promise((resolve, reject) => {
                admin.getUsers().then(({ users: usersToAdd }) => {
                    commit('ADD_TO_LIST', usersToAdd)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    },
}

export default user
