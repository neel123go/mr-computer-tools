import React from 'react';

const Blogs = () => {
    return (
        <div className='px-7 md:px-20 lg:px-26 bg-base-100 xl:px-32 mb-10 pt-16'>
            <h2 className='text-3xl text-gray-700 text-center'>Questions Answer</h2>
            <div className='pt-8'>
                <h2 className='text-2xl text-gray-700'>1. How will you improve the performance of a React Application?</h2>
                <p className='text-gray-600 mt-3 text-lg'>I can improve the performance of my React Application through the following ways: </p>
                <ol className='text-gray-600 text-lg pl-4 pt-3'>
                    <li>1. I will first only load the resources that I need upfront.</li>
                    <li>2. I will be Audit and Trim out my Javascript bundles to eliminate any code redundancy</li>
                    <li>3. I will avoid rendering all of the images at once to improve the page load time</li>
                    <li>4. I will improve my React Application page load time by using React.Fragments without using HTML elements</li>
                </ol>

                <h2 className='text-2xl text-gray-700 mt-8'>2. What are the different ways to manage a state in a React application?</h2>
                <p className='text-gray-600 mt-3 text-lg'>There are four different ways to manage a state in a React Application. These are </p>
                <ol className='text-gray-600 text-lg pl-4 pt-3'>
                    <li>1. Local State Manage</li>
                    <li>2. Global State Manage</li>
                    <li>3. Server State Manage</li>
                    <li>4. URL State Manage</li>
                </ol>

                <h2 className='text-2xl text-gray-700 mt-8'>3. Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts.</h2>
                <p className='text-gray-600 mt-5 text-lg'>I do not set the state directly because of the following reasons:</p>
                <ol className='text-gray-600 text-lg pl-4 pt-3'>
                    <li>1. If I update it directly, calling the setState() afterward may just replace the update I made.</li>
                    <li>2. When I directly update the state, it does not change this.state immediately. Instead, it creates a pending state transition, and accessing it after calling this method will only return the present value.</li>
                    <li>3. I will lose control of the state across all components.</li>
                </ol>

                <h2 className='text-2xl text-gray-700 mt-8'>4. You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h2>
                <p className='text-gray-600 mt-5 text-lg'>{`products.filter(product => product.name.toLowerCase().includes('mouse'))`}</p>

                <h2 className='text-2xl text-gray-700 mt-8'>5. What is a unit test? Why should write unit tests?</h2>
                <p className='text-gray-600 mt-5 text-lg'>A unit test may be a way of testing a unit - the littlest piece of code which will be logically isolated during a system. Unit Testing is very important because software developers sometimes try to save time doing minimal unit testing. It helps to fix bugs early within the development cycle and save costs. Good unit tests serve as project documentation. It also helps the developers to know the testing code base and enables them to make changes quickly. we can also re-use it.</p>
            </div>
        </div>
    );
};

export default Blogs;