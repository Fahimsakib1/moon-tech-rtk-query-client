import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiEdit } from 'react-icons/fi'
import { useDeleteProductMutation, useGetProductsQuery } from "../../features/API/apiSlice";




const ProductList = () => {



  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);





  const { data, isLoading,  } = useGetProductsQuery(null, {refetchOnMountOrArgChange: true});
  const products = data;


  const [removeProduct, {isSuccess, isError, error}] = useDeleteProductMutation()









  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Product Deleted Successfully...", { id: "DeleteProduct" });
    }
    if (!isLoading && isError) {
      toast.error(error, { id: "DeleteProduct" })
    }
  }, [isLoading, isSuccess, isError, error]);













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
          <div class='flex flex-col justify-center items-center h-full w-full '>
            <div class='w-full max-w-7xl mx-auto rounded-lg  bg-white shadow-lg border border-gray-200'>


              <>
                <header class='px-5 py-4 border-b border-gray-100'>
                  <div class='text-center font-semibold text-gray-800'>{products && products.length} Products Added</div>
                </header>
                <div class='overflow-x-auto p-3'>
                  <table class='table-auto w-full'>
                    <thead class='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                      <tr>
                        <th></th>
                        <th class='p-2'>
                          <div class='font-semibold text-left'>Product Name</div>
                        </th>
                        <th class='p-2'>
                          <div class='font-semibold text-left'>Brand</div>
                        </th>
                        <th class='p-2'>
                          <div class='font-semibold text-left'>In Stock</div>
                        </th>
                        <th class='p-2'>
                          <div class='font-semibold text-left'>Price</div>
                        </th>
                        <th class='p-2'>
                          <div class='font-semibold text-center'>Action</div>
                        </th>
                      </tr>
                    </thead>

                    <tbody class='text-sm divide-y divide-gray-100'>
                      {
                        Array.isArray(products) ?
                          products.map(({ model, brand, price, status, _id }) => (
                            <tr>
                              <td class='p-2'>
                                <input type='checkbox' class='w-5 h-5' value='id-1' />
                              </td>
                              <td class='p-2'>
                                <div class='font-medium text-gray-800'>{model}</div>
                              </td>
                              <td class='p-2'>
                                <div class='text-left capitalize'>{brand}</div>
                              </td>
                              <td class='p-2'>
                                <div class='text-left'>
                                  {status ? (
                                    <p className='text-green-500 font-medium'>Available</p>
                                  ) : (
                                    <p className='text-red-500 font-medium'>Stock out</p>
                                  )}
                                </div>
                              </td>
                              <td class='p-2'>
                                <div class='text-left font-medium text-indigo-500'>
                                  {price}
                                </div>
                              </td>
                              <td class='p-2'>
                                <div class='flex justify-center gap-x-8'>

                                  <button onClick={() => removeProduct(_id)}>
                                    <svg
                                      class='w-8 h-8 text-red-600 hover:text-red-700 rounded-full hover:bg-gray-400 p-1'
                                      fill='none'
                                      stroke='currentColor'
                                      viewBox='0 0 24 24'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        stroke-width='2'
                                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                      ></path>
                                    </svg>
                                  </button>


                                  <Link to={`/dashboard/editProduct/${_id}`}>
                                    <div title='Edit Product' className='cursor-pointer p-2 hover:text-blue-600 hover:bg-gray-300 rounded-full'>
                                      <FiEdit className="text-xl font-semibold"></FiEdit>
                                    </div>
                                  </Link>

                                </div>
                              </td>
                            </tr>
                          )) : ''
                      }
                    </tbody>
                  </table>
                </div>
              </>


            </div>
          </div>
      }
    </div>
  );
};

export default ProductList;
