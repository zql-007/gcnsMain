/**
 * 日期转换为: yyyy-MM-dd hh:mm
 * eg:2021-01-01 01:01
 * eg:2021-11-11 11:11
 * @param value
 * @returns {string}
 */
export function date2ymdhs(value) {
  let year = value.getFullYear()
  let month =
    value.getMonth() + 1 < 10
      ? `0${value.getMonth() + 1}`
      : value.getMonth() + 1
  let date = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
  let hour = value.getHours() < 10 ? `0${value.getHours()}` : value.getHours()
  let minute =
    value.getMinutes() < 10 ? `0${value.getMinutes()}` : value.getMinutes()
  return `${year}-${month}-${date} ${hour}:${minute}`
}
/**
 * 日期转换为: yyyy-MM
 * eg:2021-01
 * @param value
 * @returns {string}
 */
//默认当月
export function date2ym(value) {
  let year = value.getFullYear()
  let month = add0(value.getMonth() + 1)
  return `${year}-${month}`
}
//默认当月的上个月
export function date3ym(value) {
  let year = value.getFullYear()
  let month = add0(value.getMonth())
  if (month === '00') {
    month = '12'
    year = year - 1
  }
  return `${year}-${month}`
}
//默认当月的上6个月
export function date4ym(value) {
  let year = value.getFullYear()
  let month = add0(value.getMonth() + 1)
  if (month === '01') {
    month = '07'
    year = year - 1
  } else if (month === '02') {
    month = '08'
    year = year - 1
  } else if (month === '03') {
    month = '09'
    year = year - 1
  } else if (month === '04') {
    month = '10'
    year = year - 1
  } else if (month === '05') {
    month = '11'
    year = year - 1
  } else if (month === '06') {
    month = '12'
    year = year - 1
  }
  return `${year}-${month}`
}

/**
 * 日期转换为: yyyy-MM-dd
 * eg:2021-01-01 01:01
 * eg:2021-11-11 11:11
 * @param value
 * @returns {string}
 */
export function date2ymd(value) {
  let year = value.getFullYear()
  let month = add0(value.getMonth() + 1)
  let date = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
  return `${year}-${month}-${date}`
}
export function date21ymd(value) {
  let year = value.getFullYear()
  let month = add0(value.getMonth() + 1)
  let date = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
  return `${year}-${month}-${date - 1}`
}
export function date211ymd(value) {
  let year = value.getFullYear()
  let month = add0(value.getMonth() + 1)
  let date = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
  return `${year}-${month}-${date + 1}`
}

/**
 * 日期转换为: yyyy年MM月dd日
 * eg:2021-01-01 01:01
 * eg:2021-11-11 11:11
 * @param value
 * @returns {string}
 */
export function date22ymd(value) {
  let year = value.getFullYear()
  let month = add0(value.getMonth() + 1)
  let date = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
  return `${year}年${month}月${date}日`
}

/**
 * 日期转换为: MM-dd
 * eg:01月01日
 * @param value
 * @returns {string}
 */
export function date2md(value) {
  // let year = value.getFullYear()
  let month = add0(value.getMonth() + 1)
  let date = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
  return `${month}月${date}日`
}
/**
 * 比较两个时间，大于 返回true
 * @param time1
 * @param time2
 * @returns {number}
 */
export function dateCompare(time1, time2) {
  let temp = new Date(time1).getTime() - new Date(time2).getTime()
  return temp > 0
}

