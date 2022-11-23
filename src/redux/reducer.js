/* eslint-disable prettier/prettier */
import { ADD_FOOD_QUANTITY, CART_DATA, DARK_THEME, HOTEL_DETAIL, HOTEL_DETAIL_REMOVE, LOADER_HOTEL, LOADER_HOTEL_END, MENU, REMOVE_ADD_FOOD, USER_DETAILS } from "./action";
import { 
    LOGIN_STATUS,
    FETCH_BANNERS,
    FETCH_HOTELS,
    LOADER_HOTEL_START,
    ADD_FOOD_CART,
    ADD_FOOD_CART_REMOVE
} from "./action";

const initialValue = {
    theme: false,
}

const initialStatus = {
    loginStatus: false,
}

// function themeReducer(state = initialValue, action) {
//     switch (action.type) {
//         case DARK_THEME:
//             return { ...state, theme: action.payload }
//         default:
//             return state;
//     }
// }

function loginStatusReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_STATUS:
            return { ...state, loginStatus: action.payload };
        case USER_DETAILS: 
            return {...state, userDetails: action.payload};
        default:
            return state;
    }
}
function fetchBannerReducer(state = {loading: true}, action) {
    switch (action.type) {
        case FETCH_BANNERS:
            return { ...state, banners: action.payload };
        default:
            return state;
    }
}
function fetchHotelReducer(state = {loading: true,menu:[],hotels:[]}, action) {
    switch (action.type) {
        case FETCH_HOTELS:
            return { ...state, hotels: action.payload };
        case MENU: 
            return {...state, menu: action.payload};
        case LOADER_HOTEL_END: 
            return {...state, loading: false};
        case LOADER_HOTEL_START: 
            return {...state, loading: true,menu:[]};
        default:
            return state;
    }
}
function fetchCartData(state = {loading: true,data:[]}, action) {
    switch (action.type) {
        case CART_DATA:
            return { ...state, data: action.payload };
        case ADD_FOOD_CART:
            let present = state?.data?.find(item=>item?.name === action.payload?.name);
            console.log(!!present);
            return { ...state, data: !present ? [...state.data,action.payload] : [...state.data] };
        case HOTEL_DETAIL: 
            return {...state, hotelDetail: action.payload};
        case HOTEL_DETAIL_REMOVE: 
            return {...state, hotelDetail: []};
        case ADD_FOOD_CART_REMOVE: 
            return {...state, data: []};
        case ADD_FOOD_QUANTITY: 
            const newArray = state.data;
            newArray[action.payload].quantity += 1 ;
            return {...state,data: newArray };
        case REMOVE_ADD_FOOD: 
            const dummy = state.data;
            dummy[action.payload].quantity === 1 ? dummy.splice(action.payload,1) : dummy[action.payload].quantity -= 1 ;
            return {...state,data: dummy }
        default:
            return state;
    }
}


export {  loginStatusReducer,fetchBannerReducer,fetchHotelReducer,fetchCartData };