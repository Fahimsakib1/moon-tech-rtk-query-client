import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";





const Try = () => {


    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const submit = (data) => {
        
        const product = {
            model: data.model,
            price: data.price,
            brand: data.brand,
            gender: data.gender,
            description: data.description
            
            
        };
        console.log("New Try Info: ", product);

    };







    return (
        <div>

            <h1 className='text-center font-bold text-xl text-blue-600 mt-6'>Try Get Values</h1>

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
                            <input type='text' id='model' name= 'model' {...register("model", { required: true })} />
                            {errors.model && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className='flex flex-col w-full max-w-xs'>
                            <label className='mb-2' htmlFor='price'>
                                Price
                            </label>
                            <input type='text' name='price' id='price' {...register("price")} />
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
                            <h1 className='mb-3'>Gender</h1>
                            <div className='flex gap-3'>
                                <div>
                                    <input 
                                        {...register("gender")}
                                        type='radio'
                                        id='male'
                                        name='gender'
                                        value='male'
                                    />
                                    <label className='text-green-600 ml-2 text-lg' htmlFor='male'>
                                        Male
                                    </label>
                                </div>
                                <div>
                                    <input
                                        {...register("gender")}
                                        type='radio'
                                        id='female'
                                        name='gender'
                                        value='female'
                                    />
                                    <label className='text-red-600 ml-2 text-lg' htmlFor='female'>
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col w-full max-w-xs'>
                            <label className='mb-2' htmlFor='description'>
                                Description
                            </label>
                            <textarea
                                type='text'
                                name='description'
                                id='description'
                                {...register("description")}
                                
                            />
                        </div>

                        <div className='flex justify-between items-center w-full'>
                            <button
                                className=' px-4 py-3 bg-orange-600 rounded-md font-semibold text-white text-lg'
                                type='submit'
                            >
                                Add Values
                            </button>
                        </div>
                    </form>

                </div>
            </>

        </div>
    );
};

export default Try;
