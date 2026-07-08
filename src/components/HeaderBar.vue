<template>
  <header class="header-bar">
    <div class="header-left">
      <!-- 窄屏（≤1200px）：左上角显示四宫格抽屉切换按钮 -->
      <button
        v-if="isNarrow"
        class="icon-btn drawer-toggle"
        title="打开功能菜单"
        @click="onToggleSidebar"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3"  y="3"  width="8" height="8" rx="1.5"></rect>
          <rect x="13" y="3"  width="8" height="8" rx="1.5"></rect>
          <rect x="3"  y="13" width="8" height="8" rx="1.5"></rect>
          <rect x="13" y="13" width="8" height="8" rx="1.5"></rect>
        </svg>
      </button>

      <!-- 图片页面专属：5 个子工具 Tab（GK / Qwen / 香蕉 HOT / G2 / 即梦） -->
      <nav v-if="isImageRoute" class="img-tabs" aria-label="图片子工具">
        <router-link
          v-for="t in IMAGE_TOOLS"
          :key="t.key"
          :to="{ path: '/image', query: { tool: t.key } }"
          class="img-tab"
          :class="{ 'img-tab--active': activeTool === t.key }"
        >
          <svg class="img-tab__icon" :viewBox="t.iconView || '0 0 24 24'" width="16" height="16" aria-hidden="true">
            <component :is="'g'" v-html="t.iconSvg" />
          </svg>
          <span class="img-tab__name">{{ t.name }}<span v-if="t.hot" class="img-tab__hot">HOT</span></span>
          
        </router-link>
      </nav>

      <!-- 视频页面专属：8 个子工具 Tab -->
      <nav v-if="isVideoRoute" class="img-tabs" aria-label="视频子工具">
        <router-link
          v-for="t in VIDEO_TOOLS"
          :key="t.key"
          :to="{ path: '/video', query: { tool: t.key } }"
          class="img-tab"
          :class="{ 'img-tab--active': activeVideoTool === t.key }"
        >
          <svg class="img-tab__icon" :viewBox="t.iconView || '0 0 24 24'" width="16" height="16" aria-hidden="true">
            <component :is="'g'" v-html="t.iconSvg" />
          </svg>
          <span class="img-tab__name">{{ t.name }}
            
          </span>
          <span v-if="t.hot" class="img-tab__hot">hot</span>
        </router-link>
      </nav>
    </div>

    <div class="header-right">
      <!-- 主题切换按钮（太阳 / 月亮） -->
      <button
        class="icon-btn theme-toggle"
        :title="theme === 'dark' ? '切换为浅色主题' : '切换为深色主题'"
        @click="onToggleTheme"
      >
        <!-- ⭐ SVG stroke 统一用 currentColor，由 CSS color 控制：
              · 暗主题：按钮深色圆形底 → color:white → 图标白色（亮底/亮字融合深色底）
              · 亮主题：按钮浅色/白色圆形底 → color:#1f2937（深灰）→ 图标深灰（白底细字融合浅色背景，不再是"黑色按钮"突兀） -->
        <svg v-if="theme === 'light'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
        </svg>
      </button>

      <button class="login-btn" @click="goLogin">
        <span>登录</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { theme, toggleTheme } from '../theme.js'

const route  = useRoute()
const router = useRouter()

defineProps({
  isNarrow:     { type: Boolean, default: false },
  sidebarOpen:  { type: Boolean, default: false }
})
const emit = defineEmits(['toggle-sidebar'])

/* ⭐ theme.js 内部通过 watch(theme) 已经同步到 <html data-theme> + localStorage，
      这里只调用 toggleTheme() 即可，避免重复 setAttribute 造成闪烁 */
const onToggleTheme = () => {
  toggleTheme()
}
const onToggleSidebar = () => emit('toggle-sidebar')
const goLogin        = () => router.push('/login')

