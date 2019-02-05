import { getUser } from '@/api/user'
import { normalizeVuexArray } from '@/utils'

const profile = {
    state: {
        username: '',
        roles: [],
        ojStats: {},
    },

    mutations: {
        SET_PROFILE: (state, profile) => {
            state.username = profile._id
            state.roles = profile.roles
            state.ojStats = normalizeVuexArray(profile.ojStats, 'ojname')
        },
    },

    actions: {
        async FetchProfile({ commit }, username) {
            try {
                const response = await getUser(username)
                const data = response.data
                commit('SET_PROFILE', data)
                return data
            } catch (err) {
                throw err
            }
        },
    },
}

export default profile
