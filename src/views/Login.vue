<template>
  <div class="login-page">
    <!-- ====== 左半屏：视频 + 底部字幕 ====== -->
    <div class="left-panel">
      <video
        class="bg-video"
        :src="loginVideoUrl"
        autoplay
        muted
        loop
        playsinline
      ></video>

      <!-- 底部字幕 -->
      <div class="subtitle-wrap">
        <p class="subtitle-en">The next day they decided</p>
        <p class="subtitle-cn">第二天人们就决定</p>
      </div>
    </div>

    <!-- ====== 右半屏：登录卡片 + 右上角关闭 X ====== -->
    <div class="right-panel">
      <!-- 关闭按钮：返回首页 -->
      <button class="close-btn" @click="goHome" aria-label="关闭">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="right-content">
        <div class="login-card">
          <h1 class="login-title">欢迎登录</h1>
          <p class="login-subtitle">登录您的账号，继续精彩创作</p>

          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            size="large"
            class="login-form"
            @submit.prevent="handleLogin"
          >
            <!-- 账号 -->
            <el-form-item prop="account">
              <el-input
                v-model="form.account"
                placeholder="请输入手机号或用户名"
                class="login-input"
              >
                <template #prefix>
                  <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </template>
              </el-input>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
                show-password
                class="login-input"
              >
                <template #prefix>
                  <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </template>
              </el-input>
            </el-form-item>

            <el-button
              class="login-submit-btn"
              type="primary"
              native-type="submit"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form>

          <div class="login-footer">
            <span class="gray-text">还没有账号？</span>
            <span class="link-text">立即注册</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import loginVideoUrl from '../img/登录视频.mp4'

const router = useRouter()
const goHome = () => router.push('/')

const formRef = ref(null)
const form = reactive({
  account: '',
  password: ''
})

const validateRequired = (label) => (_rule, value, cb) => {
  if (!value || String(value).trim() === '') {
    cb(new Error(`请输入${label}`))
  } else {
    cb()
  }
}

const rules = {
  account: [{ validator: validateRequired('手机号或用户名'), trigger: ['blur', 'change'] }],
  password: [{ validator: validateRequired('密码'), trigger: ['blur', 'change'] }]
}

const handleLogin = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
    ElMessage.success('登录成功（演示）')
  } catch (_e) {
    // 校验失败：让 el-form 自动显示红框 + 错误提示即可
  }
}
</script>

<style scoped>
/* ====== 整体：左右分栏，水平排列 ====== */
.login-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var(--bg-base, #0c0c0e);
}

/* ====== 左半屏：视频区 ====== */
.left-panel {
  position: relative;
  flex: 0 0 46.25%;
  height: 100%;
  overflow: hidden;
}
.bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 底部字幕：两行文字，左对齐，放在视频左下角 */
.subtitle-wrap {
  position: absolute;
  left: 6%;
  right: 6%;
  bottom: 8%;
  z-index: 2;
  text-align: left;
}
.subtitle-en {
  margin: 0 0 8px;
  font-size: 24px;
  color: #e9f0ff;
  letter-spacing: 1px;
  font-weight: 500;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
}
.subtitle-cn {
  margin: 0;
  font-size: 30px;
  color: #37e0ff;
  letter-spacing: 4px;
  font-weight: 700;
  text-shadow:
    0 0 12px rgba(55, 224, 255, 0.45),
    0 2px 10px rgba(0, 0, 0, 0.55);
}

/* ====== 右半屏：深色内容区 ====== */
.right-panel {
  position: relative;
  flex: 1;
  min-width: 0;
  height: 100%;
  background: var(--bg-surface, #0F0F0F);
}

/* 右上角 X 关闭按钮 */
.close-btn {
  position: absolute;
  top: 20px;
  right: 24px;
  z-index: 10;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-faint, #9ca3af);
  cursor: pointer;
  border-radius: 8px;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}
.close-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-primary, #ffffff);
}

