<template lang="pug">
  .app-container.text-center
    h1 Gateway

    el-form(inline=true :model="addItem")
      el-form-item(label="Type")
        el-select(v-model="addItem.type")
          el-option(label="Problem" value="problem")
          el-option(label="Folder" value="folder")
      template(v-if="addItem.type==='folder'")
        el-form-item(label="Title")
          el-input(v-model="addItem.title" placeholder="Name")
      template(v-else)
        el-form-item(label="Platform")
          el-select(v-model="addItem.platform" :filterable="true")
            el-option(v-for="oj in ojInfo" :key="oj.name" :label="`${oj.displayName} (${oj.name})`" :value="oj.name")
        el-form-item(label="Problem Id")
          el-input(v-model="addItem.pid" placeholder="PID" @keyup.enter.native="showPreview")

      el-form-item
        el-button(type="primary" @click="showPreview" :loading="loading") Insert


      el-dialog(
        title="Problem Preview"
        :visible.sync="problemPreview"
        v-loading="loading"
      )
        a(:href="addItem.link" target="_blank") {{addItem.platform}} {{addItem.pid}} - {{addItem.title}}
</template>

<script>
import { mapGetters } from 'vuex'
import { GetOjInfo, GatewayAddItems } from '@/store/actions'
import { getProblemInfo } from '@/api/problemBank'

export default {
  name: 'gateway',
  props: ['folderId'],
  data() {
    return {
      loading: false,
      problemPreview: false,
      itemList: [],
      addItem: {
        parentId: this.folderId,
        type: 'problem',
        title: '',
        platform: '',
        displayName: '',
        pid: '',
        link: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'ojInfo',
      'gatewayItems'
    ])
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
    async onSubmit() {
      try {
        this.loading = true
        await this.$store.dispatch(GatewayAddItems, this.addItem)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
