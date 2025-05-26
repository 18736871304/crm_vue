<template>
  <div style=" width: 17.1rem;">
    <div class="search-header" style="padding: 0">
      <div class="search-box clearfix">
        <el-tabs class="nav" v-model="queryParams.risktype" @tab-click="handleClick">
          <el-tab-pane label="意外" name="01"></el-tab-pane>
          <el-tab-pane label="医疗" name="02"></el-tab-pane>
          <el-tab-pane label="重疾" name="03"></el-tab-pane>
          <el-tab-pane label="定寿" name="04"></el-tab-pane>
          <el-tab-pane label="理财" name="05"></el-tab-pane>
          <el-tab-pane label="车险" name="06"></el-tab-pane>
          <el-tab-pane label="其他" name="07"></el-tab-pane>
        </el-tabs>

        <div class="common-select">
          <div class="select-title filtitle">产品名称</div>
          <div class="select-content filContent">
            <el-autocomplete class="el-input-inners" v-model="queryParams.title" :trigger-on-focus="false" :fetch-suggestions="querySearch" size="mini" placeholder="请输入选择产品名称" clearable></el-autocomplete>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title filtitle">可投保区域</div>
          <div class="select-content filContent">
            <el-select class="el-select-inners" filterable multiple collapse-tags v-model="salesArea" size="mini" placeholder="请选择可投保区域" @change="selectSalesArea">
              <el-option v-for="(item, index) in regionList" :key="index" :label="item.dd_value" :value="item.dd_key"></el-option>
            </el-select>
          </div>
        </div>
        <div class="common-select" style=" width: 4%">
          <div class="search-btn searchLeft" @click="handleSearch">搜索</div>
          <div class="search-btn" style="
              background: #fff;
              color: #dc220d;
              border: 1px solid rgba(216, 216, 216, 1); display: none;
            " @click="handleReset">
            重置
          </div>
        </div>

      </div>
    </div>
    <div class="product-list" v-loading="loading">
      <div class="product-item clearfix" v-for="item in riskList" :key="item.riskcode">
        <div class="product-item-left">
          <p class="product-item-title">
            {{ item.title }} &nbsp;&nbsp;&nbsp;&nbsp;
            <el-tag class="paragraph intpro" v-show="item.jointype == '01'" type="warning">互联网产品</el-tag>
            <el-tag class="paragraph" style="color: #578ee7" v-show="item.emailuw == 'Y'" @click="handleParagraph(item.riskcode)">人工核保</el-tag>
            <el-tag class="paragraph" v-show="item.aiuw == 'Y'" type="warning">智能核保</el-tag>
          </p>
          <p class="product-item-lightspot">{{ item.description || "" }}</p>

          <el-button class="el-image" @click="handleMindMap(item.riskcode)" type="primary" icon="el-icon-share">思维导图<i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>

          <el-button type="primary" @click="handleBaseInfo(item.riskcode)" icon="el-icon-document">基本资料<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          <el-button type="primary" @click="handleHotQuerstion(item.riskcode)" icon="el-icon-warning-outline">常见问题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          <el-button v-if="pageType == '01'" type="primary" @click="handleInsureUrl(item)" icon="el-icon-link">
            投保地址<i class="el-icon-arrow-right el-icon--right"></i></el-button>

            <el-button type="primary" icon="el-icon-chat-dot-square"> {{item.qun_value}}群</el-button>
        </div>
        <div class="product-item-right">
          <div class="product-item-logo">
            <img :src="item.logo" alt="" style="width: 100%" />
          </div>
          <div class="product-item-price">
            <p><span>￥&nbsp;</span>{{ item.prem }} <span>起</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="el-footer">
      <el-pagination background layout="total, prev, pager, next" :total="queryParams.pageTotal" :page-size="queryParams.pageSize" :current-page="queryParams.pageNum" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-image ref="mindMap" v-if="pageType == '01'" class="mind-map-img-view" :src="url" :preview-src-list="srcList"></el-image>
    <!-- 人工核保弹窗 -->
    <el-dialog custom-class="cang-jing-ge" title="人工核保" :visible.sync="dialogArtificialVisible" width="70%">
      <div class="paragraph">
        <p v-html="emailUwInfo"></p>
      </div>
      <div class="paragraph" v-if="paragraphFile.filename != ''" style="margin-top: 10px">
        <span class="file-download"><i class="el-icon-paperclip"></i>&nbsp;{{
            paragraphFile.filename
          }}</span>
        <a :href="
            'https://insure.meihualife.com/filedownload.do?fileid=' +
            paragraphFile.fileid
          " class="download" :download="paragraphFile.filename">下载</a>
      </div>
    </el-dialog>

    <!-- 基本资料弹窗 -->
    <el-dialog custom-class="cang-jing-ge" title="基本资料" :visible.sync="dialogBaseInfoVisible" width="70%">
      <div class="base-info-list">
        <div class="file-item" v-for="(item, index) in baseInfoFileList" :key="index">
          <p class="file-download">
            <span class="file-icon">{{ index + 1 }}.&nbsp; <i :class="fileTypeFun(item.filetype)"></i></span>
            <span>{{ item.filename }}</span>
          </p>
          <!-- <span class="download" @click="download(item.fileid)">下载</span> -->
          <a :href="
              'https://crm.meihualife.com/filedownload.do?fileid=' + item.fileid
            " class="download" :download="item.filename">下载</a>
        </div>
      </div>
      <div class="sure-footer" style="padding: 0.2rem 0 0 0">
        <div class="search-btn" @click="dialogBaseInfoVisible = false">
          取消
        </div>
        <div class="search-btn" style="width: 70px">
          <a :href="downloadAllPath" class="download" style="color: #fff">
            下载全部
          </a>
        </div>
      </div>
    </el-dialog>
    <!-- 投保地址弹窗 -->
    <el-dialog custom-class="cang-jing-ge" title="投保地址" :visible.sync="dialogInsureUrlVisible" width="70%">
      <el-form class="insure-url-form">

        <el-form-item label="投保区域" label-width="1.3rem">
          <p style="font-size: 0.14rem;">{{ showSalesarea }}</p>
          <!-- <el-input v-model="showSalesarea" ref="copy" size="mini" autocomplete="off"></el-input> -->
        </el-form-item>

        <el-form-item label="投保地址链接" label-width="1.3rem">

          <div v-for="(item, index) in urlRemarkList" :key="index" class="productLinkBox">
            <div class="urlRemark">备注{{index+1}}：{{ item.remark }}</div>
            <div style="display: flex;">
              <div class="urlRemark urlRemarkRed">{{ item.url }}</div>
              <div class="search-btn" @click.stop="copy(item.url )" style="width: 80px;margin-left: 0;">
                复制地址
              </div>
            </div>
          </div>
 
        </el-form-item>
        <el-form-item label-width="1.3rem">

        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 常见问题弹窗 -->
    <el-dialog custom-class="cang-jing-ge" title="常见问题" :visible.sync="dialogHotQuestionVisible" width="70%">
      <ul class="question-list">
        <li class="question-item" v-for="(item, index) in questionList" :key="item.questionid">
          <p class="question-title">
            <span class="num">{{ index + 1 }}. Q：</span>{{ item.question }}
          </p>
          <p class="question-answer">
            <span class="question-answer-icon">A：</span>
            <el-input :disabled="true" type="textarea" autosize v-model="item.answer">
            </el-input>
          </p>
          <p class="file-download" v-for="list in item.fileList" :key="list.fileid">
            <i :class="fileTypeFun(list.filetype)"></i>&nbsp;&nbsp;{{
              list.filename
            }}
            <!-- <span class="size">(123KB)</span> -->
            <!-- <span class="download">下载</span> -->
            <a :href="
                'https://crm.meihualife.com/filedownload.do?fileid=' +
                list.fileid
              " class="download" :download="list.filename">下载</a>
          </p>
        </li>
      </ul>
    </el-dialog>

    <!-- 设置基本资料弹窗 -->
    <el-dialog custom-class="cang-jing-ge" title="基本资料" :visible.sync="dialogConfigBaseInfoVisible" width="70%">
      <div class="baseInfoTableBox" v-loading="baseInfoLoading">
        <div class="search-btn" @click="handleUpLoad" style="width: 87px">
          添加附件<i class="el-icon-paperclip el-icon--right"></i>
        </div>
        <input v-show="false" type="file" v-on:change="tirggerFile($event)" class="file-input" />
        <el-table border class="baseInfoTable" :data="baseInfoFileList" style="width: 100%; border: none" cell-class-name="base-info-file-list" :class="
            baseInfoFileList.length == 0 ? 'table-no-border' : 'baseInfoTable'
          " :show-header="false">
          <!-- <el-table-column type="index" label="">
          </el-table-column> -->
          <el-table-column label="资料" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.flieListIndex }}.&nbsp;</span>
              <i :class="fileTypeFun(scope.row.filetype)"></i>
              <span>{{ scope.row.filename }}</span>
            </template>
          </el-table-column>

          <el-table-column label="编辑" width="110" align="center">
            <template slot-scope="scope">
              <el-button-group class="base-info-botton-group">
                <el-button size="mini" @click="baseInfoUp(scope.row.fileid)" type="primary" icon="iconfont icon-my-up">
                </el-button>
                <el-button size="mini" @click="baseInfoDown(scope.row.fileid)" type="primary" icon="iconfont icon-my-down"></el-button>
              </el-button-group>
              <span class="base-info-delete" @click="baseInfoDelete(scope.row.fileid)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 设置思维导图弹窗 -->
    <el-dialog custom-class="cang-jing-ge" title="上传图片" v-if="dialogConfigMindMapVisible" :visible.sync="dialogConfigMindMapVisible" width="3.35rem">
      <div class="mind-map-box" v-loading="MindMapLoading">
        <div class="mind-map-add-file" @click="handleMindMapUpLoad" v-if="!mindMapImgVisable">
          <i class="el-icon-plus"></i>
          <p>点击上传所需图片</p>
          <input v-show="false" type="file" class="mind-map-upload-input" v-on:change="tirggerMindMapFile($event)" />
        </div>
        <div class="mind-map-add-file" v-if="mindMapImgVisable">
          <img v-if="mindMapImgVisable" class="mind-map-img" :src="mindMapImgLocaUrl" alt="" />
          <div class="mind-map-warp"></div>
          <div class="mind-map-botton-box">
            <span class="oper"><i class="el-icon-zoom-in"></i>
              <el-image v-if="pageType == '02'" class="mind-map-img" src="../../../static/images/file.png" :preview-src-list="srcList">
              </el-image>
            </span>
            <a class="oper download" :href="mindMapFileDownload" :download="mindMapFileName"><span> <i class="el-icon-download"></i></span></a>
            <span class="oper" @click="handelMindMapDelete"><i class="el-icon-delete"></i></span>
          </div>
        </div>
        <div class="sure-footer" style="padding: 0; justify-content: center">

          <div class="my-sure" style="
              background: #fff;
              color: #dc240f;
              border: 0.01rem solid #dc240f;
            " @click="mindMapCancle">
            取消
          </div>
          <div class="my-sure" @click="mindMapEnter">确定</div>
        </div>
      </div>
    </el-dialog>

    <!-- 设置常见问题弹窗 margin:10px auto 0px-->
    <el-dialog custom-class="cang-jing-ge" title="常见问题" :visible.sync="dialogConfigHotQuestionVisible" width="70%">
      <div class="hot-question-box" v-loading="hotQuestionLoading">
        <div class="search-btn" @click="handleAddQuertion" style="width: 87px;margin-left: 0;">
          添加问题<i class="el-icon-plus el-icon--right"></i>
        </div>
        <input v-show="false" type="file" v-on:change="tirggerQuestionFile($event, scope)" class="question-file-input" />
        <el-table border class="hotQuestionTable" :data="questionList" cell-class-name="base-info-file-list" v-loading="hotQuestionLoading" :class="
            questionList.length == 0 ? 'table-no-border' : 'hotQuestionTable'
          ">
          <el-table-column label="问题" align="center">
            <template slot-scope="scope">
              <div class="step-list">
                <div class="item-section">
                  <label class="hot-question-q" style="width: 0.3rem; line-height: 0.14rem"><span style="color: #686868">{{ scope.row.questionIndex }}.</span>&nbsp;Q&nbsp;</label>
                  <div class="right-content">
                    <el-input v-if="scope.row.isEdit" placeholder="请输入问题" :disabled="false" size="mini" v-model="question">
                    </el-input>
                    <el-input v-else placeholder="请输入问题" :disabled="true" size="mini" v-model="scope.row.question">
                    </el-input>
                  </div>
                </div>
                <div class="item-section item-section-question">
                  <label style="width: 0.3rem;text-align:right">A</label>
                  <div class="right-content">
                    <el-input v-if="scope.row.isEdit" resize="none" :disabled="false" type="textarea" :autosize="{ minRows: 3, maxRows: 30 }" :rows="3" placeholder="请输入答案" v-model="answer">
                    </el-input>
                    <el-input v-else resize="none" :disabled="true" type="textarea" :autosize="{ minRows: 3, maxRows: 30 }" :rows="3" placeholder="请输入答案" v-model="scope.row.answer">
                    </el-input>
                  </div>
                </div>
                <div class="item-section">
                  <label style="width: 0.3rem"></label>
                  <div class="right-content">
                    <div class="hot-question-file clearfix">
                      <template v-if="scope.row.fileList.length > 0">
                        <p class="hot-question-file-left" v-for="item in scope.row.fileList" :key="item.fileid">
                          <!-- <span class="hot-question-file-left" v-if="scope.row.fileList"> <i class="el-icon-paperclip"></i>{{item.filename}}</span> -->
                          <span>
                            <i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{ item.filename }}
                            <i @click="baseInfoDelete(item.fileid)" v-if="item.type !== 'upfile'" style="
                                margin-left: 5px;
                                cursor: pointer;
                                color: #979797;
                              ">删除</i></span>
                        </p>
                      </template>
                      <template v-else>
                        <p class="hot-question-file-left" style="height: 0.15rem; display: inline-block"></p>
                      </template>
                      <!-- <span class="hot-question-file-left" v-if="scope.row.fileList"> <i class="el-icon-paperclip"></i>{{item.filename}}</span> -->
                      <!-- <span class="hot-question-file-left up-file"><span> <i class="el-icon-paperclip"></i>上传附件</span></p> -->
                      <span class="hot-question-file-right" @click="handleQuestionUpLoad(scope.row.questionid)">
                        <i class="el-icon-paperclip el-icon--right" style="color: #606266"></i>&nbsp;&nbsp;添加附件</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="73" align="center">
            <template slot-scope="scope">
              <template v-if="!scope.row.isEdit">
                <el-button-group class="base-info-botton-group">
                  <el-button size="mini" @click="hotQuestionUp(scope.row.questionid)" type="primary" icon="iconfont icon-my-up"></el-button>
                  <el-button size="mini" @click="hotQuestionDown(scope.row.questionid)" type="primary" icon="iconfont icon-my-down"></el-button>
                </el-button-group>
                <span class="base-info-delete hot-question-delete" @click="hotQuestionEdit(scope)">编辑</span>
                <span class="base-info-delete hot-question-delete" @click="hotQuestionDelete(scope.row.questionid)">删除</span>
              </template>
              <template v-else>
                <span class="hot-question-enter" @click="hotQuestionEnter(scope.row.questionid)">确定</span>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import $ from "jquery";
