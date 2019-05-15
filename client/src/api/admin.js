import request from '@/utils/request'

export default {
    getUsers(skip = 0) {
        return request({
            url: `/api/v1/admin/users`,
            method: 'get',
            params: { skip },
        })
    },

    getCoaches(skip = 0) {
        return request({
            url: `/api/v1/admin/coaches`,
            method: 'get',
            params: { skip },
        })
    },

    getAdmins(skip = 0) {
        return request({
            url: `/api/v1/admin/admins`,
            method: 'get',
            params: { skip },
        })
    },
}
