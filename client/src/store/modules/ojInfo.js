import { getOjInfo } from '@/api/ojInfo'

const ojInfo = {
  state: {
    ojInfo: {},
  },

  mutations: {
    SET_OJINFO: (state, ojInfo) => {
      state.ojInfo = ojInfo
    },
  },

  actions: {
    async GetOjInfo({ commit }) {
      try {
        const response = await getOjInfo()
        const data = response.data
        commit('SET_OJINFO', data)
        return data
      } catch (err) {
        throw err
      }
    },
  },
}

export default ojInfo
