<template>
  <div class="scriptLibrary">

    <div class="search-header" style="padding: 0">
      <div class="search-box clearfix">
        <el-tabs class="nav" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-if="isLeader =='Y'" label="团队雷达" name="01"></el-tab-pane>
          <el-tab-pane label="个人雷达" name="02"></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div>
      <div class="newAdd">
        <div class="addpatter" @click="showAddCJGDetailDialog($event)">
          <div> + 新建</div>
        </div>

        <div class="search-box clearfix" style="display: block;">
          <div class="common-select" v-show="dis_P4_up">
            <div class="select-title filtitle">选择团队</div>
            <div class="select-content filContent">
              <el-dropdown trigger="click" placement="bottom" ref="disTeam2" style="width: 100%;">
                <p class="el-dropdown-inners" clearable>
                  <span>{{ teamNames2 }}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu class="" slot="dropdown">
                  <el-tree @check="handleCheckChange2" :data="teamDataList" ref="tree2" show-checkbox node-key="id" :default-expanded-keys="[1]" :props="defaultProps">
                  </el-tree>
                  <div class="sure-footer">

                    <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="my_sureOne2()">取消</div>
                    <div class="my-sure" @click="my_sure2()">确定</div>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="common-select" v-show="dis_P4_up" v-if="activeName=='02'">
            <div class="select-title filtitle">业务员姓名</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" placeholder="请选择" size="mini" v-model="overviewForm.userid" @change="userNameChange" clearable>
                <el-option v-for="item in userNameOptions" :key="item.userid" :label="item.username" :value="item.userid">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title filtitle">关键字搜索</div>
            <div class="select-content filContent">
              <el-input class="el-input-inners" v-model="leidaMain" size="mini" placeholder="请输入关键字" clearable></el-input>
            </div>
          </div>

          <div class="common-select" v-show="dis_P4_up"></div>
          <div class="common-select" v-show="dis_P4_up&& activeName=='01'"></div>

          <div class="common-select" style="width: 4%;">
            <div class="search-btn searchLeft" @click="search">搜索</div>
            <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);display: none;" @click="reset">重置</div>
          </div>
        </div>
      </div>
    </div>

    <div class="teamLanguage">
      <div class="productList" v-loading="loading">

        <div class="addgroup" @click="dialogGroup = true" v-if="activeName=='01'">
          <i class="el-icon-circle-plus"></i>
          <p>添加分组</p>
        </div>

        <el-tree style=" padding-top: 0rem;" :data="options" :props="GroupdefaultProps" node-key="id" :default-checked-keys="[1]" :expand-on-click-node="false" ref="tree" @node-click="handleNodeClick" :highlight-current="true" :default-expand-all='false'>
          <span class="custom-tree-node" slot-scope="{  data }">
            <span class="tree-lable">{{ data.groupname }} <span v-if="data.children">（{{ data.children.length}}）</span> </span>
            <span class="groupLeft">
              <div type="text" size="mini" class="crty">
                <el-popover placement="right" trigger="hover" popper-class="groupPopover" v-if="activeName=='01'">
                  <ul class="groupTan" v-if="activeName=='01'">
                    <li @click.prevent="modifyGroup(data)">编辑</li>
                    <li @click.prevent="deleteGroup(data)">删除</li>
                    <li @click.prevent="groupUp(data)">上移</li>
                    <li @click.prevent="groupDown(data)">下移</li>
                  </ul>
                  <i slot="reference" class="el-icon-more"></i>
                </el-popover>
                <i slot="reference" class="el-icon-more" v-if="activeName=='02'"></i>
              </div>
            </span>
          </span>
        </el-tree>

      </div>

      <div class="teamMain table-box" :class="activeName=='01'?'teamMain table-box':'teamMain table-box activeName' ">
        <el-table :data="speechList" border style="width: 100%" v-loading="searchloading">
          <el-table-column key="2" align="center" label="雷达内容" width="440">
            <template slot-scope="scope">
              <!-- {{ scope.row }} -->
              <div class='img_text'>
                <img v-if="scope.row.link_image_url.slice(0, 13) == 'crmfileupload'" :src='"https://crm.meihualife.com/"+scope.row.link_image_url' alt=''>
                <img v-else :src='scope.row.link_image_url' alt=''>
                <div class='imgTxt'>
                  <p>{{scope.row.link_title}} </p>
                  <!-- <p>{{ scope.row.link_description }}</p> -->
                </div>
              </div>

            </template>
          </el-table-column>
          <el-table-column key="3" align="center" prop="title" label="雷达标题" width="220" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="4" align="center" prop="clickcount" sortable label="点击次数" width='110'>
          </el-table-column>
          <el-table-column key="5" align="center" prop="username" label="创建人" width='90'>
          </el-table-column>
          <el-table-column key="6" align="center" prop="makedatestr" sortable label="创建时间" width="160">
          </el-table-column>
          <el-table-column key="7" align="center" label="类型" width="80">
            <template slot-scope="scope">
              <div v-if="(scope.row.link).slice(-3)=='pdf'">PDF</div>
              <div v-else>链接</div>
            </template>
          </el-table-column>
          <el-table-column key="9" align="center" label="操作" width="220">
            <template slot-scope="scope">
              <a class="edit option" href="javascript:void(0);" @click="showEditPopup(scope.row)">编辑</a>
              <a class=" declet" href="javascript:void(0);" @click="deleteItem(scope.row)">删除</a>
              <el-button-group class="base-info-botton-group updown">
                <el-button size="mini" @click="itemUp(scope.row)" type="primary" icon="iconfont icon-my-up">
                </el-button>
                <el-button size="mini" @click="itemDown(scope.row)" type="primary" icon="iconfont icon-my-down"></el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog :title="digTitle" :visible.sync="dialogleida" width="1100px" :before-close="data_cencle" :close-on-click-modal="false" append-to-body>
      <div v-loading="addloading">

        <div class="titleBox">

          <div class="selectMain" v-if="activeName=='01'">
            <p>分组</p>
            <el-cascader class="block" v-model="groupValue" :options="options" :props="newDefaultProps" @change="handleChange" placeholder="请选择分组" popper-class="changeSize" clearable></el-cascader>
          </div>

          <div class="selectMain">
            <p>雷达标题</p>
            <el-input class="block" v-model="titleCon" placeholder="此标题将在企微中显示"></el-input>
          </div>

        </div>

        <div class="mainBox">
          <div class="listMain">
            <div>雷达内容</div>
          </div>

          <el-tabs class="zhongjiantab" v-model="PDFimgTxt" @tab-click="mainClick">
            <el-tab-pane label="链接" name="img-txt">
              <div class="listMainbox">
                <div class="selectMain mainleft">
                  <p>链接地址</p>
                  <el-input placeholder="请输入链接" @input="imgTextSelect()" v-model="imgTxt.link" clearable style="width:7.1rem"> </el-input>
                  <div class="search-btn" @click="getmain" style="width: 160px;">获取文章链接内容</div>
                </div>

                <div v-if="imgTxt.link">
                  <div class="selectMain mainleft">
                    <p>链接标题</p>
                    <el-input v-model="imgTxt.link_title" placeholder="请输入内容" style="width:7.1rem"></el-input>
                  </div>
                  <div class="selectMain mainleft">
                    <p>链接详情</p>
                    <el-input placeholder="请输入链接详情" class="block block_desc" v-model="imgTxt.link_description" style="width:7.1rem">
                    </el-input>
                  </div>

                  <div class="selectMain DescTitle">
                    <p>封面图</p>
                    <div class="imgupload">
                      <el-upload accept="image/*" action="#" ref="imgupload" list-type="picture-card" :auto-upload="false" :limit="1" :file-list="imgTxt.fileList" :on-change="
                      (file) => { return imgSaveToUrl(file); } " :class="imgTxt.fileList.length=='1' ? 'pdfjinyong' : ''">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file">
                          <img class="el-upload-list__item-thumbnail" v-if="imgTxt.link_image_url.slice(0, 13) == 'crmfileupload'" :src="'https://crm.meihualife.com/'+imgTxt.link_image_url" alt="" />
                          <img class="el-upload-list__item-thumbnail" v-else :src="imgTxt.link_image_url" alt="" />
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
                        <img width="100%" v-if="imgTxt.link_image_url.slice(0, 13) == 'crmfileupload'" :src="'https://crm.meihualife.com/'+imgTxt.link_image_url" alt="" />
                        <img width="100%" v-else :src="imgTxt.link_image_url" alt="" />
                      </el-dialog>
                    </div>
                  </div>
                  <!-- <div v-if="imgTxt.link" style="margin-top: 0.08rem;">
                    <div class="recordFile">
                      <div class="fileMain">
                        <span class="FileTitle">{{imgTxt.link_title}}</span>
                        <span class="FileSize FileSizeleft">{{ imgTxt.link_description}}</span>
                      </div>
                      <img :src="imgTxt.link_image_url" alt="" style="margin-left: 0.1rem;" />
                    </div>
                  </div> -->
                </div>

                <div class="item-section">
                  <!-- <label>文章内容</label> -->
                  <div class="right-content">
                    <div class="editor-box">
                      <div id="div5" class="toolbar"></div>
                      <div id="div6" class="text" style="max-height: 3rem;">
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </el-tab-pane>
            <el-tab-pane label="PDF" name="pdf">
              <div class="listMainbox">
                <div>
                  <!-- <div class="selectMain mainleft">
                    <p>PDF链接</p>
                    <el-input v-model="pdf.link" placeholder="请输入内容"></el-input>
                  </div> -->
                  <div class="selectMain mainleft">
                    <p>PDF标题</p>
                    <el-input v-model="pdf.link_title" placeholder="请输入内容"></el-input>
                  </div>
                  <div class="pdfupload" style='margin-top: 0.08rem;'>
                    <el-upload accept=".pdf" action="#" ref="pdfupload" list-type="picture-card" :auto-upload="false" :file-list="pdf.fileList" :limit="1" :on-change="
                        (file) => { return pdfSaveToUrl(file); }
                      " :class="pdf.fileList.length == '1' ? 'pdfjinyong pdfup' : 'pdfup'">
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
                    <div class="pdfNameSize" v-if="pdf.link">
                      <p>{{ pdf.link_title }}</p>
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

        <span slot="footer" class="dialog-footer">
          <div class="my-sure cancel" @click="data_cencle()">取 消</div>
          <div class=" my-sure" type="primary" @click="data_sure()">确 定</div>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="新建分组" :visible.sync="dialogGroup" width="30%" :before-close="handleGroupClose" :close-on-click-modal="false" append-to-body>
      <div class="titleBox">
        <div class="selectMain  mainleft" style="display: flex;">
          <p>分组名称</p>
          <div style="width: 85%;">
            <el-input placeholder="请输入内容" v-model="groupName" clearable>
            </el-input>
          </div>
        </div>

        <div class="selectMain mainleft" v-if="activeName=='01'">
          <p>雷达权限</p>
          <div class="select-content " style="width: 85%">
            <el-dropdown trigger="click" style="width: 100%" placement="bottom" ref="disTeam">
              <p class="el-dropdown-inners" clearable>
                <span>{{ teamNames }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </p>
              <el-dropdown-menu class="asd" slot="dropdown">
                <el-tree @check="checkTeam" :data="teamDataList1" ref="tree" show-checkbox node-key="id" :default-checked-keys="teamIdCheck" :props="defaultProps"> </el-tree>
                <div class="sure-footer">
                  <div class="my-sure cancel" @click="team_cancel()">取消</div>
                  <div class="my-sure" @click="team_sure()">确定</div>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <div class="my-sure cancel" @click="group_cencle()">取 消</div>
          <div class="my-sure" type="primary" @click="group_sure()">确 定</div>
        </span>
      </div>

    </el-dialog>

    <el-dialog title="提示" :visible.sync="deldialogVisible" width="25%" :before-close="handleClose">
      <span>确认删除此雷达吗？</span>
      <span slot="footer" class="dialog-footer">
        <div @click="deldialogVisible = false" class="cancel my-sure">取 消</div>
        <div type="primary" @click="delItemleida()" class="my-sure">确 定</div>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="deldiaGroup" width="25%" :before-close="handleClose">
      <span>确认删除此分组吗？</span>
      <span slot="footer" class="dialog-footer">
        <div @click="deldiaGroup = false" class="cancel my-sure">取 消</div>
        <div type="primary" @click="delGroupradar()" class="my-sure">确 定</div>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import api from "../../utils/api";
import $ from "jquery";
import "../../static/js/viewer-jquery.min.js";
import "../../static/css/viewer.min.css";
import "../../components/wangEditor/release/wangEditor.css";
import "../../components/wangEditor/release/fonts/w-e-icon.woff"
import wangEditor from '@/components/wangEditor/release/wangEditor.min.js';
import { getData, getPhoneData, my_url } from "../../static/js/ajax.js";
let editor16;
export default {
  data() {
    return {
      editor16: null,


      searchloading: false,
      // 判断是否选组了
      parGroupid: '',
      // 团队雷达
      deldiaGroup: false,
      delGroup: '',
      groupName: '',
      modifyGroupData: '',

      dialogGroup: false,

      delitem: '',
      deldialogVisible: false,
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
      // 团队雷达01  个人雷达02
      activeName: "01",
      options: [], //分组列表
      speechList: [],//雷达列表
      // 分组显示
      visibles: [],
      // 当前选中的分组
      selectTree: '',
      InitteamNames: '',



      // 新建雷达 
      addloading: false,
      dialogleida: false,
      titleCon: "",//标题
      groupValue: '',
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
        link_description: '',
        link_image_url: '',
        fileList: [],
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
        children: "children",
        label: "groupName",
      },

      SalesmanIdBox: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      teamNames: "团队选择",
      teamListId: "",
      teamDataList: [],
      teamDataList1: [],
      teamid: "",
      myList: ''
    };
  },

  mounted() {
    editor16 = null;
    this.init()
    this.getAllTalkTempleteGroup()
    this.yewu();
  },
  watch: {

  },
  methods: {

    // 获取公众号内容
    getmain() {
      var _this = this
      // this.$nextTick(() => {
      var params = {
        url: this.imgTxt.link,
        key: 'JZL5de6663e10c65e61',
        verifycode: '',
      }

      getPhoneData('get', 'https://www.dajiala.com/fbmain/monitor/v3/article_html', function (data) {
        if (data.code == '0') {
          var data = data.data
          // _this.newWangEditor2('#div5', '#div6')
          editor16.txt.html(data.html)
        } else {
          alert('付费接口错误')
        }
      }, params);
    },


    // 打开新建
    showAddCJGDetailDialog(e) {
      this.dialogleida = true
      this.$nextTick(() => {
        if (!editor16) {
          this.newWangEditor2('#div5', '#div6')
        }
        editor16.txt.clear()


        // editor16.txt.html("")
      })
    },


    // 权限
    init() {
      if (this.activeName == '02') {
        this.options = [
          {
            groupid: "90000000000000000001",
            groupname: "PDF"
          },
          {
            groupid: "90000000000000000002",
            groupname: "链接"
          }
        ]
        this.search({
          groupid: "",
          groupname: ""
        });
      }

      var _this = this
      getData('post', my_url + '/crm/auth/getManagePermission.do', function (data) { //查看客户的权限
        if (data.code == 0) {
          _this.dis_P4_up = true;
        } else {
          _this.dis_P4_up = false;
        }
      }, null);
    },



    reset() {
      this.overviewForm = {
        teamid: '',
        userid: '',
        startDate: '',
        endDate: '',
        time: '1'
      }
      this.leidaMain = ''
      this.my_sureOne2();
      if (this.activeName == '01') {
        this.getAllTalkTempleteGroup()
      }
    },


    // 查询内容
    // 传content内容搜索
    // teampermission，团队搜索

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
      this.userNameOptions = ''
      this.teamNames2 = "团队选择";
      this.overviewForm.teamid = '';
      this.$refs.tree2.setCheckedKeys([]);
      this.queryflag = true;
      if (this.activeName == '01') {
        this.getAllTalkTempleteGroup()
      } else {
        this.search({
          groupid: "",
          groupname: ""
        })
      }
      // this.search();
      // this.refresh();
    },
    my_sure2() {
      let _this = this;
      this.$refs.disTeam2.hide();


      if (this.my_list2 == null || this.my_list2 == '' || this.my_list2 == '1') {
        this.queryflag = true;
        this.queryflagString = "01"
      } else {
        this.teamNames2 = this.my_list2;
        this.queryflag = false;
        this.queryflagString = "02"
      }
      if (this.activeName == '01') {
        this.getAllTalkTempleteGroup()
      } else {
        // this.options = []
        this.speechList = []
        this.$message({
          type: "info",
          duration: 2000,
          message: '请选择业务员！',
        });
      }


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
      if (this.overviewForm.userid == '') {
        this.speechList = []
        this.$message({
          type: "info",
          duration: 2000,
          message: '请选择业务员！',
        });
        return
      }
      if (this.selectTree != '') {
        this.search(this.selectTree)
      } else {
        this.search({
          groupid: "",
          groupname: ""
        })
      }
    },





    search(item) {
      var _this = this
      _this.searchloading = true
      var params = {
        title: this.leidaMain,
        radartype: this.activeName, //01企业，02个人
        pageSize: 1000,
        pageNumber: 1,
        groupclass: "02",
        groupid: '',
        // teamIdStr: this.teamList2,
        // userIdStr: this.overviewForm.userid
      }

      if (this.activeName == '01' && item) {
        params.groupid = item.groupid
      } else if (this.activeName == '02') {
        params.groupid = item.groupid
      }
      this.parGroupid = params.groupid

      if (this.activeName == '02' && this.overviewForm.userid != '') {
        params['teamIdStr'] = this.teamList2
        params['userIdStr'] = this.overviewForm.userid
      }
      if (this.activeName == '01' && this.teamList2 != '') {
        params['teamIdStr'] = this.teamList2
      }
      api.getRadarList(params).then((data) => {
        if (data.rows.length > 0) {
          _this.speechList = data.rows
        } else {
          _this.speechList = []
        }
        _this.searchloading = false
      })
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

    // 选择团队雷达或者个人雷达
    handleClick(tab, event) {
      this.parGroupid = ''
      this.selectTree = ''
      this.digTitle = '新建 - ' + tab._props.label
      this.options = []
      this.my_sureOne2()
      this.speechList = []
      if (this.activeName == '01') {
        this.getAllTalkTempleteGroup()
      } else {
        this.options = [
          {
            groupid: "90000000000000000001",
            groupname: "PDF"
          },
          {
            groupid: "90000000000000000002",
            groupname: "链接"
          }
        ]
        this.search({
          groupid: "",
          groupname: ""
        });

      }



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
            _this.pdf.fileList = []
            _this.pdf.fileList.push(
              {
                name: '1',
                link_image_url: "https://crm.meihualife.com/" + data.refilepath
              }
            )
            _this.pdf.link_image_url = "https://crm.meihualife.com/images/pdf.jpg"

            _this.pdf.link_title = data.filename
          } else {
            _this.imgTxt.fileList = []
            _this.imgTxt.fileList.push({
              name: '1',
              link_image_url: "https://crm.meihualife.com/" + data.refilepath
            })
            _this.imgTxt.link_image_url = data.refilepath
          }

          _this.$message({
            type: "success",
            duration: 2000,
            message: "上传成功！",
          });
        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg + '，删除后重新上传！',
          });
        }
      }).fail(function (res) {
        _this.$message({
          type: "error",
          duration: 2000,
          message: "上传失败！",
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

      this.pdf.link = ''
      this.pdf.link_title = ''
      this.pdf.link_image_url = '';
      this.pdf.fileList = []
    },
    // https://meihualife.feishu.cn/sheets/shtcnKYr41GHDXXKehLqSTinoBk?sheet=rcrE1F
    // 上传图文
    imgTextSelect() {
      var _this = this
      if ((this.imgTxt.link).length >= 7 && (this.imgTxt.link).substring(0, 7) == "http://" || (this.imgTxt.link).substring(0, 8) == "https://") {
        var params = {
          webUrl: this.imgTxt.link
        }
        api.parseUrl(params).then((data) => {
          if (data.code == '0') {

            _this.imgTxt.link_title = data.title && data.title != '' ? data.title : '链接标题'
            // this.imgTxt.text = this.imgTxt.link
            _this.imgTxt.link_description = data.description && data.description != '' ? data.description : '链接内容介绍'
            _this.imgTxt.link_image_url = data.imageurl && data.imageurl != '' ? data.imageurl : "https://crm.meihualife.com/images/imgText.png"
            _this.imgTxt.fileList = []
            if (data.imageurl != '') {
              var gg = {
                name: '1',
                link_image_url: data.imageurl
              }
              _this.imgTxt.fileList.push(gg)
            } else {
              var gg = {
                name: '1',
                link_image_url: "https://crm.meihualife.com/images/imgText.png"
              }
              _this.imgTxt.fileList.push(gg)
            }

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
      this.imgTxt.fileList = []
    },


    mainClick(tab, event) {

    },


    // 取消新建雷达
    data_cencle() {
      this.dialogleida = false
      this.titleCon = ''
      this.isEdit = false
      this.editId = ''
      this.groupValue = ''
      this.PDFimgTxt = "img-txt"

      this.imgTxt = {
        link: '',
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
        fileList: [],
      }
      if (this.activeName == '01') {
        this.digTitle = "新建 - 团队雷达"
      } else {
        this.digTitle = "新建 - 个人雷达"
      }

    },

    // 确认新建雷达
    data_sure() {
      var _this = this
      _this.addloading = true


      if (this.imgTxt.link == '' && this.pdf.link == '') {
        this.$message({
          type: "error",
          duration: 2000,
          message: '请填写雷达内容后再提交！',
        });
        _this.addloading = false
        return
      }
      var params = {}
      if (this.imgTxt.link != '') {
        var link_content
        if (editor16.txt.html() == "<p><br></p>") {
          link_content = ''
        } else {
          link_content = editor16.txt.html()
        }
        params = {
          title: this.titleCon,
          link: this.imgTxt.link,
          link_title: this.imgTxt.link_title,
          link_description: this.imgTxt.link_description,
          link_image_url: this.imgTxt.link_image_url,
          radartype: this.activeName, //01企业，02个人
          link_content: link_content
        }
      } else {
        params = {
          title: this.titleCon,
          link: this.pdf.link,
          link_title: this.pdf.link_title,
          link_description: this.pdf.link_description,
          link_image_url: this.pdf.link_image_url,
          radartype: this.activeName, //01企业，02个人
        }
      }
      if (this.activeName == '01') {
  
        if (typeof this.groupValue == "object") {
          params['groupid'] = this.groupValue[0]
        } else {
        params['groupid'] = this.groupValue
        }

      }
      else {
        if ((params.link).slice(-3) == 'pdf') {
          params['groupid'] = '90000000000000000001'
        } else {
          params['groupid'] = '90000000000000000002'
        }

      }

      if (this.isEdit == true) {

        this.edit_sure(params)
 
      } else {
        api.addRadar(params).then((data) => {
          if (data.code == '0') {
            _this.$message({
              type: "success",
              duration: 2000,
              message: "新建雷达成功！",
            });
            _this.dialogleida = false

            _this.resetEdit()
            if (_this.selectTree != '') {
              _this.search(_this.selectTree)
            } else {
              _this.search({
                groupid: "",
                groupname: ""
              })
            }
          } else {
            _this.$message({
              type: "error",
              duration: 2000,
              message: data.msg,
            });
          }

          _this.addloading = false
        })

        // .catch((msg) => {
        //   _this.$message({
        //     type: "error",
        //     duration: 3000,
        //     message: '请检查内容，部分内容不符合',
        //   });
        //   _this.addloading = false

        // })

      }

    },

    // 修改雷达
    edit_sure(params) {
      var _this = this
      _this.addloading = true
      // deleteRadar
      params['id'] = this.editId
      api.modifyRadar(params).then((data) => {
        if (data.code == '0') {
          _this.dialogleida = false
          _this.$message({
            type: "success",
            duration: 2000,
            message: "修改成功！",
          });
          _this.resetEdit()
          if (_this.selectTree != '') {
            _this.search(_this.selectTree)
          } else {
            _this.search({
              groupid: "",
              groupname: ""
            })
          }

        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg,
          });
        }
        _this.digTitle = "新建 - 个人雷达"

      })

      _this.addloading = false

    },


    resetEdit() {
      this.titleCon = ''
      this.isEdit = false
      this.editId = ''
      this.groupValue = ''
      this.imgTxt = {
        link: '',
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
        fileList: [],
      }
      this.PDFimgTxt = "img-txt"
      if (this.activeName == '01') {
        this.digTitle = "新建 - 团队雷达"
      } else {
        this.digTitle = "新建 - 个人雷达"
      }



    },

    handleClose(done) {
      done();
    },
    handleGroupClose(done) {
      done();
    },






    showEditPopup(item) {
      var _this = this
      this.dialogleida = true
      this.isEdit = true
      this.editId = item.id

      this.titleCon = item.title


      var aa = (item.link).slice(-3);
      if (aa == 'pdf') {
        this.PDFimgTxt = "pdf"
        this.pdf.link = item.link
        this.pdf.link_title = item.link_title
        this.pdf.link_description = item.link_description
        this.pdf.link_image_url = item.link_image_url
        var gg = {
          name: '1',
          link_image_url: item.link_image_url
        }
        _this.pdf.fileList.push(gg)

      } else {
        this.PDFimgTxt = "img-txt"
        this.imgTxt.link = item.link
        this.imgTxt.link_title = item.link_title
        this.imgTxt.link_description = item.link_description
        this.imgTxt.link_image_url = item.link_image_url

        this.$nextTick(() => {
          if (!editor16) {
            this.newWangEditor2('#div5', '#div6')
          }
          if (item.link_content && item.link_content != '') {
            editor16.txt.html(item.link_content)
          } else {
            editor16.txt.clear()
            // editor16.txt.html('')
          }
        })

        _this.imgTxt.fileList.push({
          name: '1',
          link_image_url: item.link_image_url
        })

      }

      if (this.activeName == '01') {
        this.groupValue = item.groupid
        this.digTitle = '编辑 - 团队雷达'
      } else {
        this.digTitle = '编辑 - 个人雷达'
      }



    },


    deleteItem(item) {
      this.delitem = item
      this.deldialogVisible = true
    },

    delItemleida() {
      var _this = this
      var params = {
        id: this.delitem.id
      }

      api.deleteRadar(params).then((data) => {
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "删除成功！",
          });
          this.deldialogVisible = false
          if (_this.selectTree != '') {
            _this.search(_this.selectTree)
          } else {
            _this.search({
              groupid: "",
              groupname: ""
            })
          }


        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg,
          });
        }
      })


    },

    // 选择分组
    handleChange(value) {
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

      if (this.teamIdCheck[0] != '') {
        this.myList = this.InitteamNames
        this.teamListId = this.teamIdCheck[0]
        this.quanxian = this.teamIdCheck[0]
        this.$refs.tree.setCheckedKeys(this.teamIdCheck)
        this.teamNames = this.InitteamNames
      }
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

    dealTreeOnceChecked(arrMenus) {
      arrMenus === undefined ? arrMenus = [] : ''
      if (arrMenus.length > 0) {
        //let disarr = [];
        arrMenus.forEach(item => {
          let arrChildren = item.children
          if (arrChildren !== null) this.dealTreeOnceChecked(arrChildren)
          item.id === this.teamIdCheck[0] ? item["disabled"] = true : '';

        })
      }
    },




    // 获取该团队权限下的员工
    yewu() {
      let _this = this;
      var idStr = "";
      api.getAllTeamList().then((data) => {
        if (data.code == 0) {
          _this.teamDataList = data.teamList;
          // _this.teamDataList1 = data.teamList;
          api.getDailiTeamList().then((data) => {
            if (data.code == 0) {
              _this.teamDataList = _this.teamDataList.concat(data.teamList)
              // 堆和栈的区别， 改变其中一个另一个不变
              _this.teamDataList1 = JSON.parse(JSON.stringify(_this.teamDataList));

              getData('post', my_url + '/crm/auth/getTeamId.do', function (data) { //查看客户的权限
                if (data.code == 0) {
                  _this.teamIdCheck.push(data.teamid)
                  _this.myList = data.teamname
                  _this.teamListId = data.teamid
                  _this.quanxian = data.teamid
                  // _this.$refs.tree.setCheckedKeys(this.teamIdCheck)
                  _this.teamNames = data.teamname
                  _this.InitteamNames = data.teamname
                  _this.dealTreeOnceChecked(_this.teamDataList1)
                }
              }, null);
            }
          })




          // for (var i = 0; i < _this.teamDataList.length; i++) {
          //   idStr += _this.teamDataList[i].id + ",";
          //   if (_this.teamDataList[i].children) {
          //     for (var j = 0; j < this.teamDataList[i].children.length; j++) {
          //       idStr += _this.teamDataList[i].children[j].id + ",";
          //       if (this.teamDataList[i].children[j].children) {
          //         for (var s = 0; s < this.teamDataList[i].children[j].children.length; s++) {
          //           idStr += _this.teamDataList[i].children[j].children[s].id + ",";
          //         }
          //       }
          //     }
          //   }
          // }


          // if (idStr != "") {
          //   idStr = idStr.slice(0, -1);
          // }
          // // 权限内的所有人员
          // _this.teamAllid = idStr;
        }
      });
    },



    itemUp(data) {
      var _this = this
      var params = {
        id: data.id,
      }
      if (this.parGroupid == '') {
        params['userid'] = data.userid
      } else {
        params['groupid'] = data.groupid
        params['userid'] = data.userid
      }

      api.radarUp(params).then((data) => {
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "上移成功！",
          });
          if (_this.selectTree != '') {
            _this.search(_this.selectTree)
          } else {
            _this.search({
              groupid: "",
              groupname: ""
            })
          }
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
      var _this = this
      var params = {
        id: data.id,
      }
      if (this.parGroupid == '') {
        params['userid'] = data.userid
      } else {
        params['groupid'] = data.groupid
        params['userid'] = data.userid
      }
      api.radarDown(params).then((data) => {
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "下移成功！",
          });
          if (_this.selectTree != '') {
            _this.search(_this.selectTree)
          } else {
            _this.search({
              groupid: "",
              groupname: ""
            })
          }
        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg,
          });
        }
      })
    },



    // 团队雷达

    // 添加分组
    group_sure() {
      if (this.modifyGroupData == '') {
        var params = {
          upgroupid: "",
          groupname: this.groupName,
          grouptype: this.activeName,
          groupclass: '02',
          teampermission: this.quanxian
        }
        var _this = this
        api.addTalkTempleteGroup(params).then((data) => {
          if (data.code == '0') {
            _this.$message({
              type: "success",
              duration: 2000,
              message: "添加成功！",
            });
            _this.getAllTalkTempleteGroup()
            _this.groupName = ''
            _this.team_cancel()
          } else {
            _this.$message({
              type: "error",
              duration: 2000,
              message: data.msg,
            });
          }
          _this.dialogGroup = false
        })

      } else {
        var _this = this
        var params = {
          groupid: this.modifyGroupData.groupid,
          groupname: this.groupName,

        }
        if (this.activeName == '01') {
          params['teampermission'] = this.quanxian
        }
        api.modifyTalkTempleteGroup(params).then((data) => {
          if (data.code == '0') {
            _this.dialogGroup = false
            _this.$message({
              type: "success",
              duration: 2000,
              message: "修改成功！",
            });
            _this.getAllTalkTempleteGroup()
            _this.groupName = ''
            _this.team_cancel()

          } else {
            _this.$message({
              type: "error",
              duration: 2000,
              message: data.msg,
            });
          }

        })

        this.modifyGroupData = ''


      }

    },


    // 取消添加分组
    group_cencle() {
      this.dialogGroup = false
      this.groupName = ''
      this.modifyGroupData = ''
      this.team_cancel()
    },


    // 查询分组
    getAllTalkTempleteGroup() {
      // this.loading = true
      var _this = this
      var params = {
        grouptype: this.activeName,
        groupclass: '02',
        // teamIdStr:this.teamList2
      }
      if (this.teamList2 != '') {
        params['teamIdStr'] = this.teamList2
      }
      api.getAllTalkTempleteGroup(params).then((data) => {
        if (data.code == '0') {
          _this.options = data.talkTempleteGroup
          _this.search()
        } else if (data.code == '1' && _this.activeName == '01' && data.msg == '还没有定义话术组') {
          _this.options = []
          _this.speechList = []
        }

      })
    },

    // 点击分组
    handleNodeClick(data) {
      var _this = this
      this.selectTree = data
      this.search(data)
    },


    // 打开修改分组弹窗
    modifyGroup(item) {
      this.groupName = item.groupname
      this.modifyGroupData = item
      this.quanxian = item.teampermission
      if (item.teampermission) {
        if (this.activeName == '01') {
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys((item.teampermission).split(','));
          })
        }
        this.teamNames = item.teampermission_names
      }

      this.dialogGroup = true


    },

    // 组上下移动
    groupUp(data) {
      var _this = this
      var params = {
        groupid: data.groupid
      }
      api.groupUp(params).then((data) => {
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "上移成功！",
          });
          _this.getAllTalkTempleteGroup()
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
      var _this = this
      var params = {
        groupid: data.groupid
      }
      api.groupDown(params).then((data) => {
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "下移成功！",
          });
          _this.getAllTalkTempleteGroup()
        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg,
          });
        }
      })
    },

    // 删除分组
    deleteGroup(data) {
      this.delGroup = data
      this.deldiaGroup = true
    },
    // 删除分组
    delGroupradar() {
      var _this = this
      var parms = {
        groupid: this.delGroup.groupid
      }
      api.deleteTalkTempleteGroup(parms).then((data) => {
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "删除成功！",
          });
          _this.deldiaGroup = false
          _this.getAllTalkTempleteGroup()
        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg,
          });
        }

      })
    },

    newWangEditor2(el1, el2) {
      editor16 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 隐藏“网络图片”tab
      editor16.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor16.customConfig.pasteIgnoreImg = false
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
          console.log("上传之前")
          console.log(xhr, editor, files)

        },
        success: function (xhr, editor, result) {
          console.log(result);

          console.log("上传成功21");

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




  },
};
</script>
<style src="../../static/css/insuranceProducts.css"></style>
<style src="../../static/css/myFonts/iconfont.css"></style>
<style scoped>
.img_text img {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.text {
  min-height: 2rem;
  height: auto;
  max-height: 2rem;
  overflow-y: scroll;
}
.w-e-toolbar {
  border-bottom: 1px solid rgba(216, 216, 216, 1);
}
.scriptLibrary {
}
.img_text {
  margin-bottom: 0rem;
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
  /* padding-top: 0.18rem; */
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

/* .activeName {
  width: 100%;
} */
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
  height: 28px;
  line-height: 28px;
  outline: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  margin-left: 0.01rem;
}

/* ::v-deep .el-textarea__inner {
  border: 0px solid #dcdfe6;
} */

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
  text-align: left;
}
.zhongjiantab {
  width: 93%;
  /* margin-top: -0.04rem; */
}
.listMainbox {
  margin-top: 0.15rem;
  background: #fff;
  padding: 0.1rem;
  border: 1px solid rgba(216, 216, 216, 1);
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
  height: 28px;
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
  padding: 0.15rem;
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
  margin-left: 0.1rem;
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
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 0.2rem;
}

