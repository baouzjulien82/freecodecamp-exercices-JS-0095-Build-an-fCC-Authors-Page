// Sélectionne le conteneur où les auteurs seront affichés
const authorContainer = document.getElementById('author-container');

// Sélectionne le bouton "Load More"
const loadMoreBtn = document.getElementById('load-more-btn');

// Initialise les indices de départ et de fin pour la pagination
let startingIndex = 0;
let endingIndex = 8;

// Tableau qui contiendra toutes les données des auteurs
let authorDataArr = [];

// Récupère les données JSON depuis l'URL
fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
  .then((res) => res.json()) // Convertit la réponse en JSON
  .then((data) => {
    // Stocke les données dans le tableau
    authorDataArr = data;
    // Affiche les 8 premiers auteurs
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));  
  })
  .catch((err) => {
    // En cas d'erreur, affiche un message dans le conteneur
    authorContainer.innerHTML = '<p class="error-msg">There was an error loading the authors</p>';
  });

// Fonction appelée quand on clique sur "Load More"
const fetchMoreAuthors = () => {
  // Avance les indices de 8
  startingIndex += 8;
  endingIndex += 8;

  // Affiche les auteurs suivants
  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));

  // Si on a atteint la fin du tableau
  if (authorDataArr.length <= endingIndex) {
    // Désactive le bouton
    loadMoreBtn.disabled = true;
    // Change le curseur pour montrer qu'il est inactif
    loadMoreBtn.style.cursor = "not-allowed";
    // Change le texte du bouton
    loadMoreBtn.textContent = 'No more data to load';
  }
};

// Fonction qui affiche les auteurs dans le DOM
const displayAuthors = (authors) => {
  authors.forEach(({ author, image, url, bio }, index) => {
    authorContainer.innerHTML += `
      <div id="${index}" class="user-card">
        <h2 class="author-name">${author}</h2>
        <img class="user-img" src="${image}" alt="${author} avatar">
        <div class="purple-divider"></div>
        <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + '...' : bio}</p>
        <a class="author-link" href="${url}" target="_blank">${author} author page</a>
      </div>
    `;
  });
};

// Ajoute un écouteur d'événement sur le bouton pour charger plus d'auteurs
loadMoreBtn.addEventListener('click', fetchMoreAuthors);
