import {
    addProblemToProblemList,
    getProblemList,
} from '@/api/problemList'

export default {
    state: {
        problemList: {
            problems: [],
        },
    },

    mutations: {
        SET_PROBLEM_LIST(context, problemList) {
            context.problemList = problemList
        },
    },

    actions: {
        async fetchProblemList(context, problemListId) {
            const response = await getProblemList(problemListId)

            context.commit('SET_PROBLEM_LIST', response.data)
        },

        async createNewProblem(context, { platform, title, problemId, link }) {
            const problemListId = context.state.problemList._id
            const response = await addProblemToProblemList(problemListId, platform, title, problemId, link)
        },
    },
}
