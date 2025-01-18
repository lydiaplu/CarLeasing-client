import React from 'react'
import { base64ToFile } from '../../../../utils/convertPicture'

export default function CarRow({ car }) {
    return (
        <div className="car-row">
            <div className='car-left'>
                <img
                    className="car-img"
                    src={car.carPicture[0] && URL.createObjectURL(base64ToFile(car.carPicture[0].picture))}
                    alt=""
                />

                <div className="car-info">
                    <h3>{car.year} {car.carBrand.name} {car.model}</h3>
                    <p>{car.carType.typeName} | {car.color} | {car.fuelType} | {car.engineDisplacement}L</p>
                    <p>{car.seats} seats</p>
                </div>
            </div>


            <div className='car-right'>
                <p className="price">${car.price} / day</p>
                <button className="book-now">Book Now</button>
            </div>

        </div>
    )
}
