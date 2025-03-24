<template>
  <div style=" width: 17.1rem;">
    <div class="search-header">
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title filtitle">保单号</div>
          <div class="select-content filContent">
            <el-input class="el-input-inners" v-model="contno" align="right" size="mini" placeholder="请输入保单号" clearable></el-input>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title filtitle">保单状态</div>
          <div class="select-content filContent">
            <el-select v-model="policyStatus" size="mini" placeholder="请选择保单状态" class="el-select-inners"   clearable>
              <el-option v-for="(item, index) in policyStatusList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title filtitle">客户姓名</div>
          <div class="select-content filContent">
            <el-input class="el-input-inners" v-model="cusname" align="right" size="mini" placeholder="请输入客户姓名"  clearable></el-input>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title filtitle">
            <el-select class="el-input-title-inners" v-model="cusmobile" placeholder="请选择" size="mini">
              <el-option label="电话号码" value="电话号码"></el-option>
              <el-option label="微信号" value="微信号"></el-option>
            </el-select>
          </div>
          <div class="select-content filContent">
            <el-input class="el-input-inners" v-model="cusMobileWxno" align="right" size="mini" placeholder="请输入电话号码"  clearable></el-input>
          </div>
        </div>

        <div class="common-select" style="width: 4%;">
          <div class="search-btn searchLeft" @click="search(1)">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);  display: none;" @click="screenReset">重置</div>
        </div>
      </div>
    </div>
    <!-- v-loading="loading" -->
    <div class="table-box">
      <el-table :data="tableData" v-loading="loading" border style="width: 100%" @selection-change="handleSelectionChange" @sort-change="sortChange" class="splice-header">
        <el-table-column key="2" align="center" type="index" label="序号" width="60">
        </el-table-column>

        <el-table-column key="4" align="center" prop="accepttime" label="出单日期" width="160">
        </el-table-column>
        <el-table-column key="7" align="center" prop="reusername" label="出单业务员" width="100">
        </el-table-column>
        <el-table-column key="8" align="center" prop="serviceusername" label="服务人员" width="100">
        </el-table-column>
        <el-table-column key="9" align="center" prop="contno" label="保单号" width="150" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="10" align="center" prop="statename" label="保单状态" width="80" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="11" align="center" prop="insrevisitstatename" label="回访状态" width="80" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="111" align="center" prop="receiptstatename" label="回执状态" width="80" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="12" align="center" prop="insorganname" label="保险公司" width="130" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="13" align="center" prop="riskname" label="险种名称" width="200" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="14" align="center" prop="appname" label="投保人姓名" width="100" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="15" align="center" prop="appprovincename" label="投保人所在省" width="120" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="16" align="center" prop="appcityname" label="投保人所在市" width="120" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="17" align="center" prop="insname" label="被保人姓名" width="100" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="18" align="center" prop="payintvvalue" label="缴费方式" width="80" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="19" align="center" prop="payendyearvalue" label="缴费年期" width="80" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="20" align="center" prop="insuyearvalue" label="保障期限" width="80" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="21" align="center" prop="prem" label="保费" width="80" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="22" align="center" prop="fyp20" label="标保" width="80" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="23" align="center" prop="coefficientfyp20" label="折算系数后标保" width="120" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="24" align="center" prop="activitychannelname" label="渠道类型" width="80" :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column key="30" align="center" prop="activityappname" label="流量来源" width="100" :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column key="26" align="center" label="查看详情" width="100">
          <template slot-scope="scope">
            <a href="javascript:void(0);" style="color: #4985e5" @click="showEditPopup(scope.row)">查看详情</a>
          </template>
        </el-table-column>

      </el-table>

      <div style="margin-top: 20px; ">
        <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize" :current-page="pageNum" @current-change="pageClick">
        </el-pagination>
      </div>
    </div>
    <!-- 查看详情弹窗 -->
    <view-details :datas="detailObj" :showEditPopupDialogVisible.sync="showEditPopupDialogVisible" @updateVisible="updateVisibleId"></view-details>
  </div>
</template>
  <script>
