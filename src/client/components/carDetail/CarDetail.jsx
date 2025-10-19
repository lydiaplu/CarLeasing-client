import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCarById } from '../../../api/carApi';

export default function CarDetail() {
    const { carId } = useParams();
    const [carDetail, setCarDetail] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCarById(carId);
            setCarDetail(result.data);
        }

        fetchData();
    }, [carId])

    return (
        <div className='car-detail-container'>

        </div>
    )
}
