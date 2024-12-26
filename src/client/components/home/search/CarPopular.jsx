import React, { createContext, useContext, useState, useEffect } from 'react'
import CarPopularForm from './CarPopularForm'
import { getCarByTypeAndBrand, getDistinctCarByEveryType } from '../../../../api/carApi';
import SearchCarCarousel from '../../common/carousel/SearchCarCarousel';

const TabSelectContext = createContext();
export const useTabSelect = () => useContext(TabSelectContext);


export default function CarPopular() {
    const [carData, setCarData] = useState();
    const [distinctCarByEveryType, setDistinctCarByEveryType] = useState();

    useEffect(() => {
        const fetchCarBrands = async () => {
            try {
                const result = await getDistinctCarByEveryType();
                console.log("getDistinctCarByEveryType result: ", result);
                setDistinctCarByEveryType(result);
                setCarData(result);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchCarBrands();
    }, [])

    const queryCarData = async (tabSelect) => {
        if (tabSelect.carBrand.length > 0 || tabSelect.carType.length > 0) {
            const queryData = await getCarByTypeAndBrand(tabSelect);
            console.log("CarPopular from tabSelect: ", queryData)
            setCarData(queryData);
        } else {
            setCarData(distinctCarByEveryType);
        }
    }

    return (
        <div className='car-search'>
            <CarPopularForm queryCarData={queryCarData} />
            <SearchCarCarousel carData={carData} />
        </div>
    )
}
