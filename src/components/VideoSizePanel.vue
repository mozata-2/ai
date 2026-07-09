<template>
  <section class="video-size">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="size-title__icon">
        <path d="M2 21 L15 8 M2 21 L22 21 L9 8 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M5.5 18 L7.5 18 M9 14.5 L11 14.5 M12.5 11 L14.5 11 M16 18 L16 20" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
      <span class="panel-title__text">视频尺寸</span>
    </div>

    <div class="size-grid" role="radiogroup" :aria-label="'视频尺寸选择，当前' + sizeLabels[modelValue]">
      <button
        v-for="opt in SIZE_OPTS"
        :key="opt.key"
        type="button"
        class="size-btn"
        :class="{ 'size-btn--active': modelValue === opt.key }"
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
export const SIZE_OPTS = [
  { key: 'auto', label: 'Auto' },
  { key: '720p', label: '720P' },
  { key: '1080p', label: '1080P' },
  { key: '4k', label: '4K' }
]
export const sizeLabels = {
  auto: '自动',
  '720p': '720P',
  '1080p': '1080P',
  '4k': '4K'
}
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'auto',
    validator: (v) => SIZE_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.video-size {
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
.size-title__icon { color: var(--text-secondary, #C9CDD4); flex: 0 0 auto; }
.panel-title__text { flex: 0 0 auto; }

.size-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 10px 14px;
  width: 100%;
}
.size-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: var(--bg-elevated-2, #26272B);
  color: var(--text-primary, #E5EAF3);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    transform 120ms ease;
  user-select: none;
}
.size-btn:hover {
  background: var(--bg-elevated-3, #2D2F34);
  border-color: var(--border-strong, rgba(255,255,255,0.14));
}
.size-btn:active { transform: scale(0.98); }

.size-btn--active {
  background: #;
  border-color: rgba(255,255,255,0.12);
  color: #;
}
.size-btn--active:hover {
  filter: brightness(1.05);
}
</style>
