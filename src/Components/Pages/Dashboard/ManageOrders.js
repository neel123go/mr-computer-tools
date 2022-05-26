import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import auth from '../../../Firebase.init';
import Loading from '../Shared/Loading';
import CancelOrderModal from './CancelOrderModal';

const ManageOrders = () => {
    const [cancelOrder, setCancelOrder] = useState(null);

    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch('http://localhost:5000/orders', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem('accessToken');
        }
        return res.json();
    }));

    if (isLoading) {
        return <Loading></Loading>;
    };

    const handleStatus = (id, transactionId) => {
        const payment = {
            status: 'shipped',
            transactionId: transactionId
        };

        fetch(`http://localhost:5000/order/${id}`, {
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
                if (data.modifiedCount > 0) {
                    toast.success('Payment status updated');
                    refetch();
                } else {
                    toast.error('Something went wrong! Please try again');
                }
            })
    }

    return (
        <div>
            <h2 className='text-2xl'>Manage All Orders</h2>
            <div className="overflow-x-auto mt-8">
                {orders?.length > 0 ? <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>No</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Address</th>
                            <th className='text-center'>Product Name</th>
                            <th className='text-center'>Price</th>
                            <th className='text-center'>Quantity</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, index) => (<tr key={order?._id} className="border-2">
                            <th className='text-center'>{index + 1}</th>
                            <td className='p-0 py-1 text-center'>{order?.name}</td>
                            <td className='p-0 py-1 text-center'>{order?.email}</td>
                            <td className='p-0 py-1 text-center'>{order?.address}</td>
                            <td className='p-0 py-1 text-center'>{order?.productName}</td>
                            <td className='p-0 py-1 text-center'>$ {order?.price}</td>
                            <td className='p-0 py-1 text-center'>{order?.quantity}</td>
                            <td className='p-0 py-1 text-center pr-2'>
                                {(order.price && !order?.paid) && <>
                                    <label onClick={() => setCancelOrder(order)} htmlFor="delete-modal" className="btn-tiny modal-button px-3 py-2 rounded-lg btn-error">Cancel</label>
                                    <label className="ml-2 btn-tiny modal-button px-3 py-2 rounded-lg btn-error">Unpaid</label>
                                </>}
                                {order?.paid && <button onClick={() => handleStatus(order?._id, order?.transactionId)} className={`px-4 py-2 rounded-lg ${order?.status === 'pending' ? "bg-indigo-300" : "bg-green-300"}`}>{order.status}</button>}
                            </td>
                        </tr>))}
                    </tbody>
                </table> : <p className='text-center text-lg sm:text-3xl py-5'>You do not have any orders yet</p>}
                {cancelOrder && <CancelOrderModal refetch={refetch} cancelOrder={cancelOrder}></CancelOrderModal>}
            </div>
        </div>
    );
};

export default ManageOrders;