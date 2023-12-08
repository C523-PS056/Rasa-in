import UrlParser from '../../routes/url-parser';
import DataSource from '../../data/data-source';
import { recipeDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const ResepDetail = {
  async render() {
    return `
      <section id="recipe" class="recipe">
      </section>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    // Tampilkan skeleton loader
    const recipeContainer = document.querySelector('#recipe');
    recipeContainer.innerHTML = recipeDetailTemplate({}, true);

    try {
      const recipe = await DataSource.recipeDetail(url.id);

      if (recipe) {
        // Tampilkan konten sebenarnya dan hapus skeleton loader
        recipeContainer.innerHTML = recipeDetailTemplate(recipe, false);

        // Inisialisasi Like Button
        LikeButtonInitiator.init({
          likeButtonContainer: document.querySelector('#likeButtonContainer'),
          recipe: {
            id: recipe.key,
            title: recipe.title,
            thumb: recipe.thumb,
            times: recipe.times,
            difficulty: recipe.difficulty,
          },
        });
      } else {
        const errorMessage = 'Maaf, resep tidak ditemukan.';
        recipeContainer.innerHTML = `<p>${errorMessage}</p>`;
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      const errorMessage = 'Terjadi kesalahan dalam mengambil data resep.';
      recipeContainer.innerHTML = `<p>${errorMessage}</p>`;
    }
  },
};

export default ResepDetail;
