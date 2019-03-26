import request from '@/utils/request'

export default {
    getClassroom(classroomId) {
        return request({
            url: `/api/v1/classrooms/${classroomId}`,
        })
    },

    getLeaderboard(classroomId) {
        return request({
            method: 'get',
            url: `/api/v1/classrooms/${classroomId}/leaderboard`,
        })
    },

    addStudent(classroomId, studentUsername) {
        return request({
            url: `/api/v1/classrooms/${classroomId}/students`,
            method: 'put',
            data: {
                studentUsername,
            },
        })
    },
}
