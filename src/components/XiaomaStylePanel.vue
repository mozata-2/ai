<template>
  <section class="xiaoma-style-panel">
    <div class="panel-title">
      <span class="panel-title__emoji" aria-hidden="true">🐴</span>
      <span class="panel-title__text">动物风格</span>
    </div>

    <div class="style-grid" role="radiogroup" :aria-label="'小马风格选择，当前' + modelValue">
      <button
        v-for="opt in STYLE_OPTS"
        :key="opt.key"
        type="button"
        class="style-btn"
        :class="{ 'style-btn--active': modelValue === opt.key }"
        :aria-checked="modelValue === opt.key"
        role="radio"
        @click="$emit('update:modelValue', opt.key)"
      >
        <span class="style-btn__emoji">{{ opt.emoji }}</span>
        <span class="style-btn__label">{{ opt.label }}</span>
      </button>
    </div>
  </section>
</template>

<script>
export const STYLE_OPTS = [
  { key: 'realistic', label: '写实小马',   emoji: '🐎' },
  { key: 'cartoon',   label: 'Q版卡通',   emoji: '🦄' },
  { key: 'fantasy',   label: '梦幻精灵', emoji: '🧚' },
  { key: 'funny',     label: '日常搞笑', emoji: '😂' }
]
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'realistic',
    validator: (v) => STYLE_OPTS.some(o => o.key === v)
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.xiaoma-style-panel {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 0;
  background: transparent;
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
  margin-bottom: 14px;
}
.panel-title__emoji { font-size: 15px; line-height: 1; flex: 0 0 auto; }
.panel-title__text { flex: 0 0 auto; }

.style-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: 10px;
  width: 100%;
}
.style-btn {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  min-height: 64px;
  border-radius: 12px;
  border: 1px solid var(--border-base, rgba(255,255,255,0.06));
  background: var(--bg-elevated-2, #26272B);
  color: var(--text-primary, #E5EAF3);
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 8px;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    transform 120ms ease;
  user-select: none;
  box-sizing: border-box;
}
.style-btn:hover {
  background: var(--bg-elevated-3, #2D2F34);
  border-color: var(--border-strong, rgba(255,255,255,0.14));
}
.style-btn:active { transform: scale(0.98); }
.style-btn__emoji { font-size: 22px; line-height: 1; }
.style-btn__label { font-size: 13px; font-weight: 600; line-height: 1.2; }

.style-btn--active {
  border-color: rgba(255,255,255,0.12);
}
.style-btn--active:hover { filter: brightness(1.05); }
</style>
