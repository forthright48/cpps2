<template lang="pug">
  .app-container
    el-row(type="flex" justify="center")
      el-col
        UserProfile
      el-col
        h1.text-center Classroom
    el-row
      el-col
        SolveCount
</template>

<script>
import { UserProfile, SolveCount } from './components'

export default {
  components: { UserProfile, SolveCount }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
