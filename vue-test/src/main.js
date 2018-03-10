import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import VueResource from 'vue-resource'

//开启debug模式
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(Vuex);
// Vue.use(VueResource);Y
const First  = { template:'<div><h2>{{count}}</h2></div>',computed:{count(){return store.state.count}}};
import Second from './component/secondcomponent.vue';


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/first',
      component: First
    },
    {
      path: '/second',
      component: Second
    }
  ]
})

const store = new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    increment(state){
      state.count++;
    }
  }
})    

store.commit('increment');

console.log(store.state.count) // -> 1

const app = new Vue({
  el: '#app',
  router:router,
  store,
  render: h => h(App)
}).$mount('#app');
