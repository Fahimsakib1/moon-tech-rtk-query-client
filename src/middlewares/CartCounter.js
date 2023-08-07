import { AddToCart } from "../features/cart/CartSlice";



//this function is called currying function in javascript
const CartCounter = (store) => (next) => (action) => {

    const state = store.getState();
    const cart = state.cart.cart; //cart ekta array

    // console.log("Current State: ", store.getState());
    // console.log("Action: ", action);

    if (action.type === AddToCart) {

        const newAction = {
            ...action,
            payload: { ...action.payload, cartPosition: cart.length }
        }

        return next(newAction);
    }
    return next(action);
}

export default CartCounter;