/* .listMainbox .el-textarea .el-textarea__inner {
  min-height: 120px !important;
 
}
::v-deep .listMainbox .el-textarea .el-textarea__inner {
  min-height: 120px !important;
} */
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
  text-align: left;
}
.selectMain .block_desc {
  margin-top: 0rem;
  width: 100%;
  height: 100%;
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
.updown .el-button:hover {
  border-color: #bdbdbd;
}
.updown {
  margin: 0 0.15rem;
}

.DescTitle {
  /* display: none; */
  margin-top: 0.08rem;
}
::v-deep .el-upload {
  /* width: 1.23rem;
  height: 1.23rem;*/
  /* border: 0px solid #dcdfe6; */
  background-color: #fff;
}
.mainleft {
  margin-top: 0.08rem;
}
.mainleft p {
  text-align: left;
}
.pdfNameSize {
  width: 100%;
}
.imgupload,
.pdfup {
  border-right: 1px solid #dcdfe6;
}

.select-content .el-dropdown-inners {
  border: 1px solid #dcdfe6;
  width: 100%;
  height: 28px;
}
.w-e-text-container {
  position: unset;
}
.editor-box {
  position: relative;
}
::v-deep .w-e-text-container .w-e-panel-container {
  position: absolute;
  top: 32px !important;
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
  width: 100%;
  height: 100%;
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

.el-upload-list--picture-card .el-upload-list__item {
  margin: 0;
}
</style>




