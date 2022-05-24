import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import auth from '../../../Firebase.init';

const AddReview = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    let errorMessage;
    const [rating, setRating] = useState(1);

    const onSubmit = (data) => {
        const reviewText = data.review;
        const review = {
            rating,
            reviewText
        }

        fetch('http://localhost:5000/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)
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
                    toast.success('Review added successfully');
                    reset();
                }
            })
    };

    return (
        <div>
            <h2 className='text-2xl'>Add a review</h2>
            <div className="hero mt-20">
                <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h2 className='text-2xl font-bold text-center mb-2 text-warning'>Please Login</h2>
                        {errorMessage}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Rating</span>
                                </label>
                                <div className="rating gap-1 mb-2">
                                    <input onClick={() => setRating(1)} type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" defaultChecked />
                                    <input onClick={() => setRating(2)} type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                    <input onClick={() => setRating(3)} type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                    <input onClick={() => setRating(4)} type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                    <input onClick={() => setRating(5)} type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Review Text</span>
                                </label>
                                <textarea
                                    type="text"
                                    rows="5"
                                    cols="0"
                                    placeholder="Review text here"
                                    {...register("review", {
                                        required: {
                                            value: true,
                                            message: 'Review text is required'
                                        }
                                    })}
                                    autoComplete='off'
                                    className="border-2 border-gray-400 rounded-md py-2 px-3 focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                <label className="mt-1">
                                    {errors.review?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.review.message}</span>}
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

export default AddReview;