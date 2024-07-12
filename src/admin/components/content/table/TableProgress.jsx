import React from 'react'

function TableProgress({ percent }) {
    return (
        <div className="progress progress-xs">
            <div className="progress-bar progress-bar-danger" style={{ width: `${percent}%` }}>
            </div>
        </div>
    )
}

export default TableProgress
