import request from '@/utils/request'

export function getOjInfo() {
    return request({
        url: '/api/v1/ojInfo',
        method: 'get',
    })
}
