<template>
  <section class="sr-channel-panel">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" class="panel-title__icon">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/>
        <path d="M3 12 H21 M12 3 C15 7 15 17 12 21 M12 3 C9 7 9 17 12 21" stroke="currentColor" stroke-width="1.6" fill="none"/>
      </svg>
      <span class="panel-title__text">选择渠道</span>
    </div>

    <div class="channel-grid" role="radiogroup" aria-label="SR 渠道选择">
      <button
        type="button"
        class="channel-btn"
        :class="{ 'channel-btn--active': modelValue === 'sora1' }"
        role="radio"
        :aria-checked="modelValue === 'sora1'"
        @click="$emit('update:modelValue', 'sora1')"
      >
        <span>索拉 1.0</span>
      </button>

      <button
        type="button"
        class="channel-btn"
        :class="{ 'channel-btn--active': modelValue === 'sora2' }"
        role="radio"
        :aria-checked="modelValue === 'sora2'"
        @click="$emit('update:modelValue', 'sora2')"
      >
        <span>索拉 2.0</span>
      </button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'sora1',
    validator: (v) => v === 'sora1' || v === 'sora2'
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.sr-channel-panel {
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

.channel-grid {
  display: grid;
  grid-template-columns: repeat(2, 173.5px);
  gap: 10px;
  width: 100%;
  justify-content: flex-start;
}
.channel-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 173.5px;
  flex: 0 0 173.5px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: transparent;
  color: var(--text-primary, #E5EAF3);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
}
.channel-btn:active { transform: scale(0.98); }

.channel-btn--active {
  background: #FE2C55;
  border-color: #FE2C55;
  color: #fff;
}
</style>
