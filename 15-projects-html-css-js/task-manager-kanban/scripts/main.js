(() => {
  "use strict";

  const columns = [
    {
      id: "backlog",
      title: "Backlog",
      wip: 9,
    },
    {
      id: "ready",
      title: "Ready",
      wip: 3,
    },
    {
      id: "in-progress",
      title: "In progress",
      wip: 4,
    },
    {
      id: "review",
      title: "Review",
      wip: 2,
    },
    {
      id: "done",
      title: "Done",
      wip: 12,
    },
  ];

  const cards = [
    {
      id: "c1",
      column: "backlog",
      title: "Audit navigation architecture",
      owner: "Mina",
      due: "Oct 24",
      tags: ["design ops"],
      points: 3,
      status: "Blocked by research",
    },
    {
      id: "c2",
      column: "ready",
      title: "Draft AI assistant copy guidelines",
      owner: "Oscar",
      due: "Oct 20",
      tags: ["content", "ai"],
      points: 2,
      status: "Clear to pick up",
    },
    {
      id: "c3",
      column: "in-progress",
      title: "Integrate calendar sync API",
      owner: "Sasha",
      due: "Oct 18",
      tags: ["backend"],
      points: 5,
      status: "Sync w/ SRE today",
    },
    {
      id: "c4",
      column: "in-progress",
      title: "Icons: dark mode QA pass",
      owner: "Lena",
      due: "Oct 17",
      tags: ["design"],
      points: 1,
      status: "Review w/ Alex",
    },
    {
      id: "c5",
      column: "review",
      title: "Edge tests for recurring reminders",
      owner: "Kai",
      due: "Oct 15",
      tags: ["qa"],
      points: 2,
      status: "Waiting on review",
    },
    {
      id: "c6",
      column: "done",
      title: "Ship realtime presence indicator",
      owner: "Zara",
      due: "Oct 11",
      tags: ["frontend"],
      points: 3,
      status: "Released to prod",
    },
  ];

  const owners = ["Mina", "Oscar", "Sasha", "Lena", "Kai", "Zara"];
  const tags = ["design ops", "content", "ai", "backend", "design", "qa", "frontend"];

  const summary = [
    { title: "Cycle time", detail: "4.2 days avg last sprint" },
    { title: "Oldest card in progress", detail: "Integrate calendar sync · 3 days" },
    { title: "Blocked cards", detail: "Backlog – Audit navigation architecture" },
  ];

  const activity = [
    { time: "08:04", message: "Sasha moved “Integrate calendar sync API” to In progress" },
    { time: "07:32", message: "Kai requested review for “Edge tests for recurring reminders”" },
    { time: "06:45", message: "Zara marked “Realtime presence indicator” as Done" },
  ];

  const elements = {
    boardColumns: document.querySelector("#board-columns"),
    summaryList: document.querySelector("#summary-list"),
    activityFeed: document.querySelector("#activity-feed"),
    ownerFilter: document.querySelector("#filter-owner"),
    tagFilter: document.querySelector("#filter-tag"),
    clearFiltersBtn: document.querySelector("#clear-filters"),
    addCardBtn: document.querySelector("#add-card"),
    addColumnBtn: document.querySelector("#add-column"),
  };

  const state = {
    owner: "all",
    tag: "all",
  };

  const formatTags = (tagsArray) =>
    tagsArray.map((tag) => `<span class="tag">${tag}</span>`).join("");

  const renderBoard = () => {
    if (!elements.boardColumns) return;
    elements.boardColumns.innerHTML = "";

    columns.forEach((column) => {
      const columnEl = document.createElement("section");
      columnEl.className = "column";
      const columnCards = cards.filter((card) => card.column === column.id).filter((card) => {
        const ownerMatch = state.owner === "all" || card.owner === state.owner;
        const tagMatch = state.tag === "all" || card.tags.includes(state.tag);
        return ownerMatch && tagMatch;
      });

      columnEl.innerHTML = `
        <header>
          <h2>${column.title}</h2>
          <span>${columnCards.length}/${column.wip}</span>
        </header>
        <div class="column__cards">
          ${columnCards
            .map(
              (card) => `
              <article class="card">
                <header>
                  <h3>${card.title}</h3>
                  <span class="card__meta">Points ${card.points}</span>
                </header>
                <div class="card__tags">
                  ${formatTags(card.tags)}
                </div>
                <p style="color: var(--text-secondary);">${card.status}</p>
                <div class="card__footer">
                  <span>👤 ${card.owner}</span>
                  <span>🗓 ${card.due}</span>
                </div>
              </article>
            `
            )
            .join("") || `<p style="color: var(--text-muted);">No cards visible with current filters.</p>`}
        </div>
      `;
      elements.boardColumns.appendChild(columnEl);
    });
  };

  const renderSummary = () => {
    if (!elements.summaryList) return;
    elements.summaryList.innerHTML = "";
    summary.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.title}</strong>
        <span>${item.detail}</span>
      `;
      elements.summaryList.appendChild(li);
    });
  };

  const renderActivity = () => {
    if (!elements.activityFeed) return;
    elements.activityFeed.innerHTML = "";
    activity.forEach((entry) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${entry.time}</span>
        <strong>${entry.message}</strong>
      `;
      elements.activityFeed.appendChild(li);
    });
  };

  const populateFilters = () => {
    if (elements.ownerFilter) {
      owners.forEach((owner) => {
        const option = document.createElement("option");
        option.value = owner;
        option.textContent = owner;
        elements.ownerFilter.appendChild(option);
      });
    }
    if (elements.tagFilter) {
      tags.forEach((tag) => {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = tag;
        elements.tagFilter.appendChild(option);
      });
    }
  };

  const bindFilters = () => {
    elements.ownerFilter?.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLSelectElement)) return;
      state.owner = target.value;
      renderBoard();
    });

    elements.tagFilter?.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLSelectElement)) return;
      state.tag = target.value;
      renderBoard();
    });

    elements.clearFiltersBtn?.addEventListener("click", () => {
      state.owner = "all";
      state.tag = "all";
      if (elements.ownerFilter) elements.ownerFilter.value = "all";
      if (elements.tagFilter) elements.tagFilter.value = "all";
      renderBoard();
    });
  };

  const bindAdders = () => {
    elements.addCardBtn?.addEventListener("click", () => {
      alert("🛠️ Card creation flow would open here.");
    });
    elements.addColumnBtn?.addEventListener("click", () => {
      alert("🛠️ Column creation flow would open here.");
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderBoard();
    renderSummary();
    renderActivity();
    populateFilters();
    bindFilters();
    bindAdders();
  });
})();
