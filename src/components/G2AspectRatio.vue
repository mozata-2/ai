<template>
  <section class="g2-ratio">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="ratio-title__icon">
        <path d="M3 4.5 A1.5 1.5 0 0 1 4.5 3 H10 L12 5 H19.5 A1.5 1.5 0 0 1 21 6.5 V17.5 A1.5 1.5 0 0 1 19.5 19 H4.5 A1.5 1.5 0 0 1 3 17.5 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M5 7 H11 V13 H5 Z M7 17 H19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
      <span class="panel-title__text">图片比例</span>
      <span v-if="channel === 'official'" class="panel-title__opt">选择不同尺寸将显示预估价格</span>
      <label class="custom-toggle" aria-label="自定义尺寸">
        <span class="custom-toggle__label">自定义尺寸</span>
        <input type="checkbox" :checked="customSize" @change="onToggleCustom" />
        <span class="custom-toggle__track">
          <span class="custom-toggle__thumb"></span>
        </span>
      </label>
    </div>

    <!-- 非自定义模式：8 个比例按钮网格 -->
    <div
      v-if="!customSize"
      class="ratio-grid"
      role="radiogroup"
      :aria-label="'图片比例选择，当前' + modelValue"
    >
      <button
        v-for="opt in RATIO_OPTS"
        :key="opt.key"
        type="button"
        class="ratio-btn"
        :class="{ 'ratio-btn--active': modelValue === opt.key }"
        role="radio"
        :aria-checked="modelValue === opt.key"
        @click="onPickRatio(opt.key)"
      >
        <span class="ratio-btn__icon" :class="'ratio-icon--' + (opt.key === 'auto' ? 'auto' : opt.key.replace(/:/g, '_'))">
          <span class="ratio-icon__box"></span>
        </span>
        <span class="ratio-btn__label">{{ opt.label }}</span>
      </button>
    </div>

    <!-- 自定义模式：宽度 × 高度 输入 + 总像素显示 -->
    <div v-else class="custom-size" role="group" aria-label="自定义尺寸">
      <!-- 宽度 -->
      <div class="size-field">
        <div class="size-field__label">宽度</div>
        <div class="stepper">
          <button
            type="button"
            class="stepper__btn stepper__btn--minus"
            aria-label="减少宽度"
            :disabled="width <= SIZE_MIN"
            @click="onStepWidth(-SIZE_STEP)"
          >−</button>
          <input
            class="stepper__input"
            type="number"
            :value="width"
            :min="SIZE_MIN"
            :max="SIZE_MAX"
            :step="SIZE_STEP"
            @input="onWidthInput"
          />
          <button
            type="button"
            class="stepper__btn stepper__btn--plus"
            aria-label="增加宽度"
            :disabled="width >= SIZE_MAX"
            @click="onStepWidth(SIZE_STEP)"
          >+</button>
        </div>
      </div>

      <!-- 乘号分隔 -->
      <div class="size-sep" aria-hidden="true">×</div>

      <!-- 高度 -->
      <div class="size-field">
        <div class="size-field__label">高度</div>
        <div class="stepper">
          <button
            type="button"
            class="stepper__btn stepper__btn--minus"
            aria-label="减少高度"
            :disabled="height <= SIZE_MIN"
            @click="onStepHeight(-SIZE_STEP)"
          >−</button>
          <input
            class="stepper__input"
            type="number"
            :value="height"
            :min="SIZE_MIN"
            :max="SIZE_MAX"
            :step="SIZE_STEP"
            @input="onHeightInput"
          />
          <button
            type="button"
            class="stepper__btn stepper__btn--plus"
            aria-label="增加高度"
            :disabled="height >= SIZE_MAX"
            @click="onStepHeight(SIZE_STEP)"
          >+</button>
        </div>
      </div>
    </div>

    <!-- 总像素（只在自定义模式显示，与截图一致） -->
    <div v-if="customSize" class="total-pixels" aria-live="polite">
      总像素：{{ totalPixels.toLocaleString('en-US') }}
    </div>
  </section>
