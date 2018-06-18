import { getOjInfo } from '@/api/ojInfo'
import { normalizeVuexArray } from '@/utils'

const ojInfo = {
  state: {
    ojInfo: {}
  },

  mutations: {
    SET_OJINFO: (state, ojInfo) => {
      state.ojInfo = ojInfo
    }
  },

  actions: {
    async GetOjInfo({ commit }) {
      try {
        const response = await getOjInfo()
        const data = response.data
        // Normalize data
        const obj = normalizeVuexArray(data, 'name')
        commit('SET_OJINFO', obj)
        return data
      } catch (err) {
        throw err
      }
    }
  }
}

export default ojInfo
