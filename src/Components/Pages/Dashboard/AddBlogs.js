import { signOut } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import auth from '../../../Firebase.init';

const AddBlogs = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        const blog = {
            title: data.title,
            image: data.image,
            description: data.description
        };
        fetch('http://localhost:5000/blog', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(blog)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                }
                return res.json()
            })
            .then(data => {
                if (data.insertedId) {
                    toast.success('Blog added successfully');
                    reset();
                }
            })
    };

    return (
        <div>
            <h2 className='text-2xl'>Add Blogs</h2>
            <div className="hero my-5 md:my-20">
                <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                    <div className="p-5 sm:p-10 card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Blog Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Blog Title"
                                    {...register("title", {
                                        required: {
                                            value: true,
                                            message: 'Blog title is required'
                                        }
                                    })}
                                    autoComplete='off'
                                    className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                <label className="mt-1">
                                    {errors.title?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.title.message}</span>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Blog Image</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: 'Blog image is required'
                                        }
                                    })}
                                    autoComplete='off'
                                    placeholder='Blog Image Link'
                                    className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                <label className="mt-1">
                                    {errors.image?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.image.message}</span>}
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Description</span>
                                </label>
                                <textarea
                                    type="text"
                                    rows="8"
                                    cols="0"
                                    placeholder="Blog description"
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

export default AddBlogs;