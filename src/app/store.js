import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import CartSlice from "../features/cart/CartSlice";
import FilterSlice from "../features/filter/FilterSlice";
import CartCounter from "../middlewares/CartCounter";
import ProductSlice from "../features/products/ProductSlice";

const store = configureStore({
    reducer : {
        products: ProductSlice,
        cart: CartSlice,
        filter: FilterSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(CartCounter)
})

export default store;