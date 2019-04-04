import axios from '@/libs/api.request'
import qs from 'qs'
// 获取公告数据
export const getAnnounce = () => {
  return axios.request({
    url: '/rest/v2/announce',
    method: 'get'
  })
}
// 获得教室列表以及座位使用情况
export const getRoomStatus = (buildId, token) => {
  return axios.request({
    url: '/rest/v2/room/stats2/' + buildId + '?token=' + token,
    method: 'get'
  })
}
// 获取预约历史记录
export const getBookHistory = (token) => {
  return axios.request({
    url: '/rest/v2/history/1/10?token=' + token,
    method: 'get'
  })
}
// 获取用户当前预约
export const getUserBook = (token) => {
  return axios.request({
    url: '/rest/v2/user/reservations?token=' + token,
    method: 'get'
  })
}
// 获取以当前时间开始所有可用的结束时间
export const getEndTimesFromNow = (token) => {
  return axios.request({
    url: '/rest/v2/endTimesFromNow?token=' + token,
    method: 'get'
  })
}
// 根据开始结束时间获取教室列表
export const getRoomsByTime = (start, end, token) => {
  return axios.request({
    url: '/rest/v2/roomsByTime/' + start + '/' + end + '?token=' + token,
    method: 'get'
  })
}
// 根据结束时间获取指定教室座位布局信息
export const getRoomSeatLayoutByEndTime = (id, endTime, token) => {
  return axios.request({
    url: '/rest/v2/room/layoutByEndMinutes/' + id + '/' + endTime + '?token=' + token,
    method: 'get'
  })
}
// 自选预约
export const freeBook = (seatId, endTime, token) => {
  let data = qs.stringify({
    'seat': seatId,
    'startTime': '-1',
    'endTime': endTime,
    'token': token
  })
  return axios.request({
    url: '/rest/v2/freeBook',
    data: data,
    method: 'post'
  })
}
// 获取系统允许预约的最大小时数,用于随机派坐
export const getAllowedHours = (token) => {
  return axios.request({
    url: '/rest/v2/allowedHours?token=' + token,
    method: 'get'
  })
}
// 随机派坐 快速预约
export const quickBook = (hours, buildId, token) => {
  let data = qs.stringify({
    'hour': hours,
    'building': buildId,
    'token': token
  })
  let res = axios.request({
    url: '/rest/v2/quickBook',
    data: data,
    method: 'post'
  })
  return res
}
// 获取常用座位
export const getFavSeats = (token) => {
  return axios.request({
    url: '/rest/v2/user/favSeats?token=' + token,
    method: 'get'
  })
}
// 根据座位名检索
export const getRoomByName = (name, token) => {
  return axios.request({
    url: '/rest/v2/seat/byName/' + name + '?token=' + token,
    method: 'get'
  })
}
// 根据常用座位列表获取结束时间列表
export const getEndTimesForSeat = (id, date, start, token) => {
  return axios.request({
    url: '/rest/v2/endTimesForSeat/' + id + '/' + date + '/' + start + '?token=' + token,
    method: 'get'
  })
}
// 签到
export const checkIn = (id, token) => {
  return axios.request({
    url: '/rest/v2/checkIn/' + id + '?token=' + token,
    method: 'get'
  })
}
// 暂离
export const leave = (id, token) => {
  return axios.request({
    url: '/rest/v2/leave/' + id + '?token=' + token,
    method: 'get'
  })
}
// 结束使用
export const stop = (id, token) => {
  return axios.request({
    url: '/rest/v2/stop/' + id + '?token=' + token,
    method: 'get'
  })
}
// 登录获取token
export const login = (userName, password) => {
  return axios.request({
    url: ' /rest/auth?username=' + userName + '&password=' + password,
    method: 'get'
  })
}

// 获取用户信息
export const getUserInfo = (token) => {
  return axios.request({
    url: '/rest/v2/user?token=' + token,
    method: 'get'
  })
}
// 取消预约
export const cancel = (id, token) => {
  return axios.request({
    url: '/rest/v2/cancel/' + id + '?token=' + token,
    method: 'get'
  })
}
// 获取当前预约可续约的结束时间
export const timeExtend = (id, token) => {
  return axios.request({
    url: '/rest/v2/timeExtend/' + id + '?token=' + token,
    method: 'get'
  })
}
// 续约
export const extend = (endTime, token) => {
  let data = qs.stringify({
    'endTime': endTime,
    'token': token
  })
  return axios.request({
    url: '/rest/v2/extend',
    data: data,
    method: 'post'
  })
}
