<template>

  <div class="scriptLibrary">
    <div class="eltabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="团队话术" name="first"></el-tab-pane>
        <el-tab-pane label="个人话术" name="second"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="newAdd">
      <div class="addpatter">
        <el-button plain @click="newhuashu">新建话术</el-button>
      </div>
      <div class="addgroup"></div>
      <el-button plain>添加分组</el-button>
    </div>

    <!-- 团队话术 -->
    <div class="teamLanguage" v-if="activeName == 'first'">
      <div class="productList" v-loading="loading">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>

      <div class="teamMain">
        这是团队话术
      </div>
    </div>

    <!-- 个人话术 -->
    <div class="personLanguage" v-if="activeName == 'second'">
      <div class="productList" v-loading="loading">
        这是话术分组
      </div>
      <div class="personMain">
        这是个人话术
      </div>
    </div>



    <el-dialog title="新建话术" :visible.sync="dialogVisible" width="30%" :before-close="handleClose"
      :close-on-click-modal="false" append-to-body>
      <div class="titleBox">
        <div>
          <p>分组</p>
          <el-select v-model="groupValue" placeholder="请选择分组" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <p>标题</p>
          <el-input v-model="titleCon" placeholder="请输入内容"></el-input>
        </div>

        <div style="margin-top: 10px;">
          <p>话术权限</p>
          <div class="select-content">
            <el-dropdown trigger="click" style="width: 100%" placement="bottom" ref="disTeam">
              <p class="el-dropdown-inners" clearable>
                <span>{{ teamNames }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </p>
              <el-dropdown-menu class="asd" slot="dropdown">
                <el-tree @check="checkTeam" :data="teamDataList" ref="tree" show-checkbox node-key="id"
                  :default-checked-keys="[1]" :props="defaultProps">
                </el-tree>
                <div class="sure-footer">
                  <div class="my-sure" @click="team_sure()">确定</div>
                  <div class="my-sure cancel" @click="team_cancel()">取消</div>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>


      </div>
      <div v-for="(item, index) in dataList " :key="index">

        <div class="mainBox">

          <div class="listMain">
            <div>话术内容{{ index + 1 }}</div>
            <div class="listDelete" @click="clickDelete(index + 1)"><i class="el-icon-delete"></i></div>
          </div>

          <el-tabs v-model="item.mainName" @tab-click="mainClick(index + 1)">

            <el-tab-pane label="文字" name="wenzi">
              <div class="listMainbox">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4 }" placeholder="在此输入回复内容"
                  v-model="item.wenzimain">
                </el-input>
              </div>
            </el-tab-pane>

            <el-tab-pane label="图片" name="tupian">
              <div class="listMainbox">
                <div style="margin-bottom: 0.15rem;">
                  <p>名称:</p>
                  <el-input v-model="item.img.imgmain" placeholder="选填，仅内部可见，方便整理"></el-input>
                </div>
                <div class="imgupload">

                  <el-upload accept="image/*" action="#" ref="imgupload" list-type="picture-card" :auto-upload="false"
                    :limit="1" :on-change="(file) => {
        return imgSaveToUrl(file, index)
      }" :class="item.img.num == '1' ? 'jinyong' : ''">
                    <i slot="default" class="el-icon-plus"></i>

                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="item.img.dialogImageUrl" alt="">
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file, index)">
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span v-if="!item.img.disabled" class="el-upload-list__item-delete"
                          @click="handleRemove(file, index)">
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>

                  </el-upload>

                  <div class="imgNameSize" v-if="item.img.file">
                    <p>{{ item.img.file.name }}</p>
                    <p>{{ (item.img.file.size / 1048576).toFixed(2) }}M</p>
                  </div>
                  <el-dialog :visible.sync="item.img.dialogVisible" append-to-body>
                    <img width="100%" :src="item.img.dialogImageUrl" alt="">
                  </el-dialog>
                </div>
              </div>
            </el-tab-pane>


            <el-tab-pane label="图文" name="tuwen">
              <div class="listMainbox">
                <div style="margin-bottom: 0.15rem;">
                  <el-input placeholder="请输入内容" @input="imgTextSelect" v-model="item.imgText.text" clearable>
                  </el-input>
                </div>
                <div v-if="item.imgText.title">
                  <div class="recordFile">
                    <!-- <a :href="item.link_url" alt="" target="_blank"> -->
                    <div class="fileMain">
                      <span class="FileTitle">{{ item.imgText.title }}</span>
                      <span class="FileSize FileSizeleft">{{ item.imgText.desc }}</span>
                    </div>
                    <img :src="item.imgText.imgUrl" alt="">
                    <!-- </a> -->
                  </div>
                </div>
              </div>
            </el-tab-pane>





            <el-tab-pane label="PDF" name="pdf">
              <div class="listMainbox">
                <div style="margin-bottom: 0.15rem;">
                  <div class="pdfupload">

                    <el-upload accept=".pdf" action="#" ref="pdfupload" list-type="picture-card" :auto-upload="false"
                      :limit="1" :on-change="(file) => {
        return pdfSaveToUrl(file, index)
      }" :class="item.pdf.num == '1' ? 'pdfjinyong' : ''">
                      <i slot="default" class="el-icon-plus"></i>

                      <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="item.pdf.dialogpdfUrl" alt="">
                        <span class="el-upload-list__item-actions">

                          <span v-if="!item.pdf.disabled" class="el-upload-list__item-delete"
                            @click="handlepdfRemove(file, index)">
                            <i class="el-icon-delete"></i>
                          </span>
                        </span>
                      </div>

                    </el-upload>


                    <div class="pdfNameSize" v-if="item.pdf.file">
                      <p>{{ item.pdf.file.name }}</p>
                      <p>{{ (item.pdf.file.size / 1048576).toFixed(2) }}M</p>
                    </div>

                  </div>
                </div>
              </div>
            </el-tab-pane>


            <el-tab-pane label="视频" name="shipin">
              <div class="listMainbox">
                <div style="margin-bottom: 0.15rem;">
                  <div class="videoupload">

                    <el-upload accept="video/*" action="#" ref="videoupload" list-type="picture-card"
                      :auto-upload="false" :limit="1" :on-change="(file) => {
        return videoSaveToUrl(file, index)
      }" :class="item.video.num == '1' ? 'videojinyong' : ''">
                      <i slot="default" class="el-icon-plus"></i>

                      <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="item.video.dialogvideoimgUrl" alt="">
                        <span class="el-upload-list__item-actions">
                          <span class="el-upload-list__item-preview" @click="handlevideoPreview(file, index)">
                            <i class="el-icon-zoom-in"></i>
                          </span>
                          <span v-if="!item.video.disabled" class="el-upload-list__item-delete"
                            @click="handlevideoRemove(file, index)">
                            <i class="el-icon-delete"></i>
                          </span>
                        </span>
                      </div>

                    </el-upload>


                    <div class="pdfNameSize" v-if="item.video.file">
                      <p>{{ item.video.file.name }}</p>
                      <p>{{ (item.video.file.size / 1048576).toFixed(2) }}M</p>
                    </div>

                    <el-dialog :visible.sync="item.video.dialogVisible" append-to-body>
                      <video :src="item.video.dialogvideoUrl" controls class="videoUrl"></video>
                    </el-dialog>
                  </div>
                </div>
              </div>

            </el-tab-pane>
          </el-tabs>
        </div>

      </div>

      <div @click="addmain" class="addTemplate">
        <p>
          <i class="el-icon-circle-plus-outline"></i> 添加内容
        </p>
        <p>(添加多个内容可以一键发送)</p>

      </div>


      <span slot="footer" class="dialog-footer">
        <el-button @click="cencle">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
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
export default {
  data() {
    return {
      activeName: 'first',
      mainName: 'wenzi',
      loading: false,
      dialogVisible: false,
      groupValue: "",
      titleCon: '',
      dataList: [
        {
          mainName: 'tuwen',
          quanxian: '',
          wenzimain: '',
          img: {
            imgmain: '',
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            num: '',
          },
          imgText: {
            text: '',
            desc: '',
            title: "",
            imgUrl: '',
          },
          pdf: {
            dialogpdfUrl: '',
            disabled: false,
            num: '',
          },
          video: {
            dialogvideoimgUrl: '',
            dialogVisible: false,
            disabled: false,
            num: '',
            dialogvideoUrl: ''
          },

        },

      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }],
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',

        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',

        }, {
          label: '二级 2-2',

        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',

        }, {
          label: '二级 3-2',

        }]
      }, {
        label: '一级 4',
        children: [{
          label: '二级 3-1',

        }, {
          label: '二级 3-2',

        }]
      }, {
        label: '一级 5',
        children: [{
          label: '二级 3-1',

        }, {
          label: '二级 3-2',

        }]
      }, {
        label: '一级 6',
        children: [{
          label: '二级 3-1',

        }, {
          label: '二级 3-2',

        }]
      }, {
        label: '一级 7',
        children: [{
          label: '二级 3-1',

        }, {
          label: '二级 3-2',

        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
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

    }
  },


  mounted() {
    this.yewu();
  },
  methods: {


    // 上传图片

    // 删除上传
    handleRemove(file, index) {
      let filelist = this.$refs.imgupload[index].uploadFiles
      let indexaa = filelist.findIndex((fileItem) => {
        return fileItem.uid === file.uid
      })
      filelist.splice(indexaa, 1)
      delete this.dataList[index].img.file
      this.dataList[index].img.dialogImageUrl = ''
      this.dataList[index].img.num = ''
    },
    // 更换或上传图片数据
    imgSaveToUrl(file, index) {
      if (this.dataList[index].img.file) {
        delete this.dataList[index].img.file
      }
      this.dataList[index].img['file'] = file
      this.dataList[index].img.dialogImageUrl = file.url
      this.dataList[index].img.num = 1
    },

    // 放大图片
    handlePictureCardPreview(file, index) {
      this.dataList[index].img.dialogImageUrl = file.url;
      this.dataList[index].img.dialogVisible = true;



    },
    // handleDownload(file) {
    //   console.log(file);
    // },

    // 上传PDF
    pdfSaveToUrl(file, index) {
      console.log(file)
      if (this.dataList[index].pdf.file) {
        delete this.dataList[index].pdf.file
      }
      this.dataList[index].pdf['file'] = file
      // this.dataList[index].pdf.dialogpdfUrl = file.url
      // this.dataList[index].pdf.dialogpdfUrl = '../../../static/images/pdf.jpg'
      this.dataList[index].pdf.dialogpdfUrl = 'https://crm.meihualife.com/images/pdf.jpg'
      this.dataList[index].pdf.num = 1
    },
    // 删除PDF
    handlepdfRemove(file, index) {
      console.log(file)
      let filelist = this.$refs.pdfupload[index].uploadFiles
      let indexaa = filelist.findIndex((fileItem) => {
        return fileItem.uid === file.uid
      })
      filelist.splice(indexaa, 1)
      delete this.dataList[index].pdf.file
      this.dataList[index].pdf.dialogpdfUrl = ''
      this.dataList[index].pdf.num = ''
    },

    // 上传图文
    imgTextSelect(item) {
      console.log(item)
      console.log(item.length, item.substring(0, 7))
      console.log(item.length >= 7, item.substring(0, 7) == "http://")
      if (item.length >= 7 && item.substring(0, 7) == "http://") {
        console.log("地址输入正确")


      } else {
        console.log("地址输入错误")
      }

    },

    // 上传视频
    videoSaveToUrl(file, index) {
      console.log(file)

      var that = this
      if (this.dataList[index].video.file) {
        delete this.dataList[index].video.file
      }
      this.dataList[index].video['file'] = file
      this.dataList[index].video.num = 1

      // that.dataList[index].video.dialogvideoUrl = URL.createObjectURL(file.raw);

      // 获取视频封面第一帧
      const video = document.createElement("video"); // 也可以自己创建video
      video.src = file.url; // url地址 url跟 视频流是一样的
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
        let videoUrl = file.url;//file的videoUrl储存视频
        // file.url = videoFirstimgsrc; // file的url储存封面图片
        // file.videoUrl = videoUrl; // 
        console.log(videoUrl)
        that.dataList[index].video.dialogvideoimgUrl = videoFirstimgsrc
        that.dataList[index].video.dialogvideoUrl = videoUrl
        video.remove();
        canvas.remove();
      };


    },
    handlevideoRemove(file, index) {
      console.log(file)
      let filelist = this.$refs.videoupload[index].uploadFiles
      let indexaa = filelist.findIndex((fileItem) => {
        return fileItem.uid === file.uid
      })
      filelist.splice(indexaa, 1)
      delete this.dataList[index].video.file
      this.dataList[index].video.dialogvideoUrl = ''
      this.dataList[index].video.num = ''

    },

    handlevideoPreview(file, index) {
      this.dataList[index].video.dialogImageUrl = file.url;
      this.dataList[index].video.dialogVisible = true;
    },









    addmain() {
      this.dataList.push({
        mainName: 'tuwen',
        quanxian:"",
        wenzimain: '',
        img: {
          imgmain: '',
          dialogImageUrl: '',
          dialogVisible: false,
          disabled: false
        },
        imgText: {
          text: '',
          desc: '',
          title: "",
          imgUrl: '',
        },
        pdf: {
          dialogpdfUrl: '',
          num: '',
          disabled: false,
        },
        video: {
          dialogvideoimgUrl: '',
          dialogVisible: false,
          disabled: false,
          num: '',
          dialogvideoUrl: ''
        },

      })
    },
    clickDelete(data) {
      if (this.dataList.length > 1) {
        this.dataList.splice(data - 1, 1)
      } else {
        this.$message({
          message: '最少保留一条话术',
          type: 'warning'
        });
      }

    },
    mainClick(tab, event) {
      console.log(tab, event);
    },
    newhuashu() {
      this.dialogVisible = true
    },

    cencle() {
      console.log(this.dataList)
      // this.dialogVisible = false
    },

    sure() {
      console.log(this.dataList)
      // this.dialogVisible = false
    },
    handleClose(done) {
      console.log(this.dataList)
      done();

    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleClick(tab, event) {
      console.log(this.activeName)
      console.log(tab.$props.label)
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
    team_cancel(index) {
      this.$refs.disTeam.hide();
      this.myList = "";
      this.teamListId = "";
      this.teamNames = "团队选择";
      this.teamid = "";

      this.$refs.tree.setCheckedKeys([]);
      this.queryflag = true;
      this.staffValue = "";
  
      this.dataList[index].quanxian =''
      // this.searchUser(this.teamAllid)
    },

    // 确认所选团队
    team_sure(index) {
      let _this = this;
      this.$refs.disTeam.hide();
      // this.staffValue = "";
      if (this.myList == null || this.myList == "" || this.myList == "1") {
        this.queryflag = true;
        this.queryflagString = "01";
      } else {
        this.teamNames = this.myList;
        this.queryflag = false;
        this.queryflagString = "02";
      }


      console.log(index)
      console.log(this.teamListId)
      console.log(this.dataList[index].quanxian)
      this.dataList[index].quanxian = this.teamListId

      // _this.searchUser(this.teamListId, this.staffValue)
    },
    // 获取该团队权限下的员工
    yewu() {
      let _this = this;
      var idStr = ''
      api.getTalkTeamList().then((data) => {
        if (data.code == 0) {
          _this.teamDataList = data.teamList;
          for (var i = 0; i < _this.teamDataList.length; i++) {
            idStr += _this.teamDataList[i].id + ','
            if (_this.teamDataList[i].children) {
              for (var j = 0; j < this.teamDataList[i].children.length; j++) {
                idStr += _this.teamDataList[i].children[j].id + ','
                if (this.teamDataList[i].children[j].children) {
                  for (var s = 0; s < this.teamDataList[i].children[j].children.length; s++) {
                    idStr += _this.teamDataList[i].children[j].children[s].id + ','
                  }
                }
              }
            }
          }
          if (idStr != '') {
            idStr = idStr.slice(0, -1);
          }
          // 权限内的所有人员
          _this.teamAllid = idStr
          // _this.searchUser(idStr)
        }
      })

    },








  },
};
</script>
<style src="../../../static/css/insuranceProducts.css"></style>
<style src="../../../static/css/myFonts/iconfont.css"></style>
<style scoped>
.scriptLibrary {}

.eltabs {
  padding: 0rem 0.3rem 0.15rem;
  font-size: 0.36rem;
  border-bottom: 0.1rem solid rgba(244, 244, 244, 1);
}

.teamLanguage,
.personLanguage {
  padding: 0rem 0.3rem 0.3rem;
  display: flex;
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
}

.addpatter {
  padding: 0.2rem 0.3rem;
}

.newAdd .is-plain:hover {
  color: #409EFF;
  border-color: #c6e2ff;
  background: #ecf5ff;
  border: 1px solid #DCDFE6;
}

.newAdd .is-plain {
  background: #FFF;
  border: 1px solid #DCDFE6;
  color: #606266;
}

.productList {
  width: 15%;
  height: calc(100vh - 3rem);
  border: 1px solid #909399;
  position: relative;
  overflow: auto;
}

.teamMain,
.personMain {
  width: 85%;
  height: calc(100vh - 3rem);
  border: 1px solid #909399;
  position: relative;
}


::v-deep .el-input__inner {
  /* -webkit-appearance: none; */
  background-color: #FFF;
  /* border-radius: 4px; */
  border: 1px solid #DCDFE6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 35px;
  line-height: 35px;
  outline: 0;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%;
  margin-left: 0.01rem;
}

::v-deep .el-textarea__inner {
  border: 0px solid #DCDFE6;
}

::v-deep .el-input__icon {
  line-height: 35px;
}

::v-deep .el-select {
  display: block;
}

::v-deep .el-dialog__body {}

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

::v-deep .select-content .el-dropdown-inners>span {
  width: auto;
}

/* .el-tree-node .el-tree-node__content  .el-tree-node__label */
.asd .el-tree .el-tree-node .el-tree-node__content .el-tree-node__label {
  font-size: 0.14rem;
}

.select-content .el-dropdown-inners {
  border: 1px solid #DCDFE6;
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
  text-decoration: none
}

.recordFile a :hover {
  text-decoration: underline
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
</style>
