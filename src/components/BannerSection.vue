<template>
  <section class="banner-section">
    <div class="banner-slider">
      <!-- 当前 Banner 图片 -->
      <div class="banner-slide">
        <img
          class="banner-image"
          :src="banners[currentIndex].imgSrc"
          :alt="banners[currentIndex].alt"
        />
      </div>

      <!-- Banner 指示器 -->
      <div class="banner-dots">
        <span
          v-for="(b, i) in banners"
          :key="i"
          class="dot"
          :class="{ active: currentIndex === i }"
          @click="goTo(i)"
        ></span>
      </div>

      <!-- 左右切换按钮 -->
      <button class="arrow-btn arrow-left" @click="prev" aria-label="上一张">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="arrow-btn arrow-right" @click="next" aria-label="下一张">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import banner1 from '../img/轮1.jpg'
import banner2 from '../img/轮2.jpg'

const currentIndex = ref(0)
let timer = null

const banners = ref([
  { imgSrc: banner1, alt: '轮播图1' },
  { imgSrc: banner2, alt: '轮播图2' }
])

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % banners.value.length
  resetTimer()
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + banners.value.length) % banners.value.length
  resetTimer()
}

const goTo = (i) => {
  currentIndex.value = i
  resetTimer()
}

const resetTimer = () => {
  if (timer) clearInterval(timer)
  timer = setInterval(next, 5000)
}

onMounted(() => {
  timer = setInterval(next, 5000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.banner-section {
  width: 100%;
  /* ⭐ 不要任何左右 margin，实体宽度继承 1309 版心 */
  margin: 0 0 32px;
  padding-top: 19px;
  box-sizing: border-box;
}

.banner-slider {
  /* ⭐ 去掉 width:99% / margin-left:6px / margin-top:18px →
       宽度撑满父容器 1309，左右不留任何空间 */
  margin: 0;
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
  /* ⭐ 删除发散光 box-shadow */
}

.banner-slide {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 轮播主图：cover 填满容器，避免白边 */
.banner-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  user-select: none;
  -webkit-user-drag: none;
}

/* 指示器 */
.banner-dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  transition:
    background-color var(--theme-dur, 240ms) ease,
    width var(--interact-dur, 180ms) ease;
}

.dot.active {
  width: 24px;
  background: #fff;
  /* ⭐ 删除发散光 box-shadow */
}

/* 箭头 */
.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition:
    opacity var(--interact-dur, 180ms) ease,
    background-color var(--interact-dur, 180ms) ease;
  z-index: 10;
  border: none;
  cursor: pointer;
  padding: 0;
}

.banner-slider:hover .arrow-btn {
  opacity: 1;
}

.arrow-btn:hover {
  background: rgba(0, 0, 0, 0.5);
}

.arrow-left {
  left: 16px;
}

.arrow-right {
  right: 16px;
}
</style>
