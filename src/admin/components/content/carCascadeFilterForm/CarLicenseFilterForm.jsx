import React, { useEffect, useRef, useState } from 'react'
import { adminConfig } from '../../../../config/adminConfig';
import { useCarCascadeForm } from '../../../../hooks/useCarCascadeForm';

export default function CarLicenseFilterForm({ uniqueKey, formState, formData, serCarId }) {
    const { state, dispatchUpdateField } = useCarCascadeForm();

    useEffect(() => {

        console.log("CarLicenseFilterForm uniqueKey: ", uniqueKey);
        if (formData.car && state.treeNode.rootNode) {
            dispatchUpdateField("carBrand", formData.car.carBrand.id);
            dispatchUpdateField("model", formData.car.model);
            dispatchUpdateField("carType", formData.car.carType.id);
            dispatchUpdateField("year", formData.car.year);
            dispatchUpdateField("color", formData.car.color);
            dispatchUpdateField("licensePlate", formData.car.id);

        }
        // else if (!formData && state.treeNode.rootNode) {
        //     dispatchUpdateField("carBrand", "");
        //     console.log("After form reset: ", formData)
        // }
    }, [formData.car, state.treeNode.rootNode])

    const handleInputChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const { name, value } = event.target;
        dispatchUpdateField(name, value);

        if (name === "licensePlate") {
            serCarId({ ...formData, carId: value })
        }
    }

    const renderOptions = (treeNode) => {
        return treeNode ? Object.values(treeNode.children).map(item => (
            <option key={item.value} value={item.value}>{item.name}</option>
        )) : null;
    }

    return (
        <>
            {/* Brand Name */}
            <div className="col-md-6">
                <label htmlFor="carBrand" className="form-label">
                    Brand Name
                </label>
                <select
                    className="form-select"
                    id="carBrand"
                    name="carBrand"
                    value={state.carForm.carBrand}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Choose...</option>
                    {renderOptions(state.treeNode.rootNode)}
                </select>
                <div className="valid-feedback"></div>
            </div>

            {/* Model */}
            <div className="col-md-6">
                <label htmlFor="model" className="form-label">Model</label>
                <select
                    className="form-select"
                    id="model"
                    name="model"
                    value={state.carForm.model}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Choose...</option>
                    {renderOptions(state.treeNode.carBrandNode)}
                </select>
                <div className="valid-feedback"></div>
            </div>

            {/* Car Type */}
            <div className="col-md-6">
                <label htmlFor="carType" className="form-label">
                    Car Type
                </label>
                <select
                    className="form-select"
                    id="carType"
                    name="carType"
                    value={state.carForm.carType}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Choose...</option>
                    {renderOptions(state.treeNode.modelNode)}
                </select>
                <div className="valid-feedback"></div>
            </div>

            {/* Year */}
            <div className="col-md-6">
                <label htmlFor="year" className="form-label">Year</label>
                <select
                    className="form-select"
                    id="year"
                    name="year"
                    value={state.carForm.year}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Choose...</option>
                    {renderOptions(state.treeNode.carTypeNode)}
                </select>
                <div className="valid-feedback"></div>
            </div>

            {/* Color */}
            <div className="col-md-6">
                <label htmlFor="color" className="form-label">Color</label>
                <select
                    className="form-select"
                    id="color"
                    name="color"
                    value={state.carForm.color}
                    onChange={handleInputChange}
                >
                    <option value="">Choose...</option>
                    {renderOptions(state.treeNode.yearNode)}
                </select>
                <div className="valid-feedback"></div>
            </div>

            {/* License Plate */}
            <div className="col-md-6">
                <label htmlFor="licensePlate" className="form-label">License Plate</label>
                <select
                    className="form-select"
                    id="licensePlate"
                    name="licensePlate"
                    value={state.carForm.licensePlate}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Choose...</option>
                    {renderOptions(state.treeNode.colorNode)}
                </select>
                <div className="valid-feedback"></div>
            </div>
        </>
    )
}
