import React from 'react'

function ContentHeader() {
    return (
        <div className="app-content-header">
            {/* <!--begin::Container--> */}
            <div className="container-fluid">
                {/* <!--begin::Row--> */}
                <div className="row">
                    <div className="col-sm-6">
                        <h3 className="mb-0">Dashboard</h3>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-end">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Dashboard
                            </li>
                        </ol>
                    </div>
                </div>
                {/* <!--end::Row--> */}
            </div>
            {/* <!--end::Container--> */}
        </div>
    )
}

export default ContentHeader
