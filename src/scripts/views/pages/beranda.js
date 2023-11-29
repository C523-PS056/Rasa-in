import DataSource from '../../data/data-source';
import {
  createNewRecipesItemTemplate,
  createCategoryRecipesItemTemplate,
  createNewArticlesItemTemplate,
} from '../templates/template-creator';

import Splide from '@splidejs/splide';

const Beranda = {
  async render() {
    return `
    <section class="hero">
    <div class="hero-container">
      <div class="hero-text">
        <h1>
          Cari resep ?<br />
          Rasa-IN aja
        </h1>
        <p>
          Temukan resep masakan nusantara yang beragam dan mudah diakses di
          Rasa-IN.
        </p>
      </div>
      <form class="search-container">
        <label for="cariResep">Cari Resep</label>
        <div class="search-wrapper">
        <div class="search-input">
          <i class='bx bx-search' ></i>
          <input
            type="text"
            id="cariResep"
            name="cariResep"
            placeholder="Mau masak apa hari ini ?"
          />
        </div>
        <div class="button-container">
          <button class="button"  type="submit">Temukan</button>
        </div>
      </div>
      </form>
    </div>
  </section>

  <section class="category">
  <h2 class="section-title">Telusuri Berdasarkan</h2>
  <div class="category-container">
  </div>
  <div class="button-container">
    <button id="loadMoreCategories" class="button button-large">Tampilkan Semua</button>
  </div>
</section>

<section class="new-recipes">
<h2 class="section-title">Resep terbaru</h2>
<div class="recipes-container">
  
</div>
<div class="button-container">
  <a class="button button-large" href="#/resep"  type="submit">Lihat Selengkapnya</a>
</div>
</section>


<section class="article" aria-label="artikel terbaru">\
  <h2 class="section-title">Artikel Terbaru</h2>
  <div class="splide">
  <div class="splide__track ">
		<ul class="splide__list">
		</ul>
  </div>
  </div>
  <div class="button-container">
    <button class="button button-large"  type="submit">Lihat Selengkapnya</button>
  </div>
</section>

<section id="tentang-kami" class="about-us">
  <div class="about-us-text">
  <h2 class="section-title">Tentang Kami</h2>
  <p>Rasa-IN (Rasa Indonesia Nusantara)  adalah website yang menyediakan informasi resep-resep masakan nusantara.</p>
</div>
<div class="about-us-galery">
  <div class="about-us-galery__item"><img src="./images/about-us/cakra.jpeg" alt=""></div>
  <div class="about-us-galery__item"><h2>LOGO</h2></div>
  <div class="about-us-galery__item"><h2>Rasa-IN</h2> </div>
  <div class="about-us-galery__item"><img src="./images/about-us/ganteng.jpg" alt=""></div>
  <div class="about-us-galery__item"><img src="./images/about-us/ari.jpg" alt=""></div>
  <div class="about-us-galery__item"><p>Rasa Indonesia Nusantara</p></div>
  <div class="about-us-galery__item"><img src="./images/about-us/tri.jpg" alt=""></div>
  <div class="about-us-galery__item"></div>
</div>
</section>      
      `;
  },

  async afterRender() {
    // categories
    const categories = await DataSource.recipeCategory();
    const categoryContainer = document.querySelector('.category-container');

    // Menentukan jumlah item yang akan ditampilkan sesuai dengan lebar layar
    const screenWidth = window.innerWidth;
    let numberOfItemsToShow;

    if (screenWidth < 640) {
      numberOfItemsToShow = 6;
    } else if (screenWidth < 1024) {
      numberOfItemsToShow = 8;
    } else {
      numberOfItemsToShow = 10;
    }

    const limitedCategories = categories.slice(0, numberOfItemsToShow);
    limitedCategories.forEach((category) => {
      categoryContainer.innerHTML +=
        createCategoryRecipesItemTemplate(category);
    });

    const loadMoreButton = document.querySelector('#loadMoreCategories');
    if (categories.length == limitedCategories.length) {
      loadMoreButton.style.display = 'none';
    } else {
      loadMoreButton.addEventListener('click', () => {
        categoryContainer.innerHTML = '';
        categories.forEach((category) => {
          categoryContainer.innerHTML +=
            createCategoryRecipesItemTemplate(category);
        });

        loadMoreButton.style.display = 'none';
      });
    }

    // new recipes
    const newRecipes = await DataSource.newRecipe();
    const limitNewRecipes = newRecipes.slice(0, 6);
    const newRecipesContainer = document.querySelector('.recipes-container');

    limitNewRecipes.forEach((recipe) => {
      newRecipesContainer.innerHTML += createNewRecipesItemTemplate(recipe);
    });

    // new articles

    const newArticles = await DataSource.newArticles();
    const limitNewArticles = newArticles.slice(0, 6);
    const newArticlesContainer = document.querySelector('.splide__list');
    limitNewArticles.forEach((article) => {
      newArticlesContainer.innerHTML += createNewArticlesItemTemplate(article);
    });

    var splide = new Splide('.splide', {
      type: 'loop',
      gap: '1.5rem',
      perPage: 3,
      autoWidth: true,
      autoplay: true,
      perMove: 1,
      pagination: false,
      breakpoints: {
        640: {
          perPage: 2,
          gap: '.7rem',
          autoWidth: true,
        },
        480: {
          perPage: 1,
          gap: '.7rem',
          autoWidth: false,
        },
      },
    });
    splide.mount();
  },
};

export default Beranda;
