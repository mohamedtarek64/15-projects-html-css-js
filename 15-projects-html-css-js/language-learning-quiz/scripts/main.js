(() => {
  "use strict";

  const tracks = [
    {
      id: "conversation",
      title: "Day-to-day conversation",
      description: "Greetings, small talk, navigating cafés and co-working spaces.",
      difficulty: "A2-B1",
    },
    {
      id: "workshop",
      title: "Workshop facilitation",
      description: "Moderating sessions, asking clarifying questions, summarising decisions.",
      difficulty: "B1-B2",
    },
    {
      id: "negotiation",
      title: "Negotiation accelerator",
      description: "Expressing concessions, clarifying contracts, handling pushback.",
      difficulty: "B2-C1",
    },
  ];

  const tips = [
    {
      title: "Shadow even if you're not in shadow mode",
      detail: "Repeat sentences aloud right after the native sample—mimic rhythm, not just words.",
    },
    {
      title: "Add connectors to your answers",
      detail: "Use transitions like “par contre”, “inoltre”, “sin embargo” to sound fluid.",
    },
    {
      title: "Log your ‘why’ mistakes",
      detail: "Each time you misselect, note the reason (unknown vocab, tense confusion) to close gaps quickly.",
    },
  ];

  const metrics = [
    {
      id: "confidence",
      label: "Confidence",
      value: "78%",
      detail: "↑ 6% vs last week",
    },
    {
      id: "pronunciation",
      label: "Pronunciation",
      value: "B1 High",
      detail: "Focus on nasal vowels",
    },
    {
      id: "memory",
      label: "Recall speed",
      value: "1.9s",
      detail: "Average time to respond",
    },
  ];

  const questionBank = [
    {
      id: "q1",
      mode: "listen",
      track: "conversation",
      prompt: "You hear: « On se retrouve à dix-neuf heures devant le théâtre ? »",
      options: [
        { text: "Shall we meet at seven in front of the theatre?", isCorrect: true, hint: "dix-neuf heures = 7pm" },
        { text: "We already met in front of the theatre.", isCorrect: false },
        { text: "I can't find the theatre on the map.", isCorrect: false },
        { text: "The theatre opens at nine.", isCorrect: false },
      ],
      sample: "Shall we meet at seven in front of the theatre?",
      phonetic: "ʃæl wiː miːt æt ˈsevən ɪn frʌnt əv ðə ˈθɪətə",
    },
    {
      id: "q2",
      mode: "listen",
      track: "conversation",
      prompt: "You hear: « J'aimerais un allongé à emporter, s'il vous plaît. »",
      options: [
        { text: "I'd like a long black coffee to take away, please.", isCorrect: true, hint: "allongé = Americano" },
        { text: "Could you refill my bottle, please?", isCorrect: false },
        { text: "I'll have the same dessert as her.", isCorrect: false },
        { text: "Do you accept cards only?", isCorrect: false },
      ],
      sample: "I'd like a long black coffee to take away, please.",
      phonetic: "aɪd laɪk ə lɒŋ blæk ˈkɒfi tə teɪk əˈweɪ pliz",
    },
    {
      id: "q3",
      mode: "listen",
      track: "workshop",
      prompt: "You hear: « Pouvons-nous clarifier les décisions avant de passer au sprint ? »",
      options: [
        { text: "Can we clarify the decisions before moving on to the sprint?", isCorrect: true },
        { text: "We need to postpone the sprint until next quarter.", isCorrect: false },
        { text: "Let's assign the sprint tasks to the designers.", isCorrect: false },
        { text: "Who is facilitating the sprint today?", isCorrect: false },
      ],
      sample: "Can we clarify the decisions before moving on to the sprint?",
      phonetic: "kæn wiː ˈklærɪfaɪ ðə dɪˈsɪʒənz bɪˈfɔː ˈmuːvɪŋ ɒn tə ðə sprɪnt",
    },
    {
      id: "q4",
      mode: "listen",
      track: "negotiation",
      prompt: "You hear: « Nous sommes prêts à faire un geste si vous avancez le calendrier. »",
      options: [
        { text: "We're ready to make a concession if you bring the timeline forward.", isCorrect: true },
        { text: "We can’t adjust the timeline without extra fees.", isCorrect: false },
        { text: "Let's reschedule the meeting to next week.", isCorrect: false },
        { text: "We prefer to receive the updated calendar.", isCorrect: false },
      ],
      sample: "We're ready to make a concession if you bring the timeline forward.",
      phonetic: "wɪə ˈrɛdi tə meɪk ə kənˈsɛʃən ɪf juː brɪŋ ðə ˈtaɪmlaɪn ˈfɔːwəd",
    },
  ];

  const elements = {
    trackLabel: document.querySelector("#track-label"),
    promptTitle: document.querySelector("#prompt-title"),
    promptText: document.querySelector("#prompt-text"),
    optionsForm: document.querySelector("#options-form"),
    feedback: document.querySelector("#feedback"),
    progressValue: document.querySelector("#progress-value"),
    questionNumber: document.querySelector("#question-number"),
    questionTotal: document.querySelector("#question-total"),
    nextBtn: document.querySelector("#next-btn"),
    audioBtn: document.querySelector("#audio-btn"),
    transcriptList: document.querySelector("#transcript-list"),
    modeSwitcher: document.querySelector("#mode-switcher"),
    tracksList: document.querySelector("#tracks-list"),
    metricsList: document.querySelector("#metrics-list"),
    tipsList: document.querySelector("#tips-list"),
    streakCount: document.querySelector("#streak-count"),
  };

  const state = {
    mode: "listen",
    track: "conversation",
    currentIndex: 0,
    selections: [],
    streak: 7,
  };

  const getFilteredQuestions = () =>
    questionBank.filter((question) => question.mode === state.mode && question.track === state.track);

  const updateProgress = () => {
    const questions = getFilteredQuestions();
    const total = questions.length;
    const current = Math.min(state.currentIndex + 1, total);
    if (elements.questionNumber) elements.questionNumber.textContent = String(current);
    if (elements.questionTotal) elements.questionTotal.textContent = String(total);
    if (elements.progressValue) {
      const percentage = total > 0 ? (state.currentIndex / total) * 100 : 0;
      elements.progressValue.style.width = `${percentage}%`;
    }
  };

  const speakPrompt = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    window.speechSynthesis.speak(utterance);
  };

  const renderQuestion = () => {
    const questions = getFilteredQuestions();
    if (questions.length === 0) {
      if (elements.promptTitle) elements.promptTitle.textContent = "No drills for this combination yet.";
      if (elements.promptText) elements.promptText.textContent = "Try another track or mode.";
      if (elements.optionsForm) elements.optionsForm.innerHTML = "";
      return;
    }
    const question = questions[state.currentIndex % questions.length];

    if (elements.trackLabel) {
      const trackMeta = tracks.find((track) => track.id === state.track);
      elements.trackLabel.textContent = trackMeta
        ? `Track: ${trackMeta.title}`
        : `Track: ${state.track}`;
    }
    if (elements.promptTitle) elements.promptTitle.textContent = `Challenge ${state.currentIndex + 1}`;
    if (elements.promptText) elements.promptText.textContent = question.prompt;

    if (elements.optionsForm) {
      elements.optionsForm.innerHTML = "";
      question.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "quiz-option";
        label.tabIndex = 0;
        label.innerHTML = `
          <input type="radio" name="answer" value="${index}" />
          <strong>${option.text}</strong>
          ${option.hint ? `<span class="quiz-option__meta"><span>Hint</span>${option.hint}</span>` : ""}
        `;

        label.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            label.querySelector("input")?.click();
          }
        });

        elements.optionsForm.appendChild(label);
      });
    }
    if (elements.feedback) {
      elements.feedback.textContent = "";
      elements.feedback.removeAttribute("data-state");
    }

    if (state.mode === "listen" && question.prompt.includes("«") && elements.audioBtn) {
      elements.audioBtn.disabled = false;
    } else if (elements.audioBtn) {
      elements.audioBtn.disabled = true;
    }

    updateProgress();
  };

  const updateTranscript = (question, isCorrect, selectedText) => {
    if (!elements.transcriptList) return;
    const entry = document.createElement("li");
    entry.className = "transcript-item";
    entry.innerHTML = `
      <strong>${question.prompt}</strong>
      <span>Sample: ${question.sample}</span>
      <span>Phonetic: ${question.phonetic}</span>
      <span>Your choice: ${selectedText} ${isCorrect ? "✅" : "❌"}</span>
    `;
    elements.transcriptList.prepend(entry);
  };

  const handleSelection = (optionIndex) => {
    const questions = getFilteredQuestions();
    const question = questions[state.currentIndex % questions.length];
    const option = question.options[optionIndex];
    if (!option || !elements.feedback) return;

    const labels = elements.optionsForm?.querySelectorAll(".quiz-option") ?? [];
    labels.forEach((label, index) => {
      label.classList.toggle("is-correct", question.options[index].isCorrect);
      label.classList.toggle("is-incorrect", index === Number(optionIndex) && !question.options[index].isCorrect);
    });

    const isCorrect = option.isCorrect;
    elements.feedback.dataset.state = isCorrect ? "correct" : "incorrect";
    elements.feedback.textContent = isCorrect
      ? "Great! That's the natural response."
      : "Not quite. Check the sample translation above.";

    updateTranscript(question, isCorrect, option.text);

    state.selections.push({
      questionId: question.id,
      selected: option.text,
      correct: isCorrect,
    });

    if (isCorrect) {
      state.streak = Math.min(state.streak + 1 / questions.length, 365);
      if (elements.streakCount) elements.streakCount.textContent = String(Math.floor(state.streak)).padStart(2, "0");
    }
  };

  const handleNext = () => {
    state.currentIndex += 1;
    renderQuestion();
  };

  const renderTracks = () => {
    if (!elements.tracksList) return;
    elements.tracksList.innerHTML = "";
    tracks.forEach((track) => {
      const item = document.createElement("li");
      item.className = "track-item";
      item.innerHTML = `
        <strong>${track.title}</strong>
        <span>${track.description}</span>
        <span>Level ${track.difficulty}</span>
      `;
      item.addEventListener("click", () => {
        state.track = track.id;
        state.currentIndex = 0;
        renderQuestion();
      });
      elements.tracksList.appendChild(item);
    });
  };

  const renderMetrics = () => {
    if (!elements.metricsList) return;
    elements.metricsList.innerHTML = "";
    metrics.forEach((metric) => {
      const item = document.createElement("li");
      item.className = "metric-card";
      item.innerHTML = `
        <strong>${metric.label}</strong>
        <span>${metric.detail}</span>
        <span>${metric.value}</span>
      `;
      elements.metricsList.appendChild(item);
    });
  };

  const renderTips = () => {
    if (!elements.tipsList) return;
    elements.tipsList.innerHTML = "";
    tips.forEach((tip) => {
      const item = document.createElement("li");
      item.className = "tip-item";
      item.innerHTML = `
        <strong>${tip.title}</strong>
        <span>${tip.detail}</span>
      `;
      elements.tipsList.appendChild(item);
    });
  };

  const bindEvents = () => {
    elements.optionsForm?.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      handleSelection(target.value);
    });

    elements.nextBtn?.addEventListener("click", handleNext);

    elements.audioBtn?.addEventListener("click", () => {
      const questions = getFilteredQuestions();
      const question = questions[state.currentIndex % questions.length];
      if (question) {
        speakPrompt(question.prompt.replace(/«|»/g, ""));
      }
    });

    elements.modeSwitcher?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      const mode = target.dataset.mode;
      if (!mode || mode === state.mode) return;
      state.mode = mode;
      state.currentIndex = 0;
      elements.modeSwitcher.querySelectorAll(".mode").forEach((button) => {
        button.classList.toggle("is-active", button === target);
      });
      renderQuestion();
    });
  };

  const init = () => {
    renderTracks();
    renderMetrics();
    renderTips();
    renderQuestion();
    bindEvents();
    if (elements.streakCount) {
      elements.streakCount.textContent = String(state.streak).padStart(2, "0");
    }
  };

  document.addEventListener("DOMContentLoaded", init);
})();
