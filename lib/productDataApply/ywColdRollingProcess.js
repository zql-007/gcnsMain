import { path, pathMes, pathMo, pathMv } from '@/lib/system'

//钢卷产量
export const getLzCoilProduction = pathMv + '/ywColdRolling/getLzCoilProduction'
//停机时长与作业率
export const getLzOperationRate = pathMv + '/ywColdRolling/getLzOperationRate'
//机时产量
export const getLzMachineOutput = pathMv + '/ywColdRolling/getLzMachineOutput'
//平均厚度与产量
export const getLzAvgThicknessAndYield =
  pathMv + '/ywColdRolling/getLzAvgThicknessAndYield'
//卸卷节奏
export const getLzUnloadingRhythm =
  pathMv + '/ywColdRolling/getLzUnloadingRhythm'
//卷取时长与钢种规格转换次数分析
export const getCoilingTimeAndSteelGrade =
  pathMv + '/ywColdRolling/getCoilingTimeAndSteelGrade'
//产品成材率
export const getProductYieldRate = pathMv + '/ywColdRolling/getProductYieldRate'
//原料库存占用
export const getRawMaterialInventoryOccupancy =
  pathMv + '/ywColdRolling/getRawMaterialInventoryOccupancy'
//成品在库时长
export const getFinishedProductStorageTime =
  pathMv + '/ywColdRolling/getFinishedProductStorageTime'
//产品降级重量与合格率
export const getLzDowngradeWeightAndPassRate =
  pathMv + '/ywColdRolling/getLzDowngradeWeightAndPassRate'
//产品降级主缺陷工序分布
export const getDegradedMainDefectProcessDistribution =
  pathMv + '/ywColdRolling/getDegradedMainDefectProcessDistribution'
