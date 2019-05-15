<template>
    <div v-if="isAdmin" class="app-container">
        <el-row type="flex" align="middle">
            <el-col :span="15" :offset="1">
                <h1>Users</h1>
            </el-col>
            <el-col :span="4">
                <el-dropdown trigger="click" @command="categorySwitched">
                    <span class="el-dropdown-link">
                        {{ selectedCategory }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="(category, index) in categories"
                            :key="index"
                            :command="category"
                        >
                            {{ category }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="fetchMoreItems">More</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col>
                <UserList/>
            </el-col>
        </el-row>
    </div>
    <div v-else>
        <el-row type="flex" justify="center">
            <el-col :offset="10">
                <div>
                    You do not belong here.
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import UserList from './components/UserList'
import { ClearUserList, FetchUserList } from '@/store/actions'
import { mapGetters } from 'vuex'

export default {
    components: {
        UserList,
    },

    props: [],

    data() {
        const categories = [
            'Admins',
            'Coaches',
            'Users',
        ]
        return {
            loading: false,
            categories,
            selectedCategory: categories[0],
        }
    },

    computed: {
        ...mapGetters([
            'isAdmin',
        ]),
    },

    async created() {
        if (this.isAdmin) {
            await this.$store.dispatch(ClearUserList)
            await this.$store.dispatch(FetchUserList, this.selectedCategory)
        }
    },

    methods: {
        async categorySwitched(newCategory) {
            this.selectedCategory = newCategory
            await this.$store.dispatch(ClearUserList)
            await this.$store.dispatch(FetchUserList, this.selectedCategory)
        },
        async fetchMoreItems() {
            await this.$store.dispatch(FetchUserList, this.selectedCategory)
        },
    },
}
</script>
