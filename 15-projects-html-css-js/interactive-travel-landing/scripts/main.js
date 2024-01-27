(() => {
  "use strict";

  const destinations = [
    {
      name: "Azul Coastline",
      location: "Comporta, Portugal",
      vibe: ["coastal", "wellness"],
      nights: 6,
      price: 2850,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      tagline: "Private sandbank picnics & sunrise sound baths",
    },
    {
      name: "Kyoto Slowcraft",
      location: "Kyoto, Japan",
      vibe: ["culture", "wellness"],
      nights: 8,
      price: 3620,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1491884662610-dfcd28f30cf6?auto=format&fit=crop&w=900&q=80",
      tagline: "Tea master workshops, hidden gardens, and night markets",
    },
    {
      name: "Andean Pulse",
      location: "Sacred Valley, Peru",
      vibe: ["thrill", "culture"],
      nights: 7,
      price: 3180,
      rating: 4.95,
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
      tagline: "Summit treks paired with micro-distillery tastings",
    },
    {
      name: "Northern Lights Lodge",
      location: "Tromsø, Norway",
      vibe: ["coastal", "wellness", "thrill"],
      nights: 5,
      price: 2985,
      rating: 4.87,
      image:
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
      tagline: "Glass igloos, husky sledding, and aurora photography",
    },
    {
      name: "Atlas Nomad",
      location: "Marrakesh & Atlas Mountains, Morocco",
      vibe: ["culture", "thrill"],
      nights: 6,
      price: 2740,
      rating: 4.82,
      image:
        "https://images.unsplash.com/photo-1529927066849-e4c4c6a9d0d3?auto=format&fit=crop&w=900&q=80",
      tagline: "Riad rooftops, desert caravans, and Berber supper clubs",
    },
    {
      name: "Copenhagen Flow",
      location: "Copenhagen, Denmark",
      vibe: ["culture", "coastal"],
      nights: 4,
      price: 2260,
      rating: 4.78,
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      tagline: "Harbor sauna rituals and Michelin street-food pairings",
    },
  ];

  const experiences = [
    {
      title: "Analog City Walks",
      length: "Half-day",
      focus: "Architecture · Film photography",
      description: "Collect film snaps with a local creative and develop a zine on-site.",
    },
    {
      title: "Chef Residency Suppers",
      length: "Evening",
      focus: "Culinary · Culture",
      description:
        "Seasonal table for twelve featuring visiting chefs & producers from upcoming routes.",
    },
    {
      title: "Altitude Breathwork",
      length: "90 minutes",
      focus: "Wellness · Performance",
      description:
        "Biohacking-inspired thermal rituals hosted between glacier-fed pools and cedar saunas.",
    },
  ];

  const qs = (selector) => document.querySelector(selector);
  const qsa = (selector) => Array.from(document.querySelectorAll(selector));

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const renderDestinations = (filter = "all") => {
    const grid = qs(".destination-grid");
    if (!grid) return;

    grid.innerHTML = "";

    const filtered =
      filter === "all" ? destinations : destinations.filter((item) => item.vibe.includes(filter));

    filtered.forEach((destination) => {
      const card = document.createElement("article");
      card.className = "card";
      card.setAttribute("role", "listitem");

      card.innerHTML = `
        <div class="card__image">
          <img src="${destination.image}" alt="${destination.name}" loading="lazy" />
          <span class="card__badge">${destination.vibe[0] ?? "Explore"}</span>
        </div>
        <div class="card__body">
          <div class="card__meta">
            <span>${destination.location}</span>
            <span>${destination.nights} nights</span>
          </div>
          <h3 class="card__title">${destination.name}</h3>
          <p>${destination.tagline}</p>
          <div class="card__tags">
            ${destination.vibe
              .map((tag) => `<span class="tag">${tag.replace(/^(.)/, (m) => m.toUpperCase())}</span>`)
              .join("")}
          </div>
          <div class="card__footer">
            <span>${formatCurrency(destination.price)}</span>
            <span>&#9733; ${destination.rating.toFixed(2)}</span>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });
  };

  const renderExperiences = () => {
    const list = qs(".experience-list");
    if (!list) return;

    experiences.forEach((experience) => {
      const item = document.createElement("li");
      item.className = "experience";
      item.innerHTML = `
        <h3 class="experience__title">${experience.title}</h3>
        <div class="experience__meta">
          <span>${experience.length}</span>
          <span>${experience.focus}</span>
        </div>
        <p>${experience.description}</p>
      `;
      list.appendChild(item);
    });
  };

  const handleFilters = () => {
    qsa(".filter").forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter ?? "all";
        renderDestinations(filter);
        qsa(".filter").forEach((btn) => {
          const isSelected = btn === button;
          btn.classList.toggle("is-active", isSelected);
          btn.setAttribute("aria-selected", String(isSelected));
        });
      });
    });
  };

  const toggleNavigation = () => {
    const toggle = qs(".navigation__toggle");
    const menu = qs(".navigation__links");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("is-open", !expanded);
    });
  };

  const handleNewsletter = () => {
    const form = qs(".newsletter__form");
    const feedback = qs(".form-feedback");
    if (!form || !feedback) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput = form.elements.namedItem("email");
      if (!(emailInput instanceof HTMLInputElement)) return;

      const email = emailInput.value.trim();
      if (!email || !email.includes("@")) {
        feedback.textContent = "Pop in a valid email and we will send the next dispatch.";
        feedback.style.color = "#fca5a5";
        emailInput.focus();
        return;
      }

      feedback.textContent = "All set! Watch your inbox for upcoming journeys.";
      feedback.style.color = "#34d399";
      emailInput.value = "";
    });
  };

  const init = () => {
    renderDestinations();
    renderExperiences();
    handleFilters();
    toggleNavigation();
    handleNewsletter();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
