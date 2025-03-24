<template>
  <div>
    <div class="container-middle">
      <div class="container-middle-two1">
        <el-popover popper-class="entry-customer-popper" class="entry-customer" placement="bottom-start" width="3.31rem" trigger="click" v-model="inputUserVisable">
          <div class="search-btn" slot="reference" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D;">客户录入</div>
          <div class="common-select">
            <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">线索产生时间</div>
            <div class="select-content del-el-input-prefix" style="width:2rem;border: none">
              <el-date-picker class="el-date-picker-inners" v-model="inputUserform.makedate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择线索产生时间">
              </el-date-picker>
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
          <div class="common-select">
            <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">渠道类型</div>
            <div class="select-content" style="width: 2rem;">
              <el-autocomplete class="el-input-inners" v-model="inputUserform.channelid" :trigger-on-focus="false"
                :fetch-suggestions="querySearch" size="mini" placeholder="请输入渠道类型" clearable>
              </el-autocomplete>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">备注</div>
            <div class="select-content" style="width: 2rem;height: auto;">
              <el-input class="el-input-inners" style="color: #979797; font-size: 0.14rem" type='textarea' :rows="2" v-model="inputUserform.remark" clearable></el-input>
            </div>
          </div>
          <div class="sure-footer" style="padding-bottom: 0;">
           
            <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="inputUserCancel">取消</div>
            <div class="my-sure" @click="inputUserSubmit">确定</div>
          </div>
        </el-popover>

        <el-popover  popper-class="entry-customer-popper" placement="bottom-start" width="3.31rem" trigger="click" v-model="visable">
          <div class="search-btn" slot="reference" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D;">上传文件</div>
          <div class="common-select">
            <div class="select-title" style="width: 1.1rem;border: none; background: #fff;">渠道类型</div>
            <div class="select-content" style="width: 2rem;">
              <el-autocomplete class="el-input-inners" v-model="channelid" :trigger-on-focus="false" 
                :fetch-suggestions="querySearch" size="mini" placeholder="请输入渠道类型" clearable>
              </el-autocomplete>
            </div>
          </div>
          <div class="fileInput">
            　 <input type="file" v-on:change="tirggerFile($event)" class="file-input">
          </div>
          <div class="sure-footer" style="padding-bottom: 0;">
            <div class="my-sure" @click="handleUpLoad1" style="width:0.6rem">上传文件</div>
          </div>
        </el-popover>
        <div class="search-btn" slot="reference" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D;">
          <a href="../../../static/images/template.xls" style="color: #DC240F;" target="downloadFile" download="template.xls">下载模板</a>
        </div>
      </div>
    </div>
    <div class="search-header" style="padding-top: 0">
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">跟进步骤</div>
          <div class="select-content" style="width: calc(100% - 1.28rem); border: none;">
            <el-select class="el-select-inners" v-model="sourcelevel" placeholder="全部" size="mini" clearable>
              <el-option v-for="item in followupStepData" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">
            <el-select class="el-input-title-inners" v-model="phoneWxno" placeholder="请选择" size="mini">
              <el-option label="电话号码" value="电话号码"></el-option>
              <el-option label="微信号" value="微信号"></el-option>
            </el-select>
          </div>
          <div class="select-content" style="width: calc(100% - 1.28rem);">
            <el-input class="el-input-inners" v-model="phoneWxnoValue" align="right" size="mini" clearable></el-input>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">渠道类型</div>
          <div class="select-content" style="width: calc(100% - 1.28rem); border: none;">
            <el-select class="el-select-inners" v-model="channelName" multiple filterable remote reserve-keyword placeholder="" :remote-method="remoteMethod">
              <el-option v-for="item in channelNameType" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key" clearable>
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1rem">线索时间</div>
          <div class="select-content" style="height: 0.3rem; width: calc(100% - 1rem);  border: none">
            <el-date-picker class="el-date-picker-inners" size=mini v-model="selectTime" type="datetimerange" range-separator="-" start-placeholder="开始日期"
              end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        <div class="common-select" style="float: right;width: 11.5%;">
          <div class="search-btn" @click="search(1)">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
        </div>
      </div>
    </div>
    <div class="container-table1">
      <div class="check-all-box1">
        <el-checkbox v-model="checkedAll">全选</el-checkbox>
        {{checkedAllNum}}个客户

        <el-popover popper-class="select-check" placement="bottom-start" trigger="click" v-model="sable" style="float: right;">
          <!-- <el-button slot="reference" size="mini" plain>选择显示列表</el-button> -->
          <el-checkbox-group ref="inputUserform1" v-model="inputUserform1" class="main-left" style="width: 1.5rem;">
            <el-checkbox label="客户姓名"></el-checkbox>
            <el-checkbox label="电话号码"></el-checkbox>
            <el-checkbox label="微信号"></el-checkbox>
            <el-checkbox label="所属业务员"></el-checkbox>
            <el-checkbox label="性别"></el-checkbox>
            <el-checkbox label="年龄"></el-checkbox>
            <el-checkbox label="资源等级"></el-checkbox>
            <el-checkbox label="线索入库时间"></el-checkbox>
            <el-checkbox label="线索产生时间"></el-checkbox>
            <el-checkbox label="首次拨打时间"></el-checkbox>
            <el-checkbox label="最新时间"></el-checkbox>
            <el-checkbox label="累计拨打次数" :disabled='dis_P4_up'></el-checkbox>
            <el-checkbox label="批次号"></el-checkbox>
            <el-checkbox label="渠道类型"></el-checkbox>
            <el-checkbox label="计划名称"></el-checkbox>
            <el-checkbox label="推广页面"></el-checkbox>
            <el-checkbox label="预约回访"></el-checkbox>
            <div class="hengxianmy" style="margin-top: 0.1rem;padding-bottom: 0;">
            </div>
          </el-checkbox-group>
        </el-popover>

        <el-popover  popper-class="entry-customer-popper" v-show="dis_Pz_up" placement="bottom-start" width="3.31rem" trigger="click" style="float: right;" v-model="deleteSourceVisable">
          <div class="search-btn" slot="reference" style="width:auto;padding: 0.01rem 0.18rem;background: #fff;border: 1px solid #DC220D;color: #DC220D;">资源删除</div>
          <div class="sure-footer" style="padding-bottom: 0;">
            
            <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="deleteSourceCancel">取消</div>
            <div class="my-sure" @click="deleteSourceSubmit">确定</div>
          </div>
        </el-popover>
        <el-popover  popper-class="entry-customer-popper" v-show="dis_P4_up" placement="bottom-start" width="3.31rem" trigger="click" style="float: right;" v-model="resourceDeployVisable" @show="resourceDeployShow">
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
              <el-select class="el-select-inners" v-model="resourceDeployform.followupstep" popper-class='pei' placeholder="请选择新跟进步骤">
                <el-option v-for="item in add_steps" :label="item.dd_value" :value="item.dd_key" :key="item.dd_key"></el-option>
              </el-select>
            </div>
          </div>
          <div class="sure-footer" style="padding-bottom: 0;">
            
            <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="resourceDeployCancel">取消</div>
            <div class="my-sure" @click="resourceDeploySubmit">确定</div>
          </div>
        </el-popover>
      </div>
      <div class="table-all-box1">
        <el-table class="splice-header" :data="tableData" ref="multipleTable" border v-loading="loading" style="width: 100%"
          @selection-change="handleSelectionChange" @sort-change="sortChange">
          <el-table-column type="selection" width="40">
          </el-table-column>
          <el-table-column key="2" type="index" label="序号" align="center" width="60">
          </el-table-column>
          <el-table-column key="3" label="客户姓名" width="100" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <a style="cursor: pointer;" type="text" size="small"
                @click="handle(scope.row)">{{scope.row.name||"空"}}</a>
            </template>
          </el-table-column>
          <el-table-column key="4" align="center" label="电话号码" width="140" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <a class="call-a" href="javascript:void(0);">
                {{scope.row.mobile}}
              </a>
            </template>
          </el-table-column>
          <el-table-column key="15" align="center" label="微信号" prop="wxno" width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <a class="call-a" v-if="scope.row.wxno==''|| scope.row.wxno==undefined " href="javascript:void(0)"></a>
              <a class="call-a" v-else href="javascript:void(0)">***</a>
            </template>
          </el-table-column>
          <el-table-column key="5" prop="followupstepname" align="center" label="跟进步骤" width="90"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="6" prop="username" align="center" label="所属业务员" width="100"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="8" prop="sex" label="性别" align="center" width="80" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="9" prop="age" label="年龄" align="center" width="80" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="20" prop="sourcelevel" label="" align="center" width="110" :show-overflow-tooltip="true">

            <template slot="header"  >
              <p class="source-level">资源等级
                <el-tooltip popper-class="atooltip" effect="light" placement="top">
                  <template slot="content">
                    <!-- <p>A理财：实时热线资源，且线索产生时间&lt;7天</p> -->
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

          <!-- <el-table-column key="22" prop="menudate" align="center" label="线索入库时间" width="150"
            :show-overflow-tooltip="true">
          </el-table-column> -->

          <el-table-column key="10" prop="makedate" align="center" label="线索产生时间" width="160"
            :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="11" prop="firstcalltime" align="center" label="首次拨打时间" width="160"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column key="12" prop="lastcalltime" align="center" label="最新拨打时间" width="160"
            :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column key="13" prop="callcount" align="center" label="累计拨打次数" width="100"
            :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column prop="cusdealtime" key="16" align="center" label="客户成交时间" width="160"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="cusdealperiod" key="17" align="center" label="客户成交周期" width="100"
            :show-overflow-tooltip="true">
          </el-table-column>

          <!-- <el-table-column key="23" prop="batchno" align="center" label="批次号" width="110" :show-overflow-tooltip="true">
          </el-table-column> -->

          <el-table-column key="14" prop="channeldetailname" align="center" label="渠道类型" width="80"
            :show-overflow-tooltip="true">
          </el-table-column>

          <!-- <el-table-column key="18" prop="planname" label="计划名称" width="150" :show-overflow-tooltip="true"
            align="center">
          </el-table-column> -->
          <el-table-column key="19" prop="pageurl" label="推广页面" width="150" :show-overflow-tooltip="true"
            align="center">
            <template slot-scope="scope">
              <a style="cursor: pointer;" href="#" @click="disPageUrl(scope.row)">{{scope.row.pageurl}}</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div>
      <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize"
        :current-page="pageNum" @current-change="pageClick">
      </el-pagination>
    </div>
    <el-drawer title="我是标题" :size="isDealed ? '76%' : '56%'" custom-class="customer-drawer" :visible.sync="drawer" :with-header="false">
      <div class="drawerLeft" :class="isDealed ? 'isDealed' : ''">
        <div class="left_box">
          <div class="header">
            <div class="header_t">
              <div class="header_t_l">
                <span>{{detailsInfo.name}}</span>
                <span @click="phonecall_page">
                  <img src="../../../static/images/call-icon.png" style="margin-right: 6px;"/>拨打电话
                </span>
              </div>
              <div class="header_t_r">
                <span>所属业务员：</span>
                <span>{{detailsInfo.username}}</span>
                <span v-if="detailsInfo.otherusername">（{{detailsInfo.otherusername}}）</span>
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
                  <el-popover placement="bottom" width="200" trigger="click" v-model="addMobliePopVisible">
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
                        <template slot-scope="scope"  >
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
                    <el-option v-for="item in sexs" :key="item.key" :label="item.value" :value="item.key">
                    </el-option>
                  </el-select>
                </span>
              </div>
              <div class="editContent_c editContent_box editContent_date" style=" font-size: 0.13rem;">
                <span class="dd">出生日期</span>
                <span class="dd">
                  <el-date-picker v-model="birthday" type="date" size="mini" placeholder="请输入出生年月" class="difPicker"
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
                <div class="select-content" style="height: 0.3rem; width: calc(100% - 0.8rem); margin-right: 0; border: none">
                  <el-date-picker class="el-date-picker-sigle" v-model="returnVisit" type="datetime" size="mini" placeholder=""
                    :picker-options="previstitimePickerOptions" clearable>
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
                <span :title="detailsInfo.makedate">线索产生时间：{{detailsInfo.makedate}}</span>
                <span :title="detailsInfo.channelname">渠道类型：{{detailsInfo.channelname}}</span>
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
                <span :title="detailsInfo.clue_sourcename">线索来源：{{detailsInfo.clue_sourcename}}</span>
                <span :title="detailsInfo.appname">流量来源：{{detailsInfo.appname}}</span>
              </div>
              <div class="cb">
                <span :title="detailsInfo.area">自动定位城市：{{detailsInfo.area}}</span>
              </div>
              <div class="cb" style="width: 90%;">
                <span :title="detailsInfo.pageurl"> 推广页面：<a style="cursor: pointer; color: #578EE7;" href="#"
                    @click="disPageUrl(detailsInfo)">{{detailsInfo.pageurl}}</a>
                </span>
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
                <el-table-column prop="timeduration" label="时长" align="center" width="100" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column align="center" label="录音" width="70">
                  <template slot-scope="scope" v-if="scope.row.recordurl">
                    <img class="play-icon" src="../../../static/images/pause-icon.png" title="暂停" @click="audioPause(scope.$index)" v-if="!audioPaused && scope.$index === currentCallIndex">
                    <img class="play-icon" src="../../../static/images/play-icon.png" title="播放" @click="audioPlay(scope.$index)" v-else>
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
        <div class="inputBox">
          <el-input v-model="followrecord" id="textarea" type="textarea" placeholder="添加跟进记录…"></el-input>
        </div>
        <div class="numBox">
          <div class="num">共{{releaseNum}}条</div>
          <div class="button">
            <span @click="cancel">取消</span>
            <span @click="release">发布</span>
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
          <li class="item" v-for="(item, index) in policyList" :key="index">
            <div class="head">
              <div class="txt" @click="showEdit(item)">{{item.riskname}}</div>
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
    </el-drawer>
    <!-- 查看详情弹窗 -->
    <!-- <view-details :datas="detailObj" :showEditPopupDialogVisible.sync="showEditPopupDialogVisible" @updateVisible="updateVisibleId"></view-details> -->
    <!-- 录音播放器 -->
    <audio :src="audioSrc" ref="audio" controls="controls" id="audio" v-show="audioShow"></audio>
  </div>
  