import viewDetails from "../../components/viewDetails.vue";
import { getData, my_url, crm_url } from '../../static/js/ajax.js';
import { formatDate, checkMobile } from '../../static/js/common.js';
export default {
  components: {
    viewDetails
  },
  data() {
    return {
      tableData: [],
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      loading: false,
      detail_loading: false,
      //筛选查询
      contno: '', //保单号
      cusmobile: '电话号码', //显示的电话号码
      cusMobileWxno: '', //客户电话号码或者微信值
      cusname: '', //客户姓名
      policyStatus: '', //保单状态
      policyStatusList: '', //保单状态列表
      //查看编辑弹窗
      showEditPopupDialogVisible: false,
      detailObj: {},
      policyList: [],
    }
  },
  mounted: function () {
    this.abpolisystate()
  },
  methods: {
    // 筛选查询保单   /crm_web/getPolicyList.do
    search(page) {
      var _this = this
      this.loading = true
      var cusmobile, cuswxno = ''
      if (this.cusmobile == '电话号码') {
        cusmobile = this.cusMobileWxno.trim()
      } else {
        cuswxno = this.cusMobileWxno
      }
      var policyStatus = ''
      if (this.policyStatus == '40') {
        policyStatus = "80,81,82,40"
        // 这里需要改
      } else {
        policyStatus = this.policyStatus
      }
      getData('post', my_url + '/crm/auth/getToken.do', data => {
        if (data.code == 0) {
          var params = {
            token: data.token,
            contno: this.contno.trim(),
            cusname: this.cusname,
            cusmobile: cusmobile.trim(),
            wxno: cuswxno,
            agentflag: "02",
            pageNumber: page,
            pageSize: this.pageSize,
            has_coefficient: "N",
            kuaflag: "Y",
            state: policyStatus, //保单状态
          }
          getData('post', crm_url + 'insure.meihualife.com/crm_web/getPolicyList_New.do', function (data) {
            let {
              rows,
              total
            } = data;
            _this.tableData = rows
            _this.pageTotal = total
            _this.loading = false
          }, params);
        }
      });
    },
    //保单状态
    abpolisystate() {
      getData('post', my_url + '/crm/common/getDictList.do', data => {
        if (data.code == 0) {
          var array = data.dictList
          var stateList = []
          array.forEach(function (item, key) {
            if (item.dd_value == '签单成功' || item.dd_value == '犹豫期退保' || item.dd_value == '正常退保' || item
              .dd_value == '协议退保' || item.dd_value == '保单失效' || item.dd_value == '理赔终止' || item
                .dd_value == '冲正') {
              stateList.push(item)
            }
          });
          this.policyStatusList = stateList
        }
      }, {
        dict_type: 'abpolicystate'
      });
    },
    // 重置
    screenReset() {
      this.contno = '';
      this.cusMobileWxno = '';
      this.cusmobile = '';
      this.cusname = '';
      this.search(1)
    },

    //查看详情
    showEditPopup(item) {
      var arr = []
      arr.push(item)
      getData('post', my_url + '/crm/auth/getToken.do', data => {
        if (data.code == 0) {
          var body = {
            token: data.token,
            contno: item.contno
          }
          getData('post', crm_url + 'insure.meihualife.com/crm_web/getOnePolicy.do', data => {
            if (data.rows.length > 1) {
              this.detailObj = data.rows;
            } else {
              this.detailObj = arr
              if (data.rows.length == 1 && data.rows[0].relaname) {
                this.detailObj[0]['relaname'] = data.rows[0].relaname
              }
            }
          }, body)
        }
      })
      this.showEditPopupDialogVisible = true;
    },

    updateVisibleId(e) {
      this.showEditPopupDialogVisible = e;
    },

    //跳转页数
    pageClick(page) {
      this.pageNum = page;
      this.search(page)
    },

    //当表格的排序条件发生变化的时候会触发该事件
    sortChange(val) {
      this.order = val.order
      this.prop = val.prop
      this.search(1);
    },
    //当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.checkedAllNum = val.length;
    },

  }
}

  </script>
  <style src="../../static/css/drawer.css"></style>
  <style>
.el-drawer__body {
  display: flex;
}

/* .el-dialog .el-dialog__body {
    padding: 0;
  } */

.head .txt {
  cursor: pointer;
}

.el-tooltip__popper {
  max-width: 330px !important;
}

.source-level span,
.top .biaozhu {
  display: inline-block;
  width: 0.17rem;
  height: 0.17rem;
  background: url(../../static/images/biaozhu.png) no-repeat;
  background-size: 100% 100%;
  margin-left: 0.01rem;
  vertical-align: middle;
  margin-bottom: 0.03rem;
}

.el-popover__reference-wrapper {
  display: flex;
  height: 100%;
  align-items: center;
}
</style>