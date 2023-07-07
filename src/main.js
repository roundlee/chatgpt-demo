import { createApp } from 'vue'
import App from './App.vue'
import {Button,Modal,Input} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.use(Button).use(Modal).use(Input).mount('#app')

