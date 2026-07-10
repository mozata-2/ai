<template>
  <section class="gk-duration-panel">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="panel-title__icon">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/>
        <path d="M12 7 L12 12 L16 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
      <span class="panel-title__text">{{ isClassic ? '生成长' : '视频时长' }}</span>
    </div>

    <div class="dur-row" role="radiogroup" :aria-label="'时长选择，当前' + modelValue">
      <button
        v-for="opt in durOpts"
        :key="opt.key"
        type="button"
        class="dur-btn"
        :class="{ 'dur-btn--active': modelValue === opt.key }"
        :aria-checked="modelValue === opt.key"
        role="radio"
        @click="$emit('update:modelValue', opt.key)"
      >
        <span class="dur-btn__label">{{ opt.label }}</span>
        <span class="dur-btn__sub">{{ opt.sub }}</span>
      </button>
    </div>
  </section>
</template>

<script>
// g15 模式：10s / 15s
export const G15_DUR_OPTS = [
  { key: '10s', label: '10s',  sub: '标准' },
  { key: '15s', label: '15s',  sub: '长视频' }
]
// classic 模式：10秒 / 6秒（按图二顺序）
export const CLASSIC_DUR_OPTS = [
  { key: '10s', label: '10 秒', sub: '更长时长' },
  { key: '6s',  label: '6 秒',  sub: '标准时长' }
]
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '10s'
  },
  mode: {
    type: String,
    default: 'g15',
    validator: (v) => ['g15', 'classic'].includes(v)
  }
})
defineEmits(['update:modelValue'])

const isClassic = computed(() => props.mode === 'classic')
const durOpts   = computed(() => isClassic.value ? CLASSIC_DUR_OPTS : G15_DUR_OPTS)
</script>

<style scoped>
.gk-duration-panel {
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
.panel-title__icon { color: var(--text-secondary, #C9CDD4); flex: 0 0 auto; }
.panel-title__text { flex: 0 0 auto; }

.dur-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
}
.dur-btn {
  appearance: none;
  -webkit-appearance: none;
  flex: 0 0 177.5px;
  width: 177.5px;
  height: 56px;
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
  user-select: none;
  box-sizing: border-box;
}
.dur-btn:active { transform: scale(0.98); }
.dur-btn__label { font-size: 14px; font-weight: 700; line-height: 1.1; }
.dur-btn__sub {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-faint, #8B93A0);
  line-height: 1;
  opacity: 0.85;
}

.dur-btn--active {
  background: #FE2C55;
  border-color: #FE2C55;
  color: #fff;
}
.dur-btn--active .dur-btn__sub { color: rgba(255,255,255,0.85); }
</style>
