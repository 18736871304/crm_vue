<template>
  <div class="scriptLibrary">
    <!-- <div class="eltabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-if="isLeader =='Y'" label="团队话术" name="01"></el-tab-pane>
        <el-tab-pane label="个人话术" name="02"></el-tab-pane>
      </el-tabs>
    </div> -->

    <div class="search-header" style="padding: 0">
      <div class="search-box clearfix">
        <el-tabs class="nav" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-if="isLeader =='Y'" label="团队话术" name="01"></el-tab-pane>
          <el-tab-pane label="个人话术" name="02"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div>
      <div class="newAdd">
        <div class="addpatter" @click="dialoghuashu = true">
          <div> + 新建</div>
        </div>
        <div class="search-box clearfix" style="display: block;">

          <!-- <div class="fr"  > -->
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
                    <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="my_sureOne2">取消</div>
                    <div class="my-sure" @click="my_sure2">确定</div>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="common-select" v-if="dis_P4_up&& activeName=='02'">
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
              <el-input class="el-input-inners" v-model="huashuCon" size="mini" placeholder="请输入关键字" clearable></el-input>
            </div>
          </div>

          
          <div class="common-select" v-show="dis_P4_up"></div>


          <div class="common-select" v-show="dis_P4_up&& activeName=='01'"></div>



          <div class="common-select" style="width: 4%;">
            <div class="search-btn searchLeft" @click="getAllTalkTempleteGroup()">搜索</div>
            <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);display: none;" @click="reset">重置</div>
          </div>

        </div>
      </div>

    </div>

    <div class="teamLanguage">
      <div class="productList" v-loading="loading">

        <div class="addgroup" @click="dialogGroup = true">
          <i class="el-icon-circle-plus"></i>
          <p>添加分组</p>
        </div>

        <el-tree style=" padding-top: 0rem;" :data="options" :props="GroupdefaultProps" node-key="id" :default-checked-keys="[1]" :expand-on-click-node="false" ref="tree" @node-click="handleNodeClick" :highlight-current="true" :default-expand-all='false'>
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="tree-lable">{{ data.groupname }} <span v-if="data.child">（{{ data.child.length}}）</span> </span>
            <span class="groupLeft">
              <div type="text" size="mini" class="crty">
                <el-popover placement="right" trigger="hover" popper-class="groupPopover">
                  <ul class="groupTan">
                    <li @click.prevent="modifyGroup(data)">编辑</li>
                    <li @click.prevent="deleteGroup(data)">删除</li>
                    <li @click.prevent="groupUp(data)">上移</li>
                    <li @click.prevent="groupDown(data)">下移</li>
                  </ul>
                  <!-- 下面是显示在树形控件的元素 -->
                  <i slot="reference" class="el-icon-more"></i>

                </el-popover>
              </div>
            </span>
          </span>
        </el-tree>

      </div>

      <div class="teamMain table-box">
        <el-table :data="speechList" border style="width: 100%">
          <el-table-column key="2" align="center" label="话术内容" width="auto">
            <template slot-scope="scope">
              <!-- <div v-for=" (item,index) in scope.row.talkContent" :key='index'>
               
                <div class='msgText' v-if="item.type=='text'">
                  <p class=' ' v-html="item.text"> </p>
                  <div class='zhedi e' @click='openSmall(item)'>
                    <span>展开</span>
                    <i class='el-icon-arrow-down'></i>
                  </div>
                </div>

                <div class='img_text' v-if="item.type=='img-txt'">
              
                  <img :src='JSON.parse(item.text).imgUrl' alt=''>
                  <div class='imgTxt'>
                    <p> {{JSON.parse(item.text).title}} </p>
                    <p> {{JSON.parse(item.text).desc}}</p>
                  </div>
                </div>

                <div class='img_text'  v-if="item.type=='image'">
                  {{ item .dispath}}
                   <img src='https://crm.meihualife.com'+item.dispath  alt=''>
                  <p>{{item.text}} </p>
                </div>

              </div> -->
              <div v-html="scope.row.main" :class="['huashuMain', {'unhuashuMain':scope.row.isopen==true}]"></div>
              <div class='zhedie' @click="open(scope.row)" v-if="!scope.row.isopen"> <span>展开</span>&nbsp;<i class='el-icon-arrow-down'></i>&nbsp;共{{ (scope.row.talkContent).length }}条</div>
              <div class='zhedie' @click="open(scope.row)" v-else><span>收起</span>&nbsp;<i class='el-icon-arrow-up'></i>&nbsp;共{{ (scope.row.talkContent).length }}条 </div>

            </template>
          </el-table-column>
          <el-table-column key="3" align="center" prop="title" label="话术标题" width="120">
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
          <!-- <el-table-column key="8" v-if="activeName=='01'" align="center" prop="teampermission_names" label="使用团队" width="120">
          </el-table-column> -->
          <el-table-column key="9" align="center" label="操作" width="220">
            <template slot-scope="scope">
              <a class="edit option" href="javascript:void(0);" @click="showEditPopup(scope.row)">编辑</a>
              <a class=" declet" href="javascript:void(0);" @click="deletePopup(scope.row)">删除</a>
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

    <el-dialog :title="digTitle" :visible.sync="dialoghuashu" width="1100px" :before-close="data_cencle" :close-on-click-modal="false" append-to-body>
      <div v-loading="addloading">

        <div class="titleBox">
          <div class="selectMain">
            <p>分组</p>
            <div class="block">
              <el-cascader v-model="groupValue" :options="options" :props="newDefaultProps" @change="handleChange" placeholder="请选择分组" popper-class="changeSize" clearable></el-cascader>
            </div>
          </div>
          <div class="selectMain">
            <p>标题</p>
            <el-input class="block" v-model="titleCon" placeholder="请输入内容"></el-input>
          </div>

          <!-- <div class="selectMain" v-if="activeName=='01'">
            <p>话术权限</p>
            <div class="select-content block">
              <el-dropdown trigger="click" style="width: 100%" placement="bottom" ref="disTeam">
                <p class="el-dropdown-inners" clearable>
                  <span>{{ teamNames }}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu class="asd" slot="dropdown">
                  <el-tree @check="checkTeam" :data="teamDataList" ref="tree" show-checkbox node-key="id" :default-checked-keys="teamIdCheck" :props="defaultProps"> </el-tree>
                  <div class="sure-footer">
                    <div class="my-sure cancel" @click="team_cancel()">取消</div>
                    <div class="my-sure" @click="team_sure()">确定</div>

                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div> -->

        </div>

        <div v-for="(item, index) in dataList" :key="index">
          <div class="mainBox">
            <div class="listMain">
              <div>内容{{ index + 1 }}</div>

            </div>

            <el-tabs class="zhongjiantab" v-model="item.mainType" @tab-click="mainClick">
              <el-tab-pane label="文字" name="text">
                <div class="listMainbox">
                  <el-input type="textarea" autosize placeholder="在此输入回复内容" v-model="item.wenzimain" style="min-height: 120px;"> </el-input>
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
                      (file) => { return imgSaveToUrl(file, index); } " :class="item.image.num == '1' ? 'jinyong' : ''">
                      <i slot="default" class="el-icon-plus"></i>

                      <div slot="file" slot-scope="{ file }">
                        <img class="el-upload-list__item-thumbnail" :src="'https://crm.meihualife.com/'+item.image.file.refilepath" alt="" />
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
                    <div class="imgNameSize" v-else>
                      <p>*文件需在10M以内</p>
                    </div>
                    <el-dialog :visible.sync="item.image.dialogVisible" append-to-body>
                      <img width="100%" :src="'https://crm.meihualife.com/'+item.image.file.refilepath" alt="" />
                    </el-dialog>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane label="图文" name="img-txt">
                <div class="listMainbox">
                  <div class="selectMain mainleft">
                    <p>图文地址</p>
                    <el-input placeholder="请输入内容" @input="imgTextSelect(item,index)" v-model="item.imgText.text" clearable> </el-input>
                  </div>
                  <div class="selectMain mainleft" v-if="item.imgText.title">
                    <p>图文标题</p>
                    <el-input v-model="item.imgText.title" placeholder="请输入标题内容"></el-input>
                  </div>

                  <div v-if="item.imgText.title">
                    <div class="selectMain DescTitle">
                      <div class="imgupload">
                        <el-upload accept="image/*" action="#" ref="imgupload" list-type="picture-card" :auto-upload="false" :limit="1" :file-list="item.imgText.uploadFilePath" :on-change="
                       (file) => { return imgTextSaveToUrl(file,index); } " :class="item.imgText.num =='1' ? 'pdfjinyong' : ''">
                          <i slot="default" class="el-icon-plus"></i>

                          <div slot="file" slot-scope="{ file }">
                            <img class="el-upload-list__item-thumbnail" v-if="item.imgText.imgUrl.slice(0, 13) == 'crmfileupload'" :src="'https://crm.meihualife.com/'+item.imgText.imgUrl" alt="" />
                            <img class="el-upload-list__item-thumbnail" v-else :src="item.imgText.imgUrl" alt="" />
                            <span class="el-upload-list__item-actions">
                              <span class="el-upload-list__item-preview" @click="handleimgTextview(item,index)">
                                <i class="el-icon-zoom-in"></i>
                              </span>
                              <span v-if="item.imgText.num!=''" class="el-upload-list__item-delete" @click="handleimgTextRemove(item,index)">
                                <i class="el-icon-delete"></i>
                              </span>
                            </span>
                          </div>
                        </el-upload>
                        <el-dialog :visible.sync="item.imgText.dialogVisible" append-to-body>
                          <img width="100%" v-if="item.imgText.imgUrl.slice(0, 13) == 'crmfileupload'" :src="'https://crm.meihualife.com/'+item.imgText.imgUrl" alt="" />
                          <img width="100%" v-else :src="item.imgText.imgUrl" alt="" />
                        </el-dialog>
                      </div>
                      <el-input type="textarea" :rows="2" placeholder="请输入图文详情" class=" block_desc" v-model="item.imgText.desc">
                      </el-input>
                    </div>

                  </div>

                </div>
              </el-tab-pane>

              <el-tab-pane label="PDF" name="pdf">
                <div class="listMainbox">
                  <div style="margin-bottom: 0.15rem">

                    <div class="selectMain mainleft">
                      <p>PDF标题</p>
                      <el-input placeholder="请输入内容" v-model="item.pdf.file.filename" clearable> </el-input>
                    </div>
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
                        <!-- <p>{{ (item.pdf.file.size / 1048576).toFixed(2) }}M</p> -->
                      </div>
                      <div class="pdfNameSize" v-else>
                        <p>*文件需在10M以内</p>
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
                        <!-- <p>{{ (item.video.file.size / 1048576).toFixed(2) }}M {{ item.video.dialogVisible }}</p> -->
                      </div>
                      <div class="pdfNameSize" v-else>
                        <p>*文件需在10M以内</p>
                      </div>

                      <el-dialog :visible.sync="item.video.dialogVisible" append-to-body>
                        <video :src="item.video.file.refilepath" controls class="videoUrl"></video>
                      </el-dialog>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
            <div class="listDelete" @click="clickDelete(index)">
              <i class="el-icon-delete"></i>
            </div>

            <div class="listDelete" @click="clickup(index)">
              <i class="el-icon-upload2"></i>
            </div>
            <div class="listDelete" @click="clickDown(index)">
              <i class="el-icon-download"></i>
            </div>

          </div>
        </div>

        <div @click="addmain" class="addTemplate">
          <p><i class="el-icon-circle-plus-outline"></i> 添加内容</p>
          <p>（ 添加多个内容可以一键发送 ）</p>
        </div>

        <span slot="footer" class="dialog-footer">
          <div class="my-sure cancel" @click="data_cencle">取 消</div>
          <div class=" my-sure" type="primary" @click="data_sure">确 定</div>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="新建分组" :visible.sync="dialogGroup" width="30%" :before-close="handleClose" :close-on-click-modal="false" append-to-body>
      <div class="titleBox">
        <div class="groupBox">
          <p>分组名称</p>
          <div class="block">
            <el-select v-model="groupName" @change="selectValue()" filterable allow-create default-first-option placeholder="请输入分组名称">
              <el-option v-for="item in groupOptions" :key="item.groupid" :label="item.groupname" :value="item.groupname">
              </el-option>
            </el-select>

          </div>
        </div>
        <div class="groupBox">
          <p>子分组名称</p>
          <div class="block">
            <el-input placeholder="请输入子分组名称" v-model="subgroupName" clearable> </el-input>
          </div>
        </div>

        <div class="groupBox" v-if="activeName=='01' && addquxian">
          <p>话术权限</p>
          <div class="select-content block">
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

    <el-dialog title="修改分组" :visible.sync="modifydialogGroup" width="30%" :before-close="handleClose" :close-on-click-modal="false" append-to-body>
      <div class="titleBox">
        <div class="groupBox">
          <p>分组名称</p>
          <div class="block">
            <el-input placeholder="请输入分组名称" v-model="modifygroupName" clearable> </el-input>
          </div>
        </div>

        <div class="groupBox" v-if=" modifyChild">
          <p>话术权限</p>
          <div class="select-content block">
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
          <div class="my-sure cancel" @click="modifydiaCancelGroup()">取 消</div>
          <div class="my-sure" type="primary" @click="modifygroup_sure()">确 定</div>
        </span>
      </div>

    </el-dialog>

    <el-dialog title="提示" :visible.sync="deldialogVisible" width="25%" :before-close="handleClose">
      <span>确认删除此话术吗？</span>
      <span slot="footer" class="dialog-footer">
        <div @click="deldialogVisible = false" class="cancel my-sure">取 消</div>
        <div type="primary" @click="delItemhuashu" class="my-sure">确 定</div>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="deldiaGroup" width="25%" :before-close="handleClose">
      <span>确认删除此分组吗？</span>
      <span slot="footer" class="dialog-footer">
        <div @click="deldiaGroup = false" class="cancel my-sure">取 消</div>
        <div type="primary" @click="delGrouphuashu()" class="my-sure">确 定</div>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import api from "../../utils/api";
