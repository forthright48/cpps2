<template lang="pug">
  div
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
  computed: {
    ...mapGetters([
      'user',
      'profile'
    ]),
    getUserFields() {
      return [{
        feature: 'Email',
        icon: 'envelope',
        value: this.profile.email
      }, {
        feature: 'Username',
        icon: 'user',
        value: this.profile.username
      }, {
        feature: 'Roles',
        icon: 'users',
        value: this.profile.roles.join(', ')
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
