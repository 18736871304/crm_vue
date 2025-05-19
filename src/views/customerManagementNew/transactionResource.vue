<template>
  <div class="customerManagementNew Container">
    <div class="container-top">
      <!-- 信息检索 -->
      <div class="container-top-two" style="overflow-x: auto; overflow-y: hidden">
        <div class="container-search-box">
          <div class="common-select">
            <div class="select-title filtitle">线索产生时间</div>
            <div class="select-content filContent">
              <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="daterange" align="right" size="mini" unlink-panels range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>

          <div class="common-select" style="display: none;">
            <div class="select-title filtitle">跟进步骤</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="activeName" size="mini" placeholder="请选择跟进步骤" clearable>
                <el-option v-for="(item, index) in add_steps" :key="index" :label="item.dd_value" :value="item.dd_key"> </el-option>
              </el-select>
            </div>
          </div>

          <div class="common-select">
            <div class="select-title filtitle">客户需求</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="customerIntention" size="mini" placeholder="请选择跟进步骤" clearable>
                <el-option v-for="item in customerNeedList" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key"> </el-option>
              </el-select>
            </div>
          </div>

          <div class="common-select">
            <div class="select-title filtitle">渠道/来源</div>
            <div class="select-content filContent">
              <el-cascader class="el-select-inners" popper-class="cascaderBox" @change="channelChange" v-model="channelSourceValue" :options="channelSource" :props="cascaderProps" :show-all-levels="false" collapse-tags clearable></el-cascader>
            </div>
          </div>
          <div class="common-select"> </div>

          <div class="common-select" style="width: 4%">
            <div class="my-customers" v-show="ismyUse && dis_P4_up">
              <el-checkbox size="mini" v-model="queryflag">我的客户</el-checkbox>
            </div>
          </div>

          <div class="common-select" v-show="dis_P4_up">
            <div class="select-title filtitle">选择团队</div>
            <div class="select-content filContent">
              <el-dropdown trigger="click" placement="bottom" ref="disTeam2">
                <p class="el-dropdown-inners" clearable>
                  <span>{{ teamNames2 }}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu class="" slot="dropdown">
                  <el-tree @check="handleCheckChange2" :data="teamDataList" ref="tree2" show-checkbox node-key="id" :default-expanded-keys="[1]" :props="defaultProps"> </el-tree>
                  <div class="sure-footer">
                    <div class="my-sure" style="background: #fff; color: #dc240f; border: 0.01rem solid #dc240f" @click="my_sureOne2">取消</div>
                    <div class="my-sure" @click="my_sure2">确定</div>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="common-select" v-show="dis_P4_up">
            <div class="select-title filtitle">业务员姓名</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" placeholder="请选择" size="mini" v-model="overviewForm.userid" @change="userNameChange" clearable>
                <el-option v-for="item in userNameOptions" :key="item.userid" :label="item.username" :value="item.userid"> </el-option>
              </el-select>
            </div>
          </div>

          <div class="common-select">
            <div class="select-title filtitle">客户姓名</div>
            <div class="select-content filContent">
              <el-input class="el-input-inners" v-model="Salesman" size="mini" placeholder="请输入客户姓名" clearable></el-input>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title filtitle">
              <el-select class="el-input-title-inners" v-model="phoneWxno" placeholder="请选择" size="mini">
                <el-option label="电话号码" value="电话号码"></el-option>
                <el-option label="微信号" value="微信号"></el-option>
              </el-select>
            </div>
            <div class="select-content filContent">
              <el-input class="el-input-inners" v-model="phoneWxnoValue" align="right" placeholder="请输入电话号码" size="mini" clearable></el-input>
            </div>
          </div>

          <div class="common-select" v-show="!dis_P4_up"></div>

          <div class="common-select" v-show="!dis_P4_up"></div>

          <div class="common-select" style="width: 4%">
            <div class="search-box-right">
              <div style="display: flex">
                <div class="search-btn searchLeft" @click="search(1)">搜索</div>
                <div class="search-btn" style="background: #fff; color: #dc220d; border: 1px solid rgba(216, 216, 216, 1); display: none" @click="reset">重置</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 表格内容 -->
    <div class="container-table">
      <!-- 调配资源 -->
      <div class="check-all-box" v-if="isArticle">
        <div>
          <el-checkbox v-model="checkedAll">全选</el-checkbox>
          {{ checkedAllNum }}个客户
        </div>

        <div class="container-middle-two" style="float: right">
          <!-- <div class="search-btn" @click="dataEntry" style="width:auto; padding: 0.03rem 0.08rem; display: none;">日数据录入</div> -->
          <el-popover popper-class="entry-customer-popper" class="entry-customer" placement="bottom-start" width="3.31rem" trigger="click" v-model="inputUserVisable">
            <div class="search-btn" slot="reference" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D; display: none;">客户录入
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">资源等级</div>
              <div class="select-content" style="width:2rem;border: none">
                <el-select class="el-select-inners" v-model="inputUserform.sourcelevel" placeholder="请选择资源等级">
                  <el-option label="A重疾" value="A"></el-option>
                  <el-option label="A理财" value="A+"></el-option>
                  <el-option label="B" value="B"></el-option>
                  <el-option label="C" value="C"></el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">批次号</div>
              <div class="select-content" style="width:2rem;border: none;">
                <el-select class="el-select-inners" v-model="inputUserform.batchno" placeholder="请选择批次号">
                  <el-option label="群加资源" value="群加资源"></el-option>
                  <el-option label="转介绍" value="转介绍"></el-option>
                  <el-option label="其他资源" value="其他资源"></el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">客户姓名</div>
              <div class="select-content" style="width: 2rem;">
                <el-input class="el-input-inners" v-model="inputUserform.name" size="mini" placeholder="请输入客户姓名" clearable></el-input>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">电话号码</div>
              <div class="select-content" style="width: 2rem;">
                <el-input class="el-input-inners" v-model="inputUserform.mobile" size="mini" placeholder="请输入电话号码" clearable></el-input>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">微信</div>
              <div class="select-content" style="width: 2rem;">
                <el-input class="el-input-inners" v-model="inputUserform.wxno" size="mini" placeholder="请输入微信号" clearable></el-input>
              </div>
            </div>
            <div class="sure-footer" style="padding-bottom: 0;">

              <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="inputUserCancel">取消</div>
              <div class="my-sure" @click="inputUserSubmit">确定</div>
            </div>
          </el-popover>

          <el-popover popper-class="entry-customer-popper" placement="bottom-start" width="3.31rem" trigger="click" v-model="resourceDeployVisable" @show="resourceDeployShow">
            <div class="search-btn resourceAllocation" slot="reference">资源调配</div>
            <div class="common-select">
              <div class="select-title newsalesperson">新所属业务员</div>
              <div class="select-content filContentNoborder" style="width: 2rem">
                <el-autocomplete class="el-input-inners" v-model="editInfo.shareusername" :fetch-suggestions="querySearchId" placeholder="请输入新所属业务员" :trigger-on-focus="false" @select="handleSelectId"></el-autocomplete>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title newsalesperson">新跟进步骤</div>
              <div class="select-content" style="width: 2rem; border: none">
                <el-select class="el-select-inners" v-model="resourceDeployform.followupstep" placeholder="请选择新跟进步骤">
                  <el-option v-for="item in select_steps" :label="item.dd_value" :value="item.dd_key" :key="item.dd_key"></el-option>
                </el-select>
              </div>
            </div>
            <div class="sure-footer" style="padding-bottom: 0">
              <div class="my-sure resourceCancel" @click="resourceDeployCancel">取消</div>
              <div class="my-sure" @click="resourceDeploySubmit">确定</div>
            </div>
          </el-popover>

          <el-popover popper-class="entry-customer-popper" v-show="dis_Pz_up" placement="bottom-start" width="3.31rem" trigger="click" v-model="deleteSourceVisable">
            <div class="search-btn resourceDel" slot="reference">资源删除</div>
            <div class="sure-footer" style="padding-bottom: 0">
              <div class="my-sure resourceCancel" @click="deleteSourceCancel">取消</div>
              <div class="my-sure" @click="deleteSourceSubmit">确定</div>
            </div>
          </el-popover>

        </div>
      </div>

      <!-- 表格内容 -->

      <div class="check-all-table">
        <el-table v-if="isArticle" :data="tableData" ref="multipleTable" border v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange" @sort-change="sortChange">
          <el-table-column key="1" type="selection" width="40"> </el-table-column>
          <el-table-column key="2" type="index" label="序号" fixed="left" align="center" width="60"> </el-table-column>
          <el-table-column key="7" prop="username" align="center" fixed="left" label="所属业务员" width="100" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column key="3" label="客户姓名" width="100" fixed="left" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="cursor: pointer" type="text" size="small" @click="handle(scope.row)">{{ scope.row.name || "空" }}</span>
            </template>
          </el-table-column>
          <el-table-column key="4" align="center" label="电话号码" width="140" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span class="call-a" v-if="queryflagString == '02'">{{ scope.row.mobile }}</span>
              <span class="call-a" :class="scope.row.callcount > 0 ? 'active' : ''" @click="phonecall_row(scope.row)" style="color: #8f9198" v-else>
                {{ scope.row.mobilestr }}
                <img style="margin-left: 5px" src="../../static/images/call-icon.png" /></span>
            </template>
          </el-table-column>
          <el-table-column key="5" align="center" label="微信号" width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span class="call-a" v-if="queryflagString == '02' && scope.row.wxno == null"></span>
              <span class="call-a" v-else-if="queryflagString == '02' && scope.row.wxno != ''">****</span>
              <span class="call-a" :class="scope.row.callcount > 0 ? 'active' : ''" v-else>{{ scope.row.wxnostr }}</span>
            </template>
          </el-table-column>
          <el-table-column key="6" align="center" label="跟进步骤" width="110" :show-overflow-tooltip="true">
            <template slot="header">
              <p class="source-level">
                跟进步骤
                <el-tooltip popper-class="atooltip" effect="light" placement="top">
                  <template slot="content">
                    <div>
                      <p>跟进步骤为“新资源”的线索：</p>
                      <p>A类将会在线索产生时间7天后自动回收，</p>
                      <p>A-/B+/B/B-/C/C-类每日回收</p>
                    </div>
                  </template>

                </el-tooltip>
              </p>
            </template>
            <template slot-scope="scope">
              <span class="call-a" v-if="scope.row.followupstepname">{{ scope.row.followupstepname }}</span>
              <span class="call-a" v-else>新资源</span>
            </template>
          </el-table-column>

          <el-table-column key="20" prop="customer_intentionValue" align="center" label="客户需求" width="100" :show-overflow-tooltip="true">
            <template slot="header">
              <p class="source-level">
                客户需求
                <el-tooltip popper-class="atooltip" effect="light" placement="top">
                  <template slot="content">
                    <p>1. 未知需求/联系不到不得和其他需求重复</p>
                    <p>2. 不需要不得和其他需求重复</p>
                  </template>
                  <span></span>
                </el-tooltip>
              </p>
            </template>
          </el-table-column>

          <!-- <el-table-column key="8" v-if="queryflagString === '03'" align="center" label="共享业务员" width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.shareusername }}</span>
              <img src="../../static/images/delete-icon.png" alt="" style="cursor: pointer; vertical-align: -0.02rem; margin-left: 0.03rem" @click="cancelShare(scope.row)" />
            </template>
          </el-table-column> -->

          <el-table-column key="9" prop="sex" label="性别" align="center" width="80" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column key="10" prop="sourcelevel" label="" align="center" width="110" :show-overflow-tooltip="true">
            <template slot="header">
              <p class="source-level">
                资源等级
                <el-tooltip popper-class="atooltip" effect="light" placement="top">
                  <template slot="content">
                    <p>A：实时热线资源，且线索产生时间&lt;7天</p>
                    <p>A-：热线资源，且7天&lt;线索产生时间&lt;1个月</p>
                    <p>B+：热线资源，且线索产生时间&gt;1个月</p>
                    <p>B：EXCEL导入（资源等级选择B），且分配次数=0</p>
                    <p>B-：EXCEL导入的B类资源，且0&lt;分配次数&lt;=3</p>
                    <p>C：EXCEL导入（资源等级选择C），且分配次数=0</p>
                    <p>C-：EXCEL导入的C类资源，且0&lt;分配次数&lt;=3</p>
                    <p>Z：其它所有资源（封存，不参与循环分配）</p>
                  </template>
                  <span></span>
                </el-tooltip>
              </p>
            </template>
          </el-table-column>
          <el-table-column key="11" prop="makedate" align="center" label="线索产生时间" width="160" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column key="19" prop="lastcalltime" align="center" label="最后一次拨打时间" width="160" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column key="12" v-if="dis_P4_up" prop="callcount" align="center" label="累计拨打次数" width="100" :show-overflow-tooltip="true"> </el-table-column>

          <el-table-column key="16" v-if="false" prop="pageurl" label="推广页面" width="150" :show-overflow-tooltip="true" align="center">
            <template slot-scope="scope">
              <a style="cursor: pointer" href="#" @click="disPageUrl(scope.row)">{{ scope.row.pageurl }}</a>
            </template>
          </el-table-column>

          <el-table-column key="17" prop="previstitime" label="预约回访" min-width="200" width="auto" :show-overflow-tooltip="true" align="center" sortable="custom" class-name="yuyue">
            <template slot-scope="scope">
              {{ scope.row.previstitime ? formatDate(new Date(scope.row.previstitime), "yyyy-MM-dd HH:mm:ss") : "" }}
              <el-popover popper-class="modify-icon" v-if="scope.row.previstitime" placement="left" width="220" height="50" :class="scope.row.activityserialno">
                <span slot="reference" class="mobile-icon el-icon-edit-outline" style="color: #dc240f; margin-left: 5px"></span>
                <el-date-picker v-model="editPrevistitime" type="datetime" placeholder="选择日期时间" size="mini" :picker-options="previstitimePickerOptions"> </el-date-picker>
                <br />
                <div class="sure-footer" style="padding-bottom: 0">
                  <div class="my-sure" @click="editPrevistTime(scope)">确定</div>
                </div>
              </el-popover>
              <span v-if="scope.row.previstitime" class="mobile-icon el-icon-circle-check" @click="toggerIsVist(scope)" style="color: #dc240f; line-height: 20px"></span>
            </template>
          </el-table-column>
          <el-table-column key="18" prop="remark" align="left" fixed="right" label="跟进记录" width="220" :show-overflow-tooltip="true"> </el-table-column>

          <el-table-column key="13" prop="channelname" align="center" label="渠道类型" width="90" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column key="14" prop="clue_sourcename" align="center" label="线索来源" width="90" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column key="15" prop="appname" align="center" label="流量来源" width="100" :show-overflow-tooltip="true"> </el-table-column>

          <!-- fixed="right" -->
        </el-table>
      </div>
      <div>
        <el-pagination background layout="total,prev, pager, next" :total="pageTotal" :page-size="pageSize" :current-page="pageNum" @current-change="pageClick"> </el-pagination>
      </div>
    </div>

    <el-drawer title="我是标题" size="70%" custom-class="customer-drawer" :visible.sync="drawer" :with-header="false">
      <cusIndex :datas="rowDetail" @saveEvent="handleChildData"></cusIndex>
    </el-drawer>

    <!-- 查看详情弹窗 -->
    <!-- <view-details :datas="detailObj" :showEditPopupDialogVisible.sync="showEditPopupDialogVisible" @updateVisible="updateVisibleId"></view-details> -->

  </div>
