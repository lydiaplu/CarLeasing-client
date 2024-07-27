import React from 'react'
import { base64ToFile } from '../../../../utils/convertPicture'

export default function CarCard({ car }) {
    return (
        <div className="car-card">
            {/* <img src={car.carPicture[0]} alt="" /> */}
            <img src={car.carPicture[0] && URL.createObjectURL(base64ToFile(car.carPicture[0].picture))} alt="" />
            <div className="car-card-body">
                <h3>{car.year} {car.carBrand.name} {car.model}</h3>
                <p>{car.carType.typeName} | {car.color} | {car.fuelType} | {car.engineDisplacement}L</p>
                <p>{car.seats} seats</p>
                <p className="price">${car.price} / day</p>
                {/* <p>{car.id}</p> */}
                <button className="book-now">Book Now</button>
            </div>
        </div>
    )
}
