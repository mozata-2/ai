<template>
  <section class="v31-templates-panel">
    <div class="panel-title-row">
      <div class="panel-title">
        <span class="panel-title__icon">✨</span>
        <span class="panel-title__text">快速选择模板</span>
      </div>
      <div class="panel-title__right">
        <span class="template-count">10 个模板</span>
        <button type="button" class="view-more" @click="$emit('apply-template')">
          <span>查看更多</span>
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path d="M9 6 L15 12 L9 18" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="scroll-wrapper" ref="scrollRef" @scroll="onScroll">
      <div class="card-list">
        <div v-for="tpl in TEMPLATES" :key="tpl.id" class="tpl-card">
          <div class="tpl-card__img" :style="{ background: tpl.bg }">
            <svg v-html="tpl.svg" viewBox="0 0 180 200" width="100%" height="100%" aria-hidden="true"></svg>
          </div>
          <button type="button" class="tpl-card__btn" @click="$emit('apply-template')">立即使用</button>
        </div>
      </div>
    </div>
    <button type="button" class="prev-btn" aria-label="上一页" v-show="showPrev" @click="onPrevClick">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M15 6 L9 12 L15 18" stroke="#2A2C2E" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button type="button" class="next-btn" aria-label="下一页" v-show="showNext" @click="onNextClick">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M9 6 L15 12 L9 18" stroke="#2A2C2E" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </section>
</template>

