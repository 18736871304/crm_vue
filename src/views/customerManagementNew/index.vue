<template>
  <div style="display: flex; flex: 1;">
    <div class="drawerLeft" :class="detailsInfo.followupstep=='07' ? 'isDealed' : ''">
      <div class="left_box">
        <div class="header">
          <div class="header_t clearfix">
            <div class="header_t_l">
              <span>{{ detailsInfo.name }}</span>
              <span @click="phonecall_page"> <img src="../../static/images/call-icon.png" style="margin-right: 6px" />拨打电话 </span>
            </div>
            <div class="header_t_r">
              <span>所属业务员：</span>
              <span>{{ detailsInfo.username }}</span>
              <span v-if="detailsInfo.otherusername">（{{ detailsInfo.otherusername }}）</span>
            </div>
          </div>
          <div class="header_b clearfix">
            <div class="title">标签</div>
            <div class="checkBox">
              <el-checkbox-group size="mini" v-model="activitytag" v-show="false">
                <el-checkbox-button v-for="customer in activitytags" :label="customer.dd_key" :key="customer.dd_key"> {{
                  customer.dd_value }}</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="editBox">
          <div class="title">
            <span></span>
            <span>客户基本信息</span>
          </div>
          <div class="editContent clearfix">
            <div class="editContent_box">
              <span class="dd">客户姓名</span>
              <span class="dd">
                <el-input placeholder="请输入" size="mini" v-model="detailsInfo.name"> </el-input>
              </span>
            </div>
            <div class="editContent_box">
              <span class="dd">电话号码</span>
              <span class="dd">
                <el-popover placement="bottom" width="225" trigger="click" v-model="addMobliePopVisible">
                  <el-input type="text" size="mini" v-model="addMoblie" style="margin-bottom: 5px" @input="addMoblieChange"> </el-input>

                  <div class="mobile_input_box" v-show="mobileInputShow">
                    <span class="mobile_input mobile_input_add" @click="mobileAdd">添加</span>
                    <span class="mobile_input mobile_input_cancle" @click="mobileCancle">取消</span>
                  </div>
                  <!-- v-show="dis_save" -->
                  <el-table :data="mobileList" class="mobile_box">
                    <el-table-column width="130" property="phone" label="电话"></el-table-column>
                    <el-table-column width="70" label="操作" align="right">
                      <template slot-scope="scope">
                        <span class="mobile-icon el-icon-delete" @click="mobileDelete(scope)"></span>
                        <span class="mobile-icon el-icon-upload2" @click="mobileToTop(scope)"></span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <template slot="reference">
                    <el-input placeholder="请输入" size="mini" v-model="detailsInfo.mobilestr"> </el-input>
                    <span @click="addMobliePopVisible = !addMobliePopVisible" class="icon_arr"><i class="el-select__caret el-input__icon el-icon-arrow-down"></i></span>
                  </template>
                </el-popover>
              </span>
            </div>
            <div class="editContent_c editContent_box">
              <span class="dd">性别</span>
              <span class="dd maxmain">
                <el-select v-model="detailsInfo.sex" size="mini" style="width: 100%" placeholder="请选择">
                  <el-option v-for="item in sexs" :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </span>
            </div>
            <div class="editContent_c editContent_box editContent_date" style="font-size: 0.13rem">
              <span class="dd">出生日期</span>
              <span class="dd">
                <el-date-picker class="difPicker" v-model="detailsInfo.birthday" type="date" size="mini" placeholder="请输入出生年月" clearable style="width: 100%" value-format="yyyy-MM-dd"> </el-date-picker>
              </span>
            </div>
            <div class="editContent_b editContent_box">
              <span class="dd">微信号</span>
              <span class="dd">
                <el-input placeholder="请输入" size="mini" v-model="detailsInfo.wxnostr"> </el-input>
              </span>
            </div>
          </div>
        </div>
        <div class="condition">
          <div class="clearfix" style="margin-bottom: 0.2rem">
            <div class="common-select">
              <div class="select-title" style="width: 0.8rem">跟进步骤</div>
              <div class="select-content" style="width: calc(100% - 0.8rem); margin-right: 0.2rem; border: none">
                <el-select class="el-select-inners" v-model="stepsName" size="mini" placeholder="" clearable>
                  <el-option v-for="item in steps" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key">
                  </el-option>
                </el-select>
              </div>
            </div>
            <!-- <div class="common-select">
                <div class="select-title " style="width: 0.8rem">共享客户</div>
                <div class="select-content filContentNoborder   filContBottom" style="width: calc(100% - 0.8rem); margin-right: 0.2rem;">
                  <el-autocomplete class="el-input-inners" v-model="editInfo.shareusername" :trigger-on-focus="false" :fetch-suggestions="querySearchId" size="mini" placeholder="请输入业务员姓名" clearable></el-autocomplete>
                </div>
              </div> -->
            <!-- multiple -->
            <div class="common-select">
              <div class="select-title" style="width: 0.8rem">客户需求</div>
              <div class="select-content cusintention" style="width: calc(100% - 0.8rem); margin-right: 0.2rem; border: none">
                <el-select class="el-select-inners" @change="handleChange" v-model="customer_intention" size="mini" multiple collapse-tags placeholder="请选择客户需求" clearable>
                  <el-option v-for="item in customerNeedList" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key" :disabled="item.disabled"> </el-option>
                </el-select>
              </div>
            </div>

            <div class="common-select">
              <div class="select-title" style="width: 0.8rem">预约回访</div>
              <div class="select-content boxpad" style="height: 0.3rem; width: calc(100% - 0.8rem); margin-right: 0.2rem; border: none">
                <el-date-picker class="el-date-picker-sigle" v-model="returnVisit" type="datetime" size="mini" placeholder="" :picker-options="previstitimePickerOptions" clearable> </el-date-picker>
              </div>
            </div>

            <div class="common-select">
              <div class="select-title" style="width: 0.8rem">转其他库</div>
              <div class="select-content" style="width: calc(100% - 0.8rem); margin-right: 0.2rem; border: none">
                <el-select class="el-select-inners" v-model="otherstoreName" size="mini" placeholder="" :disabled="isableInput" clearable>
                  <el-option v-for="item in otherstores" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="condition-bottom" v-show="dis_save" @click="saveRecord">保存</div>
        </div>

        <div class="adInformation" style="height: 1.5rem">
          <div class="title clearfix">
            <span></span>
            <span>广告投放信息</span>
          </div>
          <div class="adInformation_b">
            <div class="cb">
              <span :title="detailsInfo.makedate">线索产生时间：{{ detailsInfo.makedate }}</span>
              <span :title="detailsInfo.channelname">渠道类型：{{ detailsInfo.channelname }}</span>
            </div>

            <div class="cc">
              <span :title="detailsInfo.clue_sourcename">线索来源：{{ detailsInfo.clue_sourcename }}</span>
              <span :title="detailsInfo.appname">流量来源：{{ detailsInfo.appname }}</span>
            </div>

            <div class="cb">
              <span :title="detailsInfo.area">自动定位城市：{{ detailsInfo.area }}</span>
            </div>

            <div class="cb" style="width: 90%; display: none">
              <span :title="detailsInfo.pageurl">
                推广页面：
                <a style="cursor: pointer; color: #578ee7" href="#" @click="disPageUrl(detailsInfo)">{{
                  detailsInfo.pageurl
                  }}</a>
              </span>
            </div>
          </div>
        </div>
        <div class="userInformation" style="display: none">
          <div class="title">
            <span></span>
            <span>用户行为信息</span>
          </div>
          <div class="userInformation_b">
            <div class="ct">
              <span :title="detailsInfo.dwelltime">用户停留时长：{{ detailsInfo.dwelltime }}</span>
              <span :title="detailsInfo.interactcount">用户互动次数：{{ detailsInfo.interactcount }}</span>
            </div>
            <div class="cb">
              <span :title="detailsInfo.readingpercentage">用户页面阅读百分比：{{ detailsInfo.readingpercentage }}</span>
            </div>
          </div>
        </div>
        <div class="tableBox">
          <div class="title">
            <span></span>
            <span>客户通话记录</span>
            <span>累计通话时长{{ callSum }}分钟</span>
          </div>
          <div class="tableContent">
            <el-table :data="callDataList" border style="width: 100%">
              <el-table-column key="50" prop="calltime" label="拨打时间" align="center" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column key="51" prop="username" label="拨打业务员" width="97" align="center" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column key="52" prop="isconnect" width="70" align="center" label="接通"> </el-table-column>
              <el-table-column key="53" prop="timeduration" label="时长" align="center" width="100" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column key="54" align="center" label="录音" width="70">
                <template slot-scope="scope" v-if="scope.row.recordurl">
                  <img class="play-icon" src="../../static/images/pause-icon.png" title="暂停" @click="audioPause(scope.$index)" v-if="!audioPaused && scope.$index === currentCallIndex" />
                  <img class="play-icon" src="../../static/images/play-icon.png" title="播放" @click="audioPlay(scope.$index)" v-else />
                  <a style="margin-left: 8px; font-size: 15px; vertical-align: middle" :href="scope.row.recordurl" :download="scope.row.username + '_' + detailsInfo.name + '_' + scope.row.calltimeType" title="下载">
                    <i class="el-icon-download"></i>
                  </a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="drawerRight" :class="detailsInfo.followupstep=='07' ? 'isDealed' : ''">
      <div class="AIRemake templateAI">
        <div class="title">
          <span></span>
          <span>AI问答</span>
        </div>
        <Chatbot />
      </div>
      <div class="AIRemake">

        <div class="title">
          <span></span>
          <span>跟进记录</span>
        </div>
        <div class="inputBox">
          <el-input v-model="followrecord" id="textarea" type="textarea" placeholder="添加跟进记录…"></el-input>
        </div>
        <div class="numBox">
          <div class="num">共{{ releaseNum }}条</div>
          <div class="button">
            <span @click="cancel">取消</span>
            <span @click="release" v-show="dis_save">发布</span>
          </div>
        </div>
        <div class="drawercontentBox">
          <ul>
            <li v-for="item in records" :key="item.remarkserialno">
              <div class="li_t" style="display: flex; justify-content: space-between;align-items: center;">
                <div v-html="item.remark" style="width: 85%;"></div>
                <div v-if="delRemark" style="width: 10%;  padding: 0;  text-align: right;" class="gjg_topping mobile-icon el-icon-upload2" @click="remarktop(item.remarkserialno)"></div>
              </div>
              <div class="li_b">
                <div class="li_b_l" :title="item.name">{{ item.oprname }}</div>
                <div class="li_b_r">
                  {{ item.makedate }} 创建
                  <span v-show="delRemark" class="mobile-icon el-icon-delete" @click="deleteRemark(item.remarkserialno)" style="color: #979797"></span>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>

    </div>
    <div class="drawerRight isDealed" v-if="detailsInfo.followupstep=='07'">
      <div class="title">
        <span></span>
        <span>保障详情</span>
      </div>
      <ul class="order-list" v-loading="detai_loading">
        <li class="item" v-for="(item, index) in policyList" :key="index">
          <div class="head">
            <div class="txt" @click="showEdit(item)">{{ item.riskname }}</div>
            <div class="status" :class="[item.status === 'processing' ? 'processing' : '', item.status === 'invalid' ? 'invalid' : '', item.status === 'cancel' ? 'cancel' : '']">
              <template v-if="item.status === 'effective'">保障中</template>
              <template v-if="item.status === 'processing'">待处理</template>
              <template v-if="item.status === 'invalid'">已失效</template>
              <template v-if="item.status === 'cancel'">已终止</template>
            </div>
          </div>
          <ul class="info-list">
            <div class="info">
              <span class="l">投保日期:</span>
              <span>{{ item.accepttime }}</span>
            </div>
            <div class="info">
              <span class="l">生效日期:</span>
              <span>{{ item.cvalidate }}</span>
            </div>
            <div class="info">
              <span class="l">保单号:</span>
              <span>{{ item.contno }}</span>
            </div>
            <div class="info">
              <span class="l">投保人:</span>
              <span>{{ item.appname }}</span>
            </div>
            <div class="info">
              <span class="l">被保人:</span>
              <span>{{ item.insname }}</span>
            </div>
            <div class="info">
              <span class="l">保险金额:</span>
              <span>{{ item.amnt }}</span>
            </div>
            <div class="info">
              <span class="l">保障期限:</span>
              <span>{{ item.insuyearvalue }}</span>
            </div>
            <div class="info">
              <span class="l">保费:</span>
              <span>{{ item.prem }}</span>
            </div>
            <div class="info">
              <span class="l">缴费方式:</span>
              <span>{{ item.payintvvalue }}</span>
            </div>
            <div class="info">
              <span class="l">缴费年期:</span>
              <span>{{ item.payendyearvalue }}</span>
            </div>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 录音播放器 -->
    <audio :src="audioSrc" ref="audio" controls="controls" id="audio" v-show="audioShow"></audio>

    <view-details :datas="detailObj" :showEditPopupDialogVisible.sync="showEditPopupDialogVisible" @updateVisible="updateVisibleId"></view-details>

  </div>
