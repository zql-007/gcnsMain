const path = 'kpi/'
// 获取所有一级指标
export const findFirstRank = path + 'kpi/findFirstRank'
export const findNextRank = path + 'kpi/findNextRank'
export const findKpiTree = path + 'kpi/findKpiTree'
export const kpiSave = path + 'kpi/save'
export const findBySpecification = path + 'kpi/findBySpecification'
export const kpiDelete = path + 'kpi/delete'

export const findKpiDataTree = path + 'kpiData/findKpiDataTree'
export const syncKpiToKpiData = path + 'kpiData/syncKpiToKpiData'

export const findDefKpiByUserNo = path + 'userDefKpi/findByUserNo'
export const saveDefKpiByUserNo = path + 'userDefKpi/save'

// 指标关系
export const findKpiDiagram = path + 'kpiRelation/findKpiDiagram'
export const saveDiagram = path + 'kpiRelation/save'
export const deleteDiagram = path + 'kpiRelation/delete'
export const findKpiIndexTree = path + 'KpiIndex/findKpiIndexTree'
export const saveKpiIndex = path + 'KpiIndex/save'
export const deleteKpiIndex = path + 'KpiIndex/delete'

// 根据规则id删除一个KPI指标预警规则
export const deleteKpiWarningRules = path + '/kpiWarningRules/delete'
// 根据kpi id查询所有预警规则
export const findRulesByKid = path + '/kpiWarningRules/findRulesByKid'
// 根据目标管理角色id查询所有预警规则
export const findRulesByManagerId =
  path + '/kpiWarningRules/findRulesByManagerId'
// 添加/修改KPI指标预警规则
export const updateKpiWarningRules = path + '/kpiWarningRules/update'
