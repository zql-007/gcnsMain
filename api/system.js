const path = 'api/res/'

// 系统管理api-url
// 用户列表
export const userList = path + 'user/findAllUser'
// 用户删除
export const userDelete = path + 'user/doDeleteUser'
// 用户添加
export const userAdd = path + 'user/doCreateUser'
// 用户修改
export const userEdit = path + 'user/doUpdaterUser'
// 用户详情
export const userById = path + 'user/findOneUserByID'
// 用户关联角色
export const relateRole = path + 'user/relateRole'

// 角色列表
export const roleList = path + 'role/findAllRole'
// 角色删除
export const roleDelete = path + 'role/doChangeStatus'
// 角色添加
export const roleAdd = path + 'role/doCreateRole'
// 角色编辑
export const roleEdit = path + 'role/doUpdateRole'
// 角色列表无分页
export const roleListNoPage = path + 'role/findAllRoleNoPage'
// 角色详情
export const roleById = path + 'role/findOneRoleByID'
// 根据用户查询角色
export const roleByUser = path + 'role/findRoleByUserID'
// 根据用户查询角色
export const filterResourceSelected = path + 'resource/filterResourceSelected'
// 关联人员
export const relateUser = path + 'role/relateUser'
// 关联菜单
export const relateResource = path + 'role/relateResource'

// 资源列表
export const resourceList = path + 'resource/findAllResource'
// 批量更新资源
export const batchUpdateResource = path + 'resource/batchUpdateResource'
// 资源删除
export const resourceDelete = path + 'resource/doDeleteResource'
// 资源添加
export const resourceAdd = path + 'resource/doAddResource'
// 资源编辑
export const resourceEdit = path + 'resource/doUpdateResource'
// 资源列表无分页
export const resourceListNoPage =
  path + 'resource/findAllResourceNoPageWithIcon'
// 查询子级资源
export const resourceByParent = path + 'resource/findResourceByParentID'
// 关联角色
export const resourceRelateRole = path + 'resource/relateRole'

// 根据组织编号获取组织列表
export const orgListByCode = path + 'org/findListByOrgCode'

// 根据组织编号查询所有组织列表
export const allOrgListByCode = path + 'org/findAllOrgByOrgCode'

// 所有组织
export const allOrgList = path + 'org/findAll'

// 根据类型获取基础数据
export const findBasicDataConfigByType =
  'idm/basicDataConfig/findBasicDataConfigByType.form'

// icon列表
export const listImg = path + 'iconImg/listImg'

// 获取用户信息
export const findOneUserByUserNo = path + 'user/findOneUserByUserNo'

// 添加用户访问记录
export const pageLogSave = path + 'pageLog/save'
// 添加用户访问记录
export const pageLogSave10 = path + 'pageLogSecret/save'
// 建议分页列表
export const findFeedback = path + 'feedBack/findPageByMultiCondition'
// 建议添加
export const saveFeedback = path + 'feedBack/save'
// 建议删除
export const delFeedback = path + 'feedBack/delete'
// 上传附件
export const uploadFile = path + 'attach/uploadFile'
// 下载附件
export const downloadFileById = path + 'attach/downloadFileById/'
// 删除附件
export const deleteFileByIds = path + 'attach/delete'
//按字典编码查找字典详情列表
export const dictionaryDtlFindByDictCode =
  path + '/dictionaryDtl/findByDictCode'
