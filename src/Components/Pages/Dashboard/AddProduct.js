import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loading from '../Shared/Loading';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const imgbbKey = "70f09fbd10e67daf3577b0ecd3b6ea41";

    const onSubmit = (data) => {
        setLoading(true);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const tool = {
                        name: data.name,
                        price: data.price,
                        image: img,
                        description: data.description,
                        minQty: data.minQty,
                        availableQty: data.availableQty
                    };

                    fetch('http://localhost:5000/tools', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(tool)
                    })
                        .then(res => res.json())
                        .then(toolInserted => {
                            if (toolInserted.insertedId) {
                                toast.success('Product added successfully');
                                setLoading(false);
                                reset();
                            } else {
                                toast.error('Something went wrong! Please try again');
                                setLoading(false);
                            }
                        })
                }
            })
    }

    if (loading) {
        return <Loading></Loading>
    };

    return (
        <div>
            <h2 className='text-2xl'>Add A Product</h2>
            <div className="hero my-20">
                <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Product name"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Product name is required'
                                        }
                                    })}
                                    autoComplete='off'
                                    className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                <label className="mt-1">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.name.message}</span>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Product Image</span>
                                </label>
                                <input
                                    type="file"
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: 'Product image is required'
                                        }
                                    })}
                                    autoComplete='off'
                                    className="input h-16 pt-4 input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                <label className="mt-1">
                                    {errors.image?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.image.message}</span>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Price</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Product price"
                                    step="any"
                                    {...register("price", {
                                        required: {
                                            value: true,
                                            message: 'Price is required'
                                        }
                                    })}
                                    autoComplete='off'
                                    className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                <label className="mt-1">
                                    {errors.price?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.price.message}</span>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Description</span>
                                </label>
                                <textarea
                                    type="text"
                                    rows="5"
                                    cols="0"
                                    placeholder="Product description"
                                    {...register("description", {
                                        required: {
                                            value: true,
                                            message: 'Product description is required'
                                        }
                                    })}
                                    autoComplete='off'
                                    className="border-2 border-gray-400 rounded-md py-2 px-3 focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                <label className="mt-1">
                                    {errors.description?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.description.message}</span>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Minimum Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Product minimum quantity"
                                    {...register("minQty", {
                                        required: {
                                            value: true,
                                            message: 'Minimum quantity is required'
                                        }
                                    })}
                                    min="1"
                                    autoComplete='off'
                                    className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                <label className="mt-1">
                                    {errors.minQty?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.minQty.message}</span>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Available Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Product available quantity"
                                    {...register("availableQty", {
                                        required: {
                                            value: true,
                                            message: 'Available quantity is required'
                                        }
                                    })}
                                    autoComplete='off'
                                    className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                <label className="mt-1">
                                    {errors.availableQty?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.availableQty.message}</span>}
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;