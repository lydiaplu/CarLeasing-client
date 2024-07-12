import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { useMessage } from '../providers/MessageProvider'
import { adminConfig } from '../../../config/adminConfig'
import { getAllCarTypes, deleteCarType } from '../../../api/carTypesApi'

import TablePlaceholder from "../content/table/TablePlaceholder"
import ContentTable from '../content/table/ContentTable'
import TableViewButton from '../content/table/button/TableViewButton'
import TableEditButton from '../content/table/button/TableEditButton';
import TableDeleteButton from '../content/table/button/TableDeleteButton';
import TablePaginator from '../content/table/TablePaginator';

function CarTypeList() {
    const TABLE_HEADER = {
        id: "No.",
        typeName: "Type Name",
        operations: "Operations"
    };
    const ITEMS_PER_PAGE = adminConfig.itemsPerPage;

    const { showMessage } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    // data part
    const [carTypes, setCarTypes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    // paginator data part
    const [currentPage, setCurrentPage] = useState(1);

    // GET data from database
    useEffect(() => {
        fetchCarTypes();
    }, [])

    useEffect(() => {
        filterData();
    }, [carTypes])

    const fetchCarTypes = async () => {
        setIsLoading(true);
        try {
            const result = await getAllCarTypes();
            console.log("CarTypeList result: ", result);
            setCarTypes(result);
        } catch (error) {
            showMessage(error.message, adminConfig.colorEmun.danger);
        }
        setIsLoading(false);
    }

    const currentData = useMemo(() => {
        const indexOfLastData = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstData = indexOfLastData - ITEMS_PER_PAGE;
        return filteredData.slice(indexOfFirstData, indexOfLastData);
    }, [currentPage, filteredData, ITEMS_PER_PAGE])

    const tableHeaderHtml = () => {
        return Object.values(TABLE_HEADER).map((item, index) => (
            <th key={index}>{item}</th>
        ))
    }

    const tableBodyHtml = () => {
        return currentData.map((item, index) => (
            <tr className="align-middle" key={item.id}>
                <td style={{ width: '5%' }}>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>{item.typeName}</td>
                <td style={{ width: '12%' }}>
                    {<TableViewButton link={`view/${item.id}`} />}
                    {<TableEditButton link={`edit/${item.id}`} />}
                    {<TableDeleteButton deleteId={item.id} deleteHandle={handleDelete} />}
                </td>
            </tr>
        ))
    }

    const handleDelete = async (carTypeId) => {
        try {
            const result = await deleteCarType(carTypeId);
            if (result === "") {
                showMessage(`Car Type was deleted!`, adminConfig.colorEnum.success);
                setCarTypes(carTypes.filter(item => item.id !== carTypeId));
            }
        } catch (error) {
            console.log("error: ", error);
            // showMessage(error.message, adminConfig.colorEmun.danger);
            showMessage(`not delete!`, adminConfig.colorEnum.danger);

        }
    }

    const filterData = () => {
        setFilteredData(carTypes);
    }


    return (
        <>
            <section className="row">
                <div className="col-sm-12 d-flex justify-content-end">
                    <Link to="add" className="btn btn-success">
                        <i className="bi bi-plus-circle pe-2"></i>
                        Add Car Type
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

export default CarTypeList
