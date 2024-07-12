import React, { createRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { useMessage } from '../providers/MessageProvider';
import { base64ToFile } from '../../../utils/convertPicture';
import { adminConfig } from '../../../config/adminConfig';
import { getCustomerById } from '../../../api/customerApi';

import ImageUploader from '../content/image/ImageUploader';
import ImagePreview from '../content/image/ImagePreview';

export default function CustomerForm({ formState, onSubmit }) {
    const { showMessage } = useMessage();
    const { customerId } = useParams();
    const formRef = createRef();

    const customerObj = {
        firstName: "",
        lastName: "",
        middleName: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        driverLicenseNumber: "",
        driverLicenseFrontPhoto: null,
        driverLicenseBackPhoto: null,
        creditScore: "",
        drivingYears: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        emergencyContactPhone: "",
        isDisabled: "",
        disabilityDescription: "",
        registrationDate: ""
    }

    const [customer, setCustomer] = useState(customerObj);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const fetchData = await getCustomerById(customerId);
                console.log("get fetchData: ", fetchData);

                fetchData && setCustomer({
                    ...fetchData,
                    confirmPassword: fetchData.password,
                    driverLicenseFrontPhoto: base64ToFile(fetchData.driverLicenseFrontPhoto),
                    driverLicenseBackPhoto: base64ToFile(fetchData.driverLicenseBackPhoto),
                });
            } catch (error) {
                console.log("fetch error: ", error);
            }
        }

        customerId && fetchCar();
    }, [customerId])

    const clearForm = () => {
        setCustomer(customerObj);
        formRef.current.reset();
    }

    const handleInputChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const name = event.target.name;
        let value = event.target.value;

        setCustomer({ ...customer, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit(customer, showMessage, clearForm);
    }

    const uploadDriverLicenseFrontPhoto = (event) => {
        setCustomer({ ...customer, driverLicenseFrontPhoto: event.target.files[0] });
    }

    const deleteDriverLicenseFrontPhoto = () => {
        setCustomer({ ...customer, driverLicenseFrontPhoto: null });
    }

    const uploadDriverLicenseBackPhoto = (event) => {
        setCustomer({ ...customer, driverLicenseBackPhoto: event.target.files[0] });
    }

    const deleteDriverLicenseBackPhoto = () => {
        setCustomer({ ...customer, driverLicenseBackPhoto: null });
    }

    return (
        <div className="card card-info card-outline mb-4">
            <div className="card-header">
                <div className="card-title">
                    {formState.charAt(0).toUpperCase() + formState.slice(1) + " Customer"}
                </div>
            </div>

            <form className="needs-validation" ref={formRef} onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="row g-3">
                        {/* firstName */}
                        <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={customer.firstName}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* lastName */}
                        <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={customer.lastName}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* middleName */}
                        <div className="col-md-6">
                            <label htmlFor="middleName" className="form-label">
                                Middle Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="middleName"
                                name="middleName"
                                value={customer.middleName}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* email */}
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={customer.email}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* password */}
                        {formState === adminConfig.formState.add &&
                            <div className="col-md-6">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={customer.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="valid-feedback"></div>
                            </div>
                        }

                        {/* confirm password */}
                        {formState === adminConfig.formState.add &&
                            <div className="col-md-6">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={customer.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="valid-feedback"></div>
                            </div>
                        }

                        {/* gender */}
                        <div className="col-md-6">
                            <label htmlFor="gender" className="form-label">
                                Gender
                            </label>
                            <select
                                className="form-select"
                                id="gender"
                                name="gender"
                                value={customer.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Choose...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="nonbinary">Nonbinary</option>
                                <option value="other">Other</option>
                                <option value="genderfluid">Genderfluid</option>
                                <option value="prefer_not_to_say">Prefer not to say</option>
                            </select>
                            <div className="valid-feedback"></div>
                        </div>

                        {/* dateOfBirth */}
                        <div className="col-md-6">
                            <label htmlFor="dateOfBirth" className="form-label">
                                Date Of Birth
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={customer.dateOfBirth}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* phone */}
                        <div className="col-md-6">
                            <label htmlFor="phone" className="form-label">
                                Phone
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={customer.phone}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* emergencyContactPhone */}
                        <div className="col-md-6">
                            <label htmlFor="emergencyContactPhone" className="form-label">
                                Emergency Contact Phone
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="emergencyContactPhone"
                                name="emergencyContactPhone"
                                value={customer.emergencyContactPhone}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* driverLicenseNumber */}
                        <div className="col-md-6">
                            <label htmlFor="driverLicenseNumber" className="form-label">
                                Driver's License Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="driverLicenseNumber"
                                name="driverLicenseNumber"
                                value={customer.driverLicenseNumber}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* drivingYears */}
                        <div className="col-md-6">
                            <label htmlFor="drivingYears" className="form-label">
                                Driving Years
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="drivingYears"
                                name="drivingYears"
                                value={customer.drivingYears}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* creditScore */}
                        <div className="col-md-6">
                            <label htmlFor="creditScore" className="form-label">
                                Credit Score
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="creditScore"
                                name="creditScore"
                                value={customer.creditScore}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* address */}
                        <div className="col-md-6">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={customer.address}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* city */}
                        <div className="col-md-6">
                            <label htmlFor="city" className="form-label">
                                City
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                value={customer.city}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* state */}
                        <div className="col-md-6">
                            <label htmlFor="state" className="form-label">
                                State
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="state"
                                name="state"
                                value={customer.state}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* country */}
                        <div className="col-md-6">
                            <label htmlFor="country" className="form-label">
                                Country
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="country"
                                name="country"
                                value={customer.country}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* postalCode */}
                        <div className="col-md-6">
                            <label htmlFor="postalCode" className="form-label">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="postalCode"
                                name="postalCode"
                                value={customer.postalCode}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* registrationDate */}
                        {formState !== adminConfig.formState.add &&
                            <div className="col-md-6">
                                <label htmlFor="registrationDate" className="form-label">
                                    Registration Date
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="registrationDate"
                                    name="registrationDate"
                                    value={customer.registrationDate}
                                    onChange={handleInputChange}
                                    disabled
                                />
                                <div className="valid-feedback"></div>
                            </div>
                        }

                        {/* isDisabled */}
                        {formState !== adminConfig.formState.add &&
                            <div className="col-md-6">
                                <label htmlFor="isDisabled" className="form-label">
                                    Is Disabled
                                </label>
                                <select
                                    className="form-select"
                                    id="isDisabled"
                                    name="isDisabled"
                                    value={customer.isDisabled}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Choose...</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                                <div className="valid-feedback"></div>
                            </div>
                        }

                        {/* disabilityDescription */}
                        {formState !== adminConfig.formState.add &&
                            <div className="col-md-12">
                                <label htmlFor="disabilityDescription" className="form-label">
                                    Disability Description
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="disabilityDescription"
                                    name="disabilityDescription"
                                    value={customer.disabilityDescription}
                                    onChange={handleInputChange}
                                />
                                <div className="valid-feedback"></div>
                            </div>
                        }

                        {/* driverLicenseFrontPhoto */}
                        <div className="col-md-6">
                            <label htmlFor="driverLicenseFrontPhoto" className="form-label">
                                Driver's License Front Photo
                            </label>
                            <div className="d-flex flex-wrap">
                                {
                                    customer.driverLicenseFrontPhoto &&
                                    <ImagePreview
                                        id={null}
                                        imageUrl={URL.createObjectURL(customer.driverLicenseFrontPhoto)}
                                        deleteImage={deleteDriverLicenseFrontPhoto}
                                        viewOnly={formState === adminConfig.formState.view}
                                    />
                                }

                                {
                                    !customer.driverLicenseFrontPhoto &&
                                    <ImageUploader
                                        name="picture"
                                        uploadImage={uploadDriverLicenseFrontPhoto}
                                    />
                                }
                            </div>
                        </div>

                        {/* driverLicenseBackPhoto */}
                        <div className="col-md-6">
                            <label htmlFor="driverLicenseBackPhoto" className="form-label">
                                Driver's License Back Photo
                            </label>
                            <div className="d-flex flex-wrap">
                                {
                                    customer.driverLicenseBackPhoto &&
                                    <ImagePreview
                                        id={null}
                                        imageUrl={URL.createObjectURL(customer.driverLicenseBackPhoto)}
                                        deleteImage={deleteDriverLicenseBackPhoto}
                                        viewOnly={formState === adminConfig.formState.view}
                                    />
                                }

                                {
                                    !customer.driverLicenseBackPhoto &&
                                    <ImageUploader
                                        name="picture"
                                        uploadImage={uploadDriverLicenseBackPhoto}
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
