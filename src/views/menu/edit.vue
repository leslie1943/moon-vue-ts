<template>
  <div class="menu-update">
    <CreateOrEdit :isEdit="true" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'
export default Vue.extend({
  name: 'MenuUpdate',
  components: { CreateOrEdit },
  data() {
    return {}
  },
  methods: {},
})
</script>
