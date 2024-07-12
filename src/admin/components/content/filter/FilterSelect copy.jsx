import React from 'react'

function FilterSelect({ label, options = [], selectedValue, setSelectedValue }) {
    const onChange = (event) => {
        setSelectedValue(event.target.value);
    }

    return (
        <select className="form-select" value={selectedValue} onChange={onChange}>
            <option value="">{`Filter ${label}...`}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default FilterSelect
