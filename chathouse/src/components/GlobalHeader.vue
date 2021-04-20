<template>
  <nav class="d-flex  mx-3">
    <img src="../assets/headerImg/newRoom.png" class=" m-2  me-auto" @click="goReady">
    <img src="../assets/headerImg/news.png" class=" m-2 ">
    <img src="../assets/headerImg/contacts.png"  class=" m-2 ">
    <button @click="quit">
      <img src="../assets/headerImg/avatar.png" class=" m-2 ">
    </button>
  </nav>
  <ReadyCreageRoom :visible="val" @visibleClose="close"></ReadyCreageRoom>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ReadyCreageRoom from '../components/ReadyCreateRoom.vue'
import router from '../router'
import WebIM from '../utils/WebIM'
export default defineComponent({
  name: 'GlobalHeader',
  setup () {
    const val = ref(false)
    const goReady = () => {
      val.value = true
    }
    const close = () => {
      val.value = false
    }
    const quit = () => {
      WebIM.conn.close()
      router.push('/')
    }
    return {
      goReady,
      val,
      close,
      quit
    }
  },
  components: {
    ReadyCreageRoom
  }
})
</script>

<style scoped>
button {
  border: none;
  background-color: #f2ecde;
}
</style>
