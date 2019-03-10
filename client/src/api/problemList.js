import request from '@/utils/request'

export default {
    fetchProblemList(problemListId) {
        return request({
            method: 'get',
            url: `/api/v1/problemlists/${problemListId}`,
        })
    },

    addProblemToProblemList(problemListId, platform, title, problemId, link) {
        return request({
            method: 'put',
            url: `/api/v1/problemlists/${problemListId}/problems`,
            data: {
                platform,
                title,
                problemId,
                link,
            },
        })
    },

    addProblemListToClassroom(problemListId, classroomId) {
        return request({
            method: 'put',
            url: `/api/v1/problemlists/${problemListId}/shared-with`,
            data: {
                classId: classroomId,
            },
        })
    },
}
