import Api from '@/api/classroom'
import { normalizeVuexArray } from '@/utils'

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
            let response = await Api.getClassroom(classroomId)
            const classroom = response.data
            classroom.students = normalizeVuexArray(classroom.students, '_id')
            for (const userId in classroom.students) {
                classroom.students[userId].totalSolved = 0
            }
            context.commit('SET_CLASSROOM', classroom)

            response = await Api.getLeaderboard(classroomId)
            const leaderboard = response.data
            for (const student of leaderboard) {
                classroom.students[student._id].totalSolved = student.totalSolved
            }

            context.commit('SET_CLASSROOM', classroom)
        },

        async addNewStudentToClassroom(context, { classroomId, studentUsername }) {
            await Api.addStudent(classroomId, studentUsername)
            context.dispatch('fetchClassroom', context.state.classroom._id)
        },
    },
}
