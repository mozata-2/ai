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

      <!-- ⭐ 工具页面专属：8 个子工具 Tab（与登录按钮同行，严格按用户规格） -->
      <nav v-if="isToolRoute" class="tool-tabs-header" role="tablist" aria-label="工具切换">
        <router-link
          v-for="t in TOOL_TOOLS"
          :key="t.key"
          :to="{ path: '/tool', query: { tool: t.key } }"
          role="tab"
          class="tool-tab-h"
          :class="{ 'is-active': activeToolKey === t.key }"
          :style="t.width ? { width: t.width + 'px' } : null"
        >
          <!-- 20×20 SVG 图标（8 款） -->
          <span class="tool-tab-h__icon" aria-hidden="true">
            <!-- 1. 视频反推：反向胶片 + 播放箭头 -->
            <svg v-if="t.shape === 'vreverse'" viewBox="0 0 64 64" width="20" height="20">
              <defs>
                <linearGradient :id="'hrv-'+_hrid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#2AD4FF"/>
                  <stop offset="100%" stop-color="#006BFF"/>
                </linearGradient>
              </defs>
              <rect x="8" y="18" width="38" height="28" rx="5" :fill="'url(#hrv-'+_hrid+')'" stroke="#0052CC" stroke-width="2"/>
              <circle cx="14" cy="24" r="2" fill="#fff" opacity="0.85"/>
              <circle cx="20" cy="24" r="2" fill="#fff" opacity="0.85"/>
              <circle cx="26" cy="24" r="2" fill="#fff" opacity="0.85"/>
              <circle cx="14" cy="40" r="2" fill="#fff" opacity="0.85"/>
              <circle cx="20" cy="40" r="2" fill="#fff" opacity="0.85"/>
              <circle cx="26" cy="40" r="2" fill="#fff" opacity="0.85"/>
              <polygon points="44,18 62,32 44,46" fill="#FF5C8A" stroke="#E63961" stroke-width="1.6" stroke-linejoin="round"/>
              <path d="M46 30 L52 32 L46 34 Z" fill="#fff"/>
              <path d="M6 10 L4 16 L6 22 L8 16 Z" fill="#006BFF" stroke="#0052CC" stroke-width="1.2"/>
            </svg>

            <!-- 2. Claw龙虾 -->
            <svg v-else-if="t.shape === 'claw'" viewBox="0 0 64 64" width="20" height="20">
              <defs>
                <linearGradient :id="'hcl-'+_hrid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#FF8A6B"/>
                  <stop offset="100%" stop-color="#FE2C55"/>
                </linearGradient>
              </defs>
              <g :fill="'url(#hcl-'+_hrid+')'" stroke="#D91A43" stroke-width="1.6" stroke-linejoin="round">
                <ellipse cx="32" cy="36" rx="13" ry="10"/>
                <path d="M26 28 L32 20 L38 28 Z"/>
                <path d="M20 30 Q14 26 10 20 L14 22 L14 16 L10 16 L8 20 L6 18 Q14 26 20 32 Z"/>
                <path d="M44 30 Q50 26 54 20 L50 22 L50 16 L54 16 L56 20 L58 18 Q50 26 44 32 Z"/>
                <path d="M32 44 Q30 52 32 56 Q34 52 32 44 Z"/>
              </g>
              <circle cx="29" cy="27" r="1.6" fill="#1A1C20"/>
              <circle cx="35" cy="27" r="1.6" fill="#1A1C20"/>
            </svg>

            <!-- 3. 局部编辑：放大镜 + 描边方块 -->
            <svg v-else-if="t.shape === 'localedit'" viewBox="0 0 64 64" width="20" height="20">
              <defs>
                <linearGradient :id="'hle-'+_hrid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#7CE493"/>
                  <stop offset="100%" stop-color="#0E9A5F"/>
                </linearGradient>
              </defs>
              <rect x="12" y="14" width="34" height="34" rx="6" :fill="'url(#hle-'+_hrid+')'" stroke="#0B7A4B" stroke-width="2"/>
              <path d="M20 22 L38 22 M20 30 L32 30 M20 38 L36 38" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>
              <circle cx="48" cy="48" r="11" fill="#F97316" stroke="#E15A00" stroke-width="2"/>
              <circle cx="48" cy="48" r="4" fill="#fff"/>
              <line x1="56" y1="56" x2="61" y2="61" stroke="#333" stroke-width="2.8" stroke-linecap="round"/>
            </svg>

            <!-- 4. 一键仿图：双图叠印 + 箭头 -->
            <svg v-else-if="t.shape === 'copyimg'" viewBox="0 0 64 64" width="20" height="20">
              <defs>
                <linearGradient :id="'hci-'+_hrid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#8A7BFF"/>
                  <stop offset="100%" stop-color="#3B27C4"/>
                </linearGradient>
              </defs>
              <rect x="8"  y="12" width="34" height="34" rx="5" fill="#E7F0FF" stroke="#6B8CFF" stroke-width="2"/>
              <rect x="20" y="22" width="34" height="34" rx="5" :fill="'url(#hci-'+_hrid+')'" stroke="#341EBB" stroke-width="2"/>
              <polygon points="32,34 32,44 27,44 38,54 49,44 44,44 44,34" fill="#fff"/>
              <circle cx="18" cy="22" r="3.2" fill="#FF9EAA" stroke="#F06292" stroke-width="1.2"/>
              <path d="M12 40 L18 34 L24 40 L30 32 L34 36 L34 42 L12 42 Z" fill="#FFD97D" stroke="#F2B547" stroke-width="1"/>
            </svg>

            <!-- 5. 无损改字：文字 T + 钢笔头 + 魔棒闪光 -->
            <svg v-else-if="t.shape === 'textfix'" viewBox="0 0 64 64" width="20" height="20">
              <defs>
                <linearGradient :id="'htf-'+_hrid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#FFC266"/>
                  <stop offset="100%" stop-color="#FF6D1F"/>
                </linearGradient>
              </defs>
              <rect x="8" y="10" width="48" height="44" rx="6" fill="#FFF8EE" stroke="#F2B547" stroke-width="2"/>
              <text x="32" y="42" text-anchor="middle" font-size="26" font-weight="700" font-family="Arial"
                    :fill="'url(#htf-'+_hrid+')'" stroke="#E25A00" stroke-width="1.2">T</text>
              <path d="M40 14 L54 28 L50 32 L36 18 Z" fill="#4ADE80" stroke="#16A34A" stroke-width="1.4"/>
              <circle cx="54" cy="12" r="1.8" fill="#FFD700"/>
              <line   x1="54" y1="6"  x2="54" y2="9"  stroke="#FFD700" stroke-width="1.6" stroke-linecap="round"/>
              <line   x1="54" y1="15" x2="54" y2="18" stroke="#FFD700" stroke-width="1.6" stroke-linecap="round"/>
              <line   x1="48" y1="12" x2="51" y2="12" stroke="#FFD700" stroke-width="1.6" stroke-linecap="round"/>
              <line   x1="57" y1="12" x2="60" y2="12" stroke="#FFD700" stroke-width="1.6" stroke-linecap="round"/>
            </svg>

            <!-- 6. 手持产品：手掌 + 礼盒 -->
            <svg v-else-if="t.shape === 'giftbox'" viewBox="0 0 64 64" width="20" height="20">
              <defs>
                <linearGradient :id="'hgb-'+_hrid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#FF85B3"/>
                  <stop offset="100%" stop-color="#FF2D92"/>
                </linearGradient>
              </defs>
              <rect x="18" y="14" width="32" height="22" rx="3" :fill="'url(#hgb-'+_hrid+')'" stroke="#C41E7A" stroke-width="1.6"/>
              <rect x="16" y="12" width="36" height="6"  rx="2" fill="#FF5FA2" stroke="#C41E7A" stroke-width="1.6"/>
              <rect x="33" y="12" width="4"  height="24" fill="#FFE27A" stroke="#E8B33A" stroke-width="1"/>
              <rect x="16" y="22" width="36" height="4"  fill="#FFE27A" stroke="#E8B33A" stroke-width="1"/>
              <circle cx="35" cy="12" r="3" fill="#FFE27A" stroke="#E8B33A" stroke-width="1.2"/>
              <path d="M30 10 Q26 6 32 8 Z"  fill="#FFE27A" stroke="#E8B33A" stroke-width="1"/>
              <path d="M40 10 Q44 6 38 8 Z"  fill="#FFE27A" stroke="#E8B33A" stroke-width="1"/>
              <path d="M12 44 C10 44 9 46 9 48 L9 54 C9 58 13 60 16 60 L38 60 C44 60 48 56 48 50 L48 42 C48 40 46 39 44 39 C42 39 41 41 41 42 L41 48 C41 49 39 49 38 48 L38 34 C38 32 36 31 34 31 C32 31 31 33 31 34 L31 48 C31 49 29 49 28 48 L28 36 C28 34 26 33 24 33 C22 33 21 35 21 36 L21 48 C21 49 19 49 18 48 L18 44 C18 42 16 44 12 44 Z"
                    fill="#FFCFA5" stroke="#C98A5B" stroke-width="1.4" stroke-linejoin="round"/>
            </svg>

            <!-- 7. 一键换装：带闪电的送货车 -->
            <svg v-else-if="t.shape === 'truck'" viewBox="0 0 64 64" width="20" height="20">
              <defs>
                <linearGradient :id="'htr-'+_hrid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#4ECDC4"/>
                  <stop offset="100%" stop-color="#2B6CB0"/>
                </linearGradient>
              </defs>
              <rect x="6" y="18" width="32" height="26" rx="3" :fill="'url(#htr-'+_hrid+')'" stroke="#1F528E" stroke-width="1.8"/>
              <path d="M38 22 L52 22 L58 30 L58 44 L38 44 Z" fill="#FFD93D" stroke="#C9A11C" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M40 25 L49 25 L53 30 L40 30 Z" fill="#1E293B" stroke="#C9A11C" stroke-width="1"/>
              <polygon points="22,24 14,36 20,36 17,46 27,32 21,32 24,24" fill="#FFEE58" stroke="#F2B91B" stroke-width="1" stroke-linejoin="round"/>
              <circle cx="18" cy="48" r="5.6" fill="#31343A" stroke="#6B6F78" stroke-width="1.4"/>
              <circle cx="18" cy="48" r="2.2" fill="#9399A2"/>
              <circle cx="48" cy="48" r="5.6" fill="#31343A" stroke="#6B6F78" stroke-width="1.4"/>
              <circle cx="48" cy="48" r="2.2" fill="#9399A2"/>
            </svg>

            <!-- 8. 一键成片：胶片转盘 + 播放三角 -->
            <svg v-else-if="t.shape === 'play'" viewBox="0 0 64 64" width="20" height="20">
              <defs>
                <linearGradient :id="'hpl-'+_hrid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#FE2C55"/>
                  <stop offset="100%" stop-color="#8B14F7"/>
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="26" :fill="'url(#hpl-'+_hrid+')'" stroke="#6A0DC0" stroke-width="2"/>
              <g fill="#FFF8EE" stroke="#6A0DC0" stroke-width="1">
                <rect x="28" y="6"  width="8" height="5" rx="1"/>
                <rect x="28" y="53" width="8" height="5" rx="1"/>
                <rect x="5"  y="28" width="5" height="8" rx="1"/>
                <rect x="54" y="28" width="5" height="8" rx="1"/>
              </g>
              <circle cx="32" cy="32" r="18" fill="#FFF8EE" stroke="#6A0DC0" stroke-width="1.4"/>
              <polygon points="26,22 26,42 44,32" :fill="'url(#hpl-'+_hrid+')'" stroke="#6A0DC0" stroke-width="1.4" stroke-linejoin="round"/>
            </svg>

            <span v-else></span>
          </span>

          <span class="tool-tab-h__name">{{ t.name }}</span>

          <!-- 仅视频反推：内嵌 hot 模块（33.89 × 20，圆角 4，字号 12） -->
          <span v-if="t.hot" class="tool-tab-h__hot">hot</span>
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

