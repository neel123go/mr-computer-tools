import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import auth from '../../../Firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const AddReview = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [rating, setRating] = useState(1);
    const [user] = useAuthState(auth);
    const [dbUser, setDbUser] = useState({});

    useEffect(() => {
        fetch(`https://aqueous-plateau-30085.herokuapp.com/user/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setDbUser(data);
            })
    }, [user]);

    const onSubmit = (data) => {
        const reviewText = data.review;
        const review = {
            userName: dbUser.userName,
            rating,
            reviewText
        };

        fetch('https://aqueous-plateau-30085.herokuapp.com/review', {
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
            <div className="hero my-20">
                <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                    <div className="card-body">
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
                                        },
                                        maxLength: {
                                            value: 250,
                                            message: 'You can only write 250 characters'
                                        }
                                    })}
                                    autoComplete='off'
                                    className="border-2 border-gray-400 rounded-md py-2 px-3 focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                <label className="mt-1">
                                    {errors.review?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.review.message}</span>}
                                    {errors.review?.type === 'maxLength' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.review.message}</span>}
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