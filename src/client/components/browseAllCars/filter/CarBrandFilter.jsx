import React, { useEffect, useState } from 'react'
import { getAllCarBrands } from '../../../../api/carBrandsApi';
import { base64ToFile } from '../../../../utils/convertPicture';

export default function CarBrandFilter({ filterInput, setFilterInput, queryCarData }) {
    const [carBrand, setCarBrand] = useState();
    const [selectedCarBrand, setSelectedCarBrand] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllCarBrands();
            console.log("CarBrandFilter result: ", result);
            setCarBrand(result);
        }

        fetchData();
    }, []);

    const onClickEvent = (id) => {
        setSelectedCarBrand(id);

        console.log("selectedCarBrand: ", id);

        const newFilterInput = { ...filterInput, "carBrand": id }
        setFilterInput(newFilterInput);
        queryCarData(newFilterInput);
    }

    const getCarBrandList = () => {
        return carBrand && carBrand.map((item) => (
            <li
                className={`car-brand-item ${selectedCarBrand === item.id ? "selected" : ""}`}
                key={item.id}
                onClick={() => onClickEvent(item.id)}
            >
                <img className='car-brand-logo'
                    src={URL.createObjectURL(base64ToFile(item.logo))}
                    alt={item.name}
                />
                <p className='car-brand-name'>{item.name}</p>
            </li>
        ))
    }

    return (
        <div className='car-brand-filter-container'>
            <ul className='car-brand-list'>
                {carBrand && getCarBrandList()}
            </ul>
        </div>
    )
}