/* ====== 图片子工具：顺序/命名 与 Sidebar 中图片 subTools 完全一致 ====== */
const IMAGE_TOOLS = [
  {
    key: 'gk',  name: 'GK图片',
    iconView: '0 0 24 24',
    iconSvg: `
      <path d="M2 17 L2 7 L12 7" stroke="#E5EAF3" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 17 L7 17" stroke="#E5EAF3" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 7 L22 17 L12 17" stroke="#E5EAF3" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 7 L17 7" stroke="#E5EAF3" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    `
  },
  {
    key: 'qwen', name: 'Qwen图片',
    iconView: '0 0 24 24',
    iconSvg: `
      <polygon points="12,2 21,7.5 21,16.5 12,22 3,16.5 3,7.5" fill="#A98AFF" opacity="0.92"/>
      <polygon points="12,7 16.5,9.75 16.5,14.25 12,17 7.5,14.25 7.5,9.75" fill="none" stroke="#FFFFFF" stroke-width="1.3" opacity="0.85"/>
      <polygon points="12,9.5 14,12 12,14.5 10,12" fill="#FFFFFF"/>
    `
  },
  {
    key: 'banana', name: '香蕉作图', hot: true,
    iconView: '0 0 24 24',
    iconSvg: `
      <path d="M4 9.5 C 4.6 6, 7.5 4.5, 10.5 5.5 C 13.5 6.5, 15.5 9, 16 12 L 15.8 13.5 C 14.8 10.5, 12.2 9, 9.5 9.5 C 6.8 10, 5 12, 5.2 15 L 4.5 16 C 3.2 14.2, 3.4 11.2, 4 9.5 Z" fill="#FFE14C" stroke="#F2C200" stroke-width="1"/>
      <rect x="3.6" y="8.5" width="2" height="2.6" rx="0.7" fill="#8C5A2B"/>
      <circle cx="15.9" cy="13" r="0.75" fill="#8C5A2B"/>
    `
  },
  {
    key: 'g2',  name: 'G2图片',
    iconView: '0 0 24 24',
    iconSvg: `
      <circle cx="12" cy="9"  r="3.5" fill="none" stroke="#E5EAF3" stroke-width="1.8"/>
      <circle cx="12" cy="15" r="3.5" fill="none" stroke="#E5EAF3" stroke-width="1.8"/>
      <path d="M12 13 A 2.2 2.2 0 0 1 12 9" fill="none" stroke="#E5EAF3" stroke-width="1.8"/>
      <path d="M12 15 A 2.2 2.2 0 0 0 12 11" fill="none" stroke="#E5EAF3" stroke-width="1.8"/>
    `
  },
  {
    key: 'jimeng', name: '即梦图片',
    iconView: '0 0 24 24',
    iconSvg: `
      <path d="M12 2 L 19 8 L 22 12 L 19 16 L 12 22 L 5 16 L 2 12 L 5 8 Z" fill="#36D6FF" opacity="0.9"/>
      <polygon points="12,6 15.5,11 12,13 8.5,11" fill="#FFFFFF" opacity="0.75"/>
    `
  }
]

