<template>
  <div class="tool-page">

    <!-- ================================================================== -->
    <!-- 🦞 分支 1：龙虾栏（独立布局：头部 + 左栏4模块 / 右栏AI对话 两列）    -->
    <!-- ================================================================== -->
    <div v-if="activeToolKey === 'claw'" class="claw-layout">

      <!-- 头部（规格：24 加粗 / 40*40 图标 / gap8 / 小字14 / 大字-小字间距8） -->
      <section class="claw-head">
        <div class="claw-head__title-row">
          <svg class="claw-head__ico" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
            <defs>
              <linearGradient id="claw_ico_g2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stop-color="#FF5B7D"/>
                <stop offset="100%" stop-color="#FF2E4E"/>
              </linearGradient>
            </defs>
            <path d="M20 6 C13.5 6 8 11.8 8 19.5 C8 24.2 9.8 28 12.5 30.5 L10 34 L13.5 32 C15.5 33.5 17.7 34.3 20 34.3 C22.3 34.3 24.5 33.5 26.5 32 L30 34 L27.5 30.5 C30.2 28 32 24.2 32 19.5 C32 11.8 26.5 6 20 6 Z"
                  fill="url(#claw_ico_g2)"/>
            <path d="M7 20.5 C4.8 19.8 3 18 3 15.8 C3 13.5 4.6 12 7 12 C7.5 14.5 8.8 16.6 10.6 17.8 C9.5 18.6 8.2 19.1 7 20.5 Z"
                  fill="url(#claw_ico_g2)"/>
            <path d="M33 20.5 C35.2 19.8 37 18 37 15.8 C37 13.5 35.4 12 33 12 C32.5 14.5 31.2 16.6 29.4 17.8 C30.5 18.6 31.8 19.1 33 20.5 Z"
                  fill="url(#claw_ico_g2)"/>
            <circle cx="16.2" cy="18.2" r="1.8" fill="#fff"/>
            <circle cx="23.8" cy="18.2" r="1.8" fill="#fff"/>
            <circle cx="16.2" cy="18.2" r="0.8" fill="#1A1C20"/>
            <circle cx="23.8" cy="18.2" r="0.8" fill="#1A1C20"/>
            <path d="M17 25 C18.3 26 19.2 26.5 20 26.5 C20.8 26.5 21.7 26 23 25"
                  fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
          <h1 class="claw-head__title">OpenClaw 模型转发</h1>
        </div>
        <p class="claw-head__desc">
          通过本地 AI 代理连接多个大语言模型，支持 QQ、飞书、企业微信等通讯软件直接交互，实现自主任务执行与持久记忆管理
        </p>
      </section>

      <!-- Body：两列 Grid（左栏 4 模块 320px / 右栏 AI 对话 1fr） -->
      <div class="claw-body">

        <!-- -------------------- 左列：4 个精确尺寸模块 -------------------- -->
        <div class="claw-col-left">

          <!-- ====== 模块 1：API 端点 320 × 130 ====== -->
          <section class="cmod cmod--endpoint">
            <h3 class="cmod__title">可用 API 端点</h3>

            <!-- 地址框：294 × 32 -->
            <div class="cmod-ep__box" :style="epBoxSize">
              <div class="cmod-ep__url">https://aptan.cc/v1</div>
              <button
                type="button"
                class="cmod-ep__copy"
                title="复制端点"
                @click="onClawCopy(clawApiEndpoint)"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <rect x="8" y="8" width="11" height="11" rx="2.5" fill="none" stroke="#606266" stroke-width="1.6"/>
                  <rect x="5" y="5" width="11" height="11" rx="2.5" fill="none" stroke="#606266" stroke-width="1.6" transform="translate(0,1)"/>
                </svg>
              </button>
            </div>

            <!-- 下面两行：字号 12 -->
            <ul class="cmod-ep__methods">
              <li>POST /chat/completions</li>
              <li>POST /messages</li>
            </ul>
          </section>

          <!-- ====== 模块 2：Token 配置 320 × 102 ====== -->
          <section class="cmod cmod--token">
            <h3 class="cmod__title">Token 配置</h3>

            <div class="cmod-tok__row">
              <!-- wrapper 输入框：170 × 24，字号 12 -->
              <input
                class="cmod-tok__input"
                :style="tokInputSize"
                :type="clawTokenVisible ? 'text' : 'password'"
                v-model="clawToken"
                readonly
              />
              <!-- 复制：48 × 24，圆角 4，字号 12 -->
              <button
                type="button"
                class="cmod-tok__btn"
                :style="tokBtnSize"
                @click="onClawCopy(clawToken)"
              >复制</button>
              <!-- 重置：48 × 24，圆角 4，字号 12 -->
              <button
                type="button"
                class="cmod-tok__btn"
                :style="tokBtnSize"
                @click="clawTokenVisible = !clawTokenVisible"
              >{{ clawTokenVisible ? '显示' : '重置' }}</button>
            </div>

            <!-- 小字提示：字号 12 -->
            <p class="cmod__tip">用于 OpenClaw API 认证，重置后将生成新的 Token</p>
          </section>

          <!-- ====== 模块 3：快速配置 ====== -->
          <section class="cmod cmod--quick">
            <div class="cmod__headrow">
              <h3 class="cmod__title">快速配置</h3>
              <!-- 查看配置：72 × 24，字号 12，圆角 6，颜色 #FF5677 -->
              <button
                type="button"
                class="cmod-quick__btn"
                :style="quickBtnSize"
                @click="onClawOpenConfig"
              >查看配置</button>
            </div>

            <!-- 内容：字号 12（4 条说明） -->
            <div class="cmod-quick__body">
              <p>请保护好 API Key，避免泄露造成额外损失</p>
              <p>OpenClaw 调用模型时会携带较多上下文信息，Token 消耗可能较高，建议关注用量与计费情况</p>
              <p>若安装 Skill 时遇到频繁问题，建议根据教程手动安装</p>
              <p>为提升安全能力，建议升级到 OpenClaw 最新版本</p>
            </div>
          </section>

          <!-- ====== 模块 4：选择模型 320 × 110 ====== -->
          <section class="cmod cmod--model">
            <h3 class="cmod__title">选择模型</h3>

            <!-- 下拉框：294 × 32，框内文字 14；菜单向上延伸 -->
            <div
              class="cmod-sel"
              :class="{ 'is-open': modelOpen }"
              :style="selBoxSize"
            >
              <button
                type="button"
                class="cmod-sel__head"
                @click.stop="modelOpen = !modelOpen"
              >
                <span class="cmod-sel__head-label"
                      :style="{ color: modelOpen ? '#FF5677' : '#1A1C20', fontWeight: 500 }">
                  {{ modelList[clawSelectedModel].label }}
                </span>
                <svg
                  class="cmod-sel__arrow"
                  :class="{ 'is-flip': modelOpen }"
                  viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"
                >
                  <!-- ⭐ 用户：下拉框点开后向上延伸 → 默认箭头朝下(▼)，点开后朝上(▲)翻转 -->
                  <polyline points="6,9 12,15 18,9" fill="none" stroke="#8B93A0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>

              <!-- ⭐ 菜单：向上延伸（absolute bottom:100%） 列表项 左label / 右价格 -->
              <ul v-if="modelOpen" class="cmod-sel__menu">
                <li
                  v-for="(m, idx) in modelList"
                  :key="m.key"
                  class="cmod-sel__opt"
                  :class="{ 'is-selected': idx === clawSelectedModel }"
                  @click.stop="onPickClawModel(idx)"
                >
                  <span
                    class="cmod-sel__opt-label"
                    :style="idx === clawSelectedModel ? { color: '#FF5677', fontWeight: 700 } : null"
                  >{{ m.label }}</span>
                  <span
                    v-if="m.price"
                    class="cmod-sel__opt-price"
                  >输入:{{ m.price.in }} 输出:{{ m.price.out }} 积分/K</span>
                </li>
              </ul>
            </div>

            <!-- 下面价格文字：字号 12 -->
            <p class="cmod-model__price">
              <template v-if="modelList[clawSelectedModel].price">
                价格：输入 {{ modelList[clawSelectedModel].price.in }} 积分/K，输出 {{ modelList[clawSelectedModel].price.out }} 积分/K
              </template>
              <template v-else>
                价格：请参考官方定价
              </template>
            </p>
          </section>

        </div>

        <!-- -------------------- 右列：AI 对话面板（精确 936×449） -------------------- -->
        <section class="claw-chat">

          <!-- ============ 顶部标题：左图标 18×18 / AI 不加粗 对话 加粗 / 下 12 号模型名 ============ -->
          <header class="claw-chat__head">
            <!-- 左边对话气泡图标 18×18（颜色#FF5677 与龙虾栏主色一致） -->
            <svg class="claw-chat__head-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M4 5 H20 V15 H14 L10 19 L10 15 H4 Z"
                    fill="none" stroke="#FF5677" stroke-width="1.8" stroke-linejoin="round"/>
            </svg>

            <div class="claw-chat__head-text">
              <!-- 上排：AI（14 不加粗） + 对话（14 加粗） -->
              <div class="claw-chat__title">
                <span class="claw-chat__title-ai">AI</span>
                <span class="claw-chat__title-chat">对话</span>
              </div>
              <!-- 下排：模型名 kim-42.5 字号 12 -->
              <div class="claw-chat__model">kim-42.5</div>
            </div>
          </header>

          <!-- ============ 中间空态：934×303 / 图标 80×88 / 开始对话 14 ============ -->
          <div class="claw-chat__empty" :style="{ width: '934px', height: '303px' }">
            <svg
              class="claw-chat__empty-icon"
              viewBox="0 0 80 88" width="80" height="88" aria-hidden="true"
            >
              <defs>
                <linearGradient id="chat_empty_g" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#B9C0CC"/>
                  <stop offset="100%" stop-color="#7A818E"/>
                </linearGradient>
              </defs>
              <!-- 折纸机器人（按 80×88 重绘，保持原比例） -->
              <polygon points="40,11 74,40 74,64 40,82 6,64 6,40"
                       fill="url(#chat_empty_g)" opacity="0.98"/>
              <polygon points="40,11 74,40 40,56 6,40"
                       fill="#E5E7EB" opacity="0.9"/>
              <polygon points="40,56 74,40 74,64 40,82"
                       fill="#8E94A0" opacity="0.95"/>
              <!-- 眼睛 + 底座 -->
              <rect x="29" y="44" width="6"  height="3" fill="#FFFFFF" opacity="0.95" rx="0.6"/>
              <rect x="45" y="44" width="6"  height="3" fill="#FFFFFF" opacity="0.95" rx="0.6"/>
              <polygon points="20,83 60,83 66,88 14,88" fill="#CCD1D9" opacity="0.9"/>
            </svg>
            <p class="claw-chat__empty-tip">开始对话</p>
          </div>

          <!-- ============ 底部输入框：910×60 / 距底12 左12 右12 / 左右按钮图标各12×12 ============ -->
          <footer class="claw-chat__inputbar" :style="{ width: '910px', height: '60px' }">
            <!-- 左删除/附件按钮（图标 12×12） -->
            <button type="button" class="claw-chat__leftbtn" aria-label="附件">
              <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                <!-- 回形针/附件 图标（简化版，12×12） -->
                <path d="M21 12.5 L12.5 21 C9.4 24 4.4 24 1.3 20.9 C -1.7 17.9 -1.7 13 1.3 9.9 L10.8 1.3 C13 -0.9 16.6 -0.9 18.8 1.3 C21 3.5 21 7.1 18.8 9.3 L9.3 18.8 C8.1 20 6.2 20 5 18.8 C3.8 17.6 3.8 15.7 5 14.5 L13.4 6.1"
                      fill="none" stroke="#606266" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <input
              class="claw-chat__input"
              v-model="clawChatInput"
              type="text"
              placeholder="输入消息，Enter 发送（Shift+Enter 换行）"
              @keydown.enter.ctrl.prevent
              @keydown.enter.exact.prevent="onClawSend"
            />

            <!-- 右发送：粉色圆按钮（图标 12×12） -->
            <button
              type="button"
              class="claw-chat__send"
              aria-label="发送"
              @click="onClawSend"
            >
              <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                <polygon points="3,11 21,3 13,21 11,13" fill="#FFFFFF"/>
              </svg>
            </button>
          </footer>
        </section>
      </div>
    </div>

    <!-- ================================================================== -->
    <!-- 🎬 分支 2：视频反推（原三列） -->
    <!-- ================================================================== -->
    <template v-else-if="activeToolKey === 'vreverse'">
      <div class="tool-grid">

        <div class="col-left">
          <div class="col-left__scroll">

            <section class="vrev-head">
              <h1 class="vrev-head__title">视频反推</h1>
              <p class="vrev-head__desc">上传视频智能分析生成提示词，支持媒体地址解析</p>
            </section>

            <div class="vrev-tabs" role="tablist">
              <button
                type="button" class="vrev-tab"
                :class="{ 'is-active': vrevTab === 'url' }"
                @click="vrevTab = 'url'"
              >视频反推</button>
              <button
                type="button" class="vrev-tab"
                :class="{ 'is-active': vrevTab === 'parse' }"
                @click="vrevTab = 'parse'"
              >地址解析</button>
            </div>

            <template v-if="vrevTab === 'url'">
              <section class="vrev-field">
                <header class="vrev-field__head">
                  <h3 class="vrev-field__title">
                    <svg class="vrev-field__icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                      <rect x="2.5" y="6.5" width="13.5" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
                      <polygon points="16,12 21.5,9 21.5,15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                    </svg>
                    视频地址
                  </h3>
                  <div class="vrev-switch-row">
                    <button
                      type="button"
                      class="vrev-toggle"
                      :class="{ 'is-on': uploadMode }"
                      :style="toggleSize"
                      @click="uploadMode = !uploadMode"
                    >
                      <span class="vrev-toggle__dot"></span>
                    </button>
                    <span class="vrev-switch-row__label">上传视频</span>
                  </div>
                </header>
                <div
                  class="vrev-input"
                  :class="{ 'vrev-input--upload': uploadMode }"
                  :style="inputBoxSize"
                >
                  <template v-if="!uploadMode">
                    <input
                      v-model="videoUrl" type="text" class="vrev-input__ctrl"
                      placeholder="请输入视频URL地址（支持 http:// 或 https:// 开头的视频链接）"
                    />
                  </template>
                  <template v-else>
                    <span class="vrev-input__upload-placeholder">点击上传本地视频文件（占位）</span>
                  </template>
                </div>
                <p class="vrev-field__tip">
                  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true" class="vrev-tip__icon">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/>
                    <line x1="12" y1="10.5" x2="12" y2="16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <circle cx="12" cy="8" r="1.1" fill="currentColor"/>
                  </svg>
                  支持标准视频链接格式
                </p>
              </section>

              <section class="vrev-field">
                <header class="vrev-field__head">
                  <h3 class="vrev-field__title">
                    <svg class="vrev-field__icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                      <path d="M4 4 L20 4 L20 20 L4 20 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>
                      <path d="M7 8 L17 8 M7 12 L17 12 M7 16 L13 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                    </svg>
                    反推要求
                  </h3>
                  <div class="vrev-switch-row">
                    <button
                      type="button" class="vrev-toggle"
                      :class="{ 'is-on': sysPromptOff }"
                      :style="toggleSize"
                      @click="sysPromptOff = !sysPromptOff"
                    >
                      <span class="vrev-toggle__dot"></span>
                    </button>
                    <span class="vrev-switch-row__label">关闭系统提示词</span>
                  </div>
                </header>
                <div class="vrev-input" :style="inputBoxSize">
                  <input
                    v-model="reviseText" type="text" class="vrev-input__ctrl"
                    placeholder="输入你的反推要求，例如：重点描述人物动作和表情"
                  />
                </div>
                <p class="vrev-field__tip">
                  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true" class="vrev-tip__icon">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/>
                    <line x1="12" y1="10.5" x2="12" y2="16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <circle cx="12" cy="8" r="1.1" fill="currentColor"/>
                  </svg>
                  反推要求会添加到用户输入中
                </p>
              </section>

              <section class="vrev-field">
                <header class="vrev-field__head vrev-field__head--single">
                  <h3 class="vrev-field__title">
                    <svg class="vrev-field__icon" viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
                      <rect x="6" y="10" width="20" height="14" rx="4" fill="#FF5677"/>
                      <rect x="9" y="5" width="14" height="7" rx="2" fill="#1A1C20"/>
                      <circle cx="13" cy="8.5" r="1" fill="#FF5677"/>
                      <circle cx="19" cy="8.5" r="1" fill="#FF5677"/>
                      <rect x="11" y="15" width="3" height="3" fill="#FFF" rx="0.5"/>
                      <rect x="18" y="15" width="3" height="3" fill="#FFF" rx="0.5"/>
                      <rect x="13.5" y="20" width="5" height="1.6" rx="0.8" fill="#FFF"/>
                    </svg>
                    分析模型
                  </h3>
                </header>
                <div class="vrev-select" :class="{ 'is-open': modelOpen }" :style="selectBoxSize">
                  <button type="button" class="vrev-select__head" @click="modelOpen = !modelOpen">
                    <span class="vrev-select__head-value"
                          :style="{ color: '#FF5677' }">{{ modelOptions[selectedModel].label }}</span>
                    <span class="vrev-select__head-sub">{{ modelOptions[selectedModel].desc }}</span>
                    <svg class="vrev-select__arrow"
                         :class="{ 'is-flip': modelOpen }"
                         viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                      <polyline points="6,9 12,15 18,9" fill="none" stroke="#8B93A0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <ul v-if="modelOpen" class="vrev-select__menu">
                    <li
                      v-for="(m, idx) in modelOptions"
                      :key="m.key"
                      class="vrev-select__option"
                      :class="{ 'is-selected': selectedModel === idx }"
                      @click="onSelectModel(idx)"
                    >
                      <span
                        class="vrev-select__opt-label"
                        :style="selectedModel === idx ? { color: '#FF5677' } : null"
                      >{{ m.label }}</span>
                      <span class="vrev-select__opt-desc">{{ m.desc }}</span>
                    </li>
                  </ul>
                </div>
                <p class="vrev-field__tip" style="margin-top: 2px;">
                  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true" class="vrev-tip__icon">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/>
                    <line x1="12" y1="10.5" x2="12" y2="16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <circle cx="12" cy="8" r="1.1" fill="currentColor"/>
                  </svg>
                  按实际消耗 tokens 计费，输入：{{ modelOptions[selectedModel].inCost }} 积分/K，输出：{{ modelOptions[selectedModel].outCost }} 积分/K
                </p>
              </section>
            </template>
            <section v-else class="vrev-empty-tab">地址解析内容后续实现（占位）</section>
          </div>
          <section class="gen-panel gen-panel--primary">
            <button type="button" class="gen-btn gen-btn--primary" @click="onStartAnalyze">
              <svg class="gen-btn__wand" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <!-- 魔法棒：中心环 + 八方向辐射光线 -->
                <line x1="12" y1="3"  x2="12" y2="7"   fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="12" y1="17" x2="12" y2="21"  fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="3"  y1="12" x2="7"  y2="12"  fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="17" y1="12" x2="21" y2="12"  fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="5.6" y1="5.6"  x2="8.5" y2="8.5"   fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="15.5" y1="15.5" x2="18.4" y2="18.4" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="18.4" y1="5.6"  x2="15.5" y2="8.5"  fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="8.5"  y1="15.5" x2="5.6"  y2="18.4" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <circle cx="12" cy="12" r="3.4" fill="none" stroke="#FFFFFF" stroke-width="1.8"/>
              </svg>
              <span class="gen-btn__main">开始分析</span>
            </button>
          </section>
        </div>

        <section class="col-preview">
          <svg class="col-preview__cam" viewBox="0 0 140 130" width="80" height="80" aria-hidden="true">
            <defs>
              <linearGradient id="prev_cam2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stop-color="#6D7380"/>
                <stop offset="100%" stop-color="#3A3E45"/>
              </linearGradient>
            </defs>
            <rect x="30" y="42" width="80" height="52" rx="10" fill="url(#prev_cam2)"/>
            <circle cx="70" cy="68" r="18" fill="#2A2C30" stroke="#8B93A0" stroke-width="2"/>
            <circle cx="70" cy="68" r="10" fill="#1A1C20"/>
            <circle cx="70" cy="68" r="4"  fill="#4A4E55"/>
            <rect x="56" y="26" width="28" height="18" rx="5" fill="none" stroke="url(#prev_cam2)" stroke-width="6"/>
          </svg>
          <p class="col-preview__tip">
            请在左侧上传视频或输入地址<br>开始视频反推分析
          </p>
        </section>

        <aside class="col-right record-panel">
          <div class="record-panel__head">
            <h2>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="record-panel__cam">
                <rect x="3" y="4" width="18" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/>
                <path d="M7 9 L17 9 M7 13 L14 13 M7 17 L12 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
              反推记录
            </h2>
          </div>
          <div class="record-warn">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="record-warn__ico">
              <circle cx="12" cy="12" r="10" fill="#FFA940"/>
              <line x1="12" y1="11" x2="12" y2="16" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
              <circle cx="12" cy="8.4" r="1.2" fill="#fff"/>
            </svg>
            <span>历史记录临时存在浏览器中，请及时保存重要内容</span>
          </div>
          <div class="record-empty">
            <svg viewBox="0 0 140 130" width="170" height="155" class="record-empty__box" aria-hidden="true">
              <defs>
                <linearGradient id="rec_cam2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#6D7380"/>
                  <stop offset="100%" stop-color="#3A3E45"/>
                </linearGradient>
              </defs>
              <rect x="30" y="42" width="80" height="52" rx="10" fill="url(#rec_cam2)"/>
              <circle cx="70" cy="68" r="18" fill="#2A2C30" stroke="#8B93A0" stroke-width="2"/>
              <circle cx="70" cy="68" r="10" fill="#1A1C20"/>
              <circle cx="70" cy="68" r="4"  fill="#4A4E55"/>
              <rect x="56" y="26" width="28" height="18" rx="5" fill="none" stroke="url(#rec_cam2)" stroke-width="6"/>
            </svg>
            <div class="record-empty__title">暂无反推记录</div>
            <div class="record-empty__sub">开始分析后会自动保存到这里</div>
          </div>
        </aside>
      </div>
    </template>

    <!-- ================================================================== -->
    <!-- ✏️ 分支 3：局部编辑（localedit）三列布局 -->
    <!-- ================================================================== -->
    <template v-else-if="activeToolKey === 'localedit'">
      <div class="tool-grid tool-grid--localedit">
        <!-- 左列：配置面板 -->
        <div class="col-left">
          <div class="col-left__scroll">
            <!-- 标题：20 加粗 + 14 辅助 -->
            <section class="led-head">
              <h1 class="led-head__title">局部编辑</h1>
              <p class="led-head__desc">上传图片并标记区域，AI 智能编辑局部内容</p>
            </section>

            <!-- 原始图片 -->
            <section class="led-up">
              <header class="led-up__head">
                <svg class="led-up__ico" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" fill="none" stroke="#1A1C20" stroke-width="1.8"/>
                  <circle cx="8.5" cy="10" r="1.8" fill="#1A1C20"/>
                  <path d="M4 20 L9 15 L13 18 L17 13 L21 19" fill="none" stroke="#1A1C20" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3 class="led-up__title">原始图片</h3>
              </header>
              <div class="led-up__box">
                <div class="led-up__hint">请先登录<br><span>登录后即可上传图片</span></div>
                <div class="led-up__plus">+</div>
                <button type="button" class="led-up__btn">
                  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
                    <path d="M8 11 L10 13 L16 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  选择图片
                </button>
              </div>
            </section>

            <!-- 要替换的图片（可选） -->
            <section class="led-up led-up--opt">
              <header class="led-up__head">
                <svg class="led-up__ico" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" fill="none" stroke="#1A1C20" stroke-width="1.8"/>
                  <circle cx="8.5" cy="10" r="1.8" fill="#1A1C20"/>
                  <path d="M4 20 L9 15 L13 18 L17 13 L21 19" fill="none" stroke="#1A1C20" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3 class="led-up__title">要替换的图片（可选）</h3>
              </header>
              <div class="led-up__box">
                <div class="led-up__hint">请先登录<br><span>登录后即可上传图片</span></div>
                <div class="led-up__plus">+</div>
                <button type="button" class="led-up__btn">
                  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
                    <path d="M8 11 L10 13 L16 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  选择图片
                </button>
              </div>
            </section>
          </div>

          <!-- 生成按钮：局部编辑专用 UI（主按钮 + 消耗积分文字）-->
          <section class="gen-panel gen-panel--primary">
            <button type="button" class="gen-btn gen-btn--primary gen-btn--primary-with-tag" @click="onLocalEditGen">
              <svg class="gen-btn__wand" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <!-- 魔法棒：中心环 + 八方向辐射光线 -->
                <line x1="12" y1="3"  x2="12" y2="7"   fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="12" y1="17" x2="12" y2="21"  fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="3"  y1="12" x2="7"  y2="12"  fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="17" y1="12" x2="21" y2="12"  fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="5.6" y1="5.6"  x2="8.5" y2="8.5"   fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="15.5" y1="15.5" x2="18.4" y2="18.4" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="18.4" y1="5.6"  x2="15.5" y2="8.5"  fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="8.5"  y1="15.5" x2="5.6"  y2="18.4" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                <circle cx="12" cy="12" r="3.4" fill="none" stroke="#FFFFFF" stroke-width="1.8"/>
              </svg>
              <span class="gen-btn__main">一键生成</span>
              <span class="gen-btn__tag gen-btn__primary-tag">本次消耗 ... 积分</span>
            </button>
          </section>
        </div>

        <!-- 右列：按图重做的引导卡片 700 × 500，圆角 24 -->
        <section class="col-preview col-preview--localedit">
          <div class="led-card" :style="ledCardSize">
            <h2 class="led-card__title">
              <span class="led-card__title--red">精准编辑局部，</span>灵活调整细节
            </h2>

            <div class="led-card__row">
              <!-- 图1：上传原图 160×213 圆角12 -->
              <div class="led-card__item">
                <div class="led-card__img" :style="ledImgSize">
                  <svg viewBox="0 0 160 213" width="160" height="213" aria-hidden="true">
                    <defs>
                      <linearGradient id="lc_g1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#A3D977"/>
                        <stop offset="60%" stop-color="#FFE58F"/>
                        <stop offset="100%" stop-color="#FFC069"/>
                      </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="160" height="213" rx="12" fill="url(#lc_g1)"/>
                    <rect x="10" y="20" width="80" height="14" rx="7" fill="#FFB84D" opacity="0.9"/>
                    <rect x="10" y="38" width="96" height="20" rx="10" fill="#8B5A2B" opacity="0.78"/>
                    <ellipse cx="80" cy="168" rx="48" ry="14" fill="#1F3B24" opacity="0.6"/>
                    <rect x="52" y="96" width="56" height="86" rx="10" fill="#FFD591" stroke="#8B5A2B" stroke-width="2"/>
                    <rect x="58" y="78" width="44" height="24" rx="12" fill="#A0522D"/>
                    <circle cx="80" cy="122" r="12" fill="#FFFFFF" opacity="0.88"/>
                  </svg>
                </div>
                <div class="led-card__label">上传原图</div>
              </div>

              <!-- 箭头1：40×40 -->
              <div class="led-card__arrow" :style="ledArrowSize">
                <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
                  <circle cx="20" cy="20" r="20" fill="#FE2C55"/>
                  <path d="M16 12 L26 20 L16 28 Z" fill="#FFFFFF"/>
                </svg>
              </div>

              <!-- 图2：选择替换图 160×213 圆角12 -->
              <div class="led-card__item">
                <div class="led-card__img led-card__img--opt" :style="ledImgSize">
                  <svg viewBox="0 0 160 213" width="160" height="213" aria-hidden="true">
                    <defs>
                      <linearGradient id="lc_g2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#F6F6F8"/>
                        <stop offset="100%" stop-color="#E8E9EC"/>
                      </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="160" height="213" rx="12" fill="url(#lc_g2)"/>
                    <rect x="20" y="20" width="120" height="173" rx="10" fill="#FFFFFF" stroke="#E0E2E6"/>
                    <path d="M80 48 C 56 48 42 68 42 92 C 42 114 56 134 80 134 C 104 134 118 114 118 92 C 118 68 104 48 80 48 Z"
                          fill="#A0522D"/>
                    <path d="M64 96 C 64 104 72 112 80 112 C 88 112 96 104 96 96 L 104 96 C 104 110 94 122 80 122 C 66 122 56 110 56 96 Z"
                          fill="#FFFFFF"/>
                    <rect x="64" y="142" width="32" height="28" rx="4" fill="#A0522D"/>
                    <rect x="70" y="150" width="20" height="4" rx="2" fill="#FFFFFF"/>
                    <rect x="70" y="158" width="16" height="4" rx="2" fill="#FFFFFF"/>
                  </svg>
                </div>
                <div class="led-card__label">选择替换图（可选）</div>
              </div>

              <!-- 箭头2：40×40 -->
              <div class="led-card__arrow" :style="ledArrowSize">
                <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
                  <circle cx="20" cy="20" r="20" fill="#FE2C55"/>
                  <path d="M16 12 L26 20 L16 28 Z" fill="#FFFFFF"/>
                </svg>
              </div>

              <!-- 图3：生成编辑结果 160×213 圆角12 + AI生成角标 -->
              <div class="led-card__item">
                <div class="led-card__img" :style="ledImgSize">
                  <svg viewBox="0 0 160 213" width="160" height="213" aria-hidden="true">
                    <defs>
                      <linearGradient id="lc_g3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#A3D977"/>
                        <stop offset="60%" stop-color="#FFE58F"/>
                        <stop offset="100%" stop-color="#FFC069"/>
                      </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="160" height="213" rx="12" fill="url(#lc_g3)"/>
                    <rect x="10" y="20" width="80" height="14" rx="7" fill="#FFB84D" opacity="0.9"/>
                    <rect x="10" y="38" width="96" height="20" rx="10" fill="#8B5A2B" opacity="0.78"/>
                    <ellipse cx="80" cy="168" rx="48" ry="14" fill="#1F3B24" opacity="0.6"/>
                    <rect x="52" y="96" width="56" height="86" rx="10" fill="#D9B897" stroke="#7A461F" stroke-width="2"/>
                    <rect x="58" y="78" width="44" height="24" rx="12" fill="#8B5A2B"/>
                    <path d="M74 112 C 68 120 70 136 80 138 C 90 136 92 120 86 112 Z" fill="#FFFFFF" opacity="0.9"/>
                  </svg>
                  <span class="led-card__badge">AI生成</span>
                </div>
                <div class="led-card__label">生成编辑结果</div>
              </div>
            </div>

            <p class="led-card__desc">AI 智能识别标记区域，精准编辑局部内容</p>

            <button type="button" class="led-card__btn" :style="ledBtnSize">立即体验</button>
          </div>
        </section>
      </div>
    </template>

  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/* ============ 路由：默认工具兜底 ============ */
