<template>
  <section class="banana-prompt">
    <!-- 标题栏：左（✨ + 提示词 + [] 方括号icon）/ 右（视角 + AI润色） -->
    <header class="prompt-header">
      <div class="prompt-header__left">
        <span class="left-emoji" aria-hidden="true">✨</span>
        <span class="left-title">提示词</span>
        <span class="left-brackets" aria-hidden="true">[ ]</span>
      </div>
      <div class="prompt-header__right">
          <button type="button" class="mini-btn" @click="$emit('viewpoint')" aria-label="视角">
              <span class="mini-btn__icon">📷</span>
              <span>视角</span>
          </button>
          <button type="button" class="mini-btn" @click="$emit('ai-polish')" aria-label="AI润色">
              <span class="mini-btn__icon">✨</span>
              <span>AI润色</span>
          </button>
      </div>
    </header>

    <!-- 提示词输入域 -->
    <div class="textarea-wrap">
        <textarea
            class="prompt-textarea"
            :value="modelValue"
            :maxlength="max"
            placeholder="请输入绘图提示词，描述您想要生成的图片..."
            @input="$emit('update:modelValue', $event.target.value)"
        ></textarea>
        <div class="textarea-example">例如：一只可爱的橘猫坐在窗台上，阳光洒在它身上，背景是模糊的城市景观...</div>
    </div>

    <!-- 底部建议提示 -->
    <p class="prompt-footer">
        <span class="footer-emoji" aria-hidden="true">💡</span>
        <span>提示：详细的描述可以获得更好的生成效果</span>
        <span v-if="max" class="char-counter">{{ modelValue.length }} / {{ max }}</span>
    </p>

    <!-- 建议标签 -->
    <div v-if="suggestTags && suggestTags.length" class="suggest-row">
        <span
          v-for="tag in suggestTags"
          :key="tag"
          class="suggest-chip"
          @click="appendTag(tag)"
        >#{{ tag }}</span>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  max: { type: Number, default: 2000 },
  suggestTags: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue', 'viewpoint', 'ai-polish'])

function appendTag(tag) {
  const glue = props.modelValue && !/\s$/.test(props.modelValue) ? '，' : ''
  emit('update:modelValue', props.modelValue + glue + tag)
}
</script>

<style scoped>
.banana-prompt {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 0;
}

/* 顶部标题栏：提示词 vs 视角+AI润色（右） */
.prompt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.prompt-header__left {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary, #E5EAF3);
}
.left-emoji { font-size: 18px; }
.left-brackets {
  color: #a0a3ab;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  font-weight: 500;
}
.prompt-header__right {
  display: inline-flex;
  align-items: center;
  gap: 18px;
}
.mini-btn {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: none;
  padding: 4px 6px;
  cursor: pointer;
  color: #FE2C55;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  transition: background-color 120ms ease, color 120ms ease;
}
.mini-btn:hover { background: rgba(254,44,85,0.08); }
.mini-btn__icon { font-size: 16px; }

/* 文本域 */
.textarea-wrap {
  position: relative;
  border: 1.5px solid var(--border-base, rgba(255,255,255,0.10));
  border-radius: 14px;

  padding: 12px 12px 18px;
  transition: border-color 160ms ease;
}
.textarea-wrap:focus-within {
  border-color: #FE2C55;
}
.prompt-textarea {
  width: 100%;
  min-height: 160px;
  resize: vertical;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary, #E5EAF3);
  font-size: 14px;
  line-height: 1.7;
  padding: 0;
  display: block;
  font-family: inherit;
}
.prompt-textarea::placeholder { color: var(--text-placeholder, #646672); }
.textarea-example {
  color: var(--text-secondary, #a0a3ab);
  font-size: 13px;
  line-height: 1.7;
  margin-top: 6px;
}

/* 底部黄色灯泡建议 */
.prompt-footer {
  margin: 10px 2px 6px;
  color: var(--text-secondary, #a0a3ab);
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.footer-emoji { font-size: 14px; }
.char-counter { margin-left: auto; color: var(--text-tertiary, #70727c); }

/* 建议标签 */
.suggest-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
.suggest-chip {
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: var(--bg-elevated-3, #2a2b30);
  color: var(--text-primary, #E5EAF3);
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 120ms ease, transform 120ms ease, color 120ms ease;
}
.suggest-chip:hover {
  background: rgba(254,44,85,0.12);
  color: #FE2C55;
  transform: translateY(-1px);
}
</style>
