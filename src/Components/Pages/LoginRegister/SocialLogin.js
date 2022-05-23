import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../Firebase.init';
import useToken from '../../../hooks/useToken';
import SocialLoading from '../Shared/SocialLoading';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    let errorMessage;
    const navigate = useNavigate();
    const [token] = useToken(user);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // Navigate user
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from]);

    if (user) {
        const userName = user?.user.displayName;
        const email = user?.user.email;
        fetch(`http://localhost:5000/userName/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ userName })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
            })
    }

    // Handle loading
    if (loading) {
        return <SocialLoading></SocialLoading>;
    }

    // Handle error
    if (error) {
        errorMessage = <p className='text-red-500 text-center mb-2'>{error?.message}</p>
    }

    return (
        <div>
            <div className="divider">OR</div>
            {errorMessage}
            <button onClick={() => signInWithGoogle()} className='btn btn-outline btn-warning w-full'>Continue With Google</button>
        </div>
    );
};

export default SocialLogin;