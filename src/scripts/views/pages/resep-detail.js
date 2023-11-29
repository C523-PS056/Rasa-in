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
    const recipe = await DataSource.recipeDetail(url.id);

    if (recipe) {
      const recipeContainer = document.querySelector('#recipe');
      recipeContainer.innerHTML = recipeDetailTemplate(recipe);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        recipe: {
          id: recipe.key,
          title: recipe.title,
          thumb: recipe.thumb,
          times: recipe.times,
          difficulty: recipe.difficulty,
          calories: recipe.calories,
        },
      });
    } else {
      const errorMessage = 'Maaf, resep tidak ditemukan.';
      const recipeContainer = document.querySelector('#recipe');
      recipeContainer.innerHTML = `<p>${errorMessage}</p>`;
    }
  },
};

export default ResepDetail;
