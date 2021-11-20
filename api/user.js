export default function ({ $axios, $api, }) {
  // 用户登录
  const login = (data) => {
    return $axios({
      method: "POST",
      url: "/users/login",
      data,
    })
  }

  // 用户注册
  const register = (data) => {
    return $axios({
      method: "POST",
      url: "/users",
      data,
    })
  }

  $api.user = {
    login,
    register,
  }
}