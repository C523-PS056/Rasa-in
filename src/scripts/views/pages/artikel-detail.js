import UrlParser from '../../routes/url-parser';
import DataSource from '../../data/data-source';
import { articleDetailTemplate } from '../templates/template-creator';

const ArtikelDetail = {
  async render() {
    return `
      <section class="article-detail">
     </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    // Tampilkan skeleton loader
    const articleContainer = document.querySelector('.article-detail');
    articleContainer.innerHTML = articleDetailTemplate({}, true);

    try {
      const article = await DataSource.articleDetail(url.id);

      if (article) {
        // Tampilkan konten sebenarnya dan hapus skeleton loader
        articleContainer.innerHTML = articleDetailTemplate(article, false);
      } else {
        const errorMessage = 'Maaf, artikel tidak ditemukan.';
        articleContainer.innerHTML = `<p>${errorMessage}</p>`;
      }
    } catch (error) {
      console.error('Error fetching article details:', error);
      const errorMessage = 'Terjadi kesalahan dalam mengambil data artikel.';
      articleContainer.innerHTML = `<p>${errorMessage}</p>`;
    }
  },
};

export default ArtikelDetail;
