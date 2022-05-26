import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from '../Shared/Loading';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import './ReviewSlider.css';

import { Autoplay, EffectCoverflow, Pagination } from "swiper";
import ReviewSliderItems from './ReviewSliderItems';
import { useQuery } from 'react-query';

const ReviewSlider = () => {
    const { data: reviews, isLoading } = useQuery('review', () => fetch('https://aqueous-plateau-30085.herokuapp.com/review', {
        method: 'GET'
    })
        .then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>;
    };

    return (
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            slidesPerView={"auto"}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={true}
            modules={[Autoplay, EffectCoverflow, Pagination]}
            className="mySwiper"
        >
            {
                reviews.map(review =>
                    <SwiperSlide key={review._id}>
                        <ReviewSliderItems review={review}></ReviewSliderItems>
                    </SwiperSlide>
                )
            }

        </Swiper>
    );
};

export default ReviewSlider;