import {
    getProblemLists,
    createProblemList,
} from '@/api/problemLists'

export default {
    state: {
        problemLists: [],
    },

    mutations: {
        SET_PROBLEM_LISTS(context, problemLists) {
            context.problemLists = problemLists
        },

        ADD_PROBLEM_LIST(context, problemList) {
            context.problemLists.push(problemList)
        },
    },

    actions: {
        async createNewProblemList(context, name) {
            const response = await createProblemList(name)
            context.commit('ADD_PROBLEM_LIST', response.data)
        },

        async fetchProblemLists(context) {
            const response = await getProblemLists()
            context.commit('SET_PROBLEM_LISTS', response.data)
        },
    },

}
