<template>
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header">
                <h3>Problem Lists</h3>
            </div>
            <AddProblemList />
            <el-table :data="getProblemLists" border>
                <el-table-column prop="index" label="#" width="40" />
                <el-table-column label="Problem list name" class="ml-2">
                    <template slot-scope="scope">
                        <router-link :to="`/problemlists/${scope.row._id}`">{{ scope.row.title }}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="countProblems" label="Number of problems" width="200"/>
                <!-- <el-table-column prop="students" label="Students" /> -->
            </el-table>
        </el-card>
    </div>
</template>

<script>
import AddProblemList from './components/addProblemList'
import { fetchProblemLists } from '@/store/actions'
import { mapGetters } from 'vuex'
export default {
    components: {
        AddProblemList,
    },

    computed: {
        ...mapGetters([
            'problemLists',
        ]),

        getProblemLists() {
            return this.problemLists.map((problemList, idx) => {
                return {
                    index: idx + 1,
                    _id: problemList._id,
                    title: problemList.title,
                    countProblems: problemList.problems.length,
                }
            })
        },
    },

    async created() {
        await this.$store.dispatch(fetchProblemLists)
    },

}
</script>
