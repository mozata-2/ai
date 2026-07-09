<template>
  <section class="plaza-section">
    <!-- 标题行 -->
    <div class="plaza-header">
      <div class="plaza-title">
        
        <h2 style="letter-spacing: 0.1px">提示词广场</h2>
        <span class="more-link">更多提示词</span>
      </div>

      <!-- 搜索框 -->
      <div class="search-box">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          v-model="searchKey"
          type="text"
          placeholder="搜索提示词标题或标签..."
        />
        <button class="search-btn">搜索</button>
      </div>
    </div>

    <!-- 分类标签 -->
    <div class="category-tabs">
      <div class="tabs-scroll">
        <button
          v-for="(cat, i) in categories"
          :key="i"
          class="tab-btn"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- 作品展示瀑布流 -->
    <div v-if="filteredWorks.length" class="waterfall">
      <div
        v-for="(item, index) in filteredWorks"
        :key="item.id"
        class="work-card"
        :class="{ large: index === 0 && activeCategory === '全部' && item.specialType === 'lingtu' }"
      >
          <div
            class="work-image-wrap"
            :style="{ aspectRatio: item.ratio || '4 / 3' }"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="work-image"
              loading="lazy"
              referrerpolicy="no-referrer"
              @error="onImgError"
            />

            <!-- 4 张特色卡定制覆盖层，通过 specialType 字段匹配而不是 index -->
            <div v-if="item.specialType === 'lingtu'" class="work-overlay lingtu-overlay">
              <div class="lt-top-left">
                <span class="lt-logo">LT</span>
                <span class="lt-badge">平台</span>
              </div>
              <div class="lt-center-title">
                <span class="lt-main">灵图 AI</span>
                <span class="lt-sub">遥遥领先</span>
              </div>
              <div class="lt-bottom">
                <div class="lt-cards">
                  <div class="lt-mini-card">
                    <div class="lt-mini-img" style="background: linear-gradient(135deg, #667eea, #764ba2);"></div>
                    <div class="lt-mini-text">生成</div>
                  </div>
                  <div class="lt-mini-card">
                    <div class="lt-mini-img" style="background: linear-gradient(135deg, #f093fb, #f5576c);"></div>
                    <div class="lt-mini-text">视频</div>
                  </div>
                  <div class="lt-mini-card">
                    <div class="lt-mini-img" style="background: linear-gradient(135deg, #4facfe, #00f2fe);"></div>
                    <div class="lt-mini-text">换脸</div>
                  </div>
                </div>
                <div class="lt-banner-text">
                  <span class="lt-dot">●</span>
                  生图+视频能力，国内无可匹敌
                </div>
              </div>
            </div>

            <div v-else-if="item.specialType === 'room'" class="work-overlay room-overlay">
              <div class="room-tag">视频</div>
              <div class="room-content">
                <img :src="item.image" alt="" class="room-img" @error="onImgError" />
              </div>
            </div>

            <div v-else-if="item.specialType === 'god'" class="work-overlay god-overlay">
              <div class="god-tag">视频</div>
              <div class="god-content">
                <div class="god-bg"></div>
                <div class="god-figure">
                  <div class="god-head">
                    <div class="god-hat"></div>
                    <div class="god-face">
                      <div class="god-eye"></div>
                      <div class="god-eye"></div>
                      <div class="god-beard"></div>
                    </div>
                  </div>
                  <div class="god-hand-left">
                    <div class="gold-ingot">💰</div>
                  </div>
                  <div class="god-hand-right">
                    <div class="gold-ingot small">💰</div>
                  </div>
                  <div class="god-robe"></div>
                </div>
              </div>
            </div>

            <div v-else-if="item.specialType === 'food'" class="work-overlay food-overlay">
              <div class="food-content">
                <div class="food-bg" :style="{ backgroundImage: `url(${item.image})` }">
                  <div class="food-veg-left">🌶️</div>
                  <div class="food-veg-right">🍜</div>
                  <div class="lantern lantern-left">🏮</div>
                  <div class="lantern lantern-right">🏮</div>
                </div>
                <div class="food-text-wrap">
                  <h3 class="food-title">
                    <span>湖</span><span>南</span><span>香</span><span>辣</span>
                  </h3>
                  <h2 class="food-subtitle">现切牛肉米粉</h2>
                  <p class="food-desc">鲜香入味，一口过瘾</p>
                </div>
              </div>
            </div>

            <!-- Hover 遮罩 -->
            <div class="card-hover-mask">
              <button class="hover-btn primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                立即使用
              </button>
              <div class="hover-actions">
                <button class="hover-action">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
                <button class="hover-action">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- 角标：视频/热门/新等 -->
            <div v-if="item.badge" class="corner-badge" :class="'badge-' + item.badgeType">
              {{ item.badge }}
            </div>
          </div>

          <div class="work-info">
            <div class="work-tags" v-if="item.tags && item.tags.length">
              <span v-for="(t, ti) in item.tags.slice(0, 3)" :key="ti" class="work-tag">{{ t }}</span>
            </div>
            <h4 class="work-title" :title="item.title">{{ item.title }}</h4>
            <div class="work-meta">
              <span class="work-views">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                {{ item.views }}
              </span>
              <span class="work-author">{{ item.author }}</span>
            </div>
          </div>
        </div>
    </div>

    <div v-else class="empty-tip">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <p>没有找到相关提示词，换个关键词试试～</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchKey = ref('')
