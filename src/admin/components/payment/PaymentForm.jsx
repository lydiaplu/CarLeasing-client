import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import { useLoading } from '../providers/LoadingProvider';
import { useMessage } from '../providers/MessageProvider';
import { base64ToFile } from '../../../utils/convertPicture';
import { adminConfig } from '../../../config/adminConfig';
import { getPaymentById } from '../../../api/paymentApi';

export default function PaymentForm({ formState, onSubmit }) {
    const { showMessage } = useMessage();
    const { paymentId } = useParams();

    const paymentObj = {
        id: "",

        amount: "",
        paymentDate: "",
        paymentMethod: "",
        paymentStatus: "",

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

    const [paymentData, setPaymentData] = useState(paymentObj);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultData = await getPaymentById(paymentId);
                console.log("get resultData: ", resultData);

                resultData && setPaymentData({
                    id: resultData.id,

                    amount: resultData.amount,
                    paymentDate: resultData.paymentDate,
                    paymentMethod: resultData.paymentMethod,
                    paymentStatus: resultData.paymentStatus,

                    startDate: resultData.rentedCar.startDate,
                    endDate: resultData.rentedCar.endDate,

                    customerName: `${resultData.customer.firstName} ${resultData.customer.middleName} ${resultData.customer.lastName}`,
                    customerEmail: resultData.customer.email,
                    customerDriverLicenseNumber: resultData.customer.driverLicenseNumber,

                    carBrand: resultData.rentedCar.car.carBrand.name,
                    carModel: resultData.rentedCar.car.model,
                    carYear: resultData.rentedCar.car.year,
                    carLicensePlate: resultData.rentedCar.car.licensePlate,
                    carColor: resultData.rentedCar.car.color
                });

            } catch (error) {
                console.log("fetch resultData error: ", error);
            }
        }

        paymentId && fetchData();
    }, [paymentId])

    const handleInputChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const name = event.target.name;
        let value = event.target.value;

        setPaymentData({ ...paymentData, [name]: value })
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

                        {/* amount */}
                        <div className="col-md-6">
                            <label htmlFor="amount" className="form-label">
                                Amount
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="amount"
                                name="amount"
                                value={paymentData.amount}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* paymentDate */}
                        <div className="col-md-6">
                            <label htmlFor="paymentDate" className="form-label">
                                Payment Date
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="paymentDate"
                                name="paymentDate"
                                value={paymentData.paymentDate}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* paymentMethod */}
                        <div className="col-md-6">
                            <label htmlFor="paymentMethod" className="form-label">
                                Payment Method
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="paymentMethod"
                                name="paymentMethod"
                                value={paymentData.paymentMethod}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* paymentStatus */}
                        <div className="col-md-6">
                            <label htmlFor="paymentStatus" className="form-label">
                                Payment Status
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="paymentStatus"
                                name="paymentStatus"
                                value={paymentData.paymentStatus}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

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
                                value={paymentData.startDate}
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
                                value={paymentData.endDate}
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
                                value={paymentData.customerName}
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
                                value={paymentData.customerEmail}
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
                                value={paymentData.customerDriverLicenseNumber}
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
                                value={paymentData.carBrand}
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
                                value={paymentData.carModel}
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
                                value={paymentData.carYear}
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
                                value={paymentData.carLicensePlate}
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
                                value={paymentData.carColor}
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