const route  = useRoute()
const router = useRouter()
const TOOL_KEYS = ['vreverse','claw','localedit','copyimg','textfix','giftbox','truck','play']

const activeToolKey = computed(() => (route.query && route.query.tool) || 'vreverse')

watch(
  () => [route.path, route.query && route.query.tool],
  () => {
    if (route.path !== '/tool') return
    const k = route.query && route.query.tool
    if (!k || !TOOL_KEYS.includes(k)) {
      router.replace({ path: '/tool', query: { ...route.query, tool: TOOL_KEYS[0] } })
    }
  },
  { immediate: true, flush: 'post' }
)

/* ==================================================================
   🦞 龙虾栏（claw）：新 4 模块 相关数据 / 交互
   ================================================================== */
const clawApiEndpoint  = ref('https://aptan.cc/v1')
const clawToken        = ref('sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
const clawTokenVisible = ref(false)
const clawChatInput    = ref('')

/* ---- 精确尺寸（用户规格）：全部用 computed 暴露给 style 绑定 ---- */
// 模块 1 API端点：320×130
const epBoxSize = computed(() => ({ width: '294px', height: '32px' }))
// 模块 2 Token：wrapper 170×24，按钮 48×24
const tokInputSize = computed(() => ({ width: '170px', height: '24px', fontSize: '12px' }))
const tokBtnSize   = computed(() => ({ width: '48px',  height: '24px', borderRadius: '4px', fontSize: '12px' }))
// 模块 3 快速配置：查看配置 72×24 圆角6 颜色#FF5677
const quickBtnSize  = computed(() => ({ width: '72px', height: '24px', borderRadius: '6px', fontSize: '12px', background: '#FF5677', color: '#FFFFFF', borderColor: '#FF5677' }))
// 模块 4 模型：下拉框 294×32
const selBoxSize    = computed(() => ({ width: '294px', height: '32px' }))

/* ---- 4 模块：龙虾栏 选择模型（11 条，按图3/图4提取） ---- */
const clawSelectedModel = ref(0)  // 默认 = kimi-k2.5
const modelOpen           = ref(false)

const modelList = [
  { key:'kimi-k2.5',              label:'kimi-k2.5',              price:{ in:'0.8',  out:'4.2'  } },
  { key:'MiniMax-M2.5',           label:'MiniMax-M2.5',           price:null },
  { key:'qwen3.5-plus',           label:'qwen3.5-plus',           price:{ in:'0.36', out:'1.44' } },
  { key:'qwen3.5-35b-a3b',        label:'qwen3.5-35b-a3b',        price:{ in:'0.19', out:'1.54' } },
  { key:'qwen3.5-flash',          label:'qwen3.5-flash',          price:{ in:'0.1',  out:'0.96' } },
  { key:'glm-5',                  label:'glm-5',                  price:null },
  { key:'gpt-5.4',                label:'gpt-5.4',                price:{ in:'0.5',  out:'3'    } },
  { key:'deepseek-v3.2',          label:'deepseek-v3.2',          price:{ in:'0.24', out:'0.36' } },
  { key:'claude-sonnet-4-6',      label:'claude-sonnet-4-6',      price:{ in:'0.6',  out:'3'    } },
  { key:'gemini-3.1-pro-preview', label:'gemini-3.1-pro-preview', price:{ in:'1.6',  out:'7.2'  } },
  { key:'claude-sonnet-4-6-aws',  label:'claude-sonnet-4-6-aws',  price:null },
]

const onPickClawModel = (idx) => {
  clawSelectedModel.value = idx
  modelOpen.value = false
}

/* 点击外部关闭下拉菜单（向上延伸也同样适用） */
let _closeClawMenu = null
const _installClawClose = () => {
  _closeClawMenu = (e) => {
    // 点击任意地方关闭（因为 @click.stop 已经阻止了 head/opt 的冒泡）
    modelOpen.value = false
    document.removeEventListener('click', _closeClawMenu, true)
  }
  setTimeout(() => document.addEventListener('click', _closeClawMenu, true), 0)
}
watch(modelOpen, (v) => { if (v) _installClawClose() })

/* 通用方法 */
const onClawCopy = async (text) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try { await navigator.clipboard.writeText(String(text || '')) } catch (e) { /* ignore */ }
  }
}
const onClawOpenConfig = () => { /* 占位 */ }
const onClawSend = () => {
  const text = (clawChatInput.value || '').trim()
  // eslint-disable-next-line no-console
  console.log('[Claw] send:', text)
}

