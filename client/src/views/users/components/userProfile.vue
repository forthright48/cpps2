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
      'profile',
    ]),
    getUserFields() {
      const ret = [{
        feature: 'Email',
        icon: 'envelope',
        value: this.user.email,
      }, {
        feature: 'Username',
        icon: 'user',
        value: this.profile.username,
        public: true,
      }, {
        feature: 'Roles',
        icon: 'users',
        value: this.profile.roles.join(', '),
        public: true,
      }, {
        feature: 'Password',
        icon: 'key',
      } ]
      return this.isOwner ? ret : ret.filter((x) => x.public)
    },
    isOwner() {
      return this.user.username === this.profile.username
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
