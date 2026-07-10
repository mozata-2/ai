<template>
  <section class="ty-aspect">
    <div class="panel-title">
      <span class="title-emoji" aria-hidden="true">🖼️</span>
      <span class="panel-title__text">尺寸</span>
    </div>

    <div class="aspect-grid" role="radiogroup" :aria-label="'尺寸选择，当前' + modelValue">
      <button
        v-for="opt in ASPECT_OPTS"
        :key="opt.value"
        type="button"
        class="aspect-btn"
        :class="{ 'aspect-btn--active': modelValue === opt.value }"
        :aria-checked="modelValue === opt.value"
        role="radio"
        @click="$emit('update:modelValue', opt.value)"
      >
        <!-- 比例预览图标（外框 + 内按比例的矩形） -->
        <span class="aspect-icon" aria-hidden="true">
          <span class="aspect-icon__inner" :style="innerBoxStyle(opt.value)"></span>
        </span>
        <span class="aspect-btn__label">{{ opt.label }}</span>
        <span class="aspect-btn__sub">{{ opt.sub }}</span>
      </button>
    </div>
  </section>
</template>

<script>
export const ASPECT_OPTS = [
  { value: '16:9', label: '16:9', sub: '1280*720' },
  { value: '9:16', label: '9:16', sub: '720*1280' },
  { value: '1:1',  label: '1:1',  sub: '960*960' },
  { value: '4:3',  label: '4:3',  sub: '1088*832' },
  { value: '3:4',  label: '3:4',  sub: '832*1088' }
]

// 按比例计算预览内框占比（外框：15×18 = 原 30×36 的一半 —— 按用户要求等比缩小一半）
const OUTER_W = 15, OUTER_H = 18
function innerBoxStyle(value) {
  const [w, h] = value.split(':').map(n => parseInt(n, 10))
  const ratio = w / h
  let iw, ih
  if (ratio >= OUTER_W / OUTER_H) {
    iw = OUTER_W; ih = Math.max(1, Math.round(OUTER_W / ratio))
  } else {
    ih = OUTER_H; iw = Math.max(1, Math.round(OUTER_H * ratio))
  }
  return { width: `${iw}px`, height: `${ih}px` }
}
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '16:9',
    validator: (v) => ASPECT_OPTS.some(o => o.value === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.ty-aspect {
  width: 100%;
  box-sizing: border-box;
  padding: 4px 0 6px;
}

.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  /* ⭐ fallback 深色白；浅色由 --text-primary 覆盖=黑 */
  color: var(--text-primary, #ffffff);
  margin-bottom: 12px;
}
.title-emoji { font-size: 14px; line-height: 1; }
.panel-title__text { flex: 0 0 auto; }

/* 5 × 62.2 + 4 × 11.25 = 311 + 45 = 356 */
.aspect-grid {
  display: grid;
  grid-template-columns: repeat(5, 62.2px);
  gap: 11.25px;
  width: 356px;
  box-sizing: border-box;
}

.aspect-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 62.2px;
  height: 76px;
  border-radius: 6px;
  /* ⭐ fallback 深色优先 */
  border: 1px solid var(--border-base, #1e1e1e);
  background: var(--bg-elevated-2, #1e1e1e);
  /* ⭐ 补 color：未选中按钮字色接入主题 */
  color: var(--text-primary, #ffffff);
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 3px;
  padding: 8px 4px;
  box-sizing: border-box;
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
  user-select: none;
}
.aspect-btn:hover { background: var(--bg-elevated-3, #242424); }
.aspect-btn:active { transform: scale(0.99); }

/* 全部文字 12 号（用户要求：内外部文字大小为 12）；字色显式接入主题 */
.aspect-btn__label { font-size: 12px; font-weight: 600; line-height: 1.2; color: inherit; }
.aspect-btn__sub   { font-size: 12px; font-weight: 400; line-height: 1.2; color: inherit; opacity: 0.9; }

/* 比例预览图标外框：15×18（原 30×36 等比缩小一半） */
.aspect-icon {
  width: 15px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
  flex: 0 0 auto;
}
.aspect-icon__inner {
  border: 1px solid currentColor;
  border-radius: 1px;
  background: transparent;
  opacity: 0.8;
  box-sizing: border-box;
}

.aspect-btn--active {
  background: #FE2C55;
  border-color: #FE2C55;
  color: #fff;
}
.aspect-btn--active .aspect-btn__label { color: #fff; }
.aspect-btn--active .aspect-btn__sub   { color: rgba(255,255,255,0.92); }
.aspect-btn--active .aspect-icon__inner { border-color: #fff; opacity: 0.95; }

/* 窄屏(≤1000)单列：容器原 width:356px 锁死 + 5×62.2 + 4×11.25 = 356px，
   手机内宽只有 343，整体向右溢出 13px 导致最右「9:16/16:9」被微裁 */
@media (max-width: 999.98px) {
  .aspect-grid { width: 100%; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px; }
  .aspect-btn { width: 100%; }
}
@media (max-width: 767.98px) {
  .aspect-btn { height: 68px; }
}
</style>
