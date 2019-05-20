import request from '@/utils/request'

export function addItem(form) {
    if (!form.parentId) return
    return request({
        url: `/api/v1/gateway/${form.parentId}/content`,
        method: 'post',
        data: form,
    })
}

export function getRootFolderId() {
    return request({
        url: `/api/v1/gateway-root`,
        method: 'get',
    })
}

export function getFolder(folderId) {
    return request({
        url: `/api/v1/gateway/${folderId}/content?childStat=true`,
        method: 'get',
    })
}

export function getItem(itemId) {
    return request({
        url: `/api/v1/gateway/${itemId}`,
        method: 'get',
    })
}

export function getFolderMapping() {
    return request({
        url: `/api/v1/gateway?type=folder`,
        method: 'get',
    })
}

export function deleteItem(id) {
    return request({
        url: `api/v1/gateway/${id}`,
        method: 'delete',
    })
}
