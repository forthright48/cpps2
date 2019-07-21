<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Solve Count: {{ totalSolve }}</span>
            <el-button v-if="hasAccessToUpdateOjUsername" style="float: right;" type="primary" @click="syncSolveCount">Sync</el-button>
        </div>
        <el-table :data="getSolveCount">
            <el-table-column prop="index" label="#" />
            <el-table-column prop="ojDisplayName" label="OJ" />
            <el-table-column label="User ID">
                <template slot-scope="scope">
                    <template v-if="scope.row.userID && scope.row.userID.userIds.length > 0">
                        <span>
                            <a :href="scope.row.linkToOjProfile" target="_blank">
                                {{scope.row.userID.userIds[0]}}
                            </a>
                            <span v-if="hasAccessToUpdateOjUsername" @click="unsetOjUsername(scope.row.ojname, scope.row.userID.userIds[0])">
                                <fa-icon class="vertical-middle" name="trash" style="color: red; cursor: pointer;" />
                            </span>
                        </span>
                    </template>
                    <template v-else>
                        <el-button v-if="hasAccessToUpdateOjUsername" type="primary" size="mini" @click="addOjUsername(scope.row.ojname)">Add UserID</el-button>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="Total Solve">
                <template slot-scope="scope">
                    {{scope.row.solveCount}}
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>


<script>
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import { sum } from 'lodash'
import { GetOjInfo, setOjUsername, unsetOjUsername, syncSolveCount } from '@/store/actions'

export default {
    props: ['username'],
    computed: {
        ...mapGetters([
            'user',
            'ojInfo',
            'profile',
        ]),
        getSolveCount() {
            return Object.keys(this.ojInfo).map((ojname, ind) => {
                let solveCount = 0
                if (this.profile.ojStats[ojname]) {
                    solveCount = this.profile.ojStats[ojname].solveCount
                }
                return {
                    index: ind + 1,
                    ojname,
                    ojDisplayName: this.ojInfo[ojname].displayName,
                    userID: this.profile.ojStats[ojname],
                    linkToOjProfile: this.ojInfo[ojname].profileLink
                        .replace('$$$$$', this.profile.ojStats[ojname].userIds[0]),
                    solveCount,
                }
            })
        },
        totalSolve() {
            return sum(this.getSolveCount.map(e => e.solveCount))
        },

        hasAccessToUpdateOjUsername() {
            return this.profile.username === this.user.username
        },
    },
    async created() {
        if (Object.keys(this.ojInfo).length === 0) {
            await this.$store.dispatch(GetOjInfo)
        }
    },
    methods: {
        async addOjUsername(ojname) {
            try {
                const ojUsername = await this.$prompt('Please input your userID', 'Hello', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: 'Invalid Email',
                })
                this.$store.dispatch(setOjUsername, {
                    username: this.username,
                    ojname,
                    ojUsername: ojUsername.value,
                })
                this.$message({
                    type: 'success',
                    message: 'Your userID is:' + ojUsername.value,
                })
            } catch (err) {
                this.$message({
                    type: 'info',
                    message: 'Input canceled',
                })
            }
        },

        async unsetOjUsername(ojname, ojUsername) {
            try {
                this.$store.dispatch(unsetOjUsername, {
                    username: this.username,
                    ojname,
                    ojUsername,
                })
                this.$message({
                    type: 'success',
                    message: 'UserID reset!',
                })
            } catch (err) {
                this.$message({
                    type: 'info',
                    message: 'Input canceled',
                })
            }
        },

        async syncSolveCount() {
            await this.$store.dispatch(syncSolveCount, this.profile.username)
            Message({
                type: 'success',
                message: 'Syncing in process',
                duration: 10 * 1000,
                showClose: true,
            })
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
