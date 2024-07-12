import React from 'react'
import { useCarCascadeForm } from '../../../../hooks/useCarCascadeForm';
import FilterSelect from '../filter/FilterSelect';

export default function CarTypeFilterBar({ searchBarData, setSearchBarData }) {
    const { state, dispatchUpdateField } = useCarCascadeForm();

    const handleInputChange = (event) => {

        const { name, value } = event.target;
        dispatchUpdateField(name, value);

        if (name === "carBrand") {
            setSearchBarData(prevState => ({
                ...prevState,
                selectedCarBrand: value,
                selectedModel: "",
                selectedCarType: ""
            }));
        } else if (name === "model") {
            setSearchBarData(prevState => ({
                ...prevState,
                selectedModel: value,
                selectedCarType: ""
            }));
        } else if (name === "carType") {
            setSearchBarData({ ...searchBarData, selectedCarType: value })
        }
    }

    const renderOptions = (treeNode) => {
        return treeNode ? Object.values(treeNode.children).map(item => (
            <option key={item.value} value={item.value}>{item.name}</option>
        )) : null;
    }

    return (
        <>
            <div className="col">
                <select
                    className="form-select"
                    id="carBrand"
                    name="carBrand"
                    value={state.carForm.carBrand}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Car Brand</option>
                    {renderOptions(state.treeNode.rootNode)}
                </select>
            </div>

            <div className="col">
                <select
                    className="form-select"
                    id="model"
                    name="model"
                    value={state.carForm.model}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Car Model</option>
                    {renderOptions(state.treeNode.carBrandNode)}
                </select>
            </div>

            <div className="col">
                <select
                    className="form-select"
                    id="carType"
                    name="carType"
                    value={state.carForm.carType}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Car Type</option>
                    {renderOptions(state.treeNode.modelNode)}
                </select>
            </div>
        </>
    )
}
