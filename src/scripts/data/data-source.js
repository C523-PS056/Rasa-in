import API_ENDPOINT from '../globals/api-endpoint';

class DataSource {
  static async newRecipe(page) {
    const response = await fetch(API_ENDPOINT.NEW_RECIPES(page));
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async recipeDetail(key) {
    const response = await fetch(API_ENDPOINT.RECIPE_DETAIL(key));
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async recipeByCategory(key, page) {
    const response = await fetch(API_ENDPOINT.RECIPE_BY_CATEGORY(key, page));
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async recipeCategory() {
    const response = await fetch(API_ENDPOINT.RECIPE_CATEGORY);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async newArticles() {
    const response = await fetch(API_ENDPOINT.NEW_ARTICLE);
    const responseJson = await response.json();
    return responseJson;
  }

  static async articleDetail(id) {
    const response = await fetch(API_ENDPOINT.ARTICLE_DETAIL(id));
    const responseJson = await response.json();
    return responseJson;
  }

  static async searchRecipes(key) {
    const response = await fetch(API_ENDPOINT.SEARCH_RECIPES(key));
    const responseJson = await response.json();
    return responseJson.results;
  }
}

export default DataSource;
