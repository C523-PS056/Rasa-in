import DataSource from '../../data/data-source';
import { createNewArticlesItemTemplate } from '../templates/template-creator';

const Artikel = {
  async render() {
    return `
    <section class="page">
    <div class="button-back-container">
      <a class="button-back" href="#/beranda"><i class='bx bx-chevron-left'></i>Kembali</a>
    </div>
    <div class="page-text">
      <h2 class="page-title">Artikel</h2>
      <p>Telusuri kumpulan Artikel yang kami buat untuk mencari kebutuhanmu.</p>
    </div>
    <div class="search-and-filter-wrapper">
      <form class="search">
        <div class="search-input">
          <i class='bx bx-search' ></i>
          <input
            type="text"
            id="cariResep"
            name="cariResep"
            placeholder="Cari artikel..."
            />
        </div>
      </form>
      <div class="filter-container">
        <select id="filter" class="filter" >
          <option value="new-recipes">Telusuri Berdasarkan</option>
          <option value="resep-dessert">Dessert</option>
          <option value="masakan-hari-raya">Masakan Hari Raya</option>
        </select>
      </div>
    </div>
    <h3>Artikel Terbaru</h3>
    <div class="article-container">
    </div>
  </section>
  `;
  },

  async afterRender() {
    const articles = await DataSource.newArticles();
    const articlesContainer = document.querySelector('.article-container');
    articles.forEach((article) => {
      articlesContainer.innerHTML += createNewArticlesItemTemplate(article);
    });
  },
};

export default Artikel;
