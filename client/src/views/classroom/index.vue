<template>
    <div class="app-container">
        <div v-if="!loading">
            <h3>{{classroom.name}}</h3>
            <!-- <el-row>
                <Leaderboard :classroomId="classroomId" />
            </el-row> -->

            <el-row :gutter="20">
                <el-col :span="12">
                    <Students :classroomId="classroomId" />
                </el-col>
                <el-col :span="12">
                    <ProblemLists :classroomId="classroomId" />
                </el-col>
            </el-row>
            <br />

            <el-row>
                <Leaderboard :students="classroom.students" />
            </el-row>
            <br />
            
            <el-row>
                <Contests :classroomId="classroomId" />
            </el-row>
        </div>
    </div>

</template>

<script>
import Students from './components/Students'
import Contests from './components/Contests'
import ProblemLists from './components/ProblemLists'
import Leaderboard from './components/Leaderboard'
import { fetchClassroom } from '@/store/actions'
import { mapGetters } from 'vuex'

export default {
    components: {
        Students,
        Contests,
        ProblemLists,
        Leaderboard,
    },

    data() {
        return {
            loading: true,
        }
    },

    props: ['classroomId'],

    computed: {
        ...mapGetters([
            'classroom',
        ]),
    },

    async created() {
        await this.$store.dispatch(fetchClassroom, this.classroomId)
        this.loading = false
    },

    methods: {
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
