const navItems = [
  { id: "today", label: "今日", sub: "AI 开局", icon: "☀️", title: "今天想找什么搭子？" },
  { id: "dazi", label: "找搭子", sub: "按需求匹配", icon: "🧭", title: "把一个想法变成一张搭子邀请" },
  { id: "abti", label: "ABTI", sub: "动物搭子人格", icon: "🐾", title: "Animal Buddy Type Indicator" },
  { id: "ai", label: "AI", sub: "我的搭子代理", icon: "🤖", title: "小云正在蒸馏你的社交画像" },
  { id: "discover", label: "发现", sub: "场景入口", icon: "✨", title: "按场景发现小局和搭子" },
  { id: "communities", label: "社群", sub: "小队和小局", icon: "👥", title: "小群不是广场，是可加入的小局" },
  { id: "messages", label: "消息", sub: "聊天与破冰", icon: "💬", title: "聊天里也有 AI 陪跑" },
  { id: "profile", label: "我的", sub: "资料与边界", icon: "🪪", title: "管理你的展示面和隐私边界" },
];

const animals = [
  { id: "dog", name: "犬系", keywords: ["热情", "回应", "陪伴", "行动"], scenes: "饭搭子 / 运动 / 活动", match: "猫系、鹿系、鹰系" },
  { id: "cat", name: "猫系", keywords: ["独立", "审美", "边界", "慢热"], scenes: "安静陪伴 / 看展 / 咖啡", match: "犬系、水獭系、熊系" },
  { id: "deer", name: "鹿系", keywords: ["温和", "敏感", "治愈", "细腻"], scenes: "散步 / 展览 / 低压聊天", match: "熊系、犬系、企鹅系" },
  { id: "fox", name: "狐系", keywords: ["敏锐", "机智", "探索", "分寸"], scenes: "城市探索 / 项目 / 聊天", match: "猫头鹰系、犬系、松鼠系" },
  { id: "bear", name: "熊系", keywords: ["稳定", "踏实", "保护感", "长期"], scenes: "生活搭子 / 长期计划", match: "鹿系、兔系、猫系" },
  { id: "otter", name: "水獭系", keywords: ["快乐", "松弛", "玩乐", "亲近"], scenes: "探店 / 旅行 / 游戏", match: "猫系、鹰系、刺猬系" },
  { id: "dolphin", name: "海豚系", keywords: ["共情", "连接", "气氛", "开放"], scenes: "聚会 / 社群 / 活动", match: "猫头鹰系、鹰系、鹿系" },
  { id: "eagle", name: "鹰系", keywords: ["目标", "效率", "独立", "推进"], scenes: "学习 / 项目 / 健身打卡", match: "犬系、水獭系、海豚系" },
  { id: "wolf", name: "狼系", keywords: ["忠诚", "小队", "协作", "目标"], scenes: "固定小队 / 运动队友", match: "企鹅系、犬系、猫头鹰系" },
  { id: "rabbit", name: "兔系", keywords: ["轻盈", "谨慎", "安全感", "柔软"], scenes: "慢热朋友 / 轻松出行", match: "熊系、鹿系、犬系" },
  { id: "penguin", name: "企鹅系", keywords: ["固定", "仪式", "结伴", "耐心"], scenes: "固定饭搭子 / 周期打卡", match: "狼系、鹿系、松鼠系" },
  { id: "owl", name: "猫头鹰系", keywords: ["思考", "知识", "夜间能量", "深聊"], scenes: "深夜聊天 / 读书观影", match: "狐系、海豚系、狼系" },
  { id: "whale", name: "鲸系", keywords: ["深度", "慢节奏", "情绪", "包容"], scenes: "疗愈陪伴 / 长期信任", match: "鹿系、熊系、海豚系" },
  { id: "alpaca", name: "羊驼系", keywords: ["松弛", "怪可爱", "不卷", "舒服"], scenes: "摸鱼 / 咖啡 / 逛街", match: "鹰系、猫系、兔系" },
  { id: "squirrel", name: "松鼠系", keywords: ["好奇", "收集", "灵活", "发现"], scenes: "探店 / 资料共享 / 城市探索", match: "狐系、企鹅系、猫系" },
  { id: "hedgehog", name: "刺猬系", keywords: ["防御", "慢热", "边界", "熟后柔软"], scenes: "高边界陪伴 / 安静学习", match: "水獭系、熊系、犬系" },
];

const animalPositions = Object.fromEntries(
  animals.map((animal, index) => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    return [animal.id, { x: `${(col / 3) * 100}%`, y: `${(row / 3) * 100}%` }];
  })
);

const quickNeeds = [
  "周六下午找人 city walk",
  "晚上一起去健身房",
  "明天图书馆自习 3 小时",
  "找人看展后喝咖啡",
  "想认识做 AI 产品的人",
  "深夜想找人认真聊聊",
];

