const pkg = require('./package')
// 引入合并后的路由配置
const getRoutes = require('./router/index')

module.exports = {
  /*ssr: true,
  static: true,
  cache: {
    max: 1000, // 最大缓存条目数
    maxAge: 900000 // 缓存过期时间，以毫秒为单位，这里是15分钟
  },*/
  // mode: 'spa',
  // mode: 'universal',
  ssr: false,
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/IMIP.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/icon/iconfont.css',
    '@/assets/css/baseStyle.less',
    '@/assets/css/pageIom04Style.less',
    '@/assets/css/theme/index.css',
    { src: '@/assets/css/common.less', lang: 'less' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/directive',
    '@/plugins/api',
    '@/plugins/i18n',
    '@/plugins/filters',
    { src: '~/plugins/persistedstate.js', ssr: false },
    { src: '@/plugins/interceptors', ssr: false },
    '@/plugins/request',
    { src: '@/plugins/route', ssr: false },
    { src: '@/plugins/qiankun.js', ssr: false } // 仅客户端加载
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  server: {
    port: 3004 || process.env.PORT,
    host: '0.0.0.0' || process.env.BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*', // 开发环境临时放宽（生产环境需指定主应用域名）
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true'
    }
  },
  /*
  ** Axios module configuration
  */
  env: {
    device: 'web'
  },
  axios: {
    baseURL: 'http://10.1.11.181:9730/', //nginx代理服务器地址
    timeout: 60000,
    retry: { retries: 3 },
    proxy: true
  },
  proxy: {
    '/iet_report_service': {
      target: 'http://10.1.11.181:9730/' //nginx代理服务器地址
    },
    '/mes': {
      target: 'http://10.200.29.194:9702/', //服务器地址(bobo）
      pathRewrite: { '^/mes/': '' }
    },
    '/mv': {
      target: 'http://10.200.29.37:9702/', //服务器地址(my）
      pathRewrite: { '^/mv/': '' }
    },
    '/mo': {
      target: 'http://10.200.28.86:9702/', //服务器地址(lcx)
      pathRewrite: { '^/mo/': '' }
    }
  },
  router: {
    // middleware: 'redirect'
    mode: 'history' // 与主应用保持一致的 history 模式
  },
  // router: {
  //   middleware: 'redirect'
  // },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          // 配置mp3音频格式loader，否则音频文件无法正常引用
          enforce: 'pre',
          test: /\.(mp3|pdf)(\?.*)?$/,
          loader: 'url-loader',
          exclude: /(node_modules)/
        })
      }
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  buildModules: ['@nuxt/postcss8']
}