const activeCategory = ref('全部')

const categories = ref([
  '全部', '装修设计', '服饰换装', '餐饮美食', '人像摄影',
  '电商产品', '美容美发', '文旅宣传', '口播带货',
  '头像表情包', '文案生活', '商业创作', '公共服务', '影视创作'
])

/* ---------- 随机工具 ---------- */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randViews = () => {
  const base = randInt(1, 999)
  if (base < 100) return `${randInt(1, 99)}.${randInt(0, 9)}k`
  if (base < 900) return `${randInt(1, 49)}.${randInt(0, 9)}k`
  return `${randInt(50, 299)}.${randInt(0, 9)}k`
}
// 错落的宽高比，用于瀑布流高度差异
const ratioPool = ['3 / 4', '4 / 5', '5 / 6', '1 / 1', '5 / 4', '4 / 3', '3 / 2']
const randRatio = () => pick(ratioPool)

// Text-to-Image 国内可访问接口（替代不可达的 Unsplash）
const T2I_ENDPOINT = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image'

// 每个分类的风格/场景描述词，附加到标题后组成 prompt
const categoryPromptStyles = {
  '装修设计': '室内设计效果图，专业建筑摄影，真实自然光线，宽敞通透，高级质感，8K',
  '服饰换装': '全身穿搭展示，时尚街拍风格，精致妆容，清晰人像全身照，高级时装大片',
  '餐饮美食': '美食摄影，高清特写，热气腾腾，高光细节，食欲感，暖色调，餐具精美',
  '人像摄影': '人像大片，精致光影，专业镜头画质，高级质感，电影级调色',
  '电商产品': '商业棚拍产品图，纯白或高级渐变背景，柔光布光，品牌广告质感',
  '美容美发': '美发沙龙人像摄影，发丝质感清晰可见，精致侧颜，美容大片',
  '文旅宣传': '风景大片，专业旅行摄影，广角镜头，精美光影，自然色彩鲜艳',
  '口播带货': '主播上半身人像，直播间补光灯柔和美颜，手持产品，年轻活力主播',
  '头像表情包': '可爱卡通插画，色彩鲜艳明快，大头Q版构图，简洁背景，萌系风格',
  '文案生活': '生活美学摄影，ins 风，柔和莫兰迪色调，留白构图，电影感滤镜',
  '商业创作': '商业海报风格，强烈视觉冲击，高级创意设计，品牌质感，节日氛围',
  '公共服务': '扁平化宣传插画，温暖配色，人物矢量图标清晰，信息明确，正能量',
  '影视创作': '电影海报级场景，IMAX 宽屏画幅，史诗感，光影层次丰富，高对比色调'
}

// 瀑布流 aspect ratio → text_to_image image_size 映射
const sizeByRatio = (ratioStr) => {
  switch (ratioStr) {
    case '3 / 4': case '4 / 5': case '5 / 6': return 'portrait_4_3'
    case '1 / 1': return 'square_hd'
    case '5 / 4': case '4 / 3': return 'landscape_4_3'
    case '3 / 2': case '16 / 9': return 'landscape_16_9'
    default: return 'landscape_4_3'
  }
}

// 根据分类、标题、比例生成可访问的图片 URL
const makeWorkImage = (cat, title, ratio) => {
  const style = categoryPromptStyles[cat] || ''
  // 如果标题过长或带"·第X弹"，去掉后缀使 prompt 更干净
  const cleanTitle = String(title || '').split(' · 第')[0]
  const prompt = `${cleanTitle}，${style}，精致细节，真实画面，高分辨率`
  const size = sizeByRatio(ratio || '4 / 3')
  return `${T2I_ENDPOINT}?prompt=${encodeURIComponent(prompt)}&image_size=${size}`
}

// 图片加载失败：隐藏破损图标，退回到 work-image-wrap 的背景色
const onImgError = (e) => {
  const el = e && e.target
  if (!el || el.__imgErrHandled) return
  el.__imgErrHandled = true
  el.style.display = 'none'
}

// 作者、标签池
const authorSuffix = ['工作室', '官方', '工坊', '创意', '美学', '研究所', '达人', '空间', '小铺', '视觉']
const authorPrefix = ['光影', '云端', '像素', '星河', '微风', '零度', '魔方', '柠檬', '彩虹', '暮光', '薄荷', '知更', '橘子', '野马', '拾光', '麋鹿', '飞鸟']
const randAuthor = () => '@' + pick(authorPrefix) + pick(authorSuffix) + (Math.random() < 0.3 ? randInt(1, 99) : '')

const badgePool = ['', '', '', '', '热门', '最新', '精选', '视频', 'HOT', 'PRO']
const badgeTypeOf = (b) => ({ '热门': 'hot', 'HOT': 'hot', '最新': 'new', '精选': 'top', 'PRO': 'pro', '视频': 'video' }[b] || '')

