import { signOut } from 'firebase/auth';
import React from 'react';
import toast from 'react-hot-toast';
import auth from '../../../Firebase.init';

const CancelOrderModal = ({ cancelOrder, refetch }) => {
    const { _id, productName, productImage, price, quantity } = cancelOrder;

    const handleCancelOrder = (id) => {
        fetch(`http://localhost:5000/order/${_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                }
                return res.json()
            })
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Order canceled successfully');
                    refetch();
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="delete-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <p className="py-4 text-indigo-500 text-2xl pr-5">{productName}</p>
                    <h3 className="font-bold text-lg text-error">Are You sure to cancel this order</h3>
                    <div className="modal-action">
                        <label onClick={() => handleCancelOrder(_id)} htmlFor="delete-modal" className="btn btn-sm">Sure</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelOrderModal;