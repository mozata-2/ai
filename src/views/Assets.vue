<template>
  <div class="assets-page">

    <!-- ① 顶部小字说明 -->
    <div class="page-header">管理您上传和AI生成的所有图片资产</div>

    <!-- 主体两栏：左（图片分组） / 右（工具栏+空状态） -->
    <div class="page-body">

      <!-- ============================================================
           左栏：图片分组（严格对齐用户参考截图）
           - 无外层卡片：与整页底色融合
           - 标题 24px/700/白 "图片分组"
           - 列表：GroupFolderItem 独立组件（单个分组项抽离）
           - 底部：粉色 100% 宽 58px 高 0 圆角 大按钮：+ 创建分组
           ============================================================ -->
      <aside class="group-panel">

        <h2 class="group-panel__title">图片分组</h2>

        <!-- 列表：单个项 → 使用独立组件 GroupFolderItem.vue -->
         <div class="group-list-container">
        <ul class="group-list">
          <GroupFolderItem
            v-for="g in groups"
            :key="g.id"
            :name="g.name"
            :count="g.count"
            :active="activeGroup === g.id"
            @click="activeGroup = g.id"
          />
        </ul>
      </div>
        <!-- 弹性占位：列表短 → 按钮推到底部 -->
        <div class="group-panel__spacer"></div>

        <!-- 底部满宽大粉色矩形按钮（0圆角，"+创建分组"） -->
        <button type="button" class="create-group-btn" @click="openCreateGroup">
          <span class="create-group-btn__plus">+</span>
          <span>创建分组</span>
        </button>
      </aside>

      <!-- ============================================================
           右栏：工具栏 + 空状态
           ============================================================ -->
      <section class="content-panel">

        <!-- 工具栏：
             宽屏（>770px）：一行 —— 左 Tab | 右 工具按钮
             窄屏（≤770px）：三行 —— ① 分组下拉（取代左栏）② 两组 Tab 并排 ③ 按钮行(批量管理/刷新/创建分组) -->
        <div class="toolbar">

          <!-- ========== 行 A：分组下拉（窄屏显示，宽屏隐藏）替代左栏 group-panel ========== -->
          <div class="group-select-wrap">
            <el-select
              v-model="activeGroup"
              class="group-select"
              placeholder="请选择分组"
            >
              <el-option
                v-for="g in groups"
                :key="g.id"
                :value="g.id"
                :label="g.name"
              />
            </el-select>
          </div>

          <!-- ========== 行 B：两组筛选 Tab（宽/窄屏均显示） ========== -->
          <div class="filter-tabs">
            <!-- Tab 组 1：来源（用户上传 / AI生成）二选一 -->
            <el-radio-group
              v-model="activeSource"
              size="default"
              class="source-tabs"
            >
              <el-radio-button value="upload" label="upload">用户上传</el-radio-button>
              <el-radio-button value="ai" label="ai">AI生成</el-radio-button>
            </el-radio-group>

            <!-- Tab 组 2：类型（图片 / 音乐 / 视频）三选一 -->
            <el-radio-group
              v-model="activeType"
              size="default"
              class="type-tabs"
            >
              <el-radio-button value="image" label="image">
                <svg class="tab-svg-icon" viewBox="0 0 16 16" aria-hidden="true">
                  <rect x="1.5" y="2.5" width="13" height="11" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="5.2" cy="6" r="1.2" fill="currentColor"/>
                  <path d="M2 12 L6 8 L9 11 L12 7 L14 9.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
                图片
              </el-radio-button>
              <el-radio-button value="music" label="music">
                <svg class="tab-svg-icon" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M11 2.5v7.8a3 3 0 1 1-1.6-2.7V4.7L6 5.7v4.6a3 3 0 1 1-1.6-2.7V3.8a1 1 0 0 1 .8-1l5.8-1.4a1 1 0 0 1 1.2.8z" fill="currentColor"/>
                </svg>
                音乐
              </el-radio-button>
              <el-radio-button value="video" label="video">
                <svg class="tab-svg-icon" viewBox="0 0 16 16" aria-hidden="true">
                  <rect x="1.5" y="3" width="10.5" height="10" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M11.6 6.7 14.5 5v6l-2.9-1.5v-2.8z" fill="currentColor"/>
                </svg>
                视频
              </el-radio-button>
            </el-radio-group>
          </div>

          <!-- ========== 行 C：工具按钮（窄屏创建分组也移到这里） ==========
               · 非批量模式：[ 批量管理(粉) ] [ 刷新 ] [ 创建分组 ]
               · 批量模式：   [ 已选择 N 张图片 ] [ 取消(深色描边) ] [ 创建分组 ]   ← 刷新按钮隐藏，原批量管理位置换成计数+取消  -->
          <div class="tool-actions">
            <!-- ========= 非批量模式：粉色「批量管理」+ 刷新 ========= -->
            <template v-if="!isBatchMode">
              <el-button type="primary" class="batch-btn" @click="toggleBatchMode">
                <svg class="btn-inline-icon" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M1.5 4.5A1.5 1.5 0 0 1 3 3h3.2l1.4 1.5H13a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 13 13.5H3A1.5 1.5 0 0 1 1.5 12v-7.5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
                </svg>
                批量管理
              </el-button>
              <el-button class="refresh-btn">
                <svg class="refresh-icon" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M2.6 8a5.4 5.4 0 1 1 1.6 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M2.6 5.4v-2.8H5.4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13.4 8a5.4 5.4 0 1 1-1.6-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M13.4 10.6v2.8H10.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                刷新
              </el-button>
            </template>

            <!-- ========= 批量模式：「已选择 N 张图片」 + 取消（对齐截图右上角红框位置内的元素） ========= -->
            <template v-else>
              <div class="batch-count-box">
                <span class="batch-count-box__label">已选择</span>
                <span class="batch-count-box__num">{{ selectedCount }}</span>
                <span class="batch-count-box__label">张图片</span>
              </div>
              <button type="button" class="cancel-btn" @click="toggleBatchMode">取消</button>
            </template>

            <!-- 创建分组：两种模式下都保留在最右 -->
            <button type="button" class="create-group-btn create-group-btn--inline" @click="openCreateGroup">
              <span class="create-group-btn__plus">+</span>
              <span>创建分组</span>
            </button>
          </div>
        </div>

        <!-- 主内容区：空状态（棕色锁 + 请先登录） -->
        <div class="assets-main">
          <div class="empty-state">
            <div class="empty-state__lock" aria-hidden="true">
              <svg class="lock-svg" viewBox="0 0 64 64">
                <rect x="10" y="28" width="44" height="30" rx="4" fill="#7a5c2d" opacity="0.92"/>
                <path d="M20 30v-6a12 12 0 1 1 24 0v6" fill="none" stroke="#2a2a2a" stroke-width="3.5" stroke-linejoin="round"/>
                <circle cx="32" cy="44" r="4" fill="#2a2a2a"/>
                <path d="M32 48v4" stroke="#2a2a2a" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="empty-state__title">请先登录</div>
            <div class="empty-state__subtitle">登录后可以查看和管理您的资产</div>
            <el-button type="primary" class="empty-state__login" @click="onLogin">立即登录</el-button>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- ======== 创建分组弹框：450 × 170.5 ======== -->
  <el-dialog
    v-model="showCreateDialog"
    title="创建分组"
    width="450px"
    class="create-group-dialog"
    modal-class="create-group-overlay"
    :close-on-click-modal="false"
    align-center
    destroy-on-close
    @close="closeCreateGroup"
  >
    <!-- 主体：一行「分组名称」+ 输入框 + 0/20 计数 -->
    <div class="cgp-row">
      <label class="cgp-row__label" for="cgp-name-input">分组名称</label>
      <div class="cgp-row__input-wrap">
        <el-input
          id="cgp-name-input"
          v-model="newGroupName"
          placeholder="请输入分组名称"
          :maxlength="NEW_GROUP_MAX"
          class="cgp-name-input"
          clearable
        />
        <span class="cgp-row__counter">{{ newGroupName.length }} / {{ NEW_GROUP_MAX }}</span>
      </div>
    </div>

    <!-- 底部操作：取消(右) + 确定(粉色 最右) -->
    <template #footer>
      <div class="cgp-footer">
        <el-button class="cgp-footer__cancel" @click="closeCreateGroup">取消</el-button>
        <el-button type="primary" class="cgp-footer__confirm" @click="submitCreateGroup">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GroupFolderItem from '../components/GroupFolderItem.vue'   // ⭐️ 新抽离的独立分组项组件

