import FavoriteRecipeIdb from '../../data/favorite-recipes-idb';
import scrollToTop from '../../utils/scroll-to-top';
import { createNewRecipesItemTemplate } from '../templates/template-creator';

const Favorit = {
  filteredRecipes: [],
  recipesContainer: null,

  async render() {
    return `
      <section class="page">
        <div class="button-back-container">
          <a class="button-back" href="#"><i class='bx bx-chevron-left'></i>Kembali</a>
        </div>
        <div class="page-text">
          <h2 class="page-title">Resep Favorit</h2>
          <p>Telusuri kumpulan resep masakan favorit yang sudah kamu simpan.</p>
        </div>
        <div class="search-and-filter-wrapper">
          <div class="search-input">
            <i class='bx bx-search'></i>
            <input
              type="text"
              id="cariResep"
              name="cariResep"
              placeholder="Cari resep favoritmu..."
            />
          </div>
        </div>
        <h3>Resep Favorit</h3>
        <div class="recipes-container" id="recipesContainer"></div>
        <div class="pagination-container" id="paginationContainer"></div>
      </section>
    `;
  },

  async afterRender() {
    renderRecipes(1);
    const recipes = await FavoriteRecipeIdb.getAllRecipes();
    Favorit.filteredRecipes = recipes;
    Favorit.recipesContainer = document.getElementById('recipesContainer');
    const searchInput = document.getElementById('cariResep');
    const paginationContainer = document.getElementById('paginationContainer');

    // Event listener for the search input
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      Favorit.filteredRecipes = recipes.filter((recipe) => recipe.title
      .toLowerCase().includes(searchTerm));
      renderRecipes(1, Favorit.filteredRecipes);
      renderPagination(1, Favorit.filteredRecipes.length, paginationContainer);
    });

    // Initial rendering of all recipes and pagination
    renderRecipes(1, recipes);
    renderPagination(1, recipes.length, paginationContainer);
  },
};

function renderRecipes(page, recipes = [...Array(12)]) {
  const recipesContainer = document.getElementById('recipesContainer');
  const itemsPerPage = 12;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedRecipes = recipes.slice(startIndex, endIndex);

  recipesContainer.innerHTML = '';

  if (displayedRecipes.length === 0) {
    recipesContainer.innerHTML = '<p class="not-found">Maaf, resep tidak ditemukan.</p>';
  } else {
    displayedRecipes.forEach((recipe) => {
      recipesContainer.innerHTML += createNewRecipesItemTemplate(
        recipe,
        !recipe,
      );
    });
  }
}

function renderPagination(currentPage, totalItems, container) {
  const paginationContainer = container;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  paginationContainer.innerHTML = '';

  if (totalPages > 1) {
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<i class="bx bx-chevrons-left"></i>';
    prevButton.addEventListener('click', () => {
      const prevPage = currentPage > 1 ? currentPage - 1 : 1;
      renderRecipes(prevPage, Favorit.filteredRecipes);
      renderPagination(
        prevPage,
        Favorit.filteredRecipes.length,
        paginationContainer,
      );
      scrollToTop();
    });
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i += 1) {
      const button = document.createElement('button');
      button.innerText = i;
      button.addEventListener('click', () => {
        renderRecipes(i, Favorit.filteredRecipes);
        renderPagination(
          i,
          Favorit.filteredRecipes.length,
          paginationContainer,
        );
        scrollToTop();
      });

      paginationContainer.appendChild(button);
    }

    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<i class="bx bx-chevrons-right"></i>';
    nextButton.addEventListener('click', () => {
      const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
      renderRecipes(nextPage, Favorit.filteredRecipes);
      renderPagination(
        nextPage,
        Favorit.filteredRecipes.length,
        paginationContainer,
      );
      scrollToTop();
    });
    paginationContainer.appendChild(nextButton);
  }
}

export default Favorit;
