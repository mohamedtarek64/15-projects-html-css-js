(() => {
  "use strict";

  const envelopes = [
    {
      id: "rent",
      title: "Housing",
      planned: 1800,
      actual: 1800,
    },
    {
      id: "groceries",
      title: "Groceries",
      planned: 520,
      actual: 412,
    },
    {
      id: "transport",
      title: "Transport",
      planned: 220,
      actual: 156,
    },
    {
      id: "utilities",
      title: "Utilities",
      planned: 180,
      actual: 164,
    },
    {
      id: "fun",
      title: "Lifestyle & Fun",
      planned: 350,
      actual: 198,
    },
  ];

  const transactions = [
    {
      id: "t1",
      date: "2025-10-09",
      description: "Salary · Atlas Labs",
      category: "Income",
      type: "income",
      amount: 5200,
    },
    {
      id: "t2",
      date: "2025-10-10",
      description: "Rent transfer · Midtown Lofts",
      category: "Housing",
      type: "expense",
      amount: -1800,
    },
    {
      id: "t3",
      date: "2025-10-11",
      description: "Whole Foods Market",
      category: "Groceries",
      type: "expense",
      amount: -142.87,
    },
    {
      id: "t4",
      date: "2025-10-12",
      description: "Spotify Family",
      category: "Lifestyle & Fun",
      type: "expense",
      amount: -17.99,
    },
    {
      id: "t5",
      date: "2025-10-12",
      description: "Freelance invoice · UX workshop",
      category: "Income",
      type: "income",
      amount: 980,
    },
    {
      id: "t6",
      date: "2025-10-13",
      description: "Metro card reload",
      category: "Transport",
      type: "expense",
      amount: -38.5,
    },
    {
      id: "t7",
      date: "2025-10-13",
      description: "Blue Bottle Coffee",
      category: "Lifestyle & Fun",
      type: "expense",
      amount: -12.25,
    },
    {
      id: "t8",
      date: "2025-10-14",
      description: "Electric bill · ConEd",
      category: "Utilities",
      type: "expense",
      amount: -84.11,
    },
    {
      id: "t9",
      date: "2025-10-14",
      description: "ETF investment · Vanguard",
      category: "Savings",
      type: "expense",
      amount: -350,
    },
  ];

  const savingsGoals = [
    {
      id: "emergency",
      title: "Emergency fund",
      target: 12000,
      current: 9100,
      autopay: 350,
    },
    {
      id: "travel",
      title: "Lisbon sabbatical",
      target: 5000,
      current: 1850,
      autopay: 200,
    },
    {
      id: "homeoffice",
      title: "Home office refresh",
      target: 1800,
      current: 620,
      autopay: 75,
    },
  ];

  const upcomingBills = [
    {
      id: "internet",
      title: "Internet · FiberFast",
      dueDate: "2025-10-16",
      amount: 64.99,
      status: "Scheduled",
    },
    {
      id: "gym",
      title: "Gym membership",
      dueDate: "2025-10-17",
      amount: 43,
      status: "Auto-pay",
    },
    {
      id: "insurance",
      title: "Health insurance",
      dueDate: "2025-10-18",
      amount: 218.5,
      status: "Auto-pay",
    },
    {
      id: "credit-card",
      title: "Credit card minimum",
      dueDate: "2025-10-19",
      amount: 125,
      status: "Manual",
    },
  ];

  const insights = [
    {
      title: "Groceries tracking under plan",
      detail: "You’ve used 79% of the grocery envelope. Nice pacing.",
    },
    {
      title: "Lifestyle envelope trending hot",
      detail: "Lifestyle spend is 57% used halfway through the period.",
    },
    {
      title: "Savings autopay landed",
      detail: "$350 ETF investment executed Oct 14th.",
    },
  ];

  const cashflowWeeks = [
    { label: "Week 1", inflow: 5200, outflow: 2430 },
    { label: "Week 2", inflow: 980, outflow: 890 },
    { label: "Week 3", inflow: 0, outflow: 620 },
    { label: "Week 4", inflow: 0, outflow: 540 },
  ];

  const elements = {
    incomeTotal: document.querySelector("#income-total"),
    expensesTotal: document.querySelector("#expenses-total"),
    savingsTotal: document.querySelector("#savings-total"),
    incomeVariance: document.querySelector("#income-variance"),
    expensesVariance: document.querySelector("#expenses-variance"),
    savingsVariance: document.querySelector("#savings-variance"),
    netTotal: document.querySelector("#net-total"),
    netCaption: document.querySelector("#net-caption"),
    envelopesList: document.querySelector("#envelopes-list"),
    cashflowBars: document.querySelector("#cashflow-bars"),
    transactionsTable: document.querySelector("#transactions-table tbody"),
    filterCategory: document.querySelector("#filter-category"),
    filterType: document.querySelector("#filter-type"),
    savingsList: document.querySelector("#savings-list"),
    upcomingList: document.querySelector("#upcoming-list"),
    insightsList: document.querySelector("#insights-list"),
    notesArea: document.querySelector("#budget-notes"),
    notesStatus: document.querySelector("#notes-status"),
    syncButton: document.querySelector("#sync-button"),
    dashboardPeriod: document.querySelector("#dashboard-period"),
    dashboardUpdated: document.querySelector("#dashboard-updated"),
  };

  const state = {
    categoryFilter: "all",
    typeFilter: "all",
    notesTimer: null,
  };

  const formatCurrency = (value) =>
    (value < 0 ? "-$" : "$") + Math.abs(value).toLocaleString(undefined, { maximumFractionDigits: 2 });

  const percentage = (value, base) => (base === 0 ? 0 : Math.min(Math.round((value / base) * 100), 999));

  const renderSummary = () => {
    const plannedIncome = transactions.filter((tx) => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0);
    const plannedExpenses = transactions.filter((tx) => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0);
    const plannedSavings = savingsGoals.reduce((sum, goal) => sum + goal.autopay, 0);

    if (elements.incomeTotal) elements.incomeTotal.textContent = formatCurrency(plannedIncome);
    if (elements.expensesTotal) elements.expensesTotal.textContent = formatCurrency(plannedExpenses);
    if (elements.savingsTotal) elements.savingsTotal.textContent = formatCurrency(plannedSavings);

    if (elements.incomeVariance) elements.incomeVariance.textContent = "Tracked from payroll & invoice sync.";
    if (elements.expensesVariance) elements.expensesVariance.textContent = "Includes $350 investment transfer.";
    if (elements.savingsVariance) elements.savingsVariance.textContent = "3 autopays scheduled.";

    const net = plannedIncome + plannedExpenses - plannedSavings;
    if (elements.netTotal) elements.netTotal.textContent = formatCurrency(net);
    if (elements.netCaption) elements.netCaption.textContent = net >= 0 ? "Surplus ready to allocate." : "Careful—deficit detected.";
  };

  const renderEnvelopes = () => {
    if (!elements.envelopesList) return;
    elements.envelopesList.innerHTML = "";
    envelopes.forEach((envelope) => {
      const li = document.createElement("li");
      li.className = "envelope-card";
      const percent = percentage(envelope.actual, envelope.planned);
      li.innerHTML = `
        <div class="envelope-card__header">
          <strong>${envelope.title}</strong>
          <span class="envelope-card__meta">${formatCurrency(envelope.actual)} / ${formatCurrency(envelope.planned)}</span>
        </div>
        <div class="envelope-progress"><span style="width: ${Math.min(percent, 100)}%;"></span></div>
      `;
      elements.envelopesList.appendChild(li);
    });
  };

  const renderCashflow = () => {
    if (!elements.cashflowBars) return;
    elements.cashflowBars.innerHTML = "";
    cashflowWeeks.forEach((week) => {
      const net = week.inflow - week.outflow;
      const barHeight = Math.min(Math.abs(net) / 1200 * 100, 100);
      const div = document.createElement("div");
      div.className = "cashflow-bar";
      div.dataset.type = net >= 0 ? "inflow" : "outflow";
      div.innerHTML = `
        <strong>${week.label}</strong>
        <span>Inflow: ${formatCurrency(week.inflow)}</span>
        <span>Outflow: ${formatCurrency(week.outflow)}</span>
        <div class="bar" style="--bar-height:${Math.max(barHeight, 8)}%;"></div>
        <small style="color:${net >= 0 ? "var(--income)" : "var(--expense)"};">Net ${formatCurrency(net)}</small>
      `;
      elements.cashflowBars.appendChild(div);
    });
  };

  const populateFilters = () => {
    if (!elements.filterCategory) return;
    const categories = Array.from(new Set(transactions.map((tx) => tx.category))).sort();
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      elements.filterCategory.appendChild(option);
    });
  };

  const renderTransactions = () => {
    if (!elements.transactionsTable) return;
    elements.transactionsTable.innerHTML = "";
    transactions
      .filter((tx) => state.categoryFilter === "all" || tx.category === state.categoryFilter)
      .filter((tx) => state.typeFilter === "all" || tx.type === state.typeFilter)
      .forEach((tx) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${new Date(tx.date).toLocaleDateString()}</td>
          <td>${tx.description}</td>
          <td>${tx.category}</td>
          <td class="align-right" style="color:${tx.type === "income" ? "var(--income)" : "var(--expense)"};">
            ${formatCurrency(tx.amount)}
          </td>
        `;
        elements.transactionsTable.appendChild(row);
      });
  };

  const renderSavings = () => {
    if (!elements.savingsList) return;
    elements.savingsList.innerHTML = "";
    savingsGoals.forEach((goal) => {
      const progress = percentage(goal.current, goal.target);
      const item = document.createElement("li");
      item.className = "savings-card";
      item.innerHTML = `
        <strong>${goal.title}</strong>
        <span>${formatCurrency(goal.current)} saved of ${formatCurrency(goal.target)}</span>
        <div class="envelope-progress"><span style="width:${Math.min(progress, 100)}%;"></span></div>
        <span class="savings-progress">Autopay: ${formatCurrency(goal.autopay)} / paycheque</span>
      `;
      elements.savingsList.appendChild(item);
    });
  };

  const renderUpcomingBills = () => {
    if (!elements.upcomingList) return;
    elements.upcomingList.innerHTML = "";
    upcomingBills.forEach((bill) => {
      const item = document.createElement("li");
      item.className = "upcoming-item";
      const due = new Date(bill.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric" });
      item.innerHTML = `
        <strong>${bill.title}</strong>
        <span class="upcoming-balance">Due ${due} · ${bill.status}</span>
        <span>${formatCurrency(bill.amount)}</span>
      `;
      elements.upcomingList.appendChild(item);
    });
  };

  const renderInsights = () => {
    if (!elements.insightsList) return;
    elements.insightsList.innerHTML = "";
    insights.forEach((insight) => {
      const item = document.createElement("li");
      item.className = "insight-item";
      item.innerHTML = `
        <strong>${insight.title}</strong>
        <span>${insight.detail}</span>
      `;
      elements.insightsList.appendChild(item);
    });
  };

  const bindFilters = () => {
    elements.filterCategory?.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLSelectElement)) return;
      state.categoryFilter = target.value;
      renderTransactions();
    });

    elements.filterType?.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLSelectElement)) return;
      state.typeFilter = target.value;
      renderTransactions();
    });
  };

  const bindNotes = () => {
    elements.notesArea?.addEventListener("input", () => {
      if (elements.notesStatus) elements.notesStatus.textContent = "Saving…";
      if (state.notesTimer) window.clearTimeout(state.notesTimer);
      state.notesTimer = window.setTimeout(() => {
        if (elements.notesStatus) elements.notesStatus.textContent = "Saved just now.";
      }, 1000);
    });
  };

  const bindSyncButton = () => {
    elements.syncButton?.addEventListener("click", () => {
      if (elements.dashboardUpdated) {
        elements.dashboardUpdated.textContent = `Syncing… ${new Date().toLocaleTimeString()}`;
      }
      window.setTimeout(() => {
        if (elements.dashboardUpdated) {
          elements.dashboardUpdated.textContent = `Last synced · ${new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`;
        }
      }, 1400);
    });
  };

  const init = () => {
    if (elements.dashboardPeriod) {
      const now = new Date();
      elements.dashboardPeriod.textContent = now.toLocaleDateString(undefined, { month: "long", year: "numeric" });
    }
    renderSummary();
    renderEnvelopes();
    renderCashflow();
    renderSavings();
    renderUpcomingBills();
    renderInsights();
    populateFilters();
    renderTransactions();
    bindFilters();
    bindNotes();
    bindSyncButton();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
