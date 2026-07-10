<template>
  <section class="g2-channel">
    <div class="panel-title">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" class="channel-title__icon">
        <path d="M4 4 H14 V14 H4 Z M10 10 L20 20 M20 14 L20 20 L14 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="panel-title__text">渠道</span>
    </div>

    <div class="channel-btns" role="radiogroup" aria-label="渠道选择">
      <button
        type="button"
        class="channel-btn"
        :class="{ 'channel-btn--active': modelValue === 'official' }"
        role="radio"
        :aria-checked="modelValue === 'official'"
        @click="$emit('update:modelValue', 'official')"
      >官方渠道</button>
      <button
        type="button"
        class="channel-btn"
        :class="{ 'channel-btn--active': modelValue === 'discount' }"
        role="radio"
        :aria-checked="modelValue === 'discount'"
        @click="$emit('update:modelValue', 'discount')"
      >折扣渠道</button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'official',
    validator: (v) => ['official', 'discount'].includes(v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.g2-channel {
  width: 100%;
  box-sizing: border-box;
  padding: 4px 0 8px;
  background: transparent;
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary, #ffffff);
  margin-bottom: 18px;
}
.channel-title__icon {
  flex: 0 0 auto;

}
.panel-title__text { flex: 0 0 auto; }

.channel-btns {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  gap: 12px;
}

/* 所有按钮：固定尺寸 174×36，圆角 6px，选中只改颜色 */
.channel-btn {
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
  flex: 0 0 174px;           /* 固定宽度 174px */
  width: 174px;
  padding: 0 16px;
  height: 36px;              /* 固定高度 36px */
  border-radius: 6px;        /* 统一圆角 6px */
  color: var(--text-primary, #ffffff);
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
.channel-btn:active { transform: scale(0.985); }

.channel-btn--active {
  background: #FE2C55;
  color: #fff;
  border-color: #FE2C55;
  font-weight: 700;
}
</style>
