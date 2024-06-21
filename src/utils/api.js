import {
  GET,
  POST,
  http
} from './request.js';
import axios from "axios";



// 获取token
function getTempToken(params) {
  return POST(params, '/crm/auth/getToken.do')
}
//获取登录用户信息
function getPageHeaderInfo(params) {
  return POST(params, '/crm/auth/getPageHeaderInfo.do')
}
// export const getPageHeaderInfo = (params) => GET(params, '/crm/common/getDictList.do')

//更改版本号
function getDictList(params) {
  return POST(params, '/crm/common/getDictList.do')
}

//菜单权限
function getAuthMenuList(params) {
  return POST(params, '/crm/auth/getAuthMenuList.do')
}

//getHomePagePermission
function getHomePagePermission(params) {
  return POST(params, '/crm/auth/getHomePagePermission.do')
}

//获取当前用户的战斗力，当前是否有热线信息
function headerPrompts(params) {
  return POST(params, '/crm/auth/headerPrompts.do')
}

//收回
function msgClick(params) {
  return POST(params, '/crm/auth/msgClick.do')
}

//退出操作
function login(params) {
  return POST(params, '/crm/auth/logon.do')
}

//退出操作
function logOut(params) {
  return POST(params, '/crm/auth/logout.do')
}

// 是否登录
function islogin(params) {
  return POST(params, '/crm/auth/islogon.do')
}

//设置在线状态
function setOnlineInfo(params) {
  return POST(params, '/crm/auth/setOnlineInfo.do')
}

// home页部分

//获取用户头像
function getUserPhoto(params) {
  return POST(params, '/crm/auth/getUserPhoto.do')
}

//获取预约回访记录
function getPreVisitList(params) {
  return POST(params, '/crm/activity/getPreVisitList.do')
}

//数据选择类型
function getHomeReportDictList(params) {
  return POST(params, '/crm/common/getHomeReportDictList.do')
}

//昨日时长排名
function getLastDayCallTimeList(params) {
  return POST(params, '/crm/report/getLastDayCallTimeList.do')
}

//getLastWeekData
function getLastWeekData(params) {
  return POST(params, '/crm/report/getLastWeekData.do')
}

//getLastWeekData
function getFypList(params) {
  return POST(params, '/crm/report/getFypList.do')
}

// 搜索内容
function getCalendarInfo(params) {
  return POST(params, '/crm/calendar/getCalendarInfo.do')
}

// 搜索内容
function getAllUserIdNameList(params) {
  return POST(params, '/crm/auth/getAllUserIdNameList.do')
}

// 添加事件按钮
function calendarInsert(params) {
  return POST(params, '/crm/calendar/calendarInsert.do')
}

// 修改添加事件按钮
function calendarUpdate(params) {
  return POST(params, '/crm/calendar/calendarUpdate.do')
}

// 删除添加事件按钮
function calendarDelete(params) {
  return POST(params, '/crm/calendar/calendarDelete.do')
}

// 获取人员名单
function getRealUserName(params) {
  return POST(params, '/crm/calendar/getRealUserName.do')
}

// 获取其他库
function getManagePermission(params) {
  return POST(params, '/crm/auth/getManagePermission.do')
}

//设置当前用户的团队列表参数
function getTeamList(params) {
  return POST(params, '/crm/auth/getTeamList.do')
}

//获取业务员列表
function getUserIdNameListByTeam(params) {
  return POST(params, '/crm/auth/getUserIdNameListByTeam.do')
}

//获取文件上传记录
function getFileListBySecondId(params) {
  return POST(params, '/crm/fileupload/getFileListBySecondId.do')
}

//获取getOnePolicyRead
function getOnePolicyRead(params, url) {
  return POST(params, url)
}

//获取报导数据
function getHomeReprotData(params) {
  return POST(params, '/crm/activity/getHomeReprotData.do')
}

//获取公告列表
function getNoticeList(params) {
  return POST(params, '/crm/system/getNoticeList.do')
}

//获取藏经阁新上线
function getHomeKnowledgeList(params) {
  return POST(params, '/crm/knowledge/getHomeKnowledgeList.do')
}

//藏经阁新上线完成
function readKnowLedge(params) {
  return POST(params, '/crm/knowledge/readKnowLedge.do')
}

// 操作日志
function getOnlineTrace(params) {
  return POST(params, '/crm/auth/getOnlineTrace.do')
}

// 客户列表
function getFollowData(params) {
  return POST(params, '/crm/auth/getFollowData.do')
}

//获取用户人员名单
function getUserNameList(params) {
  return POST(params, '/crm/auth/getUserNameList.do')
}

//修改 活动时间
function updatePrevistiTime(params) {
  return POST(params, '/crm/activity/updatePrevistiTime.do')
}

//获取活动回访
function activityVisit(params) {
  return POST(params, '/crm/activity/activityVisit.do')
}

//获取数据统计
function getActivitySumData(params) {
  return POST(params, '/crm/activity/getActivitySumData.do')
}

//获取登录用户信息
function getLogonUserInfo(params) {
  return POST(params, '/crm/auth/getLogonUserInfo.do')
}


