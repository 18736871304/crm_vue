<template>

  <body style="height: 96%">
    <div class="bodt" id="bodt">
      <div class="logo-box">
        <div class="logo-title">CRM客户关系管理系统</div>
        <div style="position: relative; margin-bottom: 0.35rem">
          <input type="text" class="my_input" id="userName" placeholder="请输入用户名" autocomplete="off" />
          <span class="icon icon1"></span>
        </div>

        <div style="position: relative">
          <input type="password" style="color: #8c9297 !important" class="my_input" id="password" placeholder="请输入密码" autocomplete="off" />
          <span class="icon icon2"></span>
        </div>
        <div class="error"></div>
        <button type="button" class="btn btn-primary block full-width login" @click="login">
          登录
        </button>
      </div>
    </div>
  </body>
</template>

<script>
import $ from "jquery";
import { getData, my_url } from "../../static/js/ajax.js";
import { hex_md5 } from "../../static/js/md5.js";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      url_version: "",
    };
  },
  mounted() {
    var _this = this;
    window.addEventListener('keydown', this.keyDown);
    // getData("post", my_url + "/crm/auth/islogon.do", function (data) {
    //   console.log(data, "开始");
    //   if (data.code == 0) {
    //     // window.location.href = '../index.html?v=2021_02_09'
    //     console.log("进入");
    //     var versionData = {
    //       dict_type: "crm_url_version",
    //     };
    //     getData("post", my_url + "/crm/common/getDictList.do", function (data) {
    //       console.log("发送成功");
    //       if (data.code) {
    //         // window.location.href =
    //         //   "../index.html?v=" + data.dictList[0].dd_key;
    //         _this.$router.push({path: '/', query: {v: data.dictList[0].dd_key}})
    //       }
    //     }, versionData);
    //   }
    // }, null);
  },
  methods: {
    login() {
      let _this = this;
      var userName = $("#userName").val();
      var password = $("#password").val();

     password = hex_md5(password).toUpperCase();
      let params = {
        userCode: userName,
        passWord: password,
      };

      if (userName != "" && password != "") {
        getData(
          "post",
          my_url + "/crm/auth/logon.do",
          function (data) {
            if (data.code == 0) {
              var versionData = {
                dict_type: "crm_url_version",
              };
              getData(
                "post",
                my_url + "/crm/common/getDictList.do",
                function (data) {
                  if (data.code) {
                    _this.$store.commit('DICT_LIST', data.dictList[0].dd_key)
                    localStorage.setItem("isLogin", true);
                    _this.$router.push({
                      path: "/",
                      query: { v: data.dictList[0].dd_key },
                    });
                    // window.location.href = '../index.html?v=' + data.dictList[0]
                    //     .dd_key
                  }
                },
                versionData
              );
            } else {
              _this.$message({
                message: data.msg,
                duration: 3000,
                type: "error",
              });
            }
          },
          params
        );
      } else {
        this.$message({
          message: "账户或密码不能为空!",
          duration: 3000,
          type: "warning",
        });
      }
    },
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.login();
      }
    }
  },
  destored() {
    window.removeEventListener('keydown', this.keyDown, false)
  }
};
</script>
<style scoped>
.btn-primary {
  width: 100%;
  height: 0.6rem;
  background: url(../../static/images/denglu.png) no-repeat;
  background-size: 100% 100%;
  text-align: center;
  line-height: 0.6rem;
  font-size: 0.24rem;
  color: #ffffff;
  border: none;
  margin-top: 0.66rem;
  cursor: pointer;
}
.bodt {
  width: 100%;
  height: 100%;
}
.my_logo {
  width: 100%;
  height: 0.56rem;
}
.logo-box {
  width: 4.6rem;
  height: 5rem;
  background-color: white;
  position: fixed;
  margin-left: 50%;
  left: -2.3rem;
  top: 1.7rem;
}
.logopic {
  width: 1.36rem;
  height: 0.56rem;
  background: url(../../static/images/logo.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 0.22rem;
  margin-left: 0.33rem;
}
.logo-title {
  width: 100%;
  line-height: 0.39rem;
  color: #282828;
  font-size: 0.36rem;
  text-align: center;
  margin-bottom: 1.2rem;
  font-weight: 600;
}

.my_input {
  width: 100%;
  height: 0.32rem;
  line-height: 0.32rem;
  color: #979797;
  border: none;
  border-bottom: 1px solid rgba(191, 191, 191, 1);
  text-indent: 0.46rem;
  font-size: 0.16rem;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  color: #8c9297 !important;
}
.input-style {
  width: 206px;
  line-height: 30px;
  height: 30px;
  border: 1px solid #8c9297;
  border-radius: 5px;
}
.icon {
  width: 0.22rem;
  height: 0.3rem;
  background: red;
  position: absolute;
  top: 0;
  left: 0;
}
.icon1 {
  background: url(../../static/images/gonghao.png) no-repeat;
  background-size: 100%;
  top: 0.03rem;
  left: 0.12rem;
}
.icon2 {
  background: url(../../static/images/mima.png) no-repeat;
  background-size: 100%;
  top: 0.03rem;
  left: 0.12rem;
}
</style>
