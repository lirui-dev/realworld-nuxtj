<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <NuxtLink class="navbar-brand" to="/">conduit</NuxtLink>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <NuxtLink class="nav-link" to="/">Home</NuxtLink>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/editor">
                <i class="ion-compose"></i>&nbsp;New Article
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/profile/123">
                <img v-if="user.image" class="user-pic" src="user.image" />
                {{ user.username }}
              </NuxtLink>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/login">Sign in</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/register">Sign up</NuxtLink>
            </li>
          </template>
        </ul>
      </div>
    </nav>

    <!-- 子路由 -->
    <NuxtChild />

    <!-- 底部 -->
    <footer>
      <div class="container">
        <NuxtLink class="logo-font" to="/">conduit</NuxtLink>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LayoutIndex",
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
</style>