<template>
  <div class="customerManagement" id="container" v-cloak style=" width: 17.1rem;">
    <div class="search-header">
      <div class="add-btn" @click="showAddCJGDetailDialog($event)"> + 新建</div>
      <div class="search-box clearfix">

        <div class="common-select">
          <div class="select-title filtitle">新建时间</div>
          <div class="select-content filContent">
            <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="datetimerange" align="right" size="mini" value-format="yyyy-MM-dd" unlink-panels range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title filtitle">保险公司</div>
          <div class="select-content filContent">
            <el-autocomplete class="el-input-inners" v-model="insorganName" :trigger-on-focus="false" :fetch-suggestions="querySearch1" size="mini" placeholder="请输入保险公司" clearable></el-autocomplete>

          </div>
        </div>

        <div class="common-select">
          <div class="select-title filtitle">关键字搜索</div>
          <div class="select-content filContent">
            <el-autocomplete class="el-input-inners" v-model="title" :trigger-on-focus="false" :fetch-suggestions="querySearch" size="mini" placeholder="请输入关键字"></el-autocomplete>
          </div>
        </div>

        <div class="common-select" style="  width: 4%;">
          <div class="search-btn searchLeft" @click="search()">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1); display: none;" @click="reset">重置</div>
        </div>
      </div>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column key="1" align="center" type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column key="2" sortable align="center" prop="makedate" label="新建时间" width="160">
        </el-table-column>
        <el-table-column key="3" sortable align="center" prop="modifydate" label="最后修改时间" width="160">
        </el-table-column>
        <el-table-column key="4" align="center" prop="oprname" label="最后修改人员" width="100">
        </el-table-column>
        <el-table-column key="5" align="center" prop="insorganname" label="保险公司" width='130'>
        </el-table-column>

        <el-table-column key="6" align="left" prop="title" label="标题" :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column key="7" align="center" label="操作" width="140">
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
    <el-dialog :title="'新建 - ' + CJGselectValue" :visible.sync="addCJGItemVisible" width="73%" top="5vh"   :close-on-click-modal='false' @close='hideaddCJGFIrstVisible'>

      <div class="step-list wei-step-list">
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
        <div class="item-section" v-if="addCJGItemVisible">
          <label>保障详情</label>
          <div class="rich-text-editor right-content" ref="richTextEditorRef">
            <Toolbar :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
            <Editor style="height: 441px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
          </div>
        </div>

        <div class="item-section">
          <label>附件</label>
          <div class="right-content">
            <ul class="enclosure-list">
              <li class="item" v-for="(item,index) in fileList" :key="index">

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
      <div class="dialog-footer" style="margin-top: 0.2rem; ">
        <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="hideaddCJGFIrstVisible">取消</div>
        <div class="search-btn" @click="updateCJGitem">确定</div>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery';
// import "../../components/wangEditor/release/wangEditor.css";
// import "../../components/wangEditor/release/fonts/w-e-icon.woff"
// import wangEditor from '@/components/wangEditor/release/wangEditor.min.js';
import { getData, my_url } from '../../static/js/ajax.js';
import { formatDate } from '../../static/js/common.js';
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import axios from 'axios'
import FormData from 'form-data'

