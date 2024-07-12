import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import { getDistinctCarByEveryType } from '../../../../api/carApi';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SearchCarCarousel({ searchInput }) {
    const [isLoading, setIsLoading] = useState(false);
    const [carData, setCarData] = useState([]);

    // GET data from database
    useEffect(() => {
        // fetch data part
        const fetchCarBrands = async () => {
            setIsLoading(true);
            try {
                const result = await getDistinctCarByEveryType();
                console.log("CarList result: ", result);
                setCarData(result);
            } catch (error) {
                console.log(error.message);

            }
            setIsLoading(false);
        }

        fetchCarBrands();
    }, [])

    return (
        <div>
            {isLoading ? <div>Loading...</div> :
                <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    slidesPerGroup={3}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {carData && carData.map((item, index) => (
                        <SwiperSlide key={index}>
                            {/* <div className="car-card">
                                <img src={item.image} alt="car" />
                                <div className="car-card-body">
                                    <h3>{item.carBrand} {item.model}</h3>
                                    <p>{item.carType}</p>
                                    <p>{item.fuelType}</p>
                                    <p>{item.price}</p>
                                </div>
                            </div> */}
                            <div>{item.id}</div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            }

        </div>
    )
}
