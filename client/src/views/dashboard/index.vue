<template>
    <div class="dashboard-container">
        <div class="dashboard-text">Hi, {{username}}</div>
        <hr />
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">
                        <h3>Classrooms (Owner)</h3>
                    </div>
                    <div class="overview">
                        <CoachesClassroom class="overview-content" />
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">
                        <h3>Classrooms</h3>
                    </div>
                    <div class="overview">
                        <StudentsClassroom class="overview-content" />
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12" style="margin-top: 20px;">
                <el-card>
                    <div slot="header">
                        <h3>Problem Lists</h3>
                    </div>
                    <div class="overview">
                        <ProblemLists class="overview-content" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CoachesClassroom from '@/views/classrooms/components/classrooms/coach'
import StudentsClassroom from '@/views/classrooms/components/classrooms/student'
import ProblemLists from '@/views/problemLists/components/problemLists'

export default {
    name: 'dashboard',
    components: {
        CoachesClassroom,
        StudentsClassroom,
        ProblemLists,
    },

    computed: {
        ...mapGetters([
            'isAdmin',
            'username',
            'email',
            'roles',
        ]),
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}

.overview {
    // max-height: 80vh;
    // overflow: hidden;
    // overflow-y: scroll;
    // &-content {
    //     overflow-y: scroll;
    // }
}
</style>
