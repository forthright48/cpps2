<template>
    <div class="app-container" v-loading="loading">
        <el-row type="flex" justify="center">
            <el-col>
                <UserProfile v-if="!loading" />
            </el-col>

        </el-row>
        <br />
        <el-row>
            <el-col>
                <el-card>
                    <SolveChart />
                </el-card>
            </el-col>
        </el-row>
        <br />
        <el-row>
            <el-col>
                <SolveCount v-if="!loading" :username="username" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { UserProfile, SolveCount, SolveChart } from './components'
import { fetchProfile } from '@/store/actions'
import { mapGetters } from 'vuex'

export default {
    components: { UserProfile, SolveCount, SolveChart },
    props: ['username'],
    data() {
        return {
            loading: true,
        }
    },
    computed: {
        ...mapGetters([
            'user',
        ]),
    },
    watch: {
        '$route': 'initiateUser',
    },
    async created() {
        await this.initiateUser()
    },
    methods: {
        async initiateUser() {
            if (this.username === ':username') {
                return this.$router.push(`/user/profile/${this.user.username}`)
            }
            try {
                await this.$store.dispatch(fetchProfile, this.username)
            } finally {
                this.loading = false
            }
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
