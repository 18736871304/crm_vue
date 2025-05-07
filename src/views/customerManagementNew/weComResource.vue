<template>
  <div class="customerManagementNew Container">
    <div class="container-top">
      <!-- 信息检索 -->
      <div class="container-top-two" style="overflow-x: auto; overflow-y: hidden">
        <div class="container-search-box">
          <div class="common-select">
            <div class="select-title filtitle">线索产生时间</div>
            <div class="select-content filContent">
              <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="daterange" align="right" size="mini" unlink-panels range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>

          <div class="common-select" style="display: none">
            <div class="select-title filtitle">跟进步骤</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="activeName" size="mini" placeholder="请选择跟进步骤" clearable>
                <el-option v-for="(item, index) in add_steps" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="common-select">
            <div class="select-title filtitle">渠道/来源</div>
            <div class="select-content filContent">
              <el-cascader class="el-select-inners" popper-class="cascaderBox" v-model="channelSourceValue" :options="channelSource" :props="cascaderProps" @change="handleChange" :show-all-levels="false" collapse-tags clearable></el-cascader>
            </div>
          </div>
          <div class="common-select" v-show="dis_P4_up"></div>
          <div class="common-select" v-show="dis_P4_up"></div>

          <div class="common-select" v-show="dis_P4_up">
            <div class="select-title filtitle">选择团队</div>
            <div class="select-content filContent">
              <el-dropdown trigger="click" placement="bottom" ref="disTeam2">
                <p class="el-dropdown-inners" clearable>
                  <span>{{ teamNames2 }}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu class="" slot="dropdown">
                  <el-tree @check="handleCheckChange2" :data="teamDataList" ref="tree2" show-checkbox node-key="id" :default-expanded-keys="[1]" :props="defaultProps"> </el-tree>
                  <div class="sure-footer">
                    <div class="my-sure" style="background: #fff; color: #dc240f; border: 0.01rem solid #dc240f" @click="my_sureOne2">取消</div>
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
                <el-option v-for="item in userNameOptions" :key="item.userid" :label="item.username" :value="item.userid"> </el-option>
              </el-select>
            </div>
          </div>

          <div class="common-select">
            <div class="select-title filtitle">微信昵称/备注</div>
            <div class="select-content filContent">
              <el-input class="el-input-inners" v-model="customerremarkname" size="mini" placeholder="请输入微信昵称/备注" clearable></el-input>
            </div>
          </div>

          <!-- <div class="common-select" style="display: none;">
            <div class="select-title filtitle">
              <el-select class="el-input-title-inners" v-model="phoneWxno" placeholder="请选择" size="mini">
                <el-option label="电话号码" value="电话号码"></el-option>
                <el-option label="微信号" value="微信号"></el-option>
              </el-select>
            </div>

            <div class="select-content   filContent">
              <el-input class="el-input-inners" v-model="phoneWxnoValue" align="right" placeholder="请输入电话号码" size="mini" clearable></el-input>
            </div>

          </div> -->
          <!-- <div class="common-select" style="width:6%">
            <div class="my-customers" v-show="ismyUse && dis_P4_up">
              <el-checkbox size="mini" v-model="queryflag">我的客户</el-checkbox>
            </div>
          </div> -->

          <div class="common-select" v-show="dis_P4_up"></div>
          <div class="common-select" style="width: 4%">
            <div class="search-box-right">
              <div style="display: flex">
                <div class="search-btn searchLeft" @click="search(1)">搜索</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-table">
      <!-- 调配资源 -->
      <div class="check-all-box">
        <!-- <div>
          <el-checkbox v-model="checkedAll">全选</el-checkbox>
          {{ checkedAllNum }}个客户
        </div> -->

        <!-- <div class="container-middle-two" style="float: right;">
          <el-popover popper-class="entry-customer-popper" placement="bottom-start" width="3.31rem" trigger="click" v-model="resourceDeployVisable" @show="resourceDeployShow">
            <div class="search-btn resourceAllocation" slot="reference">资源调配
            </div>
            <div class="common-select">
              <div class="select-title  newsalesperson">新所属业务员</div>
              <div class="select-content" style="width: 2rem;">
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
              <div class="my-sure resourceCancel" @click="resourceDeployCancel()">取消</div>
              <div class="my-sure" @click="resourceDeploySubmit()">确定</div>
            </div>
          </el-popover>
        </div> -->
      </div>

      <!-- 表格内容 -->

      <div class="check-all-table">
        <el-table :data="ArticleData" class="Article" border v-loading="loading" style="width: 100%">
          <el-table-column key="1" type="selection" width="40"> </el-table-column>
          <el-table-column key="2" prop="makedate" label="线索产生时间" width="160" align="center"> </el-table-column>
          <el-table-column key="3" prop="username" label="所属业务员" :show-overflow-tooltip="true" width="100" align="center"> </el-table-column>
          <el-table-column key="4" prop="customername" label="客户微信昵称" :show-overflow-tooltip="true" width="180" align="center">
            <!-- <template slot-scope="scope">
              <span style="cursor: pointer;" type="text" size="small" @click="handle(scope.row)">{{ scope.row.customername ||
              "空" }}</span>
            </template> -->

          </el-table-column>
          <el-table-column key="5" prop="customerremarkname" label="客户微信备注" :show-overflow-tooltip="true" width="180" align="center"> </el-table-column>
          <el-table-column key="6" prop="customersex" label="客户性别" width="90" align="center"> </el-table-column>
          <el-table-column key="7" prop="channelname" label="渠道类型" width="80" align="center"> </el-table-column>
          <el-table-column key="8" prop="articletypename" label="资源类型" width="80" align="center"> </el-table-column>
          <el-table-column key="9" prop="appname" label="流量来源" width="110" align="center"> </el-table-column>
          <el-table-column key="10" prop="isdeletefirendname" label="是否删除" width="90" align="center"> </el-table-column>
          <el-table-column key="11" align="center" label="聊天记录" width="90">
            <template slot-scope="scope">
              <a href="javascript:void(0);" class="editColor editColorChat" @click="openChatItem(scope.row)">查看</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination background layout="total,prev, pager, next" :total="pageTotal" :page-size="pageSize" :current-page="pageNum" @current-change="pageClick"> </el-pagination>
      </div>
    </div>

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
                    <el-table :data="mobileList" class="mobile_box" v-show="queryflag">
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
            <div class="clearfix" style="margin-bottom: 0.2rem;">

              <div class="common-select">
                <div class="select-title" style="width: 0.8rem">跟进步骤</div>
                <div class="select-content" style="width: calc(100% - 0.8rem); margin-right: 0.2rem; border: none">
                  <el-select class="el-select-inners" v-model="visit" size="mini" placeholder="" clearable>
                    <el-option v-for="item in steps" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <!-- <div class="common-select">
                <div class="select-title " style="width: 0.8rem">共享客户</div>
                <div class="select-content filContentNoborder   filContBottom" style="width: calc(100% - 0.8rem); margin-right: 0.2rem;">
                  <el-autocomplete class="el-input-inners" v-model="editInfo.shareusername" :trigger-on-focus="false" :fetch-suggestions="querySearchId" size="mini" placeholder="请输入业务员姓名" clearable></el-autocomplete>
                </div>
              </div> -->
              <!-- multiple -->
              <div class="common-select">
                <div class="select-title" style="width: 0.8rem">客户需求</div>
                <div class="select-content cusintention" style="width: calc(100% - 0.8rem); margin-right: 0.2rem; border: none">
                  <el-select class="el-select-inners" @change="handleChange" v-model="customer_intention" size="mini" multiple collapse-tags placeholder="请选择客户需求" clearable>
                    <el-option v-for="item in customerNeedList" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key" :disabled="item.disabled">
                    </el-option>
                  </el-select>
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
            <div class="condition-bottom" v-show="queryflag" @click="saveRecord">保存</div>
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
                <el-table-column key="50" prop="calltime" label="拨打时间" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column key="51" prop="username" label="拨打业务员" width="97" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column key="52" prop="isconnect" width="70" align="center" label="接通">
                </el-table-column>
                <el-table-column key="53" prop="timeduration" label="时长" align="center" width="100" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column key="54" align="center" label="录音" width="70">
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

    <el-drawer title="" size="50%" custom-class="customer-drawer chatRecord-drawer" v-if="chatRecord" :visible.sync="chatRecord" :before-close="closeChatRecord">
      <div class="drawerBox" style="width: 100%; overflow-x: hidden">
        <chat-Record :datas="detailObj"></chat-Record>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import $ from "jquery";

