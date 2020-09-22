<template>
  <div id="app">
    <h1>荣光无限</h1>
    <!-- 根路由出口 -->
    <router-view />
  </div>
</template>
<script lang="ts">
// 1: 编辑器给的类型提示
// 2: TypeScript 编译期间的类型验证
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      person: {
        name: 'lelsie',
        age: 18
      }
    }
  },
  methods: {
    handle(): string {
      console.info(this.person.name)
      return this.person.name
    }
  }
})
</script>

<style lang="scss" scoped></style>
