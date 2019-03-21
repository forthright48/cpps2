import request from '@/utils/request'

export default {
    getClassrooms() {
        return request({
            url: `/api/v1/classrooms`,
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
