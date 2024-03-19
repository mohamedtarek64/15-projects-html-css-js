(() => {
  "use strict";

  const timeFilters = [
    { id: "all", label: "All", range: null },
    { id: "under-20", label: "< 20 min", range: [0, 20] },
    { id: "20-40", label: "20 - 40 min", range: [20, 40] },
    { id: "over-40", label: "> 40 min", range: [40, Infinity] },
  ];

  const dietFilters = [
    { id: "all", label: "Any Focus" },
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "gluten-free", label: "Gluten-Free" },
    { id: "high-protein", label: "High Protein" },
    { id: "pescatarian", label: "Pescatarian" },
  ];

  const recipes = [
    {
      title: "Charred Citrus Salmon with Fennel Slaw",
      cuisine: "Nordic",
      cookTime: 32,
      rating: 4.9,
      diet: ["pescatarian", "gluten-free", "high-protein"],
      tags: ["sheet pan", "omega 3", "weeknight"],
      description:
        "Broiled salmon with grapefruit glaze, served over shaved fennel, dill, and toasted buckwheat.",
      ingredients: [
        "4 salmon fillets, skin-on",
        "2 grapefruit, juiced",
        "2 tbsp maple syrup",
        "1 fennel bulb, shaved",
        "1/3 cup buckwheat groats, toasted",
        "Fresh dill, chopped",
      ],
      steps: [
        "Whisk grapefruit juice, maple syrup, and sea salt. Brush over salmon.",
        "Broil salmon on high for 6–8 minutes until caramelized.",
        "Combine fennel, dill, buckwheat, and a splash of olive oil.",
        "Top salmon with extra glaze and serve over the slaw.",
      ],
    },
    {
      title: "Smoky Chickpea & Kale Stew",
      cuisine: "Mediterranean",
      cookTime: 24,
      rating: 4.7,
      diet: ["vegan", "gluten-free"],
      tags: ["meal prep", "one pot", "budget"],
      description:
        "Tomato-rich stew layered with smoked paprika, roasted peppers, chickpeas, and kale.",
      ingredients: [
        "2 cans chickpeas, rinsed",
        "1 roasted pepper, sliced",
        "1 bunch lacinato kale, torn",
        "2 tsp smoked paprika",
        "1 cup vegetable stock",
        "1 tbsp harissa",
      ],
      steps: [
        "Sauté aromatics and paprika until fragrant.",
        "Add chickpeas, roasted pepper, and stock. Simmer 10 minutes.",
        "Fold in kale and harissa; cook until kale wilts.",
        "Finish with lemon zest and cracked pepper.",
      ],
    },
    {
      title: "Miso Peanut Soba Crunch Bowl",
      cuisine: "Japanese",
      cookTime: 18,
      rating: 4.8,
      diet: ["vegetarian"],
      tags: ["cold", "meal prep", "no reheat"],
      description:
        "Cold soba noodles tossed in miso peanut sauce with crunchy vegetables and crispy tofu.",
      ingredients: [
        "200 g soba noodles",
        "1 block firm tofu, crisped",
        "1 cup shredded red cabbage",
        "2 carrots, julienned",
        "1/3 cup roasted peanuts",
        "3 tbsp white miso + 3 tbsp peanut butter",
      ],
      steps: [
        "Cook soba, rinse under cold water, and drain well.",
        "Blend miso, peanut butter, lime, ginger, and sesame oil.",
        "Toss noodles with sauce, tofu, and vegetables.",
        "Top with peanuts, herbs, and chili crisp.",
      ],
    },
    {
      title: "Coconut Lime Chicken Soup",
      cuisine: "Thai",
      cookTime: 28,
      rating: 4.95,
      diet: ["gluten-free", "high-protein"],
      tags: ["instant pot", "comfort", "freezer friendly"],
      description:
        "Bright and fragrant soup with poached chicken, lemongrass, mushrooms, and coconut milk.",
      ingredients: [
        "2 chicken breasts",
        "3 cups chicken stock",
        "1 can coconut milk",
        "2 stalks lemongrass",
        "200 g mushrooms, sliced",
        "2 limes, juiced",
      ],
      steps: [
        "Simmer stock with lemongrass, galangal, and lime leaves for 10 minutes.",
        "Add chicken and mushrooms; cook until chicken is tender.",
        "Stir in coconut milk and lime juice. Season with fish sauce.",
        "Shred chicken, return to pot, and garnish with herbs.",
      ],
    },
    {
      title: "Caramelized Shallot Gnocchi Bake",
      cuisine: "Italian",
      cookTime: 42,
      rating: 4.6,
      diet: ["vegetarian"],
      tags: ["comfort", "weekend", "one pan"],
      description:
        "Pillowy gnocchi baked with caramelized shallot sauce, taleggio cheese, and crispy sage.",
      ingredients: [
        "500 g potato gnocchi",
        "4 shallots, thinly sliced",
        "1/2 cup dry white wine",
        "150 g taleggio or fontina",
        "1/4 cup parmesan, grated",
        "Fresh sage leaves",
      ],
      steps: [
        "Slowly caramelize shallots with butter until jammy.",
        "Deglaze with wine, add cream, and reduce slightly.",
        "Toss gnocchi in sauce, top with cheeses and sage.",
        "Bake at 200°C (390°F) for 18 minutes until bubbling.",
      ],
    },
    {
      title: "Harissa Sweet Potato Taco Bowls",
      cuisine: "Modern Latin",
      cookTime: 26,
      rating: 4.75,
      diet: ["vegan", "gluten-free"],
      tags: ["sheet pan", "crowd friendly", "spicy"],
      description:
        "Roasted harissa sweet potatoes with lime crema, pickled onions, and crunchy pepitas.",
      ingredients: [
        "2 sweet potatoes, cubed",
        "2 tbsp harissa paste",
        "1 can black beans, rinsed",
        "1 avocado, sliced",
        "Quick pickled red onions",
        "Pepitas & lime crema",
      ],
      steps: [
        "Roast sweet potatoes with harissa until caramelized.",
        "Warm beans with cumin and orange zest.",
        "Assemble bowls with greens, potatoes, beans, and toppings.",
        "Finish with lime crema and pepitas.",
      ],
    },
  ];

  let query = "";
  let selectedTime = "all";
  let selectedDiet = "all";
  let sortMode = "relevance";
  const favorites = new Map();

  const qs = (selector) => document.querySelector(selector);
  const qsa = (selector) => Array.from(document.querySelectorAll(selector));

  const renderChips = (containerSelector, items, activeId, onClick) => {
    const container = qs(containerSelector);
    if (!container) return;
    container.innerHTML = "";

    items.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chip";
      button.textContent = item.label;
      button.dataset.id = item.id;
      button.classList.toggle("is-active", item.id === activeId);

      button.addEventListener("click", () => onClick(item.id));
      container.appendChild(button);
    });
  };

  const updateFavorites = () => {
    const list = qs(".favorites__list");
    if (!list) return;

    list.innerHTML = "";
    if (favorites.size === 0) {
      const placeholder = document.createElement("li");
      placeholder.className = "favorites__item";
      placeholder.textContent = "No favorites yet.";
      list.appendChild(placeholder);
      return;
    }

    favorites.forEach((recipe) => {
      const item = document.createElement("li");
      item.className = "favorites__item";
      item.innerHTML = `
        <span>${recipe.title}</span>
        <button class="favorites__remove" aria-label="Remove ${recipe.title}" data-id="${recipe.title}">
          &times;
        </button>
      `;
      list.appendChild(item);
    });

    list.querySelectorAll(".favorites__remove").forEach((button) => {
      button.addEventListener("click", () => {
        favorites.delete(button.dataset.id ?? "");
        updateFavorites();
      });
    });
  };

  const normalize = (text) => text.toLowerCase();

  const matchesQuery = (recipe) => {
    if (!query.trim()) return true;
    const normalized = normalize(query);
    const fields = [
      recipe.title,
      recipe.cuisine,
      recipe.description,
      recipe.tags.join(" "),
      recipe.ingredients.join(" "),
    ].map(normalize);
    return fields.some((field) => field.includes(normalized));
  };

  const matchesTime = (recipe) => {
    const filter = timeFilters.find((item) => item.id === selectedTime);
    if (!filter || !filter.range) return true;
    const [min, max] = filter.range;
    return recipe.cookTime >= min && recipe.cookTime <= max;
  };

  const matchesDiet = (recipe) => {
    if (selectedDiet === "all") return true;
    return recipe.diet.includes(selectedDiet);
  };

  const sortRecipes = (list) => {
    const copy = [...list];
    switch (sortMode) {
      case "time-asc":
        copy.sort((a, b) => a.cookTime - b.cookTime);
        break;
      case "rating-desc":
        copy.sort((a, b) => b.rating - a.rating);
        break;
      default:
        copy.sort((a, b) => b.rating - a.rating);
    }
    return copy;
  };

  const renderRecipes = () => {
    const list = qs(".recipe-list");
    const count = qs("#results-count");
    if (!list || !count) return;

    const filtered = recipes.filter(
      (recipe) => matchesQuery(recipe) && matchesTime(recipe) && matchesDiet(recipe),
    );
    const sorted = sortRecipes(filtered);

    list.innerHTML = "";
    count.textContent = String(sorted.length);

    if (sorted.length === 0) {
      const empty = document.createElement("li");
      empty.className = "recipe-card";
      empty.innerHTML = "<p>No recipes found. Adjust filters or try another ingredient.</p>";
      list.appendChild(empty);
      return;
    }

    sorted.forEach((recipe) => {
      const item = document.createElement("li");
      item.className = "recipe-card";
      item.tabIndex = 0;
      item.dataset.id = recipe.title;

      item.innerHTML = `
        <div class="recipe-card__top">
          <h3 class="recipe-card__title">${recipe.title}</h3>
          <span class="badge">&#9733; ${recipe.rating.toFixed(2)}</span>
        </div>
        <div class="recipe-card__meta">
          <span>${recipe.cuisine}</span>
          <span>${recipe.cookTime} min</span>
        </div>
        <p>${recipe.description}</p>
        <div class="recipe-card__tags">
          ${recipe.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      `;

      item.addEventListener("click", () => showDetails(recipe));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          showDetails(recipe);
        }
      });

      list.appendChild(item);
    });
  };

  const showDetails = (recipe) => {
    const title = qs("#drawer-title");
    const container = qs(".drawer__content");
    if (!title || !container) return;

    title.textContent = recipe.title;
    container.innerHTML = `
      <p>${recipe.description}</p>
      <div>
        <strong>Cook Time:</strong> ${recipe.cookTime} minutes ·
        <strong>Rating:</strong> ${recipe.rating.toFixed(1)}
      </div>
      <div class="recipe-card__tags">
        ${recipe.diet.map((focus) => `<span class="tag">${focus}</span>`).join("")}
      </div>
      <h3>Ingredients</h3>
      <ul class="ingredients">
        ${recipe.ingredients.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <h3>Steps</h3>
      <ol class="steps">
        ${recipe.steps.map((step) => `<li>${step}</li>`).join("")}
      </ol>
      <button type="button" class="btn drawer__save" data-id="${recipe.title}">
        ${favorites.has(recipe.title) ? "Saved" : "Save to Favorites"}
      </button>
    `;

    const saveButton = container.querySelector(".drawer__save");
    if (saveButton) {
      saveButton.addEventListener("click", () => {
        if (favorites.has(recipe.title)) {
          favorites.delete(recipe.title);
          saveButton.textContent = "Save to Favorites";
        } else {
          favorites.set(recipe.title, recipe);
          saveButton.textContent = "Saved";
        }
        updateFavorites();
      });
    }
  };

  const bindSearch = () => {
    const form = qs(".search");
    const input = qs("#query");
    if (!form || !input) return;

    const handleSubmit = (event) => {
      event.preventDefault();
      query = input.value;
      renderRecipes();
    };

    form.addEventListener("submit", handleSubmit);
    input.addEventListener("input", () => {
      query = input.value;
      renderRecipes();
    });
  };

  const renderTimeFilterChips = () => {
    renderChips("#time-filters", timeFilters, selectedTime, (id) => {
      selectedTime = id;
      renderTimeFilterChips();
      renderRecipes();
    });
  };

  const renderDietFilterChips = () => {
    renderChips("#diet-filters", dietFilters, selectedDiet, (id) => {
      selectedDiet = id;
      renderDietFilterChips();
      renderRecipes();
    });
  };

  const bindSort = () => {
    const select = qs("#sort");
    if (!select) return;

    select.addEventListener("change", () => {
      sortMode = select.value;
      renderRecipes();
    });
  };

  const bindDrawerClose = () => {
    const close = qs(".drawer__close");
    const title = qs("#drawer-title");
    const content = qs(".drawer__content");
    if (!close || !title || !content) return;

    close.addEventListener("click", () => {
      title.textContent = "Select a recipe";
      content.innerHTML =
        '<p class="drawer__placeholder">Browse the list to see ingredients, pantry swaps, and step-by-step guidance.</p>';
    });
  };

  const init = () => {
    renderTimeFilterChips();
    renderDietFilterChips();
    bindSearch();
    bindSort();
    bindDrawerClose();
    updateFavorites();
    renderRecipes();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
