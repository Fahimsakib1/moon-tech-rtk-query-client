import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import CartSlice from "../features/cart/CartSlice";
import FilterSlice from "../features/filter/FilterSlice";
import CartCounter from "../middlewares/CartCounter";
import { productsAPI } from "../features/API/apiSlice";


const store = configureStore({
    reducer : {
        cart: CartSlice,
        filter: FilterSlice,

        //for adding the productAPI to the store
        [productsAPI.reducerPath]: productsAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsAPI.middleware)
})

export default store;