import $ from 'jquery';
import moment from "../../../static/js/moment.js"
import {
  getData,
  my_url,
  crm_url
} from '../../../static/js/ajax.js';
import {
  formatDate,
  getBirthdayByIDCard,
  getSexByIDCard,
  getIdCardAge
} from '../../../static/js/common.js';
export default {
  data() {
    return {
      editPopupVisible: false,
      disabled: false,
      token: '', //暂时存在
      Amntselect: true, //
      //表格参数
      addNoticeDialogVisible: false,
      tableData: [],
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      loading: false,
      //合计项
      policycount: '',
      sumprem: '',
      sumfyp20: '',
      coefficientsumfyp20: '',
      //总数据
      ReportSum: '10',
      //筛选查询
      insorganName: '', //选中保险公司
      SalesmanBox: [], //所有保险公司
      productList: [], //所有险种
      mainriskcode: '', //选中的险种名称
      selectTime: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').add(1, "days").format(
        'YYYY-MM-DD')], //出单日期
      contno: '', //保单号
      policyStatus: '40', //保单状态
      policyStatusList: '', //保单状态列表
      cusmobile: '电话号码', //显示的电话号码
      cusMobileWxno: '', //客户电话号码或者微信值
      cusname: '', //客户姓名
      cusplanid: '渠道类型', //广告计划ID
      cusplanidBatchno: '', //广告计划ID，渠道类型，批次号的值

      fuName: '业务员姓名',
      yefuName: '',
      //选择团队，和业务人员
      checkedAll: false,
      checkedAllNum: 0,
      teamDataList: [],
      userNameOptions: [],
      teamNames2: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      overviewForm: {
        teamid: '',
        userid: '',
        startDate: '',
        endDate: '',
        time: '1'
      },
      // 保单录入//修改
      moreBaodan: [{}],
      orderid: '',
      inSelectTime: moment().format('YYYY-MM-DD'), //出单日期
      incontno: '', //保单号
      insorganNamecode: '', //保险公司
      insorgancode: '', //保险公司代号
      inmainriskcode: '', //险种名称
      riskcode: '', //险种名称代号
      ineffectiveDate: moment().add(1, "days").format('YYYY-MM-DD'), //保单生效日期
      insuranceAmountList: [],
      insuranceAmount: '', //保险金额
      paymentMethodList: [],
      paymentMethod: '', //缴费方式
      paymentPeriodList: [],
      paymentPeriod: '', //缴费年期
      guaranteePeriodList: [],
      guaranteePeriod: '', //保障期限
      premium: '', //保费
      //证件类型
      idList: [{
          dd_key: "0",
          dd_value: '身份证'
        }, {
          dd_key: "7",
          dd_value: '出生证'
        }
        // , {
        //     dd_key: "8",
        //     dd_value: '其他'
        // }, {
        //     dd_key: "4",
        //     dd_value: '户口本'
        // }
      ],
      //投保人
      applicantName: '', //投保人姓名
      applicantPhone: '', //投保人手机号
      applicantType: '', //投保人证件类型
      applicantIDCard: '', //投保人证件号
      applicantProvince: '', //投保人所在省
      applicantProvinceCode: '', //省代号
      applicantCity: '', //投保人所在市
      applicantRegion: '', //投保人所在区
      applicantAddress: '', //投保人所在地址
      //被保人
      insuredName: '', //被保人姓名
      insuredPhone: '', //被保人手机号
      insuredType: '', //被保人证件类型
      insuredIDCard: '', //被保人证件号
      insuredProvince: '', //被保人所在省
      insuredProvinceCode: '', //省代号
      insuredCity: '', //被保人所在市
      insuredRegion: '', //被保人所在区
      insuredAddress: '', //被保人所在地址
      ispeoplelist: [{
        dd_value: '是'
      }, {
        dd_value: '否'
      }], //
      inpeople: '', //是否是同一个人
      ispeople: true,
      relatoappList: [{
          dd_key: "02",
          dd_value: "配偶"
        },
        {
          dd_key: "01",
          dd_value: "父母"
        },
        {
          dd_key: "03",
          dd_value: "子女"
        },
        {
          dd_key: "04",
          dd_value: "祖父母"
        }
      ],
      relatoapp: '',
      //省市区县
      provinceList: [],
      appcityList: [],
      appRegionList: [],
      incityList: [],
      inRegionList: [],

      //修改的唯一字符
      state: "",
      contserialno: "",
      appntserialno: "",
      insuredserialno: "",
      riskserialno: "",
      ismain: "",
      editmainriskcode: "",
      oldpolicyno: '',

      //查看编辑弹窗
      showEditPopupDialogVisible: false,
      detailObj: {},
      restaurants: [], //所有业务员
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
      gridData: [],
      dialogTableVisible: false,

      channelList: [],
      channelValue: '',
      sourceList: [],
      sourceValue: '',
      isSource: false,
      inoType: false, //证件类型为出生证
      birthData: '', //被保人出生日期
      insex: '', //被保人性别
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

  computed: {

  },
  watch: {
    checkedAll: function (n, o) {
      if (n) {
        this.tableData.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    isDealed: function (n, o) {
      if (!n) {
        this.drawerWidth = (this.docEl - 200) * 0.5 + ''
      } else {
        this.drawerWidth = (this.docEl - 200) * 0.75 + ''
      }
    }
  },
  mounted: function () {
    this.getTeamList(); //选择团队
    this.search(1); //搜索
    this.getcountry(); //省市区
    this.abpolisystate(); //保单状态
    this.yewu(); //所有业务员姓名
    this.insrevisitstate(); //回访状态
    this.getchannelNameList(); //渠道类型列表
    this.$nextTick(() => {
      //数据字典
      let _this = this
      this.insOrganList(); //所有保险公司
    })
  },
  methods: {
    // 查询是否有保单
    contnoSearch() {
      this.DialogVisible();
      this.orderid = '';
      var _this = this
      getData('post', my_url + '/crm/auth/getToken.do', data => {
        if (data.code == 0) {
          var body = {
            token: data.token,
            contno: (this.incontno).trim()
          }
          getData('post', crm_url + 'insure.meihualife.com/crm_web/getOnePolicy.do', data => {
            console.log(data.rows)

            for (var i = 0; i < data.rows.length; i++) {
              if (data.rows[i].relatoapp == '00') {
                this.inpeople = '是'
                data.rows[i].inpeople = '是'
                this.ispeople = false
                data.rows[i].ispeople = false
              } else {
                this.inpeople = '否'
                data.rows[i].inpeople = '否'
                this.ispeople = true
                data.rows[i].ispeople = true
                if (data.rows[i].relatoapp == '06') {
                  data.rows[i].relatoapp = "其他"
                }
                this.relatoapp = data.rows[i].relatoapp
              }
            }
            if (data.rows.length > 1) {
              this.moreBaodan = data.rows
              this.moreBaodan.forEach((item, index) => {
                switch (index) {
                  case 0:
                    this.moreBaodan[index].titleNum = '一'
                    break;

                  case 1:
                    this.moreBaodan[index].titleNum = '二'
                    break;
                  case 2:
                    this.moreBaodan[index].titleNum = '三'
                    break;
                  case 3:
                    this.moreBaodan[index].titleNum = '四'
                    break;
                  case 4:
                    this.moreBaodan[index].titleNum = '五'
                    break;
                  case 5:
                    this.moreBaodan[index].titleNum = '六'
                    break;
                  case 6:
                    this.moreBaodan[index].titleNum = '七'
                    break;
                  case 7:
                    this.moreBaodan[index].titleNum = '八'
                    break;
                  case 8:
                    this.moreBaodan[index].titleNum = '九'
                    break;
                  case 9:
                    this.moreBaodan[index].titleNum = '十'
                    break;
                  case 10:
                    this.moreBaodan[index].titleNum = '十一'
                    break;
                }
              })
              console.log(this.moreBaodan)
            } else if (data.rows.length == 1) {
              this.moreBaodan = data.rows
            } else {
              this.disabled = false
              this.$message({
                showClose: true,
                message: '此保单没有回传，需手动录入',
                duration: 3000,
                // type: 'error'
              });
            }
            var item = data.rows[0]
            if (data.total != 0) {
              this.disabled = true;
              this.orderid = item.orderid; //保单ID
              this.inSelectTime = item.accepttime;
              this.incontno = item.contno, //保单号
                this.insorganNamecode = item.insorganname; //保险公司
              this.inmainriskcode = item.riskname; //险种
              this.ineffectiveDate = item.cvalidate; //保单生效时间
              this.insuranceAmount = item.amnt; //保险金额
              this.paymentMethod = item.payintvvalue; //缴费方式
              this.paymentPeriod = item.payendyearvalue; //缴费年期
              this.guaranteePeriod = item.insuyearvalue; //保证期限
              this.premium = item.prem; //保费
              //投保人
              this.applicantName = item.appname; //投保人姓名
              this.applicantPhone = item.appphone; //投保人手机号
              if (item.appidnotype == '8') {
                item.appidnotype = "其他"
              } else if (item.appidnotype == '4') {
                item.appidnotype = "户口本"
              }
              this.applicantType = item.appidnotype; //投保人证件类型

              this.applicantIDCard = item.appidno; //投保人证件号
              this.applicantProvince = item.appprovincename; //投保人所在省
              this.applicantCity = item.appcityname; //投保人所在市
              this.applicantRegion = item.appcountryname; //投保人所在区
              this.applicantAddress = item.appaddress; //投保人所在地址
              //被保人
              // this.relatoapp = item.relaname; //父母子女配偶
              // this.insuredName = item.insname; //被保人姓名
              // this.insuredPhone = item.insphone; //被保人手机号
              // if (item.insidnotype == '8') {
              //   item.appidnotype = "其他"
              // } else if (item.insidnotype == '4') {
              //   item.appidnotype = "户口本"
              // } else if (item.insidnotype == '7') {
              //   this.inoType = true
              //   this.insex = item.inssexname
              //   this.birthData = item.insbirthday
              // }
              // this.insuredType = item.insidnotype; //被保人证件类型
              // this.insuredIDCard = item.insidno; //被保人证件号
              // this.insuredProvince = item.insprovincename; //被保人所在省
              // this.insuredCity = item.inscityname; //被保人所在市
              // this.insuredRegion = item.inscountryname; //被保人所在区
              // this.insuredAddress = item.insaddress //被保人所在地址
              // // relaname: "本人"
              // // relatoapp
              // if (item.relatoapp == '00') {
              //   this.inpeople = '是'
              //   this.ispeople = false
              // } else {
              //   this.inpeople = '否'
              //   this.ispeople = true
              //   if (item.relatoapp == '06') {
              //     item.relatoapp = "其他"
              //   }
              //   this.relatoapp = item.relatoapp
              // }

              this.channelValue = item.activitychannel;
              this.sourceValue = item.activityappname;

              _this.channelSelect()

            }


            this.inSelectTime = moment().format('YYYY-MM-DD')
            this.changeDate();

          }, body);
        }
      })
    },

    getDataAnalysis() {

    },
    //回访状态
    insrevisitstate() {
      getData('post', my_url + '/crm/common/getDictList.do', data => {
        if (data.code == 0) {
          this.visitstateList = data.dictList
        }
      }, {
        dict_type: 'insrevisitstate',
      });
    },

    //所有的省份 
    countrycreateFilter(queryString) {
      return (SalesmanBox) => {
        return (SalesmanBox.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
    },
    countryquerySearch(queryString, cb) {
      var SalesmanBox = this.provinceList;
      var results = queryString ? SalesmanBox.filter(this.countrycreateFilter(queryString)) : SalesmanBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    //投保人省市区县
    getcountry() {
      var _this = this
      getData('post', my_url + '/crm/common/getDictList.do', data => {
        if (data.code == 0) {
          // this.provinceList = data.dictList
          _this.provinceList = []
          let nameList = data.dictList;
          nameList.forEach(res => {
            _this.provinceList.push({
              "value": res.dd_value,
              "key": res.dd_key
            });
          })
        }
      }, {
        dict_type: 'province'
      });
    },

    provinceSelect(item) {
      this.applicantProvince = item.value
      this.applicantProvinceCode = item.key
      getData('post', my_url + '/crm/common/getCity.do', data => {
        if (data.code == 0) {
          this.appcityList = data.dictList
        }
      }, {
        province: this.applicantProvinceCode
      });
    },
    citySelect() {
      getData('post', my_url + '/crm/common/getCountry.do', data => {
        if (data.code == 0) {
          this.appRegionList = data.dictList
        }
      }, {
        city: this.applicantCity
      });
    },

    //被保人省市区
    inprovinceSelect(item) {
      this.insuredProvince = item.value
      this.insuredProvinceCode = item.key
      getData('post', my_url + '/crm/common/getCity.do', data => {
        if (data.code == 0) {
          this.incityList = data.dictList
        }
      }, {
        province: this.insuredProvinceCode
      });
    },
    // 所在市
    incitySelect() {
      getData('post', my_url + '/crm/common/getCountry.do', data => {
        if (data.code == 0) {
          this.inRegionList = data.dictList
        }
      }, {
        city: this.insuredCity
      });
    },

    //保单状态
    abpolisystate() {
      getData('post', my_url + '/crm/common/getDictList.do', data => {
        if (data.code == 0) {
          var array = data.dictList
          var stateList = []
          array.forEach(function (item, key) {
            if (item.dd_value == '签单成功' || item.dd_value == '犹豫期退保' || item.dd_value == '正常退保' || item
              .dd_value == '协议退保' || item.dd_value == '保单失效' || item.dd_value == '理赔终止' || item
              .dd_value == '冲正') {
              stateList.push(item)
            }
          });
          this.policyStatusList = stateList
        }
      }, {
        dict_type: 'abpolicystate'
      });
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

    //所有的保险公司  /crm/common/getAllRiskList.do
    createFilter(queryString) {
      return (SalesmanBox) => {
        return (SalesmanBox.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
    },
    querySearch(queryString, cb) {
      var SalesmanBox = this.SalesmanBox;
      var results = queryString ? SalesmanBox.filter(this.createFilter(queryString)) : SalesmanBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    insOrganList() {
      let _this = this;
      getData('post', my_url + '/crm/common/getInsOrganList.do', function (data) {
        if (data.code == 0) {
          _this.SalesmanBox = []
          let nameList = data.dictList;
          nameList.forEach(res => {
            _this.SalesmanBox.push({
              "value": res.dd_value,
              "key": res.dd_key
            });
          })
        }
      }, {});
    },
    //选择保险公司 + 显示旗下险种
    insorganNameSelect(item) {
      this.insorgancode = item.key
      let body = {
        "insorgancode": item.key
      }
      let _this = this
      getData('post', my_url + '/crm/common/getRiskList.do', function (data) {
        if (data.code == 0) {
          _this.productList = []
          _this.productList = data.dictList;
          // nameList.forEach(res => {
          //   _this.productList.push({
          //     "value": res.dd_value,
          //     "key": res.dd_key
          //   });
          // })
        }
      }, body);
    },

    //保险公司所带的保险产品
    createFilter1(queryString) {
      return (SalesmanBox) => {
        return (SalesmanBox.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
    },
    querySearch1(queryString, cb) {
      var SalesmanBox = this.productList;
      var results = queryString ? SalesmanBox.filter(this.createFilter1(queryString)) : SalesmanBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    riskSelect(item) {
      this.mainriskcode = item
      this.riskcode = item
    },
    //选择险种， 显示缴费方式
    inmainriskSelect(item) {
      this.riskcode = item;
      getData('post', my_url + '/crm/auth/getToken.do', data => {
        if (data.code == 0) {
          var data = {
            "token": data.token,
            "insorgancode": this.insorgancode,
            "riskcode": item
          }
          var body = {
            "token": data.token,
            "riskcode": item
          }
          this.token = data.token
          getData('post', crm_url + 'insure.meihualife.com/crm_web/getRiskAmntType.do', data => {
            var _this = this
            if (data.amnttype == "01") {
              _this.Amntselect = false
            } else if (data.amnttype == "02") {
              _this.Amntselect = true
              var body = {
                "token": _this.token,
                "amntid": data.amntId
              }
              getData('post', crm_url + 'insure.meihualife.com/crm_web/getAmntList.do', data => {
                if (data.code == 0) {
                  this.insuranceAmountList = data.amntList
                }
              }, body);
            } else {
              this.$message({
                showClose: true,
                message: '未录入保额配置数据，不允许录单',
                duration: 3000,
                type: 'warning'
              });
            }
          }, data);
          getData('post', crm_url + 'insure.meihualife.com/crm_web/getPayintvList.do', data => {
            if (data.code == 0) {
              this.paymentMethodList = data.payintvList
            }
          }, data);
          getData('post', crm_url + 'insure.meihualife.com/crm_web/getPayendyearList.do', data => {
            if (data.code == 0) {
              this.paymentPeriodList = data.payendyearList
            }
          }, data);
          getData('post', crm_url + 'insure.meihualife.com/crm_web/getInsureyearList.do', data => {
            if (data.code == 0) {
              this.guaranteePeriodList = data.insureyearList
            }
          }, data);

          getData('post', crm_url + 'insure.meihualife.com/crm_web/riskCheck.do', data => {
            if (data.code == 0) {

            } else {
              this.$message({
                showClose: true,
                message: data.msg,
                duration: 3000,
                type: 'warning'
              });
            }
          }, body);
        }
      });
    },

    // 筛选查询保单
    search(page) {
      this.loading = true
      var cusmobile, cuswxno = ''
      if (this.cusmobile == '电话号码') {
        cusmobile = this.cusMobileWxno.trim()
      } else {
        cuswxno = this.cusMobileWxno
      }
      var planidValue, batchnoValue, channelValue = ''
      if (this.cusplanid == '批次号') {
        batchnoValue = this.cusplanidBatchno
      } else if (this.cusplanid == '渠道类型') {
        channelValue = this.cusplanidBatchno
      } else {
        planidValue = this.cusplanidBatchno
      }
      var fuName, yeName = ''
      if (this.fuName == '业务员姓名') {
        yeName = this.yefuName
      } else {
        fuName = this.yefuName
      }
      if (this.selectTime == null) {
        this.selectTime = ['', '']
      }
      var policyStatus = ''
      if (this.policyStatus == '40') {
        policyStatus = "80','81','82','40"
      } else {
        policyStatus = this.policyStatus
      }
      getData('post', my_url + '/crm/auth/getToken.do', data => {
        if (data.code == 0) {
          var tabData = {
            "token": data.token,
            "acceptStartDate": this.selectTime[0],
            "acceptEndDate": this.selectTime[1],
            "contno": this.contno.trim(),
            "state": policyStatus, //保单状态
            "insorgancode": this.insorgancode,
            "mainriskcode": this.riskcode,
            "cusname": this.cusname,
            "cusmobile": cusmobile.trim(),
            "wxno": cuswxno,
            "planserialno": planidValue,
            "batchno": batchnoValue,
            "channel": channelValue,
            "teamid": this.overviewForm.teamid,
            "serusername": fuName,
            "reusername": yeName,
            "pageNumber": page,
            "pageSize": this.pageSize,
            "isxubao": "NOTY",
            "has_coefficient": "N"
          }
          var _this = this
          // getData('post', crm_url + 'insure.meihualife.com/crm_web/getPolicyList.do', data => {
          getData('post', crm_url + 'insure.meihualife.com/crm_web/getPolicyList_New.do', data => {
            console.log(data)
            _this.tableData = data.rows
            _this.pageTotal = data.total
            _this.loading = false
          }, tabData);
          getData('post', crm_url + 'insure.meihualife.com/crm_web/getPolicySum.do', data => {
            if (data.code == "0") {
              _this.policycount = data.sumData.policycount != undefined ? data.sumData.policycount :
                '0'
              _this.sumprem = data.sumData.sumprem != undefined ? data.sumData.sumprem : '0'
              _this.sumfyp20 = data.sumData.sumfyp20 != undefined ? data.sumData.sumfyp20 : '0'
              _this.coefficientsumfyp20 = data.sumData.coefficientsumfyp20 != undefined ? data.sumData
                .coefficientsumfyp20 : '0'
            }
          }, tabData)
        }
      });
    },
    screenReset() {
      this.insorganName = '';
      this.insorgancode = '';
      this.mainriskcode = '';
      this.riskcode = '';
      this.selectTime = '';
      this.contno = '';
      this.cusMobileWxno = '';
      this.cusname = '';
      this.cusplanidBatchno = '';
      this.overviewForm.teamid = '';
      this.overviewForm.userid = '';
      this.policyStatus = ''
      this.search(1)
    },
    //选择团队和业务人员
    resourceDeployShow() {
      this.getTeamList()
    },
    getTeamList() {
      let _this = this;
      getData('post', my_url + '/crm/auth/getTeamList.do', function (data) {
        let tempData = [];
        if (data.teamList == null || data.teamList == '') {
          _this.disTeamAll = false;
        } else {
          _this.disTeamAll = true;
        }
        _this.teamDataList = data.teamList;
      });
    },
    handleCheckChange2(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label)
      })
      this.my_list2 = teamListName.join(',');
      this.teamList2 = (checked.checkedKeys).join(',');
      this.overviewForm.teamid = this.teamList2;
    },

    my_sureOne2() {
      this.$refs.disTeam2.hide();
      this.my_list2 = '';
      this.teamList2 = '';
      this.teamNames2 = "团队选择";
      this.overviewForm.teamid = '';
      this.$refs.tree2.setCheckedKeys([]);
      this.queryflag = true;
      // this.refresh();
    },
    my_sure2() {
      let _this = this;
      this.$refs.disTeam2.hide();
      if (this.my_list2 == null || this.my_list2 == '' || this.my_list2 == '1') {
        this.queryflag = true;
        this.queryflagString = "01"
      } else {
        this.teamNames2 = this.my_list2;
        this.queryflag = false;
        this.queryflagString = "02"
      }
      //获取业务员列表
      getData('post', my_url + '/crm/auth/getUserIdNameListByTeam.do', function (data) {
        _this.userNameOptions = data.namelist
      }, {
        teamid: this.teamList2
      });
    },
    userNameChange() {
      this.queryflag = false;
      this.queryflagString = "02"
    },

    //投保人证件类型为出生证
    changeType() {
      if (this.insuredType == '7') {
        this.inoType = true
      } else {
        this.inoType = false
        this.insex = ''
        this.birthData = ''
      }
    },



    //保单录入
    //打开弹窗
    showAddNoticeDialogVisible() {
      // this.itemReset()
      this.addNoticeDialogVisible = true
    },
    //保单生效时间
    changeDate() {
      this.ineffectiveDate = moment(this.inSelectTime).add(1, "days").format('YYYY-MM-DD')
    },
    //判断被保人和投保人是同一个人吗？
    inpeopleSelect() {
      if (this.inpeople == '是') {
        this.ispeople = false;
        this.inoType = false;
        this.insuredName = this.applicantName; //被保人姓名
        this.insuredPhone = this.applicantPhone; //被保人手机号
        this.insuredType = this.applicantType; //被保人证件类型
        this.insuredIDCard = this.applicantIDCard; //被保人证件号
        this.insuredProvinceCode = this.applicantProvinceCode; //被保人所在省
        this.insuredCity = this.applicantCity; //被保人所在市
        this.insuredRegion = this.applicantRegion; //被保人所在区
        this.insuredAddress = this.applicantAddress; //被保人所在地址
        this.relatoapp = '00'; //投保人是被保人
      } else {
        this.ispeople = true
        this.insuredName = ''; //被保人姓名
        this.insuredPhone = ''; //被保人手机号
        this.insuredType = ''; //被保人证件类型
        this.insuredIDCard = ''; //被保人证件号
        this.insuredProvinceCode = ''; //被保人所在省
        this.insuredCity = ''; //被保人所在市
        this.insuredRegion = ''; //被保人所在区
        this.insuredAddress = ''; //被保人所在地址
        this.relatoapp = '';
      }
    },

    //获取渠道类型列表
    getchannelNameList() {
      let _this = this;
      getData('post', my_url + '/crm/common/getDictList.do', function (data) {
        if (data.code == 0) {
          let {
            dictList
          } = data;
          _this.channelList = data.dictList;
        }
      }, {
        dict_type: 'source'
      });
      // this.channelSelect();


    },
    channelSelect() {
      var _this = this
      getData('post', my_url + '/crm/common/getDictList.do', function (data) {
        if (data.code == 0) {
          _this.isSource = true
          let {
            dictList
          } = data;
          _this.sourceList = data.dictList;
        } else {
          _this.isSource = false
        }

        _this.$message({
          showClose: true,
          message: "资源来源提交后不能修改，请确认无误后再提交",
          duration: 3000,
          // type: 'success'
        });

      }, {
        dict_type: 'sourcedetail_' + this.channelValue,
        special: 'dis'
      });
    },



    // 投保人获取录单信息
    aapChangePhone() {
      var _this = this
      getData('post', my_url + '/crm/auth/getToken.do', data => {
        var body = {
          token: data.token,
          mobile: _this.applicantPhone.trim()
        }
        getData('post', crm_url + 'insure.meihualife.com/crm_web/getCusInfoByMobile.do', data => {
          if (data.code == 0) {
            if (data.cusinfo.length != 0) {
              _this.applicantName = data.cusinfo[0].name
              _this.applicantIDCard = data.cusinfo[0].idno
              _this.applicantPhone = data.cusinfo[0].mobile
              _this.applicantType = data.cusinfo[0].idtype
              _this.applicantProvince = data.cusinfo[0].provincename
              var item = {
                value: data.cusinfo[0].provincename,
                key: data.cusinfo[0].province
              }
              _this.provinceSelect(item)
              _this.applicantCity = data.cusinfo[0].city,
                _this.citySelect()
              _this.applicantRegion = data.cusinfo[0].country,
                _this.applicantAddress = data.cusinfo[0].address
            }
          }

        }, body)
      })
    },

    appChangeIDCard() {
      var _this = this
      getData('post', my_url + '/crm/auth/getToken.do', data => {
        var body = {
          token: data.token,
          idno: _this.applicantIDCard.trim()
        }
        getData('post', crm_url + 'insure.meihualife.com/crm_web/getCusInfoByIdno.do', data => {
          if (data.code == 0) {
            if (data.code == 0) {
              if (data.cusinfo.length != 0) {
                _this.applicantName = data.cusinfo[0].name
                _this.applicantIDCard = data.cusinfo[0].idno
                _this.applicantPhone = data.cusinfo[0].mobile
                _this.applicantType = data.cusinfo[0].idtype
                _this.applicantProvince = data.cusinfo[0].provincename
                var item = {
                  value: data.cusinfo[0].provincename,
                  key: data.cusinfo[0].province
                }
                _this.provinceSelect(item)
                _this.applicantCity = data.cusinfo[0].city,
                  _this.citySelect()
                _this.applicantRegion = data.cusinfo[0].country,
                  _this.applicantAddress = data.cusinfo[0].address
              }
            }
          }
        }, body)
      })
    },
    //被保人获取录单信息
    insChangePhone() {
      //   var _this = this
      //   getData('post', my_url + '/crm/auth/getToken.do', data => {
      //     var body = {
      //       token: data.token,
      //       mobile: _this.insuredPhone.trim()
      //     }
      //     getData('post', crm_url + 'insure.meihualife.com/crm_web/getCusInfoByMobile.do', data => {
      //       if (data.code == 0) {
      //         if (data.cusinfo.length != 0) {
      //           _this.insuredName = data.cusinfo[0].name
      //           _this.insuredIDCard = data.cusinfo[0].idno
      //           _this.insuredPhone = data.cusinfo[0].mobile
      //           _this.insuredType = data.cusinfo[0].idtype
      //           _this.insuredProvince = data.cusinfo[0].provincename
      //           var item = {
      //             value: data.cusinfo[0].provincename,
      //             key: data.cusinfo[0].province
      //           }
      //           _this.inprovinceSelect(item)
      //           _this.insuredCity = data.cusinfo[0].city,
      //             _this.incitySelect()
      //           _this.insuredRegion = data.cusinfo[0].country,
      //             _this.insuredAddress = data.cusinfo[0].address
      //         }
      //       }

      //     }, body)
      //   })
    },
    //被保人获取录单信息
    insChangeIDCard() {
      var _this = this
      getData('post', my_url + '/crm/auth/getToken.do', data => {
        var body = {
          token: data.token,
          idno: _this.insuredIDCard.trim()
        }
        getData('post', crm_url + 'insure.meihualife.com/crm_web/getCusInfoByIdno.do', data => {
          if (data.code == 0) {
            if (data.cusinfo.length != 0) {
              _this.insuredName = data.cusinfo[0].name
              _this.insuredIDCard = data.cusinfo[0].idno
              _this.insuredPhone = data.cusinfo[0].mobile
              _this.insuredType = data.cusinfo[0].idtype
              _this.insuredProvince = data.cusinfo[0].provincename
              var item = {
                value: data.cusinfo[0].provincename,
                key: data.cusinfo[0].province
              }
              _this.inprovinceSelect(item)
              _this.insuredCity = data.cusinfo[0].city,
                _this.incitySelect()
              _this.insuredRegion = data.cusinfo[0].country,
                _this.insuredAddress = data.cusinfo[0].address
            }
          }
        }, body)
      })
    },

    jiaoyan() {
      if (this.inSelectTime == '' || this.inSelectTime == null) {
        this.$message({
          showClose: true,
          message: "出单日期不能为空",
          duration: 3000,
          type: 'error'
        });
        return
      }
      if (this.incontno == '' || this.incontno == null) {
        this.$message({
          showClose: true,
          message: "保单号不能为空",
          duration: 3000,
          type: 'error'
        });
        return
      }
      if (this.premium == '' || this.premium == null || this.premium == '0') {
        this.$message({
          showClose: true,
          message: "保费不能为空",
          duration: 3000,
          type: 'error'
        });
        return
      }
      if (this.applicantName == '' || this.applicantName == null) {
        this.$message({
          showClose: true,
          message: "投保人姓名不能为空",
          duration: 3000,
          type: 'error'
        });
        return
      }

      if (this.applicantPhone == '' || this.applicantPhone == null) {
        this.$message({
          showClose: true,
          message: "投保人手机号不能为空",
          duration: 3000,
          type: 'error'
        });
        return
      }
      if (!(/^(13|14|15|16|17|18|19)[0-9]{9}$/.test(this.applicantPhone))) {
        this.$message({
          showClose: true,
          message: "投保人手机号不符合规定",
          duration: 3000,
          type: 'error'
        });
        return
      }

      if (this.applicantType == '' || this.applicantType == null) {
        this.$message({
          showClose: true,
          message: "投保人证件类型不能为空",
          duration: 3000,
          type: 'error'
        });
        return
      }

      if (this.applicantIDCard == '' || this.applicantIDCard == null) {
        this.$message({
          showClose: true,
          message: "投保人证件号不能为空",
          duration: 3000,
          type: 'error'
        });
        return
      }
      if (this.applicantType == '7') {
        if (!(/^[a-zA-Z0-9]{5,21}$/.test(this.applicantIDCard))) {
          this.$message({
            showClose: true,
            message: "投保人证件号不符合规定",
            duration: 3000,
            type: 'error'
          });
          return
        }



      } else {
        if (!(/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.applicantIDCard)) || !(/^[a-zA-Z0-9]{5,21}$/.test(this.applicantIDCard))) {
          this.$message({
            showClose: true,
            message: "投保人证件号不符合规定",
            duration: 3000,
            type: 'error'
          });
          return
        }
      }

      if (this.inpeople == '' || this.inpeople == null) {
        this.$message({
          showClose: true,
          message: "投被保人是否是同一个人",
          duration: 3000,
          type: 'error'
        });
        return
      }

      if (this.channelValue == '' || this.channelValue == null || this.channelValue == "undefined") {
        this.$message({
          showClose: true,
          message: "请选择渠道类型",
          duration: 3000,
          type: 'error'
        });
        return
      }

      if (this.isSource && (this.sourceValue == '' || this.sourceValue == null)) {
        this.$message({
          showClose: true,
          message: "请选择流量来源",
          duration: 3000,
          type: 'error'
        });
        return
      }



      if (this.inpeople == '否') {
        if (this.applicantName == this.insuredName || this.applicantIDCard == this.insuredIDCard) {
          this.$message({
            showClose: true,
            message: "投被保人不应该为同一个人",
            duration: 3000,
            type: 'error'
          });
          return
        }

        if (this.relatoapp == '' || this.relatoapp == null) {
          this.$message({
            showClose: true,
            message: "请选择投保人和被保人的关系",
            duration: 3000,
            type: 'error'
          });
          return
        }
        if (this.insuredName == '' || this.insuredName == null) {
          this.$message({
            showClose: true,
            message: "请填写被保人姓名",
            duration: 3000,
            type: 'error'
          });
          return
        }
        if (this.insuredPhone == '' || this.insuredPhone == null) {

        } else {
          if (!(/^(13|14|15|16|17|18|19)[0-9]{9}$/.test(this.insuredPhone))) {
            this.$message({
              showClose: true,
              message: "被保人手机号不符合规定",
              duration: 3000,
              type: 'error'
            });
            return
          }
        }



        if (this.insuredType == '' || this.insuredType == null) {
          this.$message({
            showClose: true,
            message: "请选择被保人证件类型",
            duration: 3000,
            type: 'error'
          });
          return
        }
        if (this.insuredIDCard == '' || this.insuredIDCard == null) {
          this.$message({
            showClose: true,
            message: "请填写被保人证件号",
            duration: 3000,
            type: 'error'
          });
          return
        }
        if (this.insuredType == '7') {
          if (!(/^[a-zA-Z0-9]{5,21}$/.test(this.insuredIDCard))) {
            this.$message({
              showClose: true,
              message: "被保人证件号不符合规定",
              duration: 3000,
              type: 'error'
            });
            return
          }
          if (this.birthData == '' || this.birthData == null) {
            this.$message({
              showClose: true,
              message: "被保人出生日期不能为空",
              duration: 3000,
              type: 'error'
            });
            return
          }
          if (this.insex == '' || this.insex == null) {
            this.$message({
              showClose: true,
              message: "被保人性别不能为空",
              duration: 3000,
              type: 'error'
            });
            return
          }



        } else {
          if (!(/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.insuredIDCard))) {
            this.$message({
              showClose: true,
              message: "被保人证件号不符合规定",
              duration: 3000,
              type: 'error'
            });
            return
          }
        }
        var appage = getIdCardAge((this.applicantIDCard).trim());
        var insage = getIdCardAge((this.insuredIDCard).trim());
        if (this.relatoapp == '01' && this.insuredType == '0') {
          if (appage <= insage) {
            this.$message({
              showClose: true,
              message: "投被保人关系不正确",
              duration: 3000,
              type: 'error'
            });
            return
          }
        }
        if (this.relatoapp == '03' && this.insuredType == '0') {
          if (appage >= insage) {
            this.$message({
              showClose: true,
              message: "投被保人关系不正确",
              duration: 3000,
              type: 'error'
            });
            return
          }
        }
        if (this.relatoapp == '04' && this.insuredType == '0') {
          if (appage <= insage) {
            this.$message({
              showClose: true,
              message: "投被保人关系不正确",
              duration: 3000,
              type: 'error'
            });
            return
          }
        }

      }




      return true
    },


    //添加数据
    insertItem() {
      var _this = this
      // var jiaoyanTrue = this.jiaoyan()
      var appsex, appbirthday = ''
      var inssex, insbirthday = ''
      if (this.applicantIDCard != 0) {
        appbirthday = getBirthdayByIDCard((this.applicantIDCard).trim());
        appsex = getSexByIDCard((this.applicantIDCard).trim());
      }
      if (this.insuredIDCard != 0) {
        insbirthday = getBirthdayByIDCard((this.insuredIDCard).trim());
        inssex = getSexByIDCard((this.insuredIDCard).trim());
      }
      if (this.insuredPhone == undefined) {
        this.insuredPhone = ''
      }
      // 身份证为空的情况
      // if (this.applicantIDCard == undefined || this.applicantIDCard == '') {
      //     this.applicantIDCard = 0
      // }
      // if (jiaoyanTrue == true) {

      //手动录入
      console.log(this.jiaoyan())
      console.log(this.orderid == '', this.jiaoyan())
      if (this.orderid == '') {
        var jiaoyanTrue = this.jiaoyan()
        if (jiaoyanTrue == true) {
          this.loading = true
          var _this = this
          _this.inSelectTime = (_this.inSelectTime).substr(0, 10);
          if (_this.inpeople == '是') {
            _this.inpeopleSelect()
          }
          if (this.insuredType == '7') {
            inssex = this.insex
            insbirthday = this.birthData
          }
          getData('post', my_url + '/crm/auth/getToken.do', data => {
            if (data.code == 0) {
              var data = {
                "token": data.token,
                //保单录入
                "startdate": this.inSelectTime,
                "contno": this.incontno.trim(), //保单号
                "insorgancode": this.insorgancode, //保险公司
                "riskcode": this.riskcode, //险种
                "cvalidate": this.ineffectiveDate, //保单生效时间
                "amnt": this.insuranceAmount, //保险金额
                "payintv": this.paymentMethod, //缴费方式
                "payendyear": this.paymentPeriod, //缴费年期
                "insuyear": this.guaranteePeriod, //保证期限
                "prem": this.premium, //保费
                //投保人
                "appname": this.applicantName.trim(), //投保人姓名
                "appmobile": this.applicantPhone.trim(), //投保人手机号
                "appidnotype": this.applicantType, //投保人证件类型
                "appidno": this.applicantIDCard.trim(), //投保人证件号
                "appprovince": this.applicantProvinceCode, //投保人所在省
                "appcity": this.applicantCity, //投保人所在市
                "appcountry": this.applicantRegion, //投保人所在区
                "appaddress": this.applicantAddress, //投保人所在地址
                "appsex": appsex,
                "appbirthday": appbirthday,
                //被保人
                "relatoapp": this.relatoapp, //父母子女配偶
                "insname": this.insuredName.trim(), //被保人姓名
                "insmobile": this.insuredPhone.trim(), //被保人手机号
                "insidnotype": this.insuredType, //被保人证件类型
                "insidno": this.insuredIDCard.trim(), //被保人证件号
                "insprovince": this.insuredProvinceCode, //被保人所在省
                "inscity": this.insuredCity, //被保人所在市
                "inscountry": this.insuredRegion, //被保人所在区
                "insaddress": this.insuredAddress, //被保人所在地址
                "inssex": inssex,
                "insbirthday": insbirthday,
                "system": "crm",
                "channel": this.channelValue,
                "channelappname": this.sourceValue
              }
              getData('post', crm_url + 'insure.meihualife.com/crm_web/lifePolicyInsert.do', data => {
                if (data.code == 0) {
                  _this.hideaddNoticeDialogVisible();
                  _this.loading = false
                  this.$message({
                    showClose: true,
                    message: "保单已录入，请等待管理员进行审核",
                    duration: 3000,
                    type: 'success'
                  });
                  _this.search(1);
                } else {
                  _this.loading = false
                  this.$message({
                    showClose: true,
                    message: data.msg,
                    duration: 3000,
                    type: 'error'
                  });
                }
              }, data);
            }
          });

        } else {
          this.$message({
            showClose: true,
            message: '保单信息错误，请修改后再提交',
            duration: 3000,
            type: 'error'
          });
        }

      } else {
        //修改保单，
        if (this.editPopupVisible == true) {
          var jiaoyanTrue = this.jiaoyan()
          if (jiaoyanTrue == true) {
            _this.loading = true
            if (_this.inpeople == '是') {
              _this.inpeopleSelect()
            }
            _this.inSelectTime = (_this.inSelectTime).substr(0, 10);
            if (this.insuredType == '7') {
              inssex = this.insex
              insbirthday = this.birthData
            }

            getData('post', my_url + '/crm/auth/getToken.do', data => {
              if (data.code == 0) {
                var data = {
                  "token": data.token,
                  //保单录入
                  "startdate": this.inSelectTime,
                  "oldpolicyno": this.oldpolicyno.trim(), //保单号
                  "contno": this.incontno.trim(), //保单号
                  "insorgancode": this.insorgancode, //保险公司
                  "riskcode": this.riskcode, //险种
                  "cvalidate": this.ineffectiveDate, //保单生效时间
                  "amnt": this.insuranceAmount, //保险金额
                  "payintv": this.paymentMethod, //缴费方式
                  "payendyear": this.paymentPeriod, //缴费年期
                  "insuyear": this.guaranteePeriod, //保证期限
                  "prem": this.premium, //保费
                  //投保人
                  "appname": this.applicantName, //投保人姓名
                  "appmobile": this.applicantPhone.trim(), //投保人手机号
                  // "applicantType": this.applicantType, //投保人证件类型
                  "appidnotype": this.applicantType, //投保人证件类型
                  "appidno": this.applicantIDCard.trim(), //投保人证件号
                  "appprovince": this.applicantProvinceCode, //投保人所在省
                  "appcity": this.applicantCity, //投保人所在市
                  "appcountry": this.applicantRegion, //投保人所在区
                  "appaddress": this.applicantAddress, //投保人所在地址
                  "appsex": appsex,
                  "appbirthday": appbirthday,
                  //被保人
                  "relatoapp": this.relatoapp, //父母子女配偶
                  "insname": this.insuredName, //被保人姓名
                  "insmobile": this.insuredPhone.trim(), //被保人手机号
                  // "insuredType": this.insuredType, //被保人证件类型
                  "insidnotype": this.insuredType, //被保人证件类型
                  "insidno": this.insuredIDCard.trim(), //被保人证件号
                  "insprovince": this.insuredProvinceCode, //被保人所在省
                  "inscity": this.insuredCity, //被保人所在市
                  "inscountry": this.insuredRegion, //被保人所在区
                  "insaddress": this.insuredAddress, //被保人所在地址
                  "inssex": inssex,
                  "insbirthday": insbirthday,
                  "system": "crm",
                  // 特殊唯一标识符
                  "orderid": this.orderid, //唯一的保单ID 
                  "oldstate": this.state,
                  "contserialno": this.contserialno,
                  "appntserialno": this.appntserialno,
                  "insuredserialno": this.insuredserialno,
                  "riskserialno": this.riskserialno,
                  "oldismain": this.ismain,
                  "oldmainriskcode": this.editmainriskcode,
                  "channel": this.channelValue,
                  "channelappname": this.sourceValue
                }
                console.log(data)
                getData('post', crm_url + 'insure.meihualife.com/crm_web/lifePolicyUpdate.do', data => {
                  if (data.code == 0) {
                    this.editPopupVisible = false
                    _this.orderid = '' //更新成功后清唯一标识
                    _this.hideaddNoticeDialogVisible();
                    _this.loading = false
                    this.$message({
                      showClose: true,
                      message: "保单已修改，请等待管理员进行审核",
                      duration: 3000,
                      type: 'success'
                    });
                    _this.search(1);
                  } else {
                    _this.loading = false
                    this.$message({
                      showClose: true,
                      message: data.msg,
                      duration: 3000,
                      type: 'error'
                    })
                  }
                }, data);
              }
            });
          } else {
            this.$message({
              showClose: true,
              message: '保单信息错误，请修改后再提交',
              duration: 3000,
              type: 'error'
            });
          }
        } else {
          //在虚拟保单能查到信息的录入到自己名下
          var _this = this

          if (this.sourceValue == "undefined" || this.sourceValue == '' || this.sourceValue == null) {
            this.sourceValue = ''
          }
          getData('post', my_url + '/crm/auth/getToken.do', data => {
            if (data.code == 0) {
              var body = {
                token: data.token,
                orderidStr: this.orderid,
                appname: this.applicantName,
                appmobile: this.applicantPhone.trim(),
                channel: this.channelValue,
                channelappname: this.sourceValue
              }

              getData('post', crm_url + 'insure.meihualife.com/crm_web/policytransfer.do', data => {
                if (data.code == 0) {
                  this.$message({
                    showClose: true,
                    message: '保单录入成功',
                    duration: 3000,
                    type: 'success'
                  });
                  _this.search(1);
                  _this.hideaddNoticeDialogVisible();

                } else {
                  this.$message({
                    showClose: true,
                    message: data.msg,
                    duration: 3000,
                    type: 'error'
                  });
                }
              }, body)
            }
          })
        }
      }
      // }
    },
    //查看详情
    showEditPopup(item) {
      console.log(item)
      var arr = []
      arr.push(item)
      console.log(arr)

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
              this.detailObj = data.rows
            }
            if (data.rows.length == 0) {
              this.$message({
                showClose: true,
                message: "暂无查找到此保单信息",
                duration: 3000,
                type: 'error'
              });
              return
            }


          }, body)
        }
      })






      this.showEditPopupDialogVisible = true;
    },
    //所有业务员
    yewu() {
      let _this = this;
      getData('post', my_url + '/crm/auth/getAllUserIdNameList.do', function (data) {
        if (data.code == 0) {
          let nameList = data.namelist;
          nameList.forEach(res => {
            _this.restaurants.push({
              "userid": res.userid,
              "value": res.username
            });
          })
        }
      });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) :
        restaurants;
      cb(results);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    // 阻止默认跳转
    stopDefault(e) {
      if (e && e.preventDefault)
        e.preventDefault();
      else
        window.event.returnValue = false;
      return false;
    },


    //下载电子保单
    gridDataList(orderid) {
      var _this = this;
      getData('post', my_url + '/crm/auth/getToken.do', data => {
        var data = {
          orderid: orderid,
          token: data.token,
          // orderid: "HZ20220309008505_3"
        }
        getData('post', crm_url + 'insure.meihualife.com/crm_web/getPolicyUrlList.do', function (data) {
          _this.gridData = data.rows
          if (data.code == 0) {}
        }, data);
      })
    },



    downLoad(data, e) {
      var str = data.policyurl
      var string = str.substring(str.length - 4)
      if (string != ".pdf") {
        this.stopDefault(e);
        this.gridDataList(data.orderid)
        this.dialogTableVisible = true
      }

    },

    noDownLoad(data, e) {
      this.$message({
        showClose: true,
        message: '抱歉，该电子保单暂不支持下载',
        duration: 3000,
      });
    },

    handleClose() {
      this.hideaddNoticeDialogVisible()
    },
    //关闭录入弹框
    hideaddNoticeDialogVisible() {
      this.addNoticeDialogVisible = false;
      this.disabled = false;
      this.orderid = '';
      this.incontno = ''; //保单号
      this.insorganNamecode = ''; //保险公司
      this.insorgancode = ''; //保险公司代号
      this.productList = []; //保险公司
      this.inmainriskcode = ''; //险种名称
      this.riskcode = ''; //险种名称代号
      this.insuranceAmount = ''; //保险金额
      this.paymentMethod = ''; //缴费方式
      this.paymentPeriod = ''; //缴费年期
      this.guaranteePeriod = ''; //保障期限
      this.premium = ''; //保费
      this.insuredName = ''; //被保人姓名
      this.insuredPhone = ''; //被保人手机号
      this.insuredType = ''; //被保人证件类型
      this.insuredIDCard = ''; //被保人证件号
      this.insuredProvinceCode = ''; //被保人所在省
      this.insuredProvince = ''; //被保人所在省
      this.insuredCity = ''; //被保人所在市
      this.insuredRegion = ''; //被保人所在区
      this.insuredAddress = ''; //被保人所在地址
      this.applicantName = ''; //投保人姓名
      this.applicantPhone = ''; //投保人手机号
      this.applicantType = ''; //投保人证件类型
      this.applicantIDCard = ''; //投保人证件号
      this.applicantProvinceCode = ''; //投保人所在省
      this.applicantProvince = ''; //投保人所在省
      this.applicantCity = ''; //投保人所在市
      this.applicantRegion = ''; //投保人所在区
      this.applicantAddress = ''; //投保人所在地址
      this.relatoapp = '';
      this.inpeople = '';
      this.insorgancode = '';
      this.riskcode = '';
      this.insorganName = '';
      this.mainriskcode = '';
      this.channelValue = '';
      this.sourceValue = '';

      this.birthData = ''
      this.insex = ''

    },
    //跳转页数
    pageClick(page) {
      this.pageNum = page;
      this.search(page)
    },
    //录入弹框清空数据
    DialogVisible() {
      this.insorganNamecode = ''; //保险公司
      this.insorgancode = ''; //保险公司代号
      this.inmainriskcode = ''; //险种名称
      this.riskcode = ''; //险种名称代号
      this.insuranceAmount = ''; //保险金额
      this.paymentMethod = ''; //缴费方式
      this.paymentPeriod = ''; //缴费年期
      this.guaranteePeriod = ''; //保障期限
      this.premium = ''; //保费
      this.insuredName = ''; //被保人姓名
      this.insuredPhone = ''; //被保人手机号
      this.insuredType = ''; //被保人证件类型
      this.insuredIDCard = ''; //被保人证件号
      this.insuredProvince = ''; //被保人所在省
      this.insuredProvinceCode = ''; //被保人所在省
      this.insuredCity = ''; //被保人所在市
      this.insuredRegion = ''; //被保人所在区
      this.insuredAddress = ''; //被保人所在地址
      this.applicantName = ''; //投保人姓名
      this.applicantPhone = ''; //投保人手机号
      this.applicantType = ''; //投保人证件类型
      this.applicantIDCard = ''; //投保人证件号
      this.applicantProvince = ''; //投保人所在省
      this.applicantProvinceCode = ''; //投保人所在省
      this.applicantCity = ''; //投保人所在市
      this.applicantRegion = ''; //投保人所在区
      this.applicantAddress = ''; //投保人所在地址
      this.relatoapp = '';
      this.inpeople = '';
      this.insorgancode = '';
      this.riskcode = '';

      this.channelValue = '';
      this.sourceValue = '';
    },
    //打开编辑弹窗
    EditPopup(item) {
      var _this = this;
      this.oldpolicyno = item.contno
      getData('post', my_url + '/crm/auth/getToken.do', data => {
        if (data.code == 0) {
          var body = {
            token: data.token,
            contno: (this.oldpolicyno).trim()
          }
          getData('post', crm_url + 'insure.meihualife.com/crm_web/getOnePolicy.do', data => {
            var item = data.rows[0]
            if (data.total != 0) {
              this.addNoticeDialogVisible = true
              this.orderid = item.orderid; //唯一的保单id
              // this.editPopupVisible = true
              this.state = item.state
              this.contserialno = item.contserialno
              this.appntserialno = item.appntserialno
              this.insuredserialno = item.insuredserialno
              this.riskserialno = item.riskserialno
              this.ismain = item.ismain
              this.editmainriskcode = item.mainriskcode
              var aa = {
                value: item.insorganname,
                key: item.insorgancode
              }
              this.insorganNameSelect(aa)
              this.inmainriskSelect(item.riskcode)

              this.inSelectTime = item.accepttime; //出单日期
              this.incontno = item.contno; //保单号
              this.insorganNamecode = item.insorganname; //保险公司
              this.insorgancode = item.insorgancode; //保险公司代号
              // this.inmainriskcode = item.riskname; //险种名称
              this.inmainriskcode = item.riskcode; //险种名称
              this.riskcode = item.riskcode; //险种名称代号
              this.insuranceAmount = item.amnt; //保险金额
              // this.paymentMethod = item.payintvvalue; //缴费方式
              this.paymentMethod = item.payintv; //缴费方式
              // this.paymentPeriod = item.payendyearvalue; //缴费年期
              this.paymentPeriod = item.payendyearkey; //缴费年期
              // this.guaranteePeriod = item.insuyearvalue; //保障期限
              this.guaranteePeriod = item.insuyearkey; //保障期限
              this.premium = item.prem; //保费
              this.applicantName = item.appname; //投保人姓名
              this.applicantPhone = item.appphone; //投保人手机号
              this.applicantType = item.appidnotype; //投保人证件类型
              this.applicantIDCard = item.appidno; //投保人证件号
              this.applicantProvince = item.appprovincename; //投保人所在省
              this.applicantProvinceCode = item.appprovince; //投保人所在省
              // this.applicantCity = item.in scityname; //投保人所在市
              this.applicantCity = item.appcity; //投保人所在市
              // this.applicantRegion = item.inscountryname; //投保人所在区
              this.applicantRegion = item.appcountry; //投保人所在区
              this.applicantAddress = item.insaddress; //投保人所在地址
              var bb = {
                value: item.appprovincename,
                key: item.appprovince
              }
              this.provinceSelect(bb);
              this.citySelect();
              this.insuredName = item.insname; //被保人姓名
              this.insuredPhone = item.insphone; //被保人手机号
              this.insuredType = item.insidnotype; //被保人证件类型
              this.insuredIDCard = item.insidno; //被保人证件号
              this.insuredProvince = item.insprovincename; //被保人所在省
              this.insuredProvinceCode = item.insprovince; //被保人所在省
              // this.insuredCity = item.inscityname; //被保人所在市
              this.insuredCity = item.inscity; //被保人所在市
              // this.insuredRegion = item.inscountryname; //被保人所在区
              this.insuredRegion = item.inscountry; //被保人所在区
              this.insuredAddress = item.insaddress; //被保人所在地址
              var cc = {
                value: item.insprovincename,
                key: item.insprovince
              }
              this.inprovinceSelect(cc);
              this.incitySelect();

              this.channelValue = item.activitychannel;
              this.sourceValue = item.activityappname;

              _this.channelSelect()
              if (item.relatoapp == '00') {
                this.inpeople = '是'
                this.relatoapp = '00'
                this.ispeople = false
              } else {
                this.inpeople = '否'
                this.relatoapp = item.relatoapp //不是本人
                this.ispeople = true
              }
              this.editPopupVisible = true
            } else {
              this.disabled = false
              this.$message({
                showClose: true,
                message: '此保单没有记录保单信息，需手动录入',
                duration: 3000,
                // type: 'error'
              });
              this.inSelectTime = moment().format('YYYY-MM-DD')
              this.changeDate();
            }
          }, body);
        }
      })
    },
    //删除数据
    deleteItem(item) {
      var _this = this
      getData('post', my_url + '/crm/auth/getToken.do', data => {
        if (data.code == 0) {
          var body = {
            token: data.token,
            orderid: item.orderid
          }
          getData('post', crm_url + 'insure.meihualife.com/crm_web/lifePolicyDelete.do', data => {
            if (data.code == 0) {
              this.$message({
                showClose: true,
                message: '保单已经删除',
                duration: 3000,
                type: 'success'
              });
              _this.search(1)
            }
          }, body)
        }
      })
    }
  }
}