<template>
  <div class="cards m-3 light" style="width: auto;background-color: #fff;" v-if="msg.data" @click="centerDialogVisible = true">
    <div class="p-3">
      <div class="card-title fs-7 mb-3" >
        房间名称:{{'  '+data.name}}
      </div>
    </div>
  </div>
  <el-dialog
    title="是否进入房间"
    v-model="centerDialogVisible"
    width="70%"
    center>
    <span>{{msg.data}}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="goToRoom">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElDialog, ElButton } from 'element-plus'
import { useRouter } from 'vue-router'
import axios from 'axios'
import config from '../utils/WebIMConfig'
import emedia from '../utils/EMedia'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Cards',
  props: {
    data: {
      type: Object
    }
  },
  setup (props: any) {
    const router = useRouter()
    const store = useStore()
    const centerDialogVisible = ref(false)
    const orgName = config.appkey.split('#')
    const token = JSON.parse(localStorage.getItem('access_token') as string)
    const msg = reactive({
      data: '' as any
    })
    const goToRoom = async () => {
      await emedia.mgr.setIdentity(config.appkey + '_' + store.state.user.name, token.accessToken)
      store.state.params.roomName = props.data.name
      const userroom = await emedia.mgr.joinRoom(store.state.params)
      console.log('userroom', userroom)
      localStorage.setItem('confrId', JSON.stringify({ confrId: props.data.confrId }))
      await router.push({
        path: '/room',
        query: {
          id: props.data.confrId,
          name: props.data.name
        }
      })
    }
    /* eslint-disable */
    axios({
      method: 'get',
      url: `${config.restServer}/${orgName[0]}/${orgName[1]}/conferences/${props.data.confrId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.accessToken}`
      }
    }).then(res => {
      msg.data = res
    })
    /* eslint-disable no-new */
    
    return {
      msg,
      ElDialog,
      ElButton,
      centerDialogVisible,
      goToRoom
    }
  }
})
</script>

<style scoped>
.cards {
  border-radius: 1.8rem;
}

.cards-bottom {
  position: absolute;
  top: 90%;
  left: 10%;
}

.card-title {
  font-size: 0.5rem;
}

.cards-bottom-img img{
  width: 20px;
  height: 20px;
}
</style>
