<template>
  <!--
    严格按照用户红框布局（2 列结构）：
    ┌─────────────────────────────────────────────────────────┐
    │ Header（整行，放 HeaderBar 里）                           │
    ├─────────────────────────────────┬───────────────────────┤
    │ 左列（大框A）                     │ 右列（大框C）           │
    │ ┌─────────────────────────────┐ │                       │
    │ │ 小框B：构客图生图 | 我的作品 │ │                       │
    │ │ ─────副标题                 │ │                       │
    │ ├─────────────────────────────┤ │ 生成记录空态           │
    │ │ 参考图片（虚线框）           │ │ (整列高度居中盒子图)   │
    │ │ [选择图片按钮]              │ │                       │
    │ ├─────────────────────────────┤ │                       │
    │ │ ✨ 提示词大卡 (文本+0/2000) │ │                       │
    │ ├─────────────────────────────┤ │                       │
    │ │ [粉色大按钮：生成图片]       │ │                       │
    │ └─────────────────────────────┘ │                       │
    └─────────────────────────────────┴───────────────────────┘
  -->
  <div class="image-page">

    <!-- ====== 核心：2 列 Grid ====== -->
    <div class="image-grid">

      <!-- ======================================= -->
      <!-- 左列（大框A）：上方滚动区（标题/参考图/提示词） + 底部固定「生成图片」按钮 -->
      <!-- ======================================= -->
      <div class="col-left">

        <!-- ⭐ 上方可滚动区：从独立组件引入（标题/参考图/尺寸/提示词），宽度统一 356px -->
        <div class="col-left__scroll">



         

          <!-- 1. 标题面板：香蕉 / Qwen 用专属两行，其余工具用公共 ImageHeadPanel -->
          <!-- 香蕉专属：🍌 Nano Banana + 灰字副标题（按截图） -->
          <section v-if="activeTool === 'banana'" class="banana-head">
            <div class="banana-head__row1">
              <span class="banana-head__icon" aria-hidden="true">
                <!-- 带叶香蕉 SVG（截图风格，黄身棕梗绿叶） -->
                <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden="true">
                  <!-- 香蕉梗（棕） -->
                  <path d="M33 6 C34 6 36 7 36 10 C36 12 35 13 33 13 L31 13 L31 11.2 L32.4 10.6 C33.5 10.1 33.6 8.6 32.6 8.1 C31.6 7.6 30.4 8 30 9 L30 6 C30.6 5.4 31.8 5.5 33 6 Z" fill="#7B4F1E"/>
                  <!-- 香蕉叶（绿） -->
                  <path d="M34 4.5 C37.3 3.3 40.5 4 41.5 6 C42.2 7.5 41 9.7 38.2 10.8 C36 11.7 33.6 11.7 32.3 11 L32.3 8.5 C32.5 6.8 33.2 5.5 34 4.5 Z" fill="#4CAF50"/>
                  <!-- 香蕉主体（黄） -->
                  <path d="M32 12
                           C28 15 14 20 10 30
                           C7 37 11 40 18 39.2
                           C24 38.5 28 34.5 30 29.5
                           C31.5 25.5 31.4 20.5 30 16.2
                           L31.2 13.8
                           C32.3 17.3 33.1 22.3 32 26.8
                           C30 34 25.5 39.5 18 41
                           C8 43 5 39.5 7.5 32
                           C11.5 20.5 27 14.5 32 12 Z"
                        fill="#FFD43B" stroke="#E6B800" stroke-width="0.6" stroke-linejoin="round"/>
                  <!-- 香蕉底部暗面 -->
                  <path d="M9 30.5 C8 34 10 36.5 14 37 C14 34 12 32.5 10 31.5 C9.5 31 9 30.7 9 30.5 Z" fill="#FFC107" opacity="0.9"/>
                </svg>
              </span>
              <span class="banana-head__brand">Nano Banana</span>
            </div>
            <div class="banana-head__row2">选择 Banana 模型，输入提示词，生成专业级图片</div>
          </section>

          <!-- Qwen 专属：紫蓝六角图标 + Qwen 图片生成 + 灰字副标题（按截图） -->
          <section v-else-if="activeTool === 'qwen'" class="qwen-head">
            <div class="qwen-head__row1">
              <span class="qwen-head__icon" aria-hidden="true">
                <!-- Qwen 六角水晶图标（紫→蓝渐变，按截图） -->
                <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden="true">
                  <defs>
                    <linearGradient id="qwenMainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stop-color="#C084FC"/>
                      <stop offset="55%"  stop-color="#818CF8"/>
                      <stop offset="100%" stop-color="#38BDF8"/>
                    </linearGradient>
                    <linearGradient id="qwenHiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stop-color="#FFFFFF" stop-opacity="0.95"/>
                      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                  <!-- 12 点六角星主体（紫→蓝渐变） -->
                  <path
                    d="M24  3
                       L35 10
                       L43 22
                       L43 26
                       L35 38
                       L24 45
                       L13 38
                       L5  26
                       L5  22
                       L13 10
                       Z"
                    fill="url(#qwenMainGrad)"/>
                  <!-- 中央高光小菱形（水晶亮面） -->
                  <path
                    d="M24 13
                       L33 24
                       L24 35
                       L15 24
                       Z"
                    fill="url(#qwenHiGrad)" opacity="0.7"/>
                  <!-- 顶部白色小高光（截图左上白亮片） -->
                  <path
                    d="M19 8
                       L24 3
                       L29 8
                       L24 14
                       Z"
                    fill="#FFFFFF" opacity="0.55"/>
                </svg>
              </span>
              <span class="qwen-head__brand">Qwen 图片生成</span>
            </div>
            <div class="qwen-head__row2">通义万相图片生成，支持文生图和图生图</div>
          </section>

          <!-- G2 专属：纯文字两行（G2绘图 生成 + 灰字副标题，按截图） -->
          <section v-else-if="activeTool === 'g2'" class="g2-head">
            <div class="g2-head__row1">G2绘图 生成</div>
            <div class="g2-head__row2">文生图 / 图生图，支持官方与折扣渠道</div>
          </section>

          <!-- 即梦专属：蓝绿星芒图标 + 即梦图片 + 灰字副标题（按截图） -->
          <section v-else-if="activeTool === 'jimeng'" class="jimeng-head">
            <div class="jimeng-head__row1">
              <span class="jimeng-head__icon" aria-hidden="true">
                <!-- 即梦四角星芒图标（蓝青渐变主体 + 黄橙渐变尾焰高光，按截图） -->
                <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden="true">
                  <defs>
                    <!-- 主体：左上蓝 → 右下青（对应截图星芒的蓝绿渐变） -->
                    <linearGradient id="jimengMainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stop-color="#38BDF8"/>
                      <stop offset="50%"  stop-color="#22D3EE"/>
                      <stop offset="100%" stop-color="#34D399"/>
                    </linearGradient>
                    <!-- 尾焰/底部高光：橙 → 黄（对应截图星芒下方的黄橙小三角） -->
                    <linearGradient id="jimengFlameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stop-color="#FCD34D"/>
                      <stop offset="100%" stop-color="#F97316"/>
                    </linearGradient>
                    <!-- 左上白色高光（水晶反光） -->
                    <linearGradient id="jimengHiGrad" x1="0%" y1="0%" x2="50%" y2="50%">
                      <stop offset="0%"   stop-color="#FFFFFF" stop-opacity="0.95"/>
                      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
                    </linearGradient>
                  </defs>

                  <!-- 1. 主体四角星芒 path（4 外尖角 + 4 内凹点）：
                       上尖、右尖、下尖、左尖，中间 4 个内凹控制点做曲线
                       简化成 8 个点的星形，足够还原截图效果 -->
                  <path
                    d="M24 3
                       C25 10 27 16 36 12
                       C38 16 40 20 45 24
                       C40 28 38 32 36 36
                       C27 32 25 38 24 45
                       C23 38 21 32 12 36
                       C10 32 8  28 3  24
                       C8  20 10 16 12 12
                       C21 16 23 10 24 3
                       Z"
                    fill="url(#jimengMainGrad)"/>

                  <!-- 2. 底部黄橙尾焰小三角（对应截图星芒下方黄色外凸尖） -->
                  <path
                    d="M24 40
                       L30 50
                       L18 50
                       Z"
                    fill="url(#jimengFlameGrad)"/>

                  <!-- 3. 左上白色高光条（截图星芒的水晶亮面，左上小三角） -->
                  <path
                    d="M10 10
                       L20 4
                       L18 14
                       Z"
                    fill="url(#jimengHiGrad)" opacity="0.85"/>

                  <!-- 4. 中央高光小菱形（增强水晶感，可选） -->
                  <path
                    d="M24 14
                       L30 24
                       L24 34
                       L18 24
                       Z"
                    fill="url(#jimengHiGrad)" opacity="0.35"/>
                </svg>
              </span>
              <span class="jimeng-head__brand">即梦图片</span>
            </div>
            <div class="jimeng-head__row2">即梦AI图片生成</div>
          </section>

          <!-- 剩余工具（仅 GK 构客）：公共头部 -->
          <ImageHeadPanel
            v-else
            :brand="TOOL_META[activeTool].brand"
            :title="TOOL_META[activeTool].title"
            :desc="TOOL_META[activeTool].desc"
          />

          

          <!-- 即梦专属：标题下方 Seedream 版本切换 Tabs（按截图胶囊风格） -->
          <div v-if="activeTool === 'jimeng'" class="jimeng-tabs-wrap">
            <div class="jimeng-tabs" role="tablist" aria-label="即梦版本">
              <button
                type="button"
                role="tab"
                class="jimeng-tab"
                :class="{ 'jimeng-tab--active': jimengVersion === '5.0' }"
                :aria-selected="jimengVersion === '5.0'"
                @click="jimengVersion = '5.0'"
              >Seedream 5.0</button>
              <button
                type="button"
                role="tab"
                class="jimeng-tab"
                :class="{ 'jimeng-tab--active': jimengVersion === '4.5' }"
                :aria-selected="jimengVersion === '4.5'"
                @click="jimengVersion = '4.5'"
              >Seedream 4.5</button>
            </div>
          </div>

          <!-- ⭐ Qwen 专属：① 模型选择（要求：固定在「最前边」——位于标题面板之上） -->
          <QwenModelSelect v-if="activeTool === 'qwen'" v-model="qwenModel" />
          <!-- ⭐ Banana 专属：① 模型选择（同要求：固定在最前边，标题面板之上） -->
          <BananaModelSelect v-if="activeTool === 'banana'" v-model="bananaModel" />
          <!-- 2. 参考图片面板（独立组件）
               · Qwen Z-Image：隐藏（用户要求 z-image 时不要参考图）
               · 其他工具（banana / gk / g2 / jimeng / qwen的wan/千问）：显示 -->
          <ImageRefPanel
            v-if="!(activeTool === 'qwen' && qwenModel === 'z-image')"
            v-model="refImg"
          />

          <!-- 3. 提示词面板：
               · Banana → BananaPromptPanel（带视角、AI润色按钮）
               · 其他（gk/g2/jimeng/qwen各模型） → 公共 ImagePromptPanel -->
          <BananaPromptPanel
            v-if="activeTool === 'banana'"
            v-model="promptText"
            :max="PROMPT_MAX"
            :suggest-tags="SUGGEST_TAGS"
            @viewpoint="onViewpoint"
            @ai-polish="onAIPolish"
          />

          <ImagePromptPanel
            v-else
            v-model="promptText"
            :max="PROMPT_MAX"
            :suggest-tags="SUGGEST_TAGS"
          />
