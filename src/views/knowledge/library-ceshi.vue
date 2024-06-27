<template>
  <div class="scriptLibrary">

    <div class="search-header" style="padding: 0">
      <div class="search-box clearfix">
        <el-tabs class="nav" v-model="activeName" @tab-click="handleClick">
          <!-- <el-tab-pane v-if="isLeader =='Y'" label="团队雷达" name="01"></el-tab-pane> -->
          <el-tab-pane label="个人雷达" name="02"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div>
      <div class="newAdd">
        <div class="addpatter" @click="dialoghuashu = true">
          <div> + 新建</div>
        </div>
        <div class="search-box clearfix" style="display: block;">

          <div class="common-select" v-show="dis_P4_up">
            <div class="select-title" style="width: 1.28rem">选择团队</div>
            <div class="select-content" style="width: calc(100% - 1.28rem);">
              <el-dropdown trigger="click" placement="bottom" ref="disTeam2" style="width: 100%;">
                <p class="el-dropdown-inners" clearable>
                  <span>{{ teamNames2 }}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu class="" slot="dropdown">
                  <el-tree @check="handleCheckChange2" :data="teamDataList" ref="tree2" show-checkbox node-key="id" :default-expanded-keys="[1]" :props="defaultProps">
                  </el-tree>
                  <div class="sure-footer">

                    <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="my_sureOne2">取消</div>
                    <div class="my-sure" @click="my_sure2">确定</div>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="common-select" v-show="dis_P4_up">
            <div class="select-title" style="width: 1.28rem">业务员姓名</div>
            <div class="select-content" style="width: calc(100% - 1.28rem);border: none">
              <el-select class="el-select-inners" placeholder="请选择" size="mini" v-model="overviewForm.userid" @change="userNameChange" clearable>
                <el-option v-for="item in userNameOptions" :key="item.userid" :label="item.username" :value="item.userid">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title" style="width: 1.28rem">关键字搜索</div>
            <div class="select-content" style="width: calc(100% - 1.28rem);">
              <el-autocomplete class="el-input-inners" v-model="leidaMain" :trigger-on-focus="false" :fetch-suggestions="querySearch" size="mini" placeholder="请输入关键字"></el-autocomplete>
            </div>
          </div>
          <div class="common-select" style="float: right;width: 11.5%;">
            <div class="search-btn" @click="search">搜索</div>
            <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
          </div>

        </div>
      </div>

    </div>

    <div class="teamLanguage">
      <div class="teamMain table-box">
        <el-table :data="speechList" border style="width: 100%">
          <el-table-column key="2" align="center" label="雷达内容" width="auto">
            <template slot-scope="scope">

              <div v-html="scope.row.main" :class="['huashuMain', {'unhuashuMain':scope.row.isopen==true}]"></div>
              <div class='zhedie' @click="open(scope.row)" v-if="!scope.row.isopen"> <span>展开</span> <i class='el-icon-arrow-down'></i> 共{{ (scope.row.talkContent).length }}条</div>
              <div class='zhedie' @click="open(scope.row)" v-else><span>收起</span> <i class='el-icon-arrow-up'></i>共{{ (scope.row.talkContent).length }}条 </div>

            </template>
          </el-table-column>
          <el-table-column key="3" align="center" prop="title" label="标题" width="120">
          </el-table-column>
          <el-table-column key="4" align="center" prop="sendcount" sortable label="发送次数" width='110'>
          </el-table-column>
          <el-table-column key="5" align="center" prop="username" label="创建人" width='90'>
          </el-table-column>
          <el-table-column key="6" align="center" prop="makedate" sortable label="创建时间" width="160">
          </el-table-column>
          <el-table-column key="7" align="center" label="类型" width="80">
            <template slot-scope="scope">
              <div v-if="(scope.row.talkContent).length>1"> 复合类型</div>
              <div v-else-if="(scope.row.talkContent).length==1">{{ scope.row.talkContent[0].msgType}}</div>
              <div v-else>无类型</div>
            </template>
          </el-table-column>
          <el-table-column key="8" v-if="activeName=='01'" align="center" prop="teampermission_names" label="使用团队" width="120">
          </el-table-column>
          <el-table-column key="9" align="center" label="操作" width="140">
            <template slot-scope="scope">
              <a class="edit option" href="javascript:void(0);" @click="showEditPopup(scope.row)">编辑</a>
              <a class=" declet" href="javascript:void(0);" @click="deletePopup(scope.row)">删除</a>
            </template>
          </el-table-column>
          <el-table-column key="10" align="center" label="移动" width="140">
            <template slot-scope="scope">
              <a class="edit option" href="javascript:void(0);" @click="itemUp(scope.row)">上移</a>
              <a class="edit" href="javascript:void(0);" @click="itemDown(scope.row)">下移</a>
            </template>
          </el-table-column>

        </el-table>

      </div>
    </div>

    <el-dialog :title="digTitle" :visible.sync="dialoghuashu" width="1100px" :before-close="data_cencle" :close-on-click-modal="false" append-to-body>
      <div v-loading="addloading">

        <div class="titleBox">

          <div class="selectMain">
            <p>雷达标题</p>
            <el-input class="block" v-model="titleCon" placeholder="请输入内容"></el-input>
          </div>

        </div>

        <div class="mainBox">
          <div class="listMain">
            <div>雷达内容</div>
          </div>

          <el-tabs class="zhongjiantab" v-model="PDFimgTxt" @tab-click="mainClick">

            <el-tab-pane label="链接" name="img-txt">
              <div class="listMainbox">
                <div style="margin-bottom: 0.15rem">
                  <el-input placeholder="请输入链接" @input="imgTextSelect()" v-model="imgTxt.link" clearable> </el-input>
                </div>

                <div v-if="imgTxt.link">
                  <div class="selectMain">
                    <p>链接标题</p>
                    <el-input class="block" v-model="imgTxt.link_title" placeholder="请输入内容"></el-input>
                  </div>
                  <div class="selectMain">
                    <p>链接描述</p>
                    <el-input class="block" v-model="imgTxt.link_description" placeholder="请输入内容"></el-input>
                  </div>
                  <div class="selectMain">
                    <p>链接封面</p>
                    <div class="imgupload" style="margin-top: 0.08rem;">
                      <el-upload accept="image/*" action="#" ref="imgupload" list-type="picture-card" :auto-upload="false" :limit="1" :file-list="imgTxt.fileList" :on-change="
                      (file) => { return imgSaveToUrl(file); } " :class="imgTxt.fileList.length=='1' ? 'pdfjinyong' : ''">
                        <i slot="default" class="el-icon-plus"></i>

                        <div slot="file" slot-scope="{ file }">
                          <img class="el-upload-list__item-thumbnail" :src="'https://crm.meihualife.com/'+imgTxt.link_image_url" alt="" />
                          <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(imgTxt)">
                              <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="imgTxt.link_image_url!=''" class="el-upload-list__item-delete" @click="handleRemove(imgTxt)">
                              <i class="el-icon-delete"></i>
                            </span>
                          </span>
                        </div>
                      </el-upload>

                      <el-dialog :visible.sync="imgTxt.bigimgUrl" append-to-body>
                        <img width="100%" :src="'https://crm.meihualife.com/'+imgTxt.link_image_url" alt="" />
                      </el-dialog>
                    </div>
                  </div>

                  <div v-if="imgTxt.link" style="margin-top: 0.08rem;">
                    <div class="recordFile">
                      <div class="fileMain">
                        <span class="FileTitle">{{imgTxt.link_title}}</span>
                        <span class="FileSize FileSizeleft">{{ imgTxt.link_description}}</span>
                      </div>
                      <img :src="imgTxt.link_image_url" alt="" style="margin-left: 0.1rem;" />

                    </div>
                  </div>
                </div>

              </div>
            </el-tab-pane>
            <el-tab-pane label="PDF" name="pdf">
              <div class="listMainbox">
                <div style="margin-bottom: 0.15rem">
                  <div class="pdfupload">
                    <el-upload accept=".pdf" action="#" ref="pdfupload" list-type="picture-card" :auto-upload="false" :file-list="pdf.pdfList" :limit="1" :on-change="
                        (file) => { return pdfSaveToUrl(file); }
                      " :class="pdf.pdfList.length == '1' ? 'pdfjinyong' : ''">
                      <i slot="default" class="el-icon-plus"></i>

                      <div slot="file" slot-scope="{ file }">
                        <img class="el-upload-list__item-thumbnail" :src="pdf.link_image_url" alt="" />
                        <span class="el-upload-list__item-actions">
                          <span v-if="true" class="el-upload-list__item-delete" @click="handlepdfRemove(file)">
                            <i class="el-icon-delete"></i>
                          </span>
                        </span>
                      </div>
                    </el-upload>

                    <div class="pdfNameSize" v-if="pdf.link!=''">
                      <p>{{ pdf.link_title}}</p>
                    </div>
                    <div class="pdfNameSize" v-else>
                      <p>*文件需在10M以内</p>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <!-- <div @click="addmain" class="addTemplate">
          <p><i class="el-icon-circle-plus-outline"></i> 添加内容</p>
          <p>（ 添加多个内容可以一键发送 ）</p>
        </div> -->

        <span slot="footer" class="dialog-footer">
          <div class="my-sure cancel" @click="data_cencle">取 消</div>
          <div class=" my-sure" type="primary" @click="data_sure">确 定</div>
        </span>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import api from "../../utils/api";
