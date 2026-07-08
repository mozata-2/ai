<template>
  <section class="image-prompt">
    <div class="panel-title">
      <span class="panel-title__spark">✨</span>
      <span class="panel-title__text">提示词</span>
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
  suggestTags:   { type: Array,  default: () => [] }
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
.image-prompt {
  width: 100%;
  box-sizing: border-box;
  
  background: transparent;
  margin-top: -10px;
  margin-left: -166px;
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  /* ⭐ 亮/暗主题统一：硬编码 #E5EAF3 → 主题变量 */
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 9px;
}
.panel-title__spark { font-size: 14px; }

.prompt-textarea {
  width: 363px;
  min-height: 140px;
  resize: vertical;
  /* ⭐ 亮/暗主题统一：底色/描边/字色用主题变量 */

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
.prompt-textarea::placeholder {
  /* ⭐ 亮/暗主题统一：占位符灰使用 --text-faint */
  color: var(--text-faint, #999fad);
}
.prompt-textarea:hover {
  border-color: var(--border-extra, rgba(255,255,255,0.14));
}
.prompt-textarea:focus {
  border-color: rgba(254,44,85,0.55);
  /* ⭐ 亮/暗主题统一：聚焦底使用更"凹陷"的 elevated-3（比 elevated-2 深一级） */
  background: var(--bg-elevated-3, #0F1012);
}

.prompt-panel__foot {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-height: 0;
  width: 203%;
}
.prompt-tags {
  display: flex;
  flex-wrap: wrap;
  width: 363px;
  gap: 4px;
  flex: 1 1 363;
  /* ⭐ 亮/暗主题统一：标签宽度自适应 */
  min-width: 0;
}
.prompt-tag {
  appearance: none;
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 10px;
  border-radius: 13px;
  /* ⭐ 亮/暗主题统一：标签背景/边框/文字 → 主题变量 */
  background: var(--bg-elevated, rgba(255,255,255,0.05));
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  color: var(--text-secondary, #BFC4CC);
  font-size: 12px;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
  user-select: none;
}
.prompt-tag:hover {
  background: rgba(254,44,85,0.14);
  color: #FF8FA7;
  border-color: rgba(254,44,85,0.28);
}
.prompt-tag:active { transform: scale(0.95); }

.prompt-count {
  flex: 0 0 auto;
  font-variant-numeric: tabular-nums;
  font-size: 12px;
  /* ⭐ 亮/暗主题统一：计数灰 → --text-faint */
  color: var(--text-faint, #6D7380);
  line-height: 1;
  letter-spacing: 0.2px;
}
.prompt-count.warn { color: #FF8A5C; }
</style>
