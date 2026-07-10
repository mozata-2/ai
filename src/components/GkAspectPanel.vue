<template>
  <section class="gk-aspect-panel">
    <div class="panel-title">
      <!-- 左侧比例小图标（和图一一致）-->
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="panel-title__icon">
        <path d="M3 4 L16 4 L21 14 L21 20 L3 20 Z"
              :fill="titleIconFill"
              :stroke="titleIconStroke" stroke-width="1.5" stroke-linejoin="round"/>
      </svg>
      <span class="panel-title__text">视频比例</span>
    </div>

    <!-- g15 模式：2按钮大尺寸 -->
    <div v-if="!isClassic" class="aspect-grid aspect-grid--g15" role="radiogroup" :aria-label="'视频比例选择，当前' + modelValue">
      <button
        v-for="opt in aspectOpts"
        :key="opt.key"
        type="button"
        class="aspect-btn aspect-btn--g15"
        :class="{ 'aspect-btn--active': modelValue === opt.key }"
        :aria-checked="modelValue === opt.key"
        role="radio"
        @click="$emit('update:modelValue', opt.key)"
      >
        <span class="aspect-btn__label">{{ opt.label }}</span>
        <span class="aspect-btn__sub">{{ opt.sub }}</span>
      </button>
    </div>

    <!-- classic 模式：5按钮 63.8×74 带比例小矩形 -->
    <div v-else class="aspect-grid aspect-grid--classic" role="radiogroup" :aria-label="'视频比例选择，当前' + modelValue">
      <button
        v-for="opt in aspectOpts"
        :key="opt.key"
        type="button"
        class="aspect-btn aspect-btn--classic"
        :class="{ 'aspect-btn--active': modelValue === opt.key }"
        :aria-checked="modelValue === opt.key"
        role="radio"
        @click="$emit('update:modelValue', opt.key)"
      >
        <!-- 比例小矩形图标 -->
        <span class="aspect-btn__icon">
          <span
            class="ratio-rect"
            :style="getRatioRectStyle(opt.ratio)"
          />
        </span>
        <span class="aspect-btn__label">{{ opt.label }}</span>
      </button>
    </div>
  </section>
</template>

<script>
// g15 模式：2选项
export const G15_ASPECT_OPTS = [
  { key: '9:16',  label: '9:16',  sub: '竖屏', ratio: [9, 16] },
  { key: '16:9',  label: '16:9',  sub: '横屏', ratio: [16, 9] }
]
// classic 模式：5选项（和图一顺序一致）
export const CLASSIC_ASPECT_OPTS = [
  { key: '2:3',  label: '2:3',  ratio: [2, 3] },
  { key: '3:2',  label: '3:2',  ratio: [3, 2] },
  { key: '1:1',  label: '1:1',  ratio: [1, 1] },
  { key: '9:16', label: '9:16', ratio: [9, 16] },
  { key: '16:9', label: '16:9', ratio: [16, 9] }
]
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '9:16'
  },
  mode: {
    type: String,
    default: 'g15',
    validator: (v) => ['g15', 'classic'].includes(v)
  }
})
defineEmits(['update:modelValue'])

const isClassic = computed(() => props.mode === 'classic')
const aspectOpts = computed(() => isClassic.value ? CLASSIC_ASPECT_OPTS : G15_ASPECT_OPTS)

const titleIconFill   = 'var(--aspect-title-fill, rgba(242, 246, 252, 0.5))'
const titleIconStroke = 'var(--aspect-title-stroke, #C9CDD4)'

/**
 * 根据比例 [w, h] 计算小矩形的百分比尺寸
 * 参考容器是 28×36（classic按钮图标区），最大边占容器的约80%
 */
const getRatioRectStyle = ([w, h]) => {
  const max = Math.max(w, h)
  const widthPct  = (w / max) * 80
  const heightPct = (h / max) * 80
  return {
    width:  widthPct  + '%',
    height: heightPct + '%'
  }
}
</script>

<style scoped>
.gk-aspect-panel {
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
  font-weight: 400;
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 14px;
}
.panel-title__icon { flex: 0 0 auto; }
.panel-title__text { flex: 0 0 auto; }

/* ========== g15 2按钮 大尺寸 ========== */
.aspect-grid--g15 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
}
.aspect-btn--g15 {
  appearance: none;
  -webkit-appearance: none;
  flex: 0 0 177.5px;
  width: 177.5px;
  height: 74px;
  border-radius: 6px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: transparent;
  color: var(--text-primary, #E5EAF3);
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 6px;
  user-select: none;
  box-sizing: border-box;
}
.aspect-btn--g15:active { transform: scale(0.98); }
.aspect-btn--g15 .aspect-btn__label { font-size: 14px; font-weight: 700; line-height: 1.1; }
.aspect-btn--g15 .aspect-btn__sub {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-faint, #8B93A0);
  line-height: 1;
  opacity: 0.85;
}

/* ========== classic 5按钮 63.8×74 ========== */
.aspect-grid--classic {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  justify-items: center;
}
.aspect-btn--classic {
  appearance: none;
  -webkit-appearance: none;
  flex: 0 0 63.8px;
  width: 63.8px;
  height: 74px;
  border-radius: 6px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: transparent;
  color: var(--text-primary, #ffffff);
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 4px;
  user-select: none;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 500;
}
.aspect-btn--classic:active { transform: scale(0.98); }

/* classic 图标区：居中的小矩形 */
.aspect-btn__icon {
  width: 100%;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 36px;
}
.ratio-rect {
  background: var(--ratio-rect-bg, #F2F6FC);
  border-radius: 2px;
  display: block;
}
.aspect-btn--classic .aspect-btn__label {
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
}

/* ====== 选中通用 ====== */
.aspect-btn--active {
  background: #FE2C55;
  border-color: #FE2C55;
  color: #fff;
}
.aspect-btn--active .aspect-btn__sub { color: rgba(255,255,255,0.85); }
.aspect-btn--classic.aspect-btn--active .ratio-rect {
  background: rgba(255, 255, 255, 0.22);
}

/* 窄屏(≤1000)单列：按钮原固定像素宽会比 1fr 分到的宽度大，
   向右溢出把最右列（16:9）的右边框裁掉（用户截图右边缺失一点点）。
   重置成 width:100% 填柱 + 缩小 gap，永不溢出 */
@media (max-width: 999.98px) {
  .aspect-grid--g15 { gap: 6px; }
  .aspect-btn--g15 { flex: 0 0 auto; width: 100%; }
  .aspect-grid--classic { gap: 6px; }
  .aspect-btn--classic { flex: 0 0 auto; width: 100%; }
}
@media (max-width: 767.98px) {
  .aspect-btn--g15 { height: 68px; }
  .aspect-btn--classic { height: 68px; }
}
</style>
