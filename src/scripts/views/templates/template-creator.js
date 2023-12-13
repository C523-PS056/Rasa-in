const createCategoryRecipesItemTemplate = (category, isLoading = false) => {
  if (isLoading) {
    // Tampilkan skeleton loader jika sedang dalam proses loading
    return `
      <div class="category__item skeleton-loader">
        <div class="category__item-image skeleton-loader-image"></div>
        <div class="category__item-title skeleton-loader-title"></div>
      </div>
    `;
  }

  // Tampilkan item kategori yang sebenarnya jika tidak dalam proses loading
  return `
    <a id="${category.key}" class="category__item" href="#/resep?category=${category.key}">
      <div class="category__item-image">
        <img src="${category.img}" alt="${category.category}">
      </div>
      <h4 class="category__item-title">${category.category}</h4>
    </a>
  `;
};

const createNewRecipesItemTemplate = (recipes, isLoading = false) => {
  if (isLoading) {
    // Tampilkan skeleton loader jika sedang dalam proses loading
    return `
      <div class="new-recipes__item skeleton-loader">
        <div class="new-recipes__item-image skeleton-loader-image"></div>
        <div class="new-recipes__item-text">
          <div class="skeleton-loader-title"></div>
          <div class="skeleton-loader-title"></div>
          <div class="skeleton-loader-title"></div>
          <div class="recipes-info">
            <div class="recipes-info__item skeleton-loader-info"></div>
            <div class="recipes-info__item skeleton-loader-info"></div>
          </div>
        </div>
      </div>
    `;
  }

  // Tampilkan item resep yang sebenarnya jika tidak dalam proses loading
  return `
    <a class="new-recipes__item" href="${
      recipes.key ? `#/detail/${recipes.key}` : `#/detail/${recipes.id}`
    }">
      <div class="new-recipes__item-image">
        <img src="${recipes.thumb}" alt="${recipes.title}">
      </div>
      <div class="new-recipes__item-text">
        <h4>${recipes.title}</h4>
        <div class="recipes-info">
          ${
            recipes.times
              ? `<div class="recipes-info__item"><i class='bx bx-timer'></i><p>${recipes.times}</p></div>`
              : ''
          }
          ${
            recipes.difficulty
              ? `<div class="recipes-info__item"><i class='bx bx-line-chart'></i><p>${recipes.difficulty}</p></div>`
              : ''
          }
          ${
            recipes.calories
              ? `<div class="recipes-info__item"><i class='bx bx-cookie'></i><p>${recipes.calories}</p></div>`
              : ''
          }
        </div>
      </div>
    </a>
  `;
};

const createNewArticlesItemTemplate = (article, isLoading = false) => {
  if (isLoading) {
    // Tampilkan skeleton loader jika sedang dalam proses loading
    return `
      <li class="splide__slide">
        <div class="article__item skeleton-loader">
          <div class="article__item-image skeleton-loader-image">
          </div>
          <div class="article__item-text skeleton-loader-text">
          <div class="skeleton-loader-title"></div>
          <div class="skeleton-loader-title"></div>
          </div>
      </li>
    `;
  }

  // Tampilkan item artikel yang sebenarnya jika tidak dalam proses loading
  return `
    <li class="splide__slide">
      <a class="article__item" href="#/artikel/${article._id}">
        <div class="article__item-image">
          <img src="${article.thumb}" alt="${article.title}" width="500" height="300">
        </div>
        <div class="article__item-text">
          <h4>${article.title}</h4>
        </div>
      </a>
    </li>
  `;
};

const recipeDetailTemplate = (recipe, isLoading = false) => {
  if (isLoading) {
    // Tampilkan skeleton loader jika sedang dalam proses loading
    return `
      <div class="button-back-container skeleton-button">
      </div>
      <div class="recipe-detail-wrapper skeleton-loader">
        <div class="recipe-detail-text">
          <div class="skeleton-loader-title"></div>
          <div class="skeleton-loader-title"></div>
          <div class="skeleton-loader-title"></div>
          <div class="skeleton-loader-title"></div>
          <div class="skeleton-loader-title"></div>
        </div>
        <div class="recipe__item-image skeleton-loader-image"></div>
        <div class="recipes-info">
          <div class="recipes-info__item skeleton-loader-info"></div>
          <div class="recipes-info__item skeleton-loader-info"></div>
          <div class="recipes-info__item skeleton-loader-info"></div>
        </div>
      </div>
      <div class="ingredients-steps-wrapper skeleton-loader">
        <div class="recipe-ingredients">
          <div class="recipe-ingredients__info">
            <div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
            </div>
          </div>
        </div>
        <div class="recipe-steps">
          <div class="recipe-steps__info">
            <div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
              <div class="skeleton-loader-title"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  let ingredients = '';
  let steps = '';

  recipe.ingredient.forEach((ingredient) => {
    ingredients += `<li>${ingredient}</li>`;
  });

  recipe.step.forEach((step) => {
    steps += `<li>${step}</li>`;
  });

  const htmlStr = `
    <div class="button-back-container">
      <a class="button-back" href="#/resep"><i class='bx bx-chevron-left'></i>Kembali</a>
    </div>
    <div class="recipe-detail-wrapper">
      <div class="recipe-detail-text">
        <h2 tabindex="0">${recipe.title}</h2>
        <p tabindex="0">${recipe.desc}</p>
      </div>
      <div class="recipe__item-image">
        <img src="${recipe.thumb}" alt="${recipe.title}">
      </div>
      <div class="recipes-info">
        ${
          recipe.times
            ? `<div class="recipes-info__item"><i class='bx bx-timer'></i><p>${recipe.times}</p></div>`
            : ''
        }
        ${
          recipe.difficulty
            ? `<div class="recipes-info__item"><i class='bx bx-line-chart'></i><p>${recipe.difficulty}</p></div>`
            : ''
        }
        ${
          recipe.calories
            ? `<div class="recipes-info__item"><i class='bx bx-cookie'></i><p>${recipes.calories}</p></div>`
            : ''
        }
      </div>
    </div>
    <div class="ingredients-steps-wrapper">
      <div class="recipe-ingredients">
        <h3 tabindex="0">Bahan-bahan</h3>
        <div class="recipe-ingredients__info">
          <ul>
            ${ingredients}
          </ul>
        </div>
      </div>
      <div class="recipe-steps">
        <h3 tabindex="0">Cara Membuat</h3>
        <div class="recipe-steps__info">
          <ol>
            ${steps}
          </ol>
        </div>
      </div>
    </div>
  `;

  return htmlStr;
};

