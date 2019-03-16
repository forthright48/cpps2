<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <h3>Students</h3>
            </div>
            <el-row>
                <el-col :span="20">
                    <el-input v-model="newStudentUsername" placeholder="Student ID" />
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addNewStudent">Create</el-button>
                </el-col>
            </el-row>
            <br />
            <br />
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
        </el-card>
    </div>
</template>

<script>
import { addNewStudentToClassroom } from '@/store/actions'
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
