<template>
  <div class="template">
    <div class="staff">
      <header class="headfixed">
        <div style="margin-bottom: 0.2rem">
          员工({{ this.teamNameList.length }})
        </div>
        <div class="select-content">
          <el-dropdown trigger="click" style="width: 100%" placement="bottom" ref="disTeam">
            <p class="el-dropdown-inners" clearable>
              <span>{{ teamNames }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </p>
            <el-dropdown-menu class="" slot="dropdown">
              <el-tree @check="checkTeam" :data="teamDataList" ref="tree" show-checkbox node-key="id"
                :default-expanded-keys="[1]" :props="defaultProps">
              </el-tree>
              <div class="sure-footer">
                
                <div class="my-sure cancel" @click="team_cancel">取消</div>
                <div class="my-sure" @click="team_sure">确定</div>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="select-content">
          <el-autocomplete class="el-input-inners" v-model="staffValue" :fetch-suggestions="querySearchId"
            placeholder="请输入员工姓名" :trigger-on-focus="false" clearable @select="handleSelectId"
            @clear="delNameValue"></el-autocomplete>
        </div>
      </header>

      <div class="staffList">
        <div :class="isAllselect == item.userid ? 'selectname staffName' : 'staffName'
            " v-for="item of teamNameList" :key="item.userid" :label="item.username" :value="item.userid"
          @click="selectAllName(item.userid, item.username)">
          <div class="userbox">
            <img src="../../../static/images/ceshi.jpg" alt="" class="avatar" />
            <div class="pBox">
              <p>{{ item.username }}</p>
              <p>别名：去</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="custom">
      <div style="display: flex">


        <header class="headfixed" style="padding:0">
          <div style="margin-bottom: 0.2rem;padding:0.2rem 0.2rem 0; ">
            <div class="userbox">
              <img src="../../../static/images/ceshi.jpg" alt="" class="avatar" />
              <div class="pBox">
                <p style="font-size: 0.18rem;">魏钦录</p>
                <!-- <p>别名：去</p> -->
              </div>
            </div>
          </div>

          <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 100%">
            <div class="select-content" style="margin-top: 0.2rem;    margin: 0.2rem 0.2rem;">
              <el-autocomplete class="el-input-inners" v-model="staffValue" :fetch-suggestions="querySearchId"
                placeholder="请输入同事姓名" :trigger-on-focus="false" clearable @select="handleSelectId"
                @clear="delNameValue"></el-autocomplete>
            </div>

            <el-tab-pane label="客户" name="first"></el-tab-pane>

            <el-tab-pane label="同事" name="second">
              <div class="staffList" style="margin-top: 0;     height: calc(100vh - 3.6rem);">
                <div :class="isAllselect == item.userid
            ? 'selectname staffName'
            : 'staffName'
            " v-for="item of nameAllList" :key="item.userid" :label="item.username" :value="item.userid"
                  @click="selectAllName(item.userid, item.username)">
                  <div class="userbox">
                    <img src="../../../static/images/ceshi.jpg" alt="" class="avatar" />
                    <div class="pBox">
                      <p class='namedata'> <span>{{ item.username }}</span> <span>刚刚</span> </p>
                      <p>别名：去</p>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="群聊" name="third"> </el-tab-pane>
          </el-tabs>


        </header>
      </div>
    </div>
    <div class="ChatRecords">
      <header class="headfixed   headRecords">
        <div style="padding:0.2rem 0.2rem 0; ">
          <div class="userbox">
            <img src="../../../static/images/ceshi.jpg" alt="" class="avatar" />
            <div class="pBox">
              <p style="font-size: 0.18rem;">魏钦录</p>
              <p>备注名：信仰风声</p>
            </div>
          </div>
        </div>
      </header>
      <div class="chatHistory">
        <div class="staffList" ref="list" style="margin-top: 0;  height: calc(100vh - 2.4rem);">

          <div class='staffName' style="margin-top: 0.2rem;" v-for="item of requestDataList" :key="item.userid"
            :label="item.username" :value="item.userid" @click="selectAllName(item.userid, item.username)">


            <!-- 聊天记录 开始 -->

            <div class="userbox_left" v-if="item.userType == 'kehu'">
              <img src="../../../static/images/ceshi.jpg" alt="" class="avatar" />

              <div class="pBox boxhover chat_left">
                <div class="timeLeft">2023年12月30日 11:43:03</div>
                <p v-if="item.megType == 'text'" class="chatContent">{{ item.username }}</p>

                <viewer v-if="item.megType == 'src'">
                  <img :src="item.src" :key="item.src" alt="" />
                </viewer>
              </div>
            </div>

            <div class="userbox_middle" v-if="item.userType == 'time'">
              <p>2023年12月30日 11:43:03</p>
            </div>

            <div class="userbox_right" v-if="item.userType == 'yuangong'">
              <img src="../../../static/images/ceshi.jpg" alt="" class="avatar" />

              <div class="pBox boxhover chat_right">
                <div class=" timeRight ">2023年12月30日 11:43:03</div>
                <p v-if="item.megType == 'text'" class="chatContent"> {{ item.username }}</p>
                <viewer v-if="item.megType == 'src'">
                  <img :src="item.src" :key="item.src" alt="" />
                </viewer>

              </div>
            </div>

            <!-- 聊天记录 结束 -->
          </div>

        </div>
      </div>

    </div>




  </div>
</template>
<script>
import api from "../../../utils/api.js";
import { getData, my_url } from "../../../static/js/ajax.js";
import { formatDate } from "../../../static/js/common.js";

export default {
  data() {
    return {
      data: [],
      nameList: [],
      isselect: "",
      isAllselect: "",
      activeName: "first",
      nameAllList: [],
      requestDataList: [],//聊天记录
      teamNameList: [],
      staffValue: "",
      SalesmanIdBox: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      teamNames: "",
      teamNames: "团队选择",
      teamList: "",
      teamDataList: [],
      teamid: "",
      scrollHeight: '',
    };


  },

  mounted: function () {
    const scrollview = this.$refs['list'];
    scrollview.addEventListener('scroll', this.handleScroll, true)

    this.yewu();
    this.getTeamList();
    this.requestData('1')
  },

  activated() {

  },
  watch: {
    requestDataList() {
      console.log(this.$refs['list'].scrollHeight)
    }
  },
  methods: {
    handleScroll(e) {
      const winHeight = e.target.scrollTop || document.documentElement.scrollTop
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = e.target.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight = e.target.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight = e.target.scrollHeight;

      if (scrollTop == 0) {
        this.requestData()
        // alert('我要请求数据')
      }
      // console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
    },

    requestData(aa) {
      let _this = this;
      getData(
        "post",
        my_url + "/crm/auth/getUserIdNameList.do",
        function (data) {
          console.log(data.namelist)

          var arr2 = [
            { userid: '1', userType: "kehu", megType: 'text', username: '你好，请问有什么要咨询的' },
            { userid: '2', userType: "yuangong", megType: 'text', username: '朱女士是上海本地人，在私营企业做药品销售工作，宝宝今年11岁，既往也是买了非常多的保单很多保费已经交完了，我花了3个小时整理了一份详尽的表格协助回忆全部的保障责任并给予专业的建议，这一次朱女士主要想要做自己的养老金规划和财富传承的求，分别选择了6万10年缴费的富多多1号，和10万10年缴费的增多多5号;父母之爱子，则为之计深远，为朱女士点赞，为无数爸爸妈妈点赞❤❤' },
            { userid: '3', userType: "kehu", megType: 'text', username: '这个是一生中意分红险，分红产品要看保险公司背景；这家公司联系20多年都是分红率100%，最高收益；' },
            { userid: '4', userType: "yuangong", megType: 'text', username: '这个是增多多5号增额寿险；' },
            { userid: '5', userType: "kehu", megType: 'text', username: '好的' },
            { userid: '14', userType: "time", megType: 'text', username: '好的' },
            { userid: '6', userType: "yuangong", megType: 'text', username: '嗯嗯，我们这边有这款产品，您是确定了想买这款，还是还在比较' },
            { userid: '7', userType: "kehu", megType: 'text', username: '你好，请问有什么要咨询的' },
            { userid: '8', userType: "yuangong", megType: 'text', username: '你好，请问有什么要咨询的' },
            { userid: '9', userType: "kehu", megType: 'text', username: '你好，请问有什么要咨询的' },
            { userid: '10', userType: "yuangong", megType: 'src', src: 'https://insure.meihualife.com/ueditor/jsp/upload/image/20210204/1612424968368091752.png', username: '' },
            { userid: '11', userType: "yuangong", megType: 'src', src: 'https://insure.meihualife.com/images/inslogo/MH000043.png', username: '' },
            { userid: '12', userType: "yuangong", megType: 'src', src: 'https://insure.meihualife.com/images/inslogo/MH000095.png', username: '' },
            { userid: '13', userType: "yuangong", megType: 'src', src: 'https://insure.meihualife.com/images/inslogo/xintai.png', username: '' },
          ];

          let allmsg = arr2.concat(_this.requestDataList);
          _this.requestDataList = allmsg

          // _this.requestDataList = []
          // _this.requestDataList = arr2

          _this.scrollHeight = _this.$refs['list'].scrollHeight

          _this.$nextTick(() => {
            console.log("当前滚动条位置:" + _this.$refs['list'].scrollTop);
            console.log("当前可滚动区域容器的高度:" + _this.$refs['list'].scrollHeight);
            console.log("当前滚动条的高度:" + _this.$refs['list'].scrollHeight, _this.scrollHeight);
            console.log(_this.$refs['list'].scrollHeight - _this.scrollHeight);
            _this.$refs['list'].scrollTop = _this.$refs['list'].scrollHeight - _this.scrollHeight;
          })

          if (aa == '1') {
            _this.requestDataList = data.namelist;
            _this.$nextTick(() => {
              console.log("当前滚动条位置:" + _this.$refs['list'].scrollTop);
              console.log("当前可滚动区域容器的高度:" + _this.$refs['list'].scrollHeight);
              _this.$refs['list'].scrollTop = _this.$refs['list'].scrollHeight;
            })
          }
        }
      );
    },



    getTeamList() {
      let _this = this;


      // api.getTalkTeamList().then((data) => {
      //   console.log(data)
      //   if (data.code == 0) {
      //     _this.teamDataList = data.teamList;
      //     // _this.getHomeKnowledgeList()
      //   }
      // })
      //设置当前用户的团队列表参数
      // getData("post", my_url + "/crm/auth/getTeamList.do", function (data) {
      //   _this.teamDataList = data.teamList;
      // });
    },
    checkTeam(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label);
      });
      this.myList = teamListName.join(",");
      this.teamList = checked.checkedKeys.join(",");
      this.teamid = this.teamList;
    },
    team_cancel() {
      this.$refs.disTeam.hide();
      this.myList = "";
      this.teamList = "";
      this.teamNames = "团队选择";
      this.teamid = "";
      this.$refs.tree.setCheckedKeys([]);
      this.queryflag = true;
      this.staffValue = "";

      this.teamNameList = this.nameAllList;
      var arr = this.nameAllList;
      this.SalesmanIdBox = [];
      arr.forEach((res) => {
        this.SalesmanIdBox.push({
          value: res.username,
          id: res.userid,
        });
      });
    },
    team_sure() {
      let _this = this;
      this.$refs.disTeam.hide();
      this.staffValue = "";
      if (this.myList == null || this.myList == "" || this.myList == "1") {
        this.queryflag = true;
        this.queryflagString = "01";
      } else {
        this.teamNames = this.myList;
        this.queryflag = false;
        this.queryflagString = "02";
      }

      //获取业务员列表
      getData(
        "post",
        my_url + "/crm/auth/getUserIdNameListByTeam.do",
        function (data) {
          _this.teamNameList = data.namelist;
          _this.SalesmanIdBox = [];

          data.namelist.forEach((res) => {
            _this.SalesmanIdBox.push({
              value: res.username,
              id: res.userid,
            });
          });
        },
        {
          teamid: this.teamList,
        }
      );
    },
    yewu() {
      let _this = this;

      api.getTalkTeamList().then((data) => {
      
        if (data.code == 0) {
          _this.teamDataList = data.teamList;
          // _this.getHomeKnowledgeList()
        }
      })


      getData("post", my_url + "/crm/auth/getTeamList.do", function (data) {
  
        _this.data = data.teamList;
      });
      api.getQwUser().then((data) => {
    
        _this.nameAllList = data.namelist;
        _this.teamNameList = data.namelist;
        _this.SalesmanIdBox = [];
        data.namelist.forEach((res) => {
          _this.SalesmanIdBox.push({
            value: res.username,
            id: res.userid,
          });

        });

      });
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.organizationName.indexOf(value) !== -1;
    },

    selectName(data, name) {
    
      this.isselect = data;
    },
    selectAllName(data, name) {
    
      this.isAllselect = data;
    },

    handleClick(tab, event) {
 
      let _this = this;
      if (tab.$props.label == "员工") {
      }
    },

    querySearchId(queryString, cb) {
      var SalesmanIdBox = this.SalesmanIdBox;
      var results = queryString
        ? SalesmanIdBox.filter(this.createFilterId(queryString))
        : SalesmanIdBox;
      // 调用 callback 返回建议列表的数据
      console.log(results);

      if (results == 0) {
        this.teamNameList = "";
      }
      cb(results);
    },

    createFilterId(queryString) {
      return (SalesmanIdBox) => {
        return (
          SalesmanIdBox.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    handleSelectId(item) {
      let arr = [];
      item["userid"] = item.id;
      item["username"] = item.value;

      arr.push(item);
      this.teamNameList = arr;

      console.log(this.teamid);
    },

    delNameValue() {
      var _this = this;
      //获取业务员列表
      if (this.teamid != "") {
        getData(
          "post",
          my_url + "/crm/auth/getUserIdNameListByTeam.do",
          function (data) {
            _this.teamNameList = data.namelist;
          },
          {
            teamid: this.teamid,
          }
        );
      } else {
        _this.teamNameList = this.nameAllList;
      }
    },

    allowDrop() { },
    allowDrag() { },
    handleDragStart() { },
    handleDragEnd() { },
    handleDrop() { },
  },
};
</script>
<style scoped>
.template {
  display: flex;
  padding: 0.3rem;
  overflow: hidden;
}

.team {
  width: 15%;
  height: calc(100vh - 1.2rem);
  border: 1px solid #909399;
  overflow-y: scroll;
}

.staff {
  width: 15%;
  height: calc(100vh - 1.2rem);
  border: 1px solid #909399;
  position: relative;
}

.custom {
  width: 15%;
  height: calc(100vh - 1.2rem);
  border: 1px solid #909399;
}

.ChatRecords {
  width: 70%;
  height: calc(100vh - 1.2rem);
  border: 1px solid #909399;
}

.teamList {
  padding: 0.2rem 0;
}

::v-deep .el-tree-node__label {
  font-size: 15px;
}

::v-deep .el-tree-node__content {
  margin-left: 0;
  height: 35px;
  border-bottom: 1px solid #909399;
}

::v-deep .el-tree-node__expand-icon {
  font-size: 20px;
}

::v-deep .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  color: #dc220d;
  background: rgba(244, 244, 244, 1) !important;
  border-left: 0.03rem solid #dc220d;
}