/* ---------- 每个分类的标题模板池 ---------- */
const titleTemplates = {
  '装修设计': [
    '现代简约三居室全屋漫游',
    '北欧风小户型温馨改造',
    '轻奢大理石卫浴空间展示',
    '新中式茶室禅意设计',
    '日式原木风客厅实景',
    '侘寂风主卧静谧氛围',
    '美式复古书房陈列',
    '极简开放式厨房设计',
    '地中海蓝白阳台花园',
    '工业风LOFT挑高空间',
    '法式奶油风客餐厅',
    '港式轻奢玄关端景',
    '东南亚风情度假别墅',
    '后现代艺术样板间',
    '榻榻米多功能儿童房'
  ],
  '服饰换装': [
    '夏日法式碎花连衣裙',
    '通勤OL西装套装穿搭',
    '复古港风牛仔夹克',
    '温柔初恋感白月光裙',
    '街头机能风工装LOOK',
    '中式旗袍改良礼服',
    '学院风JK百褶裙造型',
    '慵懒软糯毛衣开衫',
    '度假风沙滩长裙飘逸',
    '英伦风衣叠穿示范',
    '酷飒皮衣辣妹穿搭',
    '名媛风小香风外套',
    '波西米亚流苏针织',
    '国潮仙鹤刺绣卫衣',
    '优雅赫本风小黑裙'
  ],
  '餐饮美食': [
    '川味麻辣牛油火锅',
    '广式早茶点心拼盘',
    '日式烧鸟深夜食堂',
    '意式手工披萨玛格丽特',
    '法式舒芙蕾松饼下午茶',
    '韩式部队芝士年糕锅',
    '泰式冬阴功海鲜汤面',
    '粤式脆皮烧腊双拼饭',
    '湘味剁椒鱼头鲜辣',
    '云南过桥米线精致版',
    '北欧风轻食沙拉碗',
    '土耳其烤肉卷饼',
    '台式珍珠奶茶冰品',
    '墨西哥塔可风味套餐',
    '老北京炸酱面摆盘'
  ],
  '人像摄影': [
    '赛博朋克都市夜景人像',
    '日系清新校园少女写真',
    '复古胶卷情绪片',
    '黄昏海边逆光剪影',
    '中式旗袍园林意境',
    '森系精灵仙气少女',
    '商务精英男士形象照',
    '街头潮酷滑板少年',
    '古风汉服仕女游园',
    '摩登都市职业女性',
    '油画风暗调美人像',
    '冬日雪景毛衣少女',
    '婚礼新娘唯美特写',
    '韩系清透证件照',
    '工业风硬朗男士片'
  ],
  '电商产品': [
    '高端护肤精华液场景',
    '轻奢真丝睡衣平铺',
    '便携蓝牙音箱科技感',
    '机械键盘RGB灯光',
    '不锈钢保温杯ins风',
    '手提真皮通勤女包',
    '香薰蜡烛氛围摄影',
    '无线降噪耳机广告',
    '陶瓷餐具礼盒套装',
    '跑鞋运动鞋悬浮构图',
    '婴儿纸尿裤温和洁净',
    '珠宝项链钻石特写',
    '扫地机器人居家场景',
    '智能手表运动风',
    '咖啡豆手冲器具套图'
  ],
  '美容美发': [
    '法式慵懒大波浪卷发',
    '韩式氧气刘海锁骨发',
    '黑茶色渐变染长发',
    '复古手推波纹民国造型',
    '短发狼尾酷飒女生',
    '粉棕显白氛围感发色',
    '日系短发纹理烫',
    '古风盘发中式婚礼',
    '羊毛卷泡面头可爱',
    '男士渐变油头利落',
    '薄荷米棕冷调发色',
    '脏辫个性潮酷造型',
    '公主切齐刘海姬发',
    '羊毛卷甜飒中长发',
    '雾感灰棕低调显白'
  ],
  '文旅宣传': [
    '山水桂林漓江烟雨',
    '故宫红墙白雪冬日',
    '九寨沟五彩池秋景',
    '张家界天门山云海',
    '丽江古城夜晚灯火',
    '西湖断桥苏堤春晓',
    '黄山日出奇松怪石',
    '凤凰古城沱江吊脚楼',
    '三亚椰风沙滩碧海',
    '苏州园林拙政园水榭',
    '长城八达岭层林尽染',
    '乌镇水乡小桥人家',
    '青海湖茶卡盐湖天空之镜',
    '大理洱海苍山云影',
    '鼓浪屿文艺街巷转角'
  ],
  '口播带货': [
    '美妆博主口红试色',
    '3C数码达人开箱评测',
    '服装主播上身试穿',
    '美食博主嗦面吃播',
    '母婴好物种草分享',
    '家居家电实测推荐',
    '健身教练蛋白棒推荐',
    '护肤达人成分解析',
    '零食博主拆箱测评',
    '珠宝主播玉石讲解',
    '母婴用品新手避坑',
    '潮鞋上脚穿搭分享',
    '养生茶饮熬制教程',
    '宠物用品猫咪爱用',
    '旅行箱打包收纳技巧'
  ],
  '头像表情包': [
    '可爱猫系圆眼少女头像',
    '柴犬治愈表情包9宫格',
    '古风Q版男生头像',
    '赛博朋克机械少女',
    '国潮醒狮萌版头像',
    '粉系甜酷辣妹头像',
    '熊猫搞怪趣味表情包',
    'ins风简笔情侣头像',
    'JK制服双马尾萝莉',
    '像素风8bit人物头像',
    '水彩色温柔女生头像',
    '佛系禅意小和尚头像',
    '哈利波特魔法学院头像',
    '宇航员宇宙梦幻头像',
    '兔子警官Q版萌系'
  ],
  '文案生活': [
    '治愈系清晨日签配图',
    '晚安城市灯火插画',
    '周末咖啡书店慢生活',
    '独处时光雨夜读书',
    '夏日海边度假文案',
    '秋天第一杯奶茶海报',
    '冬日围炉煮茶暖意',
    '春日赏花樱花盛开',
    '打工人周一元气文案',
    '闺蜜下午茶美好时光',
    '自律健身晨间打卡',
    '手冲咖啡仪式感',
    '胶片相机复古生活',
    '鲜花集市浪漫文案',
    '落日晚霞思念短句'
  ],
  '商业创作': [
    '财神送宝国风营销短片',
    '618大促主KV视觉',
    '双11狂欢夜电商海报',
    '新春开门红红包封面',
    '品牌周年庆典礼盒设计',
    '新品首发造势视频',
    '线下快闪店空间视觉',
    '新品上市倒计时海报',
    '会员日VIP专属海报',
    '企业年会盛典主视觉',
    '国潮品牌联名插画',
    '奢侈品高端邀请函',
    '店庆庆典缤纷视觉',
    '金融产品稳健风格海报',
    '新能源汽车未来感海报'
  ],
  '公共服务': [
    '反诈防骗公益科普海报',
    '文明城市从我做起宣传',
    '绿色环保低碳出行',
    '垃圾分类人人有责',
    '消防安全知识手册配图',
    '交通安全文明驾驶',
    '节约用水公益宣传',
    '光盘行动拒绝浪费',
    '无偿献血爱心公益',
    '留守儿童关爱公益',
    '社区便民服务中心指南',
    '政务办事大厅流程图',
    '应急救援常识图解',
    '心理健康关注科普',
    '疫苗接种温馨提示'
  ],
  '影视创作': [
    '科幻赛博朋克城市场景',
    '古装武侠江湖意境海报',
    '悬疑侦探夜色电影海报',
    '浪漫爱情青春校园海报',
    '灾难片末日废墟视觉',
    '奇幻魔法森林童话',
    '犯罪警匪街头追逐海报',
    '纪录片人文山川海报',
    '恐怖片老宅月夜氛围',
    '机甲战争巨型机器人海报',
    '谍战悬疑老上海风情',
    '体育竞技热血夺冠海报',
    '历史史诗战争长卷',
    '家庭温情治愈系海报',
    '探险寻宝热带雨林海报'
  ]
}