const articleDetailTemplate = (article, isLoading = false) => {
  if (isLoading) {
    // Tampilkan skeleton loader jika sedang dalam proses loading
    return `
    <div class="button-back-container skeleton-button">
    </div>
    <div class="article-detail-text">
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-title"></div>
    </div>
    <div class="article-detail-image skeleton-loader-image">
    </div>
    <div class="article-detail-content">
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-title"></div>
    </div>
    <div class="article-detail-content">
      <div class="skeleton-loader-title"></div>
      <div class="skeleton-loader-title"></div>
      <div class="skeleton-loader-title"></div>
      <div class="skeleton-loader-title"></div>
      <div class="skeleton-loader-title"></div>
      <div class="skeleton-loader-title"></div>
      <div class="skeleton-loader-title"></div>
      <div class="skeleton-loader-title"></div>
      <div class="skeleton-loader-title"></div>
  </div>
`;
  }

  const articleContent = article.sanitizedHtml;
  const Content = articleContent.replace(/\n/g, '');
  const htmlStr = `
    <div class="button-back-container">
        <a class="button-back" href="#/artikel"><i class="bx bx-chevron-left"></i>Kembali</a>
    </div>
    <div class="article-detail-text">
        <h2>${article.title}</h2>
        <p>${article.desc}</p>
    </div>
    <div class="article-detail-image-container">
    <div class="article-detail-image">
    <img src="${article.thumb}" alt="${article.title}" />
    </div>
    <div class="article-detail-image">
    <img src="${article.thumb}" alt="${article.title}" />
    </div>
    <div class="article-detail-image">
    <img src="${article.thumb}" alt="${article.title}" />
    </div>
    </div>
    <div class="article-detail-content">
        <p>${Content}</p>
    </div>
    <h3>Penulis : ${article.username}</h3>
    `;
  return htmlStr;
};

const addArticleTemplate = () => `
  <div class="button-back-container">
    <a class="button-back" href="#/artikel"><i class="bx bx-chevron-left"></i>Kembali</a>
  </div>
  <div class="page-text">
  <h2 class="page-title">Tambah Artikel</h2>
  <p>Tuliskan Artikel Anda di sini dan biarkan pengalaman serta pengetahuan Anda menjadi sumber inspirasi bagi pembaca lainnya.</p>
  </div>
  <form id="articleForm">
    <label for="title">Judul<span>:</span></label>
    <div class="input-container">
        <input
            type="text"
            id="title"
            name="title"
            placeholder="Masukkan judul artikel..."
            required
            oninvalid="this.setCustomValidity('Ini harus diisi !')"
            oninput="this.setCustomValidity('')"
        />
    </div>

    <label for="desc">Deskripsi singkat<span>:</span></label>
    <textarea
        id="desc"
        name="desc"
        rows="4"
        placeholder="Masukkan deskripsi singkat artikel..."
        required
        oninvalid="this.setCustomValidity('Ini harus diisi !')"
        oninput="this.setCustomValidity('')"
    ></textarea>

    <label for="content">Isi artikel<span>:</span></label>
    <textarea
        id="content"
        name="content"
        rows="6"
        placeholder="Masukkan isi artikel..."
        required
        oninvalid="this.setCustomValidity('Ini harus diisi !')"
        oninput="this.setCustomValidity('')"
    ></textarea>

    <label for="username">Penulis<span>:</span></label>
    <div class="input-container">
        <input
            type="text"
            id="username"
            name="username"
            placeholder="Masukkan nama anda..."
            required
            oninvalid="this.setCustomValidity('Ini harus diisi !')"
            oninput="this.setCustomValidity('')"
        />
    </div>

    <label for="thumb">Thumbnail<span>:</span></label>
    <div>
    <label for="thumb" class="drop-container" id="dropContainer">
        <span class="drop-title">Letakkan file di sini </br>(maks. 2 MB).</span>
        atau
        <input
            type="file"
            id="thumb"
            name="thumb"
            accept="image/*"
            required
            oninvalid="this.setCustomValidity('Ini harus diisi !')"
            oninput="this.setCustomValidity('')"
        />
    </label>
    <div id="fileSizeError" class="error-message"></div>
    </div>
    <div class="button-container">
        <button type="submit" id="submitForm" class="button button-large">Tambah Artikel</button>
    </div>
</form>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this recipe" id="likeButton" class="like">
    <i class='bx bx-heart' aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
<button aria-label="unlike this recipe" id="likeButton" class="like liked">
    <i class='bx bxs-heart' aria-hidden="true"></i>
  </button>
`;

export {
  createCategoryRecipesItemTemplate,
  createNewRecipesItemTemplate,
  createNewArticlesItemTemplate,
  recipeDetailTemplate,
  articleDetailTemplate,
  addArticleTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
