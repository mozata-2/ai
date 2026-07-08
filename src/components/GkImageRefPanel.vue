<template>
  <section class="gk-image-ref">
    <div class="panel-title">
      <span class="panel-title__icon">🏞️</span>
      <span class="panel-title__text">上传参考图片</span>
      <span class="panel-title__opt">（必填，1 张）</span>
    </div>

    <div class="uploader" :class="{ 'has-img': modelValue }">
      <template v-if="!modelValue">
        <div class="uploader__plus" aria-hidden="true">+</div>
        <div class="uploader__state">
          <div class="uploader__state--l1">请先登录</div>
          <div class="uploader__state--l2">登录后即可上传图片</div>
        </div>

        <label class="pick-btn" for="gk-image-ref-input">
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
            <circle cx="9" cy="11" r="1.8" fill="currentColor"/>
            <path d="M3 17 L9 12 L14 16 L18 13 L21 16" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>选择图片</span>
        </label>
      </template>
      <template v-else>
        <img :src="modelValue" alt="参考图片预览" class="uploader__preview" />
        <button type="button" class="link-btn remove-btn" @click="onRemove">移除</button>
      </template>
    </div>

    <div class="gk-tip">
      <span class="gk-tip__icon">💡</span>
      <span class="gk-tip__text">G1.5 只支持图生视频，请先上传一张参考图</span>
    </div>

    <input id="gk-image-ref-input" ref="fileInputRef" type="file" accept="image/*" hidden @change="onFileChange" />
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
.gk-image-ref {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 400;
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 10px;
  transition: color var(--theme-dur) var(--theme-ease);
}
.panel-title__icon { font-size: 14px; }
.panel-title__opt  {
   color: var(--text-faint, #6b7280);
   font-weight: 400;
   margin-left: 4px;
   margin-top: 1px;
   font-size: 14px;
   transition: color var(--theme-dur) var(--theme-ease);
}

.uploader {
  flex: 1 1 auto;
  height: 220px;
  min-height: 220px;
  max-height: 220px;
  width: 100%;
  border: 2px dashed var(--border-strong, rgba(255, 255, 255, 0.27));
  border-radius: 16px;
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
}
.uploader:hover {
  border-color: var(--border-extra, rgba(255, 255, 255, 0.28));
}
.uploader__plus {
  width:  34px;
  height: 34px;
  border-radius: 10px;
  color: var(--text-faint, #8b8d92);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
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
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
  background: var(--bg-elevated-3, #000);
  align-self: center;
}
.link-btn {
  appearance: none;
  background: rgba(0,0,0,0.45);
  color: #FE2C55;
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
  width: 132px;
  height: 40px;
  padding: 0;
  background: transparent;
  color: var(--text-secondary, #BFC4CC);
  border: 1.5px dashed var(--border-strong, rgba(255,255,255,0.22));
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition:
    border-color 160ms ease,
    color 160ms ease,
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
}

.gk-tip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding: 0 2px;
}
.gk-tip__icon { font-size: 14px; flex: 0 0 auto; }
.gk-tip__text {
  font-size: 12px;
  color: var(--text-faint, #98A2B3);
  line-height: 1.4;
  font-weight: 400;
  transition: color var(--theme-dur) var(--theme-ease);
}
</style>
