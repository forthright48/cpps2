<template lang="pug">
  .app-container.text-center
    h1 Gateway
    h2 {{folderId}}

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
          el-select(v-model="addItem.platform")
            el-option(v-for="oj in ojInfo" :key="oj.name" :label="oj.displayName" :value="oj.name")
        el-form-item(label="Problem Id")
          el-input(v-model="addItem.pid" placeholder="PID")

      el-form-item
        el-button(type="primary" @click="onSubmit" :loading="loading") Insert


      el-dialog(
        title="Problem Preview"
        :visible="problemPreview"
      )
        span This is a message
</template>

<script>
import { mapGetters } from 'vuex'
import { GetOjInfo, GatewayAddItems } from '@/store/actions'

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
        pid: ''
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
