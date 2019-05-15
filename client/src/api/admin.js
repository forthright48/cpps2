import request from '@/utils/request'

export default {
    getUserList(listName, skip = 0) {
        return request({
            url: `/api/v1/admin/${listName.toLowerCase()}`,
            method: 'get',
            params: { skip },
        })
    },
}
