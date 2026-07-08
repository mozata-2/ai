<template>
  <section class="gk-gen-count">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="panel-title__icon">
        <rect x="3" y="4" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
        <rect x="14" y="4" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.6"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.4"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.2"/>
      </svg>
      <span class="panel-title__text">生成数量</span>
    </div>

    <div class="count-grid" role="radiogroup" :aria-label="'生成数量选择，当前' + modelValue">
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
  { key: '1',  label: '1 条' },
  { key: '3',  label: '3 条' },
  { key: '5',  label: '5 条' },
  { key: '10', label: '10 条' }
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
  padding: 12px 0;
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

.count-grid {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.count-btn {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: var(--bg-elevated-2, #26272B);
  color: var(--text-primary, #E5EAF3);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  flex: 0 0 82.75px;
  width: 82.75px;
  height: 36px;
  padding: 0 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  user-select: none;
  box-sizing: border-box;
}
.count-btn:active { transform: scale(0.985); }

.count-btn--active {
  background: #FE2C55;
  border-color: rgba(255,255,255,0.12);
  color: #FFFFFF;
}
</style>
