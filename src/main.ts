import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import '@yike-design/ui/es/index.less'

// 引入全局方法
import { YkMessage, YkNotification } from '@yike-design/ui'
import Icon from '@yike-design/ui/es/components/svg-icon'
import './style.less'
//路由
import router from './router'
const pinia = createPinia()

const app = createApp(App)

app.config.globalProperties.$notification = YkNotification
app.config.globalProperties.$message = YkMessage

app
  .use(router)
  .use(Icon)
  .use(pinia)
  .mount('#app')
