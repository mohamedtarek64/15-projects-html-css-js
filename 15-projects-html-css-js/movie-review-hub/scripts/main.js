(() => {
  "use strict";

  const films = [
    {
      id: "solace-echo",
      title: "Solace Echo",
      director: "Marina Ortiz",
      genre: ["Drama", "Festival Winner"],
      mood: ["heartfelt", "slow burn"],
      rating: 92,
      release: "2025-10-18",
      synopsis:
        "A grief counsellor reconnects with his estranged daughter during a community sound bath retreat.",
      buzz: 92,
      feature: {
        headline: "Cannes Critics' Darling",
        description:
          "Claiming the Grand Prix at Cannes, Solace Echo is a tender meditation on healing with a luminous lead performance.",
      },
    },
    {
      id: "neon-rift",
      title: "Neon Rift",
      director: "Ibrahim Carter",
      genre: ["Sci-Fi", "Thriller"],
      mood: ["intense", "stylised"],
      rating: 88,
      release: "2025-11-02",
      synopsis:
        "In a climate-fractured Lagos, a data courier uncovers a corporate plan to weaponise weather satellites.",
      buzz: 94,
      feature: {
        headline: "Midnight Madness Standout",
        description:
          "Pulsating synths, glitchy visuals, and a breakout lead performance. Variety calls it “Blade Runner by way of Afrofuturism”.",
      },
    },
    {
      id: "kintsugi",
      title: "Kintsugi",
      director: "Aya Kudo",
      genre: ["Romance", "Drama"],
      mood: ["poetic", "quiet"],
      rating: 96,
      release: "2025-09-09",
      synopsis:
        "Two ceramicists in Kyoto rebuild their relationship as they restore a collection of shattered heirlooms.",
      buzz: 89,
      feature: {
        headline: "Audience Award · TIFF",
        description:
          "An achingly beautiful ode to second chances—The Hollywood Reporter compared it to Wong Kar-wai at his dreamiest.",
      },
    },
    {
      id: "afterlight",
      title: "Afterlight District",
      director: "Shira Mukherjee",
      genre: ["Documentary"],
      mood: ["thoughtful", "activist"],
      rating: 85,
      release: "2025-12-01",
      synopsis:
        "A portrait of the women engineers building India’s first community-owned solar microgrids.",
      buzz: 86,
      feature: {
        headline: "DOC NYC Spotlight",
        description:
          "A hopeful doc that shows climate resilience powered by community. Expect awards buzz.",
      },
    },
    {
      id: "gravel-heart",
      title: "Gravel Heart Motel",
      director: "Jules Bennett",
      genre: ["Neo-noir", "Mystery"],
      mood: ["dark", "twisty"],
      rating: 79,
      release: "2025-11-21",
      synopsis:
        "A night manager in Arizona juggles disappearances and a podcast crew digging for secrets.",
      buzz: 75,
      feature: null,
    },
  ];

  const moods = [
    { id: "all", label: "All vibes" },
    { id: "heartfelt", label: "Heartfelt" },
    { id: "slow burn", label: "Slow burn" },
    { id: "intense", label: "Intense" },
    { id: "stylised", label: "Stylised" },
    { id: "activist", label: "Activist" },
  ];

  const genres = [
    { id: "all", label: "All genres" },
    { id: "Drama", label: "Drama" },
    { id: "Sci-Fi", label: "Sci-Fi" },
    { id: "Thriller", label: "Thriller" },
    { id: "Romance", label: "Romance" },
    { id: "Documentary", label: "Documentary" },
    { id: "Festival Winner", label: "Festival Winners" },
  ];

  const critics = [
    {
      critic: "Lara Khouri · The Frame",
      quote:
        "“Neon Rift is thunderous—its politics land as hard as its action sequences, thanks to Ibrahim Carter’s confident direction.”",
    },
    {
      critic: "Martín Delgado · Cahiers du Cinéma",
      quote:
        "“Kintsugi is a masterclass in restraint; every pause and silence speaks volumes about love rediscovered.”",
    },
    {
      critic: "Dev Patel · Vox Populi",
      quote:
        "“Afterlight District might be the climate doc of the year—its subjects feel like heroes, not victims.”",
    },
  ];

  const boxOffice = [
    { rank: 1, title: "Neon Rift", revenue: "$56.2M" },
    { rank: 2, title: "Past Lives Reframed", revenue: "$41.7M" },
    { rank: 3, title: "Atlas of Echoes", revenue: "$28.4M" },
    { rank: 4, title: "Gravel Heart Motel", revenue: "$18.9M" },
    { rank: 5, title: "Quantum Choir", revenue: "$12.1M" },
  ];

  const festivals = [
    { event: "Sundance Film Festival", date: "Jan 18 · Park City" },
    { event: "Berlinale", date: "Feb 13 · Berlin" },
    { event: "SXSW Film", date: "Mar 7 · Austin" },
    { event: "Tribeca", date: "Jun 5 · NYC" },
  ];

  const elements = {
    featureHighlight: document.querySelector("#feature-highlight"),
    genreChips: document.querySelector("#genre-chips"),
    moodChips: document.querySelector("#mood-chips"),
    filmGrid: document.querySelector("#film-grid"),
    gridTitle: document.querySelector("#grid-title"),
    gridSubtitle: document.querySelector("#grid-subtitle"),
    reviewsList: document.querySelector("#reviews-list"),
    watchlist: document.querySelector("#watchlist"),
    boxOffice: document.querySelector("#box-office"),
    festivalCalendar: document.querySelector("#festival-calendar"),
    sortSelect: document.querySelector("#sort-select"),
    newsletterForm: document.querySelector("#newsletter-form"),
    newsletterEmail: document.querySelector("#newsletter-email"),
    newsletterStatus: document.querySelector("#newsletter-status"),
    toggleButtons: document.querySelectorAll(".toggle"),
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector("#search-film"),
  };

  const state = {
    genre: "all",
    mood: "all",
    sort: "buzz",
    feed: "curated",
    query: "",
    watchlist: new Set(),
  };

  const formatRelease = (isoDate) =>
    new Date(isoDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

  const renderFeature = () => {
    if (!elements.featureHighlight) return;
    const featureFilm = films.find((film) => film.feature) ?? films[0];
    if (!featureFilm.feature) return;
    const { headline, description } = featureFilm.feature;
    elements.featureHighlight.innerHTML = `
      <span>${headline}</span>
      <strong>${featureFilm.title}</strong>
      <p>${description}</p>
      <button class="btn btn-primary" data-id="${featureFilm.id}">Add to watchlist</button>
    `;
    elements.featureHighlight.querySelector("button")?.addEventListener("click", () => {
      state.watchlist.add(featureFilm.id);
      renderWatchlist();
    });
  };

  const renderFilters = () => {
    if (elements.genreChips) {
      elements.genreChips.innerHTML = "";
      genres.forEach((genre) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `chip${state.genre === genre.id ? " is-active" : ""}`;
        button.textContent = genre.label;
        button.dataset.genre = genre.id;
        elements.genreChips.appendChild(button);
      });
    }
    if (elements.moodChips) {
      elements.moodChips.innerHTML = "";
      moods.forEach((mood) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `chip${state.mood === mood.id ? " is-active" : ""}`;
        button.textContent = mood.label;
        button.dataset.mood = mood.id;
        elements.moodChips.appendChild(button);
      });
    }
  };

  const getFilteredFilms = () => {
    return films
      .filter((film) => (state.genre === "all" ? true : film.genre.includes(state.genre)))
      .filter((film) => (state.mood === "all" ? true : film.mood.includes(state.mood)))
      .filter((film) => {
        if (!state.query) return true;
        const q = state.query.toLowerCase();
        return (
          film.title.toLowerCase().includes(q) ||
          film.director.toLowerCase().includes(q) ||
          film.genre.some((g) => g.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        if (state.sort === "rating") return b.rating - a.rating;
        if (state.sort === "release") return new Date(b.release).getTime() - new Date(a.release).getTime();
        return b.buzz - a.buzz;
      });
  };

  const renderFilms = () => {
    if (!elements.filmGrid) return;
    const filtered = getFilteredFilms();
    elements.filmGrid.innerHTML = "";
    filtered.forEach((film) => {
      const card = document.createElement("article");
      card.className = "film-card";
      card.innerHTML = `
        <div class="film-card__top">
          <div>
            <h3>${film.title}</h3>
            <p class="film-card__meta">${film.director} · ${film.genre.join(", ")} · ${formatRelease(film.release)}</p>
          </div>
          <span class="film-card__rating">${film.rating}/100</span>
        </div>
        <p class="film-card__synopsis">${film.synopsis}</p>
        <div class="film-card__footer">
          <button class="btn ${state.watchlist.has(film.id) ? "btn-outline" : "btn-primary"}" data-action="watch" data-id="${
        film.id
      }">
            ${state.watchlist.has(film.id) ? "In watchlist" : "Save"}
          </button>
          <a class="btn btn-outline" href="#" aria-label="Read full review for ${film.title}">Read review</a>
        </div>
      `;
      elements.filmGrid.appendChild(card);
    });
  };

  const renderReviews = () => {
    if (!elements.reviewsList) return;
    elements.reviewsList.innerHTML = "";
    critics.forEach((review) => {
      const card = document.createElement("article");
      card.className = "review-card";
      card.innerHTML = `
        <p>${review.quote}</p>
        <span>${review.critic}</span>
      `;
      elements.reviewsList.appendChild(card);
    });
  };

  const renderWatchlist = () => {
    if (!elements.watchlist) return;
    elements.watchlist.innerHTML = "";
    const savedFilms = films.filter((film) => state.watchlist.has(film.id));
    if (savedFilms.length === 0) {
      elements.watchlist.innerHTML = "<li>You haven't saved any films yet.</li>";
      return;
    }
    savedFilms.forEach((film) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${film.title}</strong>
        <span>${film.director} · ${film.genre.join(", ")}</span>
        <button class="btn btn-outline" data-action="remove" data-id="${film.id}">Remove</button>
      `;
      elements.watchlist.appendChild(li);
    });
  };

  const renderBoxOffice = () => {
    if (!elements.boxOffice) return;
    elements.boxOffice.innerHTML = "";
    boxOffice.forEach((entry) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${entry.rank}. ${entry.title}</span>
        <span>${entry.revenue}</span>
      `;
      elements.boxOffice.appendChild(li);
    });
  };

  const renderFestivals = () => {
    if (!elements.festivalCalendar) return;
    elements.festivalCalendar.innerHTML = "";
    festivals.forEach((festival) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${festival.event}</strong>
        <span>${festival.date}</span>
      `;
      elements.festivalCalendar.appendChild(li);
    });
  };

  const renderAll = () => {
    renderFeature();
    renderFilters();
    renderFilms();
    renderReviews();
    renderWatchlist();
    renderBoxOffice();
    renderFestivals();
  };

  const bindEvents = () => {
    elements.genreChips?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      const genre = target.dataset.genre;
      if (!genre) return;
      state.genre = genre;
      renderFilters();
      renderFilms();
    });

    elements.moodChips?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      const mood = target.dataset.mood;
      if (!mood) return;
      state.mood = mood;
      renderFilters();
      renderFilms();
    });

    elements.filmGrid?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      if (target.dataset.action === "watch" && target.dataset.id) {
        const id = target.dataset.id;
        if (state.watchlist.has(id)) {
          state.watchlist.delete(id);
        } else {
          state.watchlist.add(id);
        }
        renderFilms();
        renderWatchlist();
      }
    });

    elements.watchlist?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      if (target.dataset.action === "remove" && target.dataset.id) {
        state.watchlist.delete(target.dataset.id);
        renderWatchlist();
        renderFilms();
      }
    });

    elements.sortSelect?.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLSelectElement)) return;
      state.sort = target.value;
      renderFilms();
    });

    elements.toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const feed = button.dataset.feed;
        if (!feed || feed === state.feed) return;
        state.feed = feed;
        elements.toggleButtons.forEach((btn) => btn.classList.toggle("is-active", btn === button));
        elements.gridTitle.textContent = feed === "curated" ? "Highlights" : "Your saved picks";
        elements.gridSubtitle.textContent =
          feed === "curated"
            ? "Fresh out of festivals and critic roundups."
            : "Films you saved for later.";
        renderFilms();
      });
    });

    elements.searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      state.query = elements.searchInput?.value.trim().toLowerCase() ?? "";
      renderFilms();
    });

    elements.searchInput?.addEventListener("input", () => {
      state.query = elements.searchInput?.value.trim().toLowerCase() ?? "";
      renderFilms();
    });

    elements.newsletterForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!elements.newsletterEmail || !elements.newsletterStatus) return;
      const email = elements.newsletterEmail.value.trim();
      if (!email) return;
      elements.newsletterStatus.textContent = "🎬 Thanks! We'll send the next issue on Friday.";
      elements.newsletterEmail.value = "";
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderAll();
    bindEvents();
  });
})();
