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
import * as searchView from './views/searchView';
import {elements} from './views/base';

/** Global state of the app
 * - search object
 * - current recipe object
 * - Shopping list
 * - liked recipes
 */
const state = {};

const controlSearch = async () => {
    
    //1. get the query from the view
    const query = searchView.getInput();

    if (query){
        
        //2. new search object and add to state
        state.search = new Search(query);

        //3. prepare UI
        searchView.clearSearchInput();
        searchView.clearResultList();

        //4. search for recipes
        await state.search.getResults();

        //5. render search result on UI
        //console.log(state.search.recipes);
        searchView.renderResults(state.search.recipes);
    }


};

elements.searchForm.addEventListener('submit',e => {
    e.preventDefault();
    controlSearch();
});