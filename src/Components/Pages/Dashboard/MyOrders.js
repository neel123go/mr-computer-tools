import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../Firebase.init';
import Loading from '../Shared/Loading';

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

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2 className='text-2xl'>My Orders</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (<tr key={order._id} className="border-2">
                            <th>1</th>
                            <td><div className="avatar">
                                <div className="w-16 rounded">
                                    <img src={order.productImage} alt="Tailwind-CSS-Avatar-component" />
                                </div>
                            </div></td>
                            <td>{order.productName}</td>
                            <td>{order.price}</td>
                            <td>{order.quantity}</td>
                            <td>Cancel Order</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;