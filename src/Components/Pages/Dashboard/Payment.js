import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L0k6GABT6F4bUNXZRqu1uksgYfGD6jRTTLQzu13Lwj2ht3vFBtijx1NCinU0P0ILDuwcdkKLvJdJ4vNAmBg9dPT00nw0GGha5');

const Payment = () => {
    const { id } = useParams();

    const { data: order, isLoading } = useQuery(['order', id], () => fetch(`http://localhost:5000/orders/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>;
    };

    const totalPrice = Math.round(parseFloat(order?.price) * order?.quantity);

    return (
        <div className="hero min-h-screen py-10 px-0 md:px-5 lg:px-10">
            <div className="hero-content flex-col lg:flex-row w-full p-0">
                <div className="w-full lg:w-1/2 text-left lg:text-left">
                    <h1 className="text-xl font-bold text-emerald-600 mb-5">Hello {order?.name},</h1>
                    <h1 className="text-4xl font-bold">Pay Your Order now!</h1>
                    <p className='text-gray-600 mt-7 text-lg'>Email: <span className='text-orange-700'>{order?.email}</span></p>
                    <p className='text-gray-600 text-lg'>Address: <span className='text-orange-700'>{order?.address}</span></p>
                    <p className='text-gray-600 text-lg'>Product Name: <span className='text-orange-700'>{order?.productName}</span></p>
                    <p className='text-gray-600 text-lg'>Product Quantity: <span className='text-orange-700'>{order?.quantity}</span></p>
                    <h2 className='text-2xl text-gray-700'>Price: $<span className='text-emerald-700 text-3xl'>{order?.price}</span></h2>
                    <p className='text-2xl text-gray-700'>Total Price: $<span className='text-emerald-700 text-3xl'>{totalPrice}</span></p>
                </div>
                <div className="card flex-shrink-0 md:max-w-lg mt-5 lg:max-w-sm shadow-2xl bg-base-100">
                    <div className="p-5 sm:p-10 card-body bg-white">
                        <h2 className="text-md sm:card-title">Pay for: {order?.productName}</h2>

                        <Elements stripe={stripePromise}>
                            <CheckoutForm totalPrice={totalPrice} order={order} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;