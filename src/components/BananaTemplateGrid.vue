<template>
  <section class="banana-template">
    <div class="panel-title-row">
      <div class="panel-title">
        <span class="panel-title__icon">✨</span>
        <span class="panel-title__text">快速选择模板</span>
      </div>
      <div class="panel-title__right">
        <span class="template-count">{{ templates.length }} 个模板</span>
        <button type="button" class="view-more" @click="$emit('view-all')">
          <span>查看更多</span>
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path d="M9 6 L15 12 L9 18" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div
      class="scroll-wrapper"
      ref="scrollRef"
      :class="{ 'is-dragging': isDragging }"
      @scroll="onScroll"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @pointerleave="onPointerUp"
    >
      <div class="card-list">
        <article v-for="tpl in templates" :key="tpl.id" class="tpl-card">
          <div class="tpl-card__img">
            <img :src="tpl.imageUrl" :alt="tpl.title" loading="lazy" />
            <div v-if="tpl.badge" class="tpl-badge">{{ tpl.badge }}</div>
          </div>
         
          <button type="button" class="tpl-card__btn" @click="onUse(tpl)">立即使用</button>
        </article>
      </div>
    </div>

    <button type="button" class="prev-btn" aria-label="上一页" v-show="showPrev" @click="onPrevClick">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M15 6 L9 12 L15 18" stroke="#2A2C2E" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button type="button" class="next-btn" aria-label="下一页" v-show="showNext" @click="onNextClick">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M9 6 L15 12 L9 18" stroke="#2A2C2E" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </section>
</template>

<script>
const TEMPLATES_RAW = [
  { id: 1,  title: '复古中式卧室', imagePrompt: 'chinese style bedroom interior, wooden furniture, warm cozy atmosphere, architectural photo, 8k' },
  { id: 2,  title: '医学教育插图', subtitle: '面部白癜风', badge: '医学教育插图：面部白癜风', imagePrompt: 'medical education illustration of facial vitiligo symptoms, diagram style, clear labels' },
  { id: 3,  title: '冬季长款大衣穿搭', imagePrompt: 'winter women fashion long beige coat outfit, street style full body portrait' },
  { id: 4,  title: '赛博朋克城市夜景', imagePrompt: 'cyberpunk city night neon lights rainy street cinematic photography' },
  { id: 5,  title: '油画风景', imagePrompt: 'impressionist oil painting landscape garden monet style brushstrokes' },
  { id: 6,  title: '动漫头像', imagePrompt: 'japanese anime girl avatar fresh clean illustration style' },
  { id: 7,  title: '产品摄影', imagePrompt: 'luxury wristwatch product photo studio lighting high end commercial' },
  { id: 8,  title: '写实人像', imagePrompt: 'realistic portrait photography natural light cinematic film grain' },
  { id: 9,  title: '中国风山水', imagePrompt: 'traditional chinese ink wash painting landscape mountains clouds mist' },
  { id: 10, title: '概念建筑', imagePrompt: 'futuristic concept architecture curvy facade building design render' }
]
const imgHost = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image'
const SIZE = 'square_hd'
function toUrl(p) { return `${imgHost}?prompt=${encodeURIComponent(p)}&image_size=${SIZE}` }
export const templates = TEMPLATES_RAW.map(t => ({ ...t, imageUrl: toUrl(t.imagePrompt) }))
</script>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['use', 'view-all'])
const scrollRef = ref(null)
const showPrev = ref(false)
const showNext = ref(true)

const THRESHOLD = 4
const DRAG_CLICK_THRESHOLD = 5   /* 拖动距离 >5px 视为拖动，不触发卡片 click */

/* ====== 鼠标按住拖动滚动（支持连续抓取） ====== */
let isDown = false
const isDragging = ref(false)   /* 只控制光标：grab/grabbing */
let movedThisGesture = false    /* 本次按下→抬起是否产生拖动：阻止 click */
let startX = 0
let startScrollLeft = 0

function onPointerDown(e) {
  const el = scrollRef.value
  if (!el) return
  /* 鼠标左键（button===0）或 触屏/笔 才响应 */
  if (e.pointerType === 'mouse' && typeof e.button === 'number' && e.button !== 0) return
  isDown = true
  movedThisGesture = false
  isDragging.value = false
  startX = e.pageX
  startScrollLeft = el.scrollLeft
  try { e.preventDefault() } catch (_) { /* ignore */ } /* 阻止浏览器默认图片拖拽/文字选中 */
  try { el.setPointerCapture(e.pointerId) } catch (_) { /* ignore */ }
}
function onPointerMove(e) {
  if (!isDown) return
  const el = scrollRef.value
  if (!el) return
  const dx = e.pageX - startX
  if (Math.abs(dx) > DRAG_CLICK_THRESHOLD) {
    movedThisGesture = true
    isDragging.value = true
  }
  el.scrollLeft = startScrollLeft - dx
}
function onPointerUp(e) {
  if (!isDown) return
  isDown = false
  const el = scrollRef.value
  if (el && e) {
    try { el.releasePointerCapture(e.pointerId) } catch (_) { /* ignore */ }
  }
  /* 光标样式立即恢复，连续点击下一次马上能看到 grab */
  isDragging.value = false
  /* movedThisGesture 延后到本轮 click 冒泡结束后清空，防止点击立即使用 */
  setTimeout(() => { movedThisGesture = false }, 0)
}

