<template>
  <section class="image-ref">
    <div class="panel-title">
      <span class="panel-title__icon">🖼️</span>
      <span class="panel-title__text">参考图片</span>
      <span class="panel-title__opt">（可选）</span>
    </div>

    <!-- 虚线上传框 -->
    <div class="uploader" :class="{ 'has-img': modelValue }">
      <template v-if="!modelValue">
        <div class="uploader__plus" aria-hidden="true">+</div>
        <div class="uploader__state">
          <div class="uploader__state--l1">请先登录</div>
          <div class="uploader__state--l2">登录后即可上传图片</div>
        </div>

        <!-- ⭐ 选择图片按钮：移入虚线框「里面」，严格 106 × 32 -->
        <label class="pick-btn" for="image-ref-input">
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

    <!-- ⭐ input 独立放在最后（隐藏），label 已移入虚线框 -->
    <input id="image-ref-input" ref="fileInputRef" type="file" accept="image/*" hidden @change="onFileChange" />
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
.image-ref {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: -6px;
  margin-left: 12px;
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  /* ⭐ 亮/暗主题统一 */
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 10px;
  transition: color var(--theme-dur) var(--theme-ease);
}
.panel-title__icon { font-size: 14px; }
.panel-title__opt  {
   /* ⭐ 亮/暗主题统一：弱化文字色 */
   color: var(--text-faint, #6b7280);
    font-weight: 400; 
    margin-left: 4px;
    margin-top: 1px;
    font-size: 12px;
    transition: color var(--theme-dur) var(--theme-ease);
  }

.uploader {
  flex: 1 1 auto;
  /* ⭐ 用户要求：虚线上传框高度固定 176（代码中是 180，保留原数） */
  height: 180px;
  min-height: 180px;
  max-height: 180px;
  width: 101%;
  /* ⭐ 亮/暗主题统一：用主题描边变量，亮主题下自动换成深色虚线 */
  border: 2px dashed var(--border-strong, rgba(255, 255, 255, 0.27));
  border-radius: 12px;
  /* ⭐ 亮/暗主题统一：使用 elevated-2（暗→深灰；亮→浅灰）替代硬编码 #141414 */
  /* background: var(--bg-elevated-2, #ffffff);  */
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
  /* ⭐ 亮/暗主题统一：hover 描边用 --border-extra */
  border-color: var(--border-extra, rgba(255, 255, 255, 0.28));
  background:
    radial-gradient(circle at 50% 0%, rgb(255, 255, 255) 0%, transparent 60%),
    var(--hover-bg, rgba(255, 255, 255, 0));
}
.uploader__plus {
  width:  34px;
  height: 34px;
  border-radius: 10px;
  /* ⭐ 亮/暗主题统一：次级文字色 */
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
  /* ⭐ 亮/暗主题统一 */
  color: var(--text-primary, #E5EAF3);
  font-weight: 500;
  line-height: 1.4;
  transition: color var(--theme-dur) var(--theme-ease);
}
.uploader__state--l2    {
  font-size: 12px;
  /* ⭐ 亮/暗主题统一：弱化文字色 */
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
  /* ⭐ 亮/暗主题统一：预览底用 elevated-3（比 elevated-2 再深一级） */
  background: var(--bg-elevated-3, #000);
  align-self: center;
}
.link-btn {
  appearance: none;
  /* ⭐ 亮/暗主题统一：半透明遮罩 + 粉色文字，亮主题下也可读；
        不用 --mask-soft（未定义），直接用 rgba 同时兼容两种主题 */
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

/* 选择图片按钮：严格 106 × 32，位于虚线框内部
   ⭐ 新外观：外框虚线、圆角胶囊、无背景色（与用户提供的参考图一致） */
.pick-btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  /* ⭐ 严格 106 × 32 */
  width: 106px;
  height: 32px;
  padding: 0;
  background: transparent;            /* ⭐ 无背景色 */
  /* ⭐ 亮/暗主题统一：用次级文字色，亮主题下变深灰 */
  color: var(--text-secondary, #BFC4CC);
  /* ⭐ 亮/暗主题统一：虚线用描边变量 */
  border: 1.5px dashed var(--border-strong, rgba(255,255,255,0.22));
  border-radius: 16px;                /* 32 / 2 → 胶囊圆角 */
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition:
    border-color 160ms ease,
    color 160ms ease,
    transform 120ms ease,
    background-color 160ms ease;
  box-sizing: border-box;
  margin-top: 18px;                    /* 与上方「登录后即可上传图片」留呼吸空间 */
  flex: 0 0 auto;                    /* 不参与 flex 弹性缩放，保持 106×32 */
}
.pick-btn > svg,
.pick-btn > span { flex: 0 0 auto; }
.pick-btn:hover {
  /* hover 时轻微提亮虚线 / 文字，不引入填充背景 */
  border-color: var(--border-extra, rgba(255,255,255,0.38));
  color: var(--text-primary, #E5EAF3);
  background: var(--hover-bg, rgba(255,255,255,0.03));
  transform: translateY(-1px);
}
</style>
