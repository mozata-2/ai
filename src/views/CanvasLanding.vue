<template>
  <div class="canvas-landing">
    <!-- 背景：纯黑 + 点阵（整页范围） -->
    <div class="dots-bg" aria-hidden="true"></div>

    <!-- ================================================================ -->
    <!-- ① 顶部导航：左 P logo + 右 3 按钮（耳机圆形 / 人头圆形 / 登录胶囊） -->
    <!--    对比原网站截图：没有中间 nav（首页/工作空间 等已去掉）            -->
    <!-- ================================================================ -->
    <header class="top-bar">
      <div class="top-bar__left">
        <a class="logo" href="#/" aria-label="返回首页">
          <!-- P 字母 logo：圆形 + 蓝紫粉三色渐变 -->
          <svg class="logo__svg" viewBox="0 0 48 48" aria-hidden="true">
            <defs>
              <linearGradient id="pLogoGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stop-color="#1890FF"/>
                <stop offset="55%"  stop-color="#C26CFF"/>
                <stop offset="100%" stop-color="#FE2C55"/>
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="23" fill="url(#pLogoGrad)"/>
            <!-- 小黄色点缀（与截图 P logo 右上角小橙色点一致） -->
            <circle cx="38" cy="10" r="2.6" fill="#FFAA33"/>
            <!-- 蓝色 D 形外环内部留白，加 1px 白色内部描边让 P 更清晰 -->
            <path d="M15 13 L15 35 M15 13 L26.5 13 C31.2 13 34.5 16.8 34.5 21.2 C34.5 25.6 31.2 29.4 26.5 29.4 L15 29.4"
                  fill="none" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

      <div class="top-bar__right">
        <button type="button" class="icon-round" aria-label="耳机客服">
          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M12 3 C7 3 3 7 3 12 L3 18 C3 19.7 4.3 21 6 21 L8 21 L8 12 L6 12 L6 12 C6 8.7 8.7 6 12 6 C15.3 6 18 8.7 18 12 L18 12 L16 12 L16 21 L18 21 C19.7 21 21 19.7 21 18 L21 12 C21 7 17 3 12 3 Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button type="button" class="icon-round" aria-label="账号">
          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 21 C4 16.6 7.6 14 12 14 C16.4 14 20 16.6 20 21" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
        </button>
        <button type="button" class="login-btn" @click="onSoon">
          <span>登录</span>/<span>注册</span>
        </button>
      </div>
    </header>

    <!-- ================================================================ -->
    <!-- ② 第一屏 Hero：红框核心区居中，8 个气泡围绕红框沿椭圆轨道公转          -->
    <!-- ================================================================ -->
    <main class="main">
      <section class="hero">
        <!-- ============ 环绕红框的 8 个气泡：固定在红框外8方位，各自小幅独立漂浮（不进入框内） ============ -->
        <!--   注意：所有 animation 属性写在 <style scoped> 的 .float-slot--xxx 类里，不要用 inline style
             —— 因为 scoped 下 @keyframes heroFloat 名字会被自动加后缀，inline 写法引用名不匹配导致"不动" -->
        <!-- 1 Seedance        — 红框左侧中部偏上 -->
        <div class="float-slot float-slot--seedance">
          <div class="bubble">
            <span class="bubble__dot" style="background: linear-gradient(135deg,#36D399,#05C27A)"></span>
            <span class="bubble__label">Seedance</span>
          </div>
        </div>
        <!-- 2 🍌 Nano Banana  — 红框正左侧（描述文字左边） -->
        <div class="float-slot float-slot--banana-nano">
          <div class="bubble tab-bubble">
            <span class="bubble__dot" style="background: linear-gradient(135deg,#FFA94D,#FF922B)"></span>
            <span class="bubble__label">🍌 Nano Banana</span>
          </div>
        </div>
        <!-- 3 豆包            — 红框左下方（Tab 行左侧） -->
        <div class="float-slot float-slot--doubao">
          <div class="bubble tab-bubble">
            <span class="bubble__dot" style="background: linear-gradient(135deg,#9061F9,#4C6FFF)"></span>
            <span class="bubble__label">豆包</span>
          </div>
        </div>
        <!-- 4 Nano Banana Pro — 红框左下更外侧 -->
        <div class="float-slot float-slot--banana-pro">
          <div class="bubble">
            <span class="bubble__dot" style="background: linear-gradient(135deg,#FFD447,#FFB200)"></span>
            <span class="bubble__label">Nano Banana Pro</span>
          </div>
        </div>
        <!-- 5 Qwen            — 红框底部正中（Tab 行正下方、CTA 行上方） -->
        <div class="float-slot float-slot--qwen">
          <div class="bubble">
            <span class="bubble__dot" style="background: linear-gradient(135deg,#FF6B8A,#3CC6FF)"></span>
            <span class="bubble__label">Qwen</span>
          </div>
        </div>
        <!-- 6 Grok            — 红框底部右下（"开始创作"按钮右下侧） -->
        <div class="float-slot float-slot--grok">
          <div class="bubble">
            <span class="bubble__dot" style="background: linear-gradient(135deg,#8A5CF7,#6C3BFF)"></span>
            <span class="bubble__label">Grok</span>
          </div>
        </div>
        <!-- 7 Sora            — 红框右下外 -->
        <div class="float-slot float-slot--sora">
          <div class="bubble">
            <span class="bubble__dot" style="background: linear-gradient(135deg,#FF7D56,#FF4C1F)"></span>
            <span class="bubble__label">Sora</span>
          </div>
        </div>
        <!-- 8 Gemini          — 红框右侧中部 -->
        <div class="float-slot float-slot--gemini">
          <div class="bubble">
            <span class="bubble__dot" style="background: linear-gradient(135deg,#5183FA,#1F5BFF)"></span>
            <span class="bubble__label">Gemini</span>
          </div>
        </div>

        <!-- ============ 红框核心区（用户截图的红色框） ============ -->
        <div class="hero-core">
          <!-- 顶部小徽标胶囊 -->
          <div class="hero-badge">
            <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M3 7 L21 7 L21 20 L3 20 Z M8 7 L8 4 L16 4 L16 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>面向图文视频创作的 AI 节点画布</span>
          </div>

          <!-- 主标题（两行） -->
          <section class="hero-stage">
            <h1 class="hero-title">
              <span class="hero-title__line1">把创意流程</span>
              <span class="hero-title__line2">连成一张画布</span>
            </h1>
          </section>

          <!-- 描述 -->
          <p class="hero-desc">
            用节点连接提示词、参考图、模型和生成结果，适合海报、电商图、人物图、短视频素材的连续创作与二次修改。
          </p>
          <p class="hero-desc hero-desc--sub">
            每一次生成都有上下文，每一个结果都能继续成为下一步输入。
          </p>

          <!-- 3 段 Tab（两侧的气泡已经作为 orbit 环绕，不再在这里内联） -->
          <nav class="tab-row" role="tablist" aria-label="画布模块分类">
            <button type="button" class="tab-pill tab-pill--active" role="tab" aria-selected="true">
              <span class="tab-pill__dot">🟢</span>
              <span>节点工作流</span>
            </button>
            <button type="button" class="tab-pill" role="tab" aria-selected="false">
              <span class="tab-pill__dot">🟣</span>
              <span>图片生成与编辑</span>
            </button>
            <button type="button" class="tab-pill" role="tab" aria-selected="false">
              <span class="tab-pill__dot">🎥</span>
              <span>图生视频</span>
            </button>
          </nav>
        </div>

        <!-- 底部双按钮（在红框下方，不参与环绕） -->
        <div class="cta-row">
          <button type="button" class="cta-btn cta-btn--primary" @click="onStartCreate">
            <span>开始创作</span>
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M9 6 L15 12 L9 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button type="button" class="cta-btn cta-btn--ghost" @click="onOpenBlank('/#/canvas')">
            <span>查看画布</span>
          </button>
        </div>
      </section>

      <!-- ================================================================ -->
      <!-- ③ 第二屏：节点画布核心能力（2x2，4 张特性卡）                        -->
      <!--    截图顺序：左上 多模态接入 / 右上 图片生成 / 左下 视频链路 / 右下 素材库 -->
      <!-- ================================================================ -->
      <section class="features">
        <h2 class="features__title">节点画布核心能力</h2>

        <div class="features__grid">
          <article class="feature-card">
            <div class="feature-card__icon" style="background: linear-gradient(135deg,#5B8CFF,#3552D9);">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 4 L18 4 L18 10 L15 13 L9 13 L6 10 Z M6 10 L6 20 L18 20 L18 10" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 17 L15 14 M12 17 L12 14 M9 17 L9 14" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/></svg>
            </div>
            <h3 class="feature-card__title">多模态 AI 模型接入</h3>
            <p class="feature-card__desc">
              整合文生图、图生图、图生视频、图生音频等多种模型，在同一张画布中串联使用，无需在多个工具间反复跳转。
            </p>
          </article>

          <article class="feature-card">
            <div class="feature-card__icon" style="background: linear-gradient(135deg,#7B61FF,#5037D6);">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M3 5 L21 5 L21 19 L3 19 Z" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linejoin="round"/><circle cx="8.5" cy="10.5" r="1.8" fill="#FFFFFF"/><path d="M4 18 L9 13 L13 17 L16 14 L20 18" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <h3 class="feature-card__title">图片生成与改图</h3>
            <p class="feature-card__desc">
              支持文生图、图生图、图片反推、局部标注等流程，适合做海报、电商图、角色图和连续改稿。
            </p>
          </article>

          <article class="feature-card">
            <div class="feature-card__icon" style="background: linear-gradient(135deg,#36D399,#06B27A);">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 5 L16 5 L20 9 L20 19 L4 19 Z" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 10 L16 13 L10 16 Z" fill="#FFFFFF"/></svg>
            </div>
            <h3 class="feature-card__title">视频生成链路</h3>
            <p class="feature-card__desc">
              图片可以继续接入图生视频节点，保留上游素材关系，生成过程和结果不会散落在多个页面。
            </p>
          </article>

          <article class="feature-card">
            <div class="feature-card__icon" style="background: linear-gradient(135deg,#FF8A65,#F4511E);">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 7 L20 7 L20 20 L4 20 Z" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 4 L15 4 L15 7 L9 7 Z" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linejoin="round"/><circle cx="8.5" cy="13.5" r="1.3" fill="#FFFFFF"/><circle cx="15.5" cy="13.5" r="1.3" fill="#FFFFFF"/><path d="M8.5 16.5 L15.5 16.5" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"/></svg>
            </div>
            <h3 class="feature-card__title">素材库与附件选择</h3>
            <p class="feature-card__desc">
              用户上传、AI 生成、其他素材统一管理，节点里可以直接选择图片、二维码、参考图和历史生成结果。
            </p>
          </article>
        </div>
      </section>

      <!-- ================================================================ -->
      <!-- ④ 第三屏：画布工作流（左：01/02/03 三步；右：画布示意大矩形）         -->
      <!-- ================================================================ -->
      <section class="workflow">
        <h2 class="workflow__title">画布工作流</h2>
        <p class="workflow__subtitle">三步从构思到成品，节点之间自由衔接、随时回头修改</p>

        <div class="workflow__row">
          <!-- 左：三步 -->
          <div class="workflow__steps" aria-label="工作流程 3 步">
            <div class="step">
              <div class="step__num">01</div>
              <div class="step__icon" style="background: linear-gradient(135deg,#5B8CFF,#3552D9);">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 7 L14 7 L14 14 L7 14 Z M14 10 L20 10 L20 20 L10 20 L10 14" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linejoin="round"/></svg>
              </div>
              <div class="step__body">
                <h3 class="step__title">构思链路</h3>
                <p class="step__desc">连接节点描述创意流程</p>
              </div>
            </div>

            <div class="step">
              <div class="step__num">02</div>
              <div class="step__icon" style="background: linear-gradient(135deg,#A855F7,#7C3AED);">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 2 L15 8.5 L22 9.3 L17 14 L18.2 21 L12 17.8 L5.8 21 L7 14 L2 9.3 L9 8.5 Z" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linejoin="round"/></svg>
              </div>
              <div class="step__body">
                <h3 class="step__title">生成素材</h3>
                <p class="step__desc">连接图片或视频模型得到候选结果</p>
              </div>
            </div>

            <div class="step">
              <div class="step__num">03</div>
              <div class="step__icon" style="background: linear-gradient(135deg,#22C55E,#15803D);">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 12 L10 17 L19 7" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div class="step__body">
                <h3 class="step__title">继续编辑</h3>
                <p class="step__desc">选择结果继续改图、标注或派生版本</p>
              </div>
            </div>
          </div>

          <!-- 右：画布示意（一个带内阴影 + 渐变点阵的深色矩形） -->
          <div class="workflow__canvas" aria-hidden="true">
            <div class="workflow__canvas-dots"></div>
            <!-- 示意节点 1 → 轻微漂浮（不参与 Hero 环绕轨道） -->
            <div class="wf-node wf-node--a wf-float wf-float--a">
              <span class="wf-node__dot" style="background: linear-gradient(135deg,#FF6B8A,#3CC6FF)"></span>
              <div>
                <div class="wf-node__title">提示词生成器</div>
                <div class="wf-node__tag">Qwen · 文本</div>
              </div>
            </div>
            <!-- 连线 -->
            <div class="wf-line wf-line--1"></div>
            <!-- 示意节点 2 → 轻微漂浮（相位错开） -->
            <div class="wf-node wf-node--b wf-float wf-float--b">
              <span class="wf-node__dot" style="background: linear-gradient(135deg,#FFD447,#FF922B)"></span>
              <div>
                <div class="wf-node__title">Nano Banana Pro</div>
                <div class="wf-node__tag">图像 · 2K</div>
              </div>
            </div>
            <!-- 连线 -->
            <div class="wf-line wf-line--2"></div>
            <!-- 示意节点 3 → 轻微漂浮（相位再错开） -->
            <div class="wf-node wf-node--c wf-float wf-float--c">
              <span class="wf-node__dot" style="background: linear-gradient(135deg,#FF7D56,#FF4C1F)"></span>
              <div>
                <div class="wf-node__title">Sora 图生视频</div>
                <div class="wf-node__tag">视频 · 720p · 10s</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ================================================================ -->
    <!-- ⑤ Footer：左下 P logo + 右下 版权 / ICP                            -->
    <!-- ================================================================ -->
    <footer class="footer">
      <a class="footer__logo" href="#/" aria-label="返回首页">
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <defs>
            <linearGradient id="pFootGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stop-color="#1890FF"/>
              <stop offset="55%"  stop-color="#C26CFF"/>
              <stop offset="100%" stop-color="#FE2C55"/>
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="19" fill="url(#pFootGrad)"/>
          <circle cx="32.2" cy="8.4" r="2.1" fill="#FFAA33"/>
          <path d="M12.5 10.8 L12.5 29.2 M12.5 10.8 L22.1 10.8 C26 10.8 28.8 14 28.8 17.7 C28.8 21.4 26 24.6 22.1 24.6 L12.5 24.6"
                fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <div class="footer__texts">
        <div class="footer__copy">© 2018 朋探全域AI All Rights Reserved</div>
        <div class="footer__icp">蜀ICP备19036796号-2</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