import $ from "jquery";
import "../../static/js/viewer-jquery.min.js";
import "../../static/css/viewer.min.css";
import { getData, getPhoneData, my_url } from "../../static/js/ajax.js";

export default {
  data() {
    return {

      // 筛选
      leidaMain: '',
      dis_P4_up: true,
      userNameOptions: '',
      overviewForm: {
        teamid: '',
        userid: '',
        startDate: '',
        endDate: '',
        time: '1'
      },
      teamNames2: "团队选择",
      teamList2: '',
      my_list2: '',

      digTitle: '新建 - 个人雷达',
      loading: false,
      isLeader: 'Y',//判断是否是团队长
      // 团队话术01  个人话术02
      activeName: "02",
      // options: [], //分组列表
      speechList: [],//话术列表
      // 分组显示
      visibles: [],
      // 当前选中的分组
      selectTree: '',



      // 新建雷达 
      addloading: false,
      dialoghuashu: false,
      titleCon: "",//标题
      PDFimgTxt: "img-txt",

      imgTxt: {
        link: '',
        link_title: '',
        link_description: '',
        link_image_url: '',
        bigimgUrl: false,
        fileList: [],
      },

      pdf: {
        link: '',
        link_title: '',
        link_image_url: '',
        pdfList: [],
      },



      // 判断是否编辑模式
      isEdit: false,
      editId: '',//要编辑的数据ID
      teamIdCheck: [],

      newDefaultProps: {
        children: "child",
        label: "groupname",
        value: 'groupid',
      },
      GroupdefaultProps: {
        children: "child",
        label: "groupname",
      },

      SalesmanIdBox: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      teamNames: "团队选择",
      teamListId: "",
      teamDataList: [],
      teamid: "",
      myList: ''
    };
  },

  mounted() {
    this.init()
    this.search()
    // this.teamLedar()
    this.yewu();
  },
  watch: {

  },
  methods: {
    // 权限
    init() {
      var _this = this
      getData('post', my_url + '/crm/auth/getManagePermission.do', function (data) { //查看客户的权限
        if (data.code == 0) {
          _this.dis_P4_up = true;
        } else {
          _this.dis_P4_up = false;
        }
      }, null);
    },





    // 查询内容
    // 传content内容搜索
    // teampermission，团队搜索
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
    handleCheckChange2(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label)
      })
      this.my_list2 = teamListName.join(',');
      this.teamList2 = (checked.checkedKeys).join(',');
      this.overviewForm.teamid = this.teamList2;
    },
    my_sureOne2() {
      this.$refs.disTeam2.hide();
      this.my_list2 = '';
      this.teamList2 = '';
      this.teamNames2 = "团队选择";
      this.overviewForm.teamid = '';
      this.$refs.tree2.setCheckedKeys([]);
      this.queryflag = true;
      // this.search();
      // this.refresh();
    },
    my_sure2() {
      let _this = this;
      this.$refs.disTeam2.hide();

      console.log(this.my_list2)

      if (this.my_list2 == null || this.my_list2 == '' || this.my_list2 == '1') {
        this.queryflag = true;
        this.queryflagString = "01"
      } else {
        console.log(this.my_list2)
        this.teamNames2 = this.my_list2;
        this.queryflag = false;
        this.queryflagString = "02"
      }

      // this.search();
      // this.refresh();
      //获取业务员列表
      getData('post', my_url + '/crm/auth/getUserIdNameListByTeam.do', function (data) {
        _this.userNameOptions = data.namelist
      }, {
        teamid: this.teamList2
      });
    },


    userNameChange() {
      this.queryflag = false;
      this.queryflagString = "02"
      // this.search();
      // this.refresh();
    },





    search() {
      var _this = this
      var params = {
        title: '',
        radartype: '02', //01企业，02个人
        pageSize: 1,
        pageNumber: 20
      }
      api.getRadarList(params).then((data) => {
        console.log(data)
        if (data.code == '0') {


        } else {
          // _this.$message({
          //   type: "error",
          //   duration: 2000,
          //   message: data.msg,
          // });
        }

        _this.addloading = false
      })
    },




    reset() {
      this.my_sureOne2();
      this.overviewForm = {
        teamid: '',
        userid: '',
        startDate: '',
        endDate: '',
        time: '1'
      }
      this.leidaMain = ''
    },



    //是否是团队账长isLeader
    teamLedar() {
      var _this = this
      api.isLeader().then((data) => {
        if (data.code == '0') {
          if (data.isLeader == "Y") {
            _this.activeName = '01'
          } else {
            _this.activeName = '02'
          }

          _this.isLeader = data.isLeader
        }

      })
    },

    // 选择团队话术或者个人话术
    handleClick(tab, event) {
      // console.log(tab, event)
      // console.log(tab._props.label)
      // this.digTitle = '新建 - ' + tab._props.label
      // this.options = []
      // this.groupOptions = []
      // this.speechList = []

    },


    // 更换或上传图片数据
    imgSaveToUrl(file, index) {
      this.uploadfile(file.raw, "image");
    },



    // 上传文件
    uploadfile(file, fileType,) {
      var _this = this;
      let formData = new FormData();
      formData.append("myFile", file);
      formData.append("buztype", "0602");

      $.ajax({
        url: my_url + "/crm/fileupload/fileUpload.do",
        type: "POST",
        cache: false,
        data: formData,
        processData: false,
        contentType: false,
      }).done(function (res) {
        var data = JSON.parse(res);
        if (data.code == "0") {
          data.refilepath = data.refilepath.slice(9);
          if (fileType == "pdf") {
            _this.pdf.link = "https://crm.meihualife.com/" + data.refilepath;
            _this.pdf.pdfList.push(data)
            _this.pdf.link_image_url = "https://crm.meihualife.com/images/pdf.jpg"

            _this.pdf.link_title = data.filename
          } else {
            _this.imgTxt.fileList.push(data)
            _this.imgTxt.link_image_url = data.refilepath
          }

          _this.$message({
            type: "success",
            duration: 2000,
            message: "上传成功!",
          });
        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg + '，删除后重新上传',
          });
        }
      }).fail(function (res) {
        _this.$message({
          type: "error",
          duration: 2000,
          message: "上传失败!",
        });
      });



    },


    // 上传PDF
    pdfSaveToUrl(file, index) {
      this.uploadfile(file.raw, "pdf");
    },
    // 删除PDF
    handlepdfRemove(file) {
      let filelist = this.$refs.pdfupload.uploadFiles;
      let indexaa = filelist.findIndex((fileItem) => {
        return fileItem.uid === file.uid;
      });
      filelist.splice(indexaa, 1);

      this.pdf.link_image_url = '';
      this.pdf.pdfList = ''
    },
    // https://meihualife.feishu.cn/sheets/shtcnKYr41GHDXXKehLqSTinoBk?sheet=rcrE1F
    // 上传图文
    imgTextSelect() {
      var _this = this
      if ((this.imgTxt.link).length >= 7 && (this.imgTxt.link).substring(0, 7) == "http://" || (this.imgTxt.link).substring(0, 8) == "https://") {
        var params = {
          webUrl: this.imgTxt.link
        }

        console.log(this.imgTxt)
        api.parseUrl(params).then((data) => {
          if (data.code == '0') {

            _this.imgTxt.link_title = data.title && data.title != '' ? data.title : '链接'
            // this.imgTxt.text = this.imgTxt.link
            _this.imgTxt.link_description = data.description && data.description != '' ? data.description : '详细介绍'
            _this.imgTxt.link_image_url = data.imageurl && data.imageurl != '' ? data.imageurl : "https://assets.weibanzhushou.com/default-cover.png"
          }
        })
      } else {
        console.log("地址输入错误");
      }
    },



    // 放大图片
    handlePictureCardPreview(file, index) {
      this.imgTxt.bigimgUrl = true;
    },

    // 删除上传img
    handleRemove(file, index) {
      let filelist = this.$refs.imgupload.uploadFiles;
      let indexaa = filelist.findIndex((fileItem) => {
        return fileItem.uid === file.uid;
      });
      filelist.splice(indexaa, 1);
      this.imgTxt.link_image_url = '';
      this.imgTxt.fileList = ''
    },


    mainClick(tab, event) {

    },


    // 取消新建话术
    data_cencle() {
      this.dialoghuashu = false
      this.titleCon = ''
      this.isEdit = false
      this.editId = ''


      this.imgTxt = {
        link: 'https://meihualife.feishu.cn/sheets/shtcnKYr41GHDXXKehLqSTinoBk?sheet=rcrE1F',
        link_title: '',
        link_description: '',
        link_image_url: '',
        bigimgUrl: false,
        fileList: [],
      }
      this.pdf = {
        link: '',
        link_title: '',
        link_image_url: '',
        pdfList: [],
      }


      this.digTitle = "新建 - 个人雷达"


    },

    // 确认新建话术
    data_sure() {
      var _this = this
      _this.addloading = true




      // // 
      if (this.imgTxt.link == '' && this.pdf.link == '') {
        this.$message({
          type: "error",
          duration: 2000,
          message: '请填写雷达内容后再提交',
        });
        _this.addloading = false
        return
      }
      var params = {}
      if (this.imgTxt.link != '') {
        params = {
          title: this.titleCon,
          link: this.imgTxt.link,
          link_title: this.imgTxt.link_title,
          link_description: this.imgTxt.link_description,
          link_image_url: this.imgTxt.link_image_url,
          radartype: '02', //01企业，02个人
        }
      } else {
        params = {
          title: this.titleCon,
          link: this.pdf.link,
          link_title: this.pdf.link_title,
          link_description: '',
          link_image_url: this.pdf.link_image_url,
          radartype: '02', //01企业，02个人
        }
      }







      if (this.isEdit == true) {
        this.edit_sure(params)
        return
      } else {
        api.addRadar(params).then((data) => {
          console.log(data)
          if (data.code == '0') {
            _this.$message({
              type: "success",
              duration: 2000,
              message: "新建雷达成功",
            });
            // _this.dialoghuashu = false
            // _this.getTalkTempleteGroup()
            // _this.data_cencle()
          } else {
            _this.$message({
              type: "error",
              duration: 2000,
              message: data.msg,
            });
          }

          _this.addloading = false
        }).catch((msg) => {
          _this.$message({
            type: "error",
            duration: 3000,
            message: '请检查内容，部分内容不符合',
          });
          _this.addloading = false

        })

      }

    },

    // 修改话术
    edit_sure(params) {

      var _this = this
      _this.addloading = true

      params['itemid'] = this.editId
      api.modifyTalkTempleteContent(params).then((data) => {
        if (data.code == '0') {
          _this.dialoghuashu = false
          _this.$message({
            type: "success",
            duration: 2000,
            message: "修改成功!",
          });
          _this.handleNodeClick(_this.selectTree)
          _this.data_cencle()

        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg,
          });
        }
        if (_this.activeName == '01') {
          _this.digTitle = "新建 - 团队话术"
        } else {
          _this.digTitle = "新建 - 个人话术"
        }



        _this.addloading = false
      })



    },


    handleClose(done) {
      done();
    },



    handleNodeClick(data) {
      var _this = this
      console.log(data)

      this.selectTree = data
      var groupidStr = ''
      if (data.child && data.child.length > 0) {
        for (var i = 0; i < data.child.length; i++) {
          groupidStr += data.child[i].groupid + ','
        }
      }
      var parms = {
        groupid: data.groupid,
        groupidStr: groupidStr + data.groupid,
        // teampermission:this.teamList2,
        // content:this.leidaMain
      }
      api.getTalkItemList(parms).then((data) => {
        if (data.rows.length > 0) {
          var arr = data.rows
          for (var i = 0; i < arr.length; i++) {
            arr[i]['isopen'] = false
            var arrchild = arr[i].talkContent

            var dd = ''
            if (arrchild.length > 0) {
              for (var j = 0; j < arrchild.length; j++) {
                arrchild[j]['isopen'] = false

                if (arrchild[j].type == 'text') {
                  arrchild[j]['msgType'] = '文字'
                  // if (arrchild[j].isopen) {
                  //   var classNames = ['huashuMain', 'unhuashuMain'];
                  // } else {
                  //   var classNames = ['huashuMain'];
                  // }
                  arrchild[j].text = ((arrchild[j].text).replace(/\n/g, '<br>'))
                  dd += "<div class='msgText'> <p>" + (arrchild[j].text).replace(/\n/g, '<br>') + " </p>  </div> "
                  // dd += `<div class='msgText'><p  class='${classNames.join(' ')}'> ${(arrchild[j].text).replace(/\n/g, '<br>')} </p>    <div class='zhedie' onClick = 'openSmall(${JSON.stringify(arrchild[j])})' > <span>展开</span> <i class='el-icon-arrow-down'></i> </div>   </div> `
                } else if (arrchild[j].type == 'img-txt') {
                  arrchild[j]['msgType'] = '图文'
                  var objdata = JSON.parse(arrchild[j].text)
                  dd += "<div class ='img_text'> <img src='" + objdata.imgUrl + "' alt=''>  <div class ='imgTxt'>  <p>" + objdata.title + "</p><p>" + objdata.desc + "</p> </div></div>  </div>"
                } else if (arrchild[j].type == 'image') {
                  arrchild[j]['msgType'] = '图片'
                  dd += "<div class ='img_text'> <img src='https://crm.meihualife.com" + arrchild[j].dispath + "' alt=''><p>" + arrchild[j].text + "'</p> </div>"
                } else if (arrchild[j].type == 'pdf') {
                  arrchild[j]['msgType'] = 'PDF文件'
                  dd += "<div class ='img_text'> <img src='https://crm.meihualife.com/images/pdf.jpg' alt=''><p>" + arrchild[j].text + "</p> </div>"
                } if (arrchild[j].type == 'video') {
                  arrchild[j]['msgType'] = '视频'
                  var videoImg = 'https://crm.meihualife.com' + arrchild[j].dispath
                  dd += "<div class ='img_text'> <video src=" + videoImg + "></video><p>" + arrchild[j].text + "</p> </div>"
                }

                // dd += " <div class='zhedie'> <i class='el-icon-arrow-down'></i> <span>展开</span> </div>"

              }
              arr[i]['main'] = dd
            }


          }
          _this.speechList = arr
        } else if (data.rows.length == 0) {
          _this.speechList = []

        }
      })



    },




    showEditPopup(item) {
      var _this = this
      this.dialoghuashu = true
      this.isEdit = true
      this.editId = item.itemid
      if (this.activeName == '01') {
        this.digTitle = '编辑 - 团队话术'
      } else {
        this.digTitle = '编辑 - 个人话术'
      }




    },
    deletePopup(item) {
      var _this = this
      var params = {
        itemid: item.itemid
      }

      this.$confirm('确认删除此话术吗？').then(_ => {
        api.deleteTalkTempleteContent(params).then((data) => {
          if (data.code == '0') {
            _this.$message({
              type: "success",
              duration: 2000,
              message: "删除成功!",
            });
            _this.handleNodeClick(_this.selectTree)
          } else {
            _this.$message({
              type: "error",
              duration: 2000,
              message: data.msg,
            });
          }
        })
      })

    },


    // 勾选团队时，统计团队ID
    checkTeam(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label);
      });
      this.myList = teamListName.join(",");
      this.teamListId = checked.checkedKeys.join(",");
      this.teamid = this.teamListId;
    },
    // 取消所选团队
    team_cancel() {
      if (this.$refs.disTeam) {
        this.$refs.disTeam.hide();
      }

      this.myList = "";
      this.teamListId = "";
      this.teamNames = "团队选择";
      this.teamid = "";

      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys([]);
      }
      this.queryflag = true;
      this.quanxian = ''
    },

    // 确认所选团队
    team_sure() {
      let _this = this;
      if (this.$refs.disTeam) {
        this.$refs.disTeam.hide();
      }


      if (this.myList == null || this.myList == "" || this.myList == "1") {
        this.queryflag = true;
        this.queryflagString = "01";
      } else {
        this.teamNames = this.myList;
        this.queryflag = false;
        this.queryflagString = "02";
      }
      this.quanxian = this.teamListId;

    },
    // 获取该团队权限下的员工
    yewu() {
      let _this = this;
      var idStr = "";
      api.getTalkTeamList().then((data) => {
        if (data.code == 0) {
          _this.teamDataList = data.teamList;
          for (var i = 0; i < _this.teamDataList.length; i++) {
            idStr += _this.teamDataList[i].id + ",";
            if (_this.teamDataList[i].children) {
              for (var j = 0; j < this.teamDataList[i].children.length; j++) {
                idStr += _this.teamDataList[i].children[j].id + ",";
                if (this.teamDataList[i].children[j].children) {
                  for (var s = 0; s < this.teamDataList[i].children[j].children.length; s++) {
                    idStr += _this.teamDataList[i].children[j].children[s].id + ",";
                  }
                }
              }
            }
          }
          if (idStr != "") {
            idStr = idStr.slice(0, -1);
          }
          // 权限内的所有人员
          _this.teamAllid = idStr;
        }
      });
    },


    open(data) {
      var speechList = this.speechList
      console.log(data)
      speechList.forEach(item => {
        console.log(item)
        if (item.itemid == data.itemid) {
          item.isopen = !item.isopen
        }
      })

    },


    groupUp(data) {
      console.log(data)
      var _this = this
      var params = {
        groupid: data.groupid
      }
      api.groupUp(params).then((data) => {
        console.log(data)
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "上移成功!",
          });

        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg,
          });
        }
      })
    },
    groupDown(data) {
      console.log(data)
      var _this = this
      var params = {
        groupid: data.groupid
      }
      api.groupDown(params).then((data) => {
        console.log(data)
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "下移成功!",
          });

        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg,
          });
        }
      })
    },
    itemUp(data) {
      console.log(data)
      var _this = this
      var params = {
        itemid: data.itemid
      }
      api.itemUp(params).then((data) => {
        console.log(data)
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "上移成功!",
          });
          _this.handleNodeClick(_this.selectTree)
        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg,
          });
        }
      })
    },
    itemDown(data) {
      console.log(data)
      var _this = this
      var params = {
        itemid: data.itemid
      }
      api.itemDown(params).then((data) => {
        console.log(data)
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "下移成功!",
          });
          _this.handleNodeClick(_this.selectTree)
        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg,
          });
        }
      })
    },


  },
};
</script>
<style src="../../static/css/insuranceProducts.css"></style>
<style src="../../static/css/myFonts/iconfont.css"></style>
<style scoped>
.scriptLibrary {
}

