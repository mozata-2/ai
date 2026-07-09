<template>
  <section class="gk-image-ref">
    <!-- 标题：g15模式=参考图片(必填)；classic模式=上传场景/产品图(可选) -->
    <div class="panel-title">
      <span class="panel-title__icon">{{ isClassic ? '📷' : '🖼️' }}</span>
      <span class="panel-title__text">{{ titleText }}</span>
      <span v-if="!isClassic" class="panel-title__required">必填</span>
      <span v-else class="panel-title__opt">（可选）</span>
    </div>

    <div class="uploader" :class="{ 'has-img': modelValue }">
      <template v-if="!modelValue">
        <div class="uploader__plus" aria-hidden="true">+</div>
        <div class="uploader__state">
          <div class="uploader__state--l1">请先登录</div>
          <div class="uploader__state--l2">登录后即可上传图片</div>
        </div>

        <!-- 按钮区：classic模式多一个「多图拼接」-->
        <div class="btn-row">
          <label class="pick-btn" for="gk-image-ref-input">
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
              <circle cx="9" cy="11" r="1.8" fill="currentColor"/>
              <path d="M3 17 L9 12 L14 16 L18 13 L21 16" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>选择图片</span>
          </label>

          <button
            v-if="isClassic"
            type="button"
            class="pick-btn pick-btn--merge"
            @click="onMergeClick"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
              <rect x="3"  y="3"  width="9" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
              <rect x="12" y="3"  width="9" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
              <rect x="3"  y="12" width="9" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
              <rect x="12" y="12" width="9" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
            </svg>
            <span>多图拼接</span>
          </button>
        </div>
      </template>
      <template v-else>
        <img :src="modelValue" alt="参考图片预览" class="uploader__preview" />
        <button type="button" class="link-btn remove-btn" @click="onRemove">移除</button>
      </template>
    </div>

    <input id="gk-image-ref-input" ref="fileInputRef" type="file" accept="image/*" hidden @change="onFileChange" />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: null },
  disabled:   { type: Boolean, default: false },
  mode: {
    type: String,
    default: 'g15',
    validator: (v) => ['g15', 'classic'].includes(v)
  }
})
const emit = defineEmits(['update:modelValue', 'merge-click'])

const isClassic = computed(() => props.mode === 'classic')
const titleText = computed(() => isClassic.value ? '上传场景/产品图' : '参考图片')

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
const onMergeClick = () => {
  emit('merge-click')
}
</script>

<style scoped>
.gk-image-ref {
  width: 100%;
  box-sizing: border-box;
  /* ⭐ GK下所有面板统一左对齐基准：GkHeadPanel标题的 padding-left=6px */
  padding: 12px 6px;
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: -6px;
  margin-left: 0;                          /* ✅ 删除多余 12px（原来比基准多一倍：6 vs 18） */
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
.panel-title__required {
  color: #;
  font-weight: 400;
  margin-left: 4px;
  margin-top: 1px;
  font-size: 12px;
}
.panel-title__opt {
  color: var(--text-faint, #6b7280);
  font-weight: 400;
  margin-left: 0;
  margin-top: 1px;
  font-size: 14px;
}

.uploader {
  flex: 1 1 auto;
  height: 180px;
  min-height: 180px;
  max-height: 180px;
  width: 100%;                         /* ✅ 去掉 101%（为了对冲 margin-left12px 的旧hack），现在左右边距正确后直接100% */
  border: 2px dashed var(--border-strong, rgba(255, 255, 255, 0.27));
  border-radius: 12px;
  background: transparent;
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
  color: #;
  padding: 3px 9px;
  font-size: 12px;
  border-radius: 7px;
  border: 1px solid rgba(254,44,85,0.35);
  cursor: pointer;
  transition: background-color 160ms ease;
  backdrop-filter: blur(4px);
}
.link-btn:hover { background: rgba(254,44,85,0.18); }

/* 按钮行：classic两按钮并排 */
.btn-row {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 18px;
  flex: 0 0 auto;
}
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
    background-color 160ms ease;
  box-sizing: border-box;
  flex: 0 0 auto;
}
.pick-btn > svg,
.pick-btn > span { flex: 0 0 auto; }
.pick-btn:hover {
  border-color: var(--border-extra, rgba(255,255,255,0.38));
  color: var(--text-primary, #E5EAF3);
}
</style>