const scenes = [
  { id: "food", icon: "🍜", title: "饭搭子 / 探店", desc: "新店、校园食堂、周末 brunch，小范围轻松开局。", tone: "coral" },
  { id: "study", icon: "📚", title: "学习 / 自习", desc: "图书馆、资料共享、论文互相盯进度。", tone: "sky" },
  { id: "sports", icon: "🏃", title: "运动 / 健身", desc: "健身打卡、羽毛球、跑步、户外徒步。", tone: "mint" },
  { id: "city", icon: "🗺️", title: "旅行 / 城市探索", desc: "city walk、小众街区、短途旅行计划。", tone: "lemon" },
  { id: "game", icon: "🎮", title: "游戏 / 线上娱乐", desc: "开黑、桌游、线上观影、语音陪伴。", tone: "sky" },
  { id: "culture", icon: "🎬", title: "展览 / 电影 / 演出", desc: "审美搭子、观影讨论、演出拼场。", tone: "coral" },
  { id: "project", icon: "🚀", title: "项目 / 创业 / 创作", desc: "一起做东西、拆想法、组一个小队。", tone: "mint" },
  { id: "emotional", icon: "🌙", title: "情绪陪伴 / 深聊", desc: "低压聊天、夜间能量、被认真接住。", tone: "lemon" },
];

const baseCandidates = [
  {
    id: "momo",
    name: "Momo",
    animal: "cat",
    score: 92,
    meta: "猫系 · 徐汇 · 今天 16:00 后",
    tags: ["低压聊天", "看展", "边界清楚"],
    reason: "她和你的节奏互补：你负责把计划落地，她负责把路线变得有审美。第一次见面适合 90 分钟的展览和咖啡。",
  },
  {
    id: "jay",
    name: "Jay",
    animal: "eagle",
    score: 88,
    meta: "鹰系 · 杨浦 · 每周二四晚",
    tags: ["健身打卡", "守时", "目标感"],
    reason: "他适合高执行力搭子关系，不太消耗情绪，能和你把健身或项目推进成稳定节奏。",
  },
  {
    id: "nana",
    name: "Nana",
    animal: "otter",
    score: 86,
    meta: "水獭系 · 静安 · 周末灵活",
    tags: ["探店", "松弛", "会接梗"],
    reason: "她能把普通活动变成有趣的小局，适合你想从紧绷工作状态切出来的时候一起活动。",
  },
  {
    id: "lin",
    name: "Lin",
    animal: "owl",
    score: 83,
    meta: "猫头鹰系 · 线上/五角场",
    tags: ["AI 产品", "深聊", "知识感"],
    reason: "如果你想聊产品、模型、社交平台设计，他会是一个能把话题聊深的搭子，而不是只寒暄。",
  },
];

const communities = [
  { id: "badminton", title: "周三羽毛球小队", animal: "wolf", people: ["L", "M", "Q", "7"], tags: ["固定运动", "每周三", "4-6人"], desc: "节奏稳定，先打球后喝水聊天，适合想建立长期运动习惯的人。", joined: false },
  { id: "gallery", title: "周末看展 + 咖啡", animal: "deer", people: ["C", "R", "A"], tags: ["低压", "审美", "周日下午"], desc: "不硬聊，先一起看展，再用一杯咖啡交换各自最喜欢的一件作品。", joined: false },
  { id: "studyroom", title: "论文自习室", animal: "penguin", people: ["P", "Y", "H", "K"], tags: ["番茄钟", "安静陪伴", "线上"], desc: "每天晚上两轮 50 分钟，结束后发一句今日进度。", joined: true },
  { id: "builder", title: "AI 产品共创桌", animal: "fox", people: ["J", "S", "L"], tags: ["项目", "脑暴", "周五晚"], desc: "每次带一个具体产品问题，拆需求、画流程、互相挑战。", joined: false },
  { id: "night", title: "夜聊树洞", animal: "whale", people: ["N", "O", "W"], tags: ["深聊", "慢节奏", "边界友好"], desc: "只在晚上开放，适合不想被建议轰炸、只想被认真听见的人。", joined: false },
  { id: "foodie", title: "新店雷达", animal: "squirrel", people: ["F", "D", "T", "B"], tags: ["探店", "信息共享", "同城"], desc: "收集新店、避雷和隐藏菜单，周末按距离自动成局。", joined: false },
];

