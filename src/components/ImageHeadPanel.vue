<template>
  <section class="image-head">
    <h1 class="page-title">
      <span class="page-title__brand">{{ brand }}</span>
      <span class="page-title__sub">{{ title }}</span>
    </h1>
    <p class="page-desc" v-if="desc">{{ desc }}</p>
  </section>
</template>

<script setup>
defineProps({
  brand: { type: String, default: '构客' },
  title: { type: String, default: '图生图' },
  desc:  { type: String, default: '' }
})
</script>

<style scoped>
.image-head {
  width: 100%;
  box-sizing: border-box;
  padding: 2px 6px 8px;
  background: transparent;

}
.page-title {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 20px;               /* ⭐ 标题文字大小改为 20px */
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: 0.2px;
  /* ⭐ 亮/暗主题统一：用主文字色，亮主题下自动为深色 */
  color: var(--text-primary, #FFFFFF);
  transition: color var(--theme-dur) var(--theme-ease);
}
.page-title__brand {
  background: linear-gradient(135deg, # 0%, # 55%, # 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.page-title__sub {
  /* ⭐ 亮/暗主题统一 */
  color: var(--text-primary, #FFFFFF);
  font-weight: 600;
  transition: color var(--theme-dur) var(--theme-ease);
}
.page-desc {
  margin: 9px 0 0;
  font-size: 14px;
  line-height: 1.85;
  /* ⭐ 亮/暗主题统一：用次级/弱化文字色 */
  color: var(--text-faint, #98A2B3);
  transition: color var(--theme-dur) var(--theme-ease);
}
</style>
