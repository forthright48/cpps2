<template>
    <div>
        <el-row>
            <el-col :span="19">
                <el-input v-model="newClassroomName" placeholder="Classroom name" />
            </el-col>
            <el-col :span="1"> &nbsp; </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="createClassroom">Create</el-button>
            </el-col>
        </el-row>
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
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            newClassroomName: '',
        }
    },

    computed: {
        ...mapGetters({
            user: 'user',
            classrooms: 'coach_classrooms',
        }),

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
        await this.$store.dispatch('Coach/fetchClassrooms', this.user._id)
    },

    methods: {
        async createClassroom() {
            await this.$store.dispatch('Coach/createNewClassroom', this.newClassroomName)
            this.newClassroomName = ''
        },
    },
}
</script>
