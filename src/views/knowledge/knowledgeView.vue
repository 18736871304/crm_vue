<template>
  <div class="customerManagement" id="container" v-cloak style=" width: 17.1rem;">
    <div class="search-header">
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title filtitle">最后修改时间</div>
          <div class="select-content filContent">
            <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="daterange" align="right" size="mini" value-format="yyyy-MM-dd " unlink-panels range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title   filtitle">保险公司</div>
          <div class="select-content   filContent">
            <el-autocomplete class="el-input-inners" v-model="insorganName" :trigger-on-focus="false" :fetch-suggestions="querySearch1" size="mini" placeholder="请输入保险公司" clearable></el-autocomplete>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title    filtitle">关键字搜索</div>
          <div class="select-content   filContent">
            <el-autocomplete class="el-input-inners" v-model="title" :trigger-on-focus="false" :fetch-suggestions="querySearch" size="mini" placeholder="请输入关键字"></el-autocomplete>
          </div>
        </div>

        <div class="common-select"></div>
        <div class="common-select" style="width: 4%;">
          <div class="search-btn searchLeft" @click="search">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1); display: none;" @click="reset">重置</div>
        </div>
      </div>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%" :header-cell-class-name="headerClassName">
        <el-table-column key="1" align="center" type="index" label="序号">
        </el-table-column>
        <el-table-column key="2" sortable align="center" prop="modifydate" label="最后修改时间" width="170">
        </el-table-column>
        <el-table-column key="3" align="center" prop="insorganname" label="保险公司" width='140' :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="4" align="left" prop="title" label="标题" width="auto" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="5" align="center" label="操作" width="140">
          <template slot-scope="scope">
            <a class="edit option" href="javascript:void(0);" @click="lookPopup(scope.row)">查看</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize" :current-page="pageNum" @current-change="pageClick">
      </el-pagination>
    </div>
    <el-dialog title="保单检视" :visible.sync="drawer" width="73%" top="5vh" :close-on-click-modal='false'>
      <div class="step-list wei-step-list">
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

          <div class="right-content bdjsDetail">
            <div v-html="this.bdjsItem.policydetail"></div>
            <!-- <div class="editor-box">
              <div id="div1" class="toolbar"></div>
              <div id="div2" class="text">
              </div>
            </div> -->
          </div>
        </div>
        <!-- <div class="item-section">
          <label>建议规划</label>
          <div class="right-content">
            <div class="editor-box">
              <div id="div3" class="toolbar"></div>
              <div id="div4" class="text">
              </div>
            </div>
          </div>
        </div> -->
        <div class="item-section">
          <label>附件</label>
          <div class="right-content">
            <ul class="enclosure-list" v-if="fileList.length>0">
              <li class="item" v-for="(item,index) in fileList" :key="index">
                <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{item.filename}}</div>
                <a :href="'https://crm.meihualife.com/filedownload.do?fileid=' + item.fileid" class="download-btn" :download="item.filename">下载</a>
              </li>
            </ul>

            <div class="enclosure-list" v-else>
              暂无附件
            </div>

          </div>

        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery';
