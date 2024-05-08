<template>
  <div class="template containerWidth" style="width: 17.3rem;">
    <div class="staff">
      <header class="headfixed">
        <div style="margin-bottom: 0.2rem">
          员工({{ this.teamNameList.length }})
        </div>
        <div class="select-content" style="margin-bottom: 0.2rem;">
          <el-dropdown trigger="click" style="width: 100%" placement="bottom" ref="disTeam">
            <p class="el-dropdown-inners" clearable>
              <span>{{ teamNames }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </p>
            <el-dropdown-menu class="" slot="dropdown">
              <el-tree @check="checkTeam" :data="teamDataList" ref="tree" show-checkbox node-key="id"
                :default-checked-keys="[1]" :props="defaultProps">
              </el-tree>
              <div class="sure-footer">
                <div class="my-sure" @click="team_sure">确定</div>
                <div class="my-sure cancel" @click="team_cancel">取消</div>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="select-content">
          <el-autocomplete class="el-input-inners" v-model="staffValue" :fetch-suggestions="querySearchId"
            placeholder="请输入员工姓名" :trigger-on-focus="false" clearable @select="selectUserId"></el-autocomplete>
        </div>
      </header>

      <div class="staffList">
        <div :class="isAllselect == item.userid ? 'selectname staffName' : 'staffName'
            " v-for="item of teamNameList" :key="item.userid" :label="item.realname" :value="item.userid"
          @click="selectOneName(item, tablabel)">
          <div class="userbox">
            <img :src="item.qwuserurl" alt="" class="avatar" />
            <div class="pBox">
              <p>{{ item.realname }}</p>
              <p v-if="item.qwalias" class="lastText">别名：{{ item.qwalias }}</p>
              <p v-else></p>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- 中间 客户 同事  群聊 -->
    <div class="custom">
      <div style="display: flex">
        <header class="headfixed" style="padding:0">
          <div style="margin-bottom: 0.2rem;padding:0.2rem 0.2rem 0; ">
            <div class="userbox">
              <img :src="selectStaffPhoto" alt="" class="avatar" />
              <div class="pBox">
                <p style="font-size: 0.18rem;">{{ selectStaffName }}</p>
              </div>
            </div>
          </div>
          <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 100%">
            <!-- 搜索框 -->

            <div class="select-content" style="margin-top: 0.2rem;    margin: 0.2rem 0.2rem;">
              <div class="searchName">
                <el-input placeholder="请输入内容" @input="activeselectId" v-model="activeValue" clearable>
                </el-input>
              </div>
            </div>

            <el-tab-pane label="客户" name="first">
            </el-tab-pane>
            <el-tab-pane label="同事" name="second">
            </el-tab-pane>
            <el-tab-pane label="群聊" name="third"> </el-tab-pane>
            <!-- 同事 ，客户， 群聊人员 -->
            <div v-loading="paneloading">
              <template v-if="firstAllName != ''">
                <div class="staffList staffListBottom" ref="first"
                  style="margin-top: 0;     height: calc(100vh - 3.6rem);">

                  <div :class="isfirstselect == item.customerid ? 'selectname staffName' : 'staffName'"
                    v-for="(item, index) of firstAllName" :key="index" :label="item.customername"
                    :value="item.customerid" @click="selectFirstName(item)">

                    <div class="userbox">
                      <img :src="item.avatar" alt="" class="avatar" />
                      <div class="pBox">
                        <!-- {{ item.lastmsgtime }} -->
                        <p class='namedata'> <span>{{ item.customername }}</span> <span>{{ item.lastmsgtimeValue
                            }}</span> </p>
                        <p class="lastText">{{ item.lastmsgtypeValue }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="firstAllName == ''">
                <div class="staffList" ref="first" style="margin-top: 0;  height: calc(100vh - 3.6rem);">
                  <div style="display: flex;flex-direction: column; align-items: center;">
                    <img src="../../static/images/zanwu.png" alt="" style="width: 60%; margin:0.3rem auto">
                    <p>暂无符合条件的人员</p>
                  </div>
                </div>
              </template>
            </div>
          </el-tabs>
        </header>
      </div>
    </div>



    <!-- 聊天记录 -->
    <div class="ChatRecords">
      <header class="headfixed   headRecords">
        <div class="recordHead">
          <div class="userbox" style="width:35%">
            <img :src="selectfirstPhoto" alt="" class="avatar" />
            <div class="pBox" style="width: auto;">
              <p style="font-size: 0.18rem;">{{ selectfirstName }}</p>
              <p>备注名：{{ selectfirstRemakeName }}</p>
            </div>
          </div>

          <div class="select-content chatRightHead" style="width:25%">
            <div class="searchName" style="width: 100%;">
              <el-input placeholder="搜索消息" @input="searchMsg" v-model="searchMsgValue" clearable
                suffix-icon="el-icon-search">
              </el-input>
            </div>
          </div>

          <div class="common-select" style="width:30%">
            <div class="select-content" style="height: 0.34rem; width: 3.2rem;  border: none">
              <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="daterange" align="right"
                :disabled="dateVale" size="mini" unlink-panels range-separator="-" start-placeholder="开始时间"
                end-placeholder="结束时间" :picker-options="pickerOptions" @change="searchDate" value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </div>


        </div>

      </header>

      <div class="chatHistory" v-loading="loading">

        <header @click="fanhui" v-if='funhuiValue' class="fanValue">
          <!-- <a> -->
          <span class="el-icon-arrow-left "></span>
          <span>返回</span>
          <!-- </a> -->
        </header>



        <div class="staffList" ref="list" style="margin-top: 0;  height: calc(100vh - 2.4rem);">


          <template v-if="requestDataList.length > 0 && searchText">
            <div class='staffName' style="margin-top: 0.2rem;" v-for="item of requestDataList" :key="item.seq"
              :label="item.username" :value="item.userid">
              <div>


                <!-- 聊天记录 开始 -->
                <div class="userbox_middle" v-if="item.addtime">
                  <p>{{ item.addtime }}</p>
                </div>

                <!-- 客户 -->
                <div class="userbox_left"
                  v-if="(item.from == isfirstselect || activeName == 'third' && item.from != isqwuserid)">

                  <img v-if="activeName == 'third' && item.userurl" :src="item.userurl" alt="" class="avatar" />
                  <img v-else-if="activeName == 'third' && item.cusurl" :src="item.cusurl" alt="" class="avatar" />
                  <img v-else :src="selectfirstPhoto" alt="" class="avatar" />

                  <div class="pBox boxhover chat_left">
                    <div v-if="activeName == 'third' && item.username" class="timeLeft">{{ item.username }}{{
            item.msgtime
          }}
                    </div>
                    <div v-else-if="activeName == 'third' && item.cusname" class="timeLeft">{{ item.cusname }}{{
            item.msgtime
          }}</div>
                    <div v-else class="timeLeft">{{ item.msgtime }}</div>


                    <div style="display: flex;" v-if="item.msgtype == 'text'">
                      <p class="chatContent">{{ item.text }} </p>
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                    </div>

                    <!-- 图片 -->
                    <viewer v-if="item.msgtype == 'image' || item.msgtype == 'emotion'">
                      <img :src="'https://talk.meihualife.com' + item.text" :key="item.text" class="chatLeftImg"
                        alt="" />
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                    </viewer>


                    <!--语音 -->
                    <div v-if="item.msgtype == 'voice'" style="display: flex;">
                      <div class="chatContent">
                        <div
                          :class="voiceId == item.seq ? 'chatContent  chatVoice playAudioVoice' : 'chatContent  chatVoice'"
                          @click="playAudio(item)">
                          <img src="../../static/images/voice_left.png" alt="" class="chatVoiceImg">
                          <p>{{ item.play_length }}</p>
                        </div>

                      </div>
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                    </div>

                    <!-- 视频通话 -->

                    <div v-if="item.msgtype == 'voiptext'" style="display: flex;">
                      <div class="chatContent">
                        <div class="chatContent  chatVoice">
                          <img src="../../static/images/voice_phone.png" alt="" class="chatVoiceImg"
                            style="width: 35px;">
                          <p>{{ item.play_length }}</p>
                        </div>
                      </div>
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                    </div>

                    <!-- 视频 -->
                    <div v-if="item.msgtype == 'video'" class="chatContent chatContentVideo">
                      <video id="myVideo" controls style="width: 30%;min-width: 300px;">
                        <source :src="'https://talk.meihualife.com' + item.text" type="video/mp4">
                      </video>
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                    </div>

                    <!-- 文件 -->
                    <div v-if="item.msgtype == 'file'" class="chatContent colorfff">
                      <div class="recordFile">
                        <a :href="'https://talk.meihualife.com' + item.filepath" alt="" target="_blank">
                          <div class="fileMain">
                            <span class="FileTitle">{{ item.filename }}</span>
                            <span class="FileSize FileSizeleft">{{ item.fileSize }}M</span>
                          </div>
                          <img src="../../static/images/file.jpg" alt="">
                        </a>
                      </div>
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                    </div>


                    <!-- 投保链接 -->
                    <div v-if="item.msgtype == 'link'" class="chatContent  colorfff">
                      <div class="recordFile">
                        <a :href="item.link_url" alt="" target="_blank">
                          <div class="fileMain">
                            <span class="FileTitle">{{ item.title }}</span>
                            <span class="FileSize FileSizeleft">{{ item.description }}</span>
                          </div>
                          <img :src="item.image_url" alt="">
                        </a>
                      </div>
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                    </div>

                    <div v-if="item.msgtype == 'chatrecord'" style="display: flex;">
                      <div class="chatContent chatContent_right" style="display: revert;">
                        <p class='chatRecord_title1'>{{ item.title }}的聊天记录</p>
                        <p class='chatRecord_title2'>{{ item.play_length }}条聊天，点击查看聊天记录内容</p>
                        <p class='chatRecord_title3'>聊天记录</p>

                      </div>
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                    </div>
                    <p v-if="item.msgtype == 'sphfeed'" class="chatContent">【视频号转发】</p>
                    <p v-if="item.msgtype == 'mixed'" class="chatContent">【引用数据】</p>
                    <p v-if="item.msgtype == 'card'" class="chatContent">【名片】</p>
                  </div>
                </div>

                <!-- 员工 -->
                <div class="userbox_right" v-if="item.from == isqwuserid">
                  <img :src="selectStaffPhoto" alt="" class="avatar" />

                  <div class="pBox boxhover chat_right">
                    <div class=" timeRight ">{{ item.msgtime }}</div>
                    <!-- 文字 v-if="item.state == 'revoke'"-->
                    <div style="display: flex;" v-if="item.msgtype == 'text'">
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                      <p class="chatContent"> {{ item.text }} </p>
                    </div>


                    <!-- 图片 -->
                    <div>
                      <viewer v-if="item.msgtype == 'image' || item.msgtype == 'emotion'" class="chatPright">
                        <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                        <img :src="'https://talk.meihualife.com' + item.text" :key="item.text" class="chatRightImg"
                          alt="" />
                      </viewer>
                    </div>


                    <!--语音 -->
                    <div v-if="item.msgtype == 'voice'" class="chatContent">
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                      <div
                        :class="voiceId == item.seq ? 'chatContent  chatVoice playAudioVoice' : 'chatContent  chatVoice'"
                        @click="playAudio(item)">
                        <p>{{ item.play_length }}</p>
                        <img src="../../static/images/voice_right.png" alt="" class="chatVoiceImg">
                      </div>
                    </div>

                    <!-- 视频通话 -->
                    <div v-if="item.msgtype == 'voiptext'" class="chatContent">
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                      <div class="chatContent  chatVoice">
                        <p>通话时长{{ item.play_length }}</p>
                        <img src="../../static/images/voice_phone1.png" alt="" class="chatVoiceImg"
                          style="width: 35px;">

                      </div>
                    </div>

                    <!--视频 -->
                    <div v-if="item.msgtype == 'video'" class="chatContent chatContentVideo">
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                      <video id="myVideo" controls style="width: 30%;min-width: 300px;">
                        <source :src="'https://talk.meihualife.com' + item.text" type="video/mp4">
                      </video>
                    </div>

                    <!-- 文件 -->
                    <div v-if="item.msgtype == 'file'" class="chatContent colorfff">
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                      <div class="recordFile">
                        <a :href="'https://talk.meihualife.com' + item.filepath" alt="" target="_blank">
                          <div class="fileMain">
                            <span class="FileTitle">{{ item.filename }}</span>
                            <span class="FileSize FileSizeleft">{{ item.fileSize }}M</span>
                          </div>
                          <!-- <img src="../../../../images/activity/chatRecord/file.jpg" alt=""> -->
                          <img src="../../static/images/file.jpg" alt="">
                        </a>
                      </div>
                    </div>
                    <!-- 投保链接 -->
                    <div v-if="item.msgtype == 'link'" class="chatContent colorfff">
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                      <div class="recordFile">
                        <a :href="item.link_url" alt="" target="_blank">
                          <div class="fileMain">
                            <span class="FileTitle">{{ item.title }}</span>
                            <span class="FileSize FileSizeleft">{{ item.description }}</span>
                          </div>
                          <img :src="item.image_url" alt="">
                        </a>
                      </div>

                    </div>


                    <div v-if="item.msgtype == 'chatrecord'" style="display: flex;">
                      <span v-if="item.state == 'revoke'" class="revokeRightCss"> 撤销</span>
                      <div class="chatContent chatContent_left" style="display: revert;">
                        <p class='chatRecord_title1'>{{ item.title }}的聊天记录</p>
                        <p class='chatRecord_title2'>{{ item.play_length }}条聊天，点击查看聊天记录内容</p>
                        <p class='chatRecord_title3'>聊天记录</p>
                      </div>
                    </div>
                    <p v-if="item.msgtype == 'sphfeed'" class="chatContent">【视频号转发】</p>
                    <p v-if="item.msgtype == 'mixed'" class="chatContent">【引用数据】</p>
                    <p v-if="item.msgtype == 'card'" class="chatContent">【名片】</p>

                  </div>
                </div>

              </div>
              <!-- 聊天记录 结束 -->
            </div>
          </template>

          <!-- 搜索内容 -->
          <template v-else-if="!searchText">
            <div class='staffName' style="margin-top: 0.2rem;" v-for="item of requestSearchList" :key="item.seq"
              :label="item.username" :value="item.userid">
              <div class="userbox_left">

                <img v-if="item.from == isqwuserid" :src="selectStaffPhoto" alt="" class="avatar" />
                <img v-if="item.from == isfirstselect" :src="selectfirstPhoto" alt="" class="avatar" />

                <div class='searchTextBox'>

                  <div class="pBox boxhover chat_left">
                    <div class="">{{ item.name }}</div>
                    <p class="chatContent"> {{ item.text }}</p>
                  </div>

                  <div class="lookText">
                    <div class="">{{ item.msgtime }}</div>
                    <div class="lookupdown" @click="lookupdown(item)">查看上下文</div>
                  </div>

                </div>




              </div>
            </div>
          </template>


          <template v-else>
            <div style="display: flex;flex-direction: column; align-items: center;">
              <img src="../../static/images/Nomain.png" alt="" style="margin:0.3rem auto">
              <p>暂无符合条件的记录</p>
            </div>
          </template>


        </div>
      </div>

    </div>




  </div>
</template>
<script>

import api from "../../utils/api.js";
import { getData, my_url } from "../../static/js/ajax.js";
import { formatDate } from "../../static/js/common.js";
import BenzAMRRecorder from 'benz-amr-recorder';
import _ from 'lodash';
export default {
  data() {
    return {
      paneloading: true,
      loading: true,
      // 检索消息记录
      searchMsgValue: '',//消息检索
      searchText: true,
      funhuiValue: false,
      requestSearchList: [],//检索出来的聊天内容
      selectTime: '',
      dateVale: false,//是否有月份


      teamAllid: '',//初始化获取团队所有ID
      nameList: [],
      isselect: "",
      isAllselect: "",//选中后的员工ID
      isqwuserid: '',//选中后的员工的企微ID
      isfirstselect: "",//选中后的客户ID
      activeName: "first",
      activeValue: "",
      firstAllName: [],//所有客户名字
      secondAllName: [],//所有同事名字
      thirdAllName: [],//所有群聊名字
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
      teamListId: "",
      teamDataList: [],
      teamid: "",
      scrollHeight: '',

      // 客户姓名分页
      pageNumber: 1,
      pageSize: 20,
      // 当前选中的是客户，同事,群聊 tablabel
      tablabel: "客户",
      // 当前选中的员工
      oneitem: '',
      selectStaffName: '',
      selectStaffPhoto: '',
      // 当前选中的客户
      selectfirstPhoto: '',
      selectfirstName: '',
      selectfirstRemakeName: '',
      seq: '',//聊天记录凭证
      // 判断是否还有来哦天记录
      noChathistory: true,
      // 判断上一个录音有没有播放
      nexAmrtItem: '',
      amr: null,
      voiceId: '',//判断播放的是哪个录音
      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick(picker) {
            const end = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));
            const start = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));

            end.setTime(end.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '昨日',
          onClick(picker) {
            const end = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));
            const start = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));

            start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近7天',
          onClick(picker) {
            const end = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));
            const start = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));

            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近30天',
          onClick(picker) {
            const end = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));
            const start = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));

            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本周',
          onClick(picker) {
            var now = new Date(); // 当前日期
            var nowDayOfWeek = now.getDay(); // 今天本周的第几天
            var nowDay = now.getDate(); // 当前日
            var nowMonth = now.getMonth(); // 当前月
            var nowYear = now.getYear(); // 当前年
            nowYear += (nowYear < 2000) ? 1900 : 0;
            var day = nowDayOfWeek || 7;
            const start = new Date(now.getFullYear(), nowMonth, nowDay - day);
            const end = new Date(now.getFullYear(), nowMonth, nowDay + 6 - day);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本月',
          onClick(picker) {
            var now = new Date(); // 当前日期
            var nowMonth = now.getMonth(); // 当前月
            var nowYear = now.getYear(); // 当前年
            nowYear += (nowYear < 2000) ? 1900 : 0;
            var monthStartDate = new Date(nowYear, nowMonth, 1);
            const start = monthStartDate;
            var monthEndDate = new Date(nowYear, nowMonth, getMonthDays());
            const end = monthEndDate;
            function getMonthDays() {
              var monthStartDate = new Date(nowYear, nowMonth, 1);
              var monthEndDate = new Date(nowYear, nowMonth + 1, 1);
              var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
              return days;
            }
            picker.$emit('pick', [start, end]);
          }
        }],
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
    };


  },

  mounted: function () {
    // const scrollview = this.$refs['list'];
    // scrollview.addEventListener('scroll', this.handleScroll, true)
    const scrollFirst = this.$refs['first'];
    scrollFirst.addEventListener('scroll', this.firstScroll, true)
    this.yewu();
  },

  activated() {

  },
  watch: {

    searchMsgValue(data) {
      if (data != '') {
        this.dateVale = true
      } else {
        this.dateVale = false
      }

    },
    // requestDataList() {
    //   // console.log(this.$refs['list'].scrollHeight)
    // },
    staffValue(newValue) {
      // 这里可以编写处理逻辑
      if (newValue == '') {
        this.delSelectUserId()
      }

    }
  },


  methods: {
    firstScroll(e) {
      const winHeight = e.target.scrollTop || document.documentElement.scrollTop
      var scrollTop = e.target.scrollTop;
      var scrollHeight = e.target.scrollHeight;
      var windowHeight = e.target.clientHeight;
      console.log(scrollTop, scrollHeight, windowHeight)

      if (scrollTop + 1 >= scrollHeight - windowHeight) {
        this.getQwCustomer(this.isAllselect, this.pageNumber, this.pageSize, this.tablabel, this.activeValue)
      }
    },



    handleScroll(e) {
      const winHeight = e.target.scrollTop || document.documentElement.scrollTop
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = e.target.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight = e.target.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight = e.target.scrollHeight;
      console.log(scrollTop <= 0)

      if (scrollTop <= 0 && this.noChathistory || scrollTop <= 0 && this.funhuiValue) {

        console.log(scrollTop <= 0 && this.funhuiValue)
        // || this.funhuiValue

        if (this.seq == '' && this.selectTime != '' || this.seq == '' && this.searchMsgValue != '') {
          return
        } else {
          this.requestData(this.isqwuserid, this.isfirstselect, this.seq, this.searchMsgValue, this.selectTime)
        }

      }
      // console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
    },

    requestData(user1, user2, seq, searchmsg, selecttime, lookupdown) {
      var _this = this
      this.loading = true;


      if (this.activeName == 'third') {
        var params = {
          qunid: user2,
          seq: seq
        }
        if (searchmsg && searchmsg != '' && !_this.funhuiValue) {
          params['querymsg'] = searchmsg
        }
        if (selecttime && selecttime != '') {
          params['startdate'] = selecttime[0]
          params['enddate'] = selecttime[1]
        }
        if (lookupdown && lookupdown != '') {
          params['direction'] = 'front'
        }


        var getTalkData = api.getQwQunTalkData(params)
      } else {
        var params = {
          user1: user1,
          user2: user2,
          seq: seq
        }
        if (searchmsg && searchmsg != '' && !_this.funhuiValue) {
          params['querymsg'] = searchmsg
        }
        if (selecttime && selecttime != '') {
          params['startdate'] = selecttime[0]
          params['enddate'] = selecttime[1]
        }
        if (lookupdown && lookupdown != '') {
          params['direction'] = 'front'
        }

        var getTalkData = api.getQwTalkData(params)
      }

      getTalkData.then((data) => {
        console.log(data)
        if (data.length > 0) {
          _this.seq = data[data.length - 1].seq


          if (_this.funhuiValue && lookupdown && lookupdown != '') {
            data.push(lookupdown)
          }



          for (var i = 0; i < data.length; i++) {
            var aa = i;
            var upaa = i - 1
            if (upaa < 0 || upaa == 0) {
              upaa = 0
            }
            var firstTime = Date.parse(data[aa].msgtime)
            var upTime = Date.parse(data[upaa].msgtime)
            var nowTime = Date.parse(new Date())
            var timestampValue = Math.abs(firstTime - upTime)


            // 首次
            if (data.length < 20 && aa == 0) {
              data[data.length - 1]['addtime'] = data[data.length - 1].msgtime
            }
            // 大于5分钟小于1天   大于1天小于10周      大于1周
            if (86400 > timestampValue > 300 || 604800 > timestampValue > 86400 || timestampValue > 604800) {
              data[upaa]['addtime'] = data[upaa].msgtime
            }

            if (data[i].msgtype == "revoke") {
              data.splice(i, 1)
            }


            if (data[i].msgtype == "link") {
              var fileData = JSON.parse(data[i].text)
              data[i]["link_url"] = fileData.link_url
              data[i]["title"] = fileData.title
              data[i]["description"] = fileData.description
              if (fileData.image_url != '') {
                data[i]["image_url"] = fileData.image_url
              } else {
                data[i]["image_url"] = '../../static/images/file.jpg'
              }
            }

            if (data[i].msgtype == "file") {
              var fileData = JSON.parse(data[i].text)
              data[i]["filepath"] = fileData.filepath
              data[i]["filename"] = fileData.filename

              let fileSize = (fileData.filesize / 1048576).toFixed(2)
              data[i]["fileSize"] = fileSize

              if (fileData.image_url != '') {
                data[i]["image_url"] = fileData.image_url
              } else {
                data[i]["image_url"] = '../../static/images/file.jpg'
              }
            }

            if (data[i].msgtype == "voice") {
              var voiceData = JSON.parse(data[i].text)
              data[i]['play_length'] = _this.format(voiceData.play_length)
              data[i]['filepath'] = voiceData.filepath
            }
            if (data[i].msgtype == "voiptext") {
              var voiceData = JSON.parse(data[i].text)
              data[i]['play_length'] = _this.format(voiceData.callduration)
            }

            if (data[i].msgtype == "chatrecord") {
              var chatrecordData = JSON.parse(data[i].text)

              data[i]['title'] = chatrecordData.title
              data[i]['play_length'] = chatrecordData.item.length
            }


            if (searchmsg && searchmsg != '' && !_this.funhuiValue) {
              _this.requestSearchList.unshift(data[i])
            } else if (_this.funhuiValue) {
              console.log('2131312')
              console.log(_this.requestDataList)
              _this.requestDataList.unshift(data[i])//push 数据到数组中
            } else {
              _this.requestDataList.unshift(data[i])//push 数据到数组中
            }
          }



          // let allmsg = data.concat(_this.requestDataList);
          // _this.requestDataList = allmsg
          if (_this.funhuiValue && lookupdown && lookupdown != '') {

          } else {
            _this.scrollHeight = _this.$refs['list'].scrollHeight
            _this.$refs['list'].scrollTop = _this.$refs['list'].scrollHeight;
            _this.$nextTick(() => {
              // console.log("当前滚动条位置:" + _this.$refs['list'].scrollTop);
              // console.log("当前可滚动区域容器的高度:" + _this.$refs['list'].scrollHeight);
              // console.log("当前滚动条的高度:" + _this.$refs['list'].scrollHeight, _this.scrollHeight);
              // console.log(_this.$refs['list'].scrollHeight, _this.scrollHeight);
              _this.$refs['list'].scrollTop = _this.$refs['list'].scrollHeight - _this.scrollHeight;
            })
          }






          const scrollview = _this.$refs['list'];
          scrollview.addEventListener('scroll', _this.handleScroll, true)

        } else {
          _this.noChathistory = false
        }
        _this.loading = false;
      }).catch((err) => {
        _this.loading = false;
        alert('访问超时了,请刷新后重新查看')
      })

    },

    playAudio(item) {
      this.voiceId = item.seq
      if (this.nexAmrtItem && this.nexAmrtItem.isPlay) {
        this.amr.pause();
        this.$set(this.nexAmrtItem, 'isPlay', false);
      }
      if (!item.isPlay) {
        const url = 'https://talk.meihualife.com' + item.filepath;
        this.amr = new BenzAMRRecorder();
        this.$set(item, 'isPlay', true);
        this.amr.initWithUrl(url).then(() => {
          this.amr.play();
        });
        this.amr.onEnded(() => { // 播放结束重置状态
          this.voiceId = ''
          this.$set(item, 'isPlay', false);
        });
        this.nexAmrtItem = item
      } else {
        this.amr.stop();
        this.$set(item, 'isPlay', false);
      }
    },




    // 勾选团队时，统计团队ID
    checkTeam(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label);
      });
      this.myList = teamListName.join(",");
      this.teamListId = checked.checkedKeys.join(",");
      this.teamid = this.teamListId;
    },
    // 取消所选团队
    team_cancel() {
      this.$refs.disTeam.hide();
      this.myList = "";
      this.teamListId = "";
      this.teamNames = "团队选择";
      this.teamid = "";

      this.$refs.tree.setCheckedKeys([]);
      this.queryflag = true;
      this.staffValue = "";

      this.searchUser(this.teamAllid)
    },

    // 确认所选团队
    team_sure() {
      let _this = this;
      this.$refs.disTeam.hide();
      // this.staffValue = "";
      if (this.myList == null || this.myList == "" || this.myList == "1") {
        this.queryflag = true;
        this.queryflagString = "01";
      } else {
        this.teamNames = this.myList;
        this.queryflag = false;
        this.queryflagString = "02";
      }
      _this.searchUser(this.teamListId, this.staffValue)
    },

    // 获取该团队权限下的员工
    yewu() {
      let _this = this;
      var idStr = ''
      api.getTalkTeamList().then((data) => {
        if (data.code == 0) {
          _this.teamDataList = data.teamList;
          for (var i = 0; i < _this.teamDataList.length; i++) {
            idStr += _this.teamDataList[i].id + ','
            if (_this.teamDataList[i].children) {
              for (var j = 0; j < this.teamDataList[i].children.length; j++) {
                idStr += _this.teamDataList[i].children[j].id + ','
                if (this.teamDataList[i].children[j].children) {
                  for (var s = 0; s < this.teamDataList[i].children[j].children.length; s++) {
                    idStr += _this.teamDataList[i].children[j].children[s].id + ','
                  }
                }
              }
            }
          }
          if (idStr != '') {
            idStr = idStr.slice(0, -1);
          }
          // 权限内的所有人员
          _this.teamAllid = idStr
          _this.searchUser(idStr)
        }
      })

    },

    // 模糊查询员工
    searchUser(teamid, keyword) {
      var _this = this
      var params = {
        teamid: teamid,
        realname: keyword ? keyword : '',
      }
      api.getQwUser(params).then((data) => {
        _this.teamNameList = data.userList;
        _this.SalesmanIdBox = [];
        data.userList.forEach((res) => {
          _this.SalesmanIdBox.push({
            value: res.realname,
            id: res.userid,
            qwalias: res.qwalias,
            qwuserid: res.qwuserid,
            qwuserurl: res.qwuserurl,
          });
        });



        _this.selectOneName(data.userList[0], this.tablabel)


      });
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.organizationName.indexOf(value) !== -1;
    },




    // 选择  客户， 同事， 群聊
    handleClick(tab, event) {
      let _this = this;
      this.tablabel = tab.$props.label
      // 重置页数
      this.pageNumber = 1;
      this.pageSize = 20
      this.selectOneName(this.oneitem, tab.$props.label)
    },
    // 选择员工--带出来对应的客户
    selectOneName(item, first) {
      // 储存员工信息
      this.oneitem = item
      this.isAllselect = item.userid;
      this.isqwuserid = item.qwuserid;
      this.selectStaffName = item.realname;
      this.selectStaffPhoto = item.qwuserurl;
      // 使原来的客户列表为空
      this.firstAllName = []
      this.pageNumber = 1
      // 搜索内容也要为空
      this.searchMsgValue = ''
      this.selectTime = ''
      // 更改最上面的固定头像
      if (this.tablabel == '群聊') {
        this.getQwCustomer(item.qwuserid, this.pageNumber, this.pageSize, first, this.activeValue)
      } else {
        this.getQwCustomer(item.userid, this.pageNumber, this.pageSize, first, this.activeValue)
      }
    },

    // 获取员工对应客户的姓名
    getQwCustomer(userid, pageNumber, pageSize, first, item) {
      var _this = this
      this.paneloading = true
      var params = {
        userid: userid,
        pageNumber: pageNumber,
        pageSize: pageSize,
        queryname: item
      }

      // if (item != '') {
      //   _this.firstAllName = []
      // }

      if (first == '客户') {
        api.getQwCustomerByUser(params).then((data) => {
          if (data.qwCustomerList != []) {
            var qwCustomerList = _this.dataHandle(data.qwCustomerList)
            _this.firstAllName = _this.firstAllName.concat(qwCustomerList);
            if (_this.pageNumber == '1' && _this.firstAllName[0]) {
              _this.selectFirstName(_this.firstAllName[0])
            }
            _this.pageNumber = _this.pageNumber + 1
          }
        });
      }


      if (first == '同事') {
        api.getQwColleagueByUser(params).then((data) => {
          if (data.qwColleagueList != []) {
            var qwColleagueList = _this.dataHandle(data.qwColleagueList)
            _this.firstAllName = _this.firstAllName.concat(qwColleagueList);
            if (_this.pageNumber == '1' && _this.firstAllName[0]) {
              _this.selectFirstName(_this.firstAllName[0])
            }
            _this.pageNumber = _this.pageNumber + 1
          }
        });
      }


      if (first == '群聊') {
        var params = {
          qwuserid: userid,
          pageNumber: pageNumber,
          pageSize: pageSize,
          queryname: item
        }

        api.getQunList(params).then((data) => {
          if (data.qwQunList != []) {
            var qwColleagueList = _this.dataHandle(data.qwQunList)
            _this.firstAllName = _this.firstAllName.concat(qwColleagueList);
            if (_this.pageNumber == '1' && _this.firstAllName[0]) {
              _this.selectFirstName(_this.firstAllName[0])
            }
            _this.pageNumber = _this.pageNumber + 1

          }
        });

      }
      this.paneloading = false
    },

    // 选择客户, 同事， 群聊人员
    selectFirstName(item) {
      if (item.qunid) {
        this.isfirstselect = item.qunid
      } else {
        this.isfirstselect = item.customerid;
      }
      this.selectfirstPhoto = item.avatar;
      this.selectfirstName = item.customername;
      this.selectfirstRemakeName = item.customer_remark_name;
      // 从第一页请求数据
      // this.pageNumber = 1
      this.requestSearchList = []
      this.requestDataList = []
      this.seq = ''
      this.searchMsgValue = ''
      this.selectTime = ''
      this.searchText = true
      this.funhuiValue = false
      this.noChathistory = true


      // 关闭监听滚动条
      // this.$refs.scrollView.removeEventListener('scroll', this.handleScroll, true);
      const scrollview = this.$refs['list'];
      scrollview.removeEventListener('scroll', this.handleScroll, true)
      // 请求聊天记录
      this.requestData(this.isqwuserid, this.isfirstselect, '')

    },


    // // 选择同事
    // selectSecondName(item) {
    //   console.log(item)
    // },

    // // 选择群
    // selectThirdName(item) {
    //   console.log(item)

    // },



    querySearchId(queryString, cb) {
      var SalesmanIdBox = this.SalesmanIdBox;
      var results = queryString
        ? SalesmanIdBox.filter(this.createFilterId(queryString))
        : SalesmanIdBox;
      // 调用 callback 返回建议列表的数据
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


    // 选择模糊筛选出来的 员工
    selectUserId(item) {
      let arr = [];
      item["realname"] = item.value;
      item["userid"] = item.id;
      item["qwalias"] = item.qwalias;
      item["qwuserid"] = item.qwuserid;
      item["qwuserurl"] = item.qwuserurl;

      arr.push(item);
      this.teamNameList = arr;
    },
    // 选择模糊筛选出来的 客户姓名
    activeselectId(item) {
      console.log(item)
      console.log(this.activeValue)
      var _this = this
      // if (item == '') {
      this.firstAllName = []
      this.pageNumber = 1,
        this.pageSize = 20
      // } 
      if (this.tablabel == '群聊') {
        this.getQwCustomer(this.isqwuserid, this.pageNumber, this.pageSize, this.tablabel, item)
      } else {
        this.getQwCustomer(this.isAllselect, this.pageNumber, this.pageSize, this.tablabel, item)
      }




    },


    // 取消模糊搜索
    delSelectUserId() {
      var _this = this;
      var arr = []
      _this.SalesmanIdBox.forEach((res) => {
        arr.push({
          realname: res.value,
          userid: res.id,
          qwalias: res.qwalias,
          qwuserid: res.qwuserid,
          qwuserurl: res.qwuserurl,
        })
      });
      _this.teamNameList = arr
    },



    // 代码在1秒内只执行一次
    searchMsg: _.debounce(function (item) {
      // 这里的代码只会在一秒内执行一次
      console.log('Input value changed:', this.inputValue);
      this.requestDataList = []
      this.seq = ''
      this.noChathistory = true

      this.requestDataList = []
      // this.requestSearchList = []

      if (item == '') {
        this.searchText = true
        this.funhuiValue = false
      } else {
        this.searchText = false
      }

      this.searchMsgValue = item

      this.requestData(this.isqwuserid, this.isfirstselect, '', item)

    }, 1000),

    searchDate: _.debounce(function (item) {
      console.log(this.selectTime)

      this.requestDataList = []
      this.seq = ''
      this.noChathistory = true
      this.requestData(this.isqwuserid, this.isfirstselect, '', this.searchMsgValue, this.selectTime)

      // const scrollview = this.$refs['list'];
      // scrollview.removeEventListener('scroll', this.handleScroll, true)

    }, 1000),


    lookupdown: _.debounce(function (item) {
      this.requestDataList = []
      // this.requestSearchList = []

      this.requestData(this.isqwuserid, this.isfirstselect, item.seq, '', '', item)
      this.searchText = true
      this.funhuiValue = true
    }, 1000),
    fanhui() {
      this.funhuiValue = false
      this.searchText = false
    },
    // JS将时间戳转换为刚刚、N分钟前、今天几点几分、昨天几点几分等表示法
    timestampFormat(timestamp) {
      var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
      var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

      var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
      var tmDate = new Date(timestamp * 1000);  // 参数时间戳转换成的日期对象

      var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
      var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

      if (timestampDiff < 60) { // 一分钟以内
        return "刚刚";
      } else if (timestampDiff < 3600) { // 一小时前之内
        return Math.floor(timestampDiff / 60) + "分钟前";
      } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
        // return '今天' + this.zeroize(H) + ':' + this.zeroize(i);
        return this.zeroize(H) + ':' + this.zeroize(i);
      } else {
        var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
        if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
          return '昨天' //+ this.zeroize(H) + ':' + this.zeroize(i);
        } else if (curDate.getFullYear() == Y) {
          return this.zeroize(m) + '月' + this.zeroize(d) + '日 ' //+ this.zeroize(H) + ':' + this.zeroize(i);
        } else {
          return Y + '年' + this.zeroize(m) + '月' + this.zeroize(d) + '日 ' //+ this.zeroize(H) + ':' + this.zeroize(i);
        }
      }
    },
    // 给小于10的数字补 0
    zeroize(num) {
      return (String(num).length == 1 ? '0' : '') + num;
    },

    // 时间格式8转化为00：08
    format(seconds) {
      let hour = Math.floor(seconds / 3600) >= 10 ? Math.floor(seconds / 3600) : '0' + Math.floor(seconds / 3600);
      seconds -= 3600 * hour;
      let min = Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60);
      seconds -= 60 * min;
      let sec = seconds >= 10 ? seconds : '0' + seconds;
      return min + ':' + sec;
    },


    // 处理客户， 同事， 群聊姓名等数据
    dataHandle(data) {
      console.log(data)
      var qwCustomerList = data
      for (var i = 0; i < qwCustomerList.length; i++) {
        // 同事
        if (qwCustomerList[i].last_msgtime) {
          qwCustomerList[i]['lastmsgtime'] = qwCustomerList[i].last_msgtime
        }
        if (qwCustomerList[i].last_msgtype) {
          qwCustomerList[i]['lastmsgtype'] = qwCustomerList[i].last_msgtype
        }
        if (qwCustomerList[i].last_text) {
          qwCustomerList[i]['lasttext'] = qwCustomerList[i].last_text
        }
        if (qwCustomerList[i].qwualias) {
          qwCustomerList[i]['customer_remake_name'] = qwCustomerList[i].qwualias
        }

        if (qwCustomerList[i].qwuserid) {
          qwCustomerList[i]['customerid'] = qwCustomerList[i].qwuserid
        }

        if (qwCustomerList[i].qwuserurl) {
          qwCustomerList[i]['avatar'] = qwCustomerList[i].qwuserurl
        }
        if (qwCustomerList[i].realname) {
          qwCustomerList[i]['customername'] = qwCustomerList[i].realname
        }

        // 群聊   
        if (qwCustomerList[i].name == '') {
          qwCustomerList.splice(i, 1);
          console.log(qwCustomerList)
        }
        if (qwCustomerList[i].qunid) {
          qwCustomerList[i]['customerid'] = qwCustomerList[i].qunid
        }
        if (qwCustomerList[i].name) {
          qwCustomerList[i]['customername'] = qwCustomerList[i].name
          qwCustomerList[i]['avatar'] = "https://crm.meihualife.com/images/qunavatar.png"
        }

        if (qwCustomerList[i].ownername) {
          qwCustomerList[i]['customer_remake_name'] = qwCustomerList[i].ownername
        }

        if (qwCustomerList[i].owner_qwuserid) {
          qwCustomerList[i]['qwuserid'] = qwCustomerList[i].owner_qwuserid
        }


        // 所有
        if (qwCustomerList[i].lastmsgtime) {
          qwCustomerList[i]["lastmsgtimeValue"] = this.timestampFormat(Date.parse(qwCustomerList[i].lastmsgtime) / 1000)
        } else {
          qwCustomerList[i]["lastmsgtimeValue"] = ''
        }
        if (qwCustomerList[i].lastmsgtype && qwCustomerList[i].lastmsgtype == 'link' || qwCustomerList[i].lastmsgtype == 'file') {
          qwCustomerList[i]["lastmsgtypeValue"] = '【链接消息】'
        } else if (qwCustomerList[i].lastmsgtype && qwCustomerList[i].lastmsgtype == 'image' || qwCustomerList[i].lastmsgtype == 'emotion') {
          qwCustomerList[i]["lastmsgtypeValue"] = '【图片消息】'
        } else if (qwCustomerList[i].lastmsgtype && qwCustomerList[i].lastmsgtype == 'voice') {
          qwCustomerList[i]["lastmsgtypeValue"] = '【语音消息】'
        } else if (qwCustomerList[i].lastmsgtype && qwCustomerList[i].lastmsgtype == 'video') {
          qwCustomerList[i]["lastmsgtypeValue"] = '【视频消息】'
        } else if (qwCustomerList[i].lastmsgtype && qwCustomerList[i].lastmsgtype == 'revoke' || qwCustomerList[i].lastmsgtype == 'chatrecord') {
          qwCustomerList[i]["lastmsgtypeValue"] = '【未知类型消息】'
        } else {
          qwCustomerList[i]["lastmsgtypeValue"] = qwCustomerList[i].lasttext
        }
      }
      return qwCustomerList
    },



    // allowDrop() { },
    // allowDrag() { },
    // handleDragStart() { },
    // handleDragEnd() { },
    // handleDrop() { },
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
  padding: 0.15rem 0.1rem;
  border-left: 0.05rem solid transparent;
  cursor: pointer;

}

