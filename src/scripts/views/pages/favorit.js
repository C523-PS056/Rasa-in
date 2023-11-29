import FavoriteRecipeIdb from '../../data/favorite-recipes-idb';
import { createNewRecipesItemTemplate } from '../templates/template-creator';

const Favorit = {
  async render() {
    return `
    <section class="page">
    <div class="button-back-container">
      <a class="button-back" href="#/beranda"><i class='bx bx-chevron-left'></i>Kembali</a>
    </div>
    <div class="page-text">
      <h2 class="page-title">Resep Favorite</h2>
      <p>Telusuri kumpulan resep masakan favorit yang sudah kamu simpan.</p>
    </div>
    <div class="search-and-filter-wrapper">
      <form class="search">
        <div class="search-input">
          <i class='bx bx-search' ></i>
          <input
            type="text"
            id="cariResep"
            name="cariResep"
            placeholder="Cari resep favoritmu..."
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
    <h3>Resep Favorit</h3>
    <div class="recipes-container">
    </div>
  </section>
  `;
  },

  async afterRender() {
    const recipes = await FavoriteRecipeIdb.getAllRecipe();
    const recipesContainer = document.querySelector('.recipes-container');
    recipes.forEach((recipe) => {
      recipesContainer.innerHTML += createNewRecipesItemTemplate(recipe);
    });
  },
};

export default Favorit;
