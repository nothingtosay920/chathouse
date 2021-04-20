<template>
      <div class="input-group input-group-sm d-flex flex-column align-items-center">
        <img src="../assets/registerImg.png" class="loginImg">
        <div class="bg rounded">
          <div>
            <input type="text" class="form-control border mx-2 my-2" v-model="nickname" placeholder="Nickname" aria-label="Nickname" aria-describedby="inputGroup-sizing-sm">
          </div>
          <div>
            <input type="text" class="form-control mx-2 my-2" v-model="username" placeholder="Username" aria-label="Username" aria-describedby="inputGroup-sizing-sm">
          </div>
          <div>
            <input type="password" class="form-control border mx-2 mb-2" v-model="password" placeholder="Password" aria-label="Password" aria-describedby="inputGroup-sizing-sm">
          </div>
        </div>
          <button type="button" class="btn btn-success my-2 rounded" @click="register">注册</button>
          <div class="">已有账号?<span class="mx-1" @click="toLogin">点击登录吧!</span></div>
      </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Register',
  setup () {
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const nickname = ref('')
    const store = useStore()
    const toLogin = () => {
      router.push('/login')
    }
    const register = () => {
      if (username.value.trim() === '' || username.value.trim() === null || password.value.trim() === '' || password.value.trim() === null || nickname.value.trim() === '' || nickname.value.trim() === null) {
        ElMessage({
          message: '信息不能为空',
          type: 'error',
          offset: 220
        })
      } else {
        store.dispatch('onRegister', {
          nickname: nickname.value,
          username: username.value,
          password: password.value
        })
      }
    }
    return {
      toLogin,
      register,
      username,
      password,
      nickname
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

input:focus {
  box-shadow: none!important;;
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

.toast {
  position: absolute;
  top: 50%;
  font-size: 0.5rem;
  right: -7%;
}
</style>
