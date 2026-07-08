<template>
  <section class="gk-duration-panel">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="panel-title__icon">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/>
        <path d="M12 7 L12 12 L16 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
      <span class="panel-title__text">视频时长</span>
    </div>

    <div class="duration-grid" role="radiogroup" :aria-label="'视频时长选择，当前' + modelValue">
      <button
        v-for="opt in DURATION_OPTS"
        :key="opt.key"
        type="button"
        class="duration-btn"
        :class="{ 'duration-btn--active': modelValue === opt.key }"
        :aria-checked="modelValue === opt.key"
        role="radio"
        @click="$emit('update:modelValue', opt.key)"
      >
        <span class="duration-btn__main">{{ opt.main }}</span>
        <span class="duration-btn__sub">{{ opt.sub }}</span>
      </button>
    </div>
  </section>
</template>

<script>
export const DURATION_OPTS = [
  { key: '10s', main: '10 秒', sub: '标准' },
  { key: '15s', main: '15 秒', sub: '更长时长' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '10s',
    validator: (v) => DURATION_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.gk-duration-panel {
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

.duration-grid {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.duration-btn {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: var(--bg-elevated-2, #26272B);
  color: var(--text-primary, #E5EAF3);
  cursor: pointer;
  border-radius: 6px;
  flex: 0 0 177.5px;
  width: 177.5px;
  height: 56px;
  padding: 8px 6px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  user-select: none;
  box-sizing: border-box;
}
.duration-btn:active { transform: scale(0.985); }

.duration-btn__main {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
}
.duration-btn__sub {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.2;
  color: var(--text-faint, #8B93A0);
}

.duration-btn--active {
  background: #FE2C55;
  border-color: rgba(255,255,255,0.12);
  color: #FFFFFF;
}
.duration-btn--active .duration-btn__sub {
  color: rgba(255,255,255,0.82);
}
</style>
