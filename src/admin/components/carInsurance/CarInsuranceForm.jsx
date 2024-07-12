import React, { createRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useMessage } from '../providers/MessageProvider'
import { adminConfig } from '../../../config/adminConfig'
import { getCarInsuranceById } from '../../../api/carInsuranceApi'
import CarLicenseFilterForm from '../content/carCascadeFilterForm/CarLicenseFilterForm'

export default function CarInsuranceForm({ formState, onSubmit }) {
    const { showMessage } = useMessage();
    const { insuranceId } = useParams();
    const formRef = createRef();

    const carInsuranceObj = {
        id: "",
        insuranceCompany: "",
        insuranceAmount: "",
        effectiveDate: "",
        expirationDate: "",
        autoRenewalDate: "",
        premium: "",
        description: "",
        carId: ""
    }

    const [carInsurance, setCarInsurance] = useState(carInsuranceObj);
    const [uniqueKey, setUniqueKey] = useState(Date.now());

    useEffect(() => {
        const fetchCarInsurance = async () => {
            try {
                const carInsuranceData = await getCarInsuranceById(insuranceId);
                console.log("get carInsuranceData: ", carInsuranceData);
                carInsuranceData && setCarInsurance({ ...carInsuranceData, carId: carInsuranceData.car.id });
            } catch (error) {
                console.log("fetch Car Insurance error: ", error);
            }
        }
        insuranceId && fetchCarInsurance();
    }, [insuranceId])

    const clearForm = () => {
        setCarInsurance(carInsuranceObj);
        formRef.current.reset();
        setUniqueKey(Date.now());
    }

    const handleInputChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const name = event.target.name;
        const value = event.target.value;
        setCarInsurance({ ...carInsurance, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit(carInsurance, showMessage, clearForm);
    }

    return (
        <div className="card card-info card-outline mb-4">
            <div className="card-header">
                <div className="card-title">
                    {formState.charAt(0).toUpperCase() + formState.slice(1) + " Car Insurance"}
                </div>
            </div>

            <form className="needs-validation" ref={formRef} onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="row g-3">
                        {/* <CarLicenseFilterForm/> */}
                        {carInsurance && console.log("carInsurance: ", carInsurance)}

                        {/* Car Id */}
                        {/* <div className="col-md-6">
                            <label htmlFor="carId" className="form-label">
                                Car Id
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="carId"
                                name="carId"
                                value={carInsurance.carId}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div> */}

                        <CarLicenseFilterForm
                            key={uniqueKey}
                            uniqueKey={uniqueKey}
                            formState={formState}
                            formData={carInsurance}
                            serCarId={setCarInsurance}
                        />

                        {/* Insurance Company */}
                        <div className="col-md-6">
                            <label htmlFor="insuranceCompany" className="form-label">
                                Insurance Company
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="insuranceCompany"
                                name="insuranceCompany"
                                value={carInsurance.insuranceCompany}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Insurance Amount */}
                        <div className="col-md-6">
                            <label htmlFor="insuranceAmount" className="form-label">
                                Insurance Amount
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="insuranceAmount"
                                name="insuranceAmount"
                                value={carInsurance.insuranceAmount}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Effective Date */}
                        <div className="col-md-6">
                            <label htmlFor="effectiveDate" className="form-label">
                                Effective Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="effectiveDate"
                                name="effectiveDate"
                                value={carInsurance.effectiveDate}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Expiration Date */}
                        <div className="col-md-6">
                            <label htmlFor="expirationDate" className="form-label">
                                Expiration Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="expirationDate"
                                name="expirationDate"
                                value={carInsurance.expirationDate}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* AutoRenewal Date */}
                        <div className="col-md-6">
                            <label htmlFor="autoRenewalDate" className="form-label">
                                AutoRenewal Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="autoRenewalDate"
                                name="autoRenewalDate"
                                value={carInsurance.autoRenewalDate}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Premium */}
                        <div className="col-md-6">
                            <label htmlFor="premium" className="form-label">
                                Premium
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="premium"
                                name="premium"
                                value={carInsurance.premium}
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
                                value={carInsurance.description}
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
