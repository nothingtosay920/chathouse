<template>
  <div class="bottomBar fixed-bottom d-flex flex-row-reverse align-items-center">
    <div class="mx-3">
      <img src="../assets/bottomBarImg/yeah.png" alt="">
      <img src="../assets/bottomBarImg/invitation.png" alt="">
      <img src="../assets/bottomBarImg/raise.png" alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BottomBar'
})
</script>

<style scoped>
body {
  z-index: 999;
}

.bottomBar {
  background-color: #fff;
  height: 2.5rem;
  border-radius: 50px 50px 0 0;
  width: auto;
}

img {
  background-color: #f0f0f4;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  margin: 0 0.5rem;
}
</style>
