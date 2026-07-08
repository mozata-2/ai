import { ref, readonly, watch } from 'vue'

const STORAGE_KEY = 'pengtan-ui-theme'
const VALID = ['light', 'dark']

/* ========== 取初始值：localStorage > data-theme 属性 > 默认 dark ========== */
const pickInitial = () => {
  try {
    const saved = localStorage && localStorage.getItem && localStorage.getItem(STORAGE_KEY)
    if (saved && VALID.includes(saved)) return saved
  } catch (_) { /* ignore */ }
  if (typeof document !== 'undefined' && document.documentElement) {
    const fromDom = document.documentElement.getAttribute('data-theme')
    if (fromDom && VALID.includes(fromDom)) return fromDom
  }
  return 'dark'
}

export const theme = ref(pickInitial())

/** 将 theme.value 同步到 <html data-theme="..."> 并持久化到 localStorage */
const applyTheme = (t) => {
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.setAttribute('data-theme', t)
  }
  try {
    if (localStorage && localStorage.setItem) localStorage.setItem(STORAGE_KEY, t)
  } catch (_) { /* ignore */ }
}

/** 主动设置主题（对外推荐：绕过 ref 的直接赋值，确保 DOM 同步） */
export function setTheme(next) {
  if (!VALID.includes(next)) return
  theme.value = next
}

/** 切换主题（与原 API 保持一致） */
export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

/* 任何对 theme.value 的改动（包括 toggleTheme / setTheme）都立即落到 DOM + 存储 */
watch(theme, (nv) => applyTheme(nv), { immediate: true })

export const currentTheme = readonly(theme)