</template>
<script>

// import viewDetails from "../../components/viewDetails.vue";

// import $ from "jquery";
// import moment from "../../static/js/moment.js";
import { getData, getPhoneData, my_url, crm_url } from "../../static/js/ajax.js";
import { formatDate, checkEmail, checkMobile } from "../../static/js/common.js";
import cusIndex from "./index.vue";
export default {
  components: {
    // viewDetails,
    cusIndex,
  },
  data() {
    return {
      // 父传子
      rowDetail: {},

      // 权限
      ismyUse: true,
      dis_P4_up: false,
      dis_Pz_up: false,
      queryflagString: "01",


      // 筛选
      selectTime: [],
      activeName: "07",
      add_steps: [],
      customerIntention: "",
      customerNeedList: [],
      channelSourceValue: [],
      channelSource: [],
      cascaderProps: {
        value: "id", // 使用 id 作为值
        label: "label", // 使用 label 作为显示文本
        children: "child", // 使用 children 作为子节点
        // multiple: true,
        checkStrictly: true,
      },
      channelList: [], //渠道类型
      sourceList: [], //流量来源

      queryflag: true,
      teamNames2: "团队选择",
      teamList2: "",
      userNameList2: [],
      teamDataList: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      overviewForm: {
        teamid: "",
        userid: "",
        startDate: "",
        endDate: "",
        time: "1",
      },
      userNameOptions: [],
      Salesman: "",
      phoneWxno: "电话号码",
      phoneWxnoValue: "",
      SalesmanIdBox: [],
      // 表格筛选

      isArticle: true,
      checkedAll: false,
      checkedAllNum: 0,
      resourceDeployVisable: false,
      editInfo: {
        shareuserid: "",
        otherstore: "",
        shareusername: "",
      },
      select_steps: [],
      resourceDeployform: {
        activityid: "",
        userid: "",
        followupstep: "",
      },
      deleteSourceVisable: false,
      inputUserVisable: false,
      inputUserform: {
        sourcelevel: "A",
        batchno: "",
        wxno: "",
        mobile: "",
        name: "",
      },


      // 表格
      tableData: [],
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      loading: true,
      editPrevistitime: "",

      //  侧拉
      drawer: false,
      isDealed: false,

      previstitimePickerOptions: {
        //控制时间范围
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },

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

  mounted: function () {
    var _this = this;
    this.getchannelNameList();
    this.getCustomerIntenList();
    // this.tableHeard();
    this.getIsCall();
    this.getConditionData();
    this.getTeamList();

    this.$nextTick(() => {
      var hotlineStartDate, hotlineEndDate;
      if (this.selectTime.length > 0) {
        hotlineStartDate = this.formatDate(this.selectTime[0], "yyyy-MM-dd");
        hotlineEndDate = this.formatDate(this.selectTime[1], "yyyy-MM-dd");
      } else {
        hotlineStartDate = "";
        hotlineEndDate = "";
      }

      let params = {
        hotlineStartDate: hotlineStartDate,
        hotlineEndDate: hotlineEndDate,
        name: this.Salesman,
        userid: "",
        mobile: "",
        wxno: "",
        followupstep: "07",
        pageNumber: this.pageNum,
        pageSize: this.pageSize,
        queryflag: this.queryflagString,
        menutype: "75000000",
        teamid: "",
        ismyUse: true,
        channel: "",
        appname: "",
      };

      if (this.channelSourceValue.length == 0) {
        params.channel = "";
        params.appname = "";
      } else if (this.channelSourceValue.length == 1) {
        params.channel = this.channelSourceValue[0];
      } else if (this.channelSourceValue.length == 2) {
        params.channel = this.channelSourceValue[0];
        params.appname = this.channelSourceValue[1];
      }
      this.getTableData(params); //table数据
    });
    var now = new Date(); // 当前日期
    var nowDay = now.getDate(); // 当前日
    var nowMonth = now.getMonth(); // 当前月
    var nowYear = now.getYear(); // 当前年
    var start = formatDate(new Date(now.getFullYear(), nowMonth, nowDay));
    var end = formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1));
    var audio = this.$refs.audio;
    this.overviewForm.startDate = formatDate(new Date(start), "yyyy-MM-dd 00:00:00").substring(0, 10);
    this.overviewForm.endDate = formatDate(new Date(end), "yyyy-MM-dd 00:00:00").substring(0, 10);


    // this.checkNumber(),
    //   // 每 5 分钟检查一次数字是否变化
    //   (this.checkNumberChange = setInterval(this.checkNumber, 15 * 60 * 1000));
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    // clearInterval(this.checkNumberChange);
  },
  watch: {
    checkedAll: function (n, o) {
      if (n) {
        this.tableData.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    isDealed: function (n, o) {
      if (!n) {
        this.drawerWidth = (this.docEl - 200) * 0.5 + "";
      } else {
        this.drawerWidth = (this.docEl - 200) * 0.75 + "";
      }
    },
  },
  computed: {},
  methods: {
    // new

    //获取客户需求
    getCustomerIntenList() {
      let _this = this;
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          if (data.code == 0) {
            var array = data.dictList;
            // 循环给每个对象添加 disabled 属性
            array.forEach((item) => {
              item.disabled = false; // 添加 disabled 属性并设置为 false
              item.selected = false; // 添加 selected 属性并设置为 false
            });

            _this.customerNeedList = array;
          }
        },
        {
          dict_type: "customer_intention",
        }
      );
    },

    //渠道类型
    getchannelNameList() {
      let _this = this;
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          if (data.code == 0) {
            _this.channelList = data.dictList;
          }
        },
        {
          dict_type: "source",
        }
      );

      // /crm/activity/getChannelTree.do
      getData(
        "post",
        my_url + "/crm/activity/getChannelTree.do",
        function (data) {
          if (data.code == 0) {
            _this.removeEmptyChildren(data.channelInfo);
            _this.channelSource = data.channelInfo;
          }
        },
        {
          dict_type: "source",
        }
      );
    },

    removeEmptyChildren(arr) {
      arr.forEach((item) => {
        // 判断是否有 children 属性
        if (item.child) {
          // 判断 children 的长度是否为 0
          if (item.child.length === 0) {
            // 删除 children 属性
            delete item.child;
          } else {
            // 如果有 children，递归调用以处理子节点
            this.removeEmptyChildren(item.child);
          }
        }
      });
    },

    channelSelect() {
      var _this = this;
      this.appnameValue = "";
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          if (data.code == 0) {
            _this.sourceList = data.dictList;
          }
        },
        {
          dict_type: "sourcedetail_" + this.channelValue,
          special: "dis",
        }
      );
    },

    userNameChange() {
      this.queryflag = false;
      this.queryflagString = "02";
      this.search();
      // this.refresh();
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
    findOptionById(options, id) {
      for (const option of options) {
        if (option.id === id) {
          return option;
        }
        if (option.child) {
          const found = this.findOptionById(option.child, id);
          if (found) {
            return found;
          }
        }
      }
      return null;
    },

    my_sureOne2() {
      this.$refs.disTeam2.hide();
      this.my_list2 = "";
      this.teamList2 = "";
      this.teamNames2 = "团队选择";
      this.overviewForm.teamid = "";
      this.$refs.tree2.setCheckedKeys([]);
      this.queryflag = true;
      // this.search();
      // this.refresh();
    },

    my_sure2() {
      let _this = this;
      this.$refs.disTeam2.hide();

      if (this.my_list2 == null || this.my_list2 == "" || this.my_list2 == "1") {
        this.queryflag = true;
        this.queryflagString = "01";
      } else {
        this.teamNames2 = this.my_list2;
        this.queryflag = false;
        this.queryflagString = "02";
      }
      this.overviewForm.userid = "";
      // this.search();
      // this.refresh();
      //获取业务员列表
      getData(
        "post",
        my_url + "/crm/auth/getUserIdNameListByTeam.do",
        function (data) {
          _this.userNameOptions = data.namelist;
        },
        {
          teamid: this.teamList2,
        }
      );
    },
    handleCheckChange2(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label);
      });
      this.my_list2 = teamListName.join(",");
      this.teamList2 = checked.checkedKeys.join(",");
      this.overviewForm.teamid = this.teamList2;
    },

    resourceDeployShow() {
      this.getTeamList();
    },
    getTeamList() {
      let _this = this;
      //设置当前用户的团队列表参数
      getData("post", my_url + "/crm/auth/getTalkTeamList.do", function (data) {
        let tempData = [];
        if (data.teamList == null || data.teamList == "") {
          _this.disTeamAll = false;
        } else {
          _this.disTeamAll = true;
        }
        _this.teamDataList = data.teamList;
      });
    },

    handleSelectId(item) {
      this.resourceDeployform.userid = item.id;
    },

    search(page) {
      //查询

      let { Salesman, queryflag, mobile, wxno, username, followupstep, sourcelevel, prop, order } = this;
      let hotlineStartDate = "",
        hotlineEndDate = "",
        cusdealStartDate = "",
        cusdealEndDate = "";

      if (this.selectTime && this.selectTime.length > 0) {
        hotlineStartDate = this.formatDate(this.selectTime[0], "yyyy-MM-dd");
        hotlineEndDate = this.formatDate(this.selectTime[1], "yyyy-MM-dd");
      }

      if (this.selectTimeCusdeal && this.selectTimeCusdeal.length > 0) {
        cusdealStartDate = this.formatDate(this.selectTimeCusdeal[0], "yyyy-MM-dd");
        cusdealEndDate = this.formatDate(this.selectTimeCusdeal[1], "yyyy-MM-dd");
      }
      if (this.queryflagString != "03") {
        this.queryflagString = this.queryflag ? "01" : "02";
      }
      if (this.phoneWxno == "电话号码") {
        this.mobile = this.phoneWxnoValue;
        this.wxno = "";
        // this.batchnoValue = "";
      } else {
        this.mobile = "";
        this.wxno = this.phoneWxnoValue;
      }
      var channelListSum = this.channelList.concat(this.channelOptions);

      let params = {
        hotlineStartDate: hotlineStartDate, //线索开始时间
        hotlineEndDate: hotlineEndDate, //线索终止时间

        name: Salesman, //客户姓名
        userid: this.overviewForm.userid, //业务员姓名
        mobile: this.mobile,
        wxno: this.wxno,
        followupstep: "07",
        // followupstep: "01,02,03,04,05",
        pageNumber: page || this.pageNum,
        pageSize: this.pageSize,
        queryflag: this.queryflagString,
        menutype: "75000000",

        teamid: this.overviewForm.teamid,
        prop: prop,
        order: order,
        customer_intention: this.customerIntention,
        channel: "",
        appname: "",
      };

      if (this.channelSourceValue.length == 0) {
        params.channel = "";
        params.appname = "";
      } else if (this.channelSourceValue.length == 1) {
        params.channel = this.channelSourceValue[0];
      } else if (this.channelSourceValue.length == 2) {
        params.channel = this.channelSourceValue[0];
        params.appname = this.channelSourceValue[1];
      }
      this.loading = true;
      this.getTableData(params);
    },

    reset() {
      //重置
      this.selectTime = "";
      this.selectTimeCusdeal = "";
      this.Salesman = "";
      this.mobile = "";
      this.wxno = "";
      this.username = "";
      this.queryflag = true;
      this.queryflagString = "01";
      this.hotlineStartDate = ""; //线索开始时间
      this.hotlineEndDate = "";
      this.cusdealStartDate = "";
      this.cusdealEndDate = "";
      this.channelValue = "";
    },

    getTableData(params) {
      //table数据
      let _this = this;
      getData(
        "get",
        my_url + "/crm/activity/getActivityList.do",
        function (data) {
          let { rows, total } = data;
          _this.pageTotal = total;
          if (rows) {
            // 获取今天的日期
            const today = new Date();
            const yesterday = new Date();
            yesterday.setDate(today.getDate() - 1); // 将日期减去 1
            const yesterdayString = yesterday.toISOString().split("T")[0]; // 格式化为 YYYY-MM-DD

            rows.forEach((res) => {
              if (res.channel == "8001") {
                res["channelname"] = res.channeldetailname;
              }
              res.wxnostr = res.wxno;
              // 如果sourceleve 是A+,是A重疾
              if (res.sourcelevel == "A") {
                res.sourcelevel = "A重疾";
                // 如果sourceleve 是A+,是A理财
              } else if (res.sourcelevel == "A+") {
                res.sourcelevel = "A理财";
                // 如果sourceleve 是A-,、分两种情况
              } else if (res.sourcelevel == "A-") {
                //第一种情况如果initsourceleve 是A 为A-重疾
                if (res.initsourcelevel == "A") {
                  res.sourcelevel = "A-重疾";
                  //第二种情况如果initsourceleve 是A+ 为A-理财
                } else if (res.initsourcelevel == "A+") {
                  res.sourcelevel = "A-理财";
                }
              }

              if (_this.iscall == "Y") {
                res.newmobilestr = "javascript:void(0);";
              } else {
                res.newmobilestr = "sip:0" + res.mobilestr;
              }
            });
          }

          _this.tableData = rows;

          if (_this.queryflagString == "01" || _this.queryflagString == "03") {
            _this.isTop = true;
          } else {
            _this.isTop = false;
          }
          _this.loading = false;
          _this.$nextTick(function () {
            _this.scrollHieght();
          });
        },
        params
      );
    },
    pageClick(page) {
      //点击分页
      this.pageNum = page;
      if (this.isArticle == false) {
        this.articleData(page);
      } else {
        this.search(page);
      }
    },


    resourceDeployCancel() {
      this.resourceDeployVisable = false;
      this.resourceDeployform.followupstep = "";
      this.resourceDeployform.activityid = "";
      this.editInfo.shareusername = "";
      this.resourceDeployform.userid = "";
      this.userNameList = [];
      this.teamNames = "团队选择";
      this.teamList = "";
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.checkedAllNum = val.length;
    },


    resourceDeploySubmit() {
      let _this = this;
      let activityid = [];
      _this.multipleSelection.forEach(function (item) {
        activityid.push(item.activityserialno);
      });
      if (activityid.length == 0) {
        _this.$message({
          type: "waring",
          duration: 3000,
          message: "请选择需要调配的资源！",
        });
        return;
      }
      //添加的新业务员编号
      let userid = [];
      userid.push(this.resourceDeployform.userid);

      this.resourceDeployform.activityid = activityid.join(",");
      this.resourceDeployform.userid = userid.join("");
      getData(
        "post",
        my_url + "/crm/activity/activityTransfer.do",
        function (data) {
          if (data.code == "0") {
            _this.$message({
              type: "success",
              duration: 3000,
              message: "调配成功！",
            });
            _this.resourceDeployVisable = false;
            _this.resourceDeployform.followupstep = "";
            _this.resourceDeployform.activityid = "";
            _this.userNameList = [];
            _this.teamNames = "团队选择";
            _this.teamList = "";
            _this.resourceDeployform.userid = "";
            _this.editInfo.shareusername = "";
            _this.search(1);
          } else {
            _this.$message({
              type: "waring",
              duration: 3000,
              message: data.msg,
            });
          }
        },
        this.resourceDeployform
      );
    },

    deleteSourceCancel() {
      this.deleteSourceVisable = false;
    },

    deleteSourceSubmit() {
      let _this = this;
      let activityid = [];
      _this.multipleSelection.forEach(function (item) {
        activityid.push(item.activityserialno);
      });
      if (activityid.length == 0) {
        _this.$message({
          type: "waring",
          duration: 3000,
          message: "请选择需要删除的资源！",
        });
        return;
      }
      let params = {
        activityid: activityid.join(","),
      };
      getData(
        "post",
        my_url + "/crm/activity/pageActivityDelete.do",
        function (data) {
          if (data.code == "0") {
            _this.$message({
              type: "success",
              duration: 3000,
              message: "删除成功！",
            });
            _this.deleteSourceVisable = false;
            _this.search(1);
          } else {
            _this.$message({
              type: "waring",
              duration: 3000,
              message: data.msg,
            });
          }
        },
        params
      );
    },

    toggerIsVist(scop) {
      var _this = this;
      getData(
        "post",
        my_url + "/crm/activity/activityVisit.do",
        function (data) {
          if (data.code == 0) {
            _this.$message({
              showClose: true,
              message: "成功!",
              duration: 3000,
              type: "success",
            });
            _this.search(_this.pageNum);
            // _this.refresh()
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: "error",
            });
          }
        },
        {
          activityserialno: scop.row.activityserialno,
        }
      );
    },
    editPrevistTime(scop) {
      var _this = this;
      getData(
        "post",
        my_url + "/crm/activity/updatePrevistiTime.do",
        function (data) {
          if (data.code == 0) {
            _this.$message({
              showClose: true,
              message: "成功!",
              duration: 3000,
              type: "success",
            });
            _this.previstirimeVisable = false;
            scop.row.previstitime = false;
            _this.search(_this.pageNum);
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: "error",
            });
          }
        },
        {
          activityserialno: scop.row.activityserialno,
          previstitime: _this.formatDate(_this.editPrevistitime, "yyyy-MM-dd HH:mm:ss"),
        }
      );
    },

    querySearchId(queryString, cb) {
      var SalesmanIdBox = this.SalesmanIdBox;
      var results = queryString ? SalesmanIdBox.filter(this.createFilterId(queryString)) : SalesmanIdBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },


    sortChange(val) {
      this.order = val.order;
      this.prop = val.prop;
      this.search(1);
    },


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

    getConditionData() {
      //条件数据
      let _this = this;
      getData("post", my_url + "/crm/common/getDictList.do", function (data) {
        //渠道类型
        if (data.code == 0) {
          let { dictList } = data;
          _this.channelOptions = dictList;
        }
      },
        {
          dict_type: "source",
        }
      );
      getData("post", my_url + "/crm/common/getDictList.do", function (data) {
        //跟进步骤
        if (data.code == 0) {
          _this.steps = data.dictList;
          let select_dictList = JSON.parse(JSON.stringify(data.dictList));


          _this.select_steps = select_dictList;

          var add_dictList = JSON.parse(JSON.stringify(data.dictList));


          const filteredList = add_dictList.filter((item) => item.dd_key !== "06" && item.dd_key !== "07");

          _this.add_steps = filteredList;
          // _this.activeName = add_dictList[1].dd_key;
          _this.activeName = "07";
        }
      },
        {
          dict_type: "followupstep",
        }
      );
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          //标签
          if (data.code == 0) {
            let { dictList } = data;
            _this.customers = dictList;
          }
        },
        {
          dict_type: "activitytag",
        }
      );
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          //其他库
          if (data.code == 0) {
            let { dictList } = data;
            _this.otherstores = dictList;
          }
        },
        {
          dict_type: "otherstore",
        }
      );
      getData(
        "post",
        my_url + "/crm/auth/getManagePermission.do",
        function (data) {
          //查看客户的权限
          if (data.code == 0) {
            _this.dis_P4_up = true;
          } else {
            _this.dis_P4_up = false;
          }
        },
        null
      );

      //资源删除的权限
      getData(
        "post",
        my_url + "/crm/auth/getZongPermission.do",
        function (data) {
          //其他库
          if (data.code == 0) {
            _this.dis_Pz_up = true;
          } else {
            _this.dis_Pz_up = false;
          }

          _this.getUserIdData();
        },
        null
      );
    },



    formatDate: function (date, format) {
      //格式化时间
      if (!date) return;
      if (!format || typeof format != "string") format = "yyyy-MM-dd";
      switch (typeof date) {
        case "string":
          date = new Date(date.replace("T", " ").replace(/-/, "/"));
          break;
        case "number":
          date = new Date(date);
          break;
      }
      if (!(date instanceof Date)) return;
      var dict = {
        yyyy: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        H: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        MM: ("" + (date.getMonth() + 101)).substr(1),
        dd: ("" + (date.getDate() + 100)).substr(1),
        HH: ("" + (date.getHours() + 100)).substr(1),
        mm: ("" + (date.getMinutes() + 100)).substr(1),
        ss: ("" + (date.getSeconds() + 100)).substr(1),
      };
      return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
        return dict[arguments[0]];
      });
    },
    inputUserSubmit() {
      let _this = this;
      if (!_this.inputUserform.wxno && !_this.inputUserform.mobile) {
        _this.$message({
          type: "waring",
          duration: 3000,
          message: "电话和微信至少填写一个！",
        });
        return;
      }
      if (_this.inputUserform.mobile != null && _this.inputUserform.mobile != "" && !/^1[3456789]\d{9}$/.test(_this.inputUserform.mobile)) {
        _this.$message({
          type: "waring",
          duration: 3000,
          message: "请填写正确的电话号码！",
        });
        _this.inputUserform.mobile = "";
        return;
      }
      getData(
        "post",
        my_url + "/crm/activity/pageActivityInsert.do",
        function (data) {
          if (data.code == "0") {
            _this.$message({
              type: "success",
              duration: 3000,
              message: "录入成功！",
            });
            _this.inputUserform.name = "";
            _this.inputUserform.mobile = "";
            _this.inputUserform.wxno = "";
            _this.inputUserform.batchno = "";
            _this.inputUserform.sourcelevel = "A";
            _this.inputUserVisable = false;
            _this.search(1);
          } else {
            _this.$message({
              type: "waring",
              duration: 3000,
              message: data.msg,
            });
          }
        },
        _this.inputUserform
      );
    },
    inputUserCancel() {
      this.sable = false;
      this.inputUserform1 = this.inputUserform2;
      this.inputUserVisable = false;
      this.inputUserform.name = "";
      this.inputUserform.mobile = "";
      this.inputUserform.wxno = "";
    },

    createFilterId(queryString) {
      return (SalesmanIdBox) => {
        return SalesmanIdBox.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    getUserIdData() {
      let _this = this;
      if (this.dis_Pz_up) {
        getData("post", my_url + "/crm/auth/getUserIdNameList.do", function (data) {
          //渠道类型
          if (data.code == 0) {
            let nameList = data.namelist;
            nameList.forEach((res) => {
              _this.SalesmanIdBox.push({
                value: res.username,
                id: res.userid,
              });
            });
          }
        });
      } else {
        getData("post", my_url + "/crm/auth/getAllUserIdNameList.do", function (data) {
          //渠道类型
          if (data.code == 0) {
            let nameList = data.namelist;
            nameList.forEach((res) => {
              _this.SalesmanIdBox.push({
                value: res.username,
                id: res.userid,
              });
            });
          }
        });
      }
    },


    // 拨打电话
    phonecall_row(row) {
      this.$parent.onSend({
        mobile: row.mobilestr,
        activityid: row.activityserialno,
      });
    },


    // 回传部分
    handleChildData(data) {
      console.log(data);
      this.search();
    },
    //点击客户姓名 展示详细信息
    handle(row) {
      let _this = this;
      this.rowDetail = "";
      row["queryflag"] = this.queryflag;
      this.rowDetail = Object.assign({}, row);
      this.drawer = true;
    },



    // 设置滚动条
    scrollHieght() {
      //滚动条距离顶部距离
      let s1 = document.documentElement.scrollTop;
      //页面可视区域高度
      let s2 = document.documentElement.clientHeight;
      // 页面总高度
      let s3 = document.documentElement.scrollHeight;
      let s4 = s3 - s2;
      if (s4 > 0) {
        document.documentElement.scrollTop = s4;
      }
    },
  },
};
</script>
<style src="../../static/css/viewer.min.css"></style>
<style src="../../static/css/drawer.css"></style>
<style src="../../static/css/customerManagementNew.css"></style>
<style>
.entry-data .el-dialog__body {
  padding: 0 0 0 0.3rem;
}

