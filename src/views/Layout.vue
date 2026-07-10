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

// 点击菜单项 → ⭐ 用户要求：点黄框里的菜单项（首页/资产/图片/视频…）后，
//   侧边栏不要自动变成“只有图标的窄折叠列”（截图里那条纵向图标列）。
//   只在用户手动点击 Sidebar 顶部/底部的「折叠按钮」时（走 @toggle-collapsed → onToggleCollapsed），
//   才允许切换 collapsed 态。菜单项点击本身只负责跳转，不修改折叠状态。
const onMenuItemClicked = () => {
  /* no-op：不再自动 collapsed=true */
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
  /* ⭐ 用 flex 自动填剩余空间（列容器内 Header 下方的全部高度）
     flex:1 + min-height:0 + height:0 是 flex 列里「占剩余 + 内部 overflow:auto 不撑破容器」的经典组合
     替代之前错误的 height:calc(100% - 24px) — 那个会和 Header 高度叠加超出 100dvh，
     底部 36px+ 被 main-shell overflow:hidden 裁掉，窄屏单列就表现为「不能滚到底/完全不能滚」*/
  flex: 1 1 auto;
  min-height: 0;
  height: 0;
  /* ⭐ 默认：首页/资产/音乐/画布/工具/设置/客服 等页面正常允许上下滚动 */
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 9px;
  /* ⭐ 宽屏左右不对称：左多右少（因为左列有 subTools 气泡靠侧边，右边给预览区留呼吸）；
     但窄屏（单列堆叠）要左右对称，通过下面 MQ 覆盖成相等 */
  padding-left: var(--layout-left-pad, 36px);
  padding-right: calc(var(--layout-left-pad, 36px) * 0.5);
  box-sizing: border-box;
  background: var(--bg-base, #121212);
  transition: background-color var(--theme-dur) var(--theme-ease);
}

/* --- 中屏(1000–1280)：减少顶部留白与左右 padding，让内容占据更多可用空间 --- */
@media (max-width: 1279.98px) {
  /* 高度交给 flex，不再硬算；只调整 padding */
  .content-scroll { padding-top: 6px; }
}
/* --- 平板/窄屏(≤1000)：单列堆叠 → 左右 padding 必须对称相等！
     之前 padding-right:0 造成视觉「左边贴边右边空一大条」；
     同时取消页面级 margin-left 负补偿（见 Image/Video/Tool MQ）*/
@media (max-width: 999.98px) {
  .content-scroll {
    padding-top: 4px;
    padding-left: var(--layout-left-pad, 16px);
    padding-right: var(--layout-left-pad, 16px);
  }
}
/* --- 移动端(≤768) → 进一步对称收紧 12px 两边 --- */
@media (max-width: 767.98px) {
  .content-scroll {
    padding-top: 2px;
    padding-left: var(--layout-left-pad, 12px);
    padding-right: var(--layout-left-pad, 12px);
  }
}
/* ⭐ 仅 /image、/video 页面锁定外层滚动（防止整页滚动）——
     这两个页面内部已经用 .col-left__scroll 做局部滚动，整页不能滚。
   ⚠️ 窄屏（≤999.98px）两列已经改成「单列堆叠」：左参数面板 + 右预览上下排列，
     高度远超过 100vh。此时不能锁外层 overflow:hidden，
     必须由 content-scroll 外层整体承接纵向滚动，否则内容会被截掉不能上下滑。
   所以把「--locked」限定在宽屏（≥1000px）才生效。*/
@media (min-width: 1000px) {
  .content-scroll.content-scroll--locked {
    overflow: hidden;
  }
}
@media (max-width: 999.98px) {
  /* 单列堆叠：图片/视频/工具三页窄屏强制允许外层整体滚动 */
  .content-scroll.content-scroll--locked {
    overflow-y: auto !important;
    overflow-x: hidden;
  }
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
