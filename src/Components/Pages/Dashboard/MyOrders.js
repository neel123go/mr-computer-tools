import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../Firebase.init';
import Loading from '../Shared/Loading';
import CancelOrderModal from './CancelOrderModal';

const MyOrders = () => {
    const [user] = useAuthState(auth);

    const { data: orders, isLoading, refetch } = useQuery('order', () => fetch(`http://localhost:5000/order/${user.email}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem('accessToken');
        }
        return res.json()
    }));

    const [cancelOrder, setCancelOrder] = useState(null);

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2 className='text-2xl'>My Orders</h2>
            <div className="overflow-x-auto mt-8">
                {orders.length > 0 ? <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>No</th>
                            <th className='text-center'>Image</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Price</th>
                            <th className='text-center'>Quantity</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, index) => (<tr key={order._id} className="border-2">
                            <th className='text-center'>{index + 1}</th>
                            <td className='p-0 py-1 text-center'><div className="avatar">
                                <div className="w-16 rounded">
                                    <img src={order.productImage} alt="Tailwind-CSS-Avatar-component" />
                                </div>
                            </div></td>
                            <td className='p-0 py-1 text-center'>{order.productName}</td>
                            <td className='p-0 py-1 text-center'>{order.price}</td>
                            <td className='p-0 py-1 text-center'>{order.quantity}</td>
                            <td className='p-0 py-1 text-center'>
                                <label onClick={() => setCancelOrder(order)} htmlFor="delete-modal" className="btn-tiny modal-button px-3 py-1 rounded-lg btn-error">Cancel</label><button className='btn-tiny ml-3 w-16 py-1 rounded-lg btn-primary'>Payment</button></td>
                        </tr>))}
                    </tbody>
                </table> : <p className='text-center text-lg sm:text-3xl py-5'>You haven't ordered anything yet</p>}
                {cancelOrder && <CancelOrderModal refetch={refetch} cancelOrder={cancelOrder}></CancelOrderModal>}
            </div>
        </div>
    );
};

export default MyOrders;