import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useQuery } from 'react-query';
import auth from '../../../Firebase.init';
import Loading from '../Shared/Loading';
import DeleteProductModal from './DeleteProductModal';

const ManageOrders = () => {
    const [deleteProduct, setDeleteProduct] = useState(null);

    const { data: tools, isLoading, refetch } = useQuery('tools', () => fetch('http://localhost:5000/tools', {
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


    return (
        <div>
            <h2 className='text-2xl'>Manage All Orders</h2>
            <div className="overflow-x-auto mt-8">
                {tools?.length > 0 ? <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>No</th>
                            <th className='text-center'>Image</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Price</th>
                            <th className='text-center'>Description</th>
                            <th className='text-center'>Minimum Qty</th>
                            <th className='text-center'>Available Qty</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tools?.map((tools, index) => (<tr key={tools?._id} className="border-2">
                            <th className='text-center'>{index + 1}</th>
                            <td className='p-0 py-1 text-center'><div className="avatar">
                                <div className="w-16 rounded">
                                    <img src={tools.image} alt="Tailwind-CSS-Avatar-component" />
                                </div>
                            </div></td>
                            <td className='p-0 py-1 text-center'>{tools?.name}</td>
                            <td className='p-0 py-1 text-center'>$ {tools?.price}</td>
                            <td className='p-0 py-1 text-center'>{tools?.description.slice(0, 50) + '..'}</td>
                            <td className='p-0 py-1 text-center'>{tools?.minQty}</td>
                            <td className='p-0 py-1 text-center'>{tools?.availableQty}</td>
                            <td className='p-0 py-1 text-center'><label onClick={() => setDeleteProduct(tools)} htmlFor="delete-product-modal" className="btn-tiny modal-button px-3 py-2 rounded-lg btn-error">Delete</label></td>
                        </tr>))}
                    </tbody>
                </table> : <p className='text-center text-lg sm:text-3xl py-5'>You do not have any products yet</p>}
                {deleteProduct && <DeleteProductModal refetch={refetch} deleteProduct={deleteProduct}></DeleteProductModal>}
            </div>
        </div>
    );
};

export default ManageOrders;