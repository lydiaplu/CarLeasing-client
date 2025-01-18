import React, { useEffect, useState } from 'react'
import { getAllCarTypes } from '../../../../api/carTypesApi'

export default function CarTypeFilter({ filterInput, setFilterInput, queryCarData }) {
    const [carType, setCarType] = useState();
    const [selectedCarType, setSelectedCarType] = useState("");

    useEffect(() => {
        fetchAllCarTypeData();
    }, []);

    const fetchAllCarTypeData = async () => {
        const result = await getAllCarTypes();
        console.log("CarTypeFilter result: ", result);
        setCarType([{ id: "", typeName: "All" }, ...result]);
    }

    const onClickEvent = (id) => {
        setSelectedCarType(id);

        console.log("selectedCarType: ", id);

        const newFilterInput = { ...filterInput, "carType": id }
        setFilterInput(newFilterInput);
        queryCarData(newFilterInput);
    }

    const getCarTypeList = () => {
        return carType && carType.map((item) => (
            <li
                className={`car-type-item ${selectedCarType === item.id ? "selected" : ""}`}
                key={item.id}
                onClick={() => onClickEvent(item.id)}
            >
                <div className={`car-type-img type-${item.typeName.toLowerCase()}`}></div>
                <p className='type-name'>{item.typeName}</p>
            </li>
        ))
    }

    return (
        <div className='car-type-filter-container'>
            <ul className='car-type-list'>
                {carType && getCarTypeList()}

                {/* <li className='car-type-item'>
                    <div className='car-type-img type-all'></div>
                    <p className='type-name'>All Type</p>
                </li>
                <li className='car-type-item'>
                    <div className='car-type-img type-sedan'></div>
                    <p className='type-name'>Sedan</p>
                </li>
                <li className='car-type-item'>
                    <div className='car-type-img type-suv'></div>
                    <p className='type-name'>SUV</p>
                </li>
                <li className='car-type-item'>
                    <div className='car-type-img type-coupe'></div>
                    <p className='type-name'>Coupe</p>
                </li>
                <li className='car-type-item'>
                    <div className='car-type-img type-hatchback'></div>
                    <p className='type-name'>Hatchback</p>
                </li>
                <li className='car-type-item'>
                    <div className='car-type-img type-crossover'></div>
                    <p className='type-name'>Crossover</p>
                </li> */}
            </ul>
        </div>
    )
}
