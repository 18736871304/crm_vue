<template>
  <div class="table-box">
    <el-table :data="dataRen" ref="multipleTable" border v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange" @sort-change="sortChange" class="splice-header">
      <el-table-column key="1" align="center" type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column key="2" align="center" prop="restatename" label="续期状态" width="100">
        <template slot-scope="scope">
          <el-tag type="success" class="greed" v-if="scope.row.restatename == '已续期'" size="mini" style="cursor: pointer">已续期</el-tag>
          <el-tag type="success" class="yellow" v-if="scope.row.restatename == '待续期'" size="mini" style="cursor: pointer">待续期</el-tag>
          <el-tag type="success" class="red" v-if="scope.row.restatename == '续期失败'" size="mini" style="cursor: pointer">
            <el-tooltip class="item" effect="dark" :content="scope.row.reerrormsg" placement="top">
              <span>续期失败</span>
            </el-tooltip>
          </el-tag>
          <!-- {{ scope.row.restatename }} -->
        </template>
      </el-table-column>
      <el-table-column key="3" align="center" prop="renewtime" label="应收日期" width="155" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="4" align="center" prop="prem" label="应收保费" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="5" align="center" prop="renewpaytime" label="实收日期" width="155" :show-overflow-tooltip="true">
        <!-- renewpaytime -->
      </el-table-column>
      <el-table-column key="6" align="center" prop="actualprem" label="实收保费" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="7" align="center" prop="policyyear" label="保单年度" width="80" :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column key="9" align="center" prop="reusername" label="出单业务员" width="100">
      </el-table-column>
      <el-table-column key="10" align="center" prop="serviceusername" label="服务人员" width="100">
      </el-table-column>
      <el-table-column key="11" align="center" prop="contno" label="保单号" width="150" :show-overflow-tooltip="true">
        <!-- <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.isxubao == '05'" size="mini">续</el-tag>
          {{ scope.row.contno }}
        </template> -->
      </el-table-column>

      <el-table-column key="12" align="center" prop="statename" label="保单状态" width="80" :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column key="13" align="center" prop="insorganname" label="保险公司" width="130" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="14" align="center" prop="riskname" label="险种名称" width="200" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="15" align="center" prop="appname" label="投保人姓名" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="16" align="center" label="投保人手机号" width="140" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="call-a" :class="scope.row.callcount > 0 ? 'active' : ''" @click="phonecall_row(scope.row)">
            {{ scope.row.appphone }}
            <img style="margin-left: 5px" src="../../static/images/call-icon.png" />
          </span>
        </template>
      </el-table-column>
      <el-table-column key="17" align="center" prop="appprovincename" label="投保人所在省" width="120" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="18" align="center" prop="appcityname" label="投保人所在市" width="120" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="19" align="center" prop="insname" label="被保人姓名" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="20" align="center" prop="payintvvalue" label="缴费方式" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="21" align="center" prop="payendyearvalue" label="缴费年期" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="22" align="center" prop="insuyearvalue" label="保障期限" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="23" align="center" prop="prem" label="保费" width="80" :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column key="24" align="center" prop="activitychannelname" label="渠道类型" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="25" align="center" prop="typename" label="电子保单" width="90px" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <!-- <a v-if="scope.row.policyurl" class="edit option" target="_blank" :href="scope.row.policyurl" style="color: #8f9198">下载</a>
          <a v-else class="edit option" target="_blank" :href="scope.row.policyurl"></a> -->

          <span  v-if="scope.row.policyurl"  class="edit option" style="color: #8f9198; cursor: pointer" @click="testDownLoad(scope.row)">下载</span>

        </template>
      </el-table-column>
      <el-table-column key="26" align="center" label="查看详情" width="110px">
        <template slot-scope="scope">
          <span class="edit option" style="color: #4985e5; cursor: pointer" @click="showEditPopup(scope.row)">查看详情</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getData, my_url, crm_url } from "../../static/js/ajax.js";
export default {
  props: {
    dataRen: [],
  },
  data() {
    return {
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      loading: false,
    };
  },

  methods: {
    testDownLoad(row) {
      getData('post', my_url + '/crm/auth/getToken.do', data => {
        var data = {
          orderid: row.orderid,
          token: data.token,
        }
        getData('post', crm_url + 'insure.meihualife.com/crm_web/policyDownLoad.do', function (res) {

        
          if (res.code == '0' && res.policyUrl && res.policyUrl != '') {
            let a = document.createElement('a')
            a.target = '_blank';
            a.href = res.policyUrl;
            a.click();
          } else {
            let a = document.createElement('a')
            a.target = '_blank';
            a.href = row.policyurl;
            a.click();
          }

        }, data);
      })

    },
    //查看详情
    showEditPopup(item) {
      this.$emit("isshowEditPopup", item);
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

    //跳转页数
    //  pageClick(page) {
    //   this.pageNum = page;
    // //   this.search(page)
    // },
  },
};
</script>

<style>
.cell .greed {
  width: 90%;
  height: 100%;
  background-color: #1aae1a;
  border-color: #e1f3d8;
  color: #fff;
}

.cell .yellow {
  width: 90%;
  height: 100%;
  background-color: #fff440;
  border-color: #e1f3d8;
  color: #565656;
}

.cell .red {
  width: 90%;
  height: 100%;
  background-color: #d92020;
  border-color: #e1f3d8;
  color: #fff;
}
</style>
