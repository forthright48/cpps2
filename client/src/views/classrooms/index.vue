<template>
    <div class="app-container">
        <h3>Classrooms</h3>
        <el-row>
            <el-col :span="8">
                <el-input v-model="newClassroomName" placeholder="Classroom name" />
            </el-col>
            <el-col :span="8">
                <el-button type="primary" @click="createClassroom">Create</el-button>
            </el-col>
        </el-row>
        <br />
        <br />
        <el-row>
            <el-table :data="getClassrooms">
                <el-table-column prop="index" label="#" />
                <el-table-column label="Classroom name">
                    <template slot-scope="scope">
                        <router-link :to="`/classrooms/${scope.row._id}`">{{scope.row.name}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="students" label="Students" />
            </el-table>
        </el-row>
    </div>

</template>

<script>
import { fetchClassrooms, createNewClassroom } from '@/store/actions'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            newClassroomName: '',
        }
    },

    computed: {
        ...mapGetters([
            'classrooms',
        ]),

        getClassrooms() {
            return this.classrooms.map((classroom, idx) => {
                return {
                    _id: classroom._id,
                    index: idx + 1,
                    name: classroom.name,
                    students: classroom.students.length > 0 ? `${classroom.students.length} students` : 'No students yet',
                }
            })
        },
    },

    async created() {
        await this.$store.dispatch(fetchClassrooms)
        console.log(this.classrooms)
    },

    methods: {
        async createClassroom() {
            await this.$store.dispatch(createNewClassroom, this.newClassroomName)
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
