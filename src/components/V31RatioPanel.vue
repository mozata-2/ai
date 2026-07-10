<template>
  <section class="v31-ratio-panel">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" class="panel-title__icon">
        <path d="M3 21 L3 15 M3 21 L9 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M21 3 L21 9 M21 3 L15 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <rect x="6" y="6" width="12" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.7"/>
      </svg>
      <span class="panel-title__text">宽高比</span>
    </div>

    <div class="ratio-grid" role="radiogroup" aria-label="V31 宽高比选择">
      <button
        type="button"
        class="ratio-btn"
        :class="{ 'ratio-btn--active': modelValue === '9:16' }"
        role="radio"
        :aria-checked="modelValue === '9:16'"
        @click="$emit('update:modelValue', '9:16')"
      >
        <svg viewBox="0 0 48 48" width="14" height="14" aria-hidden="true" class="ratio-btn__icon">
          <rect x="10" y="4" width="28" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="2.2"/>
          <circle cx="24" cy="41" r="1.6" fill="currentColor" opacity="0.7"/>
        </svg>
        <span class="ratio-btn__label">9:16 竖屏视频</span>
      </button>

      <button
        type="button"
        class="ratio-btn"
        :class="{ 'ratio-btn--active': modelValue === '16:9' }"
        role="radio"
        :aria-checked="modelValue === '16:9'"
        @click="$emit('update:modelValue', '16:9')"
      >
        <svg viewBox="0 0 48 48" width="14" height="14" aria-hidden="true" class="ratio-btn__icon">
          <rect x="4" y="10" width="40" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="2.2"/>
        </svg>
        <span class="ratio-btn__label">16:9 横屏视频</span>
      </button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '9:16',
    validator: (v) => v === '9:16' || v === '16:9'
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.v31-ratio-panel {
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
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 12px;
}
.panel-title__icon { color: var(--text-secondary, #C9CDD4); width: 14px; height: 14px; flex: 0 0 14px; }

.ratio-grid {
  display: grid;
  grid-template-columns: repeat(2, 173.5px);
  gap: 10px;
  width: 100%;
  justify-content: flex-start;
}
.ratio-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 173.5px;
  flex: 0 0 173.5px;
  height: 52px;
  border-radius: 6px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: transparent;
  color: var(--text-primary, #E5EAF3);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 0 14px;
  user-select: none;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 500;
}
.ratio-btn:active { transform: scale(0.98); }
.ratio-btn__icon {
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
  color: currentColor;
}
.ratio-btn__label {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  text-align: left;
}

.ratio-btn--active {
  background: #FE2C55;
  border-color: #FE2C55;
  color: #fff;
}

/* 窄屏(≤1000)单列：2×173.5 + 10 = 357px > 手机内宽 343，右边被微裁 */
@media (max-width: 999.98px) {
  .ratio-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
  .ratio-btn { flex: 0 0 auto; width: 100%; }
}
@media (max-width: 767.98px) {
  .ratio-btn { height: 48px; padding: 0 10px; }
}
</style>
