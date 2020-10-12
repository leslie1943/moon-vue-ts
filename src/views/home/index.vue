<template>
  <div class="home">
    <div class="masthead">
      <div class="overlay"></div>
      <div class="container">
        <div style="font-size: 84px; color: #fff">Welcome</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HomeIndex',
})
</script>

<style lang="scss" scoped>
.home {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: no-repeat 60%;
  // background-color: #868e96;
  background: #283048; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #283048,
    #859398
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #e9eef3,
    #859398
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