/* 全局 style.css 中 html/body/#app 默认为 overflow:hidden（主App禁滚）。
   画布营销页是独立长页面（Hero + 4卡片 + 工作流 + Footer），需要在进入时临时解禁纵向滚动，离开时恢复。 */
const SCROLL_CLASS = 'allow-scroll-canvas'
onMounted(() => {
  const htmlEl = document.documentElement
  const bodyEl = document.body
  htmlEl.classList.add(SCROLL_CLASS)
  bodyEl.classList.add(SCROLL_CLASS)
})
onUnmounted(() => {
  const htmlEl = document.documentElement
  const bodyEl = document.body
  htmlEl.classList.remove(SCROLL_CLASS)
  bodyEl.classList.remove(SCROLL_CLASS)
})

function onOpenBlank(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}
function onSoon() {
  // 占位：登录/注册暂未实现
}
function onStartCreate() {
  // 开始创作 → 新标签页打开图片生成 · Banana 作图
  window.open('/#/image?tool=banana', '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
/* ================================================================
   气泡漂浮（不进入红框）—— 用户要求：不进框、初始不叠加、围绕框即可
   方案：8 个气泡固定定位于红框（hero-core）周围 8 个不同方位，
   每个气泡各自做小幅度椭圆漂浮（X ±32px, Y ±18px），
   周期 9~15s 随机 + 半数 reverse，避免同步感；全程不会进入红框。
   ================================================================ */
@keyframes heroFloat {
  0%    { transform: translate( 32px,   0px); }
  12.5% { transform: translate( 22px, -12px); }
  25%   { transform: translate(  0px, -18px); }
  37.5% { transform: translate(-22px, -12px); }
  50%   { transform: translate(-32px,   0px); }
  62.5% { transform: translate(-22px,  12px); }
  75%   { transform: translate(  0px,  18px); }
  87.5% { transform: translate( 22px,  12px); }
  100%  { transform: translate( 32px,   0px); }
}

/* 每个气泡定位槽：absolute 放在 hero 里的不同百分比位置 → 围绕红框周围 8 方位 */
.float-slot {
  position: absolute;
  z-index: 4;
  will-change: transform;
  pointer-events: none;
  /* 注意：animation（name/duration/delay/direction）写在下方 .float-slot--xxx 具体类里，
     不要用 inline style —— scoped CSS 会自动给 @keyframes 加 data-v后缀，inline引用名会不匹配 */
}
.float-slot .bubble { pointer-events: auto; }

/* —— 8 个方位 + 独立动画（全部写在 scoped CSS 类里，避免 inline 与 scoped keyframes 名不匹配） —— */
/*  动画简写格式：animation: name duration timing delay iteration-count direction; */

/* ① Seedance — 红框左侧中部偏上，顺向 */
.float-slot--seedance {
  left:  8%; top: 43%;
  animation: heroFloat 11s   ease-in-out 0.0s infinite normal;
}
/* ② 🍌 Nano Banana — 红框正左侧（描述文字左边），逆向 */
.float-slot--banana-nano {
  left: 10%; top: 52%;
  animation: heroFloat 13s   ease-in-out 1.2s infinite reverse;
}
/* ③ 豆包 — 红框左下方（Tab 行左侧），顺向 */
.float-slot--doubao {
  left: 24%; top: 67%;
  animation: heroFloat  9s   ease-in-out 3.8s infinite normal;
}
/* ④ Nano Banana Pro — 红框左下更外侧，逆向 */
.float-slot--banana-pro {
  left: 15%; top: 73%;
  animation: heroFloat 14s   ease-in-out 5.1s infinite reverse;
}
/* ⑤ Qwen — 红框底部正中（Tab 行正下方、CTA 行上方），顺向 */
.float-slot--qwen {
  left: 37%; top: 81%;
  animation: heroFloat 10s   ease-in-out 7.4s infinite normal;
}
/* ⑥ Grok — 红框底部右下（"开始创作"按钮右下侧），逆向 */
.float-slot--grok {
  left: 49%; top: 93%;
  animation: heroFloat 12s   ease-in-out 2.0s infinite reverse;
}
/* ⑦ Sora — 红框右下外，顺向 */
.float-slot--sora {
  left: 73%; top: 92%;
  animation: heroFloat 15s   ease-in-out 6.2s infinite normal;
}
/* ⑧ Gemini — 红框右侧中部，逆向 */
.float-slot--gemini {
  left: 86%; top: 69%;
  animation: heroFloat 12.5s ease-in-out 4.6s infinite reverse;
}

/* ================================================================
   全局容器：纯黑 #0A0A0B，允许纵向滚动（营销页，不遵循主 app 禁滚规则）
   ================================================================ */
.canvas-landing {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #0A0A0B;
  color: #FFFFFF;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}

/* 点阵背景：整页范围；中间椭圆遮罩淡出（只在中部明显） */
.dots-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: radial-gradient(rgba(255,255,255,0.18) 1.2px, transparent 1.2px);
  background-size: 24px 24px;
  background-position: 0 0;
  opacity: 0.55;
  mask-image: radial-gradient(ellipse at 50% 28%, #000 30%, transparent 72%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 28%, #000 30%, transparent 72%);
}

/* ================================================================
   顶部导航
   ================================================================ */
.top-bar {
  position: sticky;
  top: 0;
  z-index: 30;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 14px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background: linear-gradient(to bottom, rgba(10,10,11,0.85), rgba(10,10,11,0.55));
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.top-bar__left  { display: inline-flex; align-items: center; }
.top-bar__right { display: inline-flex; align-items: center; gap: 10px; }

/* P Logo：和截图右上角小橙点一致 */
.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.logo__svg { width: 40px; height: 40px; display: block; }

/* 圆形 icon 按钮：耳机 / 人头 */
.icon-round {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  color: #FFFFFF;
  border: 1px solid rgba(255,255,255,0.10);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 160ms ease, border-color 160ms ease;
}
.icon-round:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.18); }

/* 登录胶囊按钮 */
.login-btn {
  height: 38px;
  padding: 0 16px;
  border-radius: 999px;
  background: transparent;
  color: #FFFFFF;
  border: 1px solid rgba(255,255,255,0.18);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  transition: background-color 160ms ease, border-color 160ms ease;
}
.login-btn:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.26); }

