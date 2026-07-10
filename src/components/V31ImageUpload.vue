<template>
  <section class="v31-image-upload">
    <div class="panel-title">
      <span class="panel-title__icon">🖼️</span>
      <span class="panel-title__text">添加图片</span>
    </div>

    <div class="uploader" :class="{ 'has-img': modelValue }">
      <template v-if="!modelValue">
        <div class="uploader__plus" aria-hidden="true">+</div>
        <div class="uploader__state">
          <div class="uploader__state--l1">请先登录</div>
          <div class="uploader__state--l2">登录后即可上传图片</div>
        </div>

        <label class="pick-btn" for="v31-image-input">
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
            <circle cx="9" cy="11" r="1.8" fill="currentColor"/>
            <path d="M3 17 L9 12 L14 16 L18 13 L21 16" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>添加图片</span>
        </label>
      </template>
      <template v-else>
        <img :src="modelValue" alt="添加图片预览" class="uploader__preview" />
        <button type="button" class="link-btn remove-btn" @click="onRemove">移除</button>
      </template>
    </div>

    <div class="upload-tips">
      <div class="upload-tips__line upload-tips__line--hint">
        <span class="upload-tips__icon" aria-hidden="true">💡</span>
        <span>上传 1 张图片作为视频的首帧，AI 会基于此图片生成视频内容</span>
      </div>
      <div class="upload-tips__line upload-tips__line--warn">
        <span class="upload-tips__icon" aria-hidden="true">⚠️</span>
        <span>请勿上传名人、公众人物或未成年人照片，违规内容将被拒绝处理</span>
      </div>
    </div>

    <input id="v31-image-input" ref="fileInputRef" type="file" accept="image/*" hidden @change="onFileChange" />
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: null },
  disabled:   { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

const fileInputRef = ref(null)

const onFileChange = (e) => {
  const f = e.target.files && e.target.files[0]
  if (!f) return
  if (!/^image\//.test(f.type)) return
  if (props.modelValue) URL.revokeObjectURL(props.modelValue)
  emit('update:modelValue', URL.createObjectURL(f))
  e.target.value = ''
}
const onRemove = () => {
  if (props.modelValue) URL.revokeObjectURL(props.modelValue)
  emit('update:modelValue', null)
}
</script>

<style scoped>
.v31-image-upload {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: -13px;
  margin-left: 1px;
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 10px;
  transition: color var(--theme-dur) var(--theme-ease);
}
.panel-title__icon { font-size: 14px; }

.uploader {
  flex: 1 1 auto;
  height: 180px;
  min-height: 180px;
  max-height: 180px;
  width: 101%;
  border: 2px dashed var(--border-strong, rgba(255, 255, 255, 0.27));
  border-radius: 12px;
  background: var(--bg-elevated-2, #141414);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0px 16px;
  box-sizing: border-box;
  position: relative;
  transition:
    border-color 180ms ease,
    background-color var(--theme-dur) var(--theme-ease);
  margin-top: -1px;
}
.uploader:hover {
  /* ⭐ 取消 hover 背景色，仅保留描边变化 */
  border-color: var(--border-extra, rgba(255,255,255,0.28));
}
.uploader__plus {
  width:  34px;
  height: 34px;
  border-radius: 10px;
  color: var(--text-faint, #8b8d92);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1;
  font-weight: 300;
  margin-left: 1px;
  transition: color var(--theme-dur) var(--theme-ease);
}
.uploader__state        { text-align: center; }
.uploader__state--l1    {
  font-size: 14px;
  color: var(--text-primary, #E5EAF3);
  font-weight: 500;
  line-height: 1.4;
  transition: color var(--theme-dur) var(--theme-ease);
}
.uploader__state--l2    {
  font-size: 12px;
  color: var(--text-faint, #8B93A0);
  margin-top: 4px;
  line-height: 1.4;
  transition: color var(--theme-dur) var(--theme-ease);
}

.uploader.has-img          { padding: 10px; gap: 0; align-items: flex-start; }
.uploader__preview {
  width: 100%;
  max-width: 360px;
  max-height: 180px;
  object-fit: contain;
  border-radius: 8px;
  background: var(--bg-elevated-3, #000);
  align-self: center;
}
.link-btn {
  appearance: none;
  background: rgba(0,0,0,0.45);
  padding: 3px 9px;
  font-size: 12px;
  border-radius: 7px;
  border: 1px solid rgba(254,44,85,0.35);
  cursor: pointer;
  transition: background-color 160ms ease;
  backdrop-filter: blur(4px);
}
.link-btn:hover { background: rgba(254,44,85,0.18); }

.pick-btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 106px;
  height: 32px;
  padding: 0;
  background: transparent;
  color: var(--text-secondary, #BFC4CC);
  border: 1.5px dashed var(--border-strong, rgba(255,255,255,0.22));
  border-radius: 16px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition:
    border-color 160ms ease,
    color 160ms ease,
    transform 120ms ease,
    background-color 160ms ease;
  box-sizing: border-box;
  margin-top: 18px;
  flex: 0 0 auto;
}
.pick-btn > svg,
.pick-btn > span { flex: 0 0 auto; }
.pick-btn:hover {
  border-color: var(--border-extra, rgba(255,255,255,0.38));
  color: var(--text-primary, #E5EAF3);
  background: var(--hover-bg, rgba(255,255,255,0.03));
  transform: translateY(-1px);
}

.upload-tips {
  width: 101%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
  padding: 0 1px;
}
.upload-tips__line {
  width: 100%;
  box-sizing: border-box;
  display: inline-flex;
  align-items: flex-start;
  gap: 5px;
  font-size: 12px;
  line-height: 1.55;
  letter-spacing: 0.1px;
  flex: 0 0 auto;
}
.upload-tips__icon {
  flex: 0 0 auto;
  font-size: 13px;
  line-height: 1.4;
  padding-top: 0.5px;
}
.upload-tips__line--hint {
  color: var(--text-secondary, #BFC4CC);
  font-weight: 500;
  transition: color var(--theme-dur, 200ms) var(--theme-ease, ease);
}
.upload-tips__line--warn {
  font-weight: 500;
}
.upload-tips__line--warn > span:last-child {
  flex: 1 1 auto;
  min-width: 0;
}
</style>