const router = useRouter()

/* ====== 模拟分组数据 ====== */
const groups = ref([
  { id: 'all',    name: '全部',     count: 0 },

])

const activeGroup  = ref('all')
/* 两个独立 Tab 维度：来源(用户上传/AI生成) + 类型(图片/音乐/视频) */
const activeSource = ref('upload')  /* 维度1：来源（二选一） */
const activeType   = ref('image')   /* 维度2：类型（三选一） */

/* ========== 批量管理模式 ==========
   - 点击"批量管理"：进入模式，按钮文字变"取消"、刷新按钮隐藏、
     顶部增加"已选择 N 张图片"计数条（N 红色、其余灰字）
   - 点击"取消"：退出模式，恢复原按钮与刷新按钮 */
const isBatchMode = ref(false)
const selectedCount = ref(0)   /* 目前数据为空，固定 0；后续接入真实选择项时再改 */

function toggleBatchMode() {
  isBatchMode.value = !isBatchMode.value
  if (!isBatchMode.value) selectedCount.value = 0
}

/* ========== 创建分组弹框 ==========
   · 尺寸：450 × 170.5
   · 背景色：#141414E6
   · 打开时：遮罩 + 背景模糊（backdrop-filter）
   · 字段：分组名称（占位符：请输入分组名称 / 最大 20 字，右上角 0/20 计数）
   · 底部操作：取消 | 确定(粉色) */
const showCreateDialog = ref(false)
const newGroupName   = ref('')
const NEW_GROUP_MAX  = 20

function openCreateGroup() {
  newGroupName.value = ''
  showCreateDialog.value = true
}
function closeCreateGroup() {
  showCreateDialog.value = false
  newGroupName.value = ''
}
function submitCreateGroup() {
  const name = newGroupName.value.trim()
  if (!name) return
  groups.value.push({ id: 'g_' + Date.now(), name, count: 0 })
  closeCreateGroup()
}

function onLogin() { router.push('/login') }
</script>

<style scoped>
/* ================================================================
   group-list-container：作为分组列表的底层容器
   - 提供 position: relative 作为子项绝对定位/伪元素的定位上下文
   - overflow: visible 让选中项左侧的 4px 粉条不被裁剪（"置于底层"）
   ================================================================ */
.group-list-container {
  position: relative;
  width: 100%;
  overflow: visible;
  z-index: 1;
}
/* ================================================================
   全局页面
   ================================================================ */
