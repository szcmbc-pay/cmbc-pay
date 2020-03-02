import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Http from './service/http';
import App from './App.vue';
import SearchBill from './components/SearchBill.vue';
import ConfirmPay from './components/ConfirmPay.vue';
Vue.use(VueRouter);
Vue.use(ElementUI);
// 把http挂在到vue实例上
Vue.prototype.$Http = Http;
/** 这段代码是解决NavigationDuplicated错误，其原因是在Vue-router在3.1之后$router.push()改为了Promise，
    所以假如没有回调函数，错误信息就会交给全局的路由错误处理，因此就会报上述的错误。
*/
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    {
      path: '/search',
      name: 'search',
      component: SearchBill
    },
    {
      path: '/pay',
      name: 'pay',
      component: ConfirmPay
    }
  ]
})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  beforeCreate(){
    console.log('beforeCreate $el',this.$el)
    console.log('beforeCreate $data',this.$data)
  },
  created(){
    console.log('created $el',this.$el)
    console.log('created $data',this.$data)
  },
  beforeMount(){
    console.log('beforeMount $data',this.$data)
    console.log('beforeMount $el',this.$el)
  },
  mounted(){
    console.log('mounted $data',this.$data)
    console.log('mounted $el',this.$el)
  },
  data(){
    return {
      name:'jscl'
    }
  }
}).$mount('#app')
