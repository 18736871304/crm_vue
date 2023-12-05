<template>
  <div>
    <div class="search-header">
      <div class="search-box clearfix">
        <div class="common-select" style="width: 30%">
          <div class="select-title" style="width: 1.28rem">线索时间</div>
          <div class="select-content" style="height: 0.3rem; width: calc(100% - 1.28rem); border: none">
            <el-date-picker class="el-date-picker-inners" size=mini v-model="selectTime" type="datetimerange" range-separator="-"
                start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">渠道类型</div>
          <div class="select-content" style="width: calc(100% - 1.28rem); border: none;">
              <el-select class="el-select-inners" v-model="reschannelname" multiple filterable remote reserve-keyword placeholder="" :remote-method="remoteMethod" >
                <el-option v-for="item in channelListType" :key="item.dd_key" :label="item.dd_value"
                    :value="item.dd_key" clearable>
                </el-option>
              </el-select>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">业务员姓名</div>
          <div class="select-content" style="width: calc(100% - 1.28rem);">
            <el-autocomplete class="el-input-inners" v-model="userName" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" @select='userNameSelect' size="mini"
                placeholder="请输入业务员姓名" clearable>
            </el-autocomplete>
          </div>
        </div>
        <div class="common-select" style="width: 20%">
          <div class="search-btn" @click="search(1)">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
        </div>
      </div>
    </div>
    <div class="table-box">
      <el-table class="splice-header" :data="tableData" border style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange" @sort-change="sortChange">
        <el-table-column align="center" key="2" type="index" label="序号">
        </el-table-column>
        <el-table-column align="center" key="3" prop="channelname" label="渠道类型" width="120">
        </el-table-column>
        <el-table-column align="center" key="4" prop="realname" label="业务员姓名" width="120">
        </el-table-column>
        <el-table-column align="center" key="5" prop="hotlinecount" label="总数量" width="90">
        </el-table-column>
        <el-table-column align="center" key="6" prop="callcount" label="拨打数量" width="90">
        </el-table-column>
        <el-table-column align="center" key="7" prop="hotlineconnectcount" label="接通数量" width="90">
        </el-table-column>
        <el-table-column align="center" key="8" prop="hotlineconnectrate" label="接通率" width="90">
        </el-table-column>
        <el-table-column align="center" key="9" prop="follow01count" label="微信" width="120">
        </el-table-column>
        <el-table-column align="center" key="10" prop="follow01rate" label="微信率" width="90">
        </el-table-column>
        <el-table-column align="center" key="11" prop="follow02count" label="计划书" width="90">
        </el-table-column>
        <el-table-column align="center" key="12" prop="follow02rate" label="计划书率" width="90">
        </el-table-column>
        <el-table-column align="center" key="13" prop="follow07count" label="已成交" width="90">
        </el-table-column>
        <el-table-column align="center" key="14" prop="" label="成交金额" width="90">
        </el-table-column>
        <el-table-column align="center" key="15" prop="follow07rate" label="已成交率" width="90">
        </el-table-column>
        <el-table-column align="center" key="16" prop="otherstore01" label="非标体" width="90">
        </el-table-column>
        <el-table-column align="center" key="17" prop="otherstore01rate" label="非标体率" width="90">
        </el-table-column>
        <el-table-column align="center" key="18" prop="otherstore02" label="高龄" width="90">
        </el-table-column>
        <el-table-column align="center" key="19" prop="otherstore02rate" label="高龄率" width="90">
        </el-table-column>
        <el-table-column align="center" key="20" prop="otherstore03" label="同行" width="90">
        </el-table-column>
        <el-table-column align="center" key="21" prop="otherstore03rate" label="同行率" width="90">
        </el-table-column>
        <el-table-column align="center" key="22" prop="otherstore04" label="空号停机" width="90">
        </el-table-column>
        <el-table-column align="center" key="23" prop="otherstore04rate" label="空号停机率" width="90">
        </el-table-column>
      </el-table>
    </div>
    <div class="channelReport-total clearfix">
      <div class="fl" style="width: 33.3%">
        <div class="agree">
          <p>总数量：</p>
          <p>{{ReportSum.hotlinecount}}</p>
        </div>
        <div class="agree">
          <p>拨打数量：</p>
          <p>{{ReportSum.callcount}}</p>
        </div>
        <div class="agree">
          <p>接通数量：</p>
          <p>{{ReportSum.hotlineconnectcount}}</p>
        </div>
        <div class="agree">
          <p>接通率：</p>
          <p>{{ReportSum.hotlineconnectrate}}</p>
        </div>
      </div>
      <div class="fl" style="width: 33.3%">
        <div class="agree">
          <p>微信：</p>
          <p>{{ReportSum.follow01count}}</p>
        </div>
        <div class="agree">
          <p>微信率：</p>
          <p>{{ReportSum.follow01rate}}</p>
        </div>
        <div class="agree">
          <p>计划书：</p>
          <p>{{ReportSum.follow02count}}</p>
        </div>
        <div class="agree">
          <p>计划书率：</p>
          <p>{{ReportSum.follow02rate}}</p>
        </div>
        <div class="agree">
          <p>已成交：</p>
          <p>{{ReportSum.follow07count}}</p>
        </div>
        <div class="agree">
          <p>已成交率：</p>
          <p>{{ReportSum.follow07rate}}</p>
        </div>
      </div>
      <div class="fl" style="width: 33.3%">
        <div class="agree">
          <p>非标体：</p>
          <p>{{ReportSum.otherstore01}}</p>
        </div>
        <div class="agree">
          <p>非标体率：</p>
          <p>{{ReportSum.otherstore01rate}}</p>
        </div>
        <div class="agree">
          <p>高龄：</p>
          <p>{{ReportSum.otherstore02}}</p>
        </div>
        <div class="agree">
          <p>高龄率：</p>
          <p>{{ReportSum.otherstore02rate}}</p>
        </div>
        <div class="agree">
          <p>同行：</p>
          <p>{{ReportSum.otherstore03}}</p>
        </div>
        <div class="agree">
          <p>同行率：</p>
          <p>{{ReportSum.otherstore03rate}}</p>
        </div>
        <div class="agree">
          <p>空号停机：</p>
          <p>{{ReportSum.otherstore04}}</p>
        </div>
        <div class="agree">
          <p style="width: 1.2rem;">空号停机率：</p>
          <p>{{ReportSum.otherstore04rate}}</p>
        </div>
      </div>
    </div>
    <div>
      <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize"
        :current-page="pageNum" @current-change="pageClick">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getData, my_url } from '../../../static/js/ajax.js';
