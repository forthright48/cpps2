import request from '@/utils/request'

export function getUser(username) {
  return request({
    url: `/api/v1/user/${username}`,
    method: 'get',
  })
}