/*获取当天yyyy-MM-dd*/
export function getNowDay() {
  const date = new Date()
  return date2ymd(date)
}
/*获取当天的前一天yyyy-MM-dd*/
export function getPreviousDate() {
  const date = new Date()
  date.setDate(date.getDate() - 1)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
//获取当天的前一天的上个月
export function getPreviousMonthDate() {
  // 获取当前日期
  const today = new Date()

  // 设置为前一天
  today.setDate(today.getDate() - 1)

  // 获取当前年份
  let year = today.getFullYear()
  // 获取当前月份（0 - 11，0代表1月）
  let month = today.getMonth()
  // 获取当前日
  let day = today.getDate()

  // 若当前月份是1月（即month为0 ），则上个月是去年12月，年份需减1
  if (month === 0) {
    month = 12
    year -= 1
  }
  // 计算上个月的天数
  let lastMonthDays = new Date(year, month - 1, 0).getDate()
  // 若当前日期大于上个月天数，将day设为上个月最后一天
  if (day > lastMonthDays) {
    day = lastMonthDays
  }
  // 返回上个月的日期对象
  return formatDate(new Date(year, month - 1, day + 1))
}
//当前日期半年前的月份的第一天
export function getHalfYearAgoDate() {
  // 获取当前日期
  const today = new Date()

  // 计算6个月前的日期
  const sixMonthsAgo = new Date(today)
  sixMonthsAgo.setMonth(today.getMonth() - 6)

  // 设置为当月的第一天
  sixMonthsAgo.setDate(1)

  // 提取年、月、日
  const year = sixMonthsAgo.getFullYear()
  // 月份从0开始，需要加1
  const month = String(sixMonthsAgo.getMonth() + 1).padStart(2, '0')
  const day = String(sixMonthsAgo.getDate()).padStart(2, '0')

  // 格式化日期字符串
  return `${year}-${month}-${day}`
}
//获取当天的上个月
export function getLastMonthDate() {
  // 创建当前日期对象
  let currentDate = new Date()
  // 获取当前年份
  let year = currentDate.getFullYear()
  // 获取当前月份（0 - 11，0代表1月）
  let month = currentDate.getMonth()
  // 获取当前日
  let day = currentDate.getDate()

  // 若当前月份是1月（即month为0 ），则上个月是去年12月，年份需减1
  if (month === 0) {
    month = 12
    year -= 1
  }
  // 计算上个月的天数
  let lastMonthDays = new Date(year, month - 1, 0).getDate()
  // 若当前日期大于上个月天数，将day设为上个月最后一天
  if (day > lastMonthDays) {
    day = lastMonthDays
  }
  // 返回上个月的日期对象
  return formatDate(new Date(year, month - 1, day + 1))
}
//转为yyyy-MM-DD格式
export function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
/*获取当天yyyy-MM-dd的上一天*/
export function getNowBeforeOneDay() {
  const date = new Date()
  return date21ymd(date)
}
/*获取当天yyyy-MM-dd的h后一天*/
export function getNowNextOneDay() {
  const date = new Date()
  return date211ymd(date)
}
/*获取当天yyyy年MM月dd日*/
export function getNowDay22() {
  const date = new Date()
  return date22ymd(date)
}
/*获取当月最后一天*/
export function getMonthLastDayByTime(time) {
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth()
  return date2ymd(new Date(y, m + 1, 0))
}
/*获取当年第一天*/
export function getYearFirstDay() {
  const date = new Date()
  const y = date.getFullYear()
  return date2ymd(new Date(y, 0, 1))
}
/*获取去年第一天*/
export function getYearFirstDayLast() {
  const date = new Date()
  const y = date.getFullYear() - 1
  return date2ymd(new Date(y, 0, 1))
}
/*获取当年最后一天*/
export function getYearLastDay() {
  const date = new Date()
  const y = date.getFullYear() + 1
  return date2ymd(new Date(y, 0, 0))
}
/*获取当年第一月*/
export function getFirstMonth() {
  const date = new Date()
  const y = date.getFullYear()
  return `${y}-01`
}
/*获取去年第一月*/
export function getLastFirstMonth() {
  const date = new Date()
  const y = date.getFullYear()
  return `${y - 1}-01`
}
/*获取距离当月往后12个月*/
export function getLastOneYearMonth(endDate) {
  // 如果未传入结束日期，默认使用当前日期
  const date = endDate ? new Date(endDate) : new Date()

  // 计算12个月前的日期
  date.setMonth(date.getMonth() - 11)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份+1并补零

  return `${year}-${month}`
}
/*获取当月*/
export function getMonthDay() {
  const date = new Date()
  return date2ym(date)
}
/*获取当月上个月*/
export function getMonthDayBefore() {
  const date = new Date()
  return date3ym(date)
}
/*获取当月上6个月*/
export function getMonthDaySixBefore() {
  const date = new Date()
  return date4ym(date)
}
/*获取当月第一天*/
export function getMonthFirstDay() {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth()
  return date2ymd(new Date(y, m, 1))
}
/*获取当月最后一天*/
export function getMonthLastDay() {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth()
  return date2ymd(new Date(y, m + 1, 0))
}

//将excel的日期格式转成Date()对象;
export function getFormatDate_XLSX(serial) {
  const utc_days = Math.floor(serial - 25569)
  const utc_value = utc_days * 86400
  const date_info = new Date(utc_value * 1000)
  const fractional_day = serial - Math.floor(serial) + 0.0000001
  let total_seconds = Math.floor(86400 * fractional_day)
  const seconds = total_seconds % 60
  total_seconds -= seconds
  const hours = Math.floor(total_seconds / (60 * 60))
  const minutes = Math.floor(total_seconds / 60) % 60
  const d = new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  )
  return d
}

/**
 * 日期转换为: yyyy-MM-dd hh:mm:ss
 * eg:2021-01-01 01:01:33
 * @param value
 * @returns {string}
 */
export function date2ymdhs2(value, format = '-', format2 = ':') {
  const YYYY = value.getFullYear()
  const MM = add0(value.getMonth() + 1)
  const DD = add0(value.getDate())
  const hh = add0(value.getHours())
  const mm = add0(value.getMinutes())
  const ss = add0(value.getSeconds())

  return `${YYYY}${format}${MM}${format}${DD} ${hh}${format2}${mm}${format2}${ss}`
}

function add0(m) {
  return m < 10 ? '0' + m : m
}
/**
 * 是否距离当前时间多少小时
 * @param value 时间
 */
export function dateToNowH(value) {
  let date = new Date()
  //毫秒
  let temp = new Date(value).getTime() - date.getTime()
  //毫秒转小时
  return temp / 1000 / 3600
}
