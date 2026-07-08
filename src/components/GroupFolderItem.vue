<template>
  <!--
    GroupFolderItem —— 「图片分组」的单个分组项（组件化封装）
    结构严格对齐参考图：
      [3px 粉红圆弧条（选中时·伪元素突出box左）]
      [文件夹 <img> 30x30]  [分组名]  [右侧圆形(0) 深灰胶囊 粉字]
      深灰 #303030 大圆角 16px 选中背景；未选中透明
  -->
  <li
    class="group-item"
    :class="{ active: active }"
    @click="onClick"
  >
    <!-- 文件夹图标：默认取 src/img/attachment.png（用户可替换 src/img/folder.png 后改 prop） -->
    <img
      class="group-item__icon"
      :src="folderImgSrc"
      :alt="`分组-${name}`"
      draggable="false"
    />
    <span class="group-item__name">{{ name }}</span>
    <span class="group-item__count">{{ count }}</span>
  </li>
</template>

<script setup>
import { computed } from 'vue'
// ⭐️ 用户已在 src/img 里放了「文件.png」作为文件夹图标，直接引用
//    Vite 5 在 Windows 下支持中文文件名资源（此方式最稳定）
const defaultFolderImg = new URL('../img/文件.png', import.meta.url).href

const props = defineProps({
  /** 分组名：如"全部" / "我收藏的" / "工作素材"（String 必填） */
  name:      { type: String,  required: true },
  /** 分组内数量：右侧圆形胶囊显示（Number，默认 0） */
  count:     { type: Number,  default: 0 },
  /** 是否选中：true → 深灰背景 + 3px 粉圆弧条 + 粉红文字；false 灰字 */
  active:    { type: Boolean, default: false },
  /** (可选) 自定义文件夹图片 URL；不传则走默认的「文件.png」 */
  folderImg: { type: String,  default: '' },
})

const emit = defineEmits(['click'])

const folderImgSrc = computed(() => {
  return props.folderImg && props.folderImg.length > 0 ? props.folderImg : defaultFolderImg
})

function onClick(e) {
  emit('click', { name: props.name, count: props.count, active: props.active, event: e })
}
</script>

<style scoped>
/* ============================================================
   单个分组项 样式（组件内聚 scoped）
   - 结构：大圆角矩形 border-radius:14px（两端饱满但不是半圆）
   - 选中态（关键叠层）：
       ① 底层粉条（::before）：同尺寸粉色盒子（圆角 14px 与主盒子一致）
         translateX(-4px)，z-index:-1
         → 因为 .group-item 不创建层叠上下文（没设 z-index），
           ::before z-index:-1 会进入父级 .group-list-container（position:relative; z-index:1）
           的层叠上下文，画在整个 li 的最底层
       ② 主盒子层（.group-item.active）：深黑灰圆角盒子盖在粉条之上
         → 左上/左下 14px 圆弧凹处 + 左边伸出 4px，正好露出一条连续的贴边粉弧条
           （粉条弧度与主盒子完全贴合，与截图完全一致）
       ③ 内容层（img/name/count）：正常文档流，自然高于背景层
   - 三层结构（自底向上）：
       [group-list-container 底层上下文（position:relative / overflow:visible / z-index:1）]
         ↑
       [粉条层 ::before（z-index:-1，粉色盒子 translateX(-4px)，画在主盒子下方）]
         ↑
       [主盒子层（深黑灰背景，border-radius 14px，左端漏 4px 连续粉弧条）]
         ↑
       [内容层（文件夹图标 + 分组名 + 计数圆胶囊，正常流最高层）]
   ============================================================ */
