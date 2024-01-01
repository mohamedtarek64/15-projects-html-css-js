(() => {
  "use strict";

  const photos = [
    {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      alt: "Snowy mountain range during sunset",
      caption: "Serenity Peaks — captured at golden hour in the Alps.",
    },
    {
      src: "https://images.unsplash.com/photo-1520943216830-6e0a0fc564cc?auto=format&fit=crop&w=1200&q=80",
      alt: "Neon-lit street crossing in Tokyo",
      caption: "Tokyo Pulse — late night lights in Shibuya.",
    },
    {
      src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
      alt: "Milky Way in the night sky above trees",
      caption: "Galactic Canopy — star trails above the redwoods.",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
      alt: "Forest filled with mist and a vibrant sunrise",
      caption: "Mystic Morning — fog lifting over Cascadia.",
    },
    {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      alt: "Ocean wave breaking at sunrise",
      caption: "Tidal Bloom — first light over the Pacific.",
    },
    {
      src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1200&q=80",
      alt: "Desert landscape with sand dunes",
      caption: "Desert Whisper — endless dunes in the Sahara.",
    },
    {
      src: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1200&q=80",
      alt: "Cozy cabin in snowy forest",
      caption: "Cabin Glow — winter retreat in the Rockies.",
    },
    {
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
      alt: "Aurora borealis above snowy mountains",
      caption: "Polar Aurora — dancing lights over Iceland.",
    },
    {
      src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
      alt: "Trail leading into dense forest",
      caption: "Emerald Path — winding trail through Olympic National Park.",
    },
  ];

  let activeIndex = 0;

  const qs = (selector) => document.querySelector(selector);

  const renderGallery = () => {
    const gallery = qs(".gallery");
    if (!gallery) return;

    const fragment = document.createDocumentFragment();

    photos.forEach((photo, index) => {
      const figure = document.createElement("figure");
      figure.className = "gallery__item";
      figure.tabIndex = 0;
      figure.dataset.index = String(index);

      const img = document.createElement("img");
      img.className = "gallery__image";
      img.src = photo.src;
      img.alt = photo.alt;
      img.loading = "lazy";

      figure.appendChild(img);
      fragment.appendChild(figure);
    });

    gallery.appendChild(fragment);
  };

  const openLightbox = (index) => {
    const lightbox = qs(".lightbox");
    const imageEl = qs(".lightbox__image");
    const captionEl = qs(".lightbox__caption");

    if (!lightbox || !imageEl || !captionEl) return;

    activeIndex = (index + photos.length) % photos.length;
    const photo = photos[activeIndex];

    imageEl.src = photo.src;
    imageEl.alt = photo.alt;
    captionEl.textContent = photo.caption;

    lightbox.setAttribute("aria-hidden", "false");
    lightbox.focus();
  };

  const closeLightbox = () => {
    const lightbox = qs(".lightbox");
    if (!lightbox) return;
    lightbox.setAttribute("aria-hidden", "true");
  };

  const showNext = (step = 1) => {
    openLightbox(activeIndex + step);
  };

  const bindEvents = () => {
    const gallery = qs(".gallery");
    const lightbox = qs(".lightbox");
    const closeBtn = qs(".lightbox__close");
    const prevBtn = qs(".lightbox__nav--prev");
    const nextBtn = qs(".lightbox__nav--next");

    if (!gallery || !lightbox || !closeBtn || !prevBtn || !nextBtn) return;

    gallery.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const item = target.closest(".gallery__item");
      if (!item) return;
      const index = Number.parseInt(item.dataset.index ?? "0", 10);
      openLightbox(index);
    });

    gallery.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const item = target.closest(".gallery__item");
      if (!item) return;
      event.preventDefault();
      const index = Number.parseInt(item.dataset.index ?? "0", 10);
      openLightbox(index);
    });

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    prevBtn.addEventListener("click", () => showNext(-1));
    nextBtn.addEventListener("click", () => showNext(1));

    window.addEventListener("keydown", (event) => {
      const isVisible = lightbox.getAttribute("aria-hidden") === "false";
      if (!isVisible) return;

      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowRight") {
        showNext(1);
      } else if (event.key === "ArrowLeft") {
        showNext(-1);
      }
    });
  };

  const init = () => {
    renderGallery();
    bindEvents();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
