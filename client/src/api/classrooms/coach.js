import request from '@/utils/request'

export default {
    getClassrooms(userId) {
        return request({
            url: `/api/v1/classrooms?coach=${userId}`,
        })
    },

    createClassroom(name) {
        return request({
            url: `/api/v1/classrooms`,
            method: 'post',
            data: {
                name,
                students: '[]', // Hotfix.
            },
        })
    },
}
