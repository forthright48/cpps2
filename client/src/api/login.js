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
    url: '/api/v1/users/info',
    method: 'get',
    params: { token },
  })
}

export function logout() {
  return request({
    url: '/api/v1/users/logout',
    method: 'post',
  })
}
