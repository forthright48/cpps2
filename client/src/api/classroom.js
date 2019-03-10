import request from '@/utils/request'

export function getClassroom(classroomId) {
    return request({
        url: `/api/v1/classrooms/${classroomId}`,
    })
}

export function addStudent(classroomId, studentUsername) {
    return request({
        url: `/api/v1/classrooms/${classroomId}/students`,
        method: 'put',
        data: {
            studentUsername,
        },
    })
}
