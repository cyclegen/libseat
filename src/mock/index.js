import Mock from 'mockjs'
import {
  _login, _getUserInfo, _getAnnounce, _getRoomStatus, _getBookHistory, _getUserBook, _getEndTimesFromNow, _getRoomsByTime, _getRoomSeatLayoutByEndTime, _freeBook, _getAllowedHours,
  _quickBook, _checkIn, _leave, _stop, _getFavSeats, _getRoomByName, _cancel, _timeExtend
} from './SimulationData'

// 登录相关和获取用户信息
Mock.mock(/\/rest\/auth/, _login)
Mock.mock(/\/rest\/v2\/user\/favSeats/, _getFavSeats)
Mock.mock(/\/rest\/v2\/user\/reservations/, _getUserBook)
Mock.mock(/\/rest\/v2\/user/, _getUserInfo)
Mock.mock(/\/rest\/v2\/announce/, _getAnnounce)
Mock.mock(/\/rest\/v2\/room\/stats2/, _getRoomStatus)
Mock.mock(/\/rest\/v2\/history/, _getBookHistory)
Mock.mock(/\/rest\/v2\/endTimesFromNow/, _getEndTimesFromNow)
Mock.mock(/\/rest\/v2\/endTimesFromNow/, _getEndTimesFromNow)
Mock.mock(/\/rest\/v2\/roomsByTime/, _getRoomsByTime)
Mock.mock(/\/rest\/v2\/room\/layoutByEndMinutes/, _getRoomSeatLayoutByEndTime)
Mock.mock(/\/rest\/v2\/freeBook/, _freeBook)
Mock.mock(/\/rest\/v2\/allowedHours/, _getAllowedHours)
Mock.mock(/\/rest\/v2\/quickBook/, _quickBook)
Mock.mock(/\/rest\/v2\/checkIn/, _checkIn)
Mock.mock(/\/rest\/v2\/byName/, _getRoomByName)
Mock.mock(/\/rest\/v2\/leave/, _leave)
Mock.mock(/\/rest\/v2\/stop/, _stop)
Mock.mock(/\/rest\/v2\/cancel/, _cancel)
Mock.mock(/\/rest\/v2\/timeExtend/, _timeExtend)
export default Mock
