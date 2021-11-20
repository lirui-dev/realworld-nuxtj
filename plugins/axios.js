export default function ({ $axios, store }, inject) {
  // const host = 'https://api.realworld.io'
  const host = 'https://conduit.productionready.io'
  // const host = 'http://realworld.api.fed.lagounews.com'
  $axios.setBaseURL(host + '/api')

  $axios.onRequest(config => {
    // 全局 Token header 设置
    if (store.state.user?.token) {
      config.headers['Authorization'] = `Token ${store.state.user.token}`
    }
  })

  inject('api', {})
}