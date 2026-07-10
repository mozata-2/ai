<template>
  <div class="video-page">

    <div class="video-grid">

      <div class="col-left">

        <div class="col-left__scroll">

          <template v-if="activeTool === 'gkv'">
            <GkModeTabs v-model="gkMode" />
            <GkHeadPanel :mode="gkMode" />
            <!-- ⭐ 用户要求：GK 视频的"参考图片 + 提示词"两个组件整体左移 2px。
                 用 wrapper + position:relative; left:-2px，纯视觉偏移，
                 不改变文档流占位（避免压缩右边界，影响 356px 宽度） -->
            <div class="gk-prompt-ref-shift">
              <GkImageRefPanel v-model="gkRefImage" :mode="gkMode" />
              <ImagePromptPanel
                class="video-prompt"
                v-model="promptText"
                :max="PROMPT_MAX"
                :suggest-tags="VIDEO_PROMPT_TAGS"
                placeholder="描述你想要的视频画面与镜头语言"
              />
            </div>
            <GkAspectPanel v-model="gkRatio" :mode="gkMode" />
            <GkDurationPanel v-model="gkDuration" :mode="gkMode" />
            <GkGenCount v-model="gkCount" />
          </template>

          <template v-else-if="activeTool === 'v31'">
            <V31ModeTabs v-model="v31Mode" />
            <V31ImageUpload v-if="v31Mode === 'img2video' || v31Mode === 'ref2video'" v-model="v31Image1" />
            <ImagePromptPanel
              class="video-prompt"
              variant="v31"
              v-model="promptText"
              :max="PROMPT_MAX"
              :suggest-tags="VIDEO_PROMPT_TAGS"
              placeholder="描述你想要的视频画面与镜头语言"
            />
            <V31TemplatesPanel @apply-template="onApplyTemplate" />
            <V31ModelSelect v-model="v31Model" />
            <V31RatioPanel v-model="v31Ratio" />
            <V31GenCount v-model="v31Count" />
            <V31AdvancedPanel v-model:translate="v31Translate" v-model:dubbing="v31Dubbing" />
          </template>

          <template v-else-if="activeTool === 'sr'">
            <SrHeadPanel />
            <GkImageRefPanel v-model="srRefImage" mode="classic" />
            <ImagePromptPanel
              class="video-prompt"
              variant="sr"
              v-model="promptText"
              :max="PROMPT_MAX"
              :suggest-tags="VIDEO_PROMPT_TAGS"
              placeholder="描述你想要的视频画面与镜头语言"
            />
            <V31TemplatesPanel @apply-template="onApplyTemplate" />
            <SrAspectPanel v-model="srRatio" />
            <SrChannelPanel v-model="srChannel" />
            <GkGenCount v-model="srCount" />
          </template>

          <!-- ⭐ 通义万象专属 7 模块（严格按用户指定顺序：①头→②模式→③提示词→④音频→⑤清晰度→⑥尺寸→⑦时长） -->
          <template v-else-if="activeTool === 'tongyi'">
            <!-- ① 标题组件：上文字 20 加粗 / 下文字 14；brand 不显示（用户要求删除） -->
            <ImageHeadPanel
              class="ty-head"
              :brand="''"
              :title="'通义万象视频生成'"
              :desc="'阿里通义万象 · 队列模式 · 四种生成方式'"
            />
            <!-- ② 模式组件：单按钮 81.75×36 / 圆角 6 / 文字 12 / 未选中 #606266 / 选中 #FE2C55 -->
            <TongyiModeTabs v-model="tongyiMode" />
            <!-- ③ 提示词：上方"输入文字描述..."14 号 #606266 + 下方直接调用公共 ImagePromptPanel -->
            <p class="ty-prompt-intro">输入文字描述，生成最高15秒的多镜头叙事视频</p>
            <ImagePromptPanel
              class="video-prompt"
              v-model="promptText"
              :max="PROMPT_MAX"
              :suggest-tags="VIDEO_PROMPT_TAGS"
              placeholder="描述你想生成的视频内容，例如：一只可爱的猫咪在花园里玩耍..."
            />
            <!-- ④ 音频：标题 14 不加粗 / 地址框 291×32 圆角 6 / 选择按钮 60×32 圆角 6 文字 14 / 支持 12 号 -->
            <TongyiAudioPanel v-model="tongyiAudioUrl" />
            <!-- ⑤ 清晰度：单按钮 173.5×56 圆角 6，按钮内上文字 14 下文字 12，选中 #FE2C55 -->
            <TongyiQualityPanel v-model="tongyiQuality" />
            <!-- ⑥ 尺寸：单按钮 62.2×76 圆角 6，内外部文字均 12，选中 #FE2C55 -->
            <TongyiAspectPanel v-model="tongyiAspect" />
            <!-- ⑦ 时长：单按钮 111.66×36 圆角 6，内部文字 14，选中 #FE2C55 -->
            <TongyiDurationPanel v-model="tongyiDuration" />
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
import TongyiModeTabs       from '../components/TongyiModeTabs.vue'
import TongyiAudioPanel     from '../components/TongyiAudioPanel.vue'
import TongyiQualityPanel   from '../components/TongyiQualityPanel.vue'
import TongyiAspectPanel    from '../components/TongyiAspectPanel.vue'
import TongyiDurationPanel  from '../components/TongyiDurationPanel.vue'
import JimengVersionToggle  from '../components/JimengVersionToggle.vue'
import XiaomaStylePanel     from '../components/XiaomaStylePanel.vue'
import VeoDurationPanel     from '../components/VeoDurationPanel.vue'

