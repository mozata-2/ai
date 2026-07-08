<template>
  <section class="gk-aspect-panel">
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
        <div class="aspect-btn__icon" :class="'aspect-btn__icon--' + opt.iconKey"></div>
        <span class="aspect-btn__label">{{ opt.label }}</span>
      </button>
    </div>
  </section>
</template>

<script>
export const ASPECT_OPTS = [
  { key: '9:16',  label: '9:16',  iconKey: '9-16' },
  { key: '16:9',  label: '16:9',  iconKey: '16-9' }
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
.gk-aspect-panel {
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

.aspect-grid {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.aspect-btn {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: var(--bg-elevated-2, #26272B);
  color: var(--text-primary, #E5EAF3);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  flex: 0 0 177.5px;
  width: 177.5px;
  height: 74px;
  padding: 8px 6px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  user-select: none;
  box-sizing: border-box;
}
.aspect-btn:active { transform: scale(0.985); }

.aspect-btn__icon {
  flex: 0 0 auto;
  background: #F2F6FC;
  border-radius: 2px;
}
.aspect-btn__icon--9-16 {
  width: 16px;
  height: 28px;
}
.aspect-btn__icon--16-9 {
  width: 28px;
  height: 16px;
}
.aspect-btn__label { line-height: 1.1; }

.aspect-btn--active {
  background: #FE2C55;
  border-color: rgba(255,255,255,0.12);
  color: #FFFFFF;
}
</style>
