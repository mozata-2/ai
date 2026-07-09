<template>
  <section class="ty-audio">
    <div class="panel-title">
      <span class="title-emoji" aria-hidden="true">🎵</span>
      <span class="panel-title__text">音频（可选）</span>
    </div>

    <div class="audio-row">
      <input
        class="audio-input"
        type="text"
        :value="modelValue"
        placeholder="音频文件地址"
        @input="onInput"
      />
      <button type="button" class="select-btn" @click="onSelect">选择</button>
    </div>

    <div class="audio-tip">支持 WAV、MP3 格式，最大 15MB</div>

    <input
      ref="fileInputRef"
      class="hidden-file"
      type="file"
      accept=".wav,.mp3,audio/wav,audio/mpeg,audio/mp3"
      @change="onFileChange"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue', 'change'])

const fileInputRef = ref(null)

function onInput(e) { emit('update:modelValue', e.target.value || '') }
function onSelect() { fileInputRef.value?.click() }
function onFileChange(e) {
  const file = e.target.files && e.target.files[0]
  if (!file) return
  // 目前以文件名模拟 URL，后续对接上传接口时替换
  const pseudoUrl = file.name
  emit('update:modelValue', pseudoUrl)
  emit('change', file)
  // 重置，便于用户重复选择同一文件
  e.target.value = ''
}
</script>

<style scoped>
.ty-audio {
  width: 100%;
  box-sizing: border-box;
  padding: 4px 0 6px;
}

/* 标题：14 加粗（用户最新要求） */
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #1D1E20);
  margin-bottom: 12px;
}
.title-emoji { font-size: 14px; line-height: 1; }
.panel-title__text { flex: 0 0 auto; }

/* 行容器：291 + 5 + 60 = 356 */
.audio-row {
  display: grid;
  grid-template-columns: 291px 60px;
  gap: 5px;
  width: 100%;
  max-width: 356px;
  align-items: center;
  margin-bottom: 8px;
}

/* 地址框 291×32 圆角 6 */
.audio-input {
  appearance: none;
  -webkit-appearance: none;
  width: 291px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid var(--border-base, #DCDFE6);
  background: var(--bg-base, #FFFFFF);
  color: var(--text-primary, #1D1E20);
  font-size: 13px;
  line-height: 1.2;
  padding: 0 10px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 160ms ease;
}
.audio-input::placeholder { color: var(--text-secondary, #909399); }
.audio-input:focus { border-color: #; }

/* 选择按钮 60×32 圆角 6，文字 14 */
.select-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 60px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid var(--border-base, #DCDFE6);
  background: var(--bg-elevated-2, #F2F3F5);
  color: var(--text-primary, #1D1E20);
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: background-color 160ms ease, border-color 160ms ease;
  padding: 0;
}
.select-btn:hover { background: var(--bg-elevated-3, #E9EAEC); border-color: #; }
.select-btn:active { transform: scale(0.99); }

/* 底部提示：12 号 */
.audio-tip {
  font-size: 12px;
  color: var(--text-secondary, #909399);
  line-height: 1.4;
  padding-left: 1px;
}

.hidden-file { display: none; }
</style>
