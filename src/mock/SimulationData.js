import bookHistory from './bookHistory'
import getRoomByTime from './getRoomByTime'
import seatLayout from './seatLayout'
import roomStatus from './roomStatus'
import favSeats from './favSeats'
import byName from './byName'

// 获取公告数据
export const _getAnnounce = req => {
  var ajaxReturn = { announce: '为了维护读者在图书馆平等利用阅览座位的权益，杜绝抢占座位等不良现象发生，图书馆A406第二自习室自3月8日开始使用座位管理系统来规范和维护阅览秩序。以下为作为管理系统操作流程及规则：1、当日允许预约当日时间为：当日时间从 08:30-21:30。\r\n当日允许预约来日时间为：来日时间从 08:30-19:30。试运行结束后，早晨开始时间会恢复至07:00。2、预约最短时间单位为30分钟。3、可提前1天预约，每天可预约10次， 每次最多可预约6小时。每日可取消预约10次，必须提前15分钟取消预约。4、预约时间超过15分钟未进场，取消其预约，同时认为违约。5、允许提前15分钟进场签到，签到请在摇一摇界面选择签到”。6、暂时离开阅览室时，请在微信摇一摇界面选择暂离”，暂离”时座位保留60分钟。离开60分钟以上视为放弃座位，原座位重新进入自动派位。暂时离开返回时，可在摇一摇界面选择返回”，系统将自动回复原座位。如需离开阅览室超过60分钟，请在摇一摇界面选择释放座位”，原座位将进入可预约状态。7、预约结束后自动设置用户状态为离场。8、暂时禁止续约。', url: 'www.baidu.com' }
  return {
    status: 'success',
    data: ajaxReturn,
    message: ''
  }
}
// 获得教室列表以及座位使用情况
export const _getRoomStatus = (buildId) => {
  return {
    status: 'success',
    data: roomStatus,
    message: ''
  }
}

// 预约历史记录
export const _getBookHistory = req => {
  return {
    status: 'success',
    data: bookHistory,
    message: ''
  }
}

// 获取用户当前预约
export const _getUserBook = req => {
  var data = [
    {
      id: 1292,
      receipt: 'nry2-292-4',
      onDate: '2019-02-15',
      seatId: 4713,
      status: 'CHECK_IN',
      location: '新馆1层足球发展史研究，座位号126',
      begin: '11:33',
      end: '13:33',
      actualBegin: null,
      awayBegin: null,
      awayEnd: null,
      userEnded: false,
      message: '请在 09月15日11点33分 至 11点48分 之间前往场馆签到'
    }
  ]
  return {
    status: 'success',
    data: data,
    message: ''
  }
}
// 获取以当前时间开始所有可用的结束时间
export const _getEndTimesFromNow = req => {
  var endTimes = { endTimes: [720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320] }
  return {
    status: 'success',
    data: endTimes,
    message: ''
  }
}
// 根据开始结束时间获取教室列表
export const _getRoomsByTime = req => {
  return {
    status: 'success',
    data: getRoomByTime,
    message: ''
  }
}
// 根据结束时间获取指定教室座位布局信息
export const _getRoomSeatLayoutByEndTime = req => {
  return {
    status: 'success',
    data: seatLayout,
    message: ''
  }
}
// 自选预约
export const _freeBook = req => {
  var data = {
    'id': 1342,
    'receipt': 'nry3-342-7',
    'onDate': '2018 年 12 月 18 日',
    'begin': '19 : 40',
    'end': '22 : 40',
    'location': '新馆2层历史自然科学教室，座位号34',
    'checkedIn': true,
    'checkInMsg': '成功登记入场'
  }
  return {
    status: 'success',
    data: data,
    message: ''
  }
}
// 获取系统允许预约的最大小时数,用于随机派坐
export const _getAllowedHours = req => {
  var data = { 'hours': 10, 'maxFree': '3', 'reserveMinimum': 60 }
  return {
    status: 'success',
    data: data,
    message: ''
  }
}
// 随机派坐 快速预约
export const _quickBook = req => {
  var data = {
    'reservation': {
      'id': 2653,
      'receipt': 'enry-653-6',
      'onDate': '2013 年 11 月 16 日',
      'begin': '20 : 07',
      'end': '21 : 07',
      'location': '蒲河校区图书馆1层494座位，座位号10'
    }
  }
  return {
    status: 'success',
    data: data,
    message: ''
  }
}
// 常用座位
export const _getFavSeats = req => {
  return {
    status: 'success',
    data: favSeats,
    message: ''
  }
}
// 按座位号检索
export const _getRoomByName = req => {
  return {
    status: 'success',
    data: byName,
    message: ''
  }
}
// 签到
export const _checkIn = req => {
  return {
    status: 'success',
    data: null,
    message: '您已成功登记入场'
  }
}
// 暂离
export const _leave = req => {
  return {
    status: 'success',
    data: null,
    message: '请于19时10分前返回'
  }
}
// 结束使用
export const _stop = req => {
  return {
    status: 'success',
    data: null,
    message: ''
  }
}
// 登录获取token
export const _login = ({ userName, password }) => {
  var data = {
    'status': 'success', 'code': '0', 'message': '', 'data': { 'token': 'UYZIO3Z0HFOWMK4Q' }
  }
  return data
}

// 获取用户信息
export const _getUserInfo = (token) => {
  var data = {
    'id': 14,
    'enabled': true,
    'name': 'henry',
    'username': 'henry',
    'username2': 'henryname',
    'status': 'NORMAL',
    'lastLogin': '2018-07-23T21:50:19.000',
    'checkedIn': false,
    'reservationStatus': 'RESERVE',
    'lastIn': null,
    'lastOut': null,
    'lastInBuildingId': null,
    'lastInBuildingName': null,
    'violationCount': 3
  }
  return {
    status: 'success',
    data: data,
    message: ''
  }
}

// 取消预约
export const _cancel = (id, token) => {
  return {
    status: 'success',
    data: null,
    message: ''
  }
}

// 获取可续约的结束时间
export const _timeExtend = () => {
  let res = {
    'status': 'success',
    'data': {
      'endTimes': [{
        'id': '945',
        'value': '15:45'
      },
      {
        'id': '960',
        'value': '16:00'
      },
      {
        'id': '975',
        'value': '16:15'
      },
      {
        'id': '990',
        'value': '16:30'
      },
      {
        'id': '1005',
        'value': '16:45'
      },
      {
        'id': '1020',
        'value': '17:00'
      },
      {
        'id': '1035',
        'value': '17:15'
      },
      {
        'id': '1050',
        'value': '17:30'
      }
      ]
    },
    'message': '',
    'code': '0'
  }
  return res
}