</template>

<script>
/**
 * 8 个比例 + 对应的推荐默认尺寸（≈ 100 万像素，贴近主流 1K 生图）
 * 所有尺寸都是 8 的倍数（生图模型常规要求）
 */
export const RATIO_OPTS = [
  { key: '1:1',  label: '1:1',  w: 1024, h: 1024 },
  { key: '2:3',  label: '2:3',  w: 832,  h: 1248 },
  { key: '3:2',  label: '3:2',  w: 1248, h: 832  },
  { key: '9:16', label: '9:16', w: 768,  h: 1360 },
  { key: '16:9', label: '16:9', w: 1360, h: 768  },
  { key: '3:4',  label: '3:4',  w: 896,  h: 1152 },
  { key: '4:3',  label: '4:3',  w: 1152, h: 896  },
  { key: 'auto', label: 'Auto', w: 1024, h: 1024 }
]
/** 尺寸约束：最小 512，最大 4096，步长 64（都是 8 的倍数，兼容各种模型） */
export const SIZE_MIN  = 512
export const SIZE_MAX  = 4096
export const SIZE_STEP = 64

/** 把任意数字 clamp 到 [min,max] 并对齐到 step 的整数倍 */
export function align (n, min, max, step) {
  let v = Number(n)
  if (Number.isNaN(v)) v = min
  v = Math.round(v / step) * step
  if (v < min) v = min
  if (v > max) v = max
  return v
}
</script>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '1:1',
    validator: (v) => RATIO_OPTS.some(o => o.key === v)
  },
  customSize: {
    type: Boolean,
    default: false
  },
  /* 当前渠道：official（官方）/ discount（折扣）—— 决定是否显示「预估价格」副标题 */
  channel: {
    type: String,
    default: 'official',
    validator: (v) => ['official', 'discount'].includes(v)
  }
})
const emit = defineEmits(['update:modelValue', 'update:customSize'])

/* ====== 自定义尺寸本地状态 ====== */
const width  = ref(1024)
const height = ref(1024)

const totalPixels = computed(() => width.value * height.value)

/** 按当前比例键返回推荐默认尺寸（找不到就返回 1024×1024） */
function defaultSizeFor (key) {
  const opt = RATIO_OPTS.find(o => o.key === key)
  return opt ? { w: opt.w, h: opt.h } : { w: 1024, h: 1024 }
}

/** 切换比例：同步更新本地 width/height，让用户切到自定义时默认就是该比例的尺寸 */
function onPickRatio (key) {
  emit('update:modelValue', key)
  const { w, h } = defaultSizeFor(key)
  width.value  = w
  height.value = h
}

/** 监听外部 modelValue 变化（外部可能直接改比例）——同步本地尺寸 */
watch(() => props.modelValue, (newKey) => {
  if (props.customSize) return /* 用户在自定义模式里改尺寸，外部调比例时就不覆盖 */
  const { w, h } = defaultSizeFor(newKey)
  width.value  = w
  height.value = h
})

/** 开关切换 */
const onToggleCustom = (e) => {
  const checked = !!(e && e.target && e.target.checked)
  emit('update:customSize', checked)
}

/* ====== 尺寸步进 / 输入框 ====== */
const onStepWidth  = (delta) => { width.value  = align(width.value  + delta, SIZE_MIN, SIZE_MAX, SIZE_STEP) }
const onStepHeight = (delta) => { height.value = align(height.value + delta, SIZE_MIN, SIZE_MAX, SIZE_STEP) }

const onWidthInput  = (e) => { width.value  = align(e.target.value,  SIZE_MIN, SIZE_MAX, SIZE_STEP) }
const onHeightInput = (e) => { height.value = align(e.target.value,  SIZE_MIN, SIZE_MAX, SIZE_STEP) }

