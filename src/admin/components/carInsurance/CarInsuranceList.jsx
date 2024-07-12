import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';

import { useMessage } from '../providers/MessageProvider'
import { adminConfig } from '../../../config/adminConfig'
import { getAllCarInsurances, deleteCarInsurance } from '../../../api/carInsuranceApi';

import TablePlaceholder from "../content/table/TablePlaceholder"
import ContentTable from '../content/table/ContentTable'
import TableViewButton from '../content/table/button/TableViewButton';
import TableEditButton from '../content/table/button/TableEditButton';
import TableDeleteButton from '../content/table/button/TableDeleteButton';
import TablePaginator from '../content/table/TablePaginator';
import FilterButton from '../content/filter/FilterButton';
import FilterSelect from '../content/filter/FilterSelect';
import CarTypeFilterBar from '../content/carCascadeFilterForm/CarTypeFilterBar';

export default function CarInsuranceList() {

    const TABLE_HEADER = {
        id: "No.",
        licensePlate: "License Plate",
        carBrand: "Car Brand",
        model: "Model",
        carType: "Car Type",
        year: "Year",
        color: "Color",
        insuranceCompany: "Insurance Company",
        insuranceAmount: "Insurance Amount",
        effectiveDate: "Effective Date",
        expirationDate: "Expiration Date",
        autoRenewalDate: "AutoRenewal Date",
        premium: "Premium",
        description: "Description",
        operations: "Operations"
    };
    const ITEMS_PER_PAGE = adminConfig.itemsPerPage;

    const { showMessage } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    // data part
    const [carInsurances, setCarInsurances] = useState([]);
    // paginator data part
    const [currentPage, setCurrentPage] = useState(1);

    // select form part
    const searchBarDataObj = {
        selectedCarBrand: "",
        selectedModel: "",
        selectedCarType: ""
    }
    const [searchBarData, setSearchBarData] = useState(searchBarDataObj);
    const [uniqueKey, setUniqueKey] = useState(Date.now());


    // GET data from database
    useEffect(() => {
        const fetchCarInsurances = async () => {
            setIsLoading(true);
            try {
                const result = await getAllCarInsurances();
                console.log("CarInsuranceList result: ", result);
                setCarInsurances(result);
            } catch (error) {
                showMessage(error.message, adminConfig.colorEmun.danger);
            }
            setIsLoading(false);
        }

        fetchCarInsurances();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [searchBarData])

    const filteredData = useMemo(() => {
        return carInsurances.filter((item) => (
            (!searchBarData.selectedCarBrand || item.car.carBrand.id.toString() === searchBarData.selectedCarBrand)
            && (!searchBarData.selectedModel || item.car.model === searchBarData.selectedModel)
            && (!searchBarData.selectedCarType || item.car.carType.id.toString() === searchBarData.selectedCarType)
        ))
    }, [carInsurances, searchBarData])

    const currentData = useMemo(() => {
        const indexOfLastData = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstData = indexOfLastData - ITEMS_PER_PAGE;
        return filteredData.slice(indexOfFirstData, indexOfLastData)
    }, [currentPage, filteredData, ITEMS_PER_PAGE])

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
                <td>{item.car.licensePlate}</td>
                <td>{item.car.carBrand.name}</td>
                <td>{item.car.model}</td>
                <td>{item.car.carType.typeName}</td>
                <td>{item.car.year}</td>
                <td>{item.car.color}</td>
                <td>{item.insuranceCompany}</td>
                <td>{item.insuranceAmount}</td>
                <td>{item.effectiveDate}</td>
                <td>{item.expirationDate}</td>
                <td>{item.autoRenewalDate}</td>
                <td>{item.premium}</td>
                <td>{item.description}</td>
                <td className="fixed-column last-fixed-column">
                    {<TableViewButton link={`view/${item.id}`} />}
                    {<TableEditButton link={`edit/${item.id}`} />}
                    {<TableDeleteButton deleteId={item.id} deleteHandle={handleDelete} />}
                </td>
            </tr>
        ))
    }

    const handleDelete = async (carInsuranceId) => {
        try {
            const result = await deleteCarInsurance(carInsuranceId);
            if (result === "") {
                showMessage(`Car Insurance was deleted!`, adminConfig.colorEnum.success);
                setCarInsurances(carInsurances.filter(item => item.id !== carInsuranceId));
            }
        } catch (error) {
            showMessage(error.message, adminConfig.colorEmun.danger);
        }
    }

    // filter part
    const clearFilter = () => {
        setSearchBarData(searchBarDataObj);
        setUniqueKey(Date.now());
    }

    return (
        <>
            <section className="row">
                <div className="row col-sm-10">
                    <div className='row col-sm-10'>
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
                <div className="col-sm-2 d-flex justify-content-end align-items-end">
                    <Link to="add" className="btn btn-success">
                        <i className="bi bi-plus-circle pe-2"></i>
                        Add
                    </Link>
                </div>
            </section >

            {
                isLoading ? (<TablePaginator />) : (
                    <>
                        <ContentTable tableHeaderHtml={tableHeaderHtml} tableBodyHtml={tableBodyHtml} />
                        <TablePaginator
                            data={filteredData}
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
