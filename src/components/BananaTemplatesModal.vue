<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="tpl-modal-mask"
      role="dialog"
      aria-modal="true"
      aria-label="提示词案例库"
      @click.self="onMaskClick"
    >
      <div class="tpl-modal" role="document" @click.stop>
        <!-- ============= 顶栏：标题 + 关闭 ============= -->
        <header class="tpl-modal__head">
          <h3 class="tpl-modal__title">提示词案例库</h3>
          <button
            type="button"
            class="tpl-modal__close"
            aria-label="关闭"
            @click="onClose"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M6 6 L18 18 M18 6 L6 18" stroke="#4E5969" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </header>

        <!-- ============= 主体：4 列网格 ============= -->
        <div class="tpl-modal__body">
          <div class="case-grid">
            <article
              v-for="tpl in CASES"
              :key="tpl.id"
              class="case-card"
            >
              <!-- 图片区 -->
              <div class="case-card__img">
                <img :src="tpl.imageUrl" :alt="tpl.title" loading="lazy" />
                <!-- 标签 -->
                <div v-if="tpl.tags && tpl.tags.length" class="case-card__tags">
                  <span
                    v-for="(tag, idx) in tpl.tags"
                    :key="idx"
                    class="case-tag"
                    :class="idx === 0 ? 'case-tag--primary' : 'case-tag--secondary'"
                  >{{ tag }}</span>
                </div>
                <!-- 视频播放按钮 -->
                <button
                  v-if="tpl.isVideo"
                  type="button"
                  class="case-play"
                  aria-label="播放案例"
                  @click.stop="onUse(tpl)"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                    <path d="M9 7 L17 12 L9 17 Z" fill="#2A2C2E"/>
                  </svg>
                </button>
              </div>

              <!-- 标题 -->
              <div class="case-card__title">{{ tpl.title }}</div>

              <!-- 底部元数据：◇ 天前 ◇ 使用次数 -->
              <div class="case-card__meta">
                <span class="meta-item">
                  <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
                    <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="none" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <span>{{ tpl.daysAgo }}天前</span>
                </span>
                <span class="meta-item">
                  <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
                    <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="none" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <span>{{ tpl.uses }}</span>
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
/* 弹框配置：props + emits */
const props = defineProps({
  visible: { type: Boolean, default: false }
})
const emit = defineEmits(['close', 'use'])

const onMaskClick = () => emit('close')
const onClose     = () => emit('close')
const onUse       = (tpl) => { emit('use', tpl); emit('close') }

/* ==================== 弹框卡片数据（16 张，4 行 × 4 列，与模板图卡同图像源） ==================== */
const imgHost = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image'
const SIZE = 'square_hd'
function toUrl(p) { return `${imgHost}?prompt=${encodeURIComponent(p)}&image_size=${SIZE}` }

const RAW_CASES = [
  { id: 101, title: 'CAD户型图转彩平图',  imagePrompt: 'architectural floor plan colored rendering, modern apartment layout, realistic furniture, top view 2d architectural illustration' },
  { id: 102, title: '男士商务肖像摄影',   imagePrompt: 'asian businessman corporate portrait, navy blue suit, modern skyscraper background, professional studio lighting, full body photo' },
  { id: 103, title: '财神赐福素材',       imagePrompt: 'chinese god of wealth golden costume offering gold ingot, warm bedroom, sleeping man dream about fortune, cinematic lighting' },
  { id: 104, title: '毛坯房装修效果图',   imagePrompt: 'modern minimalist living room interior, beige sofa, warm wood floor, ceiling lamp, architectural photo, realistic 8k' },
  { id: 105, title: '餐饮美食海报·汉堡',  imagePrompt: 'chinese hamburger fast food poster, crispy fried pork belly, lettuce sesame bun, red orange background, commercial product photography' },
  { id: 106, title: '高端运动服饰大片',   imagePrompt: 'athletic wear fashion photoshoot, asian male model, premium sportswear outfit, white studio background, editorial photography' },
  { id: 107, title: '江湖川菜·毛血旺',    imagePrompt: 'sichuan cuisine maoxuewang spicy hot pot dish, red chili oil, food photography, restaurant commercial shot 8k' },
  { id: 108, title: '中式汉服新娘写真',   imagePrompt: 'traditional chinese hanfu bride portrait, red and gold embroidery, classical hair ornament, studio portrait photography' },
  { id: 109, title: '复古中式卧室',       imagePrompt: 'chinese style bedroom interior, wooden furniture, warm cozy atmosphere, architectural photo, 8k' },
  { id: 110, title: '医学教育插图',       badge: '面部白癜风', imagePrompt: 'medical education illustration of facial vitiligo symptoms, diagram style, clear labels' },
  { id: 111, title: '冬季长款大衣穿搭',   imagePrompt: 'winter women fashion long beige coat outfit, street style full body portrait' },
  { id: 112, title: '赛博朋克城市夜景',   imagePrompt: 'cyberpunk city night neon lights rainy street cinematic photography' },
  { id: 113, title: '印象派油画风景',     imagePrompt: 'impressionist oil painting landscape garden monet style brushstrokes' },
  { id: 114, title: '日系动漫头像',       imagePrompt: 'japanese anime girl avatar fresh clean illustration style' },
  { id: 115, title: '奢华腕表产品图',     imagePrompt: 'luxury wristwatch product photo studio lighting high end commercial' },
  { id: 116, title: '自然光写实人像',     imagePrompt: 'realistic portrait photography natural light cinematic film grain' }
]

