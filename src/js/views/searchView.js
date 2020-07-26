/**
 * Export type
 */
/*
export const add = (a,b) => a+b;
export const multiply = (a,b) => a*b;
export const ID = 15;
*/

import { elements } from './base';

export const getInput = () => elements.searchInput.value;

const renderTitleLimit = (title, limit = 17) => {
    const newTitle = [];

    if(title.length > limit)
    {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit)
            {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }

    return title;
}; 

const renderRecipe = recipe => {
    const html = `<li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${renderTitleLimit(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
                  `;
    elements.recepiList.insertAdjacentHTML('beforeend',html);
};

export const renderResults = recipes => {
    recipes.forEach(renderRecipe); //forEach automatically call the function and passes the current element
};

export const clearSearchInput = () => {
    elements.searchInput.value = '';
};

export const clearResultList = () => {
    elements.recepiList.innerHTML = '';
};  