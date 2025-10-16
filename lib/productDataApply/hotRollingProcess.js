import { path, pathMes, pathMo, pathMv } from '@/lib/system'

/* ----------------------------------------产量------------------------------------------------*/
//钢卷产量
export const getRollWeight = pathMv + '/hotRolling/getRollWeight'
//中板产量
export const getPlateWeight = pathMv + '/hotRolling/getPlateWeight'
//产线停时统计与作业率(月/日)
export const getOperationMetrics = pathMv + '/hotRolling/getOperationMetrics'
//机时产量
export const getMachineHourOutput = pathMv + '/hotRolling/getMachineHourOutput'

/* ----------------------------------------生产统计------------------------------------------------*/
//生产异常统计
export const getProductionException =
  pathMv + '/hotRolling/getProductionException'
//投料和产出
export const getFeedAndOutput = pathMv + '/hotRolling/getFeedAndOutput'
//轧制平均尺寸
export const getRollingAvgSize = pathMv + '/hotRolling/getRollingAvgSize'
//产品成材率
export const getYieldRate = pathMv + '/hotRolling/getYieldRate'
//生产订单跟踪
export const getCompletionRate = pathMv + '/hotRolling/getCompletionRate'
//每日计划兑现率
export const getPlanCompletionRate =
  pathMv + '/hotRolling/getPlanCompletionRate'

/* ----------------------------------------精轧工作辊换辊------------------------------------------------*/
//换辊次数
export const getRollChangeCount = pathMv + '/hotRolling/getRollChangeCount'
//轧制吨位
export const getRollingTonnage = pathMv + '/hotRolling/getRollingTonnage'
//轧制里程
export const getRollingLength = pathMv + '/hotRolling/getRollingLength'
//换辊周期
export const getRollChangeCycleTime =
  pathMv + '/hotRolling/getRollChangeCycleTime'

/* ----------------------------------------库存占用------------------------------------------------*/
//原料板坯库存占用
export const getRawMaterialStock = pathMv + '/hotRolling/getRawMaterialStock'
//黑皮成品库存占用
export const getFinishedProductStock =
  pathMv + '/hotRolling/getFinishedProductStock'

/* ----------------------------------------质量降级------------------------------------------------*/
//产品降级与一次合格率(月 and 日)
export const getFirstPassYield = pathMv + '/hotRolling/getFirstPassYield'
//产品缺陷降级卷数
export const getProductDowngradeCount =
  pathMv + '/hotRolling/getProductDowngradeCount'
//产品缺陷降级代码分布
export const getProductDowngradeCode =
  pathMv + '/hotRolling/getProductDowngradeCode'
//热轧质量降级炼钢追溯
export const getDowngradeSteelTrace =
  pathMv + '/hotRolling/getDowngradeSteelTrace'

/* ----------------------------------------生产节奏------------------------------------------------*/
//加热炉出钢时间间隔(箱体图)
export const getFurnaceDischargeIntervalBox =
  pathMv + '/hotRolling/getFurnaceDischargeIntervalBox'
//加热炉出钢时间间隔（曲线图）
export const getFurnaceDischargeInterval =
  pathMv + '/hotRolling/getFurnaceDischargeInterval'
//精轧轧制间隔
export const getFinishingRollingInterval =
  pathMv + '/hotRolling/getFinishingRollingInterval'
//工序节奏时间
export const getProcessRhythmTime = pathMv + '/hotRolling/getProcessRhythmTime'
