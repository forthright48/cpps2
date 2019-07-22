<template>
    <div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Contest name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Contest link">
                <el-input v-model="form.link"></el-input>
            </el-form-item>
            <el-form-item label="Rank">
                <RankList :initialRatings="classroom.students" @change="handleRankChange" />
            </el-form-item>
            <br />
            <br />
            <el-form-item>
                <el-button type="primary" @click="createConstest">Create</el-button>
                <el-button @click="cancel">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import { addNewContestToClassroom, addNewStandingsToContest, updateRatingsByContest, fetchClassroom } from '@/store/actions'
import RankList from './RankList'
import { mapGetters } from 'vuex'

export default {
    components: {
        RankList,
    },

    props: [
        'classroomId',
    ],

    data() {
        return {
            form: {
                name: '',
                link: '',
            },
            ranks: [],
        }
    },

    computed: {
        ...mapGetters([
            'classroom',
        ]),
    },

    mounted() {
    },

    methods: {
        async createConstest() {
            const response = await this.$store.dispatch(addNewContestToClassroom, {
                classroomId: this.classroomId,
                name: this.form.name,
                link: this.form.link,
            })
            const contestId = response.data._id
            await this.$store.dispatch(addNewStandingsToContest, {
                classroomId: this.classroomId,
                contestId,
                standings: JSON.stringify(this.ranks),
            })

            await this.$store.dispatch(updateRatingsByContest, {
                contestId,
            })

            await this.$store.dispatch(fetchClassroom, this.classroomId)

            this.$message({
                message: 'Contest created',
                type: 'success',
            })
            this.$emit('done')
        },

        handleRankChange(newRank) {
            this.ranks = newRank
        },
        cancel() {
            this.$emit('done')
        },

    },
}
</script>
