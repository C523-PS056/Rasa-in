const createCategoryRecipesItemTemplate = (category) => `
<a class="category__item" href="#/recipes?category=${category.key}">
<div class="category__item-image">
<img src="${category.img}" alt="${category.category}">
</div>
<h4 class="category__item-title">${category.category}</h4>
</a>
`;

const createNewRecipesItemTemplate = (recipes) => `
<a class="new-recipes__item" href="#/detail/${recipes.key}">
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
    <div class="recipe__title">
      <h2 tabindex="0">${recipe.title}</h2>
      <p tabindex="0">${recipe.desc}</p>
    </div>
    <div class="new-recipes__item-image">
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
    <div class="recipe__info">
      <h4 tabindex="0">Bahan-bahan</h4>
      <div class="recipe__info_menu">
        <ul>
          ${ingredients}
        </ul>
      </div>
    </div>
    <div class="recipe__info">
      <h4 tabindex="0">Cara Membuat</h4>
      <div class="recipe__info_menu">
        <ol>
          ${steps}
        </ol>
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
  <button aria-label="unlike this recipe" id="likeButton" class="like">
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
