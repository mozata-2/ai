<template>
  <section class="banana-gen-panel">

    <!-- 1. 生成方式：2 段（连续出图 后台队列生成 / 实时出图 等待生成结果） -->
    <div class="panel-block">
      <div class="panel-title">
        <span class="title-emoji" aria-hidden="true">⚡</span>
        <span class="panel-title__text">生成方式</span>
      </div>
      <div class="seg-row seg-row--2">
        <button
          v-for="m in GEN_MODE_OPTS"
          :key="m.value"
          type="button"
          class="seg-btn seg-btn--tall"
          :class="{ 'seg-btn--active': genMode === m.value }"
          role="radio"
          :aria-checked="genMode === m.value"
          @click="$emit('update:genMode', m.value)"
        >
          <span class="seg-strong">{{ m.line1 }}</span>
          <span class="seg-sub">{{ m.line2 }}</span>
        </button>
      </div>
    </div>

    <!-- 2. 输出尺寸：3 段（1K / 2K / 4K） -->
    <div class="panel-block">
      <div class="panel-title">
        <span class="title-emoji" aria-hidden="true">🖼️</span>
        <span class="panel-title__text">输出尺寸</span>
      </div>
      <div class="seg-row seg-row--3">
        <button
          v-for="r in RESOLUTION_OPTS"
          :key="r.value"
          type="button"
          class="seg-btn"
          :class="{ 'seg-btn--active': resolution === r.value }"
          role="radio"
          :aria-checked="resolution === r.value"
          @click="$emit('update:resolution', r.value)"
        >
          {{ r.label }}
        </button>
      </div>
    </div>

    <!-- 3. 生成数量：4 段（1张 / 3张 / 5张 / 10张） -->
    <div class="panel-block">
      <div class="panel-title">
        <span class="title-emoji" aria-hidden="true">🔢</span>
        <span class="panel-title__text">生成数量</span>
      </div>
      <div class="seg-row seg-row--4">
        <button
          v-for="c in COUNT_OPTS"
          :key="c.value"
          type="button"
          class="seg-btn"
          :class="{ 'seg-btn--active': count === c.value }"
          role="radio"
          :aria-checked="count === c.value"
          @click="$emit('update:count', c.value)"
        >
          {{ c.label }}
        </button>
      </div>
    </div>

  </section>
</template>

<script>
export const GEN_MODE_OPTS = [
  { value: 'queue',    line1: '连续出图', line2: '后台队列生成' },
  { value: 'realtime', line1: '实时出图', line2: '等待生成结果' }
]
export const RESOLUTION_OPTS = [
  { value: '1k', label: '1K' },
  { value: '2k', label: '2K' },
  { value: '4k', label: '4K' }
]
export const COUNT_OPTS = [
  { value: 1,  label: '1张' },
  { value: 3,  label: '3张' },
  { value: 5,  label: '5张' },
  { value: 10, label: '10张' }
]
</script>

<script setup>
defineProps({
  genMode: {
    type: String,
    default: 'queue',
    validator: (v) => GEN_MODE_OPTS.some(o => o.value === v)
  },
  resolution: {
    type: String,
    default: '1k',
    validator: (v) => RESOLUTION_OPTS.some(o => o.value === v)
  },
  count: {
    type: Number,
    default: 1,
    validator: (v) => COUNT_OPTS.some(o => o.value === v)
  }
})
defineEmits(['update:genMode', 'update:resolution', 'update:count'])
</script>

<style scoped>
.banana-gen-panel {
  width: 100%;
  box-sizing: border-box;
  padding: 4px 0 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary, #E5EAF3);
  margin: 12px 0 14px;
}
.title-emoji { font-size: 16px; }

/* ====== 公共 seg-row：三个区块都取消背景色（用户要求） ====== */
.seg-row {
  display: grid;
  gap: 0;
  width: 100%;
  padding: 0;
  background: transparent;        /* ⭐ 取消背景 */
  border: none;
  box-sizing: border-box;
  justify-content: flex-start;
}
/* 生成方式：2列，单按钮 173.5×70，圆角 6 */
.seg-row--2 {
  grid-template-columns: repeat(2, 173.5px);
  column-gap: 12px;
}
/* 输出尺寸：3列，单按钮 111.66×44，圆角 6 */
.seg-row--3 {
  grid-template-columns: repeat(3, 111.66px);
  column-gap: 12px;
}
/* 生成数量：4列，单按钮 80.75×36，圆角 6 */
.seg-row--4 {
  grid-template-columns: repeat(4, 80.75px);
  column-gap: 12px;
}

/* ====== 公共 seg-btn：取消加粗、圆角统一 6 ====== */
.seg-btn {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));  /* 给个微边框，不然透明底没边界 */
  background: transparent;
  color: var(--text-primary, #E5EAF3);
  font-weight: 400;              /* ⭐ 取消加粗 */
  cursor: pointer;
  border-radius: 6px;            /* ⭐ 圆角 6 */
  padding: 0 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 160ms ease, color 160ms ease, transform 120ms ease;
  user-select: none;
  box-sizing: border-box;
}
.seg-btn:active { transform: scale(0.99); }

/* 生成方式：高按钮 173.5×70，2 行字（连续出图 14 / 后台队列生成 12） */
.seg-btn--tall {
  width: 173.5px;
  height: 70px;
  flex-direction: column;
  gap: 6px;
}
.seg-strong {
  font-size: 14px;               /* ⭐ 连续出图 14 */
  font-weight: 400;              /* ⭐ 取消加粗 */
  line-height: 1.25;
}
.seg-sub {
  font-size: 12px;               /* ⭐ 后台队列生成 12 */
  font-weight: 400;              /* ⭐ 取消加粗 */
  opacity: 0.78;
  line-height: 1.2;
}

/* 输出尺寸：111.66×44，字号 14（原16→14） */
.seg-row--3 .seg-btn {
  width: 111.66px;
  height: 44px;
  font-size: 14px;
}

/* 生成数量：80.75×36，字号 14（原16→14） */
.seg-row--4 .seg-btn {
  width: 80.75px;
  height: 36px;
  font-size: 14px;
}

/* 选中态：粉红底 + 白字 */
.seg-btn--active {
  background: #FE2C55;
  color: #fff;
  border-color: #FE2C55;
}

/* 窄屏(≤1000)单列：seg-row 2/3/4 列原 359px 锁死 > 手机 343 内宽，向右溢出 16px
   最右按钮边框/文字（实时出图、4K 的 K、10张 的 1）被裁 */
@media (max-width: 999.98px) {
  .seg-row--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 6px; }
  .seg-row--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: 6px; }
  .seg-row--4 { grid-template-columns: repeat(4, minmax(0, 1fr)); column-gap: 6px; }
  .seg-btn,
  .seg-btn--tall,
  .seg-row--3 .seg-btn,
  .seg-row--4 .seg-btn { width: 100%; }
  /* 高按钮高度保持 70px，其他尺寸按钮保持 44/36px — 字号不变 */
}
/* 移动端(≤768)：按钮高度再缩 4px 更贴手机 */
@media (max-width: 767.98px) {
  .seg-btn--tall { height: 66px; }
  .seg-row--3 .seg-btn { height: 40px; }
  .seg-row--4 .seg-btn { height: 32px; }
}
</style>
