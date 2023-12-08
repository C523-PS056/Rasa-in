import CONFIG from './config';

const API_ENDPOINT = {
  NEW_RECIPES: (page) => `${CONFIG.BASE_URL}recipes/${page}`,
  RECIPE_DETAIL: (key) => `${CONFIG.BASE_URL}recipe/${key}`,
  RECIPE_BY_CATEGORY: (key, page) =>
    `${CONFIG.BASE_URL}category/recipes/${key}/${page}`,
  RECIPE_CATEGORY: `${CONFIG.BASE_URL}category/recipes`,
  NEW_ARTICLE: `${CONFIG.BASE_URL_ARTICLE}articles`,
  ARTICLE_DETAIL: (id) => `${CONFIG.BASE_URL_ARTICLE}articles/${id}`,
  SEARCH_RECIPES: (key) => `${CONFIG.BASE_URL}search/?s=${key}`,
};

export default API_ENDPOINT;