/* ================================================================
   主内容区（ Hero + Features + Workflow 三屏都在 main 里居中 ）
   ================================================================ */
.main {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 42px 24px 0;
  box-sizing: border-box;
}

/* ---------------- Hero ---------------- */
.hero {
  position: relative;   /* ⭐ 给 8 个 .float-slot 气泡提供定位父级（围绕红框固定位置） */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 0 88px;   /* 上下留白，容纳底部/顶部气泡漂浮范围 */
  min-height: 780px;
}

/* 红框核心区（用户截图红框：徽标 + 标题 + 描述 + 3 Tab） */
.hero-core {
  position: relative;
  z-index: 3;         /* 低于环绕气泡（z=4），保证气泡不会被文字盖住 */
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 12px 20px 0;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.82);
  font-size: 12px;
  line-height: 1;
  margin-bottom: 28px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

/* 舞台：不再需要为左右留 padding（气泡以 hero 为父 absolute） */
.hero-stage {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
  margin-bottom: 28px;
}
.hero-title {
  margin: 0;
  text-align: center;
  font-size: 64px;
  line-height: 1.16;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-shadow: 0 6px 40px rgba(0,0,0,0.45);
}
.hero-title__line1, .hero-title__line2 { display: block; }

/* 模型气泡：相对定位 + translate(-50%,-50%) → 气泡中心对齐 .float-slot 的定位锚点（left/top 百分比点） */
.bubble {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px 7px 10px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 999px;
  color: #FFFFFF;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  user-select: none;
  transform: translate(-50%, -50%);   /* ⭐ 气泡中心对齐轨道上的数学点 */
  white-space: nowrap;
}
.bubble__dot {
  width: 16px; height: 16px; border-radius: 4px; flex: 0 0 auto;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.12) inset;
}
.bubble__label {
  font-size: 12.5px; line-height: 1; font-weight: 500;
  color: rgba(255,255,255,0.95); white-space: nowrap;
}
/* 气泡箭头已移除：公转过程中气泡会从左飞到右，固定方向箭头方向错误 */