export default {
  components: { Editor, Toolbar },
  data() {
    return {


      editor: null,
      html: "",
      toolbarConfig: {
        excludeKeys: [
          // 排除菜单组，写菜单组 key 的值即可
          "group-video",//去掉视频
          "fullScreen"//去掉全屏
        ]
      },
      editorConfig: { MENU_CONF: {}, placeholder: "" },
      mode: "default", // or 'simple'





      // 搜索
      selectTime: '',
      insorganName: '',
      title: '',
      SalesmanBox: [],
      SalesmanBox1: [],



      //弹窗
      addCJGItemVisible: false, //控制弹窗的显示
      CJGselectValue: '保单检视',
      bdjsItem: {
        title: '',
        insorgancode: '',
        suggestion: '',
        policydetail: '',
      },
      fileList: '',
      insorganName1: '',
      // open: true,
      editorEdit: '',
      cjgType: '',


      // 表格
      tableData: [],
      loading: false,
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,



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

    }
  },
  created() {
    var that = this;
    this.editorConfig.placeholder = "请输入内容...";
    this.editorConfig.MENU_CONF["uploadImage"] = {
      timeout: 5 * 1000, // 5s

      fieldName: "image",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      maxFileSize: 10 * 1024 * 1024, // 10M

      base64LimitSize: 5 * 1024, // 5kb 以下插入 base64

      onBeforeUpload(files) {
        return files; // 返回哪些文件可以上传
        // return false 会阻止上传
      },
      onProgress(progress) {
        console.log("onProgress", progress);
      },
      onSuccess(file, res) {
        console.log("onSuccess", file, res);
      },
      onFailed(file, res) {
        alert(res.message);
        console.log("onFailed", file, res);
      },
      onError(file, err, res) {
        alert(err.message);
        console.error("onError", file, err, res);
      },

      // 用户自定义上传图片
      customUpload(file, insertFn) {
        // var axios = require("axios");
        // var FormData = require("form-data");


        // 示例：使用 axios 和 FormData 发送 POST 请求
        // const form = new FormData();
        var data = new FormData();
        data.append("myFile", file); // file 即选中的文件
        // data.append("userToken", sessionStorage.getItem('userToken')); // file 即选中的文件
        var config = {
          method: "post",
          url: my_url + '/crm/fileupload/impUpload.do', //上传图片地址
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: "Bearer " + localStorage.getItem("token")
          },
          data: data
        };

        axios(config).then(function (res) {
          let url = res.data.data[0]; //拼接成可浏览的图片地址
          insertFn(url, "图片", url); //插入图片
        }).catch(function (error) {
          console.log(error);
        });
      }
    };
  },



  mounted: function () {
    this.cjgType = '01';
    this.getCJGList()//搜索表格 数据
    this.getSearchData()//获取保险公司列表
    this.insOrganList()//搜索内容俩表
  },
  methods: {
    // 初始化编辑器
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    beforeDestroy() {
     
      const editor = this.editor;
      if (editor == null) return;
      editor.destroy(); // 组件销毁时，及时销毁编辑器
    },

    // 文件图标
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
    // headerClassName(row) {
    //   if (row.column.property == 'askedtypedesc') return 'askedtypedescClass'
    //   if (row.column.property == 'title') return 'titleClass'
    // },



    handleNodeClick(data) {

    },
    // getRiskList() {
    //   let _this = this
    //   getData('post', my_url + '/crm/common/getAllRiskList.do', function (data) {
    //     if (data.code == 0) {
    //       let {
    //         dictList
    //       } = data;
    //       _this.productList = dictList;
    //     }
    //   });
    // },



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
    // 获取保险公司
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
    // 关键字搜索
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






    // 删除文件
    deleteFile(id) {
      let body = {
        fileid: id,
      }
      getData('post', my_url + '/crm/fileupload/fileDelete.do', res => {
        if (res.code == 0) {
          this.getUploadFile(this.bdjsItem.baseid)
        }
      }, body);
    },


    // 上传附件
    tirggerFile(e) {
 
      var _this = this
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
          $('.file-input').val('')
          that.getUploadFile(baseid)

        }).fail(function (res) {
          console.log(res)
        });
      }).catch(res => {
        console.log(res)
      })
    },



    itemReset() {
 
      //保单检视
      // this.beforeDestroy()
      this.editor = null
      this.html = ''
      this.bdjsItem = {
        title: '',
        insorgancode: '',
        suggestion: '',
        policydetail: '',
      }
      this.fileList = []

    },


    // 删除数据
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
    // 编辑
    showEditPopup(item) {
      var that = this

   
      this.getUploadFile(item.baseid)

      let body = {
        baseid: item.baseid
      }
      getData('post', my_url + '/crm/knowledge/getOnePolicyRead.do', res => {
        if (res.code == 0) {
  
          that.insorganName1 = res.policyread.insorganname
          that.bdjsItem = res.policyread
          that.bdjsItem.baseid = item.baseid
          that.CJGselectValue = item.typename
          that.html = res.policyread.policydetail
   that.addCJGItemVisible = true
        }
      }, body);

    },


    // 获取上传的文件列表
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


    // 更新文件
    updateCJGitem(isUpload) {
      let url, data

      url = this.bdjsItem.baseid ? '/crm/knowledge/policyReadUpdate.do' : '/crm/knowledge/policyRead.do'

      this.bdjsItem.policydetail = this.html
      this.bdjsItem.suggestion = '<p>1</p>'
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

 
      getData('post', my_url + url, res => {
        if (res.code == 0) {
          this.addCJGItemVisible = false
          this.insorganName1 = ''
          this.bdjsItem.insorgancode = ''
          this.bdjsItem.baseid = ''
          this.itemReset()
          this.getCJGList()
       
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            duration: 3000,
            type: 'error'
          });
        }
      }, data);
    },

    // 搜索
    search() {
      this.pageNum = 1
      this.pageSize = 20
      this.getCJGList()
    },
    // 搜索表格数据
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
        insorgancode: insorgancode,
        pageNumber: this.pageNum,
        pageSize: this.pageSize,
      }
      getData('post', my_url + '/crm/knowledge/getKnowledgeList.do', data => {
        this.tableData = data.rows
        this.pageTotal = data.total
      }, body);
    },





    // 取消添加
    hideaddCJGFIrstVisible() {
      this.addCJGItemVisible = false
      this.insorganName1 = ''
      this.bdjsItem.insorgancode = ''
      this.itemReset()
    },
    // 打开新建弹窗
    showAddCJGDetailDialog(e) {
      this.addCJGItemVisible = true
    },



    // 分页
    pageClick(page) {
      this.pageNum = page;
      this.getCJGList();
    },



    reset() { //重置
      this.title = ''
      this.selectTime = ''
      // this.dkwItem.askedtype = ''
      // this.dkwItem.askedflow = ''
      this.getCJGList()
    },

  }
}
</script>
<style src="../../static/css/knowledgeMan.css"></style>
<style src="@wangeditor/editor/dist/css/style.css"></style>

<style scoped>
.step-list {
  padding: 0rem;
  overflow: auto;
}
</style>

<style>
.step-list {
  padding: 0rem;
  overflow: auto;
}
.rich-text-editor {
  border: 1px solid rgba(216, 216, 216, 1);
}
</style>