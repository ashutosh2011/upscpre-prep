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
      title: "Statement Count",
      weight: "Very high",
      points: "Count correct statements only after killing extremes like always, only, automatically."
    },
    {
      title: "Pair Matching",
      weight: "High",
      points: "Anchor the one pair you know cold; one strong anchor often solves the option set."
    },
    {
      title: "News to Static",
      weight: "Very high",
      points: "Current affairs usually asks the underlying body, law, convention, geography or process."
    },
    {
      title: "Institution Traps",
      weight: "High",
      points: "UPSC loves adding one extra power or jurisdiction to a real institution."
    },
    {
      title: "Science Basics",
      weight: "Medium-high",
      points: "They test concept boundaries: what the tech can do and what it cannot."
    }
  ];

  const pyqResources = [
    {
      year: "2025",
      status: "Official answer key available",
      upload: "13 May 2026",
      papers: [
        { label: "GS Paper I question paper", url: "https://upsc.gov.in/sites/default/files/QP-CSP-25-GENERAL-STUDIES-PAPER-I-26052025.pdf" },
        { label: "GS Paper II question paper", url: "https://upsc.gov.in/sites/default/files/QP-CSP-25-GENERAL-STUDIES-PAPER-II-26052025.pdf" },
        { label: "GS Paper I official answer key", url: "https://upsc.gov.in/sites/default/files/AnsKeyCivilServicesP-Exam-2025-GeneralStudies-I-130526.pdf" },
        { label: "GS Paper II official answer key", url: "https://upsc.gov.in/sites/default/files/AnsKeyCivilServicesP-Exam-2025-GeneralStudies-II-130526.pdf" }
      ]
    },
    {
      year: "2024",
      status: "Official question paper linked",
      upload: "Question papers uploaded 18 June 2024",
      papers: [
        { label: "GS Paper I question paper", url: "https://upsc.gov.in/sites/default/files/QP-CSP-24-GENERAL-STUDIES-PAPER-I-180624.pdf" },
        { label: "GS Paper II question paper", url: "https://upsc.gov.in/sites/default/files/QP-CSP-24-GENERAL-STUDIES-PAPER-II-180624.pdf" },
        { label: "UPSC answer-key page", url: "https://upsc.gov.in/examinations/answer-key" }
      ]
    },
    {
      year: "2023",
      status: "Official question paper linked",
      upload: "Question papers uploaded 28 May 2023",
      papers: [
        { label: "GS Paper I question paper", url: "https://upsc.gov.in/sites/default/files/QP_CS_Pre_Exam_2023_280523.pdf" },
        { label: "GS Paper II question paper", url: "https://upsc.gov.in/sites/default/files/QP_CS_Pre_Exam_2023_GENERAL_STUDIES_PAPER_II_280523.pdf" },
        { label: "UPSC answer-key page", url: "https://upsc.gov.in/examinations/answer-key" }
      ]
    }
  ];

  const pyqAlignment = [
    {
      form: "How many statements are correct?",
      signal: "Dominant in recent papers",
      drill: "Use Statement traps + Elimination trainer. Count statements after killing absolutes."
    },
    {
      form: "Correctly matched pairs",
      signal: "Geography, culture, reports, institutions",
      drill: "Anchor one known pair. If one pair is certainly wrong, options collapse quickly."
    },
    {
      form: "News term to static concept",
      signal: "Climate, tech, economy, IR",
      drill: "For every current term, ask: body, law, place, process, limitation."
    },
    {
      form: "Extreme-word trap",
      signal: "Only, all, always, automatically, never",
      drill: "Do not mark false mechanically, but slow down. These words carry option-risk."
    },
    {
      form: "Official-key discipline",
      signal: "Coaching keys can differ; UPSC final key decides",
      drill: "When analysing PYQs, mark final official answer separately from your assumed answer."
    }
  ];

  const topicAdvice = {
    Polity: "Revise constitutional bodies, Parliament procedure, federal bodies, Fundamental Rights and schedules. Drill jurisdiction traps.",
    "History & Culture": "Do timeline anchors, Buddhism/Jainism, temple styles, literature, Bhakti-Sufi and modern sessions. Avoid deep textbook reading now.",
    Economy: "Revise RBI tools, inflation, Budget indicators, external sector, GST, banking, bonds and current finance terms.",
    Environment: "Revise conventions, species-habitat-threat, protected areas, climate mechanisms, EIA and forest governance.",
    Geography: "Revise monsoon, soils, rivers, crops, minerals, ocean currents and Himalayan landforms with maps.",
    "Science & Tech": "Revise space, biotech, batteries, semiconductors, AI, quantum and satellites through simple process chains.",
    "International Relations": "Revise groupings, maritime zones, reports, WTO principles, trade agreements and neighbourhood maps.",
    "Schemes & Social Sector": "Revise scheme eligibility, target group, ministry-level purpose, MSP, GI, DPI and social-sector budget terms."
  };

  const els = {
    daysLeft: document.getElementById("daysLeft"),
    navTabs: document.querySelectorAll(".nav-tab"),
    views: document.querySelectorAll(".view"),
    startPracticeButtons: document.querySelectorAll("[data-start-practice]"),
    dashboardSummary: document.getElementById("dashboardSummary"),
    performanceChart: document.getElementById("performanceChart"),
    chartLegend: document.getElementById("chartLegend"),
    chartLabel: document.getElementById("chartLabel"),
    trendLabel: document.getElementById("trendLabel"),
    trendGrid: document.getElementById("trendGrid"),
    trendChart: document.getElementById("trendChart"),
    topicBars: document.getElementById("topicBars"),
    studyAdvice: document.getElementById("studyAdvice"),
    recentInsights: document.getElementById("recentInsights"),
    modeSelect: document.getElementById("modeSelect"),
    topicSelect: document.getElementById("topicSelect"),
    setSizeSelect: document.getElementById("setSizeSelect"),
    newSetBtn: document.getElementById("newSetBtn"),
    resetBtn: document.getElementById("resetBtn"),
    questionCounter: document.getElementById("questionCounter"),
    timerText: document.getElementById("timerText"),
    questionTopic: document.getElementById("questionTopic"),
    questionPattern: document.getElementById("questionPattern"),
    questionDifficulty: document.getElementById("questionDifficulty"),
    questionText: document.getElementById("questionText"),
    statementList: document.getElementById("statementList"),
    recallInput: document.getElementById("recallInput"),
    optionList: document.getElementById("optionList"),
    confidenceSlider: document.getElementById("confidenceSlider"),
    guessValue: document.getElementById("guessValue"),
    submitBtn: document.getElementById("submitBtn"),
    skipBtn: document.getElementById("skipBtn"),
    nextBtn: document.getElementById("nextBtn"),
    eliminationCount: document.getElementById("eliminationCount"),
    eliminationList: document.getElementById("eliminationList"),
    feedbackPanel: document.getElementById("feedbackPanel"),
    resultLabel: document.getElementById("resultLabel"),
    answerLine: document.getElementById("answerLine"),
    explanationText: document.getElementById("explanationText"),
    eliminationNotes: document.getElementById("eliminationNotes"),
    newsHook: document.getElementById("newsHook"),
    patternRail: document.getElementById("patternRail"),
    planGrid: document.getElementById("planGrid"),
    pyqResources: document.getElementById("pyqResources"),
    pyqAlignment: document.getElementById("pyqAlignment"),
    officialKeyStatus: document.getElementById("officialKeyStatus"),
    dueCount: document.getElementById("dueCount"),
    dueQueue: document.getElementById("dueQueue"),
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
  let questionStartedAt = Date.now();
  let timerId = null;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.attempts)) {
        return {
          attempts: saved.attempts,
          lastMode: saved.lastMode || "all",
          lastTopic: saved.lastTopic || "all",
          lastSetSize: saved.lastSetSize || "20"
        };
      }
    } catch (error) {
      console.warn("Could not load saved progress", error);
    }
    return { attempts: [], lastMode: "all", lastTopic: "all", lastSetSize: "20" };
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
    renderPatternRail();
    renderPYQ();
    attachEvents();
    els.modeSelect.value = state.lastMode || "all";
    els.topicSelect.value = state.lastTopic || "all";
    els.setSizeSelect.value = state.lastSetSize || "20";
    startNewSet(false);
    renderDashboard();
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
    const msLeft = TARGET_DATE.getTime() - Date.now();
    const daysLeft = Math.max(0, Math.ceil(msLeft / 86400000));
    els.daysLeft.textContent = daysLeft === 1 ? "1 day" : `${daysLeft} days`;
  }

  function attachEvents() {
    els.navTabs.forEach((button) => {
      button.addEventListener("click", () => switchView(button.dataset.view));
    });

    els.startPracticeButtons.forEach((button) => {
      button.addEventListener("click", () => switchView("practice"));
    });

    els.newSetBtn.addEventListener("click", () => startNewSet(true));
    els.resetBtn.addEventListener("click", () => renderQuestion());
    els.submitBtn.addEventListener("click", submitAnswer);
    els.skipBtn.addEventListener("click", skipQuestion);
    els.nextBtn.addEventListener("click", nextQuestion);
    els.confidenceSlider.addEventListener("input", renderGuessValue);
    els.recallInput.addEventListener("input", renderGuessValue);
    els.clearReviewBtn.addEventListener("click", clearReview);

    [els.reviewList, els.dueQueue].forEach((container) => {
      container.addEventListener("click", (event) => {
        const button = event.target.closest("[data-retry]");
        if (!button) return;
        retryQuestion(button.dataset.retry);
      });
    });
  }

  function switchView(viewName) {
    els.navTabs.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.view === viewName);
    });
    els.views.forEach((view) => {
      view.classList.toggle("is-active", view.id === `${viewName}View`);
    });
    if (viewName === "dashboard") renderDashboard();
    if (viewName === "review") renderReview();
    if (viewName === "pyq") renderPYQ();
  }

  function startNewSet(shouldSwitch) {
    const mode = els.modeSelect.value;
    const topic = els.topicSelect.value;
    const setSize = Number(els.setSizeSelect.value) || 20;
    let pool = QUESTIONS.filter((question) => topic === "all" || question.topic === topic);

    state.lastMode = mode;
    state.lastTopic = topic;
    state.lastSetSize = String(setSize);
    saveState();

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
    } else if (mode === "spaced") {
      pool = getDueQuestions();
      if (!pool.length) pool = getReviewCandidates();
      if (!pool.length) pool = QUESTIONS.filter((question) => question.difficulty >= 5);
    }

    if (!pool.length) pool = QUESTIONS;
    activeSet = shuffle(pool).slice(0, setSize);
    currentIndex = 0;
    renderQuestion();
    if (shouldSwitch) switchView("practice");
  }

  function renderQuestion() {
    selectedOption = null;
    eliminated = new Set();
    answered = false;
    const question = activeSet[currentIndex];

    stopTimer();
    questionStartedAt = Date.now();
    startTimer();

    els.feedbackPanel.hidden = true;
    els.submitBtn.disabled = false;
    els.skipBtn.disabled = false;
    els.nextBtn.disabled = true;
    els.confidenceSlider.value = "3";
    els.recallInput.value = "";
    els.eliminationCount.textContent = "0 ruled out";

    if (!question) {
      els.questionText.textContent = "No questions available for this filter.";
      els.statementList.innerHTML = "";
      els.optionList.innerHTML = "";
      els.eliminationList.innerHTML = "";
      return;
    }

    els.questionCounter.textContent = `Question ${currentIndex + 1}/${activeSet.length}`;
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

  function startTimer() {
    renderTimer();
    timerId = window.setInterval(renderTimer, 1000);
  }

  function stopTimer() {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
  }

  function renderTimer() {
    const seconds = Math.max(0, Math.floor((Date.now() - questionStartedAt) / 1000));
    els.timerText.textContent = formatSeconds(seconds);
  }

  function formatSeconds(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
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

    const count = eliminated.size;
    els.eliminationCount.textContent = `${count} ${count === 1 ? "ruled out" : "ruled out"}`;
  }

  function renderGuessValue() {
    const confidence = Number(els.confidenceSlider.value);
    const eliminatedCount = eliminated.size;
    const recallText = els.recallInput.value.trim();
    if (eliminatedCount >= 2 && confidence >= 3) {
      els.guessValue.textContent = "Playable";
    } else if (recallText.length >= 8 && confidence >= 4) {
      els.guessValue.textContent = "Recall-led";
    } else if (eliminatedCount >= 1 && confidence >= 4) {
      els.guessValue.textContent = "Selective";
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
    if (!question) return;
    const durationSec = Math.max(1, Math.round((Date.now() - questionStartedAt) / 1000));
    const confidence = Number(els.confidenceSlider.value);
    const recall = els.recallInput.value.trim();
    const correct = !skipped && selectedOption === question.answer;
    const score = skipped ? 0 : correct ? SCORE_CORRECT : SCORE_WRONG;
    answered = true;
    stopTimer();

    const attempt = {
      id: question.id,
      topic: question.topic,
      pattern: question.pattern,
      selected: selectedOption,
      answer: question.answer,
      correct,
      skipped,
      confidence,
      eliminated: [...eliminated],
      recall,
      durationSec,
      score,
      at: new Date().toISOString()
    };

    state.attempts.push(attempt);
    saveState();

    revealAnswer(question, skipped, correct);
    renderDashboard();
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

  function retryQuestion(questionId) {
    const question = QUESTIONS.find((item) => item.id === questionId);
    if (!question) return;
    activeSet = [question];
    currentIndex = 0;
    switchView("practice");
    renderQuestion();
  }

  function renderDashboard() {
    const stats = getOverallStats();
    const weakTopics = getWeakTopics();
    const weakTopic = weakTopics[0] || null;
    const accuracyClass = stats.accuracy >= 66 ? "" : stats.accuracy >= 50 ? "warn" : "bad";
    const timeClass = stats.avgTime <= 85 ? "" : stats.avgTime <= 120 ? "warn" : "bad";
    const overconfClass = stats.highConfidenceWrong === 0 ? "" : stats.highConfidenceWrong <= 2 ? "warn" : "bad";

    els.dashboardSummary.innerHTML = `
      <div class="score-card ${accuracyClass}">
        <span>Accuracy</span>
        <strong>${stats.accuracy}%</strong>
        <small>${stats.correct}/${stats.attempted} attempted correct</small>
      </div>
      <div class="score-card ${stats.score >= 0 ? "info" : "bad"}">
        <span>Score</span>
        <strong>${stats.score.toFixed(2)}</strong>
        <small>UPSC marking: +2, -0.67, skip 0</small>
      </div>
      <div class="score-card ${timeClass}">
        <span>Avg time</span>
        <strong>${stats.avgTime ? `${stats.avgTime}s` : "0s"}</strong>
        <small>Target: roughly 72-90 seconds per GS question</small>
      </div>
      <div class="score-card ${overconfClass}">
        <span>Overconfident wrong</span>
        <strong>${stats.highConfidenceWrong}</strong>
        <small>Confidence 4-5 but wrong: review these first</small>
      </div>
    `;

    renderChart(stats);
    renderTrends();
    renderTopicBars();
    renderStudyAdvice(weakTopic, stats);
    renderInsights(stats, weakTopic);
  }

  function renderTrends() {
    const sessions = getTrendSessions();
    if (!sessions.length) {
      els.trendLabel.textContent = "No trend yet";
      els.trendGrid.innerHTML = `
        <div class="trend-card">
          <span>Need data</span>
          <strong>2 sets</strong>
          <small>Attempt at least two small sets to see improvement.</small>
        </div>
      `;
      els.trendChart.innerHTML = `<div class="empty-state">Trend will show score, accuracy and speed movement set by set.</div>`;
      return;
    }

    const first = sessions[0];
    const last = sessions[sessions.length - 1];
    const accuracyDelta = Math.round(last.accuracy - first.accuracy);
    const timeDelta = Math.round(first.avgTime - last.avgTime);
    const scoreDelta = Number((last.score - first.score).toFixed(2));
    els.trendLabel.textContent = `${sessions.length} recent sets`;
    els.trendGrid.innerHTML = [
      ["Accuracy trend", `${accuracyDelta >= 0 ? "+" : ""}${accuracyDelta}%`, accuracyDelta >= 0 ? "Improving" : "Needs repair"],
      ["Speed trend", `${timeDelta >= 0 ? "+" : ""}${timeDelta}s`, timeDelta >= 0 ? "Faster" : "Slower"],
      ["Score trend", `${scoreDelta >= 0 ? "+" : ""}${scoreDelta}`, scoreDelta >= 0 ? "Better net" : "Negative drift"]
    ]
      .map(([label, value, note]) => `<div class="trend-card"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`)
      .join("");

    const maxScore = Math.max(2, ...sessions.map((session) => Math.max(0, session.score)));
    els.trendChart.innerHTML = sessions
      .map((session, index) => {
        const scoreHeight = Math.max(8, Math.round((Math.max(0, session.score) / maxScore) * 100));
        const accuracyHeight = Math.max(8, session.accuracy);
        return `
          <div class="trend-set">
            <div class="trend-bars">
              <span class="score-bar" style="height:${scoreHeight}%"></span>
              <span class="accuracy-bar" style="height:${accuracyHeight}%"></span>
            </div>
            <small>S${index + 1}</small>
          </div>
        `;
      })
      .join("");
  }

  function renderChart(stats) {
    const total = Math.max(1, stats.correct + stats.wrong + stats.skipped);
    const correctDeg = (stats.correct / total) * 360;
    const wrongDeg = correctDeg + (stats.wrong / total) * 360;
    els.performanceChart.style.background = `conic-gradient(var(--green) 0deg ${correctDeg}deg, var(--red) ${correctDeg}deg ${wrongDeg}deg, var(--saffron) ${wrongDeg}deg 360deg)`;
    els.chartLabel.textContent = stats.total ? `${stats.total} total decisions` : "No attempts yet";
    els.chartLegend.innerHTML = [
      ["Correct", stats.correct, "var(--green)"],
      ["Wrong", stats.wrong, "var(--red)"],
      ["Skipped", stats.skipped, "var(--saffron)"]
    ]
      .map(([label, value, color]) => `<div class="legend-item"><span><i class="legend-dot" style="background:${color}"></i>${label}</span><strong>${value}</strong></div>`)
      .join("");
  }

  function renderTopicBars() {
    const rows = getTopicStats()
      .sort((a, b) => b.weakness - a.weakness)
      .slice(0, 8);

    if (!rows.length) {
      els.topicBars.innerHTML = `<div class="empty-state">Attempt a few questions and this will become your weak-area map.</div>`;
      return;
    }

    els.topicBars.innerHTML = rows
      .map((row) => {
        const width = Math.max(6, row.accuracy);
        return `
          <div class="topic-row">
            <header>
              <span>${escapeHtml(row.topic)}</span>
              <span>${row.accuracy}% · ${row.avgTime || 0}s avg · ${row.total} Q</span>
            </header>
            <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
          </div>
        `;
      })
      .join("");
  }

  function renderStudyAdvice(weakTopic, stats) {
    const due = getDueQuestions();
    const advice = weakTopic
      ? topicAdvice[weakTopic] || "Revise the exact subtopic that caused the mistake, then retry after a gap."
      : "Start with a mixed drill. After 10-15 attempts, this panel will tell you what to study next.";

    const decision = stats.highConfidenceWrong
      ? "Your first repair is calibration: whenever confidence is 4-5, write the recall trigger before choosing."
      : stats.skipped > stats.wrong && stats.skipped > 2
        ? "Your first repair is selective courage: practice ruling out two options and taking playable guesses."
        : "Your first repair is error compounding: do not move on until you can state why the wrong option was tempting.";

    els.studyAdvice.innerHTML = `
      <div class="advice-card ${weakTopic ? "bad" : "good"}">
        <span class="eyebrow">Study Next</span>
        <h3>${escapeHtml(weakTopic || "Mixed baseline")}</h3>
        <p>${escapeHtml(advice)}</p>
      </div>
      <div class="advice-card">
        <span class="eyebrow">Practice Next</span>
        <h3>${due.length} spaced cards due</h3>
        <p>${escapeHtml(decision)}</p>
      </div>
    `;
  }

  function renderInsights(stats, weakTopic) {
    const insights = [];
    if (!stats.total) {
      insights.push(["Start", "Take 10 mixed questions. The app needs a little data before it can judge weak areas."]);
    } else {
      if (weakTopic) insights.push(["Weak area", `${weakTopic} is costing the most when accuracy, skips and time are combined.`]);
      if (stats.highConfidenceWrong) insights.push(["Overconfidence", `${stats.highConfidenceWrong} wrong answers were marked confidence 4-5. Slow down on familiar-looking options.`]);
      if (stats.avgTime > 100) insights.push(["Time", `Average time is ${stats.avgTime}s. Use first-pass elimination and leave questions that do not move in 75 seconds.`]);
      if (stats.lowEliminationWrong) insights.push(["Elimination", `${stats.lowEliminationWrong} wrong answers had fewer than two ruled-out options. That is guess-risk, not educated guessing.`]);
      if (!insights.length) insights.push(["Good shape", "Your current pattern is healthy. Increase mixed-set volume and keep reviewing spaced cards."]);
    }

    els.recentInsights.innerHTML = insights
      .map(([label, text]) => `<div class="insight-item"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(text)}</span></div>`)
      .join("");
  }

  function renderPlan() {
    const todayKey = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      timeZone: "Asia/Kolkata"
    }).format(new Date()).replace("Sept", "Sep");

    els.planGrid.innerHTML = plan
      .map((item) => {
        const tasks = item.tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join("");
        return `
          <article class="plan-card ${item.date === todayKey ? "today" : ""}">
            <span class="status-pill">${item.day} · ${item.date}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <ul>${tasks}</ul>
          </article>
        `;
      })
      .join("");
  }

  function renderPatternRail() {
    els.patternRail.innerHTML = patternCards
      .map((card) => `
        <div class="pattern-chip">
          <strong>${escapeHtml(card.title)} · ${escapeHtml(card.weight)}</strong>
          <span>${escapeHtml(card.points)}</span>
        </div>
      `)
      .join("");
  }

  function renderPYQ() {
    els.pyqResources.innerHTML = pyqResources
      .map((resource) => `
        <article class="pyq-card">
          <div>
            <span class="status-pill">${escapeHtml(resource.year)}</span>
            <h3>${escapeHtml(resource.status)}</h3>
            <p>${escapeHtml(resource.upload)}</p>
          </div>
          <div class="pyq-links">
            ${resource.papers.map((paper) => `<a href="${paper.url}" target="_blank" rel="noreferrer">${escapeHtml(paper.label)}</a>`).join("")}
          </div>
        </article>
      `)
      .join("");

    els.pyqAlignment.innerHTML = pyqAlignment
      .map((item) => `
        <div class="alignment-item">
          <strong>${escapeHtml(item.form)}</strong>
          <span>${escapeHtml(item.signal)}</span>
          <p>${escapeHtml(item.drill)}</p>
        </div>
      `)
      .join("");

    els.officialKeyStatus.innerHTML = `
      <div class="key-status-grid">
        <div class="key-status-card good">
          <span>Latest official key</span>
          <strong>CSE Prelims 2025</strong>
          <p>UPSC lists General Studies Paper I and II answer keys with date of upload 13 May 2026.</p>
        </div>
        <div class="key-status-card">
          <span>How to use it</span>
          <strong>PYQ final check</strong>
          <p>Attempt the official paper first, then check UPSC key. Do not mix unofficial coaching answers into your final error log.</p>
        </div>
        <div class="key-status-card warn">
          <span>Alignment note</span>
          <strong>Pattern, not copying</strong>
          <p>The drill bank imitates PYQ forms and traps. Official PDFs are linked separately for exact PYQ practice.</p>
        </div>
      </div>
    `;
  }

  function renderReview() {
    const stats = getOverallStats();
    const due = getDueQuestions();
    const reviewAttempts = state.attempts.slice(-40).reverse();

    els.dueCount.textContent = `${due.length} ${due.length === 1 ? "card" : "cards"}`;
    els.dueQueue.innerHTML = due.length
      ? due.slice(0, 12).map((question) => `
          <div class="due-item">
            <strong>${escapeHtml(question.topic)}</strong>
            <span>${escapeHtml(question.pattern)}</span>
            <button class="ghost-btn" type="button" data-retry="${question.id}">Recall now</button>
          </div>
        `).join("")
      : `<div class="empty-state">No cards due. Wrong, skipped, low-confidence and overconfident questions will appear here.</div>`;

    els.reviewSummary.innerHTML = [
      ["Correct", stats.correct, "info"],
      ["Wrong", stats.wrong, stats.wrong ? "bad" : ""],
      ["Skipped", stats.skipped, stats.skipped ? "warn" : ""],
      ["Avg time", `${stats.avgTime || 0}s`, stats.avgTime > 100 ? "warn" : "info"]
    ]
      .map(([label, value, tone]) => `<div class="review-stat ${tone}"><span>${label}</span><strong>${value}</strong></div>`)
      .join("");

    if (!reviewAttempts.length) {
      els.reviewList.innerHTML = `<div class="empty-state">Your review log is empty. Attempt a practice set first.</div>`;
      return;
    }

    els.reviewList.innerHTML = reviewAttempts
      .map((attempt) => {
        const question = QUESTIONS.find((item) => item.id === attempt.id);
        if (!question) return "";
        const selected = attempt.skipped ? "Skipped" : `${String.fromCharCode(65 + attempt.selected)}. ${question.options[attempt.selected]}`;
        const answer = `${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}`;
        const tone = attempt.skipped ? "skipped" : attempt.correct ? "correct" : "wrong";
        return `
          <article class="review-item ${tone}">
            <div>
              <span class="tag">${escapeHtml(question.topic)}</span>
              <span class="tag">${escapeHtml(question.pattern)}</span>
              <span class="tag">${attempt.durationSec || 0}s</span>
              <span class="tag">Confidence ${attempt.confidence || "-"}</span>
            </div>
            <h3>${escapeHtml(question.question)}</h3>
            <p><strong>Your call:</strong> ${escapeHtml(selected)} · <strong>Answer:</strong> ${escapeHtml(answer)}</p>
            <p>${escapeHtml(question.explanation)}</p>
            ${attempt.recall ? `<p><strong>Recall note:</strong> ${escapeHtml(attempt.recall)}</p>` : ""}
            <button class="ghost-btn" type="button" data-retry="${question.id}">Retry question</button>
          </article>
        `;
      })
      .join("");
  }

  function getOverallStats() {
    const total = state.attempts.length;
    const attempted = state.attempts.filter((attempt) => !attempt.skipped);
    const correct = attempted.filter((attempt) => attempt.correct).length;
    const wrong = attempted.length - correct;
    const skipped = state.attempts.filter((attempt) => attempt.skipped).length;
    const score = state.attempts.reduce((sum, attempt) => sum + (Number(attempt.score) || 0), 0);
    const timed = state.attempts.filter((attempt) => Number(attempt.durationSec) > 0);
    const avgTime = timed.length ? Math.round(timed.reduce((sum, attempt) => sum + Number(attempt.durationSec), 0) / timed.length) : 0;
    const accuracy = attempted.length ? Math.round((correct / attempted.length) * 100) : 0;
    const highConfidenceWrong = state.attempts.filter((attempt) => !attempt.skipped && !attempt.correct && Number(attempt.confidence) >= 4).length;
    const lowEliminationWrong = state.attempts.filter((attempt) => !attempt.skipped && !attempt.correct && (attempt.eliminated || []).length < 2).length;

    return { total, attempted: attempted.length, correct, wrong, skipped, score, avgTime, accuracy, highConfidenceWrong, lowEliminationWrong };
  }

  function getTrendSessions() {
    const attempts = state.attempts.slice(-60);
    const sessions = [];
    for (let index = 0; index < attempts.length; index += 10) {
      const chunk = attempts.slice(index, index + 10);
      if (!chunk.length) continue;
      const attempted = chunk.filter((attempt) => !attempt.skipped);
      const correct = attempted.filter((attempt) => attempt.correct).length;
      const score = chunk.reduce((sum, attempt) => sum + (Number(attempt.score) || 0), 0);
      const timed = chunk.filter((attempt) => Number(attempt.durationSec) > 0);
      sessions.push({
        total: chunk.length,
        score,
        accuracy: attempted.length ? Math.round((correct / attempted.length) * 100) : 0,
        avgTime: timed.length ? Math.round(timed.reduce((sum, attempt) => sum + Number(attempt.durationSec), 0) / timed.length) : 0
      });
    }
    return sessions;
  }

  function getTopicStats() {
    const map = new Map();
    state.attempts.forEach((attempt) => {
      const stats = map.get(attempt.topic) || {
        topic: attempt.topic,
        total: 0,
        attempted: 0,
        correct: 0,
        wrong: 0,
        skipped: 0,
        totalTime: 0,
        timed: 0,
        highConfidenceWrong: 0
      };

      stats.total += 1;
      if (attempt.skipped) {
        stats.skipped += 1;
      } else {
        stats.attempted += 1;
        if (attempt.correct) stats.correct += 1;
        if (!attempt.correct) stats.wrong += 1;
      }
      if (Number(attempt.durationSec) > 0) {
        stats.totalTime += Number(attempt.durationSec);
        stats.timed += 1;
      }
      if (!attempt.skipped && !attempt.correct && Number(attempt.confidence) >= 4) {
        stats.highConfidenceWrong += 1;
      }
      map.set(attempt.topic, stats);
    });

    return [...map.values()].map((stats) => {
      const accuracy = stats.attempted ? Math.round((stats.correct / stats.attempted) * 100) : 0;
      const avgTime = stats.timed ? Math.round(stats.totalTime / stats.timed) : 0;
      const wrongRate = stats.attempted ? stats.wrong / stats.attempted : 0.35;
      const skipRate = stats.total ? stats.skipped / stats.total : 0;
      const slowPenalty = Math.max(0, avgTime - 90) / 90;
      const weakness = Math.round(wrongRate * 55 + skipRate * 20 + slowPenalty * 15 + stats.highConfidenceWrong * 8);
      return { ...stats, accuracy, avgTime, weakness };
    });
  }

  function getWeakTopics() {
    return getTopicStats()
      .filter((row) => row.total >= 1)
      .sort((a, b) => b.weakness - a.weakness)
      .slice(0, 3)
      .map((row) => row.topic);
  }

  function getLatestAttempts() {
    const latest = new Map();
    state.attempts.forEach((attempt) => latest.set(attempt.id, attempt));
    return latest;
  }

  function getReviewCandidates() {
    const latest = getLatestAttempts();
    return QUESTIONS.filter((question) => {
      const attempt = latest.get(question.id);
      if (!attempt) return false;
      return attempt.skipped || !attempt.correct || Number(attempt.confidence) <= 2;
    });
  }

  function getDueQuestions() {
    const latest = getLatestAttempts();
    const now = Date.now();
    return QUESTIONS.filter((question) => {
      const attempt = latest.get(question.id);
      if (!attempt) return false;
      const ageHours = (now - new Date(attempt.at).getTime()) / 3600000;
      if (attempt.skipped || !attempt.correct) return ageHours >= 0;
      if (Number(attempt.confidence) <= 2) return ageHours >= 6;
      if (Number(attempt.confidence) <= 3) return ageHours >= 24;
      return false;
    });
  }

  function clearReview() {
    state.attempts = [];
    saveState();
    renderDashboard();
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
