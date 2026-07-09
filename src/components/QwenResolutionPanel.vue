<template>
  <section class="qwen-resolution">
    <div class="panel-title">
      <span class="panel-title__emoji">🎯</span>
      <span class="panel-title__text">分辨率</span>
      <span class="panel-title__value">{{ currentPx }}</span>
    </div>

    <div class="res-btns" role="radiogroup" :aria-label="'分辨率选择，当前' + modelValue">
      <button
        v-for="opt in RES_OPTS"
        :key="opt.key"
        type="button"
        class="res-btn"
        :class="{ 'res-btn--active': modelValue === opt.key }"
        role="radio"
        :aria-checked="modelValue === opt.key"
        @click="$emit('update:modelValue', opt.key)"
      >{{ opt.label }}</button>
    </div>
  </section>
</template>

<script>
export const RES_OPTS = [
  { key: '1k', label: '1K', px: '1440×1440' },
  { key: '2k', label: '2K', px: '2048×2048' }
]
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '1k',
    validator: (v) => RES_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])

const currentPx = computed(() => {
  const found = RES_OPTS.find(o => o.key === props.modelValue)
  return found ? found.px : RES_OPTS[0].px
})
</script>

<style scoped>
.qwen-resolution {
  width: 100%;
  box-sizing: border-box;
  padding: 14px 0 4px;
  background: transparent;
}

.panel-title {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  margin-bottom: 12px;
  width: 100%;
}
.panel-title__emoji { font-size: 15px; line-height: 1; flex: 0 0 auto; }
.panel-title__text {
  flex: 0 0 auto;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary, #E5EAF3);
}
.panel-title__value {
  margin-left: auto;
  flex: 0 0 auto;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-faint, #86909C);
}

.res-btns {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  gap: 12px;
}

/* 按钮：174×36 圆角 6px，字号 14（用户指定） */
.res-btn {
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
  background: var(--bg-elevated-2, #26272B);
  box-shadow: none !important;
  flex: 0 0 174px;
  width: 174px;
  padding: 0 12px;
  height: 36px;
  border-radius: 6px;
  color: var(--text-primary, #E5EAF3);
  font-size: 14px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition:
    background-color 140ms ease,
    color 140ms ease;
}
.res-btn:active { transform: scale(0.985); }

/* 选中态：粉红底 + 白字 */
.res-btn--active {
  background: #FE2C55;
  color: #fff;
  border-color: #FE2C55;
}
</style>