import V31ModeTabs      from '../components/V31ModeTabs.vue'
import V31ImageUpload   from '../components/V31ImageUpload.vue'
import V31TemplatesPanel from '../components/V31TemplatesPanel.vue'
import V31ModelSelect   from '../components/V31ModelSelect.vue'
import V31RatioPanel    from '../components/V31RatioPanel.vue'
import V31GenCount      from '../components/V31GenCount.vue'
import V31AdvancedPanel from '../components/V31AdvancedPanel.vue'

import GkModeTabs       from '../components/GkModeTabs.vue'
import GkHeadPanel      from '../components/GkHeadPanel.vue'
import GkImageRefPanel  from '../components/GkImageRefPanel.vue'
import GkAspectPanel    from '../components/GkAspectPanel.vue'
import GkDurationPanel  from '../components/GkDurationPanel.vue'
import GkGenCount       from '../components/GkGenCount.vue'

import SrHeadPanel      from '../components/SrHeadPanel.vue'
import SrAspectPanel    from '../components/SrAspectPanel.vue'
import SrChannelPanel   from '../components/SrChannelPanel.vue'

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

const PROMPT_MAX  = 2000
const promptText  = ref('')
const refVideo    = ref(null)
const videoSize   = ref('auto')

const tongyiModel    = ref('ty-standard')
const tongyiRatio    = ref('9:16')
/* 通义 7 模块专属状态 */
const tongyiMode     = ref('txt2video')   // 文生视频 / 图生视频 / 视频换人 / 图生动作（默认第 1 个选中）
const tongyiAudioUrl = ref('')            // 音频文件地址
const tongyiQuality  = ref('720p')        // 清晰度：720P 标准清晰度 / 1080P 高清画质
const tongyiAspect   = ref('16:9')        // 尺寸：16:9 / 9:16 / 1:1 / 4:3 / 3:4
const tongyiDuration = ref('t5')          // 时长：5秒 / 10秒 / 15秒

const xiaomaStyle = ref('realistic')

const veoDuration = ref('5s')

const v31Mode      = ref('text2video')
const v31Image1    = ref(null)
const v31Model     = ref('fast')
const v31Ratio     = ref('9:16')
const v31Count     = ref(1)
const v31Translate = ref(true)
const v31Dubbing   = ref(true)
const onApplyTemplate = () => {
  // eslint-disable-next-line no-console
  console.log('[V31] apply template')
}

// GK 视频模块状态
const gkMode     = ref('g15')
const gkRefImage = ref(null)
const gkRatio    = ref('9:16')
const gkDuration = ref('10s')
const gkCount    = ref('1')
// 切换模式时，同步重置时长选项为各自合法范围内的默认值
watch(gkMode, (mode) => {
  if (mode === 'classic') {
    if (!['6s', '10s'].includes(gkDuration.value)) gkDuration.value = '6s'
  } else {
    if (!['10s', '15s'].includes(gkDuration.value)) gkDuration.value = '10s'
  }
})

