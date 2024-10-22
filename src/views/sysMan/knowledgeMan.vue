<template>
  <div class="customerManagement" id="container" v-cloak style=" width: 17.1rem;">
    <div class="search-header">
      <div class="add-btn" @click="showAddCJGDetailDialog($event)"> + 新建</div>
      <div class="search-box clearfix">
       
        <div class="common-select" v-if="CJGselectValue === '解答疑义'" style="width: 30%">
          <div class="select-title" style="width: 1.54rem">修改时间</div>
          <div class="select-content" style="height: 0.3rem; width: calc(100% - 1.54rem); border: none">
            <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="datetimerange" align="right" size="mini" value-format="yyyy-MM-dd" unlink-panels range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>

        <div class="common-select" v-else style="width: 30%">
          <div class="select-title" style="width: 1.54rem">修改时间</div>
          <div class="select-content" style="height: 0.3rem; width: calc(100% - 1.54rem); border: none">
            <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="datetimerange" align="right" size="mini" value-format="yyyy-MM-dd" unlink-panels range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        <div class="common-select" v-if="CJGselectValue === '保单检视'">
          <div class="select-title" style="width: 1.28rem">保险公司</div>
          <div class="select-content" style="width: calc(100% - 1.28rem);">
            <el-autocomplete class="el-input-inners" v-model="insorganName" :trigger-on-focus="false" :fetch-suggestions="querySearch1" size="mini" placeholder="请输入保险公司" clearable></el-autocomplete>

          </div>
        </div>

        
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">关键字搜索</div>
          <div class="select-content" style="width: calc(100% - 1.28rem);">
            <el-autocomplete class="el-input-inners" v-model="title" :trigger-on-focus="false" :fetch-suggestions="querySearch" size="mini" placeholder="请输入关键字"></el-autocomplete>
          </div>
        </div>


        <div class="common-select" v-if="false">
          <div class="select-title" style="width: 1.28rem">跟进步骤</div>
          <div class="select-content" style="width: calc(100% - 1.28rem);">
            <el-dropdown trigger="click" placement="top" ref="disTeam3" style="width: 100%">
              <span class="el-dropdown-inners" clearable style="width: auto">
                {{teamNames1}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-tree @check="handleCheckChange1" :data="askedflowList" ref="tree3" show-checkbox node-key="id" :default-expanded-keys="['01', '02']" :default-checked-keys="selectAskedflow" :props="defaultProps1">
                </el-tree>
                <div class="sure-footer">
                  
                  <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="my_sureOne3">取消</div>
                  <div class="my-sure" @click="my_sure3">确定</div>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="common-select" v-if="false">
          <div class="select-title" style="width: 1.28rem">所属分类</div>
          <div class="select-content" style="width: calc(100% - 1.28rem);">
            <el-dropdown trigger="click" placement="top" ref="disTeam4" style="width: 100%">
              <span class="el-dropdown-inners" clearable style="width: auto">
                {{teamNames2}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-tree @check="handleCheckChange2" :data="askedtypeList" ref="tree4" show-checkbox node-key="id" :default-expanded-keys="['01','02']" :default-checked-keys="selectAskedtype" :props="defaultProps">
                </el-tree>
                <div class="sure-footer">
                  
                  <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="my_sureOne4">取消</div>
                  <div class="my-sure" @click="my_sure4">确定</div>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

       

        <div class="common-select" v-if="CJGselectValue === '疾病核保'">
          <div class="search-btn" @click="search">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
        </div>
        <div class="common-select" style="float: right; width :11.5%" v-else-if="CJGselectValue === '解答疑义'">
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
        <el-table-column key="1" align="center" type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column key="2" sortable align="center" prop="makedate" label="新建时间" width="155">
        </el-table-column>
        <el-table-column key="3" sortable align="center" prop="modifydate" label="最后修改时间" width="155">
        </el-table-column>
        <el-table-column key="4" align="center" prop="oprname" label="最后修改人员" width="100">
        </el-table-column>
        <el-table-column key="5" v-if="CJGselectValue === '保单检视'" align="center" prop="insorganname" label="保险公司" width='130'>
        </el-table-column>
        <el-table-column key="6" v-if="CJGselectValue === '解答疑义'" align="left" prop="title" label="疑义问题" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="7" v-else align="left" prop="title" label="标题" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="8" v-if="CJGselectValue === '解答疑义'" align="center" prop="askedtypedesc" label="所属分类" width="180" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="9" v-if="CJGselectValue === '解答疑义'" align="center" prop="askedflowdesc" label="跟进步骤" width="180" :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column key="10" align="center" label="操作" width="140">
          <template slot-scope="scope">
            <a class="edit option" href="javascript:void(0);" @click="showEditPopup(scope.row)">编辑</a>
            <a class="delete option" href="javascript:void(0);" @click="deleteItem(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize" :current-page="pageNum" @current-change="pageClick">
      </el-pagination>
    </div>
    <!-- 藏经阁-->
    <el-dialog :title="'新建 - ' + CJGselectValue" :visible.sync="addCJGItemVisible" width="70%" :close-on-click-modal='false' @close='hideaddCJGFIrstVisible'>
      <div class="step-list wei-step-list" v-if="CJGselectValue === '保单检视'">
        <div class="item-section">
          <label>标题</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="bdjsItem.title">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>保险公司</label>
          <div class="right-content">
            <el-autocomplete style="position: relative!important;width: 100%;" v-model="insorganName1" :trigger-on-focus="false" :fetch-suggestions="querySearch1" size="mini" placeholder="请输入保险公司" clearable>
            </el-autocomplete>
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
            <ul class="enclosure-list">
              <li class="item" v-for="(item,index) in fileList" :key="index">
                <!-- <img src="../../static/images/file-icon.png" alt=""> -->
                <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{item.filename}}</div>
                <a href="javascript:;" class="delete-btn" @click="deleteFile(item.fileid)">删除</a>
              </li>
              <a href="javascript:;" class="upload-btn">
                <img src="../../static/images/file-icon.png" alt="">
                添加附件
                <input type="file" v-on:change="tirggerFile($event)" class="file-input">
              </a>
            </ul>
          </div>
        </div>
      </div>

      <div class="step-list wei-step-list" v-if="CJGselectValue === '疾病核保'">
        <div class="item-section">
          <label>标题</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="jbhbItem.title">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>疾病描述</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="jbhbItem.disdescription" resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="7">
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
            <el-input resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="10" placeholder="请输入内容" v-if="currentSuggestion === 'zjsuggestion'" v-model="jbhbItem.zjsuggestion">
            </el-input>
            <el-input resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="10" placeholder="请输入内容" v-else v-model="jbhbItem.ylsuggestion">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>可投产品</label>
          <div class="right-content">
            <div class="add-item-wrap">
              <div class="btns">
                <div class="btn" @click="addProduct">
                  添加 <img src="../../static/images/plue-icon.png" alt="">
                </div>
                <div class="btn" @click="deleteProduct">
                  删除 <img src="../../static/images/delete-icon.png" alt="">
                </div>
              </div>
              <div class="list" v-for="(item,index) in jbhbItem.productJsonStr" :key="index">
                <div class="item">
                  <label>保险公司</label>
                  <div class="right-content">
                    <el-select v-model="item.insorgancode" size="mini" placeholder="请选择" @change="selectChange(index)">
                      <el-option v-for="(item,index) in InsOrganList" :key="index" :label="item.dd_value" :value="item.dd_key">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="item">
                  <label>险种名称</label>
                  <div class="right-content">
                    <el-select v-model="item.riskcode" size="mini" placeholder="请选择">
                      <el-option v-for="(item,index) in item.productList" :key="index" :label="item.dd_value" :value="item.dd_key">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="item">
                  <label>承保说明</label>
                  <div class="right-content">
                    <el-input placeholder="请输入" size="mini" v-model="item.acceptremark" resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="7">
                    </el-input>
                  </div>
                </div>
                <div class="item">
                  <label>标注</label>
                  <div class="right-content" style="margin-top: 0.03rem;">
                    <el-radio v-model="item.labeltype" :label="'01'">标体承保</el-radio>
                    <el-radio v-model="item.labeltype" :label="'03'" style="margin-left: 0.2rem;">
                      加费承保
                    </el-radio>
                    <el-radio v-model="item.labeltype" :label="'02'" style="margin-left: 0.2rem;">
                      除外承保
                    </el-radio>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="step-list wei-step-list answering-doubts" v-if="CJGselectValue === '解答疑义'">
        <div class="item-section">
          <label>疑义问题</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="dkwItem.title">
            </el-input>
          </div>
        </div>
        <div class="item-section" v-if="false">
          <div class="common-select">
            <div class="select-title" style="width: 0.8rem; color: #606266;background: #fff;border: none;padding-left: 0; padding-right: 0.08rem; text-align: right;">跟进步骤</div>
            <div class="select-content" style="width: 2.5rem;">
              <el-dropdown trigger="click" placement="top" ref="disTeam1" style="width: 100%">
                <span class="el-dropdown-inners" clearable style="width: auto">
                  {{teamNames1}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-tree @check="handleCheckChange1" :data="askedflowList" ref="tree1" show-checkbox node-key="id" :default-expanded-keys="['01', '02']" :default-checked-keys="selectAskedflow" :props="defaultProps1">
                  </el-tree>
                  <div class="sure-footer">
                    
                    <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="my_sureOne1">取消</div>
                    <div class="my-sure" @click="my_sure1">确定</div>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="item-section" v-if="false">
          <div class="common-select">
            <div class="select-title" style="width: 0.8rem; color: #606266;background: #fff;border: none;padding-left: 0; padding-right: 0.08rem; text-align: right;">所属分类</div>
            <div class="select-content" style="width: 2.5rem;">
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
            <ul class="enclosure-list">
              <li class="item" v-for="(item,index) in fileList" :key="index">
                <!-- <img src="../../static/images/file-icon.png" alt=""> -->
                <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{item.filename}}</div>
                <a href="javascript:;" class="delete-btn" @click="deleteFile(item.fileid)">删除</a>
              </li>

              <a href="javascript:;" class="upload-btn">
                <img src="../../static/images/file-icon.png" alt="">
                添加附件
                <input type="file" v-on:change="tirggerFile($event)" class="file-input">
              </a>
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
      <div class="dialog-footer" style="margin-top: 0.2rem; ">
    
        <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="hideaddCJGFIrstVisible">取消</div>
        <div class="search-btn" @click="updateCJGitem">确定</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery';
import "../../components/wangEditor/release/wangEditor.css";
import "../../components/wangEditor/release/fonts/w-e-icon.woff"
import wangEditor from '@/components/wangEditor/release/wangEditor.min.js';
import { getData, my_url } from '../../static/js/ajax.js';
import { formatDate } from '../../static/js/common.js';
let editor14, editor15, editor16, editor17;
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
      currentSuggestion: 'zjsuggestion',
      fileList: '',
      //保单检视
      bdjsItem: {
        title: '',
        insorgancode: '',
        suggestion: '',
        policydetail: '',
      },
      //疾病核保
      jbhbItem: {
        title: '',
        disdescription: '',
        zjsuggestion: '',
        ylsuggestion: '',
        productJsonStr: [

        ]
      },
      //解答疑义
      dkwItem: {
        title: '',
        content: '',
        voice: '',
        askedtype: [],
        askedflow: [],
      },
      CJGselectList: ['保单检视', '疾病核保', '解答疑义'],
      CJGselectValue: '保单检视',
      addCJGFIrstVisible: false,
      addCJGItemVisible: false, //控制弹窗的显示
      selectTime: '',
      Salesman: '',
      team: '',
      cjgType: '',
      title: '',
      insorgancode: '',
      currentReadid: '',
      currentUwid: '',
      currentReadid: '',
      loading: false,
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      tableData: [],
      CJGTypeList: [],
      noticeTypeList: [],
      InsOrganList: [],
      productList: [],
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
      SalesmanBox: [],
      SalesmanBox1: [],
      insorganName: '',
      insorganName1: '',
      currentType: '01,02,03'
    }
  },
  watch: {
    cjgType(val) {
      if (val) {
        this.currentType = val
        if (val == '01') {
          this.CJGselectValue = "保单检视"
        } else if (val == '02') {
          this.CJGselectValue = "疾病核保"
        } else if (val == '03') {
          this.CJGselectValue = "解答疑义"
        }
      } else {
        this.currentType = '01,02,03'
      }
      this.getSearchData()
    },
  },
  mounted: function () {
    this.getAskedType()
    this.$nextTick(() => {
      this.cjgType = this.$route.query.type || '01';
      this.getCJGList()
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
      getData('post', my_url + '/crm/common/getInsOrganList.do', function (data) {
        if (data.code == 0) {
          let {
            dictList
          } = data;
          _this.InsOrganList = dictList;
        }
      });
      this.getSearchData()
      this.insOrganList()
      this.getRiskList()
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

    

 
    handleNodeClick(data) {

    },
    getRiskList() {
      let _this = this
      getData('post', my_url + '/crm/common/getAllRiskList.do', function (data) {
        if (data.code == 0) {
          let {
            dictList
          } = data;
          _this.productList = dictList;
        }
      });
    },
    setItemProductList() {
      let productJsonStr = this.jbhbItem.productJsonStr
      if (productJsonStr.length) {
        productJsonStr.forEach((item, index) => {
          this.selectChange1(index)
        })
      }
    },
    selectChange1(index) {
      let _this = this
      getData('post', my_url + '/crm/common/getRiskList.do', function (data) {
        if (data.code == 0) {
          let {
            dictList
          } = data;
          _this.$set(_this.jbhbItem.productJsonStr[index], 'productList', [])
          _this.jbhbItem.productJsonStr[index].productList = dictList;
        } else {
          _this.$set(_this.jbhbItem.productJsonStr[index], 'productList', [])
        }
      }, {
        insorgancode: _this.jbhbItem.productJsonStr[index].insorgancode
      });
    },
    selectChange(index) {
      let _this = this
      getData('post', my_url + '/crm/common/getRiskList.do', function (data) {
        if (data.code == 0) {
          let {
            dictList
          } = data;
          _this.$set(_this.jbhbItem.productJsonStr[index], 'productList', [])
          _this.jbhbItem.productJsonStr[index].productList = dictList;
          _this.jbhbItem.productJsonStr[index].riskcode = ''
        } else {
          _this.$set(_this.jbhbItem.productJsonStr[index], 'productList', [])
          _this.jbhbItem.productJsonStr[index].riskcode = ''
        }
      }, {
        insorgancode: _this.jbhbItem.productJsonStr[index].insorgancode
      });
    },
    createFilter(queryString) {
      return (SalesmanBox) => {
        return (SalesmanBox.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
    },
    querySearch(queryString, cb) {
      var SalesmanBox = this.SalesmanBox;
      var results = queryString ? SalesmanBox.filter(this.createFilter(queryString)) : SalesmanBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    getSearchData() {
      let _this = this;
      getData('post', my_url + '/crm/knowledge/getKnowledgeTitle.do', function (data) { //渠道类型
        if (data.code == 0) {
          _this.SalesmanBox = []
          let nameList = data.titleList;
          nameList.forEach(res => {
            _this.SalesmanBox.push({
              "value": res
            });
          })
        }
      }, {
        type: this.cjgType
      });
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
      });
    },


    deleteFile(id) {
      let body = {
        fileid: id,
      }
      getData('post', my_url + '/crm/fileupload/fileDelete.do', res => {
        if (res.code == 0) {
          this.getUploadFile(this.bdjsItem.baseid || this.jbhbItem.baseid || this.dkwItem.baseid)
        }
      }, body);
    },
    tirggerFile(e) {

      var _this = this
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
          $('.file-input').val('')
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
        suggestion: '',
        policydetail: '',
      }
      //疾病核保
      this.jbhbItem = {
        title: '',
        disdescription: '',
        zjsuggestion: '',
        ylsuggestion: '',
        productJsonStr: [

        ]
      }
      //解答疑义
      this.dkwItem = {
        title: '',
        content: '',
        voice: '',
        askedtype: [],
        askedflow: []
      }
      this.fileList = []
      this.selectAskedtype = []
      this.selectAskedflow = []
      this.teamNames1 = '跟进步骤'
      this.teamNames2 = '分类选择'
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
          this.setItemProductList()
        }
        if (item.type === '03') {
          this.dkwItem = res.anscusque
          this.dkwItem.baseid = item.baseid
        }
        this.CJGselectValue = item.typename
        this.showAddCJGDetailDialog()
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
            if (this.CJGselectValue === '解答疑义') {
              if (res.anscusque.askedflow == '') {
                this.teamNames1 = '跟进步骤'
                this.teamNames2 = '分类选择'
              } else {
                this.selectAskedflow = res.anscusque.askedflow.split(",")
                this.selectAskedtype = res.anscusque.askedtype.split(",")
                var arr1 = []
                this.askedflowList.forEach(item => {
                  this.selectAskedflow.forEach(key => {
                    if (item.id == key) {
                      arr1.push(item.label)
                    }
                  })
                })
                this.teamNames1 = arr1.toString()
                var arr2 = []
                this.askedtypeList.forEach(item => {
                  this.selectAskedtype.forEach(key => {
                    if (item.id == key) {
                      arr2.push(item.label)
                    }
                  })
                })
                this.teamNames2 = arr2.toString()
              }
            }
            if (this.CJGselectValue === '保单检视') {
              this.insorganName1 = res.policyread.insorganname
            }

            resovle(res)
          } else {
            reject()
          }
        }, body);
      })
    },
    updateCJGitem(isUpload) {
      let url, data
      if (this.CJGselectValue === '保单检视') {
        url = this.bdjsItem.baseid ? '/crm/knowledge/policyReadUpdate.do' : '/crm/knowledge/policyRead.do'
        this.bdjsItem.policydetail = editor14.txt.html()
        this.bdjsItem.suggestion = editor15.txt.html()
        if (this.insorganName1 != '') {
          var insorgancode = ''
          var insorganList = this.SalesmanBox1;
          for (var i = 0; i < insorganList.length; i++) {
            if (insorganList[i].value == this.insorganName1) {
              insorgancode = insorganList[i].key
            }
          }
          this.bdjsItem.insorgancode = insorgancode
          this.bdjsItem.insorganname = this.insorganName1
        }
        data = this.bdjsItem
      }
      if (this.CJGselectValue === '疾病核保') {
        url = this.jbhbItem.baseid ? '/crm/knowledge/diseaseUwUpdate.do' : '/crm/knowledge/diseaseUw.do'
        data = JSON.parse(JSON.stringify(this.jbhbItem))
        data.productJsonStr = JSON.stringify(data.productJsonStr)
      }
      if (this.CJGselectValue === '解答疑义') {
        url = this.dkwItem.baseid ? '/crm/knowledge/answerCustomerQuestionUpdate.do' :
          '/crm/knowledge/answerCustomerQuestion.do'
        this.dkwItem.content = editor16.txt.html()
        this.dkwItem.voice = editor17.txt.html()
        data = this.dkwItem
      }


      return new Promise((resovle, reject) => {
        getData('post', my_url + url, res => {
          if (res.code == 0) {
            if (isUpload !== 'isUpload') {
              this.addCJGItemVisible = false
              this.addCJGFIrstVisible = false

              this.dkwItem.askedtype = ''
              this.dkwItem.askedflow = ''
              this.insorganName1 = ''
              this.bdjsItem.insorgancode = ''
            }


            this.getCJGList()
            if (res.baseid) {
              if (this.CJGselectValue === '保单检视') {
                this.bdjsItem.baseid = res.baseid
              }
              if (this.CJGselectValue === '疾病核保') {
                this.jbhbItem.baseid = res.baseid
              }
              if (this.CJGselectValue === '解答疑义') {
                this.dkwItem.baseid = res.baseid
              }
              resovle(res)
            } else {
              this.bdjsItem.baseid && resovle(this.bdjsItem)
              this.jbhbItem.baseid && resovle(this.jbhbItem)
              this.dkwItem.baseid && resovle(this.dkwItem)
            }
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              duration: 3000,
              type: 'error'
            });
            reject()
          }
        }, data);
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
        type: this.cjgType + '',
        startDate: this.selectTime ? this.selectTime[0] : '',
        endDate: this.selectTime ? this.selectTime[1] : '',
        askedtype: this.dkwItem.askedtype,
        askedflow: this.dkwItem.askedflow,
        insorgancode: insorgancode,
        pageNumber: this.pageNum,
        pageSize: this.pageSize,
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
      this.addCJGItemVisible = false
      this.insorganName1 = ''
      this.bdjsItem.insorgancode = ''
      this.itemReset()
    },
    showAddCJGDetailDialog(e) {
      if (e) {
        this.itemReset()
      }
      this.addCJGItemVisible = true
      if (this.CJGselectValue === '保单检视') {
        // if (editor14 == null) { //true
        this.$nextTick(() => {
          this.newWangEditor('#div1', '#div2')
          this.newWangEditor1('#div3', '#div4')
          editor14.txt.html(this.bdjsItem.policydetail)
          editor15.txt.html(this.bdjsItem.suggestion)
        })
        // } else {
        //   editor14.txt.html(this.bdjsItem.policydetail)
        //   editor15.txt.html(this.bdjsItem.suggestion)
        // }
      } else if (this.CJGselectValue === '解答疑义') {


        
        // if (editor16 == null) { //true
        this.$nextTick(() => {
          this.newWangEditor2('#div5', '#div6')
          this.newWangEditor3('#div7', '#div8')
          editor16.txt.html(this.dkwItem.content)
          editor17.txt.html(this.dkwItem.voice)
        })
        // } else {
        //   editor16.txt.html(this.dkwItem.content)
        //   editor17.txt.html(this.dkwItem.voice)
        // }
      } else {
        $('.w-e-text').remove()
        $('.w-e-menu').remove()
      }
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
      // this.cjgType = ''
      this.getCJGList()
    },
    newWangEditor(el1, el2) {
      editor14 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      // editor14.customConfig.pasteFilterStyle = false
      // editor14.customConfig.pasteText = false;
      // editor14.customConfig.pasteTextHandle = function (content) {
      //   // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
      //   if (content == '' && !content) return ''
      //   var str = content
      //   str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
      //   str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
      //   str = str.replace(/<\/?[^>]*>/g, '')
      //   str = str.replace(/[ | ]*\n/g, '\n')
      //   str = str.replace(/&nbsp;/ig, '')
      //   return str
      // }
      // 隐藏“网络图片”tab
      editor14.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor14.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor14.customConfig.uploadImgShowBase64 = true
      editor14.customConfig.menus = [
        'image', // 插入图片
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        // 'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      // 上传图片到服务器
      editor14.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor14.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor14.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
      //自定义上传图片事件
      editor14.customConfig.uploadImgHooks = {
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
      editor14.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff',
        '#606266',
        "#DC220D"
      ]
      editor14.customConfig.fontNames = [
        '黑体',
        '仿宋',
        '楷体',
        '标楷体',
        '华文仿宋',
        '华文楷体',
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana',
        'Times New Roman',
        'Courier New',
      ]
      editor14.create()
    },

    newWangEditor1(el1, el2) {
      editor15 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // // 关闭粘贴内容中的样式
      // editor15.customConfig.pasteFilterStyle = false
      // editor15.customConfig.pasteText = false;
      // editor15.customConfig.pasteTextHandle = function (content) {
      //   // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
      //   if (content == '' && !content) return ''
      //   var str = content
      //   str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
      //   str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
      //   str = str.replace(/<\/?[^>]*>/g, '')
      //   str = str.replace(/[ | ]*\n/g, '\n')
      //   str = str.replace(/&nbsp;/ig, '')
      //   return str
      // }
      // 隐藏“网络图片”tab
      editor15.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor15.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor.customConfig.uploadImgShowBase64 = true
      editor15.customConfig.menus = [
        'image', // 插入图片
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        // 'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      // 上传图片到服务器
      editor15.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor15.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor15.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
      //自定义上传图片事件
      editor15.customConfig.uploadImgHooks = {
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
      editor15.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff',
        '#606266',
        "#DC220D"
      ]
      editor15.customConfig.fontNames = [
        '黑体',
        '仿宋',
        '楷体',
        '标楷体',
        '华文仿宋',
        '华文楷体',
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana',
        'Times New Roman',
        'Courier New',
      ]
      editor15.create()
    },

    newWangEditor2(el1, el2) {
      editor16 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 隐藏“网络图片”tab
      editor16.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor16.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor.customConfig.uploadImgShowBase64 = true
      editor16.customConfig.menus = [
        'image', // 插入图片
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        // 'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      // 上传图片到服务器
      editor16.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor16.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor16.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
      //自定义上传图片事件
      editor16.customConfig.uploadImgHooks = {
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
      editor16.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff',
        '#606266',
        "#DC220D"
      ]
      editor16.customConfig.fontNames = [
        '黑体',
        '仿宋',
        '楷体',
        '标楷体',
        '华文仿宋',
        '华文楷体',
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana',
        'Times New Roman',
        'Courier New',
      ]
      editor16.create()
    },


    newWangEditor3(el1, el2) {
      editor17 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 隐藏“网络图片”tab
      editor17.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor17.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor.customConfig.uploadImgShowBase64 = true
      editor17.customConfig.menus = [
        'image', // 插入图片
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        // 'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      // 上传图片到服务器
      editor17.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor17.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor17.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
      //自定义上传图片事件
      editor17.customConfig.uploadImgHooks = {
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
      editor17.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff',
        '#606266',
        "#DC220D"
      ]
      editor17.customConfig.fontNames = [
        '黑体',
        '仿宋',
        '楷体',
        '标楷体',
        '华文仿宋',
        '华文楷体',
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana',
        'Times New Roman',
        'Courier New',
      ]
      editor17.create()
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
.step-list {
   padding: 0rem;
   overflow: auto;
}
</style>