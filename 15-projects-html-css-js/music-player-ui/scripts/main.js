(() => {
  "use strict";

  const LOCAL_RECITATION =
    "assets/data/%D8%AA%D9%84%D8%A7%D9%88%D8%A9%20%D8%AE%D8%A7%D8%B4%D8%B9%D8%A9%20%D9%84%D8%B3%D9%88%D8%B1%20%D8%A7%D9%84%D9%85%D8%B2%D9%85%D9%84%20%D8%A7%D9%84%D9%86%D8%A8%D8%A3%20%D8%A7%D9%84%D8%A7%D8%B9%D9%84%D9%89%20%D8%A7%D9%84%D9%85%D8%A7%D8%B9%D9%88%D9%86%20%D8%A8%D8%B5%D9%88%D8%AA%20%D8%A7%D9%84%D9%82%D8%A7%D8%B1%D8%A6%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86%20%D9%85%D8%B3%D8%B9%D8%AF.mp3";

  const tracks = [
    {
      id: "local-001",
      title: "Tilāwah Mix · al-Muzzammil · an-Naba’ · al-A‘lā · al-Mā‘ūn",
      surahNumber: "73 · 78 · 87 · 107",
      reciter: "ʿAbd al-Raḥmān Masad",
      style: "Murattal",
      revelation: "Selected Makki & Madani",
      juz: "29 – 30",
      verses: 110,
      duration: 1200,
      note: "استمع بتأنٍّ، وكرر الآيات التي لامست قلبك. يمكنك وضع علامة ذهنية عند نهاية كل سورة.",
      upcoming: "—",
      mode: "خشوع الليل",
      cover:
        "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=900&q=80",
      src: LOCAL_RECITATION,
    },
  ];

  const remixSuggestions = [
    {
      title: "Al-Fātiḥah · Al-Husary (Murattal)",
      detail: "For steady memorisation pace with light tajwīd markers.",
    },
    {
      title: "Al-Mulk · Saud Al-Shuraim",
      detail: "Measured delivery ideal for evening revision.",
    },
    {
      title: "Ar-Raḥmān · Ali Jaber",
      detail: "Emotive recitation highlighting repeated verses.",
    },
  ];

  let currentIndex = 0;
  let isPlaying = false;
  let isShuffle = false;
  let isRepeat = false;
  let userSeeking = false;

  const audio = document.querySelector("#audio");
  const playBtn = document.querySelector("#play-btn");
  const prevBtn = document.querySelector("#prev-btn");
  const nextBtn = document.querySelector("#next-btn");
  const shuffleBtn = document.querySelector("#shuffle-btn");
  const repeatBtn = document.querySelector("#repeat-btn");
  const volumeSlider = document.querySelector("#volume-slider");
  const progressBar = document.querySelector("#progress-bar");
  const progressHandle = document.querySelector("#progress-handle");
  const timelineBar = document.querySelector(".timeline__bar");
  const currentTimeEl = document.querySelector("#current-time");
  const durationEl = document.querySelector("#track-duration");

  const artEl = document.querySelector("#track-art");
  const artCaption = document.querySelector("#artwork-caption");
  const titleEl = document.querySelector("#track-title");
  const artistEl = document.querySelector("#track-artist");
  const albumEl = document.querySelector("#track-album");
  const moodEl = document.querySelector("#track-mood");
  const energyEl = document.querySelector("#track-energy");
  const releaseEl = document.querySelector("#track-release");
  const transitionEl = document.querySelector("#transition-match");
  const upNextBpmEl = document.querySelector("#up-next-bpm");
  const sessionMoodEl = document.querySelector("#session-mood");

  const queueList = document.querySelector("#queue-list");
  const clearQueueBtn = document.querySelector("#clear-queue");
  const remixList = document.querySelector("#remix-list");

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const formatTime = (seconds) => {
    if (Number.isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);
    return `${minutes}:${remaining.toString().padStart(2, "0")}`;
  };

  const loadTrack = (index) => {
    const track = tracks[index];
    if (!track) return;
    currentIndex = index;
    audio.src = track.src;
    audio.load();

    artEl.src = track.cover;
    artEl.alt = `${track.title} cover art`;
    artCaption.textContent = `${track.title} – ${track.reciter}`;
    titleEl.textContent = track.title;
    artistEl.textContent = `${track.reciter} • Sūrah ${track.surahNumber}`;
    albumEl.textContent = track.reciter;
    moodEl.textContent = track.style;
    energyEl.textContent = `${track.verses} āyāt`;
    releaseEl.textContent = `${track.revelation} · Juz ${track.juz}`;
    sessionMoodEl.textContent = track.mode;
    transitionEl.textContent = track.note;

    const nextTrack = tracks[(index + 1) % tracks.length];
    upNextBpmEl.textContent = nextTrack ? nextTrack.upcoming : "—";

    highlightQueue();
    renderDuration();
  };

  const renderDuration = () => {
    durationEl.textContent = formatTime(audio.duration || tracks[currentIndex]?.duration || 0);
  };

  const updateProgress = () => {
    if (!audio.duration || userSeeking) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
    progressHandle.style.left = `${percent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  };

  const togglePlay = () => {
    if (!audio.src) {
      loadTrack(currentIndex);
    }
    if (isPlaying) {
      audio.pause();
    } else {
      audio
        .play()
        .then(() => {
          /* playback started */
        })
        .catch(() => {
          // fallback if autoplay blocked
        });
    }
  };

  const playTrack = (index) => {
    loadTrack(index);
    audio
      .play()
      .then(() => {
        isPlaying = true;
        updatePlayButton();
      })
      .catch(() => {
        /* ignore */
      });
  };

  const playNext = () => {
    if (isShuffle) {
      const available = tracks.filter((_, idx) => idx !== currentIndex);
      const nextTrackIndex = tracks.indexOf(available[Math.floor(Math.random() * available.length)]);
      playTrack(nextTrackIndex);
      return;
    }
    const nextIndex = (currentIndex + 1) % tracks.length;
    if (nextIndex === 0 && !isRepeat) {
      audio.pause();
      audio.currentTime = 0;
      isPlaying = false;
      updatePlayButton();
      return;
    }
    playTrack(nextIndex);
  };

  const playPrevious = () => {
    if (audio.currentTime > 5) {
      audio.currentTime = 0;
      return;
    }
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevIndex);
  };

  const updatePlayButton = () => {
    playBtn.innerHTML = isPlaying ? "&#10073;&#10073;" : "&#9658;";
  };

  const highlightQueue = () => {
    const items = queueList?.querySelectorAll(".queue-item");
    items?.forEach((item) => {
      const isActive = Number.parseInt(item.dataset.index ?? "-1", 10) === currentIndex;
      item.classList.toggle("is-active", isActive);
    });
  };

  const renderQueue = () => {
    if (!queueList) return;
    queueList.innerHTML = "";
    tracks.forEach((track, index) => {
      const item = document.createElement("li");
      item.className = "queue-item";
      item.dataset.index = String(index);
      item.innerHTML = `
        <span class="queue-item__order">${(index + 1).toString().padStart(2, "0")}</span>
        <div class="queue-item__meta">
          <strong>${track.title}</strong>
          <span>${track.reciter} • ${track.style}</span>
        </div>
        <span class="queue-item__duration">${formatTime(track.duration)}</span>
      `;
      item.addEventListener("click", () => playTrack(index));
      queueList.appendChild(item);
    });
    highlightQueue();
  };

  const renderRemixes = () => {
    if (!remixList) return;
    remixList.innerHTML = "";
    remixSuggestions.forEach((remix) => {
      const item = document.createElement("li");
      item.className = "remix-item";
      item.innerHTML = `
        <div>
          <strong>${remix.title}</strong>
          <span>${remix.detail}</span>
        </div>
        <span>&#9658;</span>
      `;
      remixList.appendChild(item);
    });
  };

  const handleTimelineSeek = (event) => {
    const bar = timelineBar;
    if (!bar || !audio.duration) return;
    const rect = bar.getBoundingClientRect();
    const percent = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    progressBar.style.width = `${percent * 100}%`;
    progressHandle.style.left = `${percent * 100}%`;
    audio.currentTime = percent * audio.duration;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  };

  const bindTimelineDrag = () => {
    if (!progressHandle || !timelineBar) return;
    const startDrag = () => {
      userSeeking = true;
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", endDrag);
    };
    const onDrag = (event) => {
      handleTimelineSeek(event);
    };
    const endDrag = (event) => {
      handleTimelineSeek(event);
      userSeeking = false;
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", endDrag);
    };
    progressHandle.addEventListener("mousedown", startDrag);
    timelineBar.addEventListener("click", (event) => {
      handleTimelineSeek(event);
    });
  };

  const showError = (message) => {
    const existing = document.querySelector(".playback-error");
    if (existing) existing.remove();
    const notice = document.createElement("div");
    notice.className = "playback-error";
    notice.setAttribute("role", "alert");
    notice.textContent = message;
    (playBtn?.parentElement ?? document.body).appendChild(notice);
    setTimeout(() => notice.remove(), 6000);
  };

  const bindEvents = () => {
    playBtn?.addEventListener("click", togglePlay);
    prevBtn?.addEventListener("click", playPrevious);
    nextBtn?.addEventListener("click", playNext);

    shuffleBtn?.addEventListener("click", () => {
      isShuffle = !isShuffle;
      shuffleBtn.setAttribute("aria-pressed", String(isShuffle));
    });

    repeatBtn?.addEventListener("click", () => {
      isRepeat = !isRepeat;
      repeatBtn.setAttribute("aria-pressed", String(isRepeat));
    });

    clearQueueBtn?.addEventListener("click", () => {
      queueList.innerHTML = "";
    });

    volumeSlider?.addEventListener("input", () => {
      audio.volume = clamp(Number.parseFloat(volumeSlider.value), 0, 1);
    });

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    });
    audio.addEventListener("loadedmetadata", renderDuration);
    audio.addEventListener("play", () => {
      isPlaying = true;
      updatePlayButton();
    });
    audio.addEventListener("pause", () => {
      isPlaying = false;
      updatePlayButton();
    });
    audio.addEventListener("error", () => {
      showError("تعذر تشغيل التلاوة. تحقق من الاتصال أو الملف الصوتي ثم أعد المحاولة.");
    });
  };

  const init = () => {
    if (!audio) return;
    audio.crossOrigin = "anonymous";
    renderQueue();
    renderRemixes();
    loadTrack(currentIndex);
    audio.volume = clamp(Number.parseFloat(volumeSlider?.value ?? "0.82"), 0, 1);
    bindEvents();
    bindTimelineDrag();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
