/**
 * 验证是否已登录的中间件
 * @param {context} context 
 */
export default function ({ store, redirect }) {
  if (store.state.user) {
    return redirect('/')
  }
}