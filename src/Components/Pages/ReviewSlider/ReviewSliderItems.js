import React from 'react';

const ReviewSliderItems = ({ review }) => {
    return (
        <div className="card h-full w-full bg-white text-gray-700 shadow-xl">
            <div className="h-full flex justify-center items-center">
                <div className='text-center p-5'>
                    <h2 className='text-xl text-orange-500'>{review.userName}</h2>
                    <p className='text-sm my-5'>{review.reviewText}</p>
                    <div className="rating gap-2 mb-5">
                        <input type="radio" name="rating-2" disabled className={`mask mask-star-2 ${review.rating > 0 ? "bg-orange-400" : "bg-gray-400"}`} />
                        <input type="radio" name="rating-2" disabled className={`mask mask-star-2 ${review.rating > 1 ? "bg-orange-400" : "bg-gray-400"}`} />
                        <input type="radio" name="rating-2" disabled className={`mask mask-star-2 ${review.rating > 2 ? "bg-orange-400" : "bg-gray-400"}`} />
                        <input type="radio" name="rating-2" disabled className={`mask mask-star-2 ${review.rating > 3 ? "bg-orange-400" : "bg-gray-400"}`} />
                        <input type="radio" name="rating-2" disabled className={`mask mask-star-2 ${review.rating > 4 ? "bg-orange-400" : "bg-gray-400"}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSliderItems;