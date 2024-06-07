<template>
  <div id="containerBox" class="containerBox" v-cloak>
    <div class="menu-box clearfix">
      <div class="logo fl"></div>
      <el-menu :default-active="activeIndex" background-color="transparent" text-color="#909399" active-text-color="white" mode="horizontal" class="menu-ui fl" @select="handleSelect">
        <el-menu-item v-for="item in tabMenus" :key="item.menucode" :index="item.memuname">
          <sidebar-item :item="item" :base-path="item.path"></sidebar-item>
        </el-menu-item>
      </el-menu>
      <div class="fr" style="display: flex; align-items: center; margin-right: 0.5rem">
        <div class="jindu">
          <p>战斗力</p>
          <el-progress :percentage="percentage" :show-text="false" :color="customColorMethod" class="fl"></el-progress>
        </div>
        <div class="jinduone">
          <el-badge :value="promptSize" :max="99" class="item">
            <div class="el-button-nav" @click="centerDialogVisible = true"></div>
          </el-badge>
        </div>
        <div class="jindutwo">
          <el-dropdown trigger="click" @command="handleCommand" @visible-change="visibleChange" class="el-dropdown-bg" :class="{ changeColor }" placement="bottom">
            <span class="el-dropdown-link">{{ Online
              }}<i class="el-icon-arrow-down el-icon--right" :class="[{ 'arrow-down-top': isDown }]"></i></span>
            <el-dropdown-menu slot="dropdown" class="dianhua">
              <el-dropdown-item :class="{ changeColor1: Online == '在线' }" command="在线">在线</el-dropdown-item>
              <el-dropdown-item :class="{ changeColor2: Online == '离线' }" command="离线">离线</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="jindufive extensionNumber">
          <span>分机号：</span>
          <span>{{ extensionNumber }}</span>
        </div>
        <div class="jinduthree" style="width: 1.5rem">
          <!-- <ul class="">
            <li
              class=""
              v-for="(item, index) in liList"
              :key="index"
              @click="activeFun(index)"
              :class="{ qiehuan: index == current }"
            >#ff4949
              {{ item.title }}
            </li>
          </ul> -->
          <span style="color: #b1b1b1; font-size: 0.14rem">回扫外呼：</span>
          <el-switch v-model="isPhoneLogin" active-color="#13ce66" inactive-color="#909399" @change="activeFun(isPhoneLogin)">
          </el-switch>
        </div>

        <!-- <div class="jindufive">
          <span class="spanone"><img :src="userphoto" /></span>
          <span class="spantwo">{{ username }}，</span>
          <span class="spantwo" @click="SignOut()">退出</span>
        </div> -->

        <div class="jindufive" style="cursor: pointer;">
          <el-dropdown trigger="click" placement="bottom" @command="handleuser">
            <span class="el-dropdown-link">
              <img :src="userphoto" class="avtarimg" />
              <span style="color: #b1b1b1;">
                {{ username }}
              </span><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="dianhuaaa" style="margin-top:0px">
              <el-dropdown-item command="a"> <i class="el-icon-unlock"></i>更改密码</el-dropdown-item>
              <el-dropdown-item command="b"> <i class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </div>
    </div>
    <div class="msg-popover" v-if="centerDialogVisible">
      <ul class="list">
        <li class="item" v-for="(my_data, index) in feijing" :key="index">
          <div class="l">
            <div class="h6">{{ my_data.prompt_msg }}</div>
            <div class="time">{{ my_data.prompt_time }}</div>
          </div>
          <img :src="my_data.wximgurl" alt="" class="r" v-if="my_data.wximgurl" />
        </li>
      </ul>
      <div class="close-btn" @click="handleClose">收回</div>
    </div>
    <div class="content-box">
      <div class="menu-common" v-if="conditionMenu" :style="{ width: menuWidth }" style="">
        <el-menu :default-active="activeIndexLeft" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item v-for="item in leftMenus" :key="item.menucode" :index="item.menucode">
            <sidebar-children :item="item" :base-path="item.path"></sidebar-children>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="contentBox" id="contentBox" :style="{ width: contentWidth }">
        <router-view :key="keyValue" @onSend="onSend"></router-view>
      </div>
    </div>
    <agent-bar id="call" ref="agentbar" @phoneLogon="phoneLogon" @extensionNumber="extensionNum"></agent-bar>

    <AssignClues></AssignClues>

    <el-dialog title="修改密码" :visible.sync="iseditDialog" width="25%" center :close-on-click-modal="false">

      <div class="editPassword">

        <Form>

          <div class="demo-input-suffix">
            原密码：
            <el-input placeholder="请输入密码" prefix-icon="el-icon-unlock" v-model="oldPassword" show-password autocomplete="new-password">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            新密码：
            <el-input placeholder="请输入密码" prefix-icon="el-icon-unlock" v-model="newPassword" show-password autocomplete="new-password">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            新密码确认：
            <el-input placeholder="请输确认密码" prefix-icon="el-icon-unlock" v-model="newPasswordValue" show-password autocomplete="new-password">
            </el-input>

          </div>

        </Form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="iseditDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="editDialog" class="sure_edit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// @ is an alias to /src
