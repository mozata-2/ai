<template>
  <section class="v31-model-select">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="panel-title__icon">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
        <path d="M2 8 L22 8" stroke="currentColor" stroke-width="1.4" opacity="0.55"/>
        <path d="M2 16 L22 16" stroke="currentColor" stroke-width="1.4" opacity="0.55"/>
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
  color: #;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
}

.model-grid {
  display: grid;
  grid-template-columns: repeat(3, 111.66px);
  gap: 10px;
  width: 100%;
  justify-content: flex-start;
}
.model-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 111.66px;
  flex: 0 0 111.66px;
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
  gap: 4px;
  padding: 0 6px;
  user-select: none;
  box-sizing: border-box;
}
.model-btn:active { transform: scale(0.98); }
.model-btn__name {
  font-size: 14px;
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
  border-color: #FE2C55;
  color: #fff;
}
.model-btn--active .model-btn__sub { color: rgba(255,255,255,0.88); }
</style>
