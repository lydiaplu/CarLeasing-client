import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import { useLoading } from '../providers/LoadingProvider';
import { useMessage } from '../providers/MessageProvider';
import { base64ToFile } from '../../../utils/convertPicture';
import { adminConfig } from '../../../config/adminConfig';
import { getCarRentalById } from '../../../api/carRentalApi';

export default function CarRentalForm({ formState, onSubmit }) {
    const { showMessage } = useMessage();
    const { carRentalId } = useParams();

    const carRentalObj = {
        id: "",
        rentalDate: "",
        returnDate: "",

        customerName: "",
        customerEmail: "",
        customerDriverLinceseNumber: "",

        carBrand: "",
        carModel: "",
        carYear: "",
        carLicensePlate: "",
        carColor: "",
    };
    const [carRental, setCarRental] = useState(carRentalObj);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultData = await getCarRentalById(carRentalId);
                console.log("get resultData: ", resultData);

                resultData && setCarRental({
                    id: resultData.id,
                    rentalDate: resultData.rentalDate,
                    returnDate: resultData.returnDate,

                    customerName: `${resultData.customer.firstName} ${resultData.customer.middleName} ${resultData.customer.lastName}`,
                    customerEmail: resultData.customer.email,
                    customerDriverLicenseNumber: resultData.customer.driverlicenseNumber,

                    carBrand: resultData.car.brand.name,
                    carModel: resultData.car.model,
                    carYear: resultData.car.year,
                    carLicensePlate: resultData.car.licensePlate,
                    carColor: resultData.car.color
                });

            } catch (error) {
                console.log("fetch resultData error: ", error);
            }
        }

        carRentalId && fetchData();
    }, [carRentalId])

    const handleInputChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const name = event.target.name;
        let value = event.target.value;

        setCarRental({ ...carRental, [name]: value })
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



                        {/* rentalDate */}
                        <div className="col-md-6">
                            <label htmlFor="rentalDate" className="form-label">
                                Rental Date
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="rentalDate"
                                name="rentalDate"
                                value={carRental.rentalDate}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* returnDate */}
                        <div className="col-md-6">
                            <label htmlFor="returnDate" className="form-label">
                                Return Date
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="returnDate"
                                name="returnDate"
                                value={carRental.returnDate}
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
                                value={carRental.customerName}
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
                                value={carRental.customerEmail}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* customerDriverLinceseNumber */}
                        <div className="col-md-6">
                            <label htmlFor="customerDriverLinceseNumber" className="form-label">
                                Driver Lincese Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="customerDriverLinceseNumber"
                                name="customerDriverLinceseNumber"
                                value={carRental.customerDriverLinceseNumber}
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
                                value={carRental.carBrand}
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
                                value={carRental.carModel}
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
                                value={carRental.carYear}
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
                                value={carRental.carLicensePlate}
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
                                value={carRental.carColor}
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
