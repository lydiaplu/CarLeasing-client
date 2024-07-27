import React from 'react'
import { useCarCascadeForm } from '../../../../hooks/useCarCascadeForm';

export default function CarTypeFilterBar({ searchBarData, setSearchBarData }) {
    const { state, dispatchUpdateField } = useCarCascadeForm();

    const handleInputChange = (event) => {

        const { name, value } = event.target;
        dispatchUpdateField(name, value);

        if (name === "carBrand") {
            setSearchBarData({
                ...searchBarData,
                carBrand: value,
                model: "",
                carType: ""
            });

        } else if (name === "model") {
            setSearchBarData({
                ...searchBarData,
                model: value,
                carType: ""
            });
        } else if (name === "carType") {
            setSearchBarData({ ...searchBarData, carType: value })
        }
    }

    const renderOptions = (treeNode) => {
        if (treeNode) {
            console.log("treeNode: ", treeNode);
        }
        return treeNode ? Object.values(treeNode.children).map(item => (
            <option key={item.value} value={item.value}>{item.name}</option>
        )) : null;
    }

    return (
        <>
            {/* Car Brand */}
            <div className="form-label-wrap">
                <label htmlFor="carBrand" className="form-label">
                    Car Brand
                </label>

                <select
                    className="form-select"
                    id="carBrand"
                    name="carBrand"
                    value={state.carForm.carBrand}
                    onChange={handleInputChange}
                >
                    <option value="">All</option>
                    {renderOptions(state.treeNode.rootNode)}
                </select>
                <div className="valid-feedback"></div>
            </div>

            {/* Car Model */}
            <div className="form-label-wrap">
                <label htmlFor="model" className="form-label">
                    Car Model
                </label>

                <select
                    className="form-select"
                    id="model"
                    name="model"
                    value={state.carForm.model}
                    onChange={handleInputChange}
                >
                    <option value="">All</option>
                    {renderOptions(state.treeNode.carBrandNode)}
                </select>
            </div>

            {/* Car Type */}
            <div className="form-label-wrap">
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
                    <option value="">All</option>
                    {renderOptions(state.treeNode.modelNode)}
                </select>
            </div>
        </>
    )
}
