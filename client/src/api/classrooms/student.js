import request from '@/utils/request'

export default {
    getClassrooms(userId) {
        return request({
            url: `/api/v1/classrooms?student=${userId}`,
        })
    },
}
