<!-- 渠道分配规则 -->
<template>
  <div>
    <div class="search-header">
      <div class="search-box clearfix" v-show='ischannel'>
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">渠道类型</div>
          <div class="select-content" style="width: calc(100% - 1.28rem);">
            <el-autocomplete class="el-input-inners" v-model="reschannelName" :trigger-on-focus="false"
              :fetch-suggestions="querySearch" size="mini" placeholder="请输入渠道类型" @select="resqudaoSelect" clearable>
            </el-autocomplete>
          </div>
        </div>
        <div class="common-select">
          <div class="search-btn" @click="search(1)">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
        </div>
      </div>
    </div>
    <div class="table-box">
      <el-table class="splice-header" :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column key="1"  align="center" type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column key="2"  align="center" prop="channelname" label="渠道类型" width="80">
        </el-table-column>

        <el-table-column  key="3"  align="center" prop="username" label="分配业务员" width="auto">
        </el-table-column>
        <el-table-column  key="4"  align="center" prop="state" label="分配状态" width="80">
        </el-table-column>
        <el-table-column  key="5"  align="center" label="操作" width="140">
          <template slot-scope="scope">
            <a class="edit option" href="javascript:void(0);" @click="showEditPopup(scope.row)" style="color: #4985E5;">编辑</a>
            <a class="delete option" href="javascript:void(0);" @click="deleteItem(scope.row)" style="color: #DC220D; margin-left: 0.15rem;">清空</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新建-资源分配" :visible="dialogVisible" width="8.2rem" :before-close="handleClose">
      <div class="common-select" style="margin-bottom: 0.2rem">
        <div class="select-title" style="width: 1.28rem">渠道类型</div>
        <div class="select-content" style="width: calc(100% - 1.28rem);">
          <el-autocomplete class="el-input-inners" v-model="channelName" :trigger-on-focus="false"
            :fetch-suggestions="querySearch" size="mini" placeholder="请输入渠道类型" @select="qudaoSelect" clearable>
          </el-autocomplete>
        </div>
      </div>
      <template>
        <el-transfer class="transfer-color" filterable :filter-method="filterMethod" filter-placeholder="请输入业务员姓名" v-model="userList"
          :data="datawei" :titles="['所有业务员', '已选业务员']">
        </el-transfer>
      </template>
      <div slot="footer" class="dialog-footer" style="padding;: 0">
        <div class="search-btn" style="background: #fff;border: 1px solid rgba(221, 221, 221, 1);color: #686868;" @click="cancel">取消</div>
        <div class="search-btn" @click="sure">确定</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import moment from "../../../static/js/moment.js";
