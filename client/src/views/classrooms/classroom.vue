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
        <el-col :span="8">
            <el-row>
                <el-table :data="getStudents">
                    <el-table-column prop="index" label="#" />
                    <el-table-column label="Students">
                        <template slot-scope="scope">
                            <!-- <router-link :to="`/classrooms/${scope.row._id}`">{{scope.row.name}}</router-link> -->
                            <span>{{scope.row.username}}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="students" label="Students" /> -->
                </el-table>
            </el-row>
        </el-col>
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

        getStudents() {
            return this.classroom.students.map((student, idx) => {
                return {
                    index: idx + 1,
                    _id: student._id,
                    username: student.username,
                }
            })
        },
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
