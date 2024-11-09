(() => {
  "use strict";

  const rooms = [
    {
      id: "living",
      name: "Living room",
      devices: 6,
      temperature: 22,
      humidity: 45,
      lights: "Dimmed",
      scene: "Relax",
    },
    {
      id: "kitchen",
      name: "Kitchen",
      devices: 5,
      temperature: 21,
      humidity: 38,
      lights: "Task",
      scene: "Cooking",
    },
    {
      id: "bedroom",
      name: "Primary bedroom",
      devices: 4,
      temperature: 20,
      humidity: 40,
      lights: "Warm",
      scene: "Sleep prep",
    },
    {
      id: "office",
      name: "Studio / Office",
      devices: 7,
      temperature: 23,
      humidity: 42,
      lights: "Cool",
      scene: "Deep work",
    },
  ];

  const energyUsage = [
    { day: "Mon", used: 12.6, target: 14 },
    { day: "Tue", used: 15.1, target: 14 },
    { day: "Wed", used: 13.4, target: 14 },
    { day: "Thu", used: 10.8, target: 14 },
    { day: "Fri", used: 11.2, target: 14 },
    { day: "Sat", used: 18.6, target: 14 },
    { day: "Sun", used: 16.3, target: 14 },
  ];

  const automations = [
    {
      id: "morning",
      name: "Morning warm-up",
      schedule: "Weekdays · 06:30",
      actions: "Raise blinds, brew espresso, set living room to 21°C, start radio.",
      active: true,
    },
    {
      id: "bedtime",
      name: "Goodnight sweep",
      schedule: "Daily · 23:00",
      actions: "Lock doors, arm perimeter, lights off except hallway, drop bedroom to 19°C.",
      active: true,
    },
    {
      id: "air-quality",
      name: "Air quality boost",
      schedule: "Sensor triggered",
      actions: "If CO₂ > 900 ppm: open vents, start purifier and notify phone.",
      active: false,
    },
  ];

  const devices = [
    {
      id: "sonos",
      name: "Sonos Arc",
      room: "Living room",
      state: "Playing · 45%",
      type: "media",
    },
    {
      id: "thermostat",
      name: "Nest Thermostat",
      room: "Hallway",
      state: "Auto · 21°C",
      type: "climate",
    },
    {
      id: "lock",
      name: "August lock",
      room: "Front door",
      state: "Locked",
      type: "security",
    },
    {
      id: "garden",
      name: "Garden irrigation",
      room: "Outdoor",
      state: "Idle · Next cycle 19:00",
      type: "utility",
    },
  ];

  const securityLog = [
    {
      time: "08:32",
      event: "Package detected",
      detail: "Front porch camera spotted delivery.",
    },
    {
      time: "07:54",
      event: "Door unlocked",
      detail: "August lock opened by Eliza (phone).",
    },
    {
      time: "07:45",
      event: "Garage closed",
      detail: "Auto-close triggered after inactivity.",
    },
  ];

  const climateZones = [
    { zone: "Living zone", comfort: "Optimal", co2: 612, humidity: 45 },
    { zone: "Sleep zone", comfort: "Cooling", co2: 482, humidity: 42 },
    { zone: "Workspace", comfort: "Focus", co2: 710, humidity: 40 },
  ];

  const alerts = [
    {
      title: "Air filter reminder",
      detail: "Office purifier filter at 85% usage—replace soon.",
    },
    {
      title: "Energy spike yesterday",
      detail: "Saturday energy usage +28% vs average—likely HVAC compensation.",
    },
  ];

  const elements = {
    roomsGrid: document.querySelector("#rooms-grid"),
    energyBars: document.querySelector("#energy-bars"),
    automationList: document.querySelector("#automation-list"),
    devicesList: document.querySelector("#devices-list"),
    securityList: document.querySelector("#security-list"),
    climateZones: document.querySelector("#climate-zones"),
    alertsList: document.querySelector("#alerts-list"),
    sceneAway: document.querySelector("#scene-away"),
    sceneRelax: document.querySelector("#scene-relax"),
    homeStatus: document.querySelector("#home-status"),
    statusMeta: document.querySelector("#status-meta"),
    addRoutine: document.querySelector("#add-routine"),
  };

  const renderRooms = () => {
    if (!elements.roomsGrid) return;
    elements.roomsGrid.innerHTML = "";
    rooms.forEach((room) => {
      const card = document.createElement("article");
      card.className = "room-card";
      card.innerHTML = `
        <div class="room-card__header">
          <h3>${room.name}</h3>
          <span class="room-card__meta">${room.devices} devices</span>
        </div>
        <div class="room-card__metrics">
          <span>🌡️ ${room.temperature}°C</span>
          <span>💧 ${room.humidity}%</span>
          <span>💡 ${room.lights}</span>
        </div>
        <p style="color: var(--text-muted); letter-spacing: 0.05em;">Scene: ${room.scene}</p>
      `;
      elements.roomsGrid.appendChild(card);
    });
  };

  const renderEnergy = () => {
    if (!elements.energyBars) return;
    elements.energyBars.innerHTML = "";
    energyUsage.forEach((day) => {
      const bar = document.createElement("article");
      bar.className = "energy-bar";
      bar.dataset.type = day.used > day.target ? "over" : "within";
      const percent = Math.min((day.used / (day.target * 1.4)) * 100, 100);
      bar.innerHTML = `
        <strong>${day.day}</strong>
        <span>Used: ${day.used.toFixed(1)} kWh</span>
        <span>Target: ${day.target} kWh</span>
        <div class="bar" style="--bar-height:${Math.max(percent, 8)}%;"></div>
        <small style="color:${day.used > day.target ? "var(--energy-negative)" : "var(--energy-positive)"}">
          ${day.used > day.target ? "+ " : "- "}${Math.abs(day.used - day.target).toFixed(1)} kWh vs target
        </small>
      `;
      elements.energyBars.appendChild(bar);
    });
  };

  const renderAutomations = () => {
    if (!elements.automationList) return;
    elements.automationList.innerHTML = "";
    automations.forEach((routine) => {
      const item = document.createElement("li");
      item.className = "routine-card";
      item.innerHTML = `
        <div>
          <strong>${routine.name}</strong>
          <p style="color: var(--text-muted); letter-spacing: 0.06em;">${routine.schedule}</p>
          <p style="color: var(--text-secondary);">${routine.actions}</p>
        </div>
        <div class="routine-card__actions">
          <button class="btn btn-outline" type="button">${routine.active ? "Pause" : "Activate"}</button>
          <button class="btn btn-outline" type="button">Edit</button>
        </div>
      `;
      elements.automationList.appendChild(item);
    });
  };

  const renderDevices = () => {
    if (!elements.devicesList) return;
    elements.devicesList.innerHTML = "";
    devices.forEach((device) => {
      const item = document.createElement("li");
      item.className = "device-card";
      item.innerHTML = `
        <strong>${device.name}</strong>
        <span class="device-card__meta">${device.room}</span>
        <div class="device-card__controls">
          <p style="color: var(--text-secondary);">${device.state}</p>
          <button type="button">Toggle</button>
        </div>
      `;
      elements.devicesList.appendChild(item);
    });
  };

  const renderSecurity = () => {
    if (!elements.securityList) return;
    elements.securityList.innerHTML = "";
    securityLog.forEach((entry) => {
      const item = document.createElement("li");
      item.className = "security-item";
      item.innerHTML = `
        <strong>${entry.event}</strong>
        <span>${entry.time}</span>
        <p style="color: var(--text-secondary);">${entry.detail}</p>
      `;
      elements.securityList.appendChild(item);
    });
  };

  const renderClimate = () => {
    if (!elements.climateZones) return;
    elements.climateZones.innerHTML = "";
    climateZones.forEach((zone) => {
      const card = document.createElement("div");
      card.className = "climate-card";
      card.innerHTML = `
        <div>
          <strong>${zone.zone}</strong>
          <span>${zone.comfort}</span>
        </div>
        <div style="text-align:right;">
          <span>CO₂ ${zone.co2} ppm</span><br />
          <span>Humidity ${zone.humidity}%</span>
        </div>
      `;
      elements.climateZones.appendChild(card);
    });
  };

  const renderAlerts = () => {
    if (!elements.alertsList) return;
    elements.alertsList.innerHTML = "";
    alerts.forEach((alert) => {
      const item = document.createElement("li");
      item.className = "alert-item";
      item.innerHTML = `
        <strong>${alert.title}</strong>
        <p style="color: var(--text-secondary);">${alert.detail}</p>
      `;
      elements.alertsList.appendChild(item);
    });
  };

  const bindSceneButtons = () => {
    elements.sceneAway?.addEventListener("click", () => {
      if (elements.homeStatus) elements.homeStatus.textContent = "Away scene armed · Doors locked";
      if (elements.statusMeta) elements.statusMeta.textContent = `Last action: Away scene activated at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    });

    elements.sceneRelax?.addEventListener("click", () => {
      if (elements.homeStatus) elements.homeStatus.textContent = "Relax mode · Warm lights · 21°C";
      if (elements.statusMeta) elements.statusMeta.textContent = `Last action: Relax mode at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    });
  };

  const bindAddRoutine = () => {
    elements.addRoutine?.addEventListener("click", () => {
      const newRoutine = {
        id: `custom-${Date.now()}`,
        name: "Custom routine",
        schedule: "Manual · on demand",
        actions: "Add your actions…",
        active: false,
      };
      automations.push(newRoutine);
      renderAutomations();
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderRooms();
    renderEnergy();
    renderAutomations();
    renderDevices();
    renderSecurity();
    renderClimate();
    renderAlerts();
    bindSceneButtons();
    bindAddRoutine();
  });
})();
