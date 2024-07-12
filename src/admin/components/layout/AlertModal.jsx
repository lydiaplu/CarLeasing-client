import React, { useState } from 'react'

export default function AlertModal({ showModal, setShowModal, title, content, onClick }) {
    const hideModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <div
                className="modal-backdrop fade show"
                style={{ display: showModal ? "block" : "none" }}
            ></div>

            <div
                className={`modal fade ${showModal ? "show" : ""}`}
                style={{ display: showModal ? "block" : "none" }}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {title}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={hideModal}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {content}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={hideModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={onClick}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
