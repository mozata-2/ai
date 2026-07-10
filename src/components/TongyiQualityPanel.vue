<template>
  <section class="ty-quality">
    <div class="panel-title">
      <span class="title-emoji" aria-hidden="true">🎥</span>
      <span class="panel-title__text">清晰度</span>
    </div>

    <div class="seg-row" role="radiogroup" :aria-label="'清晰度选择，当前' + modelValue">
      <button
        v-for="opt in QUALITY_OPTS"
        :key="opt.value"
        type="button"
        class="seg-btn"
        :class="{ 'seg-btn--active': modelValue === opt.value }"
        :aria-checked="modelValue === opt.value"
        role="radio"
        @click="$emit('update:modelValue', opt.value)"
      >
        <span class="seg-btn__title">{{ opt.title }}</span>
        <span class="seg-btn__sub">{{ opt.sub }}</span>
      </button>
    </div>
  </section>
</template>

<script>
export const QUALITY_OPTS = [
  { value: '720p',  title: '720P',  sub: '标准清晰度' },
  { value: '1080p', title: '1080P', sub: '高清画质' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '720p',
    validator: (v) => QUALITY_OPTS.some(o => o.value === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.ty-quality {
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

/* 2 × 173.5 + gap 9 = 356 */
.seg-row {
  display: grid;
  grid-template-columns: repeat(2, 173.5px);
  gap: 9px;
  width: 356px;
  box-sizing: border-box;
}

.seg-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 173.5px;
  height: 56px;
  border-radius: 6px;
  /* ⭐ fallback 深色优先 */
  border: 1px solid var(--border-base, #1e1e1e);
  background: var(--bg-elevated-2, #1e1e1e);
  /* ⭐ 补 color：未选中按钮深色=白/浅字；浅色=黑 */
  color: var(--text-primary, #ffffff);
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 6px 10px;
  box-sizing: border-box;
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
  user-select: none;
}
.seg-btn:hover { background: var(--bg-elevated-3, #242424); }
.seg-btn:active { transform: scale(0.99); }
/* ⭐ 子文字显式接 color，防止默认 inherit=黑 */
.seg-btn__title { font-size: 14px; font-weight: 600; line-height: 1.2; color: inherit; }
.seg-btn__sub   { font-size: 12px; font-weight: 400; line-height: 1.2; color: inherit; opacity: 0.92; }

.seg-btn--active {
  background: #FE2C55;
  border-color: #FE2C55;
  color: #fff;
}
.seg-btn--active .seg-btn__title { color: #fff; }
.seg-btn--active .seg-btn__sub   { color: rgba(255,255,255,0.92); }

/* 窄屏(≤1000)单列：容器原 width:356px 锁死 + 2×173.5 + gap9 = 356，向右溢出 13px */
@media (max-width: 999.98px) {
  .seg-row { width: 100%; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
  .seg-btn { width: 100%; }
}
@media (max-width: 767.98px) {
  .seg-btn { height: 52px; }
}
</style>
