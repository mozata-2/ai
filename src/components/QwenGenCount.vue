<template>
  <section class="qwen-gen-count">
    <div class="panel-title">
      <span class="title-emoji" aria-hidden="true">🔢</span>
      <span class="panel-title__text">生成数量</span>
    </div>

    <div
      class="count-row"
      role="radiogroup"
      :aria-label="'生成数量，当前' + modelValue"
    >
      <button
        v-for="n in COUNT_OPTS"
        :key="n"
        type="button"
        class="count-btn"
        :class="{ 'count-btn--active': modelValue === n }"
        :aria-checked="modelValue === n"
        role="radio"
        @click="$emit('update:modelValue', n)"
      >
        {{ n }}
      </button>
    </div>
  </section>
</template>

<script>
export const COUNT_OPTS = [1, 2, 3, 4, 5, 6]
</script>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    default: 1,
    validator: (v) => COUNT_OPTS.includes(v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.qwen-gen-count {
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

/* 6 个按钮一行：单按钮 50×36，字号 14，圆角 6 */
.count-row {
  display: grid;
  grid-template-columns: repeat(6, 50px);   /* 每列 50 宽 */
  gap: 8px;                                  /* 按钮之间留间隙 */
  width: 100%;
  padding: 0;
  border-radius: 0;
  background: transparent;
  border: none;
  box-sizing: border-box;
  justify-content: flex-start;
}
.count-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 50px;                    /* ⭐ 固定宽 50 */
  height: 36px;                   /* ⭐ 固定高 36 */
  border: none;
  background: transparent;
  color: var(--text-primary, #E5EAF3);
  font-size: 14px;                /* ⭐ 字号 14 */
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;             /* ⭐ 圆角 6 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    transform 120ms ease;
  user-select: none;
  box-sizing: border-box;
}
.count-btn:hover { color: var(--text-primary); }
.count-btn:active { transform: scale(0.98); }

/* 选中：粉色方形圆角大按钮 */
.count-btn--active {
  background: #FE2C55;
  color: #FFFFFF;
}
.count-btn--active:hover { filter: brightness(1.05); }
</style>
