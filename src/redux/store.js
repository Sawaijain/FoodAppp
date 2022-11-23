/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {  loginStatusReducer,fetchBannerReducer,fetchHotelReducer,fetchCartData } from './reducer';

const rootReducer = combineReducers({
    loginStatusReducer,
    fetchBannerReducer,
    fetchHotelReducer,
    fetchCartData
});

export const store = createStore(rootReducer, applyMiddleware(thunk));