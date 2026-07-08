﻿<template>
  <section class="tongyi-model-select">
    <div class="panel-title">
      <span class="title-emoji" aria-hidden="true">🤖</span>
      <span class="panel-title__text">模型选择</span>
    </div>

    <div
      class="seg-row"
      role="radiogroup"
      :aria-label="'通义模型选择，当前' + modelValue"
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
        {{ opt.label }}
      </button>
    </div>
  </section>
</template>

<script>
export const MODEL_OPTS = [
  { key: 'ty-turbo',    label: '通义Turbo 快' },
  { key: 'ty-standard', label: '通义标准版' },
  { key: 'ty-pro',      label: '通义Pro 高清' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'ty-standard',
    validator: (v) => MODEL_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.tongyi-model-select {
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
.title-emoji { font-size: 15px; line-height: 1; flex: 0 0 auto; }
.panel-title__text { flex: 0 0 auto; }

.seg-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
}
.seg-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 44px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: var(--bg-elevated-2, #26272B);
  color: var(--text-primary, #E5EAF3);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    transform 120ms ease,
    border-color 160ms ease;
  user-select: none;
}
.seg-btn:hover {
  border-color: var(--border-strong, rgba(255,255,255,0.14));
  background: var(--bg-elevated-3, #2D2F34);
}
.seg-btn:active { transform: scale(0.98); }

.seg-btn--active {
  background: #FE2C55;
  border-color: rgba(255,255,255,0.12);
  color: #FFFFFF;
}
.seg-btn--active:hover { filter: brightness(1.05); }
</style>
