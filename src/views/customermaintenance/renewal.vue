<template>
  <div style=" width: 17.1rem;">
    <div class="search-header">
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title  filtitle">{{ add_Renewal }}</div>
          <div class="select-content filContent">
            <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="daterange" align="right" size="mini" value-format="yyyy-MM-dd " unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title  filtitle">保单号</div>
          <div class="select-content  filContent">
            <el-input class="el-input-inners" v-model="contno" align="right" size="mini" placeholder="请输入保单号" clearable></el-input>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title  filtitle">{{ add_state }}</div>
          <div class="select-content filContent">
            <el-select v-model="policyStatus" clearable size="mini" placeholder="请选择状态" class="el-select-inners" @change="ChangePolicyStatus">
              <el-option v-for="(item, index) in policyStatusList" :key="index" :label="item.dd_value" :value="item.dd_key"> </el-option>
            </el-select>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title  filtitle">保险公司</div>
          <div class="select-content  filContent">
            <el-autocomplete class="el-input-inners" v-model="insorganName" :trigger-on-focus="false" :fetch-suggestions="querySearch" size="mini" placeholder="请输入选择保险公司" @select="insorganNameSelect" @blur="xiaochu" clearable></el-autocomplete>
          </div>
        </div>

        <div class="common-select">
          <div v-if="CJGselectValue == '续期保单'" class="select-title  filtitle">险种名称</div>

          <div class="select-title  filtitle" v-if="CJGselectValue == '续保保单'">
            <el-select class="el-input-title-inners" v-model="mainriskName" placeholder="请选择" size="mini">
              <el-option label="险种名称" value="险种名称"></el-option>
              <el-option label="续保险种名称" value="续保险种名称"></el-option>
            </el-select>
          </div>

          <div class="select-content filContent">
            <el-select v-model="mainriskcode" size="mini" clearable placeholder="请选择" popper-class="xianSelect" @change="inmainriskSelect" class="el-select-inners">
              <el-option v-for="(item, index) in productList" :key="index" :label="item.dd_value" :value="item.dd_key"> </el-option>
            </el-select>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title  filtitle">客户姓名</div>
          <div class="select-content  filContent">
            <el-input class="el-input-inners" v-model="cusname" align="right" size="mini" placeholder="请输入客户姓名" clearable></el-input>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title  filtitle">
            <el-select class="el-input-title-inners" v-model="cusmobile" placeholder="请选择" size="mini">
              <el-option label="电话号码" value="电话号码"></el-option>
              <el-option label="微信号" value="微信号"></el-option>
            </el-select>
          </div>
          <div class="select-content  filContent">
            <el-input class="el-input-inners" v-model="cusMobileWxno" align="right" size="mini" placeholder="请输入电话号码" clearable></el-input>
          </div>
        </div>
        <div class="common-select" v-if="CJGselectValue == '续期保单'">
          <div class="select-title  filtitle">保单年度</div>
          <div class="select-content  filContent">
            <el-input class="el-input-inners" v-model="policyyear" align="right" size="mini" placeholder="请输入保单年度" clearable></el-input>
          </div>
        </div>

        <div class="common-select" v-if="CJGselectValue == '续保保单'">
          <div class="select-title  filtitle">
            <el-select class="el-input-title-inners" v-model="cusplanid" placeholder="请选择" size="mini">
              <el-option label="批次号" value="批次号"></el-option>
              <el-option label="渠道类型" value="渠道类型"></el-option>
              <el-option label="广告计划ID" value="广告计划ID"></el-option>
            </el-select>
          </div>
          <div class="select-content  filContent">
            <el-input class="el-input-inners" v-model="cusplanidBatchno" align="right" size="mini"  placeholder="请输入" clearable></el-input>
          </div>
        </div>

        <div class="common-select" style=" width: 4%">
          <div class="search-btn searchLeft" @click="search(1)">搜索</div>
          <div class="search-btn" style="background: #fff; color: #dc220d; border: 1px solid rgba(216, 216, 216, 1);display: none;" @click="screenReset">重置</div>
        </div>
      </div>
    </div>

    <ren-insure v-if="CJGselectValue == '续期保单'" :dataRen="tableData" @isshowEditPopup="showEditPopup"> </ren-insure>
    <renewal-bao v-if="CJGselectValue == '续保保单'" :dataRen="tableData" @isshowEditPopup="showEditPopup"> </renewal-bao>

    <div style="margin-top: 20px">
      <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize" :current-page="pageNum" @current-change="pageClick">
      </el-pagination>
    </div>

    <!-- 查看详情弹窗 -->
    <view-details :datas="detailObj" :showEditPopupDialogVisible="showEditPopupDialogVisible" @updateVisible="updateVisibleId"></view-details>
  </div>
