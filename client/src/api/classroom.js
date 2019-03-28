import request from '@/utils/request'

export default {
    getRatings(classroomId) {
        return request({
            url: `/api/v1/ratings?classroomId=${classroomId}`,
        })
    },

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

    addNewStandingsToContest(classroomId, contestId, standings) {
        return request({
            method: 'post',
            url: `/api/v1/standings`,
            data: {
                classroomId,
                contestId,
                standings,
            },
        })
    },

    updateRatingsByContest(contestId) {
        return request({
            method: 'put',
            url: `/api/v1/ratings`,
            data: {
                contestId,
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

    removeStudent(classroomId, studentUsername) {
        return request({
            url: `/api/v1/classrooms/${classroomId}/students`,
            method: 'delete',
            data: {
                studentUsername,
            },
        })
    },
}
