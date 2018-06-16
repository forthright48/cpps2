import { getOjInfo } from '@/api/ojInfo'

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
    // 登录
    async GetOjInfo({ commit }) {
      try {
        const response = await getOjInfo()
        const data = response.data
        // Normalize data
        const obj = {}
        data.forEach((value, key, arr) => {
          obj[value.name] = value
        })
        commit('SET_OJINFO', obj)
        return data
      } catch (err) {
        throw err
      }
    }
  }
}

export default ojInfo
