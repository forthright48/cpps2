import request from '@/utils/request'

export function getProblemLists() {
    return request({
        url: `/api/v1/problemlists`,
    })
}

export function createProblemList(name) {
    return request({
        url: `/api/v1/problemlists`,
        method: 'post',
        data: {
            title: name,
        },
    })
}
