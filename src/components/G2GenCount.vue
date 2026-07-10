<template>
  <section class="g2-gen-count">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="count-title__icon">
        <rect x="3"  y="3"  width="7" height="7" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.8"/>
        <rect x="14" y="3"  width="7" height="7" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.8"/>
        <rect x="3"  y="14" width="7" height="7" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.8"/>
        <rect x="14" y="14" width="7" height="7" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.8"/>
      </svg>
      <span class="panel-title__text">生成数量</span>
    </div>

    <div class="count-btns" role="radiogroup" :aria-label="'生成数量选择，当前' + modelValue">
      <button
        v-for="opt in COUNT_OPTS"
        :key="opt.key"
        type="button"
        class="count-btn"
        :class="{ 'count-btn--active': modelValue === opt.key }"
        role="radio"
        :aria-checked="modelValue === opt.key"
        @click="$emit('update:modelValue', opt.key)"
      >{{ opt.label }}</button>
    </div>

    <p class="count-tip">
      官方渠道按预估费用 3 倍预扣，完成后按实际 Token 用量多退少补
    </p>
  </section>
</template>

<script>
export const COUNT_OPTS = [
  { key: 1,  label: '1'  },
  { key: 3,  label: '3'  },
  { key: 5,  label: '5'  },
  { key: 10, label: '10' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    default: 1,
    validator: (v) => COUNT_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.g2-gen-count {
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
  color: var(--text-primary, #ffffff);
  margin-bottom: 14px;
  width: 100%;
}
.count-title__icon {
  flex: 0 0 auto;

}
.panel-title__text { flex: 0 0 auto; }

.count-btns {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 10px;
}

/* 所有按钮：固定尺寸 81×36，圆角 6px，选中只改颜色 */
.count-btn {
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
  flex: 0 0 81px;            /* 固定宽度 81px */
  width: 81px;
  padding: 0 8px;
  height: 36px;              /* 固定高度 36px */
  border-radius: 6px;        /* 统一圆角 6px */
  color: var(--text-primary, #ffffff);
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
.count-btn:active { transform: scale(0.985); }

/* 选中态：粉色底 + 白字（尺寸/圆角保持一致，⭐ 永远不加粗） */
.count-btn--active {
  background: #FE2C55;
  color: #fff;
  border-color: #FE2C55;
  font-weight: 400 !important;
}

.count-tip {
  margin: 0;
  padding: 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-faint, #86909C);
}
</style>
