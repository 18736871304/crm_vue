<template>
  <div>
    <div class="search-header">
      <div class="add-btn" @click="insert"> + 新建</div>
      <div class="search-box clearfix">
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">创建时间</div>
          <div class="select-content" style="height: 0.3rem; width: calc(100% -1.28rem); border: none">
            <el-date-picker class="el-date-picker-inners" size=mini v-model="selectTime" type="daterange" range-separator="-"
                start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        <div class="common-select">
            <div class="select-title" style="width: 1.28rem">渠道类型</div>
            <div class="select-content" style="width: calc(100% - 1.28rem);height: auto;">
                <el-autocomplete class="el-input-inners" v-model="reschannelname" :trigger-on-focus="false"
                    :fetch-suggestions="querySearch" size="mini" placeholder="请输入渠道类型" clearable>
                </el-autocomplete>
            </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">资源等级</div>
          <div class="select-content" style="width: calc(100% - 1.28rem); border: none">
            <el-select class="el-select-inners" v-model="resourcelevel" placeholder="请选择资源等级" size="mini" clearable
                style="width: 100%;">
                <el-option label="A理财" value="A+"></el-option>
                <el-option label="A重疾" value="A"></el-option>
                <el-option label="A-" value="A-"></el-option>
                <el-option label="B+" value="B+"></el-option>
                <el-option label="B" value="B"></el-option>
                <el-option label="B-" value="B-"></el-option>
                <el-option label="C" value="C"></el-option>
                <el-option label="C-" value="C-"></el-option>
                <el-option label="Z" value="Z"></el-option>
            </el-select>
          </div>
        </div>
        <div class="common-select">
          <div class="select-title" style="width: 1.28rem">渠道状态</div>
          <div class="select-content" style="width: calc(100% - 1.28rem); border: none">
            <el-select class="el-select-inners" v-model="state" placeholder="请选择渠道状态" size="mini" clearable style="width: 100%;">
                <el-option label="启用" value="01"></el-option>
                <el-option label="停用" value="03"></el-option>
            </el-select>
          </div>
        </div>
        <div class="common-select" style="float: right;width: 11.5%;">
          <div class="search-btn" @click="search(1)">搜索</div>
          <div class="search-btn" style="background: #fff; color: #DC220D; border: 1px solid rgba(216, 216, 216, 1);" @click="reset">重置</div>
        </div>
      </div>
    </div>
    <div class="table-box">
        <el-table class="splice-header" :data="tableData" border style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange" @sort-change="sortChange">
            <el-table-column align="center" key="2" type="index" label="序号">
            </el-table-column>
            <el-table-column align="center" key="3" prop="makedate" label="创建时间" width="160">
            </el-table-column>
            <el-table-column align="center" key="4" prop="oprname" label="创建人" width="100">
            </el-table-column>
            <el-table-column align="center" key="5" prop="channelname" label="渠道类型" width="80">
            </el-table-column>
            <el-table-column align="center" key="6" prop="sourcelevelname" label="资源等级" width="110">
            </el-table-column>
            <el-table-column align="center" key="7" prop="state" label="渠道状态" width="80">
            </el-table-column>
            <el-table-column align="center" key="8" prop="username" label="渠道负责人" width="100">
            </el-table-column>
            <el-table-column align="center" key="9" prop="mobile" label="负责人电话" width="140">
            </el-table-column>
            <el-table-column align="center" key="10" label="操作" width="140">
                <template slot-scope="scope">
                    <a class="edit option" href="javascript:void(0);" style="color: #4985E5;" @click="showEditPopup(scope.row)">编辑</a>
                    <a class="delete option" href="javascript:void(0);" v-show="scope.row.state == '停用' ? true : false" @click="deleteItem(scope.row)" style="color: #DC220D;margin-left: 0.15rem;">启用</a>
                    <a class="delete option" href="javascript:void(0);" v-show="scope.row.state == '启用' ? true : false" @click="deleteItem(scope.row)" style="color: #DC220D;margin-left: 0.15rem;">停用</a>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div>
      <el-pagination background layout="total, prev, pager, next" :total="pageTotal" :page-size="pageSize"
        :current-page="pageNum" @current-change="pageClick">
      </el-pagination>
    </div>
    <el-dialog custom-class="customer-channels" title="新建-渠道" :visible="dialogVisible" width="27%" :before-close="handleClose">
        <div class="common-select" style="margin-bottom: 0.2rem;height: 0.32rem;">
            <div class="select-title" style="width: 1rem; border: 0;background: #fff;">渠道类型</div>
            <div class="select-content" style="width: calc(100% - 1rem);margin-right: 0; height: auto;">
                <el-input class="el-input-inners" v-model="channelname" placeholder="请输入渠道类型"></el-input>
            </div>
        </div>
        <div class="common-select" style="margin-bottom: 0.2rem;">
          <div class="select-title" style="width: 1rem; border: 0;background: #fff;">资源等级</div>
          <div class="select-content" style="width: calc(100% - 1rem); border: none;margin-right: 0;">
            <el-select class="el-select-inners" v-model="sourcelevel" placeholder="请选择资源等级" size="mini" clearable style="width: 100%;">
                <el-option label="A理财" value="A+"></el-option>
                <el-option label="A重疾" value="A"></el-option>
                <el-option label="A-" value="A-"></el-option>
                <el-option label="B+" value="B+"></el-option>
                <el-option label="B" value="B"></el-option>
                <el-option label="B-" value="B-"></el-option>
                <el-option label="C" value="C"></el-option>
                <el-option label="C-" value="C-"></el-option>
                <el-option label="Z" value="Z"></el-option>
            </el-select>
          </div>
        </div>
        <div class="common-select">
            <div class="select-title" style="width: 1rem; border: 0;background: #fff;">渠道负责人</div>
            <div class="select-content" style="width: calc(100% - 1rem);margin-right: 0;">
                <el-autocomplete class="el-input-inners" v-model="userid" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync"
                  size="mini" placeholder="请输入渠道负责人" @select="handleSelect" clearable>
                </el-autocomplete>
            </div>
        </div>
        <div slot="footer" class="dialog-footer" style="padding: 0;">
          
          <div class="search-btn" style="background: #fff;border: 1px solid rgba(221, 221, 221, 1);color: #686868;" @click="cancel">取消</div>
          <div class="search-btn" @click="sure">确定</div>
        </div>
    </el-dialog>  
  </div>
