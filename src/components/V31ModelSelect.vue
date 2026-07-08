﻿<template>
  <section class="v31-model-select">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="panel-title__icon">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
        <path d="M2 8 L22 8" stroke="currentColor" stroke-width="1.4" opacity="0.55"/>
        <path d="M2 16 L22 16" stroke="currentColor" stroke-width="1.4" opacity="0.55"/>
        <path d="M6 4 L6 2 M10 4 L10 2 M14 4 L14 2 M18 4 L18 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity="0.75"/>
        <path d="M6 22 L6 20 M10 22 L10 20 M14 22 L14 20 M18 22 L18 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity="0.75"/>
      </svg>
      <span class="panel-title__text">模型</span>
      <span class="panel-title__badge">当前：{{ badgeText }}</span>
    </div>

    <div class="model-grid" role="radiogroup" aria-label="V31 模型选择">
      <button
        v-for="opt in MODEL_OPTS"
        :key="opt.key"
        type="button"
        class="model-btn"
        :class="{ 'model-btn--active': modelValue === opt.key }"
        role="radio"
        :aria-checked="modelValue === opt.key"
        @click="$emit('update:modelValue', opt.key)"
      >
        <span class="model-btn__name">{{ opt.name }}</span>
        <span class="model-btn__sub">{{ opt.sub }}</span>
      </button>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'

export const MODEL_OPTS = [
  { key: 'fast',     name: '快速模式', sub: '快速生成' },
  { key: 'standard', name: '标准模式', sub: '平衡质量' },
  { key: 'quality',  name: '质量模式', sub: '超高质量' }
]

const BADGE_MAP = {
  fast:     'veo3.1-fast',
  standard: 'veo3.1',
  quality:  'veo3.1-pro'
}
</script>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: 'fast',
    validator: (v) => MODEL_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])

const badgeText = computed(() => BADGE_MAP[props.modelValue] || '')
</script>

<style scoped>
.v31-model-select {
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
  width: 100%;
}
.panel-title__icon { color: var(--text-secondary, #C9CDD4); flex: 0 0 auto; }
.panel-title__text { flex: 0 0 auto; }
.panel-title__badge {
  margin-left: auto;
  flex: 0 0 auto;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255,107,138,0.14);
  color: #FE2C55;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
}

.model-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
}
.model-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 64px;
  border-radius: 16px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: var(--bg-elevated-2, #26272B);
  color: var(--text-primary, #E5EAF3);
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 8px 6px;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    transform 120ms ease;
  user-select: none;
  box-sizing: border-box;
}
.model-btn:hover {
  background: var(--bg-elevated-3, #2D2F34);
  border-color: var(--border-strong, rgba(255,255,255,0.14));
}
.model-btn:active { transform: scale(0.98); }
.model-btn__name {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.1;
}
.model-btn__sub {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-faint, #8B93A0);
  line-height: 1;
  opacity: 0.85;
}

.model-btn--active {
  background: #FE2C55;
  border-color: rgba(255,255,255,0.12);
  color: #FFFFFF;
}
.model-btn--active:hover { filter: brightness(1.05); }
.model-btn--active .model-btn__sub { color: rgba(255,255,255,0.88); }
</style>
