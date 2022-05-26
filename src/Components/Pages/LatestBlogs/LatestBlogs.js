import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const LatestBlogs = () => {
    const { data: blogs, isLoading } = useQuery('blogs', () => fetch('https://aqueous-plateau-30085.herokuapp.com/blog')
        .then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    };

    return (
        <div className='px-7 md:px-20 lg:px-26 xl:px-32 mt-16 mb-20'>
            <h2 className='text-4xl font-bold ml-2 md:text-4xl mt-10 text-warning' style={{ fontFamily: 'Changa, sans-serif' }}>Latest Blogs</h2>
            <div className='w-1/2 md:w-1/4 lg:w-1/6 h-1 mt-2 rounded-lg bg-indigo-500'></div>

            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8'>
                {
                    blogs.map(blog => (
                        <div key={blog?._id} className="card w-full bg-base-100 shadow-xl">
                            <figure><img src={blog?.image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {blog?.title}
                                    <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>{blog?.description.slice(0, 450) + '...'}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default LatestBlogs;