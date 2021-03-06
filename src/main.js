// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import { store } from './store/store'
import Mixin from './mixins/mixin'

Vue.use(VueResource)
Vue.mixin(Mixin)

Vue.http.options.root = 'http://api.openweathermap.org/data/2.5/forecast'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
