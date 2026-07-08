<template>
  <section class="gk-mode-tabs">
    <div class="tabs-row" role="tablist" aria-label="GK 模式选择">
      <button
        v-for="opt in MODE_OPTS"
        :key="opt.key"
        type="button"
        class="tab-btn"
        :class="{ 'tab-btn--active': modelValue === opt.key }"
        role="tab"
        :aria-selected="modelValue === opt.key"
        @click="$emit('update:modelValue', opt.key)"
      >
        <span class="tab-btn__label">{{ opt.label }}</span>
      </button>
    </div>
  </section>
</template>

<script>
export const MODE_OPTS = [
  { key: 'g15', label: 'G1.5' },
  { key: 'classic', label: '经典模式' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'g15',
    validator: (v) => MODE_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.gk-mode-tabs {
  width: 100%;
  box-sizing: border-box;
  padding: 4px 0 8px;
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 0 0 auto;
  background: transparent;
}
.tabs-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
}
.tab-btn {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: var(--bg-elevated-2, #26272B);
  color: var(--text-secondary, #BFC4CC);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  flex: 0 0 175.5px;
  width: 175.5px;
  height: 36px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  user-select: none;
  box-sizing: border-box;
}
.tab-btn:active { transform: scale(0.985); }

.tab-btn--active {
  background: #FE2C55;
  border-color: rgba(255,255,255,0.12);
  color: #FFFFFF;
}
</style>
