import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';

import { useMessage } from '../providers/MessageProvider'
import { adminConfig } from '../../../config/adminConfig';
import { getAllCars, deleteCar, getAllModelOptions, getAllAvailableOptions, getAllFuelTypeOptions } from '../../../api/carApi';
import { getAllCarBrandsOptions } from '../../../api/carBrandsApi';
import { getAllCarTypesOptions } from '../../../api/carTypesApi';

import TablePlaceholder from "../content/table/TablePlaceholder"
import ContentTable from '../content/table/ContentTable'
import TableViewButton from '../content/table/button/TableViewButton';
import TableEditButton from '../content/table/button/TableEditButton';
import TableDeleteButton from '../content/table/button/TableDeleteButton';
import TablePaginator from '../content/table/TablePaginator';
import FilterButton from '../content/filter/FilterButton';
import FilterSelect from '../content/filter/FilterSelect';


export default function CarList() {
    const TABLE_HEADER = {
        id: "No.",
        carBrand: "Car Brand",
        model: "Model",
        available: "Available",
        price: "Price",
        carType: "Car Type",
        fuelType: "Fuel Type",
        licensePlate: "License Plate",
        seats: "Seats",
        year: "Year",
        color: "Color",
        mileage: "Mileage",
        awd: "AWD",
        leatherTrimmedUpholstery: "Leather Trimmed Upholstery",
        moonroof: "Moon Roof",
        rab: "RAB",
        blindSpotAssist: "Blind Spot Assist",
        keylessEntrySystem: "Keyless Entry System",
        engineDisplacement: "Engine Displacement",
        description: "Description",
        operations: "Operations"
    }
    const ITEMS_PER_PAGE = adminConfig.itemsPerPage;

    const { showMessage } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    // data part
    const [cars, setCars] = useState([]);
    // paginator data part
    const [currentPage, setCurrentPage] = useState(1);

    // select form part
    const [selectedCarBrand, setSelectedCarBrand] = useState("");
    const [selectedAvailable, setSelectedAvailable] = useState("");
    const [selectedCarType, setSelectedCarType] = useState("");
    const [selectedFuelType, setSelectedFuelType] = useState("");

    // GET data from database
    useEffect(() => {
        const fetchCars = async () => {
            setIsLoading(true);
            try {
                const result = await getAllCars();
                console.log("CarList result: ", result);
                setCars(result);
            } catch (error) {
                showMessage(error.message, adminConfig.colorEmun.danger);
            }
            setIsLoading(false);
        }
        fetchCars();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCarBrand, selectedAvailable, selectedCarType, selectedFuelType])

    const filteredData = useMemo(() => {
        return cars.filter((item) => (
            (!selectedCarBrand || item.carBrand.id.toString() === selectedCarBrand)
            && (!selectedAvailable || item.available.toString() === selectedAvailable)
            && (!selectedCarType || item.carType.id.toString() === selectedCarType)
            && (!selectedFuelType || item.fuelType === selectedFuelType)
        ))
    }, [cars, selectedCarBrand, selectedAvailable, selectedCarType, selectedFuelType])

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
                <td>{item.carBrand.name}</td>
                <td>{item.model}</td>
                <td>{item.available === "true" ? "Yes" : "No"}</td>
                <td>{item.price}</td>
                <td>{item.carType.typeName}</td>
                <td>{item.fuelType}</td>
                <td>{item.licensePlate}</td>
                <td>{item.seats}</td>
                <td>{item.year}</td>
                <td>{item.color}</td>
                <td>{item.mileage}</td>
                <td>{item.awd === null ? "-" : (item.awd === "true" ? "Yes" : "No")}</td>
                <td>{item.leatherTrimmedUpholstery === null ? "-" : (item.leatherTrimmedUpholstery === "true" ? "Yes" : "No")}</td>
                <td>{item.moonroof === null ? "-" : (item.moonroof === "true" ? "Yes" : "No")}</td>
                <td>{item.rab === null ? "-" : (item.rab === "true" ? "Yes" : "No")}</td>
                <td>{item.blindSpotAssist === null ? "-" : (item.blindSpotAssist === "true" ? "Yes" : "No")}</td>
                <td>{item.keylessEntrySystem === null ? "-" : (item.keylessEntrySystem === "true" ? "Yes" : "No")}</td>
                <td>{item.engineDisplacement}</td>
                <td>{item.description}</td>

                <td className="fixed-column last-fixed-column">
                    {<TableViewButton link={`view/${item.id}`} />}
                    {<TableEditButton link={`edit/${item.id}`} />}
                    {<TableDeleteButton deleteId={item.id} deleteHandle={handleDelete} />}
                </td>
            </tr>
        ))
    }

    const handleDelete = async (carId) => {
        try {
            const result = await deleteCar(carId);
            if (result === "") {
                showMessage(`Car was deleted!`, adminConfig.colorEnum.success);
                setCars(cars.filter(item => item.id !== carId));
            }
        } catch (error) {
            showMessage(error.message, adminConfig.colorEmun.danger);
        }
    }

    // filter part
    const clearFilter = () => {
        setSelectedCarBrand("");
        setSelectedAvailable("");
        setSelectedCarType("");
        setSelectedFuelType("");
    }

    return (
        <>
            <section className="row">
                <div className="row col-sm-10">
                    <div className='row col-sm-10'>
                        <div className="col">
                            <FilterSelect
                                label={"Car Brand"}
                                getOptions={getAllCarBrandsOptions}
                                selectedValue={selectedCarBrand}
                                onChange={(event) => { setSelectedCarBrand(event.target.value) }}
                            />
                        </div>

                        <div className="col">
                            <FilterSelect
                                className="col-auto"
                                label={"Available"}
                                getOptions={getAllAvailableOptions}
                                selectedValue={selectedAvailable}
                                onChange={(event) => { setSelectedAvailable(event.target.value) }}
                            />
                        </div>

                        <div className="col">
                            <FilterSelect
                                className="col-auto"
                                label={"Car Type"}
                                getOptions={getAllCarTypesOptions}
                                selectedValue={selectedCarType}
                                onChange={(event) => { setSelectedCarType(event.target.value) }}
                            />
                        </div>

                        <div className="col">
                            <FilterSelect
                                className="col-auto"
                                label={"Fuel Type"}
                                getOptions={getAllFuelTypeOptions}
                                selectedValue={selectedFuelType}
                                onChange={(event) => { setSelectedFuelType(event.target.value) }}
                            />
                        </div>
                    </div>
                    <div className='col-sm-2 d-flex align-items-end'>
                        <FilterButton clearFilter={clearFilter} />
                    </div>
                </div>
                <div className="col-sm-2 d-flex justify-content-end align-items-end">
                    <Link to="add" className="btn btn-success">
                        <i className="bi bi-plus-circle pe-2"></i>
                        Add Car
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
