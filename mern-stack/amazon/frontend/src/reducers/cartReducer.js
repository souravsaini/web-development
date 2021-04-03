import { 
    CART_ADD_ITEM, 
    CART_EMPTY, 
    CART_REMOVE_ITEM, 
    CART_SAVE_PAYMENT_METHOD, 
    CART_SAVE_SHIPPING_ADDRESS,
    CART_ADD_ITEM_FAIL
} from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;

            //to check whether selected item is already existed in cart
            const isExistedItem = state.cartItems.find(cartItem => cartItem.product === item.product);
            if(isExistedItem) {
                return {
                    ...state, 
                    error: '',
                    //replace existed item with new item
                    cartItems: state.cartItems.map(cartItem => cartItem.product === item.product ? item : cartItem)
                }
            } else {
                //insert new item in cart along with other cart items
                return {...state, error: '', cartItems: [...state.cartItems, item]};
            }
        
        case CART_REMOVE_ITEM:
            return {...state, error: '', cartItems: state.cartItems.filter(item => item.product !== action.payload)};

        case CART_SAVE_SHIPPING_ADDRESS:;
            return {...state, shippingAddress: action.payload};

        case CART_SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: action.payload};
        
        case CART_ADD_ITEM_FAIL:
            return { ...state, error: action.payload };

        case CART_EMPTY:
            return {...state, error: '', cartItems: []};

        default:
            return state;
    }
}