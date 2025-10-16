import { path, pathMes, pathMo, pathMv } from '@/lib/system'

/* ----------------------------------------退洗工序------------------------------------------------*/
//热退酸洗-实时监控
export const getTxProdOfDay = pathMv + '/unwash/getTxProdOfDay'
//退洗停机检测接口；无参
export const getRollStopType = pathMv + '/unwash/getRollStopType'
//热退酸洗-每日产量(产量统计)
export const getTxProdByTime = pathMv + '/unwash/getTxProdByTime'
//热退酸洗-各人均产量统计(产量统计)
export const getAvgProdOfPeople = pathMv + '/unwash/getAvgProdOfPeople'
//热退酸洗-停时统计
export const getTxStopMinByTime = pathMv + '/unwash/getTxStopMinByTime'
//热退酸洗-停时统计（下钻
export const getProdStatsDrillDown = pathMv + '/unwash/getProdStatsDrillDown'
//热退酸洗-停时统计(下钻
export const getTxDowntimeDetailWeb = pathMv + '/unwash/getTxDowntimeDetailWeb'
//热退酸洗-表检不合格主缺陷
export const getTxUnQualifiedByTime = pathMv + '/unwash/getTxUnQualifiedByTime'
//表检复判不合格主缺陷工序分布
export const getRecheckMainDefectStats =
  pathMv + '/unwash/getRecheckMainDefectStats'
//热退酸洗-重点工艺合格率
export const getTxImportantProcessByTime =
  pathMv + '/unwash/getTxImportantProcessByTime'
//热退酸洗-效率统计
export const getOEEOfTime = pathMv + '/unwash/getOEEOfTime'
//热退酸洗-质量情况
export const getQualityStatus = pathMv + '/unwash/getQualityStatus'
//热退酸洗-重点工艺合格率(下钻
export const getProcessDefectCount = pathMv + '/unwash/getProcessDefectCount'
//热退酸洗-成品一级品率
export const getTxProdPassRatioByTime =
  pathMv + '/unwash/getTxProdPassRatioByTime'
//热退酸洗-成品一级品率(下钻
export const getFinishedProductFirstGradeRateDetail =
  pathMv + '/unwash/getFinishedProductFirstGradeRateDetail'
//热退酸洗-吨钢能耗
export const getTxAvgEnergyByTime = pathMv + '/unwash/getTxAvgEnergyByTime'
//热退酸洗-吨钢能耗：电、空气、新水消耗
export const getTxThreeEnergyByTime = pathMv + '/unwash/getTxThreeEnergyByTime'
//热退酸洗-吨钢能耗(气)
export const getTxAvgEnergyOfEleByTime =
  pathMv + '/unwash/getTxAvgEnergyOfEleByTime'
//热退酸洗-吨钢能耗(电)
export const getTxAvgEnergyTonEleByTime =
  pathMv + '/unwash/getTxAvgEnergyTonEleByTime'

//分条产线-实时监控
export const getTxFtProdNow = pathMv + '/unwash/getTxFtProdNow'
//分条产线-实时监控（停机监测
export const getFenStopType = pathMv + '/unwash/getFenStopType'
//分条产线-产量统计
export const getTxFtProdByTime = pathMv + '/unwash/getTxFtProdByTime'
//分条产线-产量统计(下钻
export const getSlittingOutputDetail =
  pathMv + '/unwash/getSlittingOutputDetail'

//库存统计-原料库存占用
export const getStoreOfInit = pathMv + '/unwash/getStoreOfInit'
//库存统计-原料库存占用（新
export const getTxSourceStove = pathMv + '/unwash/getTxSourceStove'
//库存统计-成品库存占用
export const getStoreOfProd = pathMv + '/unwash/getStoreOfProd'
//库存统计-成品库存占用（新
export const getTxProdStove = pathMv + '/unwash/getTxProdStove'
