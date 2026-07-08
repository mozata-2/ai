<template>
  <div class="video-page">

    <div class="video-grid">

      <div class="col-left">

        <!-- GK 视频：顶部固定切换组件（不受滚动影响） -->
        <GkModeTabs v-if="activeTool === 'gkv'" v-model="gkMode" class="gk-fixed-tabs" />

        <div class="col-left__scroll">

          <template v-if="activeTool === 'v31'">
            <V31ModeTabs v-model="v31Mode" />
            <V31KeyframesPanel v-model="v31Keyframes" />
            <V31ImageUpload v-if="v31Mode === 'img2video' || v31Mode === 'ref2video'" v-model="v31Image1" />
            <ImagePromptPanel
              class="video-prompt"
              v-model="promptText"
              :max="PROMPT_MAX"
              :suggest-tags="VIDEO_PROMPT_TAGS"
              placeholder="描述你想要的视频画面与镜头语言"
            />
            <V31TemplatesPanel @apply-template="onApplyTemplate" />
            <V31ModelSelect v-model="v31Model" />
            <V31RatioPanel v-model="v31Ratio" />
          </template>

          <!-- GK 视频模块 -->
          <template v-else-if="activeTool === 'gkv'">
            <GkHeadPanel
              :brand="gkHead.brand"
              :title="gkHead.title"
              :desc="gkHead.desc"
            />

            <GkImageRefPanel v-model="gkRefImage" />

            <ImagePromptPanel
              class="video-prompt"
              v-model="promptText"
              :max="PROMPT_MAX"
              :suggest-tags="VIDEO_PROMPT_TAGS"
              placeholder="请用中文描述您想要的视频效果，例如：一个可爱的小猫咪在沙滩抓螃蟹，镜头缓慢推进，保持主体清晰，画面自然流畅"
            />

            <GkAspectPanel v-model="gkRatio" />
            <GkDurationPanel v-model="gkDuration" />
            <GkGenCount v-model="gkCount" />
          </template>

          <template v-else>
            <TongyiModelSelect v-if="activeTool === 'tongyi'" v-model="tongyiModel" />

            <JimengVersionToggle
              v-if="activeTool === 'jimeng15' || activeTool === 'jimeng20'"
              :model-value="activeTool"
              @update:model-value="onJimengVersionChange"
            />

            <ImageHeadPanel
              :brand="TOOL_META[activeTool].brand"
              :title="TOOL_META[activeTool].title"
              :desc="TOOL_META[activeTool].desc"
            />

            <VideoRefPanel v-model="refVideo" />

            <ImagePromptPanel
              class="video-prompt"
              v-model="promptText"
              :max="PROMPT_MAX"
              :suggest-tags="VIDEO_PROMPT_TAGS"
              placeholder="描述你想要的视频画面与镜头语言"
            />

            <VideoAspectPanel v-if="activeTool === 'tongyi'" v-model="tongyiRatio" />

            <XiaomaStylePanel v-if="activeTool === 'xiaoma'" v-model="xiaomaStyle" />

            <VeoDurationPanel v-if="activeTool === 'veo'" v-model="veoDuration" />

            <VideoSizePanel v-model="videoSize" />
          </template>
        </div>

        <section class="gen-panel">
          <button type="button" class="gen-btn" :disabled="!canGenerate" @click="onGenerate">
            <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
              <path d="M8 5 L19 12 L8 19 Z" fill="currentColor"/>
              <rect x="5" y="5" width="3" height="14" rx="1" fill="currentColor" opacity="0.85"/>
            </svg>
            <span>生成视频</span>
            <span class="gen-btn__cost">消耗 {{ genCost }} 积分</span>
          </button>
        </section>
      </div>

      <section class="col-right record-panel">
        <div class="record-panel__head">
         <h2>生成记录</h2>
        </div>

        <div class="record-empty">
          <svg viewBox="0 0 140 130" width="170" height="155" class="record-empty__box" aria-hidden="true">
            <defs>
              <linearGradient id="video_box_f" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stop-color="#3E4044"/>
                <stop offset="100%" stop-color="#1F2022"/>
              </linearGradient>
              <linearGradient id="video_box_r" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stop-color="#2B2C2E"/>
                <stop offset="100%" stop-color="#151617"/>
              </linearGradient>
              <linearGradient id="video_box_t" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stop-color="#5A5C60"/>
                <stop offset="100%" stop-color="#333436"/>
              </linearGradient>
              <linearGradient id="video_box_lid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stop-color="#4A4C50"/>
                <stop offset="100%" stop-color="#2C2D30"/>
              </linearGradient>
            </defs>
            <polygon points="70,14 118,38 70,62 22,38" fill="url(#video_box_t)"/>
            <polygon points="22,38 70,62 70,116 22,92" fill="url(#video_box_f)"/>
            <polygon points="118,38 70,62 70,116 118,92" fill="url(#video_box_r)"/>
            <polygon points="70,14 97,2 122,14 70,40" fill="url(#video_box_lid)"/>
            <path d="M22 38 L70 62 L118 38" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1.2"/>
            <path d="M70 62 L70 116" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.2"/>
            <path d="M70 14 L97 2 L122 14" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.2"/>
          </svg>
          <div class="record-empty__text">请登录后查看生成记录</div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ImageHeadPanel   from '../components/ImageHeadPanel.vue'
