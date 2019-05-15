import request from '@/utils/request'

export function login(username, password) {
    return request({
        url: '/api/public/users/login',
        method: 'post',
        data: {
            username,
            password,
        },
    })
}

export function register(username, email, password) {
    return request({
        url: '/api/public/users/register',
        method: 'post',
        data: {
            username,
            email,
            password,
        },
    })
}

export function getInfo(token) {
    return request({
        url: '/api/v1/user',
        method: 'get',
        params: { info: token },
    })
}

export function logout() {
    return request({
        url: '/api/v1/logout',
        method: 'post',
    })
}
