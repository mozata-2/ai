<template>
  <aside
    class="sidebar"
    :class="[
      isNarrow ? 'is-drawer' : 'is-persistent',
      {
        'drawer-open': isNarrow && open,
        'is-collapsed': !isNarrow && collapsed
      }
    ]"
  >
    <!-- ============= 宽屏形态（>1200px）：Logo + 功能菜单 + 菜单 + 底部两个 ============= -->
    <template v-if="!isNarrow">
      <div class="logo-section">
        <div class="logo">
          <img class="logo-icon" :src="logoImg" alt="朋探Logo" width="48" height="48" />
          <span class="logo-text">朋探</span>
        </div>
      </div>

      <div
        class="menu-toggle"
        title="折叠/展开侧边栏"
        role="button"
        @click="onToggleCollapsed"
      >
        <span class="menu-toggle-label">功能菜单</span>
        <svg class="menu-toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6"  x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>

      <nav class="nav-menu">
        <div
          v-for="item in menuItems"
          :key="item.name"
          :ref="(el) => setItemRef(item.name, el)"
          class="menu-item-wrap"
          @mouseenter="onItemEnter(item)"
          @mouseleave="onItemLeave(item)"
        >
          <div
            class="menu-item"
            :class="{ active: isActive(item.path) }"
            @click="goMenu(item)"
          >
            <img class="menu-icon" :src="item.icon" :alt="item.name" />
            <span class="menu-text">{{ collapsed && item.shortName ? item.shortName : item.name }}</span>
          </div>
        </div>
      </nav>

      <div class="bottom-menu">
        <div
          class="menu-item"
          :class="{ active: isActive('/service') }"
          @click="goPath('/service')"
        >
          <div class="menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <span class="menu-text">{{ collapsed ? '客服' : '联系客服' }}</span>
        </div>
        <div
          class="menu-item"
          :class="{ active: isActive('/settings') }"
          @click="goPath('/settings')"
        >
          <div class="menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </div>
          <span class="menu-text">更多</span>
        </div>
      </div>
    </template>

    <!-- ============= 窄屏形态（≤1200px）：抽屉 ============= -->
    <template v-else>
      <div class="drawer-inner">
        <div class="drawer-header">
          <span class="drawer-title">功能菜单</span>
          <button class="drawer-close" title="关闭" @click="onClose">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6"  x2="6"  y2="18"></line>
              <line x1="6"  y1="6"  x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav class="drawer-nav">
          <div
            v-for="item in menuItems"
            :key="item.name"
            class="drawer-menu-item"
            :class="{ active: isActive(item.path) }"
            @click="goMenu(item)"
          >
            <img class="drawer-menu-icon" :src="item.icon" :alt="item.name" />
            <div class="drawer-menu-body">
              <div class="drawer-menu-title">{{ item.name }}</div>
              <div v-if="item.desc" class="drawer-menu-desc">{{ item.desc }}</div>
            </div>
            <svg
              v-if="item.expandable"
              class="drawer-menu-caret"
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </nav>

        <div class="service-card">
          <div class="service-title">联系客服</div>
          <div class="service-sub">遇到问题？随时联系我们</div>
          <button class="service-btn">立即咨询</button>
        </div>

        <div class="icp-text">蜀ICP备19036796号-2</div>
      </div>
    </template>

    <!-- ⭐ 气泡面板：Teleport 挂到 body → 不被 sidebar overflow 裁掉；只在有 subTools 时显示；
         basePath 从当前 hover 菜单项取（/image、/video 等），用于激活态判定 + 默认回退键；
         offsetX：折叠态 (.is-collapsed) 菜单项为 52px 居中放在 80px wrap 内 → 气泡需左移 14px，
           让菱形指示物的尖角真正贴紧菜单项图标右侧，避免在浅色背景上悬浮空飘 -->
    <!-- ⭐ :key = path + '-subtools'：切换菜单项（图片↔视频）强制销毁重建组件，杜绝位置/大小复用残留 -->
    <SubToolsPopup
      :visible="subtoolsVisible && hasSubTools(hoveredItem)"
      :key="(hoveredItem?.path || 'subtools') + '-subtools'"
      :title="hoveredItem?.name || ''"
      :tools="hoveredItem?.subTools || []"
      :anchor-el="popupAnchorEl"
      :base-path="hoveredItem?.path || '/image'"
      :offset-x="collapsed ? -14 : 0"
      @tool-click="onSubToolClick"
      @popup-enter="clearHideTimer"
      @popup-leave="startHideTimer"
    />
    <!-- ⭐ 敬请期待气泡：只在 hover 音乐菜单时显示；大小固定 260×82，内容敬请期待；复用同一定位/菱形/hover 延迟逻辑 -->
    <!-- ⭐ :key = path + '-soon'：切换菜单项（音乐↔其他）强制销毁重建组件，杜绝重叠 -->
    <ComingSoonPopup
      :visible="soonVisible && !!hoveredItem && hoveredItem.path === '/music'"
      :key="(hoveredItem?.path || 'soon') + '-soon'"
      :anchor-el="popupAnchorEl"
      :offset-x="collapsed ? -14 : 0"
      @popup-enter="clearHideTimer"
      @popup-leave="startHideTimer"
    />
  </aside>
