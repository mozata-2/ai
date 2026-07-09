<template>
  <section class="gk-head">
    <h1 class="page-title">{{ title }}</h1>
    <p class="page-desc">{{ desc }}</p>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  mode: {
    type: String,
    default: 'g15',
    validator: (v) => ['g15', 'classic'].includes(v)
  }
})

const TITLES = {
  g15: {
    title: '构客 G1.5 图生视频',
    desc: '仅支持 1 张参考图 · 支持 10/15 秒 · 提交即返回'
  },
  classic: {
    title: '构客 视频生成',
    desc: '队列模式 · 提交即返回 · 后台自动处理 · 失败自动重试'
  }
}

const title = computed(() => TITLES[props.mode].title)
const desc  = computed(() => TITLES[props.mode].desc)
</script>

<style scoped>
.gk-head {
  width: 100%;
  box-sizing: border-box;
  padding: 2px 6px 8px;
  background: transparent;
}
.page-title {
  margin: 0;
  font-size: 20px;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: var(--text-primary, #FFFFFF);
  transition: color var(--theme-dur) var(--theme-ease);
}
.page-desc {
  margin: 9px 0 0;
  font-size: 14px;
  line-height: 1.85;
  color: var(--text-faint, #98A2B3);
  transition: color var(--theme-dur) var(--theme-ease);
}
</style>
