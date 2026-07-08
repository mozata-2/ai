﻿<template>
  <section class="jimeng-version-toggle">
    <div class="panel-title">
      <span class="title-emoji" aria-hidden="true">🔄</span>
      <span class="panel-title__text">版本切换</span>
    </div>

    <div
      class="seg-row"
      role="radiogroup"
      :aria-label="'即梦版本切换，当前' + modelValue"
    >
      <button
        v-for="opt in VERSION_OPTS"
        :key="opt.key"
        type="button"
        class="seg-btn"
        :class="{ 'seg-btn--active': modelValue === opt.key }"
        :aria-checked="modelValue === opt.key"
        role="radio"
        @click="$emit('update:modelValue', opt.key)"
      >
        <span class="seg-btn__label">{{ opt.label }}</span>
        <span v-if="opt.badge" class="seg-btn__badge">{{ opt.badge }}</span>
      </button>
    </div>
  </section>
</template>

<script>
export const VERSION_OPTS = [
  { key: 'jimeng15', label: '即梦1.5', badge: '' },
  { key: 'jimeng20', label: '即梦2.0', badge: 'HOT' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'jimeng15',
    validator: (v) => VERSION_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.jimeng-version-toggle {
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
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
}
.seg-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 48px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: var(--bg-elevated-2, #26272B);
  color: var(--text-primary, #E5EAF3);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    transform 120ms ease,
    border-color 160ms ease;
  user-select: none;
  position: relative;
}
.seg-btn:hover {
  border-color: var(--border-strong, rgba(255,255,255,0.14));
  background: var(--bg-elevated-3, #2D2F34);
}
.seg-btn:active { transform: scale(0.98); }
.seg-btn__label { flex: 0 0 auto; }
.seg-btn__badge {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  padding: 0 7px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 9px;
  background: #FE2C55;
  color: #FFFFFF;
  letter-spacing: 0.3px;
  flex: 0 0 auto;
}

.seg-btn--active {
  background: #FE2C55;
  border-color: rgba(255,255,255,0.12);
  color: #FFFFFF;
}
.seg-btn--active:hover { filter: brightness(1.05); }
.seg-btn--active .seg-btn__badge {
  background: rgba(255,255,255,0.22);
  color: #FFFFFF;
}
</style>
