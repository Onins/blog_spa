import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6460cbda = () => interopDefault(import('../pages/edit.vue' /* webpackChunkName: "pages/edit" */))
const _2d387bdf = () => interopDefault(import('../pages/news/index.vue' /* webpackChunkName: "pages/news/index" */))
const _c91cecae = () => interopDefault(import('../pages/post.vue' /* webpackChunkName: "pages/post" */))
const _03bc2bf2 = () => interopDefault(import('../pages/news/_id.vue' /* webpackChunkName: "pages/news/_id" */))
const _2ddb6219 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/edit",
    component: _6460cbda,
    name: "edit"
  }, {
    path: "/news",
    component: _2d387bdf,
    name: "news"
  }, {
    path: "/post",
    component: _c91cecae,
    name: "post"
  }, {
    path: "/news/:id",
    component: _03bc2bf2,
    name: "news-id"
  }, {
    path: "/",
    component: _2ddb6219,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
