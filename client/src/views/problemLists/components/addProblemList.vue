<template>
    <div>
        <el-form :inline="true">
            <el-form-item label="Create new problem list">
                <el-input v-model="newListName" placeholder="New Problem List Name" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addNewList" :loading="loading">Create</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { createNewProblemList } from '@/store/actions'
export default {
    data() {
        return {
            loading: false,
            newListName: '',
        }
    },

    methods: {
        async addNewList() {
            this.loading = true
            try {
                await this.$store.dispatch(createNewProblemList, this.newListName)
                this.newListName = ''
            } finally {
                this.loading = false
            }
        },
    },
}
</script>
