import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, newAddProduct, toggleUpdateSuccess } from "../../features/products/ProductSlice";
import { toast } from "react-hot-toast";




const EditProduct = () => {


    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    console.log("State on Edit Product Page", state.products.products);
    const { _id, brand, image, model, price, keyFeature } = state?.products?.products





    const submitAfterEdit = (data) => {

        const product = {
            model: data.model ? data.model : model,
            image: data.image ? data.image : image,
            status: data.status === "true" ? true : false,
            brand: data.brand ? data.brand : brand,
            keyFeature: [
                data.keyFeature1 ? data.keyFeature1 : keyFeature[0],
                data.keyFeature2 ? data.keyFeature2 : keyFeature[1],
                data.keyFeature3 ? data.keyFeature3 : keyFeature[2],
                data.keyFeature4 ? data.keyFeature4 : keyFeature[3],
            ],
            price: data.price ? data.price : price,
            spec: [],
        };

        console.log("Edited ID", _id);
        console.log("Edited Product: ", product);
        // dispatch(editProduct(_id, product));
    };


    const productsState = useSelector((state) => state.products);
    const { isLoading, updateSuccess, isError, error } = productsState

    useEffect(() => {
        if (!isLoading && updateSuccess) {
            toast.success("Product Updated Successfully...", { id: "UpdateProduct" });
            dispatch(toggleUpdateSuccess())
            reset();
        }
        if (!isLoading && isError) {
            toast.error(error, { id: "UpdateProduct" })
        }
    }, [isLoading, updateSuccess, isError, error]);










    return (
        <div>
            <h1 className='text-center font-bold text-xl text-blue-600 mt-6'>Edit Product</h1>

            <div className='flex justify-center items-center h-full mt-6'>

                <form
                    className='shadow-lg p-10 rounded-md flex flex-wrap gap-3 max-w-3xl justify-between bg-white'
                    onSubmit={handleSubmit(submitAfterEdit)}
                >
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='model'>
                            Model
                        </label>
                        <input className='text-sm text-gray-600' defaultValue={model} type='text' id='model' {...register("model")} />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='image'>
                            Image
                        </label>
                        <input defaultValue={image} className='text-sm text-gray-600' type='text' name='image' id='image' {...register("image")} />
                    </div>

                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-3' htmlFor='brand'>
                            Brand
                        </label>
                        <select className='text-sm text-gray-600' name='brand' id='brand' {...register("brand")}>
                            <option selected={brand === "amd" ? "AMD" : "Intel"} value="amd">AMD</option>
                            <option selected={brand === "intel" ? "Intel" : "AMD"} value='intel'>Intel</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='price'>
                            Price
                        </label>
                        <input defaultValue={price} className='text-sm text-gray-600' type='text' name='price' id='price' {...register("price")} />
                    </div>

                    <div className='flex flex-col w-full max-w-xs'>
                        <h1 className='mb-3'>Availability</h1>
                        <div className='flex gap-3'>
                            <div>
                                <input
                                    type='radio'
                                    id='available'
                                    // checked={status === true}
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
                                    // checked={status === false}
                                    value={false}
                                    {...register("status")}
                                />
                                <label className='ml-2 text-lg text-red-600' htmlFor='stockOut'>
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
                            defaultValue={keyFeature && keyFeature[0]} className='text-sm text-gray-600'
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
                            defaultValue={keyFeature && keyFeature[1]} className='text-sm text-gray-600'
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
                            defaultValue={keyFeature && keyFeature[2]} className='text-sm text-gray-600'
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
                            defaultValue={keyFeature && keyFeature[3]} className='text-sm text-gray-600'
                            type='text'
                            name='keyFeature4'
                            id='keyFeature4'
                            {...register("keyFeature4")}
                        />
                    </div>

                    <div className='flex justify-between items-center w-full'>
                        <button
                            className=' mt-3 px-4 py-3 bg-indigo-500 rounded-md font-semibold text-white text-lg disabled:bg-gray-500'
                            type='submit'
                        >
                            Edit Done
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;