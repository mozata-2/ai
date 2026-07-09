<template>
  <section class="sr-aspect-panel">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" class="panel-title__icon">
        <path d="M3 21 L3 15 M3 21 L9 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M21 3 L21 9 M21 3 L15 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <rect x="6" y="6" width="12" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.7"/>
      </svg>
      <span class="panel-title__text">视频比例</span>
    </div>

    <div class="ratio-grid" role="radiogroup" aria-label="SR 视频比例选择">
      <button
        type="button"
        class="ratio-btn"
        :class="{ 'ratio-btn--active': modelValue === '9:16' }"
        role="radio"
        :aria-checked="modelValue === '9:16'"
        @click="$emit('update:modelValue', '9:16')"
      >
        <span class="ratio-btn__main">9:16</span>
        <span class="ratio-btn__sub">竖屏视频</span>
      </button>

      <button
        type="button"
        class="ratio-btn"
        :class="{ 'ratio-btn--active': modelValue === '16:9' }"
        role="radio"
        :aria-checked="modelValue === '16:9'"
        @click="$emit('update:modelValue', '16:9')"
      >
        <span class="ratio-btn__main">16:9</span>
        <span class="ratio-btn__sub">横屏视频</span>
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
.sr-aspect-panel {
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
  height: 56px;
  border-radius: 6px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: transparent;
  color: var(--text-primary, #E5EAF3);
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
}
.ratio-btn:active { transform: scale(0.98); }
.ratio-btn__main {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
}
.ratio-btn__sub {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.2;
  color: var(--text-secondary, #BFC4CC);
}

.ratio-btn--active {
  background: #FE2C55;
  border-color: #FE2C55;
  color: #fff;
}
.ratio-btn--active .ratio-btn__sub {
  color: rgba(255,255,255,0.85);
}
</style>