.entry-data-box .common-select {
  position: relative;
  width: 33%;
  margin-top: 0.18rem;
  float: left;
}

.entry-data-box .common-select .select-content {
  margin-right: 0.8rem;
}

.entry-data-box .common-select .sign {
  font-style: italic;
  position: absolute;
  top: 3px;
  right: 25px;
  color: rgba(151, 151, 151, 1);
}

.entry-customer-popper {
  width: auto !important;
  font-size: 0.14rem;
  padding-top: 0.2rem;
}

.entry-customer-popper .common-select {
  margin-bottom: 0.1rem;
}

.entry-customer-popper .common-select .select-content {
  margin-right: 0.12rem;
}

.entry-customer-popper .common-select .select-content .el-input-inners .el-input__inner {
  font-size: 0.14rem;
}

.select-content .el-select-inners-splice .el-input__inner {
  height: 0.28rem;
  line-height: 0.28rem;
}

.modify-icon .el-date-editor .el-input__inner {
  padding: 0 0.4rem !important;
}

.top-row .el-table__cell {
  background: rgba(245, 220, 217, 0.5);
}

#audio {
  height: 30px;
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 3000;
}

.ad-select-content .el-select-inners .el-input__icon {
  margin-left: 1rem;
}

.el-popover__reference-wrapper {
  display: flex;
  height: 100%;
  align-items: center;
}

