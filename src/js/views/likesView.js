import { elements } from './base';
import { renderTitleLimit } from './searchView';

export const toggleLikeBtn = isLiked => {

    const icon = isLiked ? '' : '-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#icon-heart${icon}`);
};

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLikes = like => {
    const markup = `
     <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${renderTitleLimit(like.title)}.</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>    
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLikeItem = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (el) el.remove();
};