const messageThreads = [
  {
    id: "momo",
    name: "Momo",
    animal: "cat",
    preview: "那我们就先看展，咖啡看状态？",
    messages: [
      { role: "them", text: "我看了你发的邀请卡，周六下午的展我也想去。" },
      { role: "me", text: "可以，我比较想低压一点，先看展再决定要不要喝咖啡。" },
      { role: "them", text: "很适合。我也不太喜欢第一次见面排满行程。" },
    ],
    aiTip: "你们都明确表达了边界，可以直接确认集合点和结束时间。破冰可以从“最想看哪一类作品”开始。",
  },
  {
    id: "jay",
    name: "Jay",
    animal: "eagle",
    preview: "周二 19:30 健身房见，先练背？",
    messages: [
      { role: "them", text: "我可以固定二四晚上练，比较适合互相盯动作和打卡。" },
      { role: "me", text: "可以，我想先恢复节奏，不想一开始太猛。" },
      { role: "them", text: "那第一周就 60 分钟，不卷强度。" },
    ],
    aiTip: "这是高目标但低情绪消耗的搭子。建议把频率、取消规则和训练强度先说清楚。",
  },
  {
    id: "studyroom",
    name: "论文自习室",
    animal: "penguin",
    preview: "今晚 8 点两轮番茄钟。",
    messages: [
      { role: "them", text: "今晚 8 点开始，两轮 50 分钟，结束发一句进度。" },
      { role: "me", text: "我今晚写研究方法那部分。" },
      { role: "them", text: "收到，我会开静音房间。" },
    ],
    aiTip: "这个群适合你的“有人陪但不被打扰”的需求。保持进度一句话即可。",
  },
];

const quizQuestions = [
  {
    text: "一个完全自由的周六下午，你更像哪种状态？",
    options: [
      { label: "约人出去，把一天过热闹", animals: ["dog", "otter", "dolphin"] },
      { label: "先自己待一会，再决定要不要见人", animals: ["cat", "owl", "hedgehog"] },
    ],
  },
  {
    text: "新认识的人约你临时改计划，你更在意什么？",
    options: [
      { label: "变化也可以，重点是过程有趣", animals: ["fox", "otter", "squirrel"] },
      { label: "希望提前说清楚，别让我空等", animals: ["penguin", "bear", "eagle"] },
    ],
  },
  {
    text: "你最舒服的搭子关系更像：",
    options: [
      { label: "高频互动，生活里有对方的位置", animals: ["dog", "penguin", "dolphin"] },
      { label: "低频高质量，互相尊重空间", animals: ["cat", "whale", "hedgehog"] },
    ],
  },
  {
    text: "和搭子一起做事时，你通常会：",
    options: [
      { label: "把目标、路线和时间排清楚", animals: ["eagle", "wolf", "penguin"] },
      { label: "看氛围推进，感受比效率重要", animals: ["deer", "alpaca", "whale"] },
    ],
  },
  {
    text: "你更容易被哪种人吸引成为搭子？",
    options: [
      { label: "能打开新体验、信息多、有好奇心", animals: ["fox", "squirrel", "otter"] },
      { label: "稳定、温和、让关系慢慢落地", animals: ["bear", "rabbit", "deer"] },
    ],
  },
  {
    text: "当朋友情绪不好时，你更常见的方式是：",
    options: [
      { label: "主动陪伴，快速回应和接住对方", animals: ["dog", "dolphin", "deer"] },
      { label: "保持安静空间，但会在关键时刻出现", animals: ["cat", "owl", "whale"] },
    ],
  },
];

const state = {
  route: location.hash.replace("#", "") || "today",
  needInput: "周六下午想找一个低压 city walk 搭子，最好能顺路喝咖啡。",
  selectedQuickNeed: "周六下午找人 city walk",
  activeScene: "city",
  generatedNeed: null,
  candidateStatus: {},
  aiMessages: [
    { role: "ai", text: "今天想找什么搭子？你可以直接说一个模糊想法，我来帮你整理成可匹配的邀请卡。" },
    { role: "user", text: "我想周末认识一点同城但不太尴尬的人。" },
    { role: "ai", text: "我先记下：你想要低压、同城、小范围，不喜欢第一次见面太满。适合从 city walk、看展、咖啡这类有外部场景的活动开始。" },
  ],
  memories: {
    soul: ["喜欢轻松但不浅的关系", "希望关系自然发生，不想硬社交"],
    habits: ["周末上午到下午更适合线下活动", "工作日晚上可以健身或线上聊天"],
    needs: ["找同城 city walk / 咖啡搭子", "想认识做 AI 产品的人"],
    boundaries: ["第一次见面不公开住址", "偏好 1v1 或 3-5 人小局"],
  },
  quizIndex: 0,
  quizAnswers: [],
  abtiResult: null,
  selectedThread: "momo",
};

const view = document.getElementById("view");
const titleEl = document.getElementById("pageTitle");

