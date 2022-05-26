import React from 'react';

const MyPortfolio = () => {
    return (
        <div className='min-h-screen px-2 bg-slate-300 md:px-20 lg:px-26 xl:px-32 py-16'>
            <h2 className='text-center text-3xl text-gray-700'>My Portfolio</h2>
            <div className="card w-full sm:w-4/5 lg:w-1/2 mx-auto mt-10 bg-base-200 shadow-xl">
                <div className="card-body">
                    <div className='text-left text-xl'>
                        <p className='text-center text-gray-800 text-3xl'>Ayoun Paul Neel</p>
                        <div className='mt-10'>
                            <p className='text-gray-700 text-lg'>Email: <span className='block'>ayounpaul1029@gmail.com</span></p>
                            <p className='text-gray-700 text-lg mt-4'>Educational Background: <span className='block'>I am a student of class 10 and the name of my school is Sylhet Govt. Pilot High School, Sylhet</span></p>
                            <p className='text-gray-700 text-lg mt-4'>list of technologies or skills:</p>
                            <ol className='text-gray-700 text-lg ml-2 mt-2'>
                                <li>- HTML & CSS</li>
                                <li>- Javascript</li>
                                <li>- API</li>
                                <li>- React</li>
                                <li>- React Router</li>
                                <li>- Bootstrap</li>
                                <li>- Tailwind CSS</li>
                                <li>- Tailwind CSS with Create React App</li>
                                <li>- React Bootstrap</li>
                                <li>- React Router Hook</li>
                                <li>- Firebase</li>
                                <li>- React Firebase Hook</li>
                                <li>- React Toastify</li>
                                <li>- React Hook From</li>
                                <li>- React Hot Toast</li>
                                <li>- Express.js</li>
                                <li>- Stripe</li>
                            </ol>
                            <p className='text-gray-700 text-lg mt-4'>My Projects:</p>
                            <ol className='text-gray-700 text-lg ml-2 mt-2'>
                                <li>- <a href="https://sales-tracking-2ffd2.web.app/" rel="noreferrer" target="_blank" className='text-indigo-500'>Sales Tracking</a></li>
                                <li>- <a href="https://paul-s-capture.web.app/" rel="noreferrer" target="_blank" className='text-indigo-500'>Paul's Capture</a></li>
                                <li>- <a href="https://arora-shoes.netlify.app/" rel="noreferrer" target="_blank" className='text-indigo-500'>Arora Shoes</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPortfolio;