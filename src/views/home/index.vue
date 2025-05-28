<template>
  <div class="container clearfix" id="homeContainer" style="display: flex; width :19.26rem" v-cloak>
    <div class="container_left fl">
      <div class="container_left_one mt clearfix">
        <div class="fl">
          <div class="container_left_one_divpic fl">
            <img :src="PhotoData">
          </div>
          <div class="container_left_one_divonewz fl">
            <p class="p_one">嗨，{{jieshao.username}}，{{jieshao.slogan}}</p>
            <p class="p_two">美华保险销售有限公司 - {{jieshao.organname}}</p>
          </div>
        </div>
        <div class="container_left_one_divtwowz fr" @click="showLogDialog">
          <p class="divtwo_p_one">在线坐席/总坐席</p>
          <p class="divtwo_p_two"><span style="color: #333333">{{jieshao.onlineseat}}</span>&nbsp;/&nbsp;{{jieshao.allseat}}</p>
        </div>
      </div>
      <div class="container_left_three mt clearfix" style="padding-bottom:0.2rem">
        <div class="notice-tit">
          <span></span>今日要事
        </div>
        <div class="filter-section clearfix">
          <div class="item fl" style="display: flex;">
            <div class="common-select">
              <div class="select-title">时间周期</div>
              <div class="select-content" style="width: 2rem; height: 0.3rem; border: none;">
                <el-date-picker class="el-date-picker-sigle" v-model="impordata" type="date" align="right" size="mini" format="yyyy-MM-dd  星期dddd" value-format="yyyy-MM-dd" placeholder="选择日期" @change="importantThing">
                </el-date-picker>
              </div>
            </div>
            <!-- 新增要事 manual -->
            <el-popover popper-class='add_thing' placement="bottom-start" :visible-arrow='false' width="450" trigger="manual" class="addclick" v-model="visible">
              <el-button slot="reference" class="addThing" @click="addOpen"> + 新增要事</el-button>
              <div class="addContent">
                <div class="thingInput">
                  <el-input v-model="thingInput" placeholder="日程、会议、活动主题"></el-input>
                </div>
                <div class="dateTime">
                  <div class="date_start">开始</div>
                  <div class="date_cntent">
                    <el-date-picker class="start-time" v-model="impordata1" type="date" align="right" size="mini" value-format="yyyy-MM-dd" :picker-options="pickerOptions1" format="yyyy-MM-dd  星期dddd" placeholder="选择日期">
                    </el-date-picker>
                    <!-- :ss -->
                    <el-time-picker v-show='isallday1' class="startTime" v-model="startTime" format='HH:mm' value-format='HH:mm' placeholder="选择时间点">
                    </el-time-picker>

                    <div class="checkbox-item" style="margin-left: 0.1rem;">
                      <el-checkbox size="mini" @change='selectAllday' v-model="isallday">全天</el-checkbox>
                    </div>
                  </div>
                </div>
                <div class="dateTime">
                  <div class="date_start" ref='shichang'>时长</div>
                  <div class="date_cntent" v-show='isallday3'>
                    <el-date-picker class="start-time" v-model="impordata2" type="date" align="right" size="mini" value-format="yyyy-MM-dd" :picker-options="pickerOptions1" format="yyyy-MM-dd  星期dddd" placeholder="选择日期">
                    </el-date-picker>

                    <el-time-picker v-show='customTime' class="startTime" v-model="endtime" format='HH:mm' value-format='HH:mm' placeholder="选择时间点">
                    </el-time-picker>
                    <div class="checkbox-item" style="margin-left: 0.1rem; opacity: 0;">
                      <el-checkbox size="mini">全天</el-checkbox>
                    </div>
                  </div>
                  <div class="date_cntent" v-show='isallday2'>
                    <el-select class="duration" @change='customDate' v-model="duration" clearable placeholder="请选择">
                      <el-option v-for="item in durations" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="dateTime">
                  <div class="date_start">参与者</div>
                  <div class="date_cntent">
                    <el-select :class="[canyu1 ? 'duration' : 'canyu' ]" v-model="participant" multiple filterable remote placeholder="请输入参与者" :remote-method="remoteMethod" :loading="loading" @change='changecanyu' @blur.native.capture='blurcanyu'>
                      <el-option v-for="item in participants" :key="item.userid" :label="item.username" :value="item.username">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="dateTime">
                  <div class="date_start">重复</div>
                  <div class="date_cntent">
                    <el-select v-show='!moreSelect' class="duration" v-model="repeat" @change='selectRepeat' clearable placeholder="请选择">
                      <el-option v-for="item in repeatList" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key">
                      </el-option>
                    </el-select>

                    <el-select v-show='moreSelect' class="chongfu" v-model="moreRepeat" multiple @change='selectRepeat' clearable placeholder="请选择" style="width: 4.1rem;">
                      <el-option v-for="item in customList" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="dateTime" style="justify-content: flex-end;">
                  <div class="cancel" @click='callOf'>取消</div>
                  <div class="determine" @click="addsure()">确定</div>
                </div>
              </div>
            </el-popover>
          </div>
          <!-- 选择团队 -->
          <div class="fr" style="display: flex;">
            <div class="common-select" v-show="dis_P4_up">
              <div class="select-title">选择团队</div>
              <div class="select-content">
                <el-dropdown trigger="click" placement="bottom" ref="disTeam3">
                  <p class="el-dropdown-inners" clearable>
                    <span>{{teamNames3}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </p>
                  <el-dropdown-menu slot="dropdown">
                    <el-tree @check="handleCheckChange3" :data="teamDataList2" ref="tree3" show-checkbox node-key="id" :default-expanded-keys="[1]" :props="defaultProps2" style="padding-right: 0px;">
                    </el-tree>
                    <div class="sure-footer">

                      <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="my_sureOne3">取消</div>
                      <div class="my-sure" @click="my_sure3">确定</div>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="common-select" v-show="dis_P4_up">
              <div class="select-title">业务员姓名</div>
              <div class="select-content" style="height: 0.3rem; border: none;">
                <el-select placeholder="请选择" style="width:1.68rem" size="mini" v-model="overviewForm3.userid" @change="userNameChange3" clearable class="el-select-inners">
                  <el-option v-for="item in userNameOptions3" :key="item.userid" :label="item.username" :value="item.userid">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <!-- 具体内容 -->
        <div style="display: flex; padding: 0.1rem 0.3rem 0.1rem 0.2rem;">
          <div style="width:100%;height:auto;">
            <div class="warp">
              <div class="click_hover" :class={aa:aa} @click='select(1)'>
                <div class="date_day">
                  <p>昨天</p>
                  <p>{{initValue.Yesterday}}</p>
                </div>

                <div class="box1" v-for="(item1, index1) in list0" :key="item1.day" @click.capture="timeSlot(item1.day)">
                  <div :class={a1:aa} :ref="'tody'+index1">{{item1.day}}</div>
                  <div v-for='item in item1.child' :key="item.day">
                    <el-popover placement="bottom-start" ref="aa" popper-class='add_tan' class="tanchuang" trigger="click">
                      <div class="tan_close">
                        <div style="width: 90%; color: #282828;">今日要事</div>
                        <div style="width: 10%; color: #979797; text-align: center; cursor: pointer;" @click='tanClose()'>
                          <i class="el-icon-close"></i>
                        </div>
                      </div>
                      <div style="padding: 0.12rem;color: #282828;">
                        <p>{{item.schedule}}</p>
                        <p style="padding-top: 0.12rem;">{{item.querydate}} {{item.starttime}}-{{item.endtime}}</p>
                      </div>
                      <div style="padding: 0.12rem;padding-top: 0; color: #282828;">
                        <p> <span style="color:#686868">组织者</span>：{{item.oprname}}</p>
                        <p style="padding-top: 0.12rem;"><span style="color:#686868">参与者</span>：{{realusernamelist}}
                        </p>
                      </div>
                      <div class="sure-footer" style="padding: 0 0 0.1rem;">
                        <div class="search-btn" @click="tanTdit(item.calendarid)">编辑</div>
                        <div class="search-btn" @click="tanDel(item.calendarid)">删除</div>
                      </div>
                      <div slot="reference" class="click_tan" @click=tanOpen(item.calendarid)>
                        <span>{{item.starttime}}&nbsp;-&nbsp;</span>
                        <span>{{item.schedule}}</span>
                      </div>
                    </el-popover>
                  </div>
                </div>
              </div>
              <div class="click_hover" :class={bb:bb} @click='select(2)'>
                <div class="date_day">
                  <p>今天</p>
                  <p>{{initValue.today}}</p>
                </div>
                <template>
                  <div class="box1" v-for='(item1, index1) in list1' :key="item1.day" @click.capture='timeSlot(item1.day)'>
                    <div :class={a1:bb} :ref="'tody'+index1">{{item1.day}}</div>
                    <div v-for='(item)  in item1.child' :key="item.day">
                      <el-popover placement="bottom-start" ref="aa" popper-class='add_tan' class="tanchuang" trigger="click">
                        <div class="tan_close">
                          <div style="width: 90%; color: #282828;">今日要事</div>
                          <div style="width: 10%; color: #979797; text-align: center; cursor: pointer;" @click='tanClose()'>
                            <i class="el-icon-close"></i>
                          </div>
                        </div>
                        <div style="padding: 0.12rem;color: #282828;">
                          <p>{{item.schedule}}</p>
                          <p style="padding-top: 0.12rem;">{{item.querydate}} {{item.starttime}}-{{item.endtime}}</p>
                        </div>
                        <div style="padding: 0.12rem;padding-top: 0;color: #282828;">
                          <p><span style="color:#686868">组织者</span>：{{item.oprname}} </p>
                          <p style="padding-top: 0.12rem;"> <span style="color:#686868">参与者</span>：{{realusernamelist}}
                          </p>
                        </div>
                        <div class="sure-footer" style="padding: 0 0 0.1rem;">
                          <div class="search-btn" @click="tanTdit(item.calendarid)">编辑</div>
                          <div class="search-btn" @click="tanDel(item.calendarid)">删除</div>
                        </div>
                        <div slot="reference" class="click_tan" @click=tanOpen(item.calendarid)>
                          <span>{{item.starttime}}&nbsp;-&nbsp;</span>
                          <span>{{item.schedule}}</span>
                        </div>
                      </el-popover>
                    </div>
                  </div>
                </template>
              </div>
              <div class="click_hover" :class={cc:cc} @click='select(3)'>
                <div class="date_day">
                  <p>明天</p>
                  <p>{{initValue.tomorrow}}</p>
                </div>
                <div class="box1" v-for='(item1, index1) in list2' :key="item1.day" @click.capture='timeSlot(item1.day)'>
                  <div :class={a1:cc} :ref="'tody'+index1">{{item1.day}}</div>
                  <div v-for='item in item1.child' :key="item.day">
                    <el-popover placement="bottom-start" ref="aa" popper-class='add_tan' class="tanchuang" trigger="click">
                      <div class="tan_close">
                        <div style="width: 90%; color: #282828;">今日要事</div>
                        <div style="width: 10%; color: #979797; text-align: center; cursor: pointer;" @click='tanClose()'>
                          <i class="el-icon-close"></i>
                        </div>
                      </div>
                      <div style="padding: 0.12rem;color: #282828;">
                        <p>{{item.schedule}}</p>
                        <!-- ( {{selectValue.day}}{{selectValue.timeSlot}} ) 今天下午-->
                        <p style="padding-top: 0.12rem;">{{item.querydate}} {{item.starttime}}-{{item.endtime}}</p>
                      </div>
                      <div style="padding: 0.12rem;padding-top: 0;color: #282828;">
                        <p> <span style="color:#686868">组织者</span>：{{item.oprname}} </p>
                        <p style="padding-top: 0.12rem;"><span style="color:#686868">参与者</span>：{{realusernamelist}}
                        </p>
                      </div>
                      <div class="sure-footer" style="padding: 0 0 0.1rem;">
                        <div class="my-sure" @click="tanTdit(item.calendarid)">编辑</div>
                        <div class="my-sure" @click="tanDel(item.calendarid)">删除</div>
                      </div>
                      <div slot="reference" class="click_tan" @click=tanOpen(item.calendarid)>
                        <span>{{item.starttime}}&nbsp;-&nbsp;</span>
                        <span>{{item.schedule}}</span>
                      </div>
                    </el-popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container_left_three mt clearfix">
        <div class="notice-tit">
          <span></span>数据统计
        </div>
        <div class="filter-section clearfix">
          <div class="fl">
            <div class="common-select">
              <div class="select-title">时间周期</div>
              <div class="select-content" style="width: 3.4rem; height: 0.3rem; border: none;">
                <el-date-picker class="el-date-picker-inners" v-model="selectTime" type="datetimerange" align="right" size="mini" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @blur="queryDownDataByDate">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="fr" style="display: flex">
            <div class="common-select" v-show="dis_P4_up">
              <div class="select-title">选择团队</div>
              <div class="select-content">
                <el-dropdown trigger="click" placement="bottom" ref="disTeam2">
                  <p class="el-dropdown-inners" clearable>
                    <span>{{teamNames2}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </p>
                  <el-dropdown-menu slot="dropdown">
                    <el-tree @check="handleCheckChange2" :data="teamDataList2" ref="tree2" show-checkbox node-key="id" :default-expanded-keys="[1]" :props="defaultProps2" style="padding-right: 0px;">
                    </el-tree>
                    <div class="sure-footer">
                      <!-- <div class="my-sure" @click="my_sure2">确定</div> -->

                      <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="my_sureOne2">取消</div>
                      <div class="my-sure" @click="my_sure2">确定</div>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="common-select" v-show="dis_P4_up">
              <div class="select-title">业务员姓名</div>
              <div class="select-content" style="height: 0.3rem; border: none;">
                <el-select class="el-select-inners" placeholder="请选择" style="width:1.68rem" size="mini" v-model="overviewForm2.userid" @change="userNameChange2" clearable>
                  <el-option v-for="item in userNameOptions2" :key="item.userid" :label="item.username" :value="item.userid">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <ul class="container_listthree" style="margin-left: 0.2rem;" @click="showCustomerDialogVisible">
          <li style="position: relative">
            <p class="container_listthree_po">热线新增量
              <el-tooltip popper-class="atooltip" effect="light" content="当日0点到查询时刻累计的热线新增数量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.hotlinecount}}<span>个</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.hotlinecount_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.hotlinecount_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.hotlinecount_compare}}%</span>
              <span v-if="dataList.hotlinecount_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.hotlinecount_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative">
            <p class="container_listthree_po">热线拨打量
              <el-tooltip popper-class="atooltip" effect="light" content="在统计周期内新增的热线中，截止到查询时刻已拨打的热线数量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.hotlinecallcount}}<span>个</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.hotlinecallcount_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.hotlinecallcount_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.hotlinecallcount_compare}}%</span>
              <span v-if="dataList.hotlinecallcount_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.hotlinecallcount_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative">
            <p class="container_listthree_po">热线接通量
              <el-tooltip popper-class="atooltip" effect="light" content="新增的热线中，截止到查询时刻已拨打且接通的热线数量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.hotlineconnectcount}}<span>个</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.hotlineconnectcount_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.hotlineconnectcount_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.hotlineconnectcount_compare}}%</span>
              <span v-if="dataList.hotlineconnectcount_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.hotlineconnectcount_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative">
            <p class="container_listthree_po">热线接通率
              <el-tooltip popper-class="atooltip" effect="light" content="热线接通量/热线新增量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.hotlineconnectrate}}<span>%</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.hotlineconnectrate_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.hotlineconnectrate_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.hotlineconnectrate_compare}}%</span>
              <span v-if="dataList.hotlineconnectrate_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.hotlineconnectrate_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative">
            <p class="container_listthree_po">电话外拨量
              <el-tooltip popper-class="atooltip" effect="light" content="在统计周期内拨打电话的数量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.phonecallcount}}<span>个</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.phonecallcount_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.phonecallcount_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.phonecallcount_compare}}%</span>
              <span v-if="dataList.phonecallcount_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.phonecallcount_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative">
            <p class="container_listthree_po">电话接通量
              <el-tooltip popper-class="atooltip" effect="light" content="在统计周期内拨打电话且接通的数量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.phoneconnectcount}}<span>个</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.phoneconnectcount_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.phoneconnectcount_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.phoneconnectcount_compare}}%</span>
              <span v-if="dataList.phoneconnectcount_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.phoneconnectcount_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative">
            <p class="container_listthree_po">电话接通率
              <el-tooltip popper-class="atooltip" effect="light" content="电话接通量/电话外拨量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.phoneconnectrate}}<span>%</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.phoneconnectrate_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.phoneconnectrate_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.phoneconnectrate_compare}}%</span>
              <span v-if="dataList.phoneconnectrate_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.phoneconnectrate_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative">
            <p class="container_listthree_po">通话总时长
              <el-tooltip popper-class="atooltip" effect="light" content="在统计周期内，所有接通电话的总通话时长" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.sumtime}}<span>分钟</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.sumtime_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.sumtime_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.sumtime_compare}}%</span>
              <span v-if="dataList.sumtime_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.sumtime_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <!--                    <div class="shu-xian " style="position: absolute;top: 0.27rem;left: 1.66rem;"></div>-->
          </li>
          <li style="position: relative" class="border_b">
            <p class="container_listthree_po">微信
              <el-tooltip popper-class="atooltip" effect="light" content="在统计周期内，跟进状态变更为微信的客户数量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.wxcount}}<span>个</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.wxcount_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.wxcount_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.wxcount_compare}}%</span>
              <span v-if="dataList.wxcount_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.wxcount_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative" class="border_b">
            <p class="container_listthree_po">保单检视
              <el-tooltip popper-class="atooltip" effect="light" content="在统计周期内，跟进状态变更为计划书的客户数量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.firstplancount}}<span>个</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.firstplancount_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.firstplancount_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.firstplancount_compare}}%</span>
              <span v-if="dataList.firstplancount_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.firstplancount_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative" class="border_b">
            <p class="container_listthree_po">计划书
              <el-tooltip popper-class="atooltip" effect="light" content="在统计周期内，跟进状态变更为认清市场的客户数量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.secondplancount}}<span>个</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.secondplancount_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.secondplancount_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.secondplancount_compare}}%</span>
              <span v-if="dataList.secondplancount_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.secondplancount_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative" class="border_b">
            <p class="container_listthree_po">理赔服务
              <el-tooltip popper-class="atooltip" effect="light" content="在统计周期内，跟进状态变更为合同理赔的客户数量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.claimcount}}<span>个</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.claimcount_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.claimcount_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.claimcount_compare}}%</span>
              <span v-if="dataList.claimcount_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.claimcount_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative" class="border_b">
            <p class="container_listthree_po">促销T单
              <el-tooltip popper-class="atooltip" effect="light" content="在统计周期内，跟进状态变更为服务T单的客户数量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.tdancount}}<span>个</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.tdancount_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.tdancount_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.tdancount_compare}}%</span>
              <span v-if="dataList.tdancount_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.tdancount_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative" class="border_b">
            <p class="container_listthree_po">已成交
              <el-tooltip popper-class="atooltip" effect="light" content="在统计周期内，跟进状态变更为已成交的客户数量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.dealcount}}<span>个</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.dealcount_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.dealcount_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.dealcount_compare}}%</span>
              <span v-if="dataList.dealcount_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.dealcount_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative" class="border_b">
            <p class="container_listthree_po">未成交/无效
              <el-tooltip popper-class="atooltip" effect="light" content="在统计周期内，跟进状态变更为未成交/无效的客户数量" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.nodealcount}}<span>个</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.nodealcount_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.nodealcount_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.nodealcount_compare}}%</span>
              <span v-if="dataList.nodealcount_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.nodealcount_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
            <div class="shu-xian "></div>
          </li>
          <li style="position: relative" class="border_b">
            <p class="container_listthree_po">标保
              <el-tooltip popper-class="atooltip" effect="light" content="在统计周期内，已成交的标保" placement="top">
                <span></span>
              </el-tooltip>
            </p>
            <p class="container_listthree_pt">{{dataList.sumfyp20}}<span>元</span></p>
            <p class="clearfix">
              <span class="container_listthree_pth fl">较上一周期</span>
              <span v-if="dataList.sumfyp20_compare<1000" class="container_listthree_pf fr" :style="'color:'+(dataList.sumfyp20_compare>=0?'#DC220D':'#00a963')+';'">{{dataList.sumfyp20_compare}}%</span>
              <span v-if="dataList.sumfyp20_compare>1000" class="container_listthree_pf fr" :style="'color:'+(dataList.sumfyp20_compare>=0?'#DC220D':'#00a963')+';'">>1000%</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="container_left_three mt clearfix" style="padding-bottom:0.5rem">
        <div class="notice-tit">
          <span></span>数据分析
        </div>

        <div class="filter-section">
          <div class="common-select">
            <div class="select-title">时间周期</div>
            <div class="select-content" style="width: 3.4rem; height: 0.3rem; border: none;">
              <el-date-picker class="el-date-picker-inners" v-model="selectDataTime" type="datetimerange" align="right" size="mini" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @blur="getDataAnalysis">
              </el-date-picker>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title">数据选择</div>
            <div class="select-content" style="height: 0.3rem; border: none;">
              <el-select class="el-select-inners" v-model="dataType" style="width:1.68rem" placeholder="请选择" @change="dataTypeChange" multiple popper-class='usename-wei'>
                <el-option v-for="item in dataTypeList" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select" v-show="dis_P4_up">
            <div class="select-title">选择团队</div>
            <div class="select-content">
              <el-dropdown trigger="click" placement="bottom" ref="disTeam1">
                <p class="el-dropdown-inners" clearable>
                  <span>{{teamNames1}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu slot="dropdown">
                  <el-tree @check="handleCheckChange1" :data="teamDataList1" ref="tree1" show-checkbox node-key="id" :default-expanded-keys="[1]" :props="defaultProps1" style="padding-right: 0px;">
                  </el-tree>
                  <div class="sure-footer">

                    <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="my_sureOne1">取消</div>
                    <div class="my-sure" @click="my_sure1">确定</div>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="common-select" v-show="dis_P4_up">
            <div class="select-title">业务员姓名</div>
            <div class="select-content" style="height: 0.3rem; border: none;">
              <el-select class="el-select-inners" placeholder="请选择" style="width:1.68rem" size="mini" v-model="overviewForm1.userid" @change="userNameChange1" clearable>
                <el-option v-for="item in userNameOptions1" :key="item.userid" :label="item.username" :value="item.userid">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div id="main-echart" style="width: 100%;height:400px;">
        </div>
      </div>
    </div>
    <div class="container_right fl mt">
      <div class="notice notice-gonggao">
        <div class="notice-tit">
          <span></span>公告
          <div class="more" @click="showCenterDialog">更多 <i class="el-icon-d-arrow-right"></i> </div>
          <el-dialog title="公告" :visible.sync="centerDialogVisible" width="70%">
            <div class="filter-section" style="padding: 0;">
              <div class="common-select">
                <div class="select-title">创建时间</div>
                <div class="select-content" style="width: 3.6rem; height: 0.3rem; border: none;">
                  <el-date-picker class="el-date-picker-inners" v-model="selectNoticeTime" type="datetimerange" align="right" size="mini" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
              </div>
              <div class="common-select">
                <div class="select-title">所属类别</div>
                <div class="select-content" style="height: 0.3rem; border: none;">
                  <el-select class="el-select-inners" v-model="noticeType" style="width:1.68rem" size="mini" placeholder="">
                    <el-option v-for="(item,index) in noticeTypeList" :key="index" :label="item.dd_value" :value="item.dd_key">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="common-select">
                <div class="select-title">关键字</div>
                <div class="select-content" style="width:1.68rem">
                  <el-input class="el-input-inners" v-model="noticeTitle" size="mini" placeholder=""></el-input>
                </div>
              </div>
              <div class="common-select">
                <div class="search-btn" @click="getNoticeListMore">搜索</div>
              </div>
            </div>
            <el-collapse v-model="noticeActive" accordion style="border: none;padding: 0;margin: 20px 0">
              <div class="xu-xian pr" v-for="(item,index) in moreNoticeData" :key="index">
                <p class="notice_p clearfix">
                  <span class="fl notice_p_so">【{{item.typename}}】</span>
                  <span class="fr notice_p_st">{{item.makedate}}</span>
                </p>
                <el-collapse-item>
                  <template slot="title">{{item.title}}</template>
                  <div v-html="item.content" class="img-list">

                  </div>
                </el-collapse-item>
              </div>
            </el-collapse>
            <div style="margin-top: 20px;">
              <el-pagination @current-change="handleNoticePageChange" :current-page="noticePageNumber" :page-size="noticePageSize" layout="total, prev, pager, next" :total="noticeTotal" background>
              </el-pagination>
            </div>
          </el-dialog>
        </div>
        <div>
          <el-collapse v-model="noticeActive" accordion>
            <div class="xu-xian" v-for="(item,index) in newNoticeData" :key="index">
              <p class="notice_p clearfix">
                <span class="fl notice_p_so">【{{item.typename}}】</span>
                <span class="fr notice_p_st">{{item.makedate}}</span>
              </p>
              <el-collapse-item>
                <template slot="title">{{item.title}}</template>
                <div v-html="item.content" class="img-list"></div>
              </el-collapse-item>
            </div>
          </el-collapse>
        </div>
      </div>
      <!-- <div class="notice" style="margin-top: .14rem;">
                <div class="notice-tit">
                    <span></span>预约回访
                    <div class="more">更多 <i class="el-icon-d-arrow-right"></i> </div>
                </div>
                <ul class="notice-list">
                    <li class="item" v-for="(item,index) in huifang">
                        <div class="l">
                            <div class="name">
                                {{item.name}}【{{item.mobile}}】
                            </div>
                            <div style="margin-top: 5px;color: #686868;">{{item.remark}}</div>
                        </div>
                        <div class="r">
                            <div>{{item.previstitime}}</div>
                            <div class="btns-section">
                                <el-popover class="notice-list-popover" placement="left" width="326"
                                    v-model="item.visible">
                                    <el-date-picker v-model="item.previstitime" type="datetime" :editable="false"
                                        :clearable="false" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                                    </el-date-picker>
                                    <div class="popover-bottom-btns">
                                        <a href="javascript:;" @click="closeItemPopover(index)">取消</a>
                                        <a href="javascript:;" @click="modifyPrevistiTime(index)" class="modify">修改</a>
                                    </div>
                                    <a href="javascript:;" class="edit" slot="reference">修改</a>
                                </el-popover>
                                <a href="javascript:;" class="complete" @click="sanchu(item.activityserialno)">完成</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div> -->
      <div class="notice" style="margin-top: .14rem">
        <!-- <div class="notice" style="margin-top: .14rem;height: 2.93rem"> -->
        <div class="notice-tit" style="border-bottom: 1px solid #D8D8D8;">
          <span></span>实时排名
          <!--<div class="more">更多 <i class="el-icon-d-arrow-right"></i> </div>-->

        </div>
        <div class="ranking-tab-wrap">
          <div class="tabs" :class="[currentRankingType === '昨日时长排名' ? 'active-1' : '',currentRankingType === '上周工作小结' ? 'active-2' : '',currentRankingType === '本月业绩排名' ? 'active-3' : '']">
            <div class="tab" v-for="(item,index) in rankingTabs" :key="index" @click="selectCurrentRanking(item)">
              {{item}}
            </div>
          </div>
          <ul class="content-list" v-if="currentRankingType === '昨日时长排名'">
            <li class="item" v-for="(item,index) in LastDayCallTimeList.firstCallTimeList" :key="index+10">
              <div class="ranking-icon call-time">
                <img :src="require('../../static/images/rank-'+(index+1)+'.png')" alt="">
              </div>
              <div class="avatar"><img :src="'https://insure.meihualife.com'+item.photourl" alt=""></div>
              <div class="name">{{item.username}}<span class="teamname-color"> - {{item.teamname}}</span> </div>
              <div class="number">{{item.sumtime}}m</div>
            </li>
            <li class="item" v-for="(item,index) in LastDayCallTimeList.lastCallTimeList" :key="index+100">
              <div class="ranking-icon call-time">
                <span>倒数{{3-index}}</span>
              </div>
              <div class="avatar"><img :src="'https://insure.meihualife.com'+item.photourl" alt=""></div>
              <div class="name">{{item.username}}<span class="teamname-color"> - {{item.teamname}}</span></div>
              <div class="number">{{item.sumtime}}m</div>
            </li>
          </ul>
          <ul class="content-list" v-if="currentRankingType === '上周工作小结'">
            <li class="item" v-for="(item,index) in LastWeekData.firstCallTime" :key="index+20">
              <div class="ranking-icon zongjie">
                <span>总时长</span>
                <img :src="require('../../static/images/rank-'+(index+1)+'.png')" alt="">
              </div>
              <div class="avatar"><img :src="'https://insure.meihualife.com'+item.photourl" alt=""></div>
              <div class="name">{{item.username}}<span class="teamname-color"> - {{item.teamname}}</span></div>
              <div class="number">{{item.sumtime}}m</div>
            </li>
            <li class="item" v-for="(item,index) in LastWeekData.firsttWxCount" :key="index+30">
              <div class="ranking-icon zongjie">
                <span>微信</span>
                <img :src="require('../../static/images/rank-'+(index+1)+'.png')" alt="">
              </div>
              <div class="avatar"><img :src="'https://insure.meihualife.com'+item.photourl" alt=""></div>
              <div class="name">{{item.username}}<span class="teamname-color"> - {{item.teamname}}</span></div>
              <div class="number">{{item.sumwxcount}}个</div>
            </li>
            <li class="item" v-for="(item,index) in LastWeekData.firstFristPlanCount" :key="index+50">
              <div class="ranking-icon zongjie">
                <span>计划书</span>
                <img :src="require('../../static/images/rank-'+(index+1)+'.png')" alt="">
              </div>
              <div class="avatar"><img :src="'https://insure.meihualife.com'+item.photourl" alt=""></div>
              <div class="name">{{item.username}}<span class="teamname-color"> - {{item.teamname}}</span></div>
              <div class="number">{{item.sumfirstplancount}}个</div>
            </li>
            <li class="item" v-for="(item,index) in LastWeekData.firstSecondPlanCount" :key="index+40">
              <div class="ranking-icon zongjie">
                <span>认清市场</span>
                <img :src="require('../../static/images/rank-'+(index+1)+'.png')" alt="">
              </div>
              <div class="avatar"><img :src="'https://insure.meihualife.com'+item.photourl" alt=""></div>
              <div class="name">{{item.username}}<span class="teamname-color"> - {{item.teamname}}</span></div>
              <div class="number">{{item.sumsecondplancount}}个</div>
            </li>
          </ul>
          <ul class="content-list" v-if="currentRankingType === '本月业绩排名'">
            <li class="item" v-for="(item,index) in FypList.agentFypList" :key="index+60">
              <div class="ranking-icon call-time">
                <img :src="require('../../static/images/rank-'+(index+1)+'.png')" alt="" v-if="index < 3">
                <span v-else>{{index+1}}</span>
              </div>
              <div class="avatar"><img :src="'https://insure.meihualife.com'+item.photourl" alt=""></div>
              <div class="name">{{item.username}}<span class="teamname-color">&nbsp-&nbsp{{item.organname}}</span></div>
              <div class="number">{{item.sumfyp20}}元</div>
            </li>
          </ul>
        </div>
        <!-- <div class="">
                <img src="images/paiming.png" style="margin: 0.5rem auto 0;display: block;">
                <p style="font-size: 0.14rem;color: #D2D2D2;width: 100%;text-align: center;text-indent: -13px">暂无排名</p>
            </div> -->
      </div>
      <div class="notice" style="margin-top: .14rem;">
        <div class="notice-tit">
          <span></span>藏经阁新上线

        </div>
        <ul class="notice-list">
          <li class="cjg-item" v-for="(item,index) in knowledgeList" :key="index">

            <div @click="showEditPopup(item)" style="cursor: pointer;">
              <div class="section">
                <div class="name">
                  【{{item.typename}}】
                </div>
                <div>{{item.makedate}}</div>
              </div>
              <div class="section" style="margin-top: 5px">
                <div style="color: #686868;" class="title-txt">
                  {{item.title}}
                </div>
                <!-- <a href="javascript:;" class="complete" @click="knowledgeComplete(item.baseid)" style="color:#DC220D;width:0.4rem;text-align:right;">完成</a> -->
              </div>
            </div>

          </li>
        </ul>
        <el-dialog :title="CJGselectValue" :visible.sync="drawer" width="50%" top="5vh" :close-on-click-modal='false' class="cjg-dialog">
          <div class="actileStyle" v-if="CJGselectValue === '保单检视'">
            <div class="item-section">

              <div>
                <h1 class="textCenter">{{ bdjsItem.title }}</h1>
              </div>

            </div>
            <div class="item-section">

              <div class="textCenter">{{bdjsItem.insorgannameValues}}</div>

            </div>
            <div class="item-section">

              <div class="right-content bdjsDetail">
                <div id="editor-content-view" class="editor-content-view" v-html="this.bdjsItem.policydetail"></div>

              </div>
            </div>
            <!-- <div class="item-section">
              <label>建议规划</label>
              <div class="right-content">
                <div class="editor-box">
                  <div id="div3" class="toolbar"></div>
                  <div id="div4" class="text">
                  </div>
                </div>
              </div>
            </div> -->
            <div class="item-section">
              <label>附件</label>
              <div class="right-content">
                <ul class="enclosure-list" v-if="fileList.length">
                  <li class="item" v-for="(item,index) in fileList" :key="index">
                    <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp; {{item.filename}}</div>
                    <a :href="'https://crm.meihualife.com/filedownload.do?fileid=' + item.fileid" class="download-btn" :download="item.filename">下载</a>
                  </li>
                </ul>
                <ul class="enclosure-list" v-else>
                  <li class="item"></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="step-list wei-step-list" v-if="CJGselectValue === '疾病核保'">
            <div class="item-section">
              <label>标题</label>
              <div class="right-content">
                <el-input placeholder="请输入" size="mini" v-model="jbhbItem.title" :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="item-section">
              <label>疾病描述</label>
              <div class="right-content">
                <el-input placeholder="请输入" size="mini" v-model="jbhbItem.disdescription" :disabled="true" resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="7">
                </el-input>
              </div>
            </div>
            <div class="item-section">
              <label>核保建议</label>
              <div class="right-content">
                <div class="tab-head">
                  <div class="tab" :class="currentSuggestion === 'zjsuggestion' ? 'actived' : ''" @click="changeSuggestion('zjsuggestion')">重疾险</div>
                  <div class="tab" :class="currentSuggestion === 'ylsuggestion' ? 'actived' : ''" @click="changeSuggestion('ylsuggestion')">医疗险</div>
                </div>
                <el-input resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="10" placeholder="请输入内容" :disabled="true" v-if="currentSuggestion === 'zjsuggestion'" v-model="jbhbItem.zjsuggestion">
                </el-input>
                <el-input resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="10" placeholder="请输入内容" v-else :disabled="true" v-model="jbhbItem.ylsuggestion">
                </el-input>
              </div>
            </div>
            <div class="item-section">
              <label>可投产品</label>
              <div class="right-content">
                <div class="add-item-wrap">
                  <div class="list" v-for="(item,index) in jbhbItem.productJsonStr" :key="index">
                    <div class="item">
                      <label>保险公司</label>
                      <div class="right-content">
                        <el-input placeholder="请输入" size="mini" v-model="item.insorganname" :disabled="true">
                        </el-input>
                      </div>
                    </div>
                    <div class="item">
                      <label>险种名称</label>
                      <div class="right-content">
                        <el-input placeholder="请输入" size="mini" v-model="item.riskname" :disabled="true">
                        </el-input>
                      </div>
                    </div>
                    <div class="item">
                      <label>承保说明</label>
                      <div class="right-content">
                        <el-input placeholder="请输入" size="mini" v-model="item.acceptremark" :disabled="true" resize="none" type="textarea" :autosize="{ minRows: 5, maxRows: 30}" :rows="7">
                        </el-input>
                      </div>
                    </div>
                    <div class="item">
                      <label>标注</label>
                      <div class="right-content" style="margin-top: 0.03rem;">
                        <el-radio v-model="item.labeltype" :label="'01'" :disabled="true">标体承保
                        </el-radio>
                        <el-radio v-model="item.labeltype" :label="'03'" style="margin-left: 0.2rem;" :disabled="true">
                          加费承保
                        </el-radio>
                        <el-radio v-model="item.labeltype" :label="'02'" :disabled="true" style="margin-left: 0.2rem;">
                          除外承保
                        </el-radio>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="step-list wei-step-list" v-if="CJGselectValue === '解答疑义'">
            <div class="item-section">
              <label>疑义问题</label>
              <div class="right-content">
                <el-input placeholder="请输入" size="mini" v-model="dkwItem.title" :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="item-section">
              <label>隐藏信息</label>
              <div class="right-content">
                <div class="editor-box">
                  <div id="div7" class="toolbar"></div>
                  <div id="div8" class="text">
                  </div>
                </div>
              </div>
            </div>
            <div class="item-section">
              <label>解答示范</label>
              <div class="right-content">
                <div class="editor-box">
                  <div id="div5" class="toolbar"></div>
                  <div id="div6" class="text">
                  </div>
                </div>
              </div>
            </div>
            <div class="item-section">
              <label>附件</label>
              <div class="right-content">
                <ul class="enclosure-list" v-if="fileList.length > 0">
                  <li class="item" v-for="(item,index) in fileList" :key="index">

                    <div class="name"><i :class="fileTypeFun(item.filetype)"></i>&nbsp;&nbsp;{{item.filename}}</div>
                    <a :href="'https://crm.meihualife.com/filedownload.do?fileid=' + item.fileid" class="download-btn" :download="item.filename">下载</a>
                  </li>
                </ul>
                <div class="enclosure-list" v-else>

                </div>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
      <el-dialog title="操作日志" :visible.sync="logDialogVisible" width="70%" :before-close="handleLogClose" v-loading="loading">
        <div class="filter-section" style="padding: 0;">
          <div class="common-select">
            <div class="select-title">操作时间</div>
            <div class="select-content" style="width: 3.6rem; height: 0.3rem; border: none;">
              <el-date-picker class="el-date-picker-inners" v-model="logRange" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" align="right">
              </el-date-picker>
            </div>
          </div>

          <div class="common-select" v-show="dis_P4_up">
            <div class="select-title">选择团队</div>
            <div class="select-content">
              <el-dropdown trigger="click" placement="bottom" ref="disTeam5">
                <p class="el-dropdown-inners" clearable>
                  <span>{{teamNames5}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu slot="dropdown">
                  <el-tree @check="handleCheckChange5" :data="teamDataList5" ref="tree5" show-checkbox node-key="id" :default-expanded-keys="[1]" :props="defaultProps2" style="padding-right: 0px;">
                  </el-tree>
                  <div class="sure-footer">

                    <div class="my-sure" style="background: #fff; color: #DC240F; border: 0.01rem solid #DC240F;" @click="my_sureOne5">取消</div>
                    <div class="my-sure" @click="my_sure5">确定</div>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="common-select" v-show="dis_P4_up">
            <div class="select-title">业务员姓名</div>
            <div class="select-content" style="height: 0.3rem; border: none;">
              <el-select class="el-select-inners" placeholder="请选择" style="width:1.68rem" size="mini" v-model="overviewForm5.userid" @change="userNameChange5" clearable>
                <el-option v-for="item in userNameOptions5" :key="item.userid" :label="item.username" :value="item.username">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="common-select">
            <div class="search-btn" @click="getOperationData">搜索</div>
          </div>
        </div>
        <el-table class="dialog-table" :data="operationLogData" border header-align="center" style="width: 100%">
          <el-table-column key="2" type="index" label="序号" align="center" width="50">
          </el-table-column>
          <el-table-column prop="makedate" align="center" label="操作时间">
          </el-table-column>
          <el-table-column prop="teamname" align="center" label="所属团队">
          </el-table-column>
          <el-table-column prop="realname" label="业务员姓名" align="center">
          </el-table-column>
          <el-table-column prop="isonline" align="center" label="操作状态">
            <template slot-scope="scope">
              <span v-if="scope.row.isonline === 'N'">离线</span>
              <span v-else>上线</span>
            </template>
          </el-table-column>

        </el-table>
        <div style="margin-top: 20px;">
          <el-pagination @current-change="handleCurrentChange" :current-page="logPageNumber" :page-size="logPageSize" layout="total, prev, pager, next" :total="logTotal" background>
          </el-pagination>
        </div>
      </el-dialog>

      <el-dialog title="客户列表" :visible.sync="customerDialogVisible" width="70%" :before-close="handleCustomersClose">
        <div class="filter-section" style="padding: 0;">
          <div class="common-select">
            <div class="select-title">操作时间</div>
            <div class="select-content" style="width: 3.6rem; height: 0.3rem; border: none;">
              <el-date-picker class="el-date-picker-inners" v-model="operationDate" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" align="right">
              </el-date-picker>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title">业务员姓名</div>
            <div class="select-content" style="width:1.68rem">
              <el-autocomplete class="el-input-inners" v-model="username" :trigger-on-focus="false" :fetch-suggestions="querySearch" size="mini" placeholder="请输入" clearable></el-autocomplete>
            </div>
          </div>
          <div class="common-select">
            <div class="select-title">跟进步骤</div>
            <div class="select-content" style="height: 0.3rem; border: none;">
              <el-select class="el-select-inners" v-model="followupStep" placeholder="全部">
                <el-option class="el-select-inners" v-for="item in followupStepData" :key="item.dd_key" :label="item.dd_value" :value="item.dd_key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="common-select">
            <div class="search-btn" @click="getCustomersData">搜索</div>
          </div>
        </div>
        <el-table class="dialog-table" :data="customersData" border header-align="center" style="width: 100%">
          <!-- <el-table-column prop="usercode" label="业务员工号" align="center">
          </el-table-column> -->
          <el-table-column key="2" type="index" label="序号" align="center" width="50">
          </el-table-column>
          <el-table-column prop="makedate" align="center" label="操作时间" width="170">
          </el-table-column>
          <el-table-column prop="name" align="center" label="客户姓名" width="80">
          </el-table-column>
          <el-table-column prop="mobile" align="center" label="电话号码" width="120">
          </el-table-column>
          <el-table-column prop="wexin" align="center" label="微信号" width="120" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="followupstepname" align="center" label="跟进步骤" width="110">
          </el-table-column>

          <el-table-column prop="teamname" align="center" label="所属团队" width="120">
          </el-table-column>
          <el-table-column prop="realname" label="业务员姓名" align="center" width="90">
          </el-table-column>
          <el-table-column prop="sourcelevel" align="center" label="资源等级" width="90">
          </el-table-column>
          <el-table-column prop="batchno" align="center" label="批次号" width="120" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="channelname" align="center" label="渠道类型" width="90">
          </el-table-column>
          <el-table-column prop="appname" align="center" label="流量来源" width="120">
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px;">
          <el-pagination @current-change="handleCurrentChangeCustomers" :current-page="customersPageNumber" :page-size="customersPageSize" layout="total, prev, pager, next" :total="customersTotal" background>
          </el-pagination>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import '../../static/js/viewer-jquery.min.js'
import '../../static/css/viewer.min.css'
import moment from "../../static/js/moment.js"
import echarts from "../../static/js/echart.js"
// import wangEditor from '@/components/wangEditor/release/wangEditor.min.js'
import { getData, getPhoneData, my_url } from '../../static/js/ajax.js';
import { getBeforeDate, formatDate } from '../../static/js/common.js';
import api from '../../utils/api.js';
// let editor, editor1, editor2, editor3;
export default {
  name: 'home',
  data() {
    return {

      // 日志
      overviewForm5: {
        teamid: '',
        userid: '',
        startDate: '',
        endDate: '',
        time: '1'
      },
      teamNames5: "团队选择",
      teamDataList5: [],
      userNameOptions5: [],
      defaultProps5: {
        children: 'children',
        label: 'label'
      },



      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() <= (Date.now() - (24 * 60 * 60 * 1000));
        },
      },
      ischannel: false,
      canyu1: true,
      //编辑修改
      selectValue: {
        day: '',
        date: '', //日期
        timeSlot: '', //上午下午晚上
        startTime: '', //开始时间
        content: '', //内容
        organizer: '', //组织者
        participant: '', //参与者
        calendarid: ''
      },
      initValue: {
        Yesterday: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        today: moment().format('YYYY-MM-DD'),
        tomorrow: moment().add(1, 'days').format('YYYY-MM-DD'),
      },
      aa: false,
      bb: true,
      cc: false,
      //昨天
      list0: [{
        'child': [],
        day: '上午'
      },
      {
        'child': [],
        day: '下午'
      },
      {
        'child': [],
        day: '晚上'
      }
      ],
      //今天
      list1: [{
        'child': [],
        day: '上午'
      },
      {
        'child': [],
        day: '下午'
      },
      {
        'child': [],
        day: '晚上'
      }
      ],
      //明天
      list2: [{
        'child': [],
        day: '上午'
      },
      {
        'child': [],
        day: '下午'
      },
      {
        'child': [],
        day: '晚上'
      }
      ],
      realusernamelist: '',

      // {
      //       index: 1,
      //       time: "8:50",
      //       content: '晚会'
      //     }, {
      //       index: 2,
      //       time: "9:50",
      //       content: '预约回访'
      //     }, {
      //       index: 3,
      //       time: "10:50",
      //       content: '分享案例'
      //     }

      //今日要事
      impordata: moment().format('YYYY-MM-DD'),
      //新增要事
      thingInput: '',
      impordata1: "",
      startTime: "",
      endtime: '',
      isallday: false,
      impordata2: "",
      duration: '30', //时长
      participants: [], //参与者列表
      participant: [], // 参与者
      list: [],
      loading: false,


      isallday1: true,
      isallday2: true,
      isallday3: false,
      customTime: false,
      visible: false,
      //时长
      durations: [],
      // 重复
      repeat: '00',
      moreRepeat: '',
      moreSelect: false,
      repeats: [],
      repeatList: [], //重复
      customList: [], //自定义重复
      dis_P4_up: false,
      //今日要事
      overviewForm3: {
        teamid: '',
        userid: '',
        startDate: '',
        endDate: '',
        time: '1'
      },
      teamNames3: "团队选择",
      teamDataList3: [],
      userNameOptions3: [],
      defaultProps3: {
        children: 'children',
        label: 'label'
      },

      //数据统计
      overviewForm2: {
        teamid: '',
        userid: '',
        startDate: '',
        endDate: '',
        time: '1'
      },
      teamNames2: "团队选择",
      teamDataList2: [],
      userNameOptions2: [],
      defaultProps2: {
        children: 'children',
        label: 'label'
      },
      // 数据分析
      overviewForm1: {
        teamid: '',
        userid: '',
        startDate: '',
        endDate: '',
        time: '1'
      },
      teamNames1: "团队选择",
      teamDataList1: [],
      userNameOptions1: [],
      defaultProps1: {
        children: 'children',
        label: 'label'
      },
      queryflag: true,
      queryflagString: '01',



      my_url: my_url,
      currentSuggestion: 'zjsuggestion',
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
      SalesmanBoxList: [],
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
      drawer: false,
      CJGselectValue: '',
      noticeTotal: 0,
      dataTypeList: [],
      dataType: [],
      noticeTypeList: '',
      noticeType: '',
      noticeTitle: '',
      currentRankingType: '本月业绩排名',
      rankingTabs: ['昨日时长排名', '上周工作小结', '本月业绩排名'],
      LastDayCallTimeList: '',
      LastWeekData: '',
      FypList: '',
      logTotal: 0,
      customersTotal: 0,
      loading: false,
      followupStep: '',
      SalesmanBox: [],
      operationStatusData: [],
      customersData: [],
      followupStepData: [],
      username: '',
      currentLogPage: 1,
      isonline: '',
      logRange: [moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment(moment().startOf('day').format(
        'YYYY-MM-DD HH:mm:ss')).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')],
      // operationDate: getBeforeDate(0),
      operationDate: [moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment(moment().startOf('day')
        .format('YYYY-MM-DD HH:mm:ss')).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')],
      logUserName: '',
      operationLogData: [],
      fileList: [],
      logPageNumber: 1,
      logPageSize: 10,
      customersPageNumber: 1,
      customersPageSize: 10,
      noticePageNumber: 1,
      noticePageSize: 5,
      logDialogVisible: false,
      customerDialogVisible: false,
      centerDialogVisible: false,
      knowledgeDialog: false,
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
      selectTime: [],
      noticeActive: '',
      knowledgActive: '',
      //切换团体个人数据
      tabData: 'today',
      systemDate: '',
      dataList: {},
      dataToday: '',
      preDate: '',
      jieshao: {},
      huifang: '',

      upTeamSelect: 'single',
      downTeamSelect: 'single',

      upTeamFlag: "01",
      upStartTime: '',
      upEndTime: '',

      downTeamFlag: "01",
      downStartTime: '',
      downEndTime: '',

      PhotoData: '',
      knowledgeList: '',
      newNoticeData: '',
      moreNoticeData: '',
      selectNoticeTime: ["", ""],
      selectDataTime: [moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00'), moment().startOf('day').format('YYYY-MM-DD 00:00:00')]
    };
  },
  mounted: function () {

    this.selectRepeat()
    this.selectSearch()
    let _this = this;
    _this.upStartTime = getBeforeDate(0) + ' 00:00:00';
    _this.upEndTime = getBeforeDate(1) + ' 00:00:00';
    _this.downStartTime = getBeforeDate(0) + ' 00:00:00';
    _this.downEndTime = getBeforeDate(1) + ' 00:00:00';
    _this.selectTime = [
      new Date(formatDate(new Date(_this.downStartTime), 'yyyy-MM-dd 00:00:00')),
      new Date(formatDate(new Date(_this.downEndTime), 'yyyy-MM-dd 00:00:00'))
    ];
    _this.getConditionData();

    _this.disOnLineInfo().then((res) => {
      _this.disDownData();
    })

    _this.getTeamList()
    //获取用户头像
    api.getUserPhoto().then((data) => {
      _this.PhotoData = data.userphoto
    });
    //获取预约回访记录
    api.getPreVisitList({ pageSize: 5 }).then((data) => {
      _this.huifang = data.rows;
    });
    //获取操作状态
    api.getDictList({ dict_type: 'isonline' }).then((data) => {
      if (data.code == 0) {
        _this.operationStatusData = [{ dd_key: "", dd_value: "全部" }].concat(data.dictList);
      }
    });
    //获取跟进步骤
    api.getDictList({ dict_type: 'followupstep' }).then((data) => {
      if (data.code == 0) {
        _this.followupStepData = [{ dd_key: "", dd_value: "全部" }].concat(data.dictList);
        _this.followupStep = '';
      }
    });
    //数据选择类型
    api.getHomeReportDictList({ dict_type: 'followupstep' }).then((data) => {
      if (data.code == 0) {
        _this.dataTypeList = data.dictList;
      }
    });
    //所属员模糊查询数据
    api.getUserNameList().then((data) => {
      if (data.code == 0) {
        let nameList = data.namelist;
        nameList.forEach(res => {
          _this.SalesmanBox.push({
            "value": res
          });
        })
      }
    });
    // 业务员列表
    api.getAllUserIdNameList().then((data) => {
      _this.list = data.namelist;
    });
    //昨日时长排名
    api.getLastDayCallTimeList().then((res) => {
      res.lastCallTimeList = res.lastCallTimeList.sort((a, b) => {
        return b.sumtime - a.sumtime
      })
      _this.LastDayCallTimeList = res
    });
    api.getLastWeekData().then((res) => {
      _this.LastWeekData = res
    });
    api.getFypList().then((res) => {
      _this.FypList = res
    });
    this.getHomeKnowledgeList()
    this.getNoticeListNew()
    //this.getNoticeListMore()
    //数据字典
    api.getDictList({ dict_type: 'notice_type' }).then((data) => {
      if (data.code == 0) {
        let { dictList } = data;
        _this.noticeTypeList = dictList;
      }
    });

    // 重复类型
    api.getDictList({ dict_type: 'repeattype' }).then((data) => {
      if (data.code == 0) {
        _this.repeatList = data.dictList
      }
    });

    // 自定义重复类型
    api.getDictList({ dict_type: 'repeattype_customer' }).then((data) => {
      if (data.code == 0) {
        _this.customList = data.dictList
      }
    });

    // 时长
    api.getDictList({ dict_type: 'durationtype' }).then((data) => {
      if (data.code == 0) {
        _this.durations = data.dictList
      }
    });


    this.insOrganList()
  },
  computed: {
    dataTypeValueArr() {
      return this.dataTypeList.filter(data => this.dataType.some(item => item === data.dd_key)).map(item =>
        item.dd_value)
    },
  },
  methods: {



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
      this.search();
      this.refresh();
    },




    importantThing() {
      if (this.impordata != null) {
        this.initValue.today = this.impordata
        this.initValue.Yesterday = moment(this.impordata).subtract(1, 'days').format('YYYY-MM-DD')
        this.initValue.tomorrow = moment(this.impordata).add(1, 'days').format('YYYY-MM-DD')
        this.selectSearch()
      }
    },
    // 搜索内容
    selectSearch() {
      var _this = this
      var selectSearch = {
        calendarDate: this.impordata,
        realuserid: this.overviewForm3.userid
      }
      api.getCalendarInfo(selectSearch).then((data) => {
        if (data.code == 0) {
          for (var i = 0; i < 3; i++) {
            _this.list0[i].child = []
            _this.list1[i].child = []
            _this.list2[i].child = []
          }
          for (var i = 0; i < data.yesterday.length; i++) {
            data.yesterday[i].starttime = data.yesterday[i].starttime.substring(0, 5)
            data.yesterday[i].endtime = data.yesterday[i].endtime.substring(0, 5)
            if (parseInt(data.yesterday[i].starttime.slice(0, 2)) < 13 && parseInt(data.yesterday[i]
              .starttime
              .slice(0, 2)) >= 0) {
              _this.list0[0].child.push(data.yesterday[i])
            } else if (parseInt(data.yesterday[i].starttime.slice(0, 2)) >= 13 && parseInt(data.yesterday[i]
              .starttime.slice(0, 2)) < 19) {
              _this.list0[1].child.push(data.yesterday[i])
            } else {
              _this.list0[2].child.push(data.yesterday[i])
            }
          }
          for (var i = 0; i < data.today.length; i++) {
            data.today[i].starttime = data.today[i].starttime.substring(0, 5)
            data.today[i].endtime = data.today[i].endtime.substring(0, 5)
            if (parseInt(data.today[i].starttime.slice(0, 2)) < 13 && parseInt(data.today[i].starttime
              .slice(
                0, 2)) >= 0) {
              _this.list1[0].child.push(data.today[i])
            } else if (parseInt(data.today[i].starttime.slice(0, 2)) >= 13 && parseInt(data.today[i]
              .starttime
              .slice(0, 2)) < 19) {
              _this.list1[1].child.push(data.today[i])
            } else {
              _this.list1[2].child.push(data.today[i])
            }
          }
          for (var i = 0; i < data.tomorrow.length; i++) {
            data.tomorrow[i].starttime = data.tomorrow[i].starttime.substring(0, 5)
            data.tomorrow[i].endtime = data.tomorrow[i].endtime.substring(0, 5)
            if (parseInt(data.tomorrow[i].starttime.slice(0, 2)) < 13 && parseInt(data.tomorrow[i].starttime
              .slice(0, 2)) >= 0) {
              _this.list2[0].child.push(data.tomorrow[i])
            } else if (parseInt(data.tomorrow[i].starttime.slice(0, 2)) >= 13 && parseInt(data.tomorrow[i]
              .starttime.slice(0, 2)) < 19) {
              _this.list2[1].child.push(data.tomorrow[i])
            } else {
              _this.list2[2].child.push(data.tomorrow[i])
            }
          }
        }
      });
    },
    //参与者
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.participants = this.list.filter(item => {
            return item.username.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.participants = [];
      }
    },
    addOpen() {
      this.selectValue.calendarid = ''
      this.visible = true
    },
    //初始化
    callOf() {
      this.visible = false
      this.isallday = false
      this.isallday1 = true
      this.isallday2 = true
      this.isallday3 = false
      this.customTime = false
      this.moreSelect = false
      this.repeats = this.repeatList
      this.thingInput = ''
      this.impordata1 = ''
      this.startTime = ''
      this.impordata2 = ''
      this.duration = '30'
      this.participant = ''
      this.repeat = '00'
      this.moreRepeat = ''
      this.canyu1 = true
    },
    customDate() {
      if (this.duration == '00') {
        this.$refs.shichang.innerHTML = '结束'
        this.isallday3 = true
        this.customTime = true
        this.isallday2 = false
        this.isallday1 = true
      }
    },
    //选择全天
    selectAllday() {
      if (this.isallday == true) {
        this.duration = '00'
        this.isallday1 = false
        this.isallday2 = false
        this.customTime = false
        this.isallday3 = true
        this.startTime = '00:00'
        this.endtime = '23:59'
        this.$refs.shichang.innerHTML = '结束'
      } else {
        this.endtime = ''
        this.impordata2 = ''
        this.$refs.shichang.innerHTML = '时长'
        this.isallday2 = true
        this.isallday1 = true
        this.isallday3 = false
        this.duration = ''
      }
    },
    //自定义重复
    selectRepeat() {
      if (this.repeat == '09' && this.moreRepeat.length == 0) {
        this.moreSelect = true
        this.repeat = ''
      } else if (this.moreRepeat.length == 0) {
        this.moreSelect = false
      }
    },
    //添加事件主题
    addsure() {
      // 处理参与人
      var _this = this;
      var relauserid = []
      for (var i = 0; i < this.list.length; i++) {
        var _this = this
        for (var j = 0; j < this.participant.length; j++) {
          if (_this.list[i].username == this.participant[j]) {
            relauserid.push(_this.list[i].userid)
          }
        }
      }
      //处理重复
      if (this.moreRepeat.length != 0) {
        var repeattype = this.moreRepeat.join(',')
      } else {
        var repeattype = this.repeat
      }
      //处理时间minutes
      var endtime = ''
      if (this.duration != '00') {
        if (this.duration == "30") {
          endtime = new moment(this.impordata1 + " " + this.startTime).add(30, 'm').format(
            'YYYY-MM-DD HH:mm')
        } else if (this.duration == "01") {
          endtime = new moment(this.impordata1 + " " + this.startTime).add(1, 'hours').format(
            'YYYY-MM-DD HH:mm')
        } else if (this.duration == "02") {
          endtime = new moment(this.impordata1 + " " + this.startTime).add(2, 'hours').format(
            'YYYY-MM-DD HH:mm')
        } else if (this.duration == "03") {
          endtime = new moment(this.impordata1 + " " + this.startTime).add(3, 'hours').format(
            'YYYY-MM-DD HH:mm')
        }
      } else {
        endtime = this.impordata2 + " " + this.endtime
      }

      //新增
      if (this.selectValue.calendarid == '') {

        // if (endtime.slice(0, 10) != this.impordata1) {
        //   setTimeout(() => {
        //     this.$message({
        //       showClose: true,
        //       message: '日期不能跨天选择',
        //       duration: 3000,
        //       type: 'error'
        //     });
        //   }, 1000);
        //   return
        // }
        // 参数
        var addcontent = {}
        if (this.moreSelect == false) {
          addcontent = {
            schedule: this.thingInput,
            starttime: this.impordata1 + " " + this.startTime + ":00",
            endtime: endtime + ":00",
            durationtype: this.duration,
            realuserid: relauserid.join(','),
            repeattype: repeattype,
          }
        } else {
          addcontent = {
            schedule: this.thingInput,
            starttime: this.impordata1 + " " + this.startTime + ":00",
            endtime: endtime + ":00",
            durationtype: this.duration,
            realuserid: relauserid.join(','),
            repeattype: '09',
            repeattype_customer: repeattype,
          }
        }
        api.calendarInsert(addcontent).then((data) => {
          if (data.code == 0) {
            setTimeout(() => {
              this.$message({
                showClose: true,
                message: '添加成功!',
                duration: 3000,
                type: 'success'
              });
              _this.callOf()
              _this.selectSearch()
            }, 1000);
          } else {
            setTimeout(() => {
              this.$message({
                showClose: true,
                message: data.msg,
                duration: 3000,
                type: 'error'
              });
            }, 1000);
          }
        })
      } else {

        // 修改
        this.impordata1 = moment(this.impordata1).format("YYYY-MM-DD")
        var endtime = ''
        if (this.duration != '00') {
          if (this.duration == "30") {
            endtime = new moment(this.impordata1 + " " + this.startTime).add(30, 'm').format(
              'YYYY-MM-DD HH:mm')
          } else if (this.duration == "01") {
            endtime = new moment(this.impordata1 + " " + this.startTime).add(1, 'hours').format(
              'YYYY-MM-DD HH:mm')
          } else if (this.duration == "02") {
            endtime = new moment(this.impordata1 + " " + this.startTime).add(2, 'hours').format(
              'YYYY-MM-DD HH:mm')
          } else if (this.duration == "03") {
            endtime = new moment(this.impordata1 + " " + this.startTime).add(3, 'hours').format(
              'YYYY-MM-DD HH:mm')
          }
        } else {
          endtime = this.impordata2 + " " + this.endtime
        }
        // if (endtime.slice(0, 10) != this.impordata1) {
        //   setTimeout(() => {
        //     this.$message({
        //       showClose: true,
        //       message: '日期不能跨天选择',
        //       duration: 3000,
        //       type: 'error'
        //     });
        //   }, 1000);
        //   return
        // }


        var addcontent = {}
        if (this.moreSelect == false) {
          addcontent = {
            schedule: this.thingInput,
            starttime: this.impordata1 + " " + this.startTime + ":00",
            endtime: endtime + ":00",
            durationtype: this.duration,
            realuserid: relauserid.join(','),
            repeattype: repeattype,
            calendarid: this.selectValue.calendarid
          }
        } else {
          addcontent = {
            schedule: this.thingInput,
            starttime: this.impordata1 + " " + this.startTime + ":00",
            endtime: endtime + ":00",
            durationtype: this.duration,
            realuserid: relauserid.join(','),
            repeattype: '09',
            repeattype_customer: repeattype,
            calendarid: this.selectValue.calendarid
          }
        }
        api.calendarUpdate(addcontent).then((data) => {
          if (data.code == 0) {
            setTimeout(() => {
              this.$message({
                showClose: true,
                message: '修改成功!',
                duration: 3000,
                type: 'success'
              });
              _this.callOf()
              _this.selectSearch()
            }, 1000);
          } else {
            setTimeout(() => {
              this.$message({
                showClose: true,
                message: data.msg,
                duration: 3000,
                type: 'error'
              });
            }, 1000);
          }
        })
      }
    },
    select(num) {
      if (this.visible == true) {
        this.visible = false
      }
      if (num == 1) {
        this.aa = true
        this.bb = false
        this.cc = false
        this.selectValue.date = this.initValue.Yesterday
        this.selectValue.day = '昨天'
      }
      if (num == 2) {
        this.aa = false
        this.bb = true
        this.cc = false
        this.selectValue.date = this.initValue.today
        this.selectValue.day = '今天'
      }
      if (num == 3) {
        this.aa = false
        this.bb = false
        this.cc = true
        this.selectValue.date = this.initValue.tomorrow
        this.selectValue.day = '明天'
      }
    },
    timeSlot(day) {
      this.selectValue.timeSlot = day;
    },
    tanOpen(index, day) {
      var _this = this;
      api.getRealUserName({ calendarid: index }).then((data) => {
        if (data.code == 0) {
          //  切割 转化数组 在转化为字符串， 在替换成中文的逗号
          _this.realusernamelist = (Array.from(new Set((data.realusernamelist.split("，")))).toString()).replace(/,/g, '，')
          _this.realusernamelist = (_this.realusernamelist).replace(/,/g, '，')
        }
      })
      if (this.visible == true) {
        this.visible = false
        this.repeat = ''
        this.moreRepeat = ''
        this.selectRepeat()
      }
    },
    tanTdit(index) {
      this.selectValue.calendarid = index
      if (this.selectValue.timeSlot == '上午') {
        var kk = 0;
      } else if (this.selectValue.timeSlot == '下午') {
        var kk = 1;
      } else if (this.selectValue.timeSlot == '晚上') {
        var kk = 2;
      }
      if (this.selectValue.day == '昨天') {
        var hh = this.list0[kk].child
      } else if (this.selectValue.day == '今天') {
        var hh = this.list1[kk].child
      } else if (this.selectValue.day == '明天') {
        var hh = this.list2[kk].child
      }
      for (var i = 0; i < hh.length; i++) {
        if (hh[i].calendarid == index) {
          this.thingInput = hh[i].schedule
          this.impordata1 = new Date(this.selectValue.date)
          this.startTime = hh[i].starttime
          this.participant = this.realusernamelist.split("，")
          if (this.participant.length > 0) {
            this.canyu1 = false
          } else {
            this.canyu1 = true
          }
        }
      }
      this.tanClose();
      this.visible = true
    },
    tanDel(index) {
      this.selectValue.calendarid = index
      var _this = this
      var calendarid = {
        calendarid: this.selectValue.calendarid
      }
      api.calendarDelete(calendarid).then((data) => {
        if (data.code == 0) {
          _this.tanClose()
          _this.selectSearch()
        }
      })
    },
    tanClose() {
      var cc = this.$refs.aa
      for (var i = 0; i < cc.length; i++) {
        this.$refs.aa[i].showPopper = false
      }
    },

    blurcanyu(e) {
      if (this.participant != '') {
        this.canyu1 = false
      } else {
        this.canyu1 = true
      }
    },
    changecanyu() {
      if (this.participant != '') {
        this.canyu1 = false
      } else {
        this.canyu1 = true
      }
    },


    getConditionData() {
      let _this = this;
      api.getManagePermission(null).then((data) => {
        if (data.code == 0) {
          _this.dis_P4_up = true;
        } else {
          _this.dis_P4_up = false;
        }
      })
    },
    getTeamList() {
      let _this = this;
      //设置当前用户的团队列表参数
      api.getTeamList().then((data) => {
        if (data.teamList == null || data.teamList == '') {
          _this.disTeamAll = false;
        } else {
          _this.disTeamAll = true;
        }
        _this.teamDataList = data.teamList;
        _this.teamDataList1 = data.teamList;
        _this.teamDataList2 = data.teamList;
        _this.teamDataList3 = data.teamList;
        _this.teamDataList5 = data.teamList;
      })
    },
    //今日要事
    // 选择团队
    handleCheckChange3(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label)
      })
      this.my_list3 = teamListName.join(',');
      this.teamList3 = (checked.checkedKeys).join(',');
      this.overviewForm3.teamid = this.teamList3;
    },

    my_sureOne3() {
      this.$refs.disTeam3.hide();
      this.my_list3 = '';
      this.teamList3 = '';
      this.teamNames3 = "团队选择";
      this.overviewForm3.teamid = '';
      this.overviewForm3.userid = '';
      this.$refs.tree3.setCheckedKeys([]);
      this.queryflag = true;
      this.queryflagString = "01";
      this.userNameOptions3 = [];

    },

    my_sure3() {
      let _this = this;
      this.$refs.disTeam3.hide();
      if (this.my_list3 == null || this.my_list3 == '' || this.my_list3 == '1') {
        this.queryflag = true;
        this.queryflagString = "01"
      } else {
        this.teamNames3 = this.my_list3;
        this.queryflag = false;
        this.queryflagString = "02"
      }
      if (this.overviewForm3.userid == null || this.overviewForm3.userid == '') {
        this.queryflagString = '02'
      } else {
        this.queryflagString = "01"
      }
      //获取业务员列表
      api.getUserIdNameListByTeam({ teamid: this.teamList3 }).then((data) => {
        _this.userNameOptions3 = data.namelist
      })
    },
    // 选择个人
    userNameChange3() {
      this.queryflag = false;
      if (this.overviewForm3.userid == null || this.overviewForm3.userid == '') {
        this.queryflagString = '02'
      } else {
        this.queryflagString = "01"
      }
      this.selectSearch()
    },

    //日志
    // 选择团队
    handleCheckChange5(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label)
      })
      this.my_list5 = teamListName.join(',');
      this.teamList5 = (checked.checkedKeys).join(',');
      this.overviewForm5.teamid = this.teamList5;
    },

    my_sureOne5() {
      this.$refs.disTeam5.hide();
      this.my_list5 = '';
      this.teamList5 = '';
      this.teamNames5 = "团队选择";
      this.overviewForm5.teamid = '';
      this.overviewForm5.userid = '';
      this.$refs.tree5.setCheckedKeys([]);
      this.queryflag = true;
      this.queryflagString = "01";
      this.userNameOptions5 = [];
      this.getOperationData();
    },

    my_sure5() {
      let _this = this;
      this.$refs.disTeam5.hide();
      if (this.my_list5 == null || this.my_list5 == '' || this.my_list5 == '1') {
        this.queryflag = true;
        this.queryflagString = "01"
      } else {
        this.teamNames5 = this.my_list5;
        this.queryflag = false;
        this.queryflagString = "02"
      }
      if (this.overviewForm5.userid == null || this.overviewForm5.userid == '') {
        this.queryflagString = '02'
      } else {
        this.queryflagString = "01"
      }
      this.getOperationData();
      //获取业务员列表
      api.getUserIdNameListByTeam({ teamid: this.teamList5 }).then((data) => {
        _this.userNameOptions5 = data.namelist
      })
    },
    // 选择个人
    userNameChange5() {
      this.queryflag = false;
      if (this.overviewForm5.userid == null || this.overviewForm5.userid == '') {
        this.queryflagString = '02'
      } else {
        this.queryflagString = "01"
      }
      this.getOperationData();
    },






















    //数据统计
    // 选择团队
    handleCheckChange2(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label)
      })
      this.my_list2 = teamListName.join(',');
      this.teamList2 = (checked.checkedKeys).join(',');
      this.overviewForm2.teamid = this.teamList2;
    },

    my_sureOne2() {
      this.$refs.disTeam2.hide();
      this.my_list2 = '';
      this.teamList2 = '';
      this.teamNames = "团队选择";
      this.overviewForm2.teamid = '';
      this.overviewForm2.userid = '';
      this.$refs.tree2.setCheckedKeys([]);
      this.queryflag = true;
      this.queryflagString = "01";
      this.userNameOptions2 = [];
      this.disDownData();
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
      if (this.overviewForm2.userid == null || this.overviewForm2.userid == '') {
        this.queryflagString = '02'
      } else {
        this.queryflagString = "01"
      }
      this.disDownData();
      //获取业务员列表
      api.getUserIdNameListByTeam({ teamid: this.teamList2 }).then((data) => {
        _this.userNameOptions2 = data.namelist
      })
    },
    // 选择个人
    userNameChange2() {
      this.queryflag = false;
      if (this.overviewForm2.userid == null || this.overviewForm2.userid == '') {
        this.queryflagString = '02'
      } else {
        this.queryflagString = "01"
      }
      this.disDownData();
    },

    // 数据分析
    // 选择团队
    handleCheckChange1(data, checked, indeterminate) {
      let teamListName = [];
      checked.checkedNodes.forEach(function (item) {
        teamListName.push(item.label)
      })
      this.my_list1 = teamListName.join(',');
      this.teamList1 = (checked.checkedKeys).join(',');
      this.overviewForm1.teamid = this.teamList1;
    },
    my_sureOne1() {
      this.$refs.disTeam1.hide();
      this.my_list1 = '';
      this.teamList1 = '';
      this.teamNames1 = "团队选择";
      this.overviewForm1.teamid = '';
      this.overviewForm1.userid = '';
      this.$refs.tree1.setCheckedKeys([]);
      this.queryflag = true;
      this.queryflagString = "01";
      this.userNameOptions1 = [];
      this.getDataAnalysis();
    },
    my_sure1() {
      let _this = this;
      this.$refs.disTeam1.hide();
      if (this.my_list1 == null || this.my_list1 == '' || this.my_list1 == '1') {
        this.queryflag = true;
        this.queryflagString = "01"
      } else {
        this.teamNames1 = this.my_list1;
        this.queryflag = false;
        this.queryflagString = "02"
      }
      if (this.overviewForm1.userid == null || this.overviewForm1.userid == '') {
        this.queryflagString = '02'
      } else {
        this.queryflagString = "01"
      }
      this.getDataAnalysis();
      //获取业务员列表
      api.getUserIdNameListByTeam({ teamid: this.teamList1 }).then((data) => {
        _this.userNameOptions1 = data.namelist
      })
    },
    // 选择个人
    userNameChange1() {
      this.queryflag = false;
      if (this.overviewForm1.userid == null || this.overviewForm1.userid == '') {
        this.queryflagString = '02'
      } else {
        this.queryflagString = "01"
      }
      this.getDataAnalysis();
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


    changeSuggestion(Suggestion) {
      this.currentSuggestion = Suggestion
    },
    getUploadFile(id) {
      let _this = this;
      let body = { secondid: id };
      api.getFileListBySecondId(body).then((data) => {
        if (data.code == 0) {
          _this.fileList = data.fileList
        }
      })
    },
    showEditPopup(item) {
      this.getItem(item).then(res => {
        this.getUploadFile(item.baseid)
        let body, url
        if (item.type === '01') {
          this.bdjsItem = res
          this.bdjsItem.baseid = item.baseid
          this.bdjsItem.insorgannameValues = res.insorgannameValues
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
        this.drawer = true

      })
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
        api.getOnePolicyRead(body, url).then((data) => {
          if (data.code == 0) {

            var data = data.policyread
            // 替换中文逗号为英文逗号，分割成数组
            const keys = data.insorgancode.replace(/，/g, ',').split(',');
            // 查找对应 dd_value，过滤空值
            const values = keys.map(key => {
              const dictItem = this.SalesmanBoxList.find(d => d.key === key.trim());
              return dictItem ? dictItem.value : '';
            }).filter(v => v !== '');
            // 转化为字符串，用中文逗号连接
            data.insorgannameValues = values.length > 0 ? values.join('，') : undefined;
            // 回调
            resovle(data)
          } else {
            reject()
          }
        })
      })
    },
    showKnowledgeDialog() {
      this.knowledgeDialog = true
    },

    // 获取保险公司
    insOrganList() {
      let _this = this;
      getData('post', my_url + '/crm/common/getInsOrganList.do', function (data) { //渠道类型
        if (data.code == 0) {
          _this.SalesmanBox1 = []
          let nameList = data.dictList;
          nameList.forEach(res => {

            _this.SalesmanBoxList.push({
              "value": res.dd_value,
              "key": res.dd_key
            });
          })
        }
      }, {
        // type: this.cjgType
      });
    },







    echartInit() {
      var myChart = echarts.init(document.getElementById('main-echart'));
      let dataTemp = [{
        name: 'sumcount',
        legendName: '电话外拨量'
      },
      {
        name: 'sumtime',
        legendName: '通话总时长'
      },
      {
        name: 'count01',
        legendName: '微信'
      },
      {
        name: 'count02',
        legendName: '配置方案'
      },
      {
        name: 'count03',
        legendName: '认清市场'
      },
      {
        name: 'count04',
        legendName: '渠道服务'
      },
      {
        name: 'count05',
        legendName: '促销T单'
      },
      ]
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: 0,
          data: this.dataTypeValueArr
        },
        grid: {
          bottom: '10%',
          left: '5%',
          right: '5%',
          top: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.homeRrprotData.map(item => item.makedate)
        },
        yAxis: {
          type: 'value'
        },
      };
      let series = []
      dataTemp.filter(item => this.dataTypeValueArr.some(val => val === item.legendName)).forEach((item,
        index) => {
        series.push({
          name: item.legendName,
          type: 'line',
          stack: '总量' + item.legendName,
          data: this.homeRrprotData.map(item1 => {
            return item1[item.name]
          })
        })
      })
      option.series = series

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    dataTypeChange(e) {
      this.getDataAnalysis()
    },
    getDataAnalysis() {
      let _this = this;
      if (this.overviewForm1.teamid == null || this.overviewForm1.teamid == '') {
        this.queryflagString = '01'
      } else {
        this.queryflagString = "02"
      }
      let body = {
        followStr: this.dataType.join(','),
        startDate: this.selectDataTime ? this.selectDataTime[0] : '',
        endDate: this.selectDataTime ? this.selectDataTime[1] : '',
        teamid: this.overviewForm1.teamid,
        userid: this.overviewForm1.userid,
        queryflag: this.queryflagString
      }
      api.getHomeReprotData(body).then((data) => {
        _this.homeRrprotData = data.homeRrprotData
        if (!data.homeRrprotData.length) {
          _this.$message({
            showClose: true,
            message: '该类型暂无数据！',
            duration: 3000,
            type: 'warning'
          });
        }
        _this.echartInit()
      })
    },
    getNoticeListNew() {
      let _this = this;
      let body = {
        title: '',
        type: '',
        // startDate: moment(new Date()).add(1, 'days').subtract(1, 'months').format('YYYY-MM-DD') + ' 00:00:00',
        // endDate: moment(new Date()).add(1, 'days').format('YYYY-MM-DD') + ' 00:00:00',
        pageNumber: 1,
        pageSize: 5,
      }
      api.getNoticeList(body).then((data) => {
        _this.newNoticeData = data.rows
        _this.$nextTick(() => {
          $('.img-list').viewer({
            url: 'data-original',
          });
        })
      })
    },
    // 公告
    getNoticeListMore(val) {
      let _this = this;
      if (typeof val != "number") {
        this.noticePageNumber = 1
      }
      let body = {
        title: this.noticeTitle,
        type: this.noticeType,
        startDate: this.selectNoticeTime && this.selectNoticeTime[0],
        endDate: this.selectNoticeTime && this.selectNoticeTime[1],
        pageNumber: this.noticePageNumber,
        pageSize: this.noticePageSize,
      }
      api.getNoticeList(body).then((data) => {
        if (data.total > 0 && data.rows == '') {
          _this.noticePageNumber = 1;
          _this.handleNoticePageChange();
        } else {
          _this.moreNoticeData = data.rows;
          _this.noticeTotal = data.total;
        }
        // 暂时注释
        _this.$nextTick(() => {
          $('.img-list').viewer({
            url: 'data-original',
          });
        })
      })
    },
    selectCurrentRanking(item) {
      this.currentRankingType = item
    },
    getHomeKnowledgeList() {
      let _this = this
      api.getHomeKnowledgeList().then((data) => {
        if (data.code == 0) {
          const filteredList = data.homeKnowLedgeList.filter(item => item.type === "01");
          const filteredList10 = filteredList.slice(0, 10);
          _this.knowledgeList = filteredList10;
        }
      })
    },
    knowledgeComplete(id) {
      let _this = this
      api.readKnowLedge({ baseid: id }).then((data) => {
        if (data.code == 0) {
          _this.getHomeKnowledgeList()
        }
      })
    },
    showCenterDialog() {
      this.getNoticeListMore();
      this.centerDialogVisible = true;
      // 暂时注释
      this.$nextTick(() => {
        $('.img-list').viewer({
          url: 'data-original',
        });
      })
    },
    handleLogClose(done) {
      this.resetLogFilter()
      done();
    },
    handleCustomersClose(done) {
      this.resetCustomersFilter()
      done();
    },
    resetLogFilter() {
      this.isonline = '';
      this.username = '';
      // this.operationLogData = [];
      // this.logTotal=0;
      // this.logPageNumber=1;
      // this.logRange = [moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),moment(moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')).add(1,'days').format('YYYY-MM-DD HH:mm:ss')]
    },
    resetNoticeFilter() {
      this.noticeTitle = '';
      this.noticeType = '';
      this.selectNoticeTime = [moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment(moment().startOf(
        'day').format('YYYY-MM-DD HH:mm:ss')).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')]
    },
    resetCustomersFilter() {
      this.followupStep = '';
      this.username = '';
      // this.customersData=[];
      // this.customersTotal=0;
      // this.customersPageNumber=1;
      // this.operationDate = [moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),moment(moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')).add(1,'days').format('YYYY-MM-DD HH:mm:ss')]
    },
    // 操作日志
    getOperationData(val) {
      let _this = this;
      if (typeof val != "number") {
        this.logPageNumber = 1
      }
      var data = ''
      if (this.logRange == null || this.logRange.length <= 0) {
        data = {
          startDate: '',
          endDate: '',
          teamid: _this.overviewForm5.teamid,
          username: _this.overviewForm5.userid,
          pageNumber: this.logPageNumber,
          pageSize: this.logPageSize,
        }
      } else {
        data = {
          startDate: this.formatDate(this.logRange[0], 'yyyy-MM-dd HH:mm:ss'),
          endDate: this.formatDate(this.logRange[1], 'yyyy-MM-dd HH:mm:ss'),
          teamid: _this.overviewForm5.teamid,
          username: _this.overviewForm5.userid,
          pageNumber: this.logPageNumber,
          pageSize: this.logPageSize,
        }
      }

      api.getOnlineTrace(data).then((res) => {
        if (res.total > 0 && res.rows == '') {
          _this.logPageNumber = 1;
          _this.handleCurrentChange();
        } else {
          _this.operationLogData = res.rows,
            _this.logTotal = res.total
        }
      })


    },
    // 客户列表
    getCustomersData(val) {
      let _this = this;
      if (typeof val != "number") {
        this.customersPageNumber = 1
      }
      let data = {
        // oprDate: this.operationDate,
        startDate: this.formatDate(this.operationDate[0], 'yyyy-MM-dd HH:mm:ss'),
        endDate: this.formatDate(this.operationDate[1], 'yyyy-MM-dd HH:mm:ss'),
        followupstep: this.followupStep,
        username: this.username,
        // oprDate:'',
        // followupstep:'',
        // username:'',
        pageNumber: this.customersPageNumber,
        pageSize: this.customersPageSize,
      }
      api.getFollowData(data).then((res) => {
        if (res.total > 0 && res.rows == '') {
          _this.customersPageNumber = 1;
          _this.handleCurrentChangeCustomers();
        } else {
          _this.customersData = res.rows,
            _this.customersTotal = res.total
        }
      })
    },
    createFilter(queryString) {
      return (SalesmanBox) => {
        return (SalesmanBox.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    querySearch(queryString, cb) {
      var SalesmanBox = this.SalesmanBox;
      var results = queryString ? SalesmanBox.filter(this.createFilter(queryString)) : SalesmanBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    modifyPrevistiTime(index) {
      let _this = this
      let item = this.huifang[index]
      api.updatePrevistiTime({ activityserialno: item.activityserialno, previstitime: item.previstitime }).then((res) => {
        if (res.code === '0') {
          _this.closeItemPopover(index)
        } else {
          _this.$message({
            showClose: true,
            message: res.msg,
            duration: 3000,
            type: 'error'
          });
        }
        //获取预约回访记录
        api.getPreVisitList().then((data) => {
          _this.huifang = data.rows;
        })
      })
    },
    closeItemPopover(index) {
      this.huifang[index].visible = false
    },
    handleCurrentChange(val) {
      this.logPageNumber = val
      this.getOperationData(val)
    },
    handleNoticePageChange(val) {
      this.noticePageNumber = val
      this.getNoticeListMore(val)
    },
    handleCurrentChangeCustomers(val) {
      this.customersPageNumber = val
      this.getCustomersData(val)
    },
    showLogDialog() {
      this.logDialogVisible = true
    },
    showCustomerDialogVisible() {
      this.customerDialogVisible = true
    },
    sanchu(my_Id) {
      let _this = this;
      //获取预约回访记录
      let datateam = {
        'activityserialno': my_Id,
      }
      api.activityVisit(datateam).then((data) => {
        if (data.code == 0) {
          api.getPreVisitList().then((res) => {
            _this.huifang = '';
            _this.huifang = res.rows;
          })
        } else {
          _this.$message({
            showClose: true,
            message: data.msg,
            duration: 3000,
            type: 'error'
          });
        }
      })
    },

    disDownData() {
      let _this = this;
      let datateam = {
        'queryflag': _this.queryflagString,
        'startDate': _this.downStartTime,
        'endDate': _this.downEndTime,
        'teamid': _this.overviewForm2.teamid,
        'userid': _this.overviewForm2.userid || _this.jieshao.userid
      }
      api.getActivitySumData(datateam).then((data) => {
        data.hotlinecount_compare = data.hotlinecount_compare.substring(0, data.hotlinecount_compare
          .length - 1);
        data.hotlinecallcount_compare = data.hotlinecallcount_compare.substring(0, data
          .hotlinecallcount_compare.length - 1);
        data.hotlineconnectcount_compare = data.hotlineconnectcount_compare.substring(0, data
          .hotlineconnectcount_compare.length - 1);
        data.claimcount_compare = data.claimcount_compare.substring(0, data.claimcount_compare.length -
          1);
        data.dealcount_compare = data.dealcount_compare.substring(0, data.dealcount_compare.length - 1);
        data.firstplancount_compare = data.firstplancount_compare.substring(0, data.firstplancount_compare
          .length - 1);
        data.hotlineconnectrate_compare = data.hotlineconnectrate_compare.substring(0, data
          .hotlineconnectrate_compare.length - 1);
        data.nodealcount_compare = data.nodealcount_compare.substring(0, data.nodealcount_compare.length -
          1);
        data.phonecallcount_compare = data.phonecallcount_compare.substring(0, data.phonecallcount_compare
          .length - 1);
        data.phoneconnectcount_compare = data.phoneconnectcount_compare.substring(0, data
          .phoneconnectcount_compare.length - 1);
        data.phoneconnectrate_compare = data.phoneconnectrate_compare.substring(0, data
          .phoneconnectrate_compare.length - 1);
        data.secondplancount_compare = data.secondplancount_compare.substring(0, data
          .secondplancount_compare.length - 1);
        data.sumfyp20_compare = data.sumfyp20_compare.substring(0, data.sumfyp20_compare.length - 1);
        data.sumtime_compare = data.sumtime_compare.substring(0, data.sumtime_compare.length - 1);
        data.tdancount_compare = data.tdancount_compare.substring(0, data.tdancount_compare.length - 1);
        data.wxcount_compare = data.wxcount_compare.substring(0, data.wxcount_compare.length - 1);
        _this.dataList = data;
      })
    },
    disOnLineInfo() {
      let _this = this;
      //获取登录用户信息
      return new Promise((relove, reject) => {
        api.getLogonUserInfo().then((data) => {
          _this.jieshao = data
          _this.$store.commit('USER_INFO', data)
          relove()
        })
      })

    },
    handleSelect(key, keyPath) {
      if (key == 'today') {
        this.upStartTime = getBeforeDate(0)
        this.upEndTime = getBeforeDate(1)
      } else {
        this.upStartTime = getBeforeDate(-1)
        this.upEndTime = getBeforeDate(0)
      }
    },
    handleSelectteam(key, keyPath) {
      if (key == 'single') {
        this.upTeamFlag = '01'
      } else {
        this.upTeamFlag = '02'
      }
    },
    queryDownDataByDate() {
      if (this.selectTime && this.selectTime.length > 0) {
        this.downStartTime = this.formatDate(this.selectTime[0], 'yyyy-MM-dd HH:mm:ss');
        this.downEndTime = this.formatDate(this.selectTime[1], 'yyyy-MM-dd HH:mm:ss');
      };
      this.disDownData();
    },
    queryDownDataByTeam(key, keyPath) {
      if (this.selectTime && this.selectTime.length > 0) {
        this.downStartTime = this.formatDate(this.selectTime[0], 'yyyy-MM-dd HH:mm:ss');
        this.downEndTime = this.formatDate(this.selectTime[1], 'yyyy-MM-dd HH:mm:ss');
      };
      if (this.downStartTime == '' && this.downEndTime == '') {
        _this.$message({
          showClose: true,
          message: '请选择时间周期！',
          duration: 3000,
          type: 'error'
        });
      }
      if (key == 'single') {
        this.downTeamFlag = '01'
      } else {
        this.downTeamFlag = '02'
      }
      this.disDownData();
    },
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
    }
  }
}
</script>
<style src="../../static/css/home.css"></style>
<style scoped>
[v-cloak] {
  display: none !important;
}

#div8 {
  min-height: 1rem;
}

#div6 {
  min-height: 3rem;
}

.el-table__row .cell {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  background-color: #f5f5f5;
}

.filter-section .common-select {
  width: auto;
}

.filter-section .common-select .select-content {
  margin-right: 0.3rem;
}
.filter-section .common-select:last-child .select-content {
  margin-right: 0;
}
.container_left_two_d {
  margin: 0.2rem 0.3rem 0 0.3rem;
}

.date_cntent .canyu {
  width: 100%;
}
.step-list {
  padding: 0rem;
  overflow: auto;
}
.bdjsDetail {
  height: 510px;
  overflow: auto;
  /* border: 1px solid rgba(216, 216, 216, 1); */
  padding: 10px;
}
.enclosure-list {
  min-height: 40px !important;
  max-height: 100px;
  overflow: auto;
}

.textCenter {
  text-align: center;
}
</style>