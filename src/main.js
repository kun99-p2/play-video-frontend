import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'video.js/dist/video-js.css';

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
