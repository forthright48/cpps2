<template>
    <div>
        <center>
            <h1 style="display:inline-block;">Solve Count</h1>
            <el-button class="ml-2" type="primary" @click="syncSolveCount">Sync</el-button>
        </center>
        <el-table :data="getSolveCount">
            <el-table-column prop="index" label="#" />
            <el-table-column prop="ojDisplayName" label="OJ" />
            <el-table-column label="User ID">
                <template slot-scope="scope">
                    <template v-if="scope.row.userID && scope.row.userID.userIds.length > 0">
                        <span>
                            {{scope.row.userID.userIds[0]}}
                            <span style="cursor: pointer;" @click="unsetOjUsername(scope.row.ojname, scope.row.userID.userIds[0])">
                                <b>x</b>
                            </span>
                        </span>
                    </template>
                    <template v-else>
                        <el-button type="primary" @click="addOjUsername(scope.row.ojname)">Add UserID</el-button>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="Total Solve">
                <template scope="scope">
                    {{scope.row.solveCount}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import { GetOjInfo, setOjUsername, unsetOjUsername, syncSolveCount } from '@/store/actions'

export default {
    props: ['username'],
    computed: {
        ...mapGetters([
            'ojInfo',
            'profile',
        ]),
        getSolveCount() {
            return Object.keys(this.ojInfo).map((ojname, ind) => {
                return {
                    index: ind + 1,
                    ojname,
                    ojDisplayName: this.ojInfo[ojname].displayName,
                    userID: this.profile.ojStats[ojname],
                    solveCount: this.profile.ojStats[ojname].solveCount,
                }
            })
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
