<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>Contests</span>
                <el-button v-if="!showNewContestForm" style="float: right;" size="mini" type="primary" @click="handleContestFormSwitch">Add contest</el-button>
                <!-- <el-row>
                    <el-col :span="19">
                        <h3>Contests</h3>
                    </el-col>
                    <el-col :span="5">
                        <el-button v-if="!showNewContestForm" type="primary" @click="handleContestFormSwitch">Add contest</el-button>
                    </el-col>
                </el-row> -->
            </div>

            <NewContest v-if="showNewContestForm" @done="handleContestFormSwitch" :classroomId="classroomId" />
            <Contests v-if="!showNewContestForm" :classroomId="classroomId" />

        </el-card>
    </div>
</template>

<script>
import NewContest from './NewContest'
import Contests from './Contests'

export default {
    components: {
        NewContest,
        Contests,
    },

    props: [
        'classroomId',
    ],

    data() {
        return {
            showNewContestForm: false,
        }
    },

    async created() {

    },

    methods: {
        handleContestFormSwitch() {
            this.showNewContestForm = !this.showNewContestForm
        },
    },
}
</script>
