<template>
    <div v-if="isAdmin" class="app-container">
        <el-row type="flex" align="middle" :gutter="20">
            <el-col :span="7" :offset="1">
                <h1>Users</h1>
            </el-col>
            <el-col :span="3">
                <el-select
                    v-model="selectedSearchAttribute"
                >
                    <el-option
                        v-for="attribute in searchAttributes"
                        :key="attribute.value"
                        value-key="value"
                        :label="attribute.name"
                        :value="attribute"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="7">
                <el-input
                    v-model="searchString"
                    :placeholder="`Enter ${selectedSearchAttribute.name}`"
                >
                    <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="attributeSearched"
                    ></el-button>
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-select
                    v-model="selectedCategory"
                    @change="categorySwitched"
                >
                    <el-option
                        v-for="(category, index) in categories"
                        :key="index"
                        :label="category"
                        :value="category"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="fetchMoreItems">More</el-button>
            </el-col>
        </el-row>
        <el-row>
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
import { isEmpty } from 'lodash'

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
        const searchAttributes = [
            {
                name: 'Username',
                value: 'username',
            },
            {
                name: 'Email',
                value: 'email',
            },
        ]
        return {
            categories,
            searchAttributes,
            selectedCategory: categories[0],
            selectedSearchAttribute: searchAttributes[0],
            searchString: '',
            loading: false,
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
            await this.$store.dispatch(ClearUserList)
            await this.$store.dispatch(FetchUserList, {
                listName: this.selectedCategory,
            })
        },
        async fetchMoreItems() {
            await this.$store.dispatch(FetchUserList, {
                listName: this.selectedCategory,
            })
        },
        async attributeSearched() {
            await this.$store.dispatch(ClearUserList)
            const filter = {
                [this.selectedSearchAttribute.value]: isEmpty(this.searchString)
                    ? undefined
                    : this.searchString,
            }
            await this.$store.dispatch(FetchUserList, {
                filter,
                listName: this.selectedCategory,
            })
        },
    },
}
</script>
