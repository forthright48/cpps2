<template lang="pug">
  .app-container.text-center
    h1 Gateway
    <AddItem :folderId="folderId" />

</template>

<script>
import { mapGetters } from 'vuex'
import { GatewayInit } from '@/store/actions'
import { AddItem } from './components'

export default {
  name: 'gateway',
  components: { AddItem },
  props: ['folderId'],
  data() {
    return {
      loading: false,
      itemList: []
    }
  },
  computed: {
    ...mapGetters([
      'gatewayItems'
    ])
  },
  async created() {
    await this.$store.dispatch(GatewayInit, this.folderId)
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
