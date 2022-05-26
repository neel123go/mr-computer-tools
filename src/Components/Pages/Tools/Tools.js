import React, { useEffect, useState } from 'react';
import Tool from '../Tool/Tool';

const Tools = () => {
    const [tools, setTools] = useState([]);

    useEffect(() => {
        fetch('https://aqueous-plateau-30085.herokuapp.com/tools')
            .then(res => res.json())
            .then(data => setTools(data));
    }, []);

    return (
        <div id='tools' className='px-7 md:px-20 lg:px-26 xl:px-32 mt-16'>
            <h2 className='text-4xl font-bold ml-2 md:text-4xl mt-10 text-warning' style={{ fontFamily: 'Changa, sans-serif' }}>Our Tools</h2>
            <div className='w-1/2 md:w-1/4 lg:w-1/6 h-1 mt-2 rounded-lg bg-indigo-400'></div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 xl:gap-12'>
                {
                    tools.map(tool => <Tool key={tool._id} tool={tool}></Tool>)
                }
            </div>
        </div>
    );
};

export default Tools;