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

export const renderTitleLimit = (title, limit = 17) => {
    const newTitle = [];

    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
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
    elements.recepiList.insertAdjacentHTML('beforeend', html);
};
export const clearSearchInput = () => {
    elements.searchInput.value = '';
};

export const clearResultList = () => {
    elements.recepiList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

/**
 * Pagination
 */
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>    
    </button>
`;

const renderButton = (page, numPages, resPerPage) => {
    const pages = Math.ceil((numPages / resPerPage));

    let button;

    if (page === 1 && pages > 1) {
        //render only next button for page 2
        button = createButton(page, 'next');
    }
    else if (page < pages) {
        //render both button
        button = `${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }
    else if (page === pages && pages > 1) {
        //render only prev button for page pages - 1
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe); //forEach automatically call the function and passes the current element
    renderButton(page, recipes.length, resPerPage);
};

/**
 * Highlight Selected Recipe
 */
export const highlightRecipe = id => {
    if (id) {
        const elements = Array.from(document.querySelectorAll('.results__link'));
        elements.forEach(el => el.classList.remove('results__link--active'));
        document.querySelector(`.results__link[href*="#${id}"]`).classList.add('results__link--active');
    }
};


