<template>
  <section class="banana-aspect">
    <!-- 标题：📐 图片比例（3 行共 14 个选项：5+5+4） -->
    <div class="panel-title">
      <span class="title-emoji" aria-hidden="true">📐</span>
      <span class="panel-title__text">图片比例</span>
    </div>

    <div class="ratio-grid">
      <button
        v-for="opt in allOptions"
        :key="opt.value"
        type="button"
        class="ratio-btn"
        :class="{ 'ratio-btn--active': modelValue === opt.value }"
        :aria-checked="modelValue === opt.value"
        role="radio"
        @click="$emit('update:modelValue', opt.value)"
      >
        <span class="ratio-box" aria-hidden="true">
          <span class="ratio-box__inner" :style="ratioStyle(opt.value)"></span>
        </span>
        <span class="ratio-label">{{ opt.label }}</span>
      </button>
    </div>
  </section>
</template>

<script>
// 3 行共 14 个比例，严格对齐截图顺序：5+5+4
const ROWS = [
  [
    { value: '1:1',  label: '1:1' },
    { value: '4:3',  label: '4:3' },
    { value: '3:4',  label: '3:4' },
    { value: '16:9', label: '16:9' },
    { value: '9:16', label: '9:16' }
  ],
  [
    { value: '2:3',  label: '2:3' },
    { value: '3:2',  label: '3:2' },
    { value: '4:5',  label: '4:5' },
    { value: '5:4',  label: '5:4' },
    { value: '21:9', label: '21:9' }
  ],
  [
    { value: '1:4',  label: '1:4' },
    { value: '4:1',  label: '4:1' },
    { value: '1:8',  label: '1:8' },
    { value: '8:1',  label: '8:1' }
  ]
]
export const allOptions = ROWS.flat()
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '1:1',
    validator: (v) => allOptions.some(o => o.value === v)
  }
})
defineEmits(['update:modelValue'])

// 缩略图：按比例在 36×36 容器中居中显示的矩形
function ratioStyle(value) {
  const [w, h] = value.split(':').map(Number)
  const boxSize = 36                 // 缩略图容器 36×36
  const maxInner = 28                // 内部矩形最大边 28
  const scale = maxInner / Math.max(w, h)
  return {
    width:  Math.round(w * scale) + 'px',
    height: Math.round(h * scale) + 'px'
  }
}
</script>

<style scoped>
.banana-aspect { width: 100%; box-sizing: border-box; padding: 10px 0; }
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 14px;
}
.title-emoji { font-size: 16px; }

/* 3 行网格：5+5+4，单按钮 62.2×68，圆角 6，字号 12，未选中隐藏比例字（用户指定） */
.ratio-grid {
  display: grid;
  grid-template-columns: repeat(5, 62.2px);
  column-gap: 16px;
  row-gap: 20px;
  justify-content: flex-start;
}

.ratio-btn {
  width: 62.2px;                 /* ⭐ 固定宽 62.2 */
  height: 68px;                  /* ⭐ 固定高 68 */
  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: transparent;       /* ⭐ 未选中：无背景 */
  cursor: pointer;
  border-radius: 6px;            /* ⭐ 圆角 6 */
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;                      /* 图标 → 文字 4 */
  color: #6B7280;
  min-width: 0;
  box-sizing: border-box;
  padding: 4px 0;
}
.ratio-box {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}
.ratio-box__inner {
  border-radius: 4px;
  background: #F2F6FC;           /* 浅灰矩形（截图里 4:3 的样式） */
}
.ratio-label {
  font-size: 12px;               /* ⭐ 字号 12 */
  font-weight: 400;              /* ⭐ 取消加粗 */
  line-height: 1.2;
  color: #4B5563;
  text-align: center;
  display: block;                /* ⭐ 不管选中不选中都显示（用户纠正） */
  flex: 0 0 auto;
}

/* 选中态：整卡 #FE2C55 填充 + 比例字变白（图标样式保持不变，用户要求） */
.ratio-btn--active {
  background: #FE2C55;
  color: #FFFFFF;
}
.ratio-btn--active .ratio-label {
  color: #FFFFFF;                 /* ⭐ 选中：只改比例字为白，图标不改 */
}
</style>
