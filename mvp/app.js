const state = {
  questionBank: null,
  prototypes: null,
  questions: [],
  index: 0,
  answers: {},
  revisitedQuestionIds: new Set(),
};

const STORAGE_KEY = "worthmatch-abti-mvp-answers";
const ASSET_VERSION = "animals_v2";
const QUESTION_SCENE_VERSION = "question_scenes_v2";

const resultCopy = {
  dog: "你很擅长把关系养热，愿意回应、陪伴和一起行动。别人和你相处时容易感到被接住。",
  cat: "你不是不需要人，而是更在意舒服的距离。你适合低频但高质量、彼此尊重空间的搭子关系。",
  deer: "你对氛围和细节很敏感，适合温柔、低压、安全感明确的搭子关系。",
  fox: "你聪明、敏锐，也喜欢有变化的场景。你适合有脑力、有分寸、有探索感的搭子。",
  bear: "你给人的感觉稳定、踏实、靠得住。你适合长期、可预期、能把日常过好的搭子关系。",
  otter: "你擅长把普通日常变得好玩。你适合轻松、亲近、有玩乐感的搭子关系。",
  dolphin: "你很会连接人，也能让气氛变顺。你适合社群活动、聊天陪伴和多人场景。",
  eagle: "你目标感强，喜欢清晰、高效、有推进感的关系。你适合学习、健身、项目类搭子。",
  wolf: "你重视小队感和忠诚度。你适合固定搭子、项目小队和认真投入的长期关系。",
  rabbit: "你轻盈、谨慎，也很需要安全感。你适合从低压力场景慢慢建立信任。",
  penguin: "你喜欢稳定结伴和某种仪式感。你适合固定频率、长期打卡、一起过日常的搭子。",
  owl: "你偏思考型，喜欢有内容密度的交流。你适合读书、学习、深夜聊天和观影讨论。",
  whale: "你的内在世界很大，情绪层次深。你适合慢慢建立的深度信任和疗愈型陪伴。",
  alpaca: "你有松弛感，也有一点怪可爱的自我节奏。你适合不用端着、低压力的搭子关系。",
  squirrel: "你好奇、灵活，喜欢收集信息和发现新东西。你适合探店、资料共享、城市探索。",
  hedgehog: "你有保护壳，但熟了之后很柔软。你适合尊重边界、稳定不过度打扰的搭子关系。",
};

const buddyMatchCopy = {
  dog: {
    best: ["otter", "penguin", "deer"],
    reason: "你适合能接住热情、愿意稳定互动，也不会把陪伴变成压力的人。",
  },
  cat: {
    best: ["owl", "hedgehog", "otter"],
    reason: "你适合尊重边界、交流有内容，又能在熟起来后带一点轻松感的人。",
  },
  deer: {
    best: ["bear", "whale", "dog"],
    reason: "你适合温柔稳定、回应明确，能让你慢慢放松下来的人。",
  },
  fox: {
    best: ["squirrel", "owl", "dolphin"],
    reason: "你适合反应快、有好奇心，能一起观察、拆解和探索新鲜事的人。",
  },
  bear: {
    best: ["deer", "penguin", "eagle"],
    reason: "你适合珍惜稳定关系、行动可靠，也能一起把计划落地的人。",
  },
  otter: {
    best: ["dog", "alpaca", "cat"],
    reason: "你适合能一起玩起来、接受即兴，也懂得给彼此留舒适空间的人。",
  },
  dolphin: {
    best: ["fox", "deer", "wolf"],
    reason: "你适合愿意交流、能参与群体氛围，也能在关键时刻认真投入的人。",
  },
  eagle: {
    best: ["wolf", "bear", "squirrel"],
    reason: "你适合目标清楚、节奏可靠，能一起推进学习、运动或项目的人。",
  },
  wolf: {
    best: ["eagle", "dolphin", "penguin"],
    reason: "你适合重视小队感、说到做到，也愿意长期配合的人。",
  },
  rabbit: {
    best: ["deer", "hedgehog", "alpaca"],
    reason: "你适合低压力、慢慢熟，既温柔又不会突然打乱你节奏的人。",
  },
  penguin: {
    best: ["bear", "dog", "wolf"],
    reason: "你适合固定频率见面、能一起打卡，也能把日常变得有仪式感的人。",
  },
  owl: {
    best: ["cat", "fox", "whale"],
    reason: "你适合能深入聊天、尊重思考时间，也愿意交换观点的人。",
  },
  whale: {
    best: ["deer", "owl", "hedgehog"],
    reason: "你适合情绪细腻、交流有深度，并且能长期建立信任的人。",
  },
  alpaca: {
    best: ["otter", "rabbit", "squirrel"],
    reason: "你适合松弛、不端着，能接受一点跳脱节奏的人。",
  },
  squirrel: {
    best: ["fox", "eagle", "alpaca"],
    reason: "你适合信息敏锐、行动灵活，能一起发现新店、新路线和新玩法的人。",
  },
  hedgehog: {
    best: ["cat", "rabbit", "whale"],
    reason: "你适合边界感清楚、不会过度打扰，但熟了之后能认真陪伴的人。",
  },
};

