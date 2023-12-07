import $ from 'jquery';
import moment from "../../static/js/moment.js";
import wangEditor from '@/components/wangEditor/release/wangEditor.min.js';
import { getData, getPhoneData, my_url, crm_url } from '../../static/js/ajax.js';
import { formatDate, checkEmail, checkMobile} from '../../static/js/common.js';
let editor4, editor5, editor6, editor7;
export default {
  data() {
    return { 
      from: {
        recorddate: moment().format('YYYY-MM-DD 00:00:00'),
        hotlinecount: '',
        callcount: '',
        connectcount: '',
        connectrate: '',
        cluecallcount: '',
        callcentertime: '',
        nocallcentertime: '',
        sumtime: '',
        wxcount: '',
        firstplancount: '',
        secondplancount: '',
        claimcount: '',
        tdancount: '',
        daydataserialno: '',
      },
      monthTarget: "", //本月目标
      weekTarget: '', //本周目标
      month_modify: '',
      week_modify: "",
      // todaySummary: '',
      // tomorrowActing: '',
      delRemark: true, //跟进记录的删除按钮是否显示
      audioPaused: true,
      currentCallIndex: '',
      audioSrc: '',

      ArticleData: [],
      isArticle: true,
      sable: false,
      inputUserform1: [],
      inputUserform2: [], //储存记忆
      channelList: [],
      channelOptions: [],
      planid: '批次号', //广告计划ID
      planidBatchno: '',
      planidValue: '',
      batchnoValue: '',
      channelValue: '',
      birthday: '',
      cjgcontent: '保单检视',
      cjgtype: '',
      phoneWxno: '电话号码',
      phoneWxnoValue: '',
      my_url: my_url,
      currentSuggestion: 'zjsuggestion',
      tableDataOverview: [],
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
      iscall: 'N',
      isrefresh: false,
      callSum: '',
      selectTime: '',
      selectTimeCusdeal: '',
      Salesman: '',

      mobile: '',
      wxno: '',
      username: '',
      followupstep: '99',
      steps: [],
      select_steps: [],
      add_steps: [],
      fileList: [],
      activeName: '99',
      tableData: [],
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      loading: true,
      queryflag: true,
      queryflagString: '01',
      menutype: '',
      value: [],
      my_list: '',
      my_list2: '',
      userNameOptions: [],
      policyList: [],
      otherstore: '',
      sourcelevel: '',
      CJGselectValue: '',
      inputUserform: {
        sourcelevel: 'A',
        batchno: '',
        wxno: '',
        mobile: '',
        name: ''
      },
      resourceDeployform: {
        activityid: '',
        userid: '',
        followupstep: ''
      },
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
      detailsInfo: '',
      sipmobilestr: '',
      activitytag: '', //标签
      activitytags: [],
      age: '50',
      sex: '',
      wxno: '',
      wxnostr: '',
      email: '',
      mobileprovince: '',
      mobilecity: '',
      mobilecountry: '',
      address: '',
      idoverageActived: false,
      peerActived: false,
      vacantnumberActived: false,
      dis_save: false,
      dis_P4_up: false,
      dis_Pz_up: false,
      visit: '',
      returnVisit: '',
      sexs: [{
        key: '男',
        value: '男'
      }, {
        key: '女',
        value: '女'
      }],
      callDataList: [],
      cjgTitle: '',
      followrecord: '', //发布信息
      releaseNum: '', //发布数量
      records: [

      ],
      dialogTitle: '',
      dialogVisible: false,
      cjgdrawer: false,
      idoverage: '',
      ispeer: '',
      isvacantnumber: '',
      shareDialogVisible: false,
      shareUserName: '',
      cjgList: [],
      remark: '',
      inputUserVisable: false,
      deleteSourceVisable: false,
      resourceDeployVisable: false,
      multipleSelection: [],
      ismyUse: true,
      isTop: false,
      teamData: [],
      teamDataList: [],
      timeOption: [{
        key: "今日",
        value: "1"
      },
      {
        key: "昨日",
        value: "2"
      },
      {
        key: "最近7天",
        value: "3"
      },
      {
        key: "最近30天",
        value: "4"
      },
      {
        key: "本周",
        value: "5"
      },
      {
        key: "本月",
        value: "6"
      },
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      teamNames: "团队选择",
      teamList: '',
      userNameList: [],

      teamNames2: "团队选择",
      teamList2: '',
      userNameList2: [],
      mobileList: [],
      addMoblie: '',
      deleteMobile: '',
      mobileInputShow: false,
      editInfo: {
        shareuserid: '',
        otherstore: '',
        shareusername: ''
      },
      otherstores: [],
      SalesmanIdBox: [],
      checkedAll: false,
      checkedAllNum: 0,
      drawerWidth: '',
      docEl: '',
      editPrevistitime: '',
      previstirimeVisable: true,
      previstitimePickerOptions: { //控制时间范围
        disabledDate(time) {
          return time.getTime() < (Date.now() - (24 * 60 * 60 * 1000))
        }
      },
      //保单检视
      bdjsItem: {
        title: '',
        insorgancode: '',
        riskcode: '',
        marketdate: '',
        goodpoint: '',
        badpoint: '',
        suggestion: '',
        policydetail: '',
      },
      //疾病核保
      jbhbItem: {
        title: '',
        disdescription: '',
        zjsuggestion: '',
        ylsuggestion: '',
        productJsonStr: []
      },
      //解答疑义
      dkwItem: {
        title: '',
        content: '',
        voice: ''
      },
      cjgTitle: '',
      addMobliePopVisible: false,
      order: '',
      prop: '',
      //查看编辑弹窗
      showEditPopupDialogVisible: false,
      detailObj: {},
      crm_url: '',
      audioShow: false,
      adLabelselect: '06'
      // adLabelselect: [
      //   {dd_key: "01", dd_value: "高意向保障"},
      //   {dd_key: "02", dd_value: "高意向理财"},
      //   {dd_key: "03", dd_value: "保单置换规划"},
      //   {dd_key: "04", dd_value: "仅意外医疗"},
      //   {dd_key: "05", dd_value: "其它需求"},
      //   {dd_key: "06", dd_value: "未取得有效沟通"}
      // ]
    };
  },

  mounted: function () {
    var _this = this;
    this.getchannelNameList();
    this.tableHeard();
    this.getIsCall();
    this.getConditionData();
    this.getTeamList()

    this.$nextTick(() => {
      let params = {
        pageNumber: this.pageNum,
        pageSize: this.pageSize,
        queryflag: this.queryflagString,
        ismyUse: true,
        followupstep: '99',
        menutype: '75000000',
        sourcelevel: '',
        planid: this.planidValue,
        batchno: this.batchnoValue
      };
      this.getTableData(params); //table数据	
      this.getUserIdData();
    })
    var now = new Date(); // 当前日期
    var nowDay = now.getDate(); // 当前日
    var nowMonth = now.getMonth(); // 当前月
    var nowYear = now.getYear(); // 当前年
    var start = formatDate(new Date(now.getFullYear(), nowMonth, nowDay));
    var end = formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1));
    var audio = this.$refs.audio;
    this.overviewForm.startDate = formatDate(new Date(start), 'yyyy-MM-dd 00:00:00').substring(0, 10);
    this.overviewForm.endDate = formatDate(new Date(end), 'yyyy-MM-dd 00:00:00').substring(0, 10);
    this.refresh();
    audio.addEventListener('ended', function(e){
      _this.audioPaused = true;
      _this.audioShow = false;
    }, false)
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
  computed: {

  },
  methods: {
    selectDate() {
      this.dataEntry(1)
    },
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
    dataEntry(aa) {
      var _this = this
      this.dialogVisible = true
      console.log(aa == 1)
      if (aa != 1) {
        this.from.recorddate = moment().format('YYYY-MM-DD 00:00:00')
      }
      var date = {
        recorddate: this.from.recorddate
      }

      getData('post', my_url + '/crm/activity/getOneDayData.do', function (data) {
        if (data.code == '0') {
          if (data.oneDayData) {
            _this.from.hotlinecount = data.oneDayData.hotlinecount != undefined ? data.oneDayData.hotlinecount : '0'
            _this.from.callcount = data.oneDayData.callcount != undefined ? data.oneDayData.callcount : '0'
            _this.from.connectcount = data.oneDayData.connectcount != undefined ? data.oneDayData.connectcount : '0%'
            _this.from.connectrate = data.oneDayData.connectrate != undefined ? data.oneDayData.connectrate : '0'
            _this.from.cluecallcount = data.oneDayData.cluecallcount != undefined ? data.oneDayData.cluecallcount : '0'
            _this.from.callcentertime = data.oneDayData.callcentertime != undefined ? data.oneDayData.callcentertime : '0'
            _this.from.nocallcentertime = data.oneDayData.nocallcentertime != undefined ? data.oneDayData.nocallcentertime : 0
            _this.from.sumtime = _this.from.nocallcentertime + _this.from.callcentertime
            _this.from.wxcount = data.oneDayData.wxcount != undefined ? data.oneDayData.wxcount : 0
            _this.from.firstplancount = data.oneDayData.firstplancount != undefined ? data.oneDayData.firstplancount : 0
            _this.from.secondplancount = data.oneDayData.secondplancount != undefined ? data.oneDayData.secondplancount : 0
            _this.from.claimcount = data.oneDayData.claimcount != undefined ? data.oneDayData.claimcount : 0
            _this.from.tdancount = data.oneDayData.tdancount != undefined ? data.oneDayData.tdancount : 0
            _this.from.daydataserialno = data.oneDayData.daydataserialno
            _this.monthTarget = data.oneDayData.month_fyp_target
            _this.weekTarget = data.oneDayData.week_fyp_target

            // if (data.month_modify == '') {
            //   _this.month_modify = false
            // } else {
            //   if (data.month_modify == 'no') {
            //     _this.month_modify = true
            //   } else {
            //     _this.month_modify = false
            //   }
            // }

            // if (data.week_modify == ''||data.week_modify==undefined) {
            //   _this.month_modify = false
            // } else{
            //   if (data.week_modify == 'no') {
            //     _this.week_modify = true
            //   } else {
            //     _this.week_modify = false
            //   }
            // }

            // _this.month_modify=data.month_modify
            // _this.week_modify=data.week_modify
          }
        }
      }, date)
    },

    sureData() {
      var _this = this
      if (this.from.nocallcentertime > 300 || this.from.nocallcentertime < 0) {
        _this.$message({
          showClose: true,
          message: '非话务时长 0<X<300 ',
          duration: 3000,
          type: 'error'
        });
        return
      }
      if (isNaN(_this.monthTarget) || isNaN(_this.weekTarget)) {
        _this.$message({
          showClose: true,
          message: '目标标保必须为数值',
          duration: 3000,
          type: 'error'
        });
        return
      }

      if (_this.monthTarget == '' || _this.weekTarget == '') {
        _this.$message({
          showClose: true,
          message: '目标标保为必填值',
          duration: 3000,
          type: 'error'
        });
        return
      }

      console.log(Number(_this.monthTarget) > Number(_this.weekTarget))
      if (Number(_this.monthTarget) < Number(_this.weekTarget)) {
        _this.$message({
          showClose: true,
          message: '本月目标必须大于本周目标',
          duration: 3000,
          type: 'error'
        });
        return
      }

      getData('post', my_url + '/crm/auth/getToken.do', function (data) {
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
            // today_work: _this.todaySummary,
            // tomorrow_plan: _this.tomorrowActing
          }
          getData('post', crm_url + 'insure.meihualife.com/crm_web/dayDataInsert.do', function (data) {
            if (data.code == '0') {
              _this.$message({
                showClose: true,
                message: '修改成功!',
                duration: 3000,
                type: 'success'
              });
              _this.dialogVisible = false
              _this.from.recorddate = moment().format('YYYY-MM-DD 00:00:00')
            } else if (data.code == '1') {
              _this.$message({
                showClose: true,
                message: data.msg,
                duration: 3000,
                type: 'error'
              });
            }
          }, body)
        } else {
          _this.$message({
            showClose: true,
            message: "缺少token,请联系开发人员",
            duration: 3000,
            type: 'error'
          });
        }


      })
    },


    handleClose() {
      this.dialogVisible = false
    },
    getchannelNameList() {
      let _this = this;
      getData('post', my_url + '/crm/channel/getChannelData.do', function (data) {
        if (data.code == 0) {
          _this.channelList = data.channelList;
        }
      });
    },
    tableHeard() {
      var _this = this
      getData('post', my_url + '/crm/tableheard/getTableHeardInfo.do', function (data) {
        if (data.displaycontent == '') {
          _this.inputUserform1 = ["menudate", "makedate", "firstcalltime", "lastcalltime", "batchno", "module_name"]
        } else {
          var aa = data.displaycontent.split(",")
          _this.inputUserform1 = aa
          _this.inputUserform2 = aa
        }

      }, {
        type: "customerManagementNew"
      })
    },

    checkedSure() {
      var _this = this
      var displaycontent = this.inputUserform1
      var date = {
        type: "customerManagementNew",
        displaycontent: displaycontent.toString()
      }
      getData('post', my_url + '/crm/tableheard/saveTableHeardInfo.do', function (data) {
        if (data.code == '0') {
          _this.sable = false
          _this.inputUserform2 = _this.inputUserform1
        }
      }, date)
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
      this.selectTimeCusdeal = '';
      this.Salesman = '';
      this.mobile = '';
      this.wxno = '';
      this.username = '';
      this.queryflag = false;
      this.hotlineStartDate = ''; //线索开始时间
      this.hotlineEndDate = '';
      this.cusdealStartDate = '';
      this.cusdealEndDate = '';
      this.channelValue = ''
    },
    search(page) { //查询
      if (this.isArticle == false) {
        this.articleData(1)
      } else {

        let {
          Salesman,
          queryflag,
          mobile,
          wxno,
          username,
          followupstep,
          sourcelevel,
          prop,
          order
        } = this;
        let hotlineStartDate = '',
          hotlineEndDate = '',
          cusdealStartDate = '',
          cusdealEndDate = '';


        if (this.selectTime && this.selectTime.length > 0) {
          hotlineStartDate = this.formatDate(this.selectTime[0], 'yyyy-MM-dd');
          hotlineEndDate = this.formatDate(this.selectTime[1], 'yyyy-MM-dd');
        };

        if (this.selectTimeCusdeal && this.selectTimeCusdeal.length > 0) {
          cusdealStartDate = this.formatDate(this.selectTimeCusdeal[0], 'yyyy-MM-dd');
          cusdealEndDate = this.formatDate(this.selectTimeCusdeal[1], 'yyyy-MM-dd');
        };
        if (this.queryflagString != "03") {
          this.queryflagString = this.queryflag ? "01" : '02'
        }
        if (this.phoneWxno == '电话号码') {
          this.mobile = this.phoneWxnoValue
          this.wxno = ''
          this.batchnoValue = ''
        } else {
          this.mobile = ''
          this.wxno = this.phoneWxnoValue
        }
        var channelListSum = this.channelList.concat(this.channelOptions)

        if (this.planid == '广告计划ID') {
          this.batchnoValue = ''
          this.channelValue = ''
          this.planidValue = this.planidBatchno
        } else if (this.planid == '渠道类型') {
          this.planidValue = ''
          this.channelValue = ''
          this.channelValue = this.planidBatchno

          var channeldetail = ''
          var channel = ''
          channelListSum.forEach(res => {
            if (res.dd_value == this.planidBatchno) {
              if (res.dd_key.length < 5) {
                channel = res.dd_key
              } else {
                channeldetail = res.dd_key
              }
            }
          })



        } else if (this.planid == '批次号') {
          this.batchnoValue = ''
          this.planidValue = ''
          this.batchnoValue = this.planidBatchno
        }



        let params = {
          hotlineStartDate: hotlineStartDate, //线索开始时间
          hotlineEndDate: hotlineEndDate, //线索终止时间
          // cusdealStartDate: cusdealStartDate, //成交起期
          // cusdealEndDate: cusdealEndDate, //成交止期
          planid: this.planidValue,
          name: Salesman, //客户姓名
          userid: this.overviewForm.userid, //业务员姓名
          mobile: this.mobile,
          wxno: this.wxno,
          followupstep: followupstep,
          pageNumber: page || this.pageNum,
          pageSize: this.pageSize,
          queryflag: this.queryflagString,
          menutype: '75000000',
          sourcelevel: sourcelevel,
          teamid: this.overviewForm.teamid,
          prop: prop,
          order: order,
          batchno: this.batchnoValue,
          channeldetail: channeldetail,
          channel: channel
        };
        this.loading = true;
        this.getTableData(params);
      } //table数据}
    },
    toggerIsVist(scop) {
      var _this = this
      getData('post', my_url + '/crm/activity/activityVisit.do', function (data) {
        if (data.code == 0) {
          _this.$message({
            showClose: true,
            message: '成功!',
            duration: 3000,
            type: 'success'
          });
          _this.search(_this.pageNum);
          _this.refresh()
        } else {
          _this.$message({
            showClose: true,
            message: data.msg,
            duration: 3000,
            type: 'error'
          });
        }
      }, {
        activityserialno: scop.row.activityserialno
      });
    },
    editPrevistTime(scop) {
      var _this = this
      getData('post', my_url + '/crm/activity/updatePrevistiTime.do', function (data) {
        if (data.code == 0) {
          _this.$message({
            showClose: true,
            message: '成功!',
            duration: 3000,
            type: 'success'
          });
          _this.previstirimeVisable = false;
          scop.row.previstitime = false;
          _this.search(_this.pageNum);
        } else {
          _this.$message({
            showClose: true,
            message: data.msg,
            duration: 3000,
            type: 'error'
          });
        }
      }, {
        activityserialno: scop.row.activityserialno,
        previstitime: _this.formatDate(_this.editPrevistitime, 'yyyy-MM-dd HH:mm:ss')
      });
    },
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
    disarticleUrl(row) {
      if (row.articleurl != null && row.articleurl != '') {
        window.open(row.articleurl,
          '_blank', 'width=400px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no');
      }
    },
    disVideoUrl(row) {
      if (row.videourl != null && row.videourl != '') {
        window.open(row.videourl,
          '_blank', 'width=600px,height=550px,left=400px,top=100px,menubar=no,toolbar=no,scrollbars=yes,location=no');
      }
    },
    getIsCall() {
      let _this = this;
      getData('post', my_url + '/crm/common/getIsCall.do', function (data) { //渠道类型
        if (data.code == 0) {
          _this.iscall = data.iscall;
        }
      }, null);
    },
    getConditionData() { //条件数据
      let _this = this;
      getData('post', my_url + '/crm/common/getDictList.do', function (data) { //渠道类型
        if (data.code == 0) {
          let {
            dictList
          } = data;

          _this.channelOptions = dictList;
        }
      }, {
        dict_type: 'source'
      });
      getData('post', my_url + '/crm/common/getDictList.do', function (data) { //跟进步骤
        if (data.code == 0) {
          _this.steps = data.dictList;
          let select_dictList = JSON.parse(JSON.stringify(data.dictList))
          select_dictList.unshift({
            dd_key: "99",
            dd_value: "新资源"
          })
          // select_dictList.unshift({
          //   dd_key: "98",
          //   dd_value: "企微资源"
          // })
          _this.select_steps = select_dictList;

          var add_dictList = JSON.parse(JSON.stringify(data.dictList))

          add_dictList.push({
            dd_key: "gxkh",
            dd_value: "共享客户"
          })
          add_dictList.unshift({
            dd_key: "99",
            dd_value: "新资源"
          })
          add_dictList.unshift({
            dd_key: "98",
            dd_value: "企微资源"
          })
          for (let i = 0; i < add_dictList.length; i++) {
            let _thisindex = i;
            if (add_dictList[_thisindex].dd_key == "gxkh") {
              add_dictList[_thisindex].roule = "回收规则：不回收"
              add_dictList[_thisindex].bignum = "最大容量：无上限"
            }
            if (add_dictList[_thisindex].dd_key == "99") {
              add_dictList[_thisindex].roule = "回收规则：A理财和A重疾类资源7天以后回收；其它资源每天晚上24点回收"
              add_dictList[_thisindex].bignum = "最大容量：无上限"
            }
            if (add_dictList[_thisindex].dd_key == "10" || add_dictList[_thisindex].dd_key == "01" || add_dictList[_thisindex].dd_key == "02" || add_dictList[_thisindex].dd_key == "03" || add_dictList[_thisindex].dd_key == "04" || add_dictList[_thisindex].dd_key == "05") {
              add_dictList[_thisindex].roule = "回收规则：不回收"
              add_dictList[_thisindex].bignum = "最大容量：200条"
            }
            if (add_dictList[_thisindex].dd_key == "07") {
              add_dictList[_thisindex].roule = "回收规则：不回收"
              add_dictList[_thisindex].bignum = "最大容量：无上限"
            }
            if (add_dictList[_thisindex].dd_key == "06") {
              add_dictList[_thisindex].roule = "回收规则：每天晚上24点回收所有资源"
              add_dictList[_thisindex].bignum = "最大容量：无上限"
            }
            if (add_dictList[_thisindex].dd_key == "98") {
              add_dictList[_thisindex].roule = "回收规则：不回收"
              add_dictList[_thisindex].bignum = "最大容量：无上限"
            }
          }


          _this.add_steps = add_dictList;
          _this.activeName = add_dictList[1].dd_key;
        };
      }, {
        dict_type: 'followupstep'
      });
      getData('post', my_url + '/crm/common/getDictList.do', function (data) { //标签 
        if (data.code == 0) {
          let {
            dictList
          } = data;
          _this.customers = dictList;
        }
      }, {
        dict_type: 'activitytag'
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
    articleData(page) {
      var that = this

      this.isArticle = false
      let hotlineStartDate = '',
        hotlineEndDate = ''

      if (this.selectTime.length > 0) {
        hotlineStartDate = this.formatDate(this.selectTime[0], 'yyyy-MM-dd');
        hotlineEndDate = this.formatDate(this.selectTime[1], 'yyyy-MM-dd');
      };

      if ( this.selectTimeCusdeal && this.selectTimeCusdeal.length > 0) {
        cusdealStartDate = this.formatDate(this.selectTimeCusdeal[0], 'yyyy-MM-dd');
        cusdealEndDate = this.formatDate(this.selectTimeCusdeal[1], 'yyyy-MM-dd');
      };
      getData('post', my_url + '/crm/auth/getToken.do', function (data) {
        var params = {
          cluestartdate: hotlineStartDate, //线索开始时间
          clueenddate: hotlineEndDate, //线索终止时间
          token: data.token,
          isaddfriend: "Y",
          pageNumber: page,
          pageSize: that.pageSize,
        }
        getData('post', crm_url + 'insure.meihualife.com/crm_web/getArticleClueList.do', function (data) {
          that.ArticleData = data.rows

          that.pageTotal = data.total

        }, params);
      })



    },



    handleClick(val) {
      if (val.name == "98") {
        this.articleData(1)
      } else {
        this.isArticle = true
      }
      if (val.name == 'gxkh') {
        this.queryflagString = "03"
        this.followupstep = "";
        this.ismyUse = false;
        this.search(1)
      } else {
        this.queryflagString = this.queryflag ? "01" : '02'
        this.followupstep = val.name;
        this.ismyUse = true;
        this.search(1)
      }


    },
    getTableData(params) { //table数据
      let _this = this;
      getData('post', my_url + '/crm/activity/getActivityList.do', function (data) {
        let {
          rows,
          total
        } = data;
        _this.pageTotal = total;
        if (rows) {
          rows.forEach(res => {
            if (res.channel == "8001") {
              res['channelname'] = res.channeldetailname
            }
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


            if (_this.iscall == 'Y') {
              res.newmobilestr = 'javascript:void(0);';
            } else {
              res.newmobilestr = 'sip:0' + res.mobilestr;
            }
          })
        }

        _this.tableData = rows;

        if (_this.queryflagString == "01" || _this.queryflagString == "03") {
          _this.isTop = true
        } else {
          _this.isTop = false
        }
        _this.loading = false;
        _this.$nextTick(function() {
          _this.scrollHieght();
        })
      }, params);

    },
    pageClick(page) { //点击分页
      this.pageNum = page;
      if (this.isArticle == false) {
        this.articleData(page);
      } else {
        this.search(page)
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (row.toporderid) {
        return 'top-row';
      }
      return '';
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
    formatDate: function (date, format) { //格式化时间
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
    //点击客户姓名 展示详细信息
    handle(row) {
      let _this = this;
      this.drawer = true;
      this.cjgList = [];
      this.cjgTitle = '';

      if (this.queryflagString == '01' || this.queryflagString == '03') {
        this.dis_save = true;
        if (this.iscall == 'Y') {
          this.sipmobilestr = 'javascript:void(0);';
        } else {
          this.sipmobilestr = 'sip:0' + row.mobilestr;
        }
      } else if (this.queryflagString == '02') {
        this.dis_save = false;
        this.sipmobilestr = 'javascript:void(0);';
      }

      if (this.queryflagString == '01') {
        this.delRemark = true
      } else {
        this.delRemark = false
      }

      row.username = row.username != undefined ? row.username : '无';

      // this.activitytag = row.activitytag != undefined ? row.activitytag.split(',') : [];
      this.returnVisit = row.previstitime != undefined ? row.previstitime : '';
      this.visit = row.followupstep != undefined ? row.followupstep : '';
      this.wxno = row.wxno != undefined ? row.wxno : '';
      this.wxnostr = row.wxnostr != undefined ? row.wxnostr : '';
      this.age = row.age != undefined ? row.age : '';
      this.birthday = row.birthday != undefined ? row.birthday : '';
      this.sex = row.sex != undefined ? row.sex : '';
      this.email = row.email != undefined ? row.email : '';

      this.mobileprovince = row.mobileprovince != undefined ? row.mobileprovince : '';
      this.mobilecity = row.mobilecity != undefined ? row.mobilecity : '';
      this.mobilecountry = row.mobilecountry != undefined ? row.mobilecountry : '';
      this.address = row.address != undefined ? row.address : '';
      this.idoverage = row.idoverage != undefined ? row.idoverage : '';
      this.ispeer = row.ispeer != undefined ? row.ispeer : '';
      this.isvacantnumber = row.isvacantnumber != undefined ? row.isvacantnumber : '';
      this.idoverageActived = row.idoverage != undefined ? row.idoverage === 'Y' : '';
      this.peerActived = row.ispeer != undefined ? row.ispeer === 'Y' : '';
      this.vacantnumberActived = row.isvacantnumber != undefined ? row.isvacantnumber === 'Y' : '';
      this.activitytags = this.customers;
      this.detailsInfo = row;
      this.mobilestr = row.mobilestr;
      this.getReleaseData(); //发布的列表
      this.getCallData();
      this.getmobileList(row.activityserialno)


      this.editInfo.shareusername = row.shareusername;
      this.editInfo.otherstore = row.otherstore;
      this.adLabelselect = row.activitytag || '06';
      if (this.followupstep == "07") {
        this.getOrderData();
      }

      if (this.queryflagString == '01' || this.queryflagString == '03') {
        this.detailsInfo.mobilestr = row.mobilestr;
        this.detailsInfo.wxno = row.wxno;
        this.detailsInfo.wxnostr = row.wxnostr;
      } else if (this.queryflagString == '02') {
        this.detailsInfo.mobilestr = row.mobilestr;
        this.detailsInfo.wxnostr = row.wxnostr;
      }
      if(!row.activitytag) {
        this.sendActivitytag()
      }
      //已成交处理
      this.isDealed = (this.followupstep == "07")
    },
    sendActivitytag() {
      let _this = this;
      let params = {
        activitytag: this.adLabelselect,
        activityserialno: this.detailsInfo.activityserialno
      }
      getData('post', my_url + '/crm/activity/updateActivityTag.do', function (data) {
        if(data.code == 0) {
          _this.tableData.forEach((item, index)=> {
            _this.$set(_this.tableData[index], 'activitytag', _this.adLabelselect)
          })
        }
      }, params);
    },
    activitytagClick() {
      this.sendActivitytag()
    },
    //点击成交单子，查看详情
    showEdit(item) {
      var arr=[]
      arr.push(item)
      this.detailObj = arr;
      this.showEditPopupDialogVisible = true;
    },

    phonecall_row(row) {
      this.$parent.onSend({mobile: row.mobilestr, activityid: row.activityserialno});
      // this.phonecall(row.activityserialno, row.mobilestr);
    },
    phonecall_page() {
      if (this.dis_save == true) {
        this.$parent.onSend({mobile:this.detailsInfo.mobilestr, activityid: this.detailsInfo.activityserialno});
        // this.phonecall(this.detailsInfo.activityserialno, this.detailsInfo.mobilestr);
      }
    },
    phonecall(activityid, phoneStr) {
      let _this = this;
      let params = {
        activityserialno: activityid,
        mobile: phoneStr
      }
      getData('post', my_url + '/crm/activity/activityCall.do', function (data) {
        if(data.code == 0) {
          _this.search();
          if (_this.iscall == 'Y') {
            let params = {
              Action: "DialCTI",
              dn: data.phoneno,
              anis: data.phoneprefix + phoneStr,
              cltid: data.callid
            };
            getPhoneData('post', 'http://' + data.phoneurl + '/CRM2CTI/', function (data) { }, params);
          }
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
    clickIdoverage() { //点击转超龄客户
      if (this.idoverage == 'Y') {
        this.idoverage = 'N'
      } else {
        this.idoverage = 'Y'
        this.ispeer = 'N'
        this.isvacantnumber = 'N'
        this.dialogVisible = true
      }
    },
    clickIspeer() { //点击转同行资源
      if (this.ispeer == 'Y') {
        this.ispeer = 'N'
      } else {
        this.ispeer = 'Y'
        this.idoverage = 'N'
        this.isvacantnumber = 'N'
        this.dialogVisible = true
      }
    },
    clickIsvacantnumbe() { //点击转空号停机
      if (this.isvacantnumber == 'Y') {
        this.isvacantnumber = 'N'
      } else {
        this.isvacantnumber = 'Y'
        this.ispeer = 'N'
        this.idoverage = 'N'
        this.dialogVisible = true
      }
    },
    remoteMethod(query) {
      let _this = this;
      if (query !== '') {
        this.loading = true;
        this.cjgList = []
        let body = {
          title: query,
        }
        getData('post', my_url + '/crm/knowledge/getKnowledgeList.do', function (data) { //渠道类型
          _this.loading = false;
          data.rows.forEach(item => {
            _this.cjgList.push({
              "value": item.baseid,
              "baseid": item.baseid,
              "label": "【" + item.typename + "】" + item.title,
              type: item.type,
              typename: item.typename
            });
          })
        }, body);
      } else {
        this.cjgList = [];
      }
    },
    cjgChange() {
      let item = this.cjgList.find(item => item.baseid === this.cjgTitle)
      this.showEditPopup(item)
    },

    cjgfocus() {
      this.cjgTitle = ''
    },
    cancel() { //取消
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
    postRemark() {
      let _this = this;
      let path;
      if (this.idoverage === 'Y') path = '/crm/activity/activityOverAge.do'
      if (this.ispeer === 'Y') path = '/crm/activity/activityPeer.do'
      if (this.isvacantnumber === 'Y') path = '/crm/activity/activityVacantNumber.do'
      getData('post', my_url + path, function (data) { //渠道类型
        if (data.code == 0) {
          _this.dialogVisible = false
          _this.idoverageActived = false
          _this.peerActived = false
          _this.vacantnumberActived = false
          if (_this.idoverage === 'Y') {
            _this.idoverageActived = true
          }
          if (_this.ispeer === 'Y') {
            _this.peerActived = true
          }
          if (_this.isvacantnumber === 'Y') {
            _this.vacantnumberActived = true
          }
        }
      }, {
        remark: _this.remark,
        activityserialno: _this.detailsInfo.activityserialno
      });
    },
    newWangEditor(el1, el2) {
      editor4 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      editor4.customConfig.pasteFilterStyle = false
      // 隐藏“网络图片”tab
      editor4.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor4.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor4.customConfig.uploadImgShowBase64 = true
      editor4.customConfig.menus = [
        'image',
      ]
      // 上传图片到服务器
      editor4.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor4.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor4.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

      //自定义上传图片事件
      editor4.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {

        },
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
        }
      }
      editor4.create()
    },
    newWangEditor1(el1, el2) {
      editor5 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      editor5.customConfig.pasteFilterStyle = false
      // 隐藏“网络图片”tab
      editor5.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor5.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor.customConfig.uploadImgShowBase64 = true
      editor5.customConfig.menus = [
        'image',
      ]
      // 上传图片到服务器
      editor5.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor5.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor5.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

      //自定义上传图片事件
      editor5.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {

        },
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
        }
      }
      editor5.create()
    },
    newWangEditor2(el1, el2) {
      editor6 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      editor6.customConfig.pasteFilterStyle = false
      // 隐藏“网络图片”tab
      editor6.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor6.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor.customConfig.uploadImgShowBase64 = true
      editor6.customConfig.menus = [
        'image',
      ]
      // 上传图片到服务器
      editor6.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor6.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor6.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

      //自定义上传图片事件
      editor6.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {

        },
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
        }
      }
      editor6.create()
    },
    newWangEditor3(el1, el2) {
      editor7 = new wangEditor(el1, el2) // 两个参数也可以传入 elem 对象，class 选择器
      // 关闭粘贴内容中的样式
      editor7.customConfig.pasteFilterStyle = false
      // 隐藏“网络图片”tab
      editor7.customConfig.showLinkImg = false
      // 忽略粘贴内容中的图片
      editor7.customConfig.pasteIgnoreImg = true
      // 使用 base64 保存图片
      //editor.customConfig.uploadImgShowBase64 = true
      editor7.customConfig.menus = [
        'image',
      ]
      // 上传图片到服务器
      editor7.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor7.customConfig.uploadImgServer = my_url + '/crm/fileupload/impUpload.do'; //设置上传文件的服务器路径
      editor7.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

      //自定义上传图片事件
      editor7.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {

        },
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
        }
      }
      editor7.create()
    },
    showEditPopup(item) {

      this.getItem(item).then(res => {
        this.getUploadFile(item.baseid)
        let body, url
        if (item.type === '01') {
          this.bdjsItem = res.policyread
          this.bdjsItem.baseid = item.baseid
        }
        if (item.type === '02') {
          this.jbhbItem = res.diseaseUw
          this.jbhbItem.baseid = item.baseid
          this.$set(this.jbhbItem, 'productJsonStr', res.diseaseUwProductList)
        }
        if (item.type === '03') {
          this.dkwItem = res.anscusque
          this.dkwItem.baseid = item.baseid
        }
        this.CJGselectValue = item.typename
        this.cjgdrawer = true
        this.$nextTick(() => {
          if (this.bdjsItem.policydetail && item.type === '01') {
            this.newWangEditor('', '#div2')
            editor4.txt.html(this.bdjsItem.policydetail)
            editor4.$textElem.attr('contenteditable', false)
          } else {
            $('.w-e-text').remove()
          }
        })
        this.$nextTick(() => {
          if (this.bdjsItem.suggestion && item.type === '01') {
            this.newWangEditor1('', '#div4')
            editor5.txt.html(this.bdjsItem.suggestion)
            editor5.$textElem.attr('contenteditable', false)
          } else {
            $('.w-e-text').remove()
          }
        })
        this.$nextTick(() => {
          if (this.dkwItem.content && item.type === '03') {
            this.newWangEditor2('', '#div6')
            this.newWangEditor3('', '#div8')
            editor6.txt.html(this.dkwItem.content)
            editor7.txt.html(this.dkwItem.voice)
            editor6.$textElem.attr('contenteditable', false)
            editor7.$textElem.attr('contenteditable', false)
          }
        })
      })
    },
    changeSuggestion(Suggestion) {
      this.currentSuggestion = Suggestion
    },
    getItem(item) {
      let body = {
        baseid: item.baseid
      },
        url
      if (item.type === '01') {
        url = '/crm/knowledge/getOnePolicyRead.do'
      }
      if (item.type === '02') {
        url = '/crm/knowledge/getOneDiseaseUw.do'
      }
      if (item.type === '03') {
        url = '/crm/knowledge/getOneAnsCusQue.do'
      }

      return new Promise((resovle, reject) => {
        getData('post', my_url + url, res => {
          if (res.code == 0) {
            resovle(res)
          } else {
            reject()
          }
        }, body);
      })
    },
    getUploadFile(id) {
      let body = {
        secondid: id,
      }
      getData('post', my_url + '/crm/fileupload/getFileListBySecondId.do', res => {
        if (res.code == 0) {
          this.fileList = res.fileList
        }
      }, body);
    },

    querySearchId(queryString, cb) {
      var SalesmanIdBox = this.SalesmanIdBox;
      var results = queryString ? SalesmanIdBox.filter(this.createFilterId(queryString)) : SalesmanIdBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    shareCustomer() {
      let _this = this;
      getData('post', my_url + '/crm/activity/activityShare.do', function (data) { //渠道类型
        if (data.code == 0) {
          _this.shareDialogVisible = false
        }
      }, {
        activityuserid: _this.detailsInfo.userid,
        shareuserid: _this.SalesmanIdBox.find(item => item.value === this.shareUserName).id,
        activityserialno: _this.detailsInfo.activityserialno
      });
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
          // res.makedate = _this.formatDate(res.makedate, 'yyyy-MM-dd HH:ss:mm');
          res.remark = res.remark.replace(/:/g, '：');
          if(res.remark.indexOf('{') > -1 && res.remark.indexOf('}') > -1) {
            let str = '';
            let remark = JSON.parse(res.remark);
            for(let key in remark) {
              str += key + '：' + remark[key] + '<br/>';
            }
            res.remark = str
          }
        })
        _this.records = rows;
        // _this.records = [{
        //   remark: "sdadafasdada",
        //   oprname: "sssfa",
        //   makedate: '2019-9-10',
        //   remarkid: 1
        // }]
      }, params);
    },
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
    getCallData() {
      let _this = this;
      let params = {
        activityserialno: this.detailsInfo.activityserialno
      }
      getData('post', my_url + '/crm/activity/getCallList.do', function (data) {
        if (data.code == '0') {
          let arr = data.callList.map((item)=>{
            var calltimeType = item.calltime.replace(/-|:|_|\s/g,"");
            return Object.assign({}, item, { calltimeType: calltimeType })
          })
          _this.callDataList = arr;
          _this.callSum = data.callSum;
        }
      }, params);
    },
    top(row) {
      let _this = this;
      let params = {
        activityserialno: row.activityserialno
      }
      getData('post', my_url + '/crm/activity/setActivityTopOrder.do', function (data) {
        if (data.code == '0') {
          _this.search()
        }
      }, params);
    },
    cancelTop(row) {
      let _this = this;
      let params = {
        activityserialno: row.activityserialno
      }
      getData('post', my_url + '/crm/activity/unSetActivityTopOrder.do', function (data) {
        if (data.code == '0') {
          _this.search()
        }
      }, params);
    },
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
      getData('post', my_url + '/crm/activity/pageActivityInsert.do', function (data) {
        if (data.code == '0') {
          _this.$message({
            type: 'success',
            duration: 3000,
            message: "录入成功！"
          })
          _this.inputUserform.name = "";
          _this.inputUserform.mobile = "";
          _this.inputUserform.wxno = "";
          _this.inputUserform.batchno = "";
          _this.inputUserform.sourcelevel = "A";
          _this.inputUserVisable = false;
          _this.search();
        } else {
          _this.$message({
            type: 'waring',
            duration: 3000,
            message: data.msg
          })
        }
      }, _this.inputUserform);
    },
    inputUserCancel() {
      this.sable = false;
      this.inputUserform1 = this.inputUserform2
      this.inputUserVisable = false;
      this.inputUserform.name = '';
      this.inputUserform.mobile = '';
      this.inputUserform.wxno = '';
    },
    sortChange(val) {
      this.order = val.order
      this.prop = val.prop
      this.search();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.checkedAllNum = val.length;

    },
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
    handleSelectId(item) {
      this.resourceDeployform.userid = item.id
    },
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
          _this.userNameList = [];
          _this.teamNames = "团队选择"
          _this.teamList = ''
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
    resourceDeployCancel() {
      this.resourceDeployVisable = false;
      this.resourceDeployform.followupstep = '';
      this.resourceDeployform.activityid = '';
      this.editInfo.shareusername = '';
      this.resourceDeployform.userid = '';
      this.userNameList = [];
      this.teamNames = "团队选择";
      this.teamList = '';
      // this.$refs.tree1.setCheckedKeys([])
    },
    resourceDeployShow() {
      this.getTeamList()
    },
    getTeamList() {
      let _this = this;
      //设置当前用户的团队列表参数
      getData('post', my_url + '/crm/auth/getTeamList.do', function (data) {
        let tempData = [];
        if (data.teamList == null || data.teamList == '') {
          _this.disTeamAll = false;
        } else {
          _this.disTeamAll = true;
        }
        _this.teamDataList = data.teamList;
        // tempData = [{
        //   id: 1,
        //   label: '团队选择',
        //   children: data.teamList
        // }]

        // _this.teamData = tempData;

      });
    },

    handleCheckChange(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label)
      })
      this.my_list = teamListName.join(',');
      this.teamList = (checked.checkedKeys).join(',');
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
    my_sureOne() {
      this.$refs.disTeam.hide();
      this.my_list = '';
      this.teamList = '';
      this.teamNames = "团队选择";
      // this.$refs.tree1.setCheckedKeys([])
    },
    my_sure() {
      let _this = this;
      this.$refs.disTeam.hide();
      if (this.my_list == null || this.my_list == '' || this.my_list == '1') {
        // _this.$message({ showClose: true, message: '请选择团队数据', duration: 3000, type: 'error' });
        // return;
      }
      this.teamNames = this.my_list;
      //获取业务员列表
      getData('post', my_url + '/crm/auth/getUserIdNameListByTeam.do', function (data) {
        _this.userNameList = data.namelist
      }, {
        teamid: this.teamList
      });
    },
    my_sureOne2() {
      this.$refs.disTeam2.hide();
      this.my_list2 = '';
      this.teamList2 = '';
      this.teamNames2 = "团队选择";
      this.overviewForm.teamid = '';
      this.$refs.tree2.setCheckedKeys([]);
      this.queryflag = true;
      this.search();
      this.refresh();
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

      this.search();
      this.refresh();
      //获取业务员列表
      getData('post', my_url + '/crm/auth/getUserIdNameListByTeam.do', function (data) {
        _this.userNameOptions = data.namelist
      }, {
        teamid: this.teamList2
      });
    },
    dateChange(val) {
      var end = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));
      var start = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00'));
      var now = new Date(); // 当前日期
      var nowDayOfWeek = now.getDay(); // 今天本周的第几天
      var nowDay = now.getDate(); // 当前日
      var nowMonth = now.getMonth(); // 当前月
      var nowYear = now.getYear(); // 当前年
      if (val == "1") {
        start = formatDate(new Date(now.getFullYear(), nowMonth, nowDay));
        end = formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1));
      } else if (val == "2") {
        start = formatDate(new Date(now.getFullYear(), nowMonth, nowDay - 1));
        end = formatDate(new Date(now.getFullYear(), nowMonth, nowDay));
      } else if (val == "3") {
        start = formatDate(new Date(now.getFullYear(), nowMonth, nowDay - 7));
        end = formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1));
      } else if (val == "4") {
        start = formatDate(new Date(now.getFullYear(), nowMonth, nowDay - 30));
        end = formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1));
      } else if (val == "5") {
        // 本周从周日开始算
        nowYear += (nowYear < 2000) ? 1900 : 0;
        var day = nowDayOfWeek || 7;
        start = formatDate(new Date(now.getFullYear(), nowMonth, nowDay - day));
        end = formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 6 - day));
      } else if (val == "6") {
        nowYear += (nowYear < 2000) ? 1900 : 0;
        var monthStartDate = new Date(nowYear, nowMonth, 1);
        start = formatDate(monthStartDate);
        var monthEndDate = new Date(nowYear, nowMonth, getMonthDays());
        end = formatDate(monthEndDate);

        function getMonthDays() {
          var monthStartDate = new Date(nowYear, nowMonth, 1);
          var monthEndDate = new Date(nowYear, nowMonth + 1, 1);
          var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
          return days;
        }
      }
      this.overviewForm.startDate = formatDate(new Date(start), 'yyyy-MM-dd 00:00:00').substring(0, 10);
      this.overviewForm.endDate = formatDate(new Date(end), 'yyyy-MM-dd 00:00:00').substring(0, 10);
      this.queryflag = false;
      this.queryflagString = "02"
      //this.search();
      this.refresh();
    },
    userNameChange() {
      this.queryflag = false;
      this.queryflagString = "02"
      this.search();
      this.refresh();
    },
    refresh(flag) {
      var _this = this;
      var tableDataOverview = []
      if(flag) {
        this.isrefresh = true;
        setTimeout(() => {
          _this.isrefresh = false;
        }, 1000);
      }
      // _this.tableDataOverview = [],
      getData('post', my_url + '/crm/activity/getActivityDataView.do', function (data) {
        data.sumData_List.type = "总数量";
        data.today_X_List.type = "今日需回访"
        data.today_Y_List.type = "今日已回访"
        data.tomorrow_X_List.type = "明日需回访"

        data.sumData_List.yesterday = "昨日回访";
        data.today_X_List.yesterday = data.yesterday_visit
        data.today_Y_List.yesterday = "本月跟丢"
        data.tomorrow_X_List.yesterday = data.month06count
        tableDataOverview.push(data.sumData_List)
        tableDataOverview.push(data.today_X_List)
        tableDataOverview.push(data.today_Y_List)
        tableDataOverview.push(data.tomorrow_X_List)
        _this.tableDataOverview = tableDataOverview
      }, _this.overviewForm);
    },
    getOrderData() {
      let _this = this;
      getData('post', my_url + '/crm/activity/getPolicyInfoByAppntMobile.do', function (data) {
        if (data.code == '0') {
          var arr = [];
          data.policyList.forEach((item)=> {
            if(item.status === 'effective') {
              arr.unshift(item)
            } else {
              arr.push(item)
            }
          })
          _this.policyList = arr;
        }
      }, {
        mobile: this.detailsInfo.mobilebak
      });
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
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
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
        previstitime: this.formatDate(this.returnVisit, 'yyyy-MM-dd HH:mm:ss'), //预约回访时间
        followupstep: this.visit, //跟进步骤
        oldprevistitime: this.formatDate(this.detailsInfo.previstitime, 'yyyy-MM-dd HH:mm:ss'),
        otherstore: this.editInfo.otherstore,
        shareuserid: save_share_id,
        activityuserid: this.detailsInfo.userid,
        mobileprovince: this.mobileprovince,
        mobilecity: this.mobilecity,
        mobilecountry: this.mobilecountry,
        address: this.address,
        // activitytag: this.adLabelselect,
        // dict_type: 'activitytag'
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
    cancelShare(row) {
      let _this = this;
      getData('post', my_url + '/crm/activity/activityShareDelete.do', function (data) { //渠道类型
        if (data.code == '0') {
          _this.search()
        }
      }, {
        shareserialno: row.shareserialno
      });
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
      if(s4 > 0) {
        document.documentElement.scrollTop = s4;
      }
    },
    adLabelChange(e) {
      let _this = this;
      // getData('post', my_url + '/crm/activity/activityUpdate.do', function (data) { //渠道类型
      //   if (data.code == 0) {
          
      //   }
      // }, {type:'activitytag', activitytag: e });
    },
    test() {
      alert(123);
    }
  }
}