import axios from 'axios';

export default class Recipe {

    constructor(id) {
        this.id = id;
    }

    async getRecipe() {

        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

            this.title = res.data.recipe.title;
            this.image_url = res.data.recipe.image_url;
            this.ingredients = res.data.recipe.ingredients;
            this.publisher = res.data.recipe.publisher;
            this.publisher_url = res.data.recipe.publisher_url;
            this.social_rank = res.data.recipe.social_rank;
            this.source_url = res.data.recipe.source_url;

            //console.log(res);

        } catch (error) {
            alert(error);
        }
    }

    calcTime() {
        //We are assuming that every 3 ingredients will take 15 minuts
        const numIng = this.ingredients.length;
        const period = Math.ceil((numIng / 3));
        this.time = period * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'cup'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'cups'];
        const unit = [...unitShort, 'g', 'kg'];

        const newIngredients = this.ingredients.map(el => {

            //1. uniform unites
            let ingredient = el.toLowerCase();
            unitLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            //2. remove paranthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            //3. parse ingredients into count, unit and ingredients
            const arrIng = ingredient.split(' ');

            const unitIndex = arrIng.findIndex(el2 => unit.includes(el2));

            let objIng;

            if (unitIndex > -1) {
                //there is unit in ArrIng
                const arrCount = arrIng.slice(0, unitIndex);

                let count;

                if (arrCount.length === 1) {
                    count = eval(arrCount[0].replace('-', '+'));
                }
                else {
                    count = eval(arrCount.join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                //There is not unit but first element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            }
            else if (unitIndex === -1) {
                //There is no unit and no number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }

    updateServings(type) {
        //serving
        const newServing = type === 'dec' ? this.servings - 1 : this.servings + 1;

        //indgredinets
        this.ingredients.forEach(ing => {
            ing.count *= newServing / this.servings;
        });

        this.servings = newServing;
    }
}