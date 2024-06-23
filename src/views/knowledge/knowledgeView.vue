<template>
  <div class="customerManagement" id="container" v-cloak style=" width: 17.1rem;">
    <div class="search-header">
      <div class="search-box clearfix">
        <div class="common-select" v-if="CJGselectValue === '保单检视'">
          <div class="select-title" style="width: 1.28rem">保险公司</div>
          <div class="select-content" style="width: calc(100% - 1.28rem);">
            <el-autocomplete class="el-input-inners" v-model="insorganName" :trigger-on-focus="false" :fetch-suggestions="querySearch1" size="mini" placeholder="请输入保险公司" clearable></el-autocomplete>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">关键字搜索</div>
          <div class="select-content" style="width: calc(100% - 1.28rem);">
            <el-autocomplete class="el-input-inners" v-model="title" :trigger-on-focus="false" :fetch-suggestions="querySearch" size="mini" placeholder=""></el-autocomplete>
          </div>
        </div>
        <div class="common-select" v-if="false">
          <div class="select-title" style="width: 1.28rem">跟进步骤</div>
          <div class="select-content" style="width: calc(100% - 1.28rem);">
            <el-dropdown trigger="click" placement="top" ref="disTeam1" style="width: 100%">
              <span class="el-dropdown-inners" clearable style="width: auto">
                {{teamNames1}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-tree @check="handleCheckChange1" :data="askedflowList" ref="tree1" show-checkbox node-key="id" :default-expanded-keys="['01','02']" :default-checked-keys="selectAskedflow" :props="defaultProps1">
                </el-tree>
                <div class="sure-footer">
                 
                  <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="my_sureOne1">取消</div>
                  <div class="my-sure" @click="my_sure1">确定</div>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="common-select" v-if="false">
          <div class="select-title" style="width: 1.28rem">所属分类</div>
          <div class="select-content" style="width: calc(100% - 1.28rem);">
            <el-dropdown trigger="click" placement="top" ref="disTeam2" style="width: 100%">
              <span class="el-dropdown-inners" clearable style="width: auto">
                {{teamNames2}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-tree @check="handleCheckChange2" :data="askedtypeList" ref="tree2" show-checkbox node-key="id" :default-expanded-keys="['01','02']" :default-checked-keys="selectAskedtype" :props="defaultProps">
                </el-tree>
                <div class="sure-footer">
                  
                
                  <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="my_sureOne2">取消</div>
                  <div class="my-sure" @click="my_sure2">确定</div>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="common-select" v-if="CJGselectValue === '解答疑义'" style="width: 30%">
          <div class="select-title" style="width: 1.6rem">最后修改时间</div>
          <div class="select-content" style="height: 0.3rem; width: calc(100% - 1.6rem); border: none">
            <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="datetimerange" align="right" size="mini" value-format="yyyy-MM-dd HH:mm:ss" unlink-panels range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        <div class="common-select" v-else style="width: 30%">
          <div class="select-title" style="width: 1.6rem">最后修改时间</div>
          <div class="select-content" style="height: 0.3rem; width: calc(100% - 1.6rem); border: none">
            <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="datetimerange" align="right" size="mini" value-format="yyyy-MM-dd HH:mm:ss" unlink-panels range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        <div class="common-select" v-if="CJGselectValue === '疾病核保'">
          <div class="search-btn" @click="search">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
        </div>
        <div class="common-select" style="float: right;width: 11.5%;" v-else-if="CJGselectValue === '解答疑义'">
          <div class="search-btn" @click="search">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
        </div>
        <div class="common-select" style="float: right; width: 20%;" v-else>
          <div class="search-btn" @click="search">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
        </div>
      </div>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%" :header-cell-class-name="headerClassName">
        <el-table-column key="1" align="center" type="index" label="序号">
        </el-table-column>
        <el-table-column key="2" sortable align="center" prop="modifydate" label="最后修改时间" width="170">
        </el-table-column>
        <el-table-column key="3" v-if="CJGselectValue === '保单检视'" align="center" prop="insorganname" label="保险公司" width='140' :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="4" v-if="CJGselectValue === '解答疑义'" align="left" prop="title" label="疑义问题" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="5" v-else align="left" prop="title" label="标题" width="auto" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="6" v-if="CJGselectValue === '解答疑义'" align="center" prop="askedtypedesc" label="所属分类" width="180" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="7" v-if="CJGselectValue === '解答疑义'" align="center" prop="askedflowdesc" label="跟进步骤" width="180" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="8" align="center" label="操作" width="140">
          <template slot-scope="scope">
            <a class="edit option" href="javascript:void(0);" @click="showEditPopup(scope.row)">查看</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize" :current-page="pageNum" @current-change="pageClick">
      </el-pagination>
    </div>
    <el-dialog :title="CJGselectValue" :visible.sync="drawer" width="1100px">
      <div class="step-list wei-step-list" v-if="CJGselectValue === '保单检视'">
        <div class="item-section">
          <label>标题</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="bdjsItem.title" :disabled="true">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>保险公司</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="bdjsItem.insorganname" :disabled="true">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>保障详情</label>
          <div class="right-content">
            <div class="editor-box">
              <div id="div1" class="toolbar"></div>
              <div id="div2" class="text">
              </div>
            </div>
          </div>
        </div>
        <div class="item-section">
          <label>建议规划</label>
          <div class="right-content">
            <div class="editor-box">
              <div id="div3" class="toolbar"></div>
              <div id="div4" class="text">
              </div>
            </div>
          </div>
        </div>
        <div class="item-section">
          <label>附件</label>
          <div class="right-content">
            <ul class="enclosure-list" v-if="fileList.length">
              <li class="item" v-for="(item,index) in fileList" :key="index">
                <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{item.filename}}</div>
                <a :href="'https://crm.meihualife.com/filedownload.do?fileid=' + item.fileid" class="download-btn" :download="item.filename">下载</a>
              </li>
            </ul>
            <ul class="enclosure-list" v-else>
              <li class="item"></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="step-list wei-step-list" v-if="CJGselectValue === '疾病核保'">
        <div class="item-section">
          <label>标题</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="jbhbItem.title" :disabled="true">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>疾病描述</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="jbhbItem.disdescription" :disabled="true" resize="none" type="textarea" autosize>
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>核保建议</label>
          <div class="right-content">
            <div class="tab-head">
              <div class="tab" :class="currentSuggestion === 'zjsuggestion' ? 'actived' : ''" @click="changeSuggestion('zjsuggestion')">重疾险</div>
              <div class="tab" :class="currentSuggestion === 'ylsuggestion' ? 'actived' : ''" @click="changeSuggestion('ylsuggestion')">医疗险</div>
            </div>
            <el-input resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="10" placeholder="请输入内容" :disabled="true" v-if="currentSuggestion === 'zjsuggestion'" v-model="jbhbItem.zjsuggestion">
            </el-input>
            <el-input resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="10" placeholder="请输入内容" v-else :disabled="true" v-model="jbhbItem.ylsuggestion">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>可投产品</label>
          <div class="right-content">
            <div class="add-item-wrap">
              <div class="list" v-for="(item,index) in jbhbItem.productJsonStr" :key="index">
                <div class="item">
                  <label>保险公司</label>
                  <div class="right-content">
                    <el-input placeholder="请输入" size="mini" v-model="item.insorganname" :disabled="true">
                    </el-input>
                  </div>
                </div>
                <div class="item">
                  <label>险种名称</label>
                  <div class="right-content">
                    <el-input placeholder="请输入" size="mini" v-model="item.riskname" :disabled="true">
                    </el-input>
                  </div>
                </div>
                <div class="item">
                  <label>承保说明</label>
                  <div class="right-content">
                    <el-input placeholder="请输入" size="mini" v-model="item.acceptremark" :disabled="true" resize="none" type="textarea" autosize>
                    </el-input>
                  </div>
                </div>
                <div class="item">
                  <label>标注</label>
                  <div class="right-content" style="margin-top: 0.03rem;">
                    <el-radio v-model="item.labeltype" :label="'01'" :disabled="true">标体承保
                    </el-radio>
                    <el-radio v-model="item.labeltype" :label="'03'" style="margin-left: 0.2rem;" :disabled="true">
                      加费承保
                    </el-radio>
                    <el-radio v-model="item.labeltype" :label="'02'" :disabled="true" style="margin-left: 0.2rem;">除外承保
                    </el-radio>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="step-list wei-step-list" v-if="CJGselectValue === '解答疑义'">
        <div class="item-section">
          <label>疑义问题</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="dkwItem.title" :disabled="true">
            </el-input>
          </div>
        </div>

        <div class="item-section">
          <label>解答示范</label>
          <div class="right-content">
            <div class="editor-box">
              <div id="div5" class="toolbar"></div>
              <div id="div6" class="text">
              </div>
            </div>
          </div>
        </div>
        <div class="item-section">
          <label>附件</label>
          <div class="right-content">
            <ul class="enclosure-list" v-if="fileList.length">
              <li class="item" v-for="(item,index) in fileList" :key="index">
                <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{item.filename}}</div>
                <a :href="'https://crm.meihualife.com/filedownload.do?fileid=' + item.fileid" class="download-btn" :download="item.filename">下载</a>
              </li>
            </ul>
            <ul class="enclosure-list" v-else>
              <li class="item"></li>
            </ul>
          </div>
        </div>
        <div class="item-section">
          <label>点评</label>
          <div class="right-content">
            <div class="editor-box">
              <div id="div7" class="toolbar"></div>
              <div id="div8" class="text">
              </div>
            </div>
          </div>
        </div>

      </div>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery';