import $ from "jquery";
import router, { routes, getRouter, errorHtml } from "../router";
import axios from "axios";
import { getData, getPhoneData, my_url } from "../static/js/ajax.js";
import SidebarItem from "../components/sidebar/index.vue";
import SidebarChildren from "../components/sidebar1/index.vue";
import AgentBar from "../components/tkyCall/index.vue";
import AssignClues from "../components/assignClues/index.vue";
import api from "../utils/api.js";
import { hex_md5 } from "../static/js/md5.js";
var loading;
export default {
  name: "index",
  components: {
    SidebarItem,
    SidebarChildren,
    AgentBar,
    AssignClues,
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      newPasswordValue: '',
      iseditDialog: false,
      isPhoneLogin: false, //是否登录电话
      extensionNumber: "", //分机号码
      url_version: "",
      centerDialogVisible: false,
      showKnowledgetDialog: false,
      dis_lifeMenu: false,
      tabMenus: [],
      activeIndex: "首页",
      activeIndexLeft: "",
      leftMenus: [],
      leftMenus_sub: [],
      conditionMenu: false,
      isCollapse: false,
      arrowSrc: "customerManagement/imgs/left_arrow.png",
      left: "1.8",
      menuWidth: "2.1rem",
      contentWidth: "100%",
      current: 1,
      iframeSrc: "",
      Online: "",
      isDown: false,
      changeColor: false,

      disTeamAll: true,
      teamName: "团队选择",
      teamData: [
        {
          id: 1,
          label: "团队选择",
          children: [],
        },
      ],
      current: 1,
      liList: [
        {
          title: "登录",
        },
        {
          title: "登出",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      percentage: 0,
      promptSize: 0,
      newho: "",
      host: false,
      my_isonline: "",
      username: "",
      my_list: "",
      feijing: [],
      userphoto: "",
      usercode: "",
      tipList: {
        71010000:
          "每天晚上24:00系统平均分配300条陌客资源给P1员工，并回收已拨打但未被转为意向客户资源",
        71020000:
          "每天晚上24:00系统平均分配50条特殊资源给P1员工，200条给P2-P5员工，并回收已拨打但未被转为意向客户资源",
        71030000: "线索分配七天后如未被转为意向客户，将会被系统自动回收",
        71040000: "容量最多200条",
        71050000:
          "如犹豫期内退保，请联系系统管理员将客户的跟进状态变更为意向客户或未成交/无效客户",
        71060000: "每周六晚上24:00系统自动回收未成交/无效客户资源",
        71070000: "每周六晚上24:00系统自动回收非标体客户资源",
        71080000: "每周六晚上24:00系统自动回收同行资源",
        71090000: "每周六晚上24:00系统自动回收空号停机资源",
      },
    };
  },
  created() {
    loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(255, 255, 255, 0.9)",
    });
  },
  watch: {
    "$route.path"(toPath, fromPath) {
      let _this = this;
      let version = this.getQueryVariable("v");
      if (toPath == "/home" || fromPath == "/home") {
        api.getDictList({ dict_type: "crm_url_version" }).then((res) => {
          if (version && version != res.dictList[0].dd_key) {
            window.location.href = "https://crm.meihualife.com/crm/index.html";
            // _this.$router.push({path: '/', query: {v: res.dictList[0].dd_key}}, () => {})
          }
        });
      }
    },
    // isPhoneLogin: function () {
    //   let _this = this;
    //   if (this.isPhoneLogin) {
    //     // setInterval(function () {
    //     //   _this.isPhoneLogin = false;
    //     //   _this.extensionNumber = "暂无";
    //     //   console.log("继续输出", _this.isPhoneLogin);
    //     // }, 9000);
    //   }
    // },
  },
  computed: {
    keyValue() {
      return this.$route.path + Math.random();
    },
  },
  mounted: function () {
    let _this = this;
    let version = { dict_type: "crm_url_version" };
    let Version = this.getQueryVariable("v");
    // 先检测是否登录
    api
      .islogin()
      .then((res) => {
        if (res.code == 0) {
          Promise.all([
            api.getDictList(version),
            api.getPageHeaderInfo(),
            api.headerPrompts(),
            api.getAuthMenuList(),
            api.getTempToken(),
            api.getHomePagePermission(),
          ]).then((res) => {
            // 获取版本号对比
            if (_this.Version && _this.Version != res[0].dictList[0].dd_key) {
              _this.$router.push(
                { path: "/", query: { v: res[0].dictList[0].dd_key } },
                () => { }
              );
            }
            _this.$store.commit("DICT_LIST", res[0].dictList[0].dd_key);
            _this.getPageHeaderInfo(res[1]);
            _this.headerPrompts(res[2]);
            // 获取菜单权限
            const meun = getRouter(res[3]);
            _this.$store.commit("SET_ROUTES", res[3]);
            meun.forEach((ele) => {
              router.addRoute(ele);
            });
            router.addRoute(errorHtml);
            meun.unshift(routes[0]);
            _this.tabMenus = meun;
            // 存储临时token
            if (res[4].code == 0) {
              _this.$store.commit("TEMP_TOKEN", res[4].token);
            }
            // _this.$store.dispatch('generateRoutes').then((data)=>{
            //   let temptabMenu = data;
            //   // if (res[3].code == "0") {
            //   //   if (_this.usercode != 'D099') {
            //   //     temptabMenu.unshift(routes[0]);
            //   //   }
            //   // }
            //   temptabMenu.forEach(ele => {
            //     router.addRoute(ele);
            //   });
            //   router.addRoute(errorHtml);
            //   temptabMenu.unshift(routes[0]);
            //   _this.tabMenus = temptabMenu;
            // });
            loading.close();
          });
        } else {
          loading.close();
          _this.$router.push({ path: "/login" }, () => { });
        }
      })
      .catch((error) => {
        loading.close();
        _this.$router.push({ path: "/login" }, () => { });
      });

    this.mainInit();
  },
  methods: {

    //确认修改密码
    editDialog() {
      var _this = this

      if (this.newPassword != this.newPasswordValue) {
        _this.$message({
          duration: 3000,
          showClose: true,
          message: "两次密码输入不一致，请重新输入",
          type: "error",
          center: true,
        });
        return
      }

      var params = {
        // usercode: this.newPasswordValue,
        yuanpassword: hex_md5(this.oldPassword).toUpperCase(),
        password: hex_md5(this.newPassword).toUpperCase()
      }
      console.log(params)

      getData("post", my_url + "/crm/auth/psdUpdate.do", function (data) {
        console.log(data)
        if (data.code == 0) {
          _this.$message({
            duration: 2500,
            showClose: true,
            message: "修改成功，退出后请重新登录",
            type: "success",
            center: true,
          });
          setTimeout(() => {
            _this.SignOut()
          }, 2500)
          
        } else {
          // data.msg
          _this.$message({
            duration: 3000,
            showClose: true,
            message: data.msg,
            type: "error",
            center: true,
          });
        }
      }, params);

    },
    //获取登录用户信息
    getPageHeaderInfo(data) {
      var _this = this;
      _this.username = data.username;
      _this.userphoto = data.userphoto;
      // _this.extensionNumber = data.phoneno;
      _this.usercode = data.usercode;
      if (data.isonline == "Y") {
        _this.Online = "在线";
      } else {
        _this.Online = "离线";
        _this.changeColor = true;
      }
    },
    //获取当前用户的战斗力，当前是否有热线信息
    headerPrompts(data) {
      var _this = this;
      if (data.code == 0) {
        let { fightdata, newhotline } = data;
        _this.percentage = Number(fightdata);
        _this.newho = newhotline;
        _this.host = newhotline == "Y" ? true : false;
        _this.feijing = _this.feijing.concat(data.promptList);
        _this.promptSize = data.promptSize;
      } else {
        _this.$message({
          duration: 3000,
          showClose: true,
          message: data.msg,
          type: "error",
          center: true,
        });
      }
    },
    // 根据路径判断是哪个页面
    getQueryVariable(variable) {
      var query = window.location.href.split("?")[1] || "";
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    handleClose(done) {
      let _this = this;
      getData("post", my_url + "/crm/auth/msgClick.do", function (data) {
        if (data.code == 0) {
          _this.promptSize = 0;
          _this.feijing = [];
          _this.centerDialogVisible = false;
        }
      });
    },

    handleuser(command) {
      if (command == 'b') {
        this.SignOut()
      }
      if (command == 'a') {
        this.oldPassword = ''
        this.newPasswordValue = ''
        this.newPassword = ''
        this.iseditDialog = true
      }
    },

    SignOut() {
      let _this = this;
      api.logOut().then((data) => {
        if (data.code == 1) {
          _this.$message({
            duration: 3000,
            showClose: true,
            message: data.msg,
            type: "error",
            center: true,
          });
          localStorage.removeItem("isLogin");
          _this.$router.push("/login", () => { });
        }
        if (data.code == 0) {
          localStorage.removeItem("isLogin");
          _this.$router.push("/login", () => { });
        }
      });
    },
    showMenu() {
      let _this = this;
      this.isCollapse = !this.isCollapse;
      this.arrowSrc = this.isCollapse
        ? "customerManagement/imgs/right_arrow.png"
        : "customerManagement/imgs/left_arrow.png";
      this.left = this.isCollapse ? "0.3" : "1.8";
      if (_this.isCollapse) {
        setTimeout(function () {
          _this.contentWidth = "calc(100% - 50px)";
        }, 300);
      } else {
        setTimeout(function () {
          _this.contentWidth = "calc(100% - 2.1rem)";
        }, 100);
      }
      this.menuWidth = this.isCollapse ? "50px" : "2.1rem";
    },
    handleCommand(command) {
      console.log(command)
      let _this = this;
      let isonline = "";
      if (command == "在线") {
        this.changeColor = false;
        isonline = "Y";
      } else {
        this.changeColor = true;
        isonline = "N";
      }
      this.Online = command;
      let params = { isonline };
      api.setOnlineInfo(params).then((data) => {
        if (isonline == "N") {
          sessionStorage.setItem("isonlin", "N");
        } else {
          sessionStorage.setItem("isonlin", "Y");
        }
        _this.conditionMenu = false;
        _this.contentWidth = "100%";
        $(".menu-ui").find("li").removeClass("is-active");
        $(".menu-ui").find("li").css({ color: "#909399" });
        $(".menu-ui").find("li:first").addClass("is-active");
        $(".menu-ui").find("li:first").css({ color: "#fff" });
        _this.$router.push(
          { path: "/", query: { v: _this.$store.state.dictList } },
          () => { }
        );
      });
    },
    visibleChange(e) {
      this.isDown = e;
    },
    handleCheckChange(data, checked, indeterminate) {
      this.my_list = checked.checkedKeys.join(",");
    },
    handleSelect(menucode) {
      let _this = this;
      if (menucode == "首页" || menucode == "客户管理") {
        setTimeout(() => {
          _this.conditionMenu = false;
          _this.contentWidth = "100%";
        }, 300);
      } else {
        //默认宽的显示
        this.isCollapse = false;
        this.arrowSrc = "customerManagement/imgs/left_arrow.png";
        this.left = "1.8";
        let tempMenus = [],
          templeftMenus = [];
        this.tabMenus.forEach((res) => {
          if (menucode == res.memuname) {
            tempMenus = res.children;
          }
        });
        if (tempMenus && tempMenus.length >= 1) {
          this.leftMenus = tempMenus;
          this.activeIndexLeft = tempMenus[0].menucode;
          setTimeout(() => {
            _this.conditionMenu = true;
            _this.contentWidth = "calc(100% - 2.1rem)";
            _this.menuWidth = "2.1rem";
          }, 300);
        }

        // tempMenus.forEach(res => {
        //   templeftMenus.push({
        //     url: res.url,
        //     isCollapse: res.memuname.substring(0, 1),
        //     name: res.memuname,
        //     childmenu: res.childmenu,
        //     tip: this.tipList[res.menucode]
        //   })
        // });

        // this.leftMenus_sub = [];
        // this.leftMenus = [];
        // templeftMenus.forEach(res => {
        //   if (res.childmenu != undefined) {
        //     this.leftMenus_sub.push(res);
        //   } else {
        //     this.leftMenus.push(res);
        //   }
        // })
      }
    },
    handleSelectChild(key, index) {
      var _body = window.parent;
      var _iframe1 = _body.document.getElementById("iframeId");
      _iframe1.src = key + "&v=" + this.url_version;
      $(".menuCommon .el-menu-vertical-demo")
        .find("li:first")
        .removeClass("is-active");
    },
    activeFun(index) {
      this.$refs.agentbar.phoneLogin(index);
      if (!index) {
        this.isPhoneLogin = false;
        this.extensionNumber = "";
        // this.handleCommand('离线')
      } else {
        // this.handleCommand('在线')
      }
    },

    phoneLogon(msg) {
      console.log(msg);
      if (!msg) {
        this.extensionNumber = "";
        this.isPhoneLogin = false;
        // this.handleCommand('离线')
      } else {
        this.isPhoneLogin = true;
        // this.handleCommand('在线')
      }
    },
    extensionNum(msg) {
      console.log(msg);
      this.extensionNumber = msg;
    },

    mainInit() {
      let _this = this;

      getData("post", my_url + "/crm/call/getTkyUser.do", function (data) {
        console.log(data);
        if (data) {
          if (data.state == "01") {
            _this.activeFun("true");
          }
        } else {
        }
      });
    },

    customColorMethod(percentage) {
      if (percentage <= 100) {
        return "#DC220D";
      }
    },
    onSend(e) {
      this.$refs.agentbar.customCall(e);
    },
  },
};
</script>
<style scoped src="../static/css/my_index.css"></style>
<style scoped>
[v-cloak] {
  display: none;
}