import { formatDate } from '../../../static/js/common.js';
export default {
  data() {
        return {
            userName: '',
            userNameId: '',
            channelNameId: '',
            loading: false,
            //搜索
            selectTime: ['', ''],
            // resourcelevel: '',
            reschannelname: '',
            // state: '',
            //分页
            tableData: [],
            pageTotal: 0,
            pageSize: 20,
            pageNum: 1,
            //h合计数据
            ReportSum: {},
            // 渠道ID
            channelid: '',
            //远程搜索
            restaurants: [],
            reschannelList: [], //总的渠道
            channelListType: [], //筛选出来的
            SalesmanBox: [],
            //其他判断
            isshow: '',
            my_url: my_url,
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
        }
    },
    mounted: function () {
        this.yewu();
        this.qudao();
        this.search(1);
    },
  methods: {
    yewu() {
        let _this = this;
        getData('post', my_url + '/crm/auth/getAllUserIdNameList.do', function (data) {
            if (data.code == 0) {
                // this.restaurants = data.namelist;
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
    userNameSelect(item) {
        this.userNameId = item.userid
    },
    channelNameSelect(item) {
        this.channelNameId = item.key
    },
    createStateFilter(queryString) {
        return (state) => {
            return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
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
    qudao() {
        let _this = this;
        getData('post', my_url + '/crm/channel/getChannelData.do', function (data) {
            if (data.code == 0) {
                let channelList = data.channelList;
                _this.reschannelList = data.channelList;
                _this.channelListType = data.channelList;
                channelList.forEach(res => {
                    _this.SalesmanBox.push({
                        "value": res.dd_value,
                        "key": res.dd_key
                    });
                })
            }
        });
    },
    remoteMethod(query) {
        if (query !== '') {
            setTimeout(() => {
                this.channelListType = this.reschannelList.filter(item => {
                    return item.dd_value.toLowerCase()
                        .indexOf(query.toLowerCase()) > -1;
                });
            }, 200);
        } else {
            this.channelListType = [];
        }
    },

    search(page) {
        var _this = this
        _this.loading = true
        if (this.selectTime == null) {
            this.selectTime = ['', '']
        }
        if (this.reschannelname == '') {
            this.channelNameId = ''
        }
        if (this.userName == '') {
            this.userNameId = ''
        }
        var qudao = this.reschannelname
        if (qudao == '') {
            qudao = ''
        } else {
            qudao = qudao.join(',')
        }

        var params = {
            startDate: this.selectTime[0],
            endDate: this.selectTime[1],
            channeldetail: qudao,
            name: this.userName,
            pageSize: 20,
            pageNumber: page,
        }
        console.log(params)
        getData('post', my_url + '/crm/channel/getChannelClientReport.do', function (data) {
            _this.loading = false
            let rows = data.rows
            _this.tableData = rows
            _this.pageTotal = data.total
        }, params)
        getData('post', my_url + '/crm/channel/getChannelClientReportSum.do', function (data) {
            if (data.hotlinecount == 0) {
                data.hotlinecount = ''
            }
            if (data.follow01count) {
                data['follow01rate'] = (Number(data.follow01count) / Number(data.hotlinecount) * 100).toFixed(2) + '%'; //微信率
            } else {
                data['follow01rate'] = '0.00%'
            }
            if (data.follow02count) {
                data['follow02rate'] = (Number(data.follow02count) / Number(data.hotlinecount) * 100).toFixed(2) + '%'; //计划书率
            } else {
                data['follow02rate'] = '0.00%'
            }
            if (data.follow07count) {
                data['follow07rate'] = (Number(data.follow07count) / Number(data.hotlinecount) * 100).toFixed(2) + '%'; //已成交率
            } else {
                data['follow07rate'] = '0.00%'
            }

            _this.ReportSum = data
        }, params)

    },
    pageClick(page) { //点击分页
        this.pageNum = page;
        this.search(page)
    },

    reset() { //重置
        this.selectTime = ['', '']
        this.reschannelname = ''
        this.channelNameId = ''
        this.userNameId = ''
        this.userName = ''
        this.search(1)
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
    }
  }
}
</script>
<style>
.channelReport-total {
  margin: 0 0.3rem;
}

.agree {
  height: 0.35rem;
  line-height: 0.35rem;
  display: flex;
  padding-left: 6px;
  color: rgba(151, 151, 151, 1);
  font-size: 13px;
}

.agree p:first-child{
  width: 1.5rem;
  text-align: left;
}

.agree p:last-child{
  width: 2.5rem;
  text-align: left;
}
</style>