import CONFIG from './config';

const API_ENDPOINT = {
  NEW_RECIPES: `${CONFIG.BASE_URL}`,
  RECIPE_DETAIL : (key) => `${CONFIG.BASE_URL}recipe/${key}`,
  RECIPE_BY_CATEGORY : (key) => `${CONFIG.BASE_URL}category/recipes/${key}`,
  RECIPE_CATEGORY : `${CONFIG.BASE_URL}category/recipes`,
};

export default API_ENDPOINT;