</template>
<script>
import channelManagement from './channelManagement.js';
import '../../../static/css/channelManagement.css';
import '../../../static/css/drawer.css';
export default {
  mixins: [channelManagement],
  components: {
  },
  methods: {
    updateVisibleId(e) {
      this.showEditPopupDialogVisible = e;
    }
  }
}
</script>
<style>
.del-el-input-prefix .el-input__prefix {
  display: none;
}

.container-middle {
  margin-top: 0.1rem;
}

.container-middle-two1 {
  height: 0.58rem;
  padding-left: 0.3rem;
  border-radius: 3px;
  display: flex;
  align-items: center;
  background: #ffffff;
}

.container-middle-two1 .el-button--mini {
  border-color: #DC220D;
  color: #DC220D
}

.container-middle-two1 .el-button.is-plain:focus,
.el-button.is-plain:hover {
  background: #DC240F;
  color: #fff;
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

.container-table1 {
  box-sizing: border-box;
  width: 100%;
  background: #ffffff;
  padding: 0.1rem 0.3rem;
  margin-top: 0.1rem;
}

.select-check{
  min-width: auto;
  font-size: 0.14rem;
  padding: 12px 0 0 12px;
}

.select-check .el-checkbox__label{
  font-size: 0.14rem;
}

.check-all-box1 {
  color: #979797;
  font-size: 0.14rem;
  margin-bottom: 0.13rem;
}

.check-all-box1 .el-checkbox__label {
  color: #979797;
  font-size: 0.14rem;
}

.check-all-box1 .el-button--mini{
  font-size: 0.14rem;
  border-color: #DC220D;
  color: #DC220D;
}
.el-popover__reference-wrapper {
    display: flex;
    height: 100%;
    align-items: center;
}
</style>