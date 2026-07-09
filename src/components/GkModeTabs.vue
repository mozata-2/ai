<template>
  <section class="gk-mode-tabs">
  <div> 
    <div class="tabs-row" role="tablist" aria-label="GK 模式选择">
      <button
        v-for="opt in MODE_OPTS"
        :key="opt.key"
        type="button"
        class="tab-btn"
        :class="{ 'tab-btn--active': modelValue === opt.key }"
        role="tab"
        :aria-selected="modelValue === opt.key"
        @click="$emit('update:modelValue', opt.key)"
      >
        <span class="tab-btn__label">{{ opt.label }}</span>
      </button>
    </div>
    </div>
  </section>
</template>

<script>
export const MODE_OPTS = [
  { key: 'g15',    label: 'G1.5' },
  { key: 'classic', label: '经典模式' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'g15',
    validator: (v) => MODE_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.gk-mode-tabs {
  width: 100%;
  box-sizing: border-box;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;       /* ⭐ 不再居中，368×44 贴左 */
  gap: 0;
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--bg-base, #121212);
}
/* tabs容器：用户要求整体 368 × 44，单按钮 176 × 36；整体向上移 2px */
.tabs-row {
  display: flex;
  align-items: center;
  width: 368px;                     /* ⭐ 容器整体 368 宽 */
  height: 44px;                     /* ⭐ 容器整体 44 高 */
  gap: 8px;                         /* 两按钮之间 8px 缝 */
  padding: 0 4px;                   /* 左右各 4 → 368 - 8 - 8 = 352 刚好两按钮 */
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: -4px;
  background: var(--bg-elevated-2, #F5F7FA);
  margin-left: 4px;                 /* ⭐ 用户指这个浅灰容器（绿框）整体向上移 2px */
}
/* 单个按钮：用户指定 176 × 36，未选中透明背景 */
.tab-btn {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: transparent;
  color: var(--text-secondary, #BFC4CC);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  width: 176px;                     /* ⭐ 单按钮 176 宽 */
  height: 36px;                     /* ⭐ 单按钮 36 高 */
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  user-select: none;
  flex: 0 0 176px;
  box-sizing: border-box;
  transition: background-color 160ms ease, color 160ms ease;
}
/* ⭐ 移除 scale 变换（违反硬约束） */

/* 选中：纯粉色背景 + 白字 */
.tab-btn--active {
  background: #FE2C55;
  color: #fff;
  border-color: #FE2C55;
}
</style>
