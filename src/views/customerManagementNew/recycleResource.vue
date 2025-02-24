<template>
  <div class="customerManagementNew  Container">
    <div class="container-top">

      <!-- 信息检索 -->
      <div class="container-top-two" style="overflow-x: auto;overflow-y: hidden;">

        <div class="container-search-box">

          <div class="common-select">
            <div class="select-title  filtitle">线索产生时间</div>
            <div class="select-content filContent">
              <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="daterange" align="right" size="mini" unlink-panels range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>

          <div class="common-select" style="display: none;">
            <div class="select-title filtitle">跟进步骤</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="activeName" size="mini" placeholder="请选择跟进步骤" clearable>
                <el-option v-for="(item, index) in add_steps" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="common-select">
            <div class="select-title filtitle">渠道类型</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="channelValue" size="mini" @change="channelSelect" placeholder="请选择渠道类型" clearable>
                <el-option v-for="(item, index) in channelList" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title filtitle">流量来源</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="appnameValue" size="mini" placeholder="请选择流量来源" clearable>
                <el-option v-for="(item, index) in sourceList" :key="index" :label="item.dd_value" :value="item.dd_value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select">
          </div>

          <div class="common-select" style="width:6%">
            <div class="my-customers" v-show="ismyUse && dis_P4_up">
              <el-checkbox size="mini" v-model="queryflag">我的客户</el-checkbox>
            </div>
          </div>

          <div class="common-select" v-show="dis_P4_up">
            <div class="select-title filtitle">选择团队</div>
            <div class="select-content filContent">
              <el-dropdown trigger="click" placement="bottom" ref="disTeam2">
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
            <div class="select-title filtitle">业务员姓名</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" placeholder="请选择" size="mini" v-model="overviewForm.userid" @change="userNameChange" clearable>
                <el-option v-for="item in userNameOptions" :key="item.userid" :label="item.username" :value="item.userid">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="common-select">
            <div class="select-title filtitle">客户姓名</div>
            <div class="select-content filContent">
              <el-input class="el-input-inners" v-model="Salesman" size="mini" placeholder="请输入客户姓名" clearable></el-input>
            </div>
          </div>

          <div class="common-select">
            <div class="select-title filtitle">
              <el-select class="el-input-title-inners" v-model="phoneWxno" placeholder="请选择" size="mini">
                <el-option label="电话号码" value="电话号码"></el-option>
                <el-option label="微信号" value="微信号"></el-option>
              </el-select>
            </div>
            <div class="select-content   filContent">
              <el-input class="el-input-inners" v-model="phoneWxnoValue" align="right" placeholder="请输入电话号码" size="mini" clearable></el-input>
            </div>
          </div>
          <div class="common-select" v-show="!dis_P4_up">
          </div>

          <div class="common-select" v-show="!dis_P4_up">
          </div>

          <div class="common-select" style="width:4%">
            <div class="search-box-right">
              <div style="display: flex;">
                <div class="search-btn searchLeft" @click="search(1)">搜索</div>
                <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);  display: none;" @click="reset">重置
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <!-- 中间部分内容 -->
    <!-- <div class="container-middle">
          <div class="container-middle-one">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane v-for="(item, index) in add_steps" :name="item.dd_key" :key="index">
                <p slot="label" class="source-level">{{ item.dd_value }}
                  <el-tooltip popper-class="atooltip qq" effect="light" placement="top">
                    <template slot="content">
                      <p>{{ item.roule }}</p>
                      <p>{{ item.bignum }}</p>
                    </template>
                    <span></span>
                  </el-tooltip>
                </p>
              </el-tab-pane>
            </el-tabs>
          </div>
    
        </div> -->
    <!-- 表格内容 -->
    <div class="container-table">

      <!-- 调配资源 -->
      <div class="check-all-box" v-if="isArticle">
        <div>
          <el-checkbox v-model="checkedAll">全选</el-checkbox>
          {{ checkedAllNum }}个客户
        </div>

        <div class="container-middle-two" style="float: right;">
          <div class="search-btn" @click="dataEntry" style="width:auto; padding: 0.03rem 0.08rem; display: none;">日数据录入</div>
          <el-popover popper-class="entry-customer-popper" class="entry-customer" placement="bottom-start" width="3.31rem" trigger="click" v-model="inputUserVisable">
            <div class="search-btn" slot="reference" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D;">客户录入
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">资源等级</div>
              <div class="select-content" style="width:2rem;border: none">
                <el-select class="el-select-inners" v-model="inputUserform.sourcelevel" placeholder="请选择资源等级">
                  <el-option label="A重疾" value="A"></el-option>
                  <el-option label="A理财" value="A+"></el-option>
                  <el-option label="B" value="B"></el-option>
                  <el-option label="C" value="C"></el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">批次号</div>
              <div class="select-content" style="width:2rem;border: none;">
                <el-select class="el-select-inners" v-model="inputUserform.batchno" placeholder="请选择批次号">
                  <el-option label="群加资源" value="群加资源"></el-option>
                  <el-option label="转介绍" value="转介绍"></el-option>
                  <el-option label="其他资源" value="其他资源"></el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">客户姓名</div>
              <div class="select-content" style="width: 2rem;">
                <el-input class="el-input-inners" v-model="inputUserform.name" size="mini" placeholder="请输入客户姓名" clearable></el-input>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">电话号码</div>
              <div class="select-content" style="width: 2rem;">
                <el-input class="el-input-inners" v-model="inputUserform.mobile" size="mini" placeholder="请输入电话号码" clearable></el-input>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">微信</div>
              <div class="select-content" style="width: 2rem;">
                <el-input class="el-input-inners" v-model="inputUserform.wxno" size="mini" placeholder="请输入微信号" clearable></el-input>
              </div>
            </div>
            <div class="sure-footer" style="padding-bottom: 0;">

              <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="inputUserCancel">取消</div>
              <div class="my-sure" @click="inputUserSubmit">确定</div>
            </div>
          </el-popover>

          <el-popover popper-class="entry-customer-popper" placement="bottom-start" width="3.31rem" trigger="click" v-model="resourceDeployVisable" @show="resourceDeployShow">
            <div class="search-btn resourceAllocation" slot="reference">资源调配
            </div>
            <div class="common-select">
              <div class="select-title  newsalesperson">新所属业务员</div>
              <div class="select-content filContentNoborder" style="width: 2rem;">
                <el-autocomplete class="el-input-inners" v-model="editInfo.shareusername" :fetch-suggestions="querySearchId" placeholder="请输入新所属业务员" :trigger-on-focus="false" @select="handleSelectId"></el-autocomplete>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title newsalesperson">新跟进步骤</div>
              <div class="select-content" style="width:2rem;border: none;">
                <el-select class="el-select-inners" v-model="resourceDeployform.followupstep" placeholder="请选择新跟进步骤">
                  <el-option v-for="item in select_steps" :label="item.dd_value" :value="item.dd_key" :key="item.dd_key"></el-option>
                </el-select>
              </div>
            </div>
            <div class="sure-footer" style="padding-bottom: 0;">

              <div class="my-sure resourceCancel" @click="resourceDeployCancel">取消</div>
              <div class="my-sure" @click="resourceDeploySubmit">确定</div>
            </div>
          </el-popover>
          <el-popover popper-class="entry-customer-popper" v-show="dis_Pz_up" placement="bottom-start" width="3.31rem" trigger="click" v-model="deleteSourceVisable">
            <div class="search-btn resourceDel" slot="reference">资源删除
            </div>
            <div class="sure-footer" style="padding-bottom: 0;">

              <div class="my-sure resourceCancel" @click="deleteSourceCancel">取消</div>
              <div class="my-sure" @click="deleteSourceSubmit">确定</div>
            </div>
          </el-popover>

          <el-popover popper-class="entry-customer-popper" placement="bottom-start" trigger="click" width="3.31rem" v-model="sable">
            <!-- <el-button slot="reference" size="mini" plain>选择显示列表</el-button> -->
            <div class="search-btn resourceDel" style="display: none;" slot="reference">选择显示列表
            </div>
            <el-checkbox-group ref="inputUserform1" v-model="inputUserform1" class="main-left" style="width: 1.5rem;">
              <el-checkbox label="menudate">线索入库时间</el-checkbox>
              <el-checkbox label="makedate">线索产生时间</el-checkbox>
              <el-checkbox label="firstcalltime">首次拨打时间</el-checkbox>
              <el-checkbox label="lastcalltime">最新拨打时间</el-checkbox>
              <el-checkbox label="callcount" :disabled='!dis_P4_up'>累计拨打次数</el-checkbox>
              <el-checkbox label="cusdealtime">客户成交时间</el-checkbox>
              <el-checkbox label="cusdealperiod">客户成交周期</el-checkbox>
              <el-checkbox label="batchno">批次号</el-checkbox>
              <el-checkbox label="clueid">线索ID</el-checkbox>
              <el-checkbox label="accountid">广告主ID</el-checkbox>
              <el-checkbox label="accountname">广告主名称</el-checkbox>
              <el-checkbox label="planid">广告计划ID</el-checkbox>
              <el-checkbox label="planname">广告计划名称</el-checkbox>
              <el-checkbox label="module_id">组件ID</el-checkbox>
              <el-checkbox label="module_name">组件名称</el-checkbox>
              <el-checkbox label="clue_sourcename">线索来源</el-checkbox>
              <el-checkbox label="channelname">渠道类型</el-checkbox>
              <el-checkbox label="appname">流量来源</el-checkbox>
              <el-checkbox label="area">自动定位城市</el-checkbox>
              <el-checkbox label="pageurl">推广页面</el-checkbox>
              <div class="sure-footer" style="border-top: 1px solid rgba(221, 221, 221, 1); margin-top: 0.15rem;">

                <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="inputUserCancel">取消</div>
                <div class="my-sure" @click="checkedSure">确定</div>
              </div>
            </el-checkbox-group>
          </el-popover>

        </div>

      </div>

      <!-- 表格内容 -->

      <div class="check-all-table">
        <el-table v-if="isArticle" :data="tableData" ref="multipleTable" border v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange" @sort-change="sortChange">
          <el-table-column key="1" type="selection" width="40">
          </el-table-column>
          <el-table-column key="2" type="index" label="序号" align="center" width="60">
          </el-table-column>
          <el-table-column key="3" label="客户姓名" width="100" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="cursor: pointer;" type="text" size="small" @click="handle(scope.row)">{{ scope.row.name ||
                  "空" }}</span>
            </template>
          </el-table-column>
          <el-table-column key="4" align="center" label="电话号码" width="140" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span class="call-a" v-if="queryflagString == '02'">{{ scope.row.mobile }}</span>
              <span class="call-a" :class="scope.row.callcount > 0 ? 'active' : ''" @click="phonecall_row(scope.row)" style="    color: #8f9198;" v-else>
                {{ scope.row.mobilestr }}
                <img style="margin-left: 5px;" src="../../static/images/call-icon.png" /></span>
            </template>
          </el-table-column>
          <el-table-column key="5" align="center" label="微信号" width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span class="call-a" v-if="queryflagString == '02' && scope.row.wxno == null"></span>
              <span class="call-a" v-else-if="queryflagString == '02' && scope.row.wxno != ''">****</span>
              <span class="call-a" :class="scope.row.callcount > 0 ? 'active' : ''" v-else>{{ scope.row.wxnostr
                    }}</span>
            </template>
          </el-table-column>
          <el-table-column key="6" align="center" label="跟进步骤" width="110" :show-overflow-tooltip="true">
            <template slot="header">
              <p class="source-level">跟进步骤
                <el-tooltip popper-class="atooltip" effect="light" placement="top">
                  <template slot="content">
                    <div>
                      跟进步骤为“新资源”的线索，将会在线索产生时间7天后自动回收
                    </div>
                  </template>
                  <span></span>
                </el-tooltip>
              </p>
            </template>
            <template slot-scope="scope">
              <span class="call-a" v-if="scope.row.followupstepname">{{ scope.row.followupstepname }}</span>
              <span class="call-a" v-else>新资源</span>
            </template>
          </el-table-column>
          <el-table-column key="7" prop="username" align="center" label="所属业务员" width="100" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="8" v-if="queryflagString === '03'" align="center" label="共享业务员" width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.shareusername }}</span>
              <img src="../../static/images/delete-icon.png" alt="" style="cursor: pointer;vertical-align: -0.02rem;margin-left: 0.03rem;" @click="cancelShare(scope.row)">
            </template>
          </el-table-column>
          <el-table-column key="9" prop="sex" label="性别" align="center" width="80" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="10" prop="sourcelevel" label="" align="center" width="110" :show-overflow-tooltip="true">
            <template slot="header">
              <p class="source-level">资源等级
                <el-tooltip popper-class="atooltip" effect="light" placement="top">
                  <template slot="content">
                    <p>A：实时热线资源，且线索产生时间&lt;7天 </p>
                    <p>A-：热线资源，且7天&lt;线索产生时间&lt;1个月 </p>
                    <p>B+：热线资源，且线索产生时间&gt;1个月 </p>
                    <p>B：EXCEL导入（资源等级选择B），且分配次数=0 </p>
                    <p>B-：EXCEL导入的B类资源，且0&lt;分配次数&lt;=3 </p>
                    <p>C：EXCEL导入（资源等级选择C），且分配次数=0 </p>
                    <p>C-：EXCEL导入的C类资源，且0&lt;分配次数&lt;=3 </p>
                    <p>Z：其它所有资源（封存，不参与循环分配） </p>
                  </template>
                  <span></span>
                </el-tooltip>
              </p>
            </template>
          </el-table-column>
          <el-table-column key="11" prop="makedate" align="center" label="线索产生时间" width="155" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="12" v-if="dis_P4_up" prop="callcount" align="center" label="累计拨打次数" width="100" :show-overflow-tooltip="true">
          </el-table-column>
  
          <el-table-column key="16" style="display: none;" v-if="false" prop="pageurl" label="推广页面" width="150" :show-overflow-tooltip="true" align="center">
            <template slot-scope="scope">
              <a style="cursor: pointer;" href="#" @click="disPageUrl(scope.row)">{{ scope.row.pageurl }}</a>
            </template>
          </el-table-column>
          <el-table-column key="17" prop="previstitime" label="预约回访" min-width='200' width="auto" :show-overflow-tooltip="true" align="center" sortable="custom" class-name="yuyue">
            <template slot-scope="scope">
              {{ scope.row.previstitime ? formatDate(new Date(scope.row.previstitime), 'yyyy-MM-dd HH:mm:ss') : '' }}

              <el-popover popper-class="modify-icon" v-if="scope.row.previstitime" placement="left" width="220" height="50" :class="scope.row.activityserialno">
                <span slot="reference" class="mobile-icon el-icon-edit-outline" style="color:#DC240F;margin-left:5px"></span>

                <el-date-picker v-model="editPrevistitime" type="datetime" placeholder="选择日期时间" size="mini" :picker-options="previstitimePickerOptions">
                </el-date-picker>
                <br>
                <div class="sure-footer" style="padding-bottom: 0;">
                  <div class="my-sure" @click="editPrevistTime(scope)">确定</div>
                </div>
              </el-popover>

              <span v-if="scope.row.previstitime" class="mobile-icon el-icon-circle-check" @click="toggerIsVist(scope)" style="color:#DC240F;  line-height: 20px;"></span>
            </template>
          </el-table-column>
          <el-table-column key="18" prop="remark" align="left" label="跟进记录" width="220" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="13" prop="channelname" align="center" label="渠道类型" width="90" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="14" prop="clue_sourcename" align="center" label="线索来源" width="90" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="15" prop="appname" align="center" label="流量来源" width="100" :show-overflow-tooltip="true">
          </el-table-column>
          <!-- fixed="right" -->
        </el-table>

      </div>
      <div>
        <el-pagination background layout="total,prev, pager, next" :total="pageTotal" :page-size="pageSize" :current-page="pageNum" @current-change="pageClick">
        </el-pagination>
      </div>
    </div>
    <el-dialog custom-class="entry-data" title="日数据录入" :close-on-click-modal='false' :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <div class="entry-data-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">数据日期</div>
          <div class="select-content" style="height: 0.3rem; width: calc(100% - 1.6rem);  border: none">
            <el-date-picker class="el-date-picker-sigle" v-model="from.recorddate" value-format="yyyy-MM-dd 00:00:00" @change='selectDate' type="date" align="right" size="mini">
            </el-date-picker>
          </div>
          <em class="sign">可修改</em>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">热线新增量</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.hotlinecount" align="right" size="mini" :disabled="true" clearable></el-input>
          </div>
        </div>
      </div>
      <div class="entry-data-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">电话外拨量</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.callcount" align="right" size="mini" :disabled="true" clearable></el-input>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">电话接通量</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.connectcount" align="right" size="mini" :disabled="true" clearable></el-input>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">电话接通率</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.connectrate" align="right" size="mini" :disabled="true" clearable></el-input>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">线索拨打量</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.cluecallcount" align="right" size="mini" :disabled="true" clearable></el-input>
          </div>
        </div>
      </div>
      <div class="entry-data-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">话务时长（分钟）</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.callcentertime" align="right" size="mini" :disabled="true" clearable></el-input>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.8rem">非话务时长（分钟）</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.nocallcentertime" align="right" size="mini" clearable></el-input>
          </div>
          <em class="sign">可修改</em>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">总时长（分钟）</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.sumtime" align="right" size="mini" clearable></el-input>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">微信</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.wxcount" align="right" size="mini" clearable></el-input>
          </div>
          <em class="sign">可修改</em>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">保单检视</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.firstplancount" align="right" size="mini" clearable></el-input>
          </div>
          <em class="sign">可修改</em>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">计划书</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.secondplancount" align="right" size="mini" clearable></el-input>
          </div>
          <em class="sign">可修改</em>
        </div>

        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">渠道服务</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.claimcount" align="right" size="mini" clearable></el-input>
          </div>
          <em class="sign">可修改</em>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">促销T单</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.tdancount" align="right" size="mini" clearable></el-input>
          </div>
          <em class="sign">可修改</em>
        </div>
      </div>
      <div style="margin-top: 0.18rem; font-size: 0.14rem;">
        <span style="color: red;margin-right: 0.2rem;">*请仔细核对数据，一天只能提交一次日数据，如提交错误，请联系P5及以上人员进行冲正处理</span>
      </div>
      <div class="entry-data-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">本月目标（标保）</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="monthTarget" align="right" size="mini" clearable></el-input>
          </div>
          <em class="sign">可修改</em>
        </div>
      </div>
      <div class="entry-data-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">本周目标（标保）</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="weekTarget" align="right" size="mini" clearable></el-input>
          </div>
          <em class="sign">可修改</em>
        </div>
      </div>
      <div class="sure-footer">

        <div class="my-sure" style="background: #fff;border: 1px solid rgba(221, 221, 221, 1);color: #686868;" @click="dialogVisible = false">取消</div>
        <div class="my-sure" @click="sureData">提交</div>
      </div>
    </el-dialog>
    <el-dialog :title="CJGselectValue" :visible.sync="cjgdrawer" width="1100px" class="cjg-dialog">
      <div class="step-list wei-step-list" v-if="CJGselectValue === '保单检视'">
        <div class="item-section">
          <label>标题</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="bdjsItem.title" :disabled="true">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>保险公司</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="bdjsItem.insorganname" :disabled="true">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>保障详情</label>
          <div class="right-content">
            <div class="editor-box">
              <div id="div1" class="toolbar"></div>
              <div id="div2" class="text">
              </div>
            </div>
          </div>
        </div>
        <div class="item-section">
          <label>建议规划</label>
          <div class="right-content">
            <div class="editor-box">
              <div id="div3" class="toolbar"></div>
              <div id="div4" class="text"> </div>
            </div>
          </div>
        </div>
        <div class="item-section">
          <label>附件</label>
          <div class="right-content">
            <ul class="enclosure-list" v-if="fileList.length">
              <li class="item" v-for="(item, index) in fileList" :key="index">
                <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{ item.filename }}</div>
                <a :href="crm_url + 'crm.meihualife.com/filedownload.do?fileid=' + item.fileid" class="download-btn" :download="item.filename">下载</a>
              </li>
            </ul>
            <ul class="enclosure-list" v-else>
              <li class="item">暂无附件</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="step-list wei-step-list" v-if="CJGselectValue === '疾病核保'">
        <div class="item-section">
          <label>标题</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="jbhbItem.title" :disabled="true">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>疾病描述</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="jbhbItem.disdescription" :disabled="true" resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30 }" :rows="7">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>核保建议</label>
          <div class="right-content">
            <div class="tab-head">
              <div class="tab" :class="currentSuggestion === 'zjsuggestion' ? 'actived' : ''" @click="changeSuggestion('zjsuggestion')">重疾险</div>
              <div class="tab" :class="currentSuggestion === 'ylsuggestion' ? 'actived' : ''" @click="changeSuggestion('ylsuggestion')">医疗险</div>
            </div>
            <el-input resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30 }" :rows="10" placeholder="请输入内容" :disabled="true" v-if="currentSuggestion === 'zjsuggestion'" v-model="jbhbItem.zjsuggestion">
            </el-input>
            <el-input resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30 }" :rows="10" placeholder="请输入内容" v-else :disabled="true" v-model="jbhbItem.ylsuggestion">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>可投产品</label>
          <div class="right-content">
            <div class="add-item-wrap">
              <div class="list" v-for="(item, index) in jbhbItem.productJsonStr" :key="index">
                <div class="item">
                  <label>保险公司</label>
                  <div class="right-content">
                    <el-input placeholder="请输入" size="mini" v-model="item.insorganname" :disabled="true">
                    </el-input>
                  </div>
                </div>
                <div class="item">
                  <label>险种名称</label>
                  <div class="right-content">
                    <el-input placeholder="请输入" size="mini" v-model="item.riskname" :disabled="true">
                    </el-input>
                  </div>
                </div>
                <div class="item">
                  <label>承保说明</label>
                  <div class="right-content">
                    <el-input placeholder="请输入" size="mini" v-model="item.acceptremark" :disabled="true" resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30 }" :rows="7">
                    </el-input>
                  </div>
                </div>
                <div class="item">
                  <label>标注</label>
                  <div class="right-content" style="margin-top: 0.03rem;">
                    <el-radio v-model="item.labeltype" :label="'01'" :disabled="true">标体承保
                    </el-radio>
                    <el-radio v-model="item.labeltype" :label="'03'" style="margin-left: 0.2rem;" :disabled="true">
                      加费承保
                    </el-radio>
                    <el-radio v-model="item.labeltype" :label="'02'" :disabled="true" style="margin-left: 0.2rem;">除外承保
                    </el-radio>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="step-list wei-step-list" v-if="CJGselectValue === '解答疑义'">
        <div class="item-section">
          <label>疑义问题</label>
          <div class="right-content">
            <el-input placeholder="请输入" size="mini" v-model="dkwItem.title" :disabled="true">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>隐藏信息</label>
          <div class="right-content">
            <div class="editor-box">
              <div id="div7" class="toolbar"></div>
              <div id="div8" class="text"></div>
            </div>
          </div>
        </div>
        <div class="item-section">
          <label>解答示范</label>
          <div class="right-content">
            <div class="editor-box">
              <div id="div5" class="toolbar"></div>
              <div id="div6" class="text"></div>
            </div>
          </div>
        </div>
        <div class="item-section">
          <label>附件</label>
          <div class="right-content">
            <ul class="enclosure-list" v-if="fileList.length">
              <li class="item" v-for="(item, index) in fileList" :key="index">
                <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{ item.filename }}</div>
                <a :href="crm_url + 'crm.meihualife.com/filedownload.do?fileid=' + item.fileid" class="download-btn" :download="item.filename">下载</a>
              </li>
            </ul>
            <ul class="enclosure-list" v-else>
              <li class="item">暂无附件</li>
            </ul>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-drawer title="我是标题" :size="isDealed ? '70%' : '50%'" custom-class="customer-drawer" :visible.sync="drawer" :with-header="false">
      <div class="drawerLeft" :class="isDealed ? 'isDealed' : ''">
        <div class="left_box">
          <div class="header">
            <div class="header_t clearfix">
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
            <div class="header_b clearfix">
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
            <div class="editContent clearfix">

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

                    <el-input type="text" size="mini" v-model="addMoblie" style="margin-bottom:5px" @input="addMoblieChange">
                    </el-input>

                    <div class="mobile_input_box" v-show="mobileInputShow">
                      <span class="mobile_input mobile_input_add" @click="mobileAdd">添加</span>
                      <span class="mobile_input mobile_input_cancle" @click="mobileCancle">取消</span>
                    </div>
                    <el-table :data="mobileList" class="mobile_box">
                      <el-table-column width="130" property="phone" label="电话"></el-table-column>
                      <el-table-column width="70" label="操作" align="right">
                        <template slot-scope="scope">
                          <span class="mobile-icon el-icon-delete" @click="mobileDelete(scope)"></span>
                          <span class="mobile-icon el-icon-upload2" @click="mobileToTop(scope)"></span>
                        </template>
                      </el-table-column>
                    </el-table>
                    <template slot="reference">
                      <el-input placeholder="请输入" size="mini" v-model="detailsInfo.mobilestr">
                      </el-input>

                      <span @click="addMobliePopVisible = !addMobliePopVisible" class="icon_arr"><i class="el-select__caret el-input__icon el-icon-arrow-down"></i></span>
                    </template>
                  </el-popover>

                </span>
              </div>
              <div class="editContent_c editContent_box">
                <span class="dd">性别</span>
                <span class="dd maxmain">
                  <el-select v-model="sex" size="mini" style="width: 100%;" placeholder="请选择">
                    <el-option v-for="item in sexs" :key="item.key" :label="item.value" :value="item.key"></el-option>
                  </el-select>
                </span>
              </div>
              <div class="editContent_c editContent_box editContent_date" style=" font-size: 0.13rem;">
                <span class="dd">出生日期</span>
                <span class="dd">
                  <el-date-picker class="difPicker" v-model="birthday" type="date" size="mini" placeholder="请输入出生年月" clearable style="width: 100%;" value-format="yyyy-MM-dd">
                  </el-date-picker>
                </span>
              </div>
              <div class="editContent_b editContent_box">
                <span class="dd">微信号</span>
                <span class="dd">
                  <el-input placeholder="请输入" size="mini" v-model="wxnostr">
                  </el-input>
                </span>

              </div>

            </div>
          </div>
          <div class="condition">
            <div class="clearfix">

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
                <div class="select-title " style="width: 0.8rem">共享客户</div>
                <div class="select-content filContentNoborder filContBottom" style="width: calc(100% - 0.8rem); margin-right: 0.2rem;">
                  <el-autocomplete class="el-input-inners" v-model="editInfo.shareusername" :trigger-on-focus="false" :fetch-suggestions="querySearchId" size="mini" placeholder="请输入业务员姓名" clearable></el-autocomplete>
                </div>
              </div>

              <div class="common-select">
                <div class="select-title" style="width: 0.8rem">预约回访</div>
                <div class="select-content boxpad" style="height: 0.3rem; width: calc(100% - 0.8rem); margin-right: 0.2rem; border: none">
                  <el-date-picker class="el-date-picker-sigle" v-model="returnVisit" type="datetime" size="mini" placeholder="" :picker-options="previstitimePickerOptions" clearable>
                  </el-date-picker>
                </div>
              </div>

              <div class="common-select">
                <div class="select-title" style="width: 0.8rem">转其他库</div>
                <div class="select-content" style="width: calc(100% - 0.8rem); margin-right: 0.2rem; border: none">
                  <el-select class="el-select-inners" v-model="editInfo.otherstore" size="mini" placeholder="" clearable>
                    <el-option v-for="item in otherstores" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key"></el-option>
                  </el-select>
                </div>
              </div>

            </div>
            <div class="condition-bottom" @click="saveRecord">保存</div>
          </div>

          <div class="adInformation" style="height: 1.5rem">
            <div class="title clearfix">
              <span></span>
              <span>广告投放信息</span>
            </div>
            <div class="adInformation_b">

              <div class="cb">
                <span :title="detailsInfo.makedate">线索产生时间：{{ detailsInfo.makedate }}</span>
                <span :title="detailsInfo.channelname">渠道类型：{{ detailsInfo.channelname }}</span>
              </div>

              <div class="cc">
                <span :title="detailsInfo.clue_sourcename">线索来源：{{ detailsInfo.clue_sourcename }}</span>
                <span :title="detailsInfo.appname">流量来源：{{ detailsInfo.appname }}</span>
              </div>

              <div class="cb">
                <span :title="detailsInfo.area">自动定位城市：{{ detailsInfo.area }}</span>
              </div>

              <div class="cb" style="width: 90%;display: none;">
                <span :title="detailsInfo.pageurl"> 推广页面：
                  <a style="cursor: pointer; color: #578EE7;" href="#" @click="disPageUrl(detailsInfo)">{{
                  detailsInfo.pageurl }}</a>
                </span>
              </div>
            </div>
          </div>
          <div class="userInformation" style="display: none;">
            <div class="title">
              <span></span>
              <span>用户行为信息</span>
            </div>
            <div class="userInformation_b">
              <div class="ct">
                <span :title="detailsInfo.dwelltime">用户停留时长：{{ detailsInfo.dwelltime }}</span>
                <span :title="detailsInfo.interactcount">用户互动次数：{{ detailsInfo.interactcount }}</span>
              </div>
              <div class="cb">
                <span :title="detailsInfo.readingpercentage">用户页面阅读百分比：{{ detailsInfo.readingpercentage }}</span>
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
              <el-table :data="callDataList" border style="width: 100%">
                <el-table-column prop="calltime" label="拨打时间" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="username" label="拨打业务员" width="97" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="isconnect" width="70" align="center" label="接通">
                </el-table-column>
                <el-table-column prop="timeduration" label="时长" align="center" width="100" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column align="center" label="录音" width="70">
                  <template slot-scope="scope" v-if="scope.row.recordurl">
                    <img class="play-icon" src="../../static/images/pause-icon.png" title="暂停" @click="audioPause(scope.$index)" v-if="!audioPaused && scope.$index === currentCallIndex">
                    <img class="play-icon" src="../../static/images/play-icon.png" title="播放" @click="audioPlay(scope.$index)" v-else>
                    <a style="margin-left: 8px;font-size: 15px;vertical-align: middle;" :href="scope.row.recordurl" :download="scope.row.username + '_' + detailsInfo.name + '_' + scope.row.calltimeType" title="下载">
                      <i class="el-icon-download"></i>
                    </a>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="drawerRight" :class="isDealed ? 'isDealed' : ''">
        <div class="title">
          <span></span>
          <span>跟进记录</span>
        </div>
        <div class="cjg-search-section " style="display: flex; justify-content: center;align-items: center;display: none;">
          <el-select v-model="cjgTitle" :loading="loading" filterable remote :remote-method="remoteMethod" placeholder="搜索藏经阁内容" @change="cjgChange" @focus="cjgfocus" class="cjgserach" style="width: 100%;">
            <el-option v-for="item in cjgList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="inputBox">
          <el-input v-model="followrecord" id="textarea" type="textarea" placeholder="添加跟进记录…"></el-input>
        </div>
        <div class="numBox">
          <div class="num">共{{ releaseNum }}条</div>
          <div class="button">
            <span @click="cancel">取消</span>
            <span @click="release" v-show="dis_save">发布</span>
          </div>
        </div>
        <div class="drawercontentBox">
          <ul>
            <li v-for="item in records" :key="item.remarkserialno">
              <div class="li_t" style="display: flex; justify-content: space-between;">
                <div v-html="item.remark">
                </div>
                <div v-show='delRemark' class="gjg_topping mobile-icon el-icon-upload2" @click="remarktop(item.remarkserialno)"></div>
              </div>
              <div class="li_b">
                <div class="li_b_l" :title="item.name">{{ item.oprname }} </div>
                <div class="li_b_r">{{ item.makedate }} 创建
                  <span v-show='delRemark' class="mobile-icon el-icon-delete" @click="deleteRemark(item.remarkserialno)" style="color:#979797"></span>
                </div>

              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="drawerRight isDealed" v-if="isDealed">
        <div class="title">
          <span></span>
          <span>保障详情</span>
        </div>
        <ul class="order-list" v-loading="detai_loading">
          <li class="item" v-for="(item,index) in policyList" :key="index">
            <div class="head">
              <div class="txt" @click="showEdit(item)">{{ item.riskname }}</div>
              <div class="status" :class="[item.status === 'processing' ? 'processing' : '', item.status === 'invalid' ? 'invalid' : '', item.status === 'cancel' ? 'cancel' : '']">
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
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="55%" :modal-append-to-body="false" :append-to-body="false" :modal="false">
        <el-input v-if="idoverage === 'Y'" type="textarea" :rows="4" placeholder="请注明客户身体状况异常情况" v-model="remark">
        </el-input>
        <el-input v-if="ispeer === 'Y'" type="textarea" :rows="4" placeholder="请注明客户所属保险公司名称" v-model="remark">
        </el-input>
        <el-select v-model="remark" placeholder="空号/停机" v-if="isvacantnumber === 'Y'" size="mini">
          <el-option label="空号" value="空号">
          </el-option>
          <el-option label="停机" value="停机">
          </el-option>
        </el-select>
        <div class="popover-bottom-btns" slot="footer" v-show="dis_save">
          <a href="javascript:;" @click="dialogVisible = false">取消</a>
          <a href="javascript:;" @click="postRemark" class="modify">确定</a>
        </div>
      </el-dialog>
      <el-dialog title="共享客户" :visible.sync="shareDialogVisible" width="55%" :modal-append-to-body="false" :append-to-body="false" :modal="false">
        <el-autocomplete v-model="shareUserName" :trigger-on-focus="false" :fetch-suggestions="querySearchId" size="mini" placeholder="请选择或输入共享客户姓名"></el-autocomplete>
        <div class="popover-bottom-btns" slot="footer" v-show="dis_save">
          <a href="javascript:;" @click="shareDialogVisible = false">取消</a>
          <a href="javascript:;" @click="shareCustomer" class="modify">确定</a>
        </div>
      </el-dialog>
    </el-drawer>
    <!-- 查看详情弹窗 -->
    <view-details :datas="detailObj" :showEditPopupDialogVisible.sync="showEditPopupDialogVisible" @updateVisible="updateVisibleId"></view-details>
    <!-- 录音播放器 -->
    <audio :src="audioSrc" ref="audio" controls="controls" id="audio" v-show="audioShow"></audio>
  </div>
