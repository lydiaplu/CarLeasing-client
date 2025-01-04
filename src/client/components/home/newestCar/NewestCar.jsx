import React, { createContext, useContext, useState, useEffect } from 'react'
import { getNewestCar } from '../../../../api/carApi';
import SearchCarCarousel from '../../common/carousel/SearchCarCarousel';

export default function NewestCar() {
    const [carData, setCarData] = useState();
    const [newestCar, setNewestCar] = useState();

    useEffect(() => {
        const fetchCarBrands = async () => {
            try {
                const result = await getNewestCar();
                console.log("getNewestCar result: ", result);
                setNewestCar(result.content);
                setCarData(result.content);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchCarBrands();
    }, [])

    return (
        <div className='car-search'>
            <h3 className='title'>The Newset Cars</h3>
            <SearchCarCarousel carData={carData} />
        </div>
    )
}
