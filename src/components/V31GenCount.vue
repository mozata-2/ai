<template>
  <section class="v31-gen-count">
    <!-- 上方浅色分割线 -->
    <div class="divider divider--top" aria-hidden="true"></div>

    <div class="panel-title">
      <span class="panel-title__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <rect x="5"  y="4"  width="6" height="6" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.7"/>
          <rect x="13" y="4"  width="6" height="6" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.7"/>
          <rect x="5"  y="14" width="6" height="6" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.7"/>
          <rect x="13" y="14" width="6" height="6" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.7"/>
        </svg>
      </span>
      <span class="panel-title__text">生成数量</span>
    </div>

    <div class="btn-row" role="radiogroup" :aria-label="'生成数量选择，当前' + modelValue + '条'">
      <button
        v-for="opt in COUNT_OPTS"
        :key="opt.value"
        type="button"
        class="count-btn"
        :class="{ 'count-btn--active': modelValue === opt.value }"
        role="radio"
        :aria-checked="modelValue === opt.value"
        @click="$emit('update:modelValue', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>

    <!-- 下方浅色分割线 -->
    <div class="divider divider--bottom" aria-hidden="true"></div>
  </section>
</template>

<script>
export const COUNT_OPTS = [
  { value: 1,  label: '1条' },
  { value: 3,  label: '3条' },
  { value: 5,  label: '5条' },
  { value: 10, label: '10条' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    default: 1,
    validator: (v) => COUNT_OPTS.some(o => o.value === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.v31-gen-count {
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* 浅灰色分割线 */
.divider {
  width: 100%;
  height: 1px;
  background: var(--divider, rgba(55, 58, 64, 0.9));
  border: none;
  flex: 0 0 auto;
}
.divider--top    { margin: 2px 0 14px; }
.divider--bottom { margin: 16px 0 2px;  }

.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 14px;
  flex: 0 0 auto;
}
.panel-title__icon {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  color: var(--text-secondary, #C9CDD4);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 4 按钮：和 Banana 生成数量布局一致 */
.btn-row {
  display: grid;
  grid-template-columns: repeat(4, 80.75px);
  gap: 12px;
  width: 100%;
  justify-content: flex-start;
}
.count-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 80.75px;
  flex: 0 0 80.75px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: transparent;
  color: var(--text-primary, #E5EAF3);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
}
.count-btn:active { transform: scale(0.99); }

.count-btn--active {
  background: #FE2C55;
  border-color: #FE2C55;
  color: #fff;
}

/* 窄屏(≤1000)单列：4×80.75 + 3×12 = 359px > 手机内宽 343，最右「4 条」被微裁 */
@media (max-width: 999.98px) {
  .btn-row { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; }
  .count-btn { flex: 0 0 auto; width: 100%; }
}
</style>
