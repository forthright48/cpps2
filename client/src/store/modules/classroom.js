import {
    getClassroom,
    addStudent,
} from '@/api/classroom'

export default {
    state: {
        classroom: {},
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
            console.log(`classid = ${classroomId}, studentUsername = ${studentUsername}`)
            const response = await addStudent(classroomId, studentUsername)
        },
    },
}
