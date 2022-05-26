import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import auth from '../../../Firebase.init';

const CheckoutForm = ({ totalPrice, order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const { _id, name, email } = order;

    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ totalPrice })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });
    }, [totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // confirm card payment
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        setCardError(error?.message || '');
        setSuccess('');
        setLoading(true);

        if (error) {
            setCardError(error?.message || '');
        }

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message);
            setLoading(false);
        } else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            setSuccess('Congratulations!! Your payment is successfully completed');
            const payment = {
                status: 'pending',
                transactionId: paymentIntent.id
            };
            fetch(`http://localhost:5000/order/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                    }
                    return res.json()
                })
                .then(data => {
                    setLoading(false);
                })
        }
    }

    return (
        <>
            {cardError && <p className='text-error text-lg my-2'>{cardError}</p>}
            {success && <div>
                <p className='text-green-600 text-lg my-2'>{success}</p>
            </div>}
            <form onSubmit={handleSubmit}>
                <CardElement
                    className='border-2 border-indigo-300 p-3 rounded-lg mt-2'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn-primary px-6 text-lg py-1 mt-6 rounded-lg' type="submit" disabled={!stripe || !clientSecret}>Pay</button>
            </form>
        </>
    );
};

export default CheckoutForm;