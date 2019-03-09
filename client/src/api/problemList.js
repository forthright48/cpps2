import request from '@/utils/request'

export function getProblemList(problemListId) {
    return request({
        method: 'get',
        url: `/api/v1/problemlists/${problemListId}`,
    })
}

export function addProblemToProblemList(problemListId, platform, title, problemId, link) {
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
}
