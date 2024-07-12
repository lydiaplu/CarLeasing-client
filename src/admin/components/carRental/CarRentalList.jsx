import React, { useEffect, useMemo, useState } from 'react'

import { useMessage } from '../providers/MessageProvider'
import { adminConfig } from '../../../config/adminConfig';
import { getAllCarRentals } from '../../../api/carRentalApi';
import { getAllModelOptions } from '../../../api/carApi';
import { getAllCarBrandsOptions } from '../../../api/carBrandsApi';
// import { getAllCarTypesOptions } from '../../../api/carTypesApi';

import TablePlaceholder from "../content/table/TablePlaceholder"
import ContentTable from '../content/table/ContentTable'
import TableViewButton from '../content/table/button/TableViewButton';
import TableEditButton from '../content/table/button/TableEditButton';
import TableDeleteButton from '../content/table/button/TableDeleteButton';
import TablePaginator from '../content/table/TablePaginator';
import FilterButton from '../content/filter/FilterButton';
import FilterSelect from '../content/filter/FilterSelect';
import CarTypeFilterBar from '../content/carCascadeFilterForm/CarTypeFilterBar';

export default function CarRentalList() {
    const TABLE_HEADER = {
        id: "No.",
        rentalDate: "Rental Date",
        returnDate: "Return Date",

        customerName: "Customer Name",
        customerEmail: "Customer Email",
        customerDriverLinceseNumber: "Driver Lincese Number",

        carBrand: "Car Brand",
        carModel: "Car Model",
        carYear: "Car Year",
        carLicensePlate: "License Plate",
        carColor: "Car Color",
        operations: "Operations"
    }
    const ITEMS_PER_PAGE = adminConfig.itemsPerPage;

    const { showMessage } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    // data part
    const [carRentals, setCarRentals] = useState([]);
    // paginator data part
    const [currentPage, setCurrentPage] = useState(1);

    // select form part
    const searchBarDataObj = {
        selectedCarBrand: "",
        selectedModel: "",
        selectedCarType: ""
    }
    const [searchedCustomerName, setSearchedCustomerName] = useState("");
    const [searchedDriverLicenseNumber, setSearchedDriverLicenseNumber] = useState("");
    const [searchBarData, setSearchBarData] = useState(searchBarDataObj);
    const [uniqueKey, setUniqueKey] = useState(Date.now());

    // GET data from database
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const result = await getAllCarRentals();
                console.log("fetchData result: ", result);
                setCarRentals(result);
            } catch (error) {
                showMessage(error.message, adminConfig.colorEmun.danger);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [searchedCustomerName, searchedDriverLicenseNumber, searchBarData])

    const filteredData = useMemo(() => {
        return carRentals.filter((item) => (
            (!searchedCustomerName || `${item.customer.firstName} ${item.customer.middleName} ${item.customer.lastName}`.toLowerCase().includes(searchedCustomerName))
            && (!searchedDriverLicenseNumber || item.customer.driverLicenseNumber.toLowerCase().includes(searchedDriverLicenseNumber))
            && (!searchBarData.selectedCarBrand || item.car.carBrand.id.toString() === searchBarData.selectedCarBrand)
            && (!searchBarData.selectedModel || item.car.model === searchBarData.selectedModel)
            && (!searchBarData.selectedCarType || item.car.carType.id.toString() === searchBarData.selectedCarType)
        ))
    }, [carRentals, searchedCustomerName, searchedDriverLicenseNumber, searchBarData])

    const currentData = useMemo(() => {
        const indexOfLastData = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstData = indexOfLastData - ITEMS_PER_PAGE;
        return filteredData.slice(indexOfFirstData, indexOfLastData)
    }, [currentPage, filteredData, ITEMS_PER_PAGE]);

    // table part
    const tableHeaderHtml = () => {
        return Object.values(TABLE_HEADER).map((item, index) => {
            if (item === "Operations") {
                return <th className="fixed-column last-fixed-column" key={index}>{item}</th>
            } else {
                return <th key={index}>{item}</th>
            }
        })
    }

    const tableBodyHtml = () => {
        return currentData.map((item, index) => (
            <tr className="align-middle" key={item.id}>
                <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>

                <td>{item.rentalDate}</td>
                <td>{item.returnDate}</td>

                <td>{`${item.customer.firstName} ${item.customer.middleName} ${item.customer.lastName}`}</td>
                <td>{item.customer.email}</td>
                <td>{item.customer.driverLinceseNumber}</td>

                <td>{item.car.carBrand.name}</td>
                <td>{item.car.model}</td>
                <td>{item.car.year}</td>
                <td>{item.car.licensePlate}</td>
                <td>{item.car.color}</td>

                <td className="fixed-column last-fixed-column">
                    {<TableViewButton link={`view/${item.id}`} />}
                    {/* {<TableDeleteButton deleteId={item.id} deleteHandle={handleDelete} />} */}
                </td>
            </tr>
        ))
    }

    // const handleDelete = async (carRentalId) => {
    //     try {
    //         const result = await deleteCar(carRentalId);
    //         if (result === "") {
    //             showMessage(`Car Rental was deleted!`, adminConfig.colorEnum.success);
    //             setCarRentals(carRentals.filter(item => item.id !== carRentalId));
    //         }
    //     } catch (error) {
    //         showMessage(error.message, adminConfig.colorEmun.danger);
    //     }
    // }

    // filter part
    const clearFilter = () => {
        setSearchedCustomerName("");
        setSearchedDriverLicenseNumber("");
        setSearchBarData(searchBarDataObj);
        setUniqueKey(Date.now());
    }

    return (
        <>
            <section className="row">
                <div className="row col-sm-12">
                    <div className='row col-sm-10'>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                name="searchedCustomerName"
                                placeholder="Customer Name"
                                value={searchedCustomerName}
                                onChange={(event) => { setSearchedCustomerName(event.target.value) }}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                name="searchedDriverLicenseNumber"
                                placeholder="Driver License Number"
                                value={searchedDriverLicenseNumber}
                                onChange={(event) => { setSearchedDriverLicenseNumber(event.target.value) }}
                            />
                            <div className="valid-feedback"></div>
                        </div>

                        <CarTypeFilterBar
                            key={uniqueKey}
                            searchBarData={searchBarData}
                            setSearchBarData={setSearchBarData}
                        />
                    </div>
                    <div className='col-sm-2 d-flex align-items-end'>
                        <FilterButton clearFilter={clearFilter} />
                    </div>
                </div>
                {/* <div className="col-sm-2 d-flex justify-content-end align-items-end">
                <Link to="add" className="btn btn-success">
                    <i className="bi bi-plus-circle pe-2"></i>
                    Add Car
                </Link>
            </div> */}
            </section >

            {
                isLoading ? (<TablePlaceholder />) : (
                    <>
                        <ContentTable tableHeaderHtml={tableHeaderHtml} tableBodyHtml={tableBodyHtml} />
                        <TablePaginator
                            data={filteredData}
                            // setCurrentData={setCurrentData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            itemsPerPage={ITEMS_PER_PAGE}
                        />
                    </>
                )
            }
        </>
    )
}