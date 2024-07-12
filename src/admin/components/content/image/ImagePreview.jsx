import React from 'react'

export default function ImagePreview({ id, imageUrl, deleteImage, viewOnly }) {

    const deleteImageFunc = () => {
        console.log("deleteImageFunc id:", id)
        deleteImage(id)
    }
    return (
        <div className="imagePreview-container">
            {!viewOnly && <i className="bi bi-x-circle" onClick={deleteImageFunc}></i>}
            <img
                id={id}
                src={imageUrl}
            />
        </div>
    )
}
