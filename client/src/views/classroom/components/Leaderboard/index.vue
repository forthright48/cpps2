<template>
    <div>

    </div>
</template>

<script>
import request from '@/utils/request'
export default {
    props: [
        'classroomId',
    ],

    async created() {
        const response = request({
            method: 'get',
            url: `/api/v1/classrooms/${this.classroomId}/leaderboard`,
        })
    },
}
</script>
