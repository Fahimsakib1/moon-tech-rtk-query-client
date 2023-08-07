import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrand } from "../../features/filter/FilterSlice";
import { getProducts } from "../../features/products/ProductSlice";
import { RotatingLines } from 'react-loader-spinner';




const Home = () => {


  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);
  const { products, isLoading } = productsState
  console.log("Home Page Products:", products);

  useEffect(() => {
    // fetch("http://localhost:5000/products")
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data));
    dispatch(getProducts())
  }, [dispatch]);

  const activeClass = "text-white  bg-indigo-500 border-white";








  const filterState = useSelector((state) => state.filter);
  console.log("Home Page Filter State:", filterState);

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

  const check = useSelector((state) => state.products);

  let message;
  if (!check.isError && stock) {
    message = "All Stocked Products"
  }
  if (!check.isError && !stock) {
    message = "All Products"
  }
  if (!check.isError && stock && brands.includes("amd")) {
    message = "AMD Stocked Products"
  }
  if (!check.isError && !stock && brands.includes("amd")) {
    message = "All AMD Products"
  }
  if (!check.isError && stock && brands.includes("intel")) {
    message = "Intel Stocked Products"
  }
  if (!check.isError && !stock && brands.includes("intel")) {
    message = "All Intel Products"
  }
  if (!check.isError && stock && brands.includes("intel") && brands.includes("amd")) {
    message = "All Stocked Products"
  }
  if (!check.isError && !stock && brands.includes("intel") && brands.includes("amd")) {
    message = "All AMD and Intel Products"
  }






  return (
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

      {
        isLoading ?
          
          <div className='w-full h-screen mx-auto text-center' style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
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

          :
          <>
            <p className='-mt-4 text-center font-semibold mb-4 text-xl text-blue-600'>{message}</p>
            {
              check.isError === true &&
              <>
                <p className="text-center text-xl text-red-600 mt-48">Something Went Wrong!! Can't Fetch Data, {check.error}</p>
                <p className="text-center text-lg text-red-600 mt-2"> {check.error}</p></>
            }

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
              {filterContent}
            </div>
          </>
      }

    </div>
  );
};

export default Home;