/* 描述 */
.hero-desc {
  margin: 0;
  max-width: 780px;
  text-align: center;
  color: rgba(255,255,255,0.62);
  font-size: 14px;
  line-height: 1.85;
  font-weight: 400;
}
.hero-desc--sub { margin-top: 8px; color: rgba(255,255,255,0.48); font-size: 13px; }

/* Tab 胶囊行 */
.tab-row {
  position: relative;
  margin: 42px 0 52px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
}
.tab-pill {
  appearance: none; -webkit-appearance: none;
  display: inline-flex; align-items: center; gap: 7px;
  padding: 9px 20px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.88);
  font-size: 13px; line-height: 1; font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: background-color 160ms ease, border-color 160ms ease;
}
.tab-pill:hover { background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,0.18); }
.tab-pill__dot { font-size: 13px; line-height: 1; }
.tab-pill--active {
  background: #FE2C55;
  color: #fff;
  border-color: #FE2C55;
}
/* 紧凑气泡（原 Tab 两侧豆包 / 🍌 Nano Banana）：padding 略小于普通气泡，其余继承 .bubble */
.tab-bubble {
  padding: 6px 12px 6px 8px;
}

/* CTA 双按钮 */
.cta-row { display: inline-flex; align-items: center; gap: 14px; }
.cta-btn {
  appearance: none; -webkit-appearance: none;
  height: 42px; padding: 0 22px;
  border-radius: 10px;
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 14px; font-weight: 600;
  cursor: pointer;
  transition: background-color 160ms ease, border-color 160ms ease, filter 160ms ease;
  user-select: none;
}
.cta-btn--primary {
  background: #FFFFFF; color: #0D0D0F;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 10px 30px rgba(255,255,255,0.14);
}
.cta-btn--primary:hover { filter: brightness(1.02); }
.cta-btn--ghost {
  background: rgba(255,255,255,0.08); color: #FFFFFF;
  border: 1px solid rgba(255,255,255,0.14);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.cta-btn--ghost:hover { background: rgba(255,255,255,0.12); }

/* ---------------- 第二屏：核心能力 4 卡片 ---------------- */
.features {
  padding: 36px 0 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.features__title {
  margin: 0 0 32px;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -0.3px;
}
.features__grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
.feature-card {
  position: relative;
  padding: 26px 28px 26px 28px;
  border-radius: 18px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: background-color 180ms ease, border-color 180ms ease, transform 160ms ease;
  box-sizing: border-box;
  min-height: 172px;
}
.feature-card:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.14);
  transform: translateY(-2px);
}
.feature-card__icon {
  width: 46px; height: 46px;
  border-radius: 12px;
  display: inline-flex; align-items: center; justify-content: center;
  margin-bottom: 14px;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.10) inset, 0 8px 18px rgba(0,0,0,0.25);
}
.feature-card__title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
  letter-spacing: -0.1px;
}
.feature-card__desc {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.8;
  color: rgba(255,255,255,0.62);
  max-width: 520px;
}

