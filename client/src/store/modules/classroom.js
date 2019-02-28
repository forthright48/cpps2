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

            // Hotfix
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i]._id === classroomId) {
                    context.commit('SET_CLASSROOM', response.data[i])
                    return
                }
            }
        },

        async addNewStudentToClassroom(context, { classroomId, studentId }) {
            console.log(`classid = ${classroomId}, studentId = ${studentId}`)
            const response = await addStudent(classroomId, studentId)
        },
    },
}
