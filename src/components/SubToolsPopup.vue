<template>
  <!--
    ⭐ 重做：参考用户提供的参考图 3 点核心：
      1) 左侧凸出来的指示物是 菱形（方块 rotate45°），不是小三角
      2) 无标题栏（"图片"是菜单项文字，不写到气泡里）
      3) 尺寸：整体气泡 260×200；单一图标+文字块 75.34×71；3 列 × 2 行 栅格
    Teleport 挂 body → 永远不被 sidebar / nav-menu overflow 裁掉
  -->
  <Teleport to="body">
    <div
      v-if="visible && hasTools"
      ref="popupRef"
      class="subtools-popup"
      role="menu"
      :style="popupStyle"
      @mouseenter="onSelfMouseEnter"
      @mouseleave="onSelfMouseLeave"
    >
      <!-- 指向左侧菜单项的菱形指示物（参考图样式：方块 rotate45°，一半凸出气泡左边缘）；top 动态计算，永远对准菜单项中间（气泡顶部和菜单项顶部对齐，完全不动） -->
      <div class="subtools-popup__diamond" aria-hidden="true" :style="diamondStyle"></div>

      <div class="subtools-grid">
        <button
          v-for="tool in tools"
          :key="tool.key"
          type="button"
          class="subtool-btn"
          :class="{ 'subtool-btn--active': isActiveTool(tool) }"
          @click.stop="onToolClick(tool)"
        >
          <span class="subtool-btn__icon">
            <!-- ⭐ HOT 角标：显示在图标右上角，与 HeaderBar Tab 的 HOT 标签同步 -->
            <span v-if="tool.hot" class="subtool-btn__hot" aria-label="热门">HOT</span>

            <!-- GK 图片 -->
            <svg v-if="tool.shape === 'gk'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <g fill="none" stroke="#F2F3F5" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 18 L28 18 L28 42" />
                <path d="M10 42 L22 42" />
                <path d="M54 42 L36 42 L36 18" />
                <path d="M54 18 L42 18" />
              </g>
            </svg>

            <!-- Qwen 图片 -->
            <svg v-else-if="tool.shape === 'qwen'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <defs>
                <linearGradient :id="qwenGradId" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#A98AFF" />
                  <stop offset="50%"  stop-color="#FF6FB0" />
                  <stop offset="100%" stop-color="#43C1FF" />
                </linearGradient>
              </defs>
              <polygon points="32,6 56,20 56,44 32,58 8,44 8,20" :fill="`url(#${qwenGradId})`" />
              <polygon points="32,18 44,26 44,38 32,46 20,38 20,26" fill="none" stroke="#FFFFFF" stroke-width="2.2" opacity="0.65" />
              <polygon points="32,24 38,32 32,40 26,32" fill="#FFFFFF" />
            </svg>

            <!-- 香蕉作图 -->
            <svg v-else-if="tool.shape === 'banana'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <g>
                <path d="M16 22 C 18 12, 28  8, 36 10 C 44 12, 50 18, 52 28 L 52 32 C 48 22, 40 18, 32 19 C 24 20, 18 26, 20 36 L 18 38 C 14 32, 14 26, 16 22 Z" fill="#FFE14C" stroke="#F2C200" stroke-width="2" />
                <rect x="14" y="20" width="5" height="7" rx="2" fill="#8C5A2B" />
                <circle cx="51.5" cy="30" r="2.2" fill="#8C5A2B" />
                <path d="M22 36 C 28 44, 40 46, 50 42" fill="none" stroke="#F2C200" stroke-width="2.4" stroke-linecap="round" />
              </g>
            </svg>

            <!-- G2 图片 -->
            <svg v-else-if="tool.shape === 'g2'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <g fill="none" stroke="#F2F3F5" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="32" cy="24" r="10" />
                <circle cx="32" cy="40" r="10" />
                <path d="M32 34 A 6 6 0 0 1 32 22" />
                <path d="M32 42 A 6 6 0 0 0 32 30" />
              </g>
            </svg>

            <!-- 即梦图片 -->
            <svg v-else-if="tool.shape === 'jimeng'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <defs>
                <linearGradient :id="jimengGradId" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#36D6FF" />
                  <stop offset="100%" stop-color="#FFC84B" />
                </linearGradient>
              </defs>
              <path d="M32 6 L 48 26 L 58 32 L 48 38 L 32 58 L 16 38 L 6 32 L 16 26 Z" :fill="`url(#${jimengGradId})`" />
              <polygon points="32,16 40,30 32,32 24,30" fill="#FFFFFF" opacity="0.55" />
            </svg>

            <!-- ========== 视频模块 8 款工具图标 ========== -->
            <!-- GK 视频：GK 字母 + 摄像机底座 -->
            <svg v-else-if="tool.shape === 'gkv'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <g fill="none" stroke="#E5EAF3" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="6" y="14" width="42" height="36" rx="6" />
                <polygon points="48,28 60,22 60,42 48,36" />
                <path d="M14 26 L26 26 L26 42" />
                <path d="M14 42 L22 42" />
                <path d="M34 42 L34 26 L40 32" />
              </g>
            </svg>

            <!-- V31 / 可灵 视频：多彩三角花瓣 -->
            <svg v-else-if="tool.shape === 'v31'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <defs>
                <linearGradient :id="`v31a-${_rid}`" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FF6FB0" />
                  <stop offset="100%" stop-color="#FFC84B" />
                </linearGradient>
                <linearGradient :id="`v31b-${_rid}`" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#43C1FF" />
                  <stop offset="100%" stop-color="#A98AFF" />
                </linearGradient>
                <linearGradient :id="`v31c-${_rid}`" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stop-color="#5EE2C6" />
                  <stop offset="100%" stop-color="#43C1FF" />
                </linearGradient>
              </defs>
              <polygon points="32,8 50,40 14,40" :fill="`url(#v31a-${_rid})`" transform="rotate(0 32 32)" />
              <polygon points="32,8 50,40 14,40" :fill="`url(#v31b-${_rid})`" transform="rotate(120 32 32)" />
              <polygon points="32,8 50,40 14,40" :fill="`url(#v31c-${_rid})`" transform="rotate(240 32 32)" />
              <circle cx="32" cy="32" r="8" fill="#FFFFFF" opacity="0.92" />
            </svg>

            <!-- SR 视频：S + R 字母 环绕镜头 -->
            <svg v-else-if="tool.shape === 'sr'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <defs>
                <linearGradient :id="`sr-${_rid}`" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#7C5CFF" />
                  <stop offset="100%" stop-color="#FF7AB8" />
                </linearGradient>
              </defs>
              <rect x="6" y="16" width="40" height="32" rx="5" :stroke="`url(#sr-${_rid})`" stroke-width="3" fill="none" />
              <polygon points="46,28 58,22 58,42 46,36" :stroke="`url(#sr-${_rid})`" stroke-width="3" fill="none" stroke-linejoin="round" />
              <circle cx="26" cy="32" r="9" :fill="`url(#sr-${_rid})`" opacity="0.18" />
              <text x="26" y="38" text-anchor="middle" font-size="16" font-weight="800" font-family="Arial, sans-serif"
                :fill="`url(#sr-${_rid})`">SR</text>
            </svg>

            <!-- 通义万象：花瓣 / 万花（阿里橙蓝） -->
            <svg v-else-if="tool.shape === 'tongyi'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <defs>
                <radialGradient :id="`ty-${_rid}`" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"  stop-color="#FFB347" />
                  <stop offset="60%" stop-color="#FF7A45" />
                  <stop offset="100%" stop-color="#3D7BFF" />
                </radialGradient>
              </defs>
              <g :fill="`url(#ty-${_rid})`">
                <ellipse cx="32" cy="16" rx="10" ry="14" />
                <ellipse cx="32" cy="16" rx="10" ry="14" transform="rotate(72 32 32)" />
                <ellipse cx="32" cy="16" rx="10" ry="14" transform="rotate(144 32 32)" />
                <ellipse cx="32" cy="16" rx="10" ry="14" transform="rotate(216 32 32)" />
                <ellipse cx="32" cy="16" rx="10" ry="14" transform="rotate(288 32 32)" />
              </g>
              <circle cx="32" cy="32" r="7" fill="#FFFFFF" />
            </svg>

            <!-- 即梦 1.5：即梦星光 + 1.5 字 -->
            <svg v-else-if="tool.shape === 'jimeng15'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <defs>
                <linearGradient :id="`jm15-${_rid}`" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#36D6FF" />
                  <stop offset="100%" stop-color="#FFC84B" />
                </linearGradient>
              </defs>
              <path d="M32 6 L 48 26 L 58 32 L 48 38 L 32 58 L 16 38 L 6 32 L 16 26 Z" :fill="`url(#jm15-${_rid})`" />
              <polygon points="32,16 40,30 32,32 24,30" fill="#FFFFFF" opacity="0.6" />
              <text x="32" y="46" text-anchor="middle" font-size="10" font-weight="800" font-family="Arial, sans-serif"
                fill="#FFFFFF" opacity="0.95">1.5</text>
            </svg>

            <!-- 即梦 2.0：即梦星光 + 2.0 字 -->
            <svg v-else-if="tool.shape === 'jimeng20'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <defs>
                <linearGradient :id="`jm20-${_rid}`" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#5B8CFF" />
                  <stop offset="55%"   stop-color="#A46BFF" />
                  <stop offset="100%" stop-color="#FF7AB8" />
                </linearGradient>
              </defs>
              <path d="M32 6 L 48 26 L 58 32 L 48 38 L 32 58 L 16 38 L 6 32 L 16 26 Z" :fill="`url(#jm20-${_rid})`" />
              <polygon points="32,16 40,30 32,32 24,30" fill="#FFFFFF" opacity="0.6" />
              <text x="32" y="46" text-anchor="middle" font-size="10" font-weight="800" font-family="Arial, sans-serif"
                fill="#FFFFFF" opacity="0.95">2.0</text>
            </svg>

            <!-- 快乐小马：小马剪影 + 橙 -->
            <svg v-else-if="tool.shape === 'xiaoma'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <defs>
                <linearGradient :id="`xm-${_rid}`" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%"   stop-color="#FF8A3D" />
                  <stop offset="100%" stop-color="#FFC24B" />
                </linearGradient>
              </defs>
              <g :fill="`url(#xm-${_rid})`">
                <!-- 小马身体 -->
                <path d="M18 46 L18 34 Q18 28 24 26 L28 26 L30 22 Q32 20 34 22 L36 26 L44 26 Q50 28 50 34 L50 46 L46 46 L46 52 L42 52 L42 46 L26 46 L26 52 L22 52 L22 46 Z" />
                <!-- 眼睛 -->
                <circle cx="42" cy="32" r="1.8" fill="#FFFFFF" />
                <!-- 鬃毛 -->
                <path d="M32 22 Q28 18 26 14 Q30 16 32 18 Q34 14 38 16 Q36 20 34 22 Z" />
              </g>
            </svg>

            <!-- Veo-uimi：摄像机 + 渐变 V -->
            <svg v-else-if="tool.shape === 'veo'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <defs>
                <linearGradient :id="`veo-${_rid}`" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#4ADE80" />
                  <stop offset="50%"   stop-color="#22D3EE" />
                  <stop offset="100%" stop-color="#6366F1" />
                </linearGradient>
              </defs>
              <rect x="8" y="18" width="38" height="28" rx="5" :fill="`url(#veo-${_rid})`" />
              <polygon points="46,30 58,24 58,40 46,34" :fill="`url(#veo-${_rid})`" opacity="0.88" />
              <circle cx="27" cy="32" r="9" fill="#FFFFFF" opacity="0.22" />
              <circle cx="27" cy="32" r="5" fill="#FFFFFF" />
            </svg>

            <!-- ========== 工具模块 8 款工具图标 ========== -->
            <!-- 视频反推：摄像机 + 逆向回放（CCW 双箭头） -->
            <svg v-else-if="tool.shape === 'vreverse'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <g fill="none" stroke="#E5EAF3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <rect x="6" y="16" width="40" height="32" rx="5" />
                <polygon points="46,30 58,24 58,40 46,36" />
                <path d="M36 28 L36 36" />
                <path d="M30 28 L24 32 L30 36 Z" fill="#E5EAF3" />
              </g>
            </svg>

            <!-- Claw 龙虾：红橙渐变 + 钳子 + 尾巴 -->
            <svg v-else-if="tool.shape === 'claw'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <defs>
                <linearGradient :id="`claw-${_rid}`" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#FF8A6B" />
                  <stop offset="100%" stop-color="#FE2C55" />
                </linearGradient>
              </defs>
              <g :fill="`url(#claw-${_rid})`" stroke="#D91A43" stroke-width="1.6" stroke-linejoin="round">
                <!-- 身体 -->
                <ellipse cx="32" cy="36" rx="13" ry="10" />
                <!-- 头 -->
                <path d="M26 28 L32 20 L38 28 Z" />
                <!-- 左钳 -->
                <path d="M20 30 Q14 26 10 20 L14 22 L14 16 L10 16 L8 20 L6 18 Q14 26 20 32 Z" />
                <!-- 右钳 -->
                <path d="M44 30 Q50 26 54 20 L50 22 L50 16 L54 16 L56 20 L58 18 Q50 26 44 32 Z" />
                <!-- 尾巴 -->
                <path d="M32 44 Q30 52 32 56 Q34 52 32 44 Z" />
              </g>
              <!-- 眼睛 -->
              <circle cx="29" cy="27" r="1.6" fill="#1A1C20" />
              <circle cx="35" cy="27" r="1.6" fill="#1A1C20" />
            </svg>

            <!-- 局部编辑：方框（局部选区）+ 铅笔 -->
            <svg v-else-if="tool.shape === 'localedit'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <g fill="none" stroke="#E5EAF3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <!-- 局部选区方框（四角裁剪） -->
                <path d="M14 10 L26 10 M38 10 L50 10 M14 54 L26 54 M38 54 L50 54" />
                <path d="M10 14 L10 26 M10 38 L10 50 M54 14 L54 26 M54 38 L54 50" />
                <!-- 铅笔 -->
                <path d="M38 44 L44 38 L50 44 L44 50 Z" fill="#F2F3F5" stroke="#E5EAF3" />
                <line x1="40" y1="42" x2="46" y2="48" stroke="#8D6E3F" stroke-width="2.4" />
                <circle cx="49" cy="34" r="4" fill="none" stroke="#FE2C55" stroke-width="3" />
                <line x1="52" y1="31" x2="58" y2="25" stroke="#FE2C55" stroke-width="3" />
              </g>
            </svg>

            <!-- 一键仿图：方框 + 内部图像（山+太阳） -->
            <svg v-else-if="tool.shape === 'copyimg'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <g fill="none" stroke="#E5EAF3" stroke-width="3" stroke-linejoin="round">
                <rect x="10" y="12" width="36" height="36" rx="4" />
                <rect x="18" y="20" width="36" height="36" rx="4" fill="#1A1C20" />
              </g>
              <!-- 内部图像：山 -->
              <path d="M24 46 L30 36 L36 42 L42 32 L50 46 Z" fill="#6C7385" />
              <circle cx="44" cy="30" r="3" fill="#FFD447" />
            </svg>

            <!-- 无损改字：文档 + T + 铅笔 -->
            <svg v-else-if="tool.shape === 'textfix'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <g fill="none" stroke="#E5EAF3" stroke-width="3" stroke-linejoin="round">
                <rect x="10" y="12" width="36" height="40" rx="3" />
                <rect x="18" y="20" width="36" height="40" rx="3" fill="#1A1C20" />
              </g>
              <!-- T 字 -->
              <line x1="28" y1="30" x2="44" y2="30" stroke="#E5EAF3" stroke-width="3.2" stroke-linecap="round" />
              <line x1="36" y1="30" x2="36" y2="46" stroke="#E5EAF3" stroke-width="3.2" stroke-linecap="round" />
            </svg>

            <!-- 手持产品：礼物盒/纸箱 -->
            <svg v-else-if="tool.shape === 'giftbox'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <g fill="none" stroke="#E5EAF3" stroke-width="3" stroke-linejoin="round">
                <!-- 盒身 -->
                <rect x="10" y="24" width="44" height="30" rx="2" />
                <!-- 盒盖 -->
                <path d="M6 24 L58 24 L58 30 L6 30 Z" />
                <!-- 缎带竖 -->
                <line x1="32" y1="24" x2="32" y2="54" />
                <!-- 缎带横 -->
                <line x1="10" y1="34" x2="54" y2="34" />
                <!-- 蝴蝶结 -->
                <path d="M24 24 Q22 14 30 14 Q32 16 32 24" />
                <path d="M40 24 Q42 14 34 14 Q32 16 32 24" />
              </g>
            </svg>

            <!-- 一键换装：卡车 -->
            <svg v-else-if="tool.shape === 'truck'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <g fill="none" stroke="#E5EAF3" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
                <!-- 车头 -->
                <rect x="8" y="28" width="22" height="18" rx="3" />
                <!-- 挡风玻璃 -->
                <path d="M22 28 L26 32 L26 44 L22 44 Z" fill="#2C2F37" />
                <!-- 车厢 -->
                <rect x="30" y="24" width="20" height="22" rx="2" />
                <!-- 车轮 -->
                <circle cx="18" cy="50" r="4" fill="#1A1C20" />
                <circle cx="44" cy="50" r="4" fill="#1A1C20" />
                <circle cx="18" cy="50" r="1.4" fill="#8D93A5" />
                <circle cx="44" cy="50" r="1.4" fill="#8D93A5" />
              </g>
            </svg>

            <!-- 一键成片：圆环播放按钮 -->
            <svg v-else-if="tool.shape === 'play'" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <g fill="none" stroke="#E5EAF3" stroke-width="3" stroke-linejoin="round">
                <circle cx="32" cy="32" r="20" />
              </g>
              <polygon points="26,22 46,32 26,42" fill="#E5EAF3" stroke="none" />
            </svg>
          </span>
          <span class="subtool-btn__name">{{ tool.name }}</span>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

