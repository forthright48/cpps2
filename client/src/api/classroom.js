import request from '@/utils/request'

export function getClassroom(classroomId) {
    return request({
        url: `/api/v1/classrooms`,
    })
}

export function addStudent(classroomId, studentId) {
    return request({
        url: `/api/v1/classrooms/${classroomId}/students`,
        method: 'put',
        data: {
            students: [
                studentId,
            ],
        },
    })
}
