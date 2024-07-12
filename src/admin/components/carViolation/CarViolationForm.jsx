import React, { createRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useMessage } from '../providers/MessageProvider'
import { adminConfig } from '../../../config/adminConfig'
import { getCarViolationById } from '../../../api/carViolationApi'
import CarLicenseFilterFormByEffect from '../content/carCascadeFilterForm/CarLicenseFilterFormByEffect'
import CarLicenseFilterForm from '../content/carCascadeFilterForm/CarLicenseFilterForm'


export default function CarViolationForm({ formState, onSubmit }) {
    const { showMessage } = useMessage();
    const { violationId } = useParams();
    const formRef = createRef();

    const carViolationObj = {
        id: "",
        violationDate: "",
        violationLocation: "",
        fineAmount: "",
        description: "",
        carId: ""
    }

    const [carViolation, setCarViolation] = useState(carViolationObj);
    const [uniqueKey, setUniqueKey] = useState(Date.now());

    useEffect(() => {
        const fetchCarViolation = async () => {
            try {
                const carViolationData = await getCarViolationById(violationId);
                console.log("get carViolationData: ", carViolationData);
                carViolationData && setCarViolation({ ...carViolationData, carId: carViolationData.car.id });
            } catch (error) {
                console.log("fetch Car Violation error: ", error);
            }
        }

        violationId && fetchCarViolation();
    }, [violationId])

    const clearForm = () => {
        setCarViolation(carViolationObj);
        formRef.current.reset();
        setUniqueKey(Date.now());
    }

    const handleInputChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const name = event.target.name;
        let value = event.target.value;

        setCarViolation({ ...carViolation, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit(carViolation, showMessage, clearForm);
    }

    return (
        <div className="card card-info card-outline mb-4">
            <div className="card-header">
                <div className="card-title">
                    {formState.charAt(0).toUpperCase() + formState.slice(1) + " Car Violation"}
                </div>
            </div>

            <form className="needs-validation" ref={formRef} onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="row g-3">
                        <CarLicenseFilterForm
                            key={uniqueKey}
                            uniqueKey={uniqueKey}
                            formState={formState}
                            formData={carViolation}
                            serCarId={setCarViolation}
                        />

                        {/* Violation Date */}
                        <div className="col-md-6">
                            <label htmlFor="violationDate" className="form-label">
                                Violation Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="violationDate"
                                name="violationDate"
                                value={carViolation.violationDate}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Violation Location */}
                        <div className="col-md-6">
                            <label htmlFor="violationLocation" className="form-label">
                                Violation Location
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="violationLocation"
                                name="violationLocation"
                                value={carViolation.violationLocation}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Fine Amount */}
                        <div className="col-md-6">
                            <label htmlFor="fineAmount" className="form-label">
                                Fine Amount
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="fineAmount"
                                name="fineAmount"
                                value={carViolation.fineAmount}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Description */}
                        <div className="col-md-12">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={carViolation.description}
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
