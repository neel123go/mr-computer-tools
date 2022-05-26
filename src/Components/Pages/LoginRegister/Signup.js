import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase.init';
import SocialLogin from './SocialLogin';
import Loading from '../Shared/Loading';
import useToken from '../../../hooks/useToken';

const Signup = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    let errorMessage;
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [token] = useToken(user);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // Navigate user
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from]);

    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data?.email, data?.password);
        const userName = data?.userName;
        const email = data?.email;
        if (email && userName) {
            fetch(`https://aqueous-plateau-30085.herokuapp.com/userName/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ userName })
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                })
        }
    };

    // Handle error
    if (error) {
        errorMessage = <p className='text-error text-center'>{error?.message}</p>
    }

    // Handle loading
    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div className="hero min-h-screen bg-base-200 py-10">
            <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                <div className="card-body p-5 sm:p-10">
                    <h2 className='text-2xl font-bold text-center mb-2 text-warning'>Create an account</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {errorMessage}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">User Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="User name"
                                {...register("userName", {
                                    required: {
                                        value: true,
                                        message: 'User name is required'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'User name must be contain at least 3 characters'
                                    }
                                })}
                                autoComplete='off'
                                className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                            <label className="mt-1">
                                {errors.userName?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.userName.message}</span>}
                                {errors.userName?.type === 'minLength' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.userName.message}</span>}
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Email address"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email address is required'
                                    },
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Provide a valid email'
                                    }
                                })}
                                autoComplete='off'
                                className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                            <label className="mt-1">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be contain at least 8 characters'
                                    }
                                })}
                                autoComplete='off'
                                className="input input-bordered focus:border-2 focus:border-indigo-300 focus:outline-0" />
                            <label className="mt-1">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-error" style={{ fontSize: '15px' }}>{errors.password.message}</span>}
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <SocialLogin></SocialLogin>
                    <p className='text-center mt-3'>Already have an account? <Link to='/login' className='text-info link link-hover'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;