// 每个分类对应的标签池
const tagsOfCategory = {
  '装修设计': ['现代', '北欧', '轻奢', '新中式', '日式', '侘寂', '极简', '法式', '港式', '全屋漫游'],
  '服饰换装': ['夏日', '通勤', '复古', '温柔', '街头', '中式', '学院', '慵懒', '度假', '穿搭'],
  '餐饮美食': ['川菜', '粤菜', '日料', '意式', '下午茶', '韩式', '泰式', '湘菜', '轻食', '摆盘'],
  '人像摄影': ['赛博', '日系', '复古', '黄昏', '旗袍', '森系', '商务', '街头', '古风', '写真'],
  '电商产品': ['护肤', '3C', '穿搭', '居家', '香氛', '音频', '餐具', '运动', '母婴', '珠宝'],
  '美容美发': ['卷发', '染发', '短发', '盘发', '显白', '纹理烫', '羊毛卷', '油头', '渐变', '刘海'],
  '文旅宣传': ['桂林', '故宫', '九寨', '张家界', '丽江', '西湖', '黄山', '凤凰', '三亚', '苏州'],
  '口播带货': ['美妆', '开箱', '穿搭', '吃播', '母婴', '家居', '健身', '护肤', '测评', '种草'],
  '头像表情包': ['可爱', '治愈', '古风', '赛博', '国潮', '甜酷', '搞怪', '情侣', '像素', 'Q版'],
  '文案生活': ['日签', '晚安', '咖啡', '独处', '夏日', '秋日', '冬日', '春日', '治愈', '慢生活'],
  '商业创作': ['国风', '大促', '双11', '新春', '周年庆', '新品', '倒计时', '会员', '年会', '视觉'],
  '公共服务': ['反诈', '文明', '环保', '分类', '消防', '交通', '节水', '光盘', '公益', '科普'],
  '影视创作': ['科幻', '武侠', '悬疑', '爱情', '灾难', '奇幻', '警匪', '纪录', '恐怖', '机甲']
}

