<template>
  <section class="v31-mode-tabs">
    <div class="tabs-brand-row">
      <span class="tabs-brand-badge">微奥</span>
      <span class="tabs-title">视频生成</span>
    </div>
    <div class="tabs-subtitle">最新视频模型 · 队列模式 · 自动配音 · 智能优化</div>
    <div class="tabs-row" role="tablist" aria-label="V31 模式选择">
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
  { key: 'text2video', label: '文生视频' },
  { key: 'img2video',  label: '图生视频' },
  { key: 'ref2video',  label: '参考生视频' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'img2video',
    validator: (v) => MODE_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.v31-mode-tabs {
  width: 100%;
  box-sizing: border-box;
  padding: 14px 0 8px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.tabs-brand-row {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  flex: 0 0 auto;
}
.tabs-brand-badge {
  flex: 0 0 auto;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
  margin: 0;
  padding: 0;
}
.tabs-title {
  flex: 0 0 auto;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
  margin: 0;
  padding: 0;
}
.tabs-subtitle {
  width: 100%;
  font-size: 13px;
  color: var(--text-secondary, #BFC4CC);
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 14px;
  letter-spacing: 0.1px;
  transition: color var(--theme-dur, 200ms) var(--theme-ease, ease);
}
.tabs-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  width: 100%;
  padding: 5px;
  border-radius: 16px;
  background: var(--bg-elevated-2, #26272B);
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  box-sizing: border-box;
}
.tab-btn {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: transparent;
  color: var(--text-secondary, #BFC4CC);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 13px;
  height: 48px;
  padding: 8px 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background-color 160ms ease, color 160ms ease, transform 120ms ease;
  user-select: none;
}
.tab-btn:hover { color: var(--text-primary, #E5EAF3); }
.tab-btn:active { transform: scale(0.985); }

.tab-btn--active {
  background: #FE2C55;
  color: #FFFFFF;
}
.tab-btn--active:hover { filter: brightness(1.05); color: #FFFFFF; }
</style>
