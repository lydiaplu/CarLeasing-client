import React, { useRef } from 'react'

export default function ImageUploader({ name, uploadImage, required = false }) {
    const fileInputRef = useRef();

    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <div className="file-input-container" onClick={handleFileInputClick}>
            <i className="bi bi-plus-lg"></i>
            <input
                type="file"
                accept="image/jpeg, image/png"
                className="form-control"
                ref={fileInputRef}
                id={name}
                name={name}
                onChange={uploadImage}
                required={required}
            />
        </div>
    )
}
