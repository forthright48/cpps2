import { getUser, setOjUsername, unsetOjUsername } from '@/api/user'
import { normalizeVuexArray } from '@/utils'

const profile = {
    state: {
        username: '',
        roles: [],
        ojStats: {},
    },

    mutations: {
        SET_PROFILE: (state, profile) => {
            state.username = profile.username
            state.roles = profile.roles
            state.ojStats = normalizeVuexArray(profile.ojStats, 'ojname')
        },
    },

    actions: {
        async fetchProfile({ commit }, username) {
            try {
                const response = await getUser(username)
                const data = response.data
                commit('SET_PROFILE', data)
                return data
            } catch (err) {
                throw err
            }
        },

        async setOjUsername({ dispatch }, { username, ojname, ojUsername }) {
            try {
                await setOjUsername(username, ojname, ojUsername)
                dispatch('fetchProfile', username) // We should have read username from Vuex.
            } catch (err) {
                throw err
            }
        },

        async unsetOjUsername({ dispatch }, { username, ojname, ojUsername }) {
            try {
                await unsetOjUsername(username, ojname, ojUsername)
                dispatch('fetchProfile', username) // We should have read username from Vuex.
            } catch (err) {
                throw err
            }
        },

    },
}

export default profile