import $ from "jquery";
import "../../static/js/viewer-jquery.min.js";
import "../../static/css/viewer.min.css";
import { getData, getPhoneData, my_url } from "../../static/js/ajax.js";
// import { Loading } from "element-ui";
export default {
  data() {
    return {
      delGroup: "",
      deldiaGroup: false,

      delitem: '',
      deldialogVisible: false,
      // 筛选
      huashuCon: '',
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

      digTitle: '新建 - 团队话术',
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
      InitteamNames: '',
      // 新建分组
      addquxian: false,//判断新建一级分组还是二级分组
      dialogGroup: false,
      groupName: "",
      groupOptions: [],
      subgroupName: "",
      // 编辑分组
      modifyGroupData: '',//储存要修改的内容
      modifydialogGroup: false,
      modifygroupName: '',
      modifyChild: false,//判断是否是二级分组


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
            num: "",
            uploadFilePatht: [],
            dialogVisible: false,
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
      teamDataList1: [],
      teamid: "",
      myList: ''
    };
  },

  mounted() {
    this.teamLedar()
    this.yewu();
    // window.openSmall = this.openSmall;
  },
  watch: {

  },
  methods: {
    // 重置筛选项
    reset() {
      this.my_sureOne2();
      this.overviewForm = {
        teamid: '',
        userid: '',
        startDate: '',
        endDate: '',
        time: '1'
      }
      this.huashuCon = ''
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
      this.getAllTalkTempleteGroup();
      this.userNameOptions = ''
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
      if (this.activeName == '02') {
        this.options = []
        this.speechList = []
        this.$message({
          type: "info",
          duration: 2000,
          message: '请选择业务员！',
        });
      } else {
        this.getAllTalkTempleteGroup();
      }

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
      if (this.overviewForm.userid == '') {
        this.options = []
        this.speechList = []
        this.$message({
          type: "info",
          duration: 2000,
          message: '请选择业务员！',
        });
        return
      }
      this.getAllTalkTempleteGroup()
      // this.search();
      // this.refresh();
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
          _this.getAllTalkTempleteGroup()
          _this.isLeader = data.isLeader
        }

      })
    },

    // 选择团队话术或者个人话术
    handleClick(tab, event) {
      this.digTitle = '新建 - ' + tab._props.label
      this.options = []
      this.groupOptions = []
      this.speechList = []
      // this.getAllTalkTempleteGroup()
      this.reset()
    },
    // 查询分组
    getAllTalkTempleteGroup() {
      this.loading = true
      var _this = this
      var params = {
        grouptype: this.activeName,
        text: this.huashuCon
      }
      if (this.activeName == '01' && this.overviewForm.teamid != '') {
        params['teamIdStr'] = this.overviewForm.teamid
      }
      if (this.activeName == '02' && this.overviewForm.userid != '') {
        params['userIdStr'] = this.overviewForm.userid
      }
      if (this.activeName == '02' && this.overviewForm.teamid != '' && this.overviewForm.userid == '') {
        this.loading = false
        return
      }


      api.getAllTalkTempleteGroup(params).then((data) => {
        if (data.code == '0') {
          _this.options = data.talkTempleteGroup
          _this.groupOptions = data.talkTempleteGroup
          if (data.talkTempleteGroup[0]) {
            _this.handleNodeClick(data.talkTempleteGroup[0])
          }

        } else {
          if (data.msg == '还没有定义话术组') {

            _this.options = []
            _this.speechList = []

          } else {
            _this.$message({
              type: "error",
              duration: 2000,
              message: data.msg,
            });
          }

        }
        this.loading = false
      })
    },


    selectValue(event) {
      var parms = {
        upgroupid: "",
        groupname: this.groupName,
        grouptype: this.activeName,
        groupclass: '01',
      }
      for (var i = 0; i < this.groupOptions.length; i++) {
        if (this.groupOptions[i].groupname == this.groupName) {
          parms.upgroupid = this.groupOptions[i].groupid
          parms.groupname = this.subgroupName
        }
      }
      if (parms.upgroupid != '') {
        this.addquxian = false
      } else {
        this.addquxian = true
      }
      this.team_cancel()
    },
    // 确认添加分组
    group_sure() {
      var _this = this
      var parms = {
        upgroupid: "",
        groupname: this.groupName,
        grouptype: this.activeName,
        groupclass: '01',
      }
      for (var i = 0; i < this.groupOptions.length; i++) {
        if (this.groupOptions[i].groupname == this.groupName) {
          parms.upgroupid = this.groupOptions[i].groupid
          parms.groupname = this.subgroupName
        }
      }
      if (_this.activeName == '01' && parms.upgroupid == '') {
        parms['teampermission'] = this.quanxian
      }
      if (parms.upgroupid != '' && parms.groupname == '') {
        _this.$message({
          type: "error",
          duration: 2000,
          message: "请填写子分组名称！",
        });
        return
      }
      api.addTalkTempleteGroup(parms).then((data) => {
        if (data.code == '0') {
          if (parms.upgroupid == '') {
            if (_this.subgroupName == '') {
              _this.$message({
                type: "error",
                duration: 2000,
                message: "请填写子分组名称！",
              });
              return
            }

            if (_this.quanxian == '' && _this.activeName == '01') {
              _this.$message({
                type: "error",
                duration: 2000,
                message: "请填写分组权限！",
              });
              return
            }
            var dd = {
              upgroupid: data.groupid,
              groupname: _this.subgroupName,
              grouptype: _this.activeName,
              groupclass: '01',
            }
            api.addTalkTempleteGroup(dd).then((data) => {
              if (data.code == '0') {
                _this.dialogGroup = false
                _this.$message({
                  type: "success",
                  duration: 3000,
                  message: "新建成功！",
                });
                _this.subgroupName = ''
                _this.groupName = ''
                _this.team_cancel()
                _this.getAllTalkTempleteGroup()
              }

            })
          } else {
            _this.dialogGroup = false
            _this.$message({
              type: "success",
              duration: 2000,
              message: "新建成功！",
            });
            _this.subgroupName = ''
            _this.groupName = ''
            _this.team_cancel()
            _this.getAllTalkTempleteGroup()
          }
        }
      });



    },
    // 取消添加分组
    group_cencle() {
      this.groupName = ''
      this.subgroupName = ''
      this.modifygroupName = ''
      this.team_cancel()
      this.dialogGroup = false
    },
    modifydiaCancelGroup() {
      this.groupName = ''
      this.subgroupName = ''
      this.modifygroupName = ''
      this.team_cancel()
      this.modifydialogGroup = false
    },

    // 打开修改分组弹窗
    modifyGroup(data) {
      this.modifygroupName = data.groupname
      this.quanxian = data.teampermission
      if (data.child && this.activeName == '01') {
        this.modifyChild = true
        if (data.teampermission) {
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys((data.teampermission).split(','));
          })
          this.teamNames = data.teampermission_names
        }
      } else {
        this.modifyChild = false

      }
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
      if (this.activeName == '01' && this.modifyChild) {
        parms['teampermission'] = this.quanxian
      }

      if (this.modifyGroupData.upgroupid) {
        parms['upgroupid'] = this.modifyGroupData.upgroupid
      } else {
        parms['upgroupid'] = ''
      }
      if (parms.teampermission == '') {
        _this.$message({
          type: "error",
          duration: 2000,
          message: "请选择话术权限！",
        });
        return
      }

      api.modifyTalkTempleteGroup(parms).then((data) => {
        if (data.code == '0') {
          _this.modifydialogGroup = false
          _this.$message({
            type: "success",
            duration: 2000,
            message: "修改成功!",
          });
          _this.team_cancel()
          _this.getAllTalkTempleteGroup()
        }
      })
    },

    // 删除分组
    deleteGroup(data) {
      this.delGroup = data
      this.deldiaGroup = true
    },
    delGrouphuashu() {
      var _this = this
      var parms = {
        groupid: this.delGroup.groupid
      }
      api.deleteTalkTempleteGroup(parms).then((data) => {
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "删除成功!",
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
          uploadFilePatht: [],
          dialogVisible: false,
          num: "",
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

          if (fileType == "imgText") {
            _this.dataList[index][fileType].imgUrl = _this.dataList[index][fileType].file.refilepath
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

    clickDelete(data) {
      if (this.dataList.length > 1) {
        let copiedArr = [...this.dataList]; // 复制数组
        copiedArr.splice(data, 1); // 从索引1开始，删除1个元素
        this.dataList = copiedArr;
      } else {
        this.$message({
          message: "最少保留一条话术！",
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
            this.dataList[index].imgText.num = 1
            this.dataList[index].imgText.uploadFilePath = [{
              text: item.imgText.text,
              desc: data.description != '' && data.description ? data.description : '详细介绍',
              title: data.title != '' && data.title ? data.title : '链接',
              imgUrl: data.imageurl != '' && data.imageurl ? data.imageurl : "https://assets.weibanzhushou.com/default-cover.png"
            }]
          }
        })
      } else {
        console.log("地址输入错误");
      }
    },



    // 删除上传图文img
    handleimgTextRemove(file, index) {
      let filelist = this.$refs.imgupload[index].uploadFiles;
      let indexaa = filelist.findIndex((fileItem) => {
        return fileItem.uid === file.uid;
      });
      filelist.splice(indexaa, 1);
      this.dataList[index].imgText.file = {};
      this.dataList[index].imgText.imgUrl = "";
      this.dataList[index].imgText.num = "";
      this.dataList[index].imgText.uploadFilePath = [];
      this.dataList[index].imgText.dialogVisible = false;
    },
    // 上传图文封面
    imgTextSaveToUrl(file, index) {
      this.uploadfile(file.raw, "imgText", index);

    },
    // 放大图片
    handleimgTextview(file, index) {
      this.dataList[index].imgText.dialogVisible = true;
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
          num: "",
          uploadFilePatht: [],
          dialogVisible: false,
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
      if (this.activeName == '01') {
        this.digTitle = "新建 - 团队话术"
      } else {
        this.digTitle = "新建 - 个人话术"
      }
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
              text: (dataList[i][dataList[i].mainType].file.filename).replace(" ", ""),
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
          message: '请填写分组！',
        });
        _this.addloading = false
        return
      }

      if (arr.length <= 0) {
        this.$message({
          type: "error",
          duration: 2000,
          message: '请填写话术内容后再提交！',
        });
        _this.addloading = false
        return
      }
      var params = {
        groupid: this.groupValue[1],
        title: this.titleCon,
        // teampermission: this.quanxian,
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
              message: "新建话术成功！",
            });
            _this.dialoghuashu = false
            _this.getAllTalkTempleteGroup()
            _this.data_cencle()
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
            message: '请检查内容，文字中不允许有表情和颜文字！',
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
            message: "修改成功！",
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
        content: this.huashuCon,
        pageNumber: 1,
        pageSize: 1000,
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

                  var srcUrl = objdata.imgUrl
                  if (srcUrl.slice(0, 13) == 'crmfileupload') {
                    srcUrl = 'https://crm.meihualife.com/' + srcUrl
                  }

                  dd += "<div class ='img_text'> <img src='" + srcUrl + "' alt=''>  <div class ='imgTxt'>  <p>" + objdata.title + "</p><p>" + objdata.desc + "</p> </div></div>  </div>"
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
      if (this.activeName == '01') {
        this.digTitle = '编辑 - 团队话术'
      } else {
        this.digTitle = '编辑 - 个人话术'
      }

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
      this.dataList = []
      for (var i = 0; i < item.talkContent.length; i++) {

        var itemMain = item.talkContent[i]
        if (itemMain.type == 'video') {
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
                num: "",
                uploadFilePatht: [],
                dialogVisible: false,
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
                  filename: (itemMain.text).replace(" ", ""),
                  filetype: itemMain.type,
                  refilepath: itemMain.dispath
                },
              },
            },)
          })
        }
        else if (itemMain.type == 'text') {
          var dd = ((itemMain.text).replace(/<br>/g, '\n'))
          this.dataList.push({
            mainType: "text",
            wenzimain: dd.replace(new RegExp(/&nbsp;/g), ' '),
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
              num: "",
              uploadFilePatht: [],
              dialogVisible: false,
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
              uploadFilePath: [],
              imgmain: "",
              dialogVisible: false,
              disabled: false,
              num: '',
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
              imgUrl: JSON.parse(itemMain.text).imgUrl,
              num: 1,
              uploadFilePath: [{
                text: (JSON.parse(itemMain.text).title).replace(" ", ""),
                desc: JSON.parse(itemMain.text).desc,
                title: (JSON.parse(itemMain.text).title).replace(" ", ""),
                imgUrl: JSON.parse(itemMain.text).imgUrl,
              }],
              dialogVisible: false,
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
                filename: (itemMain.text).replace(" ", ""),
                filetype: itemMain.type,
                refilepath: itemMain.dispath
              },
            },
            imgText: {
              text: "",
              desc: "",
              title: "",
              imgUrl: "",
              num: "",
              uploadFilePatht: [],
              dialogVisible: false,
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
              num: "",
              uploadFilePatht: [],
              dialogVisible: false,
            },
            pdf: {
              uploadFilePath: [itemMain],
              disabled: false,
              num: 1,
              file: {
                fileid: itemMain.fileid,
                filename: (itemMain.text).replace(" ", ""),
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

      }

    },

    deletePopup(item) {
      this.delitem = item
      this.deldialogVisible = true
    },
    delItemhuashu() {
      var _this = this
      var params = {
        itemid: this.delitem.itemid
      }
      api.deleteTalkTempleteContent(params).then((data) => {
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "删除成功！",
          });
          _this.deldialogVisible = false
          _this.handleNodeClick(_this.selectTree)
        } else {
          _this.$message({
            type: "error",
            duration: 2000,
            message: data.msg,
          });
          _this.deldialogVisible = false
        }
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

      if (this.teamIdCheck[0] != '') {
        this.myList = this.InitteamNames
        this.teamListId = this.teamIdCheck[0]
        this.quanxian = this.teamIdCheck[0]
        if (this.addquxian) {
          this.$refs.tree.setCheckedKeys(this.teamIdCheck)
        }
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
        }
      });
    },


    open(data) {
      var speechList = this.speechList
      speechList.forEach(item => {
        if (item.itemid == data.itemid) {
          item.isopen = !item.isopen
        }
      })

    },

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
    itemUp(data) {
      var _this = this
      var params = {
        itemid: data.itemid,
        // groupid:data.groupid
      }
      api.itemUp(params).then((data) => {
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "上移成功！",
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
      var _this = this
      var params = {
        itemid: data.itemid,
        // groupid:data.groupid
      }
      api.itemDown(params).then((data) => {
        if (data.code == '0') {
          _this.$message({
            type: "success",
            duration: 2000,
            message: "下移成功！",
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





    clickDown(index) {

      var arr = ["image", "imgText", "mainType", "pdf", "video", "wenzimain"]
      if (index + 1 < this.dataList.length) {
        for (let i = 0; i < arr.length; i++) {
          var item = this.dataList[index][arr[i]];
          this.dataList[index][arr[i]] = this.dataList[index + 1][arr[i]];
          this.dataList[index + 1][arr[i]] = item;
        }

      } else {
        this.$message({
          type: "error",
          duration: 2000,
          message: '已经是最下面的一个了！',
        });
      }


    },
    clickup(index) {
      var arr = ["image", "imgText", "mainType", "pdf", "video", "wenzimain"]
      if (index > 0) {
        for (let i = 0; i < arr.length; i++) {
          var item = this.dataList[index][arr[i]];
          this.dataList[index][arr[i]] = this.dataList[index - 1][arr[i]];
          this.dataList[index - 1][arr[i]] = item;
        }
      } else {
        this.$message({
          type: "error",
          duration: 2000,
          message: "已经是最上面的一个了！",
        });

      }
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
  height: 28px;
  line-height: 28px;
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
  border: 1px solid rgba(216, 216, 216, 1);
}
.listDelete {
  cursor: pointer;
  line-height: 40px;
  margin-left: 0.1rem;
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

.updown .el-button:hover {
  border-color: #bdbdbd;
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
.recordFile img {
  width: 0.6rem;
  height: 0.6rem;
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
  margin-bottom: 0.2rem;
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
  padding-bottom: 0.1rem;
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
.imgTxt p:last-child {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
  margin-left: 0.1rem;
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

.updown {
  margin: 0 0.15rem;
}

.mainleft p {
  text-align: left;
}

.mainleft {
  margin-bottom: 0.08rem;
}
</style>


<style>
.img_text {
  display: flex;
  align-items: center;
  margin-bottom: 0.1rem;
}
.img_text img,
.img_text video {
  width: 0.6rem;
  height: 0.6rem;
}
.img_text p {
  margin-left: 0.1rem;
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
.FileTitle {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
.imgTxt p:last-child {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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

.groupBox {
  display: flex;
  align-items: center;
}
.groupBox p {
  text-align: right;
  width: 0.75rem;
  margin-right: 0.08rem;
  font-size: 0.14rem;
}
.groupBox .block {
  width: 75%;
}
</style>