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
    default: 'text2video',
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
/* tabs容器：连在一起的浅灰背景 —— 缩紧padding/gap，整体背景缩小更紧凑 */
.tabs-row {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 359px;
  padding: 4px;
  border-radius: 10px;
  background: var(--bg-elevated-1, #ebecee7b);
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  box-sizing: border-box;
  flex: 0 0 auto;
}
.tab-btn {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: transparent;
  color: var(--text-secondary, #4B5563);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  /* 取消固定宽度：每个按钮根据文字内容自适应 + 左右padding相等 → 视觉平均 */
  width: 111px;
  height: 36px;
  flex: 0 0 auto;
  padding: 0 18px;
  min-width: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background-color 160ms ease, color 160ms ease;
  user-select: none;
  box-sizing: border-box;
  white-space: nowrap;
}
.tab-btn--active {
  background: #FE2C55;
  color: #fff;
  border-color: #FE2C55;
}
</style>
