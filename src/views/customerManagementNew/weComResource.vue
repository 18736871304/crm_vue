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

          <div class="common-select" style="display: none">
            <div class="select-title filtitle">跟进步骤</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="activeName" size="mini" placeholder="请选择跟进步骤" clearable>
                <el-option v-for="(item, index) in add_steps" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>

       

          <div class="common-select">
            <div class="select-title filtitle">渠道/来源</div>
            <div class="select-content filContent">
              <el-cascader class="el-select-inners"  popper-class="cascaderBox" v-model="channelSourceValue" :options="channelSource" :props="cascaderProps" @change="handleChange" :show-all-levels="false" collapse-tags clearable></el-cascader>
            </div>
          </div>
          <div class="common-select" v-show="dis_P4_up"></div>
          <div class="common-select" v-show="dis_P4_up"></div>

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
            <div class="select-title filtitle">微信昵称/备注</div>
            <div class="select-content filContent">
              <el-input class="el-input-inners" v-model="customerremarkname" size="mini" placeholder="请输入微信昵称/备注" clearable></el-input>
            </div>
          </div>

          <!-- <div class="common-select" style="display: none;">
            <div class="select-title filtitle">
              <el-select class="el-input-title-inners" v-model="phoneWxno" placeholder="请选择" size="mini">
                <el-option label="电话号码" value="电话号码"></el-option>
                <el-option label="微信号" value="微信号"></el-option>
              </el-select>
            </div>

            <div class="select-content   filContent">
              <el-input class="el-input-inners" v-model="phoneWxnoValue" align="right" placeholder="请输入电话号码" size="mini" clearable></el-input>
            </div>

          </div> -->
          <!-- <div class="common-select" style="width:6%">
            <div class="my-customers" v-show="ismyUse && dis_P4_up">
              <el-checkbox size="mini" v-model="queryflag">我的客户</el-checkbox>
            </div>
          </div> -->

          <div class="common-select" v-show="dis_P4_up"></div>
          <div class="common-select" style="width: 4%">
            <div class="search-box-right">
              <div style="display: flex">
                <div class="search-btn searchLeft" @click="search(1)">搜索</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-table">
      <!-- 调配资源 -->
      <div class="check-all-box">
        <!-- <div>
          <el-checkbox v-model="checkedAll">全选</el-checkbox>
          {{ checkedAllNum }}个客户
        </div> -->

        <!-- <div class="container-middle-two" style="float: right;">
          <el-popover popper-class="entry-customer-popper" placement="bottom-start" width="3.31rem" trigger="click" v-model="resourceDeployVisable" @show="resourceDeployShow">
            <div class="search-btn resourceAllocation" slot="reference">资源调配
            </div>
            <div class="common-select">
              <div class="select-title  newsalesperson">新所属业务员</div>
              <div class="select-content" style="width: 2rem;">
                <el-autocomplete class="el-input-inners" v-model="editInfo.shareusername" :fetch-suggestions="querySearchId" placeholder="请输入新所属业务员" :trigger-on-focus="false" @select="handleSelectId"></el-autocomplete>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title newsalesperson">新跟进步骤</div>
              <div class="select-content" style="width:2rem;border: none;">
                <el-select class="el-select-inners" v-model="resourceDeployform.followupstep" placeholder="请选择新跟进步骤">
                  <el-option v-for="item in select_steps" :label="item.dd_value" :value="item.dd_key" :key="item.dd_key"></el-option>
                </el-select>
              </div>
            </div>
            <div class="sure-footer" style="padding-bottom: 0;">
              <div class="my-sure resourceCancel" @click="resourceDeployCancel()">取消</div>
              <div class="my-sure" @click="resourceDeploySubmit()">确定</div>
            </div>
          </el-popover>
        </div> -->
      </div>

      <!-- 表格内容 -->

      <div class="check-all-table">
        <el-table :data="ArticleData" class="Article" border v-loading="loading" style="width: 100%">
          <el-table-column key="1" type="selection" width="40"> </el-table-column>
          <el-table-column key="2" prop="makedate" label="线索产生时间" width="160" align="center"> </el-table-column>
          <el-table-column key="3" prop="username" label="所属业务员" :show-overflow-tooltip="true" width="100" align="center"> </el-table-column>
          <el-table-column key="4" prop="customername" label="客户微信昵称" :show-overflow-tooltip="true" width="180" align="center"> </el-table-column>
          <el-table-column key="5" prop="customerremarkname" label="客户微信备注" :show-overflow-tooltip="true" width="180" align="center"> </el-table-column>
          <el-table-column key="6" prop="customersex" label="客户性别" width="90" align="center"> </el-table-column>
          <el-table-column key="7" prop="channelname" label="渠道类型" width="80" align="center"> </el-table-column>
          <el-table-column key="8" prop="articletypename" label="资源类型" width="80" align="center"> </el-table-column>
          <el-table-column key="9" prop="appname" label="流量来源" width="100" align="center"> </el-table-column>
          <el-table-column key="10" prop="isdeletefirendname" label="是否删除" width="90" align="center"> </el-table-column>
          <el-table-column key="11" align="center" label="聊天记录" width="90">
            <template slot-scope="scope">
              <a href="javascript:void(0);" class="editColor editColorChat" @click="openChatItem(scope.row)">查看</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination background layout="total,prev, pager, next" :total="pageTotal" :page-size="pageSize" :current-page="pageNum" @current-change="pageClick"> </el-pagination>
      </div>
    </div>

    <el-drawer title="" size="50%" custom-class="customer-drawer chatRecord-drawer" v-if="chatRecord" :visible.sync="chatRecord" :before-close="closeChatRecord">
      <div class="drawerBox" style="width: 100%; overflow-x: hidden">
        <chat-Record :datas="detailObj"></chat-Record>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import $ from "jquery";