//获取团队信息
function getTalkTeamList(params) {
  return POST(params, '/crm/auth/getTalkTeamList.do')
}
//获取团队中用户信息
function getQwUser(params) {
  return POST(params, '/crm/qwMan/getQwUser.do')
}
//获取用户的客户信息
function getQwCustomerByUser(params) {
  return POST(params, '/crm/qwMan/getQwCustomerByUser.do')
}

//获取用户的同事信息
function getQwColleagueByUser(params) {
  return POST(params, '/crm/qwMan/getQwColleagueByUser.do')
}

//获取用户的群聊信息
function getQunList(params) {
  return POST(params, '/crm/qwMan/getQunList.do')
}
//获取用户和客户的聊天记录
function getQwTalkData(params) {
  return POST(params, '/crm/qwMan/getQwTalkData.do')
}

//获取群的聊天记录
function getQwQunTalkData(params) {
  return POST(params, '/crm/qwMan/getQwQunTalkData.do')
}
// 获取企业所有的客户
function getAllcustom(params) {
  return POST(params, '/crm/qwMan/getQwCustomer.do')
}
// 获取客户所对应的员工
function getcustomTouser(params) {
  return POST(params, '/crm/qwMan/getQwUserByCustomer.do')
}

// 获取所有的群
function getAllqun(params) {
  return POST(params, '/crm/qwMan/getQunList.do')
}
// 获取群中所有的员工
function getAllqunUser(params) {
  return POST(params, '/crm/qwMan/getQunMemberList.do')
}

// 会话消息存档员工 群 统计
function getQwTj(params) {
  return POST(params, '/crm/qwMan/getQwTj.do')
}

// 查询分组
function getTalkTempleteGroup(params) {
  return POST(params, '/crm/talktemplete/getTalkTempleteGroup.do')
}
// 创建分组
function addTalkTempleteGroup(params) {
  return POST(params, '/crm/talktemplete/addTalkTempleteGroup.do')
}
// 编辑分组
function modifyTalkTempleteGroup(params) {
  return POST(params, '/crm/talktemplete/modifyTalkTempleteGroup.do')
}
// 删除分组
function deleteTalkTempleteGroup(params) {
  return POST(params, '/crm/talktemplete/deleteTalkTempleteGroup.do')
}
// 新建话术库
function addTalkTempleteContent(params) {
  return POST(params, '/crm/talktemplete/addTalkTempleteContent.do')
}
// 查询话术库
function getTalkItemList(params) {
  return POST(params, '/crm/talktemplete/getTalkItemList.do')
}

// 编辑话术库
function modifyTalkTempleteContent(params) {
  return POST(params, '/crm/talktemplete/modifyTalkTempleteContent.do')
}
// 删除话术库
function deleteTalkTempleteContent(params) {
  return POST(params, '/crm/talktemplete/deleteTalkTempleteContent.do')
}
// 是否是团队长
function isLeader(params) {
  return POST(params, '/crm/auth/isLeader.do')
}

// 解析链接
function parseUrl(params) {
  return POST(params, '/crm/qw/talktemplete/parseUrl.do')
}

// 解析链接
function itemUp(params) {
  return POST(params, '/crm/talktemplete/itemUp.do')
}

function itemDown(params) {
  return POST(params, '/crm/talktemplete/itemDown.do')
}

function groupUp(params) {
  return POST(params, '/crm/talktemplete/groupUp.do')
}

function groupDown(params) {
  return POST(params, '/crm/talktemplete/groupDown.do')
}



export default {
  getTempToken,
  getPageHeaderInfo,
  getDictList,
  getAuthMenuList,
  getHomePagePermission,
  headerPrompts,
  msgClick,
  logOut,
  islogin,
  setOnlineInfo,
  // home页部分
  getUserPhoto,
  getPreVisitList,
  getHomeReportDictList,
  getLastDayCallTimeList,
  getLastWeekData,
  getFypList,
  getCalendarInfo,
  getAllUserIdNameList,
  calendarInsert,
  calendarUpdate,
  calendarDelete,
  getRealUserName,
  getManagePermission,
  getTeamList,
  getUserIdNameListByTeam,
  getFileListBySecondId,
  getOnePolicyRead,
  getHomeReprotData,
  getNoticeList,
  getHomeKnowledgeList,
  readKnowLedge,
  getOnlineTrace,
  getFollowData,
  getUserNameList,
  updatePrevistiTime,
  activityVisit,
  getActivitySumData,
  getLogonUserInfo,
  getTalkTeamList,
  getQwUser,
  getQwCustomerByUser,
  getQwTalkData,
  getQwColleagueByUser,
  getQunList,
  getQwQunTalkData,
  getAllcustom,
  getcustomTouser,
  getAllqun,
  getAllqunUser,
  getQwTj,
  addTalkTempleteGroup,
  modifyTalkTempleteGroup,
  deleteTalkTempleteGroup,
  getTalkTempleteGroup,
  addTalkTempleteContent,
  getTalkItemList,
  modifyTalkTempleteContent,
  deleteTalkTempleteContent,
  isLeader,
  parseUrl,
  itemUp,
  itemDown,
  groupUp,
  groupDown
}