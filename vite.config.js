import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 部署：仓库名是 ai，默认访问地址 https://mozata-2.github.io/ai/
// 资源必须以 /ai/ 为前缀才能正确加载；本地开发 dev server 不受影响
export default defineConfig({
  base: '/ai/',
  plugins: [vue()],
  server: {
    port: 5173,
    host: true
  }
})
