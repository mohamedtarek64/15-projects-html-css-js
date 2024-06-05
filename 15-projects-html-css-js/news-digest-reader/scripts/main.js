(() => {
  "use strict";

  const cadenceMeta = {
    morning: {
      updated: "Updated 06:45 GMT",
      editor: "Editor: Lina Salim",
      note: "Includes Asia close + EU pre-market signals",
    },
    evening: {
      updated: "Updated 18:05 GMT",
      editor: "Editor: Omar Castillo",
      note: "Includes Wall Street wrap + overnight outlook",
    },
  };

  const topStories = {
    morning: {
      title: "Energy pact shakes supply chains as Gulf bloc inks surprise accord with EU",
      summary:
        "A late-night deal to peg LNG shipments to carbon benchmarks sends ripple effects through manufacturing, with EU leaders calling it “a blueprint for pragmatic transition”. Analysts expect downstream repricing within 48 hours.",
      meta: [
        "Impact: High",
        "Beat: Energy & Climate",
        "Region: Global · Brussels / Doha",
      ],
      tags: ["energy-transition", "carbon-markets", "supply-chain"],
      link: "#",
    },
    evening: {
      title: "AI oversight bill clears US Senate, pairing guardrails with fast-track innovation visas",
      summary:
        "In a rare bipartisan vote, lawmakers approved sweeping standards for high-risk models alongside incentives designed to retain overseas researchers. Tech firms welcomed clarity while rights groups flagged enforcement gaps.",
      meta: [
        "Impact: High",
        "Beat: Policy & Regulation",
        "Region: Americas · Washington D.C.",
      ],
      tags: ["artificial-intelligence", "policy", "innovation"],
      link: "#",
    },
  };

  const topics = [
    { id: "all", label: "All beats" },
    { id: "markets", label: "Markets" },
    { id: "policy", label: "Policy" },
    { id: "climate", label: "Climate" },
    { id: "tech", label: "Tech" },
    { id: "health", label: "Health" },
  ];

  const regions = [
    { id: "global", label: "Global" },
    { id: "americas", label: "Americas" },
    { id: "emea", label: "EMEA" },
    { id: "apac", label: "APAC" },
  ];

  const articles = [
    {
      id: "a1",
      cadence: ["morning"],
      title: "Dollar softens as Fed signals pause; EM currencies rally on carry trade windfall",
      summary:
        "The greenback slid to a four-week low after Chair Powell stressed patience. Investors rotated into Latin American currencies, pushing Colombia’s peso up 1.8%.",
      source: "Bloomberg",
      published: "06:20 GMT",
      topic: "markets",
      region: "americas",
      tags: ["fx", "central-banks", "emerging-markets"],
      link: "#",
    },
    {
      id: "a2",
      cadence: ["morning"],
      title: "Kenyan agritech cooperative secures $120m to scale drought analytics across Sahel",
      summary:
        "Nairobi-based TerraVista will expand its AI-enabled crop monitoring to five Sahel nations, backed by the African Development Bank and climate-focused VC firms.",
      source: "TechCabal",
      published: "05:55 GMT",
      topic: "tech",
      region: "emea",
      tags: ["agritech", "climate-adaptation", "venture-capital"],
      link: "#",
    },
    {
      id: "a3",
      cadence: ["morning", "evening"],
      title: "EU mulls emergency tariff on cheap solar imports amid domestic manufacturer strain",
      summary:
        "Brussels is weighing a temporary levy on ultra-low-cost photovoltaic modules to shield local producers, raising tensions with Beijing as COP negotiations near.",
      source: "Politico EU",
      published: "05:30 GMT",
      topic: "climate",
      region: "emea",
      tags: ["renewables", "trade-policy", "china"],
      link: "#",
    },
    {
      id: "a4",
      cadence: ["evening"],
      title: "Midwest healthcare systems pilot shared patient data hub to tackle overcrowding",
      summary:
        "Hospitals in Chicago and Minneapolis launched a pooled capacity dashboard, shaving ER wait times by 18% in the first week, according to preliminary figures.",
      source: "STAT News",
      published: "17:10 GMT",
      topic: "health",
      region: "americas",
      tags: ["healthtech", "data-sharing", "public-health"],
      link: "#",
    },
    {
      id: "a5",
      cadence: ["evening"],
      title: "Singapore exchange debuts voluntary carbon market contract with blockchain tracking",
      summary:
        "The SGX-listed product bundles verified forestry credits with tokenised receipts, targeting corporates eager for traceable emissions offsets.",
      source: "Nikkei Asia",
      published: "16:45 GMT",
      topic: "climate",
      region: "apac",
      tags: ["carbon-markets", "blockchain", "forestry"],
      link: "#",
    },
    {
      id: "a6",
      cadence: ["morning", "evening"],
      title: "UN cyber watchdog warns of surge in ‘living off the land’ attacks on utilities",
      summary:
        "Operators in Eastern Europe report actors using built-in admin tools to disguise intrusions. The advisory urges segmented backups and rapid patching.",
      source: "Reuters",
      published: "12:05 GMT",
      topic: "tech",
      region: "global",
      tags: ["cybersecurity", "critical-infrastructure"],
      link: "#",
    },
  ];

  const briefings = {
    morning: [
      {
        label: "Markets",
        detail: "Asia equities up 0.9%; crude steady at $83 as OPEC stays hands-off.",
      },
      {
        label: "Policy",
        detail: "EU leaders convene emergency summit Thursday on industrial competitiveness.",
      },
      {
        label: "Tech",
        detail: "Microsoft integrates EU-compliant AI sandbox; developers get early access invites.",
      },
    ],
    evening: [
      {
        label: "Markets",
        detail: "S&P 500 closes +1.2% on rally in semiconductors; VIX retreats to 14 handle.",
      },
      {
        label: "Policy",
        detail: "UK Treasury unveils green investment accelerator with £4B public-private pot.",
      },
      {
        label: "People",
        detail: "Former ECB chief economist Philip Lane to lead new digital euro task force.",
      },
    ],
  };

  const liveUpdates = {
    morning: [
      {
        time: "06:40",
        text: "NATO confirms cyber drills expanded to include private grid operators.",
      },
      {
        time: "06:05",
        text: "Sydney TechX IPO priced at top end; stock surges 18% at open.",
      },
      {
        time: "05:35",
        text: "Germany’s BASF pledges €700m retrofit fund to slash gas reliance.",
      },
    ],
    evening: [
      {
        time: "18:00",
        text: "IMF signals readiness to extend standby arrangement for Argentina pending reforms.",
      },
      {
        time: "17:32",
        text: "Meta rolls out new teen safety defaults ahead of EU Digital Services Act checks.",
      },
      {
        time: "16:58",
        text: "South Africa clears 5 GW renewables auction; bids open December 12.",
      },
    ],
  };

  const newsletters = {
    morning: [
      {
        title: "Carbon & Commodities",
        cadence: "Tuesdays • 07:30 GMT",
        summary: "Track the intersection of carbon markets, heavy industry, and shipping.",
      },
      {
        title: "Policy Radar",
        cadence: "Daily • 12:00 GMT",
        summary: "Concise memos on bills that moved overnight in Washington, London, and Brussels.",
      },
    ],
    evening: [
      {
        title: "Closing Bell Europe",
        cadence: "Weekdays • 18:30 GMT",
        summary: "Data-driven dashboard for EU equities, currency crosses, and CDS spreads.",
      },
      {
        title: "AI Briefing",
        cadence: "Mon / Thu • 20:00 GMT",
        summary: "Regulation watch, high-impact deployments, and talent shifts in AI.",
      },
    ],
  };

  const trendingTopics = [
    { label: "green-industrial-plan", growth: "+42%" },
    { label: "semiconductor-policy", growth: "+27%" },
    { label: "quantum-export-controls", growth: "+19%" },
    { label: "ai-safety", growth: "+37%" },
    { label: "water-stress", growth: "+24%" },
  ];

  const elements = {
    topicChips: document.querySelector("#topic-chips"),
    regionChips: document.querySelector("#region-chips"),
    articleFeed: document.querySelector("#article-feed"),
    topStory: document.querySelector("#top-story"),
    briefingList: document.querySelector("#briefing-list"),
    liveUpdates: document.querySelector("#live-updates"),
    newsletterList: document.querySelector("#newsletter-list"),
    trendingTags: document.querySelector("#trending-tags"),
    savedList: document.querySelector("#saved-list"),
    readingCount: document.querySelector("#reading-count"),
    digestMeta: document.querySelector("#digest-meta"),
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector("#search-input"),
    switcherButtons: document.querySelectorAll(".switcher__btn"),
  };

  const state = {
    cadence: "morning",
    topic: "all",
    region: "global",
    query: "",
    saved: new Set(),
    topStorySnapshot: null,
  };

  const formatMeta = (meta) => `${meta.updated} • ${meta.editor} • ${meta.note}`;

  const setCadence = (cadence) => {
    state.cadence = cadence;
    render();
  };

  const setTopic = (topic) => {
    state.topic = topic;
    renderArticles();
  };

  const setRegion = (region) => {
    state.region = region;
    renderArticles();
  };

  const toggleSaved = (id) => {
    if (state.saved.has(id)) {
      state.saved.delete(id);
      if (id === "top-story") {
        state.topStorySnapshot = null;
      }
    } else {
      state.saved.add(id);
      if (id === "top-story") {
        const story = topStories[state.cadence];
        state.topStorySnapshot = {
          id: "top-story",
          title: story.title,
          link: story.link,
        };
      }
    }
    updateSavedUI();
    updateArticleSaveButtons();
    updateTopStorySaveButton();
  };

  const updateSavedUI = () => {
    const savedItems = [];
    if (state.saved.has("top-story") && state.topStorySnapshot) {
      savedItems.push(state.topStorySnapshot);
    }
    articles.forEach((article) => {
      if (state.saved.has(article.id)) {
        savedItems.push({ id: article.id, title: article.title, link: article.link });
      }
    });
    if (!elements.savedList) return;
    elements.savedList.innerHTML = "";
    if (savedItems.length === 0) {
      elements.readingCount.textContent = "No saved briefings yet.";
      return;
    }
    elements.readingCount.textContent = `${savedItems.length} saved briefing${
      savedItems.length > 1 ? "s" : ""
    }.`;
    const fragment = document.createDocumentFragment();
    savedItems.forEach((item) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = item.title;
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.dataset.id = item.id;
      removeBtn.setAttribute("aria-label", `Remove ${item.title} from reading list`);
      removeBtn.innerHTML = "&times;";
      li.appendChild(span);
      li.appendChild(removeBtn);
      fragment.appendChild(li);
    });
    elements.savedList.appendChild(fragment);
  };

  const updateArticleSaveButtons = () => {
    elements.articleFeed?.querySelectorAll("[data-action='save']").forEach((button) => {
      const id = button.dataset.id;
      const isSaved = id ? state.saved.has(id) : false;
      button.textContent = isSaved ? "Saved" : "Save";
      button.classList.toggle("btn-primary", !isSaved);
      button.classList.toggle("btn-outline", isSaved);
    });
  };

  const updateTopStorySaveButton = () => {
    const button = elements.topStory?.querySelector("[data-id='top-story']");
    if (!button) return;
    const isSaved = state.saved.has("top-story");
    button.textContent = isSaved ? "Saved" : "Save briefing";
    button.classList.toggle("btn-primary", !isSaved);
    button.classList.toggle("btn-outline", isSaved);
  };

  const filterArticles = () => {
    return articles.filter((article) => {
      const matchesCadence = article.cadence.includes(state.cadence);
      const matchesTopic = state.topic === "all" || article.topic === state.topic;
      const matchesRegion = state.region === "global" || article.region === state.region;
      const matchesSearch =
        state.query.trim().length === 0 ||
        article.title.toLowerCase().includes(state.query) ||
        article.summary.toLowerCase().includes(state.query);
      return matchesCadence && matchesTopic && matchesRegion && matchesSearch;
    });
  };

  const renderTopStory = () => {
    if (!elements.topStory) return;
    const story = topStories[state.cadence];
    const isSaved = state.saved.has("top-story");
    elements.topStory.innerHTML = `
      <div class="top-story__meta">
        ${story.meta.map((item) => `<span>${item}</span>`).join("")}
      </div>
      <h2>${story.title}</h2>
      <p>${story.summary}</p>
      <div class="top-story__tags">
        ${story.tags.map((tag) => `<span class="tag">#${tag}</span>`).join("")}
      </div>
      <div class="story-card__actions">
        <a class="btn btn-primary" href="${story.link}">Read analysis</a>
        <button class="btn ${isSaved ? "btn-outline" : "btn-primary"}" type="button" data-action="save" data-id="top-story">
          ${isSaved ? "Saved" : "Save briefing"}
        </button>
      </div>
    `;
    // ensure snapshot matches latest top story if already saved
    if (isSaved) {
      state.topStorySnapshot = {
        id: "top-story",
        title: story.title,
        link: story.link,
      };
    }
  };

  const renderArticles = () => {
    if (!elements.articleFeed) return;
    elements.articleFeed.innerHTML = "";
    const filtered = filterArticles();
    if (filtered.length === 0) {
      elements.articleFeed.innerHTML =
        '<p style="color: var(--text-muted); letter-spacing: 0.05em;">No stories match the current filters.</p>';
      updateSavedUI();
      return;
    }
    const fragment = document.createDocumentFragment();
    filtered.forEach((article) => {
      const articleEl = document.createElement("article");
      articleEl.className = "story-card";
      articleEl.innerHTML = `
        <header>
          <h3>${article.title}</h3>
          <div class="story-card__meta">
            <span>${article.source}</span>
            <span>${article.published}</span>
            <span>${article.topic.toUpperCase()}</span>
            <span>${article.region.toUpperCase()}</span>
          </div>
        </header>
        <p>${article.summary}</p>
        <div class="story-card__footer">
          <div class="story-card__tags">
            ${article.tags.map((tag) => `<span class="tag">#${tag}</span>`).join("")}
          </div>
          <div class="story-card__actions">
          <a class="btn btn-outline" href="${article.link}" target="_blank" rel="noreferrer">Open source</a>
            <button class="btn btn-primary" data-action="save" data-id="${article.id}" type="button">
              ${state.saved.has(article.id) ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      `;
      fragment.appendChild(articleEl);
    });
    elements.articleFeed.appendChild(fragment);
    updateArticleSaveButtons();
    updateSavedUI();
    updateTopStorySaveButton();
  };

  const renderBriefings = () => {
    if (!elements.briefingList) return;
    elements.briefingList.innerHTML = "";
    const list = briefings[state.cadence];
    list.forEach((item) => {
      const dt = document.createElement("dt");
      dt.textContent = item.label;
      const dd = document.createElement("dd");
      dd.textContent = item.detail;
      elements.briefingList.appendChild(dt);
      elements.briefingList.appendChild(dd);
    });
  };

  const renderLiveUpdates = () => {
    if (!elements.liveUpdates) return;
    elements.liveUpdates.innerHTML = "";
    const updates = liveUpdates[state.cadence];
    updates.forEach((update) => {
      const item = document.createElement("li");
      item.className = "live-updates__item";
      item.innerHTML = `<span>${update.time}</span><p>${update.text}</p>`;
      elements.liveUpdates.appendChild(item);
    });
  };

  const renderNewsletters = () => {
    if (!elements.newsletterList) return;
    elements.newsletterList.innerHTML = "";
    newsletters[state.cadence].forEach((letter) => {
      const li = document.createElement("li");
      li.className = "newsletter__item";
      li.innerHTML = `
        <strong>${letter.title}</strong>
        <span>${letter.cadence}</span>
        <p>${letter.summary}</p>
      `;
      elements.newsletterList.appendChild(li);
    });
  };

  const renderTrending = () => {
    if (!elements.trendingTags) return;
    elements.trendingTags.innerHTML = "";
    trendingTopics.forEach((topic) => {
      const li = document.createElement("li");
      li.innerHTML = `${topic.label} <span>${topic.growth}</span>`;
      li.dataset.topic = topic.label;
      elements.trendingTags.appendChild(li);
    });
  };

  const renderFilters = () => {
    if (elements.topicChips) {
      elements.topicChips.innerHTML = "";
      topics.forEach((topic) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "chip";
        button.dataset.topic = topic.id;
        button.textContent = topic.label;
        if (topic.id === state.topic) button.classList.add("is-active");
        elements.topicChips.appendChild(button);
      });
    }
    if (elements.regionChips) {
      elements.regionChips.innerHTML = "";
      regions.forEach((region) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "chip";
        button.dataset.region = region.id;
        button.textContent = region.label;
        if (region.id === state.region) button.classList.add("is-active");
        elements.regionChips.appendChild(button);
      });
    }
  };

  const renderMeta = () => {
    if (!elements.digestMeta) return;
    const meta = cadenceMeta[state.cadence];
    elements.digestMeta.textContent = formatMeta(meta);
  };

  const render = () => {
    renderTopStory();
    renderFilters();
    renderMeta();
    renderArticles();
    renderBriefings();
    renderLiveUpdates();
    renderNewsletters();
    renderTrending();
    updateSavedUI();
    updateSwitchers();
    updateTopStorySaveButton();
  };

  const updateSwitchers = () => {
    elements.switcherButtons.forEach((button) => {
      const isActive = button.dataset.cadence === state.cadence;
      button.classList.toggle("is-active", isActive);
    });
  };

  const bindEvents = () => {
    elements.topicChips?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      const topic = target.dataset.topic;
      if (!topic) return;
      state.topic = topic;
      renderFilters();
      renderArticles();
    });

    elements.regionChips?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      const region = target.dataset.region;
      if (!region) return;
      state.region = region;
      renderFilters();
      renderArticles();
    });

    elements.articleFeed?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      const action = target.dataset.action;
      if (action === "save" && target.dataset.id) {
        toggleSaved(target.dataset.id);
      }
    });

    elements.topStory?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      if (target.dataset.action === "save" && target.dataset.id === "top-story") {
        toggleSaved("top-story");
      }
    });

    elements.savedList?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      const id = target.dataset.id;
      if (id) {
        toggleSaved(id);
      }
    });

    elements.searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!elements.searchInput) return;
      state.query = elements.searchInput.value.trim().toLowerCase();
      renderArticles();
    });

    elements.trendingTags?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const tagTopic = target.dataset.topic;
      if (!tagTopic) return;
      // map trending tag to topic
      const mapping = {
        "green-industrial-plan": "climate",
        "semiconductor-policy": "tech",
        "quantum-export-controls": "tech",
        "ai-safety": "tech",
        "water-stress": "climate",
      };
      if (mapping[tagTopic]) {
        state.topic = mapping[tagTopic];
        renderFilters();
        renderArticles();
      }
    });

    elements.switcherButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const cadence = button.dataset.cadence;
        if (!cadence || cadence === state.cadence) return;
        setCadence(cadence);
      });
    });
  };

  const init = () => {
    render();
    bindEvents();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
