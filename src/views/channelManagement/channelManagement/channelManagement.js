import $ from 'jquery';
import moment from "../../../static/js/moment.js"
import { getData, my_url, crm_url } from '../../../static/js/ajax.js';
import { formatDate } from '../../../static/js/common.js';
export default {
  data() {
    return {
      //测试
      checked: '',
      value1: '',
      dis_P4_up: false,

      sable: false,
      inputUserform1: ['客户姓名'],

      checkedAll: false,
      checkedAllNum: 0,
      // 选择
      selectTime: [moment().startOf('month').format("YYYY-MM-DD 00:00:00"), moment(new Date()).add(1, 'days').format('YYYY-MM-DD 00:00:00')],
      hotlineStartDate: moment().startOf('month').format("YYYY-MM-DD 00:00:00"),
      hotlineEndDate: moment(new Date()).add(1, 'days').format('YYYY-MM-DD 00:00:00'),
      phoneWxno: '电话号码',
      phoneWxnoValue: '',
      followupStepData: [],
      sourcelevel: '', //跟踪步骤
      inputUserform: {
          wxno: '',
          mobile: '',
          name: '',
          channelid: '',
          remark: '',
          makedate: '' //线索产生时间
      },
      channelid: '',
      channelName: '',
      channelNameList: [],
      SalesmanBox: [],
      SalesmanBox1: [],
      channelNameType: [], //所有的渠道
      channelNameTypeList: [], //选中的渠道
      DialogVisible: false,
      paragraphFile: {
          filename: '上传模板',
          fileid: '00000000000000000280'
      },
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      ischannel: false,

      followrecord: '', //发布信息
      releaseNum: '', //发布数量
      records: [],
      ismobile: '',

      inputUserVisable: false,
      visable: false,

      my_url: my_url,
      tableData: [],

      Salesman: '',
      mobile: '',
      wxno: '',
      username: '',
      followupstep: '99',

      loading: false,
      value: [],
      policyList: [],
      overviewForm: {
          teamid: '',
          userid: '',
          startDate: '',
          endDate: '',
          time: '1'
      },
      overviewFormTime: '1',
      // 侧拉
      drawer: false,
      isDealed: false,
      mobileInputShow: false,
      mobileList: [],
      birthday: '',
      email: '',
      address: '',
      otherstores: [],
      visit: '',
      returnVisit: '',
      callSum: '',
      callDataList: [],
      addMoblie: '',
      addMobliePopVisible: false,
      sexs: [{
          key: '男',
          value: '男'
      }, {
          key: '女',
          value: '女'
      }],
      age: '',
      previstitimePickerOptions: { //控制时间范围
          disabledDate(time) {
              return time.getTime() < (Date.now() - (24 * 60 * 60 * 1000))
          }
      },
      order: '',
      prop: '',
      formData: '', //文件上传
      //资源调配 .. 
      deleteSourceVisable: false,
      dis_Pz_up: true,
      multipleSelection: [],
      //资源删除
      resourceDeployform: {
          activityid: '',
          userid: '',
          followupstep: ''
      },
      editInfo: {
          shareusername: ''
      },
      resourceDeployVisable: false,
      SalesmanIdBox: [],
      steps: [],
      select_steps: [],
      add_steps: [],
      // 资源调配  资源删除权限
      dis_P4_up: false,
      dis_Pz_up: false,
      detailsInfo: {},
      activitytag: '',
      activitytags: '',
      //查看编辑弹窗
      showEditPopupDialogVisible: false,
      audioPaused: true,
      currentCallIndex: '',
      audioSrc: '',
      audioShow: false,
      
      shouEdit: {
          editSelectTime: '',
          userName: '',
          userName1: '',
          editContno: '',
          editPolicyStatus: "",
          editvisitstate: '',
          editorganNamecode: '',
          editriskcode: '',
          editUranceAmount: '',
          editPaymentMethod: '',
          editPaymentPeriod: '',
          editGuaranteePeriod: '',
          editPremium: '',
          editinSelectTime: '',
          editName: '',
          editSex: '',
          editBirthdy: "",
          editprovincename: '',
          editcityname: '',
          editcountryname: '',
          editAddress: '',
          editRelatoapp: '',
          editinName: '',
          editinSex: '',
          editinBirthdy: '',
          editinsprovincename: '',
          editinscityname: '',
          editinscountryname: '',
          editinAddress: '',
      },

      pickerOptions: {
          shortcuts: [{
              text: '今日',
              onClick(picker) {
                  const end = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));
                  const start = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));

                  end.setTime(end.getTime() + 3600 * 1000 * 24);
                  picker.$emit('pick', [start, end]);
              }
          }, {
              text: '昨日',
              onClick(picker) {
                  const end = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));
                  const start = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));

                  start.setTime(start.getTime() - 3600 * 1000 * 24);
                  picker.$emit('pick', [start, end]);
              }
          }, {
              text: '最近7天',
              onClick(picker) {
                  const end = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));
                  const start = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));

                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
              }
          }, {
              text: '最近30天',
              onClick(picker) {
                  const end = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));
                  const start = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));

                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
              }
          }, {
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
        }]
      },

    };
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
    }
  },
  mounted: function () {
    this.search(1);
    this.getConditionData();
    this.getchannelNameList();
    this.getchannelNameList1();
    this.searchChannel();
    this.getUserIdData();
    this.getFollow();
    var now = new Date(); // 当前日期
    var nowDay = now.getDate(); // 当前日
    var nowMonth = now.getMonth(); // 当前月
    var nowYear = now.getYear(); // 当前年
    var start = formatDate(new Date(now.getFullYear(), nowMonth, nowDay));
    var end = formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1));
    this.overviewForm.startDate = formatDate(new Date(start), 'yyyy-MM-dd 00:00:00').substring(0, 10);
    this.overviewForm.endDate = formatDate(new Date(end), 'yyyy-MM-dd 00:00:00').substring(0, 10);

    // this.channelNameType = this.channelNameType.map(item => {
    //     console.log(item)
    //     return { value: `value:${item}`, label: `label:${item}` };
    //   });
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
  methods: {
    // 播放录音
    audioPlay(index) {
        let _this = this;
        let audio = this.$refs.audio;
        this.currentCallIndex = index
        this.audioSrc = this.callDataList[index].recordurl
        this.$nextTick(() => {
          audio.play()
          _this.audioShow = true;
          _this.audioPaused = false;
        })
    },
    audioPause(index) {
        let _this = this;
        let audio = this.$refs.audio
        this.currentCallIndex = index
        this.$nextTick(() => {
            audio.pause();
            _this.audioPaused = true
        })
    },
    // 资源删除
    deleteSourceSubmit() {
        let _this = this;
        let activityid = [];
        _this.multipleSelection.forEach(function (item) {
            activityid.push(item.activityserialno)
        })
        if (activityid.length == 0) {
            _this.$message({
                type: 'waring',
                duration: 3000,
                message: "请选择需要删除的资源！"
            })
            return
        }
        let params = {
            'activityid': activityid.join(',')
        }
        getData('post', my_url + '/crm/activity/pageActivityDelete.do', function (data) {
            if (data.code == '0') {
                _this.$message({
                    type: 'success',
                    duration: 3000,
                    message: "删除成功！"
                })
                _this.deleteSourceVisable = false;
                _this.search();
            } else {
                _this.$message({
                    type: 'waring',
                    duration: 3000,
                    message: data.msg
                })
            }
        }, params);
    },
    deleteSourceCancel() {
        this.deleteSourceVisable = false;
    },

    //资源调配
    resourceDeployShow() {},
    getFollow() {
        var _this = this
        getData('post', my_url + '/crm/common/getDictList.do', function (data) { //跟进步骤
            if (data.code == 0) {
                _this.steps = data.dictList;
                var select_dictList = JSON.parse(JSON.stringify(data.dictList))
                select_dictList.unshift({
                    dd_key: "99",
                    dd_value: "新资源"
                })
                _this.select_steps = select_dictList;
                var add_dictList = JSON.parse(JSON.stringify(data.dictList))
                // add_dictList.push({
                //   dd_key: "gxkh",
                //   dd_value: "共享客户"
                // })
                add_dictList.unshift({
                    dd_key: "99",
                    dd_value: "新资源"
                })
                _this.add_steps = add_dictList;
                _this.activeName = add_dictList[0].dd_key;
            };
        }, {
            dict_type: 'followupstep'
        });
        //资源调配的权限
        getData('post', my_url + '/crm/auth/getManagePermission.do', function (data) { //其他库 
            if (data.code == 0) {
                _this.dis_P4_up = true;
            } else {
                _this.dis_P4_up = false;
            }
        }, null);
        //资源删除的权限
        getData('post', my_url + '/crm/auth/getZongPermission.do', function (data) { //其他库 
            if (data.code == 0) {
                _this.dis_Pz_up = true;
            } else {
                _this.dis_Pz_up = false;
            }
        }, null);

    },
    // 资源调配   取消
    resourceDeployCancel() {
        this.resourceDeployVisable = false;
        this.resourceDeployform.followupstep = '';
        this.resourceDeployform.activityid = '';
        this.editInfo.shareusername = '';
        this.resourceDeployform.userid = '';
    },
    // 资源调配   确认
    resourceDeploySubmit() {
        let _this = this;
        let activityid = [];
        _this.multipleSelection.forEach(function (item) {
            activityid.push(item.activityserialno)
        })
        if (activityid.length == 0) {
            _this.$message({
                type: 'waring',
                duration: 3000,
                message: "请选择需要调配的资源！"
            })
            return
        }
        //添加的新业务员编号
        let userid = [];
        userid.push(this.resourceDeployform.userid)
        this.resourceDeployform.activityid = activityid.join(',')
        this.resourceDeployform.userid = userid.join('')
        getData('post', my_url + '/crm/activity/activityTransfer.do', function (data) {
            if (data.code == '0') {
                _this.$message({
                    type: 'success',
                    duration: 3000,
                    message: "调配成功！"
                })
                _this.resourceDeployVisable = false;
                _this.resourceDeployform.followupstep = '';
                _this.resourceDeployform.activityid = '';
                _this.resourceDeployform.userid = '';
                _this.editInfo.shareusername = '';
                _this.search();
            } else {
                _this.$message({
                    type: 'waring',
                    duration: 3000,
                    message: data.msg
                })
            }
        }, this.resourceDeployform);
    },
    handleSelectId(item) {
        this.resourceDeployform.userid = item.id
    },

    fileTypeFun(type) {
        if (type) {
            var type = type.toLowerCase()
            if (type == "jpg" || type == "png") {
                return 'file-type file-type-img'
            } else if (type == "xlsx" || type == "xls") {
                return 'file-type file-type-xlsx'
            } else {
                return `file-type file-type-${type}`
            }
        } else {
            return 'file-type file-type-file'
        }
    },
    reset() { //重置
        this.selectTime = '';
        this.phoneWxnoValue = '';
        this.mobile = '';
        this.wxno = '';
        this.sourcelevel = '';
        this.channelName = '';
        this.hotlineStartDate = ''; //线索开始时间
        this.hotlineEndDate = '';
    },
    search(page) { //查询
        if (this.selectTime == null) {
            this.hotlineStartDate = ''
            this.hotlineEndDate = ''
        } else if (this.selectTime.length > 0) {
            this.hotlineStartDate = this.formatDate(this.selectTime[0], 'yyyy-MM-dd HH:mm:ss');
            this.hotlineEndDate = this.formatDate(this.selectTime[1], 'yyyy-MM-dd HH:mm:ss');
        }

        if (this.phoneWxno == '电话号码') {
            this.mobile = this.phoneWxnoValue
        } else if (this.phoneWxno == '微信号') {
            this.wxno = this.phoneWxnoValue
        }
        var qudaoid = this.channelName

        if (qudaoid == '') {
            qudaoid = ''
        } else {
            qudaoid = qudaoid.join(",")
        }
        // var qudaoList = this.SalesmanBox;
        // for (var i = 0; i < qudaoList.length; i++) {
        //     if (qudaoList[i].value == this.channelName) {
        //         qudaoid = qudaoList[i].key
        //     }
        // }

        let params = {
            hotlineStartDate: this.hotlineStartDate, //线索开始时间
            hotlineEndDate: this.hotlineEndDate, //线索终止时间
            mobile: this.mobile,
            wxno: this.wxno,
            followupstep: this.sourcelevel,
            channeldetail: qudaoid,
            pageNumber: page,
            pageSize: this.pageSize
        };
        // this.loading = true;
        this.getTableData(params); //table数据
    },
    getTableData(params) { //table数据
        let _this = this;
        this.loading = true
        getData('post', my_url + '/crm/activity/getChannelActivityList.do', function (data) {
            let {
                rows,
            } = data;
            if (rows) {
                rows.forEach(res => {
                    res.wxnostr = res.wxno;
                    // 如果sourceleve 是A+,是A重疾
                    if (res.sourcelevel == 'A') {
                        res.sourcelevel = 'A重疾'
                        // 如果sourceleve 是A+,是A理财
                    } else if (res.sourcelevel == 'A+') {
                        res.sourcelevel = 'A理财'
                        // 如果sourceleve 是A-,、分两种情况
                    } else if (res.sourcelevel == 'A-') {
                        //第一种情况如果initsourceleve 是A 为A-重疾
                        if (res.initsourcelevel == 'A') {
                            res.sourcelevel = 'A-重疾'
                            //第二种情况如果initsourceleve 是A+ 为A-理财
                        } else if (res.initsourcelevel == 'A+') {
                            res.sourcelevel = 'A-理财'
                        }
                    }
                    if (res.otherstore) {
                        if (res.otherstore == '01') {
                            res.followupstepname = '非标体'
                        } else if (res.otherstore == '02') {
                            res.followupstepname = '高龄'
                        } else if (res.otherstore == '03') {
                            res.followupstepname = '同行'
                        } else if (res.otherstore == '04') {
                            res.followupstepname = '空号停机'
                        }
                    }
                })
            }

            _this.tableData = rows
            _this.pageTotal = data.total
            _this.wxno = ''
            _this.mobile = ''
            _this.loading = false
        }, params);

    },

    //点击客户姓名 展示详细信息
    handle(row) {
        this.detailsInfo.activityserialno = row.activityserialno
        this.ismobile = row.mobilestr
        this.getmobileList(row.activityserialno)
        this.getOrderData();
        this.detailsInfo = row;
        this.getReleaseData(); //发布的列表
    },
    //点击成交单子，查看详情
    showEdit(item) {
        this.showEditPopupDialogVisible = true;
        this.shouEdit.editSelectTime = item.accepttime;
        this.shouEdit.userName = item.reusername;
        this.shouEdit.userName1 = item.serviceusername;
        this.shouEdit.editContno = item.contno;
        this.shouEdit.editPolicyStatus = item.statename
        this.shouEdit.editvisitstate = item.revisitstatename
        this.shouEdit.editorganNamecode = item.insorganname
        this.shouEdit.editriskcode = item.riskname
        this.shouEdit.editUranceAmount = item.amnt
        this.shouEdit.editPaymentMethod = item.payintvvalue
        this.shouEdit.editPaymentPeriod = item.payendyearvalue
        this.shouEdit.editGuaranteePeriod = item.insuyearvalue
        this.shouEdit.editPremium = item.prem
        this.shouEdit.editinSelectTime = item.cvalidate
        this.shouEdit.editName = item.appname
        this.shouEdit.editSex = item.appsexname
        this.shouEdit.editBirthdy = item.appbirthday
        this.shouEdit.editprovincename = item.appprovincename
        this.shouEdit.editcityname = item.appcityname
        this.shouEdit.editcountryname = item.appcountryname
        this.shouEdit.editAddress = item.appaddress
        this.shouEdit.editRelatoapp = item.relaname
        this.shouEdit.editinName = item.insname
        this.shouEdit.editinSex = item.inssexname
        this.shouEdit.editinBirthdy = item.insbirthday
        this.shouEdit.editinsprovincename = item.insprovincename
        this.shouEdit.editinscityname = item.inscityname
        this.shouEdit.editinscountryname = item.inscountryname
        this.shouEdit.editinAddress = item.insaddress
    },





    // 获取电话列表
    getmobileList(activityid) {
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
                // _this.mobileList = [
                //   { id: 1, phone: '13244442222' },
                //   { id: 2, phone: '13244442223' },
                //   { id: 3, phone: '13244442224' },
                // ];
            }
        }, {
            activityid: activityid
        });
    },
    mobileToTop(scope) {
        let _this = this;
        getData('post', my_url + '/crm/activity/activityUpdateMobile.do', function (data) {
            if (data.code == '0') {
                _this.getmobileList(_this.detailsInfo.activityserialno)
                _this.$message({
                    type: "success",
                    duration: 3000,
                    message: "置顶成功！"
                })

                _this.detailsInfo.mobilestr = scope.row.phone;
            } else {
                _this.$message({
                    type: "success",
                    duration: 3000,
                    message: data.msg
                })
            }
        }, {
            activityid: this.detailsInfo.activityserialno,
            mobile: scope.row.phone
            // mobile:18611158884
        });
    },

    mobileDelete(scope) {
        let _this = this;
        _this.deleteMobile = scope.row.phone
        getData('post', my_url + '/crm/activity/activityDeleteMobile.do', function (data) {
            if (data.code == '0') {
                _this.getmobileList(_this.detailsInfo.activityserialno)
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
            activityid: this.detailsInfo.activityserialno,
            mobile: this.deleteMobile
        });
    },
    addMoblieChange(val) {
        if (checkMobile(val)) {
            this.mobileInputShow = true
        } else {
            this.mobileInputShow = false
        }
    },
    mobileAdd() {
        var _this = this;
        var addMoblieStr = _this.addMoblie
        getData('post', my_url + '/crm/activity/activityAddMobile.do', function (data) {
            if (data.code == '0') {
                _this.getmobileList(_this.detailsInfo.activityserialno)
                _this.$message({
                    type: "success",
                    duration: 3000,
                    message: "添加成功！"
                })
                _this.addMoblie = "";
            } else {
                _this.$message({
                    type: "success",
                    duration: 3000,
                    message: data.msg
                })
            }
        }, {
            activityid: this.detailsInfo.activityserialno,
            mobile: this.addMoblie
        });
    },
    mobileCancle() {
        this.addMoblie = "";
        this.mobileInputShow = false
    },
    getOrderData() {
        let _this = this;
        getData('post', my_url + '/crm/activity/getPolicyInfoByAppntMobile.do', function (data) {
            if (data.code == '0') {
                if (data.policyList.length > 0) {
                    _this.isDealed = true;
                } else {
                    _this.isDealed = false;
                }
                _this.drawer = true;
                _this.policyList = data.policyList
            }
        }, {
            mobile: this.ismobile
        });
    },

    //跟进步骤
    getConditionData() {
        let _this = this;
        getData('post', my_url + '/crm/common/getDictList.do', function (data) {
            if (data.code == 0) {
                _this.followupStepData = data.dictList;
            };
        }, {
            dict_type: 'followupstep'
        });
        getData('post', my_url + '/crm/common/getDictList.do', function (data) { //其他库 
            if (data.code == 0) {
                let {
                    dictList
                } = data;
                _this.otherstores = dictList;
            }
        }, {
            dict_type: 'otherstore'
        });
    },
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

        if (this.editInfo.shareusername != null && this.editInfo.shareusername != '') {
            if (this.SalesmanIdBox.find(item => item.value === this.editInfo.shareusername) == undefined) {
                loading.close();
                _this.$message({
                    showClose: true,
                    message: '您的权限不足',
                    duration: 3000,
                    type: 'success'
                });
                return
            } else {
                save_share_id = this.SalesmanIdBox.find(item => item.value === this.editInfo.shareusername).id;
            }
        }

        let params = {
            // mobile: _this.mobileList[0].phone,
            mobile: _this.mobilestr,
            activityserialno: this.detailsInfo.activityserialno, //线索流水号
            //   activitytag: this.activitytag.join(),
            name: this.detailsInfo.name, //注册姓名
            wxno: this.detailsInfo.wxno,
            email: this.detailsInfo.email,
            age: this.detailsInfo.age,
            mobile: this.detailsInfo.mobilestr,
            birthday: this.birthday,
            sex: this.detailsInfo.sex,
            previstitime: this.formatDate(this.returnVisit, 'yyyy-MM-dd HH:mm:ss'), //预约回访时间
            followupstep: this.visit, //跟进步骤
            oldprevistitime: this.formatDate(this.detailsInfo.previstitime, 'yyyy-MM-dd HH:mm:ss'),
            otherstore: this.editInfo.otherstore,
            shareuserid: save_share_id,
            activityuserid: this.detailsInfo.userid,
            mobileprovince: this.mobileprovince,
            mobilecity: this.mobilecity,
            mobilecountry: this.mobilecountry,
            address: this.address
        };
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
    phonecall_page() {
        if (this.dis_save == true) {
            this.$parent.onSend({mobile:this.detailsInfo.mobilestr, activityid: this.detailsInfo.activityserialno});
        }
    },
    querySearch(queryString, cb) {
        var SalesmanBox = this.SalesmanBox;
        var results = queryString ? SalesmanBox.filter(this.createFilter(queryString)) :
            SalesmanBox;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    createFilter(queryString) {
        return (SalesmanBox) => {
            return (SalesmanBox.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },
    // 查询全部渠道
    getchannelNameList() {
        let _this = this;
        getData('post', my_url + '/crm/channel/getChannelData.do', function (data) {
            if (data.code == 0) {
                let channelList = data.channelList;
                _this.channelNameType = data.channelList;
                _this.channelNameTypeList = data.channelList;
                channelList.forEach(res => {
                    _this.SalesmanBox.push({
                        "value": res.dd_value,
                        "key": res.dd_key
                    });
                })
            }
        });
    },
    querySearch1(queryString, cb) {
        var SalesmanBox1 = this.SalesmanBox1;
        var results = queryString ? SalesmanBox1.filter(this.createFilter1(queryString)) :
            SalesmanBox1;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    createFilter1(queryString) {
        return (SalesmanBox1) => {
            return (SalesmanBox1.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },
    //查询这个用户的渠道
    getchannelNameList1() {
        let _this = this;
        getData('post', my_url + '/crm/channel/getChannelInfoList.do', function (data) {
            if (data.code == 0) {
                let channelList1 = data.channeInfolList;
                channelList1.forEach(res => {
                    _this.SalesmanBox1.push({
                        "value": res.channelname,
                        "key": res.channelid,
                    });
                })
            }
        });
    },


    //渠道权限判断
    searchChannel() {
        var _this = this
        getData('post', my_url + '/crm/auth/getZongPermission.do', function (data) {
            if (data.code == "0") {
                _this.ischannel = true
            } else {
                _this.ischannel = false
            }
        });
    },
    remoteMethod(query) {
        if (query !== '') {
            setTimeout(() => {
                this.channelNameType = this.channelNameTypeList.filter(item => {
                    return item.dd_value.toLowerCase()
                        .indexOf(query.toLowerCase()) > -1;
                });
            }, 200);
        } else {
            this.channelNameType = [];
        }
    },

    pageClick(page) { //点击分页
        this.pageNum = page;
        this.search(page)
    },

    cancel() { //发布取消
        this.followrecord = '';
    },
    release() { //发布
        let _this = this;
        let arr = [],
            remarkStr = '';
        this.followrecord.split('\n').forEach(item => arr.push(`<p>${item.trim()}</p>`));
        remarkStr = arr.join("");
        let params = {
            remark: remarkStr,
            activityserialno: this.detailsInfo.activityserialno
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
    getReleaseData() { //发布的列表
        let _this = this;
        let params = {
            activityserialno: this.detailsInfo.activityserialno
        }
        getData('post', my_url + '/crm/activity/getRemarkList.do', function (data) {
            let {
                total,
                rows
            } = data;
            _this.releaseNum = rows.length;
            rows.forEach(res => {
                res.name = _this.detailsInfo.name;
                res.remark = res.remark.replace(/:/g, '：');
                // res.makedate = _this.formatDate(res.makedate, 'yyyy-MM-dd HH:ss:mm');
            })
            _this.records = rows;
        }, params);
    },
    //删除发布的内容
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
    //客户录入
    inputUserSubmit() {
        let _this = this;
        if (!_this.inputUserform.wxno && !_this.inputUserform.mobile) {
            _this.$message({
                type: 'waring',
                duration: 3000,
                message: "电话和微信至少填写一个！"
            })
            return
        }
        if (_this.inputUserform.mobile != null && _this.inputUserform.mobile != '' && !/^1[3456789]\d{9}$/.test(_this.inputUserform.mobile)) {
            _this.$message({
                type: 'waring',
                duration: 3000,
                message: "请填写正确的电话号码！"
            })
            _this.inputUserform.mobile = ""
            return
        }
        var qudaoid = ''
        var qudaoList = this.SalesmanBox;
        for (var i = 0; i < qudaoList.length; i++) {
            if (qudaoList[i].value == this.inputUserform.channelid) {
                qudaoid = qudaoList[i].key
            }
        }
        var params = _this.inputUserform
        params.channelid = qudaoid
        getData('post', my_url + '/crm/channel/channelPageActivityInsert.do', function (data) {
            if (data.code == '0') {
                _this.$message({
                    type: 'success',
                    duration: 3000,
                    message: "录入成功！"
                })
                _this.inputUserVisable = false;
                _this.inputUserform.name = "";
                _this.inputUserform.mobile = "";
                _this.inputUserform.wxno = "";
                _this.inputUserform.channelid = "";
                _this.inputUserform.remark = "";
                _this.inputUserform.makedate = "";
                _this.search();
            } else {
                _this.$message({
                    type: 'waring',
                    duration: 3000,
                    message: data.msg
                })
            }
        }, params);
    },
    //取消录入
    inputUserCancel() {
        this.inputUserVisable = false;
        this.inputUserform.name = '';
        this.inputUserform.mobile = '';
        this.inputUserform.wxno = '';
        this.inputUserform.channelid = '';
        this.inputUserform.remark = '';
    },
    // 推广页面链接
    disPageUrl(row) {
        if (row.pageurl != null && row.pageurl != '') {
            window.open(row.pageurl,
                '_blank', 'width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no');
        } else if (row.channel == '0004' && row.pagetype == '1yuango/0001') {
            window.open(crm_url + 'insure.meihualife.com/life/activity/oneyuangodis.do',
                '_blank', 'width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no');
        } else {
            window.open(crm_url + 'insure.meihualife.com/life/activity/channelActivity.do?channelCode=' + row.channel + '&pageType=' + row.pagetype + '&planId=' + row.planid,
                '_blank', 'width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no');
        }
    },
    //发布格式化时间
    formatDate: function (date, format) {
        if (!date) return;
        if (!format || typeof (format) != "string") format = "yyyy-MM-dd";
        switch (typeof date) {
            case "string":
                date = new Date(date.replace('T', ' ').replace(/-/, "/"));
                break;
            case "number":
                date = new Date(date);
                break;
        }
        if (!(date instanceof Date)) return;
        var dict = {
            "yyyy": date.getFullYear(),
            "M": date.getMonth() + 1,
            "d": date.getDate(),
            "H": date.getHours(),
            "m": date.getMinutes(),
            "s": date.getSeconds(),
            "MM": ("" + (date.getMonth() + 101)).substr(1),
            "dd": ("" + (date.getDate() + 100)).substr(1),
            "HH": ("" + (date.getHours() + 100)).substr(1),
            "mm": ("" + (date.getMinutes() + 100)).substr(1),
            "ss": ("" + (date.getSeconds() + 100)).substr(1)
        };
        return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
            return dict[arguments[0]];
        });
    },

    //当表格的排序条件发生变化的时候会触发该事件
    sortChange(val) {
        this.order = val.order
        this.prop = val.prop
        this.search();
    },
    //当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
        this.multipleSelection = val;
        this.checkedAllNum = val.length;
    },
    //所有人员姓名
    getUserIdData() {
        let _this = this;
        getData('post', my_url + '/crm/auth/getUserIdNameList.do', function (data) { //渠道类型
            if (data.code == 0) {
                let nameList = data.namelist;
                nameList.forEach(res => {
                    _this.SalesmanIdBox.push({
                        "value": res.username,
                        "id": res.userid
                    });
                })
            }
        });
    },
    querySearchId(queryString, cb) {
        var SalesmanIdBox = this.SalesmanIdBox;
        var results = queryString ? SalesmanIdBox.filter(this.createFilterId(queryString)) : SalesmanIdBox;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },

    createFilterId(queryString) {
        return (SalesmanIdBox) => {
            return (SalesmanIdBox.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },

    //文件上传
    handleUpLoad() {
        this.channelid = ''
        this.DialogVisible = true
        // $('.file-input').trigger('click')
    },
    handleUpLoad1() {
        var _this = this
        _this.visable = false;
        $.ajax({
            url: my_url + '/crm/channel/channelFileUpload.do',
            type: 'POST',
            cache: false,
            // data: '',
            data: this.formData,
            processData: false,
            contentType: false
        }).done(function (res) {
            _this.loading = false
            // _this.visable = false;
            _this.baseInfoLoading = false;
            var res = JSON.parse(res)
            if (res.code == 0) {
                $('.file-input').val('')
                _this.$message({
                    showClose: true,
                    type: 'success',
                    message: "上传成功!",
                    duration: 3000,
                })
                _this.search(1);
            } else {
                _this.$message({
                    showClose: true,
                    message: res.msg + ',请刷新后重新提交',
                    duration: 3000,
                    type: 'error'
                });
            }

        }).fail(function (res) {
            _this.loading = false
            _this.visable = false;
            _this.baseInfoLoading = false;
            _this.$message({
                type: 'waring',
                duration: 3000,
                message: "上传失败!"
            })
        });
    },
    tirggerFile(e) {
        var _this = this;
        _this.baseInfoLoading = true;
        // _this.loading=true
        var qudaoid = ''
        var qudaoList = this.SalesmanBox;
        for (var i = 0; i < qudaoList.length; i++) {
            if (qudaoList[i].value == this.channelid) {
                qudaoid = qudaoList[i].key
            }
        }
        let formData = new FormData();
        formData.append('myFile', e.target.files[0]);
        formData.append('channelid', qudaoid);
        // formData.append('buztype', '0301');
        // formData.append('buzid', '511504');
        formData.append('buztype', '');
        formData.append('buzid', '1');
        this.formData = formData
    }
  }
}