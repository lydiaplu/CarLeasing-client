import React, { useEffect, useMemo, useState } from 'react'
import { adminConfig } from '../../../../config/adminConfig';
import { buildCarCascadeTree } from '../../../../lib/tree/carCascadeTree';
import { getAllCarsByGroup } from '../../../../api/carApi'

export default function CarLicenseFilterForm({ formState, formData, serCarId }) {

    const everyLevelTreeNodeObj = {
        rootNode: null,
        carBrandNode: null,
        modelNode: null,
        carTypeNode: null,
        yearNode: null,
        colorNode: null,
        licensePlateNode: null
    }

    const carFormObj = {
        carBrand: "",
        model: "",
        carType: "",
        year: "",
        color: "",
        licensePlate: ""
    }
    const [carForm, setCarForm] = useState(carFormObj)
    const [everyLevelTreeNode, setEveryLevelTreeNode] = useState(everyLevelTreeNodeObj);

    useEffect(() => {
        if (formState === adminConfig.formState.view) return;

        const fetchAllCars = async () => {
            const result = await getAllCarsByGroup();
            console.log("fetch all cars: ", result);

            result && setEveryLevelTreeNode({
                ...everyLevelTreeNode,
                rootNode: buildCarCascadeTree(result.map(item => ({
                    id: item.id,
                    carBrand: item.carBrand,
                    model: item.model,
                    carType: item.carType,
                    year: item.year,
                    color: item.color,
                    licensePlate: item.licensePlate
                })))
            });
        }

        fetchAllCars();
    }, [])

    useEffect(() => {
        let carBrandNode = null;
        carForm.model = "";

        if (carForm.carBrand) {
            carBrandNode = everyLevelTreeNode.rootNode.children[carForm.carBrand];
        }

        setEveryLevelTreeNode({
            ...everyLevelTreeNode,
            carBrandNode: carBrandNode
        })

    }, [carForm.carBrand])

    useEffect(() => {
        let modelNode = null;
        carForm.carType = "";

        if (carForm.model) {
            modelNode = everyLevelTreeNode.carBrandNode.children[carForm.model];
        }

        setEveryLevelTreeNode({
            ...everyLevelTreeNode,
            modelNode: modelNode
        })

    }, [carForm.model])

    useEffect(() => {
        let carTypeNode = null;
        carForm.year = "";

        if (carForm.carType) {
            carTypeNode = everyLevelTreeNode.modelNode.children[carForm.carType];
        }

        setEveryLevelTreeNode({
            ...everyLevelTreeNode,
            carTypeNode: carTypeNode
        })

    }, [carForm.carType])

    useEffect(() => {
        let yearNode = null;
        carForm.color = "";

        if (carForm.carType) {
            yearNode = everyLevelTreeNode.carTypeNode.children[carForm.year];
        }

        setEveryLevelTreeNode({
            ...everyLevelTreeNode,
            yearNode: yearNode
        })

    }, [carForm.year])

    useEffect(() => {
        let colorNode = null;
        carForm.licensePlate = "";

        if (carForm.color) {
            colorNode = everyLevelTreeNode.yearNode.children[carForm.color];
        }

        setEveryLevelTreeNode({
            ...everyLevelTreeNode,
            colorNode: colorNode
        })

    }, [carForm.color])

    useEffect(() => {



    }, [formData, everyLevelTreeNode])

    const handleInputChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const name = event.target.name;
        let value = event.target.value;

        setCarForm({ ...carForm, [name]: value });
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
                    value={carForm.carBrand}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Choose...</option>
                    {
                        everyLevelTreeNode.rootNode && console.log("carBrandOptions: ", Object.values(everyLevelTreeNode.rootNode.children))
                    }
                    {
                        everyLevelTreeNode.rootNode && Object.values(everyLevelTreeNode.rootNode.children).map(item => (
                            <option key={item.value} value={item.value}>{item.name}</option>
                        ))
                    }
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
                    value={carForm.model}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Choose...</option>
                    {
                        everyLevelTreeNode.carBrandNode && console.log("modelOptions: ", Object.values(everyLevelTreeNode.carBrandNode.children))
                    }
                    {
                        everyLevelTreeNode.carBrandNode && Object.values(everyLevelTreeNode.carBrandNode.children).map(item => (
                            <option key={item.value} value={item.value}>{item.name}</option>
                        ))
                    }
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
                    value={carForm.carType}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Choose...</option>
                    {
                        everyLevelTreeNode.modelNode && console.log("carTypeOptions: ", Object.values(everyLevelTreeNode.modelNode.children))
                    }
                    {
                        everyLevelTreeNode.modelNode && Object.values(everyLevelTreeNode.modelNode.children).map(item => (
                            <option key={item.value} value={item.value}>{item.name}</option>
                        ))
                    }
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
                    value={carForm.year}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Choose...</option>
                    {
                        everyLevelTreeNode.carTypeNode && console.log("yearOptions: ", Object.values(everyLevelTreeNode.carTypeNode.children))
                    }
                    {
                        everyLevelTreeNode.carTypeNode && Object.values(everyLevelTreeNode.carTypeNode.children).map(item => (
                            <option key={item.value} value={item.value}>{item.name}</option>
                        ))
                    }
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
                    value={carForm.color}
                    onChange={handleInputChange}
                >
                    <option value="">Choose...</option>
                    {
                        everyLevelTreeNode.yearNode && console.log("colorOptions: ", Object.values(everyLevelTreeNode.yearNode.children))
                    }
                    {
                        everyLevelTreeNode.yearNode && Object.values(everyLevelTreeNode.yearNode.children).map(item => (
                            <option key={item.value} value={item.value}>{item.name}</option>
                        ))
                    }
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
                    value={carForm.licensePlate}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Choose...</option>
                    {
                        everyLevelTreeNode.colorNode && console.log("licensePlateOptions: ", Object.values(everyLevelTreeNode.colorNode.children))
                    }
                    {
                        everyLevelTreeNode.colorNode && Object.values(everyLevelTreeNode.colorNode.children).map(item => (
                            <option key={item.value} value={item.value}>{item.name}</option>
                        ))
                    }
                </select>
                <div className="valid-feedback"></div>
            </div>
        </>
    )
}
