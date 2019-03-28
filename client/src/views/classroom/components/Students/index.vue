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
            <el-table :data="getStudents" border>
                <el-table-column prop="index" label="#" width="40" />
                <el-table-column label="Students">
                    <template slot-scope="scope">
                        <span>{{scope.row.username}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="currentRating" :sortable="true" label="Rating" width="100" />
                <el-table-column prop="totalSolved" :sortable="true" label="Total Solved" width="130" />
                <el-table-column label="Actions" width="80">
                    <template slot-scope="scope">
                        <el-button size="mini" round type="danger" @click="handleDeleteItem(scope.row.username)">
                            <fa-icon class="vertical-middle" name="trash" />
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import { addNewStudentToClassroom, removeStudentFromClasssroom } from '@/store/actions'
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
            const data = []
            for (const userId in this.classroom.students) {
                const student = {
                    _id: this.classroom.students[userId]._id,
                    username: this.classroom.students[userId].username,
                    totalSolved: this.classroom.students[userId].totalSolved,
                    currentRating: this.classroom.students[userId].currentRating,
                }
                data.push(student)
            }

            data.sort((a, b) => {
                return b.currentRating - a.currentRating
            })

            for (let i = 0; i < data.length; i++) {
                data[i].index = i + 1
            }

            return data
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

        async handleDeleteItem(studentUsername) {
            await this.$store.dispatch(removeStudentFromClasssroom, {
                classroomId: this.classroomId,
                studentUsername,
            })
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
