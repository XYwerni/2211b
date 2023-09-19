import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./assets/component.css"

createApp(App).use(router).use(ElementPlus).component('QuillEditor', QuillEditor).mount('#app')
