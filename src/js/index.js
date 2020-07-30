// Global app controller

/**
 * Import types
 */
/*
import str from './models/Search';
import {add, multiply, ID} from './views/searchView'; //One way to import - same name as export
import { add as a, multiply as m, ID } from './views/searchView'; //second way to import - diff name from export
import * as searchView from './views/searchView'; //third way to import - all at once in object
console.log(`Imported function add: ${searchView.add(searchView.ID, 2)} and multilpy ${searchView.multiply(5, 3)}. Imported string ${str}`);
*/

/**
 * Actual Controller code
 */

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader, elementStrings } from './views/base';

/** Global state of the app
 * - search object
 * - current recipe object
 * - Shopping list
 * - liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {

    //1. get the query from the view
    const query = searchView.getInput();

    if (query) {

        //2. new search object and add to state
        state.search = new Search(query);

        //3. prepare UI
        searchView.clearSearchInput();
        searchView.clearResultList();
        renderLoader(elements.searchRes);

        //4. search for recipes
        try {
            await state.search.getResults();

            //5. render search result on UI
            //console.log(state.search.recipes);
            clearLoader();
            searchView.renderResults(state.search.recipes);
        }
        catch (error) {
            alert(error);
            clearLoader();
        }

    }


};


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest(`.${elementStrings.searchResultsbtn}`);

    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResultList();
        searchView.renderResults(state.search.recipes, gotoPage);
    }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {

    // Retriving the id from URL
    const id = window.location.hash.replace('#', '');

    if (id) {
        //prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //create new recipe object
        state.recipe = new Recipe(id);

        if (state.search) searchView.highlightRecipe(id);

        try {
            //get recipe data and paese ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            console.log(state.recipe);
            clearLoader();


            //calculate time and serving
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render the recipe
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert(error);
        }

    }

};


/**
 * mulitple events in single event lister
 */
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * Handling recipe button cliks
 */
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //decrese button clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
        }
        recipeView.updateServingIngredients(state.recipe);

    }
    else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //Increase button clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingIngredients(state.recipe);
    }
});


