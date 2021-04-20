<template>
  <div class="status" v-show="show"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'StatusHeight',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style scoped>
.status {
  height: 1.6rem;
}
</style>
