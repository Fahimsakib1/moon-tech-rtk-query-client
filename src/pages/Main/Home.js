import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrand } from "../../features/filter/FilterSlice";
import { RotatingLines } from 'react-loader-spinner';
import { useGetProductsQuery } from "../../features/API/apiSlice";
import { toast } from "react-hot-toast";












const Home = () => {


  const dispatch = useDispatch();


  // useGetProductsQuery ekta object return kore taai const {} = useAddProductMutation() ei vabe likha holo
  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery(null, {refetchOnMountOrArgChange: true})

  const products = data
  console.log("RTK Query Data: ", data);






  const activeClass = "text-white  bg-indigo-500 border-white";








  const filterState = useSelector((state) => state.filter);
  // console.log("Home Page Filter State:", filterState);

  const { brands, stock } = filterState;










  let filterContent;

  if (products?.length) {
    filterContent =
      Array.isArray(products) ?
        products.map((product) => (
          <ProductCard key={product.model} product={product} />)) : ''
  }


  if (products?.length && (stock || brands.length)) {

    filterContent =
      Array.isArray(products) ?
        products.filter((product) => {
          if (stock) {
            return product.status === true
          }
          return product
        })
          .filter((product) => {
            if (brands.length) {
              return brands.includes(product.brand)
            }
            return product
          })
          .map((product) => (
            <ProductCard key={product.model} product={product} />
          ))
        : ""
  }




  let message;

  if (isError) {
    message = "Something Went Wrong!!"
  }

  if (!isError && stock) {
    message = "All Stocked Products"
  }
  if (!isError && !stock) {
    message = "All Products"
  }
  if (!isError && stock && brands.includes("amd")) {
    message = "AMD Stocked Products"
  }
  if (!isError && !stock && brands.includes("amd")) {
    message = "All AMD Products"
  }
  if (!isError && stock && brands.includes("intel")) {
    message = "Intel Stocked Products"
  }
  if (!isError && !stock && brands.includes("intel")) {
    message = "All Intel Products"
  }
  if (!isError && stock && brands.includes("intel") && brands.includes("amd")) {
    message = "All Stocked Products"
  }
  if (!isError && !stock && brands.includes("intel") && brands.includes("amd")) {
    message = "All AMD and Intel Products"
  }




  return (
    <div>
      {
        isLoading ?
          <>
            <div className='w-full h-screen mx-auto text-center' style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <div className='flex justify-center items-center lg:mt-[300px] md:mt-[450px] mt-[250px]'>
                <RotatingLines
                  strokeColor="gray"
                  strokeWidth="5"
                  animationDuration="0.5"
                  width="80"
                  visible={true}
                />
              </div>
            </div>
          </>
          :
          <div className='max-w-7xl gap-14 mx-auto my-10'>
            <div className='mb-10 flex justify-end gap-5'>

              <button
                onClick={() => dispatch(toggle())}
                className={`border px-3 py-2 rounded-full font-semibold ${stock ? activeClass : null} `}
              >
                In Stock
              </button>

              <button
                onClick={() => dispatch(toggleBrand("amd"))}
                className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("amd") ? activeClass : null}`}>
                AMD
              </button>

              <button
                onClick={() => dispatch(toggleBrand("intel"))}
                className={`border px-3 py-2 rounded-full font-semibold  ${brands.includes("intel") ? activeClass : null}`}>
                Intel
              </button>

            </div>

            <p className={`${isError ? 'text-red-600' : 'text-blue-700'} -mt-4 text-center font-semibold mb-4 text-xl`}>{message}</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
              {filterContent}
            </div>

          </div>
      }
    </div>
  );
};

export default Home;