.customerManagementNew {
  height: 100%;
  background: rgb(242, 242, 242);
  /* padding: 0.1rem 0.4rem 0 0.4rem; */
  width: 17.1rem;
}

.yuyue .el-tooltip {
  display: flex;
}

.boxpad .el-date-editor .el-input__inner {
  padding-left: 0.3rem !important;
  padding-right: 0rem !important;
}

.gjg_topping {
  display: none !important;
  color: #979797 !important;
  width: 15% !important;
  cursor: pointer;
}

.customer-drawer .drawerRight .drawercontentBox ul li:hover .gjg_topping {
  display: block !important;
}

.filContent .el-input-inners .el-input__inner {
  border: 1px solid #dcdfe6;
  height: 0.3rem;
  line-height: 0.3rem;
}

.followTag {
  width: 0.75rem;
  height: 0.25rem;
  line-height: 0.25rem;
  text-align: center;
}

.el-tooltip .lipeiTag {
  background: #ecffff;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #e1f8f8;
  color: #18a09e;
}

.cusintention .el-select__tags {
  width: 105% !important;
  max-width: 159.531px !important;
}

.customer-drawer .el-drawer__body {
  display: flex;
}
</style>

<style scoped>
.container-search-box .common-select {
  width: 23%;
}

.filContent .el-dropdown-inners {
  width: 100%;
}

.select-content .el-dropdown-inners > span {
  width: 3.2rem;
}

.resourceAllocation {
  width: auto;
  padding: 0.01rem 0.18rem;
  background: #fff;
  border: 1px solid #dc220d;
  color: #dc220d;
}

.newsalesperson {
  width: 1.1rem;
  border: none;
  background: #fff;
}

.resourceCancel {
  background: #fff;
  color: #dc240f;
  border: 0.01rem solid #dc240f;
}

.resourceDel {
  width: auto;
  padding: 0.01rem 0.18rem;
  background: #fff;
  border: 1px solid #dc220d;
  color: #dc220d;
}

.check-all-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
