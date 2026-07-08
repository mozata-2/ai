﻿<template>
  <section class="video-aspect-panel">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="panel-title__icon">
        <path d="M2 4 L22 4 L22 20 L2 20 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M9 8 L15 8 L15 16 L9 16 Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" opacity="0.6"/>
      </svg>
      <span class="panel-title__text">视频比例</span>
    </div>

    <div class="aspect-grid" role="radiogroup" :aria-label="'视频比例选择，当前' + modelValue">
      <button
        v-for="opt in ASPECT_OPTS"
        :key="opt.key"
        type="button"
        class="aspect-btn"
        :class="{ 'aspect-btn--active': modelValue === opt.key }"
        :aria-checked="modelValue === opt.key"
        role="radio"
        @click="$emit('update:modelValue', opt.key)"
      >
        <span class="aspect-btn__label">{{ opt.label }}</span>
        <span class="aspect-btn__sub">{{ opt.sub }}</span>
      </button>
    </div>
  </section>
</template>

<script>
export const ASPECT_OPTS = [
  { key: '9:16',  label: '9:16',  sub: '竖屏' },
  { key: '16:9',  label: '16:9',  sub: '横屏' },
  { key: '1:1',   label: '1:1',   sub: '方屏' },
  { key: '4:3',   label: '4:3',   sub: '' },
  { key: '3:4',   label: '3:4',   sub: '' },
  { key: '21:9',  label: '21:9',  sub: '宽银幕' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '9:16',
    validator: (v) => ASPECT_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.video-aspect-panel {
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
  margin-bottom: 14px;
}
.panel-title__icon { color: var(--text-secondary, #C9CDD4); flex: 0 0 auto; }
.panel-title__text { flex: 0 0 auto; }

.aspect-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 10px;
  width: 100%;
}
.aspect-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  min-height: 56px;
  border-radius: 12px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: var(--bg-elevated-2, #26272B);
  color: var(--text-primary, #E5EAF3);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 6px;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    transform 120ms ease;
  user-select: none;
  box-sizing: border-box;
}
.aspect-btn:hover {
  background: var(--bg-elevated-3, #2D2F34);
  border-color: var(--border-strong, rgba(255,255,255,0.14));
}
.aspect-btn:active { transform: scale(0.98); }
.aspect-btn__label { font-size: 15px; font-weight: 700; line-height: 1.1; }
.aspect-btn__sub {
  font-size: 11px;
  font-weight: 400;
  color: var(--text-faint, #8B93A0);
  line-height: 1;
  opacity: 0.85;
}

.aspect-btn--active {
  background: #FE2C55;
  border-color: rgba(255,255,255,0.12);
  color: #FFFFFF;
}
.aspect-btn--active:hover { filter: brightness(1.05); }
.aspect-btn--active .aspect-btn__sub { color: rgba(255,255,255,0.85); }
</style>