.eltabs {
  padding: 0rem 0.3rem 0rem;
  font-size: 0.36rem;
  height: 0.58rem;
}

.teamLanguage,
.personLanguage {
  display: flex;
  /* border: 0.4rem solid #fff; */
  padding: 0.3rem;

  border-top: 0;
}
.teamLanguage {
}

.mainBox {
  background: #fff;
  padding-top: 0.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.titleBox {
  background: #fff;
  font-size: 0.14rem;
}

::v-deep .el-dialog__body {
  padding: 30px 20px;
  background: #fff;
}
::v-deep .el-tabs__nav .is-active {
  color: #dc240f;
}
::v-deep .el-tabs__active-bar {
  background: #dc240f;
}
.newAdd {
  padding: 0.3rem;
  border-bottom: 1px solid #fff;
  border-right: 0.4rem solid #fff;
  padding-bottom: 0;
}

.addpatter {
  /* padding-right: 0.3rem; */
  line-height: 0.3rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  font-size: 0.14rem;
  padding: 0 16px;
  border: 1px solid rgb(220, 36, 15);
  cursor: pointer;
  text-align: center;
  color: #dc220d;
  display: inline-block;
}

.newAdd .is-plain:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background: #ecf5ff;
  border: 1px solid #dcdfe6;
}

