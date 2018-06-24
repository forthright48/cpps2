<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style rel="stylesheet/scss" lang="scss">

/**
 * Font Awesome Configuration
 */
.fa-icon {
  // /* Allow icons to scale according to font-size */
  // width: auto;
  // height: 1em; /* or any other relative font sizes */
  //
  // /* You would have to include the following two lines to make this work in Safari */
  // max-width: 100%;
  // max-height: 100%;

  /* Vertically center icon */
  vertical-align: middle;
}
</style>
