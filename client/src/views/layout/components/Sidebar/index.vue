<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
    components: { SidebarItem },
    computed: {
        ...mapGetters([
            'user',
            'sidebar',
        ]),
        routes() {
            const routes = this.$router.options.routes
            return routes.map(e => {
                if (e.path === '/user') {
                    e.children[0].path = `profile/${this.user.username}`
                }
                return e
            })
        },
        isCollapse() {
            return !this.sidebar.opened
        },
    },
}
</script>