/* ---------------- 第三屏：画布工作流（左 3 步 + 右画布示意） ---------------- */
.workflow {
  padding: 10px 0 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.workflow__title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -0.3px;
}
.workflow__subtitle {
  margin: 12px 0 36px;
  font-size: 14px;
  color: rgba(255,255,255,0.52);
}
.workflow__row {
  width: 100%;
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 28px;
  align-items: stretch;
}
/* 三步：左列 */
.workflow__steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 4px 4px;
  box-sizing: border-box;
}
.step {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  transition: background-color 180ms ease, border-color 180ms ease;
}
.step:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.14); }
.step__num {
  position: absolute;
  top: 16px; right: 18px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.32);
  letter-spacing: 1px;
}
.step__icon {
  width: 42px; height: 42px;
  border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  flex: 0 0 auto;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.10) inset;
}
.step__body { min-width: 0; }
.step__title {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
}
.step__desc {
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.58);
}
/* 右：画布示意 */
.workflow__canvas {
  position: relative;
  border-radius: 18px;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(142, 99, 255, 0.14), transparent 55%),
    radial-gradient(ellipse at 80% 80%, rgba(255, 99, 132, 0.12), transparent 55%),
    rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  min-height: 360px;
  overflow: hidden;
  box-sizing: border-box;
}
.workflow__canvas-dots {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px);
  background-size: 18px 18px;
  opacity: 0.6;
  mask-image: radial-gradient(ellipse at 50% 50%, #000 55%, transparent 90%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, #000 55%, transparent 90%);
}
/* 示意节点卡片 + 连线 */
.wf-node {
  position: absolute;
  display: inline-flex; align-items: center; gap: 10px;
  padding: 10px 14px 10px 10px;
  border-radius: 12px;
  background: rgba(16,17,22,0.9);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 10px 24px rgba(0,0,0,0.35);
}

