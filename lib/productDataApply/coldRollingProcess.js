import { path, pathMes, pathMo, pathMv } from '@/lib/system'

/* ----------------------------------------数据字典------------------------------------------------*/

export const getDicInfo = pathMv + '/common/getDicInfo'
/* ----------------------------------------冷轧工序------------------------------------------------*/
//工序状态停机监测
export const getLzRollStopType = pathMv + '/coldRolling/getLzRollStopType'
//当日产量
export const getLzProdDay = pathMv + '/coldRolling/getLzProdDay'
//停时统计
export const getLzStopHoursByTime = pathMv + '/coldRolling/getLzStopHoursByTime'
//停时统计(下钻
export const getLzDownTimeDetail = pathMv + '/coldRolling/getLzDownTimeDetail'
//成品缺陷统计
export const getLzProdDefectByTime =
  pathMv + '/coldRolling/getLzProdDefectByTime'
//成品一级品率
export const getProdOneGrade = pathMv + '/coldRolling/getProdOneGrade'
//成品一级品率(下钻
export const getFinishedFirstGradeRateDetail =
  pathMv + '/coldRolling/getFinishedFirstGradeRateDetail'
//各工序电耗统计
export const getLzProcessPowerByTime =
  pathMv + '/coldRolling/getLzProcessPowerByTime'
//性能检验
export const getLzCheckProjectByTime =
  pathMv + '/coldRolling/getLzCheckProjectByTime'
//轧机平均厚度
export const getAvgMillThick = pathMv + '/coldRolling/getAvgMillThick'
//准备工序-生产统计
export const getProdOfPrepareByTime =
  pathMv + '/coldRolling/getProdOfPrepareByTime'
//准备工序-停时统计 && 轧制工序-轧机作业率 && 停时降速 &&精整工序-停时统计 && 磨辊工序-停时统计
export const getLzProdStopHoursOfDayTime =
  pathMv + '/coldRolling/getLzProdStopHoursOfDayTime'
//酸洗-停时降速（下钻
export const getPicklingStopSlowDrill =
  pathMv + '/coldRolling/getPicklingStopSlowDrill'
//轧制工序-产量统计
export const getLzProdOfRollByTime =
  pathMv + '/coldRolling/getLzProdOfRollByTime'
//轧制工序-产量统计（下钻
export const getRollingProdStatisticsDetail =
  pathMv + '/coldRolling/getRollingProdStatisticsDetail'
//准备工序-吨钢电耗
export const getAvgElecOfSteel = pathMv + '/coldRolling/getAvgElecOfSteel'
//酸洗工序-产量统计
export const getPickPordOfDay = pathMv + '/coldRolling/getPickPordOfDay'
//酸洗工序-产量统计（下钻
export const getPicklingProdStatisticsDetail =
  pathMv + '/coldRolling/getPicklingProdStatisticsDetail'
//酸洗工序-日平均厚度/速度
export const getAvgSpeedAndThick = pathMv + '/coldRolling/getAvgSpeedAndThick'
//酸洗工序-吨钢消耗
export const getAvgPickEnergy = pathMv + '/coldRolling/getAvgPickEnergy'
//酸洗工序-吨钢气、电耗
export const getAvgPickEnergyOfTime =
  pathMv + '/coldRolling/getAvgPickEnergyOfTime'
//酸洗工序-工艺速度
export const getPickSpeed = pathMv + '/coldRolling/getPickSpeed'
//精整工序-生产统计
export const getLzProdOfJingByTime =
  pathMv + '/coldRolling/getLzProdOfJingByTime'
//磨辊工序-生产统计
export const getLzRoll = pathMv + '/coldRolling/getLzRoll'
//库存统计-原料库存占用
export const getStoreOfInit = pathMv + '/coldRolling/getStoreOfInit'
//库存统计-原料库存占用(新
export const getResourceStore = pathMv + '/coldRolling/getResourceStore'
//库存统计-成品库存
export const getStoreOfProd = pathMv + '/coldRolling/getStoreOfProd'
//库存统计-成品库存(新
export const getProdStore = pathMv + '/coldRolling/getProdStore'

//冷轧-轧制工序、酸洗工序、精整工序、磨辊工序各生产、产量月统计比例
export const getLzRollByMonth = pathMv + '/coldRolling/getLzRollByMonth'

//冷轧-订单厚度统计
export const getLzOrderThick = pathMv + '/coldRolling/getLzOrderThick'

//冷轧-月订单兑换详情
export const getLzOrderDui = pathMv + '/coldRolling/getLzOrderDui'
