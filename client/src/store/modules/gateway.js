import {
    addItem,
    getItem,
    getFolder,
    getFolderMapping,
    deleteItem,
} from '@/api/gateway'
import { normalizeVuexArray } from '@/utils'

const root = '000000000000000000000000'

// Imagine I am looking into a folder
const gateway = {
    state: {
        root: {},
        // Contains list of items in this folder
        itemList: {},
        // Folder Id to Name mapping for breadcrumb
        folderMapping: {},
        gatewayBreadcrumb: [],
    },

    mutations: {
        SET_GATEWAY_ITEMS: (state, items) => {
            state.itemList = items
        },
        SET_GATEWAY_ROOT: (state, item) => {
            state.root = item
        },
        SET_GATEWAY_FOLDERMAPPING: (state, item) => {
            state.folderMapping = item
        },
        SET_GATEWAY_BREADCRUMB: (state, item) => {
            state.gatewayBreadcrumb = item
        },
    },

    actions: {
        async GatewayInit({ commit, state }, folderId) {
            try {
                // Get Folder Info
                const getItemsPromise = getFolder(folderId)
                const getRootPromise = getItem(folderId)

                const [getItemsResponse, getRootResponse] = await Promise.all([
                    getItemsPromise, getRootPromise,
                ])

                commit('SET_GATEWAY_ITEMS', normalizeVuexArray(getItemsResponse.data, '_id'))
                commit('SET_GATEWAY_ROOT', getRootResponse.data)

                // Set Gateway breadCrumb
                if (state.folderMapping[root] === undefined) {
                    // Load initial mapping
                    const allFolders = await getFolderMapping()
                    const foldersAsObject = {}
                    allFolders.data.forEach((x) => {
                        foldersAsObject[x._id] = x.title
                    })
                    commit('SET_GATEWAY_FOLDERMAPPING', foldersAsObject)
                }

                // Map array of ancestors id to proper breadcrumb array
                const ancestors = [...state.root.ancestor, state.root._id].slice(1)
                const breadCrumb = ancestors.map((folderId) => {
                    return {
                        path: `/gateway/folder/${folderId}`,
                        meta: {
                            title: state.folderMapping[folderId],
                        },
                    }
                })
                commit('SET_GATEWAY_BREADCRUMB', breadCrumb)
            } catch (err) {
                throw err
            }
        },
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
        async GatewayDeleteItem({ commit, state }, id) {
            try {
                await deleteItem(id)
                const newItemList = { ...state.itemList }
                delete newItemList[id]
                commit('SET_GATEWAY_ITEMS', newItemList)
            } catch (err) {
                throw err
            }
        },
    },
}

export default gateway
