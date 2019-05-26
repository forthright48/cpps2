import request from '@/utils/request'

export default {
    getClassrooms() {
        return request({
            url: `/api/v1/classrooms?student=true`,
        })
    },
}
