<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelListUpgraded" :key="item.path">
        <span v-if="item.meta.title">
          <span v-if="item.redirect==='noredirect'||index==levelListUpgraded.length-1" class="no-redirect">{{item.meta.title}}</span>
          <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'gatewayBreadcrumb',
        ]),
        levelListUpgraded() {
            const second = this.levelList[1]
            if (second && (second.name === 'gateway-root' || second.name === 'gateway')) {
                const gatewayBreadcrumb = this.levelList.concat(this.gatewayBreadcrumb)
                gatewayBreadcrumb[1].path = `/gateway/folder/${process.env.GATEWAY_ROOT}`
                return gatewayBreadcrumb
            }
            return this.levelList
        },
    },
    created() {
        this.getBreadcrumb()
    },
    data() {
        return {
            levelList: null,
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        },
    },
    methods: {
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name)
            const first = matched[0]
            if (first && first.name !== 'dashboard') {
                matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
            }
            this.levelList = matched
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