import { getData, my_url, crm_url } from "../../static/js/ajax.js";
import { formatDate } from "../../static/js/common.js";
import chatRecord from "../../components/chatRecord/chatRecord.vue";

export default {
  components: {
    chatRecord,
  },
  data() {
    return {
      channelSourceValue: [],
      channelSource: [],
      cascaderProps: {
        value: "id", // 使用 id 作为值
        label: "label", // 使用 label 作为显示文本
        children: "child", // 使用 children 作为子节点
        // multiple: true,
        checkStrictly: true,
      },
      // 聊天记录
      chatRecord: false,
      detailObj: {},
      showEditPopupDialogVisible: false,

      my_url: my_url,
      // 筛选
      selectTime: [],
      activeName: "",
      add_steps: [],
      channelValue: "",
      channelList: [], //渠道类型
      sourceValue: "", //流量来源
      sourceList: [], //流量来源列表
      teamNames2: "团队选择",
      my_list2: "",
      ArticleData: [],
      customerremarkname: "",

      dis_P4_up: false,
      dis_Pz_up: false,
      teamDataList: [],
      userNameOptions: [],
      SalesmanIdBox: [],
      defaultProps: {
        children: "children",
        label: "label",
      },

      queryflag: true,
      queryflagString: "01",
      // 列表

      checkedAll: false,
      checkedAllNum: 0,
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      loading: true,

      overviewForm: {
        teamid: "",
        userid: "",
        startDate: "",
        endDate: "",
        time: "1",
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
    this.getIsCall();
    this.getConditionData();
    this.getTeamList();
    this.search(1); //table数据

    var now = new Date(); // 当前日期
    var nowDay = now.getDate(); // 当前日
    var nowMonth = now.getMonth(); // 当前月
    var nowYear = now.getYear(); // 当前年
    var start = formatDate(new Date(now.getFullYear(), nowMonth, nowDay));
    var end = formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1));
    var audio = this.$refs.audio;
    this.overviewForm.startDate = formatDate(new Date(start), "yyyy-MM-dd 00:00:00").substring(0, 10);
    this.overviewForm.endDate = formatDate(new Date(end), "yyyy-MM-dd 00:00:00").substring(0, 10);
    // this.refresh();
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
  },
  computed: {},
  methods: {


    handleChange(value) {
      // 如果选中的值是没有子节点的选项，保持当前选中的值
      const selectedOption = this.findOptionById(this.channelSource, value[value.length - 1]);
      if (selectedOption && !selectedOption.child) {
        this.channelSourceValue = value; // 保持当前选中的值
        if (value.length == 2) {
          this.channelSourceValue[1] = selectedOption.label
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
    // 聊天记录

    // 打开首页聊天记录
    openChatItem(item) {

      item.qwuserurl = item.photourl;

      this.detailObj = Object.assign({}, item);
      // this.activeName = ''
      this.detailObj["activeName"] = "";
      this.chatRecord = true;
      // this.init(item.qwuserid, item.customerid, true)
    },

    // 关闭聊天记录
    closeChatRecord() {
      this.chatRecord = false;
      // this.detailObj = {}
    },

    updateVisibleId(e) {
      this.showEditPopupDialogVisible = e;
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
      this.sourceValue = "";
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

    search(page) {
      //查询
      var that = this;

      let hotlineStartDate = "",
        hotlineEndDate = "";

      if (this.selectTime && this.selectTime.length > 0) {
        hotlineStartDate = this.formatDate(this.selectTime[0], "yyyy-MM-dd");
        hotlineEndDate = this.formatDate(this.selectTime[1], "yyyy-MM-dd");
      } else {
        hotlineStartDate = "";
        hotlineEndDate = "";
      }

      getData("post", my_url + "/crm/auth/getToken.do", function (data) {
        var params = {
          cluestartdate: hotlineStartDate, //线索开始时间
          clueenddate: hotlineEndDate, //线索终止时间
          token: data.token,
          isaddfriend: "Y",
          pageNumber: page,
          pageSize: that.pageSize,
          teamid: that.overviewForm.teamid,
          userid: that.overviewForm.userid, //业务员姓名
          queryflag: that.queryflagString,
          customerremarkname: that.customerremarkname, //客户姓名
          channel: '',
          appname: '',
        };

        if (that.channelSourceValue.length == 0) {
          params.channel = "";
          params.appname = "";
        } else if (that.channelSourceValue.length == 1) {
          params.channel = that.channelSourceValue[0];
        } else if (that.channelSourceValue.length == 2) {
          params.channel = that.channelSourceValue[0];
          params.appname = that.channelSourceValue[1];
        }
        getData(
          "post",
          crm_url + "insure.meihualife.com/crm_web/getArticleClueList.do",
          function (data) {
            that.ArticleData = data.rows;

            that.pageTotal = data.total;
          },
          params
        );
      });

      this.loading = false;
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

    //查看客户权限
    getConditionData() {
      let _this = this;
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

      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          //跟进步骤
          if (data.code == 0) {
            _this.steps = data.dictList;
            let select_dictList = JSON.parse(JSON.stringify(data.dictList));
            select_dictList.unshift({
              dd_key: "99",
              dd_value: "新资源",
            });

            _this.select_steps = select_dictList;

            var add_dictList = JSON.parse(JSON.stringify(data.dictList));

            add_dictList.push({
              dd_key: "gxkh",
              dd_value: "共享客户",
            });
            add_dictList.unshift({
              dd_key: "99",
              dd_value: "新资源",
            });

            _this.add_steps = add_dictList;
            // _this.activeName = add_dictList[1].dd_key;
            _this.activeName = "99";
          }
        },
        {
          dict_type: "followupstep",
        }
      );
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

    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.search(page);
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

    // // 删除资源
    // deleteSourceSubmit() {
    //   let _this = this;
    //   let activityid = [];
    //   _this.multipleSelection.forEach(function (item) {
    //     activityid.push(item.activityserialno)
    //   })
    //   if (activityid.length == 0) {
    //     _this.$message({
    //       type: 'waring',
    //       duration: 3000,
    //       message: "请选择需要删除的资源！"
    //     })
    //     return
    //   }
    //   let params = {
    //     'activityid': activityid.join(',')
    //   }
    //   getData('post', my_url + '/crm/activity/pageActivityDelete.do', function (data) {
    //     if (data.code == '0') {
    //       _this.$message({
    //         type: 'success',
    //         duration: 3000,
    //         message: "删除成功！"
    //       })
    //       _this.deleteSourceVisable = false;
    //       _this.search(1);
    //     } else {
    //       _this.$message({
    //         type: 'waring',
    //         duration: 3000,
    //         message: data.msg
    //       })
    //     }
    //   }, params);
    // },
    // deleteSourceCancel() {
    //   this.deleteSourceVisable = false;
    // },
    // handleSelectId(item) {
    //   this.resourceDeployform.userid = item.id
    // },

    // // 调配资源
    // resourceDeploySubmit() {
    //   let _this = this;
    //   let activityid = [];
    //   _this.multipleSelection.forEach(function (item) {
    //     activityid.push(item.activityserialno)
    //   })
    //   if (activityid.length == 0) {
    //     _this.$message({
    //       type: 'waring',
    //       duration: 3000,
    //       message: "请选择需要调配的资源！"
    //     })
    //     return
    //   }
    //   //添加的新业务员编号
    //   let userid = [];
    //   userid.push(this.resourceDeployform.userid)

    //   this.resourceDeployform.activityid = activityid.join(',')
    //   this.resourceDeployform.userid = userid.join('')
    //   getData('post', my_url + '/crm/activity/activityTransfer.do', function (data) {
    //     if (data.code == '0') {
    //       _this.$message({
    //         type: 'success',
    //         duration: 3000,
    //         message: "调配成功！"
    //       })
    //       _this.resourceDeployVisable = false;
    //       _this.resourceDeployform.followupstep = '';
    //       _this.resourceDeployform.activityid = '';
    //       _this.userNameList = [];
    //       _this.teamNames = "团队选择"
    //       _this.teamList = ''
    //       _this.resourceDeployform.userid = '';
    //       _this.editInfo.shareusername = '';
    //       _this.search(1);
    //     } else {
    //       _this.$message({
    //         type: 'waring',
    //         duration: 3000,
    //         message: data.msg
    //       })
    //     }
    //   }, this.resourceDeployform);
    // },
    // resourceDeployCancel() {
    //   this.resourceDeployVisable = false;
    //   this.resourceDeployform.followupstep = '';
    //   this.resourceDeployform.activityid = '';
    //   this.editInfo.shareusername = '';
    //   this.resourceDeployform.userid = '';
    //   this.userNameList = [];
    //   this.teamNames = "团队选择";
    //   this.teamList = '';
    //   // this.$refs.tree1.setCheckedKeys([])
    // },
    // resourceDeployShow() {
    //   this.getTeamList();
    // },
    getTeamList() {
      let _this = this;
      //设置当前用户的团队列表参数
      getData("post", my_url + "/crm/auth/getTalkTeamList.do", function (data) {
        _this.teamDataList = data.teamList;
      });
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

    my_sureOne2() {
      this.$refs.disTeam2.hide();
      this.my_list2 = "";
      this.teamList2 = "";
      this.teamNames2 = "团队选择";
      this.overviewForm.teamid = "";
      this.$refs.tree2.setCheckedKeys([]);
      this.queryflag = true;
      // this.search(1);
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

      // this.search(1);
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

    userNameChange() {
      this.queryflag = false;
      this.queryflagString = "02";
      // this.search(1);
    },

    querySearchId(queryString, cb) {
      var SalesmanIdBox = this.SalesmanIdBox;
      var results = queryString ? SalesmanIdBox.filter(this.createFilterId(queryString)) : SalesmanIdBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    createFilterId(queryString) {
      return (SalesmanIdBox) => {
        return SalesmanIdBox.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
  },
};
</script>
<style src="../../static/css/viewer.min.css"></style>
<style src="../../static/css/drawer.css"></style>
<style src="../../static/css/customerManagementNew.css"></style>

<style>
.el-drawer__header {
  height: 0.71rem;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 0.1rem;
}

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

</style>

<style scoped>
.viewer-in {
  z-index: 9999 !important;
}

.common-select .filtitle {
  width: 1.28rem;
}

.common-select .filContent {
  height: 0.3rem;
  width: 2rem;
  border: none;
  display: flex;
  align-items: center;
}

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

.editColorChat {
  color: #8f9198;
}
</style>
