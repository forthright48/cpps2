<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>Leaderboard</span>
            </div>
            <br />
            <br />
            <el-table :data="getStudents" border>
                <el-table-column prop="index" label="#" width="40" />
                <el-table-column label="Students">
                    <template slot-scope="scope">
                        <span>
                            <router-link :to="`/user/profile/${scope.row.username}`">{{scope.row.username}}</router-link>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="totalSolved" :sortable="true" label="Total" />
                <el-table-column v-for="oj in ojInfo" :prop="`ojStats.${oj.name}`" :label="oj.displayName" :key="oj.name" sortable/>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['students'],

    computed: {
        ...mapGetters([
            'user',
            'ojInfo',
        ]),

        getStudents() {
            const data = []
            for (const userId in this.students) {
                const student = {
                    _id: this.students[userId]._id,
                    username: this.students[userId].username,
                    totalSolved: this.students[userId].totalSolved,
                    ojStats: this.students[userId].ojStats,
                }
                data.push(student)
            }

            data.sort((a, b) => {
                return b.totalSolved - a.totalSolved
            })

            for (let i = 0; i < data.length; i++) {
                data[i].index = i + 1
            }

            return data
        },
    },

    async created() {
        this.$store.dispatch('GetOjInfo')
    },

    methods: {

    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
