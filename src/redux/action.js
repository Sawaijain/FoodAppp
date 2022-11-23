/* eslint-disable prettier/prettier */
import * as api from './backend.js';
// export const DARK_THEME = 'DARK_THEME';
export const LOGIN_STATUS = 'LOGIN_STATUS';
export const FETCH_BANNERS = "FETCH_BANNERS";
export const FETCH_HOTELS = "FETCH_HOTELS";
export const USER_DETAILS = "USER_DETAILS";
export const MENU = "MENU";
export const LOADER_HOTEL_END = "LOADER_HOTEL_END";
export const LOADER_HOTEL_START = "LOADER_HOTEL_START";
export const ADD_FOOD_CART = "ADD_FOOD_CART";
export const CART_DATA = "CART_DATA";
export const HOTEL_DETAIL = "HOTEL_DETAIL";
export const ADD_FOOD_CART_REMOVE = "ADD_FOOD_CART_REMOVE";
export const HOTEL_DETAIL_REMOVE = "HOTEL_DETAIL_REMOVE";
export const ADD_FOOD_QUANTITY = "ADD_FOOD_QUANTITY";
export const REMOVE_ADD_FOOD = 'REMOVE_ADD_FOOD';

// export const ChangeTheme = theme => dispatch => {
//     dispatch({
//         type: DARK_THEME,
//         payload: theme,
//     });
// };

export const LoginStatus = status => dispatch => {
    try {
        api.LoginStatus(dispatch);
    } catch (error) {
        console.log(error);
    }
};

export const SignUp = (data, navigation) => dispatch => {

    console.log(data,"ACTION");
    try {
        // const {email,password,name} = data;
        try {
            const response = api.SignUp(data,navigation,dispatch);
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
    }
}
export const SignIn = (data, navigation) => dispatch => {
    try {
        const response = api.SignIn(data,navigation,dispatch);
    } catch (error) {
        console.log(error);
    }
}

export const googleSignUp = (navigation) => dispatch => {
    try {
        api.GoogleSignIn();
    } catch (error) {
        console.log(error)
    }
}
export const fetchBanners = (navigation) => dispatch => {
    try {
        const data = api.FetchBanners(dispatch);
    } catch (error) {
        console.log(error);
    }
}
export const fetchHotels = (navigation) => dispatch => {
    try {
        const data = api.FetchHotels(dispatch);
    } catch (error) {
        console.log(error);
    }
}

export const fetchMenu = (menuId) => dispatch => {
    try {
        const data = api.FetchMenu(menuId, dispatch);
    } catch (error) {
        console.log(error);
    }
}

export const addFoodToCart = (food) => dispatch => {
    try {
        // console.log(food);
        const data =  api.AddFoodToCart(food,dispatch);
    } catch (error) {
        console.log(error);
    }
}

export const addHotelDetailsCart = (data) => dispatch => {
    try {
        // console.log(data);
        const res =  api.AddHotelDetailCart(data,dispatch);
    } catch (error) {
        console.log(error);
    }
}

export const cartData = () => dispatch=>{
    try {
        api.CartData(dispatch);
    } catch (error) {
        console.log(error);
    }
}

