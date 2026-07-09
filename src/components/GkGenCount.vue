<template>
  <section class="gk-gen-count">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="panel-title__icon">
        <path d="M4 6 H20 M4 12 H20 M4 18 H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <rect x="3" y="4" width="18" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.3"/>
        <rect x="3" y="10" width="18" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.3"/>
        <rect x="3" y="16" width="18" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.3"/>
      </svg>
      <span class="panel-title__text">生成数量</span>
    </div>

    <div class="count-row" role="radiogroup" :aria-label="'生成数量选择，当前' + modelValue">
      <button
        v-for="opt in COUNT_OPTS"
        :key="opt.key"
        type="button"
        class="count-btn"
        :class="{ 'count-btn--active': modelValue === opt.key }"
        :aria-checked="modelValue === opt.key"
        role="radio"
        @click="$emit('update:modelValue', opt.key)"
      >
        {{ opt.label }}
      </button>
    </div>
  </section>
</template>

<script>
export const COUNT_OPTS = [
  { key: '1', label: '1条' },
  { key: '2', label: '2条' },
  { key: '3', label: '3条' },
  { key: '4', label: '4条' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '1',
    validator: (v) => COUNT_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.gk-gen-count {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 6px;                   /* ⭐ 左右补 6px → 与 GkHeadPanel 标题对齐 */
  background: transparent;
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 400;
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 14px;
}
.panel-title__icon { color: var(--text-secondary, #C9CDD4); flex: 0 0 auto; }
.panel-title__text { flex: 0 0 auto; }

.count-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
}
.count-btn {
  appearance: none;
  -webkit-appearance: none;
  flex: 0 0 82.75px;
  width: 82.75px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: transparent;
  color: var(--text-primary, #E5EAF3);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  box-sizing: border-box;
}
.count-btn:active { transform: scale(0.98); }

.count-btn--active {
  background: #FE2C55;
  border-color: #FE2C55;
  color: #fff;
}
</style>
