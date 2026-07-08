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
/* 外层 wrapper：向左伸 36px，抵消父容器 .content-scroll 的 padding-left:36px，
   让版心可以按真实视口宽度居中，不整体偏右。块级 100% 宽。*/
.home-wrapper {
  margin-left: -36px;
  width: auto;
}

/* ⭐ 版心：实体宽度就是 1309，左右无 padding。max-width:100% 兼容小屏 */
.home-content {
  width: 1309px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  box-sizing: border-box;
}
</style>
