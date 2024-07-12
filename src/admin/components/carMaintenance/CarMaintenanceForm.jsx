import React, { createRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useMessage } from '../providers/MessageProvider'
import { adminConfig } from '../../../config/adminConfig'
import { getCarMaintenanceById } from '../../../api/carMaintenanceApi'
// import CarLicenseFilterFormByEffect from '../content/carCascadeFilterForm/CarLicenseFilterFormByEffect'
import CarLicenseFilterForm from '../content/carCascadeFilterForm/CarLicenseFilterForm'

export default function CarMaintenanceForm({ formState, onSubmit }) {
    const { showMessage } = useMessage();
    const { maintenanceId } = useParams();
    const formRef = createRef();

    const carMaintenanceObj = {
        id: "",
        maintenanceDate: "",
        cost: "",
        description: "",
        carId: ""
    }

    const [carMaintenance, setCarMaintenance] = useState(carMaintenanceObj);
    const [uniqueKey, setUniqueKey] = useState(Date.now());

    useEffect(() => {
        const fetchCarMaintenance = async () => {
            try {
                const carMaintenanceData = await getCarMaintenanceById(maintenanceId);
                console.log("get carMaintenanceData: ", carMaintenanceData);
                carMaintenanceData && setCarMaintenance({ ...carMaintenanceData, carId: carMaintenanceData.car.id });
            } catch (error) {
                console.log("fetch Car Maintenance error: ", error);
            }
        }

        maintenanceId && fetchCarMaintenance();
    }, [maintenanceId])

    const clearForm = () => {
        setCarMaintenance(carMaintenanceObj);
        formRef.current.reset();
        setUniqueKey(Date.now());
    }

    const handleInputChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const name = event.target.name;
        let value = event.target.value;
        setCarMaintenance({ ...carMaintenance, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        onSubmit(carMaintenance, showMessage, clearForm);
    }

    return (
        <div className="card card-info card-outline mb-4">
            <div className="card-header">
                <div className="card-title">
                    {formState.charAt(0).toUpperCase() + formState.slice(1) + " Car Maintenance"}
                </div>
            </div>

            <form className="needs-validation" ref={formRef} onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="row g-3">
                        {/* <CarLicenseFilterForm/> */}

                        {/* Car Id */}
                        {/* <div className="col-md-6">
                            <label htmlFor="carId" className="form-label">
                                Car Id
                            </label>
                            <input
                                className="form-control"
                                id="carId"
                                name="carId"
                                value={carMaintenance.carId}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div> */}

                        <CarLicenseFilterForm
                            key={uniqueKey}
                            uniqueKey={uniqueKey}
                            formState={formState}
                            formData={carMaintenance}
                            serCarId={setCarMaintenance}
                        />

                        {/* Maintenance Date */}
                        <div className="col-md-6">
                            <label htmlFor="maintenanceDate" className="form-label">Maintenance Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="maintenanceDate"
                                name="maintenanceDate"
                                value={carMaintenance.maintenanceDate}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Cost */}
                        <div className="col-md-6">
                            <label htmlFor="cost" className="form-label">Cost</label>
                            <input
                                type="number"
                                className="form-control"
                                id="cost"
                                name="cost"
                                value={carMaintenance.cost}
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
                                value={carMaintenance.description}
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
