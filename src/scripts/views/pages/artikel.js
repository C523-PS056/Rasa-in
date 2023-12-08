import DataSource from '../../data/data-source';
import { createNewArticlesItemTemplate } from '../templates/template-creator';

const Artikel = {
  filteredArticles: [],
  articlesContainer: null,

  async render() {
    return `
    <section class="page">
      <div class="button-back-container">
        <a class="button-back" href=""><i class='bx bx-chevron-left'></i>Kembali</a>
      </div>
      <div class="page-text">
        <h2 class="page-title">Artikel</h2>
        <p>Telusuri kumpulan Artikel yang tersedia untuk mencari kebutuhanmu.</p>
      </div>
      <div class="search-and-filter-wrapper">
        <div class="search-input">
          <i class='bx bx-search'></i>
          <input
            type="text"
            id="cariArtikel"
            placeholder="Cari artikel..."
          />
        </div>
      </div>
      <h3>Artikel Terbaru</h3>
      <div class="article-container" id="articleContainer"></div>
      <div class="pagination-container" id="paginationContainer"></div>
    </section>
  `;
  },

  async afterRender() {
    renderArticles(1);
    const articles = await DataSource.newArticles();
    Artikel.filteredArticles = articles; // Assign to filteredArticles at a higher scope
    Artikel.articlesContainer = document.getElementById('articleContainer'); // Assign to articlesContainer at a higher scope
    const searchInput = document.getElementById('cariArtikel');
    const paginationContainer = document.getElementById('paginationContainer');

    // Event listener for the search input
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      Artikel.filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm),
      );
      renderArticles(1, Artikel.filteredArticles);
      renderPagination(1, Artikel.filteredArticles.length, paginationContainer);
    });

    // Initial rendering of all articles and pagination
    renderArticles(1, articles);
    renderPagination(1, articles.length, paginationContainer);
  },
};

function renderArticles(page, articles = [...Array(12)]) {
  const articlesContainer = document.getElementById('articleContainer');
  const itemsPerPage = 12;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedArticles = articles.slice(startIndex, endIndex);

  articlesContainer.innerHTML = '';

  if (displayedArticles.length === 0) {
    articlesContainer.innerHTML =
      '<p class="not-found">Maaf, artikel tidak ditemukan.</p>';
  } else {
    displayedArticles.forEach((article) => {
      // Use the skeleton template if article data is not available
      articlesContainer.innerHTML += createNewArticlesItemTemplate(
        article,
        !article, // Ubah sesuai properti yang menandakan artikel asli
      );
    });
  }
}

function renderPagination(currentPage, totalItems, container) {
  const paginationContainer = container;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  paginationContainer.innerHTML = '';

  // Only display pagination if there are multiple pages
  if (totalPages > 1) {
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<i class="bx bx-chevrons-left"></i>';
    prevButton.addEventListener('click', () => {
      const prevPage = currentPage > 1 ? currentPage - 1 : 1;
      renderArticles(prevPage, Artikel.filteredArticles);
      renderPagination(
        prevPage,
        Artikel.filteredArticles.length,
        paginationContainer,
      );
    });
    paginationContainer.appendChild(prevButton);

    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.innerText = i;
      button.addEventListener('click', () => {
        renderArticles(i, Artikel.filteredArticles);
        renderPagination(
          i,
          Artikel.filteredArticles.length,
          paginationContainer,
        );
      });

      paginationContainer.appendChild(button);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<i class="bx bx-chevrons-right"></i>';
    nextButton.addEventListener('click', () => {
      const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
      renderArticles(nextPage, Artikel.filteredArticles);
      renderPagination(
        nextPage,
        Artikel.filteredArticles.length,
        paginationContainer,
      );
    });
    paginationContainer.appendChild(nextButton);
  }
}

export default Artikel;