/* ========= Props / Emits ========= */
const props = defineProps({
  visible:  { type: Boolean, default: false },
  title:    { type: String,  default: '' },
  tools:    { type: Array,   default: () => [] },
  anchorEl: { type: Object,  default: null }, // HTMLElement
  offsetX:  { type: Number,  default: 0 },
  offsetY:  { type: Number,  default: 0 },
  /* ⭐ 气泡所属父菜单的路由路径（例如 /image、/video）；
        用于：①激活态判定的路径前缀 ②缺省 tool 时回退到第一个子工具 */
  basePath: { type: String,  default: '/image' }
})

/* ⭐ 彻底修复"还是会动"：
     旧方案 popupStyle 用 ref + watch + nextTick 异步写入 → v-if=true 第一帧 popupStyle={}，
     气泡没有 position/top/left，临时出现在 body 默认流里，下一帧才跳到正确位置 → 视觉上"动了一下"。
     新方案：popupStyle / diamondStyle 直接是 computed，依赖一个 tick ref；
     visible=true 的同一帧就有完整位置，绝不闪烁；scroll/resize 时 tick.value++ 强制重算。 */
const tick = ref(0)

/* ⭐ 判断当前子工具是否"激活"：完全动态
      - 取子工具的 routeKey 或 key 作为对比值
      - 只有当路由 path 以 basePath 开头时才激活
      - route.query.tool 缺失时，默认激活第 1 个子工具（与 HeaderBar 的 fallback 思路一致） */
