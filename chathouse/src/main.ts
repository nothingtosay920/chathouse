import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import { ElMessage, ElDialog, ElButton } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
app.config.globalProperties.$router = router
app.use(store).use(router).use(ElMessage).use(ElDialog).use(ElButton).mount('#app')
