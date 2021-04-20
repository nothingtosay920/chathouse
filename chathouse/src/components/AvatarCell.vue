<template>
    <div class="cell flex-column align-items-center justify-content-center">
      <img class="avatar" src="../assets/cardImg/avatar.png">
      <div class="fw-bolder text-center">{{obj.name}}</div>
      <span class="mike" @click="mute(obj.id)">
        <div>
          <img src="../assets/mike.png" v-if="mike">
          <img src="../assets/mike-tight.png" v-else>
        </div>
      </span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import emedia from '../utils/EMedia'
export default defineComponent({
  name: 'AvatarCell',
  props: {
    src: {
      type: String
    },
    obj: {
      type: Object
    }
  },
  setup (props) {
    const route = useRoute()
    const store = useStore()
    let mike = true
    // const videoTag = document.getElementById(`${id}`) // 获取 video 标签
    // emedia.mgr.onMediaChanaged(videoTag, function (constaints, stream) {
    //   console.log('成功了一般', stream)
    //   constaints.audio = false
    // })
    const mute = async (id) => {
      console.log('id', id)
      const myId = id ? id.concat().slice(0, id.length - 2) : ''
      // 判断是否点击的是自己
      if (myId && myId === store.state.user.id) {
        const resStream = await emedia.mgr.pauseAudio(store.state.stream)
        console.log('关闭mike', resStream)
        mike = !mike
      } else {
        if (props.obj && store.state.roomRole === 7 && props.obj.role === 3) {
          console.log('管理员禁言')
          emedia.mgr.muteBymemberId(route.query.id, props.obj.id)
          mike = !mike
        }
      }
    }
    return {
      mute,
      mike
    }
  }
})
</script>

<style scoped>
.avatar {
  width: 2rem;
  height: 2rem;
}

.mike {
  position: absolute;
  left: 80%;
  top: 50%;
}

.cell {
  width: 3rem;
  height: 3rem;
  display: inline-flex;
  position: relative;
}

img {
  width: 0.5rem;
  height: 0.5rem;
}
</style>
