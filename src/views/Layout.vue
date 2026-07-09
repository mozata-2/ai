<template>
  <div
    class="app-shell"
    :class="[isNarrow ? 'mode-drawer' : 'mode-persistent']"
  >
    <Sidebar
      :is-narrow="isNarrow"
      :collapsed="collapsed"
      :open="drawerOpen"
      @close="drawerOpen = false"
      @toggle-collapsed="onToggleCollapsed"
      @menu-item-clicked="onMenuItemClicked"
    />

    <div
      v-if="isNarrow && drawerOpen"
      class="drawer-mask"
      @click="drawerOpen = false"
    ></div>

    <div class="main-shell">
      <HeaderBar
        :is-narrow="isNarrow"
        :sidebar-open="drawerOpen"
        @toggle-sidebar="onToggleSidebar"
      />
      <main class="content-scroll" :class="{ 'content-scroll--locked': isScrollLocked }">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import HeaderBar from '../components/HeaderBar.vue'

const route = useRoute()

const NARROW_BREAKPOINT = 1200
const isNarrow = ref(window.innerWidth <= NARROW_BREAKPOINT)
const drawerOpen = ref(false)
const collapsed = ref(false)

/* ⭐ 按路由动态切换.content-scroll的滚动行为：
     - /image、/video 页面：必须锁定外层 overflow:hidden，
       防止整页滚动（它们内部用 .col-left__scroll 做局部滚动）
     - 其他页面（首页、资产、音乐、画布、工具、设置、客服等）：
       恢复 overflow-y:auto，让页面正常上下滚动 */
const LOCKED_PATHS = ['/image', '/video', '/tool']
const isScrollLocked = computed(() =>
  LOCKED_PATHS.some(p => route.path && route.path.startsWith(p))
)

const onToggleSidebar = () => {
  if (isNarrow.value) drawerOpen.value = !drawerOpen.value
}

// 手动点击三横线按钮切换折叠态（宽屏）
const onToggleCollapsed = () => {
  collapsed.value = !collapsed.value
}

// 点击菜单项 → 宽屏下自动折叠成图标列（符合项目规则）
const onMenuItemClicked = () => {
  if (!isNarrow.value) collapsed.value = true
}

const updateNarrow = () => {
  isNarrow.value = window.innerWidth <= NARROW_BREAKPOINT
  if (!isNarrow.value) drawerOpen.value = false
  else drawerOpen.value = false
}

let resizeTicker = null
const onResize = () => {
  if (resizeTicker) cancelAnimationFrame(resizeTicker)
  resizeTicker = requestAnimationFrame(updateNarrow)
}

onMounted(() => {
  window.addEventListener('resize', onResize, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  if (resizeTicker) cancelAnimationFrame(resizeTicker)
})
</script>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100dvh;
  max-height: 100dvh;
  min-height: 0;
  background: var(--bg-base, #121212);
  position: relative;
  overflow: hidden;
  transition: background-color var(--theme-dur) var(--theme-ease);
}

.main-shell {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100dvh;
  max-height: 100dvh;
  overflow: hidden;
}

.content-scroll {
  height: calc(100% - 24px);
  /* ⭐ 默认：首页/资产/音乐/画布/工具/设置/客服 等页面正常允许上下滚动 */
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 9px;
  padding-left: 36px;
  box-sizing: border-box;
  background: var(--bg-base, #121212);
  transition: background-color var(--theme-dur) var(--theme-ease);
}
/* ⭐ 仅 /image、/video 页面锁定外层滚动（防止整页滚动）——
     这两个页面内部已经用 .col-left__scroll 做局部滚动，整页不能滚。*/
.content-scroll.content-scroll--locked {
  overflow: hidden;
}
/* 隐藏 content-scroll 的滚动条（保留滚动能力但不可见） */
.content-scroll::-webkit-scrollbar { display: none; width: 0; height: 0; }
.content-scroll { scrollbar-width: none; }

.drawer-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 199;
  backdrop-filter: blur(2px);
  animation: fadeInMask 220ms ease both;
}
@keyframes fadeInMask {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>
