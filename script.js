const films = [
    {
        title: "Gladiator",
        genre: "Action • Drame • Historique",
        description: "Un général romain trahi devient gladiateur et cherche à se venger de l'empereur corrompu.",
        posterUrl: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"
    },
    {
        title: "The Matrix",
        genre: "Sci-Fi • Action",
        description: "Un hacker découvre que la réalité est une simulation contrôlée par des machines.",
        posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
    },
    {
        title: "Whiplash",
        genre: "Drame • Musique",
        description: "Un jeune batteur est poussé à ses limites par un professeur impitoyable.",
        posterUrl: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg"
    },
    {
        title: "The Wolf of Wall Street",
        genre: "Biographie • Comédie • Crime",
        description: "L'ascension et la chute d'un courtier vivant dans l'excès.",
        posterUrl: "https://image.tmdb.org/t/p/w500/sOxr33wnRuKazR9ClHek73T8qnK.jpg"
    },
    {
        title: "Django Unchained",
        genre: "Western • Drame",
        description: "Un esclave libéré part sauver sa femme avec un chasseur de primes.",
        posterUrl: "https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg"
    },
    {
        title: "The Social Network",
        genre: "Drame • Biographie",
        description: "L'histoire de la création de Facebook et ses conflits.",
        posterUrl: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg"
    },
    {
        title: "Blade Runner 2049",
        genre: "Sci-Fi • Thriller",
        description: "Un officier découvre un secret qui menace la société.",
        posterUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg"
    },
    {
    title: "The Revenant",
    genre: "Aventure • Drame",
    description: "Un trappeur lutte pour survivre dans la nature sauvage.",
    posterUrl: "https://image.tmdb.org/t/p/w500/ji3ecJphATlVgWNY0B0RVXZizdf.jpg"
    },
    {
        title: "Shutter Island",
        genre: "Thriller • Mystère",
        description: "Un marshal enquête sur une disparition dans un hôpital isolé.",
        posterUrl: "https://image.tmdb.org/t/p/w500/kve20tXwUZpu4GUX8l6X7Z4jmL6.jpg"
    },
    {
        title: "La La Land",
        genre: "Comédie • Romance • Musique",
        description: "Une histoire d'amour entre une actrice et un musicien à Los Angeles.",
        posterUrl: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"
    },
    {
        title: "Deadpool",
        genre: "Action • Comédie",
        description: "Un mercenaire au humour noir devient un anti-héros.",
        posterUrl: "https://image.tmdb.org/t/p/w500/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg"
    },
    {
        title: "Get Out",
        genre: "Horreur • Thriller",
        description: "Un jeune homme découvre un secret terrifiant chez la famille de sa copine.",
        posterUrl: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg"
    },
    {
        title: "The Conjuring",
        genre: "Horreur • Mystère",
        description: "Des enquêteurs paranormaux aident une famille terrorisée.",
        posterUrl: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg"
    },
    {
        title: "Edge of Tomorrow",
        genre: "Sci-Fi • Action",
        description: "Un soldat revit la même journée en combattant des extraterrestres.",
        posterUrl: "https://image.tmdb.org/t/p/w500/uUHvlkLavotfGsNtosDy8ShsIYF.jpg"
    },
    {
        title: "The Intouchables",
        genre: "Comédie • Drame",
        description: "Une amitié improbable entre un aristocrate paralysé et son aide-soignant.",
        posterUrl: "https://image.tmdb.org/t/p/w500/323BP0itpxTsO0skTwdnVmf7YC9.jpg"
    },
    {
        title: "Prisoners",
        genre: "Thriller • Crime",
        description: "Un père désespéré cherche sa fille disparue.",
        posterUrl: "https://image.tmdb.org/t/p/w500/uhviyknTT5cEQXbn6vWIqfM4vGm.jpg"
    },
    {
        title: "The Prestige",
        genre: "Drame • Mystère",
        description: "Deux magiciens rivaux s'affrontent dans une compétition obsessionnelle.",
        posterUrl: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg"
    }
];
// ============================================================
// STATE
// ============================================================
let favorites = [];

const availableFilmsContainer = document.querySelectorAll(".film-grid")[0];
const favoriteFilmsContainer  = document.querySelectorAll(".film-grid")[1];
const searchInput             = document.querySelector(".search");
const filterButtons           = document.querySelectorAll(".filter-btn");