/* 工作流节点漂浮动画（独立小幅度，不参与 Hero 轨道公转） */
@keyframes wfFloatA {
  0%,100% { transform: translate(0, 0); }
  50%     { transform: translate(-2px, -5px); }
}
@keyframes wfFloatB {
  0%,100% { transform: translate(0, 0); }
  50%     { transform: translate(3px, -4px); }
}
@keyframes wfFloatC {
  0%,100% { transform: translate(0, 0); }
  50%     { transform: translate(-3px, -6px); }
}
.wf-float { will-change: transform; }
.wf-float--a { animation: wfFloatA 7.0s ease-in-out infinite; animation-delay: 0.0s; }
.wf-float--b { animation: wfFloatB 7.8s ease-in-out infinite; animation-delay: 1.4s; }
.wf-float--c { animation: wfFloatC 8.6s ease-in-out infinite; animation-delay: 2.6s; }
.wf-node__dot {
  width: 22px; height: 22px; border-radius: 6px; flex: 0 0 auto;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.14) inset;
}
.wf-node__title { font-size: 13px; font-weight: 600; color: #FFFFFF; }
.wf-node__tag { font-size: 11px; color: rgba(255,255,255,0.52); margin-top: 2px; }

.wf-node--a { top: 14%;  left: 8%; }
.wf-node--b { top: 44%;  left: 38%; }
.wf-node--c { top: 74%;  left: 68%; }

/* 连线：倾斜带箭头的线条（两个节点之间） */
.wf-line {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, rgba(255,255,255,0.40), rgba(255,255,255,0.08));
  transform-origin: left center;
  border-radius: 2px;
  pointer-events: none;
}
.wf-line::after {
  content: '';
  position: absolute;
  right: -1px; top: 50%;
  width: 0; height: 0;
  transform: translateY(-50%);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 6px solid rgba(255,255,255,0.40);
}
.wf-line--1 {
  top: 32%; left: 21%;
  width: 220px;
  transform: rotate(22deg);
}
.wf-line--2 {
  top: 62%; left: 50%;
  width: 210px;
  transform: rotate(20deg);
}