/* ====== 视频子工具：顺序/命名 与 Sidebar 中视频 subTools 完全一致，全部 hot=false ====== */
const VIDEO_TOOLS = [
  {
    key: 'gkv',  name: 'GK视频', hot: false,
    iconView: '0 0 24 24',
    iconSvg: `
      <rect x="2" y="5" width="14" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M16 10 L22 7 L22 17 L16 14 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    `
  },
  {
    key: 'v31',  name: 'V31视频', hot: false,
    iconView: '0 0 24 24',
    iconSvg: `
      <polygon points="10,8 10,16 17,12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <rect x="3" y="4" width="18" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    `
  },
  {
    key: 'sr',   name: 'SR视频', hot: false,
    iconView: '0 0 24 24',
    iconSvg: `
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <polygon points="8,10 8,14 11,12" fill="currentColor" opacity="0.85"/>
    `
  },
  {
    key: 'tongyi',  name: '通义万象', hot: false,
    iconView: '0 0 24 24',
    iconSvg: `
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <polygon points="10,9 10,15 15,12" fill="currentColor" opacity="0.9"/>
    `
  },
  {
    key: 'jimeng15',  name: '即梦1.5', hot: false,
    iconView: '0 0 24 24',
    iconSvg: `
      <rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <polygon points="10,9 10,15 15,12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    `
  },
  {
    key: 'jimeng20',  name: '即梦2.0', hot: false,
    iconView: '0 0 24 24',
    iconSvg: `
      <rect x="2" y="4" width="20" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <circle cx="12" cy="12" r="1.3" fill="currentColor" opacity="0.9"/>
    `
  },
  {
    key: 'xiaoma',  name: '快乐小马', hot: false,
    iconView: '0 0 24 24',
    iconSvg: `
      <path d="M4 18 L4 8 Q 4 4 8 4 L 14 4 Q 18 4 18 8 L 18 10 L 20 10 L 20 18 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="8" cy="10" r="1" fill="currentColor"/>
      <circle cx="14" cy="10" r="1" fill="currentColor"/>
      <polygon points="10,13 14,13 12,15.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    `
  },
  {
    key: 'veo',  name: 'Veo-uimi', hot: false,
    iconView: '0 0 24 24',
    iconSvg: `
      <rect x="3" y="6" width="13" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M16 11 L 21 8 L 21 16 L 16 13 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <line x1="6" y1="18" x2="6" y2="20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="13" y1="18" x2="13" y2="20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    `
  }
]

const isImageRoute = computed(() => route.path && route.path.startsWith('/image'))
const activeTool   = computed(() => {
  const k = route.query && route.query.tool
  if (k && IMAGE_TOOLS.some(t => t.key === k)) return k
  return 'gk'
})

const isVideoRoute = computed(() => route.path && route.path.startsWith('/video'))
const activeVideoTool = computed(() => {
  const k = route.query && route.query.tool
  if (k && VIDEO_TOOLS.some(t => t.key === k)) return k
  return 'gkv'
})
</script>

<style scoped>
/* ================= 全局容器 ================= */
.header-bar {
  height: 60px;
  min-height: 60px;
  padding: 0 28px 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-base);
  border-bottom: none;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color var(--theme-dur) var(--theme-ease);
  box-sizing: border-box;
}

.header-left {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
}

.header-right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: -6px;
  margin-bottom: -3px;
}

/* ================= 图片子工具 Tab（仅 /image 显示）：整体右移 20px ================= */
.img-tabs {
  display: inline-flex;
  align-items: stretch;
  height: 36px;
  /* ⭐ 亮/暗主题统一：用 elevated（暗→深灰；亮→浅灰）+ 主题描边 */
  padding: 3px;
  box-sizing: border-box;
  gap: 26px;
  flex: 0 0 auto;
  margin-left: 20px;              /* ⭐ 模块整体右移 20px */
  transition: background-color var(--theme-dur) var(--theme-ease),
              border-color var(--theme-dur) var(--theme-ease);
}

