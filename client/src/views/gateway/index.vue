<template lang="pug">
  .app-container
    h1.text-center Gateway
    AddItem.text-center(:folderId="folderId")

    el-table(
        :data="gatewayItemsArray"
        v-loading="loading"
        border
      )
      el-table-column(prop="displayIndex" label="#" width="40")
      el-table-column(label="Title" :sortable="true")
        template(slot-scope="scope")
          fa-icon.vertical-middle(:name="scope.row.titleIcon")
          template(v-if="scope.row.type==='problem'")
            a.ml-2.vertical-middle(:href="scope.row.displayLink" target="_blank") {{scope.row.displayTitle}}
          template(v-else)
            router-link.ml-2.vertical-middle(:to="scope.row.displayLink") {{scope.row.displayTitle}}
      el-table-column(label="Stats" :sortable="true" align="center" width="140")
        template(slot-scope="scope")
          fa-icon(:name="scope.row.statIcon")
          span.ml-1 {{scope.row.stat}}
</template>

<script>
import { mapGetters } from 'vuex'
import { GatewayInit } from '@/store/actions'
import { AddItem } from './components'

export default {
  name: 'gateway',
  components: { AddItem },
  props: ['folderId'],
  data() {
    return {
      loading: true,
      itemList: []
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'gatewayItems'
    ]),
    gatewayItemsArray() {
      return Object.values(this.gatewayItems).map((item, index) => {
        item.displayIndex = index + 1
        if (item.type === 'problem') {
          item.displayTitle = `${item.platform} ${item.pid} - ${item.title}`
          item.titleIcon = 'link'
          item.statIcon = 'user-times'
          item.stat = item.userSolved
          item.displayLink = item.link
        } else {
          item.displayTitle = item.title
          item.titleIcon = 'folder'
          item.statIcon = 'folder-open'
          item.stat = `${this.token ? item.userCount : '---'}/${item.totalCount}`
          item.displayLink = item._id
        }
        return item
      })
    }
  },
  async created() {
    try {
      await this.$store.dispatch(GatewayInit, this.folderId)
    } finally {
      this.loading = false
    }
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.mr-1 {
  margin-right: 0.25em;
}
.mr-2 {
  margin-right: 0.5em;
}
.ml-1 {
  margin-left: 0.25em;
}
.ml-2 {
  margin-left: 0.5em;
}
</style>
