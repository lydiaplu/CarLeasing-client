import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CarCard from '../carCard/CarCard';

export default function SearchCarCarousel({ carData }) {
    return (
        <div className="container my-swiper-container">
            {carData === null ? <div>Loading...</div> :
                <>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={3}
                        slidesPerGroup={3}
                        breakpoints={{
                            0: {
                                slidesPerView: 1, // 屏幕宽度小于768px时显示一个滑块
                                slidesPerGroup: 1, // 屏幕宽度小于768px时每次滚动一个滑块
                            },
                            768: {
                                slidesPerView: 3, // 屏幕宽度大于768px时显示三个滑块
                                slidesPerGroup: 3, // 屏幕宽度大于768px时每次滚动三个滑块
                            },
                        }}
                        // navigation={true}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        className="my-swiper"
                    >
                        {carData && carData.map((item, index) => (
                            <SwiperSlide key={index}>
                                <CarCard car={item} />
                            </SwiperSlide>
                        ))}


                    </Swiper>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </>
            }
            {carData.length === 0 ? <div className="no-result">No car found</div> : null}
        </div>
    )
}
