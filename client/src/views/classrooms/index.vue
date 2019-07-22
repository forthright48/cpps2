<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col v-if="isCoach">
                <el-card class="box-card">
                    <div slot="header">
                        <h3>Classrooms You Coach</h3>
                    </div>
                    <CoachClassrooms />
                </el-card>
            </el-col>
        </el-row>
        <br />

        <el-row>
            <el-col> <!-- Sorry for that -->
                <el-card class="box-card">
                    <div slot="header">
                        <h3>Classrooms You Belong To</h3>
                    </div>
                    <StudentClassrooms />
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>

<script>

import StudentClassrooms from './components/classrooms/student'
import CoachClassrooms from './components/classrooms/coach'
import { mapGetters } from 'vuex'

export default {
    components: {
        CoachClassrooms,
        StudentClassrooms,
    },

    computed: {
        ...mapGetters([
            'isCoach',
        ]),
    },

}
</script>