::v-deep .el-tree {
  padding: 0;
  border-top: 1px solid #909399;
}

::v-deep .el-tabs__header {
  margin: 0;
}

/* 定义滚动条的颜色 */
::-webkit-scrollbar {
  width: 7px;
  /* 滚动条宽度 */
}

/* 定义滚动条背景颜色 */
::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

/* 定义滚动条滑块颜色 */
::-webkit-scrollbar-thumb {
  /* background-color: #666; */
}

.staffList {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  margin-top: 1.8rem;
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100vh - 3.4rem);
}

.staffName {
  /* height: 0.8rem; */
  padding: 0.1rem 0.2rem;
  border-left: 0.05rem solid transparent;
}



.selectname {
  background: #effaff !important;
  border-left: 0.05rem solid #409eff;
}

.userbox {
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
}

.userbox img {
  width: 0.4rem;
  height: 0.4rem;
}

.pBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.2rem;
}

.pBox p:first-child {
  font-size: 0.16rem;
}

.pBox p:last-child {
  font-size: 0.12rem;
}

::v-deep .el-tree-node__content {
  height: 30px;
  border-bottom: 0;
}

::v-deep .el-tree {
  border: 0;
}

::v-deep .el-tree-node__expand-icon {
  font-size: 0.14rem;
}

