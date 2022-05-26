import React, { useEffect, useState } from 'react';
// import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase.init';
import Loading from '../Shared/Loading';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const MyProfile = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [user, loading] = useAuthState(auth);
    const [dbUser, setDbUser] = useState({});

    useEffect(() => {
        if (user) {
            fetch(`https://aqueous-plateau-30085.herokuapp.com/user/${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setDbUser(data);
                })
        }
    }, [user]);

    if (loading) {
        return <Loading></Loading>;
    };

    const onSubmit = (data) => {
        if (data.address === '' || data.phone === '') {
            let address;
            let phone;
            if (data.address === '') {
                address = dbUser?.address;
            }
            if (data.phone === '') {
                phone = dbUser?.phone;
            }
            const updatedUser1 = {
                email: dbUser?.email,
                userName: dbUser?.userName,
                education: data.education,
                address: address,
                phone: phone,
                profileLink: data.profileLink
            };

            fetch(`https://aqueous-plateau-30085.herokuapp.com/user/${user?.email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatedUser1)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result.acknowledged === true) {
                        toast.success('Your profile updated successfully');
                    } else {
                        toast.error('Something went wrong! Please try again');
                    }
                })
        } else {
            const updatedUser2 = {
                email: dbUser?.email,
                userName: dbUser?.userName,
                education: data.education,
                address: data.address,
                phone: data.phone,
                profileLink: data.profileLink
            };

            fetch(`https://aqueous-plateau-30085.herokuapp.com/user/${user?.email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatedUser2)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result.acknowledged === true) {
                        toast.success('Your profile updated successfully');
                    } else {
                        toast.error('Something went wrong! Please try again');
                    }
                })
        }
    };

    return (
        <div>
            <h2 className='text-2xl'>My Profile</h2>
            <div className="hero mt-4">
                <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100 my-8">
                    <div className="card-body">
                        <h2 className='text-2xl font-bold text-center mb-2 text-warning'>My Profile</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="block md:flex justify-between items-center">
                                <div className='w-full md:w-1/2'>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-lg">User Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            readOnly disabled
                                            {...register("userName")}
                                            defaultValue={dbUser?.userName}
                                            className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                    </div>


                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-lg">Email</span>
                                        </label>
                                        <input
                                            type="text"
                                            readOnly disabled
                                            defaultValue={dbUser?.email}
                                            className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                    </div>


                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-lg">Education</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Educational information"
                                            defaultValue={dbUser?.education && dbUser?.education}
                                            {...register("education")}
                                            autoComplete='off'
                                            className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                    </div>
                                </div>

                                <div className='w-full md:w-1/2 ml-0 md:ml-5'>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-lg">Location</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Location"
                                            {...register("address")}
                                            defaultValue={dbUser?.address}
                                            autoComplete='off'
                                            className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-lg">Phone Number</span>
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Phone number"
                                            {...register("phone")}
                                            defaultValue={dbUser?.phone}
                                            autoComplete='off'
                                            className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-lg">LinkedIn profile link</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Profile link"
                                            {...register("profileLink")}
                                            defaultValue={dbUser?.profileLink && dbUser?.profileLink}
                                            autoComplete='off'
                                            className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Update Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;