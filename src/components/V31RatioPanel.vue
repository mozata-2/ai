<template>
  <section class="v31-ratio-panel">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="panel-title__icon">
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
        <svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true" class="ratio-btn__icon">
          <rect x="10" y="4" width="28" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="2.2"/>
          <circle cx="24" cy="41" r="1.6" fill="currentColor" opacity="0.7"/>
          <rect x="14" y="8" width="20" height="30" rx="1.5" fill="currentColor" opacity="0.12"/>
        </svg>
        <div class="ratio-btn__text">
          <span class="ratio-btn__label">9:16</span>
          <span class="ratio-btn__sub">竖屏视频</span>
        </div>
      </button>

      <button
        type="button"
        class="ratio-btn"
        :class="{ 'ratio-btn--active': modelValue === '16:9' }"
        role="radio"
        :aria-checked="modelValue === '16:9'"
        @click="$emit('update:modelValue', '16:9')"
      >
        <svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true" class="ratio-btn__icon">
          <rect x="4" y="10" width="40" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="2.2"/>
          <rect x="18" y="14" width="28" height="20" rx="1.5" fill="currentColor" opacity="0.12"/>
          <rect x="1" y="18" width="5" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="2" opacity="0.6"/>
        </svg>
        <div class="ratio-btn__text">
          <span class="ratio-btn__label">16:9 HD</span>
          <span class="ratio-btn__sub">横屏视频</span>
        </div>
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
.panel-title__icon { color: var(--text-secondary, #C9CDD4); }

.ratio-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
}
.ratio-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 76px;
  border-radius: 16px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: var(--bg-elevated-2, #26272B);
  color: var(--text-primary, #E5EAF3);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 12px 14px;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    transform 120ms ease;
  user-select: none;
  box-sizing: border-box;
}
.ratio-btn:hover {
  background: var(--bg-elevated-3, #2D2F34);
  border-color: var(--border-strong, rgba(255,255,255,0.14));
}
.ratio-btn:active { transform: scale(0.98); }
.ratio-btn__icon {
  flex: 0 0 auto;
  color: currentColor;
}
.ratio-btn__text {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
  text-align: left;
}
.ratio-btn__label {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.1;
}
.ratio-btn__sub {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-faint, #8B93A0);
  line-height: 1;
  opacity: 0.85;
}

.ratio-btn--active {
  background: #FE2C55;
  border-color: rgba(255,255,255,0.12);
  color: #FFFFFF;
}
.ratio-btn--active:hover { filter: brightness(1.05); }
.ratio-btn--active .ratio-btn__sub { color: rgba(255,255,255,0.88); }
</style>
