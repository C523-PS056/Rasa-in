/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRecipeIdb = {
  async getResep(id) {
    if (!id) {
      return;
    }
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllRecipe() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putRecipe(recipe) {
    if (!recipe.hasOwnProperty('id')) {
      return;
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, resep);
  },
  async deleteRecipe(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteRecipeIdb;
