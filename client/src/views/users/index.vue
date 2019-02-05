<template>
    <app-container v-loading="loading">
        <el-row type="flex" justify="center">
            <el-col>
                <UserProfile />
            </el-col>
            <el-col>
                <h1 class="text-center">Classroom</h1>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <SolveCount />
            </el-col>
        </el-row>
    </app-container>
</template>

<script>
import { UserProfile, SolveCount } from './components'
import { FetchProfile } from '@/store/actions'
import { mapGetters } from 'vuex'

export default {
    components: { UserProfile, SolveCount },
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
                await this.$store.dispatch(FetchProfile, this.username)
            } finally {
                this.loading = false
            }
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
