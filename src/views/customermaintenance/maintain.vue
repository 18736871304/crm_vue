<template>
    <div style=" width: 17.1rem;">
      <div class="search-header">
        <div class="search-box clearfix">
          <div class="common-select">
            <div class="select-title" style="width: 1.28rem">保单号</div>
            <div class="select-content" style="width: calc(100% - 1.28rem);">
              <el-input class="el-input-inners" v-model="contno" align="right" size="mini" clearable></el-input>
            </div>
          </div>
  
          <div class="common-select">
            <div class="select-title" style="width: 1.28rem">客户姓名</div>
            <div class="select-content" style="width: calc(100% - 1.28rem);">
              <el-input class="el-input-inners" v-model="cusname" align="right" size="mini" clearable></el-input>
            </div>
          </div>
  
          <div class="common-select">
            <div class="select-title" style="width: 1.28rem">
              <el-select class="el-input-title-inners" v-model="cusmobile" placeholder="请选择" size="mini">
                <el-option label="电话号码" value="电话号码"></el-option>
                <el-option label="微信号" value="微信号"></el-option>
              </el-select>
            </div>
            <div class="select-content" style="width: calc(100% - 1.28rem);">
              <el-input class="el-input-inners" v-model="cusMobileWxno" align="right" size="mini" clearable></el-input>
            </div>
          </div>
  
          <div class="common-select">
            <div class="search-btn" @click="search(1)">搜索</div>
            <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);"
              @click="screenReset">重置</div>
          </div>
        </div>
      </div>
      <div class="table-box">
        <el-table v-if="CJGselectValue == '服务客户' || CJGselectValue == '生日保单'" :data="tableData" border v-loading="loading"
          style="width: 100%" @selection-change="handleSelectionChange" @sort-change="sortChange" class="splice-header">
          <el-table-column key="2" align="center" type="index" label="序号" width="60">
          </el-table-column>
          <el-table-column key="3" label="客户姓名" width="100" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <a style="cursor: pointer; color: #8f9198" type="text" size="small" @click="handle(scope.row)">{{
                scope.row.name || "空" }}</a>
            </template>
          </el-table-column>
          <!-- <el-table-column key="4" align="center" prop="mobile" label="电话号码" width="120">
          </el-table-column> -->
  
          <el-table-column key="4" align="center" label="电话号码" width="140" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <!-- <a class="call-a" href="javascript:void(0);" v-if="queryflagString == 02">{{scope.row.mobile}}</a> -->
              <span class="call-a" :class="scope.row.callcount > 0 ? 'active' : ''" @click="phonecall_row(scope.row)">
                {{ scope.row.mobile }}
                <img style="margin-left: 5px;" src="../../static/images/call-icon.png" />
              </span>
            </template>
          </el-table-column>
  
          <el-table-column key="5" align="center" prop="wxno" label="微信号" width="100" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="6" align="center" prop="reusername" label="出单业务员" width="110">
            <template slot="header" slot-scope="scope">
              <p class="source-level">出单业务员
                <el-tooltip popper-class="atooltip" effect="dark" placement="top">
                  <template slot="content">
                    <p>如此客户有多个保单，显示最后一个保单的出单业务员姓名</p>
                  </template>
                  <span></span>
                </el-tooltip>
              </p>
            </template>
          </el-table-column>
  
          <el-table-column key="7" align="center" prop="serusername[0]" label="服务人员" width="100">
            <template slot-scope="scope">
              <div class="edit option tan_seruser" style="display: flex;justify-content: center;color: #8f9198;">
                <div v-if="scope.row.serusername.length > 1" style="margin-right:2px">
                  {{ scope.row.serusername[scope.row.serusername.length - 1] }}</div>
                <div v-if="scope.row.serusername.length <= 1">{{ scope.row.serusername[0] }}</div>
                <div class="top" v-if="scope.row.serusername.length > 1">
                  <el-tooltip class="item" effect="dark" content="此客户有多个服务人员，请联系业管进行修改" placement="top">
                    <p class="biaozhu"></p>
                  </el-tooltip>
                </div>
              </div>
            </template>
  
            <template slot="header" slot-scope="scope">
              <p class="source-level">服务人员
                <el-tooltip popper-class="atooltip" effect="dark" placement="top">
                  <template slot="content">
                    <p>如此客户有多个服务人员，显示最后一个服务人员姓名</p>
                  </template>
                  <span></span>
                </el-tooltip>
              </p>
            </template>
          </el-table-column>
  
          <el-table-column key="8" align="center" prop="sex" label="性别" width="80">
          </el-table-column>
          <el-table-column key="33" v-if="CJGselectValue == '生日保单'" align="center" prop="birthday" label="客户生日" width="155">
          </el-table-column>
          <el-table-column key="9" v-if="CJGselectValue == '服务客户'" align="center" prop="age" label="年龄" width="80"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="10" align="center" prop="policycount" label="保单数量" width="80">
          </el-table-column>
          <el-table-column key="11" align="center" prop="sumpolicyprem" label="总保费" width="80">
          </el-table-column>
          <el-table-column key="12" align="center" prop="makedate" label="线索产生时间" width="155" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="34" align="center" prop="cusdealtime" label="客户成交时间" width="155"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="35" align="center" prop="cusdealperiod" label="客户成交周期" width="100"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="13" align="center" prop="batchno" label="批次号" width="140">
          </el-table-column>
          <el-table-column key="14" align="center" prop="channelname" label="渠道类型" width="80">
          </el-table-column>
  
        </el-table>
        <el-table v-if="CJGselectValue == '失效保单' || CJGselectValue == '终止保单'" :data="tableData" ref="multipleTable" border
          v-loading="loading" style="width: 100%;" @selection-change="handleSelectionChange" @sort-change="sortChange"
          class="splice-header">
          <el-table-column key="61" align="center" type="index" label="序号" width="60">
          </el-table-column>
          <el-table-column key="15" align="center" prop="accepttime" label="出单日期" width="155" :show-overflow-tooltip="true">
          </el-table-column>
  
          <el-table-column key="16" align="center" prop="reusername" label="出单业务员" width="100"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="60" align="center" prop='serviceusername' label="服务人员" width="100"
            :show-overflow-tooltip="true">
          </el-table-column>
  
          <el-table-column key="18" align="center" prop="contno" label="保单号" width="150" :show-overflow-tooltip="true">
            <!-- <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.isxubao == '05'" size="mini">续</el-tag>
              {{scope.row.contno}}
            </template> -->
          </el-table-column>
          <el-table-column key="19" align="center" prop="statename" label="保单状态" width="80" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="20" align="center" prop="insorganname" label="保险公司" width="130"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="21" align="center" prop="riskname" label="险种名称" width="200" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key=22 align="center" prop="appname" label="投保人姓名" width="100" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="33" align="center" label="投保人手机号" width="140" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <!-- <a class="call-a" href="javascript:void(0);" v-if="queryflagString == 02">{{scope.row.appphone}}</a> -->
              <span class="call-a" :class="scope.row.callcount > 0 ? 'active' : ''" @click="phonecall_row(scope.row)">
                {{ scope.row.appphone }}
                <img style="margin-left: 5px;" src="../../static/images/call-icon.png" />
              </span>
            </template>
          </el-table-column>
  
          <el-table-column key="23" align="center" prop="appprovincename" label="投保人所在省" width="120"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="24" align="center" prop="appcityname" label="投保人所在市" width="120"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="25" align="center" prop="insname" label="被保人姓名" width="100" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="26" align="center" prop="payintvvalue" label="缴费方式" width="80"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="27" align="center" prop="payendyearvalue" label="缴费年期" width="80"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="28" align="center" prop="insuyearvalue" label="保障期限" width="80"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="29" align="center" prop="prem" label="保费" width="80" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="30" align="center" prop="activitychannelname" label="渠道类型" width="80"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="31" align="center" prop="typename" label="电子保单" width="80" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <a v-if='scope.row.policyurl' class="edit option" target="_blank" :href="scope.row.policyurl"
                style="color: #8F9198;">下载</a>
              <a v-else class="edit option" target="_blank" :href="scope.row.policyurl"></a>
            </template>
          </el-table-column>
          <el-table-column key="32" align="center" label="查看详情" width="100">
            <template slot-scope="scope">
              <a class="edit option" href="javascript:void(0);" style="color: #4985E5;"
                @click="showEditPopup(scope.row)">查看详情</a>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px; ">
          <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize"
            :current-page="pageNum" @current-change="pageClick">
          </el-pagination>
        </div>
      </div>
      <!-- 侧拉窗口 -->
      <el-drawer title="我是标题" size='70%' custom-class="customer-drawer" :visible.sync="drawer" :with-header="false">
        <div class="drawerLeft" style="width: 41%;">
          <div class="left_box">
            <div class="header">
              <div class="header_t">
                <div class="header_t_l">
                  <span>{{ detailsInfo.name }}</span>
                  <span @click="phonecall_page">
                    <img src="../../static/images/call-icon.png" style="margin-right: 6px;" />拨打电话
                  </span>
                </div>
                <div class="header_t_r">
                  <span>所属业务员：</span>
                  <span>{{ detailsInfo.username }}</span>
                  <span v-if="detailsInfo.otherusername">（{{ detailsInfo.otherusername }}）</span>
                </div>
              </div>
              <div class="header_b">
                <div class="title">标签</div>
                <div class="checkBox">
                  <el-checkbox-group size="mini" v-model="activitytag" v-show="false">
                    <el-checkbox-button v-for="customer in activitytags" :label="customer.dd_key" :key="customer.dd_key">
                      {{ customer.dd_value }}</el-checkbox-button>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
            <div class="editBox">
              <div class="title">
                <span></span>
                <span>客户基本信息</span>
              </div>
              <div class="editContent">
  
                <div class="editContent_box">
                  <span class="dd">客户姓名</span>
                  <span class="dd">
                    <el-input placeholder="请输入" size="mini" v-model="detailsInfo.name">
                    </el-input>
                  </span>
                </div>
  
                <div class="editContent_box">
                  <span class="dd">电话号码</span>
                  <span class="dd">
                    <el-popover placement="bottom" width="225" trigger="click" v-model="addMobliePopVisible">
                      <el-input type="text" size="mini" v-model="addMoblie" style="margin-bottom:5px"
                        @input="addMoblieChange">
                      </el-input>
  
                      <div class="mobile_input_box" v-show="mobileInputShow">
                        <span class="mobile_input mobile_input_add" @click="mobileAdd">添加</span>
                        <span class="mobile_input mobile_input_cancle" @click="mobileCancle">取消</span>
                      </div>
                      <el-table :data="mobileList" class="mobile_box">
                        <el-table-column width="130" property="phone" label="电话"></el-table-column>
                        <el-table-column width="70" label="操作" align="right">
                          <template slot-scope="scope" class="mobile_box_edit">
                            <span class="mobile-icon el-icon-delete" @click="mobileDelete(scope)"></span>
                            <span class="mobile-icon el-icon-upload2" @click="mobileToTop(scope)"></span>
                          </template>
                        </el-table-column>
                      </el-table>
                      <template slot="reference">
                        <el-input placeholder="请输入" size="mini" v-model="detailsInfo.mobilestr">
                        </el-input>
  
                        <span @click="addMobliePopVisible = !addMobliePopVisible" class="icon_arr"><i
                            class="el-select__caret el-input__icon el-icon-arrow-down"></i></span>
                      </template>
                    </el-popover>
  
                  </span>
                </div>
                <div class="editContent_c editContent_box">
                  <span class="dd">性别</span>
                  <span class="dd maxmain">
                    <el-select v-model="detailsInfo.sex" size="mini" style="width: 100%;" placeholder="请选择">
                      <el-option v-for="item in sexs" :key="item.key" :label="item.value" :value="item.key"></el-option>
                    </el-select>
                  </span>
                </div>
  
                <div class="editContent_c editContent_box editContent_date" style=" font-size: 0.13rem;">
                  <span class="dd">出生日期</span>
                  <span class="dd">
                    <el-date-picker v-model="ceBirthday" type="date" size="mini" placeholder="请输入出生年月" class="difPicker"
                      clearable style="width: 100%;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </span>
                </div>
  
  
                <div class="editContent_b editContent_box">
                  <span class="dd">微信号</span>
                  <span class="dd">
                    <el-input placeholder="请输入" size="mini" v-model="detailsInfo.wxno">
                    </el-input>
                  </span>
                  <!-- <div class="editContent_box_r">
                    <span>邮箱</span>
                    <span>
                      <el-input placeholder="请输入" size="mini" v-model="detailsInfo.email">
                      </el-input>
                    </span>
                  </div> -->
                </div>
                <!-- <div class="editContent_b editContent_box">
                  <div class="editContent_box_l" style="width: 100%;">
                    <span class="dd">详细地址</span>
                    <span class="dd">
                      <el-input placeholder="请输入" size="mini" v-model="detailsInfo.address">
                      </el-input>
                    </span>
                  </div>
                </div> -->
              </div>
            </div>
            <div class="condition">
              <div class="clearfix">
                <div class="common-select">
                  <div class="select-title" style="width: 0.8rem">转其他库</div>
                  <div class="select-content" style="width: calc(100% - 0.8rem); margin-right: 0.2rem; border: none">
                    <el-select class="el-select-inners" v-model="editInfo.otherstore" size="mini" placeholder="" clearable>
                      <el-option v-for="item in otherstores" :key="item.dd_key" :label="item.dd_value"
                        :value="item.dd_key"></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="common-select">
                  <div class="select-title" style="width: 0.8rem">共享客户</div>
                  <div class="select-content" style="width: calc(100% - 0.8rem); margin-right: 0;">
                    <el-autocomplete class="el-input-inners" v-model="editInfo.shareusername" :trigger-on-focus="false"
                      :fetch-suggestions="querySearchId" size="mini" placeholder="请输入业务员姓名" clearable></el-autocomplete>
                  </div>
                </div>
                <div class="common-select">
                  <div class="select-title" style="width: 0.8rem">跟进步骤</div>
                  <div class="select-content" style="width: calc(100% - 0.8rem); margin-right: 0.2rem; border: none">
                    <el-select class="el-select-inners" v-model="visit" size="mini" placeholder="" clearable>
                      <el-option v-for="item in steps" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="common-select">
                  <div class="select-title" style="width: 0.8rem">预约回访</div>
                  <div class="select-content"
                    style="height: 0.3rem; width: calc(100% - 0.8rem); margin-right: 0; border: none">
                    <el-date-picker class="el-date-picker-sigle" v-model="returnVisit" type="datetime" size="mini"
                      placeholder="" :picker-options="previstitimePickerOptions" clearable>
                    </el-date-picker>
                  </div>
                </div>
              </div>
              <div class="condition-bottom" @click="saveRecord">保存</div>
            </div>
            <div class="adInformation">
              <div class="title">
                <span></span>
                <span>广告投放信息</span>
              </div>
              <div class="adInformation_b">
                <div class="cb">
                  <span :title="detailsInfo.makedate">线索产生时间：{{ detailsInfo.makedate }}</span>
                  <span :title="detailsInfo.channelname">渠道类型：{{ detailsInfo.channelname }}</span>
                </div>
                <!-- <div class="cb">
                  <span :title="detailsInfo.planid">广告计划ID：{{detailsInfo.planid}}</span>
                </div>
                <div class="cb">
                  <span :title="detailsInfo.planname">
                    广告计划名称：<a style="cursor: pointer; color: #578EE7;" href="#"
                      @click="disVideoUrl(detailsInfo)">{{detailsInfo.planname}}</a>
                  </span>
                </div>
                <div class="cc">
                  <span :title="detailsInfo.module_id">组件ID：{{detailsInfo.module_id}}</span>
                  <span :title="detailsInfo.module_name">组件名称：{{detailsInfo.module_name}}</span>
                </div> -->
                <div class="cc">
                  <span :title="detailsInfo.clue_sourcename">线索来源：{{ detailsInfo.clue_sourcename }}</span>
                  <span :title="detailsInfo.appname">流量来源：{{ detailsInfo.appname }}</span>
                </div>
                <div class="cb">
                  <span :title="detailsInfo.area">自动定位城市：{{ detailsInfo.area }}</span>
                </div>
                <div class="cb" style="width: 90%;">
                  <span :title="detailsInfo.pageurl">
                    推广页面：<a style="cursor: pointer; color: #578EE7;" href="#" @click="disPageUrl(detailsInfo)">{{
                      detailsInfo.pageurl }}</a>
                  </span>
                </div>
              </div>
            </div>
  
            <div class="tableBox">
              <div class="title">
                <span></span>
                <span>客户通话记录</span>
                <span>累计通话时长{{ callSum }}分钟</span>
              </div>
              <div class="tableContent">
                <el-table :data="callDataList" border style="width: 100%" height="250">
                  <el-table-column prop="calltime" label="拨打时间" align="center" :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column prop="username" label="拨打业务员" width="97" align="center" :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column prop="isconnect" width="70" align="center" label="接通">
                  </el-table-column>
                  <el-table-column prop="timeduration" label="时长" align="center" width="70" :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column align="center" label="录音" width="70">
                    <template slot-scope="scope" v-if="scope.row.recordurl">
                      <img class="play-icon" src="../../static/images/pause-icon.png" alt=""
                        @click="audioPause(scope.$index)" v-if="!audioPaused && scope.$index === currentCallIndex">
                      <img class="play-icon" src="../../static/images/play-icon.png" alt="" @click="audioPlay(scope.$index)"
                        v-else>
                      <a style="margin-left: 8px;font-size: 15px;vertical-align: middle;" :href="scope.row.recordurl"
                        :download="scope.row.username + '_' + detailsInfo.name + '_' + scope.row.calltimeType" title="下载">
                        <i class="el-icon-download"></i>
                      </a>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
  
  
        <div class="drawerRight" style="width: 31%;">
          <div class="title">
            <span></span>
            <span>跟进记录</span>
          </div>
          <!-- <div class="cjg-search-section " style="display: flex; justify-content: center;align-items: center;">
            <el-select v-model="cjgTitle" :loading="loading" filterable remote :remote-method="remoteMethod"
              placeholder="搜索藏经阁内容" @change="cjgChange" @focus="cjgfocus" class="cjgserach" style="width: 100%;">
              <el-option v-for="item in cjgList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div> -->
          <div class="inputBox">
            <el-input v-model="followrecord" id="textarea" type="textarea" placeholder="添加跟进记录…"></el-input>
          </div>
          <div class="numBox">
            <div class="num">共{{ releaseNum }}条</div>
            <div class="button">
              <span @click="cancel">取消</span>
              <span @click="release">发布</span>
            </div>
          </div>
          <div class="drawercontentBox">
            <ul>
              <li v-for="(item, index) in records" :key="index">
                <div class="li_t">
                  <div v-html="item.remark">
                  </div>
                </div>
                <div class="li_b">
                  <div class="li_b_l" :title="item.name">{{ item.oprname }}</div>
                  <div class="li_b_r">{{ item.makedate }} 创建
                    <span class="mobile-icon el-icon-delete" @click="deleteRemark(item.remarkserialno)"
                      style="color:#979797"></span>
                  </div>
  
                </div>
              </li>
            </ul>
          </div>
        </div>
  
  
        <div class="drawerRight isDealed" style="width: 28%;">
          <div class="title">
            <span></span>
            <span>保障详情</span>
          </div>
          <ul class="order-list" v-loading="detail_loading">
            <li class="item" v-for="(item, index) in policyList" :key="index">
              <div class="head">
                <div class="txt" @click="showEditPopup(item)">{{ item.riskname }}</div>
                <div class="status"
                  :class="[item.status === 'processing' ? 'processing' : '', item.status === 'invalid' ? 'invalid' : '', item.status === 'cancel' ? 'cancel' : '']">
                  <template v-if="item.status === 'effective'">保障中</template>
                  <template v-if="item.status === 'processing'">待处理</template>
                  <template v-if="item.status === 'invalid'">已失效</template>
                  <template v-if="item.status === 'cancel'">已终止</template>
                </div>
              </div>
              <ul class="info-list">
                <div class="info">
                  <span class="l">投保日期:</span>
                  <span>{{ item.accepttime }}</span>
                </div>
                <div class="info">
                  <span class="l">生效日期:</span>
                  <span>{{ item.cvalidate }}</span>
                </div>
                <div class="info">
                  <span class="l">保单号:</span>
                  <span>{{ item.contno }}</span>
                </div>
                <div class="info">
                  <span class="l">投保人:</span>
                  <span>{{ item.appname }}</span>
                </div>
                <div class="info">
                  <span class="l">被保人:</span>
                  <span>{{ item.insname }}</span>
                </div>
                <div class="info">
                  <span class="l">保险金额:</span>
                  <span>{{ item.amnt }}</span>
                </div>
                <div class="info">
                  <span class="l">保障期限:</span>
                  <span>{{ item.insuyearvalue }}</span>
                </div>
                <div class="info">
                  <span class="l">保费:</span>
                  <span>{{ item.prem }}</span>
                </div>
                <div class="info">
                  <span class="l">缴费方式:</span>
                  <span>{{ item.payintvvalue }}</span>
                </div>
                <div class="info">
                  <span class="l">缴费年期:</span>
                  <span>{{ item.payendyearvalue }}</span>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </el-drawer>
      <!-- 录音播放器 -->
      <audio :src="audioSrc" ref="audio1"></audio>
      <!-- 查看详情弹窗 -->
      <view-details :datas="detailObj" :showEditPopupDialogVisible.sync="showEditPopupDialogVisible"
        @updateVisible="updateVisibleId"></view-details>
    </div>
  </template>
  <script>
  import viewDetails from "../../components/viewDetails.vue";
  import moment from "../../static/js/moment.js"
  import { getData, my_url, crm_url } from '../../static/js/ajax.js';
  import { formatDate, checkMobile } from '../../static/js/common.js';
  export default {
    components: {
      viewDetails
    },
    data() {
      return {
        //菜单
        CJGselectValue: '服务客户', // 01 服务客户 02失效保单 03终止保单 04 生日保单
        //表格参数
        tableData: [],
        types: '',
        aa: [],
        pageTotal: 0,
        pageSize: 20,
        pageNum: 1,
        loading: false,
        detail_loading: false,
        //筛选查询
        contno: '', //保单号
        cusmobile: '电话号码', //显示的电话号码
        cusMobileWxno: '', //客户电话号码或者微信值
        cusname: '', //客户姓名
  
  
        //查看编辑弹窗
        showEditPopupDialogVisible: false,
        restaurants: [], //所有业务员
        detailObj: {},
        //修改投保人
        editName: "",
        editSex: '',
        editBirthdy: '',
        editprovincename: '',
        editcityname: '',
        editcountryname: "",
        editAddress: '',
        editSexList: [{
          dd_value: '男',
          dd_key: '0'
        }, {
          dd_value: '女',
          dd_key: '1'
        }],
        //修改被保人
        editRelatoapp: "",
        editinName: '',
        editinSex: '',
        editinBirthdy: '',
        editinsprovincename: '',
        editinscityname: "",
        editinscountryname: '',
        editinAddress: '',
        visitstateList: [], //回访状态列表
        editvisitstate: '', //回访状态
        //侧拉
        drawer: false,
        detailsInfo: '',
        mobileInputShow: false,
        activitytag: '', //标签
        activitytags: [],
        age: '50',
        sex: '',
        wxno: '',
        wxnostr: '',
        email: '',
        mobileprovince: '',
        mobilecity: '',
        mobilecountry: '',
        address: '',
        addMoblie: '',
        mobileList: [],
        sexs: '',
        birthday: '',
        addMobliePopVisible: false,
        editInfo: {
          shareuserid: '',
          otherstore: '',
          shareusername: ''
        },
        otherstores: [],
        visit: '已成交',
        returnVisit: '',
        sexs: [{
          key: '男',
          value: '男'
        }, {
          key: '女',
          value: '女'
        }],
        steps: [],
        previstitimePickerOptions: { //控制时间范围
          disabledDate(time) {
            return time.getTime() < (Date.now() - (24 * 60 * 60 * 1000))
          }
        },
        releaseNum: '',
        callSum: '',
        followrecord: '',
        callDataList: [],
        records: [],
        policyList: [],
        ceMobile: '',
        ceActivityserialno: '',
        ceBirthday: '',
        iscall: 'N',
        // 录音
        audioPaused: true,
        currentCallIndex: '',
        audioSrc: '',
        pickerOptions: {
          shortcuts: [{
            text: '今日',
            onClick(picker) {
              const end = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
              const start = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
              end.setTime(end.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '昨日',
            onClick(picker) {
              const end = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
              const start = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近7天',
            onClick(picker) {
              const end = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
              const start = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近30天',
            onClick(picker) {
              const end = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
              const start = new Date(formatDate(new Date(), 'yyyy-MM-dd'));
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
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
          }
          ]
        },
      }
    },
    mounted: function () {
      var val = this.$route.query.type || '01';
      if (val == '01') {
        this.CJGselectValue = '服务客户'
      } else if (val == '02') {
        this.CJGselectValue = '失效保单'
      } else if (val == '03') {
        this.CJGselectValue = '终止保单'
      } else if (val == '04') {
        this.CJGselectValue = '生日保单'
      }
      this.getConditionData();
      this.getIsCall();
      this.search(1); //搜索
    },
    methods: {
      // 筛选查询保单
      search(page) {
        var _this = this
        this.loading = true
        var cusmobile, cuswxno = ''
        if (this.cusmobile == '电话号码') {
          cusmobile = this.cusMobileWxno.trim()
        } else {
          cuswxno = this.cusMobileWxno
        }
        getData('post', my_url + '/crm/auth/getToken.do', data => {
          if (data.code == 0) {
            var tabData = {}
            var inteUrl = ''
            if (_this.CJGselectValue == '服务客户' || _this.CJGselectValue == '生日保单') {
              tabData = {
                // "token": data.token,
                "contno": this.contno.trim(),
                // "name": this.cusname,
                // "mobile": cusmobile.trim(),
                // "wxno": cuswxno,
                "cusname": this.cusname,
                "cusmobile": cusmobile.trim(),
                "wxno": cuswxno,
                "pageNumber": page,
                "pageSize": this.pageSize,
                "menutype": "75000000",
                // "followupstep": "'07'"
              }
              if (_this.CJGselectValue == '生日保单') {
                tabData['isbirthdayquery'] = "Y"
              } else {
                tabData['isidquery'] = "Y"
              }
              inteUrl = my_url + '/crm/activity/getClienServerList.do'
            } else if (_this.CJGselectValue == '失效保单' || _this.CJGselectValue == '终止保单') {
              tabData = {
                "token": data.token,
                "contno": this.contno.trim(),
                "cusname": this.cusname,
                "cusmobile": cusmobile.trim(),
                "wxno": cuswxno,
                "pageNumber": page,
                "pageSize": this.pageSize,
              }
              tabData['state'] = "74"
              if (_this.CJGselectValue == '终止保单') {
                // tabData['state'] = "70','72','73','75"  //72犹豫期退保
                tabData['state'] = "70','73','75"
              }
              inteUrl = crm_url + 'insure.meihualife.com/crm_web/getPolicyList.do'
            }
            getData('post', inteUrl, function (data) {
              _this.loading = false
              let {
                rows,
                total
              } = data;
              console.log(data)
              const genderArr = ['男', '女']
              if (rows) {
                rows.forEach(res => {
                  if (res.channel == "8001") {
                    res['channelname'] = res.channeldetailname
                  }
                  if (res.birthday) {
                    var birthday = res.birthday
                    res.birthday = birthday.split(" ")[0]
                  }
  
                  if (res.appidno) {
                    res["sex"] = genderArr[res.appidno.substr(16, 1) % 2]
                    res["sex"] = genderArr[res.appidno.substr(16, 1) % 2]
                    res["chu"] = res.appidno.substr(6, 4) + '-' + res.appidno.substr(10, 2) + '-' + res.appidno.substr(12, 2)
                    res["age"] = _this.getAgeByBirthday(res.appidno.substr(6, 4) + '-' + res.appidno.substr(10, 2) + '-' + res.appidno.substr(12, 2))
                  }
                })
              }
              console.log(rows)
              _this.tableData = rows
              _this.pageTotal = total
            }, tabData);
          }
        });
      },
  
  
      getAgeByBirthday(birth) {
        let age = 0
        const birthYear = birth.substr(0, 4)
        const birthMonth = birth.substr(5, 2)
        const birthDay = birth.substr(8, 2)
        const nowDate = new Date()
        const nowYear = nowDate.getFullYear()
        const nowMonth = nowDate.getMonth() + 1
        const nowDay = nowDate.getDate()
        age = nowYear - birthYear
        if (nowMonth < Number(birthMonth) || (nowMonth == Number(birthMonth) && nowDay < Number(birthDay))) age--
        return age
      },
  
      // 筛选项值为空
      screenReset() {
        this.contno = '';
        this.cusMobileWxno = '';
        this.cusname = '';
        this.search(1)
      },
      handle(item) {
        console.log(item)
        this.drawer = true;
  
        this.ceBirthday = item.chu
        this.ceMobile = item.mobile
        this.ceActivityserialno = item.activityserialno
        console.log(item)
  
        // this.ceBirthday = item.birthday
        this.getTableData()
        this.getOrderData()
        this.getReleaseData()
        this.getCallData()
        this.getmobileList()
      },
  
      //共享客户
      querySearchId() { },
      //保存
      saveRecord() { //保存记录
        let _this = this;
  
        if (this.email != null && this.email != '') {
          if (!checkEmail(this.email)) {
            _this.$message({
              showClose: true,
              message: '邮箱格式不正确！',
              duration: 3000,
              type: 'error'
            });
            return;
          }
        }
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
  
        let save_share_id = '';
  
        let params = {
          name: this.detailsInfo.name, //注册姓名
          mobile: this.detailsInfo.mobilestr,
          sex: this.detailsInfo.sex,
          birthday: this.detailsInfo.birthday,
          wxno: this.detailsInfo.wxno,
          email: this.detailsInfo.email,
          address: this.detailsInfo.address,
          followupstep: '07', //跟进步骤
          activityserialno: this.detailsInfo.activityserialno, //线索流水号
          // activitytag: this.activitytag.join(),
          // age: this.age,
          // mobile: this.detailsInfo.mobilestr,
          // previstitime: this.formatDate(this.returnVisit, 'yyyy-MM-dd HH:mm:ss'), //预约回访时间
          // oldprevistitime: this.formatDate(this.detailsInfo.previstitime, 'yyyy-MM-dd HH:mm:ss'),
          // otherstore: this.editInfo.otherstore,
          // shareuserid: save_share_id,
          // activityuserid: this.detailsInfo.userid,
          // mobileprovince: this.mobileprovince,
          // mobilecity: this.mobilecity,
          // mobilecountry: this.mobilecountry,
        };
  
        console.log(this.detailsInfo)
        getData('post', my_url + '/crm/activity/activityUpdate.do', function (data) {
          _this.followrecord = '';
          if (data.code == 0) {
            setTimeout(() => {
              _this.$message({
                showClose: true,
                message: '保存成功!',
                duration: 3000,
                type: 'success'
              });
  
              _this.search();
            }, 1000);
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: 'error'
            });
          }
          loading.close();
          _this.drawer = false;
        }, params);
      },
  
  
      //跟进记录取消
      cancel() {
        this.followrecord = '';
      },
      //跟进记录发布
      release() {
        let _this = this;
        let arr = [],
          remarkStr = '';
        this.followrecord.split('\n').forEach(item => arr.push(`<p>${item.trim()}</p>`));
        remarkStr = arr.join("");
        let params = {
          remark: remarkStr,
          activityserialno: this.ceActivityserialno
        }
        getData('post', my_url + '/crm/activity/activityRemark.do', function (data) { //团队
          _this.followrecord = '';
          if (data.code == 0) {
            _this.$message({
              showClose: true,
              message: '发布成功!',
              duration: 3000,
              type: 'success'
            });
            _this.getReleaseData();
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: 'error'
            });
          }
        }, params);
      },
      //线索详情
      getTableData() {
        let _this = this;
        var params = {
          "mobile": _this.ceMobile,
          "followupstep": "07",
          "pageNumber": 1,
          "pageSize": 20,
          "queryflag": "02",
          // "menutype": "75000000",
        }
        getData('post', my_url + '/crm/activity/getActivityList.do', function (data) {
          if (data.total == 0) {
            _this.detailsInfo = ''
            _this.$message({
              type: "error",
              duration: 3000,
              message: "线索不在你这里，请联系杜燕进行调配"
            })
            // alert('线索不在你这里,请联系管理员')
          } else {
            _this.detailsInfo = data.rows[0]
          }
  
  
        }, params);
  
      },
      //线索详情推广页面弹窗
      disPageUrl(row) {
        if (row.pageurl != null && row.pageurl != '') {
          window.open(row.pageurl,
            '_blank',
            'width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no');
        } else if (row.channel == '0004' && row.pagetype == '1yuango/0001') {
          window.open(crm_url + 'insure.meihualife.com/life/activity/oneyuangodis.do',
            '_blank',
            'width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no');
        } else {
          window.open(crm_url + 'insure.meihualife.com/life/activity/channelActivity.do?channelCode=' + row
            .channel + '&pageType=' + row.pagetype + '&planId=' + row.planid,
            '_blank',
            'width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no');
        }
      },
      //线索详情广告计划弹窗
      disVideoUrl(row) {
        if (row.videourl != null && row.videourl != '') {
          window.open(row.videourl,
            '_blank',
            'width=600px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no');
        }
      },
      //改变手机号
      addMoblieChange(val) {
        if (checkMobile(val)) {
          this.mobileInputShow = true
        } else {
          this.mobileInputShow = false
        }
      },
  
      // 获取电话列表
      getmobileList() {
        let _this = this;
        getData('post', my_url + '/crm/activity/getActivityMobileList.do', function (data) {
          if (data.code == 0) {
            var mobilelist = []
            data.moibleList.forEach(function (item) {
              mobilelist.push({
                phone: item
              })
            })
            _this.mobileList = mobilelist;
          }
        }, {
          activityid: this.ceActivityserialno
        });
      },
      //添加 号码
      mobileAdd() {
        var _this = this;
        // var addMoblieStr = _this.addMoblie
        getData('post', my_url + '/crm/activity/activityAddMobile.do', function (data) {
          if (data.code == '0') {
            _this.getmobileList();
            _this.$message({
              type: "success",
              duration: 3000,
              message: "添加成功！"
            })
            _this.addMoblie = "";
          } else {
            _this.$message({
              type: "error",
              duration: 3000,
              message: data.msg
            })
          }
        }, {
          activityid: this.ceActivityserialno,
          mobile: this.addMoblie
        });
      },
      //取消
      mobileCancle() {
        this.addMoblie = "";
        this.mobileInputShow = false
      },
      //置顶
      mobileToTop(scope) {
        let _this = this;
        getData('post', my_url + '/crm/activity/activityUpdateMobile.do', function (data) {
          if (data.code == '0') {
            _this.getmobileList()
            _this.$message({
              type: "success",
              duration: 3000,
              message: "置顶成功！"
            })
            _this.ceMobile = scope.row.phone;
            _this.detailsInfo.mobilestr = scope.row.phone;
            _this.getOrderData()
          } else {
            _this.$message({
              type: "error",
              duration: 3000,
              message: data.msg
            })
          }
        }, {
          activityid: this.ceActivityserialno,
          mobile: scope.row.phone
          // mobile:18611158884
        });
      },
  
      //删除
      mobileDelete(scope) {
        let _this = this;
        _this.deleteMobile = scope.row.phone
        getData('post', my_url + '/crm/activity/activityDeleteMobile.do', function (data) {
          if (data.code == '0') {
            _this.getmobileList()
            _this.$message({
              type: "success",
              duration: 3000,
              message: "删除成功！"
            })
          } else {
            _this.$message({
              type: "success",
              duration: 3000,
              message: data.msg
            })
          }
        }, {
          activityid: this.ceActivityserialno,
          mobile: this.deleteMobile
        });
      },
  
  
      // 录音详情
      getCallData() {
        let _this = this;
        let params = {
          activityserialno: this.ceActivityserialno
        }
        getData('post', my_url + '/crm/activity/getCallList.do', function (data) {
          if (data.code == '0') {
            let arr = data.callList.map((item) => {
              var calltimeType = item.calltime.replace(/-|:|_|\s/g, "");
              return Object.assign({}, item, { calltimeType: calltimeType })
            })
            _this.callDataList = arr;
            _this.callSum = data.callSum;
          }
        }, params);
      },
      // 保单详情
      getOrderData() {
        let _this = this;
        _this.detail_loading = true
        getData('post', my_url + '/crm/activity/getPolicyInfoByAppntMobile.do', function (data) {
          if (data.code == '0') {
            var arr = [];
            data.policyList.forEach((item) => {
              if (item.status === 'effective') {
                arr.unshift(item)
              } else {
                arr.push(item)
              }
            })
            _this.policyList = arr;
            _this.detail_loading = false
          }
        }, {
          mobile: this.ceMobile
        });
      },
      // 跟进记录
      getReleaseData() { //发布的列表
        let _this = this;
        let params = {
          activityserialno: this.ceActivityserialno
        }
        getData('post', my_url + '/crm/activity/getRemarkList.do', function (data) {
          let {
            total,
            rows
          } = data;
          _this.releaseNum = rows.length;
          rows.forEach(res => {
            if (res.name) {
              res.name = _this.detailsInfo.name;
            }
            res.remark = res.remark.replace(/:/g, '：');
          })
          _this.records = rows;
  
        }, params);
      },
      // 删除跟进纪录
      deleteRemark(id) {
        let _this = this;
        let params = {
          remarkid: id,
        }
        getData('post', my_url + '/crm/activity/activityRemarkDelete.do', function (data) {
          if (data.code == 0) {
            _this.$message({
              showClose: true,
              message: '删除成功!',
              duration: 3000,
              type: 'success'
            });
            _this.getReleaseData();
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: 'error'
            });
          }
        }, params);
      },
      getIsCall() {
        let _this = this;
        getData('post', my_url + '/crm/common/getIsCall.do', function (data) { //渠道类型
          if (data.code == 0) {
            _this.iscall = data.iscall;
          }
        }, null);
      },
      getConditionData() { //条件数据
        let _this = this;
        getData('post', my_url + '/crm/common/getDictList.do', function (data) { //跟进步骤
          if (data.code == 0) {
            _this.steps = data.dictList;
          };
        }, { dict_type: 'followupstep' });
        getData('post', my_url + '/crm/common/getDictList.do', function (data) { //标签 
          if (data.code == 0) {
            _this.activitytags = data.dictList;
          }
        }, { dict_type: 'activitytag' });
        getData('post', my_url + '/crm/common/getDictList.do', function (data) { //其他库 
          if (data.code == 0) {
            _this.otherstores = data.dictList;
          }
        }, { dict_type: 'otherstore' });
      },
      // 打电话
      phonecall_row(row) {
        this.$parent.onSend({ mobile: row.mobile, activityid: row.activityserialno });
        // this.phonecall(row.activityserialno, row.mobile);
      },
      // 拨打电话
      phonecall_page() {
        this.$parent.onSend({ mobile: this.ceMobile, activityid: this.ceActivityserialno });
        // this.phonecall(this.detailsInfo.activityserialno, this.ceMobile);
      },
  
      phonecall(activityid, phoneStr) {
        let _this = this;
        let params = { activityserialno: activityid, mobile: phoneStr };
        getData('post', my_url + '/crm/activity/activityCall.do', function (data) {
          if (data.code == 0) {
            _this.search();
            if (_this.iscall == 'Y') {
              let params = {
                Action: "DialCTI",
                dn: data.phoneno,
                anis: data.phoneprefix + phoneStr,
                cltid: data.callid
              };
              getPhoneData('post', 'http://' + data.phoneurl + '/CRM2CTI/', function (data) { }, params);
            }
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: 'error'
            });
          }
        }, params);
      },
      //查看详情
      showEditPopup(item) {
        var arr = []
        arr.push(item)
  
        getData('post', my_url + '/crm/auth/getToken.do', data => {
          if (data.code == 0) {
            var body = {
              token: data.token,
              contno: item.contno
            }
            getData('post', crm_url + 'insure.meihualife.com/crm_web/getOnePolicy.do', data => {
              console.log(data.rows)
              if (data.rows.length > 1) {
                this.detailObj = data.rows;
              } else {
                this.detailObj = arr
              }
  
            }, body)
          }
        })
        this.showEditPopupDialogVisible = true;
      },
      updateVisibleId(e) {
        console.log(123123213, e)
        this.showEditPopupDialogVisible = e;
      },
      //跳转页数
      pageClick(page) {
        this.pageNum = page;
        this.search(page)
      },
  
      //当表格的排序条件发生变化的时候会触发该事件
      sortChange(val) {
        this.order = val.order
        this.prop = val.prop
        this.search(1);
      },
      //当选择项发生变化时会触发该事件
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.checkedAllNum = val.length;
      },
      // 播放录音
      audioPlay(index) {
        let _this = this;
        let audio = this.$refs.audio1;
        this.currentCallIndex = index
        this.audioSrc = this.callDataList[index].recordurl
        this.$nextTick(() => {
          audio.play()
          _this.audioPaused = false
        })
      },
      audioPause(index) {
        let _this = this;
        let audio = this.$refs.audio1
        this.currentCallIndex = index
        this.$nextTick(() => {
          audio.pause();
          _this.audioPaused = true
        })
      },
    }
  }
  
  </script>
  <style src="../../static/css/drawer.css"></style>
  <style>
  .el-drawer__body {
    display: flex;
  }
  
  /* .el-dialog .el-dialog__body {
    padding: 0;
  } */
  
  .head .txt {
    cursor: pointer;
  }
  
  .el-tooltip__popper {
    max-width: 330px !important;
  }
  
  .source-level span,
  .top .biaozhu {
    display: inline-block;
    width: 0.17rem;
    height: 0.17rem;
    background: url(../../static/images/biaozhu.png) no-repeat;
    background-size: 100% 100%;
    margin-left: 0.01rem;
    vertical-align: middle;
    margin-bottom: 0.03rem;
  }
  
  .el-popover__reference-wrapper {
    display: flex;
    height: 100%;
    align-items: center;
  }
  </style>