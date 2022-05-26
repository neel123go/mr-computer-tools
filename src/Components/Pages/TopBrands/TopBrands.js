import React from 'react';
import hp from '../../../assets/Top-Brands/hp-logo-grey.png';
import levono from '../../../assets/Top-Brands/32021-4-lenovo-logo-transparent-image-thumb.png';
import acer from '../../../assets/Top-Brands/images.png';
import dell from '../../../assets/Top-Brands/Dell_Logo.svg.png';
import samsung from '../../../assets/Top-Brands/samsung-logo-preview.png';
import asus from '../../../assets/Top-Brands/Asus-Logo-1995-present.png';

const TopBrands = () => {
    return (
        <div className='px-7 md:px-20 lg:px-26 xl:px-32 mb-10 mt-16'>
            <h2 className='text-4xl font-bold ml-2 md:text-4xl mt-10 text-warning' style={{ fontFamily: 'Changa, sans-serif' }}>Over 120 Trusted Brands</h2>
            <div className='w-1/2 md:w-1/4 lg:w-1/6 h-1 mt-2 rounded-lg bg-error'></div>

            <div className='bg-primary p-20 mt-8 grid grid-cols-3 gap-8'>
                <div class="card bg-base-100 shadow-xl h-40">
                    <figure class="px-10">
                        <img src={hp} alt="Shoes" class="w-32 rounded-xl mt-5" />
                    </figure>
                </div>
                <div class="card bg-base-100 shadow-xl h-40">
                    <figure class="px-10">
                        <img src={levono} alt="Shoes" class="w-56 mt-2 rounded-xl " />
                    </figure>
                </div>
                <div class="card bg-base-100 shadow-xl h-40">
                    <figure class="px-10">
                        <img src={acer} alt="Shoes" class="w-52 rounded-xl mt-8" />
                    </figure>
                </div>
                <div class="card bg-base-100 shadow-xl h-40">
                    <figure class="px-10">
                        <img src={dell} alt="Shoes" class="w-28 rounded-xl mt-6" />
                    </figure>
                </div>
                <div class="card bg-base-100 shadow-xl h-40">
                    <figure class="px-10">
                        <img src={samsung} alt="Shoes" class="w-56 pb-2 rounded-xl mt-8" />
                    </figure>
                </div>
                <div class="card bg-base-100 shadow-xl h-40">
                    <figure class="px-10">
                        <img src={asus} alt="Shoes" class="w-56 pb-2 rounded-xl mt-12" />
                    </figure>
                </div>
            </div>
        </div>
    );
};

export default TopBrands;