/* 每个案例的基础标签（按截图风格：第1个深蓝，第2个浅蓝） */
const DEFAULT_TAGS = ['Nano-Banana', 'nano-banana-2']

/* 构造最终 CASES：加字段 + isVideo 按 4 个一组的第 3 个标记（按截图的第 3 个有播放圆按钮） */
const CASES = RAW_CASES.map((t, idx) => {
  /* 1-based 序号，给「案例X:」前缀 */
  const caseNum = 100 + idx + 1
  const fullTitle = `案例${caseNum}：${t.title}`
  return {
    id:       t.id,
    title:    fullTitle,
    imageUrl: toUrl(t.imagePrompt),
    badge:    t.badge,
    tags:     DEFAULT_TAGS.slice(),
    /* 第 3、7、11、15 个标记视频（索引 2/6/10/14） */
    isVideo:  [2, 6, 10, 14].includes(idx),
    /* 随机 30~200 天前 */
    daysAgo:  30 + (idx * 13) % 171,
    /* 随机使用次数 0~500 */
    uses:     (idx * 37) % 501
  }
})
</script>

<style scoped>
/* ========== 遮罩 ========== */
.tpl-modal-mask {
  position: fixed;
  inset: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 32px;
  box-sizing: border-box;
  flex-direction: column;
}

/* ========== 白色弹框容器 ========== */
.tpl-modal {
  width: 100%;
  max-width: 1040px;
  max-height: 85vh;
  background: #;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

/* ========== 顶栏 ========== */
.tpl-modal__head {
  height: 60px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.tpl-modal__title {
  margin: 0;
  padding: 0;
  font-size: 15px;
  font-weight: 600;
  color: #;
  line-height: 1.5;
  flex: 0 0 auto;
}
.tpl-modal__close {
  appearance: none;
  -webkit-appearance: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  transition: background-color 140ms ease;
  box-sizing: border-box;
}
.tpl-modal__close:hover { background: #; }

/* ========== 主体（可滚） ========== */
.tpl-modal__body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 24px 24px 20px;
  box-sizing: border-box;
}

/* 4 列网格 */
.case-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  box-sizing: border-box;
}

/* ========== 每张案例卡片 ========== */
.case-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
}

/* 图片区：3:4 竖图 */
.case-card__img {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  overflow: hidden;
  background: #;
  flex: 0 0 auto;
  box-sizing: border-box;
}
.case-card__img > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 2 个蓝胶囊标签（绝对定位于左上） */
.case-card__tags {
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  z-index: 2;
  flex-wrap: wrap;
  max-width: calc(100% - 20px);
}
.case-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: #;
  line-height: 1.4;
  flex: 0 0 auto;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}
.case-tag--primary   { background: #; }
.case-tag--secondary { background: #; }

/* 视频播放白色圆按钮（定位于图片正中央） */
.case-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: #;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  z-index: 3;
  box-sizing: border-box;
}

/* 标题 */
.case-card__title {
  margin: 10px 0 0;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  color: #;
  line-height: 1.45;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}

/* 底部元数据：◇ 天前 ◇ 使用数 */
.case-card__meta {
  margin: 6px 0 0;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  font-weight: 400;
  color: #;
  line-height: 1.5;
  flex: 0 0 auto;
  box-sizing: border-box;
}
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
  white-space: nowrap;
}
.meta-item > svg { flex: 0 0 auto; }

/* ========== 响应式：窄屏减列 ========== */
@media (max-width: 960px) {
  .tpl-modal-mask { padding: 16px; }
  .case-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
}
@media (max-width: 720px) {
  .case-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 480px) {
  .case-grid { grid-template-columns: 1fr; }
  .tpl-modal__head { height: 52px; padding: 0 16px; }
  .tpl-modal__body { padding: 16px 16px 12px; }
}
</style>
