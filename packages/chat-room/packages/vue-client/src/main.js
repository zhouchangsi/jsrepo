import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import './styles.scss'

import VEmojiPicker from 'v-emoji-picker';


Vue.config.productionTip = false;
Vue.use(ElementUI)
Vue.use(VEmojiPicker);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')