<!-- G2 专属：标题下方 渠道 面板（官方渠道 / 折扣渠道，按截图顺序放在第 2 位） -->
          <G2ChannelPanel v-if="activeTool === 'g2'" v-model="g2Channel" />
          <!-- ⭐ Qwen 专属 B/C/D：根据当前选择的模型细分显示（用户要求） -->
          <template v-if="activeTool === 'qwen'">
            <!-- B. 模型版本：目前 3 个模型全部隐藏 -->
            <QwenModelVersion
              v-if="!['wan2.7', 'qwen2.0', 'z-image'].includes(qwenModel)"
              v-model="qwenVersion"
            />
            <!-- C. 图片比例：qwen下全部模型显示 -->
            <QwenAspectRatio v-model="qwenRatio" v-model:custom-size="qwenCustomSize" />
            <!-- D. 分辨率：1K / 2K 两按钮，单一按钮 174×36 字号 14（用户要求；放在生成数量上方） -->
            <QwenResolutionPanel v-model="qwenResolution" />
            <!-- E. 生成数量：wan2.7 / 千问2.0 才有 -->
            <QwenGenCount v-if="qwenModel !== 'z-image'" v-model="qwenCount" />
          </template>

          <!-- ⭐ Banana 专属 3/4/5：快速模板 → 图片比例 → 生成面板（生成方式+尺寸+数量） -->
          <template v-if="activeTool === 'banana'">
            <!-- 2. 快速选择模板（10个横滑卡片） -->
            <BananaTemplateGrid
              @use="onUseBananaTemplate"
              @view-all="onViewAllBananaTemplates"
            />
            <!-- 3. 图片比例（3行5+5+4，共14选项） -->
            <BananaAspectRatio v-model="bananaRatio" />
            <!-- 4+5. 生成方式（2段）+ 输出尺寸（3段）+ 生成数量（4段，1/3/5/10张） -->
            <BananaGenPanel
              v-model:genMode="bananaGenMode"
              v-model:resolution="bananaResolution"
              v-model:count="bananaCount"
            />
          </template>

          <!-- ⭐ 即梦专属：分辨率面板（2k / 4k） 替代公共图片尺寸（按要求把「选择尺寸」换成分辨率） -->
          <template v-if="activeTool === 'jimeng'">
            <section class="jimeng-resolution">
              <!-- 行1：标题（🎨 调色板图标 + 分辨率） -->
              <div class="jimeng-resolution__title">
                <span class="jimeng-resolution__title-icon" aria-hidden="true">
                  <!-- 调色板 SVG（截图 🎨 风格：白圆调色板 + 彩色小圆点） -->
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <!-- 调色板外圆（主圆） -->
                    <path
                      d="M12 2
                         C17.5228 2 22 6.47715 22 12
                         C22 17.5228 17.5228 22 12 22
                         C11.4477 22 11 21.5523 11 21
                         C11 20.1051 10.2388 19.387 9.12598 19.0628
                         C6.6547 18.341 5 16.0412 5 13.5
                         C5 10.7885 7.01472 8.5 9.5 8.5
                         C11.9853 8.5 14 10.4853 14 13
                         C14 13.5523 14.4477 14 15 14
                         L18 14
                         C20.2091 14 22 12.2091 22 10
                         C22 5.58172 17.5228 2 12 2Z"
                      fill="none"
                      stroke="#E1E4EA"
                      stroke-width="1.5"
                      stroke-linejoin="round"/>
                    <!-- 彩色小点：红、绿、蓝、橙，截图里那种四个彩色小点：调色板经典四色小点 -->
                    <circle cx="15.5" cy="6.5" r="1.3" fill="#FE2C55"/>  <!-- 红 -->
                    <circle cx="8.5"  cy="8"   r="1.3" fill="#FBBF24"/>  <!-- 黄 -->
                    <circle cx="7"    cy="14"  r="1.3" fill="#34D399"/>  <!-- 绿 -->
                    <circle cx="12"   cy="16.5" r="1.3" fill="#60A5FA"/>  <!-- 蓝 -->
                  </svg>
                </span>
                <span class="jimeng-resolution__title-text">分辨率</span>
              </div>

              <!-- 行2：2K / 4K （左：选中态大粉胶囊；右：未选中纯文字） -->
              <div class="jimeng-resolution__btns" role="radiogroup" aria-label="即梦分辨率">
                <!-- 2K 按钮：固定左侧，选中 → 大粉胶囊；未选中 → 纯文字 -->
                <button
                  type="button"
                  class="jimeng-resolution__btn"
                  :class="{
                    'jimeng-resolution__btn--capsule-active': jimengResolution === '2k',
                    'jimeng-resolution__btn--plain':      jimengResolution !== '2k'
                  }"
                  role="radio"
                  :aria-checked="jimengResolution === '2k'"
                  @click="jimengResolution = '2k'"
                >2K</button>
                <!-- 4K 按钮：固定右侧，选中 → 大粉胶囊；未选中 → 纯文字 -->
                <button
                  type="button"
                  class="jimeng-resolution__btn"
                  :class="{
                    'jimeng-resolution__btn--capsule-active': jimengResolution === '4k',
                    'jimeng-resolution__btn--plain':      jimengResolution !== '4k'
                  }"
                  role="radio"
                  :aria-checked="jimengResolution === '4k'"
                  @click="jimengResolution = '4k'"
                >4K</button>
              </div>

              <!-- 行3：💡 灯泡提示行（分辨率越高越好...） -->
              <div class="jimeng-resolution__tip">
                <span class="jimeng-resolution__tip-icon" aria-hidden="true">
                  <!-- 黄灯泡 SVG（截图 💡 风格：黄灯泡 + 钨丝） -->
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    <!-- 灯泡主体（黄） -->
                    <path
                      d="M12 2
                         C15.866 2 19 5.13401 19 9
                         C19 11.384 17.805 13.47 16 14.7447
                         L16 17
                         C16 17.5523 15.5523 18 15 18
                         L9 18
                         C8.44772 18 8 17.5523 8 17
                         L8 14.7447
                         C6.19497 13.47 5 11.384 5 9
                         C5 5.13401 8.13401 2 12 2Z"
                      fill="#FFF8DC"
                      stroke="#F59E0B"
                      stroke-width="1.3"/>
                    <!-- 钨丝：X 形（灯芯） -->
                    <path d="M10.5 9.5 L11.5 11.5 L12.5 9.5 L13.5 11.5" stroke="#F59E0B" stroke-width="1.1" stroke-linecap="round" fill="none"/>
                    <!-- 灯座：灯泡底座（深灰三道） -->
                    <path d="M9.5 18.5 H14.5 M10 20.5 H14 M10.5 22.5 H13.5" stroke="#9AA4B2" stroke-width="1.3" stroke-linecap="round"/>
                    <!-- 灯座：矩形框（灰） -->
                    <rect x="9" y="19.5" width="6" height="1.6" fill="#9AA4B2" rx="0.5"/>
                    <rect x="9.5" y="21.5" width="5" height="1.2" fill="#9AA4B2" rx="0.5"/>
                  </svg>
                </span>
                <span class="jimeng-resolution__tip-text">分辨率越高，图片质量越好，生成时长越长</span>
              </div>
            </section>
          </template>

          <!-- G2 专属 4/5/6/7：图片比例 → 分辨率 → 图片质量 → 生成数量（按用户要求的顺序） -->
          <template v-if="activeTool === 'g2'">
            <!-- ③ 图片比例：8 选项 + 自定义尺寸开关；渠道决定是否显示「预估价格」副标题 -->
            <G2AspectRatio v-model="g2Ratio" v-model:custom-size="g2CustomSize" :channel="g2Channel" />
            <!-- ④ 分辨率：1K / 2K / 4K -->
            <G2ResolutionPanel v-model="g2Resolution" />
            <!-- ⑤ 图片质量：快速 / 标准 / 优质；渠道决定是否显示 Tokens 计费卡 -->
            <G2QualityPanel v-model="g2Quality" :channel="g2Channel" />
            <!-- ⑥ 生成数量：1 / 3 / 5 / 10 张 + 底部提示文字 -->
            <G2GenCount v-model="g2Count" />
          </template>

          <!-- 公共 图片尺寸选择面板：
               · banana：隐藏（由 BananaGenPanel 的「输出尺寸」接管）
               · jimeng：隐藏（由上方即梦专属「分辨率」接管）
               · g2：隐藏（由上方 G2 专属 4 组件接管）
               · qwen：隐藏（由上方 Qwen 专属分辨率组件接管）
               · 其他工具（仅 gk）：显示 -->
          <ImageSizePanel v-if="activeTool !== 'banana' && activeTool !== 'jimeng' && activeTool !== 'g2' && activeTool !== 'qwen'" v-model="imgSize" />
        </div><!-- /.col-left__scroll 滚动区结束 -->

        <!-- ⭐ 底部固定：粉色大「生成图片」按钮（不在滚动条内，始终可见）—— 积分写进按钮内 -->
        <section class="gen-panel">
          <button type="button" class="gen-btn" :disabled="!canGenerate" @click="onGenerate">
            <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
              <path d="M12 2 L14.3 9.2 L21.8 9.2 L15.7 14 L18 21.5 L12 17 L6 21.5 L8.3 14 L2.2 9.2 L9.7 9.2 Z" fill="currentColor"/>
            </svg>
            <span>生成图片</span>
            <span class="gen-btn__cost">消耗 {{ genCost }} 积分</span>
          </button>
        </section>
      </div>

      <!-- ======================================= -->
      <!-- 右列（大框C）：顶部「我的作品」按钮 + 下方 生成记录空态 -->
      <!-- ======================================= -->
      <section class="col-right record-panel">
        <!-- 顶部：我的作品（粉色小按钮） -->
        <div class="record-panel__head">
          <button type="button" class="my-work-btn" @click="onMyWorks">

            <span>我的作品</span>
          </button>
        </div>

        <!-- 中间：空态（flex:1 占据剩余高度，内部垂直居中） -->
        <div class="record-empty">
          <!-- 3D 黑色空盒子 SVG（跟参考图一致） -->
          <svg viewBox="0 0 140 130" width="170" height="155" class="record-empty__box" aria-hidden="true">
            <defs>
              <linearGradient id="img_box_f" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stop-color="#3E4044"/>
                <stop offset="100%" stop-color="#1F2022"/>
              </linearGradient>
              <linearGradient id="img_box_r" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stop-color="#2B2C2E"/>
                <stop offset="100%" stop-color="#151617"/>
              </linearGradient>
              <linearGradient id="img_box_t" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stop-color="#5A5C60"/>
                <stop offset="100%" stop-color="#333436"/>
              </linearGradient>
              <linearGradient id="img_box_lid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stop-color="#4A4C50"/>
                <stop offset="100%" stop-color="#2C2D30"/>
              </linearGradient>
            </defs>
            <!-- 顶面 -->
            <polygon points="70,14 118,38 70,62 22,38" fill="url(#img_box_t)"/>
            <!-- 正面 -->
            <polygon points="22,38 70,62 70,116 22,92" fill="url(#img_box_f)"/>
            <!-- 右侧面 -->
            <polygon points="118,38 70,62 70,116 118,92" fill="url(#img_box_r)"/>
            <!-- 折起的盖子（参考图是盖子打开） -->
            <polygon points="70,14 97,2 122,14 70,40" fill="url(#img_box_lid)"/>
            <!-- 描边线 -->
            <path d="M22 38 L70 62 L118 38" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1.2"/>
            <path d="M70 62 L70 116" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.2"/>
            <path d="M70 14 L97 2 L122 14" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.2"/>
          </svg>
          <div class="record-empty__text">请登录后查看生成记录</div>
        </div>
      </section>

    </div>

    <!-- 香蕉作图：查看更多模板弹框（Teleport 到 body，不受父级滚动/层级影响） -->
    <BananaTemplatesModal
      :visible="bananaTplModalVisible"
      @close="bananaTplModalVisible = false"
      @use="onUseModalTemplate"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/* ====== 从独立组件引入滚动区 4 个面板 ====== */
