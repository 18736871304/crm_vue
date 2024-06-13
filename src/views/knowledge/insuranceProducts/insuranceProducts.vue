<template>
  <div class="scriptLibrary">
    <div class="eltabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-if="isLeader =='Y'" label="团队话术" name="01"></el-tab-pane>
        <el-tab-pane label="个人话术" name="02"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="newAdd">
      <div class="addpatter" @click="dialoghuashu = true">
        <el-button plain>新建话术</el-button>
      </div>
      <div class="addgroup" @click="dialogGroup = true">
        <el-button plain>添加分组</el-button>
      </div>
    </div>

    <div class="teamLanguage">
      <div class="productList" v-loading="loading">
        <el-tree :data="options" :props="GroupdefaultProps" node-key="id" :default-checked-keys="[1]" :expand-on-click-node="true" ref="tree" @node-click="handleNodeClick" :highlight-current="true" :default-expand-all='true'>
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="tree-lable">{{ data.groupname }}</span>
            <span class="groupLeft">
              <el-button type="text" size="mini">
                <el-popover placement="right" trigger="hover" popper-class="groupPopover">
                  <ul class="groupTan">
                    <li @click.prevent="modifyGroup(data)">编辑</li>
                    <li @click.prevent="deleteGroup(data)">删除</li>
                  </ul>
                  <!-- 下面是显示在树形控件的元素 -->
                  <i slot="reference" class="el-icon-more"></i>

                </el-popover>
              </el-button>
            </span>
          </span>
        </el-tree>

      </div>

      <div class="teamMain table-box">
        <el-table :data="speechList" border style="width: 100%">
          <el-table-column key="1" align="center" type="index" label="序号">
          </el-table-column>
          <el-table-column key="2" align="center" label="话术内容" width="290">
            <template slot-scope="scope">
              <div class="huashuMain" v-html="scope.row.main"></div>
            </template>
          </el-table-column>
          <el-table-column key="3" align="center" prop="title" label="标题" width="120">
          </el-table-column>
          <el-table-column key="4" align="center" prop="sendcount" sortable label="发送次数" width='110'>
          </el-table-column>
          <el-table-column key="5" align="left" prop="username" label="创建人" width='90'>
          </el-table-column>
          <el-table-column key="6" align="left" prop="makedate" sortable label="创建时间" width="160">
          </el-table-column>
          <el-table-column key="7" align="center" label="类型" width="80">
            <template slot-scope="scope">
              <div v-if="(scope.row.talkContent).length>1"> 复合类型</div>
              <div v-else-if="(scope.row.talkContent).length==1">{{ scope.row.talkContent[0].type}}</div>
              <div v-else>无类型</div>
            </template>
          </el-table-column>
          <el-table-column key="8" align="left" prop="teampermission_names" label="使用团队" width="120">
          </el-table-column>
          <el-table-column key="9" align="center" label="操作" width="auto">
            <template slot-scope="scope">
              <a class="edit option" href="javascript:void(0);" @click="showEditPopup(scope.row)">编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <a class="edit option" href="javascript:void(0);" @click="deletePopup(scope.row)">删除</a>
            </template>
          </el-table-column>

        </el-table>

      </div>
    </div>

    <el-dialog title="新建话术" :visible.sync="dialoghuashu" width="30%" :before-close="data_cencle" :close-on-click-modal="false" append-to-body>
      <div v-loading="addloading">

        <div class="titleBox">
          <div>
            <p>分组</p>
            <div class="block">
              <el-cascader v-model="groupValue" :options="options" :props="newDefaultProps" @change="handleChange" placeholder="请选择分组" clearable></el-cascader>
            </div>
          </div>
          <div>
            <p>标题</p>
            <el-input v-model="titleCon" placeholder="请输入内容"></el-input>
          </div>

          <div style="margin-top: 10px" v-if="activeName=='01'">
            <p>话术权限</p>
            <div class="select-content">
              <el-dropdown trigger="click" style="width: 100%" placement="bottom" ref="disTeam">
                <p class="el-dropdown-inners" clearable>
                  <span>{{ teamNames }}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu class="asd" slot="dropdown">
                  <el-tree @check="checkTeam" :data="teamDataList" ref="tree" show-checkbox node-key="id" :default-checked-keys="teamIdCheck" :props="defaultProps"> </el-tree>
                  <div class="sure-footer">
                    <div class="my-sure" @click="team_sure()">确定</div>
                    <div class="my-sure cancel" @click="team_cancel()">取消</div>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>

        <div v-for="(item, index) in dataList" :key="index">
          <div class="mainBox">
            <div class="listMain">
              <div>话术内容{{ index + 1 }}</div>
              <div class="listDelete" @click="clickDelete(index)">
                <i class="el-icon-delete"></i>
              </div>
            </div>

            <el-tabs v-model="item.mainType" @tab-click="mainClick">
              <el-tab-pane label="文字" name="text">
                <div class="listMainbox">
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4 }" placeholder="在此输入回复内容" v-model="item.wenzimain"> </el-input>
                </div>
              </el-tab-pane>

              <el-tab-pane label="图片" name="image">
                <div class="listMainbox">
                  <div style="margin-bottom: 0.15rem">
                    <p>名称:</p>
                    <el-input v-model="item.image.imgmain" placeholder="选填，仅内部可见，方便整理"></el-input>
                  </div>
                  <div class="imgupload">
                    <el-upload accept="image/*" action="#" ref="imgupload" list-type="picture-card" :auto-upload="false" :limit="1" :file-list="item.image.uploadFilePath" :on-change="
                      (file) => {
                        return imgSaveToUrl(file, index);
                      }
                    " :class="item.image.num == '1' ? 'jinyong' : ''">
                      <i slot="default" class="el-icon-plus"></i>

                      <div slot="file" slot-scope="{ file }">
                        <img class="el-upload-list__item-thumbnail" :src="item.image.file.refilepath" alt="" />
                        <span class="el-upload-list__item-actions">
                          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(item, index)">
                            <i class="el-icon-zoom-in"></i>
                          </span>
                          <span v-if="!item.image.disabled" class="el-upload-list__item-delete" @click="handleRemove(file, index)">
                            <i class="el-icon-delete"></i>
                          </span>
                        </span>
                      </div>
                    </el-upload>

                    <div class="imgNameSize" v-if="item.image.file.filename != ''">

                      <p>{{ item.image.file.filename }}</p>

                    </div>
                    <el-dialog :visible.sync="item.image.dialogVisible" append-to-body>
                      <img width="100%" :src="item.image.file.refilepath" alt="" />
                    </el-dialog>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane label="图文" name="img-txt">
                <div class="listMainbox">
                  <div style="margin-bottom: 0.15rem">
                    <el-input placeholder="请输入内容" @input="imgTextSelect(item,index)" v-model="item.imgText.text" clearable> </el-input>
                  </div>
                  <div v-if="item.imgText.title">
                    <div class="recordFile">
                      <div class="fileMain">
                        <span class="FileTitle">{{ item.imgText.title }}</span>
                        <span class="FileSize FileSizeleft">{{ item.imgText.desc }}</span>
                      </div>
                      <img :src="item.imgText.imgUrl" alt="" />

                    </div>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane label="PDF" name="pdf">
                <div class="listMainbox">
                  <div style="margin-bottom: 0.15rem">
                    <div class="pdfupload">
                      <el-upload accept=".pdf" action="#" ref="pdfupload" list-type="picture-card" :auto-upload="false" :file-list="item.pdf.uploadFilePath" :limit="1" :on-change="
                        (file) => {
                          return pdfSaveToUrl(file, index);
                        }
                      " :class="item.pdf.num == '1' ? 'pdfjinyong' : ''">
                        <i slot="default" class="el-icon-plus"></i>

                        <div slot="file" slot-scope="{ file }">
                          <img class="el-upload-list__item-thumbnail" :src="item.pdf.file.refilepath" alt="" />
                          <span class="el-upload-list__item-actions">
                            <span v-if="!item.pdf.disabled" class="el-upload-list__item-delete" @click="handlepdfRemove(file, index)">
                              <i class="el-icon-delete"></i>
                            </span>
                          </span>
                        </div>
                      </el-upload>

                      <div class="pdfNameSize" v-if="item.pdf.file.filename != ''">

                        <p>{{ item.pdf.file.filename }}</p>
                        <p>{{ (item.pdf.file.size / 1048576).toFixed(2) }}M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane label="视频" name="video">
                <div class="listMainbox">
                  <div style="margin-bottom: 0.15rem">
                    <div class="videoupload">
                      <el-upload accept="video/*" action="#" ref="videoupload" list-type="picture-card" :auto-upload="false" :file-list="item.video.uploadFilePath" :limit="1" :on-change="
                        (file) => {
                          return videoSaveToUrl(file, index);
                        }
                      " :class="item.video.num == '1' ? 'videojinyong' : ''">
                        <i slot="default" class="el-icon-plus"></i>

                        <div slot="file" slot-scope="{ file }">
                          <img class="el-upload-list__item-thumbnail" :src="item.video.videoImg" alt="" />
                          <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlevideoPreview(file, index)">
                              <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!item.video.disabled" class="el-upload-list__item-delete" @click="handlevideoRemove(file, index)">
                              <i class="el-icon-delete"></i>
                            </span>
                          </span>
                        </div>
                      </el-upload>

                      <div class="pdfNameSize" v-if="item.video.file.filename != ''">
                        <p>{{ item.video.file.filename }}</p>
                        <p>{{ (item.video.file.size / 1048576).toFixed(2) }}M {{ item.video.dialogVisible }}</p>
                      </div>

                      <el-dialog :visible.sync="item.video.dialogVisible" append-to-body>
                        <video :src="item.video.file.refilepath" controls class="videoUrl"></video>
                      </el-dialog>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <div @click="addmain" class="addTemplate">
          <p><i class="el-icon-circle-plus-outline"></i> 添加内容</p>
          <p>(添加多个内容可以一键发送)</p>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="data_cencle">取 消</el-button>
          <el-button type="primary" @click="data_sure">确 定</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="新建分组" :visible.sync="dialogGroup" width="30%" :before-close="handleClose" :close-on-click-modal="false" append-to-body>
      <div class="titleBox">
        <div>
          <p>分组名称</p>
          <div class="block">
            <el-select v-model="groupName" filterable allow-create default-first-option placeholder="请输入分组名称">
              <el-option v-for="item in groupOptions" :key="item.groupid" :label="item.groupname" :value="item.groupname">
              </el-option>
            </el-select>

          </div>
        </div>
        <div style="margin-top: 0.3rem">
          <p>子分组名称</p>
          <div class="block">
            <el-input placeholder="请输入子分组名称" v-model="subgroupName" clearable> </el-input>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="group_cencle">取 消</el-button>
        <el-button type="primary" @click="group_sure">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改分组" :visible.sync="modifydialogGroup" width="30%" :before-close="handleClose" :close-on-click-modal="false" append-to-body>
      <div class="titleBox">
        <div>
          <p>分组名称</p>
          <div class="block">
            <el-input placeholder="请输入分组名称" v-model="modifygroupName" clearable> </el-input>
          </div>
        </div>

      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modifydialogGroup = false">取 消</el-button>
        <el-button type="primary" @click="modifygroup_sure">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import api from "../../../utils/api";
