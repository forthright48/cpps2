<template lang="pug">
  div
    h1.text-center Solve Count
    el-table(:data="getSolveCount")
      el-table-column(prop="index" label="#")
      el-table-column(prop="ojname" label="OJ")
      el-table-column
        template(slot-scope="scope")
          template(v-if="scope.row.userID")
            span {{scope.row.userID}}
          template(v-else)
            el-button(type="primary" @click="addUserID") Add UserID
</template>

<script>
import { mapGetters } from 'vuex'
import { GetOjInfo } from '@/store/actions'

export default {
  props: ['username'],
  computed: {
    ...mapGetters([
      'ojInfo',
      'profile',
    ]),
    getSolveCount() {
      return Object.keys(this.ojInfo).map((ojname, ind) => {
        return {
          index: ind,
          ojname,
          userID: this.profile.ojStats[ojname],
        }
      })
    },
  },
  async created() {
    if (Object.keys(this.ojInfo).length === 0) {
      await this.$store.dispatch(GetOjInfo)
    }
  },
  methods: {
    async addUserID() {
      try {
        const userID = await this.$prompt('Please input your userID', 'Hello', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: 'Invalid Email',
        })
        this.$message({
          type: 'success',
          message: 'Your email is:' + userID,
        })
      } catch (err) {
        this.$message({
          type: 'info',
          message: 'Input canceled',
        })
      }
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
