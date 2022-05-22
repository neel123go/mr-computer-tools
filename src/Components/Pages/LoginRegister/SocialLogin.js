import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../Firebase.init';
import SocialLoading from '../Shared/SocialLoading';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    let errorMessage;
    const navigate = useNavigate();

    // Navigate user
    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

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