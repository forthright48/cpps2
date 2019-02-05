<template>
    <div>
        <h1 class="text-center">Solve Count</h1>
        <el-table :data="getSolveCount">
            <el-table-column prop="index" label="#" />
            <el-table-column prop="ojname" label="OJ" />
            <el-table-column label="User ID">
                <template slot-scope="scope">
                    <template v-if="scope.row.userID">
                        <span> {{scope.row.userID}} </span>
                    </template>
                    <template v-else>
                        <el-button type="primary" @click="addUserID">Add UserID</el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { GetOjInfo } from '@/store/actions'

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
                    index: ind,
                    ojname: this.ojInfo[ojname].displayName,
                    userID: this.profile.ojStats[ojname],
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
        async addUserID() {
            try {
                const userID = await this.$prompt('Please input your userID', 'Hello', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: 'Invalid Email',
                })
                this.$message({
                    type: 'success',
                    message: 'Your email is:' + userID,
                })
            } catch (err) {
                this.$message({
                    type: 'info',
                    message: 'Input canceled',
                })
            }
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
