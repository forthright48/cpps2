<template lang="pug">
  .app-container
    el-row(type="flex" align="middle")
      el-col(:span="2")
        router-link(v-if="gatewayRoot.parentId" :to="gatewayRoot.parentId")
          fa-icon.ml-2(name="level-up" scale="2")
      el-col(:span="22")
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
      el-table-column(label="Admin" align="center" width="140")
        template(slot-scope="scope")
          el-button(size="mini" round type="danger" @click="handleDeleteItem(scope.$index, scope.row)")
            fa-icon.vertical-middle(name="trash")
</template>

<script>
import { mapGetters } from 'vuex'
import { GatewayInit, GatewayDeleteItem } from '@/store/actions'
import { AddItem } from './components'

export default {
    name: 'gateway',
    components: { AddItem },
    props: ['folderId'],
    data() {
        return {
            loading: true,
            itemList: [],
        }
    },
    computed: {
        ...mapGetters([
            'token',
            'gatewayItems',
            'gatewayRoot',
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
        },
    },
    watch: {
        '$route': 'initiateFolder',
    },
    async created() {
        await this.initiateFolder()
    },
    methods: {
        async initiateFolder() {
            try {
                await this.$store.dispatch(GatewayInit, this.folderId)
            } finally {
                this.loading = false
            }
        },
        async handleDeleteItem(index, row) {
            try {
                this.loading = true
                await this.$store.dispatch(GatewayDeleteItem, row._id)
            } finally {
                this.loading = false
            }
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
