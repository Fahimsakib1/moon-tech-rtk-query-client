import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, togglePostSuccess } from "../../features/products/ProductSlice";
import { RotatingLines } from 'react-loader-spinner';
import { toast } from "react-hot-toast";





const AddProduct = () => {


  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const dispatch = useDispatch();

  const productsState = useSelector((state) => state.products);
  const { isLoading, postSuccess, isError, error } = productsState

  const submit = (data) => {
    const product = {
      model: data.model,
      image: data.image,
      status: data.status === "true" ? true : false,
      brand: data.brand,
      keyFeature: [
        data.keyFeature1,
        data.keyFeature2,
        data.keyFeature3,
        data.keyFeature4,
      ],
      price: data.price,
      spec: [],
      rating: 5
    };

    dispatch(addProduct(product))
    console.log(product);

  };


  useEffect(() => {
    if(isLoading) {
      toast.loading("Product Loading...", {id: "AddProduct"})
    }
    if(!isLoading && postSuccess) {
      toast.success("Product Added Successfully...", {id: "AddProduct"});
      dispatch(togglePostSuccess())
      reset();
    }
    if(!isLoading && isError) {
      toast.error(error, {id: "AddProduct"})
    }
  }, [isLoading, postSuccess, isError, error]);






  return (
    <div>

      <h1 className='text-center font-bold text-xl text-blue-600 mt-6'>Add Product</h1>


      {
        isLoading &&
        <>
          <div className='w-full h-screen mx-auto text-center' style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <div className='flex justify-center items-center lg:mt-[300px] md:mt-[450px] mt-[250px]'>
              <RotatingLines
                strokeColor="gray"
                strokeWidth="5"
                animationDuration="0.75"
                width="90"
                visible={true}
              />
            </div>
          </div>
        </>

      }


      <>
        <div className='flex justify-center items-center h-full mt-6'>

          <form
            className='shadow-lg p-10 rounded-md flex flex-wrap gap-3 max-w-3xl justify-between bg-white'
            onSubmit={handleSubmit(submit)}
          >
            <div className='flex flex-col w-full max-w-xs'>
              <label className='mb-2' htmlFor='model'>
                Model
              </label>
              <input type='text' id='model' {...register("model", { required: true })} />
              {errors.model && <span className="text-red-600">This field is required</span>}
            </div>
            <div className='flex flex-col w-full max-w-xs'>
              <label className='mb-2' htmlFor='image'>
                Image
              </label>
              <input type='text' name='image' id='image' {...register("image")} />
            </div>

            <div className='flex flex-col w-full max-w-xs'>
              <label className='mb-3' htmlFor='brand'>
                Brand
              </label>
              <select name='brand' id='brand' {...register("brand")}>
                <option value='amd'>AMD</option>
                <option value='intel'>Intel</option>
              </select>
            </div>
            <div className='flex flex-col w-full max-w-xs'>
              <label className='mb-2' htmlFor='price'>
                Price
              </label>
              <input type='text' name='price' id='price' {...register("price")} />
            </div>

            <div className='flex flex-col w-full max-w-xs'>
              <h1 className='mb-3'>Availability</h1>
              <div className='flex gap-3'>
                <div>
                  <input
                    type='radio'
                    id='available'
                    value={true}
                    {...register("status")}
                  />
                  <label className='text-green-600 ml-2 text-lg' htmlFor='available'>
                    Available
                  </label>
                </div>
                <div>
                  <input
                    type='radio'
                    id='stockOut'
                    name='status'
                    value={false}
                    {...register("status")}
                  />
                  <label className='text-red-600 ml-2 text-lg' htmlFor='stockOut'>
                    Stock out
                  </label>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full max-w-xs'></div>
            <div className='flex flex-col w-full max-w-xs'>
              <label className='mb-2' htmlFor='keyFeature1'>
                Key Feature 1
              </label>
              <input
                type='text'
                name='keyFeature1'
                id='keyFeature1'
                {...register("keyFeature1")}
              />
            </div>
            <div className='flex flex-col w-full max-w-xs'>
              <label className='mb-2' htmlFor='keyFeature2'>
                Key Feature 2
              </label>
              <input
                type='text'
                name='keyFeature2'
                id='keyFeature2'
                {...register("keyFeature2")}
              />
            </div>
            <div className='flex flex-col w-full max-w-xs'>
              <label className='mb-2' htmlFor='keyFeature3'>
                Key Feature 3
              </label>
              <input
                type='text'
                name='keyFeature3'
                id='keyFeature3'
                {...register("keyFeature3")}
              />
            </div>
            <div className='flex flex-col w-full max-w-xs'>
              <label className='mb-2' htmlFor='keyFeature4'>
                Key Feature 4
              </label>
              <input
                type='text'
                name='keyFeature4'
                id='keyFeature4'
                {...register("keyFeature4")}
              />
            </div>

            <div className='flex justify-between items-center w-full'>
              <button
                className=' px-4 py-3 bg-indigo-500 rounded-md font-semibold text-white text-lg disabled:bg-gray-500'
                type='submit'
              >
                Submit
              </button>
            </div>
          </form>

        </div>
      </>

    </div>
  );
};

export default AddProduct;
