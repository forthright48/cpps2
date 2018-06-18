import { addItem } from '@/api/gateway'
// import { normalizeVuexArray } from '@/api/utils'

// Imagine I am looking into a folder
const gateway = {
  state: {
    itemList: {} // Contains list of items in this folder
  },

  mutations: {
    SET_GATEWAY_ITEMS: (state, items) => {
      state.items = items
    }
  },

  actions: {
    async GatewayAddItems({ commit, state }, form) {
      try {
        const response = await addItem(form)
        const data = response.data

        const newItemList = { ...state.itemList }
        newItemList[data._id] = data
        commit('SET_GATEWAY_ITEMS', newItemList)
      } catch (err) {
        throw err
      }
    }
  }
}

export default gateway
