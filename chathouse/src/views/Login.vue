<template>
  <div class="input-group input-group-sm d-flex flex-column align-items-center">
    <img src="../assets/loginImg.png" class="loginImg" />
    <div class="bg rounded">
      <div>
        <input
          type="text"
          class="form-control mx-2 my-2"
          v-model="username"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      <div>
        <input
          type="password"
          class="form-control border mx-2 mb-2"
          v-model="password"
          placeholder="Password"
          aria-label="Username"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
    </div>
    <button
      type="button"
      class="btn btn-success my-2 rounded"
      @click="login"
      id="liveToastBtn"
    >
      登录
    </button>
    <div class="">
      木得账号?<span class="mx-1" @click="toRegister">点击注册吧!</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import emedia from '../utils/EMedia'
import { getToken } from '../store/params'
export default defineComponent({
  name: 'Login',
  setup () {
    const router = useRouter()
    const store = useStore()
    const username = ref('')
    const password = ref('')
    // 跳转注册页面
    const toRegister = () => {
      router.push('/register')
    }
    const login = () => {
      // 登录
      store.dispatch('onLogin', {
        username: username.value.toLowerCase(),
        password: password.value
      }).then(() => {
        // 获取token
        store.commit('setUserName', { username: username.value })
        getToken()
        emedia.mgr.onMemberJoined = function (member) {
          console.log(member)
          store.state.nums++
          let ignore = false
          switch (member.role) {
            case 7:
              // if (store.state.admins.indexOf(member.globalName) === -1) {
              //   store.state.admins.push(member.globalName)
              // }
              store.state.admins.forEach((item) => {
                if (item.name === member.globalName) {
                  ignore = true
                }
              })
              if (!ignore) {
                store.state.admins.push({
                  name: member.globalName,
                  id: member.id,
                  role: member.role
                })
              }
              break
            case 3:
              store.state.talkers.forEach((item) => {
                if (item.name === member.globalName) {
                  ignore = true
                }
              })
              if (!ignore) {
                store.state.talkers.push({
                  name: member.globalName,
                  id: member.id,
                  role: member.role
                })
              }
              break
            default:
              store.state.audience.forEach((item) => {
                if (item.name === member.globalName) {
                  ignore = true
                }
              })
              if (!ignore) {
                store.state.audience.push({
                  name: member.globalName,
                  id: member.id,
                  role: member.role
                })
              }
              break
          }
        }
        /* eslint-disable */
        emedia.mgr.onMemberExited = function (member) {
          console.log('member', member)
          let idx = -1
          switch (member.role) {
            case 7:
              for (let i = 0; i < store.state.admins.length; i++) {
                if (store.state.admins[i].name === member.globalName) {
                    idx = i
                }               
              }
              if (idx !== -1) {
                if (store.state.admins.length === 1) {
                  emedia.mgr.exitConference()
                  store.state.roomRole = 3
                  store.state.admins.splice(0)
                  store.state.talkers.splice(0)
                  store.state.audience.splice(0)
                  router.push('/home')
                } else {
                  store.state.admins.splice(idx, 1)
                }
              } else {
                console.log('出错了', store.state.admins, member)
              }
              break;
            case 3:
              console.log('length', store.state.talkers.length)
              for (let i = 0; i < store.state.talkers.length; i++) {
                if (store.state.talkers[i].name == member.globalName) {
                  idx = i
                }               
              }
              if (idx !== -1) {
                store.state.talkers.splice(idx, 1)
              } else {
                console.log('出错了', member)
              }
              break;
            default:
              for (let i = 0; i < store.state.audience.length; i++) {
                if (store.state.audience[i].name === member.globalName) {
                  idx = i
                }               
              }
              if (idx !== -1) {
                store.state.audience.splice(idx, 1)
              } else {
                console.log('出错了', store.state.audience, member)
              }
              break;
            }
        }
        emedia.mgr.onStreamAdded = function (member, stream) {
          console.log('id', member.id)
          if (!stream.located()) {
            let el = document.createElement('video');
            el.id = member.id
            el.autoplay = true;
            const option = {
              member: member,
              stream: stream,
              subVideo: false,
              subAudio: true,
              videoTag: el
            }
            store.state.stream = stream
            emedia.mgr.subscribe(option.member, option.stream, option.subVideo, option.subAudio, option.videoTag)
          }
        }
        
/* eslint-disable no-new */
      })
    }
    return {
      toRegister,
      login,
      username,
      password
    }
  }
})
</script>

<style scoped>
.bg {
  background-color: #fffbf0;
}

input {
  width: auto;
  height: 1.2rem;
  font-size: 0.5rem;
}

.loginImg {
  width: 4rem;
  height: 4rem;
  margin-bottom: 2.2rem;
}

.btn {
  width: 3rem;
  height: 1rem;
  line-height: 0.2rem;
  font-size: 0.5rem;
}

span {
  color: var(--bs-secondary);
}

</style>
