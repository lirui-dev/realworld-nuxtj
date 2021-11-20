import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8b203218 = () => interopDefault(import('../pages/Layout/LayoutIndex' /* webpackChunkName: "" */))
const _40fcb514 = () => interopDefault(import('../pages/Home/HomeIndex' /* webpackChunkName: "" */))
const _71b65c60 = () => interopDefault(import('../pages/Login/LoginIndex' /* webpackChunkName: "" */))
const _794400d8 = () => interopDefault(import('../pages/Settings/SettingsIndex' /* webpackChunkName: "" */))
const _4e66cde0 = () => interopDefault(import('../pages/Profile/ProfileIndex' /* webpackChunkName: "" */))
const _466bb9dc = () => interopDefault(import('../pages/Article/ArticleBrowser' /* webpackChunkName: "" */))
const _7a38ec39 = () => interopDefault(import('../pages/Article/ArticleEditor' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _8b203218,
    children: [{
      path: "",
      component: _40fcb514,
      name: "home"
    }, {
      path: "login",
      component: _71b65c60,
      name: "login"
    }, {
      path: "register",
      component: _71b65c60,
      name: "register"
    }, {
      path: "settings",
      component: _794400d8,
      name: "settings"
    }, {
      path: "profile/:username",
      component: _4e66cde0,
      name: "profile"
    }, {
      path: "article/:slug",
      component: _466bb9dc,
      name: "article"
    }, {
      path: "editor/:slug?",
      component: _7a38ec39,
      name: "editor"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