import ImagePromptPanel from '../components/ImagePromptPanel.vue'
import VideoRefPanel    from '../components/VideoRefPanel.vue'
import VideoSizePanel   from '../components/VideoSizePanel.vue'
import VideoAspectPanel from '../components/VideoAspectPanel.vue'

import TongyiModelSelect    from '../components/TongyiModelSelect.vue'
import JimengVersionToggle  from '../components/JimengVersionToggle.vue'
import XiaomaStylePanel     from '../components/XiaomaStylePanel.vue'
import VeoDurationPanel     from '../components/VeoDurationPanel.vue'

import V31ModeTabs      from '../components/V31ModeTabs.vue'
import V31KeyframesPanel from '../components/V31KeyframesPanel.vue'
import V31ImageUpload   from '../components/V31ImageUpload.vue'
import V31TemplatesPanel from '../components/V31TemplatesPanel.vue'
import V31ModelSelect   from '../components/V31ModelSelect.vue'
import V31RatioPanel    from '../components/V31RatioPanel.vue'

import GkModeTabs       from '../components/GkModeTabs.vue'
import GkHeadPanel      from '../components/GkHeadPanel.vue'
import GkImageRefPanel  from '../components/GkImageRefPanel.vue'
import GkAspectPanel    from '../components/GkAspectPanel.vue'
import GkDurationPanel  from '../components/GkDurationPanel.vue'
import GkGenCount       from '../components/GkGenCount.vue'

const route  = useRoute()
const router = useRouter()

const VIDEO_KEYS = ['gkv','v31','sr','tongyi','jimeng15','jimeng20','xiaoma','veo']
const activeTool = computed(() => {
  const k = route.query && route.query.tool
  if (k && VIDEO_KEYS.includes(k)) return k
  return 'gkv'
})

watch(
  () => [route.path, route.query && route.query.tool],
  () => {
    if (route.path !== '/video') return
    const k = route.query && route.query.tool
    if (!k || !VIDEO_KEYS.includes(k)) {
      router.replace({ path: '/video', query: { ...route.query, tool: 'gkv' } })
    }
  },
  { immediate: true, flush: 'post' }
)

const TOOL_META = {
  gkv:       { brand: 'GK视频',    title: '构客 AI视频生成',  desc: '基于参考图生成高质量视频内容' },
  v31:       { brand: 'V31视频',   title: '可灵 一键视频',    desc: '可灵大模型，快速生成创意视频' },
  sr:        { brand: 'SR视频',    title: 'SR超分/补帧',     desc: '视频超分辨率与智能补帧增强' },
  tongyi:    { brand: '通义万象',  title: '阿里 高质量视频',  desc: '通义万相视频生成，画面精美清晰' },
  jimeng15:  { brand: '即梦1.5',   title: '字节 即梦1.5 视频模型', desc: '即梦1.5 视频生成模型' },
  jimeng20:  { brand: '即梦2.0',   title: '字节 即梦2.0(更新版)', desc: '即梦2.0 最新视频生成模型（HOT）' },
  xiaoma:    { brand: '快乐小马',  title: '可爱动物风格视频', desc: '生成可爱动物风格的创意视频' },
  veo:       { brand: 'Veo-uimi',  title: '长时长/电影感',   desc: '支持长时长生成，电影级画面质感' }
}

const GK_HEAD_META = {
  g15:     { brand: '构客', title: 'G1.5 图生视频', desc: '仅支持 1 张参考图 · 支持 10/15 秒 · 提交即返回' },
  classic: { brand: '构客', title: '经典模式',      desc: '经典视频生成模式，支持文生视频与图生视频' }
}

const PROMPT_MAX  = 2000
const promptText  = ref('')
const refVideo    = ref(null)
const videoSize   = ref('auto')

/* GK 视频模块状态 */
const gkMode      = ref('g15')
const gkRefImage  = ref(null)
const gkRatio     = ref('9:16')
const gkDuration  = ref('10s')
const gkCount     = ref('1')
const gkHead      = computed(() => GK_HEAD_META[gkMode.value] || GK_HEAD_META.g15)