</template>

<script setup>
import { ref, toRef, onBeforeUnmount, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SubToolsPopup from './SubToolsPopup.vue'
import ComingSoonPopup from './ComingSoonPopup.vue'  /* ⭐ 敬请期待气泡（音乐/画布等用） */
import logoImg from '../img/logo.png'
import iconHome from '../img/home.png'
import iconAsset from '../img/attachment.png'
import iconImage from '../img/image.png'
import iconVideo from '../img/video.png'
import iconMusic from '../img/music.png'
import iconCanvas from '../img/canvas.png'
import iconTool from '../img/tool.png'

const props = defineProps({
  isNarrow:  { type: Boolean, default: false },
  collapsed: { type: Boolean, default: false },
  open:      { type: Boolean, default: false }
})
const isNarrowRef = toRef(props, 'isNarrow')

const emit = defineEmits(['close', 'toggle-collapsed', 'menu-item-clicked'])
const onClose = () => emit('close')
const onToggleCollapsed = () => emit('toggle-collapsed')

const router = useRouter()
const route  = useRoute()

const menuItems = ref([
  { name: '首页',     shortName: '首页', path: '/home',    icon: iconHome,  desc: '',             expandable: false, subTools: [] },
  { name: '资产管理', shortName: '资产', path: '/assets',  icon: iconAsset, desc: '',             expandable: false, subTools: [] },
  { name: '图片',     shortName: '图片', path: '/image',   icon: iconImage, desc: '图片生成与编辑', expandable: true,
    /* ⭐ 与 HeaderBar 的 IMAGE_TOOLS 完全一致：
          1) key = gk / qwen / banana / g2 / jimeng
          2) 顺序 = GK图片 → Qwen图片 → 香蕉作图(HOT) → G2图片 → 即梦图片
          3) 统一走 /image?tool=<key>，不再用 /image/xxx 旧子路径 */
    subTools: [
      { key: 'gk',       name: 'GK图片',   hot: false, shape: 'gk',     routeKey: 'gk' },
      { key: 'qwen',     name: 'Qwen图片', hot: false, shape: 'qwen',   routeKey: 'qwen' },
      { key: 'banana',   name: '香蕉作图', hot: true,  shape: 'banana', routeKey: 'banana' },
      { key: 'g2',       name: 'G2图片',   hot: false, shape: 'g2',     routeKey: 'g2' },
      { key: 'jimeng',   name: '即梦图片', hot: false, shape: 'jimeng', routeKey: 'jimeng' }
    ] },
  { name: '视频',   shortName: '视频', path: '/video',   icon: iconVideo, desc: '视频生成与处理', expandable: true,
    /* ⭐ 与截图一致：顺序 3×3 网格排布 8 款视频子工具，统一走 /video?tool=<key> */
    subTools: [
      { key: 'gkv',       name: 'GK视频',   hot: false, shape: 'gkv',      routeKey: 'gkv' },
      { key: 'v31',       name: 'V31视频',  hot: false, shape: 'v31',      routeKey: 'v31' },
      { key: 'sr',        name: 'SR视频',    hot: false, shape: 'sr',       routeKey: 'sr' },
      { key: 'tongyi',    name: '通义万象',  hot: false, shape: 'tongyi',   routeKey: 'tongyi' },
      { key: 'jimeng15',  name: '即梦1.5',   hot: false, shape: 'jimeng15', routeKey: 'jimeng15' },
      { key: 'jimeng20',  name: '即梦2.0',   hot: false, shape: 'jimeng20', routeKey: 'jimeng20' },
      { key: 'xiaoma',    name: '快乐小马',  hot: false, shape: 'xiaoma',   routeKey: 'xiaoma' },
      { key: 'veo',       name: 'Veo-uimi',  hot: false, shape: 'veo',      routeKey: 'veo' }
    ] },
  { name: '音乐',   shortName: '音乐', path: '/music',   icon: iconMusic, desc: '敬请期待',      expandable: true,  subTools: [] },
  { name: '画布',   shortName: '画布', path: '/canvas',  icon: iconCanvas,desc: '画布市场',      expandable: false, subTools: [] },
  /* ⭐ 工具菜单 8 个子工具（严格按截图 3×3 栅格顺序排布：前 8 个占 1~8，第 9 格空） */
  { name: '工具',   shortName: '工具', path: '/tool',    icon: iconTool,  desc: '更多工具',      expandable: true,
    subTools: [
      /* 第 1 行 */
      { key: 'vreverse',  name: '视频反推', hot: false, shape: 'vreverse',   routeKey: 'vreverse' },
      { key: 'claw',      name: 'Claw龙虾', hot: false, shape: 'claw',       routeKey: 'claw' },
      { key: 'localedit', name: '局部编辑', hot: false, shape: 'localedit',  routeKey: 'localedit' },
      /* 第 2 行 */
      { key: 'copyimg',   name: '一键仿图', hot: false, shape: 'copyimg',    routeKey: 'copyimg' },
      { key: 'textfix',   name: '无损改字', hot: false, shape: 'textfix',    routeKey: 'textfix' },
      { key: 'giftbox',   name: '手持产品', hot: false, shape: 'giftbox',    routeKey: 'giftbox' },
      /* 第 3 行（第 9 格留空，正好匹配截图） */
      { key: 'truck',     name: '一键换装', hot: false, shape: 'truck',      routeKey: 'truck' },
      { key: 'play',      name: '一键成片', hot: false, shape: 'play',       routeKey: 'play' }
    ] }
])

const isActive = (path) => route.path === path

const goMenu = (item) => {
  // ⭐ 画布菜单：点击时新开浏览器标签页，打开独立画布营销页（不套 Layout 壳）
  if (item && item.path === '/canvas') {
    window.open('/#/canvas-landing', '_blank', 'noopener,noreferrer')
    emit('menu-item-clicked')
    if (isNarrowRef.value) onClose()
    return
  }
  const target = item && item.path ? item.path : '/'
  router.push(target).catch(() => {})
  emit('menu-item-clicked')
  if (isNarrowRef.value) onClose()
}
const goPath = (path) => {
  router.push(path).catch(() => {})
  emit('menu-item-clicked')
  if (isNarrowRef.value) onClose()
}

/* =========================================================
   ⭐ 气泡 hover 逻辑
   - 菜单项 mouseenter → 立即显示（记录 hoveredItem + 取对应 wrap DOM 做 anchor）
   - 菜单项 mouseleave → 启动 220ms 定时器后隐藏（用户从菜单项横向滑入气泡时有时间窗口）
   - 气泡 mouseenter → 取消隐藏定时器 → 气泡持续显示
   - 气泡 mouseleave → 启动定时器隐藏
   ========================================================= */
const HIDE_DELAY = 220
let _hideTimer = 0

const hoveredItem    = ref(null)   // 当前 hover 到的菜单项 item 对象
const popupAnchorEl  = ref(null)  // 气泡定位锚点 HTMLElement（.menu-item-wrap）
/* ⭐ 彻底修复菜单项切换气泡重叠：
     之前用同一个 popupVisible 控制两个不同类型的气泡（SubTools 类 / Soon 敬请期待类），
     当跨越不同类型切换（视频↔音乐↔图片）时，两个 Teleport 的 visible 条件会同时满足 → 同时渲染重叠。
     修复方案：用两个独立互斥的 ref，任何时刻只能有一个为 true；切换时先关两个，再开新的。 */
const subtoolsVisible = ref(false)   // 图片/视频子工具气泡（SubToolsPopup）是否显示
const soonVisible     = ref(false)   // 音乐敬请期待气泡（ComingSoonPopup）是否显示

// 收集每个菜单项 wrap 的 DOM ref（key = item.name）
const _itemRefs = new Map()
const setItemRef = (name, el) => {
  if (el) _itemRefs.set(name, el)
  else    _itemRefs.delete(name)
}

const hasSubTools = (item) => item && Array.isArray(item.subTools) && item.subTools.length > 0

const clearHideTimer = () => {
  if (_hideTimer) {
    clearTimeout(_hideTimer)
    _hideTimer = 0
  }
}
const startHideTimer = () => {
  clearHideTimer()
  _hideTimer = setTimeout(() => {
    subtoolsVisible.value = false
    soonVisible.value     = false
    hoveredItem.value     = null
    popupAnchorEl.value   = null
  }, HIDE_DELAY)
}

const onItemEnter = (item) => {
  clearHideTimer()
  if (props.isNarrow) return   // 窄屏抽屉态：不显示气泡

  // ⭐ 先关两个气泡的可见性（强制互斥：任何时刻只能有一个气泡存在）
  //    立刻触发两个组件 v-if=false → 从 body 销毁两个 Teleport，彻底杜绝重叠
  subtoolsVisible.value = false
  soonVisible.value     = false

  const needSubTools = hasSubTools(item)
  const needSoon     = item.path === '/music'
  if (!needSubTools && !needSoon) {
    startHideTimer()
    return
  }

  // ⭐ nextTick 后：先赋值 hover/anchor，然后只打开对应类型的那一个
  //    配合模板里的 :key，会强制销毁重建组件，彻底不会复用旧的位置/大小残留
  nextTick(() => {
    hoveredItem.value    = item
    popupAnchorEl.value  = _itemRefs.get(item.name) || null
    if (needSubTools) subtoolsVisible.value = true
    if (needSoon)     soonVisible.value     = true
  })
}
const onItemLeave = () => {
  if (props.isNarrow) return
  startHideTimer()
}

// 点击气泡里的子工具 → 与 HeaderBar 顶部 Tab 同步：跳转 <父菜单路径>?tool=<key>，隐藏气泡 + 折叠侧边栏
// 父菜单路径示例：图片 → /image?tool=xxx，视频 → /video?tool=xxx
const onSubToolClick = (tool) => {
  if (!tool) return
  clearHideTimer()
  // ⭐ 先记住父菜单项，再清空气泡状态（避免异步 push 时 hoveredItem 已被置空）
  const parentPath = (hoveredItem.value && hoveredItem.value.path) || '/image'
  subtoolsVisible.value = false
  soonVisible.value     = false
  hoveredItem.value     = null
  popupAnchorEl.value   = null
  // ⭐ 取 routeKey 或 key 作为 ?tool=xxx；按父菜单路径动态跳转（图片 / 视频 / 后续扩展）
  const k = tool.routeKey || tool.key
  if (k) {
    router.push({ path: parentPath, query: { tool: k } }).catch(() => {})
    emit('menu-item-clicked')
  }
}

onBeforeUnmount(() => clearHideTimer())
</script>

<style scoped>
/* ==================================================================
   通用 sidebar 外层
   ================================================================== */
.sidebar {
  /* ⭐ 亮/暗主题统一：用 --bg-base 替代硬编码 #121212 */
  background: var(--bg-base, #121212);
  border-right: none;
  display: flex;
  flex-direction: column;
  transition: background-color var(--theme-dur) var(--theme-ease);
}

/* ==================================================================
   宽屏形态
   ================================================================== */
.sidebar.is-persistent {
  width: 180px;
  min-width: 180px;
  height: 100vh;
  padding: 16px 0;
  position: sticky;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 50;
  transform: none;
  transition:
    background-color var(--theme-dur) var(--theme-ease),
    width 220ms cubic-bezier(0.22, 0.61, 0.36, 1),
    min-width 220ms cubic-bezier(0.22, 0.61, 0.36, 1),
    padding 220ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.logo-section {
  margin: -8px -10px 8px 12px;
  padding: 0 12px 8px 0;
  border-bottom: none;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.logo-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 12px;
  flex-shrink: 0;
  display: block;
}
.logo-text {
  font-size: 18px;
  font-weight: 700;
  /* ⭐ 亮/暗主题统一：主文字色 */
  color: var(--text-primary, #ffffff);
  transition: color var(--theme-dur) var(--theme-ease);
  margin-bottom: 1px;
}

.menu-toggle {
  box-sizing: border-box;
  width: 95%;
  height: 32px;
  min-height: 32px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  /* ⭐ 亮/暗主题统一：次级文字色 */
  color: var(--text-secondary, #aaaaaa);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color var(--interact-dur) var(--interact-ease),
    color var(--theme-dur) var(--theme-ease);
  margin: 4px 0 12px;
}
.menu-toggle:hover { color: var(--text-primary, #ffffff); }
.menu-toggle-label { margin-bottom: -4px; color: var(--text-primary, #ffffff); transition: color var(--theme-dur) var(--theme-ease); }
.menu-toggle-icon  { color: var(--text-primary, #ffffff); transition: color var(--theme-dur) var(--theme-ease); }

.nav-menu {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  overflow-y: auto;
  padding: 0;
  scrollbar-width: none;
  padding-right: 32px;
  margin-right: -32px;
  box-sizing: content-box;
  margin-top: 12px;
}
.nav-menu::-webkit-scrollbar { display: none; width: 0; height: 0; }

/* 菜单项外层 wrap：负责捕获 hover 事件 + 提供定位锚点（popup 挂 body 后根据它的 rect 算坐标） */
.menu-item-wrap {
  box-sizing: border-box;
  width: 180px;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-item {
  box-sizing: border-box;
  width: 180px;
  height: 52px;
  min-height: 52px;
  padding: 10px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition:
    background-color var(--interact-dur) var(--interact-ease),
    color var(--theme-dur) var(--theme-ease);
  /* ⭐ 亮/暗主题统一：次级文字色（暗→浅灰；亮→深灰） */
  color: var(--text-secondary, #A6ABB8);
  font-size: 16px;
  font-weight: 500;
}
.menu-item:hover { background: var(--hover-bg, rgba(255,255,255,0.06)); color: var(--text-primary, #ffffff); }
.menu-item.active { background: var(--bg-elevated, rgba(255,255,255,0.08)); color: var(--text-primary, #ffffff); }

.menu-icon {
  width: 32px;
  height: 32px;
  min-width: 32px;
  margin-bottom: -2px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}
.menu-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: -2px;
  margin-bottom: -2px;
}

.bottom-menu {
  margin-top: 12px;
  padding: 0;
  border-top: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  height: 80px;
  flex-shrink: 0;
}
.bottom-menu .menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  flex-shrink: 0;
  /* ⭐ 亮/暗主题统一：次级文字色 */
  color: var(--text-secondary, #A6ABB8);
  transition: color var(--theme-dur) var(--theme-ease);
}
.bottom-menu .menu-item:hover .menu-icon,
.bottom-menu .menu-item.active .menu-icon { color: var(--text-primary, #ffffff); }

/* ==================================================================
   窄屏形态：抽屉
   ================================================================== */
.sidebar.is-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  height: 100vh;
  min-height: 100vh;
  z-index: 200;
  padding: 0;
  transform: translateX(-100%);
  box-shadow: 6px 0 24px rgba(0, 0, 0, 0.45);
  overflow: hidden;
  transition:
    background-color var(--theme-dur) var(--theme-ease),
    transform 280ms cubic-bezier(0.22, 0.61, 0.36, 1),
    box-shadow 280ms ease;
}
.sidebar.is-drawer.drawer-open { transform: translateX(0); }

.drawer-inner {
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0 20px 20px;
  box-sizing: border-box;
  /* ⭐ 亮/暗主题统一：用 --bg-base 替代硬编码 #121212 */
  background: var(--bg-base, #121212);
  transition: background-color var(--theme-dur) var(--theme-ease);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 16px 0;
  margin-bottom: 8px;
}
.drawer-title {
  font-size: 18px;
  font-weight: 700;
  /* ⭐ 亮/暗主题统一：主文字色 */
  color: var(--text-primary, #ffffff);
  letter-spacing: .5px;
  transition: color var(--theme-dur) var(--theme-ease);
}
.drawer-close {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: transparent;
  /* ⭐ 亮/暗主题统一：主文字色 */
  color: var(--text-primary, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color var(--interact-dur) var(--interact-ease),
    transform 120ms ease,
    color var(--theme-dur) var(--theme-ease);
}
.drawer-close:hover { background: var(--hover-bg, rgba(255,255,255,0.08)); }
.drawer-close:active { transform: scale(0.9); }

.drawer-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
  scrollbar-width: none;
  padding-right: 40px;
  margin-right: -20px;
  box-sizing: content-box;
}
.drawer-nav::-webkit-scrollbar { display: none; width: 0; height: 0; }

.drawer-menu-item {
  box-sizing: border-box;
  width: 260px;
  min-height: 68px;
  padding: 14px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  /* ⭐ 亮/暗主题统一：次级文字色 */
  color: var(--text-secondary, #A6ABB8);
  transition:
    background-color var(--interact-dur) var(--interact-ease),
    color var(--theme-dur) var(--theme-ease);
}
.drawer-menu-item:hover  { background: var(--hover-bg, rgba(255,255,255,0.05)); color: var(--text-primary, #ffffff); }
.drawer-menu-item.active {
  /* ⭐ 亮/暗主题统一：激活态用粉色透明底（保持原有视觉倾向，但基础底色用主题 hover） */
  background: rgba(255, 77, 141, 0.18);
  color: var(--text-primary, #ffffff);
}

.drawer-menu-icon {
  width: 44px;
  height: 44px;
  min-width: 44px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
  border-radius: 12px;
}
.drawer-menu-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  justify-content: center;
}
.drawer-menu-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  color: inherit;
}
.drawer-menu-desc {
  margin-top: 2px;
  font-size: 12px;
  line-height: 1.4;
  /* ⭐ 亮/暗主题统一：次级/弱化文字色（style.css 中为 --text-extra-faint） */
  color: var(--text-extra-faint, rgba(255,255,255,0.45));
  transition: color var(--theme-dur) var(--theme-ease);
}
.drawer-menu-item:hover .drawer-menu-desc,
.drawer-menu-item.active .drawer-menu-desc { color: var(--text-secondary, rgba(255,255,255,0.65)); }

.drawer-menu-caret {
  flex-shrink: 0;
  /* ⭐ 亮/暗主题统一：弱化文字色 */
  color: var(--text-extra-faint, rgba(255,255,255,0.4));
  transition:
    color var(--theme-dur) var(--theme-ease),
    transform 160ms ease;
}
.drawer-menu-item:hover .drawer-menu-caret { color: var(--text-primary, #ffffff); }

.service-card {
  margin-top: 16px;
  margin-right: 20px;
  padding: 18px 18px 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ff4d8d 0%, #ff2f7a 60%, #ff66a3 100%);
  box-shadow:
    0 10px 24px rgba(255, 77, 141, 0.35),
    0 2px 6px rgba(0,0,0,0.2);
}
.service-title {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
}
.service-sub {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.4;
  color: rgba(255,255,255,0.88);
}
.service-btn {
  margin-top: 14px;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background: #ffffff;
  color: #ff2f7a;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(255, 47, 122, 0.25);
  transition:
    transform 120ms ease,
    box-shadow var(--interact-dur) var(--interact-ease);
}
.service-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 16px rgba(255, 47, 122, 0.35); }
.service-btn:active { transform: translateY(0) scale(0.98); }

.icp-text {
  margin: 14px 20px 6px 0;
  font-size: 11px;
  line-height: 1.5;
  color: rgba(255,255,255,0.32);
  text-align: center;
  letter-spacing: .5px;
}

/* ==================================================================
   宽屏折叠态（仅图标窄列 80px）
   ================================================================== */
.sidebar.is-persistent.is-collapsed {
  width: 80px;
  min-width: 80px;
  padding: 12px 0 20px;
  align-items: center;
  transition:
    width 220ms cubic-bezier(0.22, 0.61, 0.36, 1),
    min-width 220ms cubic-bezier(0.22, 0.61, 0.36, 1),
    padding 220ms cubic-bezier(0.22, 0.61, 0.36, 1),
    background-color var(--theme-dur) var(--theme-ease);
}

.sidebar.is-persistent.is-collapsed .logo-section {
  /* ⭐ 用户指出：折叠态 logo 会向下偏移。
     展开态：sidebar padding-top 16 + logo-section margin-top -8 = 距顶 8px；
     折叠态：sidebar padding-top 12 + 此处 margin-top -12 = 距顶 0？不对，
     实际应该是 (12 + (-4)) = 8，与展开态相等 → 用 -4 对齐；
     底部补 16px：展开态 8(margin-bottom) + 8(padding-bottom) = 16 → 保持一致 */
  margin: -4px 0 16px;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
.sidebar.is-persistent.is-collapsed .logo { gap: 0; justify-content: center; margin-bottom: 0; }
.sidebar.is-persistent.is-collapsed .logo-icon {
  /* ⭐ 用户指出：折叠态 logo 会缩小。改回与展开态一致的 48×48，不再缩小 */
  width: 48px; height: 48px; border-radius: 12px;
}
.sidebar.is-persistent.is-collapsed .logo-text { display: none !important; }

.sidebar.is-persistent.is-collapsed .menu-toggle {
  /* 与 logo 48×48 同视觉尺寸居中对齐 */
  width: 48px; min-width: 48px; height: 48px;
  padding: 0; justify-content: center; align-items: center;
  border-radius: 12px;
}
.sidebar.is-persistent.is-collapsed .menu-toggle-label { display: none !important; }
.sidebar.is-persistent.is-collapsed .menu-toggle-icon { width: 22px; height: 22px; stroke-width: 2.2; }

.sidebar.is-persistent.is-collapsed .nav-menu {
  width: 100%; align-items: center; gap: 8px;
}
/* 折叠态 wrap 宽度改 80（居中放 52 的图标块） */
.sidebar.is-persistent.is-collapsed .menu-item-wrap { width: 80px; }
.sidebar.is-persistent.is-collapsed .menu-item {
  flex-direction: column; justify-content: center; align-items: center;
  width: 52px; min-width: 52px; height: 52px; min-height: 52px;
  padding: 0 !important; border-radius: 14px; gap: 0 !important;
}
.sidebar.is-persistent.is-collapsed .menu-icon {
  width: 32px !important; height: 32px !important; min-width: 32px !important; margin: 0 !important;
}
.sidebar.is-persistent.is-collapsed .menu-text { display: none !important; }

.sidebar.is-persistent.is-collapsed .bottom-menu {
  width: 100%; align-items: center; gap: 8px;
  padding: 10px 0 0; margin-top: auto; height: auto;
}
.sidebar.is-persistent.is-collapsed .bottom-menu .menu-item {
  flex-direction: column; justify-content: center; align-items: center;
  width: 52px; min-width: 52px; height: 52px; min-height: 52px;
  padding: 0 !important; border-radius: 14px; gap: 0 !important;
}
.sidebar.is-persistent.is-collapsed .bottom-menu .menu-icon {
  width: 24px !important; height: 24px !important; margin: 0 !important;
}
</style>
