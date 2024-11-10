<template>
  <div v-cloak style=" width: 17.1rem;">
    <div class="search-header">
      <div class="add-btn" @click="showAddNoticeDialogVisible">+ 新建</div>
      <div class="search-box clearfix">
        <div class="common-select" style="width: 30%;">
          <div class="select-title" style="width: 1.65rem">公告时间</div>
          <div class="select-content" style="height: 0.3rem; width: calc(100% - 1.65rem); border: none">
            <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="daterange" align="right" size="mini" value-format="yyyy-MM-dd" unlink-panels range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>

        <!-- <div class="common-select">
          <div class="select-title" style="width: 1.28rem">所属类别</div>
          <div class="select-content" style="width: calc(100% - 1.28rem); border: none">
            <el-select class="el-select-inners" v-model="noticeType" size="mini" placeholder="">
              <el-option v-for="(item,index) in noticeTypeList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div> -->

        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">关键字搜索</div>
          <div class="select-content" style="width: calc(100% - 1.38rem);">
            <el-input class="el-input-inners" v-model="keyword" size="mini" placeholder="请输入关键词"></el-input>
          </div>
        </div>

        <div class="common-select" style="float: right;  width: 18%;">
          <div class="search-btn" @click="search">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
        </div>
      </div>
    </div>
    <div class="table-box noticeMan-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号">
        </el-table-column>
        <el-table-column align="center" sortable prop="createtime" label="公告时间" width="155">
        </el-table-column>
        <el-table-column align="center" prop="oprname" label="创建人" width="120px">
        </el-table-column>
        <el-table-column align="center" prop="title" label="标题">
        </el-table-column>
        <el-table-column align="center" label="操作" width="140px">
          <template slot-scope="scope">
            <a href="javascript:void(0);" style="color: #4985E5;" @click="showEditPopup(scope.row)">编辑</a>
            <a href="javascript:void(0);" style="color: #DC220D; margin-left: 0.15rem;" @click="deleteItem(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px; ">
        <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize" :current-page="pageNum" @current-change="pageClick">
        </el-pagination>
      </div>
    </div>
    <el-dialog custom-class="noticeMan-dialog" :title="titleDialog+' - 理赔公告'" :visible.sync="addNoticeDialogVisible" width="70%" :close-on-click-modal='false'>
      <div class="noticeMan-step-list">
        <!-- <div class="item-section">
          <label>所属类别</label>
          <div class="right-content">
            <el-select v-model="noticeItem.type" size="mini" placeholder="请选择">
              <el-option v-for="(item) in noticeTypeList" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div> -->
        <div class="item-section">
          <label>标题</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="noticeItem.title">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>内容</label>
          <div class="right-content">
            <div class="editor-box editor-content1">
              <div id="div1" class="toolbar"></div>
              <div id="div2" class="text" style="min-height: 2rem;max-height: 4rem;overflow-y: scroll;">
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="dialog-footer">

        <div class="search-btn" style="background: #fff;border: 1px solid rgba(221, 221, 221, 1);color: #686868;" @click="hideaddNoticeDialogVisible">取消</div>
        <div class="search-btn" @click="updateItem">确定</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import wangEditor from '@/components/wangEditor/release/wangEditor.min.js'
