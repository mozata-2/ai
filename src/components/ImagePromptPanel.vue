<template>
  <section class="image-prompt" :class="{ 'image-prompt--v31': variant === 'v31', 'image-prompt--sr': variant === 'sr' }">
    <div class="panel-title">
      <span class="panel-title__spark">✨</span>
      <span class="panel-title__text">提示词</span>
      <span v-if="variant === 'v31'" class="panel-title__brackets">[ : ]</span>

      <!-- v31模式：标题右侧 12px 文字链接 -->
      <template v-if="variant === 'v31'">
        <span class="panel-title__spacer"></span>
        <button type="button" class="title-action">
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
            <rect x="2" y="4" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
            <path d="M9 14 L16 9 L22 9 L22 16 L15 16 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          </svg>
          <span>视频复刻</span>
        </button>
        <button type="button" class="title-action">
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
            <path d="M12 2 L14.5 9 L22 9 L16 13.5 L18 21 L12 17 L6 21 L8 13.5 L2 9 L9.5 9 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          </svg>
          <span>AI润色</span>
        </button>
      </template>
    </div>

    <textarea
      :value="modelValue"
      @input="onInput"
      class="prompt-textarea"
      :maxlength="max"
      :placeholder="placeholder"
      :rows="rows"
    ></textarea>
    <div class="prompt-panel__foot">
      <div class="prompt-tags" aria-hidden="true">
        <span
          v-for="tag in suggestTags"
          :key="tag"
          class="prompt-tag"
          @click="onAppend(tag)"
        >{{ tag }}</span>
      </div>
      <div class="prompt-count" :class="{ warn: modelValue.length > max * 0.9 }">
        {{ modelValue.length }} / {{ max }}
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  modelValue:    { type: String, default: '' },
  max:           { type: Number, default: 2000 },
  placeholder:   { type: String, default: '描述你想要的图片效果' },
  rows:          { type: Number, default: 5 },
  suggestTags:   { type: Array,  default: () => [] },
  variant:       { type: String, default: '', validator: (v) => ['', 'v31'].includes(v) }
})
const emit = defineEmits(['update:modelValue'])

const onInput = (e) => emit('update:modelValue', e.target.value || '')
const onAppend = (t) => {
  if (!t) return
  const sep = props.modelValue.length > 0 && !/\s|[,，。；;]$/.test(props.modelValue) ? '，' : ''
  emit('update:modelValue', (props.modelValue + sep + t).slice(0, props.max))
}
</script>

<style scoped>
/* ================ 默认（窄屏/单列）：全量自适应，零硬编码 ================ */
.image-prompt {
  width: 100%;
  box-sizing: border-box;
  background: transparent;
  /* margin-left:-169 / margin-top:-10 是「宽屏向 subTools 区伸出」的 hack，仅 ≥1000 生效 */
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 9px;
  width: 100%;
  position: relative;
}
.panel-title__spark { font-size: 14px; flex: 0 0 auto; }
.panel-title__text  { flex: 0 0 auto; }
.panel-title__brackets {
  flex: 0 0 auto;
  color: var(--text-faint, #6B7280);
  font-family: monospace;
  font-size: 14px;
  margin-left: 2px;
}
.panel-title__spacer { flex: 0 0 auto; width: 0; }

/* v31：右侧操作按钮 */
.title-action {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  margin-left: 18px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  flex: 0 0 auto;
  transition: color 160ms ease;
}


/* 让右侧按钮真正靠右 */
@media all {
  .panel-title { justify-content: flex-start; flex-wrap: nowrap; }
  .title-action { margin-left: auto; }
  .title-action + .title-action { margin-left: 14px; margin-right: 0; }
}

.prompt-textarea {
  /* 默认窄屏：width:100%，不锁 363px */
  width: 100%;
  max-width: 100%;
  min-height: 140px;
  resize: vertical;
  background: var(--bg-surface, #FFFFFF);     /* 深色=深灰/黑色；浅色=白底 */
  color: var(--text-primary, #E5EAF3);
  border: 1px solid var(--border-strong, rgba(255,255,255,0.25));
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.6;
  box-sizing: border-box;
  outline: none;
  transition: border-color 180ms ease, background-color 180ms ease;
  font-family: inherit;
}
/* SR：窄屏也自适应，只锁高度（按用户要求 166px） */
.image-prompt--sr .prompt-textarea {
  width: 100%;
  max-width: 100%;
  min-height: 166px;
  height: 166px;
  resize: none;
}
.prompt-textarea::placeholder {
  color: var(--text-faint, #999fad);
}
.prompt-textarea:hover {
  border-color: var(--border-extra, rgba(255,255,255,0.14));
}
.prompt-textarea:focus {
  border-color: rgba(254,44,85,0.55);
  background: var(--bg-elevated-3, #0F1012);
}

/* 默认窄屏：底部栏不做 203% 溢出，严格 100% + 折行，标签 + 计数分别占行 */
.prompt-panel__foot {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-height: 0;
  width: 100%;
  flex-wrap: wrap;
  align-items: flex-end;
}
.prompt-tags {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 4px;
  flex: 1 1 100%;
  min-width: 0;
}
.prompt-tag {
  appearance: none;
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 10px;
  font-size: 12px;
  color: var(--text-secondary, #BFC4CC);
  background: var(--bg-elevated-2, #26272B);
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  border-radius: 13px;
  cursor: pointer;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease;
  user-select: none;
  box-sizing: border-box;
}
.prompt-tag:hover {
  color: var(--text-primary, #E5EAF3);
  background: var(--bg-elevated-3, #2D2F34);
  border-color: var(--border-strong, rgba(255,255,255,0.14));
}
.prompt-count {
  flex: 0 0 auto;
  font-size: 12px;
  color: var(--text-faint, #8B93A0);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  transition: color 160ms ease;
}

/* =====================================================================
   宽屏(≥1000)双列布局：保持与窄屏一致的 width:100% 自适应，
   不再使用过期的「向左侧 subTools 列伸出」 hack（-169px 左移/203%宽/363px 锁宽）
   —— 该 hack 会导致标题/左边框/左侧文字被 .col-left overflow:hidden 裁掉。
   ===================================================================== */
@media (min-width: 1000px) {
  .prompt-textarea { min-height: 160px; }   /* 仅把桌面 textarea 加高 20px，体验更舒展 */
}

/* 移动端(≤768)进一步紧凑：输入框尺寸更贴手指点击区 */
@media (max-width: 767.98px) {
  .prompt-textarea,
  .image-prompt--sr .prompt-textarea {
    padding: 10px 12px;
    min-height: 120px;
  }
  .prompt-tag { height: 28px; padding: 0 12px; }
}

</style>
