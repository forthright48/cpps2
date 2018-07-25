import { getUser } from '@/api/user'

const profile = {
  state: {
    profile: {}
  },

  mutations: {
    SET_PROFILE: (state, profile) => {
      state.ojInfo = profile
    }
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
    }
  }
}

export default profile
