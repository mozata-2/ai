<template>
  <section class="qwen-aspect-ratio">
    <!-- 标题行：左（📐 图片比例） 右（自定义尺寸 + Switch） -->
    <div class="panel-title-row">
      <div class="panel-title">
        <span class="title-emoji" aria-hidden="true">📐</span>
        <span class="panel-title__text">图片比例</span>
      </div>

      <label class="custom-size-switch">
        <span class="custom-size__label">自定义尺寸</span>
        <button
          type="button"
          class="switch"
          role="switch"
          :aria-checked="customSize"
          @click="onToggleCustomSize"
        >
          <span class="switch__thumb"></span>
        </button>
      </label>
    </div>

    <!-- 10 个比例：5 x 2 网格 -->
    <div
      class="ratio-grid"
      role="radiogroup"
      :aria-label="'图片比例选择，当前' + modelValue"
    >
      <button
        v-for="opt in RATIO_OPTS"
        :key="opt.key"
        type="button"
        class="ratio-item"
        :class="{ 'ratio-item--active': modelValue === opt.key }"
        :aria-checked="modelValue === opt.key"
        role="radio"
        @click="$emit('update:modelValue', opt.key)"
      >
        <!-- 顶部：按比例绘制的矩形图标 -->
        <div class="ratio-icon" aria-hidden="true">
          <svg viewBox="0 0 80 80" width="40" height="40">
            <!-- 最长边占 60，按比例计算另一边 -->
            <rect
              :x="rectMeta(opt)[0]"
              :y="rectMeta(opt)[1]"
              :width="rectMeta(opt)[2]"
              :height="rectMeta(opt)[3]"
              rx="4"
              :fill="modelValue === opt.key ? '#FFFFFF' : 'var(--ratio-icon-fill, rgba(148,163,184,0.20))'"
            />
          </svg>
        </div>
        <!-- 底部：比例文字 -->
        <div class="ratio-label">{{ opt.key }}</div>
      </button>
    </div>
  </section>
</template>

<script>
export const RATIO_OPTS = [
  { key: '1:1',  w: 1, h: 1 },
  { key: '1:4',  w: 1, h: 4 },
  { key: '2:3',  w: 2, h: 3 },
  { key: '3:2',  w: 3, h: 2 },
  { key: '3:4',  w: 3, h: 4 },
  { key: '4:1',  w: 4, h: 1 },
  { key: '4:3',  w: 4, h: 3 },
  { key: '9:16', w: 9, h: 16 },
  { key: '16:9', w: 16, h: 9 },
  { key: '21:9', w: 21, h: 9 }
]
// 根据 w:h 在 80x80 的 viewBox 里生成居中矩形（最长边=60）
export function rectMeta (opt) {
  const maxSide = 60
  let dw = opt.w, dh = opt.h
  // 归一化：让最长边=60
  const scale = maxSide / Math.max(dw, dh)
  const rw = dw * scale
  const rh = dh * scale
  const x = (80 - rw) / 2
  const y = (80 - rh) / 2
  return [x, y, rw, rh]
}
</script>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '1:1',
    validator: (v) => RATIO_OPTS.some(o => o.key === v)
  },
  customSize: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'update:customSize'])

// 允许外部不传 customSize，内部也能工作
const innerCustom = ref(!!props.customSize)
watch(() => props.customSize, v => { innerCustom.value = !!v })

const onToggleCustomSize = () => {
  innerCustom.value = !innerCustom.value
  emit('update:customSize', innerCustom.value)
}
</script>

<style scoped>
.qwen-aspect-ratio {
  width: 360px;
  box-sizing: border-box;
  background: transparent;
}

/* 标题行（左右两端对齐） */
.panel-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 2px;
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
}
.title-emoji { font-size: 15px; line-height: 1; flex: 0 0 auto; }
.panel-title__text { flex: 0 0 auto; }

/* 自定义尺寸开关 */
.custom-size-switch {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  user-select: none;
}
.custom-size__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary, #C9CDD4);
  line-height: 1;
}
.switch {
  position: relative;
  width: 40px;
  height: 22px;
  border-radius: 999px;
  padding: 0;
  border: none;
  cursor: pointer;
  background: var(--bg-elevated-3, #3A3C42);
  transition: background-color 180ms ease;
  flex: 0 0 auto;
}
.switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #FFFFFF;
  transition: transform 180ms ease;
}
.switch[aria-checked='true'],
.switch[aria-checked="true"] {
  background: #FE2C55;
}
.switch[aria-checked='true'] .switch__thumb {
  transform: translateX(18px);
}

/* 5 x 2 比例网格：每列固定 62.4px（用户指定） */
.ratio-grid {
  display: grid;
  grid-template-columns: repeat(5, 62.4px);
  grid-template-rows: auto auto;
  gap: 5px 5px;
  width: 100%;
  justify-content: flex-start;
}
.ratio-item {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: transparent;
  color: var(--text-primary, #E5EAF3);
  border-radius: 6px;             /* ⭐ 圆角 6px */
  width: 62.4px;                  /* ⭐ 固定宽 62.4 */
  height: 74px;                   /* ⭐ 固定高 74 */
  padding: 6px 0;                 /* 上下各 6，内空 62 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;                       /* 图标 → 文字 4 */
  cursor: pointer;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    transform 120ms ease;
  box-sizing: border-box;
}
.ratio-item:hover {
  background: var(--bg-elevated-2, #26272B);
  border-color: var(--border-strong, rgba(255,255,255,0.14));
}
.ratio-item:active { transform: scale(0.98); }
.ratio-icon {
  width: 44px;                    /* ⭐ 缩小到 44×44（原来 52→44，省出空间给 14px 字号） */
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}
/* ratio-label 字号 14→12（用户要求） */
.ratio-label {
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  flex: 0 0 auto;
}

/* 选中态：整卡片粉色渐变，图标+文字变白 */
.ratio-item--active {
  background: #FE2C55;
  color: #FFFFFF;
  border-color: rgba(255,255,255,0.12);
}
.ratio-item--active:hover { filter: brightness(1.05); }
.ratio-item--active .ratio-label { color: #FFFFFF; }
</style>
