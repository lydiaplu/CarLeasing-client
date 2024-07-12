import React from 'react'

function FilterButton({ clearFilter }) {
    return (
        <button className="btn btn-secondary" type="button" onClick={clearFilter}>
            Clear Filter
        </button>
    )
}

export default FilterButton
