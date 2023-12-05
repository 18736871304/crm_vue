import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

// const staticRouter = [
//   {
//     childmenu: [{
//       memuname: "客户管理",
//       menucode: "75010000",
//       orderbyid: 1,
//       url: "customerManagementNew/customerManagementNew.html?menutype=75000000"
//     }],
//     memuname: "客户管理",
//     menucode: "75000000",
//     orderbyid: 3,
//     url: "customerManagementNew/customerManagementNew.html?menutype=75000000"
//   },
//   {
//     childmenu: [
//       {
//         memuname: "成交客户",
//         menucode: "76010000",
//         orderbyid: 1,
//         url: "customermaintenance/clinchdeal/clinchdeal.html?type=01"
//       },
//       {
//         memuname: "服务客户",
//         menucode: "76020000",
//         orderbyid: 2,
//         url: "customermaintenance/maintain.html?type=01"
//       },
//       {
//         memuname: "失效保单",
//         menucode: "76030000",
//         orderbyid: 3,
//         url: "customermaintenance/maintain.html?type=02"
//       },
//       {
//         memuname: "终止保单",
//         menucode: "76040000",
//         orderbyid: 4,
//         url: "customermaintenance/maintain.html?type=03"
//       },
//       {
//         memuname: "续期保单",
//         menucode: "76060000",
//         orderbyid: 6,
//         url: "customermaintenance/renewal.html?type=01"
//       },
//       {
//         memuname: "续保保单",
//         menucode: "76070000",
//         orderbyid: 7,
//         url: "customermaintenance/renewal.html?type=02"
//       },
//       {
//         memuname: "生日保单",
//         menucode: "76050000",
//         orderbyid: 8,
//         url: "customermaintenance/maintain.html?type=04"
//       }
//     ],
//     memuname: "客户维护",
//     menucode: "76000000",
//     orderbyid: 4,
//     url: ""
//   },
//   {
//     childmenu: [
//       {
//         memuname: "保险产品",
//         menucode: "72040000",
//         orderbyid: 1,
//         url: "knowledge/insuranceProducts/insuranceProducts.html?type=01"
//       },
//       {
//         memuname: "保单检视",
//         menucode: "72010000",
//         orderbyid: 2,
//         url: "knowledge/knowledgeView.html?konwledgetype=01"
//       },
//       {
//         memuname: "疾病核保",
//         menucode: "72020000",
//         orderbyid: 3,
//         url: "knowledge/knowledgeView.html?konwledgetype=02"
//       },
//       {
//         memuname: "解答疑义",
//         menucode: "72030000",
//         orderbyid: 4,
//         url: "knowledge/knowledgeView.html?konwledgetype=03"
//       },
//       {
//         memuname: "预核保",
//         menucode: "72050000",
//         orderbyid: 5,
//         url: "knowledge/preUnderwrit.html?konwledgetype=01"
//       }
//     ],
//     memuname: "藏经阁",
//     menucode: "72000000",
//     orderbyid: 5,
//     url: ""
//   },
//   {
//     childmenu: [
//       {
//         memuname: "公告设置",
//         menucode: "73010000",
//         orderbyid: 1,
//         url: "sysMan/noticeMan.html?a=1"
//       },
//       {
//         memuname: "保险产品设置",
//         menucode: "73100000",
//         orderbyid: 2,
//         url: "knowledge/insuranceProducts/insuranceProducts.html?type=02"
//       },
//       {
//         memuname: "保单检视设置",
//         menucode: "73030000",
//         orderbyid: 3,
//         url: "sysMan/knowledgeMan.html?type=01"
//       },
//       {
//         memuname: "疾病核保设置",
//         menucode: "73040000",
//         orderbyid: 4,
//         url: "sysMan/knowledgeMan.html?type=02"
//       },
//       {
//         memuname: "解答疑义设置",
//         menucode: "73050000",
//         orderbyid: 5,
//         url: "sysMan/knowledgeMan.html?type=03"
//       },
//       {
//         memuname: "客户公海设置",
//         menucode: "73200000",
//         orderbyid: 6,
//         url: "sysMan/publicCustome/publicCustome.html?type=02"
//       }
//     ],
//     memuname: "系统设置",
//     menucode: "73000000",
//     orderbyid: 6,
//     url: ""
//   },
//   {
//     childmenu: [
//       {
//         memuname: "渠道管理",
//         menucode: "74020000",
//         orderbyid: 1,
//         url: "channelManagement/addChannels/addChannels.html?type=01"
//       },
//       {
//         memuname: "渠道分配规则",
//         menucode: "74030000",
//         orderbyid: 2,
//         url: "channelManagement/channelAllocation/channelAllocation.html?type=01"
//       },
//       {
//         memuname: "渠道客户管理",
//         menucode: "74010000",
//         orderbyid: 3,
//         url: "channelManagement/channelManagement/channelManagement.html?type=01"
//       },
//       {
//         memuname: "渠道客户报表",
//         menucode: "74040000",
//         orderbyid: 4,
//         url: "channelManagement/channelReport/channelReport.html?type=01"
//       }
//     ],
//     memuname: "渠道管理",
//     menucode: "74000000",
//     orderbyid: 7
//   }
// ]
Vue.use(VueRouter)
function cancelQuery(query) {
  var vars = query.split("&");
  var jsonQuery = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    jsonQuery[pair[0]] = pair[1];
  }
  return jsonQuery;
}

function childrenTree (ele) {
  let childrenRouters = ele.childmenu.map((item)=>{
    let url = item.url.split('.html')[0];
    let query = item.url.split('?')[1];
    let query1 = query ? cancelQuery(query) : {};
    let paths = url.slice(url.lastIndexOf('/') + 1);
    let basePaths = url.split('/')[0];
    return {
      path: paths,
      basePaths: '/' + basePaths,
      fullPath: item.url,
      query: query1,
      component: () => import(`@/views/${url}.vue`),
      memuname: item.memuname,
      menucode: item.menucode,
      meta: {},
    }
  })
  return childrenRouters
}

export function getRouter (menuList) {
  let menuRouters = menuList.map(ele => {
    let basePaths = '';
    if(ele.childmenu.length) {
      if(ele.menucode == "75000000") {
        basePaths = 'customerManagementNew'
      } else if (ele.menucode == "76000000") {
        basePaths = 'customermaintenance'
      } else if (ele.menucode == "72000000") {
        basePaths = 'knowledge'
      } else if (ele.menucode == "73000000") {
        basePaths = 'sysMan'
      } else if (ele.menucode == "74000000") {
        basePaths = 'channelManagement'
      }
    }
    return {
      path: '/' + basePaths,
      memuname: ele.memuname,
      menucode: ele.menucode,
      component: Index,
      children: childrenTree(ele)
    }
  });
  return menuRouters
} 

// export const indexRoute = ;
export const errorHtml = {
  path: '*',
  memuname: '*',
  redirect: '/404'
}
export const routes = [
  {
    path: '/',
    memuname: '首页',
    component: Index,
    redirect: 'home',
    children: [
      {
        path: 'home',
        fullPath: 'home',
        component: () => import('@/views/home/index.vue'),
        memuname: '首页',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('@/components/login/index.vue'),
  },
  {
    path: '/audio',
    name: '录音',
    component: () => import('@/components/audio.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: ()=>import('@/views/error/404')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