import ImageHeadPanel   from '../components/ImageHeadPanel.vue'
import ImageRefPanel    from '../components/ImageRefPanel.vue'
import ImagePromptPanel from '../components/ImagePromptPanel.vue'
import ImageSizePanel   from '../components/ImageSizePanel.vue'

/* ====== Qwen 专属：5 个新增配置组件（只在 activeTool==='qwen' 时渲染） ====== */
import QwenModelSelect   from '../components/QwenModelSelect.vue'
import QwenModelVersion  from '../components/QwenModelVersion.vue'
import QwenAspectRatio   from '../components/QwenAspectRatio.vue'
import QwenResolutionPanel from '../components/QwenResolutionPanel.vue'
import QwenGenCount      from '../components/QwenGenCount.vue'

/* ====== Banana 专属：5 个新增配置组件（只在 activeTool==='banana' 时渲染） ====== */
import BananaModelSelect   from '../components/BananaModelSelect.vue'
import BananaPromptPanel   from '../components/BananaPromptPanel.vue'
import BananaTemplateGrid  from '../components/BananaTemplateGrid.vue'
import BananaAspectRatio   from '../components/BananaAspectRatio.vue'
import BananaGenPanel      from '../components/BananaGenPanel.vue'
import BananaTemplatesModal from '../components/BananaTemplatesModal.vue'

