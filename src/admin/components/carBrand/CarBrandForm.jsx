import React, { createRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { useLoading } from '../providers/LoadingProvider';
import { useMessage } from '../providers/MessageProvider';
import { base64ToFile } from '../../../utils/convertPicture';
import { adminConfig } from '../../../config/adminConfig';
import { getCarBrandById } from '../../../api/carBrandsApi';

function CarBrandForm({ formState, onSubmit }) {
    // const { setIsLoading } = useLoading();
    const { showMessage } = useMessage();
    const { carBrandId } = useParams();
    const formRef = createRef();

    const carBrandObj = {
        id: "",
        brandName: "",
        country: "",
        foundedYear: "",
        logo: null
    };

    const [carBrand, setCarBrand] = useState(carBrandObj);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchCarBrand = async () => {
            try {
                const carBrandData = await getCarBrandById(carBrandId);
                console.log("get carBrandData: ", carBrandData);

                carBrandData && setCarBrand({
                    id: carBrandData.id,
                    brandName: carBrandData.name,
                    country: carBrandData.country,
                    foundedYear: carBrandData.foundedYear,
                    logo: base64ToFile(carBrandData.logo, "converted.jpg")
                });

            } catch (error) {
                console.log("fetch editCarBrand error: ", error);
            }
        }

        carBrandId && fetchCarBrand();
    }, [carBrandId])

    useEffect(() => {
        console.log("logo: ", carBrand.logo);
        carBrand.logo && setImagePreview(URL.createObjectURL(carBrand.logo));
    }, [carBrand.logo])

    const clearForm = () => {
        setCarBrand(carBrandObj);
        setImagePreview(null);
        formRef.current.reset();
    }

    const handleInputChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const name = event.target.name;
        let value = event.target.value;

        setCarBrand({ ...carBrand, [name]: value })
    }

    const handleImageChange = (event) => {
        if (formState === adminConfig.formState.view) return;

        const selectedImage = event.target.files[0];
        setCarBrand({ ...carBrand, logo: selectedImage });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        onSubmit(carBrand, showMessage, clearForm);
    }

    return (
        <div className="card card-info card-outline mb-4">
            <div className="card-header">
                <div className="card-title">
                    {formState.charAt(0).toUpperCase() + formState.slice(1) + " Car Brands"}
                </div>
            </div>

            <form className="needs-validation" ref={formRef} onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="row g-3">
                        {/* Brand Name */}
                        <div className="col-md-6">
                            <label htmlFor="brandName" className="form-label">
                                Brand Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="brandName"
                                name="brandName"
                                value={carBrand.brandName}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* Country */}
                        <div className="col-md-6">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input
                                type="text"
                                className="form-control"
                                id="country"
                                name="country"
                                value={carBrand.country}
                                onChange={handleInputChange}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        {/* Founded Year */}
                        <div className="col-md-6">
                            <label
                                htmlFor="foundedYear"
                                className="form-label">Founded Year</label>
                            <input
                                type="text"
                                className="form-control"
                                id="foundedYear"
                                name="foundedYear"
                                value={carBrand.foundedYear}
                                onChange={handleInputChange}
                            />
                            <div className="invalid-feedback"></div>
                        </div>
                        {/* Logo */}
                        <div className="col-md-6">
                            <label htmlFor="validationCustom03" className="form-label" >Logo</label>
                            <div className="input-group has-validation">
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    className="form-control"
                                    id="logo"
                                    name="logo"
                                    // required
                                    onChange={handleImageChange}
                                />
                                <img src={imagePreview ? imagePreview : 'https://via.placeholder.com/38'} className="brand-icon" />
                                <div className="invalid-feedback"></div>
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

            {/* <!--begin::JavaScript-->
            <script is:inline>
                    // Example starter JavaScript for disabling form submissions if there are invalid fields
                    (() => {
                    "use strict";

                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                const forms =
                document.querySelectorAll(".needs-validation");

                      // Loop over them and prevent submission
                      Array.from(forms).forEach((form) => {
                    form.addEventListener(
                        "submit",
                        (event) => {
                            if (!form.checkValidity()) {
                                event.preventDefault();
                                event.stopPropagation();
                            }

                            form.classList.add("was-validated");
                        },
                        false
                    );
                      });
                    })();
            </script>
            <!--end::JavaScript--> */}
        </div>
    )
}

export default CarBrandForm
