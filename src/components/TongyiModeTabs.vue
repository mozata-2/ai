<template>
  <section class="ty-mode-tabs">
    <div
      class="seg-row"
      role="radiogroup"
      :aria-label="'通义生成模式选择，当前' + modelValue"
    >
      <button
        v-for="opt in MODE_OPTS"
        :key="opt.value"
        type="button"
        class="seg-btn"
        :class="{ 'seg-btn--active': modelValue === opt.value }"
        :aria-checked="modelValue === opt.value"
        role="radio"
        @click="$emit('update:modelValue', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>
  </section>
</template>

<script>
export const MODE_OPTS = [
  { value: 'txt2video', label: '文生视频' },
  { value: 'img2video', label: '图生视频' },
  { value: 'faceswap',  label: '视频换人' },
  { value: 'animate',   label: '图生动作' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'txt2video',
    validator: (v) => MODE_OPTS.some(o => o.value === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.ty-mode-tabs { width: 100%; box-sizing: border-box; padding: 2px 0 8px; }

/* 4×81.75 按钮 + 3×9.67 gap = 327 + 29.01 = 356.01 ≈ 356（用户精确要求：单按钮 81.75×36） */
.seg-row {
  display: grid;
  grid-template-columns: repeat(4, 81.75px);
  gap: 9.67px;
  width: 356px;
  height: 36px;
  padding: 0;
  border-radius: 6px;
  box-sizing: border-box;
}

.seg-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 81.75px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: var(--bg-elevated-2, #F2F3F5);
  color: #;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  box-sizing: border-box;
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
  user-select: none;
}
.seg-btn:hover { background: var(--bg-elevated-3, #E9EAEC); }
.seg-btn:active { transform: scale(0.99); }

.seg-btn--active {
  background: #FE2C55;
  border-color: #FE2C55;
  color: #fff;
  font-weight: 500;
}
</style>
