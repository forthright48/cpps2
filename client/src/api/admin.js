import request from '@/utils/request'

export default {
    getUsers() {
        return request({
            url: `/api/v1/admin/users`,
            method: 'get',
        })
    },

    getCoaches() {
        return request({
            url: `/api/v1/admin/coaches`,
            method: 'get',
        })
    },

    getAdmins() {
        return request({
            url: `/api/v1/admin/admins`,
            method: 'get',
        })
    },
}
