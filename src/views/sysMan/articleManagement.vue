<template>
  <div class="customerManagement" id="container" v-cloak style=" width: 17.1rem;">
    <div class="search-header">
      <div class="add-btn" @click="showAddCJGDetailDialog($event)"> + 新建</div>
      <div class="search-box clearfix">

        <div class="common-select" style="width: 30%">
          <!-- <div class="select-title" style="width: 1.54rem">修改时间</div> -->
          <div class="select-title" style="width: 1.54rem">
            <el-select class="el-input-title-inners" v-model="timeType" placeholder="请选择" size="mini">
              <el-option label="修改时间" value="修改时间"></el-option>
              <el-option label="发布时间" value="发布时间"></el-option>
            </el-select>
          </div>

          <div class="select-content" style="height: 0.3rem; width: calc(100% - 1.54rem); border: none">
            <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="daterange" align="right" size="mini" value-format="yyyy-MM-dd" unlink-panels range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">文章类型</div>
          <div class="select-content" style="width: calc(100% - 1.28rem); border: none">
            <el-select class="el-select-inners" v-model="articleType" size="mini" placeholder="请选择文章类型" clearable>
              <el-option v-for="(item,index) in articleTypeList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">关键字搜索</div>
          <div class="select-content" style="width: calc(100% - 1.38rem);">
            <el-input class="el-input-inners" v-model="keyword" size="mini" placeholder="请输入关键词"></el-input>
          </div>
        </div>

        <div class="common-select" style="float: right; width :11.5%">
          <div class="search-btn" @click="search">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
        </div>

      </div>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%" :header-cell-class-name="headerClassName" v-loading="loading">
        <el-table-column key="1" align="center" type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column key="2" align="center" prop="publishtime" label="发布时间" width="155" :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column key="3" align="center" prop="updatetime" label="修改时间" width="155" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="4" align="center" prop="oprname" label="修改人" width="100" :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column key="5" align="center" prop="typename" label="文章类型" width="80" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="6" align="left" prop="title" label="文章标题" width="auto" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="7" align="center" prop="seotitle" label="SEO标题" width="155" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="8" align="center" prop="seokeywords" label="SEO关键词" width="100" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column key="9" align="left" prop="seodescription" label="SEO描述" :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column key="10" align="center" label="操作" width="180">
          <template slot-scope="scope">
            <!-- <a class="edit option" href="javascript:void(0);" @click="showActile(scope.row)">查看</a> -->
            <a class="edit option" href="javascript:void(0);" @click="showEditPopup(scope.row)">编辑</a>
            <a class="delete option" href="javascript:void(0);" @click="deleteItem(scope.row)">删除</a>
          </template>
        </el-table-column>

        <el-table-column key="11" align="center" label="操作" width="180">
          <template slot-scope="scope">
            <a class="edit option" href="javascript:void(0);" v-if="!scope.row.toporderid" @click="topUp(scope.row)">置顶</a>
            <a class="edit option" href="javascript:void(0);" style="color: rgba(151, 151, 151, 1);" v-else>已置顶</a>
            <a class="delete option" href="javascript:void(0);" v-if="scope.row.toporderid" @click="canceTopUp(scope.row)">取消</a>
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

      <div class="step-list wei-step-list answering-doubts">

        <div class="item-section" style="width: 30%;" v-if="false">
          <label>渠道类型</label>
          <div class="right-content">
            <el-select v-model="articleItem.channel" size="mini" placeholder="请选择" @change="selectChange()">
              <el-option v-for="(item,index) in channelTypeList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item-section" style="width: 30%;">
          <label>文章类型</label>
          <div class="right-content">
            <el-select v-model="articleItem.type" size="mini" placeholder="请选择" @change="selectChange()">
              <el-option v-for="(item,index) in articleTypeList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="item-section" style="width: 80%;">
          <label>文章链接</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="articleItem.source_url">
            </el-input>
          </div>

          <div class="search-btn" @click="getmain" style="width: 140px;">获取文章链接内容</div>
        </div>
        <div class="item-section">
          <label>文章标题</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="articleItem.title">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>SEO标题</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="articleItem.seotitle">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>SEO关键词</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="articleItem.seokeywords">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>SEO描述</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="articleItem.seodescription">
            </el-input>
          </div>
        </div>

        <div class="item-section">
          <label>文章内容</label>
          <div class="right-content">
            <div class="editor-box">
              <div id="div5" class="toolbar"></div>
              <div id="div6" class="text" style="max-height: 4rem;">
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
import { getData, getPhoneData, my_url } from '../../static/js/ajax.js';
import { formatDate } from '../../static/js/common.js';
let editor16;
export default {
  data() {
    return {
      editor16: null,
      // 文章管理
      channelTypeList: [],
      articleTypeList: [],
      keyword: '',
      selectTime: '',

      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      tableData: [],

      articleType: '',
      timeType: '修改时间',
      //解答疑义
      articleItem: {
        type: '',
        channel: '0004',
        title: '',
        source_url: '',//原文链接

        head_pic_url: '',//头图
        info: '',//
        content: '',//文章内容
        publish_time: '',//发布时间

        seotitle: '',
        seodescription: '',
        seokeywords: '',
        id: '',  //文章id

      },
      addCJGItemVisible: false, //控制弹窗的显示
      CJGselectValue: '文章内容',
      lookActile: false,
      addCJGFIrstVisible: false,

      title: '',

      typeStr: '',


      loading: false,
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
  watch: {

  },
  mounted: function () {

    //数据字典
    let _this = this
    getData('post', my_url + '/crm/common/getDictList.do', function (data) {
      if (data.code == 0) {
        let {
          dictList
        } = data;
        const newArr = dictList.filter(function (item, index) {
          return item.dd_key != '90'
        })
        _this.articleTypeList = newArr;

        let typeStr = '';
        for (let i = 0; i < newArr.length; i++) {
          typeStr += "'" + newArr[i].dd_key + "',";
        }
        _this.typeStr = typeStr.slice(0, -1);
        _this.getCJGList()
      }
    }, {
      dict_type: 'contenttype'
    });

    getData('post', my_url + '/crm/common/getDictList.do', function (data) {
      if (data.code == 0) {
        let {
          dictList
        } = data;
        _this.channelTypeList = dictList;
      }
    }, {
      dict_type: 'source'
    });


  },

  // beforeDestroy() {
  //   const editor =  editor16;
  //   if (editor == null) return;
  //   editor.txt.destroy(); // 组件销毁时，及时销毁编辑器
  // },
  methods: {

    // 获取公众号内容
    getmain() {
      var _this = this
      // this.$nextTick(() => {
      var params = {
        url: this.articleItem.source_url,
        key: 'JZL5de6663e10c65e61',
        verifycode: '',
      }
      getPhoneData('get', 'https://www.dajiala.com/fbmain/monitor/v3/article_html', function (data) {
        if (data.code == '0') {
          var data = data.data
          _this.articleItem.head_pic_url = data.cover_url
          _this.articleItem.publish_time = data.post_time_str
          _this.articleItem.info = data.desc
          _this.articleItem.content = data.html
          _this.newWangEditor2('#div5', '#div6')
          editor16.txt.html(data.html)
        } else {
          alert('付费接口错误')
        }

      }, params);
      // })
    },



    // 打开新建
    showAddCJGDetailDialog(e) {
      if (e) {
        this.itemReset()
      }
      this.addCJGItemVisible = true
      this.$nextTick(() => {
        this.newWangEditor2('#div5', '#div6')
        editor16.txt.html(this.articleItem.content)
      })

    },
    // 确认新建或者更新
    updateCJGitem(isUpload) {
      if (this.lookActile) {
        this.$message({
          showClose: true,
          message: '查看状态不允许更新',
          duration: 3000,
          // type: 'success'
        });
        return
      }
      let url, data
      if (this.articleItem.id == '') {
        url = '/crm/content/contentInsert.do'
      } else {
        url = '/crm/content/contentUpdate.do'
      }
      this.articleItem.content = editor16.txt.html()



      data = this.articleItem
      return new Promise((resovle, reject) => {
        getData('post', my_url + url, res => {
          if (res.code == 0) {
            if (this.articleItem.id == '') {
              this.$message({
                showClose: true,
                message: '创建成功',
                duration: 3000,
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: '更新成功',
                duration: 3000,
                type: 'success'
              });
            }
            this.getCJGList()
            this.articleItem.id = ''
            this.addCJGItemVisible = false
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


    // 搜索
    search() {
      this.pageNum = 1
      this.pageSize = 20
      this.getCJGList()
    },
    getCJGList() {
      var _this = this
      this.loading = true
      var aa = ''
      if (this.articleType != '') {
        aa = this.articleType
      } else {
        aa = this.typeStr

      }



      let body = {
        // type:'',
        type: aa,
        keywords: this.keyword,
        // selectTime: '',
        // startDate: this.selectTime ? this.selectTime[0] : '',
        // endDate: this.selectTime ? this.selectTime[1] : '',
        // publish_start_time:
        // publish_end_time:
        pageNumber: this.pageNum,
        pageSize: this.pageSize,
      }

      if (this.timeType == '修改时间') {
        body['create_start_time'] = this.selectTime ? this.selectTime[0] : ''
        body['create_end_time'] = this.selectTime ? this.selectTime[1] : ''
      } else {
        body['publish_start_time'] = this.selectTime ? this.selectTime[0] : ''
        body['publish_end_time'] = this.selectTime ? this.selectTime[1] : ''
      }





      getData('post', my_url + '/crm/content/getContentList.do', data => {
        const newArr = data.rows.filter(function (item, index) {
          return item.type !== '90'
        })
        _this.tableData = newArr
        _this.pageTotal = data.total
        _this.loading = false
      }, body);
    },

    headerClassName(row) {
      if (row.column.property == 'askedtypedesc') return 'askedtypedescClass'
      if (row.column.property == 'title') return 'titleClass'
    },

    handleNodeClick(data) {

    },


    // 上传文件
    tirggerFile(e) {
      var _this = this
      this.updateCJGitem('isUpload').then(res => {
        let buztype, buzid
        buzid = res.id
        buztype = '0103'
        // let baseid = res.baseid
        let formData = new FormData();
        formData.append('myFile', e.target.files[0]);
        // formData.append('secondbuzid', res.baseid);
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
        }).fail(function (res) {
          console.log(res)
        });
      }).catch(res => {
        console.log(res)
      })
    },

    itemReset() {
      //解答疑义
      this.articleItem = {
        type: '',
        channel: '',
        title: '',
        source_url: '',//原文链接
        head_pic_url: '',//头图
        info: '',//
        content: '',//文章内容
        publish_time: '',//发布时间
        seotitle: '',
        seodescription: '',
        seokeywords: '',
        id: '',
      }
      this.keyword = ''
      this.selectTime = ''
    },



    // 删除文章
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
              this.reset()
              this.getCJGList()

            }
          }, body);


        }).catch(_ => { });

    },



    topUp(item) {
      let body = {
        id: item.id,
      }

      getData('post', my_url + '/crm/content/setcontenttop.do', data => {
        if (data.code == 0) {
          this.$message({
            showClose: true,
            message: '置顶成功',
            duration: 3000,
            type: 'success'
          });
          this.reset()
          this.getCJGList()
        }
      }, body);

    },

    canceTopUp(item) {
      let body = {
        id: item.id,
      }

      getData('post', my_url + '/crm/content/disableContentTopid.do', data => {
        if (data.code == 0) {
          this.$message({
            showClose: true,
            message: '已取消置顶',
            duration: 3000,
            type: 'success'
          });
          this.reset()
          this.getCJGList()
        }
      }, body);

     },






    // 编辑
    showEditPopup(item) {
      var _this = this
      this.articleItem.title = item.title
      // this.articleItem.content = item.content
      this.articleItem.source_url = item.source_url
      this.articleItem.channel = item.channel
      this.articleItem.type = item.type
      this.articleItem.seotitle = item.seotitle
      this.articleItem.seodescription = item.seodescription
      this.articleItem.seokeywords = item.seokeywords
      this.articleItem.id = item.id


      this.articleItem.head_pic_url = item.head_pic_url
      this.articleItem.publish_time = item.publishtime
      this.articleItem.info = item.info

      let body = {
        id: item.id,
      }
      getData('post', my_url + '/crm/homePage/getOneContent.do', data => {
        if (data.code == 0) {
          _this.articleItem.content = data.content
          _this.showAddCJGDetailDialog()
        }
      }, body);

    },


    showActile(item) {
      this.showEditPopup(item)
      this.lookActile = true
    },



    // 打开弹窗
    hideaddCJGFIrstVisible() {
      this.addCJGFIrstVisible = false
      this.addCJGItemVisible = false
      this.itemReset()
      this.lookActile = false
    },




    //重置
    reset() {
      this.keyword = ''
      this.selectTime = ''
      this.articleType = ''
      this.timeType = '修改时间'
      this.getCJGList()
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
      editor16.customConfig.fontSize = {
        '10px': { name: '10px', value: '1' },
        'small': { name: '13px', value: '2' },
        'normal': { name: '16px', value: '3' },
        'large': { name: '18px', value: '4' },
        'x-large': { name: '24px', value: '5' },
        'xx-large': { name: '32px', value: '6' },
        'xxx-large': { name: '48px', value: '7' },
      }




      // 上传图片到服务器
      editor16.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor16.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor16.customConfig.uploadImgMaxSize = 5 * 1024 * 1024; // 将图片大小限制为 3M
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



    pageClick(page) {
      this.pageNum = page;
      this.getCJGList();
    },

    selectChange() { },

  }
}
</script>
<style src="../../static/css/knowledgeMan.css"></style>

<style>
.step-list {
  padding: 0rem;
  overflow: auto;
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
</style>


<style scoped>
::v-deep .w-e-text p span {
  /* font-size: unset !important; */
}

::v-deep .el-message-box .el-button--primary {
  color: #fff !important;
  background-color: #dc220d !important;
  border-color: #dc220d !important;
}
</style>
 