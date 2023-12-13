import DataSource from '../../data/data-source';
import UrlParser from '../../routes/url-parser';
import scrollToTop from '../../utils/scroll-to-top';
import { createNewRecipesItemTemplate } from '../templates/template-creator';

const Resep = {
  async render() {
    return `
    <section class="page">
    <div class="button-back-container">
      <a class="button-back" href="#"><i class='bx bx-chevron-left'></i>Kembali</a>
    </div>
    <div class="page-text">
      <h2 class="page-title">Resep Masakan</h2>
      <p>Telusuri kumpulan resep masakan yang kami buat untuk memenuhi kebutuhanmu.</p>
    </div>
    <div class="search-and-filter-wrapper">
      <div class="search">
        <div class="search-input">
          <i class='bx bx-search' ></i>
          <input
            type="text"
            id="s"
            name="s"
            placeholder="Mau masak apa hari ini ?"
            />
        </div>
      </div>
      <div class="filter-container">
        <select id="filter" class="filter">
          <option value="">Telusuri Berdasarkan</option>
        </select>
      </div>
    </div>
    <h3>Resep Terbaru</h3>
    <div class="recipes-container"></div>
    <div class="pagination-container" id="paginationContainer"></div>
  </section>
  `;
  },

  async afterRender() {
    const currentURL = window.location.href;
    const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner();
    const urlParams = new URLSearchParams(parsedUrl.queryParams);
    const searchRecipes = urlParams.get('s');
    const categoryFilter = urlParams.get('category');
    const currentPage = urlParams.get('page');

    // Menghapus parameter pencarian sebelum karakter # dan menambahkan parameter 's'
    const cleanURL = currentURL.replace(/\?.*#/, '#');
    window.history.replaceState({}, document.title, cleanURL);

    const inputElement = document.getElementById('s');

    console.log(inputElement);
    inputElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Cegah perilaku pengiriman formulir default
        const newSearchValue = inputElement.value;
        this.manipulateURL(parsedUrl, { s: newSearchValue });
        this.handleFilterChange();
        this.setupFilterDropdown(categories);
      }
    });

    inputElement.value = searchRecipes;
    inputElement.value = decodeURIComponent(searchRecipes ?? '');

    this.renderRecipes();
    scrollToTop();
    // Ambil kategori resep
    const categories = await DataSource.recipeCategory();
    if (!window.location.hash.startsWith('#/resep')) {
      return;
    }
    this.setupFilterDropdown(categories);

    // Cek apakah ada query pencarian
    let recipes;
    if (searchRecipes) {
      recipes = await DataSource.searchRecipes(searchRecipes);
    } else {
      recipes = categoryFilter
        ? await DataSource.recipeByCategory(categoryFilter, currentPage ?? 1)
        : await DataSource.newRecipe(currentPage ?? 1);
    }
    this.recipes = recipes; // Simpan hasil pencarian di dalam objek recipes
    if (!window.location.hash.startsWith('#/resep')) {
      return;
    }
    this.renderRecipes(this.recipes);
    this.renderPagination();
  },

  manipulateURL(parsedUrl, queryParams) {
    let updatedURL = `#/${parsedUrl.resource}`;

    // Hapus parameter pencarian dan kategori
    updatedURL = updatedURL.replace(/\?.*/, '');

    let queryString = '';
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) {
        queryString += queryString === '' ? '?' : '&';
        queryString += `${key}=${value}`;
      }
    });

    updatedURL += queryString;

    window.history.replaceState({}, document.title, updatedURL);
  },

  // Metode untuk merender resep berdasarkan kategori yang dipilih
  renderRecipes(recipes = [...Array(12)]) {
    // Bersihkan kontainer resep
    const recipesContainer = document.querySelector('.recipes-container');
    recipesContainer.innerHTML = '';

    if (recipes.length > 0) {
      // Isi kontainer resep dengan item resep baru
      recipes.forEach((recipe) => {
        recipesContainer.innerHTML += createNewRecipesItemTemplate(
          recipe,
          !recipe,
        );
      });
    } else {
      // Jika tidak ada resep ditemukan, tampilkan pesan
      recipesContainer.innerHTML =
        '<p>Maaf, resep yang kamu cari tidak ditemukan.</p>';
    }
  },

  // Metode untuk mengatur dropdown filter kategori
  async setupFilterDropdown(categories = []) {
    // Dapatkan elemen dropdown
    const dropdown = document.getElementById('filter');
    dropdown.innerHTML = '';

    // Buat opsi default untuk dropdown
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Telusuri Berdasarkan';
    dropdown.appendChild(defaultOption);

    // Isi dropdown dengan opsi kategori
    categories.forEach((category) => {
      const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner();
      const urlParams = new URLSearchParams(parsedUrl.queryParams);

      const option = document.createElement('option');
      option.value = category.key;
      option.text = category.category;

      // Atur opsi yang dipilih berdasarkan kategori saat ini di URL
      const currentCategory = urlParams.get('category');
      if (category.key === currentCategory) {
        option.selected = true;
      }

      dropdown.appendChild(option);
    });

    // Tambahkan listener untuk perubahan filter
    dropdown.addEventListener('change', () => {
      const cleanParam = window.location.href.replace(/&?s=[^&]+/, '');
      window.history.replaceState({}, document.title, cleanParam);

      const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner();
      const urlParams = new URLSearchParams(parsedUrl.queryParams);

      // Update hanya parameter 'category'
      if (dropdown.value) {
        urlParams.set('category', dropdown.value);
      } else {
        urlParams.delete('category');
      }

      // Konstruksi URL baru dengan 'category' yang diperbarui dan parameter lainnya tetap
      this.manipulateURL(parsedUrl, { category: dropdown.value });

      // Render resep berdasarkan kategori terpilih
      this.handleFilterChange();
    });
  },

  renderPagination() {
    const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner();
    const urlParams = new URLSearchParams(parsedUrl.queryParams);

    const currentPage = urlParams.get('page') ?? 1;
    const paginationContainer = document.querySelector('#paginationContainer');
    const totalPages = 5;

    paginationContainer.innerHTML = '';

    // Only display pagination if there are multiple pages
    if (totalPages > 1 && !urlParams.get('s')) {
      // Previous button
      const prevButton = document.createElement('button');
      prevButton.innerHTML = '<i class="bx bx-chevrons-left"></i>';
      prevButton.addEventListener('click', () => {
        const prevPage = currentPage > 1 ? Number(currentPage) - 1 : 1;
        this.manipulateURL(parsedUrl, {
          category: urlParams.get('category'),
          page: prevPage,
        });
        this.handleFilterChange();
      });
      paginationContainer.appendChild(prevButton);

      // Page buttons
      for (let i = 1; i <= totalPages; i += 1) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => {
          this.manipulateURL(parsedUrl, {
            category: urlParams.get('category'),
            page: i,
          });
          this.handleFilterChange();
        });

        paginationContainer.appendChild(button);
      }

      // Next button
      const nextButton = document.createElement('button');
      nextButton.innerHTML = '<i class="bx bx-chevrons-right"></i>';
      nextButton.addEventListener('click', () => {
        const nextPage =
          currentPage < totalPages ? Number(currentPage) + 1 : totalPages;
        this.manipulateURL(parsedUrl, {
          category: urlParams.get('category'),
          page: nextPage,
        });
        this.handleFilterChange();
      });
      paginationContainer.appendChild(nextButton);
    }
  },

  // Metode untuk menangani perubahan filter kategori
  async handleFilterChange() {
    const currentURL = window.location.href;
    const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner();
    const urlParams = new URLSearchParams(parsedUrl.queryParams);
    const searchRecipes = urlParams.get('s');
    const categoryFilter = urlParams.get('category');
    const currentPage = urlParams.get('page');

    // Menghapus parameter pencarian sebelum karakter # dan menambahkan parameter 's'
    const cleanURL = currentURL.replace(/\?.*#/, '#');
    window.history.replaceState({}, document.title, cleanURL);

    const inputElement = document.getElementById('s');
    inputElement.value = searchRecipes;
    inputElement.value = decodeURIComponent(searchRecipes ?? '');

    const recipesContainer = document.querySelector('.recipes-container');
    recipesContainer.innerHTML = '';
    scrollToTop();
    this.renderRecipes();
    // Render ulang resep berdasarkan filter kategori terpilih
    let recipes;
    if (searchRecipes) {
      recipes = await DataSource.searchRecipes(searchRecipes);
    } else {
      recipes = categoryFilter
        ? await DataSource.recipeByCategory(categoryFilter, currentPage ?? 1)
        : await DataSource.newRecipe(currentPage ?? 1);
    }

    this.recipes = recipes; // Simpan hasil pencarian di dalam objek recipes
    this.renderRecipes(recipes);
    this.renderPagination();
  },
};

export default Resep;
