<template>
  <div v-cloak style=" width: 17.1rem;">
    <div style="padding: 0.05rem 0.3rem;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="资源调配管理" name="00000005">
          <div class="search-box clearfix">
        
            <div class="common-select publiccustome-select" style="width: 30%;">
              <div class="select-title" style="width: 1.65rem">线索产生时间</div>
              <div class="select-content" style="height: 0.3rem; width: calc(100% - 1.65rem); border: none">
                <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="datetimerange" align="right" size="mini" unlink-panels range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
                </el-date-picker>
              </div>
            </div>

            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">客户姓名</div>
              <div class="select-content" style="width: calc(100% - 1.28rem);">
                <el-input class="el-input-inners" v-model="Salesman" size="mini" placeholder=""></el-input>
              </div>
            </div>

            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">
                <el-select class="el-input-title-inners" v-model="selectphonewxno" placeholder="请选择" size="mini">
                  <el-option label="电话号码" value="电话号码"></el-option>
                  <el-option label="微信号" value="微信号"></el-option>
                </el-select>
              </div>
              <div class="select-content" style="width: calc(100% - 1.28rem);">
                <el-input class="el-input-inners" v-model="phoneWxnoValue" align="right" size="mini" clearable></el-input>
              </div>
            </div>

            <div class="common-select" style="margin-right: 6%;">
              <div class="select-title" style="width: 1.38rem">渠道类型</div>
              <div class="select-content" style="width: calc(100% - 1.38rem); height: 0.3rem; border: none">
                <el-select class="el-select-inners" v-model="channelValue" size="mini" @change="channelSelect" placeholder="请选择渠道类型" clearable>
                  <el-option v-for="(item, index) in channelList" :key="index" :label="item.dd_value" :value="item.dd_key">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.38rem">流量来源</div>
              <div class="select-content" style="width: calc(100% - 1.38rem); height: 0.3rem; border: none">
                <el-select class="el-select-inners" v-model="sourceValue" size="mini" placeholder="请选择流量来源" clearable>
                  <el-option v-for="(item, index) in sourceList" :key="index" :label="item.dd_value" :value="item.dd_value">
                  </el-option>
                </el-select>
              </div>
            </div>

     

            <div class="common-select" style="float: right;    width: 11.5%;">
              <div class="search-btn" @click="search(1)">搜索</div>
              <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="封存客户管理" name="00000007">
          <div class="search-box clearfix">
       
            <div class="common-select" style="width: 30%;">
              <div class="select-title" style="width: 1.65rem">线索产生时间</div>
              <div class="select-content" style="height: 0.3rem; width: calc(100% - 1.65rem); border: none">
                <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="datetimerange" align="right" size="mini" unlink-panels range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
                </el-date-picker>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">客户姓名</div>
              <div class="select-content" style="width: calc(100% - 1.28rem);">
                <el-input class="el-input-inners" v-model="Salesman" size="mini" placeholder=""></el-input>
              </div>
            </div>

            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">
                <el-select class="el-input-title-inners" v-model="selectphonewxno" placeholder="请选择" size="mini">
                  <el-option label="电话号码" value="电话号码"></el-option>
                  <el-option label="微信号" value="微信号"></el-option>
                </el-select>
              </div>
              <div class="select-content" style="width: calc(100% - 1.28rem);">
                <el-input class="el-input-inners" v-model="phoneWxnoValue" align="right" size="mini" clearable></el-input>
              </div>
            </div>

            <div class="common-select" style="margin-right: 6%;">
              <div class="select-title" style="width: 1.38rem">渠道类型</div>
              <div class="select-content" style="width: calc(100% - 1.38rem); height: 0.3rem; border: none">
                <el-select class="el-select-inners" v-model="channelValue" size="mini" @change="channelSelect" placeholder="请选择渠道类型" clearable>
                  <el-option v-for="(item, index) in channelList" :key="index" :label="item.dd_value" :value="item.dd_key">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.38rem">流量来源</div>
              <div class="select-content" style="width: calc(100% - 1.38rem); height: 0.3rem; border: none">
                <el-select class="el-select-inners" v-model="sourceValue" size="mini" placeholder="请选择流量来源" clearable>
                  <el-option v-for="(item, index) in sourceList" :key="index" :label="item.dd_value" :value="item.dd_value">
                  </el-option>
                </el-select>
              </div>
            </div>

        

            <div class="common-select" style="float: right;">
              <div class="search-btn" @click="search(1)">搜索</div>
              <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="非标体客户管理" name="00000001">
          <div class="search-box clearfix">
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">审核状态</div>
              <div class="select-content" style="width: calc(100% - 1.28rem); border: none">
                <el-select class="el-select-inners" v-model="examstate" placeholder="请选择审核状态" size="mini" clearable>
                  <el-option v-for="item in examstateList" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key"></el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">
                <el-select class="el-input-title-inners" v-model="selectphonewxno" placeholder="请选择" size="mini">
                  <el-option label="电话号码" value="电话号码"></el-option>
                  <el-option label="微信号" value="微信号"></el-option>
                </el-select>
              </div>
              <div class="select-content" style="width: calc(100% - 1.28rem);">
                <el-input class="el-input-inners" v-model="phoneWxnoValue" align="right" size="mini" clearable></el-input>
              </div>
            </div>

            <div class="common-select">
              <div class="search-btn" @click="search(1)">搜索</div>
              <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="高龄客户管理" name="00000002">
          <div class="search-box clearfix">
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">审核状态</div>
              <div class="select-content" style="width: calc(100% - 1.28rem); border: none">
                <el-select class="el-select-inners" v-model="examstate" placeholder="请选择审核状态" size="mini" clearable>
                  <el-option v-for="item in examstateList" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key"></el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">
                <el-select class="el-input-title-inners" v-model="selectphonewxno" placeholder="请选择" size="mini">
                  <el-option label="电话号码" value="电话号码"></el-option>
                  <el-option label="微信号" value="微信号"></el-option>
                </el-select>
              </div>
              <div class="select-content" style="width: calc(100% - 1.28rem);">
                <el-input class="el-input-inners" v-model="phoneWxnoValue" align="right" size="mini" clearable></el-input>
              </div>
            </div>

            <div class="common-select">
              <div class="search-btn" @click="search(1)">搜索</div>
              <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="同行资源管理" name="00000003">
          <div class="search-box clearfix">
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">审核状态</div>
              <div class="select-content" style="width: calc(100% - 1.28rem); border: none">
                <el-select class="el-select-inners" v-model="examstate" placeholder="请选择审核状态" size="mini" clearable>
                  <el-option v-for="item in examstateList" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key"></el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">
                <el-select class="el-input-title-inners" v-model="selectphonewxno" placeholder="请选择" size="mini">
                  <el-option label="电话号码" value="电话号码"></el-option>
                  <el-option label="微信号" value="微信号"></el-option>
                </el-select>
              </div>
              <div class="select-content" style="width: calc(100% - 1.28rem);">
                <el-input class="el-input-inners" v-model="phoneWxnoValue" align="right" size="mini" clearable></el-input>
              </div>
            </div>

            <div class="common-select">
              <div class="search-btn" @click="search(1)">搜索</div>
              <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="空号停机管理" name="00000004">
          <div class="search-box clearfix">
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">审核状态</div>
              <div class="select-content" style="width: calc(100% - 1.28rem); border: none">
                <el-select class="el-select-inners" v-model="examstate" placeholder="请选择审核状态" size="mini" clearable>
                  <el-option v-for="item in examstateList" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key"></el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.28rem">
                <el-select class="el-input-title-inners" v-model="selectphonewxno" placeholder="请选择" size="mini">
                  <el-option label="电话号码" value="电话号码"></el-option>
                  <el-option label="微信号" value="微信号"></el-option>
                </el-select>
              </div>
              <div class="select-content" style="width: calc(100% - 1.28rem);">
                <el-input class="el-input-inners" v-model="phoneWxnoValue" align="right" size="mini" clearable></el-input>
              </div>
            </div>

            <div class="common-select">
              <div class="search-btn" @click="search(1)">搜索</div>
              <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="table-box">
      <div class="check-all-box-publicCustome clearfix" style="padding-bottom: 0.1rem;">
        <el-checkbox v-model="checkedAll" style="float: left">全选 &nbsp;{{checkedAllNum}}个客户</el-checkbox>
        <div style="float: right; display: flex; align-items: center; justify-content: flex-end;">

          <div class="search-btn" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D;" @click="auditUnpass" v-show="examstateShow">审核不通过</div>
          <div class="search-btn" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D;" @click="auditPass" v-show="examstateShow">审核通过</div>

          <el-popover popper-class="entry-customer-popper" placement="bottom-start" width="3.31rem" trigger="click" v-model="resourceDeployVisable" @show="resourceDeployShow" v-show="activeName!='00000006'">
            <div class="search-btn" slot="reference" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D;">资源调配</div>
            <div class="common-select">
              <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">新所属业务员</div>
              <div class="select-content" style="width: 2rem;">
                <el-autocomplete class="el-input-inners" v-model="editInfo.shareusername" :fetch-suggestions="querySearchId" placeholder="请输入新所属业务员" :trigger-on-focus="false" @select="handleSelectId"></el-autocomplete>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">新跟进步骤</div>
              <div class="select-content" style="width:2rem;border: none;">
                <el-select class="el-select-inners" v-model="resourceDeployform.followupstep" placeholder="请选择新跟进步骤">
                  <el-option v-for="item in steps" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key"></el-option>
                </el-select>
              </div>
            </div>
            <div class="sure-footer" style="padding-bottom: 0;">
              <div class="my-sure" @click="resourceDeploySubmit">确定</div>
              <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="resourceDeployCancel">取消</div>
            </div>
          </el-popover>
          <el-popover popper-class="entry-customer-popper" v-show="activeName!='00000006'" placement="bottom-start" width="3.31rem" trigger="click" v-model="deleteSourceVisable">
            <div class="search-btn" slot="reference" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D;">资源删除</div>
            <div style="text-align:center;">确定删除所选资源？</div>
            <div class="sure-footer" style="padding-bottom: 0;">
              <div class="my-sure" @click="deleteSourceSubmit">确定</div>
              <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="deleteSourceCancel">取消</div>
            </div>
          </el-popover>
          <el-popover popper-class="select-check" placement="bottom-start" trigger="click" v-model="sable">
            <div class="search-btn" slot="reference" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D;">选择显示列表</div>
            <el-checkbox-group ref="inputUserform1" v-model="inputUserform1" class="main-left" style="width: 1.5rem;">
              <el-checkbox label="menudate" :disabled="activeName == '00000005' || activeName == '00000007'">线索入库时间
              </el-checkbox>
              <el-checkbox label="makedate">线索产生时间</el-checkbox>
              <el-checkbox label="firstcalltime" :disabled="activeName == '00000005' || activeName == '00000007'">首次拨打时间
              </el-checkbox>
              <el-checkbox label="lastcalltime">最新拨打时间</el-checkbox>
              <el-checkbox label="callcount" :disabled='!dis_P4_up'>累计拨打次数</el-checkbox>
              <el-checkbox label="cusdealtime" :disabled="activeName != '00000006'">客户成交时间</el-checkbox>
              <el-checkbox label="cusdealperiod" :disabled="activeName != '00000006'">客户成交周期</el-checkbox>
              <el-checkbox label="batchno">批次号</el-checkbox>
              <el-checkbox label="clueid">线索ID</el-checkbox>
              <el-checkbox label="accountid">广告主ID</el-checkbox>
              <el-checkbox label="accountname">广告主名称</el-checkbox>
              <el-checkbox label="planid">广告计划ID</el-checkbox>
              <el-checkbox label="module_id">组件ID</el-checkbox>
              <el-checkbox label="module_name">组件名称</el-checkbox>
              <el-checkbox label="clue_sourcename">线索来源</el-checkbox>
              <el-checkbox label="appname">流量来源</el-checkbox>
              <el-checkbox label="area">自动定位城市</el-checkbox>
              <el-checkbox label="planname">计划名称</el-checkbox>
              <div class="sure-footer" style="border-top: 1px solid rgba(221, 221, 221, 1); margin-top: 0.15rem;">
                <div class="my-sure" @click="checkedSure">确定</div>
                <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="inputUserCancel">取消</div>
              </div>
            </el-checkbox-group>
          </el-popover>
        </div>
      </div>
      <div class="check-all-table publicCustome-table">
        <el-table :data="tableData" ref="multipleTable" border v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange" @sort-change="sortChange" :empty-text="emptyText" header-cell-class-name="splice-header">
          <el-table-column type="selection" width="40">
          </el-table-column>
          <el-table-column key="1" type="index" label="序号" align="center" width="60">
          </el-table-column>
          <template v-if="activeName != '00000005'&&activeName != '00000006'&&activeName != '00000007'">
            <el-table-column key="2" type="index" label="状态" align="center" width="100">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.examstate == '02'" type="success" size="mini">审核通过</el-tag>
                <el-tag style="color:#979797;background: #F6F7FA;border: 1px solid #ECEEF6;" v-if="scope.row.examstate == '01'" size="mini">待审核</el-tag>
              </template>
            </el-table-column>
          </template>
          <el-table-column key="3" label="客户姓名" align="center" width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <a style="cursor: pointer;" type="text" size="small" @click="handle(scope.row)">{{scope.row.name||"空"}}</a>
            </template>
          </el-table-column>
          <el-table-column key="4" prop="mobile" label="电话号码" align="center" width="140" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="5" label="微信号" align="center" width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.wxno==null||scope.row.wxno==''"></span>
              <span v-else>****</span>
            </template>
          </el-table-column>
          <template v-if="activeName != '00000005'&&activeName != '00000007'">
            <el-table-column key="6" prop="followupstepname" align="center" label="跟进步骤" width="90" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column key="7" prop="username" align="center" label="所属业务员" width="100" :show-overflow-tooltip="true">
            </el-table-column>
          </template>
          <el-table-column key="8" v-if="queryflagString === '03'" align="center" label="共享业务员" width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.shareusername}}</span>
              <img src="../../../static/images/delete-icon.png" alt="" style="cursor: pointer;vertical-align: -0.02rem;margin-left: 0.03rem;" @click="cancelShare(scope.row)">
            </template>
          </el-table-column>
          <el-table-column key="9" prop="sex" label="性别" align="center" width="80" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="10" prop="age" label="年龄" align="center" width="80" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="11" prop="sourcelevel" label="" align="center" width="110" :show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <p class="source-level">资源等级
                <el-tooltip effect="light" placement="top">
                  <template slot="content">
                    <!-- <p>A理财：实时付费咨询客户 </p> -->
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
          <el-table-column key="12" v-if="activeName != '00000005'&&activeName != '00000007' && inputUserform1.includes('menudate')" prop="menudate" align="center" label="线索入库时间" width="155" :show-overflow-tooltip="true" sortable="custom">
          </el-table-column>

          <el-table-column key="13" v-if="inputUserform1.includes('makedate')" prop="makedate" align="center" label="线索产生时间" width="155" :show-overflow-tooltip="true" sortable="custom">
          </el-table-column>

          <template v-if="activeName != '00000005' && activeName != '00000007' && inputUserform1.includes('firstcalltime')">
            <el-table-column key="14" prop="firstcalltime" align="center" label="首次拨打时间" :show-overflow-tooltip="true" width="155" sortable="custom">
            </el-table-column>
          </template>
          <el-table-column key="15" v-if="inputUserform1.includes('lastcalltime')" prop="lastcalltime" align="center" label="最新拨打时间" :show-overflow-tooltip="true" width="155" sortable="custom">
          </el-table-column>

          <el-table-column key="16" v-if="activeName == '00000005'||activeName == '00000007'" prop="distributedate" align="center" label="最新分配时间" :show-overflow-tooltip="true" sortable="custom" width="155">
          </el-table-column>

          <el-table-column key="17" v-if="inputUserform1.includes('batchno')" prop="callcount" align="center" label="累计拨打次数" width="100" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="18" v-if="activeName == '00000006' && inputUserform1.includes('cusdealtime') " prop="cusdealtime" align="center" label="客户成交时间" width="155" :show-overflow-tooltip="true" sortable="custom">
          </el-table-column>
          <el-table-column key="19" v-if="activeName == '00000006' && inputUserform1.includes('cusdealperiod')" prop="cusdealperiod" align="center" label="客户成交周期" width="100" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="20" v-if="inputUserform1.includes('batchno')" prop="batchno" align="center" label="批次号" width="140" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="21" prop="channelname" align="center" label="渠道类型" width="80" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column prop="clueid" key="22" v-if="inputUserform1.includes('clueid')" align="center" label="线索ID" width="160" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="accountid" key="23" v-if="inputUserform1.includes('accountid')" align="center" label="广告主ID" width="140" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="accountname" key="24" v-if="inputUserform1.includes('accountname')" align="center" label="广告主名称" width="160" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="planid" key="25" v-if="inputUserform1.includes('planid')" align="center" label="广告计划ID" width="140" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="planname" key="26" v-if="inputUserform1.includes('planname')" align="center" label="广告计划名称" width="220" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="module_id" key="27" v-if="inputUserform1.includes('module_id')" align="center" label="组件ID" width="160" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="module_name" key="28" v-if="inputUserform1.includes('module_name')" align="center" label="组件名称" width="180" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="clue_sourcename" key="29" v-if="inputUserform1.includes('clue_sourcename')" align="center" label="线索来源" width="90" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="channelname" key="35"  align="center" label="渠道来源" width="90" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="appname" key="30" v-if="inputUserform1.includes('appname')" align="center" label="流量来源" width="100" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="area" key="31" v-if="inputUserform1.includes('area')" align="center" label="自动定位城市" width="100" :show-overflow-tooltip="true">
          </el-table-column>
 
          <el-table-column key="32" v-if="inputUserform1.includes('pagename')" prop="pagename" label="推广页面" width="150" :show-overflow-tooltip="true" align="center">
            <template slot-scope="scope">
              <a style="cursor: pointer;" href="#" @click="disPageUrl(scope.row)">{{scope.row.pagename}}</a>
            </template>
          </el-table-column>


          <el-table-column key="33" prop="pagename" label="推广页面" min-width="150" width="auto" :show-overflow-tooltip="true" align="center">
            <template slot-scope="scope">
              <a style="cursor: pointer;" href="#" @click="disPageUrl(scope.row)">{{scope.row.pagename}}</a>
            </template>
          </el-table-column>
          <el-table-column key="34" v-if="activeName != '00000005' &&activeName != '00000006'&&activeName != '00000007'" prop="remark" align="center" label="备注" width="200" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination background layout="total,prev, pager, next" :total="pageTotal" :page-size="pageSize" :current-page="pageNum" @current-change="pageClick">
        </el-pagination>
      </div>
    </div>
    <el-drawer title="我是标题" :size="isDealed ? '75%' : '56%'" custom-class="customer-drawer" :visible.sync="drawer" :with-header="false">
      <div class="drawerLeft" :class="isDealed ? 'isDealed' : ''">
        <div class="left_box">
          <div class="header">
            <div class="header_t">
              <div class="header_t_l">
                <span>{{detailsInfo.name}}</span>
              </div>
              <div class="header_t_r">
                <span>所属业务员：</span>
                <span>{{detailsInfo.username}}</span>
              </div>
            </div>
            <div class="header_b">
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
                  <el-popover placement="bottom" width="230" trigger="click" v-model="addMobliePopVisible">
                    <el-input type="text" size="mini" v-model="addMoblie" style="margin-bottom:5px" @input="addMoblieChange">
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
                  <el-date-picker v-model="birthday" type="date" size="mini" placeholder="请输入出生日期" class="difPicker" clearable style="width: 100%;" value-format="yyyy-MM-dd">
                  </el-date-picker>
                </span>
              </div>
              <div class="editContent_b editContent_box">
                <span class="dd">微信号</span>
                <span class="dd">
                  <el-input placeholder="请输入" size="mini" v-model="wxno">
                  </el-input>
                </span>

              </div>
  
            </div>
          </div>
          <div class="condition">
            <div class="clearfix">
              <div class="common-select">
                <div class="select-title" style="width: 0.8rem">转其他库</div>
                <div class="select-content" style="width: calc(100% - 0.8rem); margin-right: 0.2rem; border: none">
                  <el-select class="el-select-inners" v-model="editInfo.otherstore" size="mini" placeholder="" clearable>
                    <el-option v-for="item in otherstores" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="common-select">
                <div class="select-title" style="width: 0.8rem">共享客户</div>
                <div class="select-content" style="width: calc(100% - 0.8rem); margin-right: 0;">
                  <el-autocomplete class="el-input-inners" v-model="editInfo.shareusername" :trigger-on-focus="false" :fetch-suggestions="querySearchId" size="mini" placeholder="请输入业务员姓名" clearable></el-autocomplete>
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
                  <el-date-picker class="el-date-picker-sigle" v-model="returnVisit" type="datetime" size="mini" placeholder="" :picker-options="previstitimePickerOptions" clearable>
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="condition-bottom" @click="saveRecord" v-show="dis_save">保存</div>
          </div>
          <div class="adInformation">
            <div class="title">
              <span></span>
              <span>广告投放信息</span>
            </div>
            <div class="adInformation_b">
    
              <div class="cb">
                <span :title="detailsInfo.makedate">线索产生时间：{{detailsInfo.makedate}}</span>
                <span :title="detailsInfo.channelname">渠道类型：{{detailsInfo.channelname}}</span>
              </div>
         

              <div class="cc">
                <span :title="detailsInfo.clue_sourcename">线索来源：{{detailsInfo.clue_sourcename}}</span>
                <span :title="detailsInfo.appname">流量来源：{{detailsInfo.appname}}</span>
              </div>

              <div class="cb">
                <span :title="detailsInfo.area">自动定位城市：{{detailsInfo.area}}</span>
              </div>
              <div class="cb">
                <span :title="detailsInfo.pageurl">
                  推广页面：<a style="cursor: pointer;" href="#" @click="disPageUrl(detailsInfo)">{{detailsInfo.pageurl}}</a>
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

                    <img class="play-icon" src="../../../static/images/pause-icon.png" title="暂停" @click="audioPause(scope.$index)" v-if="!audioPaused && scope.$index === currentCallIndex">
                    <img class="play-icon" src="../../../static/images/play-icon.png" title="播放" @click="audioPlay(scope.$index)" v-else>
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
        <div class="cjg-search-section " style="display: flex; justify-content: center;align-items: center;">
          <el-select v-model="cjgTitle" :loading="loading" filterable remote :remote-method="remoteMethod" placeholder="搜索藏经阁内容" @change="cjgChange" @focus="cjgfocus" class="cjgserach" style="width: 100%;">
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
                  <span class="mobile-icon el-icon-delete" @click="deleteRemark(item.remarkserialno)" style="color:#979797"></span>
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
        <ul class="order-list">
          <li class="item" v-for="item in policyList" :key="item.riskname">
            <div class="head">
              <div class="txt">{{item.riskname}}</div>
              <div class="status" :class="[item.status === 'processing' ? 'processing' : '',item.status === 'invalid' ? 'invalid' : '',item.status === 'cancel' ? 'cancel' : '']">
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
    <el-dialog :title="CJGselectValue" :visible.sync="cjgdrawer" width="70%" class="cjg-dialog">
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
              <div id="div4" class="text">
              </div>
            </div>
          </div>
        </div>
        <div class="item-section">
          <label>附件</label>
          <div class="right-content">
            <ul class="enclosure-list" v-if="fileList.length">
              <li class="item" v-for="(item,index) in fileList" :key="index">
                <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{item.filename}}</div>
                <a :href="'https://crm.meihualife.com/filedownload.do?fileid=' + item.fileid" class="download-btn" :download="item.filename">下载</a>
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
            <el-input placeholder="请输入" size="mini" v-model="jbhbItem.disdescription" :disabled="true" resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="7">
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
            <el-input resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="10" placeholder="请输入内容" :disabled="true" v-if="currentSuggestion === 'zjsuggestion'" v-model="jbhbItem.zjsuggestion">
            </el-input>
            <el-input resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="10" placeholder="请输入内容" v-else :disabled="true" v-model="jbhbItem.ylsuggestion">
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
                    <el-input placeholder="请输入" size="mini" v-model="item.acceptremark" :disabled="true" resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="7">
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
           
                <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{item.filename}}</div>
                <a :href="'https://crm.meihualife.com/filedownload.do?fileid=' + item.fileid" class="download-btn" :download="item.filename">下载</a>
              </li>
            </ul>
            <ul class="enclosure-list" v-else>
              <li class="item">暂无附件</li>
            </ul>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 录音 -->
    <audio :src="audioSrc" ref="audio2"></audio>
  </div>
</template>
<script>
import publicCustome from './publicCustome.js'
export default {
  mixins: [publicCustome]
}
</script>
<style src="../../../static/css/drawer.css"></style>
<style src="../../../static/css/viewer.min.css"></style>
<style src="../../../static/css/publicCustome.css"></style>
<style>
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

.select-check {
  min-width: auto;
  font-size: 0.14rem;
  padding: 12px 0 0 12px;
}

.select-check .el-checkbox__label {
  font-size: 0.14rem;
}

.el-popover__reference-wrapper {
  display: flex;
  height: 100%;
  align-items: center;
}
</style>