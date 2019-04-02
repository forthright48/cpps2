<template>
    <div class="app-container">

        <el-row>
            <el-col :span="11">
                <el-card class="box-card">
                    <div slot="header">
                        <h3>Classrooms (Owner)</h3>
                    </div>
                    <br />
                    <CoachClassrooms />
                </el-card>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="11">
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

export default {
    components: {
        CoachClassrooms,
        StudentClassrooms,
    },

}
</script>
