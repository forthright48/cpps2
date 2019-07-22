<template>
    <el-card class="box-card">
        <div slot="header">
            <h2>Shared to these classrooms</h2>
        </div>
        <el-form :inline="true">
            <el-form-item>
                <el-select v-model="targetClassroom" placeholder="Share to a Classroom" :filterable="true">
                    <el-option v-for="classroom in classrooms" :key="classroom._id" :label="classroom.name" :value="classroom._id" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-share" @click="addToClassroom" :loading="submitting"></el-button>
            </el-form-item>
        </el-form>
        <el-table :data="sharedWith" border>
            <el-table-column prop="displayIndex" label="#" width="40" />
            <el-table-column label="Classroom Name" class="ml-2">
                <template slot-scope="scope">
                    <router-link :to="`/classrooms/${scope.row.classroom._id}`">{{scope.row.classroom.name}}</router-link>
                </template>
            </el-table-column>
            <el-table-column v-if="user._id===problemList.createdBy" label="Admin" align="center" width="100">
                <template slot-scope="scope">
                    <el-button size="mini" round type="danger" @click="removeFromClassroom(scope.row.classroom._id)">
                        <fa-icon class="vertical-middle" name="trash" />
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import { addProblemListToClassroom, removeProblemListFromClassroom } from '@/store/actions'
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
            user: 'user',
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

    methods: {
        async addToClassroom() {
            if (!this.targetClassroom) return
            this.submitting = true
            try {
                await this.$store.dispatch(addProblemListToClassroom, this.targetClassroom)
            } finally {
                this.submitting = false
            }
        },

        async removeFromClassroom(classroomId) {
            await this.$store.dispatch(removeProblemListFromClassroom, {
                classroomId,
                problemListId: this.problemListId,
            })
        },
    },
}
</script>
