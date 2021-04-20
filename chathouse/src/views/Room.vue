<template>
  <SecondaryHeader></SecondaryHeader>
  <div class="bg mt-2 fixed-bottom">
    <div class="fw-bolder text-center fs-6">{{name}}</div>
    <!-- 管理员 -->
   <div>
      <span v-for="item in admins" :key="item">
      <AvatarCell :obj="item" ></AvatarCell>
    </span>
   </div>
   <!-- 主播 -->
   <div class="fw-bolder text-center fs-6 fst-italic">talker</div>
   <div>
      <span v-for="item in talkers" :key="item">
      <AvatarCell :obj="item" ></AvatarCell>
    </span>
   </div>
   <!-- 观众 -->
   <div class="fw-bolder text-center fs-6 fst-italic">others</div>
   <div>
      <span v-for="item in audience" :key="item">
      <AvatarCell :obj="item" ></AvatarCell>
    </span>
   </div>
  </div>
  <div>
    <video id="xxx" autoplay style="display: none;"></video>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import emedia from '../utils/EMedia'
import { useRouter, useRoute } from 'vue-router'
import AvatarCell from '../components/AvatarCell.vue'
import { useStore } from 'vuex'
import SecondaryHeader from '../components/SecondaryHeader.vue'
import axios from 'axios'
export default defineComponent({
  name: 'Room',
  setup () {
    const route = useRoute()
    const store = useStore()
    const admins = store.state.admins
    const talkers = store.state.talkers
    const audience = store.state.audience
    const token = JSON.parse(localStorage.getItem('access_token') as string)
    onMounted(async () => {
      /* eslint-disable */
      axios({
        method: 'get',
        headers: {
          'Authorization': `Bearer ${token.accessToken}`
        },
        url: `https://a31.easemob.com/1187210314231972/chathouse/conferences/${route.query.id}`
      }).then(res => {
        console.log('房间人数:',res)
        res.data.mems.forEach(ele => {
          store.state.nums++
          // 存储当前房间的权限
          const role = ele.memName.split('_')[1]
          if (role == store.state.user.name) {
            store.state.roomRole = ele.role
          }
          let ignore = false
          // 房间的人员
          switch (ele.role) {
          case 7:
            store.state.admins.forEach((item) => {
              if (item.name === ele.memName) {
                ignore = true
              }
            })
            if (!ignore) {
              store.state.admins.push({
                name: ele.memName,
                id: ele.memberId,
                role: ele.role
              })
            }
            break;
          case 3:
            store.state.talkers.forEach((item) => {
              if (item.name === ele.memName) {
                ignore = true
              }
            })
            if (!ignore) {
              store.state.talkers.push({
                name: ele.memName,
                id: ele.memberId,
                role: ele.role
              })
            }
            break;
          default:
            store.state.audience.forEach((item) => {
              if (item.name === ele.memName) {
                ignore = true
              }
            })
            if (!ignore) {
              store.state.audience.push({
                name: ele.memName,
                id: ele.memberId,
                role: ele.role
              })
            }
            break;
          } 
        })
      })
    /* eslint-disable no-new */
      const constaints = { // 发布音频流的配置参数, Object 必需。 video或audio属性 至少存在一个
        audio: true // 是否发布音频
      }
      const pushedStream = await emedia.mgr.publish(constaints)
    })
    onBeforeUnmount(async() => {
      await emedia.mgr.exitConference()
      store.state.roomRole = 3
      store.state.admins.splice(0)
      store.state.talkers.splice(0)
      store.state.audience.splice(0)
    })
    const name = ref(route.query.name)
    return {
      admins,
      name,
      talkers,
      audience
    }
  },
  components: {
    AvatarCell,
    SecondaryHeader
  }
})
</script>

<style scoped>
.bg {
  background-color: #fff;
  border-radius: 1rem 1rem 0 0;
  height: 80vh;
}
</style>