</template>

<script>
import $ from "jquery";
import viewDetails from "../../components/viewDetails.vue";
import { getData, getPhoneData, my_url, crm_url } from "../../static/js/ajax.js";
import { formatDate, checkEmail, checkMobile } from "../../static/js/common.js";


import Chatbot from '../../components/Chatbot.vue';
export default {
  components: {
    viewDetails, Chatbot
  },
  data() {
    return {

      // 权限
      isDealed: false,
      dis_save: false,


      // 输入内容
      detailsInfo: "",
      activitytag: "", //标签
      activitytags: [],
      addMobliePopVisible: false,
      mobileInputShow: false,
      mobileList: [],
      addMoblie: "",
      sexs: [
        {
          key: "男",
          value: "男",
        },
        {
          key: "女",
          value: "女",
        },
      ],
      birthday: "",
      wxnostr: '',
      // 选择项 
      stepsName: '',//跟进步骤
      steps: [],//跟进步骤列表
      customerNeedList: [],
      customer_intention: "",
      returnVisit: '',//预约回访
      //控制时间范围
      previstitimePickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      isableInput: false,
      otherstores: [],
      otherstoreName: '',

      // 用户行为信息
      callSum: "",
      callDataList: [],

      // 录音播放 
      audioSrc: "",
      audioShow: false,
      audioPaused: true,

      // 跟进步骤
      followrecord: "", //发布信息
      releaseNum: "", //发布数量
      records: [],

      delRemark: false,//置顶和删除

      // 保单详情
      detai_loading: false,
      policyList: [],

      // 保单弹窗详情
      detailObj: {},
      showEditPopupDialogVisible: false,




    };
  },
  props: {
    datas: {},

  },

  created: function () {
    this.init();
  },
  mounted: function () {
    var _this = this;

  },
  watch: {
    datas: {
      handler(newVal) {
        console.log(newVal)
        this.detailsInfo = JSON.parse(JSON.stringify(newVal));
        this.stepsName = newVal.followupstep;
        this.customer_intention = newVal.customer_intention != undefined ? newVal.customer_intention.split(",") : "";
        setTimeout(() => {
          this.handleChange(this.customer_intention);
        }, 300);

        this.returnVisit = formatDate(newVal.previstitime, "yyyy-MM-dd HH:mm:ss");
        this.otherstoreName = newVal.otherstore;
        if (newVal.queryflag) {
          this.detailsInfo.mobilestr = newVal.mobilestr;
          // this.detailsInfo.wxno = newVal.wxno;
          this.detailsInfo.wxnostr = newVal.wxnostr;
          this.dis_save = true;
          this.delRemark = true;
        } else {
          this.detailsInfo.mobilestr = newVal.mobile;
          this.detailsInfo.wxnostr = newVal.wxnostr;
          this.dis_save = false;
          this.delRemark = false;
        }
        this.getmobileList(newVal.activityserialno);
        if (newVal.followupstep == "07") {
          this.getOrderData(newVal.mobilestr);
        }

        console.log(newVal.isableInput)
        if (newVal.isableInput) {
          this.isableInput = newVal.isableInput
        } else {
          this.isableInput = false
        }

        this.getReleaseData(); //发布的列表
        this.getCallData();
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {},
  methods: {
    // new
    init() {
      var _this = this;


      // 跟进步骤
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          if (data.code == 0) {
            _this.steps = data.dictList;
            // let select_dictList = JSON.parse(JSON.stringify(data.dictList));
          }
        },
        { dict_type: "followupstep" }
      );
      // 客户需求
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          if (data.code == 0) {
            _this.customerNeedList = data.dictList;
          }
        },
        { dict_type: "customer_intention" }
      );

      //转其他库
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          if (data.code == 0) {
            let { dictList } = data;
            _this.otherstores = dictList;
          }
        },
        { dict_type: "otherstore" }
      );



    },

    // 客户需求
    handleChange(selectedKeys) {
      if (selectedKeys.length > 0) {
        // 根据初始化数组对象的顺序对 selectedKeys 进行排序
        selectedKeys.sort((a, b) => {
          const indexA = this.customerNeedList.findIndex((item) => item.dd_key === a);
          const indexB = this.customerNeedList.findIndex((item) => item.dd_key === b);
          return indexA - indexB; // 按照初始化数组的顺序排序
        });
        // 要检查的值数组
        var exclusive = ["01", "10"];
        // 检查 selectedKeys 是否包含 value 中的任意一项
        const containsValue = exclusive.some((val) => selectedKeys.includes(val));
        this.customerNeedList.forEach((item) => {
          if (containsValue) {
            // 如果包含，禁用其他项
            item.disabled = !selectedKeys.includes(item.dd_key); // 只有在 selectedKeys 中的项不禁用
          } else {
            // 如果不包含，禁用 value 中的项
            item.disabled = exclusive.includes(item.dd_key); // value 中的项禁用
          }
        });
      } else {
        this.customerNeedList.forEach((item) => {
          item.disabled = false; // 添加 disabled 属性并设置为 false
          item.selected = false; // 添加 selected 属性并设置为 false
        });
      }
    },




    // 获取电话列表
    getmobileList(activityid) {
      let _this = this;
      getData("post", my_url + "/crm/activity/getActivityMobileList.do", function (data) {
        if (data.code == 0) {
          var mobilelist = [];
          data.moibleList.forEach(function (item) {
            mobilelist.push({
              phone: item,
            });
          });
          _this.mobileList = mobilelist;
        }
      },
        {
          activityid: activityid,
        }
      );
    },
    // 添加电话号码
    mobileAdd() {
      var _this = this;
      var addMoblieStr = _this.addMoblie;
      getData("post", my_url + "/crm/activity/activityAddMobile.do", function (data) {
        if (data.code == "0") {
          _this.getmobileList(_this.detailsInfo.activityserialno);
          _this.$message({
            type: "success",
            duration: 3000,
            message: "添加成功！",
          });
          _this.addMoblie = "";
        } else {
          _this.$message({
            type: "success",
            duration: 3000,
            message: data.msg,
          });
        }
      },
        {
          activityid: this.detailsInfo.activityserialno,
          mobile: this.addMoblie,
        }
      );
    },

    // 更改input 中的电话号码
    addMoblieChange(val) {
      if (checkMobile(val)) {
        this.mobileInputShow = true;
      } else {
        this.mobileInputShow = false;
      }
    },

    // 取消添加电话号码
    mobileCancle() {
      this.addMoblie = "";
      this.mobileInputShow = false;
    },

    // 删除已经添加的电话号码
    mobileDelete(scope) {
      let _this = this;
      _this.deleteMobile = scope.row.phone;
      getData("post", my_url + "/crm/activity/activityDeleteMobile.do", function (data) {
        if (data.code == "0") {
          _this.getmobileList(_this.detailsInfo.activityserialno);
          _this.$message({
            type: "success",
            duration: 3000,
            message: "删除成功！",
          });
        } else {
          _this.$message({
            type: "success",
            duration: 3000,
            message: data.msg,
          });
        }
      },
        {
          activityid: this.detailsInfo.activityserialno,
          mobile: this.deleteMobile,
        }
      );
    },

    // 置顶已经添加的号码
    mobileToTop(scope) {
      let _this = this;
      getData("post", my_url + "/crm/activity/activityUpdateMobile.do", function (data) {
        if (data.code == "0") {
          _this.getmobileList(_this.detailsInfo.activityserialno);
          _this.$message({
            type: "success",
            duration: 3000,
            message: "置顶成功！",
          });

          _this.detailsInfo.mobilestr = scope.row.phone;
        } else {
          _this.$message({
            type: "success",
            duration: 3000,
            message: data.msg,
          });
        }
      },
        {
          activityid: this.detailsInfo.activityserialno,
          mobile: scope.row.phone,
          // mobile:18611158884
        }
      );
    },


    // 打开推广页面
    disPageUrl(row) {
      if (row.pageurl != null && row.pageurl != "") {
        window.open(row.pageurl, "_blank", "width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no");
      } else if (row.channel == "0004" && row.pagetype == "1yuango/0001") {
        window.open(crm_url + "insure.meihualife.com/life/activity/oneyuangodis.do", "_blank", "width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no");
      } else {
        window.open(
          crm_url + "insure.meihualife.com/life/activity/channelActivity.do?channelCode=" + row.channel + "&pageType=" + row.pagetype + "&planId=" + row.planid,
          "_blank",
          "width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no"
        );
      }
    },

    // 

    // 播放通话录音
    audioPlay(index) {
      let _this = this;
      let audio = this.$refs.audio;
      this.currentCallIndex = index;
      this.audioSrc = this.callDataList[index].recordurl;
      this.$nextTick(() => {
        audio.play();
        _this.audioShow = true;
        _this.audioPaused = false;
      });
    },
    // 暂停播放录音
    audioPause(index) {
      let _this = this;
      let audio = this.$refs.audio;
      this.currentCallIndex = index;
      this.$nextTick(() => {
        audio.pause();
        _this.audioPaused = true;
      });
    },


    //获取跟进记录列表
    getReleaseData() {
      let _this = this;
      let params = {
        activityserialno: this.detailsInfo.activityserialno,
      };
      getData("post", my_url + "/crm/activity/getRemarkList.do", function (data) {
        let { total, rows } = data;
        _this.releaseNum = rows.length;
        rows.forEach((res) => {
          res.name = _this.detailsInfo.name;
          // res.makedate = _this.formatDate(res.makedate, 'yyyy-MM-dd HH:ss:mm');
          res.remark = res.remark.replace(/:/g, "：");
          if (res.remark.indexOf("{") > -1 && res.remark.indexOf("}") > -1) {
            let str = "";
            let remark = JSON.parse(res.remark);
            for (let key in remark) {
              str += key + "：" + remark[key] + "<br/>";
            }
            res.remark = str;
          }
        });
        _this.records = rows;

      }, params);
    },

    // 提交跟进记录
    release() {
      let _this = this;
      let arr = [],
        remarkStr = "";
      this.followrecord.split("\n").forEach((item) => arr.push(`<p>${item.trim()}</p>`));
      remarkStr = arr.join("");
      let params = {
        remark: remarkStr,
        activityserialno: this.detailsInfo.activityserialno,
      };
      getData("post", my_url + "/crm/activity/activityRemark.do", function (data) {
        //团队
        _this.followrecord = "";
        if (data.code == 0) {
          _this.$message({
            showClose: true,
            message: "发布成功!",
            duration: 3000,
            type: "success",
          });
          _this.getReleaseData();
        } else {
          _this.$message({
            showClose: true,
            message: data.msg,
            duration: 3000,
            type: "error",
          });
        }
      },
        params
      );
    },

    // 跟进记录取消
    cancel() {
      this.followrecord = "";
    },

    // 删除跟进记录
    deleteRemark(id) {
      let _this = this;
      let params = {
        remarkid: id,
      };
      getData("post", my_url + "/crm/activity/activityRemarkDelete.do", function (data) {
        if (data.code == 0) {
          _this.$message({
            showClose: true,
            message: "删除成功!",
            duration: 3000,
            type: "success",
          });
          _this.getReleaseData();
        } else {
          _this.$message({
            showClose: true,
            message: data.msg,
            duration: 3000,
            type: "error",
          });
        }
      }, params);
    },

    // 置顶跟进记录
    remarktop(id) {
      var _this = this;
      getData("post", my_url + "/crm/activity/setRemarkTop.do", function (data) {
        if (data.code == "0") {
          _this.$message({
            showClose: true,
            message: "跟进记录置顶成功！",
            duration: 3000,
            type: "success",
          });

          _this.getReleaseData();
        }
      },
        {
          activityid: id,
        }
      );
    },







    phonecall_page() {
      if (this.dis_save == true) {
        this.$parent.onSend({
          mobile: this.detailsInfo.mobilestr,
          activityid: this.detailsInfo.activityserialno,
        });
      }
    },



    phonecall(activityid, phoneStr) {
      // phonecall_page(activityid, phoneStr) {
      let _this = this;
      let params = {
        // activityserialno: "00000000000001315597",
        // mobile: "18736871304",
        activityserialno: activityid,
        mobile: phoneStr,
      };
      getData("post", my_url + "/crm/activity/activityCall.do", function (data) {
        if (data.code == 0) {
          _this.search(1);
          if (_this.iscall == "Y") {
            let params = {
              Action: "DialCTI",
              dn: data.phoneno,
              anis: data.phoneprefix + phoneStr,
              cltid: data.callid,
            };
            getPhoneData("post", "http://" + data.phoneurl + "/CRM2CTI/", function (data) { }, params);
          }
        } else {
          _this.$message({
            showClose: true,
            message: data.msg,
            duration: 3000,
            type: "error",
          });
        }
      },
        params
      );
    },




    //保存记录
    saveRecord() {
      let _this = this;

      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      if (this.customer_intention.length == 0) {
        _this.$message({
          showClose: true,
          message: "请填写客户需求!",
          duration: 3000,
          type: "error",
        });
        loading.close();
        return
      }

      let params = {
        activityserialno: this.detailsInfo.activityserialno, //线索流水号
        name: this.detailsInfo.name, //注册姓名
        mobile: this.addMoblie,
        sex: this.detailsInfo.sex,
        birthday: this.detailsInfo.birthday,
        wxno: this.detailsInfo.wxnostr,
        followupstep: this.stepsName, //跟进步骤
        customer_intention: this.customer_intention.join(","),
        previstitime: formatDate(this.returnVisit, "yyyy-MM-dd HH:mm:ss"), //预约回访时间
        oldprevistitime: formatDate(this.detailsInfo.previstitime, "yyyy-MM-dd HH:mm:ss"),
        otherstore: this.otherstoreName,
        activityuserid: this.detailsInfo.userid,
      };
      getData("get", my_url + "/crm/activity/activityUpdate.do", function (data) {
        _this.followrecord = "";
        if (data.code == 0) {
          setTimeout(() => {
            _this.$message({
              showClose: true,
              message: "保存成功!",
              duration: 3000,
              type: "success",
            });
            _this.$emit('saveEvent', "true");
            // _this.search();
          }, 1000);
        } else {
          _this.$message({
            showClose: true,
            message: data.msg,
            duration: 3000,
            type: "error",
          });
        }
        loading.close();
        _this.drawer = false;
      },
        params
      );
    },


    // 获取保单详情
    getOrderData(aa) {
      let _this = this;
      _this.detai_loading = true;
      getData("post", my_url + "/crm/activity/getPolicyInfoByAppntMobile.do", function (data) {
        if (data.code == "0") {
          console.log(data)
          var arr = [];
          data.policyList.forEach((item) => {
            if (item.status === "effective") {
              arr.unshift(item);
            } else {
              arr.push(item);
            }
          });
          _this.policyList = arr;
          _this.detai_loading = false;
        }
      }, { mobile: aa }
      );
    },


    // 
    //点击成交单子，查看详情
    showEdit(item) {
      var arr = [];
      arr.push(item);
      this.detailObj = arr;
      this.showEditPopupDialogVisible = true;
    },
    updateVisibleId(e) {
      this.showEditPopupDialogVisible = e;
    },















    // 侧拉

    //点击客户姓名 展示详细信息
    // handle(row) {
    //   let _this = this;
    //   this.drawer = true;
    //   this.cjgList = [];
    //   this.cjgTitle = "";

    // if (this.queryflagString == "01" || this.queryflagString == "03") {
    //   this.dis_save = true;
    //   if (this.iscall == "Y") {
    //     this.sipmobilestr = "javascript:void(0);";
    //   } else {
    //     this.sipmobilestr = "sip:0" + row.mobilestr;
    //   }
    // } else if (this.queryflagString == "02") {
    //   this.dis_save = false;
    //   this.sipmobilestr = "javascript:void(0);";
    // }

    // if (this.queryflagString == "01") {
    //   this.delRemark = true;
    // } else {
    //   this.delRemark = false;
    // }
    //   this.customer_intention = row.customer_intention != undefined ? row.customer_intention.split(",") : "";
    //   this.handleChange(this.customer_intention);
    //   row.username = row.username != undefined ? row.username : "无";
    //   this.returnVisit = row.previstitime != undefined ? row.previstitime : "";
    //   this.visit = row.followupstep != undefined ? row.followupstep : "";
    //   this.wxno = row.wxno != undefined ? row.wxno : "";
    //   this.wxnostr = row.wxnostr != undefined ? row.wxnostr : "";
    //   this.age = row.age != undefined ? row.age : "";
    //   this.birthday = row.birthday != undefined ? row.birthday : "";
    //   this.sex = row.sex != undefined ? row.sex : "";
    //   this.email = row.email != undefined ? row.email : "";

    //   this.mobileprovince = row.mobileprovince != undefined ? row.mobileprovince : "";
    //   this.mobilecity = row.mobilecity != undefined ? row.mobilecity : "";
    //   this.mobilecountry = row.mobilecountry != undefined ? row.mobilecountry : "";
    //   this.address = row.address != undefined ? row.address : "";
    //   this.idoverage = row.idoverage != undefined ? row.idoverage : "";
    //   this.ispeer = row.ispeer != undefined ? row.ispeer : "";
    //   this.isvacantnumber = row.isvacantnumber != undefined ? row.isvacantnumber : "";
    //   this.idoverageActived = row.idoverage != undefined ? row.idoverage === "Y" : "";
    //   this.peerActived = row.ispeer != undefined ? row.ispeer === "Y" : "";
    //   this.vacantnumberActived = row.isvacantnumber != undefined ? row.isvacantnumber === "Y" : "";
    //   this.activitytags = this.customers;
    //   this.detailsInfo = row;
    //   this.mobilestr = row.mobilestr;
    //   this.getReleaseData(); //发布的列表
    //   this.getCallData();
    //   this.getmobileList(row.activityserialno);

    //   this.editInfo.shareusername = row.shareusername;
    //   this.editInfo.otherstore = row.otherstore;
    //   this.adLabelselect = row.activitytag || "06";
    //   if (row.followupstep == "07") {
    //     this.getOrderData();
    //   }

    //   if (this.queryflagString == "01" || this.queryflagString == "03") {
    //     this.detailsInfo.mobilestr = row.mobilestr;
    //     this.detailsInfo.wxno = row.wxno;
    //     this.detailsInfo.wxnostr = row.wxnostr;
    //   } else if (this.queryflagString == "02") {
    //     this.detailsInfo.mobilestr = row.mobilestr;
    //     this.detailsInfo.wxnostr = row.wxnostr;
    //   }

    //   //已成交处理
    //   this.isDealed = row.followupstep == "07";
    // },

    //点击成交单子，查看详情
    showEdit(item) {
      var arr = [];
      arr.push(item);
      this.detailObj = arr;
      this.showEditPopupDialogVisible = true;
    },

    phonecall_row(row) {
      this.$parent.onSend({
        mobile: row.mobilestr,
        activityid: row.activityserialno,
      });
    },

    phonecall(activityid, phoneStr) {
      let _this = this;
      let params = {
        activityserialno: activityid,
        mobile: phoneStr,
      };
      getData("post", my_url + "/crm/activity/activityCall.do", function (data) {
        if (data.code == 0) {
          _this.search(1);
          if (_this.iscall == "Y") {
            let params = {
              Action: "DialCTI",
              dn: data.phoneno,
              anis: data.phoneprefix + phoneStr,
              cltid: data.callid,
            };
            getPhoneData("post", "http://" + data.phoneurl + "/CRM2CTI/", function (data) { }, params);
          }
        } else {
          _this.$message({
            showClose: true,
            message: data.msg,
            duration: 3000,
            type: "error",
          });
        }
      },
        params
      );
    },




    clickIdoverage() {
      //点击转超龄客户
      if (this.idoverage == "Y") {
        this.idoverage = "N";
      } else {
        this.idoverage = "Y";
        this.ispeer = "N";
        this.isvacantnumber = "N";
        this.dialogVisible = true;
      }
    },
    clickIspeer() {
      //点击转同行资源
      if (this.ispeer == "Y") {
        this.ispeer = "N";
      } else {
        this.ispeer = "Y";
        this.idoverage = "N";
        this.isvacantnumber = "N";
        this.dialogVisible = true;
      }
    },
    clickIsvacantnumbe() {
      //点击转空号停机
      if (this.isvacantnumber == "Y") {
        this.isvacantnumber = "N";
      } else {
        this.isvacantnumber = "Y";
        this.ispeer = "N";
        this.idoverage = "N";
        this.dialogVisible = true;
      }
    },


    // 
    remoteMethod(query) {
      let _this = this;
      if (query !== "") {
        this.loading = true;
        this.cjgList = [];
        let body = {
          title: query,
        };
        getData(
          "post",
          my_url + "/crm/knowledge/getKnowledgeList.do",
          function (data) {

            _this.loading = false;
            data.rows.forEach((item) => {
              _this.cjgList.push({
                value: item.baseid,
                baseid: item.baseid,
                label: "【" + item.typename + "】" + item.title,
                type: item.type,
                typename: item.typename,
              });
            });
          },
          body
        );
      } else {
        this.cjgList = [];
      }
    },




    getCallData() {
      let _this = this;
      let params = {
        activityserialno: this.detailsInfo.activityserialno,
      };
      getData(
        "post",
        my_url + "/crm/activity/getCallList.do",
        function (data) {
          if (data.code == "0") {
            let arr = data.callList.map((item) => {
              var calltimeType = item.calltime.replace(/-|:|_|\s/g, "");
              return Object.assign({}, item, {
                calltimeType: calltimeType,
              });
            });
            _this.callDataList = arr;
            _this.callSum = data.callSum;
          }
        },
        params
      );
    },
    top(row) {
      let _this = this;
      let params = {
        activityserialno: row.activityserialno,
      };
      getData(
        "post",
        my_url + "/crm/activity/setActivityTopOrder.do",
        function (data) {
          if (data.code == "0") {
            _this.search(1);
          }
        },
        params
      );
    },
    cancelTop(row) {
      let _this = this;
      let params = {
        activityserialno: row.activityserialno,
      };
      getData(
        "post",
        my_url + "/crm/activity/unSetActivityTopOrder.do",
        function (data) {
          if (data.code == "0") {
            _this.search(1);
          }
        },
        params
      );
    },




    cancelShare(row) {
      let _this = this;
      getData("post", my_url + "/crm/activity/activityShareDelete.do", function (data) {
        //渠道类型
        if (data.code == "0") {
          _this.search();
        }
      },
        {
          shareserialno: row.shareserialno,
        }
      );
    },

    channelChange(value) {
      // 如果选中的值是没有子节点的选项，保持当前选中的值
      const selectedOption = this.findOptionById(this.channelSource, value[value.length - 1]);
      if (selectedOption && !selectedOption.child) {
        this.channelSourceValue = value; // 保持当前选中的值
        if (value.length == 2) {
          this.channelSourceValue[1] = selectedOption.label;
        }
      }
    },


  },
};
</script>
<style src="../../static/css/drawer.css"></style>
<style>
.customer-drawer .el-drawer__body {
  display: flex;
}
</style>


<style scoped>
.AIRemake {
  height: 50%;
  border-bottom: 1px solid  #D8D8D8;
  overflow: hidden;
}
.templateAI {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* text-align: center; */
  color: #2c3e50;
}

.chat-gpt .chat-gpt-right .chat-area {
  margin-bottom: 1.3rem;
}
</style>
