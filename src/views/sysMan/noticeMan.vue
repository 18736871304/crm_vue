<template>
  <div v-cloak style=" width: 17.1rem;">
    <div class="search-header">
      <div class="add-btn" @click="showAddNoticeDialogVisible">+ 新建</div>
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">创建时间</div>
          <div class="select-content" style="height: 0.3rem; width: calc(100% - 1.28rem); border: none">
            <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="datetimerange" align="right" size="mini"
              value-format="yyyy-MM-dd" unlink-panels range-separator="-" start-placeholder="开始时间"
              end-placeholder="结束时间" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">所属类别</div>
          <div class="select-content" style="width: calc(100% - 1.28rem); border: none">
            <el-select class="el-select-inners" v-model="noticeType" size="mini" placeholder="">
              <el-option v-for="(item,index) in noticeTypeList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">关键字搜索</div>
          <div class="select-content" style="width: calc(100% - 1.28rem);">
            <el-autocomplete class="el-input-inners" v-model="title" :trigger-on-focus="false" :fetch-suggestions="querySearch" size="mini"
              placeholder=""></el-autocomplete>
          </div>
        </div>

        <div class="common-select" style="float: right;">
          <div class="search-btn" @click="search">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
        </div>
      </div>
    </div>
    <div class="table-box noticeMan-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号">
        </el-table-column>
        <el-table-column align="center"  sortable prop="makedate" label="创建时间" width="150px">
        </el-table-column>
        <el-table-column align="center" prop="oprname" label="创建人" width="120px">
        </el-table-column>
        <el-table-column align="center" prop="typename" label="所属类别" width="120px">
        </el-table-column>
        <el-table-column align="center" prop="title" label="标题">
        </el-table-column>
        <el-table-column align="center" label="操作"  width="140px">
          <template slot-scope="scope">
            <a href="javascript:void(0);" style="color: #4985E5;" @click="showEditPopup(scope.row)">编辑</a>
            <a href="javascript:void(0);" style="color: #DC220D; margin-left: 0.15rem;" @click="deleteItem(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px; ">
        <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize"
          :current-page="pageNum" @current-change="pageClick">
        </el-pagination>
      </div>
    </div>
    <el-dialog custom-class="noticeMan-dialog" :title="titleDialog" :visible.sync="addNoticeDialogVisible" width="70%" :close-on-click-modal='false'>
      <div class="noticeMan-step-list">
        <div class="item-section">
          <label>所属类别</label>
          <div class="right-content">
            <el-select v-model="noticeItem.type" size="mini" placeholder="请选择">
              <el-option v-for="(item) in noticeTypeList" :key="item.dd_key" :label="item.dd_value"
                :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>
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
              <div id="div2" class="text">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <div class="search-btn" @click="updateItem">确定</div>
        <div class="search-btn" style="background: #fff;border: 1px solid rgba(221, 221, 221, 1);color: #686868;" @click="hideaddNoticeDialogVisible">取消</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import wangEditor from '@/components/wangEditor/release/wangEditor.min.js'
