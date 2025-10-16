// 导入所有模块路由
const equipRoutes = require('./modules/equip')
// const userRoutes = require('./modules/user')
// const systemRoutes = require('./modules/system')

// 可以在这里添加全局路由配置
/*const globalRoutes = resolve => [
  {
    path: '/sub-app/dashboard',
    component: resolve(__dirname, '../pages/dashboard.vue')
  }
  // 全局通用路由...
]*/

// 合并所有路由
module.exports = function(resolve) {
  return [
    // ...globalRoutes(resolve),
    ...equipRoutes(resolve)
    // ...userRoutes(resolve),
    // ...systemRoutes(resolve)
    // 新增模块只需在这里添加
  ]
}
