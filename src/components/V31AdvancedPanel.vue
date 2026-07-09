<template>
  <section class="v31-advanced">
    <!-- 头部：齿轮 + 高级选项 + 右侧下拉箭头 -->
    <div class="adv-head" @click="open = !open">
      <div class="adv-head__left">
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="adv-head__gear">
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"
                fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.7"/>
        </svg>
        <span class="adv-head__title">高级选项</span>
      </div>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"
           class="adv-head__arrow" :class="{ 'is-open': open }">
        <path d="M6 9 L12 15 L18 9" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <!-- 折叠内容 -->
    <div v-show="open" class="adv-body">
      <!-- 盒子1：自动翻译 -->
      <div class="adv-box">
        <div class="adv-box__left">
          <span class="adv-box__icon adv-box__icon--spark" aria-hidden="true">✨</span>
          <div class="adv-box__txt">
            <div class="adv-box__title">自动翻译</div>
            <div class="adv-box__desc">自动将中文提示词翻译成英文</div>
          </div>
        </div>
        <button
          type="button"
          class="adv-switch"
          :class="{ 'adv-switch--on': translate }"
          role="switch"
          :aria-checked="translate"
          @click="$emit('update:translate', !translate)"
        >
          <span class="adv-switch__thumb"></span>
        </button>
      </div>

      <!-- 盒子2：自动配音 -->
      <div class="adv-box">
        <div class="adv-box__left">
          <span class="adv-box__icon adv-box__icon--note" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M9 17 L9 7 L17 5 L17 15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 17 L5 17" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
              <circle cx="6.5" cy="17.8" r="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/>
              <circle cx="14.5" cy="15.8" r="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/>
            </svg>
          </span>
          <div class="adv-box__txt">
            <div class="adv-box__title">自动配音</div>
            <div class="adv-box__desc">√ 自动为视频添加背景音效</div>
          </div>
        </div>
        <button
          type="button"
          class="adv-switch"
          :class="{ 'adv-switch--on': dubbing }"
          role="switch"
          :aria-checked="dubbing"
          @click="$emit('update:dubbing', !dubbing)"
        >
          <span class="adv-switch__thumb"></span>
        </button>
      </div>
    </div>

    <!-- 底部浅色分割线 -->
    <div class="divider" aria-hidden="true"></div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  translate: { type: Boolean, default: true },
  dubbing:   { type: Boolean, default: true }
})
defineEmits(['update:translate', 'update:dubbing'])

const open = ref(true)
</script>

<style scoped>
.v31-advanced {
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ========= 头部 ========= */
.adv-head {
  width: 100%;
  height: 32px;
  padding: 6px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  margin-bottom: 14px;
}
.adv-head__left {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.adv-head__gear {
  width: 16px; height: 16px; flex: 0 0 16px;
  color: var(--text-secondary, #C9CDD4);
}
.adv-head__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary, #1F2329);
  line-height: 1;
}
.adv-head__arrow {
  width: 16px; height: 16px; flex: 0 0 16px;
  color: var(--text-secondary, #6b7280);
  transition: transform 180ms ease;
}
.adv-head__arrow.is-open { transform: rotate(180deg); }

/* ========= 内容区 ========= */
.adv-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-sizing: border-box;
}

/* 单个盒子 359 × 68 圆角6 背景# */
.adv-box {
  width: 359px;
  height: 68px;
  flex: 0 0 68px;
  border-radius: 6px;
  background: #;
  border: 1px solid var(--border-base, rgba(107, 114, 128, 0.14));
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.adv-box__left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: 1 1 auto;
  min-width: 0;
}
.adv-box__icon {
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.adv-box__icon--spark { font-size: 18px; }
.adv-box__icon--note  { color: #; }

.adv-box__txt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  min-width: 0;
}
.adv-box__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #1F2329);
  line-height: 1.2;
}
.adv-box__desc {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-faint, #6b7280);
  line-height: 1.2;
}

/* ========= 开关 40 × 20 ========= */
.adv-switch {
  appearance: none;
  -webkit-appearance: none;
  width: 40px;
  height: 20px;
  flex: 0 0 40px;
  border: none;
  border-radius: 10px;
  background: #C8CCD3;
  padding: 0;
  position: relative;
  cursor: pointer;
  transition: background-color 200ms ease;
  box-sizing: border-box;
  box-shadow: none;
}
.adv-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.18);
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.adv-switch--on {
  background: #FE2C55;
}
.adv-switch--on .adv-switch__thumb {
  transform: translateX(20px);
  background: #ffffff;
}
.adv-switch:active { transform: scale(0.98); }

/* 底部浅灰分割线 */
.divider {
  width: 100%;
  height: 1px;
  background: var(--divider, rgba(55, 58, 64, 0.9));
  border: none;
  margin-top: 18px;
}
</style>
