import React from 'react'

function TableTrend({ color, trend, percent }) {
    return (
        // text-success, text-info, text-danger
        // bi-arrow-up, bi-arrow-down
        <small className="text-success me-1">
            <i className="bi bi-arrow-up"></i>
            {percent}%
        </small>
    )


}

export default TableTrend
