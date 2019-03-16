<template>
    <div class="app-container">
        <h3>{{classroom.name}}</h3>

        <el-row>
            <el-col :span="10">
                <Students :classroomId="classroomId" />
            </el-col>
            <el-col :span="1">
                &nbsp;
            </el-col>
            <el-col :span="10">
                <!-- <SharedWith :problemListId="problemListId" /> -->
            </el-col>
        </el-row>
    </div>

</template>

<script>
import Students from './components/Students'
import { fetchClassroom } from '@/store/actions'
import { mapGetters } from 'vuex'
export default {
    components: {
        Students,
    },

    props: ['classroomId'],

    computed: {
        ...mapGetters([
            'classroom',
        ]),
    },

    async created() {
        await this.$store.dispatch(fetchClassroom, this.classroomId)
    },

    methods: {
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
