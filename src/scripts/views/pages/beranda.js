import Splide from '@splidejs/splide';
import DataSource from '../../data/data-source';
import {
  createNewRecipesItemTemplate,
  createCategoryRecipesItemTemplate,
  createNewArticlesItemTemplate,
} from '../templates/template-creator';

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
            placeholder="Mau masak apa hari ini ?"
          />
        </div>
        <div class="button-container">
          <a class="button" id="temukanButton">Temukan</a>
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
  <div class="splide__track "><ul class="splide__list"></ul>
  </div>
  </div>
  <div class="button-container">
    <a href="#/artikel" class="button button-large"  type="submit">Lihat Selengkapnya</a>
  </div>
</section>

<section id="tentang-kami" class="about-us">
  <div class="about-us-text">
  <h2 class="section-title">Tentang Kami</h2>
  <p>Rasa-IN (Rasa Indonesia Nusantara)  adalah website yang menyediakan informasi resep-resep masakan nusantara.</p>
</div>
<div class="about-us-galery">
  <div class="about-us-galery__item"><h2>Rasa-IN</h2> </div>
  <div class="about-us-galery__item"><img class="lazyload" data-src="./images/about-us/cakra.jpg" alt="cakra"></div>
  <div class="about-us-galery__item"><img class="lazyload" data-src="./images/about-us/ganteng.jpg" alt="rangga"></div>
  <div class="about-us-galery__item"><p>Rasa Indonesia Nusantara</p></div>
  <div class="about-us-galery__item"><img class="lazyload" data-src="./images/about-us/ari.jpg" alt="ari"></div>
  <div class="about-us-galery__item"><img class="lazyload" data-src="./images/about-us/tri.jpg" alt="tri"></div>
</div>
</section>      
      `;
  },

  async afterRender() {
    // Optionally, you can add an event listener to the button as well
    document.getElementById('temukanButton').addEventListener('click', () => {
      const nilaiInput = document.getElementById('cariResep').value;
      window.location.href = `#/resep?s=${nilaiInput}`;
    });

    document.getElementById('cariResep').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const nilaiInput = e.target.value;
        window.location.href = `#/resep?s=${nilaiInput}`;
      }
    });

    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView();
      }
    }

    this.renderCategories();
    this.renderNewRecipes();
    this.renderNewArticles();

    // fetch
    const categories = await DataSource.recipeCategory();
    // jangan render jika pindah page
    if (window.location.hash && window.location.hash !== '#tentang-kami') {
      return;
    }
    this.renderCategories(categories);

    const categoryContainer = document.querySelector('.category-container');
    const loadMoreButton = document.querySelector('#loadMoreCategories');

    loadMoreButton.addEventListener('click', () => {
      categoryContainer.innerHTML = '';
      categories.forEach((category) => {
        categoryContainer.innerHTML += createCategoryRecipesItemTemplate(category);
      });

      loadMoreButton.style.display = 'none';
    });

    const newRecipes = await DataSource.newRecipe(1);
    if (window.location.hash && window.location.hash !== '#tentang-kami') {
      return;
    }
    this.renderNewRecipes(newRecipes);
    const newArticles = await DataSource.newArticles();
    if (window.location.hash && window.location.hash !== '#tentang-kami') {
      return;
    }
    this.renderNewArticles(newArticles);
  },

  renderCategories(categories = [...Array(10)]) {
    // categories
    const categoryContainer = document.querySelector('.category-container');
    categoryContainer.innerHTML = '';

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
      categoryContainer.innerHTML += createCategoryRecipesItemTemplate(
        category,
        !category,
      );
    });

    const loadMoreButton = document.querySelector('#loadMoreCategories');
    if (categories.length === limitedCategories.length) {
      loadMoreButton.style.display = 'none';
    }
  },

  renderNewRecipes(newRecipes = [...Array(6)]) {
    // new recipes
    const newRecipesContainer = document.querySelector('.recipes-container');
    newRecipesContainer.innerHTML = '';
    const limitNewRecipes = newRecipes.slice(0, 6);

    limitNewRecipes.forEach((recipe) => {
      newRecipesContainer.innerHTML += createNewRecipesItemTemplate(
        recipe,
        !recipe,
      );
    });
  },

  renderNewArticles(newArticles = [...Array(9)]) {
    // new articles
    const newArticlesContainer = document.querySelector('.splide__list');
    newArticlesContainer.innerHTML = '';

    const limitNewArticles = newArticles.slice(0, 9);
    limitNewArticles.forEach((article) => {
      newArticlesContainer.innerHTML += createNewArticlesItemTemplate(
        article,
        !article,
      );
    });
    const splide = new Splide('.splide', {
      breakpoints: {
        768: {
          perPage: 2,
          gap: '.7rem',
        },
        480: {
          perPage: 1,
          gap: '.7rem',
        },
      },
      autoplay: true,
      gap: '1.5rem',
      pagination: false,
      perPage: 3,
      perMove: 1,
      type: 'loop',
    });
    splide.mount();
  },
};

export default Beranda;