.menu-common {
  width: 100%;
  height: calc(100% - 0.56rem);
}

.menu-common .el-menu-vertical-demo {
  position: relative;
  margin-left: 0 !important;
  background: #fff;
  padding-top: 0.22rem;
}

.menu-common .el-menu--collapse {
  height: 100%;
  width: 50px;
}

.menu-common .el-menu {
  position: relative;
  box-sizing: border-box;
}

.menu-common .el-menu span.title {
  display: flex;
  align-items: center;
}

.menu-common .el-menu span.title img {
  margin-left: 4px;
  margin-top: -2px;
  width: 0.14rem;
  height: 0.14rem;
}

.menu-common .el-menu span,
.menu-common .el-menu li,
.menu-common .el-submenu__title {
  font-size: 0.14rem !important;
}

.menu-common .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100vh - 0.56rem);
}

.menu-common .el-menu-item,
.el-submenu__title {
  height: 0.46rem;
  line-height: 0.46rem;
  color: #303133;
  display: flex;
  align-items: center;
}

.menu-common .el-menu-vertical-demo:not(.el-menu--collapse) .el-menu-item {
  padding: 0 0.2rem 0 0.6rem !important;
}

.menu-common .el-menu-vertical-demo:not(.el-menu--collapse) .el-menu-item.is-active {
  color: #dc220d;
  background: rgba(244, 244, 244, 1) !important;
  border-left: 0.03rem solid #dc220d;
  padding: 0 0.2rem 0 0.57rem !important;
}

