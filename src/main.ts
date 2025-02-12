import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@unocss/reset/tailwind.css'
import './styles/index.css'
import 'uno.css'
import 'lib-flexible'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
