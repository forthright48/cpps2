<template>
    <div class="app-container">
        <h1>Users</h1>
        <el-row :gutter="20">
            <el-col>
                <UserList/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import UserList from './components/UserList'
import { ClearUserList, FetchUsers } from '@/store/actions'

export default {
    components: {
        UserList,
    },

    props: [],

    data() {
        return {
            loading: false,
        }
    },

    computed: {},

    async created() {
        await this.$store.dispatch(ClearUserList)
        await this.$store.dispatch(FetchUsers)
    },

    methods: {},
}
</script>
