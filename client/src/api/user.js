import request from '@/utils/request'

export function getUser(username) {
    return request({
        url: `/api/v1/user/${username}`,
        method: 'get',
    })
}

export function setOjUsername(username, ojname, ojUsername) {
    return request({
        url: `/api/v1/users/${username}/set-oj-username/${ojname}/${ojUsername}`,
        method: 'put',
    })
}