/* ==================================================================
   🎬 视频反推：原有逻辑
   ================================================================== */
const vrevTab      = ref('url')
const uploadMode   = ref(false)
const videoUrl     = ref('')
const toggleSize   = { width: '30px',  height: '16px' }
const inputBoxSize = { width: '359px', height: '73px' }

const sysPromptOff = ref(false)
const reviseText   = ref('')

const selectBoxSize_v = { width: '359px', height: '32px' }
const selectedModel = ref(0)
const modelOptions = [
  { key:'flash', label:'qwen3-vl-flash', desc:'输入:0.07 输出:0.72 积分/K', inCost:'0.07', outCost:'0.72' },
  { key:'plus',  label:'qwen3-vl-plus',  desc:'输入:0.36 输出:3.6  积分/K', inCost:'0.36', outCost:'3.6'  },
]
const onSelectModel = (idx) => { selectedModel.value = idx; modelOpen.value = false }

// 视频反推的 modelOpen 也要有外部点击关闭
let _closeVrevMenu = null
const _vrevWatch = watch(modelOpen, (v) => {
  if (!v) return
  if (_closeVrevMenu) document.removeEventListener('click', _closeVrevMenu, true)
  _closeVrevMenu = () => { modelOpen.value = false; document.removeEventListener('click', _closeVrevMenu, true) }
  setTimeout(() => document.addEventListener('click', _closeVrevMenu, true), 0)
})
onBeforeUnmount(() => {
  if (_closeVrevMenu) document.removeEventListener('click', _closeVrevMenu, true)
  if (_closeClawMenu) document.removeEventListener('click', _closeClawMenu, true)
})

