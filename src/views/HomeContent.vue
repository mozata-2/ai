<template>
  <!-- ⭐ 外层 wrapper：margin-left:-36px 抵消 Layout.content-scroll 的 padding-left:36px，
       让内部版心能在整个视口宽度里真正居中；小屏下自动收缩不溢出。 -->
  <div class="home-wrapper">
    <div class="home-content">
      <!-- Banner 横幅 -->
      <BannerSection />

      <!-- 功能卡片区 -->
      <FeatureCards />

      <!-- 提示词广场 -->
      <PromptPlaza />
    </div>
  </div>
</template>

<script setup>
import BannerSection from '../components/BannerSection.vue'
import FeatureCards from '../components/FeatureCards.vue'
import PromptPlaza from '../components/PromptPlaza.vue'
</script>

<style scoped>
/* 外层 wrapper：抵消父容器 Layout.content-scroll 左右 padding，
   让内部版心按「真实视口宽度」居中、左右到屏幕边缘的间距对称。
   左右负值严格等于父容器 padding（宽屏 36 左 / 18 右；窄屏相等），
   避免之前只 offset 左边 → 导致「左边贴边右边还空一大条」（用户反馈）。*/
.home-wrapper {
  margin-left: calc(var(--layout-left-pad, 36px) * -1);
  /* 宽屏 content-scroll.padding-right = 0.5 × left = 18px，这里一起抵消 */
  margin-right: calc(var(--layout-left-pad, 36px) * -0.5);
  width: auto;
}

/* ⭐ 版心：基准 1136，夹在 92vw 内（窄屏不横溢）；左右自适应间距 */
.home-content {
  width: 1136px;
  max-width: var(--max-home-content, 100%);
  margin-left: auto;
  margin-right: auto;
  padding: 0 clamp(8px, 1.5vw, 16px);
  box-sizing: border-box;
}

/* --- 中屏：版心更贴近可用宽度，进一步消除左右空边 --- */
@media (max-width: 1279.98px) {
  .home-content { padding: 0 8px; }
}
/* --- 窄屏 ≤1000：Layout.content-scroll 左右 padding 已对称 16/16 →
       wrapper 必须两侧各 -16 才能真正贴满视口，然后 .home-content 自己的
       padding: 0 12px 保证 banner / 卡片到屏幕边缘左右等距。--- */
@media (max-width: 999.98px) {
  .home-wrapper {
    margin-left: calc(var(--layout-left-pad, 16px) * -1);
    margin-right: calc(var(--layout-left-pad, 16px) * -1);
  }
  .home-content { width: 100%; padding: 0 12px; }
}
/* --- 移动端 ≤768：Layout 对称 12/12，wrapper 对应抵消；版心再各留 8px --- */
@media (max-width: 767.98px) {
  .home-wrapper {
    margin-left: calc(var(--layout-left-pad, 12px) * -1);
    margin-right: calc(var(--layout-left-pad, 12px) * -1);
  }
  .home-content { padding: 0 8px; }
}
</style>