/* ====== G2 专属：5 个新增配置组件（只在 activeTool==='g2' 时渲染） ====== */
import G2ChannelPanel     from '../components/G2ChannelPanel.vue'
import G2AspectRatio      from '../components/G2AspectRatio.vue'
import G2ResolutionPanel  from '../components/G2ResolutionPanel.vue'
import G2QualityPanel     from '../components/G2QualityPanel.vue'
import G2GenCount         from '../components/G2GenCount.vue'

const route  = useRoute()
const router = useRouter()

/* ====== 默认子工具：GK ====== */
const IMG_TOOL_KEYS = ['gk', 'qwen', 'banana', 'g2', 'jimeng']
const activeTool = computed(() => {
  const k = route.query && route.query.tool
  if (k && IMG_TOOL_KEYS.includes(k)) return k
  return 'gk'
})

watch(
  () => [route.path, route.query && route.query.tool],
  () => {
    if (route.path !== '/image') return
    const k = route.query && route.query.tool
    if (!k || !IMG_TOOL_KEYS.includes(k)) {
      router.replace({ path: '/image', query: { ...route.query, tool: 'gk' } })
    }
  },
  { immediate: true, flush: 'post' }
)

/* ====== 每个子工具的文案映射 ====== */
const TOOL_META = {
  gk:     { brand: '构客',     title: '图生图',      desc: '基于参考图片生成新图片' },
  qwen:   { brand: '通义万相', title: '万象图生图',  desc: '基于 Qwen 大模型，从参考图片创作高质量新图' },
  banana: { brand: '香蕉作图', title: 'AI 创意画图', desc: '热门 AI 作图工具 · 风格多样 · 生成快（HOT）' },
  g2:     { brand: 'G2',       title: 'G2 图生图',   desc: 'G2 图像模型生成，色彩还原更强' },
  jimeng: { brand: '即梦',     title: '即梦 AI 绘图',desc: '即梦图片生成，支持多风格创作' }
}

