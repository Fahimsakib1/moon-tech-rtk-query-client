import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";





const Try = () => {


    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const [model, setModel] = useState('')

    const submit = (data) => {

        const product = {
            model: data.model,
        };
        console.log("New Model: ", product);


    };




    const handleFormSubmit = (data) => {
        console.log("Model:", model);
    }







    return (
        <div>

            <h1 className='text-center font-bold text-xl text-blue-600 mt-6'>Try Values</h1>

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
                            <input onChange={(e) => setModel(e.target.value)} type='text' id='model' name='model' {...register("model", { required: true })} />
                            {errors.model && <span className="text-red-600">This field is required</span>}
                        </div>


                        <div className='flex justify-between items-center w-full'>
                            <button
                                className=' px-4 py-3 bg-orange-600 rounded-md font-semibold text-white text-lg'
                                type='submit'
                            >
                                Add Model
                            </button>
                        </div>
                    </form>

                </div>
            </>




            <div className='p-10 bg-white  mx-auto w-2/4  my-10'>
                <form onSubmit={handleFormSubmit}>
                    <div className="w-full flex justify-center items-center mx-auto ">
                        <div className='w-full'>
                            <label className='font-semibold' htmlFor='model'>
                                On Change
                            </label>
                            <input className="w-full rounded-sm mt-4" onChange={(e) => setModel(e.target.value)} type='text' id='model' name='model'/>
                        </div>
                    </div>
                    <div className='mt-6 flex justify-between items-center w-full'>
                        <button
                            className=' px-4 py-3 bg-orange-600 rounded-md font-semibold text-white text-lg'
                            type='submit'
                        >
                            Add Model
                        </button>
                    </div>
                </form>
                <h1 className="block my-4 text-start text-2xl text-black font-bold">{model}</h1>

            </div>







        </div>
    );
};

export default Try;