.img-tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: 106px;
  height: 36px;
  padding: 0 12px 0 10px;
  border-radius: 6px;
  /* ⭐ 亮/暗主题统一：次级文字色（暗→浅灰；亮→深灰） */
  color: var(--text-secondary, #adaeb0);
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  box-sizing: border-box;
  transition:
    background-color 180ms ease,
    color var(--theme-dur) var(--theme-ease),
    transform 120ms ease;
}
.img-tab:hover {
  /* ⭐ 亮/暗主题统一：hover 用主文字色 + hover-bg */
  color: var(--text-primary, #fff);
  background: var(--hover-bg, rgba(255,255,255,0.06));
}
.img-tab--active {
  /* ⭐ 亮/暗主题统一：选中态用 elevated-2（暗→ #2A2C30 左右；亮→浅灰实底），不再硬编码黑色块 */
  background: #e5e4e4;
  color: var(--text-primary, #FFFFFF);
  box-shadow: var(--shadow-card, 0 1px 2px rgba(0,0,0,0.22));
  transition: background-color var(--theme-dur) var(--theme-ease),
              color var(--theme-dur) var(--theme-ease);
}
.img-tab__icon {
  width:  24px;
  height: 24px;
  display: inline-flex;
  flex: 0 0 24px;
}
.img-tab__name {
  display: inline;
  line-height: 1;
}
.img-tab__hot {
  display: inline-block;
  padding: 4px 5px;
  margin-left: 1px;
  font-size: 10px;
  line-height: 1;
  font-weight: 700;
  color: #ff4747;
  background: #FFEDED;
  border: 1px solid #fa6060;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.1) inset;
  letter-spacing: 0.2px;
}

/* ================= 图标按钮（通用） ================= */
.icon-btn {
  width:  36px;
  height: 36px;
  border-radius: 10px;
  background: transparent;
  color: var(--icon-default);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  transition:
    background-color var(--interact-dur) var(--interact-ease),
    color var(--theme-dur) var(--theme-ease),
    transform 120ms ease,
    border-color 160ms ease;
  cursor: pointer;
}
.icon-btn:hover {
  background: var(--hover-bg);
  color: var(--text-primary);
}

/* 四宫格抽屉切换按钮 / 主题切换按钮：
   ⭐ 暗主题：深色半透明圆底 + 白图标（currentColor: #ffffff）
   ⭐ 亮主题：浅色/白色圆底 + 深灰图标（currentColor: #1f2937），不再"大片黑色" */
.drawer-toggle,
.theme-toggle {
  width:  32px;
  height: 32px;
  border-radius: 50%;
  /* ⭐ 暗主题默认：深色圆底（半透明黑灰），白字，当前值 */
  background: var( #ffffff);
  border: 1px solid rgba(130, 130, 130, 0.253);

  /* ⭐ SVG stroke="currentColor" → 图标颜色由 color 控制 */
  color: #a1a1a1;
  backdrop-filter: blur(8px);
  transition:
    background-color var(--theme-dur) var(--theme-ease),
    border-color var(--theme-dur) var(--theme-ease),
    color var(--theme-dur) var(--theme-ease),
    box-shadow var(--theme-dur) var(--theme-ease);
}
.drawer-toggle:hover,
.theme-toggle:hover {
  background: var(--bg-elevated-2, rgba(31, 41, 55, 0.95));
  color: #ffffff;
  border-color: var(--border-strong, rgba(255, 255, 255, 0.298));
}
/* ⭐ 亮主题：白色/浅灰圆底 + 深灰图标，不再黑色方块突兀 */
:global([data-theme='light']) .drawer-toggle,
:global([data-theme='light']) .theme-toggle {
  background: #ffffff;
  border-color: var(--border-base, rgba(16, 24, 40, 0.12));
  box-shadow:
    0 2px 6px rgba(16, 24, 40, 0.06),
    0 0 0 1px rgba(255,255,255,0.5) inset;
  /* currentColor 改变 → SVG 图标变深灰，白底深字清晰 */
  color: #1f2937;
}
:global([data-theme='light']) .drawer-toggle:hover,
:global([data-theme='light']) .theme-toggle:hover {
  background: var(--bg-elevated, #f7f8fa);
  color: #111827;
  border-color: var(--border-strong, rgba(16, 24, 40, 0.22));
}
.drawer-toggle:active,
.theme-toggle:active { transform: scale(0.93); }

/* ================= 登录按钮（粉色） ================= */
.login-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 62.5px;
  height: 32px;
  padding: 0 16px;
  border-radius: 4px;
  background: #FF5677;
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
  line-height: 1;
  border: 1px solid rgba(255,255,255,0.08);
  transition:
    transform var(--interact-dur) var(--interact-ease),
    box-shadow var(--interact-dur) var(--interact-ease),
    background-color 160ms ease;
  cursor: pointer;
  flex: 0 0 auto;
}
.login-btn:hover {
  transform: translateY(-1px);
  background: #FF6B8A;
  box-shadow: 0 6px 16px rgba(255, 86, 119, 0.32);
}
.login-btn:active { transform: translateY(0) scale(0.98); }
</style>
