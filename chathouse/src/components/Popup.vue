<template>
  <div class="popup">
    <!-- 蒙层 -->
    <transition name="fade">
      <div class="popup-overlay" @click="clickMask" v-show="visible"></div>
    </transition>
    <!-- 弹出层 -->
    <transition name="slide">
      <div class="popup-content" v-show="visible">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Popup',
  emits: ['visibleClose'],
  props: {
    visible: {
      type: Boolean
    },
    display: {
      type: Boolean
    }
  },
  setup (prop, context) {
    const clickMask = () => {
      context.emit('visibleClose')
    }
    return {
      clickMask
    }
  }
})

</script>
<style  scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter,
.slide-leave-active {
  transform: translate3d(0, 100%, 0);
}

.popup .popup-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    widows: 100vw;
    background-color: rgba(0, 0, 0, 0.2);
}

.popup .popup-content {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    transition: transform .3s;
    border-radius: 0.8rem 0.8rem 0 0;
    height: 9.5rem;
    z-index: 999;
  }

</style>