function sprite(animal, className = "") {
  return `<span class="animal-sprite ${className}" data-animal="${animal}"></span>`;
}

function tags(items, tone = "") {
  return items.map((item) => `<span class="tag ${tone}">${item}</span>`).join("");
}

function applySprites() {
  document.querySelectorAll("[data-animal]").forEach((el) => {
    const animal = el.getAttribute("data-animal");
    const pos = animalPositions[animal] || animalPositions.otter;
    el.style.setProperty("--pos-x", pos.x);
    el.style.setProperty("--pos-y", pos.y);
  });
}

function renderNav() {
  const side = document.getElementById("sideNav");
  const bottom = document.getElementById("bottomNav");
  const itemHtml = (item) => `
    <button class="nav-item ${state.route === item.id ? "active" : ""}" data-route="${item.id}">
      <span class="nav-icon">${item.icon}</span>
      <span><strong>${item.label}</strong><small>${item.sub}</small></span>
      ${item.id === "messages" ? '<span class="nav-badge"></span>' : ""}
    </button>
  `;
  side.innerHTML = navItems.map(itemHtml).join("");
  bottom.innerHTML = navItems.slice(0, 5).map(itemHtml).join("");
}

function navigate(route) {
  state.route = route;
  location.hash = route;
  render();
}

function currentScene() {
  return scenes.find((scene) => scene.id === state.activeScene) || scenes[3];
}

function currentNeedTitle() {
  if (state.generatedNeed) return state.generatedNeed.title;
  return state.needInput || state.selectedQuickNeed;
}

function buildInvitation() {
  const scene = currentScene();
  return {
    title: currentNeedTitle(),
    scene,
    time: scene.id === "sports" ? "工作日 19:30" : "周六 15:00",
    place: scene.id === "study" ? "图书馆 / 线上自习室" : "上海 · 可协商",
    mood: scene.id === "project" ? "清晰推进" : scene.id === "emotional" ? "低压深聊" : "轻松不尬",
  };
}

function renderInvitation() {
  const invite = buildInvitation();
  return `
    <div class="invitation">
      <div class="invite-body">
        <strong>${invite.title}</strong>
        <p>AI 已把这个想法整理成可匹配的搭子邀请，优先推荐节奏相近、边界清楚、同城可成局的人。</p>
      </div>
      <div class="invite-meta">
        <span>📍 ${invite.place}</span>
        <span>🕒 ${invite.time}</span>
        <span>🎚️ ${invite.mood}</span>
        <span>👥 1v1 或 3-5人</span>
      </div>
      <div class="tag-row">
        ${tags([invite.scene.title, "边界友好", "AI 已提炼"], invite.scene.tone)}
      </div>
    </div>
  `;
}

function renderCandidate(candidate) {
  const status = state.candidateStatus[candidate.id];
  return `
    <article class="candidate-card">
      <div class="candidate-top">
        <div class="person-row">
          ${sprite(candidate.animal, "medium")}
          <div>
            <h3>${candidate.name}</h3>
            <div class="candidate-meta">${candidate.meta}</div>
          </div>
        </div>
        <div class="score-ring" style="--score:${candidate.score * 3.6}deg"><span>${candidate.score}</span></div>
      </div>
      <p>${candidate.reason}</p>
      <div class="tag-row">${tags(candidate.tags, "mint")}</div>
      <div class="candidate-actions">
        <button class="small-button soft-button" data-like="${candidate.id}">${status === "liked" ? "已想一起试试" : "想一起试试"}</button>
        <button class="small-button" data-skip="${candidate.id}">${status === "skipped" ? "已暂时跳过" : "先跳过"}</button>
      </div>
    </article>
  `;
}

