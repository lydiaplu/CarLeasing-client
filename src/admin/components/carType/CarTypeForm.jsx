import React, { createRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMessage } from '../providers/MessageProvider'
import { adminConfig } from '../../../config/adminConfig';
import { getCarTypeById } from '../../../api/carTypesApi';

function CarTypeForm({ formState, onSubmit }) {
    const { showMessage } = useMessage();
    const { carTypeId } = useParams();
    const formRef = createRef();

    const carTypeObj = {
        id: "",
        typeName: ""
    }

    const [carType, setCarType] = useState(carTypeObj)

    useEffect(() => {
        const fetchCarType = async () => {
            try {
                const carTypeData = await getCarTypeById(carTypeId);
                console.log("get carTypeData: ", carTypeData);

                carTypeData && setCarType({
                    id: carTypeData.id,
                    typeName: carTypeData.typeName
                })
            } catch (error) {
                console.log("fetch editCarBrand error: ", error);
            }
        }

        carTypeId && fetchCarType();
    }, [carTypeId])

    const clearForm = () => {
        setCarType(carTypeObj);
        formRef.current.reset();
    }

    const handleInputChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const name = event.target.name;
        let value = event.target.value;
        setCarType({ ...carType, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        onSubmit(carType, showMessage, clearForm);
    }

    return (
        <div className="card card-info card-outline mb-4">
            <div className="card-header">
                <div className="card-title">
                    {formState.charAt(0).toUpperCase() + formState.slice(1) + " Car Types"}
                </div>
            </div>

            <form className="needs-validation" ref={formRef} onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="row g-3">
                        {/* Type Name */}
                        <div className="col-md-6">
                            <label htmlFor="typeName" className="form-label">
                                Type Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="typeName"
                                name="typeName"
                                value={carType.typeName}
                                onChange={handleInputChange}
                                required
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

export default CarTypeForm
