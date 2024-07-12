import React, { createRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { useMessage } from '../providers/MessageProvider'
import { base64ToFile } from '../../../utils/convertPicture';
import { adminConfig } from '../../../config/adminConfig';
import { getAllCarBrands } from '../../../api/carBrandsApi';
import { getAllCarTypes } from '../../../api/carTypesApi';
import { getCarById } from '../../../api/carApi';

import ImageUploader from '../content/image/ImageUploader';
import ImagePreview from '../content/image/ImagePreview';

export default function CarForm({ formState, onSubmit }) {
    const { showMessage } = useMessage();
    const { carId } = useParams();
    const formRef = createRef();

    const carObj = {
        id: "",
        model: "",
        year: "",
        color: "",
        licensePlate: "",
        seats: "",
        mileage: "",
        fuelType: "",
        price: "",
        awd: "",
        leatherTrimmedUpholstery: "",
        moonroof: "",
        rab: "",
        blindSpotAssist: "",
        keylessEntrySystem: "",
        engineDisplacement: "",
        available: "",
        description: "",
        carType: "",
        carBrand: ""
    }

    function PictureObj() {
        this.id = null;
        this.identityId = "";
        this.picture = null;
        this.operation = "";
    }

    const [car, setCar] = useState(carObj);
    const [pictures, setPictures] = useState([]);
    const [carBrands, setCarBrands] = useState([{ id: "", value: "" }]);
    const [carTypes, setCarTypes] = useState([{ id: "", value: "" }]);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const carData = await getCarById(carId);
                console.log("get carData: ", carData);

                carData && setCar({
                    ...carData,
                    carBrand: carData.carBrand.id,
                    carType: carData.carType.id
                });

                if (carData && carData.carPicture) {
                    const initPictures = carData.carPicture.map((item, index) => (
                        createPictureObj(item.id, index, base64ToFile(item.picture), "update")
                    ));
                    setPictures(initPictures)
                }


            } catch (error) {
                console.log("fetch editCar error: ", error);
            }
        }

        carId && fetchCar();
    }, [carId])


    useEffect(() => {
        const fetchCarBrands = async () => {
            const result = await getAllCarBrands();
            console.log("carBrands", result);
            setCarBrands(result.map(item => ({ id: item.id, value: item.name })))
        }

        const fetchCarTypes = async () => {
            const result = await getAllCarTypes();
            console.log("carTypes", result);
            setCarTypes(result.map(item => ({ id: item.id, value: item.typeName })))
        }

        fetchCarBrands();
        fetchCarTypes();
    }, [])

    const clearForm = () => {
        setCar(carObj);
        setPictures([]);
        formRef.current.reset();
    }

    const createPictureObj = (id, identityId, picture, operation) => {
        // get the last identityId
        if (identityId === null)
            identityId = pictures.length === 0 ? "0" : pictures[pictures.length - 1].identityId;

        const pictureObj = new PictureObj();
        pictureObj.id = id;
        pictureObj.identityId = parseInt(identityId) + 1;
        pictureObj.picture = picture;
        pictureObj.operation = operation;

        return pictureObj;
    }

    const uploadImage = (event) => {
        setPictures([
            ...pictures,
            createPictureObj(null, null, event.target.files[0], "add")
        ])
    }

    const deleteImage = (identityId) => {
        const updatePictures = pictures.map(picture => {
            if (picture.identityId === identityId) {
                return { ...picture, operation: "delete" }
            }
            return picture;
        })

        setPictures(updatePictures);
    }

    const handleInputChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const name = event.target.name;
        let value = event.target.value;

        setCar({ ...car, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit(car, pictures, showMessage, clearForm);
    }

    return (
        <div className="card card-info card-outline mb-4">
            <div className="card-header">
                <div className="card-title">
                    {formState.charAt(0).toUpperCase() + formState.slice(1) + " Car"}
                </div>
            </div>

            <form className="needs-validation" ref={formRef} onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="row g-3">

                        {/* Car Brand */}
                        <div className="col-md-6">
                            <label htmlFor="carBrand" className="form-label">
                                Brand
                            </label>
                            <select
                                className="form-select"
                                id="carBrand"
                                name="carBrand"
                                value={car.carBrand}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Choose...</option>
                                {carBrands.map(item => (
                                    <option key={item.id} value={item.id}>{item.value}</option>
                                ))}
                            </select>
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Model */}
                        <div className="col-md-6">
                            <label htmlFor="model" className="form-label">Model</label>
                            <input
                                type="text"
                                className="form-control"
                                id="model"
                                name="model"
                                value={car.model}
                                onChange={handleInputChange}
                                required
                            />
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
                                value={car.carType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Choose...</option>
                                {carTypes.map(item => (
                                    <option key={item.id} value={item.id}>{item.value}</option>
                                ))}
                            </select>
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Price */}
                        <div className="col-md-6">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                value={car.price}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Year */}
                        <div className="col-md-6">
                            <label htmlFor="year" className="form-label">Year</label>
                            <input
                                type="number"
                                className="form-control"
                                id="year"
                                name="year"
                                value={car.year}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Color */}
                        <div className="col-md-6">
                            <label htmlFor="color" className="form-label">Color</label>
                            <input
                                type="text"
                                className="form-control"
                                id="color"
                                name="color"
                                value={car.color}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* License Plate */}
                        <div className="col-md-6">
                            <label htmlFor="licensePlate" className="form-label">License Plate</label>
                            <input
                                type="text"
                                className="form-control"
                                id="licensePlate"
                                name="licensePlate"
                                value={car.licensePlate}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Seats */}
                        <div className="col-md-6">
                            <label htmlFor="seats" className="form-label">Seats</label>
                            <input
                                type="number"
                                className="form-control"
                                id="seats"
                                name="seats"
                                value={car.seats}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Mileage */}
                        <div className="col-md-6">
                            <label htmlFor="mileage" className="form-label">Mileage</label>
                            <input
                                type="number"
                                className="form-control"
                                id="mileage"
                                name="mileage"
                                value={car.mileage}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Fuel Type */}
                        <div className="col-md-6">
                            <label htmlFor="fuelType" className="form-label">
                                Fuel Type
                            </label>
                            <select
                                className="form-select"
                                id="fuelType"
                                name="fuelType"
                                value={car.fuelType}
                                onChange={handleInputChange}
                                required
                            >
                                <option disabled value="">Choose...</option>
                                {["gasoline", "diesel", "electric", "hybrid"].map(item => (
                                    <option key={item} value={item}>
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <div className="valid-feedback"></div>
                        </div>

                        {/* AWD */}
                        <div className="col-md-6">
                            <label htmlFor="awd" className="form-label">
                                AWD
                            </label>
                            <select
                                className="form-select"
                                id="awd"
                                name="awd"
                                value={car.awd}
                                onChange={handleInputChange}
                            >
                                <option disabled value="">Choose...</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Leather Trimmed Upholstery */}
                        <div className="col-md-6">
                            <label htmlFor="leatherTrimmedUpholstery" className="form-label">
                                Leather Trimmed Upholstery
                            </label>
                            <select
                                className="form-select"
                                id="leatherTrimmedUpholstery"
                                name="leatherTrimmedUpholstery"
                                value={car.leatherTrimmedUpholstery}
                                onChange={handleInputChange}
                            >
                                <option disabled value="">Choose...</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Moon Roof */}
                        <div className="col-md-6">
                            <label htmlFor="moonroof" className="form-label">
                                Moon Roof
                            </label>
                            <select
                                className="form-select"
                                id="moonroof"
                                name="moonroof"
                                value={car.moonroof}
                                onChange={handleInputChange}
                            >
                                <option disabled value="">Choose...</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                            <div className="valid-feedback"></div>
                        </div>

                        {/* RAB */}
                        <div className="col-md-6">
                            <label htmlFor="rab" className="form-label">
                                RAB
                            </label>
                            <select
                                className="form-select"
                                id="rab"
                                name="rab"
                                value={car.rab}
                                onChange={handleInputChange}
                            >
                                <option disabled value="">Choose...</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Blind Spot Assist */}
                        <div className="col-md-6">
                            <label htmlFor="blindSpotAssist" className="form-label">
                                Blind Spot Assist
                            </label>
                            <select
                                className="form-select"
                                id="blindSpotAssist"
                                name="blindSpotAssist"
                                value={car.blindSpotAssist}
                                onChange={handleInputChange}
                            >
                                <option disabled value="">Choose...</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Keyless Entry System */}
                        <div className="col-md-6">
                            <label htmlFor="keylessEntrySystem" className="form-label">
                                Keyless Entry System
                            </label>
                            <select
                                className="form-select"
                                id="keylessEntrySystem"
                                name="keylessEntrySystem"
                                value={car.keylessEntrySystem}
                                onChange={handleInputChange}
                            >
                                <option disabled value="">Choose...</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Engine Displacement */}
                        <div className="col-md-6">
                            <label htmlFor="engineDisplacement" className="form-label">Engine Displacement</label>
                            <input
                                type="number"
                                className="form-control"
                                id="engineDisplacement"
                                name="engineDisplacement"
                                value={car.engineDisplacement}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Available */}
                        <div className="col-md-6">
                            <label htmlFor="available" className="form-label">
                                Available
                            </label>
                            <select
                                className="form-select"
                                id="available"
                                name="available"
                                value={car.available}
                                onChange={handleInputChange}
                                required
                            >
                                <option disabled value="">Choose...</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Description */}
                        <div className="col-md-12">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={car.description}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* Pictures */}
                        <div className="col-md-12">
                            <label htmlFor="picture" className="form-label">Pictures</label>
                            <div className="d-flex flex-wrap">
                                {console.log("pictures: ", pictures)}

                                {
                                    pictures
                                        .filter(picture => picture.operation === "add" || picture.operation === "update")
                                        .map(picture => (
                                            <ImagePreview
                                                key={picture.identityId}
                                                id={picture.identityId}
                                                imageUrl={picture.picture && URL.createObjectURL(picture.picture)}
                                                deleteImage={deleteImage}
                                                viewOnly={formState === adminConfig.formState.view}
                                            />
                                        ))
                                }

                                {
                                    formState !== adminConfig.formState.view &&
                                    <ImageUploader
                                        name="picture"
                                        uploadImage={uploadImage}
                                    />
                                }

                            </div>

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