function renderToday() {
  return `
    <div class="section-stack">
      <section class="panel hero-panel">
        <div class="hero-copy">
          <div>
            <p class="eyebrow">WorthMatch V4</p>
            <h2>不是刷人，是让 AI 帮你把想做的事变成一场舒服的小局。</h2>
            <p>输入一个模糊想法，小云会提炼场景、时间、边界和适合的搭子类型。</p>
          </div>
          <div class="need-composer">
            <div class="input-row">
              <input class="need-input" id="needInput" value="${state.needInput}" placeholder="比如：周末想找人看展后喝咖啡">
              <button class="primary-button" data-generate>生成邀请卡</button>
            </div>
            <div class="chip-row">
              ${quickNeeds.map((need) => `<button class="chip ${state.selectedQuickNeed === need ? "active" : ""}" data-quick-need="${need}">${need}</button>`).join("")}
            </div>
          </div>
          <div class="metric-row">
            <div class="metric"><strong>16</strong><span>ABTI 动物类型</span></div>
            <div class="metric"><strong>8</strong><span>核心搭子场景</span></div>
            <div class="metric"><strong>4</strong><span>AI Agent 模块</span></div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="animal-stack">
            ${sprite("otter")}
            ${sprite("cat")}
            ${sprite("eagle")}
            ${sprite("deer")}
          </div>
          <div class="floating-note">ABTI 结果会成为 AI 匹配的第一层语义入口。</div>
        </div>
      </section>

      <div class="view-grid">
        <div class="section-stack">
          <section class="panel">
            <div class="panel-head">
              <div>
                <h2>今日推荐</h2>
                <p>围绕当前邀请卡生成的搭子候选。</p>
              </div>
              <button class="soft-button" data-route="dazi">完整查看</button>
            </div>
            <div class="candidate-grid">
              ${baseCandidates.slice(0, 2).map(renderCandidate).join("")}
            </div>
          </section>

          <section class="panel">
            <div class="panel-head">
              <div>
                <h2>入口全景</h2>
                <p>先把所有可能的主入口摆出来，后续再收敛。</p>
              </div>
            </div>
            <div class="tile-grid">
              ${navItems.slice(1).map((item) => `
                <button class="tile" data-route="${item.id}">
                  <div class="tile-icon">${item.icon}</div>
                  <h3>${item.label}</h3>
                  <p>${item.sub}</p>
                </button>
              `).join("")}
            </div>
          </section>
        </div>

        <aside class="section-stack">
          <section class="panel">
            <div class="panel-head">
              <div>
                <h2>搭子邀请卡</h2>
                <p>每次匹配都围绕一件具体的事。</p>
              </div>
            </div>
            ${renderInvitation()}
          </section>

          <section class="panel">
            <div class="panel-head">
              <div>
                <h2>AI 记忆快照</h2>
                <p>用户被持续“蒸馏”成可匹配信号。</p>
              </div>
            </div>
            ${renderMemoryGrid()}
          </section>
        </aside>
      </div>
    </div>
  `;
}

function renderDazi() {
  return `
    <div class="view-grid">
      <div class="section-stack">
        <section class="panel">
          <div class="panel-head">
            <div>
              <h2>发起一个需求</h2>
              <p>选择场景后，AI 会把它变成可推荐、可聊天、可成局的结构。</p>
            </div>
          </div>
          <div class="need-composer">
            <div class="segmented">
              ${scenes.slice(0, 8).map((scene) => `<button class="seg-button ${state.activeScene === scene.id ? "active" : ""}" data-scene-select="${scene.id}">${scene.icon} ${scene.title.split(" / ")[0]}</button>`).join("")}
            </div>
            <div class="input-row">
              <input class="need-input" id="needInput" value="${state.needInput}">
              <button class="primary-button" data-generate>生成搭子邀请卡</button>
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <div>
              <h2>AI 推荐的搭子</h2>
              <p>每张卡都解释“为什么适合这件事”。</p>
            </div>
            <div class="filter-row">
              <button class="chip active">同城</button>
              <button class="chip">今天可约</button>
              <button class="chip">低压</button>
            </div>
          </div>
          <div class="candidate-grid">
            ${baseCandidates.map(renderCandidate).join("")}
          </div>
        </section>
      </div>

      <aside class="section-stack">
        <section class="panel">
          <div class="panel-head"><h2>当前邀请</h2></div>
          ${renderInvitation()}
        </section>
        <section class="panel">
          <div class="panel-head">
            <div>
              <h2>匹配逻辑</h2>
              <p>V4 的匹配以“场景 + 人”为中心。</p>
            </div>
          </div>
          <div class="task-list">
            <div class="task-row"><span>需求对接</span><strong>42%</strong></div>
            <div class="task-row"><span>节奏相容</span><strong>24%</strong></div>
            <div class="task-row"><span>边界安全</span><strong>18%</strong></div>
            <div class="task-row"><span>共同话题</span><strong>16%</strong></div>
          </div>
        </section>
      </aside>
    </div>
  `;
}

