import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteProduct, fetchProducts, getSpecificProduct, postProduct, updateProduct } from './ProductAPI';
import API from "../../AXIOS/axios.config";




const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    postSuccess: false,
    deleteSuccess: false,
    updateSuccess: false,
    error: "",

}

export const getProducts = createAsyncThunk("products/getProducts", async () => {
    //ProductApi.js theke fetchProducts() method k call kora holo.
    const products = fetchProducts();
    return products;
})

export const addProduct = createAsyncThunk("products/addProduct",
    async (product) => {
        // const response = await axios.post("http://localhost:5000/addProduct", product);
        // return response.data;
        const newProduct = postProduct(product)
        return newProduct;

    })


export const removeProduct = createAsyncThunk("products/removeProduct",
    async (id, thunkAPI) => {
        const product = await deleteProduct(id)
        thunkAPI.dispatch(removeFromProductList(id))
        return product;

    })


export const getSingleProduct = createAsyncThunk("products/getSingleProduct",
    async (id) => {
        const product = await getSpecificProduct(id)
        return product;

    })



export const editProduct = createAsyncThunk("products/updateProduct",
    async (product, { rejectWithValue }) => {
        
        //nicher 2 ta line na likhe ei full try and catch block er code ta run korleo kaj hobe..

        // try {
        //     const response = await fetch(`http://localhost:5000/updateProduct/${product.id}`, {
        //         method: 'PUT',
        //         body: JSON.stringify(product),
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     })
        //     const data = await response.json();
        //     if (data.acknowledged === true) {
        //         return data;
        //     }
        // }
        // catch (error) {
        //     return rejectWithValue(error.response.data);
        // }

        const updatedProduct = await updateProduct(product);
        return updatedProduct
    })












const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        togglePostSuccess: (state) => {
            state.postSuccess = false;
        },

        toggleDeleteSuccess: (state) => {
            state.deleteSuccess = false;
        },

        removeFromProductList: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload)
        },

        toggleUpdateSuccess: (state) => {
            state.updateSuccess = false;
        }
    },

    extraReducers: (builder) => {

        //get the product data from server with different response types
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.products = [];
            })




        //add product data to server
        builder
            .addCase(addProduct.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.postSuccess = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.postSuccess = true;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.products = [];
                state.postSuccess = false;
            });




        //delete product data
        builder
            .addCase(removeProduct.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.deleteSuccess = false
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.deleteSuccess = true
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.products = [];
                state.deleteSuccess = false
            });


        //get specific product data from server for update
        builder
            .addCase(getSingleProduct.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                //ei line na likhle edit product page e product ta form er moddhe default value show korbe na
                state.products = action.payload;
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.products = [];
            })


        //update a product data 
        builder
            .addCase(editProduct.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.updateSuccess = false;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.updateSuccess = true;
                //ei line na likhle edit product page e product ta form er moddhe default value show korbe na
                state.products = action.payload;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.products = [];
                state.updateSuccess = false;
            })


    }
})

export const { togglePostSuccess, toggleDeleteSuccess, removeFromProductList, toggleUpdateSuccess } = ProductSlice.actions
export default ProductSlice.reducer;