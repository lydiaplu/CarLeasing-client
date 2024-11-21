import React, { useEffect, useState } from 'react'
import CarTypeFilterBar from '../../common/filter/CarTypeFilterBar'
import moment from 'moment'

export default function CarSearchForm({ queryCarData }) {
    const searchInputObj = {
        CheckInDate: moment().format("YYYY-MM-DD"),
        CheckOutDate: moment().add(3, 'days').format("YYYY-MM-DD"),
        fuelType: "",
        carBrand: "",
        model: "",
        carType: ""
    }

    const [searchInput, setSearchInput] = useState(searchInputObj)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const newSearchInput = { ...searchInput, [name]: value }
        setSearchInput(newSearchInput)
        queryCarData(newSearchInput);
    }

    const handleCarTypeFilterChange = (newSearchInput) => {
        setSearchInput(newSearchInput);
        queryCarData(newSearchInput);
    };

    return (
        <>
            <form>
                <div className='container search-container'>
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
                            value={searchInput.CheckInDate}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="valid-feedback"></div>
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
                            value={searchInput.CheckOutDate}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="valid-feedback"></div>
                    </div>

                    {/* Fuel Type */}
                    <div className="form-label-wrap">
                        <label htmlFor="fuelType" className="form-label">
                            Fuel Type
                        </label>

                        <select
                            className="form-select"
                            id="fuelType"
                            name="fuelType"
                            value={searchInput.fuelType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">All</option>
                            {["gasoline", "diesel", "electric", "hybrid"].map(item => (
                                <option key={item} value={item}>
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </option>
                            ))}
                        </select>
                        <div className="valid-feedback"></div>
                    </div>

                    <CarTypeFilterBar
                        searchBarData={searchInput}
                        setSearchBarData={handleCarTypeFilterChange} />
                </div>
            </form>
        </>
    )
}