/* ---------- 构造每个分类 10+ 条数据 ---------- */
const buildCategoryWorks = (cat, count, startId) => {
  const titles = titleTemplates[cat]
  const tagsPool = tagsOfCategory[cat]
  const list = []
  for (let i = 0; i < count; i++) {
    const title = titles[i % titles.length] + (i >= titles.length ? ` · 第${Math.floor(i / titles.length) + 2}弹` : '')
    const badge = pick(badgePool)
    const tagsCount = randInt(1, 3)
    const tags = []
    for (let t = 0; t < tagsCount; t++) {
      const tag = pick(tagsPool)
      if (!tags.includes(tag)) tags.push(tag)
    }
    const workRatio = randRatio()
    list.push({
      id: startId + i,
      title,
      image: makeWorkImage(cat, title, workRatio),
      views: randViews(),
      author: randAuthor(),
      category: cat,
      ratio: workRatio,
      badge,
      badgeType: badgeTypeOf(badge),
      tags
    })
  }
  return list
}

let __id = 100
const realCategories = categories.value.filter(c => c !== '全部')
const generatedWorks = []
realCategories.forEach(cat => {
  // 每类 12 条，保证 ≥10
  const count = 12
  generatedWorks.push(...buildCategoryWorks(cat, count, __id))
  __id += count
})

/* ---------- 前 4 条特色卡（从对应分类拿第 1 条替换核心字段 + 加 specialType）---------- */
// 在"全部"分类下，特色卡展示在最前的策略：
// 为 4 张特色卡单独创建作品并置于数组最前，它们各自归类到对应的分类
const featureCards = [
  {
    id: 1,
    title: '灵图AI 平台功能演示',
    image: makeWorkImage('商业创作', '灵图AI平台功能演示，AI生成平台界面', '16 / 9'),
    views: '28.3k',
    author: '@灵图官方',
    category: '商业创作',
    ratio: '16 / 9',
    badge: '精选',
    badgeType: 'top',
    tags: ['平台', '生图', '视频', '换脸'],
    specialType: 'lingtu'
  },
  {
    id: 2,
    title: '现代简约三居室视频漫游',
    image: makeWorkImage('装修设计', '现代简约三居室客厅全景漫游', '4 / 3'),
    views: '12.5k',
    author: '@设计师Leo',
    category: '装修设计',
    ratio: '4 / 3',
    badge: '视频',
    badgeType: 'video',
    tags: ['现代', '全屋漫游'],
    specialType: 'room'
  },
  {
    id: 3,
    title: '财神送宝 国风营销短片',
    image: makeWorkImage('商业创作', '财神送宝，国风新年祝福，喜庆红色背景', '4 / 3'),
    views: '56.7k',
    author: '@国风堂',
    category: '商业创作',
    ratio: '4 / 3',
    badge: '热门',
    badgeType: 'hot',
    tags: ['国风', '新春'],
    specialType: 'god'
  },
  {
    id: 4,
    title: '湖南香辣牛肉米粉 餐饮海报',
    image: makeWorkImage('餐饮美食', '湖南香辣牛肉米粉，热气腾腾牛肉湘菜，精美摆盘', '16 / 9'),
    views: '34.1k',
    author: '@美食工坊',
    category: '餐饮美食',
    ratio: '16 / 9',
    badge: '精选',
    badgeType: 'top',
    tags: ['湘菜', '摆盘'],
    specialType: 'food'
  }
]

// 合并：特色卡置前 + 生成数据
const works = ref([...featureCards, ...generatedWorks])

/* ---------- 分类筛选 & 搜索 ---------- */
const filteredWorks = computed(() => {
  let list = works.value
  if (activeCategory.value !== '全部') {
    list = list.filter(w => w.category === activeCategory.value)
  }
  if (searchKey.value.trim()) {
    const k = searchKey.value.trim().toLowerCase()
    list = list.filter(w =>
      w.title.toLowerCase().includes(k) ||
      w.author.toLowerCase().includes(k) ||
      w.category.toLowerCase().includes(k) ||
      (w.tags && w.tags.some(t => t.toLowerCase().includes(k)))
    )
  }
  return list
})

const categoryCount = (cat) => {
  if (cat === '全部') return works.value.length
  return works.value.filter(w => w.category === cat).length
}
</script>

<style scoped>
.plaza-section {
  padding-bottom: 20px;
}

/* 标题行 */
.plaza-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 20px;
  margin-left: 10px;
}


.plaza-title {
  display: flex;
  align-items: center;
  margin-left: -10px;
  margin-bottom: -6px;
  width: 180px;
  
}
.plaza-title h2{
  margin-bottom: 13px;
  font-size: 20px;
  
}
.title-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #ff4d8d, #c23ad2);
  border-radius: 8px;
  color: var(--text-primary, #fff);
}

.plaza-title h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  
  transition: color var(--theme-dur) var(--theme-ease);
}

.more-link {
  font-size: 12px;
  color: var(--text-faint);
  cursor: pointer;
  transition: color var(--interact-dur) var(--interact-ease);
  margin-left: 8px;
}

.more-link:hover {
  color: #ff4d8d;
}

