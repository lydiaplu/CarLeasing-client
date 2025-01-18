import React, { useEffect, useState } from 'react'
import DateFilter from './Filter/dateFilter'
import CarTypeFilter from './filter/CarTypeFilter'
import CarBrandFilter from './filter/CarBrandFilter'
import { getAllCars, getCarByCheckInOutDataAndFuletypeBrandModelType } from '../../../api/carApi'
import CarRow from '../common/carRow/CarRow'

export default function BrowseAllCars() {
    const filterInputObj = {
        CheckInDate: "",
        CheckOutDate: "",
        fuelType: "",
        carBrand: "",
        model: "",
        carType: "",
    };
    const [filterInput, setFilterInput] = useState(filterInputObj);
    const [carData, setCarData] = useState([]);

    useEffect(() => {
        const fetchCarBrands = async () => {
            try {
                const result = await getAllCars();
                console.log("BrowseAllCars result: ", result);
                setCarData(result);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchCarBrands();
    }, [])

    const queryCarData = async (filterInput) => {
        const queryData = await getCarByCheckInOutDataAndFuletypeBrandModelType(filterInput);
        setCarData(queryData);
    }

    return (
        <div className='browse-all-cars-container'>
            <div className='browse-all-cars-content'>
                <div className='filter-container'>
                    <form>
                        <div className='filter-part'>
                            <h5 className='filter-part-label'>Rent Date</h5>
                            <div className='filter-part-form'>
                                <DateFilter
                                    filterInput={filterInput}
                                    setFilterInput={setFilterInput}
                                    queryCarData={queryCarData}
                                />
                            </div>
                        </div>

                        <div className='filter-part'>
                            <h5 className='filter-part-label'>Car Type</h5>
                            <div className='filter-part-form'>
                                <CarTypeFilter
                                    filterInput={filterInput}
                                    setFilterInput={setFilterInput}
                                    queryCarData={queryCarData}
                                />
                            </div>
                        </div>

                        <div className='filter-part'>
                            <h5 className='filter-part-label'>Car Brand</h5>
                            <div className='filter-part-form'>
                                <CarBrandFilter
                                    filterInput={filterInput}
                                    setFilterInput={setFilterInput}
                                    queryCarData={queryCarData}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className='list-container'>
                    {carData && carData.map((item) => (
                        <CarRow car={item} key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}