<script>
export const TEMPLATES = [
  {
    id: 1,
    bg: 'linear-gradient(160deg, #FFE5E0 0%, #FF9A8B 55%, #E84C3D 100%)',
    svg: `
      <ellipse cx="90" cy="155" rx="55" ry="18" fill="rgba(0,0,0,0.18)"/>
      <path d="M70 60 Q90 30 110 60 Q115 80 105 95 L105 130 Q105 145 90 145 Q75 145 75 130 L75 95 Q65 80 70 60 Z" fill="#C0392B"/>
      <path d="M75 95 Q90 108 105 95 L105 130 Q105 145 90 145 Q75 145 75 130 Z" fill="#E74C3C"/>
      <ellipse cx="90" cy="58" rx="25" ry="8" fill="#27AE60" opacity="0.9"/>
      <rect x="88" y="42" width="4" height="18" rx="2" fill="#1E8449"/>
    `
  },
  {
    id: 2,
    bg: 'linear-gradient(160deg, #F5F0E8 0%, #D4C5A9 55%, #8B7355 100%)',
    svg: `
      <rect x="0" y="140" width="180" height="60" fill="rgba(139,115,85,0.35)"/>
      <rect x="30" y="70" width="120" height="90" fill="#C9B896" stroke="#8B7355" stroke-width="1.5"/>
      <rect x="30" y="70" width="120" height="8" fill="#A08968"/>
      <rect x="50" y="100" width="30" height="60" fill="#6B5344" opacity="0.6"/>
      <rect x="50" y="100" width="30" height="6" fill="#5A4538"/>
      <rect x="50" y="128" width="30" height="6" fill="#5A4538"/>
      <rect x="50" y="154" width="30" height="6" fill="#5A4538"/>
      <rect x="100" y="90" width="8" height="70" fill="#6B5344" opacity="0.5"/>
      <rect x="108" y="100" width="8" height="60" fill="#6B5344" opacity="0.4"/>
      <rect x="116" y="110" width="8" height="50" fill="#6B5344" opacity="0.3"/>
    `
  },
  {
    id: 3,
    bg: 'linear-gradient(160deg, #FCE4EC 0%, #F8BBD9 55%, #C2185B 100%)',
    svg: `
      <ellipse cx="90" cy="185" rx="50" ry="10" fill="rgba(0,0,0,0.18)"/>
      <ellipse cx="90" cy="45" rx="18" ry="20" fill="#F5DEB3"/>
      <path d="M72 40 Q70 20 90 15 Q110 20 108 40 Q115 35 112 55 L68 55 Q65 35 72 40 Z" fill="#3E2723"/>
      <path d="M70 65 L72 78 L60 150 L80 150 L86 105 Q90 108 94 105 L100 150 L120 150 L108 78 L110 65 Q90 75 70 65 Z" fill="#AD1457"/>
      <path d="M75 80 Q90 92 105 80 L103 145 L96 145 L92 110 L88 110 L84 145 L77 145 Z" fill="#D81B60"/>
      <rect x="72" y="150" width="10" height="35" rx="3" fill="#F5DEB3"/>
      <rect x="98" y="150" width="10" height="35" rx="3" fill="#F5DEB3"/>
      <path d="M68 75 L58 130" stroke="#AD1457" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M112 75 L122 130" stroke="#AD1457" stroke-width="5" stroke-linecap="round" fill="none"/>
    `
  },
  {
    id: 4,
    bg: 'linear-gradient(160deg, #FFF3E0 0%, #FFB779 55%, #8B3A1A 100%)',
    svg: `
      <ellipse cx="90" cy="170" rx="65" ry="10" fill="rgba(0,0,0,0.18)"/>
      <rect x="38" y="40" width="26" height="90" rx="4" fill="#4A1C0C"/>
      <rect x="38" y="40" width="26" height="10" rx="2" fill="#6B2C15"/>
      <rect x="40" y="55" width="22" height="50" rx="1" fill="#D4A574" opacity="0.6"/>
      <rect x="30" y="90" width="42" height="4" rx="2" fill="#2E110A"/>
      <path d="M90 60 Q76 70 78 95 Q78 120 90 128 Q102 120 102 95 Q104 70 90 60 Z" fill="rgba(255,255,255,0.85)"/>
      <path d="M90 68 Q80 78 82 100 Q82 115 90 120 Q98 115 98 100 Q100 78 90 68 Z" fill="#7B1E2A"/>
      <path d="M88 60 L88 42 L92 42 L92 60 Z" fill="#ECECEC"/>
      <ellipse cx="90" cy="42" rx="10" ry="3" fill="#D6D6D6"/>
    `
  },
  {
    id: 5,
    bg: 'linear-gradient(160deg, #1A237E 0%, #4A148C 55%, #880E4F 100%)',
    svg: `
      <circle cx="145" cy="45" r="12" fill="#FFF59D" opacity="0.9"/>
      <circle cx="145" cy="45" r="16" fill="#FFF59D" opacity="0.22"/>
      <rect x="0" y="150" width="180" height="50" fill="rgba(0,0,0,0.55)"/>
      <rect x="18" y="90" width="22" height="80" fill="#283593"/>
      <rect x="22" y="100" width="4" height="4" fill="#FFEB3B"/>
      <rect x="32" y="100" width="4" height="4" fill="#FFEB3B"/>
      <rect x="22" y="112" width="4" height="4" fill="#4FC3F7"/>
      <rect x="32" y="112" width="4" height="4" fill="#FFEB3B"/>
      <rect x="22" y="124" width="4" height="4" fill="#FFEB3B"/>
      <rect x="48" y="60" width="16" height="110" fill="#311B92"/>
      <rect x="52" y="72" width="3" height="3" fill="#FFC107"/>
      <rect x="59" y="72" width="3" height="3" fill="#FFC107"/>
      <rect x="52" y="82" width="3" height="3" fill="#80DEEA"/>
      <rect x="59" y="82" width="3" height="3" fill="#FFC107"/>
      <rect x="52" y="92" width="3" height="3" fill="#FFC107"/>
      <rect x="59" y="92" width="3" height="3" fill="#FFC107"/>
      <rect x="52" y="102" width="3" height="3" fill="#80DEEA"/>
      <rect x="72" y="70" width="34" height="100" fill="#4527A0"/>
      <rect x="76" y="80" width="4" height="4" fill="#FFD54F"/>
      <rect x="86" y="80" width="4" height="4" fill="#FFD54F"/>
      <rect x="96" y="80" width="4" height="4" fill="#4FC3F7"/>
      <rect x="76" y="92" width="4" height="4" fill="#FFD54F"/>
      <rect x="86" y="92" width="4" height="4" fill="#FFD54F"/>
      <rect x="96" y="92" width="4" height="4" fill="#FFD54F"/>
      <rect x="76" y="104" width="4" height="4" fill="#FFD54F"/>
      <rect x="86" y="104" width="4" height="4" fill="#4FC3F7"/>
      <rect x="96" y="104" width="4" height="4" fill="#FFD54F"/>
      <rect x="76" y="116" width="4" height="4" fill="#FFD54F"/>
      <rect x="86" y="116" width="4" height="4" fill="#FFD54F"/>
      <rect x="114" y="40" width="18" height="130" fill="#3949AB"/>
      <rect x="118" y="52" width="3" height="3" fill="#FFC107"/>
      <rect x="125" y="52" width="3" height="3" fill="#80DEEA"/>
      <rect x="118" y="62" width="3" height="3" fill="#FFC107"/>
      <rect x="125" y="62" width="3" height="3" fill="#FFC107"/>
      <rect x="118" y="72" width="3" height="3" fill="#FFC107"/>
      <rect x="140" y="85" width="24" height="85" fill="#283593"/>
      <rect x="144" y="95" width="4" height="4" fill="#FFD54F"/>
      <rect x="156" y="95" width="4" height="4" fill="#FFD54F"/>
      <rect x="144" y="106" width="4" height="4" fill="#4FC3F7"/>
      <rect x="156" y="106" width="4" height="4" fill="#FFD54F"/>
      <rect x="144" y="117" width="4" height="4" fill="#FFD54F"/>
    `
  },
  {
    id: 6,
    bg: 'linear-gradient(160deg, #FFFDE7 0%, #FFE082 55%, #E65100 100%)',
    svg: `
      <ellipse cx="90" cy="175" rx="62" ry="8" fill="rgba(0,0,0,0.18)"/>
      <ellipse cx="90" cy="120" rx="62" ry="14" fill="#7B3F00"/>
      <path d="M28 120 Q28 60 90 60 Q152 60 152 120 L146 120 Q146 72 90 72 Q34 72 34 120 Z" fill="#FFFFFF"/>
      <path d="M34 120 Q34 72 90 72 Q146 72 146 120 Z" fill="#FAD7A0"/>
      <path d="M50 100 Q56 86 70 88 Q80 90 84 82 Q92 78 100 86 Q110 92 122 86 Q130 84 138 100 Q130 110 120 106 Q108 112 96 104 Q82 112 72 104 Q62 110 50 100 Z" fill="#F4D03F" opacity="0.7"/>
      <ellipse cx="76" cy="98" rx="6" ry="5" fill="#8B4513"/>
      <ellipse cx="100" cy="92" rx="6" ry="5" fill="#8B4513"/>
      <ellipse cx="118" cy="100" rx="6" ry="5" fill="#8B4513"/>
      <ellipse cx="90" cy="104" rx="5" ry="4" fill="#2E7D32"/>
      <path d="M95 112 Q104 118 116 118 Q128 118 136 112" stroke="#A0522D" stroke-width="1.2" fill="none"/>
      <path d="M44 112 Q56 120 70 118" stroke="#A0522D" stroke-width="1" fill="none" opacity="0.7"/>
      <rect x="138" y="70" width="4" height="40" rx="2" fill="#C62828"/>
      <rect x="142" y="70" width="4" height="40" rx="2" fill="#2E7D32"/>
    `
  },
  {
    id: 7,
    bg: 'linear-gradient(160deg, #ECEFF1 0%, #B0BEC5 55%, #455A64 100%)',
    svg: `
      <ellipse cx="90" cy="185" rx="60" ry="8" fill="rgba(0,0,0,0.18)"/>
      <path d="M50 140 L60 105 Q70 96 90 96 Q120 96 134 105 L142 140 L128 170 L56 170 Z" fill="#FAFAFA" stroke="#CFD8DC" stroke-width="1.2"/>
      <path d="M62 100 Q76 92 90 92 Q116 92 130 100 L134 106 Q122 100 90 100 Q66 100 58 106 Z" fill="#ECEFF1"/>
      <ellipse cx="96" cy="132" rx="16" ry="12" fill="#FF5252"/>
      <path d="M60 140 Q90 148 132 140 L130 160 L62 160 Z" fill="#ECEFF1"/>
      <path d="M48 156 L52 178 L72 178 L76 160" fill="#42A5F5" opacity="0.85"/>
      <path d="M50 160 Q62 162 74 160 L72 176 L52 176 Z" fill="#FFFFFF" opacity="0.7"/>
      <path d="M130 152 L138 152 L132 180 L110 180 L108 160" fill="#42A5F5" opacity="0.85"/>
      <path d="M110 162 Q120 160 130 162 L130 178 L110 178 Z" fill="#FFFFFF" opacity="0.7"/>
      <path d="M74 108 Q70 92 80 86 Q84 96 90 100 Z" fill="#29B6F6" opacity="0.6"/>
    `
  },
  {
    id: 8,
    bg: 'linear-gradient(160deg, #B2EBF2 0%, #4DD0E1 55%, #00695C 100%)',
    svg: `
      <circle cx="148" cy="42" r="14" fill="#FFEB3B"/>
      <circle cx="148" cy="42" r="18" fill="#FFEB3B" opacity="0.25"/>
      <rect x="0" y="120" width="180" height="80" fill="rgba(255, 224, 178, 0.85)"/>
      <path d="M0 132 Q45 120 90 132 T 180 132 L180 160 L0 160 Z" fill="#4FC3F7" opacity="0.85"/>
      <path d="M0 140 Q50 132 90 140 T 180 140 L180 160 L0 160 Z" fill="#29B6F6" opacity="0.55"/>
      <rect x="40" y="85" width="3" height="82" fill="#6D4C41"/>
      <path d="M42 85 Q26 72 16 76 Q26 68 42 72 Q48 62 54 72 Q68 66 74 80 Q60 78 42 85 Z" fill="#2E7D32"/>
      <path d="M42 78 Q34 66 24 72 Q38 62 44 66 Q50 54 58 66 Q70 64 72 78 Q58 72 42 78 Z" fill="#43A047"/>
      <path d="M42 92 Q30 86 22 90 Q34 84 42 88 Q48 80 56 88 Q66 86 70 96 Q56 92 42 92 Z" fill="#388E3C" opacity="0.9"/>
      <ellipse cx="18" cy="190" rx="12" ry="4" fill="#5D4037" opacity="0.6"/>
      <ellipse cx="32" cy="192" rx="8" ry="3" fill="#5D4037" opacity="0.45"/>
    `
  }
]
</script>

