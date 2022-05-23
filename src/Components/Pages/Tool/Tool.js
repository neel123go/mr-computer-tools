import React from 'react';
import { Link } from 'react-router-dom';

const Tool = ({ tool }) => {
    const { _id, name, price, image, description, minQty, availableQty } = tool;
    return (
        <div className="card w-full bg-base-100 shadow-2xl mt-5">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-gray-600">{name}</h2>
                <h2 className="text-2xl">Price: ${price} <span className="badge badge-base-100 py-3 px-3">Per One</span></h2>
                <p className='text-gray-500'>{description.slice(0, 40) + " ..."}</p>
                <p className='text-gray-500'>Minimum Qty: {minQty}</p>
                <p className='text-gray-500'>Available Qty: {availableQty}</p>
                <div className="card-actions w-full mt-5 justify-center">
                    <Link to={`/purchase/${_id}`} className="btn w-full btn-secondary">purchase</Link>
                </div>
            </div>
        </div>
    );
};

export default Tool;