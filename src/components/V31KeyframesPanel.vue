<template>
  <section class="v31-keyframes-panel">
    <div class="panel-row">
      <div class="panel-title">
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="panel-title__icon">
          <path d="M4 7 H16 A2 2 0 0 1 18 9 V15 A2 2 0 0 1 16 17 H4 A2 2 0 0 1 2 15 V9 A2 2 0 0 1 4 7 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M18 11 L22 9 V15 L18 13 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          <circle cx="9" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
        </svg>
        <span class="panel-title__text">首尾帧设置</span>
      </div>

      <div class="toggle-group">
        <span class="toggle-label">首尾帧模式</span>
        <button
          type="button"
          class="toggle-switch"
          :class="{ 'toggle-switch--on': modelValue }"
          role="switch"
          :aria-checked="modelValue"
          @click="$emit('update:modelValue', !modelValue)"
        >
          <span class="toggle-switch__thumb"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.v31-keyframes-panel {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 0;
  background: transparent;
}
.panel-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
}
.panel-title__icon { color: var(--text-secondary, #C9CDD4); flex: 0 0 auto; }
.panel-title__text { flex: 0 0 auto; }

.toggle-group {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.toggle-label {
  font-size: 13px;
  color: var(--text-secondary, #BFC4CC);
  font-weight: 500;
  transition: color var(--theme-dur, 200ms) var(--theme-ease, ease);
}
.toggle-switch {
  appearance: none;
  -webkit-appearance: none;
  width: 50px;
  height: 28px;
  border: none;
  border-radius: 14px;
  background: var(--bg-elevated-3, #3A3C42);
  cursor: pointer;
  position: relative;
  padding: 0;
  transition:
    background-color 220ms ease;
  flex: 0 0 auto;
}
.toggle-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ffffff;
  transition:
    transform 220ms cubic-bezier(0.4, 0, 0.2, 1);
}
.toggle-switch--on {
  background: #FE2C55;
}
.toggle-switch--on .toggle-switch__thumb {
  transform: translateX(22px);
  background: #ffffff;
}
.toggle-switch:active { transform: scale(0.98); }
</style>
