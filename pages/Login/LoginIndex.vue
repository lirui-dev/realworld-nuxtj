<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign {{ isLogin ? "in" : "up" }}</h1>
          <p class="text-xs-center">
            <NuxtLink v-if="isLogin" to="/register">Need an account?</NuxtLink>
            <NuxtLink v-else to="/login">Have an account?</NuxtLink>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <template v-if="Array.isArray(messages)">
                <li v-for="(message, index) in messages" :key="index">
                  {{ field }} {{ message }}
                </li>
              </template>
              <template v-else>
                <li :key="messages">{{ field }} {{ messages }}</li>
              </template>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign {{ isLogin ? "in" : "up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookies = process.client
  ? /*只在客户端执行*/ require("js-cookie")
  : undefined;

export default {
  name: "loginIndex",
  // 中间件：路由匹配组件渲染前执行
  middleware: "notAuthenticated",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = this.isLogin
          ? await this.$api.user.login({
              user: this.user,
            })
          : await this.$api.user.register({
              user: this.user,
            });
        // console.log(data);

        // 保存用户的登陆状态
        this.$store.commit("setUser", data.user);

        // 数据持久化
        console.log(data.user);
        Cookies.set("user", JSON.stringify(data.user));

        // 跳转到首页
        this.$router.push("/");
      } catch (error) {
        // console.dir('try-catch error',error);
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>