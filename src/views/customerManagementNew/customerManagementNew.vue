<template>
  <div class="customerManagementNewContainer" style="height: 100%; background: rgb(242, 242, 242);padding: 0.1rem 0.4rem 0 0.4rem;">
    <div class="container-top">
      <!-- 数据概览 -->
      <div class="container-top-one">
        <div class="clearfix">
          <p class="new-title fl">数据概览</p>
          <div class="fr" style="display: flex; align-items: center; justify-content: flex-end;">
            <div class="common-select" v-show="dis_P4_up">
              <div class="select-title">选择团队</div>
              <div class="select-content">
                <el-dropdown trigger="click" placement="bottom" ref="disTeam2">
                  <p class="el-dropdown-inners" clearable>
                    <span>{{teamNames2}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </p>
                  <el-dropdown-menu class="" slot="dropdown">
                    <el-tree @check="handleCheckChange2" :data="teamDataList" ref="tree2" show-checkbox node-key="id"
                      :default-expanded-keys="[1]" :props="defaultProps">
                    </el-tree>
                    <div class="sure-footer">
                      <div class="my-sure" @click="my_sure2">确定</div>
                      <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="my_sureOne2">取消</div>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="common-select" v-show="dis_P4_up">
              <div class="select-title" style="width: 1.1rem">业务员姓名</div>
              <div class="select-content" style="width:1.68rem;border: none">
                <el-select class="el-select-inners" placeholder="请选择" size="mini" v-model="overviewForm.userid" @change="userNameChange" clearable>
                  <el-option v-for="item in userNameOptions" :key="item.userid" :label="item.username" :value="item.userid">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select" style="width: 1.2rem;">
              <div class="select-content" style=" margin-right: 0.2rem;border: none;">
                <el-select class="el-select-inners el-select-inners-splice" placeholder="请选择" size="mini" v-model="overviewFormTime" @change="dateChange">
                  <el-option v-for="item in timeOption" :key="item.value" :label="item.key" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="refresh" @click="refresh(true)">
              <i class="el-icon-refresh" :class="[{'refresh-crile': isrefresh}]"></i>
              <span>刷新</span>
              <!-- <el-button icon="el-icon-refresh" size="mini" type="text" @click="refresh">刷新</el-button> -->
            </div>
          </div>
        </div>
        <div class="table-overview">
          <el-table :data="tableDataOverview" border style="width: 100%">
            <el-table-column align="center" prop="type" label="数据类型" width="120">
            </el-table-column>
            <el-table-column align="center" prop="hotlinecount" label="新资源">
            </el-table-column>
            <el-table-column align="center" prop="follow01count" label="微信">
            </el-table-column>
            <el-table-column align="center" prop="follow02count" label="配置方案">
            </el-table-column>
            <el-table-column align="center" prop="follow03count" label="认清市场">
            </el-table-column>
            <el-table-column align="center" prop="follow04count" label="渠道服务">
            </el-table-column>
            <el-table-column align="center" prop="follow05count" label="促销T单">
            </el-table-column>
            <el-table-column align="center" prop="follow07count" label="已成交">
            </el-table-column>
            <el-table-column align="center" prop="yesterday" label="昨日数据">
            </el-table-column>
          </el-table>
        </div>
        
      </div>
      <!-- 信息检索 -->
      <div class="container-top-two" style="overflow-x: auto;overflow-y: hidden;">
        <span class="spilce-title new-title">信息检索</span>
        <div class="container-search-box">
          <div>
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">线索产生时间</div>
              <div class="select-content" style="height: 0.3rem; width: 3.2rem;  border: none">
                <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="datetimerange" align="right" size="mini" unlink-panels
                    range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
                  </el-date-picker>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">资源等级</div>
              <div class="select-content" style="width: 3.2rem; border: none">
                <el-select class="el-select-inners" v-model="sourcelevel" placeholder="请选择资源等级" size="mini" clearable>
                  <el-option label="A理财" value="A+"></el-option>
                  <el-option label="A重疾" value="A"></el-option>
                  <el-option label="A-" value="A-"></el-option>
                  <el-option label="B+" value="B+"></el-option>
                  <el-option label="B" value="B"></el-option>
                  <el-option label="B-" value="B-"></el-option>
                  <el-option label="C" value="C"></el-option>
                  <el-option label="C-" value="C-"></el-option>
                  <el-option label="Z" value="Z"></el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">
                <!-- label选择框 -->
                <el-select class="el-input-title-inners" v-model="planid" placeholder="请选择" size="mini">
                  <el-option label="批次号" value="批次号"></el-option>
                  <el-option label="渠道类型" value="渠道类型"></el-option>
                  <el-option label="广告计划ID" value="广告计划ID"></el-option>
                </el-select>
              </div>
              <div class="select-content" style="width: 3.2rem;">
                <el-input class="el-input-inners" v-model="planidBatchno" align="right" size="mini" clearable></el-input>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">客户姓名</div>
              <div class="select-content" style="width: 3.2rem;">
                <el-input class="el-input-inners" v-model="Salesman" size="mini" placeholder="请输入客户姓名" clearable></el-input>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">
                <el-select class="el-input-title-inners" v-model="phoneWxno" placeholder="请选择" size="mini">
                  <el-option label="电话号码" value="电话号码"></el-option>
                  <el-option label="微信号" value="微信号"></el-option>
                </el-select>
              </div>
              <div class="select-content" style="width: 3.2rem;">
                <el-input class="el-input-inners" v-model="phoneWxnoValue" align="right" size="mini" clearable></el-input>
              </div>
            </div>
          </div>
          <div class="search-box-right">
            <div class="my-customers" v-show="ismyUse">
              <el-checkbox size="mini" v-model="queryflag">我的客户</el-checkbox>
            </div>
            <div style="display: flex;">
              <div class="search-btn" @click="search(1)">搜索</div>
              <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 中间部分内容 -->
    <div class="container-middle">
      <div class="container-middle-one">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(item, index) in add_steps" :name="item.dd_key" :key="index">
            <p slot="label" class="source-level">{{item.dd_value}}
              <el-tooltip popper-class="atooltip qq" effect="light" placement="top">
                <template slot="content">
                  <p>{{item.roule}}</p>
                  <p>{{item.bignum}}</p>
                </template>
                <span></span>
              </el-tooltip>
            </p>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="container-middle-two">
        <div class="search-btn" @click="dataEntry" style="width:auto; padding: 0.03rem 0.08rem;">日数据录入</div>
        <el-popover popper-class="entry-customer-popper" class="entry-customer" placement="bottom-start" width="3.31rem" trigger="click" v-model="inputUserVisable">
          <div class="search-btn" slot="reference" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D;">客户录入</div>
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
                <!-- <el-option label="联通资源" value="联通资源"></el-option>
                <el-option label="天眼保" value="天眼保"></el-option> -->
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
            <div class="my-sure" @click="inputUserSubmit">确定</div>
            <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="inputUserCancel">取消</div>
          </div>
        </el-popover>
        <el-popover  popper-class="entry-customer-popper" v-show="dis_P4_up" placement="bottom-start" width="3.31rem" trigger="click" v-model="resourceDeployVisable" @show="resourceDeployShow">
          <div class="search-btn" slot="reference" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D;">资源调配</div>
          <div class="common-select">
            <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">新所属业务员</div>
            <div class="select-content" style="width: 2rem;">
              <el-autocomplete class="el-input-inners" v-model="editInfo.shareusername" :fetch-suggestions="querySearchId" placeholder="请输入新所属业务员" :trigger-on-focus="false"
                @select="handleSelectId"></el-autocomplete>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">新跟进步骤</div>
            <div class="select-content" style="width:2rem;border: none;">
              <el-select class="el-select-inners" v-model="resourceDeployform.followupstep" placeholder="请选择新跟进步骤">
                <el-option v-for="item in select_steps" :label="item.dd_value" :value="item.dd_key" :key="item.dd_key"></el-option>
              </el-select>
            </div>
          </div>
          <div class="sure-footer" style="padding-bottom: 0;">
            <div class="my-sure" @click="resourceDeploySubmit">确定</div>
            <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="resourceDeployCancel">取消</div>
          </div>
        </el-popover>
        <el-popover  popper-class="entry-customer-popper" v-show="dis_Pz_up" placement="bottom-start" width="3.31rem" trigger="click" v-model="deleteSourceVisable">
          <div class="search-btn" slot="reference" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D;">资源删除</div>
          <div class="sure-footer" style="padding-bottom: 0;">
            <div class="my-sure" @click="deleteSourceSubmit">确定</div>
            <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="deleteSourceCancel">取消</div>
          </div>
        </el-popover>
      </div>
    </div>
    <!-- 表格内容 -->
    <div class="container-table">
      <div class="check-all-box" v-if="isArticle">
        <el-checkbox v-model="checkedAll">全选</el-checkbox>
        {{checkedAllNum}}个客户
        <el-popover popper-class="select-check" placement="bottom-start" trigger="click" v-model="sable" style="float: right;">
          <el-button slot="reference" size="mini" plain>选择显示列表</el-button>
          <el-checkbox-group ref="inputUserform1" v-model="inputUserform1" class="main-left" style="width: 1.5rem;">
            <el-checkbox label="menudate">线索入库时间</el-checkbox>
            <el-checkbox label="makedate">线索产生时间</el-checkbox>
            <el-checkbox label="firstcalltime">首次拨打时间</el-checkbox>
            <el-checkbox label="lastcalltime">最新拨打时间</el-checkbox>
            <el-checkbox label="callcount" :disabled='!dis_P4_up'>累计拨打次数</el-checkbox>
            <el-checkbox label="cusdealtime">客户成交时间</el-checkbox>
            <el-checkbox label="cusdealperiod">客户成交周期</el-checkbox>
            <el-checkbox label="batchno">批次号</el-checkbox>
            <!-- <el-checkbox label="channelname">渠道类型</el-checkbox> -->
            <el-checkbox label="clueid">线索ID</el-checkbox>
            <el-checkbox label="accountid">广告主ID</el-checkbox>
            <el-checkbox label="accountname">广告主名称</el-checkbox>
            <el-checkbox label="planid">广告计划ID</el-checkbox>
            <el-checkbox label="planname">广告计划名称</el-checkbox>
            <el-checkbox label="module_id">组件ID</el-checkbox>
            <el-checkbox label="module_name">组件名称</el-checkbox>
            <el-checkbox label="clue_sourcename">线索来源</el-checkbox>
            <el-checkbox label="appname">流量来源</el-checkbox>
            <el-checkbox label="area">自动定位城市</el-checkbox>
            <el-checkbox label="pageurl">推广页面</el-checkbox>
            <!-- <el-checkbox label="previstitime">预约回访</el-checkbox> -->
            <div class="sure-footer" style="border-top: 1px solid rgba(221, 221, 221, 1); margin-top: 0.15rem;">
              <div class="my-sure" @click="checkedSure">确定</div>
              <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="inputUserCancel">取消</div>
            </div>
          </el-checkbox-group>
        </el-popover>
      </div>
      <div class="check-all-table">
        <el-table v-if="isArticle" :data="tableData" ref="multipleTable" border v-loading="loading" style="width: 100%"
          @selection-change="handleSelectionChange" @sort-change="sortChange">
          <el-table-column type="selection" width="40">
          </el-table-column>
          <!-- <el-table-column key="1" label="置顶" v-if="isTop" align="center" width="60">
            <template slot-scope="scope">
              <img src="../../static/images/top-icon-1.png" class="top-icon-1" v-if="scope.row.toporderid"
                @click="cancelTop(scope.row)">
              <img src="../../static/images/top-icon-0.png" class="top-icon-0" v-else @click="top(scope.row)">
            </template>
          </el-table-column> -->
          <el-table-column key="2" type="index" label="序号" align="center" width="60">
          </el-table-column>
          <el-table-column key="3" label="客户姓名" width="100" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="cursor: pointer;" type="text" size="small" @click="handle(scope.row)">{{scope.row.name||"空"}}</span>
            </template>
          </el-table-column>
          <el-table-column key="4" align="center" label="电话号码" width="130" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span class="call-a" v-if="queryflagString == '02'">{{scope.row.mobile}}</span>
              <span class="call-a" :class="scope.row.callcount > 0 ? 'active' : ''" @click="phonecall_row(scope.row)"   style="    color: #8f9198;" v-else>
                {{scope.row.mobilestr}}
                <img style="margin-left: 5px;" src="../../static/images/call-icon.png" /></span>
            </template>
          </el-table-column>
          <el-table-column key="15" align="center" label="微信号" width="120" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span class="call-a" v-if="queryflagString == '02' && scope.row.wxno==null "></span>
              <span class="call-a" v-else-if="queryflagString == '02' && scope.row.wxno!='' ">****</span>
              <span class="call-a" :class="scope.row.callcount > 0 ? 'active' : ''" v-else>{{scope.row.wxnostr}}</span>
            </template>
          </el-table-column>

          <!-- v-if="inputUserform1.includes('跟进步骤')" -->
          <el-table-column key="5" prop="followupstepname" align="center" label="跟进步骤" width="90"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="6" prop="username" align="center" label="所属业务员" width="100"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="7" v-if="queryflagString === '03' " align="center" label="共享业务员" width="100"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.shareusername}}</span>
              <img src="../../static/images/delete-icon.png" alt="" style="cursor: pointer;vertical-align: -0.02rem;margin-left: 0.03rem;" @click="cancelShare(scope.row)">
            </template>
          </el-table-column>
          <el-table-column key="8" prop="sex" label="性别" align="center" width="80" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="9" prop="age" label="年龄" align="center" width="80" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="20" prop="sourcelevel" label="" align="center" width="110" :show-overflow-tooltip="true">

            <template slot="header" slot-scope="scope">
              <p class="source-level">资源等级
                <el-tooltip popper-class="atooltip" effect="light" placement="top">
                  <template slot="content">
                    <!-- <p>A理财：实时热线资源，且线索产生时间&lt;7天  </p> -->
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

          <el-table-column key="22" v-if="inputUserform1.includes('menudate')" prop="menudate" align="center"
            label="线索入库时间" width="150" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="10" v-if="inputUserform1.includes('makedate')" prop="makedate" align="center"
            label="线索产生时间" width="150" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="11" v-if="inputUserform1.includes('firstcalltime')" prop="firstcalltime" align="center"
            label="首次拨打时间" width="150" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="12" v-if="inputUserform1.includes('lastcalltime')" prop="lastcalltime" align="center"
            label="最新拨打时间" width="150" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="13" v-if="dis_P4_up && inputUserform1.includes('callcount')" prop="callcount"
            align="center" label="累计拨打次数" width="100" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="16" v-if="this.followupstep=='07' && inputUserform1.includes('cusdealtime')"
            prop="cusdealtime" align="center" label="客户成交时间" width="150" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="17" v-if="this.followupstep=='07' && inputUserform1.includes('cusdealperiod')"
            prop="cusdealperiod" align="center" label="客户成交周期" width="100" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="23" v-if="inputUserform1.includes('batchno')" prop="batchno" align="center" label="批次号"
            width="140" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="14" prop="channelname" align="center" label="渠道类型" width="90"
            :show-overflow-tooltip="true">
          </el-table-column>

          <!-- <el-table-column key="18" prop="planname" label="计划名称" width="220" :show-overflow-tooltip="true"
            align="center">
          </el-table-column> -->

          <el-table-column prop="clueid" key="33" v-if="inputUserform1.includes('clueid')" align="center" label="线索ID"
            width="160" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="accountid" key="31" v-if="inputUserform1.includes('accountid')" align="center"
            label="广告主ID" width="140" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="accountname" key="32" v-if="inputUserform1.includes('accountname')" align="center"
            label="广告主名称" width="160" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="planid" key="34" v-if="inputUserform1.includes('planid')" align="center" label="广告计划ID"
            width="140" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="planname" key="24" v-if="inputUserform1.includes('planname')" align="center"
            label="广告计划名称" width="220" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="module_id" key="25" v-if="inputUserform1.includes('module_id')" align="center"
            label="组件ID" width="160" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="module_name" key="26" v-if="inputUserform1.includes('module_name')" align="center"
            label="组件名称" width="180" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="clue_sourcename" key="27" v-if="inputUserform1.includes('clue_sourcename')"
            align="center" label="线索来源" width="90" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="appname" key="28" v-if="inputUserform1.includes('appname')" align="center" label="流量来源"
            width="150" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="area" key="29" v-if="inputUserform1.includes('area')" align="center" label="自动定位城市"
            width="100" :show-overflow-tooltip="true">
          </el-table-column>
          <!-- <el-table-column prop="pageurl" key="30" align="center" label="推广页面" width="100"
            :show-overflow-tooltip="true">
          </el-table-column> -->

          <el-table-column key="19" v-if="inputUserform1.includes('pageurl')" prop="pageurl" label="推广页面" width="150"
            :show-overflow-tooltip="true" align="center">
            <template slot-scope="scope">
              <a style="cursor: pointer;" href="#" @click="disPageUrl(scope.row)">{{scope.row.pageurl}}</a>
            </template>
          </el-table-column>
          <el-table-column key="21" prop="previstitime" label="预约回访" min-width='200' width="auto"
            :show-overflow-tooltip="true" fixed="right" align="center" sortable="custom">
            <template slot-scope="scope" class="mobile_box_edit">
              {{scope.row.previstitime? formatDate(new Date(scope.row.previstitime), 'yyyy-MM-dd HH:mm:ss'):''}}

              <el-popover popper-class="modify-icon" v-if="scope.row.previstitime" placement="left" width="220" height="50" :class="scope.row.activityserialno">
                <span slot="reference" class="mobile-icon el-icon-edit-outline" style="color:#DC240F;margin-left:5px"></span>

                <el-date-picker v-model="editPrevistitime" type="datetime" placeholder="选择日期时间" size="mini"
                  :picker-options="previstitimePickerOptions">
                </el-date-picker>
                <br>
                <div class="sure-footer" style="padding-bottom: 0;">
                  <div class="my-sure" @click="editPrevistTime(scope)">确定</div>
                </div>
              </el-popover>
              <!-- <el-popover v-else placement="top" width="220" height="50" trigger="click">
                <el-date-picker v-model="editPrevistitime" type="datetime" placeholder="选择日期时间" size="mini">
                </el-date-picker>
                </br>
                <el-button size="mini" type="primary" @click="editPrevistTime(scope)" style="margin-top:25px;float:right">确定</el-button>
                <span slot="reference" class="mobile-icon el-icon-edit-outline" style="color:#979797;margin-left:5px "></span>
              </el-popover> -->

              <span v-if="scope.row.previstitime" class="mobile-icon el-icon-circle-check" @click="toggerIsVist(scope)"
                style="color:#DC240F"></span>
            </template>
          </el-table-column>
        </el-table>


        <el-table v-if="!isArticle" :data="ArticleData" class="Article" border v-loading="loading" style="width: 100%">
          <el-table-column type="selection" width="40">
          </el-table-column>
          <el-table-column prop="makedate" label="线索产生时间" width="180" align="center">
          </el-table-column>
          <el-table-column prop="cluetypename" label="渠道活码" :show-overflow-tooltip="true" width="120" align="center">
          </el-table-column>
          <el-table-column prop="isaddfriend" label="是否添加好友" :show-overflow-tooltip="true" width="120" align="center">
          </el-table-column>

          <el-table-column prop="customername" label="客户微信昵称" :show-overflow-tooltip="true" width="180" align="center">
          </el-table-column>
          <el-table-column prop="customerremarkname" label="客户微信备注" :show-overflow-tooltip="true" width="180" align="center">
          </el-table-column>
          <el-table-column prop="customersex" label="客户性别" width="90" align="center">
          </el-table-column>
          <el-table-column prop="channelname" label="渠道类型" width="120" align="center">
          </el-table-column>
          <el-table-column prop="appname" label="流量来源" width="120" align="center">
          </el-table-column>
          <el-table-column prop="sourcetypename" label="来源属性" width="120" align="center">
          </el-table-column>
          <!-- <el-table-column prop="position" label="插件位置" width="120" align="center">
          </el-table-column> -->
          <el-table-column prop="ip" label="IP" width="120" :show-overflow-tooltip="true" align="center">
          </el-table-column>
          <el-table-column prop="ipaddress" label="自动定位地址" :show-overflow-tooltip="true" width="120" align="center">
          </el-table-column>
          <!-- <el-table-column prop="articletypename" label="文章类型" width="120" align="center">
          </el-table-column>
          <el-table-column prop="sourcedetailname" label="来源账户" width="120" align="center">
          </el-table-column>
          <el-table-column prop="pageurl" label="来源URL" :show-overflow-tooltip="true" align="center" >
            <template slot-scope="scope">
              <a style="cursor: pointer;" href="#" @click="disarticleUrl(scope.row)">{{scope.row.articleurl}}</a>
            </template>
          </el-table-column> -->

        </el-table>
      </div>
      <div>
        <el-pagination background layout="total,prev, pager, next" :total="pageTotal" :page-size="pageSize"
          :current-page="pageNum" @current-change="pageClick">
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
          <div class="select-title" style="width: 1.6rem">话务时长(分钟)</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.callcentertime" align="right" size="mini" :disabled="true" clearable></el-input>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">非话务时长(分钟)</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.nocallcentertime" align="right" size="mini" :disabled="true" clearable></el-input>
          </div>
          <em class="sign">可修改</em>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">总时长(分钟)</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.sumtime" align="right" size="mini" :disabled="true" clearable></el-input>
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
          <div class="select-title" style="width: 1.6rem">配置方案</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="from.firstplancount" align="right" size="mini" clearable></el-input>
          </div>
          <em class="sign">可修改</em>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">认清市场</div>
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
          <div class="select-title" style="width: 1.6rem">本月目标(标保)</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="monthTarget" align="right" size="mini" clearable></el-input>
          </div>
          <em class="sign">可修改</em>
        </div>
      </div>
      <div class="entry-data-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.6rem">本周目标(标保)</div>
          <div class="select-content" style="width: calc(100% - 1.6rem);">
            <el-input class="el-input-inners" v-model="weekTarget" align="right" size="mini" clearable></el-input>
          </div>
          <em class="sign">可修改</em>
        </div>
      </div>
      <div class="sure-footer">
        <div class="my-sure" @click="sureData">提交</div>
        <div class="my-sure" style="background: #fff;border: 1px solid rgba(221, 221, 221, 1);color: #686868;" @click="dialogVisible = false">取消</div>
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
            <!-- <el-input resize="none" type="textarea" :autosize="{ minRows: 3, maxRows: 30}" :rows="3" placeholder="请输入内容"
              :disabled="true" v-model="bdjsItem.suggestion">
            </el-input> -->
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
              <li class="item" v-for="(item,index) in fileList" :key="index">
                <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{item.filename}}</div>
                <a :href="crm_url + 'crm.meihualife.com/filedownload.do?fileid=' + item.fileid" class="download-btn"
                  :download="item.filename">下载</a>
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
            <el-input placeholder="请输入" size="mini" v-model="jbhbItem.disdescription" :disabled="true" resize="none"
              type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="7">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>核保建议</label>
          <div class="right-content">
            <div class="tab-head">
              <div class="tab" :class="currentSuggestion === 'zjsuggestion' ? 'actived' : ''"
                @click="changeSuggestion('zjsuggestion')">重疾险</div>
              <div class="tab" :class="currentSuggestion === 'ylsuggestion' ? 'actived' : ''"
                @click="changeSuggestion('ylsuggestion')">医疗险</div>
            </div>
            <el-input resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="10"
              placeholder="请输入内容" :disabled="true" v-if="currentSuggestion === 'zjsuggestion'"
              v-model="jbhbItem.zjsuggestion">
            </el-input>
            <el-input resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="10"
              placeholder="请输入内容" v-else :disabled="true" v-model="jbhbItem.ylsuggestion">
            </el-input>
          </div>
        </div>
        <div class="item-section">
          <label>可投产品</label>
          <div class="right-content">
            <div class="add-item-wrap">
              <div class="list" v-for="(item,index) in jbhbItem.productJsonStr" :key="index">
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
                    <el-input placeholder="请输入" size="mini" v-model="item.acceptremark" :disabled="true" resize="none"
                      type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="7">
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
              <li class="item" v-for="(item,index) in fileList" :key="index">
                <!-- <img src="../../static/images/file-icon.png" alt=""> -->
                <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{item.filename}}</div>
                <a :href="crm_url+'crm.meihualife.com/filedownload.do?fileid=' + item.fileid" class="download-btn"
                  :download="item.filename">下载</a>
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
      <!-- <el-drawer title="我是标题" :size="drawerWidth" :visible.sync="drawer" :with-header="false"> -->
      <div class="drawerLeft" :class="isDealed ? 'isDealed' : ''">
        <div class="left_box">
          <div class="header">
            <div class="header_t clearfix">
              <div class="header_t_l">
                <span>{{detailsInfo.name}}</span>
                <span @click="phonecall_page">
                  <img src="../../static/images/call-icon.png" style="margin-right: 6px;"/>拨打电话
                </span>
              </div>
              <div class="header_t_r">
                <span>所属业务员：</span>
                <span>{{detailsInfo.username}}</span>
                <span v-if="detailsInfo.otherusername">（{{detailsInfo.otherusername}}）</span>
              </div>
            </div>
            <div class="header_b clearfix">
              <div class="title">标签</div>
              <div class="checkBox">
                <el-checkbox-group size="mini" v-model="activitytag" v-show="false">
                  <el-checkbox-button v-for="customer in activitytags" :label="customer.dd_key" :key="customer.dd_key">
                    {{customer.dd_value}}</el-checkbox-button>
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
                    <!-- <el-button slot="reference">hover 激活</el-button> -->
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
                  <el-select v-model="sex" size="mini" style="width: 100%;" placeholder="请选择">
                    <el-option v-for="item in sexs" :key="item.key" :label="item.value" :value="item.key"></el-option>
                  </el-select>
                </span>
              </div>
              <div class="editContent_c editContent_box editContent_date" style=" font-size: 0.13rem;">
                <span class="dd">出生日期</span>
                <span class="dd">
                  <el-date-picker class="difPicker" v-model="birthday" type="date" size="mini" placeholder="请输入出生年月"
                    clearable style="width: 100%;" value-format="yyyy-MM-dd">
                  </el-date-picker>
                </span>
              </div>
              <div class="editContent_b editContent_box">
                <span class="dd">微信号</span>
                <span class="dd">
                  <el-input placeholder="请输入" size="mini" v-model="wxnostr">
                  </el-input>
                </span>
                <!-- <div class="editContent_box_r">
                  <span>邮箱</span>
                  <span>
                    <el-input placeholder="请输入" size="mini" v-model="email">
                    </el-input>
                  </span>
                </div> -->
              </div>
              <!-- <div class="editContent_b editContent_box">
                <div class="editContent_box_l" style="width: 100%;">
                  <span class="dd">详细地址</span>
                  <span class="dd">
                    <el-input placeholder="请输入" size="mini" v-model="address">
                    </el-input>
                  </span>
                </div>
              </div> -->
              <!-- <div class="editContent_b editContent_box">

                <div class="editContent_box_l">
                  <span class="dd">所在区</span>
                  <span class="dd">
                    <el-input placeholder="请输入" size="mini" v-model="mobilecountry">
                    </el-input>
                  </span>
                </div>
                <div class="editContent_box_r">
                  <span>详细地址</span>
                  <span>
                    <el-input placeholder="请输入" size="mini" v-model="address">
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
                <div class="select-content" style="height: 0.3rem; width: calc(100% - 0.8rem); margin-right: 0; border: none">
                  <el-date-picker class="el-date-picker-sigle" v-model="returnVisit" type="datetime" size="mini" placeholder=""
                    :picker-options="previstitimePickerOptions" clearable>
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="condition-bottom" @click="saveRecord">保存</div>
          </div>

          <div class="adInformation"  style="height: 2.5rem">
            <div class="title clearfix">
              <span></span>
              <span>广告投放信息</span>
            </div>
            <div class="adInformation_b">
              <!-- <div class="cb">
                <span :title="detailsInfo.clueid">线索ID：{{detailsInfo.clueid}}</span>
              </div> -->
              
              <div class="cb insure-redio">
                <div style="width: 1rem; color: #282828;font-size: 0.14rem;padding-left: 0.08rem;">意向标签：</div>
                <ul class="clearfix">
                  <li :class="[{'insure-select': adLabelselect == '01'}]" @click="activitytagClick(adLabelselect = '01')">高意向保障</li>
                  <li :class="[{'insure-select': adLabelselect == '02'}]" @click="activitytagClick(adLabelselect = '02')">高意向理财</li>
                  <li :class="[{'insure-select': adLabelselect == '03'}]" @click="activitytagClick(adLabelselect = '03')">保单置换规划</li>
                  <li :class="[{'insure-select': adLabelselect == '04'}]" @click="activitytagClick(adLabelselect = '04')">仅意外医疗</li>
                  <li :class="[{'insure-select': adLabelselect == '05'}]" @click="activitytagClick(adLabelselect = '05')">其它需求</li>
                  <li :class="[{'insure-select': adLabelselect == '06'}]" @click="activitytagClick(adLabelselect = '06')">未取得有效沟通</li>
                </ul>
              </div>
              <div class="cb">
                <span :title="detailsInfo.makedate">线索产生时间：{{detailsInfo.makedate}}</span>
                <span :title="detailsInfo.channelname">渠道类型：{{detailsInfo.channelname}}</span>
              </div>

              <!-- <div class="cc">
                <span :title="detailsInfo.accountid">广告主ID：{{detailsInfo.accountid}}</span>
                <span :title="detailsInfo.accountname">广告主名称：{{detailsInfo.accountname}}</span>
              </div> -->

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
                <span :title="detailsInfo.clue_sourcename">线索来源：{{detailsInfo.clue_sourcename}}</span>
                <span :title="detailsInfo.appname">流量来源：{{detailsInfo.appname}}</span>
              </div>

              <div class="cb">
                <span :title="detailsInfo.area">自动定位城市：{{detailsInfo.area}}</span>
              </div>

              <div class="cb" style="width: 90%;">
                <span :title="detailsInfo.pageurl"> 推广页面：
                  <a style="cursor: pointer; color: #578EE7;" href="#" @click="disPageUrl(detailsInfo)">{{detailsInfo.pageurl}}</a>
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
                <span :title="detailsInfo.dwelltime">用户停留时长：{{detailsInfo.dwelltime}}</span>
                <span :title="detailsInfo.interactcount">用户互动次数：{{detailsInfo.interactcount}}</span>
              </div>
              <div class="cb">
                <span :title="detailsInfo.readingpercentage">用户页面阅读百分比：{{detailsInfo.readingpercentage}}</span>
              </div>
            </div>
          </div>
          <div class="tableBox">
            <div class="title">
              <span></span>
              <span>客户通话记录</span>
              <span>累计通话时长{{callSum}}分钟</span>
            </div>
            <div class="tableContent">
              <el-table :data="callDataList" border style="width: 100%">
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
                    <img class="play-icon" src="../../static/images/pause-icon.png" title="暂停" @click="audioPause(scope.$index)" v-if="!audioPaused && scope.$index === currentCallIndex">
                    <img class="play-icon" src="../../static/images/play-icon.png" title="播放" @click="audioPlay(scope.$index)" v-else>
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
      <div class="drawerRight" :class="isDealed ? 'isDealed' : ''">
        <div class="title">
          <span></span>
          <span>跟进记录</span>
        </div>
        <div class="cjg-search-section " style="display: flex; justify-content: center;align-items: center;">
          <el-select v-model="cjgTitle" :loading="loading" filterable remote :remote-method="remoteMethod"
            placeholder="搜索藏经阁内容" @change="cjgChange" @focus="cjgfocus" class="cjgserach" style="width: 100%;">
            <el-option v-for="item in cjgList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="inputBox">
          <el-input v-model="followrecord" id="textarea" type="textarea" placeholder="添加跟进记录…"></el-input>
        </div>
        <div class="numBox">
          <div class="num">共{{releaseNum}}条</div>
          <div class="button">
            <span @click="cancel">取消</span>
            <span @click="release" v-show="dis_save">发布</span>
          </div>
        </div>
        <div class="drawercontentBox">
          <ul>
            <li v-for="(item,index) in records" :key="index">
              <div class="li_t">
                <div v-html="item.remark">
                </div>
              </div>
              <div class="li_b">
                <div class="li_b_l" :title="item.name">{{item.oprname}}</div>
                <div class="li_b_r">{{item.makedate}} 创建
                  <span v-show='delRemark' class="mobile-icon el-icon-delete" @click="deleteRemark(item.remarkserialno)"
                    style="color:#979797"></span>
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
        <ul class="order-list"   v-loading="detai_loading">
          <li class="item" v-for="item in policyList" :key="item.status">
            <div class="head">
              <div class="txt" @click="showEdit(item)">{{item.riskname}}</div>
              <div class="status"
                :class="[item.status === 'processing' ? 'processing' : '',item.status === 'invalid' ? 'invalid' : '',item.status === 'cancel' ? 'cancel' : '']">
                <template v-if="item.status === 'effective'">保障中</template>
                <template v-if="item.status === 'processing'">待处理</template>
                <template v-if="item.status === 'invalid'">已失效</template>
                <template v-if="item.status === 'cancel'">已终止</template>
              </div>
            </div>
            <ul class="info-list">
              <div class="info">
                <span class="l">投保日期:</span>
                <span>{{item.accepttime}}</span>
              </div>
              <div class="info">
                <span class="l">生效日期:</span>
                <span>{{item.cvalidate}}</span>
              </div>
              <div class="info">
                <span class="l">保单号:</span>
                <span>{{item.contno}}</span>
              </div>
              <div class="info">
                <span class="l">投保人:</span>
                <span>{{item.appname}}</span>
              </div>
              <div class="info">
                <span class="l">被保人:</span>
                <span>{{item.insname}}</span>
              </div>
              <div class="info">
                <span class="l">保险金额:</span>
                <span>{{item.amnt}}</span>
              </div>
              <div class="info">
                <span class="l">保障期限:</span>
                <span>{{item.insuyearvalue}}</span>
              </div>
              <div class="info">
                <span class="l">保费:</span>
                <span>{{item.prem}}</span>
              </div>
              <div class="info">
                <span class="l">缴费方式:</span>
                <span>{{item.payintvvalue}}</span>
              </div>
              <div class="info">
                <span class="l">缴费年期:</span>
                <span>{{item.payendyearvalue}}</span>
              </div>

            </ul>
          </li>
        </ul>
      </div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="55%" :modal-append-to-body="false"
        :append-to-body="false" :modal="false">
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
      <el-dialog title="共享客户" :visible.sync="shareDialogVisible" width="55%" :modal-append-to-body="false"
        :append-to-body="false" :modal="false">
        <el-autocomplete v-model="shareUserName" :trigger-on-focus="false" :fetch-suggestions="querySearchId"
          size="mini" placeholder="请选择或输入共享客户姓名"></el-autocomplete>
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
import customerManagementNew from './customerManagementNew.js';
import viewDetails from "../../components/viewDetails.vue";
export default {
  mixins: [customerManagementNew],
  components: {
    viewDetails
  },
  methods: {
    updateVisibleId(e) {
      this.showEditPopupDialogVisible = e;
    }
  }
}
</script>
<style src="../../static/css/viewer.min.css"></style>
<style src="../../static/css/drawer.css"></style>
<style src="../../static/css/customerManagementNew.css"></style>
<style>
.entry-data .el-dialog__body {
  padding: 0  0 0 0.3rem;
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

.top-row .el-table__cell{
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
.el-popover__reference-wrapper{
  display: flex;
  height: 100%;
    align-items: center;
}
</style>