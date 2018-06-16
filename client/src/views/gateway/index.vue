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
          el-select(v-model="addItem.platform")
            el-option(v-for="oj in ojInfo" :key="oj.name" :label="oj.displayName" :value="oj.name")
        el-form-item(label="Problem Id")
          el-input(v-model="addItem.pid" placeholder="PID")


      el-form-item
        el-button(type="primary" @click="onSubmit") Insert

</template>

<script>
import { mapGetters } from 'vuex'
import { GetOjInfo } from '@/store/actions'

export default {
  name: 'gateway',
  props: ['folderId'],
  data() {
    return {
      itemList: [],
      addItem: {
        type: 'problem',
        title: '',
        platform: '',
        pid: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'email',
      'roles',
      'ojInfo'
    ])
  },
  async created() {
    if (Object.keys(this.ojInfo).length === 0) {
      await this.$store.dispatch(GetOjInfo)
    }
  },
  methods: {
    onSubmit() {
      this.$alert('Submit!')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
