import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    error: "",

}

export const getProducts = createAsyncThunk("products/getProducts", async () => {
    
    const res = await fetch('http://localhost:5000/products');
    const data = await res.json();
    return data
})


const ProductSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        
        builder.addCase(getProducts.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.products = action.payload;
        });

        builder.addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
            state.products = [];
        })


    }
})

export default ProductSlice.reducer;