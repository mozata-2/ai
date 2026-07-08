<template>
  <section class="qwen-model-version">
    <div class="panel-title">
      <span class="title-emoji" aria-hidden="true">🎯</span>
      <span class="panel-title__text">模型版本</span>
    </div>

    <div
      class="seg-row"
      role="radiogroup"
      :aria-label="'Qwen 模型版本，当前' + modelValue"
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
        {{ opt.label }}
      </button>
    </div>
  </section>
</template>

<script>
export const VERSION_OPTS = [
  { key: 'wan2.7',      label: 'wan2.7' },
  { key: 'wan2.7-pro',  label: 'wan2.7 Pro' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'wan2.7',
    validator: (v) => VERSION_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.qwen-model-version {
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

/* 2 等分分段控件：按钮固定 112×36，字号 14，圆角 6；外容器保持原有背景（不动逻辑） */
.seg-row {
  display: grid;
  grid-template-columns: repeat(2, 112px);   /* 两个按钮各 112px */
  gap: 4px;
  width: 360px;                 /* ⭐ 固定宽度 360px（保持原布局宽度，不动逻辑） */
  height: 44px;                 /* ⭐ 固定高度 44px */
  padding: 4px 8px;             /* 上下 4，左右 8，让按钮垂直居中于容器 */
  border-radius: 14px;
  background: var(--bg-elevated-2, #26272B);
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  box-sizing: border-box;
}
.seg-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 112px;                 /* ⭐ 按钮固定宽 112 */
  height: 36px;                 /* ⭐ 按钮固定高 36 */
  border: none;
  background: transparent;
  color: var(--text-primary, #E5EAF3);
  font-size: 12px;              /* ⭐ 字号 12 */
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;           /* ⭐ 圆角 6 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    transform 120ms ease;
  user-select: none;
}
.seg-btn:hover { color: var(--text-primary); }
.seg-btn:active { transform: scale(0.98); }

.seg-btn--active {
  background: #FE2C55;
  color: #FFFFFF;
}
.seg-btn--active:hover { filter: brightness(1.05); }
</style>
