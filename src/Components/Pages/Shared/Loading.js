import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className='min-h-[80vh] flex justify-center items-center'>
            <InfinitySpin color="royalblue" />
        </div>
    );
};

export default Loading;