/* ====== 提示词 / 参考图 / 图片尺寸 ====== */
const PROMPT_MAX  = 2000
const promptText  = ref('')
const refImg      = ref(null)
const imgSize     = ref('auto')     /* 新增：图片尺寸（ImageSizePanel v-model） */

/* ====== Qwen 专属：5 个新增配置状态 ====== */
const qwenModel      = ref('wan2.7')      /* ① 模型选择 */
const qwenVersion    = ref('wan2.7')      /* ② 模型版本 */
const qwenRatio      = ref('1:1')         /* ③ 图片比例 */
const qwenCustomSize = ref(false)         /* ③ 自定义尺寸开关 */
const qwenResolution = ref('1k')          /* ④ 分辨率（1K / 2K） */
const qwenCount      = ref(1)             /* ⑤ 生成数量 */

/* ====== Banana 专属：5 个新增配置状态 ====== */
const bananaModel      = ref('banana2')   /* ① 模型选择 */
const bananaRatio      = ref('1:1')       /* ② 图片比例（14 选项） */
const bananaGenMode    = ref('queue')     /* ③-1 生成方式 */
const bananaResolution = ref('1k')        /* ③-2 输出尺寸 */
const bananaCount      = ref(1)           /* ③-3 生成数量（1/3/5/10张） */
const bananaTplModalVisible = ref(false)  /* ④ 查看更多模板弹框开关 */

/* ====== 即梦专属：版本切换 Tabs 状态 ====== */
const jimengVersion = ref('5.0')          /* Seedream 5.0（默认） / Seedream 4.5 */

/* ====== 即梦专属：分辨率选项 & 状态 ====== */
const JIMENG_RES_OPTS = [
  { key: '2k', label: '2K' },
  { key: '4k', label: '4K' }
]
const jimengResolution = ref('2k')         /* 默认 2K */

/* ====== G2 专属：5 个新增配置状态 ====== */
const g2Channel      = ref('official')   /* ① 渠道：official 官方 / discount 折扣 */
const g2Ratio        = ref('1:1')        /* ② 图片比例 */
const g2CustomSize   = ref(false)        /* ② 自定义尺寸开关 */
const g2Resolution   = ref('1k')         /* ③ 分辨率：1k / 2k / 4k */
const g2Quality      = ref('fast')       /* ④ 图片质量：fast 快速 / std 标准 / high 优质 */
const g2Count        = ref(1)            /* ⑤ 生成数量：1 / 3 / 5 / 10 张 */

const SUGGEST_TAGS = ['赛博朋克', '中国风', '写实', '二次元', '4K超高清', '油画风格', '电影感']

/* ====== 底部积分：单张基础分 28；
   · Qwen 且非 Z-Image：随「生成数量」倍增（wan2.7 / 千问2.0 有生成数量选择）
   · Qwen Z-Image：不显示生成数量，固定 1 张 → 28 积分
   · Banana：随生成数量（1 / 3 / 5 / 10 张）倍增
   · 其他子工具：固定 28 ====== */
const BASE_COST_PER_IMAGE = 28
const genCost = computed(() => {
  if (activeTool.value === 'qwen') {
    if (qwenModel.value === 'z-image') return BASE_COST_PER_IMAGE
    return BASE_COST_PER_IMAGE * (qwenCount.value || 1)
  }
  if (activeTool.value === 'banana') {
    return BASE_COST_PER_IMAGE * (bananaCount.value || 1)
  }
  if (activeTool.value === 'g2') {
    /* G2 按生成数量倍增，官方渠道按 3 倍预扣（质量面板中的计费提示已经说明） */
    const mult = g2Channel.value === 'official' ? 3 : 1
    return BASE_COST_PER_IMAGE * (g2Count.value || 1) * mult
  }
  return BASE_COST_PER_IMAGE
})

const canGenerate = computed(() => promptText.value.trim().length > 0)

/* ====== 点击事件（占位交互） ====== */
const onMyWorks  = () => { /* 占位 */ }
const onGenerate = () => {
  if (!canGenerate.value) return
  // eslint-disable-next-line no-console
  console.log('[Image] generate', {
    tool:   activeTool.value,
    prompt: promptText.value,
    ref:    refImg.value,
    size:   imgSize.value,
    // ⭐ Qwen 专属参数（仅在 Qwen 模式下有意义）
    qwen: activeTool.value === 'qwen'
      ? {
          model:      qwenModel.value,
          version:    qwenVersion.value,
          ratio:      qwenRatio.value,
          customSize: qwenCustomSize.value,
          resolution: qwenResolution.value,
          count:      qwenCount.value
        }
      : undefined,
    // ⭐ Banana 专属参数（仅在 Banana 模式下有意义）
    banana: activeTool.value === 'banana'
      ? {
          model:      bananaModel.value,
          ratio:      bananaRatio.value,
          genMode:    bananaGenMode.value,
          resolution: bananaResolution.value,
          count:      bananaCount.value
        }
      : undefined,
    // ⭐ G2 专属参数（仅在 G2 模式下有意义）
    g2: activeTool.value === 'g2'
      ? {
          channel:    g2Channel.value,
          ratio:      g2Ratio.value,
          customSize: g2CustomSize.value,
          resolution: g2Resolution.value,
          quality:    g2Quality.value,
          count:      g2Count.value
        }
      : undefined
  })
}

/* ====== Banana 专属：占位交互回调 ====== */
const onViewpoint = () => { /* 视角：占位，后续接入相机视角选择模块 */ }
const onAIPolish  = () => {
  /* AI润色：占位，将当前 promptText 调用 LLM 润色后写回
     示例：若接入接口，可在此处把润色后的文案赋给 promptText.value */
  if (!promptText.value.trim()) return
}
const onUseBananaTemplate = (tpl) => {
  // 立即使用：把模板预置的参考图/提示词（如标题+副标题）写入 promptText
  if (!tpl) return
  const parts = [tpl.title, tpl.subtitle].filter(Boolean)
  const prefix = parts.length ? parts.join('，') + '，' : ''
  promptText.value = prefix + (promptText.value || '').trim()
}
const onViewAllBananaTemplates = () => { bananaTplModalVisible.value = true }
const onUseModalTemplate = (tpl) => {
  /* 弹框里点击使用案例 / 播放按钮 → 把案例标题前缀拼入 promptText */
  if (!tpl) return
  const parts = [tpl.title].filter(Boolean)
  const prefix = parts.length ? parts.join('，') + '，' : ''
  promptText.value = prefix + (promptText.value || '').trim()
}
</script>

