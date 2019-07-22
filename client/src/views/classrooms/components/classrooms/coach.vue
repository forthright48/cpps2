<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="10">
                <el-input v-model="newClassroomName" placeholder="Classroom name" />
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="createClassroom">Create</el-button>
            </el-col>
        </el-row>
        <br/>

        <el-row>
            <el-table :data="getClassrooms" border>
                <el-table-column prop="index" label="#"  width="40"/>
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
        await this.$store.dispatch('Coach/fetchClassrooms')
    },

    methods: {
        async createClassroom() {
            if (!this.newClassroomName) return
            await this.$store.dispatch('Coach/createNewClassroom', this.newClassroomName)
            this.newClassroomName = ''
        },
    },
}
</script>
