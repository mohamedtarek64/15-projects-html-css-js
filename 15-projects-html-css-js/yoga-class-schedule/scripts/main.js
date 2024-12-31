(() => {
  "use strict";

  const classes = [
    {
      id: "sunrise-vinyasa",
      title: "Sunrise Vinyasa",
      day: "Mon",
      time: "06:45",
      teacher: "Noor",
      style: "Vinyasa",
      intensity: "Medium",
      duration: 60,
      capacity: "12 mats",
    },
    {
      id: "power-hour",
      title: "Power Hour",
      day: "Mon",
      time: "18:00",
      teacher: "Amelia",
      style: "Power",
      intensity: "High",
      duration: 60,
      capacity: "15 mats",
    },
    {
      id: "yin-nidra",
      title: "Yin + Yoga Nidra",
      day: "Tue",
      time: "20:30",
      teacher: "Ravi",
      style: "Yin",
      intensity: "Low",
      duration: 75,
      capacity: "16 mats",
    },
    {
      id: "lunch-flow",
      title: "Lunch Express Flow",
      day: "Wed",
      time: "12:15",
      teacher: "Maya",
      style: "Flow",
      intensity: "Medium",
      duration: 45,
      capacity: "10 mats",
    },
    {
      id: "sound-bath",
      title: "Restorative Sound Bath",
      day: "Thu",
      time: "19:45",
      teacher: "Lian",
      style: "Restorative",
      intensity: "Low",
      duration: 70,
      capacity: "18 mats",
    },
    {
      id: "hot-sculpt",
      title: "Hot Sculpt",
      day: "Fri",
      time: "17:15",
      teacher: "Amelia",
      style: "Power",
      intensity: "High",
      duration: 50,
      capacity: "Full · waitlist",
    },
    {
      id: "prenatal",
      title: "Prenatal Flow",
      day: "Sat",
      time: "10:00",
      teacher: "Noor",
      style: "Prenatal",
      intensity: "Low",
      duration: 60,
      capacity: "12 mats",
    },
    {
      id: "sunset-sadhana",
      title: "Sunset Sadhana (virtual)",
      day: "Sun",
      time: "18:30",
      teacher: "Ravi",
      style: "Meditation",
      intensity: "Low",
      duration: 45,
      capacity: "Zoom broadcast",
    },
  ];

  const teachers = [
    { name: "Noor", focus: "Prenatal · Slow Flow", vibe: "Grounding playlists" },
    { name: "Amelia", focus: "Power · Sculpt", vibe: "High-energy remixes" },
    { name: "Ravi", focus: "Meditation · Breathwork", vibe: "Ragas & sound healing" },
    { name: "Maya", focus: "Flow · Mobility", vibe: "Indie beats" },
    { name: "Lian", focus: "Yin · Restorative", vibe: "Ambient textures" },
  ];

  const memberships = [
    { name: "Drop-in", price: "$28", detail: "Reserve any class · expires in 30 days." },
    { name: "Unlimited monthly", price: "$179", detail: "Unlimited in-studio + 3 guest passes." },
    { name: "Hybrid pass", price: "$129", detail: "8 studio classes + unlimited virtual flows." },
  ];

  const stats = [
    { label: "Weekly classes", value: "22 offerings" },
    { label: "Teachers", value: "8 guides" },
    { label: "Avg class size", value: "13 mats" },
  ];

  const events = [
    { title: "Autumn Equinox Retreat · Catskills", date: "Sep 27 – Sep 29" },
    { title: "Handstand Lab with Maya", date: "Oct 19 · Studio Meraki" },
    { title: "New Moon Sound Journey", date: "Nov 4 · Rooftop Series" },
  ];

  const styles = ["All styles", "Vinyasa", "Power", "Yin", "Flow", "Restorative", "Prenatal", "Meditation"];
  const intensities = ["All intensities", "Low", "Medium", "High"];

  const featured = {
    title: "Yin + Yoga Nidra",
    subtitle: "Deep reset with Ravi · Tuesday 20:30",
    description:
      "75 minutes of floor work, breath weaving, and vibrational bowls. Perfect if you’ve been staring at screens all day.",
  };

  const elements = {
    featuredClass: document.querySelector("#featured-class"),
    styleChips: document.querySelector("#style-chips"),
    intensityChips: document.querySelector("#intensity-chips"),
    scheduleGrid: document.querySelector("#schedule-grid"),
    teachersList: document.querySelector("#teachers-list"),
    membershipList: document.querySelector("#membership-list"),
    statsGrid: document.querySelector("#stats-grid"),
    eventsList: document.querySelector("#events-list"),
    waitlistForm: document.querySelector("#waitlist-form"),
    waitlistStatus: document.querySelector("#waitlist-status"),
    waitlistName: document.querySelector("#waitlist-name"),
    waitlistPhone: document.querySelector("#waitlist-phone"),
    scheduleTitle: document.querySelector("#schedule-title"),
    scheduleMeta: document.querySelector("#schedule-meta"),
  };

  const state = {
    style: "All styles",
    intensity: "All intensities",
    view: "week",
  };

  const renderFeatured = () => {
    if (!elements.featuredClass) return;
    elements.featuredClass.innerHTML = `
      <span>Featured class</span>
      <strong>${featured.title}</strong>
      <p>${featured.subtitle}</p>
      <p>${featured.description}</p>
    `;
  };

  const renderChips = () => {
    if (elements.styleChips) {
      elements.styleChips.innerHTML = "";
      styles.forEach((style) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = `chip${state.style === style ? " is-active" : ""}`;
        chip.textContent = style;
        chip.dataset.style = style;
        elements.styleChips.appendChild(chip);
      });
    }
    if (elements.intensityChips) {
      elements.intensityChips.innerHTML = "";
      intensities.forEach((intensity) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = `chip${state.intensity === intensity ? " is-active" : ""}`;
        chip.textContent = intensity;
        chip.dataset.intensity = intensity;
        elements.intensityChips.appendChild(chip);
      });
    }
  };

  const getFilteredClasses = () => {
    return classes
      .filter((session) => state.view === "week" || session.day === state.view)
      .filter((session) => state.style === "All styles" || session.style === state.style)
      .filter((session) => state.intensity === "All intensities" || session.intensity === state.intensity);
  };

  const renderSchedule = () => {
    if (!elements.scheduleGrid) return;
    const filtered = getFilteredClasses();
    elements.scheduleMeta.textContent = `${filtered.length} classes match your filters`;

    elements.scheduleGrid.innerHTML = "";
    filtered.forEach((session) => {
      const card = document.createElement("article");
      card.className = "class-card";
      card.innerHTML = `
        <header>
          <h3>${session.title}</h3>
          <div class="class-card__meta">
            <span>${session.day}</span>
            <span>${session.time}</span>
          </div>
        </header>
        <p>${session.teacher} · ${session.style} · ${session.duration} mins</p>
        <div class="class-card__footer">
          <span>${session.capacity}</span>
          <span>${session.intensity} intensity</span>
        </div>
      `;
      elements.scheduleGrid.appendChild(card);
    });
  };

  const renderTeachers = () => {
    if (!elements.teachersList) return;
    elements.teachersList.innerHTML = "";
    teachers.forEach((teacher) => {
      const li = document.createElement("li");
      li.className = "teacher-card";
      li.innerHTML = `
        <strong>${teacher.name}</strong>
        <span>Focus: ${teacher.focus}</span>
        <span>Vibe: ${teacher.vibe}</span>
      `;
      elements.teachersList.appendChild(li);
    });
  };

  const renderMemberships = () => {
    if (!elements.membershipList) return;
    elements.membershipList.innerHTML = "";
    memberships.forEach((plan) => {
      const li = document.createElement("li");
      li.className = "membership-card";
      li.innerHTML = `
        <strong>${plan.name}</strong>
        <span>${plan.price}</span>
        <span>${plan.detail}</span>
      `;
      elements.membershipList.appendChild(li);
    });
  };

  const renderStats = () => {
    if (!elements.statsGrid) return;
    elements.statsGrid.innerHTML = "";
    stats.forEach((stat) => {
      const li = document.createElement("li");
      li.className = "stat-card";
      li.innerHTML = `
        <span>${stat.label}</span>
        <strong>${stat.value}</strong>
      `;
      elements.statsGrid.appendChild(li);
    });
  };

  const renderEvents = () => {
    if (!elements.eventsList) return;
    elements.eventsList.innerHTML = "";
    events.forEach((event) => {
      const li = document.createElement("li");
      li.className = "event-card";
      li.innerHTML = `
        <strong>${event.title}</strong>
        <span>${event.date}</span>
      `;
      elements.eventsList.appendChild(li);
    });
  };

  const bindChips = () => {
    elements.styleChips?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      const style = target.dataset.style;
      if (!style) return;
      state.style = style;
      renderChips();
      renderSchedule();
    });

    elements.intensityChips?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      const intensity = target.dataset.intensity;
      if (!intensity) return;
      state.intensity = intensity;
      renderChips();
      renderSchedule();
    });
  };

  const bindWaitlist = () => {
    elements.waitlistForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!elements.waitlistStatus || !elements.waitlistName || !elements.waitlistPhone) return;
      const name = elements.waitlistName.value.trim();
      const phone = elements.waitlistPhone.value.trim();
      if (!name || !phone) return;
      elements.waitlistStatus.textContent = "✨ Thanks! You'll get a text if a mat opens up.";
      elements.waitlistForm.reset();
      window.setTimeout(() => {
        elements.waitlistStatus && (elements.waitlistStatus.textContent = "");
      }, 5000);
    });
  };

  const bindViewToggle = () => {
    document.querySelectorAll(".schedule-switcher .toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const view = button.dataset.view;
        if (!view || view === state.view) return;
        state.view = view === "day" ? new Date().toLocaleString(undefined, { weekday: "short" }) : "week";
        document.querySelectorAll(".schedule-switcher .toggle").forEach((btn) => {
          btn.classList.toggle("is-active", btn === button);
        });
        if (elements.scheduleTitle) {
          elements.scheduleTitle.textContent =
            view === "day"
              ? `Today · ${new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}`
              : "Week of Oct 14 – Oct 20";
        }
        renderSchedule();
      });
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderFeatured();
    renderChips();
    renderSchedule();
    renderTeachers();
    renderMemberships();
    renderStats();
    renderEvents();
    bindChips();
    bindWaitlist();
    bindViewToggle();
  });
})();
