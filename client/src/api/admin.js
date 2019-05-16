import request from '@/utils/request'

export default {
    getUserList(listName, skip = 0, filter = {}) {
        return request({
            url: `/api/v1/admin/${listName.toLowerCase()}`,
            method: 'get',
            params: { skip, filter },
        })
    },
}
