import { registerMicroApps, start } from 'qiankun'

export default ({ app }, inject) => {
  // 仅在客户端初始化qiankun
  if (process.client) {
    // 注册子应用
    registerMicroApps([
      {
        name: 'sub-app', // 子应用名称（需唯一）
        entry: 'http://localhost:3003', // 子应用运行地址
        container: '#subapp-container', // 子应用挂载容器
        activeRule: '/example-son', // 激活路径（主应用路由匹配时加载）
        props: {
          // 传递给子应用的参数（如token、用户信息等）
          appName: 'main-app',
          // 告诉子应用不需要显示菜单和顶部tab标签
          showMenu: false
          // 确保传递必要的 SDK 或方法
          // sdk: {
          //   // 如果子应用需要 scrollToActiveTab 方法，在这里提供
          //   scrollToActiveTab: () => {
          //     console.log('scrollToActiveTab called from main app')
          //     // 实现具体的滚动逻辑
          //   }
          // }
          // 移除或覆盖该方法
          // scrollToActiveTab: undefined
        }
      }
    ])

    // 启动qiankun
    start({
      sandbox: {
        // strictStyleIsolation: true // 样式隔离
        // 改为实验性的样式隔离，避免 Shadow DOM 问题
        experimentalStyleIsolation: true
      },
      singular: true // 单实例模式
    })

    // 注入到Vue原型供全局使用
    inject('qiankun', { start })
  }
}
