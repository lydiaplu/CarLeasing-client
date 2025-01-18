import React, { useState } from 'react'

export default function DateFilter({ filterInput, setFilterInput, queryCarData }) {
    const dateInputObj = {
        // CheckInDate: moment().format("YYYY-MM-DD"),
        // CheckOutDate: moment().add(3, 'days').format("YYYY-MM-DD")
        CheckInDate: "",
        CheckOutDate: ""
    }
    const [dateInput, setDateInput] = useState(dateInputObj)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const newDateInput = { ...dateInput, [name]: value }
        setDateInput(newDateInput)

        const newFilterInput = {
            ...filterInput,
            CheckInDate: newDateInput.CheckInDate,
            CheckOutDate: newDateInput.CheckOutDate
        }
        setFilterInput(newFilterInput)
        queryCarData(newFilterInput)
    }

    return (
        <div className='date-filter-container'>
            {/* Check-in Date */}
            <div className="form-label-wrap">
                <label htmlFor="CheckInDate" className="form-label">
                    Check-in Date
                </label>
                <input
                    type="date"
                    className="form-control"
                    id="CheckInDate"
                    name="CheckInDate"
                    value={dateInput.CheckInDate}
                    onChange={handleInputChange}
                />
            </div>

            {/* Check-out Date */}
            <div className="form-label-wrap">
                <label htmlFor="CheckOutDate" className="form-label">
                    Check-out Date
                </label>
                <input
                    type="date"
                    className="form-control"
                    id="CheckOutDate"
                    name="CheckOutDate"
                    value={dateInput.CheckOutDate}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}