const validKeys = computed(() =>
  Array.isArray(props.tools) ? props.tools.map(t => t && (t.routeKey || t.key)).filter(Boolean) : []
)
const defaultToolKey = computed(() => (validKeys.value.length ? validKeys.value[0] : ''))
const isActiveTool = (tool) => {
  if (!tool) return false
  const toolKey = tool.routeKey || tool.key
  if (!toolKey || !validKeys.value.includes(toolKey)) return false
  if (!(route.path && props.basePath && route.path.startsWith(props.basePath))) return false
  const cur = (route.query && route.query.tool) || defaultToolKey.value
  return cur === toolKey
}

/* ========= 尺寸（严格按用户规格：工具菜单 3×3 8子工具 整体 260×267；图片菜单 2行保持 260×200 兼容） ========= */
const POPUP_W = 260       // 整体气泡宽（不变）
const ITEM_W  = 75.33     // ⭐ 单一工具块宽：用户精确 75.33（从 75.34 微调）
const ITEM_H  = 71        // 单一工具块高（不变）
const COL_GAP = 8         // ⭐ 列间距：用户指定"边距为8"统一行列 gap
const ROW_GAP = 8         // ⭐ 行间距：同上
const PAD_X   = 9         // ⭐ 左右 padding：260 - (3×75.33 + 2×8) = 260 - 241.99 = 18.01 → 左右各 9
const GAP_X   = 6         // 菜单项右 → 气泡左 的间隙（不变）
const DIAMOND = 14        // 菱形方块的边长（不变）

