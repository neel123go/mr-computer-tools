import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../../Firebase.init';
import Loading from '../Shared/Loading';

const Purchase = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { toolId } = useParams();
    const [tool, setTool] = useState({});
    const [qty, setQty] = useState();
    const [user] = useAuthState(auth);
    const [currentUser, setCurrentUser] = useState({});
    const [btnDisable, setBtnDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dashboardNavigate, setDashboardNavigate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`https://aqueous-plateau-30085.herokuapp.com/tools/${toolId}`)
            .then(res => res.json())
            .then(data => setTool(data));
        setLoading(false);
    }, [toolId]);

    useEffect(() => {
        if (user) {
            const userEmail = user?.email;
            fetch(`https://aqueous-plateau-30085.herokuapp.com/user/${userEmail}`)
                .then(res => res.json())
                .then(data => {
                    setCurrentUser(data);
                });
        }
    }, [user]);

    useEffect(() => {
        if (dashboardNavigate) {
            navigate('/dashboard/myOrder');
        }
    }, [dashboardNavigate, navigate]);

    if (loading) {
        return <Loading></Loading>;
    }

    const onSubmit = (data) => {
        if (qty < tool.minQty) {
            toast.error(`You have to purchase at least ${tool.minQty} products`);
            setBtnDisable(true);
        } else if (qty > tool.availableQty) {
            toast.error(`You can't purchase more than ${tool.availableQty} products`);
            setBtnDisable(true);
        } else {
            setBtnDisable(false);
            const address = data.address;
            const phone = data.phone;
            const userEmail = user.email;
            fetch(`https://aqueous-plateau-30085.herokuapp.com/user/${userEmail}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ address, phone })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result.acknowledged === true) {
                        const order = {
                            name: currentUser.userName,
                            email: currentUser.email,
                            address: currentUser.address,
                            productName: tool.name,
                            productImage: tool.image,
                            price: tool.price,
                            description: tool.description,
                            quantity: (qty ? qty : tool.minQty)
                        };

                        fetch('https://aqueous-plateau-30085.herokuapp.com/order', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                            },
                            body: JSON.stringify(order)
                        })
                            .then(res => {
                                if (res.status === 401 || res.status === 403) {
                                    signOut(auth);
                                    localStorage.removeItem('accessToken');
                                }
                                return res.json()
                            })
                            .then(data => {
                                if (data?.insertedId) {
                                    setDashboardNavigate(true);
                                }
                            })
                    }
                });
        }
    };

    const increaseQty = (quantity) => {
        const newQuantity = parseInt(quantity) + 1;
        setQty(newQuantity);
        document.getElementById('number').value = newQuantity;
    }

    const decreaseQty = (quantity) => {
        const newQuantity = parseInt(quantity) - 1;
        setQty(newQuantity);
        document.getElementById('number').value = newQuantity;
    }

    return (
        <div className='px-4 sm:px-10 lg:px-16 xl:px-32 py-8 md:py-20 bg-gray-100'>
            <div className='p-3 md:p-10 bg-indigo-100 shadow-xl'>
                <h2 className='py-3 text-3xl'>Product Details</h2>
                <div className="card lg:card-side lg:mt-5">
                    <figure className='mt-5 lg:mt-0'><img src={tool.image} alt="Album" className='rounded-lg w-[350px]' /></figure>
                    <div className="card-body p-0 sm:p-5 pt-4 lg:pt-0">
                        <h2 className="card-title">{tool.name}</h2>
                        <p className='my-5'>{tool.description}</p>
                        <div className='block md:flex justify-between items-center'>
                            <div>
                                <p className='text-xl'>Price: ${tool.price} <span className="badge badge-base-100 py-3 px-3">Per One</span></p>
                                <p className='text-xl py-2'>Minimum Quantity: {tool.minQty}</p>
                                <p className='text-xl'>Available Quantity: {tool.availableQty}</p>
                            </div>
                            <div className='flex justify-start mt-5 md:justify-center items-center'>
                                <button onClick={() => decreaseQty(qty ? qty : tool.minQty)} disabled={qty === 1} className='btn btn-primary w-12 h-10 mr-[-5px]'>-</button>
                                <input type="number" className='pl-3 outline-none text-xl text-center w-20 h-12 z-10' name="quantity" defaultValue={qty ? qty : tool.minQty} id="number" readOnly />
                                <button onClick={() => increaseQty(qty ? qty : tool.minQty)} className='btn btn-primary w-12 h-10 ml-[-5px]'>+</button>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className='mt-10 text-3xl'>User Information</h2>
                <div className="hero py-10">
                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg">User Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={currentUser?.userName}
                                        readOnly disabled
                                        className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg">Email</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={currentUser?.email}
                                        readOnly disabled
                                        className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg">Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        {...register("address", {
                                            required: {
                                                value: true,
                                                message: 'Address is required'
                                            }
                                        })}
                                        autoComplete='off'
                                        defaultValue={currentUser?.address && currentUser?.address}
                                        className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                    <label className="mt-1">
                                        {currentUser?.address ? '' : (errors.address?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.address.message}</span>)}
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg">Phone Number</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Phone Number"
                                        {...register("phone", {
                                            required: {
                                                value: true,
                                                message: 'Phone number is required'
                                            }
                                        })}
                                        autoComplete='off'
                                        defaultValue={currentUser?.phone && currentUser?.phone}
                                        className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                    <label className="mt-1">
                                        {currentUser?.phone ? '' : errors.phone?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.phone.message}</span>}
                                    </label>
                                </div>

                                <div className="form-control mt-6">
                                    <button disabled={btnDisable === true && (qty < tool.minQty || qty > tool.availableQty)} className="btn btn-primary">place order</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Purchase;