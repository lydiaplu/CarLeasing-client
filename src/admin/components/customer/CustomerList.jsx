import React, { useEffect, useMemo, useState } from 'react'

import { useMessage } from '../providers/MessageProvider'
import { adminConfig } from '../../../config/adminConfig';
import { deleteCustomer, getAllCustomers } from '../../../api/customerApi';

import TablePlaceholder from "../content/table/TablePlaceholder"
import ContentTable from '../content/table/ContentTable'
import TableViewButton from '../content/table/button/TableViewButton';
import TableEditButton from '../content/table/button/TableEditButton';
import TableDeleteButton from '../content/table/button/TableDeleteButton';
import TablePaginator from '../content/table/TablePaginator';
import FilterButton from '../content/filter/FilterButton';
import FilterSelect from '../content/filter/FilterSelect';
import { Link } from 'react-router-dom';


export default function CustomerList() {
    const TABLE_HEADER = {
        id: "No.",
        name: "Name",
        // firstName: "First Name",
        // lastName: "Last Name",
        // middleName: "Middle Name",
        gender: "Gender",
        dateOfBirth: "Date Of Birth",
        phone: "Phone",
        email: "Email",
        // password: "Password",
        driverLicenseNumber: "Driver License Number",
        // driverLicenseFrontPhoto: "Driver License Front Photo",
        // driverLicenseBackPhoto: "Driver License Back Photo",
        creditScore: "Credit Score",
        drivingYears: "Driving Years",
        address: "Address",
        city: "City",
        state: "State",
        country: "Country",
        postalCode: "Postal Code",
        emergencyContactPhone: "Emergency Contact Phone",
        registrationDate: "Registration Date",
        isDisabled: "Is Disabled",
        disabilityDescription: "Disability Description",
        operations: "Operations"
    }

    const ITEMS_PER_PAGE = adminConfig.itemsPerPage;

    const { showMessage } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    // data part
    const [customers, setCustomers] = useState([]);
    // paginator data part
    const [currentPage, setCurrentPage] = useState(1);

    // select form part
    const [searchedFirstName, setSearchedFirstName] = useState("");
    const [searchedLastName, setSearchedLastName] = useState("");
    const [searchedDriverLicenseNumber, setSearchedDriverLicenseNumber] = useState("");
    const [selectedIsDisabled, setSelectedIsDisabled] = useState("");

    // GET data from database
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const result = await getAllCustomers();
                console.log("customers result: ", result);
                setCustomers(result);
            } catch (error) {
                showMessage(error.message, adminConfig.colorEmun.danger);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [searchedFirstName, searchedLastName, searchedDriverLicenseNumber, selectedIsDisabled])

    const filteredData = useMemo(() => {
        return customers.filter((item) => (
            (!searchedFirstName || item.firstName.toLowerCase().includes(searchedFirstName))
            && (!searchedLastName || item.lastName.toLowerCase().includes(searchedLastName))
            && (!searchedDriverLicenseNumber || item.driverLicenseNumber.toLowerCase().includes(searchedDriverLicenseNumber))
            // && (!selectedIsDisabled || item.isDisabled === selectedIsDisabled)
        ))
    }, [customers, searchedFirstName, searchedLastName, searchedDriverLicenseNumber, selectedIsDisabled])

    const currentData = useMemo(() => {
        const indexOfLastData = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstData = indexOfLastData - ITEMS_PER_PAGE;
        return filteredData.slice(indexOfFirstData, indexOfLastData)
    }, [currentPage, filteredData, ITEMS_PER_PAGE]);

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
                <td>{`${item.firstName} ${item.middleName} ${item.lastName}`}</td>
                <td>{item.gender}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.driverLicenseNumber}</td>
                <td>{item.creditScore}</td>
                <td>{item.drivingYears}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.country}</td>
                <td>{item.postalCode}</td>
                <td>{item.emergencyContactPhone}</td>
                <td>{item.registrationDate}</td>
                <td>{item.isDisabled === null ? "-" : (item.isDisabled === "true" ? "Yes" : "No")}</td>
                <td>{item.disabilityDescription}</td>

                <td className="fixed-column last-fixed-column">
                    {<TableViewButton link={`view/${item.id}`} />}
                    {<TableEditButton link={`edit/${item.id}`} />}
                    {<TableDeleteButton deleteId={item.id} deleteHandle={handleDelete} />}
                </td>
            </tr>
        ))
    }

    const handleDelete = async (customerId) => {
        try {
            const result = await deleteCustomer(customerId);
            if (result === "") {
                showMessage(`Customer was deleted!`, adminConfig.colorEnum.success);
                setCustomers(customers.filter(item => item.id !== customerId));
            }
        } catch (error) {
            showMessage(error.message, adminConfig.colorEmun.danger);
        }
    }

    // filter part
    const clearFilter = () => {
        setSearchedFirstName("");
        setSearchedLastName("");
        setSearchedDriverLicenseNumber("");
        setSelectedIsDisabled("");
    }

    return (
        <>
            <section className="row">
                <div className="row col-sm-10">
                    <div className='row col-sm-10'>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                name="searchedFirstName"
                                placeholder="First Name"
                                value={searchedFirstName}
                                onChange={(event) => { setSearchedFirstName(event.target.value) }}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                name="searchedLastName"
                                placeholder="Last Name"
                                value={searchedLastName}
                                onChange={(event) => { setSearchedLastName(event.target.value) }}
                            />
                            <div className="valid-feedback"></div>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                name="searchedDriverLicenseNumber"
                                placeholder="License Number"
                                value={searchedDriverLicenseNumber}
                                onChange={(event) => { setSearchedDriverLicenseNumber(event.target.value) }}
                            />
                            <div className="valid-feedback"></div>
                        </div>



                        {/* <div className="col">
                            <FilterSelect
                                className="col-auto"
                                label={"Fuel Type"}
                                getOptions={getAllFuelTypeOptions}
                                selectedValue={selectedFuelType}
                                onChange={(event) => { setSelectedFuelType(event.target.value) }}
                            />
                        </div> */}
                    </div>
                    <div className='col-sm-2 d-flex align-items-end'>
                        <FilterButton clearFilter={clearFilter} />
                    </div>
                </div>
                <div className="col-sm-2 d-flex justify-content-end align-items-end">
                    <Link to="add" className="btn btn-success">
                        <i className="bi bi-plus-circle pe-2"></i>
                        Add Customer
                    </Link>
                </div>
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
