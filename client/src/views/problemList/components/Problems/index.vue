<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <h2>Problems</h2>
            </div>
            <AddProblem v-if="isOwnClassroom"/>

            <el-table :data="getProblems" border>
                <el-table-column prop="displayIndex" label="#" width="40" />
                <el-table-column label="Platform" width="100">
                    <template slot-scope="scope">
                        {{ getDisplayNameForOJ(scope.row.platform) }}
                    </template>
                </el-table-column>
                <el-table-column prop="problemId" label="Problem ID" width="100" />
                <el-table-column label="Title" :sortable="true">
                    <template slot-scope="scope">
                        <fa-icon class="vertical-middle" :name="scope.row.titleIcon" />
                        <template>
                            <a class="ml-2 vertical-middle" :href="scope.row.displayLink" target="_blank">
                                {{scope.row.title}}
                            </a>
                        </template>
                    </template>
                </el-table-column>


                <el-table-column v-if="user._id===problemList.createdBy" label="Admin" align="center" width="140">
                    <template slot-scope="scope">
                        <el-button size="mini" round type="danger" @click="removeProblem(scope.row._id)">
                            <fa-icon class="vertical-middle" name="trash" />
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import AddProblem from './addProblem'
import { fetchProblemList, removeProblemFromProblemList } from '@/store/actions'
import { mapGetters } from 'vuex'

export default {
    components: {
        AddProblem,
    },

    props: ['problemListId'],

    data() {
        return {
            loading: false,
        }
    },

    computed: {
        ...mapGetters([
            'user',
            'ojInfo',
            'problemList',
        ]),

        isOwnClassroom() {
            return this.user._id === this.problemList.createdBy
        },

        getProblems() {
            return this.problemList.problems.map((item, idx) => {
                return {
                    platform: item.platform,
                    displayIndex: idx + 1,
                    displayTitle: `${item.problemId} - ${item.title}`,
                    titleIcon: 'link',
                    displayLink: item.link,
                    ...item,
                }
            })
        },
    },

    async created() {
        await this.$store.dispatch(fetchProblemList, this.problemListId)
    },

    methods: {
        async removeProblem(problemId) {
            await this.$store.dispatch(removeProblemFromProblemList, {
                problemListId: this.problemListId,
                problemId,
            })
        },

        getDisplayNameForOJ(ojName) {
            return (this.ojInfo && this.ojInfo[ojName]) ? this.ojInfo[ojName].displayName : ''
        },
    },
}
</script>