// SR 视频模块状态
const srRefImage = ref(null)
const srRatio    = ref('9:16')
const srChannel  = ref('sora1')
const srCount    = ref('1')

const VIDEO_PROMPT_TAGS = [
  '电影感', '慢镜头', '推镜头', '4K超清', '电影运镜', '航拍视角', 
  '第一人称视角', '柔和光影', '赛博朋克', '中国风'
]

const BASE_COST_PER_VIDEO = 120
const genCost = computed(() => {
  let cost = BASE_COST_PER_VIDEO
  if (activeTool.value === 'gkv') {
    // GK：时长倍数 × 生成数量
    let durMul = 1
    if (gkMode.value === 'classic') {
      // classic：6秒=1倍，10秒=1.5倍
      durMul = gkDuration.value === '10s' ? 1.5 : 1
    } else {
      // g15：10秒=1倍，15秒=1.5倍
      durMul = gkDuration.value === '15s' ? 1.5 : 1
    }
    const count = parseInt(gkCount.value) || 1
    cost = Math.round(BASE_COST_PER_VIDEO * durMul * count)
  } else if (activeTool.value === 'jimeng20') {
    cost = Math.round(cost * 1.5)
  } else if (activeTool.value === 'veo') {
    const durSeconds = parseInt(veoDuration.value) || 5
    if (durSeconds > 10) {
      cost = cost * 2
    }
  }
  if (activeTool.value === 'v31') {
    const c = v31Count.value || 1
    cost = cost * c
  }
  if (activeTool.value === 'sr') {
    const c = parseInt(srCount.value) || 1
    cost = Math.round(BASE_COST_PER_VIDEO * c)
  }
  return cost
})

const canGenerate = computed(() => {
  if (activeTool.value === 'gkv') {
    // GK：g15需要提示词+参考图；classic模式图片可选，只要有提示词即可
    if (gkMode.value === 'g15') {
      return promptText.value.trim().length > 0 && !!gkRefImage.value
    }
    return promptText.value.trim().length > 0
  }
  if (activeTool.value === 'v31') {
    // V31：img2video/ref2video需要图片；text2video只要有提示词
    const hasPrompt = promptText.value.trim().length > 0
    if (v31Mode.value === 'text2video') return hasPrompt
    return hasPrompt && !!v31Image1.value
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
    gk: activeTool.value === 'gkv'
      ? {
          gkMode:     gkMode.value,
          gkRefImage: gkRefImage.value,
          gkRatio:    gkRatio.value,
          gkDuration: gkDuration.value,
          gkCount:    gkCount.value
        }
      : undefined,
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
    v31: activeTool.value === 'v31'
      ? {
          v31Mode:      v31Mode.value,
          v31Image1:    v31Image1.value,
          v31Model:     v31Model.value,
          v31Ratio:     v31Ratio.value,
          v31Count:     v31Count.value,
          v31Translate: v31Translate.value,
          v31Dubbing:   v31Dubbing.value
        }
      : undefined,
    sr: activeTool.value === 'sr'
      ? {
          srRefImage: srRefImage.value,
          srRatio:    srRatio.value,
          srChannel:  srChannel.value,
          srCount:    srCount.value
        }
      : undefined
  })
}
</script>

<style scoped>

