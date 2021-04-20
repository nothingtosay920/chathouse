<template>
  <div id="container">
    <StatusHeight></StatusHeight>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import StatusHeight from './components/StatusHeight.vue'
export default defineComponent({
  name: 'App',
  components: {
    StatusHeight
  }
})
</script>
<style>
body {
 background-color: #f2ecde;
}
img {
  width: 1rem;
  height: 1rem;
}
.btn {
  background-color: #c0ebd7;
}
.btn:focus{
  box-shadow: none!important;
}

.invitBtn {
  position: relative;
  left: 40%;
}
input:focus {
  box-shadow: none !important;
}
</style>