/* 挂载时用当前比例初始化尺寸，避免首次打开自定义时还是 0/空 */
onMounted(() => {
  const { w, h } = defaultSizeFor(props.modelValue)
  width.value  = w
  height.value = h
})
</script>

<style scoped>
.g2-ratio {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0 4px;
  background: transparent;
}

/* ================= 标题行 ================= */
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary, #2A2C2E);
  margin-bottom: 18px;
  width: 100%;
}
.ratio-title__icon {
  flex: 0 0 auto;
  color: var(--text-secondary, #86909C);
}
.panel-title__text { flex: 0 0 auto;
  font-size: 12px ;
}
.panel-title__opt {
  flex: 0 0 auto;
  color: var(--text-faint, #86909C);
  font-weight: 400;
  font-size: 10px;
  margin-left: 2px;
  letter-spacing: -0.1px;
}

/* 自定义开关（小尺寸）：track 30×16，圆角 6px */
.custom-toggle {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.custom-toggle__label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary, #2A2C2E);
}
.custom-toggle input { display: none; }
.custom-toggle__track {
  width: 30px;              /* 整体开关宽度：30 */
  height: 16px;             /* 整体开关高度：16 */
  border-radius: 6px;       /* 圆角：6px */
  background: #E5E6EB;
  display: inline-block;
  position: relative;
  transition: background-color 140ms ease;
  flex: 0 0 auto;
}
.custom-toggle__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 12px;              /* 滑块缩小，16−2*2 = 12 */
  height: 12px;
  border-radius: 50%;
  background: #FFFFFF;
  transition: left 140ms ease;
}
.custom-toggle input:checked + .custom-toggle__track {
  background: #FE2C55;
}
.custom-toggle input:checked + .custom-toggle__track .custom-toggle__thumb {
  left: 16px;               /* 30 − 2*2 − 12 = 14？取 16 贴边 */
}

/* ================= 8 个比例按钮：2 行 x 4 列（每格 81×74） ================= */
.ratio-grid {
  display: grid;
  grid-template-columns: repeat(4, 81px);   /* 每列 81px 固定宽 */
  grid-template-rows: auto auto;
  gap: 14px 10px;
  width: 100%;
  box-sizing: border-box;
  justify-content: flex-start;
}

/* 单个比例按钮：81×74，圆角 6px */
.ratio-btn {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  box-sizing: border-box;
  background: transparent;
  box-shadow: none !important;
  padding: 5px 0;
  width: 81px;
  height: 74px;
  border-radius: 6px;           /* 整体按钮圆角 6px */
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: transform 120ms ease;
}
.ratio-btn:active { transform: scale(0.98); }

/* 比例小图标：缩小到 48×48，圆角 6px */
.ratio-btn__icon {
  width: 48px;
  height: 48px;
  border-radius: 6px;           /* 图标容器圆角 6px */
  background: #F2F3F5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  transition: background-color 140ms ease;
  box-sizing: border-box;
  overflow: hidden;
}
.ratio-icon__box {
  background: #C9CDD4;
  border-radius: 2px;           /* 内部小矩形保持 2px 细节 */
  transition:
    background-color 140ms ease,
    width 140ms ease,
    height 140ms ease;
}

/* 各比例的小图标尺寸（按 48/76 ≈ 0.63 缩放原尺寸，取整） */
.ratio-icon--1_1 .ratio-icon__box   { width: 26px; height: 26px; }
.ratio-icon--2_3 .ratio-icon__box   { width: 23px; height: 34px; }
.ratio-icon--3_2 .ratio-icon__box   { width: 34px; height: 23px; }
.ratio-icon--9_16 .ratio-icon__box  { width: 19px; height: 34px; }
.ratio-icon--16_9 .ratio-icon__box  { width: 34px; height: 19px; }
.ratio-icon--3_4 .ratio-icon__box   { width: 25px; height: 34px; }
.ratio-icon--4_3 .ratio-icon__box   { width: 34px; height: 25px; }
.ratio-icon--auto .ratio-icon__box   {
  width: 28px; height: 21px;
  background: transparent;
  border: 1.5px dashed #C9CDD4;
  border-radius: 3px;
}

/* 按钮文字：⭐ 字号改为 12，取消加粗（含选中态） */
.ratio-btn__label {
  font-size: 12px;
  
  font-weight: 400;
  color: var(--text-primary, #2A2C2E);
  line-height: 1;
  transition: color 140ms ease;
}

/* 选中态：⭐ 整卡粉红底包裹（图标+字全部在同一块粉红底上，像截图那样） */
.ratio-btn--active {
  background: #FE2C55;
  border-radius: 6px;
}
.ratio-btn--active .ratio-btn__icon {
  background: transparent;              /* 去掉图标盒独立底，让整卡粉红底直接包裹 */
}
.ratio-btn--active .ratio-icon__box {
  background: rgba(255, 255, 255, 0.68);  /* 内部小矩形：淡粉白（截图里的浅粉小方块） */
}
.ratio-btn--active.ratio-icon--auto .ratio-icon__box {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.85);
}
.ratio-btn--active .ratio-btn__label {
  color: #FFFFFF;                        /* 选中：比例字白色 */
  font-weight: 400;                      /* 选中也取消加粗 */
}

/* ================= 自定义尺寸区（截图：宽度 × 高度 + 总像素） ================= */
.custom-size {
  display: flex;
  align-items: flex-start;  /* 让 × 号与「宽度/高度」标签行对齐 */
  justify-content: flex-start;
  gap: 14px;
  width: 100%;
  box-sizing: border-box;
  padding: 2px 0 0;
}

.size-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1 1 0;
  min-width: 0;
}
.size-field__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary, #2A2C2E);
  line-height: 1;
  padding: 0 2px;
}

