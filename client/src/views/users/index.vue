<template lang="pug">
  .app-container
    el-row(type="flex" align="middle")
      el-col
        h1.text-center User Profile

    ul.blockList
      li
        span {{user.email}}
      li
        span {{user.username}}
      li
        span {{user.roles.join(",")}}
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
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
ul.blockList {
  list-style: none;
}
ul.blockList li {
  display:block;
  text-decoration:none;
  line-height:30px;
  border: 1px solid #CCCCCC;
  border-top: 0px;
  padding-left:10px;
}
ul.blockList li:first-child  {
  border-top-style:solid;
  border-top-width:1px;
  border-top-color:#CCCCCC;
}
</style>
