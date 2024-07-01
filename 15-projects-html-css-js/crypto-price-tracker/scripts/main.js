(() => {
  "use strict";

  const formatCurrency = (value) =>
    `$${value >= 1e12 ? (value / 1e12).toFixed(2) + "T" : value >= 1e9 ? (value / 1e9).toFixed(2) + "B" : value >= 1e6 ? (value / 1e6).toFixed(1) + "M" : value.toLocaleString()}`;

  const formatNumber = (value) =>
    value >= 1e9 ? (value / 1e9).toFixed(2) + "B" : value >= 1e6 ? (value / 1e6).toFixed(1) + "M" : value.toLocaleString();

  const formatPercent = (value) => `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;

  const ranges = {
    day: "24h",
    week: "7d",
    month: "30d",
  };

  const sectors = [
    { id: "all", label: "All sectors" },
    { id: "layer1", label: "Layer 1" },
    { id: "defi", label: "DeFi" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "gaming", label: "Gaming & Metaverse" },
    { id: "stables", label: "Stablecoins" },
  ];

  const chains = [
    { id: "all", label: "All chains" },
    { id: "ethereum", label: "Ethereum" },
    { id: "bitcoin", label: "Bitcoin" },
    { id: "solana", label: "Solana" },
    { id: "cosmos", label: "Cosmos" },
  ];

  const marketMeta = {
    updated: "2025-11-10T08:45:00Z",
    breadth: "62% of tracked assets positive in last 24h",
    turnover: "$86.4B aggregated spot + perpetual volume",
  };

  const overviewMetrics = [
    {
      label: "Total Market Cap",
      value: 1.723e12,
      delta: 2.18,
    },
    {
      label: "24h Volume",
      value: 86.4e9,
      delta: 5.62,
    },
    {
      label: "BTC Dominance",
      value: 48.7,
      delta: -0.6,
      suffix: "%",
    },
    {
      label: "DeFi TVL",
      value: 96.3e9,
      delta: 1.45,
    },
  ];

  const assets = [
    {
      id: "btc",
      symbol: "BTC",
      name: "Bitcoin",
      price: 38642,
      change: { day: 1.86, week: 4.12, month: 11.48 },
      volume: 32.4e9,
      marketCap: 756e9,
      sector: "layer1",
      chain: "bitcoin",
      spark: [0, 4, 1, 9, 12, 8, 14, 17, 12, 18, 20, 23],
    },
    {
      id: "eth",
      symbol: "ETH",
      name: "Ethereum",
      price: 2098,
      change: { day: 2.73, week: 6.4, month: 9.12 },
      volume: 15.2e9,
      marketCap: 252e9,
      sector: "layer1",
      chain: "ethereum",
      spark: [2, 5, 8, 6, 9, 13, 12, 15, 17, 19, 21, 24],
    },
    {
      id: "sol",
      symbol: "SOL",
      name: "Solana",
      price: 68.41,
      change: { day: 5.92, week: 12.8, month: 28.6 },
      volume: 4.8e9,
      marketCap: 28.7e9,
      sector: "layer1",
      chain: "solana",
      spark: [1, 3, 5, 9, 7, 12, 16, 18, 22, 28, 26, 31],
    },
    {
      id: "arb",
      symbol: "ARB",
      name: "Arbitrum",
      price: 1.54,
      change: { day: -1.8, week: 2.4, month: 14.3 },
      volume: 1.2e9,
      marketCap: 2.1e9,
      sector: "infrastructure",
      chain: "ethereum",
      spark: [4, 6, 5, 8, 7, 11, 9, 13, 12, 15, 14, 18],
    },
    {
      id: "uni",
      symbol: "UNI",
      name: "Uniswap",
      price: 6.92,
      change: { day: 1.2, week: 3.9, month: 7.6 },
      volume: 635e6,
      marketCap: 5.2e9,
      sector: "defi",
      chain: "ethereum",
      spark: [5, 6, 7, 9, 10, 9, 11, 10, 12, 13, 12, 14],
    },
    {
      id: "avax",
      symbol: "AVAX",
      name: "Avalanche",
      price: 18.55,
      change: { day: -0.9, week: 5.8, month: 18.4 },
      volume: 890e6,
      marketCap: 6.8e9,
      sector: "layer1",
      chain: "ethereum",
      spark: [3, 4, 6, 9, 7, 8, 12, 13, 12, 11, 15, 16],
    },
    {
      id: "axs",
      symbol: "AXS",
      name: "Axie Infinity",
      price: 6.41,
      change: { day: -2.7, week: -4.1, month: 6.5 },
      volume: 182e6,
      marketCap: 840e6,
      sector: "gaming",
      chain: "ethereum",
      spark: [7, 6, 5, 8, 6, 5, 4, 7, 5, 6, 4, 3],
    },
    {
      id: "usdc",
      symbol: "USDC",
      name: "USD Coin",
      price: 1.0,
      change: { day: 0.02, week: 0.01, month: -0.03 },
      volume: 10.5e9,
      marketCap: 25.8e9,
      sector: "stables",
      chain: "ethereum",
      spark: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    },
  ];

  const portfolio = {
    metrics: [
      { label: "Net Exposure", value: 42.8e6, detail: "+$1.2M vs yesterday" },
      { label: "Realised P/L (24h)", value: 864e3, detail: "Hit desk target +4.1%" },
      { label: "Hedging Ratio", value: 0.72, detail: "Delta-neutral within limits" },
    ],
    positions: [
      { label: "BTC Perp Hedge", detail: "Short -150 contracts · Execution: Deribit" },
      { label: "SOL Spot", detail: "Long 82k tokens · Custody: Fireblocks" },
      { label: "Stables float", detail: "USDC 12.4M · Yield strat 4.3%" },
    ],
  };

  const alerts = [
    {
      title: "Funding spike",
      detail: "BTC perp funding flipped to 52 bps annualised on Binance · consider scaling hedge.",
      severity: "medium",
      timestamp: "08:32 GMT",
    },
    {
      title: "Address alert",
      detail: "Dormant ETH whale (3.1k ETH) moved to Coinbase · flagged for potential sell pressure.",
      severity: "high",
      timestamp: "07:54 GMT",
    },
    {
      title: "Compliance check",
      detail: "Arbitrum bridge flagged on OFAC watchlist update · verify counterparties.",
      severity: "medium",
      timestamp: "07:11 GMT",
    },
  ];

  const newsItems = [
    {
      title: "Hong Kong SFC approves second wave of Bitcoin & ETH spot ETFs",
      source: "South China Morning Post – 40 mins ago",
    },
    {
      title: "Polygon zkEVM completes audit; commit for next-halving upgrade window",
      source: "Messari Terminal – 1 hr ago",
    },
    {
      title: "BlackRock tokenised fund crosses $500M AUM in first quarter",
      source: "CoinDesk Pro – 1 hr 20 mins ago",
    },
  ];

  const dominance = [
    { label: "Layer 1 Majors", value: 58.2 },
    { label: "Stablecoins", value: 12.4 },
    { label: "DeFi", value: 9.6 },
    { label: "Infrastructure / Scaling", value: 8.1 },
    { label: "Gaming & Metaverse", value: 4.2 },
    { label: "Other", value: 7.5 },
  ];

  const state = {
    range: "day",
    sector: "all",
    chain: "all",
    query: "",
    watchlist: new Set(["btc", "eth", "sol"]),
  };

  const elements = {
    marketOverview: document.querySelector("#market-overview"),
    sectorChips: document.querySelector("#sector-chips"),
    chainChips: document.querySelector("#chain-chips"),
    assetTable: document.querySelector("#asset-table"),
    assetCount: document.querySelector("#asset-count"),
    filterMeta: document.querySelector("#filter-meta"),
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector("#asset-search"),
    switcherButtons: document.querySelectorAll(".switcher__btn"),
    marketMeta: document.querySelector("#market-meta"),
    portfolioMetrics: document.querySelector("#portfolio-metrics"),
    portfolioPositions: document.querySelector("#portfolio-positions"),
    alertsList: document.querySelector("#alerts-list"),
    newsList: document.querySelector("#news-list"),
    dominanceList: document.querySelector("#dominance-list"),
  };

  const generateSparkPath = (points) => {
    const height = 40;
    const width = 120;
    const max = Math.max(...points);
    const min = Math.min(...points);
    const normalised = points.map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const range = max - min || 1;
      const y = height - ((point - min) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    const polyline = `M0,${height} L${normalised.join(" ")} L${width},${height} Z`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><path d="${polyline}" fill="white" /></svg>`;
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  };

  const renderOverview = () => {
    if (!elements.marketOverview) return;
    const fragment = document.createDocumentFragment();

    const header = document.createElement("header");
    header.innerHTML = `
      <h2>Market Pulse</h2>
      <p style="color: var(--text-muted); letter-spacing: 0.06em;">${marketMeta.breadth} · ${marketMeta.turnover}</p>
    `;
    fragment.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "overview-grid";
    overviewMetrics.forEach((metric) => {
      const card = document.createElement("div");
      card.className = "overview-card";
      card.innerHTML = `
        <span>${metric.label}</span>
        <strong>${metric.suffix ? metric.value.toFixed(2) + metric.suffix : formatCurrency(metric.value)}</strong>
        <small style="color:${metric.delta >= 0 ? "var(--gain)" : "var(--loss)"};">
          ${formatPercent(metric.delta)}
        </small>
        <div class="sparkline" style="--spark-path:${generateSparkPath([0, 4, 2, 8, 6, 12, 9, 13])};--spark-gradient:${metric.delta >= 0 ? "linear-gradient(90deg, rgba(34,197,94,0.65), rgba(14,165,233,0.8))" : "linear-gradient(90deg, rgba(248,113,113,0.7), rgba(244,63,94,0.85))"}"></div>
      `;
      grid.appendChild(card);
    });
    fragment.appendChild(grid);

    elements.marketOverview.innerHTML = "";
    elements.marketOverview.appendChild(fragment);
  };

  const renderFilters = () => {
    if (elements.sectorChips) {
      elements.sectorChips.innerHTML = "";
      sectors.forEach((sector) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `chip${state.sector === sector.id ? " is-active" : ""}`;
        button.dataset.sector = sector.id;
        button.textContent = sector.label;
        elements.sectorChips.appendChild(button);
      });
    }
    if (elements.chainChips) {
      elements.chainChips.innerHTML = "";
      chains.forEach((chain) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `chip${state.chain === chain.id ? " is-active" : ""}`;
        button.dataset.chain = chain.id;
        button.textContent = chain.label;
        elements.chainChips.appendChild(button);
      });
    }
  };

  const filterAssets = () => {
    return assets.filter((asset) => {
      const matchesSector = state.sector === "all" || asset.sector === state.sector;
      const matchesChain = state.chain === "all" || asset.chain === state.chain;
      const query = state.query.trim().toLowerCase();
      const matchesQuery =
        query.length === 0 ||
        asset.name.toLowerCase().includes(query) ||
        asset.symbol.toLowerCase().includes(query);
      return matchesSector && matchesChain && matchesQuery;
    });
  };

  const renderAssets = () => {
    if (!elements.assetTable || !elements.assetCount || !elements.filterMeta) return;
    elements.assetTable.innerHTML = "";
    const filtered = filterAssets();
    const fragment = document.createDocumentFragment();
    filtered.forEach((asset) => {
      const change = asset.change[state.range];
      const direction = change >= 0 ? "up" : "down";
      const row = document.createElement("div");
      row.className = "asset-row";
      row.innerHTML = `
        <div class="asset-meta">
          <div class="asset-badge">${asset.symbol.slice(0, 2)}</div>
          <div class="asset-title">
            <strong>${asset.name}</strong>
            <span>${asset.symbol} · ${asset.sector.toUpperCase()}</span>
          </div>
        </div>
        <div class="asset-value">${formatCurrency(asset.price)}</div>
        <div class="asset-change" data-direction="${direction}">
          ${formatPercent(change)}
        </div>
        <div class="asset-value">${formatCurrency(asset.volume)}</div>
        <div class="asset-value">${formatCurrency(asset.marketCap)}</div>
        <div class="asset-spark" style="--spark-path:${generateSparkPath(asset.spark)};--spark-gradient:${
          direction === "up"
            ? "linear-gradient(90deg, rgba(34,197,94,0.7), rgba(14,165,233,0.9))"
            : "linear-gradient(90deg, rgba(248,113,113,0.75), rgba(244,63,94,0.85))"
        };"></div>
        <div class="asset-actions">
          <button class="btn ${state.watchlist.has(asset.id) ? "btn-outline" : "btn-primary"}" data-action="watch" data-id="${
        asset.id
      }" type="button">
            ${state.watchlist.has(asset.id) ? "Watchlisted" : "Add Watch"}
          </button>
          <a class="btn btn-outline" href="#" target="_blank" rel="noreferrer">Open chart</a>
        </div>
      `;
      fragment.appendChild(row);
    });

    elements.assetTable.appendChild(fragment);
    elements.assetCount.textContent = `${filtered.length} assets`;
    elements.filterMeta.textContent = `${state.sector === "all" ? "All sectors" : state.sector.toUpperCase()} · ${
      state.chain === "all" ? "All chains" : state.chain.toUpperCase()
    } · Range ${ranges[state.range]}`;
  };

  const renderPortfolio = () => {
    if (!elements.portfolioMetrics || !elements.portfolioPositions) return;
    elements.portfolioMetrics.innerHTML = "";
    elements.portfolioPositions.innerHTML = "";

    const metricsFragment = document.createDocumentFragment();
    portfolio.metrics.forEach((metric) => {
      const card = document.createElement("div");
      card.className = "portfolio__metric";
      card.innerHTML = `
        <span>${metric.label}</span>
        <strong>${metric.label.includes("Ratio") ? metric.value.toFixed(2) : formatCurrency(metric.value)}</strong>
        <small style="color: var(--text-muted);">${metric.detail}</small>
      `;
      metricsFragment.appendChild(card);
    });
    elements.portfolioMetrics.appendChild(metricsFragment);

    const positionFragment = document.createDocumentFragment();
    portfolio.positions.forEach((position) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${position.label}</strong>
        <span>${position.detail}</span>
      `;
      positionFragment.appendChild(li);
    });
    elements.portfolioPositions.appendChild(positionFragment);
  };

  const renderAlerts = () => {
    if (!elements.alertsList) return;
    elements.alertsList.innerHTML = "";
    alerts.forEach((alert) => {
      const li = document.createElement("li");
      li.className = "alert-item";
      li.innerHTML = `
        <span>${alert.timestamp}</span>
        <h3>${alert.title}</h3>
        <p>${alert.detail}</p>
      `;
      elements.alertsList.appendChild(li);
    });
  };

  const renderNews = () => {
    if (!elements.newsList) return;
    elements.newsList.innerHTML = "";
    newsItems.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.title}</strong>
        <span>${item.source}</span>
      `;
      elements.newsList.appendChild(li);
    });
  };

  const renderDominance = () => {
    if (!elements.dominanceList) return;
    elements.dominanceList.innerHTML = "";
    dominance.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.label} · ${item.value.toFixed(1)}%</strong>
        <div class="dominance-bar"><span style="width:${item.value}%"></span></div>
        <small>Share of total market capitalisation</small>
      `;
      elements.dominanceList.appendChild(li);
    });
  };

  const renderMeta = () => {
    if (!elements.marketMeta) return;
    const updated = new Date(marketMeta.updated);
    elements.marketMeta.textContent = `Refreshed ${updated.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    })} · Pricing range ${ranges[state.range]}`;
  };

  const render = () => {
    renderOverview();
    renderFilters();
    renderAssets();
    renderPortfolio();
    renderAlerts();
    renderNews();
    renderDominance();
    renderMeta();
    updateSwitchers();
  };

  const updateSwitchers = () => {
    elements.switcherButtons.forEach((button) => {
      const isActive = button.dataset.range === state.range;
      button.classList.toggle("is-active", isActive);
    });
  };

  const bindEvents = () => {
    elements.sectorChips?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      const { sector } = target.dataset;
      if (!sector) return;
      state.sector = sector;
      render();
    });

    elements.chainChips?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      const { chain } = target.dataset;
      if (!chain) return;
      state.chain = chain;
      render();
    });

    elements.assetTable?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      if (target.dataset.action === "watch" && target.dataset.id) {
        const id = target.dataset.id;
        if (state.watchlist.has(id)) {
          state.watchlist.delete(id);
        } else {
          state.watchlist.add(id);
        }
        renderAssets();
      }
    });

    elements.switcherButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const range = button.dataset.range;
        if (!range || range === state.range) return;
        state.range = range;
        render();
      });
    });

    elements.searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!elements.searchInput) return;
      state.query = elements.searchInput.value;
      renderAssets();
    });

    elements.searchInput?.addEventListener("input", () => {
      state.query = elements.searchInput.value;
      renderAssets();
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    render();
    bindEvents();
  });
})();
