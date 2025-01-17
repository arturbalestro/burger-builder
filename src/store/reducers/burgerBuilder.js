import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
    ingredients: null,
    totalPrice: 5,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const removedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const removedIngredients = updateObject(state.ingredients, removedIngredient);
    const updatedRemovedState = {
        ingredients: removedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedRemovedState);
}

const setIngredients = (state, action) => {
    const ingredients = action.payload;
    return updateObject(state, {
        ingredients: {
            salad: ingredients.salad,
            bacon: ingredients.bacon,
            cheese: ingredients.cheese,
            meat: ingredients.meat
        },
        totalPrice: 4,
        error: false
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
}

export default reducer;