.assets-page {
  width: 100%;
  min-height: 100%;
  height: auto;
  background: transparent;
  /* ⭐ 亮/暗主题统一：主文字色（暗→白；亮→深灰） */
  color: var(--text-primary, #fff);
  padding: 16px 2px 0;
  margin-left: -6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: color var(--theme-dur) var(--theme-ease);
}

.page-header {
  font-size: 14px;
  line-height: 20px;
  /* ⭐ 亮/暗主题统一：弱化文字色 */
  color: var(--text-faint, #a3a6ad);
  flex-shrink: 0;
  margin-top: -16px;
  transition: color var(--theme-dur) var(--theme-ease);
}

/* 主体两栏 */
.page-body {
  flex: 1;
  min-height: 0;
  display: flex;
  gap: 24px;
  align-items: stretch;
}

/* ================================================================
   左栏：图片分组
   ================================================================ */
.group-panel {
  flex-shrink: 0;
  width: 240px;          /* 严格对齐参考宽 */
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-left: -16px;
  margin-top: 30px;
  margin-bottom: 12px;
}

.group-panel__title {
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 0px;
  font-weight: 700;
  /* ⭐ 亮/暗主题统一：主文字色 */
  color: var(--text-primary, #ffffff);
  transition: color var(--theme-dur) var(--theme-ease);
  flex-shrink: 0;
  letter-spacing: 0px;
  
}

/* 分组列表 */
.group-list {
  list-style: none;
  margin-top: 12px;
  margin-left: -5px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 0 0 auto;
}

/* 弹性占位 */
.group-panel__spacer {
  flex: 1;
  min-height: 8px;
  
}

/* 底部粉色满宽大按钮：100%宽 32高 圆角4 大字号 */
.create-group-btn {
  flex-shrink: 0;
  /* 宽度与 GroupFolderItem 固定宽 224px 完全一致 → 缩放后不会左栏宽度不齐 */
  width: 216px;
  height: 32px;
  padding: 0;
  margin-left: -4px;
  border: none;
  background: #FE2C55;              /* ⭐ 用户要求：统一粉 #FE2C55（原 #FF5677） */
  border-radius: 4px;
  color: #ffffff;
  font-size: 14px;
  line-height: 32px;        /* 关键修复：之前写了 58px → 文字下沉缩放后错位 */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: opacity 160ms ease;   /* ⭐ 移除 brightness/filter 装饰 */
  user-select: none;
  box-sizing: border-box;
}
.create-group-btn:hover { opacity: 0.92; }
.create-group-btn:active { opacity: 0.86; }
.create-group-btn__plus {
  font-size: 22px;
  font-weight: 300;
  line-height: 32px;      /* 与按钮同高 → 缩放后垂直方向不会偏移 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin-bottom: 4px;
}

/* ================================================================
   右栏内容面板
   ================================================================ */
.content-panel {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  
}

/* 工具栏
   - flex-wrap + row-gap 兜底：缩放/窄视口时 Tab 与工具按钮分两行，不重叠不乱高
   - min-height 锁定行高基线，避免 Safari/Chrome 缩放时 baseline 漂移 */
.toolbar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px 12px;          /* 行16 列12，换行后也有垂直间距 */
  flex-wrap: wrap;         /* 关键：缩放/窄屏 → 分两行，永不重叠 */
  width: 102%;
  min-height: 34px;
  margin-top: 25px;
  margin-left: -12px;
}
.filter-tabs {
  display: flex;
  align-items: stretch;    /* 关键：stretch 让两组 Tab 强制同高（缩放后不会一高一低） */
  justify-content: flex-start;
  gap: 12px;               /* 两个独立 Tab 组分隔 */
  flex-wrap: wrap;
  min-height: 32px;
  flex: 1 1 auto;
  min-width: 0;
}

/* ------- 两个独立 Tab 组的公共基础样式 ------- */
/* 尺寸来源（用户要求的整体尺寸）：
   · 来源组（用户上传 + AI生成 两个按钮） → 整体 160.48 × 32
   · 类型组（图片 + 音乐 + 视频 三个按钮） → 整体 232 × 33.5
   由于相邻按钮通过 margin-left:-1px 叠加一条描边，所以整体宽 = N*单宽 - (N-1)*1px */
.filter-tabs :deep(.source-tabs) {
  display: inline-flex;
  align-items: stretch;
  width: 160.48px;            /* 整体宽：用户指定 */
  height: 32px;
  line-height: 32px;
  border: none;
  background: transparent;
  flex: 0 0 160.48px;         /* 锁死整体宽度，不参与 flex 分配 */
  min-width: 0;
}
.filter-tabs :deep(.type-tabs) {
  display: inline-flex;
  align-items: stretch;
  width: 232px;               /* 整体宽：用户指定 */
  height: 33.5px;
  line-height: 33.5px;
  border: none;
  background: transparent;
  flex: 0 0 232px;            /* 锁死整体宽度，不参与 flex 分配 */
  min-width: 0;
}

/* ------- 每个 Tab 按钮公共样式 -------
   - 用 border 而非 outline，缩放时子像素不会产生露白
   - border-right 在组内贴合时强制 0，消除 margin-left:-1px 叠加导致的"双条缝"
   - 单个按钮宽度由下面的分选择器精确锁定（source-tabs 内单按钮 160.48 / type-tabs 内单按钮 232） */
.filter-tabs :deep(.el-radio-button__inner) {
  box-sizing: border-box !important;
  padding: 0 !important;                /* 去掉 padding 用 width 直接锁尺寸，避免不同文本撑开宽度不同 */
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 0 !important;
  /* Element Plus 默认 给 __inner 设了 outline:var(--el-border-color) (浅灰白)
     → 你截图里整圈 Tab 的"白框"就是这条 outline 叠在 border 外面。 */
  outline: none !important;
  /* is-active 态 Element Plus 默认加 box-shadow:-1px 0 0 0 主色 产生一条左竖"白/彩"边
     (radio-button.scss L88) */
  box-shadow: none !important;
  /* ⭐ 亮/暗主题统一：Tab 未选中底色（暗→#1e1f24 深灰；亮→浅灰）+ 描边 + 文字色 */

  color: var(--text-secondary, #c9cdd6) !important;
  border: 1px solid var(--border-base, #4C4D4F) !important;
    /* 统一显式描边，缩放时无隐缝 */
  white-space: nowrap;
  font-size: 14px !important;
  text-align: center;
  overflow: hidden;
  transition:
    background-color var(--theme-dur) var(--theme-ease),
    color var(--theme-dur) var(--theme-ease),
    border-color var(--theme-dur) var(--theme-ease) !important;
}
/* 来源组：整体 160.48 × 32；共 2 个按钮
   叠 1 条描边 → 单按钮宽 = (160.48 + 1)/2 = 80.74 */
.filter-tabs :deep(.source-tabs .el-radio-button__inner) {
  width: 80.74px !important;
  height: 32px !important;
  min-height: 32px !important;
  line-height: 30px !important;   /* 32 - 2*1px border */
}
/* 类型组：整体 232 × 33.5；共 3 个按钮
   叠 2 条描边 → 单按钮宽 = (232 + 2)/3 = 78 */
.filter-tabs :deep(.type-tabs .el-radio-button__inner) {
  width: 78px !important;
  height: 33.5px !important;
  min-height: 33.5px !important;
  line-height: 31.5px !important;   /* 33.5 - 2*1px border */
}
.filter-tabs :deep(.el-radio-button) {
  margin: 0 !important;
  box-shadow: none !important;
  overflow: visible;
  display: inline-flex;
  flex: 0 0 auto;
}
/* 两个组的外层按钮高度，与各自 __inner 相同避免对齐偏差 */
.filter-tabs :deep(.source-tabs .el-radio-button) { height: 32px; }
.filter-tabs :deep(.type-tabs   .el-radio-button) { height: 33.5px; }
/* 键盘 Tab 聚焦时 Element Plus 会再画 2px outline + 1px offset (radio-button.scss L111-L112)
   不想要的话一起干掉 */
.filter-tabs :deep(.el-radio-button__original-radio:focus-visible + .el-radio-button__inner) {
  outline: none !important;
  outline-offset: 0 !important;
  border-radius: 0 !important;
}
.filter-tabs :deep(.source-tabs .el-radio-button:first-child .el-radio-button__original-radio:focus-visible + .el-radio-button__inner),
.filter-tabs :deep(.type-tabs   .el-radio-button:first-child .el-radio-button__original-radio:focus-visible + .el-radio-button__inner) {
  border-top-left-radius: 6px !important;
  border-bottom-left-radius: 6px !important;
}
.filter-tabs :deep(.source-tabs .el-radio-button:last-child .el-radio-button__original-radio:focus-visible + .el-radio-button__inner),
.filter-tabs :deep(.type-tabs   .el-radio-button:last-child .el-radio-button__original-radio:focus-visible + .el-radio-button__inner) {
  border-top-right-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
}
.filter-tabs :deep(.el-radio-button) {
  margin: 0 !important;
  box-shadow: none !important;
  overflow: visible;
  display: inline-flex;
  height: 32px;
}
/* 相邻按钮通过 margin-left:-1px 叠加时，把右侧按钮的左描边压到上层按钮的右描边下面 */
.filter-tabs :deep(.el-radio-button + .el-radio-button) {
  margin-left: -1px !important;
}
.filter-tabs :deep(.el-radio-button + .el-radio-button .el-radio-button__inner) {
  border-left: 1px solid transparent !important;
}

/* ------- 两个独立 Tab 组：各自拥有完整的首尾圆角 6px ------- */
.filter-tabs :deep(.source-tabs .el-radio-button:first-child .el-radio-button__inner) {
  border-top-left-radius: 6px !important;
  border-bottom-left-radius: 6px !important;
}
.filter-tabs :deep(.source-tabs .el-radio-button:last-child .el-radio-button__inner) {
  border-top-right-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
}
.filter-tabs :deep(.type-tabs .el-radio-button:first-child .el-radio-button__inner) {
  border-top-left-radius: 6px !important;
  border-bottom-left-radius: 6px !important;
}
.filter-tabs :deep(.type-tabs .el-radio-button:last-child .el-radio-button__inner) {
  border-top-right-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
}

/* ------- 两个维度的选中态：独立粉色高亮 + z-index 提升避免邻边盖住 ------- */
.filter-tabs :deep(.el-radio-button.is-active) {
  z-index: 2;
  position: relative;
}
.filter-tabs :deep(.el-radio-button.is-active .el-radio-button__inner) {
  background: #FE2C55 !important;
  border-color: #FE2C55 !important;
  color: #ffffff !important;
  font-weight: 500;
}

.filter-tabs :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  box-shadow: none !important;
}
.tab-svg-icon {
  width: 16px; height: 16px;
  vertical-align: -3px;
  margin-right: 5px;
  display: inline-block;
}

/* 右工具按钮 */
.tool-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  padding-right: 27px;
}
.batch-btn {
  box-sizing: border-box !important;
  width: 92px !important;
  height: 24px !important;
  padding: 0 !important;            /* 固定尺寸，不再由 padding 撑宽 */
  border-radius: 6px !important;
  font-size: 12px !important;      /* 24 高配合适的字号 */
  line-height: 22px !important;    /* 24 - 2*1px border */
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #FE2C55 !important;
  border: 1px solid #FE2C55 !important;
  color: var(--text-primary, #fff) !important;
  overflow: hidden;
  flex: 0 0 92px;                  /* 防止 flex 容器压缩 */
}
/* 随按钮缩小同步缩小批量管理的文件夹图标（14→12） */
.batch-btn .btn-inline-icon {
  width: 12px; height: 12px;
  vertical-align: -2px;
  margin-right: 4px;
}
.refresh-btn {
  box-sizing: border-box !important;
  /* 用户截图规格：68×24 + 右间距 12px + padding 5px 11px（Element Plus small 档位）*/
  width: 68px !important;
  height: 24px !important;
  margin: 0 0 0 12px !important;
  padding: 5px 11px !important;
  border-radius: 4px !important;
  font-size: 12px !important;
  line-height: 14px !important;    /* 24 - 2*5px padding */
  /* ⭐ 亮/暗主题统一：--bg-elevated-2 + --border-base + --text-secondary */
  background: var(--bg-elevated-2, #1e1f24) !important;
  border: 1px solid var(--border-base, #4C4D4F) !important;
  color: var(--text-secondary, #c9cdd6) !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex: 0 0 68px !important;
  overflow: hidden;
  transition:
    background-color var(--theme-dur) var(--theme-ease),
    border-color var(--interact-dur) ease,
    color var(--interact-dur) ease !important;
}
.refresh-btn:hover {
  color: #FE2C55 !important;
  border-color: #FE2C55 !important;
}

/* ========== 批量模式下 tool-actions 内的替换样式（替换「批量管理」+「刷新」两个按钮）==========
   对齐截图红框内：文字「已选择 0 张图片」（0 红色，其余灰色）+ 右侧一个深色描边的「取消」按钮  */
.batch-count-box {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  line-height: 24px;                  /* 与刷新按钮 24 高对齐 */
  /* ⭐ 亮/暗主题统一：弱化文字色 */
  color: var(--text-secondary, #a9acb4);                     /* 灰字：已选择 / 张图片 */
  padding: 0 6px 0 0;
  transition: color var(--theme-dur) var(--theme-ease);
}
.batch-count-box__num {
  color: #FE2C55;                     /* N 红色 */
  font-weight: 600;
  font-size: 15px;
  padding: 0 2px;
}

/* 截图里的「取消」：灰色描边、背景透明、尺寸约 56×24（与刷新按钮 24 高对齐）*/
.cancel-btn {
  box-sizing: border-box;
  width: 56px;
  height: 24px;
  line-height: 22px;                  /* 24 - 2*1px border */
  padding: 0;
  border-radius: 4px;
  background: transparent !important;
  /* ⭐ 亮/暗主题统一：描边/文字用变量 */
  border: 1px solid var(--border-base, #4C4D4F) !important;
  color: var(--text-secondary, #d4d6dc) !important;
  font-size: 12px !important;
  cursor: pointer;
  flex: 0 0 56px;
  transition:
    border-color var(--interact-dur, 180ms) linear,
    color        var(--interact-dur, 180ms) linear,
    background-color var(--theme-dur) var(--theme-ease) !important;
}
.cancel-btn:hover {
  border-color: var(--border-strong, #777) !important;
  color: var(--text-primary, #fff) !important;
}

.refresh-icon {
  width: 14px; height: 14px;
  vertical-align: -2px;
  margin-right: 5px;
  display: inline-block;
}

/* 批量管理按钮里的文件夹图标（宽屏隐藏，窄屏显示 —— 对齐用户截图里的 [🗂 批量管理] 样式） */
.btn-inline-icon {
  width: 14px; height: 14px;
  vertical-align: -2px;
  margin-right: 6px;
  display: none;            /* 宽屏不显示图标，保持和旧版一致 */
}

/* ---------- 窄屏的"行 A：分组下拉"（宽屏不出现） ---------- */
.group-select-wrap {
  display: none;            /* 宽屏隐藏，下拉只在窄屏出现 */
  width: 100%;
  flex: 0 0 100%;
  order: 1;
}
.group-select-wrap :deep(.group-select),
.group-select {
  width: 100% !important;
}
/* el-select 外观定制：深色底 + 浅描边 + 白字，贴合截图下拉样式 */
.group-select-wrap :deep(.el-input__wrapper) {
  /* ⭐ 亮/暗主题统一：--bg-elevated-3（暗→更深深灰；亮→浅白）+ --border-base + --text-primary */
  background: var(--bg-elevated-3, #121317) !important;
  border: 1px solid var(--border-base, #4C4D4F) !important;
  border-radius: 6px !important;
  box-shadow: none !important;
  padding: 0 14px !important;
  height: 40px !important;
  transition: background-color var(--theme-dur) var(--theme-ease),
              border-color var(--theme-dur) var(--theme-ease) !important;
}
.group-select-wrap :deep(.el-select__wrapper:hover) {
  border-color: var(--border-strong, #5a5b5f) !important;
}
.group-select-wrap :deep(.el-input__inner) {
  color: var(--text-primary, #ffffff) !important;
  font-size: 14px !important;
  line-height: 38px !important;
}
.group-select-wrap :deep(.el-select__caret),
.group-select-wrap :deep(.el-input__suffix-inner) {
  color: var(--text-secondary, #a3a6ad) !important;
}

/* ---------- 窄屏工具栏的"创建分组"：样式改为"深色描边 + 浅字 + +"的行内按钮（对齐截图第三个按钮） ---------- */
.create-group-btn--inline {
  display: none;             /* 宽屏默认不显示（左栏已有一个大按钮） */
  /* ⭐ 亮/暗主题统一：--bg-elevated + --border-base + --text-secondary */
  background: var(--bg-elevated, #1a1b1f) !important;
  border: 1px solid var(--border-base, #4C4D4F) !important;
  color: var(--text-secondary, #c9cdd6) !important;
  box-shadow: none !important;
  width: auto !important;
  height: 34px !important;
  padding: 0 14px !important;
  line-height: 32px !important;
  border-radius: 6px !important;
  box-sizing: border-box;
  transition:
    background-color var(--interact-dur) ease,
    border-color var(--interact-dur) ease,
    color var(--interact-dur) ease !important;
}
.create-group-btn--inline:hover {
  background: var(--bg-elevated-2, #22242a) !important;
  border-color: #FE2C55 !important;
  color: #FE2C55 !important;
  filter: none !important;
}
.create-group-btn--inline .create-group-btn__plus {
  height: 32px !important;
  line-height: 32px !important;
  font-size: 18px !important;
}

/* 主区：空状态 */
.assets-main {
  flex: 1;
  min-height: 0;
  /* ⭐ 亮/暗主题统一：--bg-elevated（暗→接近#121212的深色；亮→浅灰白），不再写死黑色 */

  border: none;                   /* ⭐️ 删除最外围浅色描边 */
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color var(--theme-dur) var(--theme-ease);
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 24px;
  max-width: 480px;
}
.empty-state__lock {
  width: 80px; height: 80px;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 18px;
}
.lock-svg {
  width: 72px;
  height: 72px;
  display: block;
}
.empty-state__title {
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  /* ⭐ 亮/暗主题统一：主文字色 */
  color: var(--text-primary, #ffffff);
  margin-bottom: 6px;
  transition: color var(--theme-dur) var(--theme-ease);
}
.empty-state__subtitle {
  font-size: 13px;
  line-height: 20px;
  /* ⭐ 亮/暗主题统一：弱化文字色 */
  color: var(--text-faint, #8a8e98);
  margin-bottom: 22px;
  transition: color var(--theme-dur) var(--theme-ease);
}
.empty-state__login {
  min-width: 120px;
  height: 36px !important;
  padding: 0 22px !important;
  border-radius: 6px !important;
  font-size: 14px;
  background: #FE2C55 !important;
  border-color: #FE2C55 !important;
}

/* ================================================================
   响应式：960px 档 → 只做页面边距兜底
   ================================================================ */
@media (max-width: 960px) {
  .assets-page { padding: 16px; }
  /* 注意：不在这里切换 page-body 方向，把"布局变形"统一留给 770px 精准断点 */
}

/* ================================================================
   响应式：≤770px → 完全切换为用户截图的"上三下"布局
   行 A: 分组下拉 (100% 宽)
   行 B: 两组 Tab 并排 (100% 宽 · space-between)
   行 C: 三个按钮 · 批量管理 / 刷新 / 创建分组
   ================================================================ */
@media (max-width: 770px) {
  .assets-page {
    padding: 12px 14px 20px !important;
    gap: 14px;
  }
  .page-header {
    margin-top: 0;
  }

  /* --- 主体：两栏 → 单栏，直接隐藏左栏（改由工具栏的下拉承担） --- */
  .page-body {
    flex-direction: column;
    gap: 14px;
    align-items: stretch;
  }
  .group-panel {
    display: none !important;     /* 隐藏左栏图片分组（由下拉替代） */
  }
  .content-panel {
    flex: 1 1 auto;
    width: 100%;
    gap: 14px;
  }

  /* --- 工具栏：从 2 列 → 3 行堆叠 --- */
  .toolbar {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 14px 12px;
    width: 100%;
    min-height: auto;
  }
  .toolbar > * { box-sizing: border-box; }

  /* 行 A (order 1): 分组下拉 100% 宽 */
  .group-select-wrap {
    display: block;
    order: 1;
    flex: 0 0 100%;
    width: 100%;
  }

  /* 行 B (order 2): 两组 Tab，两组合计一行撑满 · space-between */
  .filter-tabs {
    order: 2;
    width: 100%;
    flex: 0 0 100%;
    display: flex;
    justify-content: space-between;   /* 两组 Tab 分占左右（对齐截图：来源紧贴左，类型紧贴右） */
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin: 0;
  }
  .filter-tabs :deep(.source-tabs),
  .filter-tabs :deep(.type-tabs) {
    /* 窄屏保持与宽屏相同的精确像素尺寸（用户要求整体 160.48×32 / 232×33.5），
       不允许 flex 拉伸改变尺寸，允许在非常窄的设备上自然换行 */
    flex: 0 0 auto;
    justify-content: flex-start;
  }
  /* 窄屏也保持锁定的按钮尺寸——不再用 padding 撑开宽度 */
  .filter-tabs :deep(.el-radio-button__inner) {
    padding: 0 !important;
  }

  /* 行 C (order 3): 工具按钮 —— 从右对齐 变为 左对齐，且显示"创建分组" */
  .tool-actions {
    order: 3;
    width: 100%;
    flex: 0 0 100%;
    justify-content: flex-start;   /* 对齐截图：三个按钮从左开始排 */
    flex-wrap: wrap;
    gap: 12px;
    display: flex;
    align-items: center;
    margin: 0;
  }
  /* 窄屏批量管理：同样保持 92×24，与宽屏尺寸一致 */
  .batch-btn {
    width: 92px !important;
    height: 24px !important;
    padding: 0 !important;
    font-size: 12px !important;
  }
  .btn-inline-icon {
    display: inline-block;          /* 窄屏才显示批量管理的文件夹图标 */
  }
  /* 窄屏刷新按钮：同样保持 68×24 与宽屏一致；保留浅描边；尺寸不再被 Element Plus small 默认值冲掉 */
  .refresh-btn {
    width: 68px !important;
    height: 24px !important;
    margin: 0 0 0 12px !important;
    padding: 5px 11px !important;
    font-size: 12px !important;
    line-height: 14px !important;
    /* ⭐ 亮/暗主题统一：与宽屏一致（--bg-elevated + --border-base） */
    background: var(--bg-elevated-2, #1a1b1f) !important;
    border: 1px solid var(--border-base, #4C4D4F) !important;
    flex: 0 0 68px !important;
    transition: background-color var(--theme-dur) var(--theme-ease),
                border-color var(--theme-dur) var(--theme-ease) !important;
  }
  /* 窄屏创建分组：显示为行内按钮（和截图第三个按钮完全一致） */
  .create-group-btn--inline {
    display: inline-flex !important;
  }

  /* --- 主区空状态：窄屏上下 padding 收一点，避免空内容太空 --- */
  .assets-main {
    min-height: 340px;
    border-radius: 10px;
  }
  .empty-state {
    padding: 36px 18px;
  }
  .empty-state__lock {
    width: 68px; height: 68px;
    margin-bottom: 14px;
  }
  .lock-svg { width: 60px; height: 60px; }
  .empty-state__title { font-size: 15px; line-height: 22px; }
  .empty-state__subtitle { font-size: 12.5px; line-height: 19px; margin-bottom: 18px; }
  .empty-state__login {
    height: 36px !important;
    min-width: 108px;
  }
}
</style>

<!-- ============================================================
     创建分组弹框的全局样式（el-dialog teleport 到 body，无法被 scoped 命中）
     · dialog：450 × 170.5  背景 #141414E6  padding 16px
     · overlay：背景模糊 backdrop-filter: blur(6px)
     · 内部一行：分组名称 label + 输入框（占位:请输入分组名称） + 0/20 计数
     · 底部：取消(描边) | 确定(粉色 #FE2C55)
     ============================================================ -->
<style>
/* ============================================================
   Element Plus 打开 dialog 后，实际 DOM 是两个 body 的兄弟节点：
     1. <div class="el-overlay create-group-overlay el-overlay-dialog">   遮罩层
     2. <div class="create-group-dialog">                                内容框
   所以「给 overlay 写 flex」是不会让 dialog 居中的！！
   正确做法：对 .create-group-dialog 直接用 position:fixed + margin:auto 绝对居中
   ============================================================ */

/* ------- 遮罩层：背景模糊 ------- */
.create-group-overlay.el-overlay {
  background-color: var(--el-overlay-color, rgba(8, 8, 10, 0.3)) !important;
  backdrop-filter: blur(6px) saturate(1.1);
  -webkit-backdrop-filter: blur(6px) saturate(1.1);
}

/* ------- 对话框本体：宽度 450px，高度由内容自适应（不再锁 170.5 → 避免底部黑色空白）------- */
.create-group-dialog.el-dialog {
  width: 450px !important;
  min-width: 450px;
  max-width: 450px;
  /* 高度：由 header/body/footer 内容自行撑高，保持按钮贴底 ← 最关键的一条 */
  height: 170.5px ;
  margin: 96.75px auto 50px auto !important;
  padding: 0 !important;
  box-sizing: border-box;
  overflow: hidden;
  /* 参考图边角是更大的圆角（~14px） */
  border-radius: 14px !important;
  /* ⭐ 亮/暗主题统一：弹框背景用 --bg-elevated-3（暗→深灰；亮→浅灰），不再写死黑 */
  background: var(--bg-elevated-3, #1a1b1f) !important;
  /* 适度的四周阴影，不要影响尺寸判断 */
  box-shadow: var(--shadow-card, 0 8px 28px rgba(0, 0, 0, 0.6)) !important;
  /* ⭐ 亮/暗主题统一：主文字色 */
  color: var(--text-primary, #f2f3f6);
  transition:
    background-color var(--theme-dur) var(--theme-ease),
    color var(--theme-dur) var(--theme-ease);
}

/* ============================================================
   三段内容：header / body / footer —— 各自 padding 紧凑配合，不留底部大空白
   ============================================================ */
.create-group-dialog .el-dialog__header {
  /* 标题一行：上 padding 16、左右 20、下 10（给下一行分组名称留空间）*/
  padding: 16px 20px 10px 20px !important;
  margin: 0;
  height: auto;
}
.create-group-dialog .el-dialog__title {
  /* 参考图标题字大、白、粗 */
  font-size: 18px !important;
  
  /* ⭐ 亮/暗主题统一：主文字色（暗→白；亮→深黑灰） */
  color: var(--text-primary, #ffffff) !important;
  letter-spacing: 0.5px;
  transition: color var(--theme-dur) var(--theme-ease);
}
/* X 按钮：贴右上角，尺寸加大，白色 ✕ */
.create-group-dialog .el-dialog__headerbtn {
  top: 16px !important;
  right: 18px !important;
  width: 22px !important;
  height: 22px !important;
  font-size: 16px !important;
}
.create-group-dialog .el-dialog__headerbtn .el-dialog__close {
  color: var(--text-secondary, #d5d7dc) !important;
  font-size: 16px !important;
  font-weight: 600;
  transition: color var(--theme-dur) var(--theme-ease);
}
.create-group-dialog .el-dialog__headerbtn:hover .el-dialog__close {
  color: var(--text-primary, #fff) !important;
}

/* body：分组名称 + 输入框 + 0/20 —— 一行，上下 padding 极紧凑 */
.create-group-dialog .el-dialog__body {
  padding: 4px 20px 16px 20px !important;
  color: inherit;
}

/* footer：取消 / 确定 —— 直接贴底，下方 padding 20，不要在下面再留黑空 */
.create-group-dialog .el-dialog__footer {
  padding: 0 20px 20px 20px !important;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 14px;
}

/* ------- 表单行：分组名称 [输入框]  0/20  —— 文字加大到 18px，输入框高度 44px 对齐参考图 ------- */
.create-group-dialog .cgp-row {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 18px !important;
  width: 100%;
  height: auto;
}
.create-group-dialog .cgp-row__label {
  flex: 0 0 auto;
  /* ⭐ 亮/暗主题统一：次级文字色 */
  color: var(--text-secondary, #d5d7dc);
  font-size: 14px;
 
  white-space: nowrap;
  transition: color var(--theme-dur) var(--theme-ease);
}
.create-group-dialog .cgp-row__input-wrap {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  min-width: 0;
  position: relative;
}
.create-group-dialog .cgp-name-input {
  width: 100%;
}
/* 输入框：44px 高、圆角 6px、浅灰色描边 —— 完全对齐参考图 */
.create-group-dialog .cgp-name-input .el-input__wrapper {
  height: 32px;
  width: 338px;
  padding: 0 56px 0 14px;         /* 右侧预留 0/20 计数 + 清除按钮空间 */
  /* ⭐ 亮/暗主题统一：--bg-elevated-2（暗→#1e1f24；亮→浅白）+ --border-base */
  background: var(--bg-elevated-2, #1e1f24) !important;
  border: 1.5px solid var(--border-base, #71757f) !important;  /* 参考图输入框的明显浅色描边 */
  border-radius: 6px !important;
  box-shadow: none !important;
  transition: background-color var(--theme-dur) var(--theme-ease),
              border-color var(--theme-dur) var(--theme-ease) !important;
}
.create-group-dialog .cgp-name-input.is-focus .el-input__wrapper {
  border-color: #FE2C55 !important;
  box-shadow: none !important;
}
.create-group-dialog .cgp-name-input .el-input__inner {
  /* ⭐ 亮/暗主题统一：主文字色 */
  color: var(--text-primary, #f2f3f6);
  font-size: 12px !important;
  line-height: 42px;
  height: 42px;
}
.create-group-dialog .cgp-name-input .el-input__inner::placeholder {
  /* ⭐ 亮/暗主题统一：弱化文字色 */
  color: var(--text-faint, #a0a3ac);
  font-size: 12x;
}
.create-group-dialog .cgp-name-input .el-input__clear {
  right: 54px;
  color: var(--text-faint, #9aa0a8);
  font-size: 14px;
  transition: color var(--theme-dur) var(--theme-ease);
}
.create-group-dialog .cgp-row__counter {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  /* ⭐ 亮/暗主题统一：次级文字色 */
  color: var(--text-secondary, #bfc3cb);
  font-weight: 500;
  pointer-events: none;
  line-height: 1;
  transition: color var(--theme-dur) var(--theme-ease);
}

/* ------- 底部按钮：取消(描边白字) / 确定(粉色白字)，高度 ~44px，宽度 ~110px，对齐参考图 ------- */
.create-group-dialog .cgp-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 14px;
  width: 100%;
  margin-top: 20px;
  margin-right: -6px;
}
.create-group-dialog .cgp-footer__cancel {
  width: 60px !important;
  height: 32px !important;
  padding: 0 !important;
  font-size: 14px !important;
  line-height: 41px !important;
  border-radius: 6px !important;
  background: transparent !important;
  /* ⭐ 亮/暗主题统一：--border-base + --text-secondary */
  border: 1.5px solid var(--border-base, #71757f) !important;
  color: var(--text-secondary, #d5d7dc) !important;
  transition:
    border-color var(--interact-dur) ease,
    color var(--interact-dur) ease !important;
  
}
.create-group-dialog .cgp-footer__cancel:hover {
  color: var(--text-primary, #fff) !important;
  border-color: var(--border-strong, #9a9ea7) !important;
}
.create-group-dialog .cgp-footer__confirm {
  width: 60px !important;
  height: 32px !important;
  padding: 0 !important;
  font-size: 14px !important;
  line-height: 41px !important;
  border-radius: 6px !important;
  background: #FE2C55 !important;
  border: 1.5px solid #FE2C55 !important;
  color: #fff !important;
  
}
.create-group-dialog .cgp-footer__confirm:hover {
  filter: brightness(1.08);
}
</style>
