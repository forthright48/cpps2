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
                <RankList :initialRank="classroom.students" @change="handleRankChange" />
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

import { addNewContestToClassroom } from '@/store/actions'
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

    methods: {
        async createConstest() {
            await this.$store.dispatch(addNewContestToClassroom, {
                classroomId: this.classroomId,
                name: this.form.name,
                link: this.form.link,
            })
        },

        async createStandings() {
            const standings = this.getStandings()
            console.log('Stadings = ', JSON.stringify(standings))

            // await this.$store.dispatch
        },

        getStandings() {
            const standings = []
            for (const student of this.ranks) {
                console.log('student = ', student)
                const studentStatus = {
                    position: student.index,
                    username: student.username,
                    userId: student._id,
                    previousRating: 1500,
                    newRating: 1500,
                }
                standings.push(studentStatus)
            }

            return standings
        },

        handleRankChange(newRank) {
            console.log('Root component ', newRank)
            this.ranks = newRank
        },
        cancel() {
            this.$emit('done')
        },

    },
}
</script>
