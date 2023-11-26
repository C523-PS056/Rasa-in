const createCategoryRecipesItemTemplate = (category) => `
<a class="category__item" href="#/recipes?category=${category.key}">
<div class="category__item-image">
<img src="${category.img}" alt="${category.category}">
</div>
<h4 class="category__item-title">${category.category}</h4>
</a>
`;

const createNewRecipesItemTemplate = (recipes) => `
<a class="new-recipes__item" href="">
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

export {
  createCategoryRecipesItemTemplate,
  createNewRecipesItemTemplate,
  createNewArticlesItemTemplate,
};
