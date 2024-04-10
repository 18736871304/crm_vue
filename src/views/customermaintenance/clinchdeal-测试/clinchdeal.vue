<template>
  <div>
    <div class="" style="position: relative; padding: 0.3rem;">
      <div class="nav-title">保单信息</div>
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">投保日期</div>
          <div class="select-content" style="height: 0.3rem; width: calc(100% - 1.38rem); border: none">
            <el-date-picker class="el-date-picker-sigle" v-model="inSelectTime" value-format="yyyy-MM-dd"
              @change="changeDate" type="date" align="right" size="mini">
            </el-date-picker>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title" style=" width: 1.38rem; ">
            保单号
          </div>
          <div class="select-content" style=" width: calc(100% - 1.38rem);">
            <el-input class="el-input-inners" v-model="incontno" align="right" size="mini" placeholder="请输入正确的保单号"
              clearable></el-input>
          </div>
        </div>
        <!-- <div class="common-select">
            <div class="search-btn" @click="contnoSearch">查询</div>
          </div> -->
      </div>
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">保险公司</div>
          <!-- <div class="select-content" style="width: calc(100% - 1.38rem)" >
            <el-input class="el-input-inners" v-model="insorganNamecode" align="right" size="mini" placeholder="请输入保险公司" clearable></el-input>
          </div> -->
          <div class="select-content" style="width: calc(100% - 1.38rem)">
            <el-autocomplete class="el-input-inners" v-model="insorganNamecode" :trigger-on-focus="false"
              :fetch-suggestions="querySearch" size="mini" placeholder="请输入保险公司" @select="insorganNameSelect" clearable>
            </el-autocomplete>
          </div>
        </div>
        <div class="common-select" style="width: 48%">
          <div class="select-title" style="width: 1.3rem">险种名称</div>


          <div class="select-content" style="width: calc(100% - 1.38rem)" >
            <el-input class="el-input-inners" v-model="inmainriskcode" align="right" size="mini" placeholder="请输入险种名称" clearable></el-input>
          </div>
          <!-- <div class="select-content" style="width: calc(100% - 1.3rem); height: 0.3rem; border: none">
            <el-select class="el-select-inners" v-model="inmainriskcode" size="mini" placeholder=""
              @change="inmainriskSelect" popper-class="xianSelect">
              <el-option v-for="(item, index) in productList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div> -->
        </div>
      </div>
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">保险金额</div>
 
          <div class="select-content" style="width: calc(100% - 1.38rem)" >
            <el-input class="el-input-inners" v-model="insuranceAmount" align="right" size="mini" placeholder="请输入保险金额" clearable></el-input>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">缴费方式</div>

          <div class="select-content" style="width: calc(100% - 1.38rem)" >
            <el-input class="el-input-inners" v-model="paymentMethod" align="right" size="mini" placeholder="请输入缴费方式" clearable></el-input>
          </div>

        </div>

        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">缴费年期</div>


          <div class="select-content" style="width: calc(100% - 1.38rem)" >
            <el-input class="el-input-inners" v-model="paymentPeriod" align="right" size="mini" placeholder="请输入缴费年期" clearable></el-input>
          </div>

        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">保障期限</div>

          <div class="select-content" style="width: calc(100% - 1.38rem)" >
            <el-input class="el-input-inners" v-model="guaranteePeriod" align="right" size="mini" placeholder="请输入保障期限" clearable></el-input>
          </div>

        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">保费</div>
          <div class="select-content" style="width: calc(100% - 1.38rem)">
            <el-input class="el-input-inners" v-model="premium" align="right" size="mini" placeholder="请输入保费" clearable></el-input>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">保单生效日期</div>
          <div class="select-content" style="height: 0.3rem; width: calc(100% - 1.38rem); border: none">
            <el-date-picker class="el-date-picker-sigle" v-model="ineffectiveDate" value-format="yyyy-MM-dd" type="date"
              align="right" size="mini">
            </el-date-picker>
          </div>
        </div>
      </div>

      <div class="nav-title">投保人信息</div>
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">投保人姓名</div>
          <div class="select-content" style="width: calc(100% - 1.38rem)">
            <el-input class="el-input-inners" v-model="applicantName" align="right" size="mini" placeholder="请输入投保人姓名" clearable></el-input>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">
            投保人手机号码
          </div>
          <div class="select-content" style="width: calc(100% - 1.38rem)">
            <el-input class="el-input-inners" v-model="applicantPhone" @blur="aapChangePhone" align="right" size="mini"  placeholder="请输入投保人手机号"
              clearable></el-input>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">
            投保人证件类型
          </div>
          <div class="select-content" style="width: calc(100% - 1.38rem); height: 0.3rem; border: none">
            <el-select class="el-select-inners" v-model="applicantType" size="mini" placeholder="请输入投保人证件类型">
              <el-option v-for="(item, index) in idList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">投保人证件号</div>
          <div class="select-content" style="width: calc(100% - 1.38rem)">
            <el-input class="el-input-inners" v-model="applicantIDCard" align="right" size="mini" placeholder="请输入投保人证件号" clearable></el-input>
          </div>
        </div>

        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">投保人所在省</div>
          <div class="select-content" style="width: calc(100% - 1.38rem)">
            <el-autocomplete class="el-input-inners" v-model="applicantProvince" :trigger-on-focus="false"
              :fetch-suggestions="countryquerySearch" size="mini" placeholder="" @select="provinceSelect" clearable>
            </el-autocomplete>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">投保人所在市</div>
          <div class="select-content" style="width: calc(100% - 1.38rem); height: 0.3rem; border: none">
            <el-select class="el-select-inners" v-model="applicantCity" @change="citySelect" size="mini" placeholder="">
              <el-option v-for="(item, index) in appcityList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">投保人所在区</div>
          <div class="select-content" style="width: calc(100% - 1.38rem); height: 0.3rem; border: none">
            <el-select class="el-select-inners" v-model="applicantRegion" size="mini" placeholder="">
              <el-option v-for="(item, index) in appRegionList" :key="index" :label="item.dd_value" :value="item.dd_key">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.38rem">
            投保人详细地址
          </div>
          <div class="select-content" style="width: calc(100% - 1.38rem)">
            <el-input class="el-input-inners" v-model="applicantAddress" align="right" size="mini" clearable></el-input>
          </div>
        </div>
      </div>

      <div class="dan" v-if="!disabled">
        <div class="nav-title">被保人信息</div>
        <div class="search-box clearfix">
          <div class="common-select">
            <div class="select-title" style="width: 1.38rem">
              是否是同一个人
            </div>
            <div class="select-content" style="
                  width: calc(100% - 1.38rem);
                  height: 0.3rem;
                  border: none;
                ">
              <el-select class="el-select-inners" v-model="inpeople" size="mini" @change="inpeopleSelect" placeholder="">
                <el-option v-for="(item, index) in ispeoplelist" :key="index" :label="item.dd_value"
                  :value="item.dd_value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select" v-if="ispeople">
            <div class="select-title" style="width: 1.38rem">
              投保人是被保人
            </div>
            <div class="select-content" style="
                  width: calc(100% - 1.38rem);
                  height: 0.3rem;
                  border: none;
                ">
              <el-select class="el-select-inners" v-model="relatoapp" size="mini" placeholder="">
                <el-option v-for="(item, index) in relatoappList" :key="index" :label="item.dd_value"
                  :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select" v-if="ispeople">
            <div class="select-title" style="width: 1.38rem">被保人姓名</div>
            <div class="select-content" style="width: calc(100% - 1.38rem)">
              <el-input class="el-input-inners" v-model="insuredName" align="right" size="mini" clearable placeholder="请输入被保人姓名"></el-input>
            </div>
          </div>
          <div class="common-select" v-if="ispeople">
            <div class="select-title" style="width: 1.38rem">
              被保人手机号码
            </div>
            <div class="select-content" style="width: calc(100% - 1.38rem)">
              <el-input class="el-input-inners" v-model="insuredPhone" align="right" size="mini" clearable  placeholder="请输入被保人手机号"></el-input>
            </div>
          </div>
          <div class="common-select" v-if="ispeople">
            <div class="select-title" style="width: 1.38rem">
              被保人证件类型
            </div>
            <div class="select-content" style="
                  width: calc(100% - 1.38rem);
                  height: 0.3rem;
                  border: none;
                ">
              <el-select class="el-select-inners" v-model="insuredType" @change="changeType" size="mini" placeholder="请输入被保人证件类型">
                <el-option v-for="(item, index) in idList" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select" v-if="ispeople">
            <div class="select-title" style="width: 1.38rem">
              被保人证件号
            </div>
            <div class="select-content" style="width: calc(100% - 1.38rem)">
              <el-input class="el-input-inners" v-model="insuredIDCard" align="right" size="mini" clearable placeholder="请输入被保人证件号"></el-input>
            </div>
          </div>
        </div>
        <div class="search-box clearfix" v-if="inoType">
          <div class="common-select">
            <div class="select-title" style="width: 1.38rem">出生日期</div>
            <div class="select-content" style="
                  height: 0.3rem;
                  width: calc(100% - 1.38rem);
                  border: none;
                ">
              <el-date-picker class="el-date-picker-sigle" v-model="birthData" value-format="yyyy-MM-dd" type="date"
                align="right" size="mini">
              </el-date-picker>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title" style="width: 1.38rem">性别</div>
            <div class="select-content" style="
                  width: calc(100% - 1.38rem);
                  height: 0.3rem;
                  border: none;
                ">
              <el-select class="el-select-inners" v-model="insex" size="mini" placeholder="">
                <el-option v-for="(item, index) in editSexList" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="search-box clearfix" v-if="ispeople">
          <div class="common-select">
            <div class="select-title" style="width: 1.38rem">
              被保人所在省
            </div>
            <div class="select-content" style="width: calc(100% - 1.38rem)">
              <el-autocomplete class="el-input-inners" v-model="insuredProvince" :trigger-on-focus="false"
                :fetch-suggestions="countryquerySearch" size="mini" placeholder="" @select="inprovinceSelect" clearable>
              </el-autocomplete>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title" style="width: 1.38rem">
              被保人所在市
            </div>
            <div class="select-content" style="
                  width: calc(100% - 1.38rem);
                  height: 0.3rem;
                  border: none;
                ">
              <el-select class="el-select-inners" v-model="insuredCity" @change="incitySelect" size="mini" placeholder="">
                <el-option v-for="(item, index) in incityList" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title" style="width: 1.38rem">
              被保人所在区
            </div>
            <div class="select-content" style="
                  width: calc(100% - 1.38rem);
                  height: 0.3rem;
                  border: none;
                ">
              <el-select class="el-select-inners" v-model="insuredRegion" size="mini" placeholder="">
                <el-option v-for="(item, index) in inRegionList" :key="index" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title" style="width: 1.38rem">
              被保人详细地址
            </div>
            <div class="select-content" style="width: calc(100% - 1.38rem)">
              <el-input class="el-input-inners" v-model="insuredAddress" align="right" size="mini" clearable></el-input>
            </div>
          </div>
        </div>
      </div>

      <div class="more" v-if="disabled">
        <!-- <template v-for="(it,numb) in moreBaodanNum" >  -->
        <div v-for="(item, index) in moreBaodan" :key="index">
          <div class="nav-title" v-if="moreBaodan.length > 1">被保人信息【{{ item.titleNum }}】</div>
          <div class="nav-title" v-else>被保人信息{{ item.titleNum }}</div>
          <div class="search-box clearfix">
            <div class="common-select">
              <div class="select-title" style="width: 1.38rem">
                是否是同一个人
              </div>
              <div class="select-content" style="
                    width: calc(100% - 1.38rem);
                    height: 0.3rem;
                    border: none;
                  ">
                <el-select class="el-select-inners" v-model="item.inpeople" size="mini" @change="inpeopleSelect"
                  placeholder="">
                  <el-option v-for="(item, index) in ispeoplelist" :key="index" :label="item.dd_value"
                    :value="item.dd_value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select" v-if="item.ispeople">
              <div class="select-title" style="width: 1.38rem">
                投保人是被保人
              </div>
              <div class="select-content" style="
                    width: calc(100% - 1.38rem);
                    height: 0.3rem;
                    border: none;
                  ">
                <el-select class="el-select-inners" v-model="item.relatoapp" size="mini" placeholder="">
                  <el-option v-for="(item, index) in relatoappList" :key="index" :label="item.dd_value"
                    :value="item.dd_key">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select" v-if="item.ispeople">
              <div class="select-title" style="width: 1.38rem">
                被保人姓名
              </div>
              <div class="select-content" style="width: calc(100% - 1.38rem)">
                <el-input class="el-input-inners" v-model="item.insname" align="right" size="mini" clearable></el-input>
              </div>
            </div>
            <div class="common-select" v-if="item.ispeople">
              <div class="select-title" style="width: 1.38rem">
                被保人手机号码
              </div>
              <div class="select-content" style="width: calc(100% - 1.38rem)">
                <el-input class="el-input-inners" v-model="item.insphone" @blur="insChangePhone" align="right" size="mini"
                  clearable></el-input>
              </div>
            </div>
            <div class="common-select" v-if="item.ispeople">
              <div class="select-title" style="width: 1.38rem">
                被保人证件类型
              </div>
              <div class="select-content" style="
                    width: calc(100% - 1.38rem);
                    height: 0.3rem;
                    border: none;
                  ">
                <el-select class="el-select-inners" v-model="item.insidnotype" @change="changeType" size="mini"
                  placeholder="">
                  <el-option v-for="(item, index) in idList" :key="index" :label="item.dd_value" :value="item.dd_key">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select" v-if="item.ispeople">
              <div class="select-title" style="width: 1.38rem">
                被保人证件号
              </div>
              <div class="select-content" style="width: calc(100% - 1.38rem)">
                <el-input class="el-input-inners" v-model="item.insidno" @blur="insChangeIDCard" align="right" size="mini"
                  clearable></el-input>
              </div>
            </div>
          </div>
          <div class="search-box clearfix" v-if="inoType">
            <div class="common-select">
              <div class="select-title" style="width: 1.38rem">出生日期</div>
              <div class="select-content" style="
                    height: 0.3rem;
                    width: calc(100% - 1.38rem);
                    border: none;
                  ">
                <el-date-picker class="el-date-picker-sigle" v-model="item.birthData" value-format="yyyy-MM-dd"
                  type="date" align="right" size="mini">
                </el-date-picker>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.38rem">性别</div>
              <div class="select-content" style="
                    width: calc(100% - 1.38rem);
                    height: 0.3rem;
                    border: none;
                  ">
                <el-select class="el-select-inners" v-model="item.insex" size="mini" placeholder="">
                  <el-option v-for="(item, index) in editSexList" :key="index" :label="item.dd_value"
                    :value="item.dd_key">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="search-box clearfix" v-if="item.ispeople">
            <div class="common-select">
              <div class="select-title" style="width: 1.38rem">
                被保人所在省
              </div>
              <div class="select-content" style="width: calc(100% - 1.38rem)">
                <el-autocomplete class="el-input-inners" v-model="item.insprovincename" :trigger-on-focus="false"
                  :fetch-suggestions="countryquerySearch" size="mini" placeholder="" @select="inprovinceSelect" clearable>
                </el-autocomplete>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.38rem">
                被保人所在市
              </div>
              <div class="select-content" style="
                    width: calc(100% - 1.38rem);
                    height: 0.3rem;
                    border: none;
                  ">
                <el-select class="el-select-inners" v-model="item.inscityname" @change="incitySelect" size="mini"
                  placeholder="">
                  <el-option v-for="(item, index) in incityList" :key="index" :label="item.dd_value" :value="item.dd_key">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.38rem">
                被保人所在区
              </div>
              <div class="select-content" style="
                    width: calc(100% - 1.38rem);
                    height: 0.3rem;
                    border: none;
                  ">
                <el-select class="el-select-inners" v-model="item.inscountryname" size="mini" placeholder="">
                  <el-option v-for="(item, index) in inRegionList" :key="index" :label="item.dd_value"
                    :value="item.dd_key">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="common-select">
              <div class="select-title" style="width: 1.38rem">
                被保人详细地址
              </div>
              <div class="select-content" style="width: calc(100% - 1.38rem)">
                <el-input class="el-input-inners" v-model="item.insaddress" align="right" size="mini"
                  clearable></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="dialog-footer">
      <div class="search-btn" @click="insertItem">确定</div>
      <div class="search-btn" style="
            background: #fff;
            border: 1px solid rgba(221, 221, 221, 1);
            color: #686868;
          " @click="hideaddNoticeDialogVisible">
        取消
      </div>
    </div>

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
  padding: 0.3rem;
}

.el-dialog-box .el-dialog {
  margin-top: 8vh !important;
  width: 90%;
}

.el-dialog-box .el-dialog__body {
  padding-top: 0;
}

.nav-title {
  margin-top: 0.2rem;
  padding: 0px 5px;
  border-left: 4px solid #dc240f;
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

.dialog-footer {
  padding: 0.2rem 0.9rem 0;
}

.nav-title {
  border: 0;
}
</style>