<style scoped>
/* =====================================================================
   整页容器：固定视口高度，页面级不滚动；左右两列内部自己控制滚动
   ===================================================================== */
.image-page {
  width: 100%;
  /* 自适应高度：100dvh - 顶部Header高，兼容手机地址栏伸缩 */
  height: calc(100dvh - 60px);
  min-height: 0;
  padding: clamp(8px, 0.8vw, 12px) clamp(10px, 1.1vw, 16px);
  box-sizing: border-box;
  background: var(--bg-base, #121212);
  color: var(--text-primary, #E5EAF3);
  overflow: hidden;                  /* ⭐ 整页禁滚，滚动只发生在左列内部 */
  transition: background-color var(--theme-dur) var(--theme-ease);
  /* 抵消 Layout.content-scroll padding-left 带来的偏右：自适应对齐 */
  margin-left: calc(var(--layout-left-pad, 36px) * -0.8333);
}

/* =====================================================================
   核心 2 列 Grid：
   左侧列严格 400px 固定宽（用户明确要求"左侧应该是四百宽度"）
   右侧自适应剩余空间，高度随内容（降到不需要滚动的程度）
   ===================================================================== */
.image-grid {
  display: grid;
  /* 自适应：左列使用 --col-left 流体变量（400@1440，320 下限）；右列自适应剩余空间 */
  grid-template-columns: var(--col-left, 400px) minmax(260px, 1fr);
  grid-auto-rows: minmax(0, auto);
  align-items: stretch;             /* ⭐ 两列等高：右列与左列拉伸一致，亮主题不再错位 */
  gap: clamp(8px, 1.25vw, 18px);
  width: 100%;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
  /* ⭐ 页面整体左移：跟随 Layout 左边距自适应（抵消 content-scroll padding-left） */
  margin-left: calc(var(--layout-left-pad, 36px) * -0.8333);
}

/* ---- 通用面板（卡片）：取消灰色背景（用户要求），保留内边距与排版 ---- */
.panel {
  background: transparent;                  /* ⭐ 取消灰色背景 */
  border: none;                             /* ⭐ 取消描边（随背景一同去掉） */
  border-radius: 0;
}

.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  /* ⭐ 亮/暗主题统一：用主题变量替代硬编码 #，保证浅色下可读 */
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 10px;
}
.panel-title__icon  { font-size: 14px; }
.panel-title__spark { font-size: 14px; }
.panel-title__opt   {
  /* ⭐ 亮/暗主题统一：替换硬编码 # */
  color: var(--text-faint, #8B93A0);
  font-weight: 400;
  margin-left: 2px;
}

/* =====================================================================
   左列：外层容器（跟随 --col-left 流体宽，固定视口高度），内部结构：
   ┌─────────────────────────────┐
   │  gen-panel（顶部固定，不滚）│
   ├─────────────────────────────┤
   │  col-left__scroll（可滚）   │
   │   - head-panel（标题）      │
   │   - ref-panel（参考图）     │
   │   - prompt-panel（提示词）  │
   └─────────────────────────────┘
   ===================================================================== */
.col-left {
  width: var(--col-left, 400px);
  max-width: var(--col-left, 400px);
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 14px;                          /* 生成按钮区与滚动区之间的间距 */
  min-width: 0;
  min-height: 0;
  flex: 0 0 var(--col-left, 400px);
  overflow: hidden;                   /* ⭐ 外层禁滚，只让内层 scroll 滚动 */
}


/* 生成按钮面板：固定在底部，不参与滚动（flex 0 0 auto） */
.col-left > .gen-panel {
  flex: 0 0 auto;
  /* ✅ 不移动按钮位置：去掉 margin-bottom:-20（底部上缩-20正是切掉按钮下半部分的原因）；去掉非法 padding:-4px */
  margin-bottom: 0;
  padding: 0 0 8px;                    /* ✅ 减少内部 padding-bottom：只留 8px 安全边（原非法-4px被丢） */
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  z-index: 2;
}

/* 滚动容器：装 4 个独立面板（标题/参考图/尺寸/提示词）；隐藏滚动条但保留滚动能力 */
.col-left__scroll {
  flex: 1 1 auto;                      /* ✅ flex：占满左侧剩余高度（配合外层 .col-left flex column） */
  min-height: 0;                       /* ✅ flex 子项防溢出关键：允许收缩 */
  overflow-y: auto;                   /* ⭐ 左列滚动实际发生在这里 */
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;                /* ⭐ 所有子元素水平居中（左右各留 (400-356)/2=22px 空白） */
  /* ⭐ 用户要求：参考图片 ↔ 提示词（含中间的尺寸面板）之间所有面板间隔统一 10px */
  gap: 8px;                              /* ✅ 减少内部 gap：10→8 */
  /* 底部预留出「生成按钮(48px) + 按钮/滚动区 gap(14px) + 提示行(≈20px) + 安全区」 ≈ 100px，
        保证滚到底部时，最后一块面板不会把粉色按钮挤出 overflow:hidden 边界，按钮完整显示（不改按钮位置） */
  padding: 4px 0 100px;                /* ✅ 减少 padding-bottom：120→100 */
  box-sizing: border-box;

  /* ⭐ 隐藏滚动条（Firefox / IE） */
  scrollbar-width: none;
  -ms-overflow-style: none;
}
/* 滚动区内部所有面板：默认宽度跟随 --col-inner 流体变量（356@1440，288 下限） */
.col-left__scroll > .panel,
.col-left__scroll > section,
.col-left__scroll > * {
  width: var(--col-inner, 356px);                       /* ⭐ 内部元素统一自适应内宽 */
  max-width: var(--col-inner, 356px);
  box-sizing: border-box;
  flex: 0 0 auto;
}

/* 提示词面板：跟随 .col-left__scroll > * 的默认宽度（--col-inner = 356px），
   与上方参考图、下方分辨率/生成按钮严格对齐，不再出现"提示词比上下窄一截"的视觉断层。
   — 之前的 180px !important 锁宽是过期 hack，会让 GK/G2/Qwen 等图生页的提示词框明显缩成一小条。 */
.col-left__scroll :deep(.image-prompt) {
  width: var(--col-inner, 356px) !important;
  max-width: var(--col-inner, 356px) !important;
}

/* ⭐ 隐藏滚动条（Chrome / Safari / Edge） */
.col-left__scroll::-webkit-scrollbar { width: 0; height: 0; display: none; }
.col-left__scroll::-webkit-scrollbar-track { background: transparent; }
.col-left__scroll::-webkit-scrollbar-thumb { background: transparent; }

/* ---------- 生成图片 按钮（底部固定）：按钮左右各缩进 15px ---------- */
.gen-btn {
  appearance: none;
  -webkit-appearance: none;
  width: calc(100% - 30px);           /* ⭐ 左右各缩 15px → 总宽 - 30 */
  margin-left: 25px;
  margin-top: -9px;
  margin-bottom: 5px;                   /* ✅ 保持原位置，左右对称 15（去掉坏的右下 0） */
  height: 40px;
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
  transition: opacity 160ms ease;       /* ⭐ 仅保留禁用透明度，移除 translateY/filter 装饰动画 */
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

/* =====================================================================
   右列（大框C）：顶部「我的作品」按钮 ＋ 下方空态居中
   取消灰色背景（用户要求），高度随内容自适应，不出现滚动条
   ===================================================================== */
.col-right.record-panel {
  background: transparent;               /* ⭐ 取消灰色背景 */
  border: none;                          /* ⭐ 取消描边 */
  border-radius: 0;
  padding: 4px 0 8px;
  min-height: 0;
  height: 100%;                         /* ✅ 外层 grid 拉伸到满高，右列自己内部滚 */
  overflow-y: auto;                     /* ✅ 右列记录多了自己局部滚（外层整页不滚），不再 overflow:hidden 裁 */
  overflow-x: hidden;

  /* 竖向两部分：顶部 我的作品 + 下方 flex:1 空态 */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

/* 右列顶部：我的作品 按钮靠左 */
.record-panel__head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding:3px 5px 16px 14px;
  flex: 0 0 auto;
}

/* 粉色 我的作品 按钮（右列 record-panel 顶部） */
.record-panel__head .my-work-btn {
  appearance: none;
  -webkit-appearance: none;
  /* ⭐ 补背景/文字色，接入主题：深色=深灰描边+浅字；浅色=白底+黑字 */
  background: var(--bg-elevated, #F5F7FA);
  color: var(--text-primary, #ffffff);
  border: 1px solid var(--border-base, #E5E6EA);
  text-align: center;
  padding: 0 16px;
  width: 88px;
  height: 37px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  cursor: pointer;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    transform 140ms ease;
  flex: 0 0 auto;
  white-space: nowrap;
}
.record-panel__head .my-work-btn:hover {
  background: var(--bg-elevated-2, #F0F1F4);
  border-color: var(--border-strong, #E0E2E7);
  transform: translateY(-1px);
}
.record-panel__head .my-work-btn:active { transform: translateY(0) scale(0.98); }

/* 下方空态：高度由内容决定（因为外层 panel 已不强制高度），自身垂直水平居中 */
.record-empty {
  width: 100%;
  flex: 0 0 auto;                /* ⭐ 不再占剩余空间，高度=内容自然高度 → 不会滚动 */
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
  /* ⭐ 亮/暗主题统一：亮主题下减弱黑色阴影的突兀感（改用 --shadow-card） */
  filter: drop-shadow(0 14px 28px rgba(0,0,0,0.25));

}
.record-empty__text {
  font-size: 13px;
  /* ⭐ 亮/暗主题统一：替换硬编码 # */
  color: var(--text-faint, #98A2B3);
  line-height: 1.45;
}

/* =====================================================================
   中屏(1000–1280)：两列仍保留，但左右边距收紧、按钮/内宽微缩
   ===================================================================== */
@media (max-width: 1279.98px) {
  .image-grid { gap: 10px; }
  .col-left__scroll { padding: 4px 0 80px; }
  .gen-btn { height: 38px; font-size: 14px; }
}

/* =====================================================================
   响应式：窄屏 ≤1000 两列改单列（此时滚动由页面承担，不使用左列内部滚动）
   ===================================================================== */
@media (max-width: 999.98px) {
  /* ⭐ 窄屏单列堆叠：滚动交给外层 Layout.content-scroll，本页不嵌套滚；
       边距统一由 content-scroll 承担（左右对称 16/12px），
       所以本页清空 margin/padding，并把 grid 的 margin-left 负值抵消也删掉 →
       避免「左边贴边右边还空」的左右不对称（用户反馈）*/
  .image-page {
    height: auto;
    min-height: auto;
    overflow: visible;
    margin: 0;
    padding: 0;
  }
  .image-grid {
    grid-template-columns: 1fr;
    height: auto;
    gap: 12px;
    margin-left: 0;          /* ⭐ 不再抵消 Layout padding — 内容左右自然对称 */
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
  /* ⭐ 窄屏单列：取消「宽屏时提示词面板单独限 180px」的硬约束
     必须跟默认规则同样的选择器 + !important 才能覆盖，否则提示词框在单列里
     就只有 160–180px 宽（用户说「为什么这么大点」），右边全空黑。*/
  .col-left__scroll :deep(.image-prompt) {
    width: 100% !important;
    max-width: 100% !important;
  }
  .col-right.record-panel { min-height: 0; }
  .page-title { font-size: 22px; }
  .gen-btn { width: calc(100% - 30px); margin: 0 15px; height: 44px; }
}

/* =====================================================================
   移动端 ≤768：进一步压缩间距与字号，按钮尺寸贴合手指点击
   ===================================================================== */
@media (max-width: 767.98px) {
  .image-grid { gap: 8px; }
  .col-left__scroll { padding: 0; gap: 6px; }
  .gen-btn { width: 100%; margin: 0; height: 46px; font-size: 15px; border-radius: 12px; }
  .gen-tips { font-size: 11px; }
}

/* ==============================
   香蕉作图专属头部（截图两行风格）
   ============================== */
.banana-head {
  width: 100%;
  box-sizing: border-box;
  padding: 2px 6px 8px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}
.banana-head__row1 {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  width: 100%;
  min-height: 0;
}
.banana-head__icon {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  line-height: 0;
}
.banana-head__icon > svg { display: block; flex: 0 0 auto; }
.banana-head__brand {
  font-size: 20px;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: var(--text-primary, #ffffff);
  flex: 0 0 auto;
}
.banana-head__row2 {
  margin: 9px 0 0;
  font-size: 14px;
  line-height: 1.85;
  color: var(--text-faint, #98A2B3);
  flex: 0 0 auto;
  width: 100%;
}

/* ==============================
   Qwen 专属头部（截图两行风格）—— 排版规范与 banana-head 完全统一
   ============================== */
.qwen-head {
  width: 100%;
  box-sizing: border-box;
  padding: 2px 6px 8px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}
.qwen-head__row1 {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  width: 100%;
  min-height: 0;
}
.qwen-head__icon {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  line-height: 0;
}
.qwen-head__icon > svg { display: block; flex: 0 0 auto; }
.qwen-head__brand {
  font-size: 20px;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: var(--text-primary, #ffffff);
  flex: 0 0 auto;
}
.qwen-head__row2 {
  margin: 9px 0 0;
  font-size: 14px;
  line-height: 1.85;
  color: var(--text-faint, #98A2B3);
  flex: 0 0 auto;
  width: 100%;
}

/* ==============================
   G2 专属头部（截图纯文字两行风格）—— 排版规范与 banana/qwen 完全统一
   ============================== */
.g2-head {
  width: 100%;
  box-sizing: border-box;
  padding: 2px 6px 8px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}
.g2-head__row1 {
  width: 100%;
  flex: 0 0 auto;
  font-size: 20px;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: var(--text-primary, #ffffff);
}
.g2-head__row2 {
  margin: 9px 0 0;
  font-size: 14px;
  line-height: 1.85;
  color: var(--text-faint, #98A2B3);
  flex: 0 0 auto;
  width: 100%;
}

/* ==============================
   即梦专属头部（截图蓝绿星芒 + 两行风格）—— 排版规范统一
   ============================== */
.jimeng-head {
  width: 100%;
  box-sizing: border-box;
  padding: 2px 6px 8px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}
.jimeng-head__row1 {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  width: 100%;
  min-height: 0;
}
.jimeng-head__icon {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  line-height: 0;
}
.jimeng-head__icon > svg { display: block; flex: 0 0 auto; }
.jimeng-head__brand {
  font-size: 20px;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: var(--text-primary, #ffffff);
  flex: 0 0 auto;
}
.jimeng-head__row2 {
  margin: 9px 0 0;
  font-size: 14px;
  line-height: 1.85;
  color: var(--text-faint, #98A2B3);
  flex: 0 0 auto;
  width: 100%;
}

/* ==============================
   即梦专属：标题下方 Seedream 版本 Tabs（截图胶囊风）
   ============================== */
.jimeng-tabs-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0 4px;
  background: transparent;
}
.jimeng-tabs {
  width: 100%;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;          /* 两按钮居中（外胶囊大框保留） */
  padding: 4px;
  background: var(--bg-elevated-2, #f9d4d49a); /* ⭐ 保留外胶囊大框（与截图一致） */
  border-radius: 12px;
  gap: 4px;                         /* 中间 4px 缝，让各自圆角独立显示 */
}
.jimeng-tab {
  flex: 0 0 171.5px;                /* ⭐ 单按钮固定 171.5 × 36 */
  width: 171.5px;
  min-width: 0;
  height: 36px;                     /* ⭐ 高度 36 */
  border-radius: 6px;               /* ⭐ 圆角 6 */
  border: none;
  color: var(--text-primary, #ffffff);
  background: transparent;          /* 未选中：透明（外框已有背景） */
  font-size: 12px;                  /* ⭐ 字号 12 */
  font-weight: 400;                 /* 取消加粗 */
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  transition: background-color 140ms ease, color 140ms ease;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.jimeng-tab--active {
  background: #FE2C55;
  color: #fff;
  border-color: #FE2C55;
}
/* 深色主题：jimeng-tabs 胶囊背景改为 #262727 */
:global(.dark) .jimeng-tabs { background: #262727; }

/* ==============================
   即梦专属：分辨率面板（2k / 4k）—— 严格按截图重写
   · 行1：🎨 调色板图标 + 分辨率
   · 行2：左大粉胶囊（选中态） / 右纯文字（未选中）——  space-between
   · 行3：💡 黄灯泡 + 灰字提示
   ============================== */
.jimeng-resolution {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 0 4px;
  background: transparent;
}
/* ---------- 行1：标题 ---------- */
.jimeng-resolution__title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
  flex: 0 0 auto;
  width: 100%;
}
.jimeng-resolution__title-icon {
  width: 18px;
  height: 18px;
  line-height: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}
.jimeng-resolution__title-icon > svg { display: block; flex: 0 0 auto; }
.jimeng-resolution__title-text {
  font-size: 16px;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: var(--text-primary, #ffffff);
  flex: 0 0 auto;
}
/* ---------- 行2：按钮区（2K 左 / 4K 右）⭐ 统一尺寸：173.5 × 36 ---------- */
.jimeng-resolution__btns {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;   /* 从左排，不 space-between 造成一大一下观感 */
  gap: 12px;
  margin: 0 0 14px;
}
/* 通用按钮：所有态 173.5 × 36，字号14，圆角6 */
.jimeng-resolution__btn {
  border: none;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 173.5px;              /* ⭐ 单按钮固定 173.5 × 36 */
  width: 173.5px;
  height: 36px;
  padding: 0 8px;
  border-radius: 6px;             /* ⭐ 圆角 6 */
  font-size: 14px;                /* ⭐ 字号 14 */
  font-weight: 400;               /* 取消加粗 */
  line-height: 1;
  letter-spacing: 0.2px;
  background: transparent;        /* ⭐ 默认无背景色 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: none !important;    /* 零 box-shadow（禁令） */
  transition: background-color 140ms ease, color 140ms ease;
}
/* 选中态：粉红底白字（尺寸字号圆角完全继承 .jimeng-resolution__btn）
   ⭐ 补上之前注释里写了但没实现的样式 —— 缺它会导致选中按钮文字颜色错乱 */
.jimeng-resolution__btn--capsule-active {
  background: #FE2C55;       /* 主色：朋探粉 */
  color: #ffffff;            /* ⭐ 选中态白字（永远白，不随主题变） */
}

/* 未选中态：透明背景 + 按主题切换的文字色
   · 深色/默认（:root / .dark）：白字
   · 浅色（[data-theme='light']）：黑字
   ⭐ fallback 不要是 #2A2C2E（黑底黑字完全看不见），
     而是直接用「浅色主题覆盖器」写死，保证两种模式都可读 */
.jimeng-resolution__btn--plain {
  background: transparent;
  color: var(--text-primary, #ffffff);   /* 默认深色：白字 */
}
:global(:root[data-theme='light']) .jimeng-resolution__btn--plain {
  color: var(--text-primary, #ffffff);   /* 浅色主题：黑字 */
}
/* 另一种深色触发路径（EP 会把 .dark 挂在 <html>）—— 也保证白字 */
:global(.dark) .jimeng-resolution__btn--plain {
  color: #ffffff !important;
}

/* ---------- 行3：💡 灯泡提示行 ---------- */
.jimeng-resolution__tip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  width: 100%;
  flex: 0 0 auto;
}
.jimeng-resolution__tip-icon {
  width: 14px;
  height: 14px;
  line-height: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}
.jimeng-resolution__tip-icon > svg { display: block; flex: 0 0 auto; }
.jimeng-resolution__tip-text {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--text-faint, #98A2B3);
  flex: 0 0 auto;
}
</style>
