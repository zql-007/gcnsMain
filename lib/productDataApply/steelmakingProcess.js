import { path, pathMes, pathMo, pathMv } from '@/lib/system'

//测试接口
// export const getGroupProd = path + '/coldRolling/getGroupProd'
//图标资源获取
export const getResource = pathMv + '/common/getResource'
// 添加用户访问记录
export const saveByAppInfos = pathMv + '/common/saveByAppInfo'
/* ----------------------------------------炼钢工序------------------------------------------------*/
//板坯、方坯产量
export const getLgccOutPut = pathMv + '/steelmaking/getLgccOutPut'
//库存统计
export const getLgrkInto = pathMv + '/steelmaking/getLgrkInto'
//生产节奏
export const getLgProdRhythm = pathMv + '/steelmaking/getLgProdRhythm'
//时机产量
export const getLgProdByHourTime = pathMv + '/steelmaking/getLgProdHoursByDay'
//吨钢消耗
export const getLgAvgEnergy = pathMv + '/steelmaking/getLgAvgEnergy'
//-------------------精炼工序----------------
//LF精炼产量
export const getLgJingProdByTime = pathMv + '/steelmaking/getLgJingProdByTime'
//LF终点温度
export const getLgLFTempByTime = pathMv + '/steelmaking/getLgLFTempByTime'
//-------------------AOD工序----------------
//AOD钢水产量
export const getLgAodProdByTime = pathMv + '/steelmaking/getLgAodProdByTime'
//AOD母液铁水单耗
export const getLgAodHotByTime = pathMv + '/steelmaking/getLgAodHotByTime'
//AOD冶炼时长
export const getLgAodBoxByTime = pathMv + '/steelmaking/getLgAodBoxByTime'
//AOD时间分布
export const getAodTimeByTime = pathMv + '/steelmaking/getAodTimeByTime'
//AOD洗包统计
//(时长）
export const getAodXbTimeByTime = pathMv + '/steelmaking/getAodXbTimeByTime'
//(次数）
export const getAodXbStovesByTime = pathMv + '/steelmaking/getAodXbStovesByTime'
//AOD机时产量
export const getTargetByTime = pathMv + '/steelmaking/getTargetByTime'
//AOD炉次生产节奏
export const getAodRhythmByTime = pathMv + '/steelmaking/getAodRhythmByTime'
//-------------------连铸工序----------------
//连铸时间分布(作业率)
export const getLgCcSmeltByTime = pathMv + '/steelmaking/getLgCcSmeltByTime'
//连铸钢包自开率
export const getLgCcOpenByTime = pathMv + '/steelmaking/getLgCcOpenByTime'
//300系化学成分内控合格率
export const getLgccChemByTime = pathMv + '/steelmaking/getLgccChemByTime'
//钢坯一级品率
export const getLgccOneByTime = pathMv + '/steelmaking/getLgccOneByTime'
//钢坯改判信息统计
export const getLgCcJudgeByTime = pathMv + '/steelmaking/getLgCcJudgeByTime'
//钢坯改判信息流向图
export const getLgCcJudgeByTypeAndTime =
  pathMv + '/steelmaking/getLgCcJudgeByTypeAndTime'
//-------------------统计分析----------------
//AOD出钢成分(总-散点图)
export const getLgOutSteelData = pathMv + '/steelmaking/getLgOutSteelData'
//AOD出钢成分(数据统计)
export const getLgOutSteelStatistic =
  pathMv + '/steelmaking/getLgOutSteelStatistic'
//AOD出钢成分(新-分析评价结果)
export const getLgOutSteelCpk = pathMv + '/steelmaking/getLgOutSteelCpk'
//AOD出钢成分(重新计算cpk)
export const getlgOutSteelNewCpk = pathMv + '/steelmaking/getlgOutSteelNewCpk'
//AOD出钢成分(分析评价结果)
export const getLgOutSteelAnalyResult =
  pathMv + '/steelmaking/getLgOutSteelAnalyResult'
//AOD出钢成分(总)
export const getLgOutSteelTotal = pathMv + '/steelmaking/getLgOutSteelTotal'
