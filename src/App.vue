<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AppIndex'
})
</script>

<style lang="scss" scoped>
.text {
  color: $success-color;
}
</style>