function renderABTI() {
  const complete = state.abtiResult !== null;
  const result = complete ? animals.find((a) => a.id === state.abtiResult) : animals[5];
  return `
    <div class="abti-layout">
      <div class="section-stack">
        <section class="panel">
          <div class="panel-head">
            <div>
              <h2>动物搭子人格测试</h2>
              <p>ABTI 是 V4 的传播入口，也是 AI 建档的第一层材料。</p>
            </div>
            <button class="soft-button" data-quiz-reset>重测</button>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:${complete ? 100 : (state.quizIndex / quizQuestions.length) * 100}%"></div></div>
          ${complete ? renderABTIResult(result) : renderQuizQuestion()}
        </section>

        <section class="panel">
          <div class="panel-head">
            <div>
              <h2>16 个大类</h2>
              <p>每个结果都可以继续被 AI 细分成亚型。</p>
            </div>
          </div>
          <div class="abti-grid">
            ${animals.map((animal) => `
              <div class="abti-animal">
                ${sprite(animal.id, "medium")}
                <strong>${animal.name}</strong>
              </div>
            `).join("")}
          </div>
        </section>
      </div>

      <aside class="section-stack">
        <section class="panel result-card">
          <div class="result-head">
            <div>
              <h2>${result.name}</h2>
              <p class="result-copy">${result.scenes}</p>
            </div>
            ${sprite(result.id, "large")}
          </div>
          <div class="tag-row">${tags(result.keywords, "mint")}</div>
          <div class="task-list">
            <div class="task-row"><span>适合互补</span><strong>${result.match}</strong></div>
            <div class="task-row"><span>推荐入口</span><strong>${result.scenes}</strong></div>
            <div class="task-row"><span>下一步</span><strong>AI 细分亚型</strong></div>
          </div>
          <button class="primary-button" data-route="ai">交给小云继续细分</button>
        </section>
      </aside>
    </div>
  `;
}

