<template>
  <!-- 查看详情弹窗 -->
  <el-dialog
    title="查看详情"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    custom-class="view-detail"
    width="70%" append-to-body
  >
    <div class="el-dialog-detail" style="position: relative">
      <div class="header" style="border-bottom: none">
        <div class="detail-title" style="margin-top: 0">保单信息</div>



        <div class="aggbox"   v-if="detailObj.xbcontno">
          <div class="agree">
            <p>首年保单号：</p>
            <p>{{ detailObj.xbcontno }}</p>
          </div>
          <div class="agree">
            <p>出单日期：</p>
            <p>{{ detailObj.xbpaytime }}</p>
          </div>
          <div class="agree">
            <p>保费：</p>
            <p>{{ detailObj.xbprem }}</p>
          </div>

        </div>





        <div class="aggbox"  v-if="detailObj.xbcontno">
          <div class="agree">
            <p>第二年保单号：</p>
            <p>{{ detailObj.editContno }}</p>
          </div>
          <div class="agree">
            <p>出单日期：</p>
            <p>{{ detailObj.editSelectTime }}</p>
          </div>
          <div class="agree">
            <p>保费：</p>
            <p>{{ detailObj.editPremium }}</p>
          </div>
        </div>

        <div class="aggbox" v-if="!detailObj.xbcontno">
          <div class="agree">
            <p>出单日期：</p>
            <p>{{ detailObj.editSelectTime }}</p>
          </div>
        </div>
        <div class="aggbox">
          <div class="agree">
            <p>出单业务员：</p>
            <p>{{ detailObj.userName }}</p>
          </div>
          <div class="agree">
            <p>服务人员：</p>
            <p>{{ detailObj.userName1 }}</p>
          </div>
        </div>

        <div class="aggbox"  v-if="!detailObj.xbcontno">
          <div class="agree">
            <p>保单号：</p>
            <p style="width: 8.5rem">{{ detailObj.editContno }}</p>
          </div>
        </div>

        <div class="aggbox">
          <div class="agree">
            <p>保单状态：</p>
            <p>{{ detailObj.editPolicyStatus }}</p>
          </div>
          <div class="agree">
            <p>回访状态：</p>
            <p>{{ detailObj.editvisitstate }}</p>
          </div>
        </div>

        <div class="aggbox">
          <div class="agree">
            <p>保险公司：</p>
            <p>{{ detailObj.editorganNamecode }}</p>
          </div>
          <div class="agree">
            <p>险种名称：</p>
            <p style="width: auto">{{ detailObj.editriskcode }}</p>
          </div>
        </div>
        <div class="aggbox">
          <div class="agree">
            <p>保险金额：</p>
            <p>{{ detailObj.editUranceAmount }}</p>
          </div>
          <div class="agree">
            <p>缴费方式：</p>
            <p>{{ detailObj.editPaymentMethod }}</p>
          </div>
          <div class="agree">
            <p>缴费年期：</p>
            <p style="width: 1.5rem">{{ detailObj.editPaymentPeriod }}</p>
          </div>
        </div>
        <div class="aggbox">
          <div class="agree">
            <p>保障期限：</p>
            <p>{{ detailObj.editGuaranteePeriod }}</p>
          </div>
        </div>
        <div class="aggbox">
          <div class="agree" v-if="!detailObj.xbcontno">
            <p>保费：</p>
            <p>{{ detailObj.editPremium }}</p>
          </div>
          <div class="agree">
            <p>保单生效日期：</p>
            <p>{{ detailObj.editinSelectTime }}</p>
          </div>
        </div>
        <div class="detail-title">投保人信息</div>
        <div class="aggbox">
          <div class="agree">
            <p>投保人姓名：</p>
            <p>{{ detailObj.editName }}</p>
          </div>
          <div class="agree">
            <p>投保人性别：</p>
            <p>{{ detailObj.editSex }}</p>
          </div>
          <div class="agree">
            <p>投保人生日：</p>
            <p>{{ detailObj.editBirthdy }}</p>
          </div>
        </div>
        <div class="aggbox">
          <div class="agree">
            <p>投保人详细地址：</p>
            <p style="width: 8.5rem">
              {{ detailObj.editprovincename }}{{ detailObj.editcityname
              }}{{ detailObj.editcountryname }}{{ detailObj.editAddress }}
            </p>
          </div>
        </div>

        <div v-for="(item, index) in editList" :key="index">
          <div class="detail-title" v-if="editList.length == 1">被保人信息</div>
          <div class="detail-title" v-else>
            被保人信息【{{ item.titleNum }}】
          </div>
          <div class="aggbox">
            <div class="agree">
              <p>投保人是被保人：</p>
              <p>{{ item.relaname }}</p>
            </div>
          </div>
          <div class="aggbox">
            <div class="agree">
              <p>被保人姓名：</p>
              <p>{{ item.insname }}</p>
            </div>
            <div class="agree">
              <p>被保人性别：</p>
              <p>{{ item.inssexname }}</p>
            </div>
            <div class="agree">
              <p>被保人生日：</p>
              <p>{{ item.insbirthday }}</p>
            </div>
          </div>
          <div class="aggbox" style="padding-bottom: 0.5rem">
            <div class="agree">
              <p>被保人详细地址：</p>
              <p style="width: 8.5rem">
                {{ item.appprovincename }}{{ item.appcityname
                }}{{ item.appcountryname }}{{ item.insaddress }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "viewDetails",
  props: {
    datas: {
      // type: Array,Object,
    },
    showEditPopupDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      detailObj: {},
      editList: [],
    };
  },
  watch: {
    datas(val) {
    
      if (val.length > 1) {
        this.editList = val;

        this.editList.forEach((item, index) => {
          switch (index) {
            case 0:
              this.editList[index].titleNum = "一";
              break;

            case 1:
              this.editList[index].titleNum = "二";
              break;
            case 2:
              this.editList[index].titleNum = "三";
              break;
            case 3:
              this.editList[index].titleNum = "四";
              break;
            case 4:
              this.editList[index].titleNum = "五";
              break;
            case 5:
              this.editList[index].titleNum = "六";
              break;
            case 6:
              this.editList[index].titleNum = "七";
              break;
            case 7:
              this.editList[index].titleNum = "八";
              break;
            case 8:
              this.editList[index].titleNum = "九";
              break;
            case 9:
              this.editList[index].titleNum = "十";
              break;
            case 10:
              this.editList[index].titleNum = "十一";
              break;
          }
        });
      } else {
        this.editList = val;
      }

      this.detailObj = {
        editSelectTime: val[0].accepttime,
        userName: val[0].reusername,
        userName1: val[0].serviceusername,
        editContno: val[0].contno,
        editPolicyStatus: val[0].statename,
        editvisitstate: val[0].revisitstatename,
        editorganNamecode: val[0].insorganname,
        editriskcode: val[0].riskname,
        editUranceAmount: val[0].amnt,
        editPaymentMethod: val[0].payintvvalue,
        editPaymentPeriod: val[0].payendyearvalue,
        editGuaranteePeriod: val[0].insuyearvalue,
        editPremium: val[0].prem,
        editinSelectTime: val[0].cvalidate,
        editName: val[0].appname,
        editSex: val[0].appsexname,
        editBirthdy: val[0].appbirthday,
        editprovincename: val[0].appprovincename,
        editcityname: val[0].appcityname,
        editcountryname: val[0].appcountryname,
        editAddress: val[0].appaddress,
        editRelatoapp: val[0].relaname,
        editinName: val[0].insname,
        editinSex: val[0].inssexname,
        editinBirthdy: val[0].insbirthday,
        editinsprovincename: val[0].insprovincename,
        editinscityname: val[0].inscityname,
        editinscountryname: val[0].inscountryname,
        editinAddress: val[0].insaddress,
        channelvalue: val[0].channel,
        sourcevalue: "",

        xbcontno:val[0].xbcontno,
        xbpaytime:val[0].xbpaytime,
        xbprem:val[0].xbprem,


      };
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.showEditPopupDialogVisible;
      },
      set(val) {
        this.$emit("updateVisible", val);
      },
    },
  },
  methods: {},
};
</script>
<style>
.nav-detail {
  padding: 5px;
  margin-top: 0.2rem;
  border-bottom: 1px solid #979797;
}
.el-dialog-detail .header {
  height: auto;
  padding: 0.3rem;
  padding-top: 0.2rem;
}

.el-dialog-detail .el-input--mini {
  width: 2.5rem;
}

.el-dialog-detail .aggbox {
  height: 0.3rem;
  display: flex;
  padding-top: 0.1rem;
}

.el-dialog-detail .aggbox .agree {
  height: 0.3rem;
  line-height: 0.3rem;
  display: flex;
  padding-left: 6px;
  color: rgba(151, 151, 151, 1);
  font-size:0.13rem;
}

.agree p:first-child {
  width: 1.5rem;
  text-align: left;
}

.agree p:last-child {
  width: 2.5rem;
  text-align: left;
}

.detail-title {
  margin-top: 0.2rem;
  padding: 5px;
  border-bottom: 1px solid #979797;
}

.view-detail {
  margin-top: 8vh !important;
}
.view-detail .el-dialog__body {
  padding: 0;
}
</style>
