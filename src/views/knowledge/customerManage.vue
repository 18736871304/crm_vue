<template>
  <div style="width:17.1rem">
    <div class="search-header">
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title  filtitle">添加时间</div>
          <div class="select-content filContent">
            <el-date-picker v-model="selectTime" type="daterange" align="right" size="mini" value-format="yyyy-MM-dd" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" class="el-date-picker-inners">
            </el-date-picker>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title  filtitle">客户姓名</div>
          <div class="select-content filContent">
            <el-input class="el-input-inners" v-model="cusname" align="right" size="mini" placeholder="请输入客户微信昵称/备注" clearable></el-input>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title  filtitle">电话号码</div>
          <div class="select-content filContent">
            <el-input class="el-input-inners" v-model="cusMobile" align="right" size="mini" placeholder="请输入电话号码" clearable></el-input>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title  filtitle">业务员姓名</div>
          <div class="select-content filContent">
            <el-autocomplete class="el-input-inners" v-model="userName" :fetch-suggestions="querySearchId" placeholder="请输入新所属业务员" :trigger-on-focus="false" @select="handleSelectId" clearable></el-autocomplete>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title  filtitle">渠道类型</div>
          <div class="select-content filContent">
            <el-select class="el-select-inners" v-model="channelValue" size="mini" @change="channelSelect" placeholder="请选择渠道类型" clearable>
              <el-option v-for="(item, index) in channelList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title  filtitle">流量来源</div>
          <div class="select-content  filContent">
            <el-select class="el-select-inners" v-model="sourceValue" size="mini" placeholder="请选择流量来源" clearable>
              <el-option v-for="(item, index) in sourceList" :key="index" :label="item.dd_value" :value="item.dd_value">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title  filtitle">企业标签</div>
          <div class="select-content filContent">
            <!-- <el-select v-model="weChatTag" size="mini" placeholder="请选择标签" class="el-select-inners">
              <el-option v-for="(item, index) in weChatTagsList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select> -->

            <el-cascader v-model="weChatTag" :options="weChatTagsList" @change="tagsChange" popper-class="digTags" clearable></el-cascader>

          </div>
        </div>
        <div class="common-select">
          <div class="select-title  filtitle">流失状态</div>
          <div class="select-content filContent">
            <el-select v-model="lossStatus" size="mini" placeholder="请选择流失状态" class="el-select-inners">
              <el-option v-for="(item, index) in lossStatusList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="common-select" style=" width:4%">
          <div class="search-btn searchLeft " @click="search(1)">搜索</div>
          <div class="search-btn" style="
              background: #fff;
              color: #dc220d;
              border: 1px solid rgba(216, 216, 216, 1);display: none;
            " @click="screenReset">
            重置
          </div>
        </div>
      </div>
    </div>

    <div class="table-box">

      <div class="totalNum">
        <p><span class="totalCom">共{{pageTotal}}个客户</span></p>
        <p>排除重复客户后剩余{{customerCount}}个</p>
      </div>

      <el-table :data="tableData" ref="multipleTable" border v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange" class="splice-header">
        <!-- <el-table-column key="1" align="center" type="selection" width="55">
        </el-table-column> -->

        <el-table-column key="2" align="center" type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column key="3" align="center" prop="name" label="客户微信昵称" width="140" :show-overflow-tooltip="true">

          <template slot-scope="scope">
            <span class="Loss" v-if="scope.row.relation_state=='delete'">
              已流失
            </span>
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column key="4" align="center" prop="customer_remark_name" label="客户微信备注" width="160" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="5" align="center" prop="teamname" label="所属团队" width="120">
        </el-table-column>
        <el-table-column key="6" align="center" prop="realname" label="所属业务员" width="120">
        </el-table-column>
        <el-table-column key="7" align="center" label="企业标签" width="160" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-for="item in scope.row.tagList" :key="item">
              【{{item}}】
            </span>
          </template>
        </el-table-column>
        <el-table-column key="14" align="center" label="个人标签" width="160" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-for="item in scope.row.perTags" :key="item">
              【{{item}}】
            </span>
          </template>
        </el-table-column>
        <el-table-column key="8" align="center" prop="followupstepname" label="跟进步骤" width="100">
        </el-table-column>
        <el-table-column key="9" align="center" prop="addtimestr" label="添加时间" width="160">
        </el-table-column>
        <el-table-column key="10" align="center" prop="customerMobile" label="电话号码" width="160">
        </el-table-column>
        <el-table-column key="11" align="center" prop="channelname" label="渠道类型" width="80" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="12" align="center" prop="appname" label="流量来源" width="100" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="13" align="center" label="操作" width="180">
          <template slot-scope="scope">
            <!-- <a href="javascript:void(0);" class="editColor" @click="EditPopup(scope.row)">加入黑名单</a> -->
            <a href="javascript:void(0);" class="editColor" @click="openChatItem(scope.row)">聊天记录</a>
            <a href="javascript:void(0);" style="margin-left: 0.15rem;" class="editColor" @click="openDetails(scope.row)">详情</a>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize" :current-page="pageNum" @current-change="pageClick">
        </el-pagination>
      </div>
    </div>

    <el-drawer title="我是标题" size="50%" custom-class="customer-drawer" :visible.sync="drawer" :with-header="false">
      <div class="drawerBox">
        <div class="drawer_title">客户详情</div>

        <div class="drawer_main drawer_mainBox">
          <div class="drawer_nickBox">
            <img :src="qwCustomer.avatar" alt="">
            <div class="drawer_nick">
              <p>{{qwCustomer.customername}}</p>
              <p>已添加{{userData.length}}位员工</p>
            </div>
          </div>

          <div class="tagBox">
            <div>企业标签：</div>
            <p v-for="(item, index) in tagList" :key="index">{{item.tag_name}}</p>
          </div>
        </div>

        <div class="drawer_main" style="padding-left: 0;">
          <div class="drawer_digBox">
            <el-tabs v-model="drawer_activeName" @tab-click="handleClick">
              <el-tab-pane label="客户概况" name="first">
                <div class="table-box" style=" padding: 0rem;">
                  <el-table :data="userData" ref="userData" border style="width: 100%" class="splice-header">
                    <el-table-column key="1" align="center" prop="realname" label="所属员工" width="120" :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column key="2" align="center" prop="appprovincename" label="流量来源" width="100">
                    </el-table-column>
                    <el-table-column key="3" align="center" prop="" label="个人标签" width="160" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column key="4" align="center" prop="addtimestr" label="添加时间" width="160" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column key="5" align="center" prop="lastmsgtime" label="最近沟通时间" width="160" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column key="6" align="center" label="操作" width="auto">
                      <template slot-scope="scope">
                        <!-- @click="deleteItem(scope.row)" -->
                        <a href="javascript:void(0);" class="editColor" @click="openChat(scope.row)">聊天记录</a>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>

              </el-tab-pane>
              <el-tab-pane label="客户动态" name="second">
                <div>
                  <!-- <template>
                    <el-select v-model="radarActiveValue" clearable placeholder="请选择">
                      <el-option v-for="item in radarActive" :key="item.groupid" :label="item.groupname" :value="item.groupid">
                      </el-option>
                    </el-select>
                  </template> -->

                  <div class="common-select">
                    <!-- <div class="select-title  filtitle" >雷达动态</div> -->
                    <div class="select-content" style="margin-bottom: 0.3rem; border: none">
                      <el-select v-model="radarActiveValue" size="mini" placeholder="请选择流失状态" class="el-select-inners" @change="changeradarValue">
                        <el-option v-for="item in radarActive" :key="item.groupid" :label="item.groupname" :value="item.groupid">
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="block">
                    <el-timeline>
                      <template v-for="(item, index) in activities">
                        <el-timeline-item :timestamp="item.tracetime" placement="top" :key="index" class="card_a">
                          <el-card v-if="item.tracetype == 'openradar'">
                            <h4>{{item.title}}</h4>
                            <p>Ta点击了雷达<a :href="item.url" target="_bank">【{{ item.content }}】</a></p>
                          </el-card>
                          <el-card v-else>
                            <h4>{{item.title}}</h4>
                            <p>{{ item.content }}</p>
                          </el-card>
                        </el-timeline-item>
                      </template>

                    </el-timeline>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="所在群聊" name="third">
                <div class="table-box" style=" padding: 0rem;">
                  <el-table :data="qunListData" ref="qunListData" border style="width: 100%" class="splice-header">
                    <el-table-column key="1" align="center" prop="name" label="群聊名称" width="auto" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column key="2" align="center" prop="ownername" label="群主" width="120">
                    </el-table-column>
                    <el-table-column key="4" align="center" prop="addtimestr" label="添加时间" width="160" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column key="5" align="center" prop="lastmsgtime" label="最近沟通时间" width="160" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column key="6" align="center" label="操作" width="160">
                      <template slot-scope="scope">
                        <!-- @click="deleteItem(scope.row)" -->
                        <a href="javascript:void(0);" class="editColor" @click="openQunChat(scope.row)">聊天记录</a>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>

    </el-drawer>

    <el-drawer title="" size="50%" custom-class="customer-drawer chatRecord-drawer" v-if="chatRecord" :visible.sync="chatRecord" :before-close="closeChatRecord">
      <div class="drawerBox">
        <!-- 查看详情弹窗 :customerInfo="qwCustomer" :qundatas="qunDetailObj"-->
        <chat-Record :datas="detailObj"></chat-Record>
      </div>
      <!-- :showEditPopupDialogVisible.sync="showEditPopupDialogVisible" @updateVisible="updateVisibleId" -->
    </el-drawer>

  </div>