::v-deep .el-tree-node__content .el-tree-node__label {
  font-size: 0.14rem;
}

.el-dropdown-menu {
  width: 2.1rem !important;
}

::v-deep .select-content .el-dropdown-inners {
  width: 100%;
}

::v-deep .select-content {
  margin-right: 0;
  height: 0.36rem;
  border: 0.01rem solid #dcdfe6;
  display: flex;
  margin-bottom: 0.2rem;
}

::v-deep .select-content .el-dropdown-inners {
  height: 0.36rem;
  line-height: 0.36rem;
}

.select-content .el-dropdown-inners>span {
  width: 1.8rem;
}

::v-deep .select-content .el-input-inners .el-input__inner {
  height: 0.34rem;
  line-height: 0.34rem;
  padding: 0 15px !important;
}

.cancel {
  background: #fff;
  color: #dc240f;
  border: 0.01rem solid #dc240f;
}

.headfixed {
  position: fixed;
  background: #fff;
  width: 12.8%;
  padding: 0.2rem 0.2rem 0;
  height: 1.8rem;
}

::v-deep .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
  align-items: center;

}


.namedata {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.namedata span:last-child {
  font-size: 0.12rem;
}

.headRecords {
  height: 0.7rem;
  padding: 0;
  width: 60%;
  border-bottom: 1px solid #E4E7ED;
}

.chatHistory {
  width: 100%;
  margin-top: 0.8rem;
  height: calc(100vh - 1.9rem);
}


.chat-window {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
}



.chat_left {
  justify-content: flex-start;
  width: auto;
  height: auto;
  color: #222;
  white-space: pre-wrap;
  word-break: break-word;
  max-width: 80%;
  user-select: text;
  margin-left: 0.1rem;
  position: relative;
}

.chat_right {
  justify-content: flex-start;
  width: auto;
  height: auto;
  color: #fff;
  white-space: pre-wrap;
  word-break: break-word;
  max-width: 80%;
  user-select: text;
  margin-right: 0.1rem;
  position: relative;
}


.chat_left .chatContent {
  width: auto;
  height: auto;
  padding: 0.1rem;
  border-radius: 0.1rem;
  background: #f2f2f2;
  font-size: 0.16rem !important;
}


.chat_right .chatContent {
  width: auto;
  height: auto;
  padding: 0.1rem;
  border-radius: 0.1rem;
  background: #1992f9;
  font-size: 0.16rem !important;
}

.userbox_left {
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: flex-start;
}

.userbox_right {
  height: 100%;
  display: flex;

  align-items: flex-start;
  flex-direction: row-reverse;
  justify-content: right;
}


.userbox_middle p {
  margin: 0.1rem 0 0.3rem;
  text-align: center;
  display: block;
  color: #777;
  font-size: 0.14rem;
}

.avatar {
  width: 0.4rem;
  height: 0.4rem;
}


.timeLeft {
  width: 3rem;
  display: none;
  position: absolute;
  left: 0;
  top: -22px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, .45);
  line-height: 18px;
  text-align: left;
}

.timeRight {
  width: 3rem;
  display: none;
  position: absolute;
  right: 0;
  top: -22px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, .45);
  line-height: 18px;
  text-align: right;
}

.boxhover:hover .timeLeft {
  display: block;
}

.boxhover:hover .timeRight {
  display: block;
}
</style>
