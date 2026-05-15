(function () {
  const QUESTIONS = window.UPSC_QUESTIONS || [];
  const STORAGE_KEY = "upsc-prelims-drill-progress-v1";
  const TARGET_DATE = new Date("2026-05-24T09:30:00+05:30");
  const SCORE_CORRECT = 2;
  const SCORE_WRONG = -2 / 3;

  const plan = [
    {
      date: "15 May",
      day: "D-9",
      title: "Baseline and error map",
      tasks: [
        "Attempt 50 mixed GS questions in two timed blocks.",
        "Mark every wrong answer as fact gap, concept gap or option trap.",
        "Revise only the errors and the adjacent syllabus point."
      ]
    },
    {
      date: "16 May",
      day: "D-8",
      title: "Polity plus economy traps",
      tasks: [
        "Do 80 statement-based questions from Polity and Economy.",
        "Revise constitutional bodies, Parliament, RBI tools, Budget and external sector.",
        "Write one-line elimination reason for every guessed answer."
      ]
    },
    {
      date: "17 May",
      day: "D-7",
      title: "Environment and maps",
      tasks: [
        "Practice protected areas, conventions, species-habitat and climate mechanisms.",
        "Revise Indian map: rivers, wetlands, tiger reserves, coasts and passes.",
        "Make a list of 30 current-linked environment terms."
      ]
    },
    {
      date: "18 May",
      day: "D-6",
      title: "History and culture compression",
      tasks: [
        "Revise Buddhism, Jainism, temple styles, literature, Bhakti-Sufi and modern timelines.",
        "Practice pair-matching and incorrect-pair formats.",
        "Stop deep reading; make only recall sheets."
      ]
    },
    {
      date: "19 May",
      day: "D-5",
      title: "Geography, agriculture, science",
      tasks: [
        "Cover monsoon, soils, crops, minerals, ocean currents and Himalayan landforms.",
        "Practice semiconductors, space, biotech, AI, batteries and quantum basics.",
        "Revise diagrams and process chains, not textbook paragraphs."
      ]
    },
    {
      date: "20 May",
      day: "D-4",
      title: "Full mock and CSAT check",
      tasks: [
        "Take one 100-question GS mock in exam timing.",
        "Do one CSAT qualifying block; do not let CSAT become the hidden risk.",
        "Analyse wrong answers by option pattern before revising facts."
      ]
    },
    {
      date: "21 May",
      day: "D-3",
      title: "Current-linked static revision",
      tasks: [
        "Revise news-to-static themes: climate, trade, digital public infrastructure, schemes, defence, space.",
        "Do high-confidence attempt practice: decide which 15 questions to leave.",
        "Repair only repeated weak topics from the app review log."
      ]
    },
    {
      date: "22 May",
      day: "D-2",
      title: "Second full mock",
      tasks: [
        "Take one final full GS mock; target calm attempt discipline, not maximum attempts.",
        "Freeze your attempt band based on score: usually 80-88 if accuracy is stable.",
        "Revise incorrect questions and volatile facts."
      ]
    },
    {
      date: "23 May",
      day: "D-1",
      title: "Light recall only",
      tasks: [
        "No new sources and no panic test-series binge.",
        "Revise error notebook, maps, constitutional articles, reports, schemes and environment conventions.",
        "Sleep properly; exam-day decision quality is now the biggest multiplier."
      ]
    },
    {
      date: "24 May",
      day: "Exam",
      title: "Paper execution",
      tasks: [
        "Round 1: solve sure questions and mark doubtful ones.",
        "Round 2: use elimination; attempt only where two options can be ruled out or strong recall exists.",
        "Protect CSAT qualification with calm time allocation."
      ]
    }
  ];

  const patternCards = [
    {
      title: "Question Forms",
      weight: "Very high",
      points: [
        "How many statements are correct?",
        "Correctly matched pairs",
        "Terms seen in news with static concept",
        "Extreme-word traps: always, only, all, automatically"
      ]
    },
    {
      title: "Polity",
      weight: "High",
      points: [
        "Constitutional bodies, federal bodies, rights, Parliament and schedules",
        "Current linkage: appointments, election process, fiscal federalism",
        "Best move: eliminate jurisdiction overreach"
      ]
    },
    {
      title: "Economy",
      weight: "High",
      points: [
        "RBI tools, inflation, fiscal deficit, external sector, taxation, banking",
        "Current linkage: Budget, MPC, trade agreements, green finance",
        "Best move: separate institution, instrument and outcome"
      ]
    },
    {
      title: "Environment",
      weight: "Very high",
      points: [
        "Conventions, protected areas, species-habitat, climate mechanisms",
        "Current linkage: COPs, biodiversity, wetlands, forest clearances",
        "Best move: separate legal status from international recognition"
      ]
    },
    {
      title: "History and Culture",
      weight: "High",
      points: [
        "Ancient religion, architecture, literature, modern movement timeline",
        "Current linkage: heritage, GI tags, anniversaries, excavations",
        "Best move: anchor one fixed pair, then test the remaining pair"
      ]
    },
    {
      title: "Geography and Science",
      weight: "Medium-high",
      points: [
        "Monsoon, rivers, soils, minerals, agriculture, maps",
        "Science linkage: space, semiconductors, biotech, batteries, AI",
        "Best move: prefer process understanding over isolated trivia"
      ]
    }
  ];

  const els = {
    daysLeft: document.getElementById("daysLeft"),
    scoreMetric: document.getElementById("scoreMetric"),
    accuracyMetric: document.getElementById("accuracyMetric"),
    attemptMetric: document.getElementById("attemptMetric"),
    navTabs: document.querySelectorAll(".nav-tab"),
    views: document.querySelectorAll(".view"),
    modeSelect: document.getElementById("modeSelect"),
    topicSelect: document.getElementById("topicSelect"),
    newSetBtn: document.getElementById("newSetBtn"),
    resetBtn: document.getElementById("resetBtn"),
    questionTopic: document.getElementById("questionTopic"),
    questionPattern: document.getElementById("questionPattern"),
    questionDifficulty: document.getElementById("questionDifficulty"),
    questionText: document.getElementById("questionText"),
    statementList: document.getElementById("statementList"),
    optionList: document.getElementById("optionList"),
    confidenceSlider: document.getElementById("confidenceSlider"),
    guessValue: document.getElementById("guessValue"),
    submitBtn: document.getElementById("submitBtn"),
    skipBtn: document.getElementById("skipBtn"),
    nextBtn: document.getElementById("nextBtn"),
    eliminationList: document.getElementById("eliminationList"),
    feedbackPanel: document.getElementById("feedbackPanel"),
    resultLabel: document.getElementById("resultLabel"),
    answerLine: document.getElementById("answerLine"),
    explanationText: document.getElementById("explanationText"),
    eliminationNotes: document.getElementById("eliminationNotes"),
    newsHook: document.getElementById("newsHook"),
    planGrid: document.getElementById("planGrid"),
    patternGrid: document.getElementById("patternGrid"),
    reviewSummary: document.getElementById("reviewSummary"),
    reviewList: document.getElementById("reviewList"),
    clearReviewBtn: document.getElementById("clearReviewBtn")
  };

  let state = loadState();
  let activeSet = [];
  let currentIndex = 0;
  let selectedOption = null;
  let eliminated = new Set();
  let answered = false;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.attempts)) return saved;
    } catch (error) {
      console.warn("Could not load saved progress", error);
    }
    return { attempts: [], lastMode: "all", lastTopic: "all" };
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function initialise() {
    populateTopics();
    renderCountdown();
    renderPlan();
    renderPattern();
    attachEvents();
    els.modeSelect.value = state.lastMode || "all";
    els.topicSelect.value = state.lastTopic || "all";
    startNewSet();
    renderMetrics();
    renderReview();
  }

  function populateTopics() {
    const topics = [...new Set(QUESTIONS.map((question) => question.topic))].sort();
    topics.forEach((topic) => {
      const option = document.createElement("option");
      option.value = topic;
      option.textContent = topic;
      els.topicSelect.appendChild(option);
    });
  }

  function renderCountdown() {
    const now = new Date();
    const msLeft = TARGET_DATE.getTime() - now.getTime();
    const daysLeft = Math.max(0, Math.ceil(msLeft / 86400000));
    els.daysLeft.textContent = daysLeft === 1 ? "1 day" : `${daysLeft} days`;
  }

  function attachEvents() {
    els.navTabs.forEach((button) => {
      button.addEventListener("click", () => switchView(button.dataset.view));
    });

    els.newSetBtn.addEventListener("click", () => {
      state.lastMode = els.modeSelect.value;
      state.lastTopic = els.topicSelect.value;
      saveState();
      startNewSet();
    });

    els.resetBtn.addEventListener("click", () => {
      selectedOption = null;
      eliminated = new Set();
      answered = false;
      renderQuestion();
    });

    els.submitBtn.addEventListener("click", submitAnswer);
    els.skipBtn.addEventListener("click", skipQuestion);
    els.nextBtn.addEventListener("click", nextQuestion);
    els.confidenceSlider.addEventListener("input", renderGuessValue);
    els.clearReviewBtn.addEventListener("click", clearReview);

    els.reviewList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-retry]");
      if (!button) return;
      const question = QUESTIONS.find((item) => item.id === button.dataset.retry);
      if (!question) return;
      activeSet = [question];
      currentIndex = 0;
      switchView("practice");
      renderQuestion();
    });
  }

  function switchView(viewName) {
    els.navTabs.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.view === viewName);
    });
    els.views.forEach((view) => {
      view.classList.toggle("is-active", view.id === `${viewName}View`);
    });
    if (viewName === "review") renderReview();
  }

  function startNewSet() {
    const mode = els.modeSelect.value;
    const topic = els.topicSelect.value;
    let pool = QUESTIONS.filter((question) => topic === "all" || question.topic === topic);

    if (mode === "current") {
      pool = pool.filter((question) => question.newsWeight === "High");
    } else if (mode === "elimination") {
      pool = pool.filter((question) => question.modes.includes("elimination") || question.difficulty >= 5);
    } else if (mode === "statements") {
      pool = pool.filter((question) => question.modes.includes("statements"));
    } else if (mode === "weak") {
      const weakTopics = getWeakTopics();
      pool = pool.filter((question) => weakTopics.includes(question.topic));
      if (!pool.length) pool = QUESTIONS.filter((question) => question.difficulty >= 5);
    }

    if (!pool.length) pool = QUESTIONS;
    activeSet = shuffle(pool).slice(0, 20);
    currentIndex = 0;
    renderQuestion();
  }

  function getWeakTopics() {
    const topicStats = new Map();
    state.attempts.forEach((attempt) => {
      if (attempt.skipped) return;
      const stats = topicStats.get(attempt.topic) || { total: 0, wrong: 0 };
      stats.total += 1;
      if (!attempt.correct) stats.wrong += 1;
      topicStats.set(attempt.topic, stats);
    });

    return [...topicStats.entries()]
      .filter(([, stats]) => stats.total >= 1)
      .sort((a, b) => b[1].wrong / b[1].total - a[1].wrong / a[1].total)
      .slice(0, 3)
      .map(([topic]) => topic);
  }

  function renderQuestion() {
    selectedOption = null;
    eliminated = new Set();
    answered = false;
    const question = activeSet[currentIndex];

    els.feedbackPanel.hidden = true;
    els.submitBtn.disabled = false;
    els.skipBtn.disabled = false;
    els.nextBtn.disabled = true;
    els.confidenceSlider.value = "3";

    if (!question) {
      els.questionText.textContent = "No questions available for this filter.";
      els.statementList.innerHTML = "";
      els.optionList.innerHTML = "";
      els.eliminationList.innerHTML = "";
      return;
    }

    els.questionTopic.textContent = question.topic;
    els.questionPattern.textContent = question.pattern;
    els.questionDifficulty.textContent = `Difficulty ${question.difficulty}/5`;
    els.questionText.textContent = question.question;
    els.statementList.innerHTML = question.statements.map((statement) => `<li>${escapeHtml(statement)}</li>`).join("");
    els.optionList.innerHTML = "";
    els.eliminationList.innerHTML = "";

    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "option-btn";
      button.type = "button";
      button.dataset.option = String(index);
      button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHtml(option)}</span>`;
      button.addEventListener("click", () => selectOption(index));
      els.optionList.appendChild(button);

      const eliminateButton = document.createElement("button");
      eliminateButton.className = "eliminate-btn";
      eliminateButton.type = "button";
      eliminateButton.dataset.eliminate = String(index);
      eliminateButton.innerHTML = `<span>${String.fromCharCode(65 + index)}. ${escapeHtml(option)}</span><span>Rule out</span>`;
      eliminateButton.addEventListener("click", () => toggleElimination(index));
      els.eliminationList.appendChild(eliminateButton);
    });

    renderGuessValue();
  }

  function selectOption(index) {
    if (answered || eliminated.has(index)) return;
    selectedOption = index;
    [...els.optionList.children].forEach((button) => {
      button.classList.toggle("is-selected", Number(button.dataset.option) === index);
    });
    renderGuessValue();
  }

  function toggleElimination(index) {
    if (answered) return;
    if (selectedOption === index) selectedOption = null;
    if (eliminated.has(index)) {
      eliminated.delete(index);
    } else {
      eliminated.add(index);
    }
    syncEliminationClasses();
    renderGuessValue();
  }

  function syncEliminationClasses() {
    [...els.optionList.children].forEach((button) => {
      const index = Number(button.dataset.option);
      button.classList.toggle("is-eliminated", eliminated.has(index));
      button.classList.toggle("is-selected", selectedOption === index);
    });

    [...els.eliminationList.children].forEach((button) => {
      const index = Number(button.dataset.eliminate);
      button.classList.toggle("is-eliminated", eliminated.has(index));
      button.querySelector("span:last-child").textContent = eliminated.has(index) ? "Ruled out" : "Rule out";
    });
  }

  function renderGuessValue() {
    const confidence = Number(els.confidenceSlider.value);
    const eliminatedCount = eliminated.size;
    if (eliminatedCount >= 2 && confidence >= 3) {
      els.guessValue.textContent = "Playable";
    } else if (eliminatedCount >= 1 && confidence >= 4) {
      els.guessValue.textContent = "Selective";
    } else if (confidence >= 5) {
      els.guessValue.textContent = "Recall-led";
    } else {
      els.guessValue.textContent = "Leave unless sure";
    }
  }

  function submitAnswer() {
    if (answered) return;
    if (selectedOption === null) {
      els.guessValue.textContent = "Pick or skip";
      return;
    }
    finishQuestion(false);
  }

  function skipQuestion() {
    if (answered) return;
    finishQuestion(true);
  }

  function finishQuestion(skipped) {
    const question = activeSet[currentIndex];
    const correct = !skipped && selectedOption === question.answer;
    answered = true;

    const score = skipped ? 0 : correct ? SCORE_CORRECT : SCORE_WRONG;
    const attempt = {
      id: question.id,
      topic: question.topic,
      pattern: question.pattern,
      selected: selectedOption,
      answer: question.answer,
      correct,
      skipped,
      confidence: Number(els.confidenceSlider.value),
      eliminated: [...eliminated],
      score,
      at: new Date().toISOString()
    };
    state.attempts.push(attempt);
    saveState();

    revealAnswer(question, skipped, correct);
    renderMetrics();
    els.submitBtn.disabled = true;
    els.skipBtn.disabled = true;
    els.nextBtn.disabled = currentIndex >= activeSet.length - 1;
  }

  function revealAnswer(question, skipped, correct) {
    [...els.optionList.children].forEach((button) => {
      const index = Number(button.dataset.option);
      button.classList.toggle("is-correct", index === question.answer);
      button.classList.toggle("is-wrong", !skipped && index === selectedOption && index !== question.answer);
    });

    els.feedbackPanel.hidden = false;
    els.resultLabel.textContent = skipped ? "Skipped" : correct ? "Correct" : "Wrong";
    els.answerLine.textContent = `Answer: ${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}`;
    els.explanationText.textContent = question.explanation;
    els.eliminationNotes.innerHTML = question.elimination
      .map((note) => `<div>${escapeHtml(note)}</div>`)
      .join("");
    els.newsHook.textContent = question.newsHook;
  }

  function nextQuestion() {
    if (currentIndex < activeSet.length - 1) {
      currentIndex += 1;
      renderQuestion();
    }
  }

  function renderMetrics() {
    const attempts = state.attempts.filter((attempt) => !attempt.skipped);
    const score = state.attempts.reduce((sum, attempt) => sum + attempt.score, 0);
    const correct = attempts.filter((attempt) => attempt.correct).length;
    const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;

    els.scoreMetric.textContent = score.toFixed(2);
    els.accuracyMetric.textContent = `${accuracy}%`;
    els.attemptMetric.textContent = String(state.attempts.length);
  }

  function renderPlan() {
    const todayKey = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      timeZone: "Asia/Kolkata"
    }).format(new Date());

    els.planGrid.innerHTML = plan
      .map((item) => {
        const isToday = item.date === todayKey.replace("Sept", "Sep");
        const tasks = item.tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join("");
        return `
          <article class="plan-card ${isToday ? "today" : ""}">
            <span class="status-pill">${item.day} · ${item.date}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <ul>${tasks}</ul>
          </article>
        `;
      })
      .join("");
  }

  function renderPattern() {
    els.patternGrid.innerHTML = patternCards
      .map((card) => {
        const points = card.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("");
        return `
          <article class="pattern-card">
            <span class="tag">${escapeHtml(card.weight)}</span>
            <h3>${escapeHtml(card.title)}</h3>
            <ul>${points}</ul>
          </article>
        `;
      })
      .join("");
  }

  function renderReview() {
    const attempts = state.attempts;
    const wrong = attempts.filter((attempt) => !attempt.skipped && !attempt.correct);
    const skipped = attempts.filter((attempt) => attempt.skipped);
    const highConfidenceWrong = wrong.filter((attempt) => attempt.confidence >= 4);
    const weakTopics = getWeakTopics();

    els.reviewSummary.innerHTML = [
      ["Wrong", wrong.length],
      ["Skipped", skipped.length],
      ["High-confidence wrong", highConfidenceWrong.length],
      ["Weak focus", weakTopics[0] || "None yet"]
    ]
      .map(([label, value]) => `<div class="panel metric"><span>${label}</span><strong>${value}</strong></div>`)
      .join("");

    if (!wrong.length && !skipped.length) {
      els.reviewList.innerHTML = `<div class="empty-state">Your review log is empty. Attempt a set, then use this page for repair.</div>`;
      return;
    }

    const reviewAttempts = [...wrong, ...skipped].slice(-30).reverse();
    els.reviewList.innerHTML = reviewAttempts
      .map((attempt) => {
        const question = QUESTIONS.find((item) => item.id === attempt.id);
        if (!question) return "";
        const selected = attempt.skipped ? "Skipped" : `${String.fromCharCode(65 + attempt.selected)}. ${question.options[attempt.selected]}`;
        const answer = `${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}`;
        return `
          <article class="review-item">
            <div>
              <span class="tag">${escapeHtml(question.topic)}</span>
              <span class="tag">${escapeHtml(question.pattern)}</span>
            </div>
            <h3>${escapeHtml(question.question)}</h3>
            <p><strong>Your call:</strong> ${escapeHtml(selected)} · <strong>Answer:</strong> ${escapeHtml(answer)}</p>
            <p>${escapeHtml(question.explanation)}</p>
            <button class="ghost-btn" type="button" data-retry="${question.id}">Retry question</button>
          </article>
        `;
      })
      .join("");
  }

  function clearReview() {
    state.attempts = [];
    saveState();
    renderMetrics();
    renderReview();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  initialise();
})();