const tongyiModel = ref('ty-standard')
const tongyiRatio = ref('9:16')

const xiaomaStyle = ref('realistic')

const veoDuration = ref('5s')

const v31Mode      = ref('img2video')
const v31Keyframes = ref(false)
const v31Image1    = ref(null)
const v31Model     = ref('fast')
const v31Ratio     = ref('9:16')
const onApplyTemplate = () => {
  // eslint-disable-next-line no-console
  console.log('[V31] apply template')
}

const VIDEO_PROMPT_TAGS = [
  '电影感', '慢镜头', '推镜头', '4K超清', '电影运镜', '航拍视角', 
  '第一人称视角', '柔和光影', '赛博朋克', '中国风'
]

const BASE_COST_PER_VIDEO = 120
const genCost = computed(() => {
  let cost = BASE_COST_PER_VIDEO

  if (activeTool.value === 'gkv') {
    const count = parseInt(gkCount.value) || 1
    const durCost = gkDuration.value === '15s' ? Math.round(BASE_COST_PER_VIDEO * 1.5) : BASE_COST_PER_VIDEO
    cost = durCost * count
    return cost
  }

  if (activeTool.value === 'jimeng20') {
    cost = Math.round(cost * 1.5)
  }
  if (activeTool.value === 'veo') {
    const durSeconds = parseInt(veoDuration.value) || 5
    if (durSeconds > 10) {
      cost = cost * 2
    }
  }
  return cost
})

const canGenerate = computed(() => {
  if (activeTool.value === 'gkv') {
    return promptText.value.trim().length > 0 && !!gkRefImage.value
  }
  return promptText.value.trim().length > 0
})

const onJimengVersionChange = (v) => {
  if (v === 'jimeng15' || v === 'jimeng20') {
    router.replace({ path: '/video', query: { ...route.query, tool: v } })
  }
}

const onMyWorks  = () => { }
const onGenerate = () => {
  if (!canGenerate.value) return
  // eslint-disable-next-line no-console
  console.log('[Video] generate', {
    tool:     activeTool.value,
    prompt:   promptText.value,
    ref:      refVideo.value,
    size:     videoSize.value,
    cost:     genCost.value,
    tongyi: activeTool.value === 'tongyi'
      ? { model: tongyiModel.value, ratio: tongyiRatio.value }
      : undefined,
    jimeng: (activeTool.value === 'jimeng15' || activeTool.value === 'jimeng20')
      ? { version: activeTool.value }
      : undefined,
    xiaoma: activeTool.value === 'xiaoma'
      ? { style: xiaomaStyle.value }
      : undefined,
    veo: activeTool.value === 'veo'
      ? { duration: veoDuration.value }
      : undefined,
    gkv: activeTool.value === 'gkv'
      ? {
          mode:     gkMode.value,
          refImage: gkRefImage.value,
          ratio:    gkRatio.value,
          duration: gkDuration.value,
          count:    gkCount.value
        }
      : undefined
  })
}
</script>

<style scoped>

.video-prompt{
  margin-left: 10px;
}

