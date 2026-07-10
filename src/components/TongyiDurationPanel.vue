<template>
  <section class="ty-duration">
    <div class="panel-title">
      <span class="title-emoji" aria-hidden="true">⏱️</span>
      <span class="panel-title__text">时长</span>
    </div>

    <div class="seg-row" role="radiogroup" :aria-label="'时长选择，当前' + modelValue">
      <button
        v-for="opt in DURATION_OPTS"
        :key="opt.value"
        type="button"
        class="seg-btn"
        :class="{ 'seg-btn--active': modelValue === opt.value }"
        :aria-checked="modelValue === opt.value"
        role="radio"
        @click="$emit('update:modelValue', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>
  </section>
</template>

<script>
export const DURATION_OPTS = [
  { value: 't5',  label: '5秒' },
  { value: 't10', label: '10秒' },
  { value: 't15', label: '15秒' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 't5',
    validator: (v) => DURATION_OPTS.some(o => o.value === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.ty-duration {
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
  /* ⭐ 强制：fallback 深色白；浅色由 --text-primary 覆盖=黑 */
  color: var(--text-primary, #ffffff) !important;
  margin-bottom: 12px;
}
.title-emoji { font-size: 14px; line-height: 1; }
.panel-title__text { flex: 0 0 auto; }

/* 3 × 111.66 + 2 × 10.51 = 334.98 + 21.02 = 356 */
.seg-row {
  display: grid;
  grid-template-columns: repeat(3, 111.66px);
  gap: 10.51px;
  width: 356px;
  box-sizing: border-box;
}

.seg-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 111.66px;
  height: 36px;
  border-radius: 6px;
  /* ⭐ fallback 深色优先，接主题变量 */
  border: 1px solid var(--border-base, #1e1e1e) !important;
  background: var(--bg-elevated-2, #1e1e1e) !important;
  /* ⭐ 显式写 color 并用 !important 防止 EP/浏览器 button 默认黑字覆盖 */
  color: var(--text-primary, #ffffff) !important;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  box-sizing: border-box;
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
  user-select: none;
}
.seg-btn:hover { background: var(--bg-elevated-3, #242424) !important; }
.seg-btn:active { transform: scale(0.99); }

.seg-btn--active {
  background: #FE2C55 !important;
  border-color: #FE2C55 !important;
  color: #fff !important;
  font-weight: 500;
}

/* 窄屏(≤1000)单列：容器原 width:356px 锁死 + 3×111.66 + 2×10.51 = 356，向右溢出 13px */
@media (max-width: 999.98px) {
  .seg-row { width: 100%; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
  .seg-btn { width: 100%; }
}
</style>
