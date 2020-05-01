import { call, all } from 'redux-saga/effects';
import { watchSetIngredients } from './setIngredients';

export function* rootSaga() {
    yield all([call(watchSetIngredients)]);
}