<template lang="pug">
  .app-container
    el-row(type="flex" justify="center")
      el-col
        h1.text-center User Profile
        el-table(:data="getUserFields" align="center")
          el-table-column
            template(slot-scope="scope")
              fa-icon.vertical-middle(:name="scope.row.icon")
              span.ml-2 {{scope.row.feature}}
          el-table-column(align="center")
            template(slot-scope="scope")
              template(v-if="scope.row.feature=='Password'")
                el-button(size="mini" type="primary" round) Update Password
              template(v-else)
                span {{scope.row.value}}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'profile',
  props: ['username'],
  computed: {
    ...mapGetters([
      'token',
      'user'
    ]),
    getUserFields() {
      return [{
        feature: 'Email',
        icon: 'envelope',
        value: this.user.email
      }, {
        feature: 'Username',
        icon: 'user',
        value: this.user.username
      }, {
        feature: 'Roles',
        icon: 'users',
        value: this.user.roles.join(', ')
      }, {
        feature: 'Password',
        icon: 'key'
      }]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
