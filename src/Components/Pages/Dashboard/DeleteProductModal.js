import { signOut } from 'firebase/auth';
import React from 'react';
import toast from 'react-hot-toast';
import auth from '../../../Firebase.init';

const DeleteProductModal = ({ deleteProduct, refetch }) => {
    const { _id, image, name, price } = deleteProduct;
    const handleCancelOrder = (id) => {
        fetch(`https://aqueous-plateau-30085.herokuapp.com/tools/${_id}`, {
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
                    toast.success('Product deleted successfully');
                    refetch();
                } else {
                    toast.error('Something went wrong! Please try again');
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="delete-product-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="delete-product-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="avatar">
                        <div className="w-2/3 mx-auto rounded">
                            <img src={image} alt="" />
                        </div>
                    </div>
                    <p className="text-gray-600 text-lg md:text-xl pr-5">{name}</p>
                    <p className="py-2 text-gray-600 text-lg md:text-xl pr-5">Price: ${price}</p>
                    <h3 className="text-lg text-error">Are You sure to delete this product</h3>
                    <div className="modal-action">
                        <label onClick={() => handleCancelOrder(_id)} htmlFor="delete-product-modal" className="btn btn-sm">Sure</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteProductModal;