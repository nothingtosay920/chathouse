<template>
  <Popup :visible="visible">
      <div style="height: 60vh" class="mt-2 d-flex flex-column align-items-center" >
        <input
          type="text"
          class="form-control mx-2 my-2"
          v-model="roomName"
          placeholder="请输入一个房间名"
          aria-label="RoomName"
          aria-describedby="inputGroup-sizing-sm"
        />
        <div class="my-2">
          <img src="../assets/earth.png">
        </div>
        <div class="border-top mx-2  my-2 line"></div>
        <div>我有一壶酒，足以慰风尘，尽倾江海里，赠饮天下人。</div>
        <button type="button" class="mybtn mx-3 my-2" @click="createRoom">增加一个话题</button>
        <button @click="close" class="closeBtn">x</button>
      </div>
  </Popup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Popup from './Popup.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'ReadyCreateRoom',
  emits: ['visibleClose'],
  props: {
    visible: {
      type: Boolean
    }
  },
  setup (props, context) {
    const router = useRouter()
    const roomName = ref('')
    const close = () => {
      context.emit('visibleClose')
    }
    const createRoom = () => {
      if (roomName.value === '') {
        return ElMessage({
          message: '房间名不能为空',
          type: 'error',
          offset: 220
        })
      }
      router.push({
        path: '/createroom',
        query: {
          roomName: roomName.value
        }
      })
    }
    return {
      roomName,
      createRoom,
      close
    }
  },
  components: {
    Popup
  }
})
</script>

<style scoped>
img {
  width: 2rem;
  height: 2rem;
}

input {
  width: auto;
  height: 1rem;
  font-size: 0.5rem;
}

.line {
  height: 1px;
  background-color: #808080;
  width: 80%;
}

.mybtn {
  width: 4rem;
  height: 1rem;
  background-color: #f2ecde;
  border-radius: 10px;
  color: #808080;
  border: 1px solid;
}

.closeBtn {
  position: absolute;
  left: 86%;
  top: 0;
  background-color: #fff;
  font-size: 0.8rem;
  border: none;
}
</style>
