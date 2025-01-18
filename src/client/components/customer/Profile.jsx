import React, { createRef, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ImagePreview from '../common/image/ImagePreview';
import ImageUploader from '../common/image/ImageUploader';
import { editCustomer, getCustomerById, updateDriverLicensePhotos } from '../../../api/customerApi';
import { base64ToFile } from '../../../utils/convertPicture';
import { resizeImage } from '../../../utils/resizeImage';
import NoLogin from '../auth/NoLogin';

export default function Profile() {
    const currentCustomer = useSelector((state) => state.customer).currentCustomer;
    console.log("NavBar currentCustomer: ", currentCustomer);

    const { customerId } = useParams();
    const formRef = createRef();

    const profileObj = {
        email: "",
        firstName: "",
        lastName: "",
        middleName: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
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
    };

    const validInfoObj = {
        firstName: "",
        lastName: "",
        gender: "",
        phone: "",
        driverLicenseNumber: "",
        // driverLicenseFrontPhoto: "",
        // driverLicenseBackPhoto: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        emergencyContactPhone: ""
    };

    const [profile, setProfile] = useState(profileObj);
    const [validInfo, setValidInfo] = useState(validInfoObj);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const fetchData = await getCustomerById(customerId);
                console.log("get fetchData: ", fetchData);

                fetchData && setProfile({
                    ...fetchData,
                    driverLicenseFrontPhoto: base64ToFile(fetchData.driverLicenseFrontPhoto),
                    driverLicenseBackPhoto: base64ToFile(fetchData.driverLicenseBackPhoto),
                });
            } catch (error) {
                console.log("fetch error: ", error);
            }
        }

        customerId && fetchCustomer();
    }, [customerId])

    useEffect(() => {
        validForm();
    }, [profile])

    const handleInputChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;

        const updateProfile = { ...profile, [name]: value };
        setProfile(updateProfile);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validForm()) {
            return false;
        }

        try {
            console.log("profile: ", profile);
            const result = await editCustomer(profile.id, profile);

            if (result.status === 200) {
                // save pictures after add information. I did not find better way.
                try {
                    profile.driverLicenseFrontPhoto = profile.driverLicenseFrontPhoto && await resizeImage(profile.driverLicenseFrontPhoto, 800, 600, 0.7);
                    profile.driverLicenseBackPhoto = profile.driverLicenseBackPhoto && await resizeImage(profile.driverLicenseBackPhoto, 800, 600, 0.7);
                } catch (error) {
                    console.error('Error compressing the image', error);
                }

                await updateDriverLicensePhotos(result.data.id, profile.driverLicenseFrontPhoto, profile.driverLicenseBackPhoto);

                // showMessage("edit successfully!", "info");
            } else {
                // showMessage("Error adding!", "danger");
            }

        } catch (error) {
            // setValidInfo({ ...validInfo, allError: error })
        }
    }

    const validForm = (updateProfile = false) => {
        updateProfile = updateProfile || profile;
        const newValidInfo = { ...validInfo };

        Object.keys(validInfo).forEach((key) => {
            newValidInfo[key] = !updateProfile[key] ? `Please enter your ${key.replace(/([A-Z])/g, " $1").toLowerCase()}.` : "";
        });

        setValidInfo(newValidInfo);

        // if validInfo not empity, then it is not valid
        const isValid = Object.keys(newValidInfo).every((key) => newValidInfo[key] === "");
        console.log("isValid: ", isValid);
        return isValid;
    }

    const uploadDriverLicenseFrontPhoto = (event) => {
        setProfile({ ...profile, driverLicenseFrontPhoto: event.target.files[0] });
    }

    const deleteDriverLicenseFrontPhoto = () => {
        setProfile({ ...profile, driverLicenseFrontPhoto: null });
    }

    const uploadDriverLicenseBackPhoto = (event) => {
        setProfile({ ...profile, driverLicenseBackPhoto: event.target.files[0] });
    }

    const deleteDriverLicenseBackPhoto = () => {
        setProfile({ ...profile, driverLicenseBackPhoto: null });
    }

    return (
        <>
            {currentCustomer ? (
                <div className="profile-container" >
                    <main className="profile-wrap">
                        <div className="profile-title">
                            <h2>Profile</h2>
                        </div>

                        <div className="profile-form">
                            <form ref={formRef} onSubmit={handleSubmit}>
                                <div className="form-input-wrap">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-input readonly"
                                        id="email"
                                        name="email"
                                        value={profile.email}
                                        readOnly
                                    />
                                </div>

                                <div className="form-input-wrap required">
                                    <label htmlFor="firstName" className="form-label">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-input ${validInfo.firstName && "form-input-error"}`}
                                        id="firstName"
                                        name="firstName"
                                        value={profile.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="valid-feedback">{validInfo.firstName}</div>
                                </div>

                                <div className="form-input-wrap required">
                                    <label htmlFor="lastName" className="form-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-input ${validInfo.lastName && "form-input-error"}`}
                                        id="lastName"
                                        name="lastName"
                                        value={profile.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="valid-feedback">{validInfo.lastName}</div>
                                </div>

                                <div className="form-input-wrap">
                                    <label htmlFor="middleName" className="form-label">
                                        Middle Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        id="middleName"
                                        name="middleName"
                                        value={profile.middleName}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-input-wrap">
                                    <label htmlFor="gender" className="form-label">
                                        Gender
                                    </label>
                                    <select
                                        className="form-select"
                                        id="gender"
                                        name="gender"
                                        value={profile.gender}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="nonbinary">Nonbinary</option>
                                        <option value="other">Other</option>
                                        <option value="genderfluid">Genderfluid</option>
                                        <option value="prefer_not_to_say">Prefer not to say</option>
                                    </select>
                                </div>

                                <div className="form-input-wrap">
                                    <label htmlFor="dateOfBirth" className="form-label">
                                        Date Of Birth
                                    </label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        value={profile.dateOfBirth}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-input-wrap required">
                                    <label htmlFor="phone" className="form-label">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-input ${validInfo.phone && "form-input-error"}`}
                                        id="phone"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="valid-feedback">{validInfo.phone}</div>
                                </div>

                                {/* emergencyContactPhone */}
                                <div className="form-input-wrap required">
                                    <label htmlFor="emergencyContactPhone" className="form-label">
                                        Emergency Contact Phone
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-input ${validInfo.emergencyContactPhone && "form-input-error"}`}
                                        id="emergencyContactPhone"
                                        name="emergencyContactPhone"
                                        value={profile.emergencyContactPhone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="valid-feedback">{validInfo.emergencyContactPhone}</div>
                                </div>

                                {/* driverLicenseNumber */}
                                <div className="form-input-wrap required">
                                    <label htmlFor="driverLicenseNumber" className="form-label">
                                        Driver's License Number
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-input ${validInfo.driverLicenseNumber && "form-input-error"}`}
                                        id="driverLicenseNumber"
                                        name="driverLicenseNumber"
                                        value={profile.driverLicenseNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="valid-feedback">{validInfo.driverLicenseNumber}</div>
                                </div>

                                {/* drivingYears */}
                                <div className="form-input-wrap">
                                    <label htmlFor="drivingYears" className="form-label">
                                        Driving Years
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        id="drivingYears"
                                        name="drivingYears"
                                        value={profile.drivingYears}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* creditScore */}
                                <div className="form-input-wrap">
                                    <label htmlFor="creditScore" className="form-label">
                                        Credit Score
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        id="creditScore"
                                        name="creditScore"
                                        value={profile.creditScore}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* address */}
                                <div className="form-input-wrap required">
                                    <label htmlFor="address" className="form-label">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-input ${validInfo.address && "form-input-error"}`}
                                        id="address"
                                        name="address"
                                        value={profile.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="valid-feedback">{validInfo.address}</div>
                                </div>

                                {/* city */}
                                <div className="form-input-wrap required">
                                    <label htmlFor="city" className="form-label">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-input ${validInfo.city && "form-input-error"}`}
                                        id="city"
                                        name="city"
                                        value={profile.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="valid-feedback">{validInfo.city}</div>
                                </div>

                                {/* state */}
                                <div className="form-input-wrap required">
                                    <label htmlFor="state" className="form-label">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-input ${validInfo.state && "form-input-error"}`}
                                        id="state"
                                        name="state"
                                        value={profile.state}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="valid-feedback">{validInfo.state}</div>
                                </div>

                                {/* country */}
                                <div className="form-input-wrap required">
                                    <label htmlFor="country" className="form-label">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-input ${validInfo.country && "form-input-error"}`}
                                        id="country"
                                        name="country"
                                        value={profile.country}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="valid-feedback">{validInfo.country}</div>
                                </div>

                                {/* postalCode */}
                                <div className="form-input-wrap required">
                                    <label htmlFor="postalCode" className="form-label">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-input ${validInfo.postalCode && "form-input-error"}`}
                                        id="postalCode"
                                        name="postalCode"
                                        value={profile.postalCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="valid-feedback">{validInfo.postalCode}</div>
                                </div>

                                {/* driverLicenseFrontPhoto */}
                                <div className="form-input-wrap required">
                                    <label htmlFor="driverLicenseFrontPhoto" className="form-label">
                                        Driver's License Front Photo
                                    </label>
                                    <div className="d-flex flex-wrap">
                                        {
                                            profile.driverLicenseFrontPhoto &&
                                            <ImagePreview
                                                id={null}
                                                imageUrl={URL.createObjectURL(profile.driverLicenseFrontPhoto)}
                                                deleteImage={deleteDriverLicenseFrontPhoto}
                                            />
                                        }

                                        {
                                            !profile.driverLicenseFrontPhoto &&
                                            <ImageUploader
                                                name="picture"
                                                uploadImage={uploadDriverLicenseFrontPhoto}
                                                // required={true}
                                                isValid={!validInfo.driverLicenseFrontPhoto}
                                            />
                                        }

                                        <div className="valid-feedback">{validInfo.driverLicenseFrontPhoto}</div>
                                    </div>
                                </div>

                                {/* driverLicenseBackPhoto */}
                                <div className="form-input-wrap required">
                                    <label htmlFor="driverLicenseBackPhoto" className="form-label">
                                        Driver's License Back Photo
                                    </label>
                                    <div className="d-flex flex-wrap">
                                        {
                                            profile.driverLicenseBackPhoto &&
                                            <ImagePreview
                                                id={null}
                                                imageUrl={URL.createObjectURL(profile.driverLicenseBackPhoto)}
                                                deleteImage={deleteDriverLicenseBackPhoto}
                                            />
                                        }

                                        {
                                            !profile.driverLicenseBackPhoto &&
                                            <ImageUploader
                                                name="picture"
                                                uploadImage={uploadDriverLicenseBackPhoto}
                                                // required={true}
                                                isValid={!validInfo.driverLicenseBackPhoto}
                                            />
                                        }

                                        <div className="valid-feedback">{validInfo.driverLicenseBackPhoto}</div>
                                    </div>
                                </div>

                                <button className="btn submit-btn" type="submit">Save</button>
                            </form>
                        </div>
                    </main>
                </div >
            ) : (
                <NoLogin />
            )}
        </>
    )
}
