<template>
  <div class="point rounded-circle"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReminderPoint.vue'
})
</script>

<style scoped>
.point {
  background-color: #00bc12;
  width: 1rem;height: 1rem;
  border: 0.1rem solid #fff;
  box-sizing: content-box;
}
</style>
