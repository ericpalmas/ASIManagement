import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import VueHtml2pdf from 'vue3-html2pdf'

// import BalmUI from 'balm-ui'
// import BalmUIPlus from 'balm-ui/dist/balm-ui-plus'

import '@fortawesome/fontawesome-free/js/all'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

createApp(App).use(router).use(store).mount('#app')
