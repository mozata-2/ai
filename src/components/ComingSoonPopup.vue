<!--
  ⭐ 敬请期待气泡（音乐 / 画布 等菜单用）：
    - 大小固定 260 × 82（用户音乐菜单气泡要求）
    - 只有 1 行文字：敬请期待，居中显示
    - 左侧菱形指示物（和 SubToolsPopup 完全一致：方块 rotate45°，一半凸出气泡左边缘）
    - Teleport 挂 body → 永远不被 sidebar overflow 裁掉
    - 定位逻辑和 SubToolsPopup 完全对齐：anchorEl.getBoundingClientRect() + 垂直居中 + 右越界翻左
-->
<template>
  <Teleport to="body">
    <div
      v-if="visible"
      ref="popupRef"
      class="coming-soon-popup"
      role="dialog"
      aria-label="敬请期待"
      :style="popupStyle"
      @mouseenter="$emit('popup-enter')"
      @mouseleave="$emit('popup-leave')"
    >
      <!-- 指向左侧菜单项的菱形指示物（和 SubToolsPopup 样式完全一致）；top 动态计算永远对准菜单项中间，气泡顶部和菜单项顶部对齐（完全不动） -->
      <div class="coming-soon-popup__diamond" aria-hidden="true" :style="diamondStyle"></div>

      <!-- 内容：敬请期待 居中 -->
      <div class="coming-soon-popup__body">
        <span class="coming-soon-popup__text">敬请期待</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

/* ========== 常量（用户指定：音乐气泡 260×82） ========== */
const POPUP_W = 260
const POPUP_H = 82
const GAP_X   = 16   // 锚点和气泡之间的水平间隙（和 SubToolsPopup 保持一致）

/* ========== Props / Emits ========== */
const props = defineProps({
  visible:   { type: Boolean, default: false },
  anchorEl:  { type: Object,  default: null }, // HTMLElement
  offsetX:   { type: Number,  default: 0 },
  offsetY:   { type: Number,  default: 0 }
})
defineEmits(['popup-enter', 'popup-leave'])

/* ========== 定位（和 SubToolsPopup 保持一致：气泡顶部与菜单项顶部对齐，完全不动；菱形动态指向菜单项中间）
   ⭐ 彻底修复"还是会动"：popupStyle / diamondStyle 改为 computed + tick 依赖，
      v-if=true 第一帧就有完整 position/top/left，绝不闪烁。
      同时删除 box-shadow 发散光（用户要求"取消所有按钮的发散光!!!"）。
   ==================================================================================================== */
const tick = ref(0)

const _calc = () => {
  const anchor = (props.anchorEl && typeof props.anchorEl.getBoundingClientRect === 'function')
    ? props.anchorEl
    : null
  if (!anchor) {
    return {
      popup: {
        position: 'fixed',
        top:   '-9999px',
        left:  '-9999px',
        width: `${POPUP_W}px`,
        height:`${POPUP_H}px`,
        zIndex: 9999
      },
      diamond: { top: '34px' }
    }
  }

  const a  = anchor.getBoundingClientRect()
  const ph = POPUP_H

  let left = a.right + GAP_X + props.offsetX
  // ⭐ 气泡顶部和菜单项顶部对齐 → 完全不随气泡高度变化，气泡切换时"完全不动"
  let top  = a.top + props.offsetY

  const vw = window.innerWidth  || document.documentElement.clientWidth
  const vh = window.innerHeight || document.documentElement.clientHeight

  if (left + POPUP_W > vw - 8) left = Math.max(8, a.left - GAP_X - POPUP_W - props.offsetX)
  if (top + ph > vh - 8) top = vh - ph - 8
  if (top < 8) top = 8

  // ⭐ 菱形指示物动态 top：永远指向菜单项垂直中间（与敬请期待气泡高度 82 无关）
  const diamondTop = Math.round((a.top + a.height / 2) - top - 7)

  return {
    popup: {
      position: 'fixed',
      top:   `${Math.round(top)}px`,
      left:  `${Math.round(left)}px`,
      width: `${POPUP_W}px`,
      height:`${POPUP_H}px`,
      zIndex: 9999
    },
    diamond: { top: `${diamondTop}px` }
  }
}

const popupStyle = computed(() => {
  tick.value /* eslint-disable-line no-unused-expressions */
  return _calc().popup
})
const diamondStyle = computed(() => {
  tick.value /* eslint-disable-line no-unused-expressions */
  return _calc().diamond
})

let _raf = 0
const scheduleRecalc = () => {
  if (_raf) cancelAnimationFrame(_raf)
  _raf = requestAnimationFrame(() => {
    _raf = 0
    tick.value++
  })
}

onMounted(() => {
  window.addEventListener('scroll',  scheduleRecalc, true)
  window.addEventListener('resize',  scheduleRecalc, true)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll',  scheduleRecalc, true)
  window.removeEventListener('resize',  scheduleRecalc, true)
  if (_raf) cancelAnimationFrame(_raf)
})
</script>

<style scoped>
/* ========== 气泡容器：和 SubToolsPopup 视觉风格完全一致 ========== */
.coming-soon-popup {
  box-sizing: border-box;
  /* ⭐ 和 SubToolsPopup 同色：#1A1C20，保持气泡切换时颜色不跳 */
  background: var(--bg-elevated, #1A1C20);
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  border-radius: 16px;
  /* ⭐ 删除发散光 box-shadow（用户要求"取消所有按钮的发散光!!!"） */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: visible;               /* ⭐ 菱形指示物要超出气泡左边 */
}

/* ========== 菱形指示物：和 SubToolsPopup 完全一致（14×14, left:-7, border-right+border-bottom） ========== */
.coming-soon-popup__diamond {
  position: absolute;
  left: -7px;                      /* 一半露在气泡外面（14×14 的方块，rotate 后约 ±10，放 -7 让凸出来 ~7px，贴合菜单项） */
  /* ⭐ top 不再 translateY(-50%)，现在用动态 style 永远指向菜单项中间 */
  width:  14px;
  height: 14px;
  background: var(--bg-elevated, #1A1C20);
  transform: rotate(45deg);
  pointer-events: none;
  /* 让菱形的两条"非外边"与气泡 1px 边框贴合，视觉上不割裂 */
  border-right: 1px solid var(--border-base, rgba(255,255,255,0.06));
  border-bottom: 1px solid var(--border-base, rgba(255,255,255,0.06));
  border-left: none;
  border-top: none;
  border-bottom-right-radius: 2px;
}

/* ========== 内容：敬请期待 居中 ========== */
.coming-soon-popup__body {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.coming-soon-popup__text {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
  letter-spacing: 1px;
}
</style>
