import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../Firebase.init';
import SocialLogin from './SocialLogin';
import Loading from '../Shared/Loading';
import useToken from '../../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    let errorMessage;
    const navigate = useNavigate();
    const [token] = useToken(user);

    // Navigate user
    useEffect(() => {
        if (token) {
            navigate('/home');
        }
    }, [token, navigate]);

    const onSubmit = async (data) => {
        await signInWithEmailAndPassword(data.email, data.password);
        reset();
    };

    if (error) {
        errorMessage = <p className='text-red-500 text-center'>{error?.message}</p>
    }

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h2 className='text-2xl font-bold text-center mb-2 text-warning'>Please Login</h2>
                        {errorMessage}
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                    type="text"
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
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <SocialLogin></SocialLogin>
                        <p className='text-center mt-3'>Don't have any account? <Link to='/signup' className='text-info link link-hover'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;