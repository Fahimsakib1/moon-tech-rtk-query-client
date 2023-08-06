import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    stock: false,
    brands: [],
    keyword: "",

}

const FilterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        toggle: (state) => {
            state.stock = !state.stock
        },
        toggleBrand: (state, action) => {
            if(!state.brands.includes(action.payload)){
                state.brands.push(action.payload)
            }
            else{
                state.brands = state.brands.filter(brand => brand !== action.payload)
            }
        }
    }
})

export const {toggle, toggleBrand} = FilterSlice.actions
export default FilterSlice.reducer