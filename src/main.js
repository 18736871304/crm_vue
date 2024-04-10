import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// iView组件
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// 放大图片
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
Vue.use(VueViewer, {
  defaultOptions: {
    // "inline": true,
    "button": true,
    "navbar": false,
    "title": false,
    // "toolbar": true,
    "tooltip": true,
    "movable": true,
    // "zoomable": true,
    "rotatable": true,
    "scalable": true,
    "transition": false,
    // "fullscreen": true,
    // "keyboard": true,
    // "url": "data-source"
  }
})





// 复制功能
import VueClipBoard from 'vue-clipboard2'

import App from './App.vue';
Vue.use(ElementUI);
Vue.use(iView);
Vue.use(VueClipBoard);
Vue.config.productionTip = false
axios.defaults.withCredentials = true;

NProgress.configure({
  showSpinner: false
}) // 进度条右上角圆圈

// 前置路由守卫判断是否要登录
router.beforeEach((to, from, next) => {
  NProgress.start();
  // let isLogin = localStorage.getItem('isLogin');
  // if(to.path == '/login'){
  //   if(isLogin !=null) {
  //     next({path: '/'});
  //   } else {
  //     next()
  //   }
  // } else if(isLogin === null) {
  //   next({path: '/login'});
  // } else {
  //   next();
  // }
  next();
  NProgress.done()
})
router.afterEach(() => {
  NProgress.done()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')