import {
    getClassrooms,
    createClassroom,
} from '@/api/classrooms'

export default {
    state: {
        classrooms: [],
    },

    mutations: {
        SET_CLASSROOMS(context, classrooms) {
            context.classrooms = classrooms
        },

        ADD_CLASSROOM(context, classroom) {
            context.classrooms.push(classroom)
        },
    },

    actions: {
        async fetchClassrooms(context) {
            const response = await getClassrooms()
            context.commit('SET_CLASSROOMS', response.data)
        },

        async createNewClassroom(context, name) {
            const response = await createClassroom(name)
            context.commit('ADD_CLASSROOM', response.data)
        },
    },
}
