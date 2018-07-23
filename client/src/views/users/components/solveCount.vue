<template lang="pug">
  div
    h1.text-center Solve Count
    el-table(:data="getSolveCount")
      el-table-column(prop="index" label="#")
      el-table-column(prop="oj" label="OJ")
</template>

<script>
import { mapGetters } from 'vuex'
import { GetOjInfo } from '@/store/actions'

export default {
  props: ['username'],
  computed: {
    ...mapGetters([
      'ojInfo'
    ]),
    getSolveCount() {
      return Object.keys(this.ojInfo).map((oj, ind) => {
        return {
          index: ind,
          oj
        }
      })
    }
  },
  async created() {
    if (Object.keys(this.ojInfo).length === 0) {
      await this.$store.dispatch(GetOjInfo)
    }
    console.log(this.ojInfo)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