// 行数：1~3 个 → 1 行；4~6 个 → 2 行；7~9 个 → 3 行（工具/视频都是 8个=3行，图片是 6个=2行）
const rows = computed(() => {
  const n = Array.isArray(props.tools) ? props.tools.length : 0
  if (n <= 0) return 2
  return Math.ceil(n / 3)
})
/* ⭐ 气泡总高：
   2行（图片菜单 6 工具）：200（保持旧值 260×200，图片模块原有布局不变）
     → 上下 padding = (200 - (71×2 + 8×1)) / 2 = (200-150)/2 = 25  ✓
   3行（工具/视频菜单 8 工具）：用户指定 267 高
     → 上下 padding = (267 - (71×3 + 8×2)) / 2 = (267-229)/2 = 19  ✓ */
const POPUP_H = computed(() => {
  if (rows.value === 2) return 200
  if (rows.value === 3) return 267
  // 其他行数（罕见）：按 padding 25 回退
  return 50 + ITEM_H * rows.value + ROW_GAP * (rows.value - 1)
})
const PAD_Y = computed(() => {
  if (rows.value === 2) return 25
  if (rows.value === 3) return 19
  return (POPUP_H.value - (ITEM_H * rows.value + ROW_GAP * (rows.value - 1))) / 2
})

