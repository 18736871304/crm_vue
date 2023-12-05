import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken } from '@/utils/auth'
import api from '@/utils/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken(),
    tempToken: '',
    userInfo: {},
    dictList: '',
    routes: [],
    addRoutes: []
  },
  getters: {
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    TEMP_TOKEN: (state, token) => {
      state.tempToken = token;
    },
    REMOVE_TOKEN: (state) => {
      state.token = '';
      removeToken();
    },
    USER_INFO: (state, obj) => {
      state.token = obj;
    },
    DICT_LIST: (state, obj) => {
      state.dictList = obj;
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      // state.routes = constantRoutes.concat(routes)
    },
  },
  actions: {
    asyncGetToken({commit}) {
      api.getTempToken().then((res)=>{
        if(res) {
          commit('SET_TOKEN', res)
        }
      })
    },
    generateRoutes({commit, dispatch}, ) {
      return new Promise((resolve, reject) => {
        api.getAuthMenuList().then((menuList)=>{
          let menuRouters = [], paths = '', menu = {};
          menuList.forEach(ele => {
            if(ele.childmenu.length) {
              paths = ele.childmenu[0].url.split('/')[0];
            }
            menu = {
              path: '/' + paths,
              name: ele.memuname,
              orderbyid: ele.orderbyid,
              component: Index,
              children: childrenTree(ele, paths)
            }
            menuRouters.push(menu)
          });
          commit('SET_ROUTES', menuRouters)
          resolve(menuRouters)
        }).catch(error=>{
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})