import $ from "jquery";
import "../../../static/js/viewer-jquery.min.js";
import "../../../static/css/viewer.min.css";
import { getData, getPhoneData, my_url } from "../../../static/js/ajax.js";
// import { Loading } from "element-ui";
export default {
  data() {
    return {
      loading: false,
      isLeader: 'Y',//判断是否是团队长
      // 团队话术01  个人话术02
      activeName: "01",
      options: [], //分组列表
      speechList: [],//话术列表
      // 分组显示
      visibles: [],
      // 当前选中的分组
      selectTree: '',

      // 新建分组
      dialogGroup: false,
      groupName: "",
      groupOptions: [],
      subgroupName: "",
      // 编辑分组
      modifyGroupData: '',//储存要修改的内容
      modifydialogGroup: false,
      modifygroupName: '',


      // 话术页面
      teamhaushu: '',
      // 新建话术 
      addloading: false,
      dialoghuashu: false,
      // mainType: "text",
      groupValue: "",//分组名称
      titleCon: "",//标题
      quanxian: "",//话术权限
      // 话术内容
      dataList: [
        {
          mainType: "text",
          wenzimain: "",
          image: {
            uploadFilePath: [],
            imgmain: "",
            dialogVisible: false,
            disabled: false,
            num: "",
            file: {
              refilepath: "",
              size: "",
              filename: "",
            },
          },
          imgText: {
            text: "",
            desc: "",
            title: "",
            imgUrl: "",
          },
          pdf: {
            uploadFilePath: [],
            disabled: false,
            num: "",
            file: {
              refilepath: "",
              size: "",
              filename: "",
            },
          },
          video: {
            uploadFilePath: [],
            dialogvideoimgUrl: "",
            dialogVisible: false,
            disabled: false,
            num: "",
            file: {
              videoImg: '',
              refilepath: "",
              size: "",
              filename: "",
            },
          },
        },
      ],

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
    this.teamLedar()
    this.yewu();
  },
  watch: {

  },
  methods: {
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
          _this.getTalkTempleteGroup()
          _this.isLeader = data.isLeader
        }

      })
    },

    // 选择团队话术或者个人话术
    handleClick(tab, event) {
      this.options = []
      this.groupOptions = []
      this.speechList = []
      this.getTalkTempleteGroup()
    },
    // 查询分组
    getTalkTempleteGroup() {
      this.loading = true
      var _this = this
      var params = {
        grouptype: this.activeName,
      }
      api.getTalkTempleteGroup(params).then((data) => {
        if (data.code == '0') {
          _this.options = data.talkTempleteGroup
          _this.groupOptions = data.talkTempleteGroup
          console.log(data.talkTempleteGroup[0])
          if (data.talkTempleteGroup[0]) {
            _this.handleNodeClick(data.talkTempleteGroup[0])
          }

        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg,
          });
        }
        this.loading = false
      })
    },

    // 确认添加分组
    group_sure() {
      var _this = this
      var parms = {
        upgroupid: "",
        groupname: this.groupName,
        grouptype: this.activeName
      }

      for (var i = 0; i < this.groupOptions.length; i++) {
        if (this.groupOptions[i].groupname == this.groupName) {
          parms.upgroupid = this.groupOptions[i].groupid
          parms.groupname = this.subgroupName
        }
      }
      if (parms.upgroupid != '' && parms.groupname == '') {
        _this.$message({
          type: "error",
          duration: 2000,
          message: "请填写子分组名称",
        });
        return
      }



      api.addTalkTempleteGroup(parms).then((data) => {
        if (data.code == '0') {
          if (parms.upgroupid == '') {
            var dd = {
              upgroupid: data.groupid,
              groupname: this.subgroupName,
              grouptype: this.activeName
            }
            api.addTalkTempleteGroup(dd).then((data) => {
              if (data.code == '0') {
                _this.dialogGroup = false
                _this.$message({
                  type: "success",
                  duration: 3000,
                  message: "新建成功!",
                });
                _this.subgroupName = '',
                  _this.groupName = '',
                  _this.getTalkTempleteGroup()
              }

            })
          } else {
            _this.dialogGroup = false
            _this.$message({
              type: "success",
              duration: 2000,
              message: "新建成功!",
            });
            _this.subgroupName = '',
              _this.groupName = '',
              _this.getTalkTempleteGroup()
          }
        }
      });



    },
    // 取消添加分组
    group_cencle() {
      this.dialogGroup = false
    },


    // 打开修改分组弹窗
    modifyGroup(data) {
      this.modifygroupName = data.groupname
      this.modifyGroupData = data
      this.modifydialogGroup = true
    },
    // 确认修改分组
    modifygroup_sure() {
      var _this = this
      var parms = {
        groupid: this.modifyGroupData.groupid,
        groupname: this.modifygroupName,
      }
      api.modifyTalkTempleteGroup(parms).then((data) => {
        if (data.code == '0') {
          _this.modifydialogGroup = false
          _this.$message({
            type: "success",
            duration: 2000,
            message: "修改成功!",
          });

          _this.getTalkTempleteGroup()
        }
      })
    },

    // 删除分组
    deleteGroup(data) {
      var _this = this
      var parms = {
        groupid: data.groupid
      }
      this.$confirm('确认删除此分组和其下所有话术吗？').then(_ => {
        api.deleteTalkTempleteGroup(parms).then((data) => {
          if (data.code == '0') {
            _this.$message({
              type: "success",
              duration: 2000,
              message: "删除成功!",
            });
            _this.getTalkTempleteGroup()
          } else {
            _this.$message({
              type: "error",
              duration: 2000,
              message: data.msg,
            });
          }

        })
      })
        .catch(_ => { });

    },

    // 选择分组
    handleChange(value) {

    },



    addmain() {
      this.dataList.push({
        mainType: "text",
        wenzimain: "",
        image: {
          uploadFilePath: [],
          imgmain: "",
          dialogVisible: false,
          disabled: false,
          num: "",
          file: {
            refilepath: "",
            size: "",
            filename: "",
          },
        },
        imgText: {
          text: "",
          desc: "",
          title: "",
          imgUrl: "",
        },
        pdf: {
          uploadFilePath: [],
          num: "",
          disabled: false,
          file: {
            refilepath: "",
            size: "",
            filename: "",
          },
        },
        video: {
          uploadFilePath: [],
          dialogVisible: false,
          disabled: false,
          num: "",
          file: {
            videoImg: '',
            refilepath: "",
            size: "",
            filename: "",
          },
        },
      });
    },



    // 上传图片
    uploadfile(file, fileType, index) {
      var _this = this;
      let formData = new FormData();
      formData.append("myFile", file);
      formData.append("buztype", "0601");

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
          if (fileType == "pdf") {
            data.refilepath = "https://crm.meihualife.com/images/pdf.jpg";
          } else {
            data.refilepath = data.refilepath.slice(9);
          }

          if (_this.dataList[index][fileType].file) {
            delete _this.dataList[index][fileType].file;
          }
          _this.dataList[index][fileType].uploadFilePath = []
          _this.dataList[index][fileType].uploadFilePath.push(data)
          _this.dataList[index][fileType]["file"] = data;
          _this.dataList[index][fileType].num = 1;
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
      })
        .fail(function (res) {
          _this.$message({
            type: "error",
            duration: 2000,
            message: "上传失败!",
          });
        });
    },

    clickDelete(data) {
      if (this.dataList.length > 1) {
        let copiedArr = [...this.dataList]; // 复制数组
        copiedArr.splice(data, 1); // 从索引1开始，删除1个元素
        this.dataList = copiedArr;
      } else {
        this.$message({
          message: "最少保留一条话术",
          type: "warning",
        });
      }
    },

    // 删除上传img
    handleRemove(file, index) {
      let filelist = this.$refs.imgupload[index].uploadFiles;
      let indexaa = filelist.findIndex((fileItem) => {
        return fileItem.uid === file.uid;
      });
      filelist.splice(indexaa, 1);
      this.dataList[index].image.file = {

      };
      this.dataList[index].image.num = "";
    },
    // 更换或上传图片数据
    imgSaveToUrl(file, index) {
      this.uploadfile(file.raw, "image", index);
    },

    // 放大图片
    handlePictureCardPreview(file, index) {
      this.dataList[index].image.dialogVisible = true;
    },

    // 上传PDF
    pdfSaveToUrl(file, index) {
      this.uploadfile(file.raw, "pdf", index);
    },
    // 删除PDF
    handlepdfRemove(file, index) {
      let filelist = this.$refs.pdfupload[index].uploadFiles;
      let indexaa = filelist.findIndex((fileItem) => {
        return fileItem.uid === file.uid;
      });
      filelist.splice(indexaa, 1);
      this.dataList[index].pdf.file = {};
      this.dataList[index].pdf.num = "";
    },

    // 上传图文
    imgTextSelect(item, index) {
      if ((item.imgText.text).length >= 7 && (item.imgText.text).substring(0, 7) == "http://" || (item.imgText.text).substring(0, 8) == "https://") {
        var params = {
          webUrl: item.imgText.text
        }
        api.parseUrl(params).then((data) => {
          if (data.code == '0') {
            this.dataList[index].imgText.title = data.title != '' && data.title ? data.title : '链接'
            this.dataList[index].imgText.text = item.imgText.text
            this.dataList[index].imgText.desc = data.description != '' && data.description ? data.description : '详细介绍'
            this.dataList[index].imgText.imgUrl = data.imageurl != '' && data.imageurl ? data.imageurl : "https://assets.weibanzhushou.com/default-cover.png"
          }
        })
      } else {
        console.log("地址输入错误");
      }
    },

    // 上传视频
    videoSaveToUrl(file, index) {
      this.uploadfile(file.raw, "video", index);
      var that = this;
      this.getvideoImg(file.url, index, function (videoImg, index) {
        that.dataList[index].video["videoImg"] = videoImg;
      })

    },
    // 移除视频
    handlevideoRemove(file, index) {
      let filelist = this.$refs.videoupload[index].uploadFiles;
      let indexaa = filelist.findIndex((fileItem) => {
        return fileItem.uid === file.uid;
      });
      filelist.splice(indexaa, 1);
      delete this.dataList[index].video.file;
      this.dataList[index].video.file = {};
      this.dataList[index].video.num = "";
    },
    // 查看视频
    handlevideoPreview(file, index) {
      this.dataList[index].video.dialogVisible = true;
    },






    mainClick(tab, event) {

    },


    // 取消新建话术
    data_cencle() {
      this.groupValue = ''
      this.titleCon = ''
      this.teamNames = ''
      this.isEdit = false
      this.editId = ''
      // 团队
      this.team_cancel()


      this.dataList = [{
        mainType: "text",
        wenzimain: "",
        image: {
          uploadFilePath: [],
          imgmain: "",
          dialogVisible: false,
          disabled: false,
          num: "",
          file: {
            refilepath: "",
            size: "",
            filename: "",
          },
        },
        imgText: {
          text: "",
          desc: "",
          title: "",
          imgUrl: "",
        },
        pdf: {
          uploadFilePath: [],
          num: "",
          disabled: false,
          file: {
            refilepath: "",
            size: "",
            filename: "",
          },
        },
        video: {
          uploadFilePath: [],
          dialogVisible: false,
          disabled: false,
          num: "",
          file: {
            videoImg: '',
            refilepath: "",
            size: "",
            filename: "",
          },
        },
      }];

      this.dialoghuashu = false
    },

    // 确认新建话术
    data_sure() {
      var _this = this
      _this.addloading = true


      var arr = []
      var dataList = this.dataList
      for (var i = 0; i < dataList.length; i++) {
        if (dataList[i].mainType == 'text' && dataList[i].wenzimain != '') {
          arr.push({
            type: dataList[i].mainType,
            text: dataList[i].wenzimain.replace(new RegExp(/( )/g), '&nbsp;'),
            filetype: "",
            fileid: "",
          })
        }
        else if (dataList[i].mainType == 'img-txt' && dataList[i].imgText.text != '') {
          arr.push({
            type: dataList[i].mainType,
            text: JSON.stringify(dataList[i].imgText),
            filetype: "",
            fileid: "",
          })
        } else if (dataList[i].mainType == 'image' || dataList[i].mainType == 'pdf' || dataList[i].mainType == 'video') {

          if (dataList[i][dataList[i].mainType].file.filename != '') {
            if (dataList[i][dataList[i].mainType].imgmain && dataList[i][dataList[i].mainType].imgmain != '') {
              dataList[i][dataList[i].mainType].file.filename = dataList[i][dataList[i].mainType].imgmain
            }
            arr.push({
              type: dataList[i].mainType,
              text: dataList[i][dataList[i].mainType].file.filename,
              filetype: dataList[i][dataList[i].mainType].file.filetype,
              fileid: dataList[i][dataList[i].mainType].file.fileid
            })
          }
        }
      }

      // 
      if (this.groupValue[1] == '') {
        this.$message({
          type: "error",
          duration: 2000,
          message: '请填写分组',
        });
        _this.addloading = false
        return
      }

      if (arr.length <= 0) {
        this.$message({
          type: "error",
          duration: 2000,
          message: '请填写话术内容后再提交',
        });
        _this.addloading = false
        return
      }
      var params = {
        groupid: this.groupValue[1],
        title: this.titleCon,
        teampermission: this.quanxian,
        contentJson: JSON.stringify(arr)
      }


      if (this.isEdit == true) {
        this.edit_sure(params)
        return
      } else {
        api.addTalkTempleteContent(params).then((data) => {
          if (data.code == '0') {
            _this.$message({
              type: "success",
              duration: 2000,
              message: "新建话术成功",
            });
            _this.dialoghuashu = false
            _this.getTalkTempleteGroup()
            _this.data_cencle()
          } else {
            _this.$message({
              type: "error",
              duration: 2000,
              message: data.msg,
            });
          }

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
      }
      api.getTalkItemList(parms).then((data) => {
        if (data.rows.length > 0) {
          var arr = data.rows
          for (var i = 0; i < arr.length; i++) {
            var arrchild = arr[i].talkContent

            var dd = ''
            if (arrchild.length > 0) {
              for (var j = 0; j < arrchild.length; j++) {

                if (arrchild[j].type == 'text') {
                  dd += '<p>' + arrchild[j].text + '</p>'
                } else if (arrchild[j].type == 'img-txt') {
                  var objdata = JSON.parse(arrchild[j].text)
                  dd += "<div class ='img_text'> <img src='" + objdata.imgUrl + "' alt=''>  <div class ='imgTxt'>  <p>" + objdata.title + "</p><p>" + objdata.desc + "</p> </div></div>  </div>"
                } else if (arrchild[j].type == 'image') {
                  dd += "<div class ='img_text'> <img src='https://crm.meihualife.com" + arrchild[j].dispath + "' alt=''><p>" + arrchild[j].text + "'</p> </div>"
                } else if (arrchild[j].type == 'pdf') {
                  dd += "<div class ='img_text'> <img src='https://crm.meihualife.com/images/pdf.jpg' alt=''><p>" + arrchild[j].text + "</p> </div>"
                } if (arrchild[j].type == 'video') {
                  var videoImg = 'https://crm.meihualife.com' + arrchild[j].dispath
                  dd += "<div class ='img_text'> <video src=" + videoImg + "></video><p>" + arrchild[j].text + "</p> </div>"
                }
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

    //  path 地址   data 传递的数据  callback要回传的内容
    getvideoImg(path, data, callback) {
      const video = document.createElement("video"); // 也可以自己创建video
      video.src = path; // url地址 url跟 视频流是一样的
      var canvas = document.createElement("canvas"); // 获取 canvas 对象
      const ctx = canvas.getContext("2d"); // 绘制2d
      video.crossOrigin = "anonymous"; // 解决跨域问题，也就是提示污染资源无法转换视频
      video.currentTime = 1; // 第一帧
      video.oncanplay = () => {
        canvas.width = video.clientWidth ? video.clientWidth : 320; // 获取视频宽度
        canvas.height = video.clientHeight ? video.clientHeight : 320; //获取视频高度
        // 利用canvas对象方法绘图
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // 转换成base64形式
        let videoFirstimgsrc = canvas.toDataURL("image/png"); // 截取后的视频封面
        video.remove();
        canvas.remove();
        callback(videoFirstimgsrc, data)
      };
    },


    showEditPopup(item) {
      var _this = this
      this.dialoghuashu = true
      this.isEdit = true
      this.editId = item.itemid

      var groupList = []
      // 赋值分组
      for (var i = 0; i < this.options.length; i++) {
        if (this.options[i].child && this.options[i].child.length > 0) {
          var children = this.options[i].child
          for (var j = 0; j < children.length; j++) {
            if (children[j].groupid == item.groupid) {
              groupList.push(this.options[i].groupid)
              groupList.push(children[j].groupid)
            }
          }
        }
      }
      this.groupValue = groupList
      // 赋值标题
      this.titleCon = item.title
      // 赋值权限

      this.quanxian = item.teampermission
      if (this.activeName == '01') {
        this.$refs.tree.setCheckedKeys((item.teampermission).split(','));
      }
      this.teamNames = item.teampermission_names

      this.dataList = []
      for (var i = 0; i < item.talkContent.length; i++) {

        var itemMain = item.talkContent[i]

        if (itemMain.type == 'text') {

          this.dataList.push({
            mainType: "text",
            wenzimain: itemMain.text.replace(new RegExp(/&nbsp;/g), ' '),
            image: {
              uploadFilePath: [item],
              imgmain: "",
              dialogVisible: false,
              disabled: false,
              num: 1,
              file: {
                refilepath: "",
                size: "",
                filename: "",
              },
            },
            imgText: {
              text: "",
              desc: "",
              title: "",
              imgUrl: "",
            },
            pdf: {
              uploadFilePath: [],
              disabled: false,
              num: "",
              file: {
                refilepath: "",
                size: "",
                filename: "",
              },
            },
            video: {
              uploadFilePath: [],
              dialogvideoimgUrl: "",
              dialogVisible: false,
              disabled: false,
              num: "",
              file: {
                videoImg: '',
                refilepath: "",
                size: "",
                filename: "",
              },
            },
          })
        }
        else if (itemMain.type == 'img-txt') {
          this.dataList.push({
            mainType: "img-txt",
            wenzimain: '',
            image: {
              uploadFilePath: '',
              imgmain: "",
              dialogVisible: false,
              disabled: false,
              num: 1,
              file: {
                refilepath: "",
                size: "",
                filename: "",
              },
            },
            imgText: {
              // text:itemMain.text,
              text: JSON.parse(itemMain.text).text,
              desc: JSON.parse(itemMain.text).desc,
              title: JSON.parse(itemMain.text).title,
              imgUrl: JSON.parse(itemMain.text).imgUrl
            },
            pdf: {
              uploadFilePath: [],
              disabled: false,
              num: "",
              file: {
                refilepath: "",
                size: "",
                filename: "",
              },
            },
            video: {
              uploadFilePath: [],
              dialogvideoimgUrl: "",
              dialogVisible: false,
              disabled: false,
              num: "",
              file: {
                videoImg: '',
                refilepath: "",
                size: "",
                filename: "",
              },
            },
          })
        }
        else if (itemMain.type == 'image') {
          this.dataList.push({
            mainType: "image",
            wenzimain: "",
            image: {
              uploadFilePath: [itemMain],
              imgmain: "",
              dialogVisible: false,
              disabled: false,
              num: 1,
              file: {
                fileid: itemMain.fileid,
                filename: itemMain.text,
                filetype: itemMain.type,
                refilepath: itemMain.dispath
              },
            },
            imgText: {
              text: "",
              desc: "",
              title: "",
              imgUrl: "",
            },
            pdf: {
              uploadFilePath: [],
              disabled: false,
              num: "",
              file: {
                refilepath: "",
                size: "",
                filename: "",
              },
            },
            video: {
              uploadFilePath: [],
              dialogvideoimgUrl: "",
              dialogVisible: false,
              disabled: false,
              num: "",
              file: {
                videoImg: '',
                refilepath: "",
                size: "",
                filename: "",
              },
            },
          })
        }
        else if (itemMain.type == 'pdf') {
          this.dataList.push({
            mainType: "pdf",
            wenzimain: "",
            image: {
              uploadFilePath: [],
              imgmain: "",
              dialogVisible: false,
              disabled: false,
              num: "",
              file: {
                refilepath: "",
                size: "",
                filename: "",
              },
            },
            imgText: {
              text: "",
              desc: "",
              title: "",
              imgUrl: "",
            },
            pdf: {
              uploadFilePath: [itemMain],
              disabled: false,
              num: 1,
              file: {
                fileid: itemMain.fileid,
                filename: itemMain.text,
                filetype: itemMain.type,
                refilepathY: itemMain.dispath,
                refilepath: "https://crm.meihualife.com/images/pdf.jpg"
              },
            },
            video: {
              uploadFilePath: [],
              dialogvideoimgUrl: "",
              dialogVisible: false,
              disabled: false,
              num: "",
              file: {
                videoImg: '',
                refilepath: "",
                size: "",
                filename: "",
              },
            },
          },)
        }
        else if (itemMain.type == 'video') {

          this.getvideoImg("https://crm.meihualife.com/" + itemMain.dispath, itemMain, function (videoImg, itemMain) {
            _this.dataList.push({
              mainType: "video",
              wenzimain: "",
              image: {
                uploadFilePath: [],
                imgmain: "",
                dialogVisible: false,
                disabled: false,
                num: "",
                file: {
                  refilepath: "",
                  size: "",
                  filename: "",
                },
              },
              imgText: {
                text: "",
                desc: "",
                title: "",
                imgUrl: "",
              },
              pdf: {
                uploadFilePath: [],
                disabled: false,
                num: "",
                file: {
                  refilepath: "",
                  size: "",
                  filename: "",
                },
              },
              video: {
                uploadFilePath: [itemMain],
                dialogvideoimgUrl: "",
                dialogVisible: false,
                disabled: false,
                videoImg: videoImg,
                num: 1,
                file: {
                  fileid: itemMain.fileid,
                  filename: itemMain.text,
                  filetype: itemMain.type,
                  refilepath: itemMain.dispath
                },
              },
            },)
          })
        }
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
  },
};
</script>
<style src="../../../static/css/insuranceProducts.css"></style>
<style src="../../../static/css/myFonts/iconfont.css"></style>
<style scoped>
.scriptLibrary {
}

.eltabs {
  padding: 0rem 0.3rem 0rem;
  font-size: 0.36rem;
  /* border-bottom: 0.1rem solid rgba(244, 244, 244, 1); */
}

.teamLanguage,
.personLanguage {
  /* padding: 0rem 0.3rem 0.3rem; */
  display: flex;
  border: 0.3rem solid rgba(244, 244, 244, 1);
  border-top: 0;
}
.teamLanguage {
}

.mainBox {
  background: #fff;
  padding: 0.2rem;
  margin-top: 10px;
}

.titleBox {
  background: #fff;
  padding: 0.2rem;
  /* margin-top: 10px; */
}

::v-deep .el-dialog__body {
  padding: 10px 20px 20px;
  background: #fafafa;
}

.newAdd {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0.2rem 0.3rem;
  border: 0.3rem solid #f5f5f5;
  border-bottom: 2px solid #f5f5f5;
}

.addpatter {
  padding-right: 0.3rem;
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
}

.teamMain,
.personMain {
  width: 82%;
  height: calc(100vh - 3rem);
  /* border: 1px solid #909399; */
  position: relative;
  padding: 0;
  border-left: 0.2rem solid #f5f5f5;
  overflow: auto;
}

::v-deep .el-input__inner {
  /* -webkit-appearance: none; */
  background-color: #fff;
  /* border-radius: 4px; */
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
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
  background: #fafafa;
}

.listMain {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.listMainbox {
  margin-top: 0.15rem;
  background: #fafafa;
  padding: 0.1rem;
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
  font-size: 0.18rem;
}

::v-deep .el-tree-node__content {
  height: 0.45rem;
}

::v-deep .select-content .el-dropdown-inners > span {
  width: auto;
}

::v-deep .el-cascader {
  width: 100%;
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
</style>

<style>
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
}
.groupLeft button {
  border: 0px solid red;
  color: #b9bfc3;
}
.groupLeft button:hover {
  color: #b9bfc3;
}
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
}
.huashuMain p {
  text-align: left;
  margin-bottom: 0.1rem;
  /* width: 200px; */
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
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
</style>
