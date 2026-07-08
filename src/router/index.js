import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import Login from '../views/Login.vue'
import HomeContent from '../views/HomeContent.vue'
import Assets from '../views/Assets.vue'
import Image from '../views/Image.vue'
import Video from '../views/Video.vue'
import Music from '../views/Music.vue'
import Canvas from '../views/Canvas.vue'
import Tool from '../views/Tool.vue'
import Service from '../views/Service.vue'
import Settings from '../views/Settings.vue'

const routes = [
  // 登录：独立全屏布局（不含侧边栏）
  { path: '/login', name: 'Login', component: Login },

  // 主应用：Layout 外壳常驻，子路由只替换右侧内容区（单页面局部切换）
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      // 首页内容（Banner + 功能卡 + 提示词广场）
      { path: 'home',     name: 'Home',     component: HomeContent },
      // 其他空页面占位
      { path: 'assets',   name: 'Assets',   component: Assets },
      { path: 'image',    name: 'Image',    component: Image },
      { path: 'video',    name: 'Video',    component: Video },
      { path: 'music',    name: 'Music',    component: Music },
      { path: 'canvas',   name: 'Canvas',   component: Canvas },
      { path: 'tool',     name: 'Tool',     component: Tool },
      { path: 'service',  name: 'Service',  component: Service },
      { path: 'settings', name: 'Settings', component: Settings }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