import { getData, my_url } from '../../../static/js/ajax.js';
export default {
  data() {
    return {
      //新建
      channelName: '',
      datawei: [], //目标列表的数据，源数据列表每一个都有一个对应的index，这里的数字就是列表里面的index,对应每一个数据
      userList: [],
      dialogVisible: false,
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      qudaoid: '',
      channelid: '',
      //搜索
      reschannelName: '',
      SalesmanBox: [],
      resqudaoid: '',
      //分页
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      isshow: '',
      tableData: [],
      // 选择
      selectTime: [moment().startOf('month').format("YYYY-MM-DD 00:00:00"), moment(new Date()).add(1, 'days')
        .format('YYYY-MM-DD 00:00:00')
      ],
      loading: false,
      my_url: my_url,
      ischannel: true
    }
  },
  mounted: function () {
    this.qudao();
    this.search(1);
  },
  methods: {
    querySearch(queryString, cb) {
      var SalesmanBox = this.SalesmanBox;
      var results = queryString ? SalesmanBox.filter(this.createFilter(queryString)) :
        SalesmanBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (SalesmanBox) => {
        return (SalesmanBox.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    getTransfer() {
      var data1 = [];
      // getData('post', my_url + '/crm/auth/getAllUserIdNameList.do', function (data) {
      getData('post', my_url + '/crm/auth/getUserIdNameList_All.do', function (data) {
        if (data.code == 0) {
          var cities = data.namelist;
          cities.forEach((city, index) => {
            data1.push({
              label: city.username,
              key: city.userid,
              pinyin: cities[index].username
            });
          });
        }
      });
      return data1;
    },
    newAdd() {
      this.datawei = this.getTransfer()
      this.channelName = ''
      this.userList = []
      this.dialogVisible = true
    },

    qudao() {
      let _this = this;
      getData('post', my_url + '/crm/channel/getChannelData.do', function (data) {
        if (data.code == 0) {
          let channelList = data.channelList;
          channelList.forEach(res => {
            _this.SalesmanBox.push({
              "value": res.dd_value,
              "dd_key": res.dd_key
            });
          })
        }
      });
    },
    resqudaoSelect(item) {
      this.resqudaoid = item.dd_key
    },
    qudaoSelect(item) {
      this.qudaoid = item.dd_key
    },
    //搜索
    search(page) {
      var _this = this
      if (this.reschannelName == '') {
        this.resqudaoid = ''
      }
      var params = {
        channelid: this.resqudaoid,
        pageSize: 20,
        pageNum: page,
      }
      getData('post', my_url + '/crm/channel/getChannelPustList.do', function (data) {
        let rows = data.rows
        rows.forEach(function (item, index, arr) {
          if (item.state == '01') {
            item.state = '启用'
          } else if (item.state == '03') {
            item.state = '停用'
          }
        })
        _this.tableData = rows
        _this.pageTotal = data.total
      }, params)
    },

    //确定新建/编辑
    sure() {
      var _this = this
      _this.loading = true
      this.dialogVisible = false
      var resuserList = this.userList
      resuserList = resuserList.join(',')

      //编辑
      if (this.isshow == true) {
        this.isshow = false
        var params = {
          channelid: this.qudaoid,
          userid: resuserList,
        }
        getData('post', my_url + '/crm/channel/channelPushUpdate.do ', function (data) {
          if (data.code == 0) {
            _this.loading = false
            _this.channelid = ''
            _this.search(1)
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: 'error'
            });
            _this.loading = false
          }
        }, params)
      } else {
        // 新建
        var params = {
          userid: resuserList,
          channelid: this.qudaoid,
        }

        getData('post', my_url + '/crm/channel/channelPushInsert.do', function (data) {
          _this.loading = false
          if (data.code == 0) {
            _this.$message({
              showClose: true,
              message: '添加成功!',
              duration: 3000,
              type: 'success'
            });
            _this.search(1);
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: 'error'
            });
          }
        }, params);
      }
    },
    //编辑
    showEditPopup(item) {
      console.log(item)
      this.datawei = this.getTransfer()
      this.dialogVisible = true
      this.isshow = true
      this.channelid = item.channelid
      var qudaoList = this.SalesmanBox
      for (var i = 0; i < qudaoList.length; i++) {
        if (qudaoList[i].value == item.channelname) {
          this.qudaoid = qudaoList[i].dd_key
          this.channelName = item.channelname
        }
      }
      var str = item.userid
      if (str == undefined) {
        var cc = []
      } else {
        var cc = str.split(',');
      }
      this.userList = cc
    },

    //删除
    deleteItem(item) {
      var _this = this
      var params = {
        pushid: item.pushid
      }
      getData('post', my_url + '/crm/channel/channelPushDelete.do', function (data) {
        if (data.code == 0) {
          _this.search(1)
        }
      }, params)


    },

    pageClick(page) { //点击分页
      this.pageNum = page;
      this.search(page)
    },

    reset() { //重置
      this.resqudaoid = '';
      this.reschannelName = ''
    },

    cancel() {
      this.dialogVisible = false
    },

    handleClose() {
      this.dialogVisible = false
    },

    //当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.checkedAllNum = val.length;
    },
    //当表格的排序条件发生变化的时候会触发该事件
    sortChange(val) {
      this.order = val.order
      this.prop = val.prop
      this.search();
    }
  }
}
</script>
<style src="../../../static/css/channelManagement.css"></style>
<style>
.transfer-color .el-transfer__buttons .el-button{
  background: #DC220D;
  border-color: #DC220D;
}
.el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label{
  font-size: 13px;
}
.transfer-color .el-checkbox-group .el-checkbox__label{
  font-size: 12px;
}


</style>