/* 步进器：− [数字] +（浅色圆角背景，截图风格） */
.stepper {
  display: inline-flex;
  align-items: stretch;
  width: 100%;
  height: 40px;
  background: #F7F8FA;
  border: 1px solid #E5E6EB;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
}
.stepper__btn {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  flex: 0 0 40px;
  width: 40px;
  font-size: 20px;
  font-weight: 500;
  color: var(--text-primary, #2A2C2E);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 120ms ease, color 120ms ease;
  box-sizing: border-box;
  user-select: none;
}
.stepper__btn:hover:not(:disabled) { background: #EEF0F3; }
.stepper__btn:active:not(:disabled) { background: #E5E6EB; }
.stepper__btn:disabled {
  color: #C9CDD4;
  cursor: not-allowed;
}

.stepper__input {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  outline: none;
  background: transparent;
  flex: 1 1 auto;
  min-width: 0;
  padding: 0 8px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary, #2A2C2E);
  font-family: inherit;
  line-height: 1;
  height: 100%;
  box-sizing: border-box;
  /* 去掉原生数字输入的上下箭头 */
  -moz-appearance: textfield;
}
.stepper__input::-webkit-outer-spin-button,
.stepper__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 中间的 × 分隔号：与两个步进器（40px 高）水平垂直都居中 */
.size-sep {
  flex: 0 0 24px;               /* 占一小段固定宽度，左右不要太挤 */
  width: 24px;
  height: 40px;                 /* 与 stepper 高度一致 */
  margin-top: 21px;             /* 下移「宽度标签(13px高) + 标签与步进器的gap(8px) = 21px」，让盒子顶部与 stepper 顶部对齐 */
  display: inline-flex;
  align-items: center;          /* 垂直居中 × */
  justify-content: center;      /* 水平居中 × */
  font-size: 18px;
  font-weight: 600;
  color: var(--text-secondary, #86909C);
  line-height: 1;
}

/* 总像素行（截图：左下灰色小字） */
.total-pixels {
  width: 100%;
  margin-top: 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary, #86909C);
  line-height: 1.2;
  letter-spacing: 0.2px;
}
</style>