/* 如果本次 gesture 有拖动，阻止「立即使用」点击 */
function onUse(tpl) {
  if (movedThisGesture || isDragging.value) return
  emit('use', tpl)
}

function updateBtns() {
  const el = scrollRef.value
  if (!el) return
  const remaining = el.scrollWidth - el.clientWidth - el.scrollLeft
  showPrev.value = el.scrollLeft > THRESHOLD
  showNext.value = remaining > THRESHOLD
}

function onScroll() {
  updateBtns()
}

function onPrevClick() {
  const el = scrollRef.value
  if (!el) return
  const step = el.clientWidth || 340
  if (el.scrollLeft <= THRESHOLD) {
    el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
    return
  }
  const delta = el.scrollLeft <= step ? el.scrollLeft + THRESHOLD : step
  el.scrollBy({ left: -delta, behavior: 'smooth' })
}

function onNextClick() {
  const el = scrollRef.value
  if (!el) return
  const step = el.clientWidth || 340
  const remaining = el.scrollWidth - el.clientWidth - el.scrollLeft
  if (remaining <= THRESHOLD) {
    el.scrollTo({ left: 0, behavior: 'smooth' })
    return
  }
  const delta = remaining <= step ? remaining + THRESHOLD : step
  el.scrollBy({ left: delta, behavior: 'smooth' })
}

onMounted(() => {
  updateBtns()
})
</script>

<style scoped>
.banana-template {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 0;
  background: transparent;
}

/* ========== 标题行 ========== */
.panel-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
}
.panel-title__icon { font-size: 15px; line-height: 1; flex: 0 0 auto; }
.panel-title__text { flex: 0 0 auto; }
.panel-title__right {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.template-count {
  font-size: 12px;
  color: var(--text-secondary, #BFC4CC);
  font-weight: 500;
}

/* 查看更多：纯文字样式，无背景无边框 */
.view-more {
  appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: transparent;
  border: none;
  border-radius: 0;
  color: #ff5677;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  box-sizing: border-box;
  flex: 0 0 auto;
  padding: 0;
  height: auto;
  line-height: 1;
}
.view-more > svg { flex: 0 0 auto; }

/* ========== 滚动卡片区 ========== */
.scroll-wrapper {
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin-top: 10px;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}
.scroll-wrapper.is-dragging {
  cursor: grabbing;
}
/* 防止浏览器默认的图片拖拽（会产生幽灵缩略图干扰拖动） */
.scroll-wrapper img,
.scroll-wrapper a,
.scroll-wrapper button {
  -webkit-user-drag: none;
  user-drag: none;
}
.scroll-wrapper::-webkit-scrollbar { display: none; }
.scroll-wrapper { scrollbar-width: none; -ms-overflow-style: none; }

.card-list {
  display: inline-flex;
  align-items: flex-start;
  gap: 8px;
  padding: 2px 2px 4px 2px;
  box-sizing: border-box;
}

.tpl-card {
  width: 108px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 0 0 auto;
  box-sizing: border-box;
}
.tpl-card__img {
  width: 108px;
  height: 158px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  flex: 0 0 auto;
  background: var(--bg-elevated-2, #26272B);
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
}
.tpl-card__img > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tpl-badge {
  position: absolute;
  left: 6px;
  bottom: 6px;
  background: rgba(255,255,255,0.92);
  color: #;
  padding: 2px 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  max-width: calc(100% - 12px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tpl-card__title {
  /* 用户要求：取消"字"模块（卡片标题文字） */
  display: none !important;
}
.tpl-card__btn {
  appearance: none;
  -webkit-appearance: none;
  width: 110px;                  /* ⭐ 110×24（用户指定） */
  height: 24px;
  border: none;
  border-radius: 4px;            /* ⭐ 圆角 4 */
  background: #FE2C55;
  color: #ffffff;
  font-size: 12px;               /* ⭐ 字号 12 */
  font-weight: 400;              /* ⭐ 取消加粗 */
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  box-sizing: border-box;
}

/* ========== 左右翻页圆形按钮（42×42 白圆，固定在组件右方/左方中间） ========== */
.prev-btn,
.next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: #;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  z-index: 3;
}
.prev-btn { left: 0; }
.next-btn { right: 0; }
.prev-btn > svg,
.next-btn > svg { flex: 0 0 auto; }
</style>
