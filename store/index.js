// cookie string => JS Object
const cookieparser = process.server ? /*只在服务器端执行*/require('cookieparser') : undefined

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
}

export const actions = {
  // 服务端渲染期间自动调用：一般用于服务器端传递数据给客户端 store 中
  nuxtServerInit({ commit, }, { req }) {
    let user = null
    if(req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {

      }
    }

    commit('setUser', user)
  }
}
