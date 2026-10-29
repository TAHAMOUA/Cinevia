/* Original catalogue and discovery workflows retained; no framework or API key. */
const $ = (s) => document.querySelector(s),
  storageKey = "cineviaFavorites";
let favorites = [],
  genre = "Tous",
  query = "",
  selectedFilm = null,
  toastTimer;
try {
  const v = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (Array.isArray(v))
    favorites = v.filter(
      (id) => Number.isInteger(id) && films.some((f) => f.id === id),
    );
} catch {
  /* Private browsing/corrupt data must not break discovery. */
}
const dialog = $("#film-dialog");
function notify(message) {
  clearTimeout(toastTimer);
  $("#toast").textContent = message;
  $("#toast").classList.add("show");
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 2800);
}
function normalize(s) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
function card(f, i) {
  const saved = favorites.includes(f.id);
  return `<article class="film-card" style="--delay:${Math.min(i, 4) * 45}ms"><div class="poster-wrap"><button class="poster-button" data-details="${f.id}" aria-label="Voir les détails de ${f.title}"><img src="${f.posterUrl}" alt="Affiche de ${f.title}" loading="lazy" width="300" height="450"><span class="poster-cta">Découvrir le film <span aria-hidden="true">↗</span></span></button><button class="favorite-btn" data-favorite="${f.id}" aria-label="Favori : ${f.title}" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button></div><div class="card-info"><h3>${f.title}</h3><p>${f.genre}</p></div></article>`;
}
function renderFilms() {
  const result = films.filter(
    (f) =>
      (genre === "Tous" || f.genre.includes(genre)) &&
      normalize(f.title).includes(normalize(query)),
  );
  $("#film-grid").innerHTML =
    result.map(card).join("") ||
    '<div class="empty"><div class="empty-symbol">⌕</div><h3>Aucun film pour cette recherche.</h3><p>Essayez un autre titre ou effacez les filtres.</p><button class="text-btn" data-reset>Voir tous les films ↗</button></div>';
  $("#results-count").textContent =
    `${result.length} film${result.length !== 1 ? "s" : ""} à découvrir`;
  $("#reset").hidden = genre === "Tous" && !query;
  document
    .querySelectorAll("[data-genre]")
    .forEach((b) => b.setAttribute("aria-pressed", b.dataset.genre === genre));
}
function renderFavorites() {
  $("#fav-count").textContent = favorites.length;
  $("#favorite-grid").innerHTML =
    favorites
      .map((id) => films.find((f) => f.id === id))
      .map(card)
      .join("") ||
    '<div class="empty"><div class="empty-symbol">♡</div><h3>Le début d’une belle collection.</h3><p>Un film vous parle ? Touchez le cœur pour le retrouver ici.</p><a href="#Explorer">Explorer la sélection ↗</a></div>';
}
function updateControls() {
  document.querySelectorAll("[data-favorite]").forEach((b) => {
    const saved = favorites.includes(Number(b.dataset.favorite));
    b.setAttribute("aria-pressed", saved);
    b.textContent = saved ? "♥" : "♡";
  });
  if (selectedFilm) {
    const saved = favorites.includes(selectedFilm.id);
    $("#modal-favorite").textContent = saved
      ? "♥ Retirer de ma collection"
      : "♡ Ajouter à ma collection";
    $("#modal-favorite").setAttribute("aria-pressed", saved);
  }
}
function toggleFavorite(id) {
  const existed = favorites.includes(id);
  favorites = existed ? favorites.filter((f) => f !== id) : [...favorites, id];
  let saved = true;
  try {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  } catch {
    saved = false;
    notify("Stockage indisponible : favoris conservés pour cette visite.");
  }
  const inCollection = $("#favorite-grid").contains(document.activeElement);
  renderFavorites();
  updateControls();
  if (inCollection)
    ($("#favorite-grid button") || $("#favorite-grid a"))?.focus({
      preventScroll: true,
    });
  if (saved)
    notify(
      existed
        ? "Film retiré de votre collection."
        : "Film ajouté à votre collection.",
    );
}
function openDetails(id) {
  selectedFilm = films.find((f) => f.id === id);
  if (!selectedFilm) return;
  $("#modal-title").textContent = selectedFilm.title;
  $("#modal-poster").src = selectedFilm.posterUrl;
  $("#modal-poster").alt = `Affiche de ${selectedFilm.title}`;
  $("#modal-genre").textContent = selectedFilm.genre;
  $("#modal-description").textContent = selectedFilm.description;
  updateControls();
  dialog.showModal();
  document.body.style.overflow = "hidden";
  $(".modal-close").focus();
}
dialog.addEventListener("close", () => {
  document.body.style.overflow = "";
});
$(".modal-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
$("#modal-favorite").addEventListener("click", () =>
  toggleFavorite(selectedFilm.id),
);
function resetFilters() {
  genre = "Tous";
  query = "";
  $(".search").value = "";
  renderFilms();
}
document.addEventListener("click", (e) => {
  const d = e.target.closest("[data-details]"),
    f = e.target.closest("[data-favorite]"),
    g = e.target.closest("[data-genre]");
  if (d) openDetails(Number(d.dataset.details));
  if (f) toggleFavorite(Number(f.dataset.favorite));
  if (g) {
    genre = g.dataset.genre;
    renderFilms();
  }
  if (e.target.closest("[data-reset]")) resetFilters();
});
$("#reset").addEventListener("click", resetFilters);
$(".search").addEventListener("input", (e) => {
  query = e.target.value.trim();
  renderFilms();
});
document.addEventListener(
  "error",
  (e) => {
    if (
      e.target.tagName === "IMG" &&
      !e.target.src.endsWith("poster-fallback.svg")
    ) {
      e.target.src = "assets/poster-fallback.svg";
      e.target.alt += " — visuel indisponible";
    }
  },
  { capture: true },
);
renderFilms();
renderFavorites();
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.08 },
  );
  document.querySelectorAll(".section-heading,.intro-strip").forEach((el) => {
    el.classList.add("reveal-ready");
    observer.observe(el);
  });
}