const onStartAnalyze = () => {
  // eslint-disable-next-line no-console
  console.log('[VReverse] start analyze', {
    tab: vrevTab.value, uploadMode: uploadMode.value, videoUrl: videoUrl.value,
    sysPromptOff: sysPromptOff.value, reviseText: reviseText.value,
    model: modelOptions[selectedModel.value]
  })
}

/* ==================================================================
   ✏️ 局部编辑（localedit）：数据 / 尺寸 / 事件
   ================================================================== */
// 引导卡片：700 宽，高度 auto（纵向排布 3 图 + 2 箭头后超过原 500，随内容撑开，圆角仍 24）
const ledCardSize  = computed(() => ({ width: '700px', height: 'auto', borderRadius: '24px' }))
// 三图：160 × 213 圆角 12
const ledImgSize   = computed(() => ({ width: '160px', height: '213px', borderRadius: '12px' }))
// 圆圈箭头：40 × 40
const ledArrowSize = computed(() => ({ width: '40px',  height: '40px' }))
// 立即体验按钮：96 × 40 字号 14 圆角 6
const ledBtnSize   = computed(() => ({ width: '96px', height: '40px', fontSize: '14px', borderRadius: '6px' }))

const onLocalEditGen = () => {
  // eslint-disable-next-line no-console
  console.log('[LocalEdit] generate')
}
</script>

