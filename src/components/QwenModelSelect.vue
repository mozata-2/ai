<template>
  <section class="qwen-model-select">
    <div class="panel-title">
      <span class="title-emoji" aria-hidden="true">🤖</span>
      <span class="panel-title__text">模型选择</span>
    </div>

    <div
      class="seg-row"
      role="radiogroup"
      :aria-label="'Qwen 模型选择，当前' + modelValue"
    >
      <button
        v-for="opt in MODEL_OPTS"
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
export const MODEL_OPTS = [
  { key: 'wan2.7',   label: 'wan2.7' },
  { key: 'qwen2.0',  label: '千问2.0' },
  { key: 'z-image',  label: 'Z-Image' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'wan2.7',
    validator: (v) => MODEL_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.qwen-model-select {
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

/* 模型选择：整体 360×44，每个 tab 112×36，中间 gap 4px，字号 12px（仅调整此处样式，其它不动） */
.seg-row {
  display: grid;
  grid-template-columns: repeat(3, 112px);   /* ⭐ 3 个 tab 各 112px 宽 */
  gap: 4px;                                    /* ⭐ 中间间距 4px */
  width: 360px;                                /* ⭐ 整体宽 360 */
  height: 44px;                                /* ⭐ 整体高 44 */
  padding: 4px 8px;                            /* 上下各 4、左右各 8，3tab+2gap=344，居中占满 360 */
  border-radius: 6px;
  background: var(--bg-elevated-2, #26272B);
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  box-sizing: border-box;
}
.seg-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 112px;                                /* ⭐ tab 宽 112 */
  height: 36px;                                /* ⭐ tab 高 36 */
  border: none;
  background: transparent;
  color: var(--text-primary, #E5EAF3);
  font-size: 12px;                             /* ⭐ 字号 12 */
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
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
  color: #fff;
  border-color: #FE2C55;
}
</style>