const emit = defineEmits(['tool-click', 'popup-enter', 'popup-leave'])
const onToolClick       = (tool) => tool && emit('tool-click', tool)
const onSelfMouseEnter  = () => emit('popup-enter')
const onSelfMouseLeave  = () => emit('popup-leave')

/* ========= 渐变 id 唯一 ========= */
const _rid = Math.floor(Math.random() * 1e9).toString(36)
const qwenGradId   = computed(() => `qwen-${_rid}`)
const jimengGradId = computed(() => `jimeng-${_rid}`)
const hasTools     = computed(() => Array.isArray(props.tools) && props.tools.length > 0)

/* ========= 定位（fixed + rect 计算） ⭐ 彻底消除切换菜单项时气泡上下"动" =========
   核心改动：popupStyle / diamondStyle 改为 computed，v-if=true 第一帧就有完整坐标，绝无闪烁。
   tick.value 作为 computed 的响应式依赖，scroll/resize 时 ++ 就会重算。
   气泡 top 固定和菜单项顶部对齐 → 完全不随气泡高度变化 → 气泡切换时整体位置"完全不动"。*/

/** 同步计算 rect 和定位（不 await 任何 nextTick / rAF） */
const _calc = () => {
  const pH = POPUP_H.value
  const pY = PAD_Y.value
  // anchor 不合法时给出安全默认值（屏幕外不可见），保证 popupStyle 永远有 position:fixed 等完整属性
  const anchor = props.anchorEl && typeof props.anchorEl.getBoundingClientRect === 'function'
    ? props.anchorEl
    : null
  if (!anchor) {
    return {
      popup: {
        position: 'fixed',
        top:   '-9999px',
        left:  '-9999px',
        width: `${POPUP_W}px`,
        height:`${pH}px`,
        padding: `${pY}px ${PAD_X}px`
      },
      diamond: { top: '20px' }
    }
  }

  const a = anchor.getBoundingClientRect()
  const ph = pH
  let left = a.right + GAP_X + props.offsetX
  // ⭐ 气泡顶部和菜单项顶部对齐 → 完全不随气泡高度 ph 变化，气泡切换时整体位置"完全不动"
  let top  = a.top + props.offsetY

  const vw = window.innerWidth  || document.documentElement.clientWidth
  const vh = window.innerHeight || document.documentElement.clientHeight

  // 右越界 → 翻到左边
  if (left + POPUP_W > vw - 8) left = Math.max(8, a.left - GAP_X - POPUP_W - props.offsetX)
  // 只限制底部和顶部的安全边界（不再根据 ph 重新居中 top）
  if (top + ph > vh - 8) top = vh - ph - 8
  if (top < 8) top = 8

  // ⭐ 菱形指示物动态 top：永远指向菜单项垂直中间（与气泡高度 ph 无关，切换时尖角始终贴在菜单项中间）
  const diamondTop = Math.round((a.top + a.height / 2) - top - 7)

  return {
    popup: {
      position: 'fixed',
      top:   `${Math.round(top)}px`,
      left:  `${Math.round(left)}px`,
      width: `${POPUP_W}px`,
      height:`${pH}px`,
      padding: `${pY}px ${PAD_X}px`
    },
    diamond: { top: `${diamondTop}px` }
  }
}

