import {applyMiddleware, createStore, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer } from "./reducers/orderReducer";
import { productListReducer, productDetailsReducer, productCreateReducer, productUpdateReducer, productDeleteReducer  } from "./reducers/productReducer";
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userTopSellerListReducer, userUpdateProfileReducer, userUpdateReducer } from "./reducers/userReducer";

const initialState = {
    //fetch current user from localstorage on refresh
    userSignin: {
        userInfo: localStorage.getItem('userInfo') 
                    ? JSON.parse(localStorage.getItem('userInfo'))
                    : null
    },
    //fetch cart items from localstorage on refresh
    cart: {
        cartItems: localStorage.getItem('cartItems') 
                    ? JSON.parse(localStorage.getItem('cartItems'))
                    : [],
        shippingAddress: localStorage.getItem('shippingAddress')
                    ? JSON.parse(localStorage.getItem('shippingAddress'))
                    : {},
        paymentMethod: 'PayPal'
    }
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userTopSellerList: userTopSellerListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;