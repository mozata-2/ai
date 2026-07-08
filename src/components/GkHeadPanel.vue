<template>
  <section class="gk-head">
    <h1 class="gk-title">
      <span class="gk-title__brand">{{ brand }}</span>
      <span class="gk-title__sub">{{ title }}</span>
    </h1>
    <p class="gk-desc" v-if="desc">{{ desc }}</p>
  </section>
</template>

<script setup>
defineProps({
  brand: { type: String, default: '构客' },
  title: { type: String, default: 'G1.5 图生视频' },
  desc:  { type: String, default: '' }
})
</script>

<style scoped>
.gk-head {
  width: 100%;
  box-sizing: border-box;
  padding: 2px 6px 8px;
  background: transparent;
}
.gk-title {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 20px;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: var(--text-primary, #FFFFFF);
  transition: color var(--theme-dur) var(--theme-ease);
}
.gk-title__brand {
  color: var(--text-primary, #FFFFFF);
  font-weight: 700;
}
.gk-title__sub {
  color: var(--text-primary, #FFFFFF);
  font-weight: 700;
}
.gk-desc {
  margin: 9px 0 0;
  font-size: 14px;
  line-height: 1.85;
  color: var(--text-faint, #98A2B3);
  transition: color var(--theme-dur) var(--theme-ease);
}
</style>
