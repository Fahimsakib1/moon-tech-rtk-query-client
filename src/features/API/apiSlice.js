import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const productsAPI = createApi({
    reducerPath: 'getProducts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
    }),
    tagTypes: ['Products'],

    endpoints: (builder) => (
        {
            getProducts: builder.query({
                query: () => ({
                    url: '/products'
                }),
                providesTags: ['Products'],
            }),

            addProduct: builder.mutation({
                query: (data) => ({
                    url: '/addProduct',
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-type': 'application/json',
                    },
                }),
                invalidatesTags: ['Products']
            }),

            deleteProduct : builder.mutation({
                query: (id) => ({
                    url: `/product/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Products']
            }),

            updateProduct : builder.mutation({
                query: (product) => ({
                    url: `/updateProduct/${product.id}`,
                    method: 'PUT',
                    body: product,
                    headers: {
                        'Content-type': 'application/json',
                    },
                }),
                invalidatesTags: ['Products']
            }),
            
        }
    )
})


export const { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation, useUpdateProductMutation} = productsAPI;