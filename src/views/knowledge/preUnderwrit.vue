<template>
  <div class="customerManagement" id="container" v-cloak style=" width: 17.1rem;">
    <div class="search-header">
      <div class="add-btn" @click="showAddCJGDetailDialog($event)">+ 新建</div>
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">客户姓名</div>
          <div class="select-content" style="width: calc(100% - 1.28rem);">
            <el-input class="el-input-inners" v-model="selectName" size="mini" placeholder="请输入客户姓名" clearable></el-input>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">回复状态</div>
          <div class="select-content" style="width: calc(100% - 1.28rem); border: none">
            <el-select class="el-select-inners" v-model="reply" size="mini" placeholder="">
              <el-option v-for="(item,index) in replyList" :key="index" :label="item.dd_value" :value="item.dd_key"></el-option>
            </el-select>
          </div>
        </div>
        <div class="common-select">
          <div class="search-btn" @click="search(1)">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
        </div>
      </div>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号">
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="170" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column align="center" prop="policyuwname" label="状态" width="100" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-tag style="color:#979797;background: #F6F7FA;border: 1px solid #ECEEF6;"
              v-if="scope.row.policyuwname == '待回复'" size="mini">待回复</el-tag>
            <el-tag style="color:#979797;background: #F6F7FA;border: 1px solid #ECEEF6;"
              v-else-if="scope.row.policyuwname == '已回复'" size="mini">已回复</el-tag>
            <el-tag v-else type="success" size="mini">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="username" label="提交人" width="180" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column sortable align="center" prop="makedate" label="提交时间" width="180"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column sortable align="center" prop="modifydate" label="最后一次回复时间" width="170"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column align="center" label="操作" width="auto">
          <template slot-scope="scope">
            <a class="edit option" href="javascript:void(0);" @click="showEditPopup(scope.row)">查看详情</a>
            <a class="edit option" href="javascript:void(0);" @click="delectName(scope.row)" v-if='dis_Pz_up'
              style="color: #DC220D;">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize"
        :current-page="pageNum" @current-change="pageClick">
      </el-pagination>
    </div>
    <el-dialog title="预核保" :visible.sync="drawer" width="1100px" :close-on-click-modal='false'>
      <div class="step-list wei-step-list">
        <div class="item-section">
          <label>客户姓名</label>
          <div class="right-content" style="width: 50%;">
            <el-input placeholder="请输入姓名" size="mini" v-model="bdjsItem.name">
            </el-input>
          </div>
          <div class="checkbox-item" style="width: 50%; margin-left: 0.3rem;" v-if='showFinish'>
            <el-checkbox size="mini" v-model="finish" :disabled='isfinish'>核保完成</el-checkbox>
          </div>
        </div>
        <ul class="img-list">
          <li class="item-section" v-for="(item,index) in tracelist" :key="index">
            <label v-if="item.position=='012'">核保老师</label>
            <label v-else>{{item.oprname}}</label>
            <div class="right-content">
              <div class="enclosure-list">
                <div class="jilu_content" v-html="item.uwcontent">{{item.uwcontent}}
                </div>
                <!-- <div v-if="item.filelist.length"> -->
                <div class="item" v-for="(obj,index) in item.filelist" :key="index">
                  <div class="name"><i :class="fileTypeFun(obj.filetype)"></i>&nbsp;&nbsp;{{obj.filename}}</div>
                  <a :href="'https://crm.meihualife.com/filedownload.do?fileid=' + obj.fileid" class="download-btn"
                    :download="obj.filename">下载</a>
                </div>
                <!-- </div> -->

              </div>
            </div>
          </li>
        </ul>
        <div class="item-section">
          <label>补充记录</label>
          <div class="right-content">
            <div class="editor-box">
              <div id="div1" class="toolbar"></div>
              <div id="div2" class="text">
              </div>
            </div>
          </div>
        </div>
        <div class="item-section">
          <label>附件</label>
          <div class="right-content">
            <ul class="enclosure-list" style="overflow-y: hidden;">
              <li class="item" v-for="(item,index) in insertFileList" :key="index">
                <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{item.filename}}</div>
                <a :href="'https://crm.meihualife.com/filedownload.do?fileid=' + item.fileid" class="download-btn"
                  :download="item.filename">下载</a>
              </li>
              <a href="javascript:;" class="upload-btn">
                <img src="../../static/images/file-icon.png" alt="">  
                添加附件
                <input type="file" v-on:change="tirggerFile($event)" class="file-input">
              </a>
            </ul>
          </div>
        </div>
        <div class="dialog-footer" style="margin-top: 0.2rem; padding: 0;">
          <div class="search-btn" @click="newRecord">保存</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery';
