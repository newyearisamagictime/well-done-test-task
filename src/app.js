import Vue from 'vue'
import template from './components/app/component.vue'
import store from './store'

const app = new Vue({
    store,
    ...template
}).$mount('#root');