import { getData, getPhoneData, my_url} from '../../static/js/ajax.js';
import { formatDate } from '../../static/js/common.js';
let editor10
export default {
  data() {
    return {
      noticeItem: {
        title: '',
        type: '',
        content: '',
      },
      titleDialog: '新建',
      CJGselectList: ['保单检视', '疾病核保', '解答疑义'],
      CJGselectValue: '保单检视',
      addNoticeDialogVisible: false,
      selectTime: '',
      Salesman: '',
      team: '',
      noticeType: '',
      title: '',
      loading: false,
      SalesmanBox: [],
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      tableData: [],
      noticeTypeList: [],
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
      }
    }
  },
  mounted: function () {
    //this.hotlineStartDate = getBeforeDate(-1);
    //this.hotlineEndDate = getBeforeDate(1);
    //this.selectTime=[ new Date(formatDate(new Date(this.hotlineStartDate),'yyyy-MM-dd 00:00:00')), new Date(formatDate(new Date(this.hotlineEndDate),'yyyy-MM-dd 00:00:00'))];
    this.$nextTick(() => {
      this.getNoticeList()
      //数据字典
      let _this = this
      getData('post', my_url + '/crm/common/getDictList.do', function (data) {
        if (data.code == 0) {
          let {
            dictList
          } = data;
          _this.noticeTypeList = dictList;
          _this.noticeItem.type = dictList[0].dd_key
        }
      }, {
        dict_type: 'notice_type'
      });
      this.getSearchData();
    })
  },
  methods: {
    itemReset() {
      this.noticeItem = {
        title: '',
        type: this.noticeTypeList[0].dd_key,
        content: '',
      }
    },
    showEditPopup(item) {
      this.noticeItem = {
        title: item.title,
        type: item.type,
        content: item.content,
        noticeid: item.noticeid
      }
      this.titleDialog = '编辑';
      this.addNoticeDialogVisible = true
      if (editor10 == null) { //true
      this.$nextTick(() => {
        this.newWangEditor('#div1', '#div2')
        if (this.noticeItem.content) {
          editor10.txt.html(this.noticeItem.content)
        }
      })
      }else{
        editor10.txt.html(this.noticeItem.content)
      }
    },
    hideaddNoticeDialogVisible() {
      this.addNoticeDialogVisible = false
    },
    deleteItem(item) {
      let body = {
        noticeid: item.noticeid,
      }
      getData('post', my_url + '/crm/system/noticeDelete.do', data => {
        if (data.code == 0) {
          this.getNoticeList()
        }
      }, body);
    },
    updateItem() {
      let url = this.noticeItem.noticeid ? '/crm/system/noticeUpdate.do' : '/crm/system/notice.do'
      let data = this.noticeItem
      data.content = editor10.txt.html()

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
    getNoticeList() {
      let body = {
        title: this.title,
        type: this.noticeType,
        startDate: this.selectTime ? this.selectTime[0] + ' 00:00:00' : '',
        endDate: this.selectTime ? this.selectTime[1] + ' 00:00:00' : '',
        pageNumber: this.pageNum,
        pageSize: this.pageSize,
      }
      getData('post', my_url + '/crm/system/getNoticeList.do', data => {
        this.tableData = data.rows
        this.pageTotal = data.total
      }, body);
    },
    showAddNoticeDialogVisible() {
      this.itemReset()
      this.addNoticeDialogVisible = true;
      this.titleDialog = '新建';
      if (editor10 == null) { //true
        this.$nextTick(() => {
        this.newWangEditor('#div1', '#div2')
        editor10.txt.html(this.noticeItem.content)
      })
      }else{
        editor10.txt.html(this.noticeItem.content)
      }
    
    },
    reset() { //重置
      this.title = ''
      this.selectTime = ''
      this.noticeType = ''
    },
    newWangEditor(el1, el2) {
      editor10 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      // editor10.customConfig.pasteFilterStyle = false
      // editor10.customConfig.pasteText = false;
      // editor10.customConfig.pasteTextHandle = function (content) {
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
      editor10.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor10.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor10.customConfig.uploadImgShowBase64 = true
      editor10.customConfig.menus = [
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
      editor10.customConfig.colors = [
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
      editor10.customConfig.fontNames = [
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
      editor10.create()
    },
    
    getSearchData() {
      let _this = this;
      getData('post', my_url + '/crm/system/getNoticeTitleList.do', function (data) { //渠道类型
        if (data.code == 0) {
          let nameList = data.noticetitlelist;
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
      cb(results.reverse());
    },
    createFilter(queryString) {
      return (SalesmanBox) => {
        return (SalesmanBox.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
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
    width: 0.7rem;
    margin-top: 0.06rem;
    margin-right: 0.18rem;
    font-size: 0.14rem;
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
    font-size: 0.14rem;
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
    border-bottom: 1px solid rgba(216,216,216,1);
}
</style>