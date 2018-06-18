import request from '@/utils/request'

export function addItem(form) {
  return request({
    url: '/api/v1/gateway',
    method: 'post',
    data: form
  })
}