</template>
<script>
import renewalBao from "../../components/renewalTable/renewalBao.vue";
import renInsure from "../../components/renewalTable/renInsure.vue";
import viewDetails from "../../components/viewDetails.vue";
import moment from "../../static/js/moment.js";
import { getData, my_url, crm_url } from "../../static/js/ajax.js";
import { formatDate } from "../../static/js/common.js";
export default {
  components: {
    viewDetails,
    renInsure,
    renewalBao,
  },
  data() {
    return {
      //菜单
      CJGselectValue: "续期保单",
      add_Renewal: "应收日期",
      add_state: "续期状态",
      //表格参数
      tableData: [],
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      loading: false,
      //筛选查询
      insorganName: "", //选中保险公司
      SalesmanBox: [], //所有保险公司
      productList: [], //所有险种
      mainriskcode: "", //选中的险种名称
      mainriskName: "险种名称", //原险种名称  续险种名称
      selectTime: [], //出单日期
      contno: "", //保单号
      policyStatus: "", //保单状态
      policyStatusList: "", //保单状态列表
      policyyear: "", //保单年度
      cusmobile: "电话号码", //显示的电话号码
      cusMobileWxno: "", //客户电话号码或者微信值
      cusname: "", //客户姓名
      cusplanid: "批次号", //广告计划ID
      cusplanidBatchno: "", //广告计划ID，渠道类型，批次号的值
      // fuName: '业务员姓名',
      // yefuName: '',
      //选择团队，和业务人员
      checkedAll: false,
      checkedAllNum: 0,

      //修改的唯一字符
      state: "",
      contserialno: "",
      appntserialno: "",
      insuredserialno: "",
      riskserialno: "",
      ismain: "",
      editmainriskcode: "",
      oldpolicyno: "",

      //查看编辑弹窗
      showEditPopupDialogVisible: false,
      restaurants: [], //所有业务员
      visitstateList: [], //回访状态列表
      detailObj: {},

      //修改投保人
      editName: "",
      editSex: "",
      editBirthdy: "",
      editprovincename: "",
      editcityname: "",
      editcountryname: "",
      editAddress: "",
      editSexList: [
        {
          dd_value: "男",
          dd_key: "0",
        },
        {
          dd_value: "女",
          dd_key: "1",
        },
      ],
      //修改被保人
      editRelatoapp: "",
      editinName: "",
      editinSex: "",
      editinBirthdy: "",
      editinsprovincename: "",
      editinscityname: "",
      editinscountryname: "",
      editinAddress: "",
      visitstateList: [], //回访状态列表
      editvisitstate: "", //回访状态
      iscall: "N",
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            onClick(picker) {
              const end = new Date(formatDate(new Date(), "yyyy-MM-dd"));
              const start = new Date(formatDate(new Date(), "yyyy-MM-dd"));
              end.setTime(end.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "昨日",
            onClick(picker) {
              const end = new Date(formatDate(new Date(), "yyyy-MM-dd"));
              const start = new Date(formatDate(new Date(), "yyyy-MM-dd"));
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近7天",
            onClick(picker) {
              const end = new Date(formatDate(new Date(), "yyyy-MM-dd"));
              const start = new Date(formatDate(new Date(), "yyyy-MM-dd"));
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近30天",
            onClick(picker) {
              const end = new Date(formatDate(new Date(), "yyyy-MM-dd"));
              const start = new Date(formatDate(new Date(), "yyyy-MM-dd"));
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "本周",
            onClick(picker) {
              var now = new Date(); // 当前日期
              var nowDayOfWeek = now.getDay(); // 今天本周的第几天
              var nowDay = now.getDate(); // 当前日
              var nowMonth = now.getMonth(); // 当前月
              var nowYear = now.getYear(); // 当前年
              nowYear += nowYear < 2000 ? 1900 : 0;
              var day = nowDayOfWeek || 7;
              const start = new Date(now.getFullYear(), nowMonth, nowDay - day);
              const end = new Date(now.getFullYear(), nowMonth, nowDay + 6 - day);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "本月",
            onClick(picker) {
              var now = new Date(); // 当前日期
              var nowMonth = now.getMonth(); // 当前月
              var nowYear = now.getYear(); // 当前年
              nowYear += nowYear < 2000 ? 1900 : 0;
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
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  created() {
    var val = this.$route.query.type || "01";
    if (val == "01") {
      this.abpolisystate(); //续期状态
      this.CJGselectValue = "续期保单";
      this.selectTime = [moment().subtract(60, "days").format("YYYY-MM-DD "), moment().add("years", 1).format("YYYY-MM-DD ")];
    } else if (val == "02") {
      this.CJGselectValue = "续保保单";
      this.add_Renewal = "保单截至日";
      this.add_state = "续保状态";
      this.policyStatusList = "";
      this.policyStatus = "";
      this.selectTime = [moment().subtract(30, "days").format("YYYY-MM-DD "), moment().add(30, "days").format("YYYY-MM-DD ")];
      this.xubaostate();
    }
  },
  mounted: function () {
    this.yewu(); //所有业务员姓名
    this.insrevisitstate(); //回访状态
    this.$nextTick(() => {
      //数据字典
      this.insOrganList(); //所有保险公司
    });
    this.getIsCall();
    this.search(1); //搜索
  },
  methods: {
    //回访状态
    insrevisitstate() {
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        (data) => {
          if (data.code == 0) {
            this.visitstateList = data.dictList;
          }
        },
        {
          dict_type: "insrevisitstate",
        }
      );
    },
    //续期状态
    abpolisystate() {
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        (data) => {
          if (data.code == 0) {
            this.policyStatusList = data.dictList;
          }
        },
        {
          dict_type: "renewstate",
        }
      );
    },
    //续保状态
    xubaostate() {
      var _this = this;
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          if (data.code == 0) {
            _this.policyStatusList = data.dictList;
          }
        },
        {
          dict_type: "xubaostate",
        }
      );
    },
    //当表格的排序条件发生变化的时候会触发该事件
    sortChange(val) {
      this.order = val.order;
      this.prop = val.prop;
      this.search(1);
    },
    //当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.checkedAllNum = val.length;
    },

    //所有的保险公司  /crm/common/getAllRiskList.do
    createFilter(queryString) {
      return (SalesmanBox) => {
        return SalesmanBox.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
      };
    },
    querySearch(queryString, cb) {
      var SalesmanBox = this.SalesmanBox;
      var results = queryString ? SalesmanBox.filter(this.createFilter(queryString)) : SalesmanBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    insOrganList() {
      let _this = this;
      getData(
        "post",
        my_url + "/crm/common/getInsOrganList.do",
        function (data) {
          if (data.code == 0) {
            _this.SalesmanBox = [];
            let nameList = data.dictList;
            nameList.forEach((res) => {
              _this.SalesmanBox.push({
                value: res.dd_value,
                key: res.dd_key,
              });
            });
          }
        },
        {}
      );
    },
    //选择保险公司 + 显示旗下险种
    insorganNameSelect(item) {
      this.insorgancode = item.key;
      let body = {
        insorgancode: item.key,
      };
      let _this = this;
      getData(
        "post",
        my_url + "/crm/common/getRiskList.do",
        function (data) {
          if (data.code == 0) {
            _this.productList = [];
            _this.productList = data.dictList;
            // nameList.forEach(res => {
            //   _this.productList.push({
            //     "value": res.dd_value,
            //     "key": res.dd_key
            //   });
            // })
          }
        },
        body
      );
    },
    xiaochu() {
      if (this.insorganName == "") {
        this.insorganName = "";
        this.insorgancode = "";
      }
    },
    //保险公司所带的保险产品
    createFilter1(queryString) {
      return (SalesmanBox) => {
        return SalesmanBox.dd_value.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
      };
    },
    querySearch1(queryString, cb) {
      var SalesmanBox = this.productList;
      var results = queryString ? SalesmanBox.filter(this.createFilter1(queryString)) : SalesmanBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    //选择险种， 显示缴费方式
    inmainriskSelect(item) {
      this.riskcode = item;
    },

    // 筛选查询保单
    search(page) {
      this.loading = true;
      var cusmobile,
        cuswxno = "";
      if (this.cusmobile == "电话号码") {
        cusmobile = this.cusMobileWxno.trim();
      } else {
        cuswxno = this.cusMobileWxno;
      }
      var planidValue,
        batchnoValue,
        channelValue = "";
      if (this.cusplanid == "批次号") {
        batchnoValue = this.cusplanidBatchno;
      } else if (this.cusplanid == "渠道类型") {
        channelValue = this.cusplanidBatchno;
      } else {
        planidValue = this.cusplanidBatchno;
      }


      if (this.selectTime == null || this.selectTime == "") {
        this.selectTime = ["", ""];
      }
      var policyStatus = "";
      if (this.policyStatus == "40") {
        policyStatus = "80','81','82','40";
      } else {
        policyStatus = this.policyStatus;
      }
      getData("post", my_url + "/crm/auth/getToken.do", (data) => {
        if (data.code == 0) {
          var _this = this;
          var tabData = {
            token: data.token,
            renewStartDate: this.selectTime[0],
            renewEndDate: this.selectTime[1],
            contno: this.contno.trim(),
            insorgancode: this.insorgancode,
            riskcode: this.riskcode,
            cusname: this.cusname,
            cusmobile: cusmobile.trim(),
            wxno: cuswxno,
            policyyear: this.policyyear,
            pageNumber: page,
            pageSize: this.pageSize,
            // "state": "40','70','73','74"
          };

          var xbtabData = {
            token: data.token,
            acceptStartDate: this.getYMDHMS(new Date(this.selectTime[0]).setFullYear(new Date(this.selectTime[0]).getFullYear() - 1)),
            acceptEndDate: this.getYMDHMS(new Date(this.selectTime[1]).setFullYear(new Date(this.selectTime[1]).getFullYear() - 1)),
            commoncontno: this.contno.trim(),
            insorgancode: this.insorgancode,
            riskcode: this.riskcode,
            xbriskcode: this.riskcode,
            cusname: this.cusname,
            cusmobile: cusmobile.trim(),
            wxno: cuswxno,
            planserialno: planidValue,
            batchno: batchnoValue,
            channel: channelValue,

            pageNumber: page,
            pageSize: this.pageSize,
          };
          if (_this.CJGselectValue == "续期保单") {
            for (var key in tabData) {
              if (tabData[key] == tabData["xbstate"]) {
                delete tabData[key];
              }
            }
            tabData["restate"] = policyStatus;

            getData(
              "post",
              crm_url + "insure.meihualife.com/crm_web/getRenewalPolicy.do",
              (data) => {
                _this.tableData = data.rows;
                _this.pageTotal = data.total;
                _this.loading = false;
              },
              tabData
            );
          } else if (_this.CJGselectValue == "续保保单") {
            for (var key in xbtabData) {
              if (xbtabData[key] == xbtabData["restate"]) {
                delete xbtabData[key];
              }
            }
            xbtabData["xbstate"] = policyStatus;
            if (this.mainriskName == "险种名称") {
              xbtabData.riskcode = this.riskcode;
              xbtabData.xbriskcode = "";
            } else {
              xbtabData.xbriskcode = this.riskcode;
              xbtabData.riskcode = "";
            }
            getData(
              "get",
              crm_url + "insure.meihualife.com/crm_web/getXbPolicy.do",
              (data) => {
                var list = data.rows;
                for (var i = 0; i < list.length; i++) {
                  var Deadline = this.getYMDHMS(new Date(list[i].cvalidate).setFullYear(new Date(list[i].cvalidate).getFullYear() + 1));
                  // 假设我们有一个日期：2023-04-01
                  var originalDate = new Date(Deadline);
                  // 减去一天
                  originalDate.setDate(originalDate.getDate() - 1);
                  originalDate = new Date(originalDate).Format("yyyy-MM-dd");
                  list[i]['originalDate'] = originalDate;
                }
                _this.tableData = list;
                _this.pageTotal = data.total;
                _this.loading = false;
              },
              xbtabData
            );
          }
        }
      });
    },

    getYMDHMS(timestamp) {
      if (isNaN(timestamp)) {
        return "";
      }
      let time = new Date(timestamp);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      let hours = time.getHours();
      let minute = time.getMinutes();
      let second = time.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      return year + "-" + month + "-" + date;
      // return year + "-" + month + "-" + date + " " + hours + ":" + minute + ":" + second;
    },

    ChangePolicyStatus() {
      this.search(1);
    },
    screenReset() {
      this.insorganName = "";
      this.insorgancode = "";
      this.mainriskcode = "";
      this.riskcode = "";
      this.selectTime = "";
      this.contno = "";
      this.cusMobileWxno = "";
      this.cusname = "";
      this.cusplanidBatchno = "";
      this.policyyear = "";

      this.policyStatus = "";
      this.search(1);
    },

    //查看详情
    showEditPopup(item) {
      let _this = this;
      getData("post", my_url + "/crm/auth/getToken.do", (data) => {
        if (data.code == 0) {
          if (item.xbcontno) {
            var body = {
              token: data.token,
              contno: item.xbcontno,
            };
          } else {
            var body = {
              token: data.token,
              contno: item.contno,
            };
          }

          getData(
            "post",
            crm_url + "insure.meihualife.com/crm_web/getOnePolicy.do",
            (data) => {
              _this.detailObj = data.rows;
              if (item.xbcontno) {
                if (item.xbcontno == data.rows[0].contno) {
                  _this.detailObj[0].xbcontno = item.contno;
                  _this.detailObj[0].xbpaytime = _this.getYMDHMS(new Date(item.accepttime).setFullYear(new Date(item.accepttime).getFullYear() - 1));
                  _this.detailObj[0].xbprem = item.prem;


                }
              }
            },
            body
          );
        }
      });
      this.showEditPopupDialogVisible = true;
    },
    updateVisibleId(e) {
      this.showEditPopupDialogVisible = e;
    },
    //所有业务员
    yewu() {
      let _this = this;
      getData("post", my_url + "/crm/auth/getAllUserIdNameList.do", function (data) {
        if (data.code == 0) {
          let nameList = data.namelist;
          nameList.forEach((res) => {
            _this.restaurants.push({
              userid: res.userid,
              value: res.username,
            });
          });
        }
      });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      cb(results);
    },
    createStateFilter(queryString) {
      return (state) => {
        return state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    userNameSelect(item) { },
    //跳转页数
    pageClick(page) {
      this.pageNum = page;
      this.search(page);
    },

    //打开编辑弹窗
    EditPopup(item) {
      this.oldpolicyno = item.contno;
      this.state = item.state;
      this.contserialno = item.contserialno;
      this.appntserialno = item.appntserialno;
      this.insuredserialno = item.insuredserialno;
      this.riskserialno = item.riskserialno;
      this.ismain = item.ismain;
      this.editmainriskcode = item.mainriskcode;
      var aa = {
        value: item.insorganname,
        key: item.insorgancode,
      };
      this.insorganNameSelect(aa);
      this.inmainriskSelect(item.riskcode);
      this.addNoticeDialogVisible = true;
      this.inSelectTime = item.accepttime; //出单日期
      this.incontno = item.contno; //保单号
      this.insorganNamecode = item.insorganname; //保险公司
      this.insorgancode = item.insorgancode; //保险公司代号
      this.inmainriskcode = item.riskcode; //险种名称
      this.riskcode = item.riskcode; //险种名称代号
      this.insuranceAmount = item.amnt; //保险金额
      this.paymentMethod = item.payintv; //缴费方式
      this.paymentPeriod = item.payendyearkey; //缴费年期
      this.guaranteePeriod = item.insuyearkey; //保障期限
      this.premium = item.prem; //保费
      this.applicantName = item.appname; //投保人姓名
      this.applicantPhone = item.appphone; //投保人手机号
      this.applicantType = item.appidnotype; //投保人证件类型
      this.applicantIDCard = item.appidno; //投保人证件号
      this.applicantProvince = item.appprovincename; //投保人所在省
      this.applicantProvinceCode = item.appprovince; //投保人所在省
      this.applicantCity = item.appcity; //投保人所在市
      this.applicantRegion = item.appcountry; //投保人所在区
      this.applicantAddress = item.insaddress; //投保人所在地址
      var bb = {
        value: item.appprovincename,
        key: item.appprovince,
      };
      this.provinceSelect(bb);
      this.citySelect();
      this.insuredName = item.insname; //被保人姓名
      this.insuredPhone = item.insphone; //被保人手机号
      this.insuredType = item.insidnotype; //被保人证件类型
      this.insuredIDCard = item.insidno; //被保人证件号
      this.insuredProvince = item.insprovincename; //被保人所在省
      this.insuredProvinceCode = item.insprovince; //被保人所在省
      this.insuredCity = item.inscity; //被保人所在市
      this.insuredRegion = item.inscountry; //被保人所在区
      this.insuredAddress = item.insaddress; //被保人所在地址
      var cc = {
        value: item.insprovincename,
        key: item.insprovince,
      };
      this.inprovinceSelect(cc);
      this.incitySelect();
      this.orderid = item.orderid; //唯一的保单id
      if (item.relatoapp == "00") {
        this.inpeople = "是";
        this.relatoapp = "00";
        this.ispeople = false;
      } else {
        this.inpeople = "否";
        this.relatoapp = item.relatoapp; //不是本人
        this.ispeople = true;
      }
      this.editPopupVisible = true;
    },
    //删除数据
    deleteItem(item) {
      var _this = this;
      getData("post", my_url + "/crm/auth/getToken.do", (data) => {
        if (data.code == 0) {
          var body = {
            token: data.token,
            orderid: item.orderid,
          };
          getData(
            "post",
            crm_url + "insure.meihualife.com/crm_web/lifePolicyDelete.do",
            (data) => {
              if (data.code == 0) {
                this.$message({
                  showClose: true,
                  message: "保单已经删除",
                  duration: 3000,
                  type: "success",
                });
                _this.search(1);
              }
            },
            body
          );
        }
      });
    },
    getIsCall() {
      let _this = this;
      getData(
        "post",
        my_url + "/crm/common/getIsCall.do",
        function (data) {
          //渠道类型
          if (data.code == 0) {
            _this.iscall = data.iscall;
          }
        },
        null
      );
    },
    // 打电话
    phonecall_row(row) {
      this.$parent.onSend({ mobile: row.appphone, activityid: row.appntserialno });
    },
    phonecall(activityid, phoneStr) {
      let _this = this;
      let params = { activityserialno: activityid, mobile: phoneStr };
      getData(
        "post",
        my_url + "/crm/activity/activityCall.do",
        function (data) {
          if (data.code == 0) {
            _this.search();
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
  },
};
</script>
