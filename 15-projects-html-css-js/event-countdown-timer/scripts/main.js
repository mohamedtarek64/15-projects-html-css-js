(() => {
  "use strict";

  const sessions = [
    {
      id: "opening-keynote",
      title: "Opening keynote · Designing resilient product ecosystems",
      start: "2025-03-27T01:00:00Z",
      end: "2025-03-27T01:45:00Z",
      speaker: "Aria Chen · VP Product, Helius",
      track: "Main stage",
    },
    {
      id: "design-lab",
      title: "Design Lab · Measuring delight beyond NPS",
      start: "2025-03-27T02:15:00Z",
      end: "2025-03-27T03:30:00Z",
      speaker: "Rafael Soto · Head of Research, Lumos",
      track: "Studio A",
    },
    {
      id: "engineering-roundtable",
      title: "Engineering Roundtable · Shipping AI responsibly at scale",
      start: "2025-03-27T04:00:00Z",
      end: "2025-03-27T05:10:00Z",
      speaker: "Panel with Stripe, Grab, Thoughtworks",
      track: "Studio B",
    },
    {
      id: "night-salon",
      title: "Night Salon · Rooftop networking & sonic landscapes",
      start: "2025-03-27T12:00:00Z",
      end: "2025-03-27T14:00:00Z",
      speaker: "Curated by Atlas Collective",
      track: "Sky Deck",
    },
  ];

  const milestones = [
    {
      label: "Speaker tech checks",
      detail: "March 21 · Remote rehearsals & AV verification for all speakers.",
    },
    {
      label: "Attendee onboarding",
      detail: "March 24 · Access to the backstage app and networking concierge.",
    },
    {
      label: "Production load-in",
      detail: "March 26 · Stage build, LED mapping, and rehearsal block.",
    },
  ];

  const elements = {
    countdownDays: document.querySelector("#count-days"),
    countdownHours: document.querySelector("#count-hours"),
    countdownMinutes: document.querySelector("#count-minutes"),
    countdownSeconds: document.querySelector("#count-seconds"),
    nextTitle: document.querySelector("#next-title"),
    nextMeta: document.querySelector("#next-meta"),
    agendaList: document.querySelector("#agenda-list"),
    timezoneLabel: document.querySelector("#timezone-label"),
    localTime: document.querySelector("#local-time"),
    milestonesList: document.querySelector("#milestones-list"),
    reminderForm: document.querySelector("#reminder-form"),
    reminderInput: document.querySelector("#reminder-email"),
    reminderStatus: document.querySelector("#reminder-status"),
    resetBtn: document.querySelector("#reset-to-next"),
  };

  const state = {
    selectedSessionId: null,
    countdownInterval: null,
    clockInterval: null,
  };

  const getTimezoneLabel = () => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz ? `${tz} (${new Date().toLocaleTimeString("en-US", { timeZoneName: "short" }).split(" ").pop()})` : "Local time";
  };

  const formatTimeRange = (startISO, endISO) => {
    const startDate = new Date(startISO);
    const endDate = new Date(endISO);
    const options = { hour: "2-digit", minute: "2-digit" };
    const startStr = startDate.toLocaleTimeString([], options);
    const endStr = endDate.toLocaleTimeString([], options);
    return `${startStr} – ${endStr}`;
  };

  const findNextSession = () => {
    const now = Date.now();
    return sessions.find((session) => new Date(session.start).getTime() > now) ?? sessions[sessions.length - 1];
  };

  const setSelectedSession = (id, manual = false) => {
    state.selectedSessionId = id;
    renderAgenda();
    updateCountdown();
    if (manual && elements.reminderStatus) {
      elements.reminderStatus.textContent = "";
    }
  };

  const renderAgenda = () => {
    if (!elements.agendaList) return;
    elements.agendaList.innerHTML = "";
    const now = Date.now();
    sessions.forEach((session) => {
      const start = new Date(session.start);
      const end = new Date(session.end);
      const isActive = state.selectedSessionId === session.id;
      const li = document.createElement("li");
      li.className = `agenda-card${isActive ? " is-active" : ""}`;
      li.tabIndex = 0;
      li.dataset.id = session.id;
      li.innerHTML = `
        <div class="agenda-card__meta">
          <span>${formatTimeRange(session.start, session.end)}</span>
          <span>${session.track}</span>
          <span>${start > now ? "Upcoming" : end > now ? "Live" : "Completed"}</span>
        </div>
        <h4>${session.title}</h4>
        <p>${session.speaker}</p>
      `;
      li.addEventListener("click", () => setSelectedSession(session.id, true));
      li.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setSelectedSession(session.id, true);
        }
      });
      elements.agendaList.appendChild(li);
    });
  };

  const renderMilestones = () => {
    if (!elements.milestonesList) return;
    elements.milestonesList.innerHTML = "";
    milestones.forEach((milestone) => {
      const li = document.createElement("li");
      li.className = "milestone-item";
      li.innerHTML = `<span>${milestone.label}</span><p>${milestone.detail}</p>`;
      elements.milestonesList.appendChild(li);
    });
  };

  const updateCountdown = () => {
    const session =
      sessions.find((item) => item.id === state.selectedSessionId) ?? findNextSession();
    state.selectedSessionId = session.id;

    const startTime = new Date(session.start).getTime();
    const now = Date.now();
    const diff = Math.max(startTime - now, 0);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (elements.countdownDays) elements.countdownDays.textContent = String(days).padStart(2, "0");
    if (elements.countdownHours) elements.countdownHours.textContent = String(hours).padStart(2, "0");
    if (elements.countdownMinutes) elements.countdownMinutes.textContent = String(minutes).padStart(2, "0");
    if (elements.countdownSeconds) elements.countdownSeconds.textContent = String(seconds).padStart(2, "0");

    if (elements.nextTitle) elements.nextTitle.textContent = session.title;
    if (elements.nextMeta) {
      const startLocal = new Date(session.start).toLocaleString(undefined, {
        weekday: "long",
        hour: "numeric",
        minute: "2-digit",
      });
      elements.nextMeta.textContent = `${startLocal} · ${session.track} · ${session.speaker}`;
    }
  };

  const startCountdown = () => {
    if (state.countdownInterval) window.clearInterval(state.countdownInterval);
    updateCountdown();
    state.countdownInterval = window.setInterval(updateCountdown, 1000);
  };

  const startClock = () => {
    const tick = () => {
      if (elements.localTime) {
        elements.localTime.textContent = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      }
    };
    tick();
    if (state.clockInterval) window.clearInterval(state.clockInterval);
    state.clockInterval = window.setInterval(tick, 1000);
  };

  const bindEvents = () => {
    elements.reminderForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!elements.reminderInput || !elements.reminderStatus) return;
      const email = elements.reminderInput.value.trim();
      if (!email) return;
      elements.reminderStatus.textContent = "✅ Reminders scheduled. Expect nudges 15 minutes before each session.";
      elements.reminderInput.value = "";
    });

    elements.resetBtn?.addEventListener("click", () => {
      const next = findNextSession();
      setSelectedSession(next.id);
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (elements.timezoneLabel) {
      elements.timezoneLabel.textContent = getTimezoneLabel();
    }
    renderMilestones();
    setSelectedSession(findNextSession().id);
    startCountdown();
    startClock();
    bindEvents();
  });
})();
