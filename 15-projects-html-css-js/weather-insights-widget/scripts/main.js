(() => {
  "use strict";

  const dailyForecast = [
    {
      id: "day-0",
      label: "Today",
      dayName: "Mon",
      icon: "☀️",
      summary: "Clear sky with light breeze",
      temp: { high: 31, low: 19, feels: 29 },
      humidity: 42,
      aqi: 38,
      hourly: [
        { time: "06:00", temperature: 19, uv: 0 },
        { time: "08:00", temperature: 22, uv: 1 },
        { time: "10:00", temperature: 26, uv: 4 },
        { time: "12:00", temperature: 29, uv: 6 },
        { time: "14:00", temperature: 31, uv: 7 },
        { time: "16:00", temperature: 30, uv: 5 },
        { time: "18:00", temperature: 27, uv: 2 },
        { time: "20:00", temperature: 24, uv: 0 },
        { time: "22:00", temperature: 21, uv: 0 },
        { time: "00:00", temperature: 20, uv: 0 },
        { time: "02:00", temperature: 19, uv: 0 },
        { time: "04:00", temperature: 19, uv: 0 },
      ],
      insights: [
        { label: "Wind", value: "11 km/h", trend: "Easterly gusts around sunset." },
        { label: "UV Exposure", value: "High · 7", trend: "Peak between 12:00 - 15:00." },
        { label: "Dew Point", value: "12°C", trend: "Comfortable for outdoor training." },
        { label: "Pressure", value: "1014 hPa", trend: "Stable — no storm fronts expected." },
      ],
    },
    {
      id: "day-1",
      label: "Tue",
      dayName: "Tue",
      icon: "🌤️",
      summary: "Partly cloudy, warmer afternoon",
      temp: { high: 33, low: 21, feels: 32 },
      humidity: 46,
      aqi: 44,
      hourly: [
        { time: "06:00", temperature: 21, uv: 0 },
        { time: "08:00", temperature: 24, uv: 1 },
        { time: "10:00", temperature: 28, uv: 4 },
        { time: "12:00", temperature: 31, uv: 6 },
        { time: "14:00", temperature: 33, uv: 7 },
        { time: "16:00", temperature: 32, uv: 5 },
        { time: "18:00", temperature: 29, uv: 2 },
        { time: "20:00", temperature: 26, uv: 0 },
        { time: "22:00", temperature: 24, uv: 0 },
        { time: "00:00", temperature: 23, uv: 0 },
        { time: "02:00", temperature: 22, uv: 0 },
        { time: "04:00", temperature: 21, uv: 0 },
      ],
      insights: [
        { label: "Wind", value: "8 km/h", trend: "Southerly; calm morning run." },
        { label: "UV Exposure", value: "High · 7", trend: "Cloud cover dips UV after 16:00." },
        { label: "Dew Point", value: "15°C", trend: "Slight humidity spike near sunset." },
        { label: "Pressure", value: "1010 hPa", trend: "Minor low pressure approaching." },
      ],
    },
    {
      id: "day-2",
      label: "Wed",
      dayName: "Wed",
      icon: "⛅",
      summary: "High clouds with evening breeze",
      temp: { high: 30, low: 20, feels: 28 },
      humidity: 50,
      aqi: 41,
      hourly: [
        { time: "06:00", temperature: 20, uv: 0 },
        { time: "08:00", temperature: 23, uv: 1 },
        { time: "10:00", temperature: 26, uv: 3 },
        { time: "12:00", temperature: 28, uv: 5 },
        { time: "14:00", temperature: 30, uv: 6 },
        { time: "16:00", temperature: 29, uv: 4 },
        { time: "18:00", temperature: 26, uv: 1 },
        { time: "20:00", temperature: 24, uv: 0 },
        { time: "22:00", temperature: 22, uv: 0 },
        { time: "00:00", temperature: 21, uv: 0 },
        { time: "02:00", temperature: 20, uv: 0 },
        { time: "04:00", temperature: 20, uv: 0 },
      ],
      insights: [
        { label: "Wind", value: "18 km/h", trend: "Northwest gusts after 18:00." },
        { label: "UV Exposure", value: "Moderate · 6", trend: "Thin cloud cover diffuses midday sun." },
        { label: "Dew Point", value: "14°C", trend: "Comfort zone — low stickiness." },
        { label: "Pressure", value: "1016 hPa", trend: "Rising — stable dry pattern." },
      ],
    },
    {
      id: "day-3",
      label: "Thu",
      dayName: "Thu",
      icon: "🌧️",
      summary: "Short-lived afternoon shower",
      temp: { high: 27, low: 19, feels: 27 },
      humidity: 58,
      aqi: 30,
      hourly: [
        { time: "06:00", temperature: 19, uv: 0 },
        { time: "08:00", temperature: 21, uv: 0 },
        { time: "10:00", temperature: 24, uv: 2 },
        { time: "12:00", temperature: 26, uv: 3 },
        { time: "14:00", temperature: 27, uv: 2 },
        { time: "16:00", temperature: 25, uv: 1 },
        { time: "18:00", temperature: 23, uv: 0 },
        { time: "20:00", temperature: 21, uv: 0 },
        { time: "22:00", temperature: 20, uv: 0 },
        { time: "00:00", temperature: 19, uv: 0 },
        { time: "02:00", temperature: 19, uv: 0 },
        { time: "04:00", temperature: 19, uv: 0 },
      ],
      insights: [
        { label: "Wind", value: "14 km/h", trend: "Southeast gust preceding rainfall." },
        { label: "UV Exposure", value: "Low · 3", trend: "Overcast after 13:00." },
        { label: "Dew Point", value: "16°C", trend: "Expect brief muggy window pre-shower." },
        { label: "Pressure", value: "1006 hPa", trend: "Dip indicates passing shower band." },
      ],
    },
    {
      id: "day-4",
      label: "Fri",
      dayName: "Fri",
      icon: "🌙",
      summary: "Crisp evening and clear skies",
      temp: { high: 28, low: 17, feels: 26 },
      humidity: 44,
      aqi: 35,
      hourly: [
        { time: "06:00", temperature: 17, uv: 0 },
        { time: "08:00", temperature: 20, uv: 0 },
        { time: "10:00", temperature: 24, uv: 3 },
        { time: "12:00", temperature: 26, uv: 5 },
        { time: "14:00", temperature: 28, uv: 6 },
        { time: "16:00", temperature: 27, uv: 4 },
        { time: "18:00", temperature: 24, uv: 1 },
        { time: "20:00", temperature: 21, uv: 0 },
        { time: "22:00", temperature: 19, uv: 0 },
        { time: "00:00", temperature: 18, uv: 0 },
        { time: "02:00", temperature: 17, uv: 0 },
        { time: "04:00", temperature: 17, uv: 0 },
      ],
      insights: [
        { label: "Wind", value: "10 km/h", trend: "Mild northerly all day." },
        { label: "UV Exposure", value: "Moderate · 5", trend: "Sunset golden hour at 17:38." },
        { label: "Dew Point", value: "11°C", trend: "Dry air — outdoor dining friendly." },
        { label: "Pressure", value: "1018 hPa", trend: "High pressure locks in clear skies." },
      ],
    },
  ];

  let activeDayId = dailyForecast[0].id;
  let useMetric = true;

  const qs = (selector) => document.querySelector(selector);

  const convert = (temperature) => (useMetric ? temperature : temperature * (9 / 5) + 32);

  const formatTemp = (temperature) => `${Math.round(convert(temperature))}°`;

  const renderSummary = (day) => {
    const dayEl = qs("#summary-day");
    const tempEl = qs("#summary-temp");
    const feelsEl = qs("#summary-feels");
    const humidityEl = qs("#summary-humidity");
    const aqiEl = qs("#summary-aqi");
    const conditionEl = qs("#summary-conditions");

    if (!dayEl || !tempEl || !feelsEl || !humidityEl || !aqiEl || !conditionEl) return;

    dayEl.textContent = day.label;
    tempEl.textContent = formatTemp(day.temp.high);
    feelsEl.textContent = formatTemp(day.temp.feels);
    humidityEl.textContent = `${day.humidity}%`;
    aqiEl.textContent = String(day.aqi);
    conditionEl.textContent = day.summary;
  };

  const renderForecastList = () => {
    const list = qs(".forecast-list");
    if (!list) return;

    list.innerHTML = "";

    dailyForecast.forEach((day) => {
      const item = document.createElement("li");
      item.dataset.id = day.id;
      item.classList.toggle("is-active", day.id === activeDayId);
      item.innerHTML = `
        <span class="forecast-day">${day.dayName}</span>
        <span class="forecast-icon" aria-hidden="true">${day.icon}</span>
        <span>${formatTemp(day.temp.high)} / ${formatTemp(day.temp.low)}</span>
        <span>AQI ${day.aqi}</span>
      `;

      item.addEventListener("click", () => {
        activeDayId = day.id;
        updateView();
      });

      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activeDayId = day.id;
          updateView();
        }
      });

      item.tabIndex = 0;
      list.appendChild(item);
    });
  };

  const renderHourly = (day) => {
    const container = qs(".hourly-chart");
    const summary = qs("#hourly-summary");
    if (!container || !summary) return;

    container.innerHTML = "";
    summary.textContent = `${day.summary} · Max UV ${Math.max(...day.hourly.map((h) => h.uv))}`;

    const maxTemp = Math.max(...day.hourly.map((hour) => hour.temperature));

    day.hourly.forEach((hour) => {
      const card = document.createElement("div");
      card.className = "hour";
      const barHeight = (hour.temperature / maxTemp) * 160 + 20;
      card.innerHTML = `
        <div class="hour__bar" style="height: ${barHeight}px">${formatTemp(hour.temperature)}</div>
        <span class="hour__time">${hour.time}</span>
      `;
      container.appendChild(card);
    });
  };

  const renderInsights = (day) => {
    const grid = qs(".insight-grid");
    if (!grid) return;

    grid.innerHTML = "";
    day.insights.forEach((insight) => {
      const card = document.createElement("article");
      card.className = "insight";
      card.innerHTML = `
        <span class="insight__label">${insight.label}</span>
        <span class="insight__value">${insight.value}</span>
        <p class="insight__trend">${insight.trend}</p>
      `;
      grid.appendChild(card);
    });
  };

  const updateUnitToggle = () => {
    const button = qs("#unit-toggle");
    if (!button) return;

    button.textContent = useMetric ? "Switch to °F" : "Switch to °C";
    button.setAttribute("aria-pressed", String(!useMetric));
  };

  const updateView = () => {
    const activeDay = dailyForecast.find((day) => day.id === activeDayId);
    if (!activeDay) return;

    renderForecastList();
    renderSummary(activeDay);
    renderHourly(activeDay);
    renderInsights(activeDay);
    updateUnitToggle();
  };

  const bindUnitToggle = () => {
    const button = qs("#unit-toggle");
    if (!button) return;

    button.addEventListener("click", () => {
      useMetric = !useMetric;
      updateView();
    });
  };

  const init = () => {
    bindUnitToggle();
    updateView();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
