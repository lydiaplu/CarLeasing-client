import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import { useLoading } from '../providers/LoadingProvider';
import { useMessage } from '../providers/MessageProvider';
import { base64ToFile } from '../../../utils/convertPicture';
import { adminConfig } from '../../../config/adminConfig';
import { getRentedCarById } from '../../../api/RentedCarApi';

export default function RentedCarForm({ formState, onSubmit }) {
    const { showMessage } = useMessage();
    const { rentedId } = useParams();

    const rentedCarObj = {
        id: "",
        startDate: "",
        endDate: "",

        customerName: "",
        customerEmail: "",
        customerDriverLicenseNumber: "",

        carBrand: "",
        carModel: "",
        carYear: "",
        carLicensePlate: "",
        carColor: "",
    };

    const [rentedCar, setRentedCar] = useState(rentedCarObj);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultData = await getRentedCarById(rentedId);
                console.log("get resultData: ", resultData);

                resultData && setRentedCar({
                    id: resultData.id,
                    startDate: resultData.startDate,
                    endDate: resultData.endDate,

                    customerName: `${resultData.customer.firstName} ${resultData.customer.middleName} ${resultData.customer.lastName}`,
                    customerEmail: resultData.customer.email,
                    customerDriverLicenseNumber: resultData.customer.driverLicenseNumber,

                    carBrand: resultData.car.carBrand.name,
                    carModel: resultData.car.model,
                    carYear: resultData.car.year,
                    carLicensePlate: resultData.car.licensePlate,
                    carColor: resultData.car.color
                });

            } catch (error) {
                console.log("fetch resultData error: ", error);
            }
        }

        rentedId && fetchData();
    }, [rentedId])

    const handleInputChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const name = event.target.name;
        let value = event.target.value;

        setRentedCar({ ...rentedCar, [name]: value })
    }

    return (
        <div className="card card-info card-outline mb-4">
            <div className="card-header">
                <div className="card-title">
                    {formState.charAt(0).toUpperCase() + formState.slice(1) + " Car Rental"}
                </div>
            </div>

            <form className="needs-validation">
                <div className="card-body">
                    <div className="row g-3">



                        {/* startDate */}
                        <div className="col-md-6">
                            <label htmlFor="startDate" className="form-label">
                                Start Date
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="startDate"
                                name="startDate"
                                value={rentedCar.startDate}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* endDate */}
                        <div className="col-md-6">
                            <label htmlFor="endDate" className="form-label">
                                End Date
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="endDate"
                                name="endDate"
                                value={rentedCar.endDate}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* customerName */}
                        <div className="col-md-6">
                            <label htmlFor="customerName" className="form-label">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="customerName"
                                name="customerName"
                                value={rentedCar.customerName}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* customerEmail */}
                        <div className="col-md-6">
                            <label htmlFor="customerEmail" className="form-label">
                                Customer Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="customerEmail"
                                name="customerEmail"
                                value={rentedCar.customerEmail}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* customerDriverLicenseNumber */}
                        <div className="col-md-6">
                            <label htmlFor="customerDriverLicenseNumber" className="form-label">
                                Driver Lincese Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="customerDriverLicenseNumber"
                                name="customerDriverLicenseNumber"
                                value={rentedCar.customerDriverLicenseNumber}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* carBrand */}
                        <div className="col-md-6">
                            <label htmlFor="carBrand" className="form-label">
                                Car Brand
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="carBrand"
                                name="carBrand"
                                value={rentedCar.carBrand}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* carModel */}
                        <div className="col-md-6">
                            <label htmlFor="carModel" className="form-label">
                                Car Model
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="carModel"
                                name="carModel"
                                value={rentedCar.carModel}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* Car Year */}
                        <div className="col-md-6">
                            <label htmlFor="carYear" className="form-label">
                                Car Year
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="carYear"
                                name="carYear"
                                value={rentedCar.carYear}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* carLicensePlate */}
                        <div className="col-md-6">
                            <label htmlFor="carLicensePlate" className="form-label">
                                Car License Plate
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="carLicensePlate"
                                name="carLicensePlate"
                                value={rentedCar.carLicensePlate}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* carColor */}
                        <div className="col-md-6">
                            <label htmlFor="carColor" className="form-label">
                                Car Color
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="carColor"
                                name="carColor"
                                value={rentedCar.carColor}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    {
                        formState !== adminConfig.formState.view &&
                        <button className="btn btn-info" type="submit">Submit form</button>
                    }
                </div>
            </form>
        </div>
    )
}
