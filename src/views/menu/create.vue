<template>
  <div class="menu-create">
    <CreateOrEdit />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'
export default Vue.extend({
  name: 'MenuCreate',
  components: { CreateOrEdit },
  data() {
    return {}
  },
  methods: {},
})
</script>