</template>
<script>

import $ from 'jquery';
import api from "../../utils/api.js";
import moment from "../../static/js/moment.js"
import { getData, my_url, crm_url } from '../../static/js/ajax.js';
import { formatDate } from '../../static/js/common.js';
import chatRecord from "../../components/chatRecord/chatRecord.vue";
export default {
  components: {
    chatRecord
  },
  data() {
    return {
      // 筛选项
      selectTime: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').add(1, "days").format('YYYY-MM-DD')], //出单日期
      cusname: '', //客户姓名
      cusMobile: '',//电话号码
      SalesmanIdBox: [],
      userName: '',//业务员姓名
      channelList: [],
      channelValue: '',
      sourceList: [],
      sourceValue: '',
      weChatTagsList: [],
      weChatTag: '',
      lossStatusList: [
        {
          dd_value: '已添加',
          dd_key: 'add'
        },
        {
          dd_value: '已流失',
          dd_key: 'delete'
        }
      ],
      lossStatus: '',

      // 列表项
      tableData: [],
      loading: false,
      // 分页
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      checkedAllNum: 0,
      multipleSelection: '',
      customerCount: 0,
      // 侧拉
      drawer: false,
      qwCustomer: {},//客户头像、昵称等基本信息



      tagList: [],
      drawer_activeName: 'first',
      // 客户动态
      activities: [],
      radarActiveValue: '',
      radarActive: [{
        groupname: "全部动态",
        groupid: '',
      }, {
        groupname: "添加员工",
        groupid: 'addcustomer',
      },
      {
        groupname: "修改标签",
        groupid: 'addtag',
      },
      {
        groupname: "打开雷达",
        groupid: 'openradar',
      },
      {
        groupname: "删除好友",
        groupid: 'deletecustomer',
      },

      {
        groupname: "客户进群",
        groupid: 'customerinqun',
      },
      {
        groupname: "客户离群",
        groupid: 'customeroutqun',
      },
      ],
      // 客户概况
      userData: [],
      // 群聊
      qunListData: [],



      // 聊天记录
      chatRecord: false,
      detailObj: {},
      showEditPopupDialogVisible: false,
      // qunDetailObj: {},



      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick(picker) {
            const end = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
            const start = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
            end.setTime(end.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '昨日',
          onClick(picker) {
            const end = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
            const start = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近7天',
          onClick(picker) {
            const end = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
            const start = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近30天',
          onClick(picker) {
            const end = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
            const start = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        },
        {
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
        }
        ]
      },
    }
  },

  computed: {

  },
  watch: {


  },
  mounted: function () {
    // 新的
    this.getUserIdData()
    this.getchannelNameList(); //渠道类型列表、、
    // this.openDetails();
    this.getTags()
    this.search(1)
    // this.insrevisitstate(); //回访状态
    // this.getTeamList(); //选择团队
    // this.search(1); //搜索
    // this.getcountry(); //省市区
    // this.abpolisystate(); //保单状态
    // this.yewu(); //所有业务员姓名
    // this.$nextTick(() => {
    //   //数据字典
    //   let _this = this
    //   this.insOrganList(); //所有保险公司
    // })
  },
  methods: {

    init(qwuserid, customerid, isopen) {
      var _this = this
      // 该客户的企业标签
      var dd = {
        qwuserid: qwuserid,
        customerid: customerid,
      }
      api.getOneQwCustomer(dd).then((data) => {//当前客户的企业标签
        _this.qwCustomer = data.qwCustomer
        if (data.qwCustomer.tags && data.qwCustomer.tags != null) {
          var tag = JSON.parse(data.qwCustomer.tags)
          _this.tagList = []
          tag.forEach((item, index) => {
            if (item.type == '1') {
              _this.tagList.push(item)
            }
          })
        } else {
          _this.tagList = []
        }
      })
      // 客户动态
      this.changeradarValue(qwuserid, customerid)
      // 该客户的群聊
      var ss = {
        qwuserid: customerid,
        pageNumber: 1,
        pageSize: 20,
      }
      api.getQunList(ss).then((data) => {
        _this.qunListData = data.qwQunList
      })
      // 客户概况
      var params = {
        customerid: customerid,
        pageNumber: 1,
        pageSize: 20,
      }
      api.getcustomTouser(params).then((data) => {
        _this.userData = data.qwUserList
      })

      if (isopen) {
        this.chatRecord = true
      } else {
        this.drawer = true
      }
    },

    // 客户动态
    changeradarValue(qwuserid, customerid) {
      var _this = this
      var ee = {
        qwuserid: this.detailObj.qwuserid,
        customerid: this.detailObj.customerid,
        tracetype: this.radarActiveValue
      }
      _this.activities = []
      api.getCustomerTraceList(ee).then((data) => {
        var data = data.rows


        data.forEach((item, index) => {
          if (item.tracetype == 'openradar') {
            item['title'] = '打开雷达'
            item['content'] = JSON.parse(item.buzcontent).radartitle
            item['url'] = JSON.parse(item.buzcontent).radarurl
          } else if (item.tracetype == 'addtag') {
            item['title'] = '修改标签'
            var tagList = JSON.parse(item.buzcontent)
            var dd = ''
            for (var i = 0; i < tagList.length; i++) {
              dd += '【' + tagList[i].tag_name + '】'
            }
            item['content'] = item.bizinfo + "修改了标签，剩余标签为：" + dd

          } else if (item.tracetype == 'deletecustomer') {
            item['title'] = '删除好友'
            item['content'] = "Ta删除了员工" + item.bizinfo
          } else if (item.tracetype == 'addcustomer') {
            item['title'] = '添加好友'
            item['content'] = "Ta添加了员工" + item.bizinfo
          } else if (item.tracetype == 'customerinqun') {
            item['title'] = '客户进群'
            item['content'] = "Ta进入群聊" + item.bizinfo
          } else if (item.tracetype == 'customeroutqun') {
            item['title'] = '客户离群'
            item['content'] = "Ta退出群聊" + item.bizinfo
          }
          _this.activities = data
        })
      })

    },




    getTags() {
      var _this = this
      api.getTags().then((data) => {//全部企业标签
        var TagsList = data.tag_group
        _this.weChatTagsList = _this.renameObjectKey(TagsList)
      })
    },
    // 直接在对象里添加需要的元素将值赋值上去 转化键值对的键名
    renameObjectKey(obj) {
      obj.forEach(item => {
        item.label = item.group_name
        item.value = item.group_id
        if (item.tag && item.tag.length > 0) {
          // this.renameObjectKey(item.tag);
          item.children = item.tag
          item.children.forEach(item => {
            item.label = item.name
            item.value = item.id
          })
        }
      });
      return obj
    },






    tagsChange() { },

    // 获取员工姓名
    querySearchId(queryString, cb) {
      var SalesmanIdBox = this.SalesmanIdBox;
      var results = queryString ? SalesmanIdBox.filter(this.createFilterId(queryString)) : SalesmanIdBox;
      cb(results);
    },
    createFilterId(queryString) {
      return (SalesmanIdBox) => {
        return (SalesmanIdBox.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    getUserIdData() {
      let _this = this;
      getData('post', my_url + '/crm/auth/getUserIdNameList.do', function (data) { //公司全部人员
        // getData('post', my_url + '/crm/auth/getAllUserIdNameList.do', function (data) { //公司全部人员
        if (data.code == 0) {
          let nameList = data.namelist;
          nameList.forEach(res => {
            _this.SalesmanIdBox.push({
              "value": res.username,
              "id": res.userid
            });
          })
        }
      });
    },
    // 确定员工姓名
    handleSelectId(item) {

    },



    //获取渠道类型列表
    getchannelNameList() {
      let _this = this;
      getData('post', my_url + '/crm/common/getDictList.do', function (data) {
        if (data.code == 0) {
          let {
            dictList
          } = data;
          _this.channelList = data.dictList;
        }
      }, {
        dict_type: 'source'
      });
    },
    // 选择渠道类型
    channelSelect() {
      var _this = this
      getData('post', my_url + '/crm/common/getDictList.do', function (data) {
        if (data.code == 0) {
          _this.isSource = true
          let {
            dictList
          } = data;
          _this.sourceList = data.dictList;
        } else {
          _this.isSource = false
        }
      }, {
        dict_type: 'sourcedetail_' + this.channelValue,
        special: 'dis'
      });
    },

    search(page) {
      var _this = this
      this.loading = true
      if (this.selectTime == null || this.selectTime.length <= 0) {
        this.selectTime = ['', '']
      }
      var params = {
        addtimestart: this.selectTime[0],
        addtimeend: this.selectTime[1],
        cusname: this.cusname,
        mobile: this.cusMobile,
        username: this.userName,
        channel: this.channelValue,
        appname: this.sourceValue,
        tag: this.weChatTag[1],
        relationstate: this.lossStatus,
        pageNumber: page,
        pageSize: this.pageSize,
      }
      if (page == 1) {
        this.getCustomerCount(params)
      }

      getData("post", my_url + "/crm/qwMan/getCustomerList.do", function (data) {
        let { rows, total } = data;
        rows.forEach(item => {
          if (item.tags && item.tags != null) {
            var tags = JSON.parse(item.tags)
            var tagList = []
            var perTags = []
            tags.forEach(item => {
              if (item.type == '1') {
                tagList.push(item.tag_name)
              } else {
                perTags.push(item.tag_name)
              }

            })
            item.tagList = tagList
            item['perTags'] = perTags
          }
          if (item.customer_mobile && item.customer_mobile != null) {
            var customerMobile = JSON.parse(item.customer_mobile)
            var telphone = customerMobile[0].substr(0, 4) + '****' + customerMobile[0].substr(8);

            item.customerMobile = telphone
          }
        })
        _this.tableData = rows
        _this.pageTotal = total
        _this.loading = false
      },
        params
      );
    },


    getCustomerCount(params) {
      var _this = this
      getData("post", my_url + "/crm/qwMan/getCustomerCount.do", function (data) {
        _this.customerCount = data.customerCount
      }, params)
    },



    // //当表格的排序条件发生变化的时候会触发该事件
    // sortChange(val) {
    //   this.order = val.order
    //   this.prop = val.prop
    //   this.search(1);
    // },
    //当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.checkedAllNum = val.length;
    },
    //跳转页数
    pageClick(page) {
      this.pageNum = page;
      this.search(page)
    },

    handleClick(tab, event) {

    },


    // 重置
    screenReset() {
      this.selectTime = '';
      this.cusname = '';
      this.cusMobile = '';
      this.userName = '';
      this.channelValue = '';
      this.sourceValue = '';
      this.weChatTag = '';
      this.lossStatus = '';
      // this.search(1)
    },

    // 打开首页聊天记录
    openChatItem(item) {
 

      this.detailObj = Object.assign({}, item)
      this.activeName = ''
      this.detailObj['activeName'] = ''
      this.init(item.qwuserid, item.customerid, true)
    },

    // 打开详情页
    openDetails(item) {
      var copyItem = Object.assign({}, item)
      this.detailObj = copyItem
      this.init(copyItem.qwuserid, copyItem.customerid, false)
    },
    // 打开次页聊天记录
    openChat(item) {
 
      // this.detailObj = item
      var copyItem = Object.assign({}, item)
      this.activeName = ''
      this.detailObj['qwuserid'] = copyItem.qwuserid
      this.detailObj['qwuserurl'] = copyItem.qwuserurl
      this.detailObj['activeName'] = ''
      this.chatRecord = true
    },
    // 关闭聊天记录
    closeChatRecord() {
      this.chatRecord = false
      // this.detailObj = {}
    },
    // 打开群聊天记录
    openQunChat(item) {
 
      this.detailObj['qunid'] = item.qunid
      this.detailObj['name'] = item.name
      this.detailObj['activeName'] = 'third'
      this.chatRecord = true
    }
  }
}
</script>

<style scoped>
.editColor {
  color: #4985e5;
  /* margin-left: 0.15rem; */
}
.Loss {
  display: inline-block;
  width: 50px;
  height: 20px;
  line-height: 20px;
  background: #f4e8e7ff;
  border: 1px solid #eef1f7;
  border-radius: 11px;
  color: #dc220dff;
  font-size: 0.12rem;
}

.totalNum {
  color: #010101ff;
  font-size: 0.14rem;
  margin-bottom: 0.1rem;
}
.totalCom {
  color: #010101ff;
  font-weight: bold;
}

.card_a a {
  color: #337ab7;
}
.el-tabs__nav-wrap::after {
  background-color: #e4e7ed !important;
}
</style>
<style>
.viewer-in {
  z-index: 9999 !important;
}
.el-card__body {
  padding: 0.1rem;
}
.digTags .el-cascader-panel {
  height: 124px;
  border-radius: 4px;
}

.drawerBox {
  width: 100%;
}
.drawer_title {
  width: 100%;
  padding: 0.15rem;
  padding-left: 0.35rem;
  border-bottom: 2px solid rgba(244, 244, 244, 1);
}
.drawer_main {
  padding: 0.15rem;
  padding-left: 0.35rem;
}
.drawer_mainBox {
  border-bottom: 0.1rem solid rgba(244, 244, 244, 1);
}
.drawer_nickBox {
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
}
.drawer_nickBox img {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.05rem;
}
.drawer_nick {
  margin-left: 0.1rem;
}
.drawer_nick p:first-child {
  font-weight: bold;
  font-size: 0.15rem;
}
.drawer_nick p:last-child {
  font-size: 0.13rem;
  margin-top: 5px;
  color: #807e7e;
}

.tagBox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.15rem;
  margin-top: 0.2rem;
}
.tagBox p {
  border: 1px solid #c4c4c4;
  border-radius: 0.2rem;
  width: auto;
  padding: 0 0.1rem;

  margin: 0.05rem 0.05rem 0.05rem 0;
  background: #f3f3f4;
  color: #333;
}

.el-tabs__item.is-active {
  color: #dc220d;
}
.el-tabs__active-bar {
  background-color: #dc220d;
}
.el-tabs__item:hover {
  color: #dc220d;
}
.drawer_digBox .el-tabs__nav-wrap {
  padding-left: 0.35rem;
}
.drawer_digBox .el-tabs__content {
  padding: 0.2rem 0.35rem;
}

.el-timeline-item__node {
  background-color: rgb(11, 189, 135);
}
.el-timeline-item__tail {
  border-left: 2px solid rgb(11, 189, 135);
}

.chatRecord-drawer .el-drawer__body {
  overflow: hidden;
}

.el-drawer__header {
  height: 0.71rem;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 0.1rem;
}

.chatRecord-drawer .el-drawer__header .el-drawer__close-btn {
  margin-top: -0.25rem;
}

.el-tabs__header {
  margin-bottom: 0;
}
h4 {
  font-weight: bold;
  margin-bottom: 0.1rem;
}
.el-cascader {
  width: 100%;
  line-height: normal;
}
.el-cascader .el-input__inner {
  margin-left: 0rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #979797;
  font-size: 0.14rem;
}

.el-cascader .el-input__icon {
  line-height: normal;
}
.el-cascader-node__label {
  font-size: 0.12rem;
}
/* .digTags,.el-cascader__dropdown{
  margin-top: 20px!important;
} */

.drawer_main .el-tabs__nav-wrap::after {
  background-color: #e4e7ed !important;
}
</style>
 