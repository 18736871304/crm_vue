<template>
  <div class="header-callbox header-skytech" ref="callbox" v-show="clue">
    <div class="skytech-softphone-head">
    </div>
  </div>
</template>
<script>
import { getData, my_url } from "../../static/js/ajax.js";
// import { MessageBox } from 'element-ui'
export default {
  name: "AgentBar",
  data() {
    return {
      isSeal: '',
      count: 600,
      clue: false,
      intervalId: null, // 用于保存interval的id
      istan: true,
      jieshutime: 600,
    };
  },

  watch: {

  },

  mounted() {
    let _this = this;

    // 盒子移动事件
    let callbox = this.$refs.callbox;
    let clientH = document.documentElement.clientWidth;

    callbox.onmousedown = function (event) {
      if (!_this.zhedie) return;
      // 鼠标到callbox有边框的距离
      let disx = 50 - (event.clientX - callbox.offsetLeft);

      // 鼠标到callbox右边框的距离
      let disy = event.clientY - callbox.offsetTop;
      // 鼠标到窗口右侧的距离
      let disr = clientH - event.clientX;
      //此处不是box.onmousemove，是document.onmousemove
      document.onmousemove = function (event) {
        callbox.style.right = clientH - event.clientX - disx + "px";
        callbox.style.top = event.clientY - disy + "px";
      };
      //要写在ommousedown里面
      document.onmouseup = function () {
        //这俩都要置为null
        document.onmousemove = null;
        document.onmouseup = null;
        return false;
      };
    };
    setInterval(() => {
      this.count++; // 每隔1秒自增1次计数
    }, 1000);
  },

  created() {
    this.seal()
    // 组件创建时开始定时器
    this.intervalId = setInterval(this.isClue, 60000); // 60000ms = 60s = 一分钟
    this.isClue(); // 首次立即执行一次
  },
  methods: {
    isClue() {
      var that = this
      
      //当员工选择 是 否 接线的时候count都会被重置为0 ， 然后每经过1秒和弹窗倒计时的数据进行比较， 
      // 当计时>=到计时的时候第一轮结束，count重置为0 倒计时也为0 
      // 第二轮开始了  要第一时间判断有没有多的线索 判断是否出现弹窗
      if (that.isSeal == 'Y') {
        console.log(that.isSeal )
        that.istan = true
        getData("post", my_url + " /crm/auth/isTimeLimit.do", function (data) {
          if (data.code == '0') {
            var tan = data.istimelimit
            if (tan == 'false') {
              tan = false
            } else {
              tan = true
            }
            if (tan && data.isapproved != 'true' && that.istan) {
              if (data.pushtime) {
                var stringTime = data.pushtime;
                //将获取到的时间转换成时间戳 
                // var stringTime = '2024-03-22 10:04:00';
                var timestamp1 = Date.parse(new Date(stringTime));
                const timestamp = new Date().getTime();
                var daotime = 600 - parseInt((timestamp - timestamp1) / 1000)
              } else {
                var daotime = 600
              }
              that.jieshutime = daotime
              that.open(that.jieshutime)
            }
          }
        });
      }

    },


// 判断是否是销售
    seal() {
      var _this = this
      getData("post", my_url + " /crm/auth/isSeal.do", function (data) {
        if (data.code == '0') {
          _this.isSeal = data.isSeal
        }

      })
    },

    open(dataTime) {
      var that = this
      // 组件销毁前清除定时器
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      let time = dataTime;
      let timer;
      timer = setInterval(() => {
        time--;
        console.log(time)
        that.jieshutime = time
        if (document.getElementById('timed')) {
          document.getElementById('timed').innerHTML = time;//实现动态渲染
        }
        if (time <= 0) {
          clearInterval(timer);//如果到0清除倒计时
          // 关闭弹窗
          that.$msgbox.close();
          that.jieshutime = 0
          document.getElementById('timed').innerHTML = that.jieshutime;//重新赋为0秒
          that.intervalId = setInterval(this.isClue, 60000);
        }
      }, 1000);//进行倒计时

      var dd = this.$confirm(`<div>现在有多余的抖音线索，请在<span id='timed' style='color: red;font-size: 20px;'>600</span>s内选择是否需要接线?</div>`, `提示`, {
        cancelButtonText: '否',
        confirmButtonText: '是',
        distinguishCancelAndClose: true,
        dangerouslyUseHTMLString: true,//编译Html
        confirmButtonClass: 'confirmbb',
        cancelButtonClass: 'cancelaa',
        type: 'warning',
        closeOnClickModal: false,//点击弹窗关闭
        center: true,
      }).then(() => {
        clearInterval(timer);//如果到0清除倒计时
        this.changeClue('01')
      }).catch((e) => {
        clearInterval(timer);//如果到0清除倒计时  
        this.istan = false
        this.changeClue('03')
      });
    },

    changeClue(aa) {
      var that = this
      var objData = {
        state: aa
      }
      getData("post", my_url + "/crm/auth/getTimeLimit.do", function (data) {
        if (data == '0') {
          if (aa == '01') {
            that.$message({
              type: 'success',
              message: '信息上报成功!'
            });
          } else if (aa == '03') {
            this.$message({
              type: 'info',
              message: '此轮将不会分配线索给你！'
            });
          }

        } else {
          that.$message({
            type: 'success',
            message: data.msg
          });
        }
        that.count = 0
        that.intervalId = setInterval(that.isClue, 60000);
      }, {
        state: aa
      })
    },

  },

  beforeDestroy() {
    // 组件销毁前清除定时器
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },


};
</script>
<style scoped>
.header-skytech {
  color: #2d8cf0;
  position: fixed;
  top: 160px;
  right: 10px;
  z-index: 10;
}

.skytech-softphone {
  width: auto;
  min-width: 100px;
}

.skytech-softphone .status {
  width: 140px;
  height: 50px;
  border-radius: 3px;
  float: left;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.skytech-softphone .status:hover {
  background-color: #fff;
}

.isclues {
  height: 50px;
  line-height: 50px;
}

.confirmbb,
.cancelaa {
  width: 100px !important;
  height: 60px !important;
  line-height: 60px !important;
}
</style>