.el-menu-vertical-demo /deep/ .el-menu-item.is-active a {
  color: #dc220d;
}

.menu-common .el-menu--collapse .el-menu-item.is-active {
  color: #dc220d;
  background: rgba(244, 244, 244, 1);
}

.menu-common .el-submenu .el-menu-item {
  height: 0.46rem;
  line-height: 0.46rem;
  width: calc(2.1rem - 1px);
}

.menu-common .el-menu-item:focus,
.el-menu-item:hover {
  background: rgba(244, 244, 244, 1);
  color: #dc220d;
}

.menu-common .el-menu-item > div {
  width: 100%;
}

.menu-common .el-submenu .el-menu-item a:hover {
  color: #dc220d !important;
}

.menu-common .el-submenu__title:focus,
.el-submenu__title:hover {
  background: rgba(244, 244, 244, 1);
}

.menu-common .el-menu {
  background: rgba(255, 255, 255, 1);
  margin-left: 0;
}

.menu-common .el-submenu__title {
  padding: 0 0.2rem 0 0.57rem !important;
  border-left: 0.03rem solid #fff;
}

.menu-common .el-menu-item-group__title {
  padding: 0;
}

.menu-common .el-submenu.is-active .el-submenu__title {
  color: #dc220d;
  background: rgba(244, 244, 244, 1);
  border-left: 0.03rem solid #dc220d;
}