// ⭐ 依赖 tick → 任何时机 tick.value++ 都会触发重算并返回新 style 对象（同步，第一帧就正确）
const popupStyle = computed(() => {
  tick.value /* eslint-disable-line no-unused-expressions */
  return _calc().popup
})
const diamondStyle = computed(() => {
  tick.value /* eslint-disable-line no-unused-expressions */
  return _calc().diamond
})

let _raf = 0
const scheduleRecalc = () => {
  if (_raf) cancelAnimationFrame(_raf)
  _raf = requestAnimationFrame(() => {
    _raf = 0
    tick.value++
  })
}

const onWindowResize = () => scheduleRecalc()
const onGlobalScroll = () => scheduleRecalc()

onMounted(() => {
  window.addEventListener('resize', onWindowResize, { passive: true })
  window.addEventListener('scroll', onGlobalScroll, { capture: true, passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('scroll', onGlobalScroll, { capture: true })
  if (_raf) cancelAnimationFrame(_raf)
})
</script>

<style>
/* ⚠ Teleport 到 body，不能用 scoped；类名加前缀防冲突 */

/* ================= 气泡本体（宽 260；高：2行=200 / 3行=267；深色圆角） ================= */
.subtools-popup {
  z-index: 9995;
  position: relative;          /* 菱形指示物 position: absolute 的 containing block */
  box-sizing: border-box;
  /* 上下 padding 用 JS 写进 :style（2行=25  3行=19）；左右 9px */

  background: var(--bg-elevated, #1A1C20);
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  border-radius: 6px;          /* ⭐ 用户指定圆角 6（原16） */
  color: var(--text-primary, #E5EAF3);
  overflow: visible;            /* ⭐ 菱形要凸出左边界外，overflow 必须 visible */
  user-select: none;
}

/* ================= 菱形指示物（参考图样式：方块 rotate45°，一半凸出气泡左边缘） ================= */
.subtools-popup__diamond {
  position: absolute;
  left: -7px;                   /* 一半在气泡外（14×14 的方块，rotate 后左右约 ±10，放 -7 让凸出来 ~7px，和菜单项贴住） */
  /* ⭐ top 不再用 50%，改成动态 style="top:xxpx"（永远指向菜单项中间，气泡顶部和菜单项顶部对齐，完全不动） */
  width:  14px;
  height: 14px;
  background: var(--bg-elevated, #1A1C20);          /* 与气泡同色，看起来是从气泡"延伸"出去的 */
  transform: rotate(45deg);
  pointer-events: none;
  /* 让菱形的两条"非外边"与气泡 1px 边框贴合，视觉上不割裂 */
  border-right: 1px solid var(--border-base, rgba(255,255,255,0.06));
  border-bottom: 1px solid var(--border-base, rgba(255,255,255,0.06));
  border-bottom-right-radius: 2px;
}

/* ================= 3 列 × N 行 工具栅格 ================= */
.subtools-grid {
  display: grid;
  grid-template-columns: repeat(3, 75.33px);  /* ⭐ 用户精确 75.33 */
  grid-auto-rows: 71px;
  gap: 8px 8px;                 /* ⭐ 用户指定行列边距统一为 8（原行8列6） */
  width: 100%;
  box-sizing: border-box;
}

/* ================= 单一工具块（75.33 × 71，上图下字，居中） ================= */
.subtool-btn {
  appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  width:  75.33px;              /* ⭐ 用户精确 75.33（原75.34） */
  height: 71px;
  padding: 8px;                 /* 参考截图 padding 8px */
  border-radius: 10px;
  background: transparent;
  border: 1px solid transparent;
  color: inherit;
  outline: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;                     /* 图标 → 文字 间距 4 */
  cursor: pointer;
  user-select: none;

  transition:
    background-color 180ms ease,
    border-color 240ms ease,
    transform 120ms ease;
}
.subtool-btn:hover {
  background: var(--hover-bg, rgba(255,255,255,0.08));  /* 参考截图 hover 填充 #FFFFFF14 ≈ 0.08 */
  border-color: var(--border-base, rgba(255,255,255,0.08));
}
/* ⭐ 激活态：与顶部 Tab 的 .img-tab--active 视觉同步（浅粉底 + 粉色描边） */
.subtool-btn.subtool-btn--active {
  background: #FE2C55;
  border-color: #FE2C55;
}
.subtool-btn.subtool-btn--active .subtool-btn__name { color: #fff !important; }
.subtool-btn:active { transform: scale(0.97); }

.subtool-btn__icon {
  width:  32px;
  height: 32px;
  min-width:  32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;          /* ⭐ 为 HOT 角标 absolute 提供 containing block */
}
.subtool-btn__icon > svg { display: block; width: 32px; height: 32px; }

/* ⭐ HOT 角标：贴在图标右上角（与 HeaderBar 的 HOT 胶囊样式同步：粉→深粉渐变 + 白字） */
.subtool-btn__hot {
  position: absolute;
  top: -7px;
  right: -20px;
  height: 16px;
  padding: 0 6px;
  line-height: 16px;
  border-radius: 8px;
  background: #FE2C55;
  color: var(--text-primary, #ffffff);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.4px;
  pointer-events: none;
  z-index: 2;
}

.subtool-btn__name {
  font-size: 14px;              /* ⭐ 用户指定字号 14（原12） */
  line-height: 1.2;
  font-weight: 500;
  color: var(--text-primary, #E5EAF3);
  text-align: center;
  letter-spacing: 0.2px;
  white-space: nowrap;
}
</style>
