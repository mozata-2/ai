<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { theme } from './theme.js'

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})
</script>

<style>
/* 全局样式在 style.css 中 */
</style>
