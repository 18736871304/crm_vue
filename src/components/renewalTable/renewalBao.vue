<template>
  <div class="table-box">
    <el-table :data="dataRen" ref="multipleTable" border v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange" @sort-change="sortChange" class="splice-header">
      <el-table-column key="1" align="center" type="index" label="序号" width="60"> </el-table-column>
      <el-table-column key="6" align="center" prop="xbstatename" label="续保状态" width="100">
        <template slot-scope="scope">
          <el-tag type="success" class="greed" v-if="scope.row.xbstatename == '已续保'" size="mini">已续保</el-tag>
          <el-tag type="success" class="yellow" v-if="scope.row.xbstatename == '待续保'" size="mini">待续保</el-tag>
        </template>
      </el-table-column>
      <el-table-column key="2" align="center" prop="contno" label="原保单号" width="150" :show-overflow-tooltip="true">
        <!-- <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.isxubao == '05'" size="mini">续</el-tag>
          {{ scope.row.contno }}
        </template> -->
      </el-table-column>

      <el-table-column key="3" align="center" prop="insorganname" label="保险公司" width="130" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column key="4" align="center" prop="riskname" label="险种名称" width="200" :show-overflow-tooltip="true"> </el-table-column>

      <el-table-column key="5" align="center" prop="prem" label="原保费" width="80" :show-overflow-tooltip="true"> </el-table-column>

      <el-table-column key="7" align="center" prop="accepttime" label="保单截至日" width="155" sortable> </el-table-column>
      <el-table-column key="8" align="center" prop="xbpaytime" label="续保成功日" width="155"> </el-table-column>

      <el-table-column key="9" align="center" prop="appname" label="投保人姓名" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column key="10" align="center" label="投保人手机号" width="140" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="call-a" :class="scope.row.callcount > 0 ? 'active' : ''" @click="phonecall_row(scope.row)">
            {{ scope.row.appphone }}
            <img style="margin-left: 5px" src="../../static/images/call-icon.png" />
          </span>
        </template>
      </el-table-column>
      <el-table-column key="12" align="center" prop="xbcontno" label="续保保单号" width="150" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column key="13" align="center" prop="" label="转保保单号" width="150"> </el-table-column>
      <el-table-column key="14" align="center" prop="xbriskname" label="续保险种名称" width="200" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column key="15" align="center" prop="actualprem" label="续保保费" width="80" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column key="16" align="center" prop="xbpolicyurl" label="电子保单" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <a v-if="scope.row.xbpolicyurl" class="edit option" target="_blank" :href="scope.row.xbpolicyurl" style="color: #8f9198">续保单下载</a>
          <a v-else-if='scope.row.policyurl' class="edit option" target="_blank" :href="scope.row.policyurl" style="color: #8f9198">原保单下载</a>
          <a v-else class="edit option" target="_blank" :href="scope.row.policyurl"></a>
        </template>
      </el-table-column>
      <el-table-column key="17" align="center" prop="reusername" label="出单业务员" width="100"> </el-table-column>
      <el-table-column key="18" align="center" prop="serviceusername" label="服务人员" width="100"> </el-table-column>
      <el-table-column key="19" align="center" label="查看详情" width="100">
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
    //查看详情
    showEditPopup(item) {
      // console.log(item)
      // getData("post", my_url + "/crm/auth/getToken.do", (data) => {
      //   var params = {
      //     token: data.token,
      //     orderid: item.orderid
      //   }
      //   getData("post", crm_url + "insure.meihualife.com/crm_web/getOriginXbList.do", (data) => {
      //     console.log(data)
      //     if (data.code == 0) {
      //     }
      //   }, params);
      // })

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