import "../../../static/js/viewer-jquery.min.js";
import "../../../static/css/viewer.min.css";
import { getData, getPhoneData, my_url, crm_url } from "../../../static/js/ajax.js";
export default {
  data() {
    return {
      urlRemarkList: [],


      regionList: [],
      queryParams: {
        risktype: "03",
        title: "",
        pageNumber: 1,
        pageSize: 10,
        pageTotal: 0,
        // totalRecord: ''
      },
      showSalesarea: '',
      salesArea: "",
      loading: false,
      downloadUrl: "",
      pageType: "",
      riskList: [],
      loading: false,
      totalRecord: 0,
      dialogArtificialVisible: false, //人工核保弹窗
      dialogBaseInfoVisible: false, //基本资料弹窗
      dialogInsureUrlVisible: false, //投保地址弹框
      insureUrl: "",
      dialogHotQuestionVisible: false, //常见问题弹窗
      url: "../../../static/images/file.png",
      srcList: [],
      dialogConfigBaseInfoVisible: false, //设置基本资料弹窗
      baseInfoFileList: [],
      dialogConfigHotQuestionVisible: false, //设置常见问题弹窗
      dialogConfigMindMapVisible: false, //上传思维导图弹窗
      baseInfoTableData: [],
      riskcode: "",
      buztype: "",
      baseid: "",
      baseInfoLoading: false,
      mindMapImgVisable: false,
      hotQuestionLoading: false,
      MindMapLoading: false,
      mindMapImgLocaUrl: "",
      emailUwInfo: "",
      questionList: [],
      question: "",
      answer: "",
      hotQuestionFile: {},
      quertionFileName: "附件上传",
      mindMapFileDownload: "",
      mindMapFileName: "",
      uploadQuestionId: "",
      downloadAllPath: "",
      paragraphFile: {
        filename: "",
        fileid: "",
      },
      hotQuestionLoading: false,
      productNameOption: [], //产品名称模糊搜索
      // 你给出的数据格式是类似对象的键值对，转换为数组的标准写法如下：
      channelArr: [
        { dd_key: "01", dd_value: "自营", qun_value: "保司服务" },
        { dd_key: "02", dd_value: "悟空保", qun_value: "" },
        { dd_key: "04", dd_value: "i云保", qun_value: "i云服" },
        { dd_key: "11", dd_value: "i云服", qun_value: "i云服" },
        { dd_key: "06", dd_value: "开心保", qun_value: "开心保" },
        { dd_key: "07", dd_value: "轻松保", qun_value: "" },
        { dd_key: "08", dd_value: "梧桐树", qun_value: "梧桐树" },
        { dd_key: "03", dd_value: "慧泽美华", qun_value: "齐欣" },
        { dd_key: "13", dd_value: "慧择美华2", qun_value: "齐欣" },
        { dd_key: "09", dd_value: "慧泽晟松", qun_value: "齐欣" },
        { dd_key: "05", dd_value: "小雨伞橙鹊", qun_value: "创信" },
        { dd_key: "10", dd_value: "小雨伞美华", qun_value: "创信" },
        { dd_key: "12", dd_value: "力码科技", qun_value: "力码" },
        { dd_key: "14", dd_value: "盛世创富", qun_value: "创富" },
        { dd_key: "15", dd_value: "乐橙云服", qun_value: "乐橙" },
        { dd_key: "16", dd_value: "南燕科技", qun_value: "南燕" },
        { dd_key: "17", dd_value: "中兴经纪", qun_value: "" },
        { dd_key: "18", dd_value: "水滴", qun_value: "水滴" },
        { dd_key: "19", dd_value: "诚炜", qun_value: "诚炜" },
        { dd_key: "20", dd_value: "融汇", qun_value: "弘康" },
        { dd_key: "21", dd_value: "健乐云服", qun_value: "健乐" },
        { dd_key: "22", dd_value: "小雨伞三眼", qun_value: "创信" }
      ]
    };
  },
  mounted() {
    var val = this.$route.query.type || "01";
    this.pageType = val;
    this.getRiskList();
    this.getproductNameOption();
    this.downloadUrl = location.origin;
    this.getSalesArea();

  },
  methods: {
    getSalesArea() {
      let _this = this;
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          if (data.code == 0) {
            _this.regionList = data.dictList;
          }
        },
        {
          dict_type: "sale_area"
        }
      );
    },
    selectSalesArea(aa) {
      this.salesArea = aa;
      this.getRiskList();
    },

    handleClick(tab, event) {
      this.queryParams.risktype = tab.name;
      this.queryParams.pageNumber = 1;
      this.getRiskList();
      this.getproductNameOption();
    },
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.getRiskList();
    },
    handleCurrentChange(val) {
      this.queryParams.pageNumber = val;
      this.getRiskList();
    },
    handleParagraph(riskcode) {
      let _this = this;
      this.dialogArtificialVisible = true;
      getData(
        "post",
        my_url + "/crm/risk/getEmailUwInfo.do",
        function (data) {
          let arr = [],
            emailUwInfo = "";
          data.emailUwInfo.split("\n").forEach(function (item, index) {
            if (item == null || item == "") {
              arr.push(`<br>`);
            } else {
              arr.push(`<p>${item.trim()}</p>`);
            }
          });
          _this.emailUwInfo = arr.join("");
        },
        {
          riskcode: riskcode,
        }
      );
      getData(
        "post",
        my_url + "/crm/fileupload/getFileByBuzIdAndType.do",
        function (data) {
          let { fileList } = data;
          if (fileList.length != 0) {
            _this.paragraphFile = fileList[0];
          } else {
            _this.paragraphFile = {
              filename: "",
              fileid: "",
            };
          }
        },
        {
          buzid: riskcode,
          buztype: "0201",
        }
      );
    },
    // 基本资料按钮
    handleBaseInfo(riskcode) {
      var _this = this;
      if (_this.pageType == "01") {
        var _this = this;
        getData(
          "post",
          my_url + "/crm/fileupload/getFileByBuzIdAndType.do",
          function (data) {
            let { fileList } = data;
            if (fileList.length > 0) {
              _this.downloadAllPath =
                "https://crm.meihualife.com/filedownload.do?fileid=" +
                fileList[0].fileid;
            } else {
              _this.downloadAllPath = "javascript:void(0);";
            }
          },
          {
            buzid: riskcode,
            buztype: "0302_01",
          }
        );
        _this.dialogBaseInfoVisible = true;
      } else {
        _this.dialogConfigBaseInfoVisible = true;
      }
      _this.riskcode = riskcode;
      _this.buztype = "0302";
      _this.getBaseInfoFileList(riskcode);
    },
    //基本资料全部下载

    getBaseInfoFileList(riskcode) {
      var _this = this;
      _this.baseInfoLoading = true;
      getData(
        "post",
        my_url + "/crm/fileupload/getFileByBuzIdAndType.do",
        function (data) {
          let { fileList } = data;
          if (fileList) {
            fileList.forEach(function (item, index) {
              item.flieListIndex = index + 1;
            });
            _this.baseInfoFileList = fileList;
            _this.baseInfoLoading = false;
          }
        },
        {
          buzid: riskcode,
          buztype: "0302",
        }
      );
    },
    // 文件上移
    baseInfoUp(fileid) {
      var _this = this;
      getData(
        "post",
        my_url + "/crm/fileupload/file_Up.do",
        function (data) {
          if (data.code == 0) {
            _this.$message({
              type: "success",
              duration: 3000,
              message: "操作成功！",
            });
            _this.getBaseInfoFileList(_this.riskcode);
          } else {
            _this.$message({
              type: "waring",
              duration: 3000,
              message: "操作失败！",
            });
          }
        },
        {
          fileid: fileid,
        }
      );
    },
    // 文件下移
    baseInfoDown(fileid) {
      var _this = this;
      getData(
        "post",
        my_url + "/crm/fileupload/file_Down.do",
        function (data) {
          if (data.code == 0) {
            _this.$message({
              type: "success",
              duration: 3000,
              message: "操作成功！",
            });
            _this.getBaseInfoFileList(_this.riskcode);
          } else {
            _this.$message({
              type: "waring",
              duration: 3000,
              message: "操作失败！",
            });
          }
        },
        {
          fileid: fileid,
        }
      );
    },
    // 文件删除
    baseInfoDelete(fileid) {
      var _this = this;
      getData(
        "post",
        my_url + "/crm/fileupload/fileDelete.do",
        function (data) {
          if (data.code == 0) {
            _this.$message({
              type: "success",
              duration: 3000,
              message: "操作成功！",
            });
            _this.getBaseInfoFileList(_this.riskcode);
            _this.getRiskQuestionList(_this.riskcode);
          } else {
            _this.$message({
              type: "waring",
              duration: 3000,
              message: "操作失败！",
            });
          }
        },
        {
          fileid: fileid,
        }
      );
    },
    // 投保地址按钮
    handleInsureUrl(item) {

      console.log(item)
      var urlRemarkList = []
      if (item.addurl) {
        urlRemarkList = JSON.parse(item.addurl)
      }
      var obj = {
        url: item.url,
        remark: item.remark ? item.remark : ""
      }
      urlRemarkList.unshift(obj);

      this.urlRemarkList = urlRemarkList
      console.log(urlRemarkList)

      this.insureUrl = item.url;
      this.showSalesarea = item.salesarea


      const keys = item.salesarea.split(',');

      const result = keys.map(key => {
        const item = this.regionList.find(d => d.dd_key === key);
        return item ? item.dd_value : '';
      }).filter(Boolean).join('，');
      console.log(result)

      this.showSalesarea = result

      this.dialogInsureUrlVisible = true;
    },
    // 查询
    handleSearch() {
      this.getRiskList();
    },
    // 重置
    handleReset() {
      this.queryParams.title = "";
      this.getRiskList();
    },
    // 复制
    copy(url) {
      var _this = this;
      this.$copyText(url).then(
        function (e) {
          _this.$message({
            type: "success",
            duration: 3000,
            message: "复制成功!",
          });
          _this.dialogInsureUrlVisible = false;
        },
        function (e) { }
      );
    },
    // 热门问题按钮
    handleHotQuerstion(riskcode) {
      var _this = this;
      _this.riskcode = riskcode;
      _this.buztype = "0303";
      _this.getRiskQuestionList(riskcode);
      if (_this.pageType == "01") {
        _this.dialogHotQuestionVisible = true;
      } else {
        console.log(_this.questionList);
        _this.questionList = _this.questionList;
        _this.dialogConfigHotQuestionVisible = true;
      }
    },
    getRiskQuestionList(riskcode) {
      var _this = this;
      _this.hotQuestionLoading = true;
      getData(
        "post",
        my_url + "/crm/risk/getRiskQuestionList.do",
        function (data) {
          let { questionList } = data;
          if (questionList) {
            questionList.forEach(function (item, index) {
              item.questionIndex = index + 1;
            });
            _this.questionList = questionList;
            _this.hotQuestionLoading = false;

          }
        },
        {
          riskcode: riskcode,
        }
      );
    },
    handleAddQuertion() {
      var _this = this;
      _this.questionList.forEach((item) => {
        if (item.isEdit) {
          _this.$message({
            type: "waring",
            duration: 3000,
            message: "您还有未保存的问题，请先保存后再加新的问题!",
          });
          return false;
        }
      });
      _this.question = "";
      _this.answer = "";
      _this.questionList.unshift({
        questionIndex: _this.questionList.length + 1,
        question: "",
        answer: "",
        isEdit: true,
        fileList: [],
      });
    },
    // 提交问题
    hotQuestionEnter(id) {
      var _this = this;
      if (_this.question == "" || _this.answer == "") {
        _this.$message({
          type: "waring",
          duration: 3000,
          message: "问题或者答案不能为空！",
        });
        return;
      }
      if (id) {
        //有id为问题修改
        var pramsEdit = {
          questionid: id,
          question: _this.question,
          answer: _this.answer,
        };
        getData(
          "post",
          my_url + "/crm/risk/riskCommQusetionModify.do",
          function (data) {
            if (data.code == 0) {
              _this.$message({
                type: "success",
                duration: 3000,
                message: "保存成功!",
              });

              _this.getRiskQuestionList(_this.riskcode);
            } else {
              _this.$message.error(data.msg);
            }
          },
          pramsEdit
        );
      } else {
        //无id为新建
        var prams = {
          riskcode: _this.riskcode,
          question: _this.question,
          answer: _this.answer,
        };
        getData(
          "post",
          my_url + "/crm/risk/riskCommQusetionAdd.do",
          function (data) {

            if (data.code == 0) {
              _this.$message({
                type: "success",
                duration: 3000,
                message: "保存成功!",
              });

              _this.getRiskQuestionList(_this.riskcode);
            } else {
              _this.$message.error(data.msg);
            }
          },
          prams
        );
      }
    },
    // 删除问题
    hotQuestionDelete(id) {
      var _this = this;
      getData(
        "post",
        my_url + "/crm/risk/questionDelete.do",
        function (data) {
          let { code } = data;
          if (code == 0) {
            _this.$message({
              type: "success",
              duration: 3000,
              message: "删除成功",
            });
            _this.getRiskQuestionList(_this.riskcode);
          }
        },
        {
          questionid: id,
        }
      );
    },
    // 问题上移
    hotQuestionUp(id) {
      var _this = this;
      getData(
        "post",
        my_url + "/crm/risk/question_Up.do",
        function (data) {
          let { code } = data;
          if (code == 0) {
            _this.$message({
              type: "success",
              duration: 3000,
              message: "操作成功!",
            });
            _this.getRiskQuestionList(_this.riskcode);
          }
        },
        {
          questionid: id,
        }
      );
    },
    // 问题下移
    hotQuestionDown(id) {
      var _this = this;
      getData(
        "post",
        my_url + "/crm/risk/question_Down.do",
        function (data) {
          let { code } = data;
          if (code == 0) {
            _this.$message({
              type: "success",
              duration: 3000,
              message: "操作成功!",
            });
            _this.getRiskQuestionList(_this.riskcode);
          }
        },
        {
          questionid: id,
        }
      );
    },
    // 编辑
    hotQuestionEdit(scope) {
      var _this = this;
      var newArr = [];
      _this.uploadQuestionId = scope.row.questionid;
      _this.questionList.forEach(function (i, index) {
        if (i.questionid == scope.row.questionid) {
          _this.$set(_this.questionList[index], "isEdit", true);
          i.isEdit = true;
          _this.question = i.question;
          _this.answer = i.answer;
        }
        newArr.push(i);
      });

    },
    // 思维导图按钮
    handleMindMap(riskcode) {
      var _this = this;
      _this.riskcode = riskcode;
      _this.buztype = "0301";
      getData(
        "post",
        my_url + "/crm/fileupload/getFileByBuzIdAndType.do",
        function (data) {
          let { fileList } = data;
          if (fileList.length != 0) {
            _this.srcList = [];
            _this.srcList.push(
              "https://crm.meihualife.com" +
              fileList[0].dis_filePath +
              fileList[0].store_name
            );
            _this.mindMapFileDownload =
              "https://crm.meihualife.com/filedownload.do?fileid=" +
              fileList[0].fileid;
            _this.mindMapFileName = fileList[0].filename;
            _this.mindMapFileId = fileList[0].fileid;
            if (_this.pageType == "02") {
              _this.dialogConfigMindMapVisible = true;
              _this.mindMapImgVisable = true;
              _this.mindMapImgLocaUrl = _this.srcList[0];
            } else if (_this.pageType == "01") {
              _this.$refs["mindMap"].showViewer = true;
            }
          } else {
            if (_this.pageType == "02") {
              _this.dialogConfigMindMapVisible = true;
              _this.mindMapImgVisable = false;
              _this.riskcode = riskcode;
              _this.buztype = "0301";
            } else {
              _this.srcList = [];
              _this.$message.error("该产品没有思维导图！");
            }
          }
        },
        {
          buzid: riskcode,
          buztype: "0301",
        }
      );
    },
    handelMindMapDelete() {
      var _this = this;
      getData(
        "post",
        my_url + "/crm/fileupload/fileDelete.do",
        function (data) {
          if (data.code == 0) {
            _this.$message({
              type: "success",
              duration: 3000,
              message: "操作成功！",
            });
            _this.mindMapImgVisable = false;
          } else {
            _this.$message({
              type: "waring",
              duration: 3000,
              message: "操作失败！",
            });
          }
        },
        {
          fileid: _this.mindMapFileId,
        }
      );
    },
    mindMapCancle() {
      var _this = this;
      $(".mind-map-upload-input").val("");
      _this.mindMapImgVisable = false;
      _this.dialogConfigMindMapVisible = false;
    },
    handleMindMapUpLoad() {
      $(".mind-map-upload-input").trigger("click");
    },
    tirggerMindMapFile(e) {
      var _this = this;
      let formData = new FormData();
      formData.append("myFile", e.target.files[0]);
      formData.append("buztype", _this.buztype);
      formData.append("buzid", _this.riskcode);
      _this.mindMapImgLocaUrl = window.URL.createObjectURL(e.target.files[0]);
      _this.mindMapRormData = formData;
      _this.mindMapImgVisable = true;
    },
    mindMapEnter() {
      var _this = this;
      _this.MindMapLoading = true;
      $.ajax({
        url: my_url + "/crm/fileupload/fileUpload.do",
        type: "POST",
        cache: false,
        data: _this.mindMapRormData,
        processData: false,
        contentType: false,
      })
        .done(function (res) {
          _this.MindMapLoading = false;
          var res = JSON.parse(res);
          if (res.code == 0) {
            $(".file-input").val("");
            _this.$message({
              type: "success",
              duration: 3000,
              message: "上传成功!",
            });
          } else {
            _this.$message.error(res.msg);
          }
        })
        .fail(function (res) {
          _this.MindMapLoading = false;

          _this.$message({
            type: "waring",
            duration: 3000,
            message: "上传失败!",
          });
        });
    },
    // 获取保险列表
    getRiskList(param) {
      var _this = this;
      if (_this.salesArea.length > 0) {
        _this.queryParams.salesArea = _this.salesArea.toString();
      } else {
        _this.queryParams.salesArea = "";
      }
      getData("post", my_url + "/crm/risk/getRiskList.do", function (data) {
        let { rows, total } = data;
        _this.queryParams.pageTotal = total;
        if (rows) {

          rows.forEach(item => {
            const match = _this.channelArr.find(ch => ch.dd_key === item.channel);
            if (match) {
              item.qun_value = match.qun_value;
            } else {
              item.qun_value = ''; // 或者其他默认值
            }
          });

           

          _this.riskList = rows;
        }
      },
        _this.queryParams
      );
    },

    handleUpLoad() {
      $(".file-input").trigger("click");
    },
    handleQuestionUpLoad(id) {
      this.uploadQuestionId = id;
      $(".question-file-input").trigger("click");
    },
    tirggerQuestionFile(e, scope) {
      var _this = this;
      _this.baseInfoLoading = true;
      let formData = new FormData();
      formData.append("myFile", e.target.files[0]);
      formData.append("secondbuzid", _this.riskcode);
      formData.append("buztype", _this.buztype);
      _this.quertionFileName = e.target.files[0].name;

      $(e.path).find(".question-file-input");
      _this.hotQuestionFile = formData;
      if (_this.uploadQuestionId) {
        //有id为修改，直接触发上传

        formData.append("buzid", _this.uploadQuestionId);
        _this.questionList.forEach(function (item) {
          if (item.questionid == _this.uploadQuestionId) {
            item.fileList.push({
              filename: e.target.files[0].name,
            });
            // item.fileList[item.fileList.length - 1].filename = e.target.files[0].name
          }
        });

        $.ajax({
          url: my_url + "/crm/fileupload/fileUpload.do",
          type: "POST",
          cache: false,
          data: formData,
          processData: false,
          contentType: false,
        })
          .done(function (res) {
            $(".file-input").val("");
            _this.baseInfoLoading = false;
            _this.$message({
              type: "success",
              duration: 3000,
              message: "上传成功!",
            });
            _this.getRiskQuestionList(_this.riskcode);
          })
          .fail(function (res) {
            _this.baseInfoLoading = false;
            _this.$message({
              type: "waring",
              duration: 3000,
              message: "上传失败!",
            });
          });
      } else {
        //无id先保存再上传
        var prams = {
          riskcode: _this.riskcode,
          question: _this.question,
          answer: _this.answer,
        };
        getData(
          "post",
          my_url + "/crm/risk/riskCommQusetionAdd.do",
          function (data) {
            if (data.code == 0) {
              let { questionid } = data;
              _this.hotQuestionFile.append("buzid", questionid);
              _this.questionList.forEach(function (item) {
                if (item.questionid == _this.uploadQuestionId) {
                  item.fileList.push({
                    filename: e.target.files[0].name,
                  });
                }
              });
              $.ajax({
                url: my_url + "/crm/fileupload/fileUpload.do",
                type: "POST",
                cache: false,
                data: _this.hotQuestionFile,
                processData: false,
                contentType: false,
              })
                .done(function (res) {
                  _this.baseInfoLoading = false;
                  var res = JSON.parse(res);
                  if (res.code == 0) {
                    $(".file-input").val("");
                    _this.$message({
                      type: "success",
                      duration: 3000,
                      message: "上传成功!",
                    });
                    _this.getRiskQuestionList(_this.riskcode);
                  } else {
                    _this.$message.error(res.msg);
                  }
                  // that.getUploadFile(baseid)
                })
                .fail(function (res) {
                  _this.baseInfoLoading = false;
                  _this.$message({
                    type: "waring",
                    duration: 3000,
                    message: "上传失败!",
                  });
                });
            } else {
              _this.$message.error(data.msg);
            }
          },
          prams
        );
      }
    },
    tirggerFile(e) {
      var _this = this;
      _this.baseInfoLoading = true;
      let formData = new FormData();
      formData.append("myFile", e.target.files[0]);
      // formData.append('secondbuzid', _this.baseid);
      formData.append("buztype", _this.buztype);
      formData.append("buzid", _this.riskcode);

      let that = this;
      $.ajax({
        url: my_url + "/crm/fileupload/fileUpload.do",
        type: "POST",
        cache: false,
        data: formData,
        processData: false,
        contentType: false,
      })
        .done(function (res) {
          _this.baseInfoLoading = false;
          var res = JSON.parse(res);
          if (res.code == 0) {
            $(".file-input").val("");
            _this.$message({
              type: "success",
              duration: 3000,
              message: "上传成功!",
            });
            if (_this.buztype == "0302") {
              _this.getBaseInfoFileList(_this.riskcode);
            }
          } else {
            _this.$message.error(res.msg);
          }
          // that.getUploadFile(baseid)
        })
        .fail(function (res) {
          _this.baseInfoLoading = false;
          _this.$message({
            type: "waring",
            duration: 3000,
            message: "上传失败!",
          });
        });
    },
    fileTypeFun(type) {
      if (type) {
        var type = type.toLowerCase();
        if (type == "jpg" || type == "png") {
          return "file-type file-type-img";
        } else if (type == "xlsx" || type == "xls") {
          return "file-type file-type-xlsx";
        } else {
          return `file-type file-type-${type}`;
        }
      } else {
        return "file-type file-type-file";
      }
    },
    getproductNameOption() {
      let _this = this;
      getData(
        "post",
        my_url + "/crm/risk/getRiskTitleList.do",
        function (data) {
          let { risktitlelist } = data;
          _this.totalRecord = risktitlelist.length;
          if (risktitlelist) {
            risktitlelist.forEach(function (item, index) {
              _this.productNameOption.push({
                value: item,
                index: index,
              });
            });
          }
        },
        {
          risktype: _this.queryParams.risktype,
        }
      );
    },
    // 产品名称
    querySearch(queryString, cb) {
      var productNameOption = this.productNameOption;
      var results = queryString
        ? productNameOption.filter(this.createFilterName(queryString))
        : productNameOption;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilterName(queryString) {
      return (productNameOption) => {
        return (
          productNameOption.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) > -1
        );
      };
    },
  },
};
</script>
<style src="../../../static/css/insuranceProducts.css"></style>
<style src="../../../static/css/myFonts/iconfont.css"></style>
<style>
.editContent_box .wei span .el-date-editor .el-input__prefix {
  left: 1.9rem;
}
.el-select .el-input.is-focus .el-input__inner,
.el-select .el-input__inner:focus {
  border-color: #dcdfe6;
}

.product-item-title .intpro {
  background: #ffecea;
  border-radius: 5px;
  border: 1px solid #ffdcd8;
  color: #dc220d;
}
</style>
<style scoped>
.search-box .common-select {
  margin-top: 0;
}

.urlRemark {
  height: 28px;
  line-height: 28px;
  margin-right: 25px;
}

.urlRemarkRed {
  color: #dc220d;
}

.productLinkBox {
  margin-top: 6px;
}
</style>