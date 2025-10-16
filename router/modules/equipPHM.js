// 用户管理模块路由
module.exports = resolve => [
  {
    path: '/sub-app/UserManage/list',
    component: resolve(__dirname, '../../pages/UserManage/list.vue')
  },
  {
    path: '/sub-app/UserManage/detail',
    component: resolve(__dirname, '../../pages/UserManage/detail.vue')
  },
  {
    path: '/sub-app/UserManage/role',
    component: resolve(__dirname, '../../pages/UserManage/role.vue')
  }
  // 更多用户相关路由...
]