import wangEditor from '@/components/wangEditor/release/wangEditor.min.js';
import { getData, my_url } from '../../static/js/ajax.js';
import { formatDate } from '../../static/js/common.js';
let editor9, editor10, editor11, editor12;
export default {
  data() {
    return {
      askedtypeList: [],
      askedflowList: [],
      selectAskedflow: [],
      selectAskedtype: [],
      teamNames2: '分类选择',
      teamNames1: '跟进步骤',
      my_list2: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultProps1: {
        id: 'children',
        label: 'label'
      },

      menutype: '03',
      drawer: false,
      currentSuggestion: 'zjsuggestion',
      fileList: '',
      //保单检视
      bdjsItem: {
        title: '',
        insorgancode: '',
        riskcode: '',
        marketdate: '',
        goodpoint: '',
        badpoint: '',
        suggestion: '',
        policydetail: '',
      },
      //疾病核保
      jbhbItem: {
        title: '',
        disdescription: '',
        zjsuggestion: '',
        ylsuggestion: '',
        productJsonStr: []
      },
      //解答疑义
      dkwItem: {
        title: '',
        content: '',
        voice: ''
      },
      CJGselectList: ['保单检视', '疾病核保', '解答疑义'],
      CJGselectValue: '保单检视',
      addCJGFIrstVisible: false,
      addCJGItemVisible: false,
      selectTime: '',
      Salesman: '',
      team: '',
      cjgType: '',
      title: '',
      currentReadid: '',
      currentUwid: '',
      currentReadid: '',
      loading: false,
      SalesmanBox: [],
      SalesmanBox1: [],
      insorganName: '',
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      tableData: [],
      CJGTypeList: [],
      noticeTypeList: [],
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
        }]
      },
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
    }
  },
  computed: {

  },
  watch: {
    cjgType(val) {
      if (val === '01') {
        this.CJGselectValue = '保单检视'
      }
      if (val === '02') {
        this.CJGselectValue = '疾病核保'
      }
      if (val === '03') {
        this.CJGselectValue = '解答疑义'
      }
    }
  },
  mounted: function () {
    this.getAskedType()
    this.$nextTick(() => {
      //数据字典
      let _this = this
      getData('post', my_url + '/crm/common/getDictList.do', function (data) {
        if (data.code == 0) {
          let {
            dictList
          } = data;
          _this.CJGTypeList = dictList;
        }
      }, {
        dict_type: 'konwledge_type'
      });
      this.cjgType = this.$route.query.konwledgetype || '01';
      this.getCJGList()
      this.insOrganList()
      this.getSearchData()
    })
  },
  methods: {
    fileTypeFun(type) {
      if (type) {
        var type = type.toLowerCase()
        if (type == "jpg" || type == "png") {
          return 'file-type file-type-img'
        } else if (type == "xlsx" || type == "xls") {
          return 'file-type file-type-xlsx'
        } else {
          return `file-type file-type-${type}`
        }
      } else {
        return 'file-type file-type-file'
      }
    },
    headerClassName(row) {
      if (row.column.property == 'askedtypedesc') return 'askedtypedescClass'
      if (row.column.property == 'title') return 'titleClass'
    },
    //分类流程
    getAskedType() {
      let _this = this
      getData('post', my_url + '/crm/knowledge/getAskedTypeFlow.do', function (data) {
        if (data.code == 0) {
          let askedtype = data.askedtype
          let askedflow = data.askedflow
          askedtype.forEach(res => {
            _this.askedtypeList.push({
              "label": res.dd_value,
              "id": res.dd_key
            });
          })
          askedflow.forEach(res => {
            _this.askedflowList.push({
              "label": res.dd_value,
              "id": res.dd_key
            });
          })
        }
      });
    },
    handleCheckChange1(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label)
      })
      this.teamNames1 = teamListName.join(',');
      this.dkwItem.askedflow = (checked.checkedKeys).join(',');
    },
    my_sureOne1() {
      this.$refs.disTeam1.hide();
      this.teamNames1 = "跟进步骤";
      this.dkwItem.askedflow = '';
      this.$refs.tree1.setCheckedKeys([]);
      this.selectAskedflow = []
      this.search();
    },
    my_sure1() {
      this.$refs.disTeam1.hide();
      this.search();
    },

    my_sureOne2() {
      this.$refs.disTeam2.hide();
      this.teamNames2 = "分类选择";
      this.dkwItem.askedtype = '';
      this.$refs.tree2.setCheckedKeys([]);
      this.selectAskedtype = []
      this.search();
    },
    my_sure2() {
      this.$refs.disTeam2.hide();
      this.search();
    },
    handleCheckChange2(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label)
      })
      this.teamNames2 = teamListName.join(',');
      this.dkwItem.askedtype = (checked.checkedKeys).join(',');
    },
    handleNodeClick(data) {
      console.log(data);
    },
    checked() {
      this.getCJGList()
    },
    createFilter(queryString) {
      return (SalesmanBox) => {
        return (SalesmanBox.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    getSearchData() {
      let _this = this;
      getData('post', my_url + '/crm/knowledge/getKnowledgeTitle.do', function (data) { //渠道类型
        if (data.code == 0) {
          let nameList = data.titleList;
          nameList.forEach(res => {
            _this.SalesmanBox.push({
              "value": res
            });
          })
        }
      }, {
        type: this.cjgType + ''
      });
    },
    querySearch(queryString, cb) {
      var SalesmanBox = this.SalesmanBox;
      var results = queryString ? SalesmanBox.filter(this.createFilter(queryString)) : SalesmanBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter1(queryString) {
      return (SalesmanBox) => {
        return (SalesmanBox.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
    },
    querySearch1(queryString, cb) {
      var SalesmanBox = this.SalesmanBox1;
      var results = queryString ? SalesmanBox.filter(this.createFilter1(queryString)) : SalesmanBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    insOrganList() {
      let _this = this;
      getData('post', my_url + '/crm/common/getInsOrganList.do', function (data) { //渠道类型
        if (data.code == 0) {
          _this.SalesmanBox1 = []
          let nameList = data.dictList;
          nameList.forEach(res => {
            _this.SalesmanBox1.push({
              "value": res.dd_value,
              "key": res.dd_key
            });
          })
        }
      }, {
        // type: this.cjgType
      });
    },
    tirggerFile(e) {
      this.updateCJGitem('isUpload').then(res => {
        let buztype, buzid
        if (this.CJGselectValue === '保单检视') {
          buzid = res.readid
          buztype = '0101'
        }
        if (this.CJGselectValue === '疾病核保') {
          buzid = res.uwid
          buztype = '0102'
        }
        if (this.CJGselectValue === '解答疑义') {
          buzid = res.answerid
          buztype = '0103'
        }
        let baseid = res.baseid
        let formData = new FormData();
        formData.append('myFile', e.target.files[0]);
        formData.append('secondbuzid', res.baseid);
        formData.append('buztype', buztype);
        formData.append('buzid', buzid);
        let that = this
        $.ajax({
          url: my_url + '/crm/fileupload/fileUpload.do',
          type: 'POST',
          cache: false,
          data: formData,
          processData: false,
          contentType: false
        }).done(function (res) {
          var ss = JSON.parse(res)
          if (ss.code == "1") {
            _this.$message({
              showClose: true,
              message: ss.msg,
              duration: 3000,
              type: 'error'
            });
          }
          that.getUploadFile(baseid)
        }).fail(function (res) {
          console.log(res)
        });
      }).catch(res => {
        console.log(res)
      })
    },
    getUploadFile(id) {
      let body = {
        secondid: id,
      }
      getData('post', my_url + '/crm/fileupload/getFileListBySecondId.do', res => {
        if (res.code == 0) {
          this.fileList = res.fileList
        }
      }, body);
    },
    itemReset() {
      //保单检视
      this.bdjsItem = {
        title: '',
        insorgancode: '',
        riskcode: '',
        marketdate: '',
        goodpoint: '',
        badpoint: '',
        suggestion: '',
        policydetail: '',
      }
      //疾病核保
      this.jbhbItem = {
        title: '',
        disdescription: '',
        zjsuggestion: '',
        ylsuggestion: '',
        productJsonStr: [{
          insorgancode: '',
          riskcode: '',
          acceptremark: '',
          labeltype: '01',
        }]
      }
      //解答疑义
      this.dkwItem = {
        title: '',
        content: '',
        voice: ''
      }
    },
    addProduct() {
      this.jbhbItem.productJsonStr.push({
        insorgancode: '',
        riskcode: '',
        acceptremark: '',
        labeltype: '01',
      })
      this.$set(this.jbhbItem, 'productJsonStr', this.jbhbItem.productJsonStr)
    },
    deleteProduct() {
      this.jbhbItem.productJsonStr.pop()
    },
    changeSuggestion(Suggestion) {
      this.currentSuggestion = Suggestion
    },
    back() {
      this.addCJGFIrstVisible = true
      this.addCJGItemVisible = false
    },
    deleteItem(item) {
      let body = {
        baseid: item.baseid,
      }
      getData('post', my_url + '/crm/knowledge/knowledgeBaseDelete.do', data => {
        if (data.code == 0) {
          this.getCJGList()
        }
      }, body);
    },
    showEditPopup(item) {
      this.getItem(item).then(res => {
        this.getUploadFile(item.baseid)
        let body, url
        if (item.type === '01') {
          this.bdjsItem = res.policyread
          this.bdjsItem.baseid = item.baseid
        }
        if (item.type === '02') {
          this.jbhbItem = res.diseaseUw
          this.jbhbItem.baseid = item.baseid
          this.$set(this.jbhbItem, 'productJsonStr', res.diseaseUwProductList)
        }
        if (item.type === '03') {
          this.dkwItem = res.anscusque
          this.dkwItem.baseid = item.baseid
        }
        this.CJGselectValue = item.typename
        this.drawer = true
        this.$nextTick(() => {
          this.newWangEditor('', '#div2')
          if (this.bdjsItem.policydetail) {
            editor9.txt.html(this.bdjsItem.policydetail)
            editor9.$textElem.attr('contenteditable', false)
          }
        })
        this.$nextTick(() => {
          this.newWangEditor1('', '#div4')
          if (this.bdjsItem.suggestion) {
            editor10.txt.html(this.bdjsItem.suggestion)
            editor10.$textElem.attr('contenteditable', false)
          }
        })
        this.$nextTick(() => {
          this.newWangEditor2('', '#div6')
          this.newWangEditor3('', '#div8')
          if (this.dkwItem.content) {
            editor11.txt.html(this.dkwItem.content)
            editor12.txt.html(this.dkwItem.voice)
            editor11.$textElem.attr('contenteditable', false)
            editor12.$textElem.attr('contenteditable', false)
          }
        })
      })
    },
    getItem(item) {
      let body = {
        baseid: item.baseid
      },
        url
      if (item.type === '01') {
        url = '/crm/knowledge/getOnePolicyRead.do'
      }
      if (item.type === '02') {
        url = '/crm/knowledge/getOneDiseaseUw.do'
      }
      if (item.type === '03') {
        url = '/crm/knowledge/getOneAnsCusQue.do'
      }

      return new Promise((resovle, reject) => {
        getData('post', my_url + url, res => {
          if (res.code == 0) {
            resovle(res)
          } else {
            reject()
          }
        }, body);
      })
    },
    search() {
      this.pageNum = 1
      this.pageSize = 20
      this.getCJGList()
    },
    getCJGList() {
      var insorgancode = ''
      var insorganList = this.SalesmanBox1;
      for (var i = 0; i < insorganList.length; i++) {
        if (insorganList[i].value == this.insorganName) {
          insorgancode = insorganList[i].key
        }
      }
      let body = {
        title: this.title,
        type: this.cjgType,
        modifyStartDate: this.selectTime ? this.selectTime[0] : '',
        modifyEndDate: this.selectTime ? this.selectTime[1] : '',
        pageNumber: this.pageNum,
        pageSize: this.pageSize,
        askedtype: this.dkwItem.askedtype,
        askedflow: this.dkwItem.askedflow,
        insorgancode: insorgancode,
      }
      getData('post', my_url + '/crm/knowledge/getKnowledgeList.do', data => {
        this.tableData = data.rows
        this.pageTotal = data.total
      }, body);
    },
    showaddCJGFIrstVisible() {
      this.addCJGFIrstVisible = true
      this.itemReset()
    },
    hideaddCJGFIrstVisible() {
      this.addCJGFIrstVisible = false
    },
    reset() { //重置
      this.title = ''
      this.selectTime = ''
      this.selectAskedtype = []
      this.selectAskedflow = []
      this.teamNames1 = "跟进步骤"
      this.teamNames2 = "分类选择"
      this.dkwItem.askedtype = ''
      this.dkwItem.askedflow = ''
      this.getCJGList()
      // this.cjgType = ''
    },
    newWangEditor(el1, el2) {
      editor9 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      editor9.customConfig.pasteFilterStyle = false
      // 隐藏“网络图片”tab
      editor9.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor9.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor9.customConfig.uploadImgShowBase64 = true
      editor9.customConfig.menus = [
        'image',
      ]
      // 上传图片到服务器
      editor9.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor9.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor9.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

      //自定义上传图片事件
      editor9.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {

        },
        success: function (xhr, editor, result) {
          console.log("上传成功");

        },
        fail: function (xhr, editor, result) {
          console.log("上传失败,原因是" + result);
        },
        error: function (xhr, editor) {
          console.log("上传出错");
        },
        timeout: function (xhr, editor) {
          console.log("上传超时");
        }
      }
      editor9.create()
    },
    newWangEditor1(el1, el2) {
      editor10 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      editor10.customConfig.pasteFilterStyle = false
      // 隐藏“网络图片”tab
      editor10.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor10.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor.customConfig.uploadImgShowBase64 = true
      editor10.customConfig.menus = [
        'image',
      ]
      // 上传图片到服务器
      editor10.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor10.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor10.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

      //自定义上传图片事件
      editor10.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {

        },
        success: function (xhr, editor, result) {
          console.log("上传成功");

        },
        fail: function (xhr, editor, result) {
          console.log("上传失败,原因是" + result);
        },
        error: function (xhr, editor) {
          console.log("上传出错");
        },
        timeout: function (xhr, editor) {
          console.log("上传超时");
        }
      }
      editor10.create()
    },
    newWangEditor2(el1, el2) {
      editor11 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      editor11.customConfig.pasteFilterStyle = false
      // 隐藏“网络图片”tab
      editor11.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor11.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor.customConfig.uploadImgShowBase64 = true
      editor11.customConfig.menus = [
        'image',
      ]
      // 上传图片到服务器
      editor11.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor11.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor11.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

      //自定义上传图片事件
      editor11.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {

        },
        success: function (xhr, editor, result) {
          console.log("上传成功");

        },
        fail: function (xhr, editor, result) {
          console.log("上传失败,原因是" + result);
        },
        error: function (xhr, editor) {
          console.log("上传出错");
        },
        timeout: function (xhr, editor) {
          console.log("上传超时");
        }
      }
      editor11.create()
    },
    newWangEditor3(el1, el2) {
      editor12 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      editor12.customConfig.pasteFilterStyle = false
      // 隐藏“网络图片”tab
      editor12.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor12.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor.customConfig.uploadImgShowBase64 = true
      editor12.customConfig.menus = [
        'image',
      ]
      // 上传图片到服务器
      editor12.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor12.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor12.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

      //自定义上传图片事件
      editor12.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {

        },
        success: function (xhr, editor, result) {
          console.log("上传成功");

        },
        fail: function (xhr, editor, result) {
          console.log("上传失败,原因是" + result);
        },
        error: function (xhr, editor) {
          console.log("上传出错");
        },
        timeout: function (xhr, editor) {
          console.log("上传超时");
        }
      }
      editor12.create()
    },
    pageClick(page) {
      this.pageNum = page;
      this.getCJGList();
    }
  }
}
</script>
<style src="../../static/css/knowledgeMan.css"></style>
<style>
.el-table tr {
  height: 0.3rem !important;
}

.step-list {
   padding: 0rem;
   overflow: auto;
}
</style>