<template>
  <div style="width:17.1rem">
    <div class="search-header">
      <div class="add-btn" @click="showAddNoticeDialogVisible">+ 保单录入</div>
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title filtitle">出单日期</div>
          <div class="select-content filContent ">
            <el-date-picker v-model="selectTime" type="daterange" align="right" size="mini" value-format="yyyy-MM-dd" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" class="el-date-picker-inners">
            </el-date-picker>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title filtitle">保单号</div>
          <div class="select-content filContent ">
            <el-input class="el-input-inners" v-model="contno" align="right" size="mini" placeholder="请输入保单号" clearable></el-input>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title filtitle">保单状态</div>
          <div class="select-content filContent ">
            <el-select v-model="policyStatus" size="mini" placeholder="请选择保单状态" class="el-select-inners">
              <el-option v-for="(item, index) in policyStatusList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title filtitle">渠道类型</div>
          <div class="select-content filContent">
            <el-select class="el-select-inners" v-model="searchChannel" size="mini" placeholder="请选择渠道类型" clearable>
              <el-option v-for="(item, index) in channelList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title filtitle">保险公司</div>
          <div class="select-content filContent">
            <el-autocomplete class="el-input-inners" v-model="insorganName" :trigger-on-focus="false" :fetch-suggestions="querySearch" size="mini" placeholder="请输入选择保险公司" @select="insorganNameSelect" clearable></el-autocomplete>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title filtitle">险种名称</div>
          <div class="select-content filContent">
            <el-select v-model="mainriskcode" size="mini" placeholder="请选择险种名称" :disabled="disabled" popper-class="xianSelect" @change="riskSelect" class="el-select-inners">
              <el-option v-for="(item, index) in productList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title filtitle">客户姓名</div>
          <div class="select-content filContent">
            <el-input class="el-input-inners" v-model="cusname" align="right" size="mini" placeholder="请输入客户姓名" clearable></el-input>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title filtitle">
            <el-select class="el-input-title-inners" v-model="cusmobile" placeholder="请选择" size="mini">
              <el-option label="电话号码" value="电话号码"></el-option>
              <el-option label="微信号" value="微信号"></el-option>
            </el-select>
          </div>
          <div class="select-content filContent">
            <el-input class="el-input-inners" v-model="cusMobileWxno" align="right" size="mini" placeholder="请输入电话号码" clearable></el-input>
          </div>
        </div>

        <div class="common-select" style="float: right;width:4%">
          <div class="search-btn searchLeft" @click="search(1)">搜索</div>
          <div class="search-btn" style="
              background: #fff;
              color: #dc220d;
              border: 1px solid rgba(216, 216, 216, 1); display: none;
            " @click="screenReset">
            重置
          </div>
        </div>
      </div>
    </div>

    <div class="table-box">

      <el-popover popper-class="select-check" placement="bottom-start" trigger="click" class="chenckList" v-model="sable">
        <div class="search-btn" slot="reference">选择显示列表</div>
        <el-checkbox-group ref="columnList" v-model="columnList" class="main-left" style="width: 1.5rem;">
          <el-checkbox label="accepttime">出单日期 </el-checkbox>
          <el-checkbox label="reusername">出单业务员</el-checkbox>
          <el-checkbox label="serviceusername">服务人员 </el-checkbox>
          <el-checkbox label="contno">保单号</el-checkbox>

          <el-checkbox label="statename">保单状态</el-checkbox>
          <el-checkbox label="insrevisitstatename">回访状态</el-checkbox>
          <el-checkbox label="receiptstatename">回执状态</el-checkbox>

          <el-checkbox label="insorganname">保险公司</el-checkbox>
          <el-checkbox label="riskname">险种名称</el-checkbox>
          <el-checkbox label="appname">投保人姓名</el-checkbox>
          <el-checkbox label="appprovincename">投保人所在省</el-checkbox>
          <el-checkbox label="appcityname">投保人所在市</el-checkbox>
          <el-checkbox label="insname">被保人姓名</el-checkbox>
          <el-checkbox label="payintvvalue">缴费方式</el-checkbox>
          <el-checkbox label="payendyearvalue">缴费年期</el-checkbox>
          <el-checkbox label="insuyearvalue">保障期限</el-checkbox>
          <el-checkbox label="prem">保费</el-checkbox>
          <el-checkbox label="fyp20">标保</el-checkbox>
          <el-checkbox label="coefficientfyp20">折算系数后标保</el-checkbox>
          <el-checkbox label="activitychannelname">渠道类型</el-checkbox>
          <el-checkbox label="activityappname">流量来源</el-checkbox>
          <el-checkbox label="policyurl">电子保单</el-checkbox>

          <!-- <div class="sure-footer" style="border-top: 1px solid rgba(221, 221, 221, 1); margin-top: 0.15rem;">
            <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="inputUserCancel">取消</div>
            <div class="my-sure" @click="checkedSure">确定</div>
          </div> -->

        </el-checkbox-group>
      </el-popover>

      <el-table :data="tableData" ref="multipleTable" border v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange" @sort-change="sortChange" class="splice-header">
        <el-table-column key="2" align="center" type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column key="3" type="index" label="状态" align="center" width="100">
          <template slot-scope="scope">
            <el-tag style="
                color: #979797;
                background: #f6f7fa;
                border: 1px solid #eceef6;
              " v-if="scope.row.state == '80'" size="mini">待审核</el-tag>
            <el-tag style="
                color: #979797;
                background: #f6f7fa;
                border: 1px solid #eceef6;
              " v-else-if="scope.row.state == '82'" size="mini">审核不通过</el-tag>
            <el-tag v-else type="success" size="mini">审核通过{{ columnList.accepttime }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column key="4" align="center" prop="accepttime" label="出单日期" width="160" v-if="columnList.includes('accepttime')">
        </el-table-column>
        <el-table-column key="7" align="center" prop="reusername" label="出单业务员" width="100" v-if="columnList.includes('reusername')">
        </el-table-column>
        <el-table-column key="8" align="center" prop="serviceusername" label="服务人员" width="100" v-if="columnList.includes('serviceusername')">
        </el-table-column>
        <el-table-column key="9" align="center" prop="contno" label="保单号" width="150" :show-overflow-tooltip="true" v-if="columnList.includes('contno')">

        </el-table-column>
        <el-table-column key="10" align="center" prop="statename" label="保单状态" width="80" :show-overflow-tooltip="true" v-if="columnList.includes('statename')">
        </el-table-column>
        <el-table-column key="11" align="center" prop="insrevisitstatename" label="回访状态" width="80" :show-overflow-tooltip="true" v-if="columnList.includes('insrevisitstatename')">
        </el-table-column>
        <el-table-column key="111" align="center" prop="receiptstatename" label="回执状态" width="80" :show-overflow-tooltip="true" v-if="columnList.includes('receiptstatename')">
        </el-table-column>
        <el-table-column key="12" align="center" prop="insorganname" label="保险公司" width="130" :show-overflow-tooltip="true" v-if="columnList.includes('insorganname')">
        </el-table-column>
        <el-table-column key="13" align="center" prop="riskname" label="险种名称" width="200" :show-overflow-tooltip="true" v-if="columnList.includes('riskname')">
        </el-table-column>
        <el-table-column key="14" align="center" prop="appname" label="投保人姓名" width="100" :show-overflow-tooltip="true" v-if="columnList.includes('appname')">
        </el-table-column>
        <el-table-column key="15" align="center" prop="appprovincename" label="投保人所在省" width="120" :show-overflow-tooltip="true" v-if="columnList.includes('appprovincename')">
        </el-table-column>
        <el-table-column key="16" align="center" prop="appcityname" label="投保人所在市" width="120" :show-overflow-tooltip="true" v-if="columnList.includes('appcityname')">
        </el-table-column>
        <el-table-column key="17" align="center" prop="insname" label="被保人姓名" width="100" :show-overflow-tooltip="true" v-if="columnList.includes('insname')">
        </el-table-column>
        <el-table-column key="18" align="center" prop="payintvvalue" label="缴费方式" width="80" :show-overflow-tooltip="true" v-if="columnList.includes('payintvvalue')">
        </el-table-column>
        <el-table-column key="19" align="center" prop="payendyearvalue" label="缴费年期" width="80" :show-overflow-tooltip="true" v-if="columnList.includes('payendyearvalue')">
        </el-table-column>
        <el-table-column key="20" align="center" prop="insuyearvalue" label="保障期限" width="80" :show-overflow-tooltip="true" v-if="columnList.includes('insuyearvalue')">
        </el-table-column>
        <el-table-column key="21" align="center" prop="prem" label="保费" width="80" :show-overflow-tooltip="true" v-if="columnList.includes('prem')">
        </el-table-column>
        <el-table-column key="22" align="center" prop="fyp20" label="标保" width="80" :show-overflow-tooltip="true" v-if="columnList.includes('fyp20')">
        </el-table-column>
        <el-table-column key="23" align="center" prop="coefficientfyp20" label="折算系数后标保" width="120" :show-overflow-tooltip="true" v-if="columnList.includes('coefficientfyp20')">
        </el-table-column>
        <el-table-column key="24" align="center" prop="activitychannelname" label="渠道类型" width="80" :show-overflow-tooltip="true" v-if="columnList.includes('activitychannelname')">
        </el-table-column>

        <el-table-column key="25" align="center" prop="activityappname" label="流量来源" width="100" :show-overflow-tooltip="true" v-if="columnList.includes('activityappname')">
        </el-table-column>

        <el-table-column key="26" align="center" prop="policyurl" label="电子保单" width="80" :show-overflow-tooltip="true" v-if="columnList.includes('policyurl')">
          <template slot-scope="scope">
            <!-- <a v-if="scope.row.policyurl" target="_blank" :href="scope.row.policyurl" @click="downLoad(scope.row)" style="color: #8f9198">下载</a>
            <a v-else style="color: #8f9198; cursor: pointer" @click="noDownLoad(scope.row)" target="_blank" :href="scope.row.policyurl">下载</a> -->
            <span v-if="scope.row.policyurl" style="color: #8f9198; cursor: pointer" @click="testDownLoad(scope.row)">下载</span>

          </template>
        </el-table-column>

        <el-table-column key="30" align="center" label="查看详情" width="100">
          <template slot-scope="scope">
            <a href="javascript:void(0);" style="color: #4985e5" @click="showEditPopup(scope.row)">查看详情</a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <a href="javascript:void(0);" style="color: #4985e5" v-if="scope.row.state == '82' || scope.row.state == '80'" @click="EditPopup(scope.row)">编辑</a>
            <a href="javascript:void(0);" style="color: #dc220d; margin-left: 0.15rem" v-if="scope.row.state == '82' || scope.row.state == '80'" @click="deleteItem(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="total">
        <div class="agree">
          <p>单数合计：</p>
          <p>{{ policycount }}</p>
        </div>
        <div class="agree">
          <p>保费合计：</p>
          <p>{{ sumprem }}</p>
        </div>
        <div class="agree">
          <p>标保：</p>
          <p>{{ sumfyp20 }}</p>
        </div>
        <div class="agree">
          <p>折算系数后标保：</p>
          <p>{{ coefficientsumfyp20 }}</p>
        </div>
      </div>
      <div style="margin-top: 20px">
        <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize" :current-page="pageNum" @current-change="pageClick">
        </el-pagination>
      </div>
    </div>
    <!-- 录入保单弹窗 -->
    <el-dialog title="新建" :visible.sync="addNoticeDialogVisible" :before-close="handleClose" :close-on-click-modal="false" class="el-dialog-box">
      <div class="" style="position: relative">
        <div class="nav-title">保单信息</div>
        <div class="search-box clearfix">
          <div class="common-select">
            <div class="select-title filtitle ">出单日期</div>
            <div class="select-content filContent">
              <el-date-picker class="el-date-picker-sigle" v-model="inSelectTime" value-format="yyyy-MM-dd" @change="changeDate" type="date" align="right" size="mini" :disabled="disabled">
              </el-date-picker>
            </div>
          </div>

          <div class="common-select">
            <div class="select-title filtitle" style="
               
                color: rgb(255, 255, 255);
                background: rgb(220, 34, 13);
                border-color: rgb(220, 34, 13);
              ">
              保单号
            </div>
            <div class="select-content filContent " style="
             
                border-color: rgb(220, 34, 13);
              ">
              <el-input class="el-input-inners" v-model="incontno" align="right" size="mini" placeholder="请输入正确的保单号" clearable></el-input>
            </div>
          </div>
          <div class="common-select">
            <div class="search-btn" @click="contnoSearch">查询</div>
          </div>
        </div>
        <div class="search-box clearfix">
          <div class="common-select">
            <div class="select-title filtitle">保险公司</div>
            <div class="select-content filContent">
              <el-autocomplete class="el-input-inners" v-model="insorganNamecode" :trigger-on-focus="false" :fetch-suggestions="querySearch" size="mini" placeholder="" @select="insorganNameSelect" :disabled="disabled" clearable>
              </el-autocomplete>
            </div>
          </div>
          <div class="common-select" style="width: 50%">
            <div class="select-title filtitle">险种名称</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="inmainriskcode" size="mini" placeholder="" :disabled="disabled" @change="inmainriskSelect" popper-class="xianSelect">
                <el-option v-for="(item, index) in productList" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="search-box clearfix">
          <div class="common-select">
            <div class="select-title filtitle">保险金额</div>
            <div class="select-content filContent" v-if="Amntselect">
              <el-select class="el-select-inners" v-model="insuranceAmount" size="mini" placeholder="" :disabled="disabled">
                <el-option v-for="(item, index) in insuranceAmountList" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
            <div class="select-content filContent" v-else>
              <el-input class="el-input-inners" v-model="insuranceAmount" align="right" size="mini" :disabled="disabled" clearable></el-input>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title filtitle">缴费方式</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="paymentMethod" size="mini" placeholder="" :disabled="disabled">
                <el-option v-for="(item, index) in paymentMethodList" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="common-select">
            <div class="select-title filtitle">缴费年期</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="paymentPeriod" size="mini" placeholder="" :disabled="disabled">
                <el-option v-for="(item, index) in paymentPeriodList" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title filtitle">保障期限</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="guaranteePeriod" size="mini" placeholder="" :disabled="disabled">
                <el-option v-for="(item, index) in guaranteePeriodList" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title filtitle">保费</div>
            <div class="select-content filContent">
              <el-input class="el-input-inners" v-model="premium" align="right" size="mini" :disabled="disabled" clearable></el-input>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title filtitle">保单生效日期</div>
            <div class="select-content filContent">
              <el-date-picker class="el-date-picker-sigle" v-model="ineffectiveDate" value-format="yyyy-MM-dd" type="date" :disabled="disabled" align="right" size="mini">
              </el-date-picker>
            </div>
          </div>
        </div>

        <div class="nav-title" style=" margin-top: .18rem;">投保人信息</div>
        <div class="search-box clearfix">
          <div class="common-select">
            <div class="select-title filtitle">投保人姓名</div>
            <div class="select-content filContent">
              <el-input class="el-input-inners" v-model="applicantName" align="right" size="mini" :disabled="disabled" clearable></el-input>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title filtitle">
              投保人手机号码
            </div>
            <div class="select-content filContent">
              <el-input class="el-input-inners" v-model="applicantPhone" @blur="aapChangePhone" align="right" size="mini" :disabled="disabled" clearable></el-input>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title filtitle">
              投保人证件类型
            </div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="applicantType" size="mini" placeholder="" :disabled="disabled">
                <el-option v-for="(item, index) in idList" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title filtitle">投保人证件号</div>
            <div class="select-content filContent">
              <el-input class="el-input-inners" v-model="applicantIDCard" @blur="appChangeIDCard" align="right" size="mini" :disabled="disabled" clearable></el-input>
            </div>
          </div>

          <div class="common-select">
            <div class="select-title filtitle">投保人所在省</div>
            <div class="select-content filContent">
              <el-autocomplete class="el-input-inners" v-model="applicantProvince" :trigger-on-focus="false" :fetch-suggestions="countryquerySearch" size="mini" placeholder="" @select="provinceSelect" :disabled="disabled" clearable>
              </el-autocomplete>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title filtitle">投保人所在市</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="applicantCity" @change="citySelect" size="mini" placeholder="" :disabled="disabled">
                <el-option v-for="(item, index) in appcityList" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title filtitle">投保人所在区</div>
            <div class="select-content filContent">
              <el-select class="el-select-inners" v-model="applicantRegion" size="mini" placeholder="" :disabled="disabled">
                <el-option v-for="(item, index) in appRegionList" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title filtitle">
              投保人详细地址
            </div>
            <div class="select-content filContent">
              <el-input class="el-input-inners" v-model="applicantAddress" align="right" size="mini" :disabled="disabled" clearable></el-input>
            </div>
          </div>
        </div>

        <div class="dan" v-if="!disabled">
          <div class="nav-title" style=" margin-top: .18rem;">被保人信息</div>
          <div class="search-box clearfix">
            <div class="common-select">
              <div class="select-title filtitle">
                是否是同一个人
              </div>
              <div class="select-content filContent">
                <el-select class="el-select-inners" v-model="inpeople" size="mini" @change="inpeopleSelect" placeholder="" :disabled="disabled">
                  <el-option v-for="(item, index) in ispeoplelist" :key="index" :label="item.dd_value" :value="item.dd_value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select" v-if="ispeople">
              <div class="select-title filtitle">
                投保人是被保人
              </div>
              <div class="select-content filContent">
                <el-select class="el-select-inners" v-model="relatoapp" size="mini" placeholder="" :disabled="disabled">
                  <el-option v-for="(item, index) in relatoappList" :key="index" :label="item.dd_value" :value="item.dd_key">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select" v-if="ispeople">
              <div class="select-title filtitle">被保人姓名</div>
              <div class="select-content filContent">
                <el-input class="el-input-inners" v-model="insuredName" align="right" size="mini" :disabled="disabled" clearable></el-input>
              </div>
            </div>
            <div class="common-select" v-if="ispeople">
              <div class="select-title filtitle">
                被保人手机号码
              </div>
              <div class="select-content filContent">
                <el-input class="el-input-inners" v-model="insuredPhone" @blur="insChangePhone" align="right" size="mini" :disabled="disabled" clearable></el-input>
              </div>
            </div>
            <div class="common-select" v-if="ispeople">
              <div class="select-title filtitle">
                被保人证件类型
              </div>
              <div class="select-content filContent">
                <el-select class="el-select-inners" v-model="insuredType" @change="changeType" size="mini" placeholder="" :disabled="disabled">
                  <el-option v-for="(item, index) in idList" :key="index" :label="item.dd_value" :value="item.dd_key">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select" v-if="ispeople">
              <div class="select-title filtitle">
                被保人证件号
              </div>
              <div class="select-content filContent">
                <el-input class="el-input-inners" v-model="insuredIDCard" @blur="insChangeIDCard" align="right" size="mini" :disabled="disabled" clearable></el-input>
              </div>
            </div>
          </div>
          <div class="search-box clearfix" v-if="inoType">
            <div class="common-select">
              <div class="select-title filtitle">出生日期</div>
              <div class="select-content filContent">
                <el-date-picker class="el-date-picker-sigle" v-model="birthData" value-format="yyyy-MM-dd" type="date" :disabled="disabled" align="right" size="mini">
                </el-date-picker>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title filtitle">性别</div>
              <div class="select-content filContent">
                <el-select class="el-select-inners" v-model="insex" size="mini" placeholder="" :disabled="disabled">
                  <el-option v-for="(item, index) in editSexList" :key="index" :label="item.dd_value" :value="item.dd_key">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="search-box clearfix" v-if="ispeople">
            <div class="common-select">
              <div class="select-title filtitle">
                被保人所在省
              </div>
              <div class="select-content filContent">
                <el-autocomplete class="el-input-inners" v-model="insuredProvince" :trigger-on-focus="false" :fetch-suggestions="countryquerySearch" size="mini" placeholder="" @select="inprovinceSelect" :disabled="disabled" clearable>
                </el-autocomplete>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title filtitle">
                被保人所在市
              </div>
              <div class="select-content filContent">
                <el-select class="el-select-inners" v-model="insuredCity" @change="incitySelect" size="mini" placeholder="" :disabled="disabled">
                  <el-option v-for="(item, index) in incityList" :key="index" :label="item.dd_value" :value="item.dd_key">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title filtitle">
                被保人所在区
              </div>
              <div class="select-content filContent">
                <el-select class="el-select-inners" v-model="insuredRegion" size="mini" placeholder="" :disabled="disabled">
                  <el-option v-for="(item, index) in inRegionList" :key="index" :label="item.dd_value" :value="item.dd_key">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title filtitle">
                被保人详细地址
              </div>
              <div class="select-content filContent">
                <el-input class="el-input-inners" v-model="insuredAddress" align="right" size="mini" :disabled="disabled" clearable></el-input>
              </div>
            </div>
          </div>
        </div>

        <div class="more" v-if="disabled">
          <div v-for="(item, index) in moreBaodan" :key="index">
            <div class="nav-title" style=" margin-top: .18rem;" v-if="moreBaodan.length>1">被保人信息【{{item.titleNum }}】</div>
            <div class="nav-title" v-else>被保人信息{{item.titleNum }}</div>
            <div class="search-box clearfix">
              <div class="common-select">
                <div class="select-title filtitle">
                  是否是同一个人
                </div>
                <div class="select-content filContent">
                  <el-select class="el-select-inners" v-model="item.inpeople" size="mini" @change="inpeopleSelect" placeholder="" :disabled="disabled">
                    <el-option v-for="(item, index) in ispeoplelist" :key="index" :label="item.dd_value" :value="item.dd_value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="common-select" v-if="item.ispeople">
                <div class="select-title filtitle">
                  投保人是被保人
                </div>
                <div class="select-content filContent">
                  <el-select class="el-select-inners" v-model="item.relatoapp" size="mini" placeholder="" :disabled="disabled">
                    <el-option v-for="(item, index) in relatoappList" :key="index" :label="item.dd_value" :value="item.dd_key">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="common-select" v-if="item.ispeople">
                <div class="select-title filtitle">
                  被保人姓名
                </div>
                <div class="select-content filContent">
                  <el-input class="el-input-inners" v-model="item.insname" align="right" size="mini" :disabled="disabled" clearable></el-input>
                </div>
              </div>
              <div class="common-select" v-if="item.ispeople">
                <div class="select-title filtitle">
                  被保人手机号码
                </div>
                <div class="select-content filContent">
                  <el-input class="el-input-inners" v-model="item.insphone" @blur="insChangePhone" align="right" size="mini" :disabled="disabled" clearable></el-input>
                </div>
              </div>
              <div class="common-select" v-if="item.ispeople">
                <div class="select-title filtitle">
                  被保人证件类型
                </div>
                <div class="select-content filContent">
                  <el-select class="el-select-inners" v-model="item.insidnotype" @change="changeType" size="mini" placeholder="" :disabled="disabled">
                    <el-option v-for="(item, index) in idList" :key="index" :label="item.dd_value" :value="item.dd_key">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="common-select" v-if="item.ispeople">
                <div class="select-title filtitle">
                  被保人证件号
                </div>
                <div class="select-content filContent">
                  <el-input class="el-input-inners" v-model="item.insidno" @blur="insChangeIDCard" align="right" size="mini" :disabled="disabled" clearable></el-input>
                </div>
              </div>
            </div>
            <div class="search-box clearfix" v-if="inoType">
              <div class="common-select">
                <div class="select-title filtitle">出生日期</div>
                <div class="select-content filContent">
                  <el-date-picker class="el-date-picker-sigle" v-model="item.birthData" value-format="yyyy-MM-dd" type="date" :disabled="disabled" align="right" size="mini">
                  </el-date-picker>
                </div>
              </div>
              <div class="common-select">
                <div class="select-title filtitle">性别</div>
                <div class="select-content filContent">
                  <el-select class="el-select-inners" v-model="item.insex" size="mini" placeholder="" :disabled="disabled">
                    <el-option v-for="(item, index) in editSexList" :key="index" :label="item.dd_value" :value="item.dd_key">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="search-box clearfix" v-if="item.ispeople">
              <div class="common-select">
                <div class="select-title filtitle">
                  被保人所在省
                </div>
                <div class="select-content filContent">
                  <el-autocomplete class="el-input-inners" v-model="item.insprovincename" :trigger-on-focus="false" :fetch-suggestions="countryquerySearch" size="mini" placeholder="" @select="inprovinceSelect" :disabled="disabled" clearable>
                  </el-autocomplete>
                </div>
              </div>
              <div class="common-select">
                <div class="select-title filtitle">
                  被保人所在市
                </div>
                <div class="select-content filContent">
                  <el-select class="el-select-inners" v-model="item.inscityname" @change="incitySelect" size="mini" placeholder="" :disabled="disabled">
                    <el-option v-for="(item, index) in incityList" :key="index" :label="item.dd_value" :value="item.dd_key">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="common-select">
                <div class="select-title filtitle">
                  被保人所在区
                </div>
                <div class="select-content filContent">
                  <el-select class="el-select-inners" v-model="item.inscountryname" size="mini" placeholder="" :disabled="disabled">
                    <el-option v-for="(item, index) in inRegionList" :key="index" :label="item.dd_value" :value="item.dd_key">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="common-select">
                <div class="select-title filtitle">
                  被保人详细地址
                </div>
                <div class="select-content filContent">
                  <el-input class="el-input-inners" v-model="item.insaddress" align="right" size="mini" :disabled="disabled" clearable></el-input>
                </div>
              </div>
            </div>
          </div>
          <!-- </template> -->
        </div>
      </div>

      <div class="nav-title" style=" margin-top: .18rem;">资源来源</div>
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title filtitle">渠道类型</div>
          <div class="select-content filContent">
            <el-select class="el-select-inners" v-model="channelValue" size="mini" @change="channelSelect" placeholder="" clearable>
              <el-option v-for="(item, index) in channelList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="common-select" v-show="isSource">
          <div class="select-title filtitle">流量来源</div>
          <div class="select-content filContent">
            <el-select class="el-select-inners" v-model="sourceValue" size="mini" placeholder="" clearable>
              <el-option v-for="(item, index) in sourceList" :key="index" :label="item.dd_value" :value="item.dd_value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <div class="search-box clearfix"  style="display: none;">
        <div class="common-select">
          <div class="select-title filtitle">理财资源来源</div>
          <div class="select-content filContent">
            <el-select class="el-select-inners" v-model="resourceTypeValue" size="mini"  placeholder="" clearable>
              <el-option v-for="(item, index) in resourceTypeList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- <div class="common-select" v-show="isSource">
          <div class="select-title filtitle">流量来源</div>
          <div class="select-content filContent">
            <el-select class="el-select-inners" v-model="sourceValue" size="mini" placeholder="" clearable>
              <el-option v-for="(item, index) in sourceList" :key="index" :label="item.dd_value" :value="item.dd_value">
              </el-option>
            </el-select>
          </div>
        </div> -->
      </div>

      <div class="dialog-footer">

        <div class="search-btn" style="
            background: #fff;
            border: 1px solid rgba(221, 221, 221, 1);
            color: #686868;
          " @click="hideaddNoticeDialogVisible">
          取消
        </div>
        <div class="search-btn" @click="insertItem">确定</div>
      </div>
    </el-dialog>

    <!-- 多个保单下载弹窗 -->
    <el-dialog title="电子保单列表" :visible.sync="dialogTableVisible" class="bao_dialog">
      <div class="download-list" v-for="(item, index) in gridData" :key="index">
        <p>
          {{ index + 1 }}.<a :href="item.policyurl" target="_blank">&nbsp; 下载</a>
        </p>
      </div>
    </el-dialog>
    <!-- 查看详情弹窗 -->
    <view-details :datas="detailObj" :showEditPopupDialogVisible.sync="showEditPopupDialogVisible" @updateVisible="updateVisibleId"></view-details>
  </div>
</template>
<script>
import clinchdeal from "./clinchdeal";
import viewDetails from "../../../components/viewDetails.vue";
export default {
  mixins: [clinchdeal],
  components: {
    viewDetails,
  },
  methods: {
    updateVisibleId(e) {
      this.showEditPopupDialogVisible = e;
    },
  },
};
</script>


<style scoped>
.chenckList {
  display: flex;
  justify-content: right;
}

.table-box .search-btn {
  width: auto;
  padding: 0.01rem 0.18rem;
  margin-bottom: 0.15rem;
  background: #fff;
  border: 1px solid #dc220d;
  color: #dc220d;
}
</style>
<style>
.container-other {
  display: flex;
}

.nav-sidebar {
  width: 2.1rem;
  height: calc(100vh - 0.56rem);
  box-sizing: border-box;
}

.nav-sidebar .menu-common {
  width: 100%;
}

.nav-content {
  width: calc(100% - 2.1rem);
}

.total {
  margin-top: 0.3rem;
}

.agree {
  height: 0.35rem;
  line-height: 0.35rem;
  display: flex;
  padding-left: 6px;
  color: rgba(151, 151, 151, 1);
  font-size: 13px;
}

.agree p:first-child {
  width: 1.5rem;
  text-align: left;
}

.agree p:last-child {
  width: 2.5rem;
  text-align: left;
}

.table-box {
  padding: 0.15rem 0.3rem;
}

.el-dialog-box .el-dialog {
  margin-top: 8vh !important;
  width: 90%;
}

.el-dialog-box .el-dialog__body {
  /* padding-top: 0; */
}

.nav-title {
  /* margin-top: 0.2rem; */
  padding: 0px 5px;
  border-left: 4px solid #dc240f;
  font-size: 0.16rem;
}

.download-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #dddddd;
  color: #282828;
  font-size: 0.14rem;
}

.download-list p a {
  color: #979797;
}
.el-table tr {
  height: 0.3rem !important;
}
</style>