.staffListBottom .staffName {
  border-bottom: 1px solid #e8e8e8;
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
  width: 0.55rem;
  height: 0.55rem;
}

.pBox {
  width: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.1rem;
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

::v-deep .el-tabs__nav-wrap::after {
  background-color: #E4E7ED;
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

::v-deep .searchName .el-input .el-input__inner {
  border: 0px;
  height: 0.34rem;
  line-height: 0.34rem;
  width: 100%;
  margin-left: 0px;
}

::v-deep .searchName .el-input__icon {
  line-height: 20px;
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

.namedata span {
  display: inline-block;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.namedata span:first-child {
  width: 1rem;
}

.namedata span:last-child {
  width: 0.6rem;
  font-size: 0.12rem;
  text-align: right;
}

.lastText {
  width: 1.5rem;
  display: block;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.headRecords {
  height: 0.7rem;
  padding: 0;
  width: 60%;
  border-bottom: 1px solid #E4E7ED;
  /* padding:0.2rem 0.2rem 0; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recordHead {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.2rem;
}

.chatRightHead {
  /* margin: 0.2rem;
  margin-right: 2.6rem; */
  width: 2.5rem;
}

.chatHistory {
  width: 100%;
  margin-top: 0.8rem;
  height: calc(100vh - 1.9rem);
}

.chatLeftImg {
  width: 30%;
  height: 30%;
  text-align: left;
}

.chatRightImg {
  width: 30%;
  height: 30%;
  text-align: right;
}

.chatPright {
  display: flex;
  justify-content: right;
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
  display: flex;
}


.chat_right .chatContent {
  width: auto;
  height: auto;
  padding: 0.1rem;
  border-radius: 0.1rem;
  background: #1992f9;
  font-size: 0.16rem !important;
  display: flex;
}

.chat_left .chatContentVideo {
  display: flex;
  justify-content: left;
  background: #fff;

}

.chat_right .chatContentVideo {
  display: flex;
  justify-content: right;
  background: #fff;
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
  /* display: none; */
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
  /* display: none; */
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





/* 文件格式 */
.chat_right .colorfff {
  padding: 0;
  background: #fff;
}

.chat_left .colorfff {
  padding: 0;
  background: #fff;
}

.recordFile a {
  display: block;
  cursor: pointer;
  border: 1px solid #e8e8e8;
  padding: 10px;
  width: 260px;
  height: 90px;
  font-size: 12px;
  word-break: break-all;
  color: #909090;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  text-decoration: none
}

.recordFile a :hover {
  text-decoration: underline
}

.recordFile .fileMain {
  width: 188px;
  display: flex;
  flex-direction: column;
}

.recordFile a img {
  width: 46px;
  height: 46px;
  margin-top: 20px;
  margin-left: 6px;
  -o-object-fit: cover;
  object-fit: cover;
}

.FileTitle {
  width: 210px;
  font-weight: bold;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}



.FileSizeright,
.FileSizeleft {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 20px;
}











.chat_left .chatVoice {
  height: 28px;
  /* width: 100px; */
  width: auto;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  padding-right: 15px;
}

.chat_right .chatVoice {
  height: 28px;
  /* width: 100px; */
  width: auto;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  padding-right: 15px;

}

.chatVoiceImg {
  width: 20px;
  height: 20px;
}

.chatVoice p {
  border: 0;
  font-size: 0.16rem !important;
}

.staffTime {
  text-align: center;
  font-size: 14px;
  margin: 35px 0;
  color: #777;
}

@keyframes anim-flash {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  51% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

.playAudioVoice img {
  -webkit-animation: anim-flash 1s infinite;
  animation: anim-flash 1s infinite;
}






.chat_left .chatContent_right,
.chat_right .chatContent_left {
  width: 260px;
  border: 1px solid #e8e8e8;
  border-radius: 0 4px 4px 8px;
  padding: 8px 0px 0px 10px;
  background: #fff;
}


.chatContent_right p,
.chatContent_left p {
  text-align: left;
  border: 0;
  margin: 0;
  color: #909090;
  height: auto;
  font-size: 14px;
}


.chatContent .chatRecord_title1 {
  color: #222;
  font-size: 15px !important;

}

.chatContent .chatRecord_title2 {
  color: #909090 !important;
  ;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 6px;
  padding-top: 6px;
}

.chatContent .chatRecord_title3 {
  color: #909090 !important;
  ;
  font-size: 14px !important;
  padding-bottom: 3px;
  padding-top: 1px;
}

.select-content {
  margin-bottom: 0rem;
}

.select-content .el-date-picker-inners {
  height: 0.36rem;
  margin-top: -1px;
}

::v-deep .select-content .el-date-picker-inners>input {
  height: 0.34rem;
  font-size: 0.14rem;
}



::v-deep .searchName .el-input .el-input__inner {
  font-size: 0.14rem;
}

.searchTextBox {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.16rem;
}

.searchTextBox .chat_left {
  display: flex;
  font-size: 0.16rem;
}

.searchTextBox .lookText div {
  font-size: 0.16rem;
}

.searchTextBox .chat_left .chatContent {
  background: #fff;
  padding: 0;
}

.lookupdown {
  cursor: pointer;
  color: #1890ff;
  display: none;
}

.searchTextBox :hover .lookupdown {
  display: block;
}

.fanValue {
  cursor: pointer;
  padding-left: 0.2rem;
}

.fanValue span {
  color: #1890ff;
  vertical-align: middle;
}

.fanValue span:first-child {
  font-size: 0.24rem;
}

.revokeRightCss {
  color: red;
  font-size: 12px;
  margin: 0 10px;
  padding: 0 6px;
  border-radius: 4px;
  background: #e6f7ff;
  color: #383838;
  align-self: flex-end;
  /* width: 0.5rem; */
}
</style>