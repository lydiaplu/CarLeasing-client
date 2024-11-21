import React, { useEffect, useState } from 'react'
import SearchCarCarousel from '../../common/carousel/SearchCarCarousel'
import CarSearchForm from './CarSearchForm'
import { getCarByCheckInOutDataAndFuletypeBrandModelType, getDistinctCarByEveryType } from '../../../../api/carApi';

export default function CarSearch() {
    const [carData, setCarData] = useState();

    useEffect(() => {
        const fetchCarBrands = async () => {
            try {
                const result = await getDistinctCarByEveryType();
                console.log("getDistinctCarByEveryType result: ", result);
                setCarData(result);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchCarBrands();
    }, [])

    const queryCarData = async (searchInput) => {
        const queryData = await getCarByCheckInOutDataAndFuletypeBrandModelType(searchInput);
        setCarData(queryData);
    }

    return (
        <div className='car-search'>
            <CarSearchForm queryCarData={queryCarData} />
            <SearchCarCarousel carData={carData} />
        </div>
    )
}
