import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import Vant from 'vant'
// import 'vant/lib/index.css'

// Vue.use(Vant);
import {Cell, CellGroup ,Tabbar,TabbarItem,PullRefresh,Stepper,Tab,Tabs,Button, Row, Col, Swipe, SwipeItem , Lazyload ,List ,Field, NavBar } from 'vant'

Vue.use(Cell).use(CellGroup).use(Tabbar).use(TabbarItem).use(Stepper).use(PullRefresh).use(Tab).use(Tabs).use(Field).use(NavBar).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

