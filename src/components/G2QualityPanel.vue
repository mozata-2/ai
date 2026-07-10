<template>
  <section class="g2-quality">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="quality-title__icon">
        <polygon points="12,2 14.9,8.6 22,9.3 16.5,14.1 18.2,21.2 12,17.5 5.8,21.2 7.5,14.1 2,9.3 9.1,8.6" fill="currentColor"/>
      </svg>
      <span class="panel-title__text">图片质量</span>
    </div>

    <div class="quality-btns" role="radiogroup" :aria-label="'图片质量选择，当前' + modelValue">
      <button
        v-for="opt in QUALITY_OPTS"
        :key="opt.key"
        type="button"
        class="quality-btn"
        :class="{ 'quality-btn--active': modelValue === opt.key }"
        role="radio"
        :aria-checked="modelValue === opt.key"
        @click="$emit('update:modelValue', opt.key)"
      >{{ opt.label }}</button>
    </div>

    <div v-if="channel === 'official'" class="cost-card">
      <div class="cost-row">
        <span class="cost-row__label">输入 Tokens（文本提示词）</span>
        <span class="cost-row__rate">{{ costData.inRate }}</span>
        <span class="cost-row__value">{{ costData.inLabel }}</span>
      </div>
      <div class="cost-row">
        <span class="cost-row__label">输出 Tokens</span>
        <span class="cost-row__rate">{{ costData.outRate }}</span>
        <span class="cost-row__value">{{ costData.outLabel }}</span>
      </div>
      <div class="cost-row cost-row--total">
        <span class="cost-row__label">预扣积分 <span class="cost-formula">{{ costData.formula }}</span></span>
        <span class="cost-row__value cost-row__value--strong">≈ {{ costData.points }} 积分</span>
      </div>
    </div>
  </section>
</template>

<script>
export const QUALITY_OPTS = [
  { key: 'fast',   label: '快速' },
  { key: 'std',    label: '标准' },
  { key: 'high',   label: '优质' }
]
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'fast',
    validator: (v) => QUALITY_OPTS.some(o => o.key === v)
  },
  /* 当前渠道：official（官方）/ discount（折扣）—— 决定是否显示 Tokens 计费卡 */
  channel: {
    type: String,
    default: 'official',
    validator: (v) => ['official', 'discount'].includes(v)
  }
})
defineEmits(['update:modelValue'])

/* 计费卡模拟数据：根据质量调整倍数（快速×3 / 标准×5 / 优质×8，按截图"×3"默认） */
const qualityMult = computed(() => ({
  fast: 3,
  std:  5,
  high: 8
}[props.modelValue] || 3))

const costData = computed(() => {
  const inRate  = '7 / 千tokens'
  const outRate = '42 / 千tokens'
  const tokens  = 261
  const mult    = qualityMult.value
  const points  = Math.max(1, Math.round(tokens / 1000 * 42 * mult))
  return {
    inRate,
    outRate,
    inLabel:  '按实际计费',
    outLabel: `≈ ${tokens} tokens`,
    formula:  `(${tokens} / 1000 × 42 × ${mult})`,
    points
  }
})
</script>

<style scoped>
.g2-quality {
  width: 100%;
  box-sizing: border-box;
  padding: 14px 0 4px;
  background: transparent;
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary, #2A2C2E);
  margin-bottom: 14px;
  width: 100%;
}
.quality-title__icon {
  flex: 0 0 auto;

}
.panel-title__text { flex: 0 0 auto; }

.quality-btns {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

/* 所有按钮：固定尺寸 112×36，圆角 6px，选中只改颜色 */
.quality-btn {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  box-shadow: none !important;
  flex: 0 0 112px;           /* 固定宽度 112px */
  width: 112px;
  padding: 0 12px;
  height: 36px;              /* 固定高度 36px */
  border-radius: 6px;        /* 统一圆角 6px */
  color: var(--text-primary, #2A2C2E);
  font-size: 14px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition:
    background-color 140ms ease,
    color 140ms ease;
}
.quality-btn:active { transform: scale(0.985); }

/* 选中态：粉色底 + 白字（尺寸/圆角保持一致） */
.quality-btn--active {
  background: #FE2C55;
  color: #fff;
  border-color: #FE2C55;
  font-weight: 700;
}

/* 计费信息卡片：浅灰底 + 3 行 */
.cost-card {
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.cost-row {
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-secondary, #4E5969);
}
.cost-row__label { flex: 1 1 auto; min-width: 0; }
.cost-row__rate  {
  flex: 0 0 auto;
  color: var(--text-secondary, #4E5969);
  font-weight: 500;
}
.cost-row__value {
  flex: 0 0 auto;
  color: var(--text-primary, #2A2C2E);
  font-weight: 500;
  text-align: right;
}
.cost-row--total .cost-row__label {
  color: var(--text-primary, #2A2C2E);
  font-weight: 600;
}
.cost-formula {
  display: inline-block;
  font-weight: 400;
  color: var(--text-faint, #86909C);
  margin-left: 4px;
  font-size: 12px;
}
.cost-row__value--strong {
  color: var(--text-primary, #2A2C2E);
  font-weight: 700;
}
</style>
