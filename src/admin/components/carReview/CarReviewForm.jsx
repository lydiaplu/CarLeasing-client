import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import { useLoading } from '../providers/LoadingProvider';
import { useMessage } from '../providers/MessageProvider';
import { base64ToFile } from '../../../utils/convertPicture';
import { adminConfig } from '../../../config/adminConfig';
import { getCarReviewById } from '../../../api/carReviewApi';

export default function CarReviewForm({ formState, onSubmit }) {
    const { showMessage } = useMessage();
    const { reviewId } = useParams();

    const carReviewObj = {
        id: "",
        reviewDate: "",
        rating: "",

        customerName: "",
        customerEmail: "",
        customerDriverLicenseNumber: "",

        carBrand: "",
        carModel: "",
        carYear: "",
        carLicensePlate: "",
        carColor: "",
        startDate: "",
        endDate: "",
        comment: ""
    };

    const [carReviews, setCarReviews] = useState(carReviewObj);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultData = await getCarReviewById(reviewId);
                console.log("get resultData: ", resultData);

                resultData && setCarReviews({
                    id: resultData.id,
                    reviewDate: resultData.reviewDate,
                    rating: resultData.rating,

                    customerName: `${resultData.customer.firstName} ${resultData.customer.middleName} ${resultData.customer.lastName}`,
                    customerEmail: resultData.customer.email,
                    customerDriverLicenseNumber: resultData.customer.driverLicenseNumber,

                    carBrand: resultData.car.carBrand.name,
                    carModel: resultData.car.model,
                    carYear: resultData.car.year,
                    carLicensePlate: resultData.car.licensePlate,
                    carColor: resultData.car.color,
                    startDate: resultData.rentedCar.startDate,
                    endDate: resultData.rentedCar.endDate,
                    comment: resultData.comment
                });

            } catch (error) {
                console.log("fetch resultData error: ", error);
            }
        }

        reviewId && fetchData();
    }, [reviewId])

    const handleInputChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const name = event.target.name;
        let value = event.target.value;

        setCarReviews({ ...carReviews, [name]: value })
    }


    return (
        <div className="card card-info card-outline mb-4">
            <div className="card-header">
                <div className="card-title">
                    {formState.charAt(0).toUpperCase() + formState.slice(1) + " Car Review"}
                </div>
            </div>

            <form className="needs-validation">
                <div className="card-body">
                    <div className="row g-3">

                        {/* reviewDate */}
                        <div className="col-md-6">
                            <label htmlFor="reviewDate" className="form-label">
                                Review Date
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="reviewDate"
                                name="reviewDate"
                                value={carReviews.customerName}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* rating */}
                        <div className="col-md-6">
                            <label htmlFor="rating" className="form-label">
                                Rating
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="rating"
                                name="rating"
                                value={carReviews.rating}
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
                                value={carReviews.customerName}
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
                                value={carReviews.customerEmail}
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
                                value={carReviews.customerDriverLicenseNumber}
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
                                value={carReviews.carBrand}
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
                                value={carReviews.carModel}
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
                                value={carReviews.carYear}
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
                                value={carReviews.carLicensePlate}
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
                                value={carReviews.carColor}
                                onChange={handleInputChange}
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
                                value={carReviews.startDate}
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
                                value={carReviews.endDate}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* comment */}
                        <div className="col-md-12">
                            <label htmlFor="comment" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="comment"
                                name="comment"
                                value={carReviews.comment}
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
