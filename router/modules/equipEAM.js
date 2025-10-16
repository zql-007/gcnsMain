// 系统设置模块路由
module.exports = resolve => [
  {
    path: '/sub-app/System/setting',
    component: resolve(__dirname, '../../pages/System/setting.vue')
  },
  {
    path: '/sub-app/System/log',
    component: resolve(__dirname, '../../pages/System/log.vue')
  }
  // 更多系统相关路由...
]
