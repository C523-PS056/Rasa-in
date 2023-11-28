import DataSource from '../../data/data-source';
import { createNewRecipesItemTemplate } from '../templates/template-creator';

const Resep = {
  async render() {
    return `
    <section class="page">
    <div class="button-back-container">
      <a class="button-back" href="#/beranda"><i class='bx bx-chevron-left'></i>Kembali</a>
    </div>
    <div class="page-text">
      <h2 class="page-title">Resep Masakan</h2>
      <p>Telusuri kumpulan resep masakan yang kami buat untuk memenuhi kebutuhanmu.</p>
    </div>
    <div class="search-and-filter-wrapper">
      <form class="search">
        <div class="search-input">
          <i class='bx bx-search' ></i>
          <input
            type="text"
            id="cariResep"
            name="cariResep"
            placeholder="Mau masak apa hari ini ?"
            />
        </div>
      </form>
      <div class="filter-container">
        <select id="filter" class="filter" >
          <option value="new-recipes">Telusuri Berdasarkan</option>
        </select>
      </div>
    </div>
    <h3>Resep Terbaru</h3>
    <div class="recipes-container">
    </div>
    <div class="pagination-container">
      <ul>
        <li><a href=# disabled><i class='bx bx-chevrons-left'></i></a></li>  
        <li class=current><a href=#1>1</a></li>
        <li><a href=#2>2</a></li>
        <li><a href=#3>3</a></li>
        <li><a href=#4>4</a></li>
        <li><a href=#5>5</a></li>
        <li><a href=#6>6</a></li>
        <li><a href=# disabled><i class='bx bx-chevrons-right' ></i></a></li>
      </ul>
  </div>
  </section>
  `;
  },
  async afterRender() {
    const recipes = await DataSource.newRecipe();
    const recipesContainer = document.querySelector('.recipes-container');
    recipes.forEach((recipe) => {
      recipesContainer.innerHTML += createNewRecipesItemTemplate(recipe);
    });

    // dropdown filter
    const categories = await DataSource.recipeCategory();
    const dropdown = document.getElementById('filter');
    dropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = 'new-recipes';
    defaultOption.text = 'Telusuri Berdasarkan';
    dropdown.appendChild(defaultOption);

    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.key;
      option.text = category.category;
      dropdown.appendChild(option);
    });
  },
};

export default Resep;
