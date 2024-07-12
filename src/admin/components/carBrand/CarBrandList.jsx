import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';

import { useMessage } from '../providers/MessageProvider'
import { adminConfig } from '../../../config/adminConfig'
import { base64ToFile } from '../../../utils/convertPicture';
import { getAllCarBrands, deleteCarBrand, getAllCountriesOptions } from '../../../api/carBrandsApi'

import TablePlaceholder from "../content/table/TablePlaceholder"
import ContentTable from '../content/table/ContentTable'
import TableImage from '../content/table/TableImage'
import TableViewButton from '../content/table/button/TableViewButton';
import TableEditButton from '../content/table/button/TableEditButton';
import TableDeleteButton from '../content/table/button/TableDeleteButton';
import TablePaginator from '../content/table/TablePaginator';
import FilterButton from '../content/filter/FilterButton';
import FilterSelect from '../content/filter/FilterSelect';

function CarBrandList() {
    const TABLE_HEADER = {
        id: "No.",
        name: "Name",
        country: "Country",
        foundedYear: "Founded Year",
        logo: "Logo",
        operations: "Operations"
    };
    const ITEMS_PER_PAGE = adminConfig.itemsPerPage;

    const { showMessage } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    // data part
    const [carBrands, setCarBrands] = useState([]);
    // paginator data part
    const [currentPage, setCurrentPage] = useState(1);

    // select form part
    const [selectedCountry, setSelectedCountry] = useState("");

    // GET data from database
    useEffect(() => {
        // fetch data part
        const fetchCarBrands = async () => {
            setIsLoading(true);
            try {
                const result = await getAllCarBrands();
                console.log("CarBrandList result: ", result);
                setCarBrands(result);
            } catch (error) {
                showMessage(error.message, adminConfig.colorEmun.danger);
            }
            setIsLoading(false);
        }

        fetchCarBrands();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCountry])

    const filteredData = useMemo(() => {
        return carBrands.filter((item) => (
            !selectedCountry || item.country === selectedCountry
        ))
    }, [carBrands, selectedCountry])

    const currentData = useMemo(() => {
        const indexOfLastData = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstData = indexOfLastData - ITEMS_PER_PAGE;
        return filteredData.slice(indexOfFirstData, indexOfLastData)
    }, [currentPage, filteredData, ITEMS_PER_PAGE]);

    // table part
    const tableHeaderHtml = () => {
        return Object.values(TABLE_HEADER).map((item, index) => (
            <th key={index}>{item}</th>
        ))
    }

    const tableBodyHtml = () => {
        return currentData.map((item, index) => (
            <tr className="align-middle" key={item.id}>
                <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>{item.name}</td>
                <td>{item.country}</td>
                <td>{item.foundedYear}</td>
                <td>
                    {
                        <TableImage src={URL.createObjectURL(base64ToFile(item.logo))} />
                    }
                </td>
                <td>
                    {<TableViewButton link={`view/${item.id}`} />}
                    {<TableEditButton link={`edit/${item.id}`} />}
                    {<TableDeleteButton deleteId={item.id} deleteHandle={handleDelete} />}
                </td>
            </tr>
        ))

    }

    const handleDelete = async (carBrandId) => {
        try {
            const result = await deleteCarBrand(carBrandId);
            if (result === "") {
                showMessage(`Car Brand was deleted!`, adminConfig.colorEnum.success);
                setCarBrands(carBrands.filter(item => item.id !== carBrandId));
            }
        } catch (error) {
            showMessage(error.message, adminConfig.colorEmun.danger);
        }
    }

    // filter part
    const clearFilter = () => {
        setSelectedCountry("");
    }

    return (
        <>
            <section className="row">
                <div className="row col-sm-9">
                    <div className='col-sm-3'>
                        <FilterSelect
                            label={"Country"}
                            getOptions={getAllCountriesOptions}
                            selectedValue={selectedCountry}
                            onChange={(event) => { setSelectedCountry(event.target.value) }}
                        />
                    </div>
                    <div className='col-sm-3'>
                        <FilterButton clearFilter={clearFilter} />
                    </div>
                </div>
                <div className="col-sm-3 d-flex justify-content-end">
                    <Link to="add" className="btn btn-success">
                        <i className="bi bi-plus-circle pe-2"></i>
                        Add Car Brand
                    </Link>
                </div>
            </section>
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

export default CarBrandList
