<template>
    <el-card class="box-card">
        <div slot="header">
            <h2>Shared to these classrooms</h2>
        </div>
        <el-form :inline="true">
            <el-form-item label="Classroom">
                <el-select v-model="targetClassroom" :filterable="true">
                    <el-option v-for="classroom in classrooms" :key="classroom._id" :label="classroom.name" :value="classroom._id" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addToClassroom" :loading="submitting">Add</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="sharedWith" border>
            <el-table-column prop="displayIndex" label="#" width="40" />
            <el-table-column prop="classroom.name" label="Classroom Name" class="ml-2" />
            <el-table-column label="Admin" align="center" width="100">
                <template slot-scope="scope">
                    <el-button size="mini" round type="danger" @click="handleDeleteItem(scope.row.classroom._id)">
                        <fa-icon class="vertical-middle" name="trash" />
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import { fetchClassrooms, addProblemListToClassroom, removeProblemListFromClassroom, fetchProblemList } from '@/store/actions'
import { mapGetters } from 'vuex'
import { findById } from '@/utils'

export default {
    props: ['problemListId'],

    data() {
        return {
            submitting: false,
            targetClassroom: '',
        }
    },

    computed: {
        ...mapGetters({
            classrooms: 'coach_classrooms',
            problemList: 'problemList',
        }),

        sharedWith() {
            return this.problemList.sharedWith.map((classroomId, idx) => {
                return {
                    displayIndex: idx + 1,
                    classroom: findById(this.classrooms, classroomId),
                }
            })
        },
    },

    async created() {
        await this.$store.dispatch(fetchClassrooms)
    },

    methods: {
        async addToClassroom() {
            this.submitting = true
            try {
                await this.$store.dispatch(addProblemListToClassroom, this.targetClassroom)
            } finally {
                this.submitting = false
            }
        },

        async handleDeleteItem(classroomId) {
            await this.$store.dispatch(removeProblemListFromClassroom, {
                classroomId,
                problemListId: this.problemListId,
            })
        },
    },
}
</script>