<style scoped>
/* =====================================================================
   整页容器
   ===================================================================== */
.tool-page {
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: clamp(8px, 0.8vw, 12px) clamp(10px, 1.1vw, 16px);
  box-sizing: border-box;
  background: var(--bg-base, #FFFFFF);
  color: var(--text-primary, #ffffff);
  overflow: hidden;
  /* 抵消 Layout.content-scroll padding-left：自适应 */
  margin-left: calc(var(--layout-left-pad, 36px) * -0.8333);
}

/* =====================================================================
   🦞 龙虾栏 顶层布局
   ===================================================================== */
.claw-layout {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  overflow: hidden;
}

/* 头部规格（保留之前的精确尺寸） */
.claw-head {
  padding: 4px 0 2px;
  box-sizing: border-box;
  width: 100%;
  flex: 0 0 auto;
}
.claw-head__title-row { display: flex; align-items: center; gap: 8px; width: 100%; }
.claw-head__ico { width: 40px; height: 40px; flex: 0 0 auto; }
.claw-head__title {
  margin: 0; font-size: 24px; font-weight: 700; line-height: 1.2;
  color: var(--text-primary, #ffffff);
}
.claw-head__desc {
  margin: 8px 0 0; font-size: 14px; line-height: 1.55;
  color: var(--text-secondary, #606266);
}

/* Body：两列 Grid（左 320px / 右对话 1fr），横向左→右 */
.claw-body {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-template-rows: 1fr;
  gap: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

/* 左列：4 个模块 320 宽，纵向堆叠，允许竖向滚动（仅左列） */
.claw-col-left {
  width: 320px;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 2px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.claw-col-left::-webkit-scrollbar { width: 0; height: 0; display: none; }

/* ==================== 通用模块（cmod）：浅线框 + 圆角 6 ==================== */
.cmod {
  width: 320px;
  box-sizing: border-box;
  background: var(--bg-surface, #FFFFFF);
  border: 1px solid var(--border-base, #E5E6EA);   /* ⭐ 浅线框住 */
  border-radius: 6px;                               /* ⭐ 圆角 6 */
  padding: 14px 13px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 0 0 auto;
}
.cmod__title {
  margin: 0;
  font-size: 14px;                                 /* ⭐ 所有标题字号 14 */
  font-weight: 700;
  line-height: 1.4;
  color: var(--text-primary, #ffffff);
}
.cmod__tip {
  margin: 0;
  font-size: 12px;                                 /* ⭐ 下面小字 12 */
  line-height: 1.55;
  color: var(--text-faint, #909399);                                  /* ⭐ 图片3：Token提示文字变浅 */
}
.cmod__headrow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

/* ---------- 模块 1：API 端点 320 × 130 ---------- */
.cmod--endpoint {
  height: 130px;                                     /* ⭐ 整体大小 320*130 */
  padding: 12px 13px 14px;
}
.cmod-ep__box {
  box-sizing: border-box;
  background: var(--bg-surface, #FFFFFF);
  border: 1px solid var(--border-base, #E5E6EA);
  border-radius: 4px;
  padding: 0 6px 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  flex: 0 0 auto;
}
.cmod-ep__url {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: ui-monospace, Consolas, Menlo, monospace;
  font-size: 12px;
  color: var(--text-primary, #ffffff);
  line-height: 32px;
}
.cmod-ep__copy {
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--text-muted, #606266);
}

.cmod-ep__methods {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 1 auto;
}
.cmod-ep__methods li {
  font-size: 12px;                                 /* ⭐ 下面两行字大小为 12 */
  line-height: 1.5;
  color: var(--text-faint, #909399);                                  /* ⭐ 图片4：API 方法文字变浅 */
  font-family: ui-monospace, Consolas, Menlo, monospace;
}

/* ---------- 模块 2：Token 配置 320 × 102 ---------- */
.cmod--token {
  height: 102px;                                     /* ⭐ 整体大小 320*102 */
  padding: 12px 13px 14px;
  gap: 8px;
}
.cmod-tok__row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}
.cmod-tok__input {
  box-sizing: border-box;
  padding: 0 10px;
  background: var(--bg-elevated, #F7F8FA);
  border: 1px solid var(--border-base, #E5E6EA);
  border-radius: 4px;
  font-family: ui-monospace, Consolas, Menlo, monospace;
  letter-spacing: 0.3px;
  color: var(--text-primary, #ffffff);
  outline: none;
}
.cmod-tok__input:focus { border-color: #FF5677; }
.cmod-tok__btn {
  box-sizing: border-box;
  padding: 0;
  background: var(--bg-surface, #FFFFFF);
  border: 1px solid var(--border-base, #E5E6EA);
  color: var(--text-primary, #ffffff);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease;
}
.cmod-tok__btn:hover { background: var(--bg-elevated, #F7F8FA); }

/* ---------- 模块 3：快速配置 ---------- */
.cmod--quick {
  padding: 12px 13px 14px;
  gap: 10px;
}
.cmod-quick__btn {
  box-sizing: border-box;
  padding: 0;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: normal;                  /* ⭐ 查看配置：按钮文字不加粗 */
  transition: background 0.15s ease;
  flex: 0 0 auto;
}
.cmod-quick__btn:hover { filter: brightness(0.97); }

.cmod-quick__body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cmod-quick__body p {
  margin: 0;
  font-size: 12px;                                 /* ⭐ 内容字体大小 12 */
  line-height: 1.65;
  color: var(--text-faint, #909399);                                  /* ⭐ 图片1：快速配置内容文字变浅 */
}

/* ---------- 模块 4：选择模型 320 × 110；菜单向上延伸 ---------- */
.cmod--model {
  height: 110px;                                     /* ⭐ 整体大小 320*110 */
  padding: 12px 13px 14px;
  gap: 8px;
  position: relative;                                /* ⭐ 为 absolute 菜单建立定位父级 */
}

.cmod-sel {
  position: relative;
  box-sizing: border-box;
  background: var(--bg-surface, #FFFFFF);
  border: 1px solid var(--border-base, #E5E6EA);
  border-radius: 4px;
  display: flex;
  align-items: stretch;
  flex: 0 0 auto;
  transition: border-color 0.15s ease;
  z-index: 30;
}
.cmod-sel:hover { border-color: var(--border-strong, #D0D2D6); }
.cmod-sel.is-open { border-color: #FF5677; border-radius: 4px; } /* 菜单向上 → 不需要改圆角 */

.cmod-sel__head {
  flex: 1 1 auto;
  min-width: 0;
  height: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 8px 0 12px;
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
}
.cmod-sel__head-label {
  font-size: 14px;                                  /* ⭐ 下拉框内文字大小 14 */
  line-height: 1.1;
  text-align: left;
  color: var(--text-primary, #ffffff);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cmod-sel__arrow { transition: transform 0.2s ease; }
.cmod-sel__arrow.is-flip { transform: rotate(180deg); }  /* ▼ ↔ ▲ 翻转 */

/* ========== 下拉菜单：向上延伸（bottom:100%，带小尖角） ========== */
.cmod-sel__menu {
  position: absolute;
  left: -1px;
  right: -1px;
  bottom: calc(100% + 10px);                       /* ⭐ 向上延伸 */
  list-style: none;
  margin: 0;
  padding: 8px 0;
  background: var(--bg-surface, #FFFFFF);
  border: 1px solid #FF5677;
  border-radius: 6px;
  box-shadow: 0 -6px 20px rgba(0,0,0,0.08), 0 6px 20px rgba(0,0,0,0.08);
  box-sizing: border-box;
  z-index: 999;
  max-height: 420px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
}
.cmod-sel__menu::-webkit-scrollbar { width: 0; }

/* 小尖角：在菜单底部中间，朝下指向 select head */
.cmod-sel__menu::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -8px;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: var(--bg-surface, #FFFFFF);
  border-right: 1px solid #FF5677;
  border-bottom: 1px solid #FF5677;
}

.cmod-sel__opt {
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  cursor: pointer;
  transition: background 0.12s ease;
}
.cmod-sel__opt:hover { background: #FFF0F3; }
.cmod-sel__opt.is-selected { background: #FE2C55; color: #fff; }
.cmod-sel__opt-label {
  font-size: 14px;
  line-height: 1.4;
  color: var(--text-primary, #ffffff);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}
.cmod-sel__opt-price {
  font-size: 14px;
  line-height: 1.4;
  color: var(--text-faint, #8B93A0);
  text-align: right;
  justify-self: end;
  flex: 0 0 auto;
  white-space: nowrap;
}

.cmod-model__price {
  margin: 0;
  font-size: 12px;                                  /* ⭐ 下边价格文字大小 12 */
  line-height: 1.55;
  color: var(--text-faint, #909399);                                   /* ⭐ 图片2：模型价格文字变浅 */
}

/* -------------------- 右列：AI 对话面板（精确 936×449） -------------------- */
.claw-chat {
  position: relative;                              /* 输入框 absolute 定位父容器 */
  width: 936px;                                     /* ⭐ 整体 936×449 */
  height: 449px;
  flex: 0 0 936px;
  box-sizing: border-box;
  background: var(--bg-surface, #FFFFFF);
  border: 1px solid var(--border-base, #E5E6EA);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: visible;                                /* 组件自身内部布局，子元素控制溢出 */
  min-width: 0;
  min-height: 0;
}

/* ========== 顶部标题：左 18×18 icon / AI(14不加粗) 对话(14加粗) / 模型名 12 ========== */
.claw-chat__head {
  flex: 0 0 auto;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-base, #E5E6EA);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
}
.claw-chat__head-icon {
  width: 18px; height: 18px;                          /* ⭐ 左边对话图标 18×18 */
  flex: 0 0 18px;
  display: block;
}
.claw-chat__head-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  min-width: 0;
}
.claw-chat__title {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;                                          /* AI 与 对话之间小间距 */
  font-size: 14px;                                   /* ⭐ 标题文字大小 14 */
  line-height: 1.4;
  color: var(--text-primary, #ffffff);
}
.claw-chat__title-ai  { font-weight: 400; }          /* ⭐ AI 不加粗 */
.claw-chat__title-chat{ font-weight: 700; }          /* ⭐ 对话 加粗 */

.claw-chat__model {
  font-size: 12px;                                   /* ⭐ 下模型名字大小 12 */
  line-height: 1.4;
  color: var(--text-faint, #909399);                                    /* 变浅：模型名辅助文字 */
  font-family: ui-monospace, Consolas, Menlo, monospace;
}

/* ========== 中间空态：934×303 / 图标 80×88 / 开始对话 14 ========== */
.claw-chat__empty {
  flex: 0 0 auto;
  margin: 0 auto;                                    /* 水平居中：934 比 936 内宽少 0，正好贴边 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  box-sizing: border-box;
}
.claw-chat__empty-icon {
  width: 80px; height: 88px;                         /* ⭐ 图标大小 80×88 */
  flex: 0 0 88px;
  display: block;
}
.claw-chat__empty-tip {
  margin: 0;
  font-size: 14px;                                   /* ⭐ 开始对话四个字大小 14 */
  font-weight: 500;
  line-height: 1.5;
  color: var(--text-secondary, #606266);
}

/* ========== 底部输入框：910×60 / 距整个组件 底12 左12 右12 / 左右按钮图标各12×12 ========== */
.claw-chat__inputbar {
  position: absolute;
  left: 12px;                                        /* ⭐ 距整个组件左部 12px */
  right: 12px;                                       /* ⭐ 距整个组件右部 12px （实际宽度=934-24=910）*/
  bottom: 12px;                                      /* ⭐ 距整个组件底部 12px */
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-elevated, #FAFBFC);
  border: 1px solid var(--border-base, #E5E6EA);
  border-radius: 6px;
  padding: 0 10px;
}

/* 左删除/附件按钮（图标 12×12） */
.claw-chat__leftbtn {
  width: 24px;  height: 24px;  flex: 0 0 24px;
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent; border: none; padding: 0; cursor: pointer;
}

/* 中间输入框，占满剩余空间 */
.claw-chat__input {
  flex: 1 1 auto; min-width: 0;
  height: 100%;                                      /* 填满 60 高 */
  padding: 0;
  box-sizing: border-box;
  background: transparent;
  border: none; outline: none;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-primary, #ffffff);
}
.claw-chat__input::placeholder { color: var(--text-faint, #C0C4CC); }

/* 右发送按钮：粉色圆 + 内部图标 12×12 */
.claw-chat__send {
  width: 28px;  height: 28px;  flex: 0 0 28px;
  border-radius: 50%; background: #FF5677;
  border: 1px solid #FF5677; color: var(--text-primary, #FFFFFF);
  display: inline-flex; align-items: center; justify-content: center;
  cursor: pointer; padding: 0;
  box-shadow: 0 2px 6px rgba(255, 86, 119, 0.3);
  transition: background 0.15s ease;
}
.claw-chat__send:hover { background: #FF3A60; }

/* =====================================================================
   🎬 视频反推原有样式（保留）+ 自适应改造
   ===================================================================== */
.tool-grid {
  display: grid;
  /* 自适应三列：左/预览/右都使用流体变量，保证 1440 基准 / 缩放到任意屏都不溢出 */
  grid-template-columns: var(--col-left, 400px) var(--col-preview, 598px) var(--col-tool-right, 320px);
  grid-template-rows: 1fr;
  align-items: stretch;
  justify-content: start;
  gap: 0;
  width: 100%;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
  /* 抵消 Layout.content-scroll padding-left：随变量自适应 */
  margin-left: calc(var(--layout-left-pad, 36px) * -0.8333);
}

.col-left {
  width: var(--col-left, 400px); max-width: var(--col-left, 400px); height: 100%;
  box-sizing: border-box; display: flex; flex-direction: column; gap: 14px;
  min-width: 0; min-height: 0; flex: 0 0 var(--col-left, 400px); overflow: hidden;
  border-right: 1px solid var(--border-base, #E5E6EA);
}
/* 视频反推（通用 tool-grid）：左列相对基准往左移 2px（原 -5px 回调 3px）；局部编辑保持原对齐不动 */
.tool-grid:not(.tool-grid--localedit) > .col-left {
  margin-left: -2px;
}
.col-left__scroll {
  flex: 1 1 auto; min-height: 0;
  overflow-y: auto; overflow-x: hidden;
  display: flex; flex-direction: column; align-items: flex-start;
  padding: 4px clamp(14px, 1.6vw, 22px) 0; gap: 10px;
  box-sizing: border-box;
  scrollbar-width: none; -ms-overflow-style: none;
}
.col-left__scroll::-webkit-scrollbar { width: 0; height: 0; display: none; }
/* 内部模块默认宽度：左列 359 基准 → 流体自适应，窄屏自动 100% */
.col-left__scroll > section,
.col-left__scroll > div {
  width: min(var(--col-inner, 359px), 100%);
  max-width: 100%;
  box-sizing: border-box;
  flex: 0 0 auto;
}

.vrev-head { padding: 4px 0 6px; }
.vrev-head__title { margin: 0; font-size: 20px; font-weight: 700; line-height: 1.3; color: var(--text-primary, #ffffff); }
.vrev-head__desc { margin: 6px 0 0; font-size: 14px; line-height: 1.5; color: var(--text-secondary, #606266); }

.vrev-tabs { display: inline-flex; align-items: center; gap: 0; padding: 0; }
.vrev-tab {
  padding: 0 6px 6px; margin-right: 18px;
  background: transparent; border: none;
  font-size: 14px; line-height: 1.4; color: var(--text-secondary, #606266);
  font-weight: 500; cursor: pointer;
  border-bottom: 2px solid transparent; transition: all 0.15s ease;
}
.vrev-tab.is-active { background: #FE2C55; color: #fff !important; border-color: #FE2C55; }

.vrev-field { display: flex; flex-direction: column; gap: 6px; padding: 6px 0; }
.vrev-field__head {
  display: flex; align-items: center; justify-content: space-between;
  gap: 8px; height: 22px; margin-bottom: 2px;
}
.vrev-field__head--single { justify-content: flex-start; }
.vrev-field__title {
  margin: 0; font-size: 14px; font-weight: 700; line-height: 22px;
  color: var(--text-primary, #ffffff);
  display: inline-flex; align-items: center; gap: 4px;
}
.vrev-field__icon { flex: 0 0 auto; color: #FF5677; }
.vrev-switch-row { display: inline-flex; align-items: center; gap: 8px; height: 22px; }
.vrev-switch-row__label { font-size: 12px; line-height: 16px; color: var(--text-primary, #ffffff); white-space: nowrap; }
.vrev-toggle { position: relative; padding: 0; border: none; border-radius: 999px; background: var(--border-base, #D9DBDE); cursor: pointer; transition: background 0.2s ease; }
.vrev-toggle.is-on { background: #FF5677; }
.vrev-toggle__dot {
  position: absolute; top: 2px; left: 2px;
  width: 12px; height: 12px;
  border-radius: 50%; background: var(--bg-surface, #FFFFFF);
  box-shadow: 0 1px 2px rgba(0,0,0,0.18);
  transition: transform 0.2s ease;
}
.vrev-toggle.is-on .vrev-toggle__dot { transform: translateX(14px); }

.vrev-input {
  background: var(--bg-surface, #FFFFFF);
  border: 1px solid var(--border-base, #E5E6EA);
  border-radius: 4px;
  box-sizing: border-box; padding: 12px 14px;
  display: flex; align-items: center; justify-content: flex-start;
  overflow: hidden; transition: border-color 0.15s ease;
}
.vrev-input:hover { border-color: var(--border-strong, #D0D2D6); }
.vrev-input:focus-within { border-color: #FF5677; }
.vrev-input--upload { background: var(--bg-elevated, #F7F8FA); }
.vrev-input__ctrl {
  width: 100%; height: 100%;
  border: none; background: transparent; outline: none;
  font-size: 13px; line-height: 1.5; color: var(--text-primary, #ffffff);
  padding: 0; box-sizing: border-box;
}
.vrev-input__ctrl::placeholder { color: var(--text-faint, #A8ABB0); }
.vrev-input__upload-placeholder { font-size: 13px; color: var(--text-faint, #A8ABB0); line-height: 1.5; }
.vrev-field__tip {
  margin: 0; font-size: 12px; line-height: 1.5; color: var(--text-secondary, #606266);
  display: inline-flex; align-items: center; gap: 3px;
}
.vrev-tip__icon { color: var(--text-faint, #8B93A0); }

.vrev-select {
  position: relative;
  background: var(--bg-surface, #FFFFFF);
  border: 1px solid var(--border-base, #E5E6EA);
  border-radius: 4px;
  box-sizing: border-box; display: flex; align-items: stretch;
  z-index: 20;
  transition: border-color 0.15s ease;
  /* 自适应：基准 359 → 流体变量 */
  width: var(--col-inner, 359px); max-width: 100%; height: 32px;
}
.vrev-select:hover { border-color: var(--border-strong, #D0D2D6); }
.vrev-select.is-open { border-color: #FF5677; border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
.vrev-select__head {
  flex: 1 1 auto; min-width: 0;
  padding: 0 10px; height: 100%;
  background: transparent; border: none; cursor: pointer;
  display: grid; grid-template-columns: max-content 1fr max-content;
  align-items: center; gap: 8px; box-sizing: border-box;
}
.vrev-select__head-value { font-size: 14px; line-height: 1; font-weight: 700; }
.vrev-select__head-sub { font-size: 13px; line-height: 1; color: var(--text-secondary, #606266); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.vrev-select__arrow { transition: transform 0.2s ease; }
.vrev-select__arrow.is-flip { transform: rotateX(180deg); }
.vrev-select__menu {
  position: absolute; left: -1px; right: -1px; top: 100%;
  list-style: none; margin: 0; padding: 4px 0;
  background: var(--bg-surface, #FFFFFF);
  border: 1px solid #FF5677; border-top: none;
  border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08); box-sizing: border-box; z-index: 30;
}
.vrev-select__option {
  display: grid; grid-template-columns: max-content 1fr; align-items: center;
  gap: 8px; padding: 8px 12px; cursor: pointer; transition: background 0.12s ease;
}
.vrev-select__option:hover { background: #FFF0F3; }
.vrev-select__option.is-selected { background: #FE2C55; color: #fff; }
.vrev-select__opt-label { font-size: 14px; line-height: 1.4; font-weight: 700; color: var(--text-primary, #ffffff); }
.vrev-select__opt-desc { font-size: 13px; line-height: 1.4; color: var(--text-secondary, #606266); text-align: right; justify-self: end; }

.gen-panel {
  width: 100%; flex: 0 0 auto;
  padding: 10px 22px 16px;
  box-sizing: border-box;
  border-top: 1px solid var(--border-base, #E5E6EA);
  background: var(--bg-surface, #FFFFFF);
}
.gen-btn {
  width: 100%; height: 40px; border-radius: 9999px;   /* ⭐ 完全圆角/胶囊形，原 6px 太方 */
  background: #FF5677; color: var(--text-primary, #FFFFFF);
  border: 1px solid #FF5677;
  font-size: 14px; font-weight: 700; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  box-shadow: 0 4px 10px rgba(255, 86, 119, 0.22);
  transition: background 0.15s ease;
}
.gen-btn:hover { background: #FF3A60; }

.vrev-empty-tab {
  width: var(--col-inner, 359px); max-width: 100%;
  padding: 40px 0; text-align: center;
  color: var(--text-secondary, #606266); font-size: 14px;
}

.col-preview {
  width: var(--col-preview, 600px); height: 100%;
  box-sizing: border-box; flex: 0 0 var(--col-preview, 600px);
  min-width: 0; min-height: 0;
  background: var(--bg-surface, #FFFFFF);
  border-right: 1px solid var(--border-base, #E5E6EA);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 18px; padding: 24px; margin-left: -20px;
}
/* 视频反推：中间预览列宽度 598 基准，流体自适应；左移距离等比缩小 */
.tool-grid:not(.tool-grid--localedit) > .col-preview {
  width: var(--col-preview, 598px);
  flex: 0 0 var(--col-preview, 598px);
  max-width: var(--col-preview, 598px);
  margin-left: -18px; /* -20px + 2px：左边向右挪 2px，对应宽度减少的 2px 来源于左侧 */
  border-left: 1px solid var(--border-base, #E5E6EA);
}
.col-preview__cam { flex: 0 0 auto; }
.col-preview__tip {
  margin: 0; text-align: center;
  font-size: 14px; line-height: 1.7;
  color: var(--text-secondary, #606266);
}

.record-panel {
  width: var(--col-tool-right, 320px); max-width: var(--col-tool-right, 320px); height: 100%;
  box-sizing: border-box; flex: 0 0 var(--col-tool-right, 320px);
  min-width: 0; min-height: 0;
  background: var(--bg-surface, #FFFFFF);
  border-left: 1px solid var(--border-base, #E5E6EA);
  margin-left: -20px;
  display: flex; flex-direction: column; gap: 12px;
  padding: 16px clamp(12px, 1.25vw, 18px) 20px; overflow: hidden;
}
.record-panel__head {
  display: flex; align-items: center; justify-content: flex-start;
  width: 100%; gap: 8px; margin: 0; padding: 0; flex: 0 0 auto;
}
.record-panel__head h2 {
  margin: 0; font-size: 18px; font-weight: 700; line-height: 1.4;
  color: var(--text-primary, #ffffff);
  display: inline-flex; align-items: center; gap: 8px;
}
.record-panel__cam { color: var(--text-muted, #606266); }
.record-warn {
  width: 100%; box-sizing: border-box;
  background: var(--bg-warning, #FFF6EC); color: var(--text-warning, #FFA940);
  padding: 10px 12px; border-radius: 4px;
  font-size: 14px; line-height: 1.55;
  display: inline-flex; align-items: flex-start; gap: 8px; flex: 0 0 auto;
}
.record-warn__ico { margin-top: 2px; }
.record-empty {
  flex: 1 1 auto; min-height: 0; width: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; padding: 12px 0; box-sizing: border-box;
}
.record-empty__box { flex: 0 0 auto; }
.record-empty__title { font-size: 14px; font-weight: 700; line-height: 1.4; color: var(--text-primary, #ffffff); }
.record-empty__sub { font-size: 12px; line-height: 1.5; color: var(--text-secondary, #606266); }

/* =====================================================================
   ✏️ 局部编辑（localedit）样式 + 自适应
   ===================================================================== */
/* 局部编辑：两列布局，去除原右列 320，改右列为 1fr，横向可容纳 700 卡片
   宽度自适应跟随 --layout-left-pad 抵消左边缩进与右边 padding */
.tool-grid--localedit {
  grid-template-columns: var(--col-left, 400px) 1fr;
  grid-template-rows: 1fr;
  align-items: stretch;
  justify-content: start;
  gap: 0;
  /* 向左抵消左边缩进 + 吃进右侧 padding-right（全程灰底不露白） */
  width: calc(100% + var(--layout-left-pad, 36px) + calc(var(--layout-left-pad, 36px) * 0.5));
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
  margin-left: calc(var(--layout-left-pad, 36px) * -0.8333);
}
.tool-grid--localedit .col-preview--localedit {
  width: auto; max-width: none; height: 100%;
  box-sizing: border-box; flex: 1 1 auto;
  min-width: 0; min-height: 0;
  display: flex; align-items: center; justify-content: center;
  padding: clamp(12px, 1.8vw, 24px);
  background: var(--bg-elevated, #F5F7FA);
  border-right: none;
  border-left: 1px solid var(--border-base, #E5E6EA);
  margin-left: 0;
}

/* 左列：标题（仍保留 20 加粗 与 14 辅助描述） */
.led-head { padding: 4px 0 6px; box-sizing: border-box; width: 100%; flex: 0 0 auto; }
.led-head__title { margin: 0; font-size: 20px; font-weight: 700; line-height: 1.3; color: var(--text-primary, #ffffff); }
.led-head__desc  { margin: 6px 0 0; font-size: 14px; line-height: 1.5; color: var(--text-secondary, #606266); }

/* 原始图片 / 要替换的图片 通用模块 */
.led-up {
  display: flex; flex-direction: column; gap: 6px;
  width: min(var(--col-inner, 359px), 100%); box-sizing: border-box; flex: 0 0 auto;
  padding: 6px 0;
}
.led-up__head {
  display: inline-flex; align-items: center; gap: 4px; height: 22px;
}
.led-up__ico { flex: 0 0 auto; }
.led-up__title {
  margin: 0; font-size: 14px; font-weight: 700; line-height: 22px;
  color: var(--text-primary, #ffffff);
}
.led-up__box {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background: var(--bg-surface, #FFFFFF);
  border: 1.5px dashed var(--border-base, #C0C4CC);
  border-radius: 6px;
  padding: 12px 14px 16px;
  min-height: 146px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.led-up__hint {
  text-align: center;
  font-size: 14px; font-weight: 500; line-height: 1.55;
  color: var(--text-muted, #606266);
}
.led-up__hint > span {
  display: block;
  font-size: 12px; font-weight: 400; line-height: 1.55;
  color: var(--text-faint, #909399);
  margin-top: 2px;
}
.led-up__plus {
  width: 20px; height: 20px; flex: 0 0 auto;
  font-size: 20px; line-height: 20px; font-weight: 300;
  color: var(--text-faint, #C0C4CC);
  display: inline-flex; align-items: center; justify-content: center;
}
.led-up__btn {
  box-sizing: border-box;
  height: 28px; padding: 0 10px;
  border-radius: 4px;
  background: var(--bg-surface, #FFFFFF); color: var(--text-muted, #606266);
  border: 1px solid var(--border-base, #E5E6EA);
  font-size: 12px; font-weight: 500;
  cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; gap: 4px;
  flex: 0 0 auto;
}

/* 生成按钮标签：本次消耗 ... 积分 */
.gen-btn__tag {
  margin-left: auto;
  background: rgba(255,255,255,0.2);
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px; font-weight: 400;
  line-height: 18px;
}

/* ---------- 通用主按钮（视频反推「开始分析」+ 局部编辑「一键生成」共用，规格和局部编辑图二一致）
   整体 367×40 胶囊，主色 #FE2C55 纯色，魔法棒图标 14×14，主文案 16 号居中 ---------- */
.gen-panel--primary {
  width: 100%; flex: 0 0 auto;
  padding: 10px 0 16px;
  box-sizing: border-box;
  border-top: 1px solid var(--border-base, #E5E6EA);
  background: var(--bg-surface, #FFFFFF);
  display: flex; align-items: center; justify-content: center;
}
.gen-btn--primary {
  width: clamp(280px, 92%, 367px); height: 40px; border-radius: 20px;
  background: #FE2C55; color: var(--text-primary, #FFFFFF);
  border: 1px solid #FE2C55;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  gap: 0;
  padding: 0;
  box-sizing: border-box;
  box-shadow: none;
  transition: none;
}
.gen-btn--primary:hover { background: #FE2C55; }
.gen-btn--primary .gen-btn__wand { flex: 0 0 14px; width:14px; height:14px; margin-right: 10px; }
.gen-btn--primary .gen-btn__main {
  font-size: 16px; font-weight: 700; line-height: 1; color: var(--text-primary, #FFFFFF);
}
/* 局部编辑多了「本次消耗 … 积分」副文案，12 号白字无胶囊，整体仍以 group 居中 */
.gen-btn--primary.gen-btn--primary-with-tag .gen-btn__main { margin-right: 6px; }
.gen-btn--primary .gen-btn__primary-tag {
  margin-left: 0;
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-size: 12px; font-weight: 400;
  line-height: 1;
  color: var(--text-primary, #FFFFFF);
  opacity: 0.92;
}

/* ---------- 引导卡片：700×500 基准，流体自适应 ≤700 宽的容器 ---------- */
.led-card {
  box-sizing: border-box;
  background: var(--bg-surface, #FFFFFF);
  box-shadow: 0 16px 48px rgba(26,28,32,0.08);
  /* 宽高随容器缩放，保证 700:500 比例的卡片在窄屏可用（使用 min + 固定比例关系简化）*/
  width: min(700px, 90%);
  max-width: 100%;
  padding: clamp(14px, 2vw, 28px) clamp(18px, 2.5vw, 36px) clamp(12px, 1.6vw, 24px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: clamp(10px, 1.6vw, 22px);
  flex: 0 0 auto;
}

/* h2 字号 24 */
.led-card__title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--text-primary, #ffffff);
  text-align: center;
  width: 100%;
}
.led-card__title--red { color: #FE2C55; }

/* 三图 + 两箭头：⭐ 用户要求「大屏默认横向排列；只有小屏(≤999.98)才竖向排列」
   - 大屏 (默认)：row 左→右横排，居中，间隙 20px（3 图 480 + 2 箭头 80 + 间隙 4*20=80 → 总 640，ledCard 700px 正好装下）
   - 小屏 (≤999.98 MQ 内覆盖恢复)：column 上→下竖排，配合箭头向下 rotate(90deg)。*/
.led-card__row {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;         /* ⭐ 大屏：横向排列（图1→▶→图2→▶→图3） */
  align-items: center;         /* ⭐ 横向时垂直居中对齐（图 213 + 下方 label 16 + gap 8 = 237；箭头 40 垂直居中） */
  justify-content: center;     /* ⭐ 横向时在 700 卡片里居中，左右留白呼吸感 */
  gap: 20px;                   /* ⭐ 卡片之间/箭头与卡片之间留 20px 空隙（横向视觉密度合适）*/
  flex: 0 0 auto;
  padding: 6px 0 0;
}
.led-card__item {
  display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
  gap: 8px;
  flex: 0 0 auto;
}
.led-card__img {
  position: relative;
  box-sizing: border-box;
  background: var(--bg-elevated, #F5F7FA);
  border: 1px solid var(--border-base, #E5E6EA);
  overflow: hidden;
  flex: 0 0 auto;
  display: block;
}
.led-card__img svg { display: block; width: 100%; height: 100%; }
.led-card__badge {
  position: absolute; right: 8px; bottom: 10px;
  background: #FE2C55; color: var(--text-primary, #FFFFFF);
  font-size: 12px; font-weight: 500;
  border-radius: 16px;
  padding: 2px 10px;
  line-height: 18px;
}
/* 图片下方字体 16 */
.led-card__label {
  margin: 0;
  font-size: 16px; font-weight: 500; line-height: 1.4;
  color: var(--text-primary, #ffffff);
  text-align: center;
}
/* 圆圈箭头图标 40×40：
   ⭐ 大屏(默认)：横向排列时箭头朝右 ▶（原 SVG path 本身就是朝右三角形，直接用，不加 rotate）
   ⭐ 小屏(≤999.98 MQ 覆盖)：纵向排列时箭头向下 ▼，把右箭头顺时针转 90° */
.led-card__arrow {
  flex: 0 0 40px;
  display: inline-flex; align-items: center; justify-content: center;
}
.led-card__arrow svg { display: block; width: 40px; height: 40px; transform: none; }

/* 说明文字：14 号，颜色 #909399 */
.led-card__desc {
  margin: 0;
  font-size: 14px; line-height: 1.55;
  color: var(--text-faint, #909399);
  text-align: center;
  width: 100%;
  flex: 0 0 auto;
}

/* 立即体验按钮 96×40 字号14 圆角6 */
.led-card__btn {
  box-sizing: border-box;
  background: #FE2C55;
  color: var(--text-primary, #FFFFFF);
  border: 1px solid #FE2C55;
  cursor: pointer;
  font-weight: 500;
  display: inline-flex; align-items: center; justify-content: center;
  flex: 0 0 auto;
  margin-top: 2px;
}

/* =====================================================================
   中屏(1000–1280)：三列仍保留，但收紧预览列/记录列内边距 & 按钮微缩
   ===================================================================== */
@media (max-width: 1279.98px) {
  .col-preview { padding: 16px; gap: 14px; }
  .record-panel { padding: 12px 14px 16px; gap: 10px; }
  .col-left__scroll { padding: 4px 16px 0; gap: 8px; }
  .gen-btn { height: 38px; font-size: 14px; }
  .gen-btn--primary { height: 38px; }
  .led-card__title { font-size: 20px; }
}

/* =====================================================================
   窄屏(≤1000)：三列变两列 → 左列 + 预览/记录堆叠；局部编辑保持两列
   ===================================================================== */
@media (max-width: 999.98px) {
  /* ⭐ 窄屏单列堆叠：滚动交给外层 Layout.content-scroll，本页不嵌套滚；
       边距统一由 content-scroll 承担（左右对称 16/12px）。*/
  .tool-page {
    height: auto;
    min-height: auto;
    overflow: visible;
    margin: 0;
    padding: 0;
  }
  .tool-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    height: auto;
    gap: 0;
    margin-left: 0;         /* ⭐ 不再抵消 Layout padding — 内容左右自然对称 */
    width: 100%;
  }
  .tool-grid > .col-left,
  .tool-grid > .col-preview,
  .tool-grid > .record-panel {
    width: 100% !important;
    max-width: 100% !important;
    flex: 1 1 100% !important;
    height: auto;
    margin-left: 0 !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid var(--border-base, #E5E6EA);
  }
  .col-left__scroll {
    padding: 4px 16px 0;
    overflow-y: visible;
    align-items: stretch;
  }
  .col-left__scroll > section,
  .col-left__scroll > div {
    width: 100% !important;
    max-width: 100% !important;
  }
  .record-panel { max-height: 480px; }
  .vrev-select { width: 100%; max-width: 100%; }
  .vrev-empty-tab { width: 100%; max-width: 100%; }
  .gen-btn { width: calc(100% - 30px); margin: 0 15px; height: 44px; }

  /* 局部编辑：保持两列，但列宽收紧 */
  .tool-grid--localedit {
    grid-template-columns: minmax(280px, 360px) 1fr;
    width: 100%;           /* ⭐ 不再 calc(100% + pad) 溢出，保持与外层对称 */
    margin-left: 0;
  }
  .led-card { width: min(100%, 620px); }

  /* 局部编辑引导卡：小屏(≤999.98) 才纵向排列，保持截图里的上→下堆叠 + 箭头向下 */
  .led-card__row {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }
  .led-card__arrow svg { transform: rotate(90deg); }   /* 箭头▶️顺时针90°→▼向下 */
}

/* =====================================================================
   移动端(≤768)：所有列全部单列，按钮贴边 + 手指尺寸友好
   ===================================================================== */
@media (max-width: 767.98px) {
  .tool-grid--localedit {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    height: auto;
  }
  .tool-grid--localedit > .col-left,
  .tool-grid--localedit > .col-preview--localedit {
    width: 100% !important;
    max-width: 100% !important;
    flex: 1 1 100% !important;
    height: auto;
    border-left: none !important;
    border-bottom: 1px solid var(--border-base, #E5E6EA);
  }
  .col-left__scroll { padding: 0; gap: 6px; }
  .gen-btn { width: 100%; margin: 0; height: 46px; font-size: 15px; border-radius: 9999px; }
  .gen-btn--primary { width: 100%; height: 46px; font-size: 15px; border-radius: 9999px; }
  .led-card { width: 100%; padding: 16px; gap: 14px; border-radius: 14px; }
  .led-card__title { font-size: 18px; }
  .led-card__label { font-size: 14px; }
  .record-panel__head h2 { font-size: 16px; }
}
</style>
