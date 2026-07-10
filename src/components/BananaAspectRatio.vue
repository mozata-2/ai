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

// 缩略图：按比例在 24×24 容器中居中显示的矩形（用户要求不动按钮只缩比例框三分之一）
function ratioStyle(value) {
  const [w, h] = value.split(':').map(Number)
  const boxSize = 24                 // 比例框 24×24（原36缩三分之一）
  const maxInner = 18                // 内部矩形最大边 18（原28同比例缩）
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
  /* ⭐ 对齐 Qwen：14px / 600 字重；颜色接入主题 */
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 12px;
}
.title-emoji {
  /* ⭐ 对齐 Qwen：15px，独立行高 */
  font-size: 15px;
  line-height: 1;
  flex: 0 0 auto;
}
.panel-title__text { flex: 0 0 auto; }

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
  /* ⭐ 对齐 Qwen：1px 描边 + 接入主题的字色，默认无背景 */
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: transparent;
  color: var(--text-primary, #E5EAF3);
  cursor: pointer;
  border-radius: 6px;            /* ⭐ 圆角 6 */
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;                      /* 图标 → 文字 4 */
  min-width: 0;
  box-sizing: border-box;
  padding: 4px 0;
  /* ⭐ 对齐 Qwen：过渡动画 */
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    transform 120ms ease;
}
.ratio-btn:hover {
  /* ⭐ 对齐 Qwen：hover 背景 + 加粗描边 */
  background: var(--bg-elevated-2, #26272B);
  border-color: var(--border-strong, rgba(255,255,255,0.14));
}
.ratio-btn:active { transform: scale(0.98); }  /* ⭐ 对齐 Qwen：按压缩放 */

.ratio-box {
  width: 24px;                   /* 比例框 24×24（原36缩三分之一） */
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}
.ratio-box__inner {
  border-radius: 4px;
  /* ⭐ 对齐 Qwen（SVG fill）：未选中态 半透明灰，接入主题变量让深浅主题同步 */
  background: var(--ratio-icon-fill, rgba(148,163,184,0.20));
}
.ratio-label {
  /* ⭐ 对齐 Qwen：12px / 600 粗；接入主题字色（不再硬编码 #1F2329） */
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  color: var(--text-primary, #E5EAF3);
  text-align: center;
  display: block;                /* ⭐ 不管选中不选中都显示（用户纠正） */
  flex: 0 0 auto;
}

/* 选中态：整卡 #FE2C55 填充 + 比例字变白 + 缩略图纯白（与 Qwen 选中 SVG fill=#FFFFFF 对齐） */
.ratio-btn--active {
  background: #FE2C55;
  color: #fff;
  border-color: #FE2C55;
}
.ratio-btn--active .ratio-label {
  color: #fff;                 /* ⭐ 选中：只改比例字为白，图标不改 */
}
.ratio-btn--active .ratio-box__inner {
  /* ⭐ 对齐 Qwen 选中态：缩略图纯白（原浅粉色 #FFB3C1） */
  background: #FFFFFF;
}
</style>
