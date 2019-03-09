<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <h2>Problems</h2>
            </div>
            <AddProblem />

            <el-table :data="getProblems" border>
                <el-table-column prop="displayIndex" label="#" width="40" />
                <el-table-column label="Title" :sortable="true">
                    <template slot-scope="scope">
                        <fa-icon class="vertical-middle" :name="scope.row.titleIcon" />
                        <template>
                            <a class="ml-2 vertical-middle" :href="scope.row.displayLink" target="_blank">
                                {{scope.row.displayTitle}}
                            </a>
                        </template>
                    </template>
                </el-table-column>


                <el-table-column label="Admin" align="center" width="140">
                    <template slot-scope="scope">
                        <el-button size="mini" round type="danger" @click="handleDeleteItem(scope.$index, scope.row)">
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
import { fetchProblemList } from '@/store/actions'
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
            'problemList',
        ]),

        getProblems() {
            return this.problemList.problems.map((item, idx) => {
                return {
                    displayIndex: idx + 1,
                    displayTitle: `${item.platform} ${item.problemId} - ${item.title}`,
                    titleIcon: 'link',
                    displayLink: item.link,
                }
            })
        },
    },

    async created() {
        await this.$store.dispatch(fetchProblemList, this.problemListId)
    },
}
</script>