.menu-common .el-menu-vertical-demo:not(.el-menu--collapse) .el-menu-item-group .el-menu-item.is-active {
  color: #dc220d;
  background: rgba(244, 244, 244, 1);
  border-left: none;
  padding: 0 0.2rem 0 0.7rem !important;
}

.menu-common .el-menu-vertical-demo:not(.el-menu--collapse) .el-menu-item-group .el-menu-item {
  padding: 0 0.2rem 0 0.7rem !important;
}

.menu-common .el-menu--collapse .el-submenu .el-submenu__title {
  padding: 0 0 0 20px !important;
  border-left: 0 !important;
}

.menu-common .el-submenu.is-active .el-submenu__title i {
  color: #dc220d;
}

#contentBox {
  position: absolute;
  right: 0;
  /* overflow-x: hidden; */
}

.menu-common {
  position: fixed;
}

.avtarimg {
  width: 0.24rem;
  height: 0.24rem;
  margin: 0.16rem;
  overflow: hidden;
  float: left;
  border-radius: 50%;
}

.jindufive span {
  display: flex;
  align-items: center;
  color: #b1b1b1;
  font-size: 0.14rem;
}

.editPassword {
  padding: 30px 30px 0;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}

::v-deep .editPassword .el-input__inner {
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.14rem;
  padding-left: 40px !important;
}
::v-deep .editPassword .el-input__icon {
  line-height: 0.3rem;
}
.editPassword .demo-input-suffix {
  margin-bottom: 0.3rem;
  font-size: 0.14rem;
}

.editPassword .demo-input-suffix .el-input {
  margin-top: 0.1rem;
}

::v-deep .editPassword .demo-input-suffix .el-input .el-input__suffix {
  margin-right: 0.15rem;
}

::v-deep .el-dialog__footer .dialog-footer .sure_edit:hover,
::v-deep .el-dialog__footer .dialog-footer .sure_edit:focus {
  color: #fff;
  background: #dc220d;
  border: 0px solid #dc220d;
}
::v-deep .el-dialog__footer .dialog-footer .sure_edit {
  border-radius: 3px;
  cursor: pointer;
  background: #dc220d;
  font-size: 0.14rem;
  color: #fff;
  border: 0px solid #dc220d;
}

.dianhuaaa {
  width: 1.6rem !important;
  padding: 5px 0 !important;
  text-align: center;
}
.dianhuaaa .el-dropdown-menu__item {
  font-size: 0.14rem;
}
/* ::v-deep .el-button:hover{
  background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
} */

::v-deep input::-webkit-input-placeholder {
  color: #aab2bd;
  font-size: 0.13rem;
  line-height: 0.3rem;
}
</style>
