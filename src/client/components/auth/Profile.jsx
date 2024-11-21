import React, { useState } from 'react'
import ImagePreview from '../common/image/ImagePreview';
import ImageUploader from '../common/image/ImageUploader';

export default function Profile() {
    const profileObj = {};
    const [profile, setProfile] = useState(profileObj);

    const handleInputChange = (event) => {

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
        <div className="profile-container">
            <main className="profile-wrap">
                <div className="profile-title">
                    <h2>Profile</h2>
                </div>

                <div className="profile-form">
                    <form>
                        <div className="form-input-wrap">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-input readonly"
                                id="email"
                                name="email"
                                readOnly
                            />
                        </div>

                        <div className="form-input-wrap required">
                            <label htmlFor="firstName" className="form-label">
                                First Name
                            </label>
                            <input
                                type="firstName"
                                className="form-input"
                                id="firstName"
                                name="firstName"
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        <div className="form-input-wrap required">
                            <label htmlFor="lastName" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="lastName"
                                className="form-input"
                                id="lastName"
                                name="lastName"
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        <div className="form-input-wrap">
                            <label htmlFor="middleName" className="form-label">
                                Middle Name
                            </label>
                            <input
                                type="middleName"
                                className="form-input"
                                id="middleName"
                                name="middleName"
                            />
                        </div>

                        <div className="form-input-wrap">
                            <label htmlFor="gender" className="form-label">
                                Gender
                            </label>
                            <select
                                className="form-input"
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
                            <div className="valid-feedback"></div>
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
                            <div className="valid-feedback"></div>
                        </div>

                        <div className="form-input-wrap required">
                            <label htmlFor="phone" className="form-label">
                                Phone
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="phone"
                                name="phone"
                                value={profile.phone}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* emergencyContactPhone */}
                        <div className="form-input-wrap required">
                            <label htmlFor="emergencyContactPhone" className="form-label">
                                Emergency Contact Phone
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="emergencyContactPhone"
                                name="emergencyContactPhone"
                                value={profile.emergencyContactPhone}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* driverLicenseNumber */}
                        <div className="form-input-wrap required">
                            <label htmlFor="driverLicenseNumber" className="form-label">
                                Driver's License Number
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="driverLicenseNumber"
                                name="driverLicenseNumber"
                                value={profile.driverLicenseNumber}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
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
                            <div className="valid-feedback"></div>
                        </div>

                        {/* creditScore */}
                        <div className="form-input-wrap required">
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
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* address */}
                        <div className="form-input-wrap required">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="address"
                                name="address"
                                value={profile.address}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* city */}
                        <div className="form-input-wrap required">
                            <label htmlFor="city" className="form-label">
                                City
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="city"
                                name="city"
                                value={profile.city}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* state */}
                        <div className="form-input-wrap required">
                            <label htmlFor="state" className="form-label">
                                State
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="state"
                                name="state"
                                value={profile.state}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* country */}
                        <div className="form-input-wrap required">
                            <label htmlFor="country" className="form-label">
                                Country
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="country"
                                name="country"
                                value={profile.country}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        {/* postalCode */}
                        <div className="form-input-wrap required">
                            <label htmlFor="postalCode" className="form-label">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="postalCode"
                                name="postalCode"
                                value={profile.postalCode}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
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
                                        required={true}
                                    />
                                }
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
                                        required={true}
                                    />
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}
