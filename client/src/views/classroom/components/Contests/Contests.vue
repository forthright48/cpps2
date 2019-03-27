<template>
    <div>
            <el-table :data="getContests" border>
                <el-table-column prop="index" label="#" width="40" />
                <el-table-column label="Contests">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="Link" width="400">
                    <template slot-scope="scope">
                        <span><a :href="scope.row.link" target="blank">{{scope.row.link}}</a></span>
                    </template>
                </el-table-column>
            </el-table>
    </div>
</template>

<script>

import { fetchContests } from '@/store/actions'
import { mapGetters } from 'vuex'

export default {
    props: [
        'classroomId',
    ],

    computed: {
        ...mapGetters([
            'classroom',
            'contests',
        ]),

        getContests() {
            const data = []
            const contests = this.contests
            for (const contestId in contests) {
                const contest = {
                    index: data.length + 1,
                    _id: contests[contestId]._id,
                    name: contests[contestId].name,
                    link: contests[contestId].link,
                }
                data.push(contest)
            }

            return data
        },
    },

    async created() {
        await this.$store.dispatch(fetchContests, this.classroomId)
    },
}
</script>