// import wangEditor from '@/components/wangEditor/release/wangEditor.min.js';
import { getData, my_url } from '../../static/js/ajax.js';
import { formatDate } from '../../static/js/common.js';
// let editor9, editor10;
export default {
  data() {
    return {
      // 筛选
      insorganName: '',
      title: '',
      selectTime: '',
      SalesmanBox: [],
      SalesmanBox1: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultProps1: {
        id: 'children',
        label: 'label'
      },
      cjgType: '01',
      //列表
      tableData: [],
      loading: false,
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      // 弹窗
      drawer: false,
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
      fileList: '',//附件
      CJGTypeList: [],
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
      this.CJGselectValue = '保单检视'
    }
  },
  mounted: function () {
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
      this.cjgType = '01';
      this.getCJGList()
      this.insOrganList()
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

    handleNodeClick(data) {
    },
    checked() {
      this.getCJGList()
    },
    createFilter(queryString) {
      return (SalesmanBox) => {
        return (SalesmanBox.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
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
        buzid = res.readid
        buztype = '0101'
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
        } else {
          this.fileList = []
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
    lookPopup(item) {
      this.getItem(item).then(res => {
        this.getUploadFile(item.baseid)
        let body, url

        this.bdjsItem = res.policyread
        this.bdjsItem.baseid = item.baseid
        this.drawer = true
        // this.$nextTick(() => {
        //   this.newWangEditor('', '#div2')
        //   if (this.bdjsItem.policydetail) {
        //     editor9.txt.html(this.bdjsItem.policydetail)
        //     editor9.$textElem.attr('contenteditable', false)
        //   }
        // })
        // this.$nextTick(() => {
        //   this.newWangEditor1('', '#div4')
        //   if (this.bdjsItem.suggestion) {
        //     editor10.txt.html(this.bdjsItem.suggestion)
        //     editor10.$textElem.attr('contenteditable', false)
        //   }
        // })
      })
    },
    getItem(item) {
      let body = {
        baseid: item.baseid
      },
        url = '/crm/knowledge/getOnePolicyRead.do'
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
        type: '01',
        modifyStartDate: this.selectTime ? this.selectTime[0] : '',
        modifyEndDate: this.selectTime ? this.selectTime[1] : '',
        pageNumber: this.pageNum,
        pageSize: this.pageSize,

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
      this.getCJGList()
      this.cjgType = ''
    },
    // newWangEditor(el1, el2) {
    //   editor9 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
    //   // 关闭粘贴内容中的样式
    //   editor9.customConfig.pasteFilterStyle = false
    //   // 隐藏“网络图片”tab
    //   editor9.customConfig.showLinkImg = false
    //   // 忽略粘贴内容中的图片
    //   editor9.customConfig.pasteIgnoreImg = true
    //   // 使用 base64 保存图片
    //   //editor9.customConfig.uploadImgShowBase64 = true
    //   editor9.customConfig.menus = [
    //     'image',
    //   ]
    //   // 上传图片到服务器
    //   editor9.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
    //   editor9.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
    //   editor9.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

    //   //自定义上传图片事件
    //   editor9.customConfig.uploadImgHooks = {
    //     before: function (xhr, editor, files) {

    //     },
    //     success: function (xhr, editor, result) {
    //       console.log("上传成功");

    //     },
    //     fail: function (xhr, editor, result) {
    //       console.log("上传失败,原因是" + result);
    //     },
    //     error: function (xhr, editor) {
    //       console.log("上传出错");
    //     },
    //     timeout: function (xhr, editor) {
    //       console.log("上传超时");
    //     }
    //   }
    //   editor9.create()
    // },
    // newWangEditor1(el1, el2) {
    //   editor10 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
    //   // 关闭粘贴内容中的样式
    //   editor10.customConfig.pasteFilterStyle = false
    //   // 隐藏“网络图片”tab
    //   editor10.customConfig.showLinkImg = false
    //   // 忽略粘贴内容中的图片
    //   editor10.customConfig.pasteIgnoreImg = true
    //   // 使用 base64 保存图片
    //   //editor.customConfig.uploadImgShowBase64 = true
    //   editor10.customConfig.menus = [
    //     'image',
    //   ]
    //   // 上传图片到服务器
    //   editor10.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
    //   editor10.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
    //   editor10.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

    //   //自定义上传图片事件
    //   editor10.customConfig.uploadImgHooks = {
    //     before: function (xhr, editor, files) {

    //     },
    //     success: function (xhr, editor, result) {
    //       console.log("上传成功");

    //     },
    //     fail: function (xhr, editor, result) {
    //       console.log("上传失败,原因是" + result);
    //     },
    //     error: function (xhr, editor) {
    //       console.log("上传出错");
    //     },
    //     timeout: function (xhr, editor) {
    //       console.log("上传超时");
    //     }
    //   }
    //   editor10.create()
    // },

    pageClick(page) {
      this.pageNum = page;
      this.getCJGList();
    }
  }
}
</script>
<style src="../../static/css/knowledgeMan.css"></style>

<style scoped>
.enclosure-list {
  min-height: 40px;
  max-height: 100px;
  overflow: auto;
}
.bdjsDetail {
  height: 510px;
  overflow: auto;
  border: 1px solid rgba(216, 216, 216, 1);
  padding: 10px;
}
.step-list {
  padding: 0rem;
  overflow: auto;
}
</style>
<style>
.el-table tr {
  height: 0.3rem !important;
}

.step-list {
  padding: 0rem;
  overflow: auto;
}


</style>