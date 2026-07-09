<template>
  <section class="veo-duration-panel">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="panel-title__icon">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/>
        <path d="M12 7 L12 12 L16 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
      <span class="panel-title__text">视频时长</span>
    </div>

    <div class="dur-row" role="radiogroup" :aria-label="'时长选择，当前' + modelValue">
      <button
        v-for="opt in DUR_OPTS"
        :key="opt.key"
        type="button"
        class="dur-btn"
        :class="{ 'dur-btn--active': modelValue === opt.key }"
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
export const DUR_OPTS = [
  { key: '5s',  label: '5s' },
  { key: '10s', label: '10s' },
  { key: '30s', label: '30s' },
  { key: '60s', label: '60s' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '5s',
    validator: (v) => DUR_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.veo-duration-panel {
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

.dur-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
}
.dur-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: var(--bg-elevated-2, #26272B);
  color: var(--text-primary, #E5EAF3);
  font-size: 15px;
  font-weight: 700;
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
.dur-btn:hover {
  background: var(--bg-elevated-3, #2D2F34);
  border-color: var(--border-strong, rgba(255,255,255,0.14));
}
.dur-btn:active { transform: scale(0.98); }

.dur-btn--active {
  background: #FE2C55;
  border-color: #FE2C55;
  color: #fff;
}
</style>
