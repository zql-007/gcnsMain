const redirectList = [
  {
    path: '/',
    redirect: '/productService/steelmakingProcess'
  }
]
export default function({ isHMR, app, store, route, params, error, redirect }) {
  if (isHMR) return //用来判断热更新
  // 页面均放在_lang文件夹下，即lang为动态路由参数;
  const matchRoute = redirectList.find(item => item.path === route.path)
  if (matchRoute) {
    return redirect({
      path: matchRoute.redirect
      // query: route.query
    })
  }
}
