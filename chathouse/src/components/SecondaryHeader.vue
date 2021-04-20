<template>
  <nav class="d-flex mx-3">
    <button @click="back" class="me-auto" ><img src="../assets/headerImg/arrow-left.png" ></button>
    <img src="../assets/cardImg/avatar.png">
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { deleteRoom } from '../store/params'
export default defineComponent({
  name: 'SecondaryHeader',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const back = () => {
      // 判断是否只剩一人
      if (store.state.roomRole === 7 && store.state.admins.length === 1) {
        // 发起请求 销毁房间
        deleteRoom(route.query.id as string)
      }
      router.push('/home')
    }
    return {
      back
    }
  }
})
</script>

<style scoped>
button {
  border: none;
  background-color: #f2ecde;
}
</style>