</template>
<script>
import { getData, my_url } from '../../../static/js/ajax.js';
import { formatDate } from '../../../static/js/common.js';
export default {
    data() {
        return {
            dialogVisible: false,
            loading: false,
            //新建
            channelname: '',
            sourcelevel: '',
            userid: '',
            userNameid: '',
            //搜索
            selectTime: ['', ''],
            resourcelevel: '',
            reschannelname: '',
            state: '',
            //分页
            tableData: [],
            pageTotal: 0,
            pageSize: 20,
            pageNum: 1,
            // 渠道ID
            channelid: '',
            //远程搜索
            restaurants: [],
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
                        var nowDayOfWeek = now.getDay(); // 今天本周的第几天
                        var nowDay = now.getDate(); // 当前日
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
            getData('post', my_url + '/crm/auth/getUserIdNameList_All.do', function (data) {
                if (data.code == 0) {
                    let arr = [];
                    data.namelist.forEach(res => {
                        arr.push({
                            "userid": res.userid,
                            "value": res.username
                        });
                    });
                    _this.restaurants = arr;
                }
            })
        },
        querySearchAsync(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) :
                restaurants;
            cb(results);
        },
        createStateFilter(queryString) {
            return (restaurants) => {
                return restaurants.value && restaurants.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
            };
        },
        handleSelect(item) {
            this.userNameid = item.userid
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
                    // this.SalesmanBox = data.channelList;
                    channelList.forEach(res => {
                        _this.SalesmanBox.push({
                            "value": res.dd_value
                        });
                    })
                }
            });
        },

        //确认新增  
        sure() {
            var _this = this
            _this.loading = true
            this.dialogVisible = false
            if (this.isshow == true) {
                this.isshow = false
                var params = {
                    channelname: this.channelname,
                    sourcelevel: this.sourcelevel,
                    userid: this.userNameid,
                    channelid: this.channelid
                }
                getData('post', my_url + '/crm/channel/channelUpdate.do', function (data) {
                    if (data.code == 0) {
                        console.log(data)
                        _this.loading = false
                        _this.search(1)
                    } else {
                        _this.loading = false
                        _this.$message({
                            showClose: true,
                            message: data.msg,
                            duration: 3000,
                            type: 'error'
                        });
                    }
                }, params)
            } else {
                var params = {
                    channelname: this.channelname,
                    sourcelevel: this.sourcelevel,
                    userid: this.userNameid
                }
                getData('post', my_url + '/crm/channel/channelInsert.do', function (data) {
                    _this.loading = false
                    if (data.code == 0) {
                        _this.$message({
                            showClose: true,
                            message: '添加成功!',
                            duration: 3000,
                            type: 'success'
                        });
                        _this.search(1);
                    } else {
                        _   ({
                            showClose: true,
                            message: data.msg,
                            duration: 3000,
                            type: 'error'
                        });
                    }
                }, params);
            }
        },

        search(page) {
            var _this = this
            _this.loading = true
            if (this.selectTime == null) {
                this.selectTime = ['', '']
            }
            var params = {
                startDate: this.selectTime[0],
                endDate: this.selectTime[1],
                sourcelevel: this.resourcelevel,
                channelname: this.reschannelname,
                state: this.state,
                pageSize: 20,
                pageNum: page,
            }
            getData('post', my_url + '/crm/channel/getActivityChannelList.do', function (data) {
                _this.loading = false
                let rows = data.rows

                rows.forEach(function (item, index, arr) {
                    if (item.state == '01') {
                        item.state = '启用'
                    } else if (item.state == '03') {
                        item.state = '停用'
                    }
                })
                _this.tableData = rows
                _this.pageTotal = data.total
            }, params)
        },



        pageClick(page) { //点击分页
            this.pageNum = page;
            this.search(page)
        },
        insert() {
            this.channelname = '',
                this.sourcelevel = '',
                this.userid = '',
                this.dialogVisible = true
        },
        reset() { //重置
            this.selectTime = ['', ''],
                this.resourcelevel = '',
                this.reschannelname = '',
                this.state = ''
        },
        //修改/编辑
        showEditPopup(item) {
            this.dialogVisible = true
            this.channelname = item.channelname
            this.sourcelevel = item.sourcelevel
            var cc = this.restaurants
            for (var i = 0; i < cc.length; i++) {
                if (cc[i].value == item.username) {
                    this.userNameid = cc[i].userid
                    this.userid = item.username
                }
            }
            this.channelid = item.channelid
            this.isshow = true;
        },
        //删除
        deleteItem(item) {
            var _this = this
            var state = ''
            if (item.state == "启用") {
                state = '03'
            } else if (item.state == "停用") {
                state = '01'
            }
            var params = {
                channelid: item.channelid,
                state: state
            }
            getData('post', my_url + '/crm/channel/controlChannelState.do', function (data) {
                if (data.code == 0) {
                    _this.search(1)
                }
            }, params)
        },
        cancel() {
            this.dialogVisible = false
        },
        //关闭弹窗
        handleClose() {
            this.dialogVisible = false
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
    }
    
}
</script>
<style src="../../../static/css/myFonts/iconfont.css"></style>
<style src="../../../static/css/channelManagement.css"></style>