import { getData, getPhoneData, my_url, crm_url } from "../../static/js/ajax.js";
import { formatDate, checkEmail, checkMobile } from "../../static/js/common.js";
import chatRecord from "../../components/chatRecord/chatRecord.vue";

export default {
  components: {
    chatRecord,
  },
  data() {
    return {
      channelSourceValue: [],
      channelSource: [],
      cascaderProps: {
        value: "id", // 使用 id 作为值
        label: "label", // 使用 label 作为显示文本
        children: "child", // 使用 children 作为子节点
        // multiple: true,
        checkStrictly: true,
      },
      // 聊天记录
      chatRecord: false,
      detailObj: {},
      showEditPopupDialogVisible: false,

      my_url: my_url,
      // 筛选
      selectTime: [],
      activeName: "",
      add_steps: [],
      channelValue: "",
      channelList: [], //渠道类型
      sourceValue: "", //流量来源
      sourceList: [], //流量来源列表
      teamNames2: "团队选择",
      my_list2: "",
      ArticleData: [],
      customerremarkname: "",

      dis_P4_up: false,
      dis_Pz_up: false,
      teamDataList: [],
      userNameOptions: [],
      SalesmanIdBox: [],
      defaultProps: {
        children: "children",
        label: "label",
      },

      queryflag: true,
      queryflagString: "01",
      // 列表

      checkedAll: false,
      checkedAllNum: 0,
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      loading: true,

      overviewForm: {
        teamid: "",
        userid: "",
        startDate: "",
        endDate: "",
        time: "1",
      },


      steps: [],
      select_steps: [],
      add_steps: [],
      callSum: "",
      birthday: '',
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
      customerNeedList: [],
      customer_intention: "",
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
    this.getIsCall();
    this.getConditionData();
    this.getTeamList();
    this.search(1); //table数据

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
  },
  computed: {},
  methods: {



    // 聊天记录

    // 打开首页聊天记录
    openChatItem(item) {

      item.qwuserurl = item.photourl;

      this.detailObj = Object.assign({}, item);
      // this.activeName = ''
      this.detailObj["activeName"] = "";
      this.chatRecord = true;
      // this.init(item.qwuserid, item.customerid, true)
    },

    // 关闭聊天记录
    closeChatRecord() {
      this.chatRecord = false;
      // this.detailObj = {}
    },

    updateVisibleId(e) {
      this.showEditPopupDialogVisible = e;
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


      getData(
        "post",
        my_url + "/crm/activity/getChannelTree.do",
        function (data) {
          if (data.code == 0) {
            _this.removeEmptyChildren(data.channelInfo);
            _this.channelSource = data.channelInfo;
          }
        },
        {
          dict_type: "source",
        }
      );
    },

    removeEmptyChildren(arr) {
      arr.forEach((item) => {
        // 判断是否有 children 属性
        if (item.child) {
          // 判断 children 的长度是否为 0
          if (item.child.length === 0) {
            // 删除 children 属性
            delete item.child;
          } else {
            // 如果有 children，递归调用以处理子节点
            this.removeEmptyChildren(item.child);
          }
        }
      });
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

    channelSelect() {
      var _this = this;
      this.sourceValue = "";
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

    search(page) {
      //查询
      var that = this;

      let hotlineStartDate = "",
        hotlineEndDate = "";

      if (this.selectTime && this.selectTime.length > 0) {
        hotlineStartDate = this.formatDate(this.selectTime[0], "yyyy-MM-dd");
        hotlineEndDate = this.formatDate(this.selectTime[1], "yyyy-MM-dd");
      } else {
        hotlineStartDate = "";
        hotlineEndDate = "";
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
          queryflag: that.queryflagString,
          customerremarkname: that.customerremarkname, //客户姓名
          channel: '',
          appname: '',
        };

        if (that.channelSourceValue.length == 0) {
          params.channel = "";
          params.appname = "";
        } else if (that.channelSourceValue.length == 1) {
          params.channel = that.channelSourceValue[0];
        } else if (that.channelSourceValue.length == 2) {
          params.channel = that.channelSourceValue[0];
          params.appname = that.channelSourceValue[1];
        }
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

      this.loading = false;
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
    //查看客户权限
    getConditionData() {
      let _this = this;
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

      getData(
        "post",
        my_url + "/crm/common/getDictList.do",
        function (data) {
          //跟进步骤
          if (data.code == 0) {
            _this.steps = data.dictList;
            let select_dictList = JSON.parse(JSON.stringify(data.dictList));
            select_dictList.unshift({
              dd_key: "99",
              dd_value: "新资源",
            });

            _this.select_steps = select_dictList;

            var add_dictList = JSON.parse(JSON.stringify(data.dictList));

            add_dictList.push({
              dd_key: "gxkh",
              dd_value: "共享客户",
            });
            add_dictList.unshift({
              dd_key: "99",
              dd_value: "新资源",
            });

            _this.add_steps = add_dictList;
            // _this.activeName = add_dictList[1].dd_key;
            _this.activeName = "99";
          }
        },
        {
          dict_type: "followupstep",
        }
      );
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

    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.search(page);
    },

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

    // // 删除资源
    // deleteSourceSubmit() {
    //   let _this = this;
    //   let activityid = [];
    //   _this.multipleSelection.forEach(function (item) {
    //     activityid.push(item.activityserialno)
    //   })
    //   if (activityid.length == 0) {
    //     _this.$message({
    //       type: 'waring',
    //       duration: 3000,
    //       message: "请选择需要删除的资源！"
    //     })
    //     return
    //   }
    //   let params = {
    //     'activityid': activityid.join(',')
    //   }
    //   getData('post', my_url + '/crm/activity/pageActivityDelete.do', function (data) {
    //     if (data.code == '0') {
    //       _this.$message({
    //         type: 'success',
    //         duration: 3000,
    //         message: "删除成功！"
    //       })
    //       _this.deleteSourceVisable = false;
    //       _this.search(1);
    //     } else {
    //       _this.$message({
    //         type: 'waring',
    //         duration: 3000,
    //         message: data.msg
    //       })
    //     }
    //   }, params);
    // },
    // deleteSourceCancel() {
    //   this.deleteSourceVisable = false;
    // },
    // handleSelectId(item) {
    //   this.resourceDeployform.userid = item.id
    // },

    // // 调配资源
    // resourceDeploySubmit() {
    //   let _this = this;
    //   let activityid = [];
    //   _this.multipleSelection.forEach(function (item) {
    //     activityid.push(item.activityserialno)
    //   })
    //   if (activityid.length == 0) {
    //     _this.$message({
    //       type: 'waring',
    //       duration: 3000,
    //       message: "请选择需要调配的资源！"
    //     })
    //     return
    //   }
    //   //添加的新业务员编号
    //   let userid = [];
    //   userid.push(this.resourceDeployform.userid)

    //   this.resourceDeployform.activityid = activityid.join(',')
    //   this.resourceDeployform.userid = userid.join('')
    //   getData('post', my_url + '/crm/activity/activityTransfer.do', function (data) {
    //     if (data.code == '0') {
    //       _this.$message({
    //         type: 'success',
    //         duration: 3000,
    //         message: "调配成功！"
    //       })
    //       _this.resourceDeployVisable = false;
    //       _this.resourceDeployform.followupstep = '';
    //       _this.resourceDeployform.activityid = '';
    //       _this.userNameList = [];
    //       _this.teamNames = "团队选择"
    //       _this.teamList = ''
    //       _this.resourceDeployform.userid = '';
    //       _this.editInfo.shareusername = '';
    //       _this.search(1);
    //     } else {
    //       _this.$message({
    //         type: 'waring',
    //         duration: 3000,
    //         message: data.msg
    //       })
    //     }
    //   }, this.resourceDeployform);
    // },
    // resourceDeployCancel() {
    //   this.resourceDeployVisable = false;
    //   this.resourceDeployform.followupstep = '';
    //   this.resourceDeployform.activityid = '';
    //   this.editInfo.shareusername = '';
    //   this.resourceDeployform.userid = '';
    //   this.userNameList = [];
    //   this.teamNames = "团队选择";
    //   this.teamList = '';
    //   // this.$refs.tree1.setCheckedKeys([])
    // },
    // resourceDeployShow() {
    //   this.getTeamList();
    // },
    getTeamList() {
      let _this = this;
      //设置当前用户的团队列表参数
      getData("post", my_url + "/crm/auth/getTalkTeamList.do", function (data) {
        _this.teamDataList = data.teamList;
      });
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

    my_sureOne2() {
      this.$refs.disTeam2.hide();
      this.my_list2 = "";
      this.teamList2 = "";
      this.teamNames2 = "团队选择";
      this.overviewForm.teamid = "";
      this.$refs.tree2.setCheckedKeys([]);
      this.queryflag = true;
      // this.search(1);
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

      // this.search(1);
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
      // this.search(1);
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











    // 侧拉


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
      this.customer_intention = row.customer_intention != undefined ? row.customer_intention.split(",") : "";
      this.handleChange(this.customer_intention);
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
      console.log(this.detailsInfo.activityserialno)
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
        customer_intention: this.customer_intention.join(","),
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
    handleChange(selectedKeys) {
      if (selectedKeys.length > 0) {
        // 根据初始化数组对象的顺序对 selectedKeys 进行排序
        selectedKeys.sort((a, b) => {
          const indexA = this.customerNeedList.findIndex((item) => item.dd_key === a);
          const indexB = this.customerNeedList.findIndex((item) => item.dd_key === b);
          return indexA - indexB; // 按照初始化数组的顺序排序
        });
        // 要检查的值数组
        var exclusive = ["01", "10"];
        // 检查 selectedKeys 是否包含 value 中的任意一项
        const containsValue = exclusive.some((val) => selectedKeys.includes(val));
        this.customerNeedList.forEach((item) => {
          if (containsValue) {
            // 如果包含，禁用其他项
            item.disabled = !selectedKeys.includes(item.dd_key); // 只有在 selectedKeys 中的项不禁用
          } else {
            // 如果不包含，禁用 value 中的项
            item.disabled = exclusive.includes(item.dd_key); // value 中的项禁用
          }
        });
      } else {
        this.customerNeedList.forEach((item) => {
          item.disabled = false; // 添加 disabled 属性并设置为 false
          item.selected = false; // 添加 selected 属性并设置为 false
        });
      }
    },



    channelChange(value) {
      // 如果选中的值是没有子节点的选项，保持当前选中的值
      const selectedOption = this.findOptionById(this.channelSource, value[value.length - 1]);
      if (selectedOption && !selectedOption.child) {
        this.channelSourceValue = value; // 保持当前选中的值
        if (value.length == 2) {
          this.channelSourceValue[1] = selectedOption.label;
        }
      }
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







  },
};
</script>
<style src="../../static/css/viewer.min.css"></style>
<style src="../../static/css/drawer.css"></style>
<style src="../../static/css/customerManagementNew.css"></style>

<style>
.el-drawer__header {
  height: 0.71rem;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 0.1rem;
}

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

<style scoped>
.viewer-in {
  z-index: 9999 !important;
}

.common-select .filtitle {
  width: 1.28rem;
}

.common-select .filContent {
  height: 0.3rem;
  width: 2rem;
  border: none;
  display: flex;
  align-items: center;
}

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

.editColorChat {
  color: #8f9198;
}
</style>
