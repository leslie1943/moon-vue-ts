<template>
  <div class="error">
    <div class="text">
      <h1>Page Not Found.</h1>
    </div>
    <div class="btn">
      <el-button @click="handleToHome">Return to Home Page</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ErrorPage',
  methods: {
    handleToHome() {
      this.$router.push({ path: '/' })
    },
  },
})
</script>

<style lang="scss" scoped>
.error {
  .text {
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    margin-top: 40vh;
  }
  .btn {
    padding: 20px;
    text-align: center;
  }
}
</style>
