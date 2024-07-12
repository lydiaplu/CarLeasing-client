import React, { useState } from 'react'
import AlertModal from '../../../layout/AlertModal';

function TableDeleteButton({ deleteId, deleteHandle }) {
    const [showModal, setShowModal] = useState(false);

    const deleteClick = () => {
        setShowModal(true);
    }

    return (
        <>
            <span className="text-danger me-2">
                <button className="btn btn-danger btn-sm" onClick={deleteClick }>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </span>

            <AlertModal
                showModal={showModal}
                setShowModal={setShowModal}
                title="Warning"
                content="Are you sure delete?"
                onClick={()=>deleteHandle(deleteId)}
            />
        </>
    )
}

export default TableDeleteButton