/* 右半屏居中卡片容器 */
.right-content {
  width: 101%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ---------- 登录卡片：404×405 内容 + 四边 padding 40 → 484 × 485 ---------- */
.login-card {
  box-sizing: border-box;
  width: 500px;
  max-width: calc(100% - 80px);
  padding: 40px;
  background: rgba(24, 25, 26, 0.78);
  border-radius: 20px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  margin-left: -6px;
}

/* 标题 + 副标题 */
.login-title {
  margin: 0 0 8px;
  text-align: center;
  color: var(--text-primary, #ffffff);
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 1.2;

}
.login-subtitle {
  margin: 0 0 32px;
  text-align: center;
  color: var(--text-faint, #9ca3af);
  font-size: 14px;
  line-height: 1.5;
  margin-left: -8px;
  padding-top: 12px;
}

/* 表单 */
.login-form {
  width: 100%;
}

/* el-form-item：错误提示位置/颜色统一 */
.login-form :deep(.el-form-item) {
  margin-bottom: 24px;
}
.login-form :deep(.el-form-item__error) {
  color: #ff4d6d;
  font-size: 13px;
  padding-top: 4px;
}
.login-form :deep(.el-form-item.is-error .el-input__wrapper) {
  border-color: #ff4d6d !important;
  box-shadow: 0 0 0 2px rgba(255, 77, 109, 0.08);
}

/* 输入框：大圆角、深色背景、大字 */
.login-input :deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.04);
  border: 1.5px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 0 18px;
  height: 62px;
  box-shadow: none;
  transition:
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;
}
.login-input :deep(.el-input__wrapper:hover) {
  border-color: rgba(255, 255, 255, 0.26);
}
.login-input :deep(.el-input__wrapper.is-focus) {
  border-color: #ff7e9c;
  box-shadow: 0 0 0 3px rgba(255, 126, 156, 0.12);
}
.login-input :deep(.el-input__inner) {
  color: var(--text-secondary, #f5f5f5);
  font-size: 15px;
  height: 60px;
}
.login-input :deep(.el-input__inner::placeholder) {
  color: var(--text-faint, #8e8e95);
}
.login-input :deep(.el-input__prefix-inner) {
  margin-right: 10px;
}

/* 自定义 svg 前缀图标 */
.input-icon {
  color: var(--text-faint, #a1a1aa);
  display: block;
  flex-shrink: 0;
  transition: color 180ms ease;
}
.login-input :deep(.el-input__wrapper.is-focus .input-icon),
.login-input :deep(.is-focus .input-icon) {
  color: #ff7e9c;
}

/* 显示密码的图标（小眼睛）颜色 */
.login-input :deep(.el-input__suffix-inner) {
  color: var(--text-faint, #a1a1aa);
}

/* 登录按钮：纯粉底 #FE2C55，大圆角，高 56px（用户要求移除渐变/装饰动画） */
.login-submit-btn {
  width: 100% !important;
  height: 56px !important;
  border: 1px solid #FE2C55 !important;
  border-radius: 16px !important;
  background: #FE2C55 !important;        /* ⭐ 纯粉底 #FE2C55（原渐变） */
  color: #ffffff !important;
  font-size: 17px !important;
  font-weight: 600 !important;
  letter-spacing: 2px !important;
  margin-top: 4px;
  transition: opacity 180ms ease !important;  /* ⭐ 移除 translateY/box-shadow/filter 装饰 */
  box-shadow: none !important;
}
.login-submit-btn:hover { opacity: 0.92; }

/* 底部注册引导 */
.login-footer {
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
}
.gray-text {
  color: var(--text-faint, #94979f);
}
.link-text {
  color: #ff7e9c;
  font-weight: 600;
  cursor: pointer;
  transition: color 180ms ease;
}
.link-text:hover {
  color: #ff5677;
}
</style>