.newAdd .is-plain {
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.productList {
  width: 18%;
  height: calc(100vh - 3rem);
  /* border: 1px solid #909399; */
  position: relative;
  overflow: auto;
  overflow-x: hidden;
}
::v-deep .el-table__row td:nth-child(1) {
  background: #fff;
}
.teamMain,
.personMain {
  width: 82%;
  height: calc(100vh - 3rem);
  /* border: 1px solid #909399; */
  position: relative;
  padding: 0;
  border-left: 1px solid #f5f5f5;
  overflow: auto;
  padding-right: 0.3rem;
}
::v-deep .el-tabs__item {
  font-size: 0.14rem;
}
::v-deep .zhongjiantab .el-tabs__item {
  font-size: 0.14rem;
  line-height: 40px;
}
::v-deep .el-input__inner {
  /* -webkit-appearance: none; */
  background-color: #fff;
  /* border-radius: 4px; */
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: 0.14rem;
  height: 35px;
  line-height: 35px;
  outline: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  margin-left: 0.01rem;
}

::v-deep .el-textarea__inner {
  border: 0px solid #dcdfe6;
}

::v-deep .el-input__icon {
  line-height: 35px;
}

::v-deep .el-select {
  display: block;
}

::v-deep .el-dialog__body {
}

::v-deep .el-textarea__inner {
  background: #fff;
}

.listMain {
  margin-right: 0.08rem;
  /*  
   display: flex;  
  justify-content: space-between;
  align-items: center; */
}
.listMain div {
  line-height: 40px;
  width: 0.75rem;
  font-size: 0.14rem;
  text-align: right;
}
.zhongjiantab {
  width: 92%;
  /* margin-top: -0.04rem; */
}
.listMainbox {
  margin-top: 0.15rem;
  background: #fff;
  padding: 0.1rem;
}
.listDelete {
  line-height: 40px;
}
::v-deep .jinyong .el-upload--picture-card {
  display: none;
}

::v-deep .pdfjinyong .el-upload--picture-card {
  display: none;
}

::v-deep .videojinyong .el-upload--picture-card {
  display: none;
}

::v-deep .el-tree-node__content .el-tree-node__label {
  /* font-size: 0.18rem; */
}

::v-deep .productList .el-tree-node__content {
  height: 0.45rem;
}

::v-deep .select-content .el-dropdown-inners > span {
  width: auto;
}

::v-deep .el-cascader {
  width: 100%;
}
::v-deep .select-content .el-icon-arrow-down {
  font-size: 0.16rem;
}

/* .el-tree-node .el-tree-node__content  .el-tree-node__label */
.asd .el-tree .el-tree-node .el-tree-node__content .el-tree-node__label {
  font-size: 0.14rem;
}

.select-content .el-dropdown-inners {
  border: 1px solid #dcdfe6;
  width: 100%;
  height: 35px;
}
.search-box .select-content .el-dropdown-inners {
  height: unset;
  border: 0;
}
.imgupload,
.pdfupload,
.videoupload {
  display: flex;
  align-items: center;
  font-size: 0.16rem;
}

.videoUrl {
  width: 100%;
  height: 100%;
}

.imgNameSize p,
.pdfNameSize p {
  margin-left: 0.2rem;
}

.addTemplate {
  font-size: 0.16rem;
  margin-top: 0.2rem;
  background: #fff;
  padding: 0.3rem;
  cursor: pointer;
}

.addTemplate p {
  text-align: center;
}

.recordFile {
  display: block;
  cursor: pointer;
  border: 1px solid #e8e8e8;
  padding: 10px;
  width: 260px;
  height: 90px;
  font-size: 12px;
  word-break: break-all;
  color: #909090;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  text-decoration: none;
}

.recordFile a :hover {
  text-decoration: underline;
}

.recordFile .fileMain {
  width: 188px;
  display: flex;
  flex-direction: column;
}

.recordFile a img {
  width: 46px;
  height: 46px;
  margin-top: 20px;
  margin-left: 6px;
  -o-object-fit: cover;
  object-fit: cover;
}
.recordFile img {
  width: 0.6rem;
  height: 0.6rem;
}
.asd .el-tree .el-tree-node .el-tree-node__content .el-tree-node__label {
  font-size: 0.14rem;
}

.custom-tree-node {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  font-size: 0.15rem;
}
.el-icon-more {
  /* display: none; */
  transform: rotate(90deg);
  color: #b9bfc3;
  font-size: 0.15rem;
  margin-right: 0.15rem;
}
.crty {
  font-size: 0.15rem;
}

/* .groupLeft button {
  border: 0px ;
  color: #b9bfc3;
}
.groupLeft button:hover {
  color: #b9bfc3 !important;
  border-color: transparent !important;
  background-color: transparent!important;
} */
.groupTan li {
  cursor: pointer;
  margin: 0.1rem;
  text-align: center;
}
.groupPopover {
  min-width: 100px;
}

.productList .el-tree-node.is-current > .el-tree-node__content {
  background-color: #f0f7ff !important;
  color: #dc220d;
}
.productList .el-tree-node__content:hover {
  background: #f0f7ff !important;
  color: #dc220d;
}
.img_text {
  display: flex;
  align-items: center;
}
.img_text img,
.img_text video {
  width: 0.6rem;
  height: 0.6rem;
}
.huashuMain {
  padding: 0.1rem;
  height: 0.85rem;
  overflow: hidden;
  text-align: left;
}

.unhuashuMain {
  height: unset;
}
.huashuMain p {
  text-align: left;
  margin-bottom: 0.1rem;
  /* width: 200px; */
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  /** -webkit-line-clamp: 2;显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}

.zhedie {
  text-align: left;
  margin-left: 0.1rem;
  cursor: pointer;
}

.huashuMain .img_text {
  margin-bottom: 0.1rem;
}
.el-table tr td {
  /* font-size: 0.16rem !important; */
}

.imgTxt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}
.imgTxt p:first-child {
  font-size: 0.15rem;
}

