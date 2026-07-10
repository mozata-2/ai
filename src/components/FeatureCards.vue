<template>
  <!-- ⭐️ 外层裁切容器：overflow:hidden 把内层挤出的滚动条区域裁掉，
       彻底替代失效的 ::-webkit-scrollbar（Vue scoped 下伪元素带 data 属性不生效） -->
  <div class="feature-scroll-wrap">
    <section class="feature-section">
      <div
        v-for="(card, i) in cards"
        :key="i"
        class="feature-card"
        :style="{ background: card.bg }"
      >
        <div class="card-content">
          <div class="card-tags">
            <span
              v-for="(tag, ti) in card.tags"
              :key="ti"
              class="tag"
              :style="{ background: card.tagBg, color: card.tagColor }"
            >{{ tag }}</span>
          </div>
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-desc">{{ card.desc }}</p>
        </div>
        <div class="card-image">
          <img :src="card.image" :alt="card.title" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cards = ref([
  {
    title: '新手教程指南',
    desc: '零基础玩转AI绘画',
    tags: ['轻松掌握全核心功能'],
    tagBg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    tagColor: '#92400e',
    bg: 'linear-gradient(135deg, #fef9c3 0%, #fde68a 100%)',
    image: 'https://images.unsplash.com/photo-1620207418302-439b387441b0?w=300&auto=format&fit=crop&q=60'
  },
  {
    title: '电商视觉设计',
    desc: '商品视觉全链路AI化',
    tags: ['商品广告', '底层图设计', '详情页', '宣传视频'],
    tagBg: 'linear-gradient(135deg, #fef3c7, #fcd34d)',
    tagColor: '#78350f',
    bg: 'linear-gradient(135deg, #fffbeb 0%, #fde68a 50%, #fbbf24 100%)',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&auto=format&fit=crop&q=60'
  },
  {
    title: '建筑室内设计',
    desc: '从装修秒变效果图',
    tags: ['平面图', '结构渲染', '毛坯房渲染', '装修预览'],
    tagBg: 'linear-gradient(135deg, #dbeafe, #93c5fd)',
    tagColor: '#1e40af',
    bg: 'linear-gradient(135deg, #eff6ff 0%, #bfdbfe 50%, #93c5fd 100%)',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&auto=format&fit=crop&q=60'
  },
  {
    title: 'AI餐饮视觉',
    desc: '诱惑美食食欲盛宴',
    tags: ['美食摄影', '美食海报', '营销视频', '食欲调整'],
    tagBg: 'linear-gradient(135deg, #fee2e2, #fca5a5)',
    tagColor: '#991b1b',
    bg: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 50%, #fca5a5 100%)',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&auto=format&fit=crop&q=60'
  },

])
</script>

<style scoped>
/* =========================================================
   外层裁切容器：overflow:hidden 裁掉内层溢出的滚动条区域，
   不依赖 ::-webkit-scrollbar（Vue scoped 下 WebKit 伪元素带 data 属性不生效）
   ========================================================= */
.feature-scroll-wrap {
  overflow: hidden;          /* 关键：裁掉内层被挤到下方的水平滚动条 */
  margin-bottom: 36px;       /* 承接原来 feature-section 的底部外边距 */
  width: 100%;
}

.feature-section {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;     /* Firefox 仍然节省空间（可选保险） */
  /* —— 隐藏水平滚动条：用 padding/margin 偏移把滚动条挤出外层裁切范围 —— */
  padding-bottom: 28px;      /* 向下留出 28px 容纳水平滚动条 */
  margin-bottom: -28px;      /* 再用负 margin 把这 28px "拉回去"，外层就会裁掉滚动条 */
  padding-right: 32px;       /* 右侧也延伸，让滚动条右末端在边缘外不被看见 */
  margin-right: -32px;
  box-sizing: content-box;   /* 关键：padding 不计入 width，负 margin 才会精确抵消 */
  /* 左侧：恢复原有卡片左外边距视觉（卡片有 margin-left:10px） */
  padding-left: 0;
}
/* ⭐️ 注意：scoped CSS 下不再写 ::-webkit-scrollbar（带 [data-v] 属性选择器的 WebKit 伪元素会失效），
   以上 padding/margin + 外层 overflow:hidden 的方案跨浏览器稳定。  */

.feature-card {
  
  margin-top: 10px;
  margin-left: 0px;
  flex: 0 0 320px;         /* 宽度 320，不放大不缩小 */
  width: 320px;
  height: 128px;            /* 高度 128 */
  position: relative;
  border-radius: 16px;
  padding: 14px 16px;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform var(--interact-dur) var(--interact-ease),
    box-shadow var(--theme-dur) var(--theme-ease);
  box-shadow: var(--shadow-feature);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.feature-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: var(--shadow-feature-hover);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
  min-height: 20px;
}

.tag {
  display: inline-block;
  font-size: 9px;
  padding: 2px 7px;
  border-radius: 10px;
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
}

.card-content {
  position: relative;
  z-index: 2;
  flex: 1;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 2px;
  color: var(--text-primary, #ffffff);
  line-height: 1.3;
}

.card-desc {
  font-size: 11px;
  color: var(--text-muted, #4b5563);
  margin-bottom: 0;
  line-height: 1.3;
}

.card-image {
  position: absolute;
  right: -6px;
  bottom: -6px;
  width: 96px;
  height: 82px;
  z-index: 1;
  opacity: 0.92;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px 0 10px 0;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  transform: rotate(-4deg);
  transition: transform 0.4s ease;
}

.feature-card:hover .card-image img {
  transform: rotate(0deg) scale(1.05);
}

/* =====================================================================
   响应式：窄屏时卡片由横向滚动 → 上下排列（flex-wrap）
   ===================================================================== */
/* --- 中屏 ≤1280：卡片宽度改为自适应（clamp 到 280px 更紧凑），继续横向滚动 --- */
@media (max-width: 1279.98px) {
  .feature-card {
    flex: 0 0 clamp(260px, 30vw, 320px);
    width: clamp(260px, 30vw, 320px);
    height: 120px;
  }
}
/* --- 窄屏 ≤1000：取消横向滚动，改为上下排列（flex-wrap），卡片铺满一行 --- */
@media (max-width: 999.98px) {
  .feature-scroll-wrap { margin-bottom: 24px; }
  .feature-section {
    flex-wrap: wrap;
    gap: 12px;
    overflow-x: visible;
    padding-bottom: 0;
    margin-bottom: 0;
    padding-right: 0;
    margin-right: 0;
    box-sizing: border-box;
  }
  .feature-card {
    flex: 1 1 calc(50% - 6px);      /* 两列：每行 2 张，减去 gap/2 */
    width: calc(50% - 6px);
    max-width: calc(50% - 6px);
    min-width: 0;
    height: 124px;
    margin-top: 0;
    padding: 12px 14px;
  }
  .card-image {
    width: 88px;
    height: 76px;
  }
}
/* --- 移动端 ≤768：单列上下排列，卡片铺满整行 --- */
@media (max-width: 767.98px) {
  .feature-section {
    gap: 10px;
  }
  .feature-card {
    flex: 1 1 100%;
    width: 100%;
    max-width: 100%;
    height: 116px;
    padding: 12px;
  }
  .card-image {
    width: 80px;
    height: 68px;
    right: -4px;
    bottom: -4px;
  }
  .card-title { font-size: 15px; }
  .card-desc { font-size: 10px; }
  .tag { font-size: 8px; padding: 2px 6px; }
}
</style>
