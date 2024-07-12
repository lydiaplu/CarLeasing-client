import React, { useState } from 'react'
import CarTypeFilterBar from '../common/filter/CarTypeFilterBar'
import SearchCarCarousel from '../common/carousel/SearchCarCarousel'

export default function CarSearch() {
    const searchInputObj = {
        CheckInDate: "",
        CheckOutDate: "",
        fuelType: "",
        carBrand: "",
        model: "",
        carType: ""
    }

    const [searchInput, setSearchInput] = useState(searchInputObj)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSearchInput({ ...searchInput, [name]: value })
    }

    return (
        <div className='car-search'>
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
                        setSearchBarData={setSearchInput} />
                </div>
            </form>

            <SearchCarCarousel searchInput={searchInput} />
        </div>
    )
}