<script setup>
import { ref, onMounted } from 'vue'

defineEmits(['apply-template'])

const scrollRef = ref(null)
const showPrev = ref(false)
const showNext = ref(true)

const THRESHOLD = 4

function updateBtns() {
  const el = scrollRef.value
  if (!el) return
  const remaining = el.scrollWidth - el.clientWidth - el.scrollLeft
  showPrev.value = el.scrollLeft > THRESHOLD
  showNext.value = remaining > THRESHOLD
}

function onScroll() {
  updateBtns()
}

function onPrevClick() {
  const el = scrollRef.value
  if (!el) return
  const step = el.clientWidth || 340
  if (el.scrollLeft <= THRESHOLD) {
    el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
    return
  }
  const delta = el.scrollLeft <= step ? el.scrollLeft + THRESHOLD : step
  el.scrollBy({ left: -delta, behavior: 'smooth' })
}

function onNextClick() {
  const el = scrollRef.value
  if (!el) return
  const step = el.clientWidth || 340
  const remaining = el.scrollWidth - el.clientWidth - el.scrollLeft
  if (remaining <= THRESHOLD) {
    el.scrollTo({ left: 0, behavior: 'smooth' })
    return
  }
  const delta = remaining <= step ? remaining + THRESHOLD : step
  el.scrollBy({ left: delta, behavior: 'smooth' })
}