.group-item {
  position: relative;       /* 只作为 ::before absolute 的定位参考，不设 z-index → 不创建层叠上下文 */
  box-sizing: border-box;
  list-style: none;
  width: 224px;             /* ⭐️ 固定宽度 224px */
  height: 44px;             /* ⭐️ 固定高度 44px（224×44） */
  min-height: 44px;
  padding: 0 16px 0 18px;  /* 左 18px：粉条露 4px，图标保持与左边界足够空间 */
  border-radius: 6px;      /* ⭐️ 大圆角矩形（非两端半圆），与截图一致 */
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  /* ⭐ 亮/暗主题统一：次级文字色 */
  color: var(--text-secondary, #a0a3ab);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  user-select: none;
  transition:
    background-color 180ms ease,
    color var(--theme-dur) var(--theme-ease);
  overflow: visible;        /* ⭐️ 关键：允许 ::before 向左超出的 4px 粉条不被裁 */
  /* 故意不设 z-index → 不创建层叠上下文，::before z-index:-1 才能进入父级 .group-list-container
     的层叠上下文 → 真正画在整个 li 的底层（包括主胶囊背景之下） */
}

/* hover：未选中时加高亮，选中态已有深黑灰胶囊 */
.group-item:not(.active):hover {
  /* ⭐ 亮/暗主题统一：--hover-bg（暗→半透明白；亮→半透明深蓝灰） */
  background: var(--hover-bg, rgba(255, 255, 255, 0.04));
  color: var(--text-primary, #d5d7dd);
}

/* ---------- 选中态：深黑灰胶囊主背景 + 粉字 ---------- */
.group-item.active {
  /* ⭐ 亮/暗主题统一：--bg-elevated-3（暗→#121212深灰；亮→浅灰） */
  background: var(--bg-elevated-3, #121212);
  color: #FE2C55;
  padding: 0 19px 0 18px;        /* 文件夹图标(img不继承颜色保持原图) + 分组名 + 数字全部粉色 */
  transition: background-color var(--theme-dur) var(--theme-ease);
}

/* ---------- 底层粉条：粉色同尺寸盒子 translateX(-4px) + 与主盒子同弧度 border-radius → 左端贴边粉弧条 ----------
   原理：
   1. 同宽同高同 border-radius:14px → 完全匹配主盒子四角弧度
   2. translateX(-4px) → 整体向左平移 4px
   3. z-index: -1 + .group-item 不创建层叠上下文 → 画在主胶囊背景之下
   结果：主盒子左上角/左下角 14px 圆弧凹处 + 左侧伸出 4px，形成连续的贴边粉色圆弧条
         （与截图那种"左边一整条贴边粉弧高亮条"效果完全一致）
---------------------------------------------------------------------- */
.group-item.active::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 9px;        /* ⭐️ 与主盒子相同的大圆角，保证四角弧度完全贴合 */
  background: #FE2C55;        /* 粉条粉色 */
  transform: translateX(-3px);/* ⭐️ 核心：向左偏移 4px → 左端露出一条连续粉弧条 */
  z-index: -1;                /* 置于主胶囊背景之下 */
}

/* ---------- 内容层：正常文档流已高于背景层，无需额外 z-index ---------- */
/* 文件夹 <img> 图标：30x30 */
.group-item__icon {
  width: 24px;
  height: 24px;
  min-width: 24px;
  flex-shrink: 0;
  display: block;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
  margin-left: -5px;
}

/* 分组名：左对齐撑满（让 count 贴右） */
.group-item__name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: -9px;        /* 选中态文字加粗，视觉更接近截图 */
}

/* ---------- 右侧数量：32x32 圆形深红胶囊，粉字居中 ---------- */
.group-item__count {
  flex-shrink: 0;
  min-width: 22.47px;
  height: 20px;
  
  border-radius: 999px;       /* 圆胶囊 */
  /* ⭐ 亮/暗主题统一：激活态用深红色底（保持原有视觉倾向，但基础底色不用硬编码黑） */
  background: rgba(255, 86, 119, 0.16);
  color: #FE2C55;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  left: -30px;
  transition: background-color var(--theme-dur) var(--theme-ease),
              color var(--theme-dur) var(--theme-ease);
}
.group-item:not(.active) .group-item__count {
  /* ⭐ 亮/暗主题统一：未激活态用 --bg-elevated-2（暗→深灰；亮→浅白）+ 次级文字色 */
  background: var(--bg-elevated-2, #1f2026);
  color: var(--text-secondary, #a0a3ab);
}
</style>