// ============================================================
// MODAL
// ============================================================
const modal = document.createElement("div");
modal.className = "film-modal-overlay";
modal.innerHTML = `
    <div class="film-modal">
        <button class="modal-close-btn" aria-label="Fermer">✕</button>
        <img class="modal-poster" src="" alt="">
        <div class="modal-info">
            <h2 class="modal-title"></h2>
            <p class="modal-genre"></p>
            <p class="modal-description"></p>
            <button class="modal-fav-btn"> Ajouter aux favoris</button>
        </div>
    </div>
`;
document.body.appendChild(modal);

modal.querySelector(".modal-close-btn").addEventListener("click", closeModal);
modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
});
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
});

function openModal(film) {
    modal.querySelector(".modal-poster").src = film.posterUrl;
    modal.querySelector(".modal-poster").alt = film.title;
    modal.querySelector(".modal-title").textContent = film.title;
    modal.querySelector(".modal-genre").textContent = film.genre;
    modal.querySelector(".modal-description").textContent = film.description;

    const favBtn = modal.querySelector(".modal-fav-btn");
    const alreadyFav = favorites.some(f => f.title === film.title);

    if (alreadyFav) {
        favBtn.textContent = "✓ Déjà dans les favoris";
        favBtn.disabled = true;
    } else {
        favBtn.textContent = "❤ Ajouter aux favoris";
        favBtn.disabled = false;
        favBtn.onclick = function () {
            favorites.push(film);
            renderFavorites();
            favBtn.textContent = "✓ Déjà dans les favoris";
            favBtn.disabled = true;
        };
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

// ============================================================
// CARD TEMPLATE
// ============================================================
function createCard(film, isFavorite = false) {
    return `
        <article class="film-card" style="--poster-url: url('${film.posterUrl}');" data-title="${film.title}">
            <div class="card-initial">
                <h3 class="film-card-title">${film.title}</h3>
                <p class="film-card-genre">${film.genre.split(' • ').slice(0, 2).join(' • ')}</p>
                <div class="card-buttons">
                    <button class="details-btn">voir les détails</button>
                    ${isFavorite ? `<button class="remove-fav-btn" data-title="${film.title}">🗑 Supprimer</button>` : ''}
                </div>
            </div>
        </article>
    `;
}

// ============================================================
// RENDER
// ============================================================
function renderFilms(filmsArray) {
    availableFilmsContainer.innerHTML = "";
    filmsArray.forEach(film => {
        availableFilmsContainer.innerHTML += createCard(film, false);
    });
    attachDetailButtons(availableFilmsContainer);
}

function renderFavorites() {
    favoriteFilmsContainer.innerHTML = "";

    if (favorites.length === 0) {
        favoriteFilmsContainer.innerHTML = `<p class="empty-fav">Aucun film favori pour le moment</p>`;
        return;
    }

    favorites.forEach(film => {
        favoriteFilmsContainer.innerHTML += createCard(film, true);
    });

    favoriteFilmsContainer.querySelectorAll(".remove-fav-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            removeFromFavorites(this.dataset.title);
        });
    });

    attachDetailButtons(favoriteFilmsContainer);
}

function removeFromFavorites(title) {
    favorites = favorites.filter(f => f.title !== title);
    renderFavorites();
}

// ============================================================
// DETAIL BUTTONS
// ============================================================
function attachDetailButtons(container) {
    container.querySelectorAll(".details-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            const title = this.closest(".film-card").dataset.title;
            const film = films.find(f => f.title === title) || favorites.find(f => f.title === title);
            if (film) openModal(film);
        });
    });
}

// ============================================================
// SEARCH
// ============================================================
searchInput.addEventListener("input", function () {
    const val = this.value.toLowerCase();
    const filtered = films.filter(f => f.title.toLowerCase().startsWith(val));
    renderFilms(filtered);
});

// ============================================================
// FILTER BUTTONS
// ============================================================
filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        const filter = this.textContent.trim().toLowerCase();

        if (filter === "tous") {
            renderFilms(films);
            return;
        }

        const filtered = films.filter(f => f.genre.toLowerCase().includes(filter));
        renderFilms(filtered);
    });
});

// ============================================================
// INIT
// ============================================================
renderFilms(films);
renderFavorites();