import { getData, getPhoneData, my_url } from '../../static/js/ajax.js';
import { formatDate } from '../../static/js/common.js';
let editor9
export default {
  data() {
    return {
      editor9: null,
      tableData: [],
      noticeItem: {
        title: '',
        type: '90',
        content: '',
      },
      titleDialog: '新建',

      addNoticeDialogVisible: false,
      selectTime: '',
      keyword: '',
      noticeType: '90',
      loading: false,


      // Salesman: '',
      // title: '',
      // SalesmanBox: [],


      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,




      // noticeTypeList: [],

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
      }
    }
  },
  created() {

  },
  mounted: function () {
    editor9 = null
    this.$nextTick(() => {
      this.search()
    })

  },
  methods: {

    itemReset() {
      this.noticeItem = {
        title: '',
        type: '90',
        content: '',
        id: '',  //公告id
      }
    },
    showEditPopup(item) {
      var _this = this
      // 创建编辑器
      this.showAddNoticeDialogVisible()
      this.noticeItem = {
        title: item.title,
        type: item.type,
        content: item.content,
        id: item.id
      }

      let body = {
        id: item.id,
      }
      getData('post', my_url + '/crm/homePage/getOneContent.do', data => {
        if (data.code == 0) {
          _this.noticeItem.content = data.content


          _this.titleDialog = '编辑';
          _this.addNoticeDialogVisible = true
          if (editor9 == null) { //true
            _this.$nextTick(() => {
              _this.newWangEditor('#div1', '#div2')
              if (_this.noticeItem.content) {
                editor9.txt.html(_this.noticeItem.content)
              }
            })
          } else {
            editor9.txt.html(_this.noticeItem.content)
          }

        }
      }, body);






    },
    hideaddNoticeDialogVisible() {
      this.addNoticeDialogVisible = false
    },

    // 删除
    deleteItem(item) {
      let body = {
        id: item.id,
      }


      this.$confirm('你确定要删除吗？')
        .then(_ => {
          getData('post', my_url + '/crm/content/contentDelete.do', data => {
            if (data.code == 0) {
              this.$message({
                showClose: true,
                message: '删除成功',
                duration: 3000,
                type: 'success'
              });
              this.getNoticeList()

            }
          }, body);


        }).catch(_ => { });




    },
    // 跟新和添加
    updateItem() {
      let url = this.noticeItem.id ? '/crm/content/contentUpdate.do' : '/crm/content/contentInsert.do'
      let data = this.noticeItem
      data.content = editor9.txt.html()
      getData('post', my_url + url, data => {
        if (data.code == 0) {
          this.getNoticeList()
          this.addNoticeDialogVisible = false
        } else {
          this.$message({
            showClose: true,
            message: data.msg,
            duration: 3000,
            type: 'error'
          });
        }
      }, data);
    },


    search() {
      this.pageNum = 1
      this.getNoticeList()
    },
    pageClick(page) {
      this.pageNum = page;
      this.getNoticeList();
    },

    // 搜索
    getNoticeList() {
      let body = {
        // title: this.title,
        type: '90',
        create_start_time: this.selectTime ? this.selectTime[0] + ' 00:00:00' : '',
        create_end_time: this.selectTime ? this.selectTime[1] + ' 00:00:00' : '',
        pageNumber: this.pageNum,
        pageSize: this.pageSize,
        keywords: this.keyword
      }
      getData('post', my_url + '/crm/content/getContentList.do', data => {
        this.tableData = data.rows
        this.pageTotal = data.total
      }, body);
    },


    showAddNoticeDialogVisible() {
      this.itemReset()
      this.titleDialog = '新建';
      this.$nextTick(() => {
        if (!editor9) {
          this.newWangEditor('#div1', '#div2')
        }
        editor9.txt.html(this.noticeItem.content)
      })

      this.addNoticeDialogVisible = true;


    },


    reset() { //重置
      this.title = ''
      this.selectTime = ''
      this.noticeType = ''
    },



    newWangEditor(el1, el2) {
      editor9 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      editor9.customConfig.height = 500
      // 隐藏“网络图片”tab
      editor9.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor9.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor9.customConfig.uploadImgShowBase64 = true
      editor9.customConfig.menus = [
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
      editor9.customConfig.colors = [
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
      editor9.customConfig.fontNames = [
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
      editor9.create()
    },
  }
}
</script>
<style src="@/components/wangEditor/release/wangEditor.css"></style>
<style src="@/components/wangEditor/release/fonts/w-e-icon.woff"></style>
<style>
.noticeMan-step-list {
  max-height: 700px;
  /* overflow-y: scroll; */
  overflow-x: hidden;
}

.noticeMan-step-list .item-section {
  display: flex;
}

.noticeMan-step-list .item-section label {
  width: 0.75rem;
  margin-top: 0.06rem;
  margin-right: 0.08rem;
  font-size: 0.14rem;
  text-align: right;
}

.noticeMan-step-list .item-section .right-content {
  flex: 1;
  width: 0;
}

.noticeMan-step-list .item-section .el-select {
  display: block;
  width: 100%;
}

.item-section {
  margin-top: 0.08rem;
}

.item-section .el-input--mini .el-input__inner {
  line-height: calc(0.3rem - 2px);
  border-radius: 2px;
  border: 1px solid rgba(216, 216, 216, 1);
  font-size: 0.14rem;
  margin-left: 0;
}

.editor-box {
  border-radius: 2px;
  border: 1px solid rgba(216, 216, 216, 1);
  font-size: 15px;
}

.editor-content1 {
  min-height: 56px;
}

.item-section .el-textarea__inner {
  overflow: hidden;
  border-radius: 2px;
  font-size: 0.14rem;
  font-family: Arial, Helvetica, sans-serif;
}

.w-e-toolbar {
  border-bottom: 1px solid rgba(216, 216, 216, 1);
}

.el-message-box .el-button {
  background: #fff !important;
  border-color: rgb(216, 216, 216) !important;
  color: #dc220d !important;
}

.el-message-box .el-button--primary {
  color: #fff !important;
  background-color: #dc220d !important;
  border-color: #dc220d !important;
}





#div2 h1 *  {
  font-size: 32px !important;
  margin: 10px 0;
  line-height: 1.5;
}

#div2 h2 *  {
  font-size: 24px !important;
  margin: 10px 0;
  line-height: 1.5;
}

#div2 h3 *  {
  font-size: 18.72px !important;
  margin: 10px 0;
  line-height: 1.5;
}

#div2 h4 *  {
  font-size: 16px !important;
  margin: 10px 0;
  line-height: 1.5;
}

#div2 h5 *  {
  font-size: 13.28px !important;
  margin: 10px 0;
  line-height: 1.5;
}

#div2 p{
  font-size: 16px !important;
}
</style>
 