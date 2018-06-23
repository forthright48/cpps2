import request from '@/utils/request'

export function addItem(form) {
  return request({
    url: '/api/v1/gateway',
    method: 'post',
    data: form
  })
}

export function getFolder(folderId) {
  return request({
    url: `/api/v1/gateway?parentId=${folderId}`,
    method: 'get'
  })
}

export function getItem(itemId) {
  return request({
    url: `/api/v1/gateway/${itemId}`,
    method: 'get'
  })
}
