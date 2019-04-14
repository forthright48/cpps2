<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <span>Problem Lists</span>
            </div>
            <el-table :data="getProblemLists" border>
                <el-table-column prop="index" label="#" width="40" />
                <el-table-column label="Problem list name" class="ml-2">
                    <template slot-scope="scope">
                        <router-link :to="`/problemlists/${scope.row._id}`">{{ scope.row.title }}</router-link>
                    </template>
                </el-table-column>

                <el-table-column label="Admin" align="center" width="140">
                    <template slot-scope="scope">
                        <el-button size="mini" round type="danger" @click="handleDeleteItem(scope.row._id)">
                            <fa-icon class="vertical-middle" name="trash" />
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import request from '@/utils/request'
import { removeProblemListFromClassroom } from '@/store/actions'
export default {
    props: [
        'classroomId',
    ],

    data() {
        return {
            problemLists: [],
        }
    },

    computed: {
        getProblemLists() {
            return this.problemLists.map((problemList, idx) => {
                return {
                    index: idx + 1,
                    _id: problemList._id,
                    title: problemList.title,
                }
            })
        },
    },

    async created() {
        await this.init()
    },

    methods: {
        async init() {
            const response = await request({
                method: 'get',
                url: `/api/v1/classrooms/${this.classroomId}/problemlists`,
            })
            this.problemLists = response.data
        },

        async handleDeleteItem(problemListId) {
            // XXX(hasib): Not a very good idea to use actions related to problemlists from here.
            await this.$store.dispatch(removeProblemListFromClassroom, {
                classroomId: this.classroomId,
                problemListId,
            })
            await this.init()
        },
    },

}

</script>
