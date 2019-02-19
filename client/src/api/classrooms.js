import request from '@/utils/request'

export function getClassrooms() {
    return request({
        url: `/api/v1/classrooms`,
    })
}

export function createClassroom(name) {
    return request({
        url: `/api/v1/classrooms`,
        method: 'post',
        data: {
            name,
            students: '[]', // Hotfix.
        },
    })
}
