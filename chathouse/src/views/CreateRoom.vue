<template>
    <div class="d-flex align-items-center justify-content-between my-2y">
      <img src="../assets/headerImg/arrow-left.png " class="mx-3" @click="back">
    <div class="text-center title">
      CreateRoom
    </div>
    <div class="mx-4"></div>
    </div>
  <div v-for="item in list" :key="item" class="roomlist mx-1 my-2">
    <button class="listBtn" type="button"  @click="getMyItem(item)">{{item}}</button>
  </div>
  <div class="d-flex align-items-center justify-content-center">
    <button type="button" class="btn btn-sm my-3" @click="createRoom">+ Room</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import config from '../utils/WebIMConfig'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import emedia from '../utils/EMedia'
import { addRoom } from '../store/params'
export default defineComponent({
  name: 'CreateRoom',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const token = JSON.parse(localStorage.getItem('access_token') as string)
    const list = reactive(['学习', '运动', '畅聊', '教育', '文化', '音乐', '电影', '动漫', '书'])
    let type: string
    const getMyItem = (e) => {
      type = e
    }
    const back = () => {
      router.back()
    }
    // 创建会议
    const createRoom = async () => {
      if (!type) {
        return ElMessage({
          message: '请选择一个类型',
          type: 'error',
          offset: 220
        })
      }
      // 创建房间 修改权限
      store.state.params.roomName = `${type}#${route.query.roomName}`
      console.log(store.state.user.name)
      await emedia.mgr.setIdentity(config.appkey + '_' + store.state.user.name, token.accessToken)
      store.state.params.role = 7
      const userRoom = await emedia.mgr.joinRoom(store.state.params)
      console.log('userRoom', userRoom.id)
      store.state.user.id = userRoom.id
      // 发送请求数据库增加房间
      addRoom(userRoom.confrId, store.state.params.roomName)
      store.state.params.role = 1
      await router.push({
        path: '/room',
        query: {
          id: userRoom.confrId,
          name: store.state.params.roomName
        }
      })
    }
    return {
      list,
      createRoom,
      getMyItem,
      back
    }
  }
})
</script>

<style scoped>

.title {
  font-size: 0.5rem;
}

.roomlist {
  display: inline-block;
}

.listBtn:focus{
  background-color: #d3b17d;
}

.roomlist button{
  border-radius: 20px;
  background-color: #fffbf0;
  color: black;
  width: 28vw;
  height: 1rem;
  font-size: 14px;
  line-height: 1rem;
  border: 1px solid #808080;
}

</style>