</template>
    <script>


import $ from "jquery";
import moment from "../../static/js/moment.js";
import wangEditor from "@/components/wangEditor/release/wangEditor.min.js";
import { getData, getPhoneData, my_url, crm_url } from "../../static/js/ajax.js";
import { formatDate, checkEmail, checkMobile } from "../../static/js/common.js";
import customerManagementNew from './customerManagementNew.js';
import viewDetails from "../../components/viewDetails.vue";

let editor4, editor5, editor6, editor7;
export default {
  mixins: [customerManagementNew],
  components: {
    viewDetails
  },
  data() {
    return {
      from: {
        recorddate: moment().format("YYYY-MM-DD 00:00:00"),
        hotlinecount: "",
        callcount: "",
        connectcount: "",
        connectrate: "",
        cluecallcount: "",
        callcentertime: "",
        nocallcentertime: "",
        sumtime: "",
        wxcount: "",
        firstplancount: "",
        secondplancount: "",
        claimcount: "",
        tdancount: "",
        daydataserialno: "",
      },
      monthTarget: "", //本月目标
      weekTarget: "", //本周目标
      month_modify: "",
      week_modify: "",
      delRemark: true, //跟进记录的删除按钮是否显示
      audioPaused: true,
      currentCallIndex: "",
      audioSrc: "",

      ArticleData: [],
      isArticle: true,
      sable: false,
      inputUserform1: [],
      inputUserform2: [], //储存记忆
      channelList: [], //渠道类型
      sourceList: [], //流量来源
      channelOptions: [],
      planid: "渠道类型", //广告计划ID
      // batchnoValue: "",
      channelValue: "",
      appnameValue: "", //流量来源
      birthday: "",
      cjgcontent: "保单检视",
      cjgtype: "",
      phoneWxno: "电话号码",
      phoneWxnoValue: "",
      my_url: my_url,
      currentSuggestion: "zjsuggestion",
      // tableDataOverview: [],

      iscall: "N",
      // isrefresh: false,
      callSum: "",
      selectTime: [],
      selectTimeCusdeal: "",
      Salesman: "",

      mobile: "",
      wxno: "",
      username: "",
      followupstep: "06",
      steps: [],
      select_steps: [],
      add_steps: [],
      fileList: [],
      activeName: "06",
      tableData: [],
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      loading: true,
      detai_loading: false,
      queryflag: true,
      queryflagString: "01",
      menutype: "",
      value: [],
      my_list: "",
      my_list2: "",
      userNameOptions: [],
      policyList: [],
      otherstore: "",
      sourcelevel: "",
      CJGselectValue: "",
      inputUserform: {
        sourcelevel: "A",
        batchno: "",
        wxno: "",
        mobile: "",
        name: "",
      },
      resourceDeployform: {
        activityid: "",
        userid: "",
        followupstep: "",
      },
      overviewForm: {
        teamid: "",
        userid: "",
        startDate: "",
        endDate: "",
        time: "1",
      },
      overviewFormTime: "1",
      // 侧拉
      drawer: false,
      isDealed: false,
      detailsInfo: "",
      sipmobilestr: "",
      activitytag: "", //标签
      activitytags: [],
      age: "50",
      sex: "",
      wxno: "",
      wxnostr: "",
      email: "",
      mobileprovince: "",
      mobilecity: "",
      mobilecountry: "",
      address: "",
      idoverageActived: false,
      peerActived: false,
      vacantnumberActived: false,
      dis_save: false,
      dis_P4_up: false,
      dis_Pz_up: false,
      visit: "",
      returnVisit: "",
      sexs: [
        {
          key: "男",
          value: "男",
        },
        {
          key: "女",
          value: "女",
        },
      ],
      callDataList: [],
      cjgTitle: "",
      followrecord: "", //发布信息
      releaseNum: "", //发布数量
      records: [],
      dialogTitle: "",
      dialogVisible: false,
      cjgdrawer: false,
      idoverage: "",
      ispeer: "",
      isvacantnumber: "",
      shareDialogVisible: false,
      shareUserName: "",
      cjgList: [],
      remark: "",
      inputUserVisable: false,
      deleteSourceVisable: false,
      resourceDeployVisable: false,
      multipleSelection: [],
      ismyUse: true,
      isTop: false,
      teamData: [],
      teamDataList: [],

      defaultProps: {
        children: "children",
        label: "label",
      },
      teamNames: "团队选择",
      teamList: "",
      userNameList: [],

      teamNames2: "团队选择",
      teamList2: "",
      userNameList2: [],
      mobileList: [],
      addMoblie: "",
      deleteMobile: "",
      mobileInputShow: false,
      editInfo: {
        shareuserid: "",
        otherstore: "",
        shareusername: "",
      },
      otherstores: [],
      SalesmanIdBox: [],
      checkedAll: false,
      checkedAllNum: 0,
      drawerWidth: "",
      docEl: "",
      editPrevistitime: "",
      previstirimeVisable: true,
      previstitimePickerOptions: {
        //控制时间范围
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      //保单检视
      bdjsItem: {
        title: "",
        insorgancode: "",
        riskcode: "",
        marketdate: "",
        goodpoint: "",
        badpoint: "",
        suggestion: "",
        policydetail: "",
      },
      //疾病核保
      jbhbItem: {
        title: "",
        disdescription: "",
        zjsuggestion: "",
        ylsuggestion: "",
        productJsonStr: [],
      },
      //解答疑义
      dkwItem: {
        title: "",
        content: "",
        voice: "",
      },
      cjgTitle: "",
      addMobliePopVisible: false,
      order: "",
      prop: "",
      //查看编辑弹窗
      showEditPopupDialogVisible: false,
      detailObj: {},
      crm_url: "",
      audioShow: false,
      adLabelselect: "06",
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            onClick(picker) {
              const end = new Date(formatDate(new Date(), "yyyy-MM-dd"));
              const start = new Date(formatDate(new Date(), "yyyy-MM-dd"));

              end.setTime(end.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "昨日",
            onClick(picker) {
              const end = new Date(formatDate(new Date(), "yyyy-MM-dd"));
              const start = new Date(formatDate(new Date(), "yyyy-MM-dd"));

              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近7天",
            onClick(picker) {
              const end = new Date(formatDate(new Date(), "yyyy-MM-dd"));
              const start = new Date(formatDate(new Date(), "yyyy-MM-dd"));

              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近30天",
            onClick(picker) {
              const end = new Date(formatDate(new Date(), "yyyy-MM-dd"));
              const start = new Date(formatDate(new Date(), "yyyy-MM-dd"));

              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "本周",
            onClick(picker) {
              var now = new Date(); // 当前日期
              var nowDayOfWeek = now.getDay(); // 今天本周的第几天
              var nowDay = now.getDate(); // 当前日
              var nowMonth = now.getMonth(); // 当前月
              var nowYear = now.getYear(); // 当前年
              nowYear += nowYear < 2000 ? 1900 : 0;
              var day = nowDayOfWeek || 7;
              const start = new Date(now.getFullYear(), nowMonth, nowDay - day);
              const end = new Date(now.getFullYear(), nowMonth, nowDay + 6 - day);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "本月",
            onClick(picker) {
              var now = new Date(); // 当前日期
              var nowMonth = now.getMonth(); // 当前月
              var nowYear = now.getYear(); // 当前年
              nowYear += nowYear < 2000 ? 1900 : 0;
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
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },

  mounted: function () {
    var _this = this;
    this.getchannelNameList();
    this.tableHeard();
    this.getIsCall();
    // this.getConditionData();
    this.getTeamList();

    // this.$nextTick(() => {
    //   var hotlineStartDate, hotlineEndDate
    //   if (this.selectTime.length > 0) {
    //     hotlineStartDate = this.formatDate(this.selectTime[0], "yyyy-MM-dd");
    //     hotlineEndDate = this.formatDate(this.selectTime[1], "yyyy-MM-dd");
    //   }else{
    //     hotlineStartDate =''
    //     hotlineEndDate = ''
    //   }
    //   let params = {

    //     hotlineStartDate: hotlineStartDate,
    //     hotlineEndDate: hotlineEndDate,
    //     name: this.Salesman,
    //     userid: '',
    //     mobile: '',
    //     wxno: '',
    //     followupstep: "06",
    //     pageNumber: this.pageNum,
    //     pageSize: this.pageSize,
    //     queryflag: this.queryflagString,
    //     menutype: "75000000",
    //     teamid: '',
    //     ismyUse: true,
    //     channel: this.channelValue,
    //     appname: this.appnameValue,

    //     // batchno: this.batchnoValue,
    //   };



    //   this.getTableData(params); //table数据
    //   // this.getUserIdData();
    // });
    var now = new Date(); // 当前日期
    var nowDay = now.getDate(); // 当前日
    var nowMonth = now.getMonth(); // 当前月
    var nowYear = now.getYear(); // 当前年
    var start = formatDate(new Date(now.getFullYear(), nowMonth, nowDay));
    var end = formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1));
    var audio = this.$refs.audio;
    this.overviewForm.startDate = formatDate(new Date(start), "yyyy-MM-dd 00:00:00").substring(0, 10);
    this.overviewForm.endDate = formatDate(new Date(end), "yyyy-MM-dd 00:00:00").substring(0, 10);
    // this.refresh();
    audio.addEventListener(
      "ended",
      function (e) {
        _this.audioPaused = true;
        _this.audioShow = false;
      },
      false
    );
  },
  watch: {
    checkedAll: function (n, o) {
      if (n) {
        this.tableData.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    isDealed: function (n, o) {
      if (!n) {
        this.drawerWidth = (this.docEl - 200) * 0.5 + "";
      } else {
        this.drawerWidth = (this.docEl - 200) * 0.75 + "";
      }
    },
  },
  computed: {},
  methods: {
    updateVisibleId(e) {
      this.showEditPopupDialogVisible = e;
    },
    remarktop(data) {
      var _this = this;

      getData(
        "post",
        my_url + "/crm/activity/setRemarkTop.do",
        function (data) {
          if (data.code == "0") {
            _this.$message({
              showClose: true,
              message: "跟进记录置顶成功！",
              duration: 3000,
              type: "success",
            });

            _this.getReleaseData();
          }
        },
        {
          activityid: data,
        }
      );
    },
    selectDate() {
      this.dataEntry(1);
    },
    // 播放录音
    audioPlay(index) {
      let _this = this;
      let audio = this.$refs.audio;
      this.currentCallIndex = index;
      this.audioSrc = this.callDataList[index].recordurl;
      this.$nextTick(() => {
        audio.play();
        _this.audioShow = true;
        _this.audioPaused = false;
      });
    },
    audioPause(index) {
      let _this = this;
      let audio = this.$refs.audio;
      this.currentCallIndex = index;
      this.$nextTick(() => {
        audio.pause();
        _this.audioPaused = true;
      });
    },
    dataEntry(aa) {
      var _this = this;
      this.dialogVisible = true;

      if (aa != 1) {
        this.from.recorddate = moment().format("YYYY-MM-DD 00:00:00");
      }
      var date = {
        recorddate: this.from.recorddate,
      };

      getData(
        "post",
        my_url + "/crm/activity/getOneDayData.do",
        function (data) {
          if (data.code == "0") {
            if (data.oneDayData) {
              _this.from.hotlinecount = data.oneDayData.hotlinecount != undefined ? data.oneDayData.hotlinecount : "0";
              _this.from.callcount = data.oneDayData.callcount != undefined ? data.oneDayData.callcount : "0";
              _this.from.connectcount = data.oneDayData.connectcount != undefined ? data.oneDayData.connectcount : "0%";
              _this.from.connectrate = data.oneDayData.connectrate != undefined ? data.oneDayData.connectrate : "0";
              _this.from.cluecallcount = data.oneDayData.cluecallcount != undefined ? data.oneDayData.cluecallcount : "0";
              _this.from.callcentertime = data.oneDayData.callcentertime != undefined ? data.oneDayData.callcentertime : "0";
              _this.from.nocallcentertime = data.oneDayData.nocallcentertime != undefined ? data.oneDayData.nocallcentertime : 0;
              _this.from.sumtime = _this.from.nocallcentertime + _this.from.callcentertime;
              _this.from.wxcount = data.oneDayData.wxcount != undefined ? data.oneDayData.wxcount : 0;
              _this.from.firstplancount = data.oneDayData.firstplancount != undefined ? data.oneDayData.firstplancount : 0;
              _this.from.secondplancount = data.oneDayData.secondplancount != undefined ? data.oneDayData.secondplancount : 0;
              _this.from.claimcount = data.oneDayData.claimcount != undefined ? data.oneDayData.claimcount : 0;
              _this.from.tdancount = data.oneDayData.tdancount != undefined ? data.oneDayData.tdancount : 0;
              _this.from.daydataserialno = data.oneDayData.daydataserialno;
              _this.monthTarget = data.oneDayData.month_fyp_target;
              _this.weekTarget = data.oneDayData.week_fyp_target;
            }
          }
        },
        date
      );
    },

    sureData() {
      var _this = this;
      if (this.from.nocallcentertime > 300 || this.from.nocallcentertime < 0) {
        _this.$message({
          showClose: true,
          message: "非话务时长 0<X<300 ！",
          duration: 3000,
          type: "error",
        });
        return;
      }
      if (isNaN(_this.monthTarget) || isNaN(_this.weekTarget)) {
        _this.$message({
          showClose: true,
          message: "目标标保必须为数值！",
          duration: 3000,
          type: "error",
        });
        return;
      }

      if (_this.monthTarget == "" || _this.weekTarget == "") {
        _this.$message({
          showClose: true,
          message: "目标标保为必填值！",
          duration: 3000,
          type: "error",
        });
        return;
      }

      if (Number(_this.monthTarget) < Number(_this.weekTarget)) {
        _this.$message({
          showClose: true,
          message: "本月目标必须大于本周目标！",
          duration: 3000,
          type: "error",
        });
        return;
      }

      getData("post", my_url + "/crm/auth/getToken.do", function (data) {
        if (data.code == 0) {
          var body = {
            token: data.token,
            recorddate: _this.from.recorddate,
            nocallcentertime: _this.from.nocallcentertime,
            wxcount: _this.from.wxcount,
            firstplancount: _this.from.firstplancount,
            secondplancount: _this.from.secondplancount,
            claimcount: _this.from.claimcount,
            tdancount: _this.from.tdancount,
            daydataserialno: _this.from.daydataserialno,
            nocallcentertime: _this.from.nocallcentertime,
            month_fyp_target: _this.monthTarget,
            week_fyp_target: _this.weekTarget,
          };
          getData(
            "post",
            crm_url + "insure.meihualife.com/crm_web/dayDataInsert.do",
            function (data) {
              if (data.code == "0") {
                _this.$message({
                  showClose: true,
                  message: "修改成功!",
                  duration: 3000,
                  type: "success",
                });
                _this.dialogVisible = false;
                _this.from.recorddate = moment().format("YYYY-MM-DD 00:00:00");
              } else if (data.code == "1") {
                _this.$message({
                  showClose: true,
                  message: data.msg,
                  duration: 3000,
                  type: "error",
                });
              }
            },
            body
          );
        } else {
          _this.$message({
            showClose: true,
            message: "缺少token,请联系开发人员",
            duration: 3000,
            type: "error",
          });
        }
      });
    },

    handleClose() {
      this.dialogVisible = false;
    },

    //渠道类型
    getchannelNameList() {
      let _this = this;
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          if (data.code == 0) {
            _this.channelList = data.dictList;
          }
        },
        {
          dict_type: "source",
        }
      );
    },

    channelSelect() {
      var _this = this;
      this.appnameValue = "";
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          if (data.code == 0) {
            _this.sourceList = data.dictList;
          }
        },
        {
          dict_type: "sourcedetail_" + this.channelValue,
          special: "dis",
        }
      );
    },

    tableHeard() {
      var _this = this;
      getData(
        "post",
        my_url + "/crm/tableheard/getTableHeardInfo.do",
        function (data) {
          if (data.displaycontent == "") {
            _this.inputUserform1 = ["menudate", "makedate", "firstcalltime", "lastcalltime", "batchno", "module_name"];
          } else {
            var aa = data.displaycontent.split(",");
            _this.inputUserform1 = aa;
            _this.inputUserform2 = aa;
          }
        },
        {
          type: "customerManagementNew",
        }
      );
    },

    checkedSure() {
      var _this = this;
      var displaycontent = this.inputUserform1;
      var date = {
        type: "customerManagementNew",
        displaycontent: displaycontent.toString(),
      };
      getData(
        "post",
        my_url + "/crm/tableheard/saveTableHeardInfo.do",
        function (data) {
          if (data.code == "0") {
            _this.sable = false;
            _this.inputUserform2 = _this.inputUserform1;
          }
        },
        date
      );
    },

    fileTypeFun(type) {
      if (type) {
        var type = type.toLowerCase();
        if (type == "jpg" || type == "png") {
          return "file-type file-type-img";
        } else if (type == "xlsx" || type == "xls") {
          return "file-type file-type-xlsx";
        } else {
          return `file-type file-type-${type}`;
        }
      } else {
        return "file-type file-type-file";
      }
    },
    reset() {
      //重置
      this.selectTime = "";
      this.selectTimeCusdeal = "";
      this.Salesman = "";
      this.mobile = "";
      this.wxno = "";
      this.username = "";
      this.queryflag = true;
      this.queryflagString = "01";
      this.hotlineStartDate = ""; //线索开始时间
      this.hotlineEndDate = "";
      this.cusdealStartDate = "";
      this.cusdealEndDate = "";
      this.channelValue = "";
    },
    search(page) {
      //查询

      let { Salesman, queryflag, mobile, wxno, username, followupstep, sourcelevel, prop, order } = this;
      let hotlineStartDate = "",
        hotlineEndDate = "",
        cusdealStartDate = "",
        cusdealEndDate = "";

      if (this.selectTime && this.selectTime.length > 0) {
        hotlineStartDate = this.formatDate(this.selectTime[0], "yyyy-MM-dd");
        hotlineEndDate = this.formatDate(this.selectTime[1], "yyyy-MM-dd");
      }

      if (this.selectTimeCusdeal && this.selectTimeCusdeal.length > 0) {
        cusdealStartDate = this.formatDate(this.selectTimeCusdeal[0], "yyyy-MM-dd");
        cusdealEndDate = this.formatDate(this.selectTimeCusdeal[1], "yyyy-MM-dd");
      }
      if (this.queryflagString != "03") {
        this.queryflagString = this.queryflag ? "01" : "02";
      }
      if (this.phoneWxno == "电话号码") {
        this.mobile = this.phoneWxnoValue;
        this.wxno = "";
        // this.batchnoValue = "";
      } else {
        this.mobile = "";
        this.wxno = this.phoneWxnoValue;
      }
      var channelListSum = this.channelList.concat(this.channelOptions);

      let params = {
        hotlineStartDate: hotlineStartDate, //线索开始时间
        hotlineEndDate: hotlineEndDate, //线索终止时间

        name: Salesman, //客户姓名
        userid: this.overviewForm.userid, //业务员姓名
        mobile: this.mobile,
        wxno: this.wxno,
        followupstep: this.activeName,
        pageNumber: page || this.pageNum,
        pageSize: this.pageSize,
        queryflag: this.queryflagString,
        menutype: "75000000",

        teamid: this.overviewForm.teamid,
        // prop: prop,
        // order: order,

        channel: this.channelValue,
        appname: this.appnameValue,
      };
      this.loading = true;
      this.getTableData(params);
    },
    toggerIsVist(scop) {
      var _this = this;
      getData(
        "post",
        my_url + "/crm/activity/activityVisit.do",
        function (data) {
          if (data.code == 0) {
            _this.$message({
              showClose: true,
              message: "成功!",
              duration: 3000,
              type: "success",
            });
            _this.search(_this.pageNum);
            // _this.refresh()
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: "error",
            });
          }
        },
        {
          activityserialno: scop.row.activityserialno,
        }
      );
    },
    editPrevistTime(scop) {
      var _this = this;
      getData(
        "post",
        my_url + "/crm/activity/updatePrevistiTime.do",
        function (data) {
          if (data.code == 0) {
            _this.$message({
              showClose: true,
              message: "成功!",
              duration: 3000,
              type: "success",
            });
            _this.previstirimeVisable = false;
            scop.row.previstitime = false;
            _this.search(_this.pageNum);
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: "error",
            });
          }
        },
        {
          activityserialno: scop.row.activityserialno,
          previstitime: _this.formatDate(_this.editPrevistitime, "yyyy-MM-dd HH:mm:ss"),
        }
      );
    },
    disPageUrl(row) {
      if (row.pageurl != null && row.pageurl != "") {
        window.open(row.pageurl, "_blank", "width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no");
      } else if (row.channel == "0004" && row.pagetype == "1yuango/0001") {
        window.open(crm_url + "insure.meihualife.com/life/activity/oneyuangodis.do", "_blank", "width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no");
      } else {
        window.open(
          crm_url + "insure.meihualife.com/life/activity/channelActivity.do?channelCode=" + row.channel + "&pageType=" + row.pagetype + "&planId=" + row.planid,
          "_blank",
          "width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no"
        );
      }
    },
    disarticleUrl(row) {
      if (row.articleurl != null && row.articleurl != "") {
        window.open(row.articleurl, "_blank", "width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no");
      }
    },
    disVideoUrl(row) {
      if (row.videourl != null && row.videourl != "") {
        window.open(row.videourl, "_blank", "width=600px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no");
      }
    },
    getIsCall() {
      let _this = this;
      getData(
        "post",
        my_url + "/crm/common/getIsCall.do",
        function (data) {
          //渠道类型
          if (data.code == 0) {
            _this.iscall = data.iscall;
          }
        },
        null
      );
    },
    getConditionData() {
      //条件数据
      let _this = this;
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          //渠道类型
          if (data.code == 0) {
            let { dictList } = data;

            _this.channelOptions = dictList;
          }
        },
        {
          dict_type: "source",
        }
      );
      getData("post", my_url + "/crm/common/getDictList.do", function (data) {
        //跟进步骤
        if (data.code == 0) {
          _this.steps = data.dictList;
          let select_dictList = JSON.parse(JSON.stringify(data.dictList));
          // select_dictList.unshift({
          //   dd_key: "99",
          //   dd_value: "新资源",
          // });

          _this.select_steps = select_dictList;

          var add_dictList = JSON.parse(JSON.stringify(data.dictList));

          add_dictList.push({
            dd_key: "gxkh",
            dd_value: "共享客户",
          });
          // add_dictList.unshift({
          //   dd_key: "99",
          //   dd_value: "新资源",
          // });

          _this.add_steps = add_dictList;
          // _this.activeName = add_dictList[1].dd_key;
          _this.activeName = "06";
        }
      },
        {
          dict_type: "followupstep",
        }
      );
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          //标签
          if (data.code == 0) {
            let { dictList } = data;
            _this.customers = dictList;
          }
        },
        {
          dict_type: "activitytag",
        }
      );
      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          //其他库
          if (data.code == 0) {
            let { dictList } = data;
            _this.otherstores = dictList;
          }
        },
        {
          dict_type: "otherstore",
        }
      );
      getData(
        "post",
        my_url + "/crm/auth/getManagePermission.do",
        function (data) {
          //查看客户的权限
          if (data.code == 0) {
            _this.dis_P4_up = true;
          } else {
            _this.dis_P4_up = false;
          }
        },
        null
      );

      //资源删除的权限
      getData(
        "post",
        my_url + "/crm/auth/getZongPermission.do",
        function (data) {
          //其他库
          if (data.code == 0) {
            _this.dis_Pz_up = true;
          } else {
            _this.dis_Pz_up = false;
          }

          _this.getUserIdData();
        },
        null
      );
    },
    articleData(page) {
      var that = this;

      this.isArticle = false;
      let hotlineStartDate = "",
        hotlineEndDate = "";

      if (this.selectTime.length > 0) {
        hotlineStartDate = this.formatDate(this.selectTime[0], "yyyy-MM-dd");
        hotlineEndDate = this.formatDate(this.selectTime[1], "yyyy-MM-dd");
      }

      if (this.selectTimeCusdeal && this.selectTimeCusdeal.length > 0) {
        cusdealStartDate = this.formatDate(this.selectTimeCusdeal[0], "yyyy-MM-dd");
        cusdealEndDate = this.formatDate(this.selectTimeCusdeal[1], "yyyy-MM-dd");
      }

      getData("post", my_url + "/crm/auth/getToken.do", function (data) {
        var params = {
          cluestartdate: hotlineStartDate, //线索开始时间
          clueenddate: hotlineEndDate, //线索终止时间
          token: data.token,
          isaddfriend: "Y",
          pageNumber: page,
          pageSize: that.pageSize,
          teamid: that.overviewForm.teamid,
          userid: that.overviewForm.userid, //业务员姓名
          name: that.Salesman, //客户姓名
          queryflag: that.queryflagString,
        };
        getData(
          "post",
          crm_url + "insure.meihualife.com/crm_web/getArticleClueList.do",
          function (data) {
            that.ArticleData = data.rows;

            that.pageTotal = data.total;
          },
          params
        );
      });
    },

    handleClick(val) {
      if (val.name == "98") {
        this.articleData(1);
      } else {
        this.isArticle = true;
      }
      if (val.name == "gxkh") {
        this.queryflagString = "03";
        this.followupstep = "";
        this.ismyUse = false;
        this.search(1);
      } else {
        this.queryflagString = this.queryflag ? "01" : "02";
        this.followupstep = val.name;
        this.ismyUse = true;
        this.search(1);
      }
    },
    getTableData(params) {
      //table数据
      params.followupstep = '06'
      let _this = this;
      getData(
        "post",
        my_url + "/crm/activity/getActivityList.do",
        function (data) {
          let { rows, total } = data;
          _this.pageTotal = total;
          if (rows) {
            rows.forEach((res) => {
              if (res.channel == "8001") {
                res["channelname"] = res.channeldetailname;
              }
              res.wxnostr = res.wxno;
              // 如果sourceleve 是A+,是A重疾
              if (res.sourcelevel == "A") {
                res.sourcelevel = "A重疾";
                // 如果sourceleve 是A+,是A理财
              } else if (res.sourcelevel == "A+") {
                res.sourcelevel = "A理财";
                // 如果sourceleve 是A-,、分两种情况
              } else if (res.sourcelevel == "A-") {
                //第一种情况如果initsourceleve 是A 为A-重疾
                if (res.initsourcelevel == "A") {
                  res.sourcelevel = "A-重疾";
                  //第二种情况如果initsourceleve 是A+ 为A-理财
                } else if (res.initsourcelevel == "A+") {
                  res.sourcelevel = "A-理财";
                }
              }

              if (_this.iscall == "Y") {
                res.newmobilestr = "javascript:void(0);";
              } else {
                res.newmobilestr = "sip:0" + res.mobilestr;
              }
            });
          }

          _this.tableData = rows;

          if (_this.queryflagString == "01" || _this.queryflagString == "03") {
            _this.isTop = true;
          } else {
            _this.isTop = false;
          }
          _this.loading = false;
          _this.$nextTick(function () {
            _this.scrollHieght();
          });
        },
        params
      );
    },
    pageClick(page) {
      //点击分页
      this.pageNum = page;
      if (this.isArticle == false) {
        this.articleData(page);
      } else {
        this.search(page);
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.toporderid) {
        return "top-row";
      }
      return "";
    },
    GetRequest(urlStr) {
      if (typeof urlStr == "undefined") {
        var url = decodeURI(location.search); //获取url中"?"符后的字符串
      } else {
        var url = "?" + urlStr.split("?")[1];
      }

      var theRequest = new Object();

      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    },
    handleChange(value) { },
    formatDate: function (date, format) {
      //格式化时间
      if (!date) return;
      if (!format || typeof format != "string") format = "yyyy-MM-dd";
      switch (typeof date) {
        case "string":
          date = new Date(date.replace("T", " ").replace(/-/, "/"));
          break;
        case "number":
          date = new Date(date);
          break;
      }
      if (!(date instanceof Date)) return;
      var dict = {
        yyyy: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        H: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        MM: ("" + (date.getMonth() + 101)).substr(1),
        dd: ("" + (date.getDate() + 100)).substr(1),
        HH: ("" + (date.getHours() + 100)).substr(1),
        mm: ("" + (date.getMinutes() + 100)).substr(1),
        ss: ("" + (date.getSeconds() + 100)).substr(1),
      };
      return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
        return dict[arguments[0]];
      });
    },
    //点击客户姓名 展示详细信息
    handle(row) {
      let _this = this;
      this.drawer = true;
      this.cjgList = [];
      this.cjgTitle = "";

      if (this.queryflagString == "01" || this.queryflagString == "03") {
        this.dis_save = true;
        if (this.iscall == "Y") {
          this.sipmobilestr = "javascript:void(0);";
        } else {
          this.sipmobilestr = "sip:0" + row.mobilestr;
        }
      } else if (this.queryflagString == "02") {
        this.dis_save = false;
        this.sipmobilestr = "javascript:void(0);";
      }

      if (this.queryflagString == "01") {
        this.delRemark = true;
      } else {
        this.delRemark = false;
      }

      row.username = row.username != undefined ? row.username : "无";
      this.returnVisit = row.previstitime != undefined ? row.previstitime : "";
      this.visit = row.followupstep != undefined ? row.followupstep : "";
      this.wxno = row.wxno != undefined ? row.wxno : "";
      this.wxnostr = row.wxnostr != undefined ? row.wxnostr : "";
      this.age = row.age != undefined ? row.age : "";
      this.birthday = row.birthday != undefined ? row.birthday : "";
      this.sex = row.sex != undefined ? row.sex : "";
      this.email = row.email != undefined ? row.email : "";

      this.mobileprovince = row.mobileprovince != undefined ? row.mobileprovince : "";
      this.mobilecity = row.mobilecity != undefined ? row.mobilecity : "";
      this.mobilecountry = row.mobilecountry != undefined ? row.mobilecountry : "";
      this.address = row.address != undefined ? row.address : "";
      this.idoverage = row.idoverage != undefined ? row.idoverage : "";
      this.ispeer = row.ispeer != undefined ? row.ispeer : "";
      this.isvacantnumber = row.isvacantnumber != undefined ? row.isvacantnumber : "";
      this.idoverageActived = row.idoverage != undefined ? row.idoverage === "Y" : "";
      this.peerActived = row.ispeer != undefined ? row.ispeer === "Y" : "";
      this.vacantnumberActived = row.isvacantnumber != undefined ? row.isvacantnumber === "Y" : "";
      this.activitytags = this.customers;
      this.detailsInfo = row;
      this.mobilestr = row.mobilestr;
      this.getReleaseData(); //发布的列表
      this.getCallData();
      this.getmobileList(row.activityserialno);

      this.editInfo.shareusername = row.shareusername;
      this.editInfo.otherstore = row.otherstore;
      this.adLabelselect = row.activitytag || "06";
      if (row.followupstep == "07") {
        this.getOrderData();
      }

      if (this.queryflagString == "01" || this.queryflagString == "03") {
        this.detailsInfo.mobilestr = row.mobilestr;
        this.detailsInfo.wxno = row.wxno;
        this.detailsInfo.wxnostr = row.wxnostr;
      } else if (this.queryflagString == "02") {
        this.detailsInfo.mobilestr = row.mobilestr;
        this.detailsInfo.wxnostr = row.wxnostr;
      }

      //已成交处理
      this.isDealed = row.followupstep == "07";
    },

    //点击成交单子，查看详情
    showEdit(item) {
      var arr = [];
      arr.push(item);
      this.detailObj = arr;
      this.showEditPopupDialogVisible = true;
    },

    phonecall_row(row) {
      this.$parent.onSend({
        mobile: row.mobilestr,
        activityid: row.activityserialno,
      });
    },
    phonecall_page() {
      if (this.dis_save == true) {
        this.$parent.onSend({
          mobile: this.detailsInfo.mobilestr,
          activityid: this.detailsInfo.activityserialno,
        });
      }
    },
    phonecall(activityid, phoneStr) {
      let _this = this;
      let params = {
        activityserialno: activityid,
        mobile: phoneStr,
      };
      getData(
        "post",
        my_url + "/crm/activity/activityCall.do",
        function (data) {
          if (data.code == 0) {
            _this.search(1);
            if (_this.iscall == "Y") {
              let params = {
                Action: "DialCTI",
                dn: data.phoneno,
                anis: data.phoneprefix + phoneStr,
                cltid: data.callid,
              };
              getPhoneData("post", "http://" + data.phoneurl + "/CRM2CTI/", function (data) { }, params);
            }
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: "error",
            });
          }
        },
        params
      );
    },
    clickIdoverage() {
      //点击转超龄客户
      if (this.idoverage == "Y") {
        this.idoverage = "N";
      } else {
        this.idoverage = "Y";
        this.ispeer = "N";
        this.isvacantnumber = "N";
        this.dialogVisible = true;
      }
    },
    clickIspeer() {
      //点击转同行资源
      if (this.ispeer == "Y") {
        this.ispeer = "N";
      } else {
        this.ispeer = "Y";
        this.idoverage = "N";
        this.isvacantnumber = "N";
        this.dialogVisible = true;
      }
    },
    clickIsvacantnumbe() {
      //点击转空号停机
      if (this.isvacantnumber == "Y") {
        this.isvacantnumber = "N";
      } else {
        this.isvacantnumber = "Y";
        this.ispeer = "N";
        this.idoverage = "N";
        this.dialogVisible = true;
      }
    },
    remoteMethod(query) {
      let _this = this;
      if (query !== "") {
        this.loading = true;
        this.cjgList = [];
        let body = {
          title: query,
        };
        getData(
          "post",
          my_url + "/crm/knowledge/getKnowledgeList.do",
          function (data) {
            //渠道类型
            _this.loading = false;
            data.rows.forEach((item) => {
              _this.cjgList.push({
                value: item.baseid,
                baseid: item.baseid,
                label: "【" + item.typename + "】" + item.title,
                type: item.type,
                typename: item.typename,
              });
            });
          },
          body
        );
      } else {
        this.cjgList = [];
      }
    },
    cjgChange() {
      let item = this.cjgList.find((item) => item.baseid === this.cjgTitle);
      this.showEditPopup(item);
    },

    cjgfocus() {
      this.cjgTitle = "";
    },
    cancel() {
      //取消
      this.followrecord = "";
    },
    release() {
      //发布
      let _this = this;

      let arr = [],
        remarkStr = "";
      this.followrecord.split("\n").forEach((item) => arr.push(`<p>${item.trim()}</p>`));
      remarkStr = arr.join("");
      let params = {
        remark: remarkStr,
        activityserialno: this.detailsInfo.activityserialno,
      };
      getData(
        "post",
        my_url + "/crm/activity/activityRemark.do",
        function (data) {
          //团队
          _this.followrecord = "";
          if (data.code == 0) {
            _this.$message({
              showClose: true,
              message: "发布成功!",
              duration: 3000,
              type: "success",
            });
            _this.getReleaseData();
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: "error",
            });
          }
        },
        params
      );
    },
    postRemark() {
      let _this = this;
      let path;
      if (this.idoverage === "Y") path = "/crm/activity/activityOverAge.do";
      if (this.ispeer === "Y") path = "/crm/activity/activityPeer.do";
      if (this.isvacantnumber === "Y") path = "/crm/activity/activityVacantNumber.do";
      getData(
        "post",
        my_url + path,
        function (data) {
          //渠道类型
          if (data.code == 0) {
            _this.dialogVisible = false;
            _this.idoverageActived = false;
            _this.peerActived = false;
            _this.vacantnumberActived = false;
            if (_this.idoverage === "Y") {
              _this.idoverageActived = true;
            }
            if (_this.ispeer === "Y") {
              _this.peerActived = true;
            }
            if (_this.isvacantnumber === "Y") {
              _this.vacantnumberActived = true;
            }
          }
        },
        {
          remark: _this.remark,
          activityserialno: _this.detailsInfo.activityserialno,
        }
      );
    },
    newWangEditor(el1, el2) {
      editor4 = new wangEditor(el1, el2); // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      editor4.customConfig.pasteFilterStyle = false;
      // 隐藏“网络图片”tab
      editor4.customConfig.showLinkImg = false;
      // 忽略粘贴内容中的图片
      editor4.customConfig.pasteIgnoreImg = true;
      // 使用 base64 保存图片
      //editor4.customConfig.uploadImgShowBase64 = true
      editor4.customConfig.menus = ["image"];
      // 上传图片到服务器
      editor4.customConfig.uploadFileName = "myFile"; //设置文件上传的参数名称
      editor4.customConfig.uploadImgServer = my_url + "/crm/fileupload/impUpload.do"; //设置上传文件的服务器路径
      editor4.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

      //自定义上传图片事件
      editor4.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) { },
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
        },
      };
      editor4.create();
    },
    newWangEditor1(el1, el2) {
      editor5 = new wangEditor(el1, el2); // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      editor5.customConfig.pasteFilterStyle = false;
      // 隐藏“网络图片”tab
      editor5.customConfig.showLinkImg = false;
      // 忽略粘贴内容中的图片
      editor5.customConfig.pasteIgnoreImg = true;
      // 使用 base64 保存图片
      //editor.customConfig.uploadImgShowBase64 = true
      editor5.customConfig.menus = ["image"];
      // 上传图片到服务器
      editor5.customConfig.uploadFileName = "myFile"; //设置文件上传的参数名称
      editor5.customConfig.uploadImgServer = my_url + "/crm/fileupload/impUpload.do"; //设置上传文件的服务器路径
      editor5.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

      //自定义上传图片事件
      editor5.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) { },
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
        },
      };
      editor5.create();
    },
    newWangEditor2(el1, el2) {
      editor6 = new wangEditor(el1, el2); // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      editor6.customConfig.pasteFilterStyle = false;
      // 隐藏“网络图片”tab
      editor6.customConfig.showLinkImg = false;
      // 忽略粘贴内容中的图片
      editor6.customConfig.pasteIgnoreImg = true;
      // 使用 base64 保存图片
      //editor.customConfig.uploadImgShowBase64 = true
      editor6.customConfig.menus = ["image"];
      // 上传图片到服务器
      editor6.customConfig.uploadFileName = "myFile"; //设置文件上传的参数名称
      editor6.customConfig.uploadImgServer = my_url + "/crm/fileupload/impUpload.do"; //设置上传文件的服务器路径
      editor6.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

      //自定义上传图片事件
      editor6.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) { },
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
        },
      };
      editor6.create();
    },
    newWangEditor3(el1, el2) {
      editor7 = new wangEditor(el1, el2); // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      editor7.customConfig.pasteFilterStyle = false;
      // 隐藏“网络图片”tab
      editor7.customConfig.showLinkImg = false;
      // 忽略粘贴内容中的图片
      editor7.customConfig.pasteIgnoreImg = true;
      // 使用 base64 保存图片
      //editor.customConfig.uploadImgShowBase64 = true
      editor7.customConfig.menus = ["image"];
      // 上传图片到服务器
      editor7.customConfig.uploadFileName = "myFile"; //设置文件上传的参数名称
      editor7.customConfig.uploadImgServer = my_url + "/crm/fileupload/impUpload.do"; //设置上传文件的服务器路径
      editor7.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

      //自定义上传图片事件
      editor7.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) { },
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
        },
      };
      editor7.create();
    },
    showEditPopup(item) {
      this.getItem(item).then((res) => {
        this.getUploadFile(item.baseid);
        let body, url;
        if (item.type === "01") {
          this.bdjsItem = res.policyread;
          this.bdjsItem.baseid = item.baseid;
        }
        if (item.type === "02") {
          this.jbhbItem = res.diseaseUw;
          this.jbhbItem.baseid = item.baseid;
          this.$set(this.jbhbItem, "productJsonStr", res.diseaseUwProductList);
        }
        if (item.type === "03") {
          this.dkwItem = res.anscusque;
          this.dkwItem.baseid = item.baseid;
        }
        this.CJGselectValue = item.typename;
        this.cjgdrawer = true;
        this.$nextTick(() => {
          if (this.bdjsItem.policydetail && item.type === "01") {
            this.newWangEditor("", "#div2");
            editor4.txt.html(this.bdjsItem.policydetail);
            editor4.$textElem.attr("contenteditable", false);
          } else {
            $(".w-e-text").remove();
          }
        });
        this.$nextTick(() => {
          if (this.bdjsItem.suggestion && item.type === "01") {
            this.newWangEditor1("", "#div4");
            editor5.txt.html(this.bdjsItem.suggestion);
            editor5.$textElem.attr("contenteditable", false);
          } else {
            $(".w-e-text").remove();
          }
        });
        this.$nextTick(() => {
          if (this.dkwItem.content && item.type === "03") {
            this.newWangEditor2("", "#div6");
            this.newWangEditor3("", "#div8");
            editor6.txt.html(this.dkwItem.content);
            editor7.txt.html(this.dkwItem.voice);
            editor6.$textElem.attr("contenteditable", false);
            editor7.$textElem.attr("contenteditable", false);
          }
        });
      });
    },
    changeSuggestion(Suggestion) {
      this.currentSuggestion = Suggestion;
    },
    getItem(item) {
      let body = {
        baseid: item.baseid,
      },
        url;
      if (item.type === "01") {
        url = "/crm/knowledge/getOnePolicyRead.do";
      }
      if (item.type === "02") {
        url = "/crm/knowledge/getOneDiseaseUw.do";
      }
      if (item.type === "03") {
        url = "/crm/knowledge/getOneAnsCusQue.do";
      }

      return new Promise((resovle, reject) => {
        getData(
          "post",
          my_url + url,
          (res) => {
            if (res.code == 0) {
              resovle(res);
            } else {
              reject();
            }
          },
          body
        );
      });
    },
    getUploadFile(id) {
      let body = {
        secondid: id,
      };
      getData(
        "post",
        my_url + "/crm/fileupload/getFileListBySecondId.do",
        (res) => {
          if (res.code == 0) {
            this.fileList = res.fileList;
          }
        },
        body
      );
    },

    querySearchId(queryString, cb) {
      var SalesmanIdBox = this.SalesmanIdBox;
      var results = queryString ? SalesmanIdBox.filter(this.createFilterId(queryString)) : SalesmanIdBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    shareCustomer() {
      let _this = this;
      getData(
        "post",
        my_url + "/crm/activity/activityShare.do",
        function (data) {
          //渠道类型
          if (data.code == 0) {
            _this.shareDialogVisible = false;
          }
        },
        {
          activityuserid: _this.detailsInfo.userid,
          shareuserid: _this.SalesmanIdBox.find((item) => item.value === this.shareUserName).id,
          activityserialno: _this.detailsInfo.activityserialno,
        }
      );
    },
    getReleaseData() {
      //发布的列表
      let _this = this;
      let params = {
        activityserialno: this.detailsInfo.activityserialno,
      };
      getData(
        "post",
        my_url + "/crm/activity/getRemarkList.do",
        function (data) {
          let { total, rows } = data;
          _this.releaseNum = rows.length;
          rows.forEach((res) => {
            res.name = _this.detailsInfo.name;
            // res.makedate = _this.formatDate(res.makedate, 'yyyy-MM-dd HH:ss:mm');
            res.remark = res.remark.replace(/:/g, "：");
            if (res.remark.indexOf("{") > -1 && res.remark.indexOf("}") > -1) {
              let str = "";
              let remark = JSON.parse(res.remark);
              for (let key in remark) {
                str += key + "：" + remark[key] + "<br/>";
              }
              res.remark = str;
            }
          });
          _this.records = rows;
          // _this.records = [{
          //   remark: "sdadafasdada",
          //   oprname: "sssfa",
          //   makedate: '2019-9-10',
          //   remarkid: 1
          // }]
        },
        params
      );
    },
    deleteRemark(id) {
      let _this = this;
      let params = {
        remarkid: id,
      };
      getData(
        "post",
        my_url + "/crm/activity/activityRemarkDelete.do",
        function (data) {
          if (data.code == 0) {
            _this.$message({
              showClose: true,
              message: "删除成功!",
              duration: 3000,
              type: "success",
            });
            _this.getReleaseData();
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: "error",
            });
          }
        },
        params
      );
    },
    getCallData() {
      let _this = this;
      let params = {
        activityserialno: this.detailsInfo.activityserialno,
      };
      getData(
        "post",
        my_url + "/crm/activity/getCallList.do",
        function (data) {
          if (data.code == "0") {
            let arr = data.callList.map((item) => {
              var calltimeType = item.calltime.replace(/-|:|_|\s/g, "");
              return Object.assign({}, item, {
                calltimeType: calltimeType,
              });
            });
            _this.callDataList = arr;
            _this.callSum = data.callSum;
          }
        },
        params
      );
    },
    top(row) {
      let _this = this;
      let params = {
        activityserialno: row.activityserialno,
      };
      getData(
        "post",
        my_url + "/crm/activity/setActivityTopOrder.do",
        function (data) {
          if (data.code == "0") {
            _this.search(1);
          }
        },
        params
      );
    },
    cancelTop(row) {
      let _this = this;
      let params = {
        activityserialno: row.activityserialno,
      };
      getData(
        "post",
        my_url + "/crm/activity/unSetActivityTopOrder.do",
        function (data) {
          if (data.code == "0") {
            _this.search(1);
          }
        },
        params
      );
    },
    inputUserSubmit() {
      let _this = this;
      if (!_this.inputUserform.wxno && !_this.inputUserform.mobile) {
        _this.$message({
          type: "waring",
          duration: 3000,
          message: "电话和微信至少填写一个！",
        });
        return;
      }
      if (_this.inputUserform.mobile != null && _this.inputUserform.mobile != "" && !/^1[3456789]\d{9}$/.test(_this.inputUserform.mobile)) {
        _this.$message({
          type: "waring",
          duration: 3000,
          message: "请填写正确的电话号码！",
        });
        _this.inputUserform.mobile = "";
        return;
      }
      getData(
        "post",
        my_url + "/crm/activity/pageActivityInsert.do",
        function (data) {
          if (data.code == "0") {
            _this.$message({
              type: "success",
              duration: 3000,
              message: "录入成功！",
            });
            _this.inputUserform.name = "";
            _this.inputUserform.mobile = "";
            _this.inputUserform.wxno = "";
            _this.inputUserform.batchno = "";
            _this.inputUserform.sourcelevel = "A";
            _this.inputUserVisable = false;
            _this.search(1);
          } else {
            _this.$message({
              type: "waring",
              duration: 3000,
              message: data.msg,
            });
          }
        },
        _this.inputUserform
      );
    },
    inputUserCancel() {
      this.sable = false;
      this.inputUserform1 = this.inputUserform2;
      this.inputUserVisable = false;
      this.inputUserform.name = "";
      this.inputUserform.mobile = "";
      this.inputUserform.wxno = "";
    },
    sortChange(val) {
      this.order = val.order;
      this.prop = val.prop;
      this.search(1);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.checkedAllNum = val.length;
    },
    deleteSourceSubmit() {
      let _this = this;
      let activityid = [];
      _this.multipleSelection.forEach(function (item) {
        activityid.push(item.activityserialno);
      });
      if (activityid.length == 0) {
        _this.$message({
          type: "waring",
          duration: 3000,
          message: "请选择需要删除的资源！",
        });
        return;
      }
      let params = {
        activityid: activityid.join(","),
      };
      getData(
        "post",
        my_url + "/crm/activity/pageActivityDelete.do",
        function (data) {
          if (data.code == "0") {
            _this.$message({
              type: "success",
              duration: 3000,
              message: "删除成功！",
            });
            _this.deleteSourceVisable = false;
            _this.search(1);
          } else {
            _this.$message({
              type: "waring",
              duration: 3000,
              message: data.msg,
            });
          }
        },
        params
      );
    },
    deleteSourceCancel() {
      this.deleteSourceVisable = false;
    },
    handleSelectId(item) {
      this.resourceDeployform.userid = item.id;
    },
    resourceDeploySubmit() {
      let _this = this;
      let activityid = [];
      _this.multipleSelection.forEach(function (item) {
        activityid.push(item.activityserialno);
      });
      if (activityid.length == 0) {
        _this.$message({
          type: "waring",
          duration: 3000,
          message: "请选择需要调配的资源！",
        });
        return;
      }
      //添加的新业务员编号
      let userid = [];
      userid.push(this.resourceDeployform.userid);

      this.resourceDeployform.activityid = activityid.join(",");
      this.resourceDeployform.userid = userid.join("");
      getData(
        "post",
        my_url + "/crm/activity/activityTransfer.do",
        function (data) {
          if (data.code == "0") {
            _this.$message({
              type: "success",
              duration: 3000,
              message: "调配成功！",
            });
            _this.resourceDeployVisable = false;
            _this.resourceDeployform.followupstep = "";
            _this.resourceDeployform.activityid = "";
            _this.userNameList = [];
            _this.teamNames = "团队选择";
            _this.teamList = "";
            _this.resourceDeployform.userid = "";
            _this.editInfo.shareusername = "";
            _this.search(1);
          } else {
            _this.$message({
              type: "waring",
              duration: 3000,
              message: data.msg,
            });
          }
        },
        this.resourceDeployform
      );
    },
    resourceDeployCancel() {
      this.resourceDeployVisable = false;
      this.resourceDeployform.followupstep = "";
      this.resourceDeployform.activityid = "";
      this.editInfo.shareusername = "";
      this.resourceDeployform.userid = "";
      this.userNameList = [];
      this.teamNames = "团队选择";
      this.teamList = "";
      // this.$refs.tree1.setCheckedKeys([])
    },
    resourceDeployShow() {
      // this.getTeamList();
    },
    getTeamList() {
      let _this = this;
      //设置当前用户的团队列表参数
      getData("post", my_url + "/crm/auth/getTalkTeamList.do", function (data) {
        let tempData = [];
        if (data.teamList == null || data.teamList == "") {
          _this.disTeamAll = false;
        } else {
          _this.disTeamAll = true;
        }
        _this.teamDataList = data.teamList;
      });
    },

    handleCheckChange(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label);
      });
      this.my_list = teamListName.join(",");
      this.teamList = checked.checkedKeys.join(",");
    },
    handleCheckChange2(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label);
      });
      this.my_list2 = teamListName.join(",");
      this.teamList2 = checked.checkedKeys.join(",");
      this.overviewForm.teamid = this.teamList2;
    },
    my_sureOne() {
      this.$refs.disTeam.hide();
      this.my_list = "";
      this.teamList = "";
      this.teamNames = "团队选择";
    },
    my_sure() {
      let _this = this;
      this.$refs.disTeam.hide();
      if (this.my_list == null || this.my_list == "" || this.my_list == "1") {
      }
      this.teamNames = this.my_list;
      //获取业务员列表
      getData(
        "post",
        my_url + "/crm/auth/getUserIdNameListByTeam.do",
        function (data) {
          _this.userNameList = data.namelist;
        },
        {
          teamid: this.teamList,
        }
      );
    },
    my_sureOne2() {
      this.$refs.disTeam2.hide();
      this.my_list2 = "";
      this.teamList2 = "";
      this.teamNames2 = "团队选择";
      this.overviewForm.teamid = "";
      this.$refs.tree2.setCheckedKeys([]);
      this.queryflag = true;
      // this.search();
      // this.refresh();
    },
    my_sure2() {
      let _this = this;
      this.$refs.disTeam2.hide();

      if (this.my_list2 == null || this.my_list2 == "" || this.my_list2 == "1") {
        this.queryflag = true;
        this.queryflagString = "01";
      } else {
        this.teamNames2 = this.my_list2;
        this.queryflag = false;
        this.queryflagString = "02";
      }
      this.overviewForm.userid = "";
      // this.search();
      // this.refresh();
      //获取业务员列表
      getData(
        "post",
        my_url + "/crm/auth/getUserIdNameListByTeam.do",
        function (data) {
          _this.userNameOptions = data.namelist;
        },
        {
          teamid: this.teamList2,
        }
      );
    },

    userNameChange() {
      this.queryflag = false;
      this.queryflagString = "02";
      this.search();
      // this.refresh();
    },
    // refresh(flag) {
    //   var _this = this;
    //   var tableDataOverview = []
    //   if (flag) {
    //     this.isrefresh = true;
    //     setTimeout(() => {
    //       _this.isrefresh = false;
    //     }, 1000);
    //   }

    //   getData('post', my_url + '/crm/activity/getActivityDataView.do', function (data) {
    //     data.activityTodayTj.type = "今日新增量"
    //     data.activityTj.type = "累计总数量";
    //     data.today_X_List.type = "今日需回访"
    //     data.tomorrow_X_List.type = "明日需回访"
    //     data.activityTodayTj.yesterday = "昨日回访";
    //     data.today_X_List.yesterday = "本月跟丢"

    //     data.activityTj.yesterday = data.yesterday_visit
    //     data.tomorrow_X_List.yesterday = data.month06count
    //     data.activityTj['hotlinecount'] = data.activityTj.sumcount
    //     data.activityTodayTj['hotlinecount'] = data.activityTodayTj.sumcount

    //     tableDataOverview.push(data.activityTodayTj)
    //     tableDataOverview.push(data.activityTj)
    //     tableDataOverview.push(data.today_X_List)
    //     tableDataOverview.push(data.tomorrow_X_List)
    //     _this.tableDataOverview = tableDataOverview
    //   }, _this.overviewForm);
    // },
    getOrderData() {
      let _this = this;
      _this.detai_loading = true;
      getData(
        "post",
        my_url + "/crm/activity/getPolicyInfoByAppntMobile.do",
        function (data) {
          if (data.code == "0") {
            var arr = [];
            data.policyList.forEach((item) => {
              if (item.status === "effective") {
                arr.unshift(item);
              } else {
                arr.push(item);
              }
            });
            _this.policyList = arr;
            _this.detai_loading = false;
          }
        },
        {
          mobile: this.detailsInfo.mobilebak,
        }
      );
    },

    // 获取电话列表
    getmobileList(activityid) {
      let _this = this;
      getData(
        "post",
        my_url + "/crm/activity/getActivityMobileList.do",
        function (data) {
          if (data.code == 0) {
            var mobilelist = [];
            data.moibleList.forEach(function (item) {
              mobilelist.push({
                phone: item,
              });
            });
            _this.mobileList = mobilelist;
          }
        },
        {
          activityid: activityid,
        }
      );
    },
    mobileToTop(scope) {
      let _this = this;
      getData(
        "post",
        my_url + "/crm/activity/activityUpdateMobile.do",
        function (data) {
          if (data.code == "0") {
            _this.getmobileList(_this.detailsInfo.activityserialno);
            _this.$message({
              type: "success",
              duration: 3000,
              message: "置顶成功！",
            });

            _this.detailsInfo.mobilestr = scope.row.phone;
          } else {
            _this.$message({
              type: "success",
              duration: 3000,
              message: data.msg,
            });
          }
        },
        {
          activityid: this.detailsInfo.activityserialno,
          mobile: scope.row.phone,
          // mobile:18611158884
        }
      );
    },

    mobileDelete(scope) {
      let _this = this;
      _this.deleteMobile = scope.row.phone;
      getData(
        "post",
        my_url + "/crm/activity/activityDeleteMobile.do",
        function (data) {
          if (data.code == "0") {
            _this.getmobileList(_this.detailsInfo.activityserialno);
            _this.$message({
              type: "success",
              duration: 3000,
              message: "删除成功！",
            });
          } else {
            _this.$message({
              type: "success",
              duration: 3000,
              message: data.msg,
            });
          }
        },
        {
          activityid: this.detailsInfo.activityserialno,
          mobile: this.deleteMobile,
        }
      );
    },
    addMoblieChange(val) {
      if (checkMobile(val)) {
        this.mobileInputShow = true;
      } else {
        this.mobileInputShow = false;
      }
    },
    mobileAdd() {
      var _this = this;
      var addMoblieStr = _this.addMoblie;
      getData(
        "post",
        my_url + "/crm/activity/activityAddMobile.do",
        function (data) {
          if (data.code == "0") {
            _this.getmobileList(_this.detailsInfo.activityserialno);
            _this.$message({
              type: "success",
              duration: 3000,
              message: "添加成功！",
            });
            _this.addMoblie = "";
          } else {
            _this.$message({
              type: "success",
              duration: 3000,
              message: data.msg,
            });
          }
        },
        {
          activityid: this.detailsInfo.activityserialno,
          mobile: this.addMoblie,
        }
      );
    },
    mobileCancle() {
      this.addMoblie = "";
      this.mobileInputShow = false;
    },

    querySearchId(queryString, cb) {
      var SalesmanIdBox = this.SalesmanIdBox;
      var results = queryString ? SalesmanIdBox.filter(this.createFilterId(queryString)) : SalesmanIdBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    createFilterId(queryString) {
      return (SalesmanIdBox) => {
        return SalesmanIdBox.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    getUserIdData() {
      let _this = this;

      if (this.dis_Pz_up) {
        getData("post", my_url + "/crm/auth/getUserIdNameList.do", function (data) {
          //渠道类型
          if (data.code == 0) {
            let nameList = data.namelist;
            nameList.forEach((res) => {
              _this.SalesmanIdBox.push({
                value: res.username,
                id: res.userid,
              });
            });
          }
        });
      } else {
        getData("post", my_url + "/crm/auth/getAllUserIdNameList.do", function (data) {
          //渠道类型
          if (data.code == 0) {
            let nameList = data.namelist;
            nameList.forEach((res) => {
              _this.SalesmanIdBox.push({
                value: res.username,
                id: res.userid,
              });
            });
          }
        });
      }
    },
    saveRecord() {
      //保存记录
      let _this = this;

      if (this.email != null && this.email != "") {
        if (!checkEmail(this.email)) {
          _this.$message({
            showClose: true,
            message: "邮箱格式不正确！",
            duration: 3000,
            type: "error",
          });
          return;
        }
      }

      let save_share_id = "";

      if (this.editInfo.shareusername != null && this.editInfo.shareusername != "") {
        if (this.SalesmanIdBox.find((item) => item.value === this.editInfo.shareusername) == undefined) {
          loading.close();
          _this.$message({
            showClose: true,
            message: "您的权限不足",
            duration: 3000,
            type: "success",
          });
          return;
        } else {
          save_share_id = this.SalesmanIdBox.find((item) => item.value === this.editInfo.shareusername).id;
        }
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let params = {
        // mobile: _this.mobileList[0].phone,
        mobile: _this.mobilestr,
        activityserialno: this.detailsInfo.activityserialno, //线索流水号
        // activitytag: this.activitytag.join(),
        name: this.detailsInfo.name, //注册姓名
        wxno: this.wxnostr,
        email: this.email,
        age: this.age,
        mobile: this.detailsInfo.mobilestr,
        birthday: this.birthday,
        sex: this.sex,
        previstitime: this.formatDate(this.returnVisit, "yyyy-MM-dd HH:mm:ss"), //预约回访时间
        followupstep: this.visit, //跟进步骤
        oldprevistitime: this.formatDate(this.detailsInfo.previstitime, "yyyy-MM-dd HH:mm:ss"),
        otherstore: this.editInfo.otherstore,
        shareuserid: save_share_id,
        activityuserid: this.detailsInfo.userid,
        mobileprovince: this.mobileprovince,
        mobilecity: this.mobilecity,
        mobilecountry: this.mobilecountry,
        address: this.address,
      };
      getData(
        "post",
        my_url + "/crm/activity/activityUpdate.do",
        function (data) {
          _this.followrecord = "";
          if (data.code == 0) {
            setTimeout(() => {
              _this.$message({
                showClose: true,
                message: "保存成功!",
                duration: 3000,
                type: "success",
              });
              _this.search();
            }, 1000);
          } else {
            _this.$message({
              showClose: true,
              message: data.msg,
              duration: 3000,
              type: "error",
            });
          }
          loading.close();
          _this.drawer = false;
        },
        params
      );
    },
    cancelShare(row) {
      let _this = this;
      getData(
        "post",
        my_url + "/crm/activity/activityShareDelete.do",
        function (data) {
          //渠道类型
          if (data.code == "0") {
            _this.search();
          }
        },
        {
          shareserialno: row.shareserialno,
        }
      );
    },
    // 设置滚动条
    scrollHieght() {
      //滚动条距离顶部距离
      let s1 = document.documentElement.scrollTop;
      //页面可视区域高度
      let s2 = document.documentElement.clientHeight;
      // 页面总高度
      let s3 = document.documentElement.scrollHeight;
      let s4 = s3 - s2;
      if (s4 > 0) {
        document.documentElement.scrollTop = s4;
      }
    },
  },
}
















    </script>
    <style src="../../static/css/viewer.min.css"></style>
    <style src="../../static/css/drawer.css"></style>
    <style src="../../static/css/customerManagementNew.css"></style>
    <style>
.entry-data .el-dialog__body {
  padding: 0 0 0 0.3rem;
}

.entry-data-box .common-select {
  position: relative;
  width: 33%;
  margin-top: 0.18rem;
  float: left;
}

.entry-data-box .common-select .select-content {
  margin-right: 0.8rem;
}

.entry-data-box .common-select .sign {
  font-style: italic;
  position: absolute;
  top: 3px;
  right: 25px;
  color: rgba(151, 151, 151, 1);
}

.entry-customer-popper {
  width: auto !important;
  font-size: 0.14rem;
  padding-top: 0.2rem;
}

.entry-customer-popper .common-select {
  margin-bottom: 0.1rem;
}

.entry-customer-popper .common-select .select-content {
  margin-right: 0.12rem;
}

.entry-customer-popper .common-select .select-content .el-input-inners .el-input__inner {
  font-size: 0.14rem;
}

.select-content .el-select-inners-splice .el-input__inner {
  height: 0.28rem;
  line-height: 0.28rem;
}

.modify-icon .el-date-editor .el-input__inner {
  padding: 0 0.4rem !important;
}

.top-row .el-table__cell {
  background: rgba(245, 220, 217, 0.5);
}

#audio {
  height: 30px;
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 3000;
}

.ad-select-content .el-select-inners .el-input__icon {
  margin-left: 1rem;
}

.el-popover__reference-wrapper {
  display: flex;
  height: 100%;
  align-items: center;
}

.customerManagementNew {
  height: 100%;
  background: rgb(242, 242, 242);
  /* padding: 0.1rem 0.4rem 0 0.4rem; */
  width: 17.1rem;
}

.yuyue .el-tooltip {
  display: flex;
}

.boxpad .el-date-editor .el-input__inner {
  padding-left: 0.3rem !important;
  padding-right: 0rem !important;
}

.gjg_topping {
  display: none !important;
  color: #979797 !important;
  width: 15% !important;
  cursor: pointer;
}
.customer-drawer .drawerRight .drawercontentBox ul li:hover .gjg_topping {
  display: block !important;
}

.filContent .el-input-inners .el-input__inner {
  border: 1px solid #dcdfe6;
  height: 0.3rem;
  line-height: 0.3rem;
}
</style>
    
    
    <style   scoped>
.container-search-box .common-select {
  width: 23%;
}

.filContent .el-dropdown-inners {
  width: 100%;
}

.select-content .el-dropdown-inners > span {
  width: 3.2rem;
}
.resourceAllocation {
  width: auto;
  padding: 0.01rem 0.18rem;
  background: #fff;
  border: 1px solid #dc220d;
  color: #dc220d;
}
.newsalesperson {
  width: 1.1rem;
  border: none;
  background: #fff;
}

.resourceCancel {
  background: #fff;
  color: #dc240f;
  border: 0.01rem solid #dc240f;
}
.resourceDel {
  width: auto;
  padding: 0.01rem 0.18rem;
  background: #fff;
  border: 1px solid #dc220d;
  color: #dc220d;
}

.check-all-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 