import API_ENDPOINT from '../globals/api-endpoint';

class DataSource {
  static async newRecipe() {
    const response = await fetch(API_ENDPOINT.NEW_RECIPES);
    const responseJson = await response.json();
    return responseJson.results;

  }

  static async recipeDetail(key) {
    const response = await fetch(API_ENDPOINT.RECIPE_DETAIL(key));
    const responseJson = await response.json();
    return responseJson.results;

  }

  static async recipeByCategory(key) {
    const response = await fetch(API_ENDPOINT.RECIPE_BY_CATEGORY(key));
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
    return responseJson.results;

  }
}

export default DataSource;
