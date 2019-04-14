<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col v-if="isAdmin" :span="12">
                <el-card class="box-card">
                    <div slot="header">
                        <h3>Classrooms (Owner)</h3>
                    </div>
                    <br />
                    <CoachClassrooms />
                </el-card>
            </el-col>
            <el-col :span="12 * (1 + !isAdmin)"> <!-- Sorry for that -->
                <el-card class="box-card">
                    <div slot="header">
                        <h3>Classrooms</h3>
                    </div>
                    <br />
                    <StudentClassrooms />
                    <!-- <CoachClassrooms /> -->
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
            'isAdmin',
        ]),
    },

}
</script>