/* ================================================================
   Footer
   ================================================================ */
.footer {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px 24px 36px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.footer__logo { width: 36px; height: 36px; display: inline-flex; }
.footer__logo svg { width: 36px; height: 36px; display: block; }
.footer__texts { text-align: right; }
.footer__copy {
  font-size: 12.5px;
  color: rgba(255,255,255,0.50);
  line-height: 1.6;
}
.footer__icp {
  font-size: 12px;
  color: rgba(255,255,255,0.36);
  margin-top: 4px;
  line-height: 1.6;
}

/* ================================================================
   响应式：中屏与小屏自动收窄
   ================================================================ */
@media (max-width: 1100px) {
  .hero-stage { padding: 0 80px; }
  .hero-title { font-size: 48px; }
  .features__grid { grid-template-columns: 1fr; }
  .workflow__row { grid-template-columns: 1fr; }
}
@media (max-width: 780px) {
  .top-bar { padding: 12px 16px; }
  .hero { padding: 16px 0 52px; }
  .hero-stage { padding: 0; }
  .hero-title { font-size: 36px; }
  .float-slot, .bubble, .tab-bubble { display: none; }
  .tab-row { flex-wrap: wrap; justify-content: center; }
  .cta-row { flex-wrap: wrap; justify-content: center; }
  .features__title, .workflow__title { font-size: 22px; }
  .footer { flex-direction: column; align-items: flex-start; gap: 14px; }
  .footer__texts { text-align: left; }
}
</style>
