import request from '@/utils/request'

export default {
    getClassrooms(userId) {
        console.log('should have called /api/v1/classrooms?student=${userId}')
        return request({
            url: `/api/v1/classrooms?student=${userId}`,
        })
    },
}
