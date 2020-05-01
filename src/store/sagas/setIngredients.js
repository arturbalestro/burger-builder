import { takeLatest, put, call, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

const getIngredients = () => {
    return axios.get('https://build-my-burger-bea8c.firebaseio.com/ingredients.json');
}

function* fetchIngredients() {
    try {
        const response = yield call(getIngredients);
        console.log('###i need a response here', response);
        yield put({type: actionTypes.SET_INGREDIENTS, payload: response.data});
    } catch(e) {
        console.log('ERROR!!!!', e);
    }
}

export function* watchSetIngredients() {
    yield takeLatest(actionTypes.SET_INGREDIENTS, fetchIngredients)
}