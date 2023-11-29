import FavoriteRecipeIdb from '../data/favorite-recipes-idb';
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, recipe }) {
    this._likeButtonContainer = likeButtonContainer;
    this._recipe = recipe;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._recipe;

    if (await this._isRecipeExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRecipeExist(id) {
    const recipe = await FavoriteRecipeIdb.getRecipe(id);
    return !!recipe;
  },

  async _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    if (likeButton) {
      likeButton.addEventListener('click', async () => {
        await FavoriteRecipeIdb.putRecipe(this._recipe);
        this._renderButton();
      });
    } else {
      console.error("Element with ID 'likeButton' not found.");
    }
  },

  async _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    if (likeButton) {
      likeButton.addEventListener('click', async () => {
        await FavoriteRecipeIdb.deleteRecipe(this._recipe.id);
        this._renderButton();
      });
    } else {
      console.error("Element with ID 'likeButton' not found.");
    }
  },
};

export default LikeButtonInitiator;