/* 搜索框：外框整体 300×32 */
.search-box {
  display: flex;
  align-items: center;
  width: 300px;
  height: 32px;
  min-width: 0;
  box-sizing: border-box;
  border: 1px solid var(--border-base, rgba(151, 151, 151, 0.373));
  border-radius: 4px;
  padding: 0;
  background: var(--bg-surface, #ffffff);
  color: var(--text-primary);
  /* 去掉 overflow:hidden，让内部 60×32 的按钮不被上下 1px 边框裁剪（父内框高30 < 按钮高32） */
  overflow: visible;
  transition:
    background-color var(--theme-dur) var(--theme-ease),
    border-color var(--theme-dur) var(--theme-ease),
    box-shadow var(--theme-dur) var(--theme-ease);
  margin-bottom: 10px;
}

.search-box:focus-within {
  border-color: rgba(255, 255, 255, 0.24);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.04);
}

.search-icon {
  color: var(--icon-default, #a1a1aa);
  flex-shrink: 0;
  margin-left: 10px;
  transition: color var(--theme-dur) var(--theme-ease);
}

.search-box input {
  flex: 1;
  height: 100%;
  padding: 0 8px;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1;
  min-width: 0;
  transition: color var(--theme-dur) var(--theme-ease);
}

.search-box input::placeholder {
  color: var(--text-faint, #71717a);
}

.search-btn {
  width: 60px;
  height: 32px; /* 60×32 按钮外框 */
  flex: 0 0 60px;
  box-sizing: border-box;
  padding: 0;
  background-color: var(--bg-elevated-2, #ecececa2);
  color: var(--text-muted, #949596);
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  border: none;
  border-left: 1px solid var(--border-base, rgba(163, 162, 162, 0.421));
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  white-space: nowrap;
  /* 保证按钮内文字真正垂直居中 */
  display: inline-flex; align-items: center; justify-content: center;
  line-height: 1;
  transition:
    background-color var(--interact-dur) var(--interact-ease),
    color var(--theme-dur) var(--theme-ease);
}

.search-btn:hover {
  background: var(--bg-elevated-3, #3a3b3c);
}

/* 分类标签 */
.category-tabs {
  margin-bottom: 24px;
}

.tabs-scroll {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-top: -7px;
}

.tabs-scroll::-webkit-scrollbar {
  height: 0;
}

.tab-btn {
  flex-shrink: 0;
  padding: 0;
  background: transparent;
  color: var(--text-muted);
  border: none;
  border-radius: 0;
  font-size: 15px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: color var(--theme-dur) var(--theme-ease);
}

.tab-btn:hover {
  color: var(--text-primary);
}

.tab-btn.active {
  color: var(--text-primary);
  font-weight: 600;
}

/* 空状态 */
.empty-tip {
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: var(--text-extra-faint);
  border-radius: 16px;
  border: 1px dashed var(--border-strong);
}

.empty-tip p {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
}

/* ---------- CSS 多列瀑布流（流式瀑布）---------- */
.waterfall {
  column-width: 260px;
  column-gap: 20px;
  width: 100%;
}

/* ---------- 瀑布流卡片 ---------- */
.work-card {
  border-radius: 16px;
  overflow: hidden;
  background: var(--bg-elevated, #F5F7FA);
  cursor: pointer;
  transition:
    background-color var(--theme-dur) var(--theme-ease),
    border-color var(--theme-dur) var(--theme-ease),
    box-shadow var(--theme-dur) var(--theme-ease),
    transform var(--interact-dur) var(--interact-ease);
  border: 1px solid var(--border-base, #E5E6EA);
  box-shadow: var(--shadow-card, 0 4px 12px rgba(0,0,0,0.08));
  /* 多列瀑布流关键属性 */
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  display: inline-block;
  width: 100%;
  margin: 0 0 20px;
  vertical-align: top;
}

.work-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--border-extra);
}

.work-image-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: var(--bg-elevated-2, #F0F1F4);
}

.work-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
}

.work-card:hover .work-image {
  transform: scale(1.06);
}

/* 角标 */
.corner-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 3px 9px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  z-index: 3;
  pointer-events: none;
  color: var(--text-primary, #fff);
  backdrop-filter: blur(4px);
}
.badge-hot    { background: rgba(255, 77, 79, 0.9); }
.badge-new    { background: rgba(16, 185, 129, 0.9); }
.badge-top    { background: linear-gradient(135deg, rgba(255, 77, 141, 0.95), rgba(194, 58, 210, 0.95)); }
.badge-pro    { background: rgba(234, 179, 8, 0.92); color: var(--text-primary, #422); }
.badge-video  { background: rgba(255, 77, 77, 0.9); display: inline-flex; align-items: center; gap: 4px; }
.badge-video::before { content: '▶'; font-size: 8px; }

/* Overlay 覆盖层 - 定制化视觉 */
.work-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

/* 灵图AI 卡片覆盖样式 */
.lingtu-overlay {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f4e 40%, #2a2f6e 70%, #3d3080 100%);
  display: flex;
  flex-direction: column;
  padding: 24px 28px;
  overflow: hidden;
}

.lt-top-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lt-logo {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: var(--text-primary, #fff);
  border-radius: 8px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  letter-spacing: -1px;
}

.lt-badge {
  padding: 3px 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  font-size: 11px;
  color: var(--text-secondary, #cbd5e1);
}

.lt-center-title {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 6px;
}

.lt-main {
  font-size: 44px;
  font-weight: 900;
  background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 4px;
  text-shadow: 0 4px 30px rgba(139, 92, 246, 0.5);
}

.lt-sub {
  font-size: 28px;
  font-weight: 700;
  color: #e879f9;
  letter-spacing: 6px;
  margin-top: -4px;
}

.lt-bottom {
  position: relative;
  padding-top: 12px;
}

.lt-cards {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.lt-mini-card {
  width: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 8px;
  backdrop-filter: blur(8px);
}

.lt-mini-img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 6px;
  margin-bottom: 6px;
  position: relative;
  overflow: hidden;
}

.lt-mini-img::after {
  content: '✨';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  opacity: 0.7;
}

.lt-mini-text {
  font-size: 11px;
  text-align: center;
  color: var(--text-secondary, #e2e8f0);
  font-weight: 500;
}

.lt-banner-text {
  padding: 8px 14px;
  background: linear-gradient(90deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2));
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 20px;
  font-size: 12px;
  color: var(--text-secondary, #a7f3d0);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.lt-dot {
  color: #10b981;
  font-size: 8px;
}

/* 房间视频卡片覆盖 */
.room-overlay {
  background: var(--bg-base, #000);
  display: flex;
  align-items: center;
  justify-content: center;
}

.room-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 77, 77, 0.9);
  color: var(--text-primary, #fff);
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 3;
}

.room-tag::before {
  content: '▶';
  font-size: 8px;
}

.room-content {
  width: 100%;
  height: 100%;
  padding: 24px;
}

.room-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  opacity: 0.95;
  filter: brightness(0.85);
}

/* 财神卡片覆盖 */
.god-overlay {
  background: linear-gradient(135deg, #1a0a0a 0%, #2d0a0a 50%, #0a0a0a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.god-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 77, 77, 0.9);
  color: var(--text-primary, #fff);
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 5;
}

.god-tag::before {
  content: '▶';
  font-size: 8px;
}

.god-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.god-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 80%, rgba(255, 193, 7, 0.3) 0%, transparent 55%),
    radial-gradient(ellipse at 20% 30%, rgba(220, 38, 38, 0.2) 0%, transparent 40%),
    radial-gradient(ellipse at 80% 30%, rgba(220, 38, 38, 0.2) 0%, transparent 40%);
}

/* 漂浮灯笼 */
.god-bg::before,
.god-bg::after {
  content: '🏮';
  position: absolute;
  font-size: 32px;
  opacity: 0.6;
  animation: sway 3s ease-in-out infinite;
}

.god-bg::before { top: 8%; left: 12%; animation-delay: 0s; }
.god-bg::after { top: 12%; right: 12%; animation-delay: 1.5s; font-size: 28px; }

@keyframes sway {
  0%, 100% { transform: rotate(-8deg) translateY(0); }
  50% { transform: rotate(8deg) translateY(-6px); }
}

.god-figure {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 85%;
  animation: breathe 3s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.02); }
}

.god-head {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 55%;
  height: 50%;
}

.god-hat {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 40%;
  background:
    linear-gradient(180deg, #000 0%, #1a1a1a 60%, transparent 100%),
    linear-gradient(90deg, transparent 15%, #dc2626 15%, #dc2626 85%, transparent 85%);
  clip-path: polygon(20% 100%, 0% 0%, 100% 0%, 80% 100%);
  border-radius: 20% 20% 0 0 / 50% 50% 0 0;
}

.god-hat::after {
  content: '';
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 35%;
  background: radial-gradient(circle, #fbbf24, #d97706);
  border-radius: 40%;
  box-shadow: 0 0 12px #fbbf24;
}

.god-face {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 65%;
  background: radial-gradient(ellipse at 50% 40%, #fef3c7 0%, #fde68a 50%, #fbbf24 100%);
  border-radius: 45% 45% 50% 50%;
  box-shadow: inset 0 -8px 20px rgba(180, 83, 9, 0.3);
}

.god-eye {
  position: absolute;
  top: 30%;
  width: 10px;
  height: 8px;
  background: #1f2937;
  border-radius: 50%;
}

.god-eye:nth-child(1) { left: 25%; }
.god-eye:nth-child(2) { right: 25%; }

.god-eye::after {
  content: '';
  position: absolute;
  top: -1px;
  left: -3px;
  width: 16px;
  height: 4px;
  background: #92400e;
  border-radius: 2px;
  transform: rotate(var(--ang, 0deg));
  transform-origin: left center;
}

.god-eye:nth-child(1)::after { --ang: -15deg; }
.god-eye:nth-child(2)::after { --ang: 15deg; transform-origin: right center; }

.god-beard {
  position: absolute;
  bottom: -5%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 50%;
  background: linear-gradient(180deg, #fff 0%, #f1f5f9 60%, #cbd5e1 100%);
  border-radius: 50% 50% 55% 55% / 40% 40% 70% 70%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.god-beard::before {
  content: '';
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 30%;
  background: linear-gradient(180deg, transparent, #94a3b8 50%, transparent);
  opacity: 0.3;
}

/* 财神手 */
.god-hand-left,
.god-hand-right {
  position: absolute;
  top: 45%;
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, #fef3c7, #fde68a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: wave 2s ease-in-out infinite;
  transform-origin: center bottom;
}

.god-hand-left {
  left: 8%;
  animation-delay: 0s;
}

.god-hand-right {
  right: 8%;
  top: 38%;
  animation-delay: 1s;
}

@keyframes wave {
  0%, 100% { transform: rotate(-8deg); }
  50% { transform: rotate(12deg); }
}

.gold-ingot {
  font-size: 22px;
  animation: shine 2s infinite;
}

.gold-ingot.small {
  font-size: 18px;
}

@keyframes shine {
  0%, 100% { filter: drop-shadow(0 0 4px #fbbf24); transform: scale(1); }
  50% { filter: drop-shadow(0 0 12px #fde047); transform: scale(1.15); }
}

.god-robe {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 45%;
  background:
    linear-gradient(180deg, #dc2626 0%, #991b1b 40%, #7f1d1d 100%);
  border-radius: 50% 50% 0 0 / 30% 30% 0 0;
  clip-path: polygon(10% 100%, 0% 0%, 100% 0%, 90% 100%);
}

.god-robe::before {
  content: '';
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
  height: 50%;
  background: radial-gradient(ellipse, #fbbf24 0%, #d97706 100%);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
}

.god-robe::after {
  content: '福';
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translateX(-50%);
  color: #7f1d1d;
  font-size: 18px;
  font-weight: 900;
}

/* 餐饮卡片覆盖 */
.food-overlay {
  background: #1a0f0a;
}

.food-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
}

.food-bg {
  width: 55%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  filter: saturate(1.2) contrast(1.05);
}

.food-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 60%, rgba(26, 15, 10, 0.95) 100%);
}

.food-veg-left {
  position: absolute;
  bottom: 10%;
  left: -5%;
  font-size: 50px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
  transform: rotate(-15deg);
  z-index: 2;
}

.food-veg-right {
  position: absolute;
  top: 8%;
  right: 4%;
  font-size: 40px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
  transform: rotate(20deg);
  z-index: 2;
}

.lantern {
  position: absolute;
  font-size: 42px;
  animation: sway 2.5s ease-in-out infinite;
  z-index: 2;
  filter: drop-shadow(0 0 12px rgba(255, 100, 0, 0.6));
}

.lantern-left { top: 5%; left: 15%; animation-delay: 0s; }
.lantern-right { top: 8%; right: 28%; font-size: 34px; animation-delay: 1.2s; }

.food-text-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 18px 20px 0;
  position: relative;
  z-index: 3;
  background: linear-gradient(90deg, transparent, #1a0f0a 15%, #1a0f0a 100%);
  margin-left: -30px;
  padding-left: 40px;
}

.food-title {
  display: flex;
  gap: 2px;
  margin-bottom: 4px;
}

.food-title span {
  display: inline-block;
  background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 2px;
  animation: bounceIn 0.6s ease backwards;
}

.food-title span:nth-child(1) { animation-delay: 0s; }
.food-title span:nth-child(2) { animation-delay: 0.1s; }
.food-title span:nth-child(3) { animation-delay: 0.2s; }
.food-title span:nth-child(4) { animation-delay: 0.3s; }

@keyframes bounceIn {
  0% { opacity: 0; transform: translateY(10px) scale(0.8); }
  60% { opacity: 1; transform: translateY(-2px) scale(1.05); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.food-subtitle {
  font-size: 20px;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #fcd34d 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 3px;
  margin-bottom: 10px;
  text-align: center;
}

.food-desc {
  font-size: 12px;
  color: #fde68a;
  letter-spacing: 1px;
  padding: 6px 14px;
  border: 1px dashed rgba(251, 191, 36, 0.4);
  border-radius: 18px;
  background: rgba(251, 191, 36, 0.05);
}

/* Hover mask */
.card-hover-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 18px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 4;
  pointer-events: none;
}

.work-card:hover .card-hover-mask {
  opacity: 1;
  pointer-events: auto;
}

.hover-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
}

.hover-btn.primary {
  background: #FE2C55;
  color: #ffffff;
  margin-bottom: 10px;
}

.hover-actions {
  display: flex;
  gap: 10px;
}

.hover-action {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.hover-action:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* 作品信息 */
.work-info {
  padding: 12px 14px 14px;
}

.work-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.work-tag {
  display: inline-block;
  padding: 2px 8px;
  font-size: 11px;
  line-height: 1.6;
  color: var(--text-faint);
  background: var(--bg-elevated-2);
  border: 1px solid var(--border-base);
  border-radius: 6px;
  transition:
    color var(--theme-dur) var(--theme-ease),
    background-color var(--theme-dur) var(--theme-ease),
    border-color var(--theme-dur) var(--theme-ease);
}

.work-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color var(--theme-dur) var(--theme-ease);
}

.work-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-extra-faint);
  transition: color var(--theme-dur) var(--theme-ease);
}

.work-views {
  display: flex;
  align-items: center;
  gap: 4px;
}

.work-author {
  max-width: 55%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
