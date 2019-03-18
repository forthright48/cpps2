import {
    getClassroom,
    addStudent,
} from '@/api/classroom'

export default {
    state: {
        classroom: {
            students: [],
        },
    },

    mutations: {
        SET_CLASSROOM(context, classroom) {
            context.classroom = classroom
        },
    },

    actions: {
        async fetchClassroom(context, classroomId) {
            const response = await getClassroom(classroomId)

            context.commit('SET_CLASSROOM', response.data)
        },

        async addNewStudentToClassroom(context, { classroomId, studentUsername }) {
            await addStudent(classroomId, studentUsername)
            context.dispatch('fetchClassroom', context.state.classroom._id)
        },
    },
}
