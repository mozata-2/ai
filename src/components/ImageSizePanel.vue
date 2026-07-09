<template>
  <section class="image-size">
    <div class="panel-title">
      <!-- 三角尺/直角尺图标（参考图左上角） -->
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="size-title__icon">
        <path d="M2 21 L15 8 M2 21 L22 21 L9 8 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M5.5 18 L7.5 18 M9 14.5 L11 14.5 M12.5 11 L14.5 11 M16 18 L16 20" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
      <span class="panel-title__text">图片尺寸</span>
    </div>

    <div class="size-grid" role="radiogroup" :aria-label="'图片尺寸选择，当前' + sizeLabels[modelValue]">
      <button
        v-for="opt in SIZE_OPTS"
        :key="opt.key"
        type="button"
        class="size-btn"
        :class="{ 'size-btn--active': modelValue === opt.key }"
        :aria-checked="modelValue === opt.key"
        role="radio"
        @click="$emit('update:modelValue', opt.key)"
      >
        {{ opt.label }}
      </button>
    </div>
  </section>
</template>

<script>
/* defineProps 会被 hoist 到 setup() 外层，因此 SIZE_OPTS 必须声明在普通 <script> 里，
   才能被 defineProps 的 validator 引用 */
export const SIZE_OPTS = [
  { key: 'auto', label: 'Auto' },
  { key: '1:1',  label: '1:1' },
  { key: '3:2',  label: '3:2' },
  { key: '2:3',  label: '2:3' }
]
export const sizeLabels = {
  auto: '自动',
  '1:1': '一比一',
  '3:2': '三比二',
  '2:3': '二比三'
}
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'auto',
    validator: (v) => SIZE_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.image-size {
  width: 360px;                         /* ✅ 外层固定 360（截图 div.mb-5 360×112） */
  height: 112px;                        /* ✅ 外层固定高度 112 */
  box-sizing: border-box;
  padding: 0;                           /* ✅ 去掉原 padding 12px 0 */
  margin-bottom: 20px;                  /* ✅ 外层 margin-bottom 20（截图 mb-5：0 0 20px） */
  background: transparent;
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  /* ⭐ 亮/暗主题统一：硬编码 → 主题变量 */
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 12px;                  /* ✅ 标题和 grid 间距 12（总高刚好 112） */
}
/* ⭐ 亮/暗主题统一：图标色 → 次级文字（比主文字略灰一级） */
.size-title__icon { color: var(--text-secondary, #C9CDD4); flex: 0 0 auto; }
.panel-title__text { flex: 0 0 auto; }

/* 2x2 尺寸按钮网格（按截图：每列固定 174 宽，gap 12） */
.size-grid {
  display: grid;
  grid-template-columns: 174px 174px;  /* ✅ 两列固定 174（截图单个选项卡 174 宽） */
  grid-template-rows: 36px 36px;       /* ✅ 两行固定 36 高（单个选项卡 174×36） */
  gap: 12px;                            /* ✅ 行列 gap 都 12（360 - 174×2 = 12 正好） */
  width: 100%;
}
.size-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 174px;                         /* ✅ 固定 174 宽 */
  height: 36px;                         /* ✅ 固定 36 高（原 44 → 36） */
  border-radius: 6px;                   /* ✅ 圆角 6px（原 12→6，按用户要求） */
  border: 2px solid var(--border-base, rgba(255,255,255,0.06)); /* ✅ border-2：2px 边框（原 1px） */
  /* ⭐ 亮/暗主题统一：背景 → 主题变量 */
  background: var(--bg-elevated-2, #26272B);
  color: var(--text-primary, #E5EAF3);
  font-size: 14px;                      /* ✅ 字号 14（原 16 → 14，和截图 Font 14px 一致） */
  font-weight: 600;
  padding: 8px;                         /* ✅ Padding 8px（和截图 Padding 8 一致） */
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    transform 120ms ease;
  user-select: none;
  box-sizing: border-box;
}
.size-btn:hover {
  /* ⭐ 亮/暗主题统一：hover → 更深一级 elevated-3（暗→更深；亮→更浅的灰色） */
  background: var(--bg-elevated-3, #2D2F34);
  border-color: var(--border-strong, rgba(255,255,255,0.14));
}
.size-btn:active { transform: scale(0.98); }

/* 选中：红色高亮（参考图 Auto 的效果：Background #FE2C55 / Color #fff） */
.size-btn--active {
  background: #FE2C55;                  /* ✅ 选中背景 #FE2C55（和截图一致） */
  border-color: #FE2C55;
  color: #fff;                       /* ✅ 选中文字 #fff（和截图一致） */
  border-width: 2px;                    /* ✅ 选中保持 2px 边框（截图 border-2） */
}
</style>
