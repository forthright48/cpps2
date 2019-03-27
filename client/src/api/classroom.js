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

    getContests(classroomId) {
        return request({
            method: 'get',
            url: `/api/v1/contests?classroomId=${classroomId}`,
        })
    },

    addNewContestToClassroom(classroomId, name, link) {
        return request({
            method: 'post',
            url: `/api/v1/contests`,
            data: {
                classroomId,
                name,
                link,
            },
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
