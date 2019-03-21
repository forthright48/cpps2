import request from '@/utils/request'

export default {
    getUser(username) {
        return request({
            url: `/api/v1/users/${username}`,
            method: 'get',
        })
    },

    syncSolveCount(username) {
        return request({
            url: `/api/v1/users/${username}/sync-solve-count`,
            method: 'put',
        })
    },

    setOjUsername(username, ojname, ojUsername) {
        return request({
            url: `/api/v1/users/${username}/set-oj-username/${ojname}/${ojUsername}`,
            method: 'put',
        })
    },

    unsetOjUsername(username, ojname, ojUsername) {
        return request({
            url: `/api/v1/users/${username}/unset-oj-username/${ojname}`,
            method: 'put',
        })
    },
}
