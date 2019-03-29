<template>
    <div>
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
            classrooms: 'student_classrooms',
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
        console.log('actions: ', 'Student/fetchClassrooms')
        await this.$store.dispatch('Student/fetchClassrooms', this.user._id)
    },
}
</script>