.imgTxt p {
  text-align: left;
  margin: 0;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.listMainbox .el-textarea .el-textarea__inner {
  min-height: 120px !important;
  /* height: auto!important; */
}
::v-deep .listMainbox .el-textarea .el-textarea__inner {
  min-height: 120px !important;
}
.addgroup {
  margin-left: 0.2rem;
  cursor: pointer;
  display: flex;
}

.addgroup p {
  height: 0.45rem;
  line-height: 0.45rem;
  color: #606266;
  font-size: 0.14rem;
}
.el-button:hover {
  border-color: transparent;
  background-color: transparent;
}

.el-icon-circle-plus {
  line-height: 0.45rem;
  margin: 0 0.1rem;
  font-size: 0.2rem;
  color: #606266;
}
.cancel {
  background: rgb(255, 255, 255);
  color: rgb(220, 36, 15);
  border: 0.01rem solid rgb(220, 36, 15);
}

.selectMain {
  display: flex;
  align-items: center;
}

.selectMain .block {
  width: 60%;
}

.selectMain p {
  width: 0.75rem;
  /* margin-top: 0.06rem; */
  margin-right: 0.08rem;
  font-size: 0.14rem;
  text-align: right;
}

table .edit {
  display: inline-block;
  margin: 0 0.15rem;
  color: #4985e5;
}
table .declet {
  display: inline-block;
  margin: 0 0.15rem;
  color: #dc220d;
}

.nav {
  height: 0.58rem;
  width: 40%;
  padding-left: 0.3rem;
  background-color: #fff;
  float: left;
}

.nav .el-tabs__active-bar {
  background-color: #dc240f;
}

.nav .el-tabs__item {
  font-size: 0.14rem;
  height: 0.58rem;
  line-height: 0.58rem;
  color: #979797;
}

.nav .el-tabs__item.is-active {
  color: #dc240f;
}
</style>


<style>
.img_text {
  display: flex;
  align-items: center;
}
.img_text img,
.img_text video {
  width: 0.6rem;
  height: 0.6rem;
}

.msgText p {
  margin-bottom: 0.15rem;
  text-align: left;
  /* border-bottom: 1px solid #f5f5f5; */
}

.tree-lable {
  width: 1.9rem;
  display: block;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.block {
  margin-top: 0.08rem;
}

.changeSize .el-cascader-node__label {
  font-size: 0.14rem;
}

.FileSizeleft {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>