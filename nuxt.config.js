export default {
  router: {
    // 样式
    linkExactActiveClass: 'active',

    // 自定义路由规则
    extendRoutes(routes, resolve) {
      // 清除路由表
      routes.splice(0)
      // 新增路由
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/Layout/LayoutIndex'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/Home/HomeIndex'),
            },
            {
              path: 'login',
              name: 'login',
              component: resolve(__dirname, 'pages/Login/LoginIndex'),
            },
            {
              path: 'register',
              name: 'register',
              component: resolve(__dirname, 'pages/Login/LoginIndex'),
            },
            {
              path: 'settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/Settings/SettingsIndex'),
            },
            {
              path: 'profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/Profile/ProfileIndex'),
            },
            {
              path: 'article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/Article/ArticleBrowser'),
            },
            {
              path: 'editor/:slug?',
              name: 'editor',
              component: resolve(__dirname, 'pages/Article/ArticleEditor'),
            },
          ]
        },
      ])
    },
  },

  server: {
    host: '0.0.0.0',
    // port: '',
  },

  modules: [
    '@nuxtjs/axios',
  ],

  plugins: [
    '~/plugins/axios',
    '~/plugins/dayjs',
    '~/api/user',
    '~/api/article',
    '~/api/tag',
  ],
}