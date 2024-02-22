(() => {
  "use strict";

  const metrics = [
    {
      label: "Heart Rate",
      value: "138 bpm",
      icon: "❤️",
      trend: "+4 bpm vs avg",
      direction: "up",
    },
    {
      label: "Calories Burned",
      value: "612 kcal",
      icon: "🔥",
      trend: "+12% vs target",
      direction: "up",
    },
    {
      label: "Steps",
      value: "10,428",
      icon: "👟",
      trend: "-8% vs target",
      direction: "down",
    },
    {
      label: "Mobility",
      value: "24 min",
      icon: "🧘",
      trend: "+6 min added",
      direction: "up",
    },
  ];

  const weeklyActivity = [
    { day: "Mon", strength: 35, conditioning: 20, mobility: 10 },
    { day: "Tue", strength: 15, conditioning: 38, mobility: 12 },
    { day: "Wed", strength: 40, conditioning: 15, mobility: 14 },
    { day: "Thu", strength: 18, conditioning: 32, mobility: 8 },
    { day: "Fri", strength: 48, conditioning: 25, mobility: 12 },
    { day: "Sat", strength: 22, conditioning: 40, mobility: 18 },
    { day: "Sun", strength: 12, conditioning: 20, mobility: 30 },
  ];

  const workouts = [
    {
      title: "Hybrid Strength · Upper",
      duration: "58 min",
      load: "Volume 15.2k lbs",
      notes: "Wave loading bench (4x4) + weighted pull-ups + contrast sled work.",
      tag: "Strength Block",
    },
    {
      title: "Zone 2 Spin · Endurance",
      duration: "42 min",
      load: "Avg HR 132 bpm",
      notes: "Progressive cadence build, 4 x 6 min climbs, cooldown breath reset.",
      tag: "Aerobic Base",
    },
    {
      title: "Mobility Reset · Flow",
      duration: "35 min",
      load: "RPE 4",
      notes: "Shoulder CARs, thoracic openers, 90/90 transitions, and ankle pulses.",
      tag: "Recovery",
    },
  ];

  const macros = [
    { name: "Protein", value: 142, target: 160, class: "protein", unit: "g" },
    { name: "Carbs", value: 196, target: 220, class: "carbs", unit: "g" },
    { name: "Fat", value: 54, target: 70, class: "fat", unit: "g" },
  ];

  const qs = (selector) => document.querySelector(selector);

  const renderMetrics = () => {
    const wrapper = qs(".metrics__grid");
    if (!wrapper) return;

    metrics.forEach((metric) => {
      const item = document.createElement("article");
      item.className = "metric";

      item.innerHTML = `
        <span class="metric__icon" aria-hidden="true">${metric.icon}</span>
        <div class="metric__body">
          <span>${metric.label}</span>
          <span class="metric__value">${metric.value}</span>
        </div>
        <span class="trend trend--${metric.direction}">${metric.trend}</span>
      `;

      wrapper.appendChild(item);
    });
  };

  const renderChart = () => {
    const chart = qs(".chart");
    if (!chart) return;

    const maxTotal = Math.max(
      ...weeklyActivity.map((day) => day.strength + day.conditioning + day.mobility),
    );

    weeklyActivity.forEach((day) => {
      const total = day.strength + day.conditioning + day.mobility;
      const strengthHeight = (day.strength / maxTotal) * 100;
      const conditioningHeight = (day.conditioning / maxTotal) * 100;
      const mobilityHeight = (day.mobility / maxTotal) * 100;

      const column = document.createElement("div");
      column.className = "chart__bar";
      column.innerHTML = `
        <div style="height: ${total === 0 ? 4 : Math.max(total / maxTotal * 200, 10)}px">
          <span class="chart__segment segment--strength" style="height: ${strengthHeight}%"></span>
          <span class="chart__segment segment--conditioning" style="height: ${conditioningHeight}%"></span>
          <span class="chart__segment segment--mobility" style="height: ${mobilityHeight}%"></span>
        </div>
        <span class="chart__label">${day.day}</span>
      `;

      chart.appendChild(column);
    });
  };

  const renderWorkouts = () => {
    const list = qs(".workout-list");
    if (!list) return;

    workouts.forEach((workout) => {
      const item = document.createElement("li");
      item.className = "workout";
      item.innerHTML = `
        <div class="workout__top">
          <h3 class="workout__title">${workout.title}</h3>
          <span class="pill">${workout.tag}</span>
        </div>
        <div class="workout__meta">
          <span>${workout.duration}</span>
          <span>${workout.load}</span>
        </div>
        <p class="workout__notes">${workout.notes}</p>
      `;
      list.appendChild(item);
    });
  };

  const renderMacros = () => {
    const list = qs(".macros");
    if (!list) return;

    macros.forEach((macro) => {
      const item = document.createElement("li");
      item.className = "macro";
      const percent = Math.min(100, Math.round((macro.value / macro.target) * 100));

      item.innerHTML = `
        <span>${macro.name}</span>
        <div class="macro__bar">
          <span class="macro__value macro__value--${macro.class}" style="width: ${percent}%"></span>
        </div>
        <strong>${macro.value}${macro.unit}</strong>
      `;
      list.appendChild(item);
    });
  };

  const renderSleepRing = () => {
    const container = qs('.rings[data-rings="sleep"]');
    if (!container) return;

    const ring = document.createElement("div");
    ring.className = "ring";

    const fill = document.createElement("span");
    fill.className = "ring__fill";
    fill.style.setProperty("--rotation", `${Math.round((92 / 100) * 360)}deg`);

    const value = document.createElement("span");
    value.className = "ring__value";
    value.textContent = "92%";

    ring.appendChild(fill);
    ring.appendChild(value);
    container.appendChild(ring);
  };

  const renderHRVSparkline = () => {
    const container = qs(".sparkline");
    if (!container) return;

    const values = [74, 86, 82, 92, 97, 104, 98, 101, 109, 118, 121, 120];
    const max = Math.max(...values);
    const min = Math.min(...values);
    const points = values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * 100;
        const y = 100 - ((value - min) / (max - min)) * 100;
        return `${x},${y}`;
      })
      .join(" ");

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.innerHTML = `
      <polyline
        points="${points}"
        fill="none"
        stroke="rgba(56, 189, 248, 0.7)"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    `;

    container.appendChild(svg);
  };

  const init = () => {
    renderMetrics();
    renderChart();
    renderWorkouts();
    renderMacros();
    renderSleepRing();
    renderHRVSparkline();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