const dimensionAxis = {
  D1: ["独处充电", "人群充电"],
  D2: ["慢热观察", "主动靠近"],
  D3: ["空间清晰", "高度共享"],
  D4: ["计划确定", "即兴探索"],
  D5: ["内收克制", "外放表达"],
  D6: ["稳定熟悉", "新奇变化"],
  D7: ["感受优先", "目标推进"],
  D8: ["小圈深连", "广泛连接"],
};

const dimensionMascots = {
  D1: ["cat", "thinking"],
  D2: ["hedgehog", "thinking"],
  D3: ["cat", "hero"],
  D4: ["fox", "active"],
  D5: ["whale", "thinking"],
  D6: ["squirrel", "active"],
  D7: ["eagle", "thinking"],
  D8: ["dolphin", "happy"],
};

const sceneMascots = {
  food: ["otter", "happy"],
  study: ["owl", "thinking"],
  sports: ["wolf", "active"],
  city_explore: ["fox", "active"],
  gaming: ["penguin", "happy"],
  culture: ["cat", "hero"],
  project: ["eagle", "thinking"],
  emotional: ["deer", "hero"],
};

const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    const [questionBank, prototypes] = await Promise.all([
      fetchJson("../question_bank_v0_2.json"),
      fetchJson("../animal_prototypes_v0_2.json"),
    ]);

    state.questionBank = questionBank;
    state.prototypes = prototypes;
    state.questions = buildQuestionFlow(questionBank);

    $("startButton").addEventListener("click", () => startTest(false));
    $("resumeButton").addEventListener("click", () => startTest(true));
    $("resetButton").addEventListener("click", resetTest);
    $("restartButton").addEventListener("click", resetTest);
    $("shareButton").addEventListener("click", createShareCard);

    prepareStaticImages();

    const saved = readSavedAnswers();
    $("resumeButton").style.display = Object.keys(saved).length ? "inline-flex" : "none";

    if (new URLSearchParams(window.location.search).has("demo")) {
      state.answers = demoAnswers();
      renderResult();
    }
  } catch (error) {
    renderBootError(error);
  }
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} 加载失败：${response.status}`);
  }
  return response.json();
}

function renderBootError(error) {
  $("startView").innerHTML = `
    <div class="question-card">
      <p class="eyebrow">WorthMatch ABTI</p>
      <h1>本地资源没有加载成功</h1>
      <p class="lead">请用本地服务打开：<br />http://127.0.0.1:8765/mvp/</p>
      <p class="lead">${String(error.message || error)}</p>
    </div>
  `;
}

function prepareStaticImages() {
  document.querySelectorAll("img[src]").forEach((image) => {
    image.decoding = "async";
    image.addEventListener("error", () => {
      image.src = assetPath("dog", "hero");
    });
  });
}

function buildQuestionFlow(questionBank) {
  return [
    ...questionBank.coreQuestions.map((question) => ({ ...question, type: "core" })),
    ...questionBank.sceneQuestions.map((question) => ({ ...question, type: "scene" })),
  ];
}

function startTest(resume) {
  state.answers = resume ? readSavedAnswers() : {};
  state.revisitedQuestionIds = new Set();
  state.index = resume ? firstUnansweredIndex() : 0;
  showView("testView");
  renderQuestion({ scrollMode: "top" });
}

function showView(viewId) {
  for (const id of ["startView", "testView", "resultView"]) {
    $(id).classList.toggle("hidden", id !== viewId);
  }
}

function readSavedAnswers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveAnswers() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.answers));
}

function firstUnansweredIndex() {
  const index = state.questions.findIndex((question) => state.answers[question.id] === undefined);
  return index === -1 ? state.questions.length - 1 : index;
}

function renderQuestion({ scrollMode = "keep" } = {}) {
  const question = state.questions[state.index];
  const progress = (state.index + 1) / state.questions.length;
  $("progressText").textContent = `${state.index + 1} / ${state.questions.length}`;
  $("sectionText").textContent = sectionLabel(question.type);
  $("progressBar").style.width = `${Math.round(progress * 100)}%`;

  setQuestionScene($("questionMascot"), question.id);

  if (question.type === "core") renderCoreQuestion(question);
  if (question.type === "scene") renderSceneQuestion(question);
  adjustQuestionScroll(scrollMode);
}

function adjustQuestionScroll(mode) {
  if (mode === "top") {
    window.scrollTo(0, 0);
    return;
  }
  if (mode !== "question") return;
  if (window.matchMedia("(min-width: 881px)").matches) {
    window.scrollTo(0, 0);
    return;
  }

  const card = $("questionCard");
  const top = card.getBoundingClientRect().top + window.scrollY - 18;
  window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
}

function sectionLabel(type) {
  if (type === "core") return "核心量表";
  if (type === "scene") return "搭子场景";
  return "关系方式";
}

function renderCoreQuestion(question) {
  $("questionCard").innerHTML = `
    <div class="question-type">双陈述选择</div>
    <h2 class="question-title">哪边更像你？</h2>
    <div class="ab-statements">
      <div class="statement"><strong>A</strong>${question.a}</div>
      <div class="statement"><strong>B</strong>${question.b}</div>
    </div>
    <div class="scale-row">
      ${state.questionBank.scaleOptions
        .map(
          (option) => `
            <button class="scale-button ${state.answers[question.id] === option.value ? "selected" : ""}"
              type="button" data-value="${option.value}">${option.label}</button>
          `
        )
        .join("")}
    </div>
    ${renderQuestionFooter(question)}
  `;

  for (const button of document.querySelectorAll(".scale-button")) {
    button.addEventListener("click", () => answerQuestion(question.id, Number(button.dataset.value)));
  }
  bindNextButton(question);
}

function renderSceneQuestion(question) {
  $("questionCard").innerHTML = `
    <div class="question-type">场景偏好</div>
    <h2 class="question-title">${question.question}</h2>
    <div class="choice-grid">
      ${question.options
        .map(
          (option, index) => `
            <button class="choice-button ${state.answers[question.id] === index ? "selected" : ""}"
              type="button" data-value="${index}">${option.label}</button>
          `
        )
        .join("")}
    </div>
    ${renderQuestionFooter(question)}
  `;

  for (const button of document.querySelectorAll(".choice-button")) {
    button.addEventListener("click", () => answerQuestion(question.id, Number(button.dataset.value)));
  }
  bindNextButton(question);
}

function renderQuestionFooter(question) {
  const answered = state.answers[question.id] !== undefined;
  const isLast = state.index === state.questions.length - 1;
  return `
    <div class="question-footer">
      <button id="prevQuestionButton" class="prev-question-button" type="button" ${state.index === 0 ? "disabled" : ""}>
        上一题
      </button>
      <span>${answered ? "已选择，可修改" : "选择后会自动进入下一题"}</span>
      <button id="nextQuestionButton" class="next-question-button" type="button" ${answered ? "" : "disabled"}>
        ${isLast ? "查看结果" : "下一题"}
      </button>
    </div>
  `;
}

function bindNextButton(question) {
  $("prevQuestionButton").addEventListener("click", goBack);
  $("nextQuestionButton").addEventListener("click", () => {
    if (state.answers[question.id] === undefined) return;
    goNext();
  });
}

function answerQuestion(id, value) {
  const wasAnswered = state.answers[id] !== undefined;
  const revisiting = wasAnswered || state.revisitedQuestionIds.has(id);
  state.answers[id] = value;
  saveAnswers();

  if (revisiting) {
    renderQuestion();
    return;
  }

  goNext();
}

function goNext() {
  if (state.index < state.questions.length - 1) {
    state.index += 1;
    renderQuestion({ scrollMode: "question" });
  } else {
    renderResult();
  }
}

function goBack() {
  if (state.index > 0) {
    state.index -= 1;
    state.revisitedQuestionIds.add(state.questions[state.index].id);
    renderQuestion({ scrollMode: "question" });
  } else {
    showView("startView");
  }
}

function resetTest() {
  state.answers = {};
  state.index = 0;
  state.revisitedQuestionIds = new Set();
  localStorage.removeItem(STORAGE_KEY);
  showView("startView");
  $("resumeButton").style.display = "none";
}

function renderResult() {
  const result = scoreResponses(state.answers);
  showView("resultView");
  window.scrollTo(0, 0);

  const main = result.mainAnimal;
  const secondaries = result.secondaryAnimals;
  $("resultTitle").textContent = `${main.name}主调`;
  $("resultSubtitle").textContent = `${resultCopy[main.id]}${secondaryText(secondaries)}`;
  setAnimalImage($("mainAnimalImage"), main.id, "hero", main.name);

  $("resultKeywords").innerHTML = main.keywords.map((keyword) => `<span class="chip">${keyword}</span>`).join("");

  $("animalWeights").innerHTML = result.animalDistribution
    .slice(0, 3)
    .map(
      (animal) => `
        <div class="weight-item">
          <img src="${assetPath(animal.id, "mini")}" alt="" />
          <div>
            <strong>${animal.name}</strong>
            <div class="bar-track"><div class="bar-fill" style="width:${Math.max(6, animal.score)}%"></div></div>
          </div>
          <strong>${animal.score}%</strong>
        </div>
      `
    )
    .join("");

  $("sceneList").innerHTML = result.topScenes.length
    ? result.topScenes
        .map((scene) => `<span class="scene-chip">${state.questionBank.sceneTags[scene.id] || scene.id}</span>`)
        .join("")
    : `<span class="scene-chip">还需要更多场景答案</span>`;

  const matches = bestBuddyMatches(main.id);
  $("matchList").innerHTML = `
    <div class="match-card-row">
      ${matches.best
        .map(
          (animal) => `
            <div class="match-card">
              <img src="${assetPath(animal.id, "mini")}" alt="" />
              <strong>${animal.name}</strong>
            </div>
          `
        )
        .join("")}
    </div>
    <p>${matches.reason}</p>
  `;

  $("traitBars").innerHTML = state.prototypes.dimensionOrder
    .map((dimension) => {
      const value = result.traitVector[dimension];
      const percent = ((value + 2) / 4) * 100;
      return `
        <div class="trait-row">
          <span>${state.questionBank.dimensions[dimension]}</span>
          <div class="bar-track" title="${dimensionAxis[dimension][0]} - ${dimensionAxis[dimension][1]}">
            <div class="bar-fill" style="width:${percent}%"></div>
          </div>
          <span>${value.toFixed(1)}</span>
        </div>
      `;
    })
    .join("");

  const confidencePercent = Math.round(result.metrics.confidence * 100);
  $("confidenceBlock").innerHTML = `
    <div class="confidence-meter" style="--confidence:${confidencePercent}%">${confidencePercent}%</div>
    <p>${result.metrics.needsSupplemental ? "你的结果接近多个类型，后续适合追加 4-8 道补题来定型。" : "这次答案内部一致性较好，主类型和副倾向区分比较清楚。"}</p>
  `;
}

function secondaryText(secondaries) {
  if (!secondaries.length) return "";
  const names = secondaries.map((animal) => animal.name).join("、");
  return ` 你还带一点${names}气质。`;
}

function bestBuddyMatches(animalId) {
  const config = buddyMatchCopy[animalId] || {
    best: [],
    reason: "你适合和节奏清楚、相处舒服的人一起玩。",
  };
  const byId = Object.fromEntries(state.prototypes.animals.map((animal) => [animal.id, animal]));
  const best = config.best.map((id) => byId[id]).filter(Boolean).slice(0, 3);
  return { best, reason: config.reason };
}

function assetPath(animal, pose) {
  return new URL(`../assets/${ASSET_VERSION}/transparent/${animal}/${animal}_${pose}_transparent.png`, window.location.href).href;
}

function questionScenePath(questionId) {
  return new URL(`../assets/${QUESTION_SCENE_VERSION}/transparent/${questionId}_transparent.png`, window.location.href).href;
}

function setAnimalImage(image, animal, pose, alt = "") {
  image.alt = alt;
  image.decoding = "async";
  image.loading = "eager";
  image.onerror = () => {
    image.onerror = null;
    image.src = assetPath("dog", "hero");
  };
  image.src = assetPath(animal, pose);
}

function setQuestionScene(image, questionId) {
  image.alt = "";
  image.decoding = "async";
  image.loading = "eager";
  image.onerror = () => {
    image.onerror = null;
    const question = state.questions[state.index];
    const fallback = selectQuestionMascot(question);
    image.src = assetPath(fallback[0], fallback[1]);
  };
  image.src = questionScenePath(questionId);
}

function selectQuestionMascot(question) {
  if (question.type === "core") {
    const primaryDimension = question.impacts?.[0]?.dimension;
    return dimensionMascots[primaryDimension] || ["owl", "thinking"];
  }
  if (question.type === "scene") {
    const firstTag = question.options?.[0]?.tags?.[0];
    return sceneMascots[firstTag] || ["otter", "happy"];
  }
  return ["owl", "thinking"];
}

function scoreResponses(responses) {
  const core = scoreCoreQuestions(responses);
  const traitVector = core.traitVector;
  const scenes = scoreScenes(responses);
  const rankedAnimals = rankAnimals(traitVector);
  const p1 = rankedAnimals[0]?.probability || 0;
  const p2 = rankedAnimals[1]?.probability || 0;
  const dominance = clamp((p1 - p2) / 0.16, 0, 1);
  const consistency = calculateConsistency(core.itemSignals);
  const completion =
    (core.answeredCoreQuestions + scenes.answeredSceneQuestions) / state.questions.length;
  const dimensionStability = calculateDimensionStability(core.support);
  const confidence = 0.35 * dominance + 0.25 * consistency + 0.2 * completion + 0.2 * dimensionStability;

  return {
    mainAnimal: rankedAnimals[0],
    secondaryAnimals: rankedAnimals.slice(1, p1 - p2 < 0.08 ? 3 : 2),
    animalDistribution: rankedAnimals.map((animal) => ({
      id: animal.id,
      name: animal.name,
      probability: round(animal.probability, 4),
      score: Math.round(animal.probability * 100),
      distance: round(animal.distance, 4),
    })),
    traitVector: Object.fromEntries(Object.entries(traitVector).map(([dimension, value]) => [dimension, round(value, 3)])),
    sceneVector: scenes.sceneVector,
    topScenes: scenes.topScenes,
    metrics: {
      confidence: round(confidence, 3),
      dominance: round(dominance, 3),
      consistency: round(consistency, 3),
      completion: round(completion, 3),
      dimensionStability: round(dimensionStability, 3),
      needsSupplemental: p1 - p2 < 0.06 || p1 < 0.18 || consistency < 0.62 || confidence < 0.58,
    },
  };
}

function scoreCoreQuestions(responses) {
  const sums = Object.fromEntries(state.prototypes.dimensionOrder.map((dimension) => [dimension, 0]));
  const maxWeights = Object.fromEntries(state.prototypes.dimensionOrder.map((dimension) => [dimension, 0]));
  const itemSignals = Object.fromEntries(state.prototypes.dimensionOrder.map((dimension) => [dimension, []]));
  const support = Object.fromEntries(state.prototypes.dimensionOrder.map((dimension) => [dimension, 0]));
  let answered = 0;

  for (const question of state.questionBank.coreQuestions) {
    const response = normalizeResponse(responses[question.id]);
    if (response === null) continue;
    answered += 1;

    for (const impact of question.impacts) {
      const sideValue = response < 0 ? impact.a : impact.b;
      const strength = Math.abs(response) / 2;
      const itemWeight = question.discrimination * impact.weight;
      sums[impact.dimension] += sideValue * strength * itemWeight;
      maxWeights[impact.dimension] += itemWeight;
      support[impact.dimension] += impact.weight;
      itemSignals[impact.dimension].push(response === 0 ? 0 : sideValue * strength * 2);
    }
  }

  const traitVector = {};
  for (const dimension of state.prototypes.dimensionOrder) {
    traitVector[dimension] = maxWeights[dimension] > 0 ? clamp((2 * sums[dimension]) / maxWeights[dimension], -2, 2) : 0;
  }

  return { traitVector, itemSignals, support, answeredCoreQuestions: answered };
}

function scoreScenes(responses) {
  const sceneVector = Object.fromEntries(Object.keys(state.questionBank.sceneTags).map((tag) => [tag, 0]));
  let answered = 0;
  for (const question of state.questionBank.sceneQuestions) {
    const selected = question.options[responses[question.id]];
    if (!selected) continue;
    answered += 1;
    for (const tag of selected.tags) {
      sceneVector[tag] = (sceneVector[tag] || 0) + 1;
    }
  }
  const topScenes = Object.entries(sceneVector)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, score]) => ({ id, score }));
  return { sceneVector, topScenes, answeredSceneQuestions: answered };
}

function rankAnimals(traitVector) {
  const rawScores = state.prototypes.animals.map((animal) => {
    const distance = Math.sqrt(
      state.prototypes.dimensionOrder.reduce((sum, dimension) => {
        const weight = state.prototypes.dimensionWeights[dimension] || 1;
        return sum + weight * (traitVector[dimension] - animal.vector[dimension]) ** 2;
      }, 0)
    );
    return {
      id: animal.id,
      name: animal.name,
      keywords: animal.keywords,
      complements: animal.complements,
      distance,
      raw: -distance / state.prototypes.temperature,
    };
  });
  return softmax(rawScores);
}

function softmax(rawScores) {
  const maxRaw = Math.max(...rawScores.map((item) => item.raw));
  const scores = rawScores.map((item) => ({ ...item, exp: Math.exp(item.raw - maxRaw) }));
  const total = scores.reduce((sum, item) => sum + item.exp, 0);
  return scores
    .map(({ exp, ...item }) => ({ ...item, probability: exp / total }))
    .sort((a, b) => b.probability - a.probability);
}

function calculateConsistency(itemSignals) {
  return mean(
    state.prototypes.dimensionOrder.map((dimension) => {
      const signals = itemSignals[dimension];
      if (signals.length < 2) return 0.65;
      return clamp(1 - standardDeviation(signals) / 2, 0, 1);
    })
  );
}

function calculateDimensionStability(support) {
  return mean(state.prototypes.dimensionOrder.map((dimension) => clamp(support[dimension] / 3, 0, 1)));
}

async function createShareCard() {
  const result = scoreResponses(state.answers);
  const matches = bestBuddyMatches(result.mainAnimal.id);
  const lines = [
    `我是 ${result.mainAnimal.name}主调`,
    result.secondaryAnimals.length ? `还带一点 ${result.secondaryAnimals.map((animal) => animal.name).join(" / ")}` : "",
    `适合：${result.topScenes.map((scene) => state.questionBank.sceneTags[scene.id]).join("、")}`,
    `适合一起玩：${matches.best.map((animal) => animal.name).join("、")}`,
  ].filter(Boolean);
  navigator.clipboard?.writeText(lines.join("\n"));

  await drawShareCard(result);
  $("shareCardPanel").classList.remove("hidden");
  $("shareButton").textContent = "分享卡已生成";
  setTimeout(() => {
    $("shareButton").textContent = "生成分享卡";
  }, 1600);
}

async function drawShareCard(result) {
  const canvas = $("shareCanvas");
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#fffaf2");
  gradient.addColorStop(0.52, "#f3efff");
  gradient.addColorStop(1, "#eef9ff");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.fillStyle = "rgba(255,255,255,0.76)";
  roundRect(context, 70, 74, width - 140, height - 148, 34);
  context.fill();

  context.fillStyle = "#8d78e6";
  context.font = "800 34px system-ui, sans-serif";
  context.fillText("WORTHMATCH ABTI", 118, 154);

  context.fillStyle = "#262033";
  context.font = "900 88px system-ui, sans-serif";
  context.fillText(`${result.mainAnimal.name}主调`, 116, 260);

  context.fillStyle = "#756d85";
  context.font = "500 34px system-ui, sans-serif";
  wrapText(context, resultCopy[result.mainAnimal.id], 118, 330, 840, 48, 4);

  const image = await loadImage(assetPath(result.mainAnimal.id, "happy"));
  const imageBox = fitImage(image, 140, 525, 800, 540);
  context.drawImage(image, imageBox.x, imageBox.y, imageBox.width, imageBox.height);

  context.fillStyle = "#262033";
  context.font = "800 38px system-ui, sans-serif";
  context.fillText("适合找的搭子", 118, 1140);

  let x = 118;
  let y = 1192;
  for (const scene of result.topScenes.slice(0, 3)) {
    const label = state.questionBank.sceneTags[scene.id] || scene.id;
    context.font = "700 28px system-ui, sans-serif";
    const chipWidth = Math.min(360, context.measureText(label).width + 44);
    context.fillStyle = "#ffffff";
    roundRect(context, x, y, chipWidth, 58, 29);
    context.fill();
    context.fillStyle = "#5f5670";
    context.fillText(label, x + 22, y + 38);
    x += chipWidth + 14;
    if (x > 720) {
      x = 118;
      y += 72;
    }
  }

  const matches = bestBuddyMatches(result.mainAnimal.id);
  context.fillStyle = "#262033";
  context.font = "800 34px system-ui, sans-serif";
  context.fillText("适合一起玩的类型", 118, 1292);

  x = 118;
  y = 1330;
  for (const animal of matches.best) {
    const label = animal.name;
    context.font = "700 25px system-ui, sans-serif";
    const chipWidth = Math.min(260, context.measureText(label).width + 40);
    context.fillStyle = "#ffffff";
    roundRect(context, x, y, chipWidth, 50, 25);
    context.fill();
    context.fillStyle = "#5f5670";
    context.fillText(label, x + 20, y + 33);
    x += chipWidth + 12;
  }

  context.fillStyle = "#756d85";
  context.font = "600 24px system-ui, sans-serif";
  context.fillText("测出你的 Animal Buddy Type", 118, 1400);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function fitImage(image, x, y, maxWidth, maxHeight) {
  const scale = Math.min(maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  return {
    x: x + (maxWidth - width) / 2,
    y: y + (maxHeight - height) / 2,
    width,
    height,
  };
}

function wrapText(context, text, x, y, maxWidth, lineHeight, maxLines) {
  let line = "";
  let lines = 0;
  for (const char of text) {
    const nextLine = line + char;
    if (context.measureText(nextLine).width > maxWidth && line) {
      context.fillText(line, x, y);
      line = char;
      y += lineHeight;
      lines += 1;
      if (lines >= maxLines - 1) break;
    } else {
      line = nextLine;
    }
  }
  if (line && lines < maxLines) context.fillText(line, x, y);
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function demoAnswers() {
  return {
    Q01: 1,
    Q02: 2,
    Q03: 1,
    Q04: 2,
    Q05: 1,
    Q06: 1,
    Q07: 1,
    Q08: 1,
    Q09: 0,
    Q10: 1,
    Q11: 1,
    Q12: 1,
    Q13: 2,
    Q14: 2,
    Q15: 1,
    Q16: 1,
    Q17: 1,
    Q18: 2,
    Q19: -1,
    Q20: -1,
    Q21: -1,
    Q22: 1,
    Q23: 1,
    Q24: 1,
    Q25: 0,
    Q26: 2,
    Q27: 3,
    Q28: 3,
    Q29: 3,
    Q30: 3,
  };
}

function normalizeResponse(value) {
  return [-2, -1, 0, 1, 2].includes(value) ? value : null;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function mean(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function standardDeviation(values) {
  const average = mean(values);
  return Math.sqrt(mean(values.map((value) => (value - average) ** 2)));
}

function round(value, digits) {
  return Number(value.toFixed(digits));
}