function renderQuizQuestion() {
  const question = quizQuestions[state.quizIndex];
  return `
    <div class="quiz-card" style="margin-top:14px">
      <p class="eyebrow">Question ${state.quizIndex + 1} / ${quizQuestions.length}</p>
      <h2>${question.text}</h2>
      <div class="quiz-options">
        ${question.options.map((option, index) => `
          <button class="quiz-option" data-quiz-answer="${index}">
            <strong>${option.label}</strong>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderABTIResult(result) {
  return `
    <div class="quiz-card" style="margin-top:14px">
      <div class="result-head">
        <div>
          <p class="eyebrow">你的 ABTI 结果</p>
          <h2>${result.name}</h2>
          <p class="result-copy">你适合有趣但不失边界的搭子关系，能把普通活动变成轻松的小局。</p>
        </div>
        ${sprite(result.id, "large")}
      </div>
      <div class="tag-row">${tags(result.keywords, "coral")}</div>
    </div>
  `;
}

function renderMemoryGrid() {
  const labels = { soul: "Soul", habits: "Habits", needs: "Needs", boundaries: "Boundaries" };
  return `
    <div class="memory-grid">
      ${Object.entries(state.memories).map(([key, list]) => `
        <div class="memory-card">
          <div class="memory-head">
            <span class="mini-avatar">${key.slice(0, 1).toUpperCase()}</span>
            <h3>${labels[key]}</h3>
          </div>
          <ul>${list.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      `).join("")}
    </div>
  `;
}

function renderAI() {
  return `
    <div class="chat-layout">
      <section class="panel flush chat-window">
        <div class="chat-stream" id="aiStream">
          ${state.aiMessages.map((msg) => `<div class="bubble ${msg.role === "ai" ? "ai" : "user"}">${msg.text}</div>`).join("")}
        </div>
        <div class="chat-box">
          <input class="chat-input" id="aiInput" placeholder="告诉小云一个近况、偏好或想找的搭子">
          <button class="primary-button" data-send-ai>发送</button>
        </div>
      </section>

      <aside class="section-stack">
        <section class="panel">
          <div class="panel-head">
            <div>
              <h2>记忆面板</h2>
              <p>这些信息只在用户自己的窗口内可见。</p>
            </div>
          </div>
          ${renderMemoryGrid()}
        </section>
        <section class="panel">
          <div class="panel-head"><h2>建议问小云</h2></div>
          <div class="chip-row">
            <button class="chip" data-ai-prompt="帮我把周末想见新朋友整理成搭子邀请">整理周末邀请</button>
            <button class="chip" data-ai-prompt="我最近不想高频社交，但想有人一起学习">更新社交边界</button>
            <button class="chip" data-ai-prompt="根据我的 ABTI 结果，推荐适合我的小局">推荐小局</button>
          </div>
        </section>
      </aside>
    </div>
  `;
}

function renderDiscover() {
  return `
    <div class="section-stack">
      <section class="panel">
        <div class="panel-head">
          <div>
            <h2>场景入口</h2>
            <p>先选“要一起做什么”，再找“谁适合一起”。</p>
          </div>
        </div>
        <div class="scene-grid">
          ${scenes.map((scene) => `
            <article class="scene-card">
              <div class="scene-head">
                <div class="scene-icon">${scene.icon}</div>
                <h3>${scene.title}</h3>
              </div>
              <p>${scene.desc}</p>
              <div class="scene-tags">${tags(["可 1v1", "可小群"], scene.tone)}</div>
              <button class="small-button soft-button" data-use-scene="${scene.id}">用这个场景找搭子</button>
            </article>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderCommunities() {
  return `
    <div class="section-stack">
      <section class="panel">
        <div class="panel-head">
          <div>
            <h2>小群 / 小局 / 固定搭子队</h2>
            <p>社群不是大广场，而是围绕具体节奏的小队。</p>
          </div>
        </div>
        <div class="community-grid">
          ${communities.map((group) => `
            <article class="community-card">
              <div class="candidate-top">
                <div class="person-row">
                  ${sprite(group.animal, "small")}
                  <h3>${group.title}</h3>
                </div>
                <div class="people-strip">${group.people.map((p) => `<span class="people-dot">${p}</span>`).join("")}</div>
              </div>
              <p>${group.desc}</p>
              <div class="tag-row">${tags(group.tags, "sky")}</div>
              <button class="small-button ${group.joined ? "" : "soft-button"}" data-community="${group.id}">${group.joined ? "已加入" : "加入小局"}</button>
            </article>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderMessages() {
  const active = messageThreads.find((thread) => thread.id === state.selectedThread) || messageThreads[0];
  return `
    <div class="message-layout">
      <section class="panel">
        <div class="panel-head"><h2>消息</h2></div>
        <div class="message-list">
          ${messageThreads.map((thread) => `
            <button class="message-card ${active.id === thread.id ? "active" : ""}" data-thread="${thread.id}">
              <div class="message-row">
                ${sprite(thread.animal, "small")}
                <div>
                  <h3>${thread.name}</h3>
                  <p>${thread.preview}</p>
                </div>
              </div>
            </button>
          `).join("")}
        </div>
      </section>
      <section class="panel flush chat-window message-pane">
        <div class="chat-stream">
          ${active.messages.map((msg) => `<div class="bubble ${msg.role === "me" ? "user" : "ai"}">${msg.text}</div>`).join("")}
          <div class="bubble ai">小云建议：${active.aiTip}</div>
        </div>
        <div class="chat-box">
          <input class="chat-input" placeholder="输入消息">
          <button class="primary-button" data-toast="Demo 中暂不发送真实消息">发送</button>
        </div>
      </section>
    </div>
  `;
}

function renderProfile() {
  return `
    <div class="profile-grid">
      <section class="panel">
        <div class="panel-head">
          <div>
            <h2>我的展示面</h2>
            <p>照片、ABTI 和介绍都可以控制可见范围。</p>
          </div>
        </div>
        <div class="photo-grid">
          <div class="photo-slot has-photo">${sprite("otter", "medium")}</div>
          <div class="photo-slot has-photo">${sprite("cat", "medium")}</div>
          <div class="photo-slot">+</div>
        </div>
        <p class="profile-note">ABTI：水獭系 · 关键词：快乐、松弛、玩乐、亲近</p>
        <div class="tag-row">${tags(["同城", "AI 产品", "city walk", "低压社交"], "mint")}</div>
      </section>

      <section class="panel">
        <div class="panel-head"><h2>信任与边界</h2></div>
        <div class="trust-list">
          <div class="trust-row"><span>真人认证</span><strong>已完成</strong></div>
          <div class="trust-row"><span>学校 / 公司</span><strong>仅匹配后展示</strong></div>
          <div class="trust-row"><span>第一次见面位置</span><strong>公共场所</strong></div>
          <div class="trust-row"><span>照片可见</span><button class="toggle on" data-toggle></button></div>
          <div class="trust-row"><span>AI 记忆用于匹配</span><button class="toggle on" data-toggle></button></div>
          <div class="trust-row"><span>允许加入小群</span><button class="toggle" data-toggle></button></div>
        </div>
      </section>
    </div>
  `;
}

function render() {
  const item = navItems.find((nav) => nav.id === state.route) || navItems[0];
  state.route = item.id;
  titleEl.textContent = item.title;
  renderNav();
  if (item.id === "today") view.innerHTML = renderToday();
  if (item.id === "dazi") view.innerHTML = renderDazi();
  if (item.id === "abti") view.innerHTML = renderABTI();
  if (item.id === "ai") view.innerHTML = renderAI();
  if (item.id === "discover") view.innerHTML = renderDiscover();
  if (item.id === "communities") view.innerHTML = renderCommunities();
  if (item.id === "messages") view.innerHTML = renderMessages();
  if (item.id === "profile") view.innerHTML = renderProfile();
  applySprites();
}

function calculateABTI() {
  const scores = Object.fromEntries(animals.map((animal) => [animal.id, 0]));
  state.quizAnswers.forEach((answerIndex, questionIndex) => {
    const option = quizQuestions[questionIndex].options[answerIndex];
    option.animals.forEach((animal, rank) => {
      scores[animal] += 3 - rank;
    });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function generateNeed() {
  const input = document.getElementById("needInput");
  if (input) state.needInput = input.value.trim();
  const scene = currentScene();
  state.generatedNeed = {
    title: state.needInput || state.selectedQuickNeed,
    scene: scene.id,
  };
  showToast("小云已生成搭子邀请卡，并刷新候选推荐。");
  render();
}

function sendAIMessage(text) {
  const content = text || document.getElementById("aiInput")?.value.trim();
  if (!content) return;
  state.aiMessages.push({ role: "user", text: content });
  const replyParts = [];
  if (content.includes("学习") || content.includes("自习")) {
    state.memories.needs.unshift("希望有人一起学习但不打扰");
    replyParts.push("学习场景更像企鹅系/猫头鹰系：安静陪伴、明确时段、结束后轻量复盘。");
  }
  if (content.includes("周末") || content.includes("新朋友")) {
    state.memories.needs.unshift("周末想用低压活动认识新朋友");
    replyParts.push("周末认识新朋友适合从外部场景开局，比如 city walk、看展、咖啡。");
  }
  if (content.includes("边界") || content.includes("高频")) {
    state.memories.boundaries.unshift("近期不想高频社交");
    replyParts.push("我会把你的边界标成“低频高质量”，减少高黏性搭子，增加固定低频小局。");
  }
  const reply = replyParts.length
    ? replyParts.join(" ")
    : "我记下了。这个信息会影响之后的搭子推荐：我会优先找节奏相近、边界匹配、能把这件事落地的人。";
  state.aiMessages.push({ role: "ai", text: reply });
  render();
}

function showToast(text) {
  const old = document.querySelector(".toast");
  if (old) old.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = text;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2200);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target) return;

  const route = target.getAttribute("data-route");
  if (route) {
    event.preventDefault();
    navigate(route);
    return;
  }

  const quickNeed = target.getAttribute("data-quick-need");
  if (quickNeed) {
    state.selectedQuickNeed = quickNeed;
    state.needInput = quickNeed;
    render();
    return;
  }

  const sceneSelect = target.getAttribute("data-scene-select");
  if (sceneSelect) {
    state.activeScene = sceneSelect;
    render();
    return;
  }

  const useScene = target.getAttribute("data-use-scene");
  if (useScene) {
    const scene = scenes.find((s) => s.id === useScene);
    state.activeScene = useScene;
    state.needInput = `想找一个${scene.title}搭子，节奏轻松一点。`;
    navigate("dazi");
    return;
  }

  if (target.hasAttribute("data-generate")) {
    generateNeed();
    return;
  }

  const like = target.getAttribute("data-like");
  if (like) {
    state.candidateStatus[like] = "liked";
    showToast("已标记为想一起试试，AI 会准备破冰话题。");
    render();
    return;
  }

  const skip = target.getAttribute("data-skip");
  if (skip) {
    state.candidateStatus[skip] = "skipped";
    showToast("已暂时跳过，推荐会减少相似节奏。");
    render();
    return;
  }

  const quizAnswer = target.getAttribute("data-quiz-answer");
  if (quizAnswer !== null) {
    state.quizAnswers[state.quizIndex] = Number(quizAnswer);
    if (state.quizIndex < quizQuestions.length - 1) {
      state.quizIndex += 1;
    } else {
      state.abtiResult = calculateABTI();
      const result = animals.find((animal) => animal.id === state.abtiResult);
      state.memories.soul.unshift(`ABTI：${result.name}`);
    }
    render();
    return;
  }

  if (target.hasAttribute("data-quiz-reset")) {
    state.quizIndex = 0;
    state.quizAnswers = [];
    state.abtiResult = null;
    render();
    return;
  }

  const aiPrompt = target.getAttribute("data-ai-prompt");
  if (aiPrompt) {
    sendAIMessage(aiPrompt);
    return;
  }

  if (target.hasAttribute("data-send-ai")) {
    sendAIMessage();
    return;
  }

  const community = target.getAttribute("data-community");
  if (community) {
    const group = communities.find((item) => item.id === community);
    group.joined = !group.joined;
    showToast(group.joined ? "已加入小局，群 Agent 会同步活动安排。" : "已退出小局。");
    render();
    return;
  }

  const thread = target.getAttribute("data-thread");
  if (thread) {
    state.selectedThread = thread;
    render();
    return;
  }

  if (target.hasAttribute("data-toggle")) {
    target.classList.toggle("on");
    return;
  }

  const toast = target.getAttribute("data-toast");
  if (toast) showToast(toast);
});

document.addEventListener("input", (event) => {
  if (event.target.id === "needInput") state.needInput = event.target.value;
});

window.addEventListener("hashchange", () => {
  const route = location.hash.replace("#", "");
  if (route && route !== state.route) {
    state.route = route;
    render();
  }
});

render();
