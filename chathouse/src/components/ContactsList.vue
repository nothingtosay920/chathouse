<template>
  <div class="contactsList m-3 d-flex align-items-center">
    <img src="../assets/cardImg/users.png" class="me-3">
    <div class="user">
      <div class="userId">aaa</div>
      <div class="userSignature">abcdefghijklmn</div>
    </div>
    <button type="button" class="btn ms-auto btn-sm">+ Room</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ContactsList'
})
</script>

<style scoped>
.contactsList img {
  width: 3rem;
  height: 3rem;
}
</style>