onMounted(() => {
  updateBtns()
})
</script>

<style scoped>
.v31-templates-panel {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 0;
  background: transparent;
}
.panel-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}
.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #E5EAF3);
}
.panel-title__icon { font-size: 15px; line-height: 1; flex: 0 0 auto; }
.panel-title__text { flex: 0 0 auto; }

.panel-title__right {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.template-count {
  font-size: 12px;
  color: var(--text-secondary, #BFC4CC);
  font-weight: 500;
}
.view-more {
  appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: transparent;
  border: none;
  border-radius: 0;
  color: #ff5677;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  box-sizing: border-box;
  flex: 0 0 auto;
  padding: 0;
  height: auto;
  line-height: 1;
}
.view-more > svg { flex: 0 0 auto; }

.scroll-wrapper {
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin-top: 10px;
}
.scroll-wrapper::-webkit-scrollbar { display: none; }
.scroll-wrapper { scrollbar-width: none; -ms-overflow-style: none; }

.card-list {
  display: inline-flex;
  align-items: flex-start;
  gap: 8px;
  padding: 2px 2px 4px 2px;
  box-sizing: border-box;
}
.prev-btn {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: #;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  z-index: 3;
}
.prev-btn > svg { flex: 0 0 auto; }

.next-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: #;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  z-index: 3;
}
.next-btn > svg { flex: 0 0 auto; }

.tpl-card {
  width: 108px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  box-sizing: border-box;
}
.tpl-card__img {
  width: 108px;
  height: 158px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  flex: 0 0 auto;
}
.tpl-card__img > svg {
  display: block;
  width: 100%;
  height: 100%;
}
.tpl-card__btn {
  appearance: none;
  -webkit-appearance: none;
  width: 110px;
  height: 24px;
  border: none;
  border-radius: 4px;
  background: #FE2C55;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
</style>
