<template>
    <el-form :inline="true" :model="addItem">
        <el-form-item label="Platform">
            <el-select v-model="addItem.platform" :filterable="true">
                <el-option v-for="oj in ojInfo" :key="oj.name" :label="`${oj.displayName} (${oj.name})`" :value="oj.name" />
            </el-select>
        </el-form-item>
        <el-form-item label="Problem Id">
            <el-input v-model="addItem.pid" placeholder="PID" @keyup.enter.native="showPreview" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="showPreview" :loading="loading">Add new problem</el-button>
        </el-form-item>


        <el-dialog
        title="Problem Preview"
        :visible.sync="problemPreview"
        v-loading="loading">
            <a :href="addItem.link" target="_blank"> {{addItem.platform}} {{addItem.pid}} - {{addItem.title}}</a>

            <span slot="footer">
                <el-button @click="problemPreview=false">Cancel</el-button>
                <el-button type="primary" @click="addNewProblem">Confirm</el-button>
            </span>
        </el-dialog>
    </el-form>
</template>

<script>

import { addProblemToProblemList, GetOjInfo } from '@/store/actions'
import { getProblemInfo } from '@/api/problemBank'
import { mapGetters } from 'vuex'

export default {

    data() {
        return {
            loading: false,
            problemPreview: false,
            addItem: {
                title: '',
                platform: '',
                displayName: '',
                pid: '',
                link: '',
            },
        }
    },
    computed: {
        ...mapGetters([
            'ojInfo',
        ]),
    },
    async created() {
        if (Object.keys(this.ojInfo).length === 0) {
            await this.$store.dispatch(GetOjInfo)
        }
    },

    methods: {
        async showPreview() {
            try {
                this.loading = true
                // Fetch problem details

                // Validate user input
                const ojInfo = this.ojInfo
                const { platform, pid } = this.addItem
                if (ojInfo[platform] === undefined) {
                    return this.$alert('Please select a platform', 'Validation Error in Platform Field')
                }

                const format = ojInfo[platform].format
                const regex = new RegExp(format, 'g')
                if (regex.test(pid) === false) {
                    return this.$alert(`Problem Id did not match regex ${format}`, 'Validation Error in Problem Id field')
                }

                const problemInfo = await getProblemInfo(platform, pid)

                this.addItem.title = problemInfo.data.title
                this.addItem.link = problemInfo.data.link
                this.addItem.displayName = this.ojInfo[platform].displayName

                this.problemPreview = true
            } finally {
                this.loading = false
            }
        },
        async addNewProblem() {
            try {
                this.loading = true
                await this.$store.dispatch(addProblemToProblemList, {
                    platform: this.addItem.platform,
                    title: this.addItem.title,
                    problemId: this.addItem.pid,
                    link: this.addItem.link,
                })
            } finally {
                this.loading = false
                this.problemPreview = false
            }
        },
    },
}
</script>