.gk-fixed-tabs {
  flex: 0 0 auto;
  width: 356px;
  max-width: 356px;
  box-sizing: border-box;
  padding: 8px 0 4px;
  align-self: center;
  z-index: 2;
  background: transparent;
}
.video-page {
  width: 100%;
  height: calc(100vh - 60px);       /* ✅ 93vh→100vh：更合理的高度 = 整个视口 - Header（60px） */
  min-height: 0;
  padding: 12px 16px;                   /* ✅ 减少内部 padding：上下12，左右16（原上下左右20浪费空间） */
  box-sizing: border-box;
  background: var(--bg-base, #121212);
  color: var(--text-primary, #E5EAF3);
  overflow: hidden;
  transition: background-color var(--theme-dur) var(--theme-ease);
  margin-left: -30px;
}

.video-grid {
  display: grid;
  grid-template-columns: 400px minmax(320px, 1fr);
  grid-auto-rows: minmax(0, auto);
  align-items: stretch;
  gap: 18px;
  width: 100%;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
  margin-left: -30px;
}

.panel {
  background: transparent;
  border: none;
  border-radius: 0;
  box-sizing: border-box;
}

.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 10px;
}
.panel-title__icon  { font-size: 14px; }
.panel-title__spark { font-size: 14px; }
.panel-title__opt   {
  color: var(--text-faint, #8B93A0);
  font-weight: 400;
  margin-left: 2px;
}

.col-left {
  width: 400px;
  max-width: 400px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  min-height: 0;
  flex: 0 0 400px;
  overflow: hidden;
}

.col-left > .gen-panel {
  flex: 0 0 auto;
  padding: 4px 0 2px;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  z-index: 2;
}

.col-left__scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;                              /* ✅ 减少内部 gap：10→8 */
  /* 底部预留出「生成按钮(48px) + 按钮/滚动区 gap(14px) + 提示行(≈20px) + 安全区」 ≈ 100px，
        保证滚到底部时，最后一块面板不会把粉色按钮挤出 overflow:hidden 边界，按钮完整显示（不改按钮位置） */
  padding: 4px 0 100px;                /* ✅ 减少 padding-bottom：120→100 */
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.col-left__scroll > .panel,
.col-left__scroll > section,
.col-left__scroll > * {
  width: 356px;
  max-width: 356px;
  box-sizing: border-box;
  flex: 0 0 auto;
}

.col-left__scroll::-webkit-scrollbar { width: 0; height: 0; display: none; }
.col-left__scroll::-webkit-scrollbar-track { background: transparent; }
.col-left__scroll::-webkit-scrollbar-thumb { background: transparent; }

.gen-btn {
  appearance: none;
  -webkit-appearance: none;
  width: calc(100% - 30px);           /* ⭐ 左右各缩 15px → 总宽 - 30 */
  margin-left: 25px;
  margin-top: -9px;
  margin-bottom: 5px;                   /* ✅ 和图片生成按钮完全一致：三个独立 margin 行 */
  height: 40px;                        /* ✅ 和图片生成按钮完全一致：高度 40（旧 48） */
  border-radius: 24px;
  padding: 0 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #FE2C55;
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  border: 1px solid rgba(255,255,255,0.12);
  cursor: pointer;
  transition:
    transform 140ms ease,
    filter 160ms ease,
    opacity 160ms ease;
  box-sizing: border-box;
}
/* ⭐ 按钮内部：「消耗 xx 积分」—— 颜色淡一点、字号小一点，和截图一致 */
.gen-btn__cost {
  color: rgba(255, 255, 255, 0.78);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  margin-left: 8px;
}
.gen-btn:hover:not(:disabled) {
  transform: translateY(-1.5px);
  filter: brightness(1.05);
}
.gen-btn:active:not(:disabled) { transform: translateY(0) scale(0.99); }
.gen-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  filter: grayscale(0.15);
}
.gen-tips {
  align-self: center;
  font-size: 12px;
  color: #6D7380;
  line-height: 1;
}

.col-right.record-panel {
  background: transparent;
  border: none;
  border-radius: 0;
  box-sizing: border-box;
  padding: 4px 0 8px;
  min-height: 0;
  height: 100%;                         /* ✅ 外层 grid 拉伸到满高，右列自己内部滚 */
  overflow-y: auto;                     /* ✅ 右列记录多了自己局部滚（外层整页不滚），不再 overflow:hidden 裁 */
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

.record-panel__head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 2px 12px;
  flex: 0 0 auto;
}

.record-panel__head .my-work-btn {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid rgba(255,255,255,0.08);
  background: #FE2C55;
  color: #FFFFFF;
  padding: 0 16px;
  height: 36px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 160ms ease,
    transform 140ms ease;
  flex: 0 0 auto;
  white-space: nowrap;
}
.record-panel__head .my-work-btn:hover {
  background: #FE2C55;
  transform: translateY(-1px);
}
.record-panel__head .my-work-btn:active { transform: translateY(0) scale(0.98); }

.record-empty {
  width: 100%;
  flex: 0 0 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  text-align: center;
  padding: 8px 0 4px;
}
.record-empty__box {
  opacity: 0.96;
  filter: drop-shadow(0 14px 28px rgba(0,0,0,0.25));
}
.record-empty__text {
  font-size: 13px;
  color: var(--text-faint, #98A2B3);
  line-height: 1.45;
}

@media (max-width: 1000px) {
  .video-page { height: auto; min-height: calc(100vh - 60px); overflow-y: auto; }
  .video-grid {
    grid-template-columns: 1fr;
    height: auto;
  }
  .col-left {
    width: 100%;
    max-width: 100%;
    height: auto;
    flex: 1 1 auto;
    overflow: visible;
  }
  .col-left__scroll {
    flex: 1 1 auto;
    overflow-y: visible;
    padding: 0;
    align-items: stretch;
  }
  .col-left__scroll > .panel,
  .col-left__scroll > section,
  .col-left__scroll > * {
    width: 100%;
    max-width: 100%;
  }
  .col-right.record-panel { min-height: 0; }
  .gen-btn { width: calc(100% - 30px); margin: 0 15px; }
}
</style>
