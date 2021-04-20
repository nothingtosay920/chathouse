<template>
    <GlobalHeader></GlobalHeader>
    <!-- <div v-if="list == []"> -->
      <div v-for="item in list" :key="item.id">
        <Cards :data="item"></Cards>
      </div>
    <!-- </div> -->
    <!-- <div v-else class="m-3 text-center" style="font-size: 0.5rem;">当前暂无房间 快来新建亿个吧</div> -->
    <!-- <BottomBar></BottomBar> -->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader from '../components/GlobalHeader.vue'
import Cards from '../components/Cards.vue'
import axios from 'axios'
export default defineComponent({
  name: 'Home',
  setup () {
    const store = useStore()
    const list = ref([])
    const token = JSON.parse(localStorage.getItem('access_token') as string)
    /* eslint-disable */
    onMounted( async() => {
      axios({
        method: 'post',
        url: `http://localhost:3000/users/getGlobalRoomList`
      }).then((res) => {
        list.value = res.data.data
      })
    })
    /* eslint-disable no-new */
    return {
      username: store.state.username,
      list
    }
  },
  components: {
    GlobalHeader,
    Cards
  }
})
</script>

<style scoped>

</style>
