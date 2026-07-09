<template>
  <section class="banana-model-select">
    <!-- 无独立标题，直接三段式选择栏：Banana 2(选中态粉红) / Banana Pro / Banana -->
    <div
      class="seg-row"
      role="radiogroup"
      aria-label="香蕉作图模型选择"
    >
      <button
        v-for="opt in MODEL_OPTS"
        :key="opt.key"
        type="button"
        class="seg-btn"
        :class="{ 'seg-btn--active': modelValue === opt.key }"
        :aria-checked="modelValue === opt.key"
        role="radio"
        @click="$emit('update:modelValue', opt.key)"
      >
        <span class="seg-btn__icon" aria-hidden="true">🍌</span>
        <span class="seg-btn__label">{{ opt.label }}</span>
      </button>
    </div>
  </section>
</template>

<script>
export const MODEL_OPTS = [
  { key: 'banana2',    label: 'Banana 2' },
  { key: 'banana-pro', label: 'Banana Pro' },
  { key: 'banana',     label: 'Banana' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'banana2',
    validator: (v) => MODEL_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.banana-model-select {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 0 8px;
}
/* 3 段选择：单按钮 111.66×36，圆角 6px，字号 12，取消加粗（用户指定） */
.seg-row {
  display: grid;
  grid-template-columns: repeat(3, 111.66px);
  gap: 0;
  width: 100%;
  padding: 4px;
  border-radius: 12px;
  background: var(--bg-elevated-2, #26272B);
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  box-sizing: border-box;
  justify-content: flex-start;
}
.seg-btn {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: transparent;
  color: var(--text-primary, #E5EAF3);
  font-size: 12px;              /* ⭐ 字号 12 */
  font-weight: 400;             /* ⭐ 取消加粗 */
  cursor: pointer;
  border-radius: 6px;           /* ⭐ 圆角 6 */
  width: 111.66px;              /* ⭐ 固定宽 111.66 */
  height: 36px;                 /* ⭐ 固定高 36 */
  padding: 0 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background-color 160ms ease, color 160ms ease, transform 120ms ease;
  user-select: none;
  box-sizing: border-box;
}
.seg-btn__icon { font-size: 14px; line-height: 1; }
.seg-btn__label { white-space: nowrap; }
.seg-btn:hover { color: var(--text-primary); }
.seg-btn:active { transform: scale(0.985); }

.seg-btn--active {
  background: #FE2C55;
  color: #fff;
  border-color: #FE2C55;
}
</style>
