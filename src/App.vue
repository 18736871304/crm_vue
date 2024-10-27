<template>
  <div id="app">
    <meta name="referrer" content="no-referrer">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
  </div>
</template>
<script>
import './static/js/flexible.js';
import './static/css/common.css';
import api from './utils/api';
export default {
  mounted() {
    var _this = this;
    window.addEventListener("load", () => {
      //写入你想要执行的代码
      _this.$router.push('/', () => { });
    });
  },
  destroyed() {
    window.removeEventListener('load')
  }
}
</script>
<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#nprogress .bar {
  background: #dc220d !important; //这里可以随便写颜色
}

.el-table tr {
  height: 0.3rem !important;
}

.confirmbb,
.cancelaa {
  width: 100px !important;
  height: 40px !important;
  font-size: 14px;
}
html {
  overflow-x: hidden;
}

.menu-common{
   left: 0;
}


</style>
