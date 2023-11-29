const createCategoryRecipesItemTemplate = (category) => `
<a class="category__item" href="#/recipes?category=${category.key}">
<div class="category__item-image">
<img src="${category.img}" alt="${category.category}">
</div>
<h4 class="category__item-title">${category.category}</h4>
</a>
`;

const createNewRecipesItemTemplate = (recipes) => `
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
            ? `<div class="recipes-info__item"><i class='<i class='bx bx-cookie'></i>'></i><p>${recipes.calories}</p></div>`
            : ''
        }
    </div>
    </div>
</a> 
`;

const createNewArticlesItemTemplate = (
  article,
) => ` 	<li class="splide__slide"><a class="article__item" href="">
<div class="article__item-image">
  <img src="${article.thumb}" alt="${article.title}">
</div>
<div class="article__item-text">
  <h4>${article.title}</h4>
</div>
</a>
</li>
`;

const recipeDetailTemplate = (recipe) => {
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
       <a class="button-back" href="#/beranda"><i class='bx bx-chevron-left'></i>Kembali</a>
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
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
