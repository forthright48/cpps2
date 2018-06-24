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
          fa-icon(name="link")
          a.ml-2(:href="scope.row.link" target="_blank") {{scope.row.displayTitle}}


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
      'gatewayItems'
    ]),
    gatewayItemsArray() {
      return Object.values(this.gatewayItems).map((item, index) => {
        item.displayIndex = index + 1
        item.displayTitle = `${item.platform} ${item.pid} - ${item.title}`
        return item
      })
    }
  },
  async created() {
    await this.$store.dispatch(GatewayInit, this.folderId)
    this.loading = false
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
a:hover {
  color: blue;
}

.mr-2 {
  margin-right: 0.5em;
}
.ml-2 {
  margin-left: 0.5em;
}
</style>
