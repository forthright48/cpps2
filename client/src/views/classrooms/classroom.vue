<template>
    <div class="app-container">
        <h3>{{classroom.name}}</h3>
        <el-row>
            <el-col :span="8">
                <el-input v-model="newStudentUsername" placeholder="Student ID" />
            </el-col>
            <el-col :span="8">
                <el-button type="primary" @click="addNewStudent">Create</el-button>
            </el-col>
        </el-row>
        <br />
        <br />
    </div>

</template>

<script>
import { fetchClassroom, addNewStudentToClassroom } from '@/store/actions'
import { mapGetters } from 'vuex'
export default {
    props: ['classroomId'],

    data() {
        return {
            newStudentUsername: '',
        }
    },

    computed: {
        ...mapGetters([
            'classroom',
        ]),
    },

    async created() {
        await this.$store.dispatch(fetchClassroom, this.classroomId)
    },

    methods: {
        async addNewStudent() {
            await this.$store.dispatch(addNewStudentToClassroom, {
                classroomId: this.classroomId,
                studentUsername: this.newStudentUsername,
            })
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