/* ============ 工具页面专属：8 个子工具（严格按用户规格：顺序、尺寸、hot标记） ============ */
const _hrid = Math.random().toString(36).slice(2, 8)  // SVG 渐变 id 前缀（避免实例冲突）
const TOOL_TOOLS = [
  { key: 'vreverse',  name: '视频反推', hot: true,  shape: 'vreverse',  width: 161.89 }, // ⭐ 特殊：带 hot 模块
  { key: 'claw',      name: 'Claw龙虾', hot: false, shape: 'claw',      width: 118.25 },
  { key: 'localedit', name: '局部编辑', hot: false, shape: 'localedit', width: 118.25 },
  { key: 'copyimg',   name: '一键仿图', hot: false, shape: 'copyimg',   width: 118.25 },
  { key: 'textfix',   name: '无损改字', hot: false, shape: 'textfix',   width: 118.25 },
  { key: 'giftbox',   name: '手持产品', hot: false, shape: 'giftbox',   width: 118.25 },
  { key: 'truck',     name: '一键换装', hot: false, shape: 'truck',     width: 118.25 },
  { key: 'play',      name: '一键成片', hot: false, shape: 'play',      width: 118.25 }
]
const isToolRoute   = computed(() => route.path && route.path === '/tool')
const activeToolKey = computed(() => {
  const k = route.query && route.query.tool
  if (k && TOOL_TOOLS.some(t => t.key === k)) return k
  return TOOL_TOOLS[0].key  // 默认视频反推
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
  background: #FE2C55;
  color: #fff;
  box-shadow: none;
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
  background: var(--bg-surface, #ffffff);
  border: 1px solid var(--border-base, rgba(130, 130, 130, 0.253));

  /* ⭐ SVG stroke="currentColor" → 图标颜色由 color 控制 */
  color: var(--icon-default, #a1a1a1);
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
  color: var(--text-primary, #ffffff);
  border-color: var(--border-strong, rgba(255, 255, 255, 0.298));
}
/* ⭐ 亮主题：白色/浅灰圆底 + 深灰图标，不再黑色方块突兀 */
:global([data-theme='light']) .drawer-toggle,
:global([data-theme='light']) .theme-toggle {
  background: var(--bg-surface, #ffffff);
  border-color: var(--border-base, rgba(16, 24, 40, 0.12));
  box-shadow:
    0 2px 6px rgba(16, 24, 40, 0.06),
    0 0 0 1px rgba(255,255,255,0.5) inset;
  /* currentColor 改变 → SVG 图标变深灰，白底深字清晰 */
  color: var(--text-primary, #1f2937);
}
:global([data-theme='light']) .drawer-toggle:hover,
:global([data-theme='light']) .theme-toggle:hover {
  background: var(--bg-elevated, #f7f8fa);
  color: var(--text-primary, #111827);
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
  color: var(--text-primary, #fff);
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

/* ================================================================
   ⭐ 工具页面专属：Header 行中 8 个工具 Tabs（与登录按钮同行）
   严格按用户规格：
   · 视频反推：161.89×36 圆角6 / icon 20 / 字号14 / 内嵌 hot 33.89×20 圆角4 字号12
   · 其余 7：118.25×36 圆角6 / icon 20 / 字号14
   · 默认无背景，选中态 #F0F0F0
   ================================================================ */
.tool-tabs-header {
  display: inline-flex;
  align-items: center;
  height: 36px;              /* 与所有子 tab 高一致 */
  gap: 12px;                 /* tab 之间视觉间隔（与图片/视频tabs基准一致） */
  flex: 0 0 auto;
  margin-left: 20px;         /* 与图片页面 img-tabs 一致：左侧边距 20px */
  box-sizing: border-box;
}
.tool-tab-h {
  /* 尺寸：高度统一 36，宽度由 JS :style 的 t.width 精确给（161.89 / 118.25） */
  box-sizing: border-box;
  height: 36px;
  padding: 0 12px;
  border-radius: 6px;         /* ⭐ 用户要求圆角 6（视频反推明确 6，其余统一） */
  background: transparent;    /* ⭐ 默认无背景色 */
  color: var(--text-primary, #1A1C20);

  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  white-space: nowrap;
  text-decoration: none;
  font-size: 14px;            /* ⭐ 用户指定字号 14 */
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  transition: background-color 120ms ease, color 160ms ease;
}
/* 视频反推（第 1 个）：左侧内边距略小，为 hot 模块腾出右侧空间（hot 使用 margin-left: auto 推到最右） */
.tool-tabs-header > .tool-tab-h:nth-child(1) { padding: 0 12px 0 10px; }
/* 其余 7 个按钮：内容居中 */
.tool-tabs-header > .tool-tab-h:nth-child(n+2) { justify-content: center; padding: 0 8px; }

.tool-tab-h:hover  { background: var(--bg-elevated-2, rgba(240, 240, 240, 0.55)); }
.tool-tab-h.is-active { background: var(--bg-elevated-2, #F0F0F0); }    /* ⭐ 用户指定选中背景色 */

/* icon：20×20 */
.tool-tab-h__icon {
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.tool-tab-h__icon svg { display: block; }

/* 文字：14（继承自 .tool-tab-h 的 font-size:14） */
.tool-tab-h__name {
  font-size: 14px;             /* ⭐ 再次显式，确保 14 */
  line-height: 1;
  font-weight: 500;
  letter-spacing: 0.2px;
  flex: 0 0 auto;
  color: inherit;
}

/* 内嵌 hot 模块：33.89×20 圆角4 字号12（只在第 1 个视频反推 tab 内出现） */
.tool-tab-h__hot {
  flex: 0 0 auto;
  box-sizing: border-box;
  width: 33.89px;             /* ⭐ 用户精确宽 */
  height: 20px;               /* ⭐ 用户精确高 */
  border-radius: 4px;         /* ⭐ 用户圆角 4 */
  font-size: 12px;            /* ⭐ 用户字号 12 */
  line-height: 18px;
  font-weight: 600;
  color: var(--text-primary, #FFFFFF);
  text-align: center;
  background: linear-gradient(135deg, #FF6A88 0%, #FE2C55 100%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  letter-spacing: 0.3px;
  margin-left: auto;          /* 推到按钮最右侧（视频反推 161.89 有足够空间） */
  text-transform: lowercase;
}
</style>
