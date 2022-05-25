import { signOut } from 'firebase/auth';
import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import auth from '../../../Firebase.init';
import Loading from '../Shared/Loading';

const MakeAdmin = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/user', {
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

    const makeAdmin = (email) => {
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to admin an user');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("User successfully admin");
                    refetch();
                }
            })
    }

    return (
        <div>
            <h2 className='text-2xl'>Make users admin</h2>
            <div className="overflow-x-auto mt-8">
                {users?.length > 0 ? <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>No</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (<tr key={user?._id} className="border-2">
                            <th className='text-center'>{index + 1}</th>
                            <td className='p-0 py-1 text-center'>{user?.userName}</td>
                            <td className='p-0 py-1 text-center'>{user?.email}</td>
                            <td className='p-0 py-1 text-center'>
                                {user?.role !== 'admin' ? <button onClick={() => makeAdmin(user?.email)} className='btn-tiny bg-orange-400 text-gray-800 font-bolder px-4 py-2 rounded-lg'>Make Admin</button> : <p className='text-green-600' style={{ fontSize: '18px' }}>Admin</p>}
                            </td>
                        </tr>))}
                    </tbody>
                </table> : <p className='text-center text-lg sm:text-3xl py-5'>You do not have any users yet</p>}
            </div>
        </div>
    );
};

export default MakeAdmin;