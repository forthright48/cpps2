import { addItem, getItem, getFolder } from '@/api/gateway'
// import { normalizeVuexArray } from '@/api/utils'

// Imagine I am looking into a folder
const gateway = {
  state: {
    root: {},
    itemList: {} // Contains list of items in this folder
  },

  mutations: {
    SET_GATEWAY_ITEMS: (state, items) => {
      state.itemList = items
    },
    SET_GATEWAY_ROOT: (state, item) => {
      state.root = item
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
    },
    async GatewayInit({ commit, state }, folderId) {
      try {
        const getItemsPromise = getFolder(folderId)
        const getRootPromise = getItem(folderId)

        const [getItemsResponse, getRootResponse] = await Promise.all([
          getItemsPromise, getRootPromise
        ])

        commit('SET_GATEWAY_ITEMS', getItemsResponse.data)
        commit('SET_GATEWAY_ROOT', getRootResponse.data)
      } catch (err) {
        throw err
      }
    }
  }
}

export default gateway