import '../../static/js/viewer-jquery.min.js'
import '../../static/css/viewer.min.css'
import wangEditor from '@/components/wangEditor/release/wangEditor.min.js';
import { getData, my_url } from '../../static/js/ajax.js';
let editor13;
export default {
  data() {
    return {
      drawer: false,
      tracelist: [],
      insertFileList: [],

      isChoose: false,
      //核保内容
      bdjsItem: {
        title: '',
        uwcontent: '',
        fileStr: ''
      },
      uwid: '',
      tableData: [],
      selectName: '',
      reply: '',
      replyList: [],
      finish: false,
      isfinish: false,
      showFinish: true,
      dis_Pz_up: false,
      pageTotal: 0,
      pageSize: 15,
      pageNum: 1,
    }
  },
  mounted: function () {
    let _this = this;
    this.$nextTick(() => {
      getData('post', my_url + '/crm/common/getDictList.do', function (data) {
        if (data.code == 0) {
          _this.replyList = data.dictList;
        };
      }, {
        dict_type: 'policy_uw_state'
      });
      //资源删除的权限
      getData('post', my_url + '/crm/auth/getZongPermission.do', function (data) {
        console.log(data)
        if (data.code == 0) {
          _this.dis_Pz_up = true;
        } else {
          _this.dis_Pz_up = false;
        }
      }, null);
      _this.search(1)
    })
  },
  methods: {
    //搜索所有的客户
    search(page) {
      var _this = this
      var parms = {
        name: this.selectName,
        uwstate: this.reply,
        pageSize: this.pageSize,
        pageNumber: page,
      }
      getData('post', my_url + '/crm/policyuw/getUwList.do', function (data) {
        _this.tableData = data.rows
        _this.pageTotal = data.total
      }, parms);
    },
    //新建核保客户
    newRecord() {
      var _this = this
      //新建核保客户
      if (this.uwid == '' || this.uwid == 'undefinde') {
        let url, data
        url = '/crm/policyuw/policyUwInsert.do'
        this.bdjsItem.uwcontent = editor13.txt.html()
        data = this.bdjsItem
        if (!this.bdjsItem.name) {
          this.$message({
            showClose: true,
            message: '请输入核保人姓名',
            duration: 3000,
            type: 'error'
          });
          return
        }

        return new Promise((resovle, reject) => {
          getData('post', my_url + url, res => {
            if (res.code == 0) {
              _this.drawer = false
              _this.bdjsItem.uwcontent = ''
              _this.bdjsItem.fileStr = ''
              _this.insertFileList = []
              _this.selectName = ''
              _this.search(1)
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
        // 发送聊天记录
      } else if (this.uwid != '' && this.finish == false) {
        _this.bdjsItem.uwcontent = editor13.txt.html()
        if (_this.bdjsItem.uwcontent == '<p><br></p>') {
          _this.$message({
            showClose: true,
            message: '请填写发送内容！',
            duration: 3000,
            type: 'error'
          });
          return
        }
        //添加核保记录
        var parms = {
          uwcontent: _this.bdjsItem.uwcontent,
          uwid: _this.uwid,
          fileStr: _this.bdjsItem.fileStr
        }
        getData('post', my_url + '/crm/policyuw/policyUwTraceInsert.do', function (data) {
          _this.showEditPopup()
          _this.bdjsItem.uwcontent = ''
          _this.bdjsItem.fileStr = ''
          _this.insertFileList = []
          _this.uwid == ''
          _this.drawer = true
          _this.search(1)
        }, parms);

      } else {
        // 核保完成
        var parms = {
          uwid: _this.uwid
        }
        getData('post', my_url + '/crm/policyuw/policyUwClose.do', function (data) {
          if (data.code == '0') {
            _this.isfinish = true
            _this.$message({
              showClose: true,
              message: '预核保已经完成了，再次发送信息无效哦',
              duration: 3000,
              type: 'success'
            });
          }
          _this.search(1)
        }, parms);
      }
    },
    //查看详情
    showEditPopup(item) {
      var _this = this
      if (item) {
        _this.bdjsItem.name = item.name
        _this.uwid = item.uwid

        if (item.policyuwname == '已完成') {
          _this.finish = true
          _this.isfinish = true
        } else {
          _this.finish = false
          _this.isfinish = false
        }
      }
      _this.showFinish = true
      var parms = {
        uwid: _this.uwid
      }
      getData('post', my_url + '/crm/policyuw/getUwTraceList.do', function (data) {
        _this.tracelist = data.tracelist
        _this.$nextTick(() => {
          $('.img-list').viewer('destroy');
          $('.img-list').viewer({
            url: 'data-original',
          });
        })
        _this.drawer = true
        //重置编辑框
        _this.showAddCJGDetailDialog()
      }, parms);
    },
    //删除客户
    delectName(item) {
      var _this = this
      var parms = {
        uwid: item.uwid
      }
      console.log(parms)
      getData('post', my_url + '/crm/policyuw/policyUwDelete.do', function (data) {
        if (data.code = '0') {
          _this.search(1)
        }
      }, parms);
    },

    //打开新建客户弹窗
    showAddCJGDetailDialog() {
      if (this.drawer == false) {
        this.reset()
        this.showFinish = false
      }
      this.drawer = true
      if (editor13 == null) { //true
        this.$nextTick(() => {
          this.newWangEditor('#div1', '#div2')
          editor13.txt.html(this.bdjsItem.uwcontent)
        })
      } else {
        editor13.txt.html(this.bdjsItem.uwcontent)
      }
      // } else {
      //   $('.w-e-text').remove()
      //   $('.w-e-menu').remove()
      // }
    },

    //重置为空
    reset() { //重置
      this.tracelist = []
      this.insertFileList = []
      this.bdjsItem = {
        name: '',
        uwcontent: '',
        fileStr: ''
      }
      this.uwid = ''
    },
    //上传文件
    tirggerFile(e) {
      var _this = this
      let buztype, buzid
      buztype = '0501'
      let formData = new FormData();
      formData.append('myFile', e.target.files[0]);
      formData.append('buztype', buztype);
      let that = this
      $.ajax({
        url: my_url + '/crm/fileupload/fileUpload.do',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
      }).done(function (res) {
        var res = JSON.parse(res)
        if (res.code == "0") {
          var insertFileList = _this.insertFileList
          var obj = {}
          obj.filename = res.filename
          obj.fileid = res.fileid
          obj.refilepath = res.refilepath
          obj.filetype = res.filetype
          insertFileList.push(obj)


          if (_this.bdjsItem.fileStr == '') {
            _this.bdjsItem.fileStr = res.fileid
          } else {
            _this.bdjsItem.fileStr = _this.bdjsItem.fileStr + ',' + res.fileid
          }
        } else {
          _this.$message({
            showClose: true,
            message: res.msg,
            duration: 3000,
            type: 'error'
          });
        }
        $('.file-input').val('')
      }).fail(function (res) {
        console.log(res)
      });
    },
    //核保完成
    // heChange() {
    //   var _this = this
    //   _this.isfinish = true
    //   var parms = {
    //     uwid: this.uwid
    //   }
    //   getData('post', my_url + '/crm/policyuw/policyUwClose.do', function (data) {
    //     if (data.code == '0') {
    //       _this.$message({
    //         showClose: true,
    //         message: '预核保已经完成了，再次发送信息无效哦',
    //         duration: 3000,
    //         type: 'success'
    //       });
    //     }
    //     _this.search(1)
    //   }, parms);
    // },

    //fenye
    pageClick(page) { //点击分页
      this.pageNum = page;
      this.search(page)
    },
    //图标
    fileTypeFun(type) {
      if (type) {
        var type = type.toLowerCase()
        if (type == "jpg" || type == "png") {
          return 'file-type file-type-img'
        } else if (type == "xlsx" || type == "xls") {
          return 'file-type   file-type-xlsx'
        } else {
          return `file-type  file-type-${type}`
        }
      } else {
        return 'file-type  file-type-file'
      }
    },
    newWangEditor(el1, el2) {
      var _this = this
      editor13 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      // editor13.customConfig.pasteFilterStyle = false
      // editor13.customConfig.pasteText = false;
      // editor13.customConfig.pasteTextHandle = function (content) {
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
      editor13.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor13.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor13.customConfig.uploadImgShowBase64 = true
      editor13.customConfig.menus = [
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
      editor13.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor13.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor13.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
      //自定义上传图片事件
      editor13.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
        },
        success: function (xhr, editor, result) {
          console.log("上传成功");
          _this.$nextTick(() => {
            $('#div2').viewer('destroy');
            $('#div2').viewer({
              url: 'data-original',
            });
          })
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
      editor13.customConfig.colors = [
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
      editor13.customConfig.fontNames = [
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
      editor13.create()
    }
  }
}
</script>
<style src="../../static/css/knowledgeMan.css"></style>
