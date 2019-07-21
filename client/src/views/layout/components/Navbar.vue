<template lang="pug">
  el-menu.navbar(mode="horizontal")
    hamburger.hamburger-container(:toggleClick="toggleSideBar" :isActive="sidebar.opened")
    breadcrumb
    el-dropdown.avatar-container(trigger="click")
      .avatar-wrapper
        img.user-avatar(:src="avatar")
        i.el-icon-caret-bottom
      el-dropdown-menu.user-dropdown(slot="dropdown")
        router-link.inlineBlock(to="/")
          el-dropdown-item Home
        el-dropdown-item(divided)
          span(@click="logout" style="display:block;") LogOut
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import md5 from 'md5'

export default {
    components: {
        Breadcrumb,
        Hamburger,
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'email',
        ]),
        emailHash: function() {
            return md5(this.email)
        },
        avatar: function() {
            return `https://www.gravatar.com/avatar/${this.emailHash}?s=40&d=mp`
        },
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar')
        },
        logout() {
            this.$store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
            })
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