.video-page {
  width: 100%;
  /* 自适应高度：100dvh - 顶部Header高，兼容手机地址栏伸缩 */
  height: calc(100dvh - 60px);
  min-height: 0;
  padding: clamp(8px, 0.8vw, 12px) clamp(10px, 1.1vw, 16px);
  box-sizing: border-box;
  background: var(--bg-base, #121212);
  color: var(--text-primary, #E5EAF3);
  overflow: hidden;
  transition: background-color var(--theme-dur) var(--theme-ease);
  /* 抵消 Layout.content-scroll padding-left 带来的偏右：自适应对齐 */
  margin-left: calc(var(--layout-left-pad, 36px) * -0.8333);
}

.video-grid {
  display: grid;
  /* 自适应：左列使用 --col-left 流体变量；右列自适应剩余空间 */
  grid-template-columns: var(--col-left, 400px) minmax(260px, 1fr);
  grid-auto-rows: minmax(0, auto);
  align-items: stretch;
  gap: clamp(8px, 1.25vw, 18px);
  width: 100%;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
  /* 跟随 Layout 左边距自适应偏移 */
  margin-left: calc(var(--layout-left-pad, 36px) * -0.8333);
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
  width: var(--col-left, 400px);
  max-width: var(--col-left, 400px);
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  min-height: 0;
  flex: 0 0 var(--col-left, 400px);
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
  align-items: flex-start;               /* ✅ 所有子组件左对齐（通义 7 模块左边缘严格对齐到同一基准） */
  padding: 4px 22px 100px;              /* ✅ 左右 22px 内边距，保证 400 宽容器内 356 组件居中 + 同一左基准 */
  gap: 8px;
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
/* 内部子元素：默认宽度跟随 --col-inner 流体变量 */
.col-left__scroll > .panel,
.col-left__scroll > section,
.col-left__scroll > * {
  width: var(--col-inner, 356px);
  max-width: var(--col-inner, 356px);
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
  background: #FE2C55;              /* ⭐ 用户要求：底部按钮统一粉底 #FE2C55 */
  color: #ffffff;                       /* ⭐ 白字 */
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  border: 1px solid #FE2C55;         /* ⭐ 边框同色 */
  cursor: pointer;
  transition: opacity 160ms ease;       /* ⭐ 仅保留透明度，移除 translateY/filter 装饰动画 */
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
.gen-btn:hover:not(:disabled) { opacity: 0.92; }
.gen-btn:active:not(:disabled) { opacity: 0.86; }
.gen-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.gen-tips {
  align-self: center;
  font-size: 12px;
  color: #606266;
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

/* --- 中屏(1000–1280)：仍为两列，收紧间距与按钮高度 --- */
@media (max-width: 1279.98px) {
  .video-grid { gap: 10px; }
  .col-left__scroll { padding: 4px 18px 80px; }
  .gen-btn { height: 38px; font-size: 14px; }
}

@media (max-width: 999.98px) {
  /* ⭐ 窄屏单列堆叠：滚动交给外层 Layout.content-scroll，本页不嵌套滚；
       边距统一由 content-scroll 承担（左右对称 16/12px）。*/
  .video-page {
    height: auto;
    min-height: auto;
    overflow: visible;
    margin: 0;
    padding: 0;
  }
  .video-grid {
    grid-template-columns: 1fr;
    height: auto;
    gap: 12px;
    margin-left: 0;        /* ⭐ 不再抵消 Layout padding — 内容左右自然对称 */
    width: 100%;
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
  .gen-btn { width: calc(100% - 30px); margin: 0 15px; height: 44px; }
}

/* --- 移动端 ≤768：进一步压缩间距与字号，按钮尺寸贴合手指点击 --- */
@media (max-width: 767.98px) {
  .video-grid { gap: 8px; }
  .col-left__scroll { padding: 0; gap: 6px; }
  .gen-btn { width: 100%; margin: 0; height: 46px; font-size: 15px; border-radius: 12px; }
  .gen-tips { font-size: 11px; }
}

/* ========== 通义万象专属样式（严格按用户规格） ========== */
/* ① 标题组件：上文字 20 加粗 / 下文字 14；取消 ImageHeadPanel 自身 6px 左右 padding 与其它组件左对齐 */
.ty-head :deep(.image-head) {
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-top: 4px !important;
}
.ty-head :deep(.page-title) {
  font-size: clamp(18px, 1.4vw, 20px) !important;
  font-weight: 700 !important;
}
.ty-head :deep(.page-desc) {
  font-size: clamp(13px, 1vw, 14px) !important;
  font-weight: 400 !important;
  margin-top: 8px !important;
}

/* ③ 提示词上方"输入文字描述..."：使用自适应内宽变量 */
.ty-prompt-intro {
  width: var(--col-inner, 356px);
  max-width: var(--col-inner, 356px);
  margin: 2px 0 8px;
  padding: 0;
  font-size: clamp(13px, 1vw, 14px);
  line-height: 1.6;
  font-weight: 400;
  box-sizing: border-box;
}
</style>
